// ==============================================================================
// ORIENT-GR — Moteur de Ventilation Intelligente Multi-Commissions (IA)
// Analyse le profil élève, ses récits, ses compétences et ventile sur 1 à N commissions
// ==============================================================================

import { commissionRepository } from '../repositories/commissionRepository.js';
import { coreRepository } from '../repositories/coreRepository.js';
import { journeyAndTalentRepository } from '../repositories/journeyAndTalentRepository.js';
import { getDbPool } from '../lib/db.js';

// Mots-clés et référentiels de correspondance par domaine de commission
const COMMISSION_DOMAIN_RULES = {
  COMM_INFO: {
    domaine: 'Informatique & Systèmes',
    diplomes: ['DTS Informatique', 'Développement Web', 'Génie Logiciel', 'Informatique de Gestion', 'TS Informatique', 'ISTA Informatique'],
    keywords: ['informatique', 'développement', 'programmation', 'python', 'java', 'sql', 'base de données', 'ordinateur', 'code', 'logiciel', 'système', 'windows', 'linux', 'script', 'excel'],
    pointsAVerifierDefaut: [
      "Vérifier la capacité à résoudre une panne de système d'exploitation.",
      "Évaluer la maîtrise des requêtes de base de données et manipulation de données.",
      "Tester la méthodologie de débogage et logique algorithmique."
    ]
  },
  COMM_RESEAUX: {
    domaine: 'Réseaux & Télécommunications',
    diplomes: ['Réseaux Informatiques', 'Télécommunications', 'Systèmes et Réseaux', 'Technicien Réseaux', 'ISTA Réseaux'],
    keywords: ['réseau', 'routeur', 'switch', 'câblage', 'ip', 'ping', 'lan', 'wan', 'télécom', 'connexion', 'panne réseau', 'wi-fi', 'antenne', 'transmission'],
    pointsAVerifierDefaut: [
      "Diagnostic physique et logique d'un équipement réseau hors service.",
      "Configuration de base d'un routeur et affectation de sous-réseaux.",
      "Respect des procédures de sécurité des liaisons de transmission."
    ]
  },
  COMM_CYBER: {
    domaine: 'Cybersécurité & Investigation Numérique',
    diplomes: ['Cybersécurité', 'Sécurité des Systèmes', 'Investigation Numérique', 'Master Cyber', 'Forensic'],
    keywords: ['cyber', 'sécurité', 'chiffrement', 'luks', 'cryptage', 'firewall', 'intrusion', 'forensic', 'piratage', 'authentification', 'protection', 'vulnérabilité'],
    pointsAVerifierDefaut: [
      "Compréhension des mécanismes de chiffrement de supports et disques.",
      "Détection et analyse d'une tentative d'intrusion ou anomalie de trafic.",
      "Intégrité de la chaîne de preuve numérique lors d'une saisie."
    ]
  },
  COMM_MECA: {
    domaine: 'Maintenance Mécanique & Véhicules',
    diplomes: ['Mécanique Automobile', 'Électromécanique', 'Diagnostic Auto', 'Maintenance des Engins', 'ISTA Mécanique'],
    keywords: ['mécanique', 'moteur', 'panne', 'vidange', 'refroidissement', 'capteur', 'véhicule', 'automobile', 'outil', 'pompe', 'diagnostic moteur', 'pièce'],
    pointsAVerifierDefaut: [
      "Diagnostic d'un dysfonctionnement moteur à l'aide d'une valise de test.",
      "Contrôle méthodique du circuit de refroidissement et des fluides.",
      "Respect strict des règles de sécurité atelier et outillage."
    ]
  },
  COMM_ELEC: {
    domaine: 'Électronique & Systèmes Embarqués',
    diplomes: ['Électronique', 'Électrotechnique', 'Systèmes Embarqués', 'Automatisme', 'Maintenance Électronique'],
    keywords: ['électronique', 'circuit', 'composant', 'soudure', 'multimètre', 'tension', 'courant', 'capteur', 'relais', 'carte électronique', 'cms', 'alimentation'],
    pointsAVerifierDefaut: [
      "Test de composants passifs et actifs sur banc de mesure.",
      "Interprétation d'un schéma de câblage électronique embarqué.",
      "Précision du geste de soudure et contrôle de continuité."
    ]
  },
  COMM_POLICE_SCIENTIFIQUE: {
    domaine: 'Police Scientifique & Criminalistique',
    diplomes: ['Biologie', 'Chimie', 'Sciences Physiques', 'Droit Pénal & Criminologie', 'Police Technique'],
    keywords: ['police scientifique', 'criminalistique', 'scène de crime', 'empreinte', 'adn', 'prélèvement', 'trace', 'balistique', 'indice', 'chimie', 'microscope'],
    pointsAVerifierDefaut: [
      "Protocole de gel des lieux et sécurisation des indices matériels.",
      "Relevé d'empreintes papillaires sur surfaces complexes.",
      "Rigueur de la documentation et traçabilité des scellés."
    ]
  },
  COMM_LOGISTIQUE: {
    domaine: 'Logistique Opérationnelle & Matériel',
    diplomes: ['Gestion Logistique', 'Transport et Logistique', 'Gestion des Stocks', 'Commerce / Gestion'],
    keywords: ['logistique', 'stock', 'inventaire', 'magasin', 'matériel', 'fourniture', 'flux', 'armement', 'expédition', 'organisation', 'classement'],
    pointsAVerifierDefaut: [
      "Contrôle de conformité d'un arrivage de matériel réglementaire.",
      "Tenue rigoureuse d'un registre d'inventaire opérationnel.",
      "Réactivité dans la préparation d'un déploiement matériel."
    ]
  }
};

export const commissionVentilationService = {
  /**
   * Analyse automatique d'un élève et ventilation sur 1 à plusieurs commissions
   * Règle d'or : un élève peut être affecté à plusieurs commissions si son profil le justifie.
   */
  async ventilateCandidate(candidateId, adminId = null) {
    const user = await coreRepository.findActiveUserById(candidateId);
    if (!user) throw new Error("Candidat introuvable.");

    // Récupérer le parcours IA
    const journey = await journeyAndTalentRepository.getOrCreateJourney(candidateId);
    // Récupérer les commissions disponibles
    const allCommissions = await commissionRepository.getAllCommissions();

    // Récupérer les ateliers validés
    const pool = await getDbPool();
    const workshopsRes = await pool.request()
      .input('userId', candidateId)
      .query(`
        SELECT wa.Statut, wa.NoteSur20, w.Titre, w.SousDomaine, w.CategoryId
        FROM dbo.WorkshopAssignments wa
        JOIN dbo.Workshops w ON w.WorkshopId = wa.WorkshopId
        WHERE wa.UtilisateurId = @userId AND wa.Statut IN ('VALIDE', 'EVALUE')
      `);
    const workshops = workshopsRes.recordset || [];

    // Construire le corpus textuel du candidat
    const textCorpus = [
      user.DiplomeOrigine || '',
      user.SpecialiteOrigine || '',
      user.DomaineFormation || '',
      user.FiliereEntree || '',
      journey?.RecitPersonnel || '',
      JSON.stringify(journey?.ExperiencesJson || []),
      JSON.stringify(journey?.CompetencesDetecteesJson || []),
      workshops.map(w => `${w.Titre} ${w.SousDomaine || ''}`).join(' ')
    ].join(' ').toLowerCase();

    const results = [];

    for (const comm of allCommissions) {
      const rule = COMMISSION_DOMAIN_RULES[comm.Code];
      if (!rule) continue;

      let score = 30.0; // Score de base d'évaluation
      const matchingKeywords = [];
      const matchingDiplomas = [];

      // 1. Analyse des diplômes d'origine
      rule.diplomes.forEach(dip => {
        if (textCorpus.includes(dip.toLowerCase())) {
          score += 35.0;
          matchingDiplomas.push(dip);
        }
      });

      // 2. Analyse des mots-clés de compétences et récits
      rule.keywords.forEach(kw => {
        if (textCorpus.includes(kw.toLowerCase())) {
          score += 5.0;
          if (!matchingKeywords.includes(kw)) {
            matchingKeywords.push(kw);
          }
        }
      });

      // 3. Ateliers pratiques validés pertinents
      const relevantWorkshops = workshops.filter(w => {
        const wTitle = (w.Titre || '').toLowerCase();
        return rule.keywords.some(kw => wTitle.includes(kw.toLowerCase()));
      });
      if (relevantWorkshops.length > 0) {
        score += Math.min(relevantWorkshops.length * 10.0, 20.0);
      }

      // Plafonner le score entre 10 et 98%
      const finalScore = Math.min(Math.round(score), 98);

      // Justification explicative générée
      let justification = `Profil en adéquation avec la ${comm.Nom}.`;
      if (matchingDiplomas.length > 0) {
        justification += ` Diplôme d'origine en lien direct (${matchingDiplomas.join(', ')}).`;
      }
      if (matchingKeywords.length > 0) {
        justification += ` Compétences déclarées et mots-clés relevés dans l'entretien IA (${matchingKeywords.slice(0, 4).join(', ')}).`;
      }
      if (relevantWorkshops.length > 0) {
        justification += ` ${relevantWorkshops.length} atelier(s) pratique(s) déjà validé(s) sur ce domaine.`;
      }

      results.push({
        commission: comm,
        scoreCorrespondance: finalScore,
        justificationIA: justification,
        competencesCles: matchingKeywords.slice(0, 6),
        pointsAVerifier: rule.pointsAVerifierDefaut
      });
    }

    // Filtrer les commissions pertinentes :
    // Règle métier : Toutes les commissions avec score >= 55% sont éligibles à l'affectation.
    // Si aucune ne dépasse 55%, on prend les 2 meilleures.
    let eligible = results.filter(r => r.scoreCorrespondance >= 55);
    if (eligible.length === 0) {
      eligible = results.sort((a, b) => b.scoreCorrespondance - a.scoreCorrespondance).slice(0, 2);
    }

    const createdAssignments = [];

    // Enregistrer chaque affectation dans dbo.CandidateCommissionAssignments
    for (const item of eligible) {
      const assignment = await commissionRepository.assignCandidateToCommission({
        candidateId,
        commissionId: item.commission.CommissionId,
        scoreIA: item.scoreCorrespondance,
        justificationIA: item.justificationIA,
        competencesJson: item.competencesCles,
        pointsAVerifierJson: item.pointsAVerifier,
        statut: adminId ? 'VALIDEE_ADMIN' : 'PROPOSEE_IA',
        affectePar: adminId,
        justificationAdmin: adminId ? 'Affectation validée par le Commandement' : null
      });

      createdAssignments.push({
        ...assignment,
        commissionCode: item.commission.Code,
        commissionNom: item.commission.Nom,
        scoreCorrespondance: item.scoreCorrespondance,
        justificationIA: item.justificationIA
      });
    }

    return {
      candidateId,
      totalCommissionsAffectees: createdAssignments.length,
      assignments: createdAssignments
    };
  },

  /**
   * Ventilation en masse de tous les élèves enregistrés
   */
  async ventilateAllCandidates(adminId = null) {
    const pool = await getDbPool();
    const studentsRes = await pool.request().query("SELECT UtilisateurId FROM dbo.Utilisateurs WHERE Role = 'ELEVE' AND EstActif = 1");
    const students = studentsRes.recordset || [];

    const summary = [];
    for (const s of students) {
      try {
        const res = await this.ventilateCandidate(s.UtilisateurId, adminId);
        summary.push(res);
      } catch (err) {
        console.error(`Erreur ventilation élève ${s.UtilisateurId}:`, err.message);
      }
    }
    return { totalTraites: summary.length, details: summary };
  }
};
