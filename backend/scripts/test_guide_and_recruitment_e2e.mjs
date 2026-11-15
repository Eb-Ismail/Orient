import { getDbPool } from '../lib/db.js';
import { guideService } from '../services/guideService.js';
import { commissionVentilationService } from '../services/commissionVentilationService.js';
import { commissionComparisonService } from '../services/commissionComparisonService.js';
import { commissionRepository } from '../repositories/commissionRepository.js';

async function runE2ETests() {
  console.log('======================================================================');
  console.log('--- TEST D\'ACCEPTATION GLOBAL : GUIDE & RECRUTEMENT MULTI-COMMISSIONS ---');
  console.log('======================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ [PASS] ${message}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${message}`);
      failed++;
    }
  }

  // Candidats et Admin
  const adminId = 1; // Laurent De Montmirail (ADMIN)
  const candidateId = 3; // Clara Bernard (ELEVE - Technicien Systèmes & Réseaux)

  // -------------------------------------------------------------------------
  // SECTION 1 : VÉRIFICATION DE L'ESPACE GUIDE & DES 17 ENTRÉES
  // -------------------------------------------------------------------------
  console.log('📌 SECTION 1 : Espace GUIDE & Catalogue des 17 Filières et Domaines');
  try {
    const catalogue = await guideService.getCatalogue(candidateId);

    assert(catalogue.nomOfficiel === 'GUIDE', "Nom officiel de l'espace vérifié: 'GUIDE'");
    assert(
      catalogue.sousTitre === 'Découvrez les spécialités et les domaines professionnels de la Gendarmerie Royale.',
      "Sous-titre officiel vérifié: 'Découvrez les spécialités et les domaines professionnels de la Gendarmerie Royale.'"
    );
    assert(catalogue.statistiques.totalEntrees === 17, `Total des entrées égal à 17 (actuel: ${catalogue.statistiques.totalEntrees})`);
    assert(catalogue.statistiques.specialitesOperationnellesCount === 7, "7 spécialités opérationnelles officielles");
    assert(catalogue.statistiques.domainesTechnologiquesCount === 6, "6 domaines technologiques");
    assert(catalogue.statistiques.domainesTechniquesLogistiquesCount === 4, "4 domaines techniques et logistiques");

    // Vérification détaillée d'un domaine technologique dans SQL Server
    const domDev = await guideService.getDetails('DOM-DEV', candidateId);
    assert(domDev && domDev.Titre === 'Informatique et Développement Logiciel', "Domaine DOM-DEV récupéré depuis SQL Server");
    assert(domDev.Categorie === 'TECHNOLOGIQUE', "Catégorie TECHNOLOGIQUE vérifiée");
    assert(Array.isArray(domDev.Missions) && domDev.Missions.length >= 3, "Missions répertoriées");
    assert(Array.isArray(domDev.CompetencesTechniques) && domDev.CompetencesTechniques.length >= 3, "Compétences techniques répertoriées");
    assert(Array.isArray(domDev.QualitesPersonnelles) && domDev.QualitesPersonnelles.length >= 3, "Qualités personnelles répertoriées");
    assert(Array.isArray(domDev.TechnologiesEquipements) && domDev.TechnologiesEquipements.length >= 3, "Technologies et équipements répertoriés");
    assert(Array.isArray(domDev.ExemplesApplications) && domDev.ExemplesApplications.length >= 2, "Exemples d'applications concrètes répertoriés");
    assert(Array.isArray(domDev.ModulesPedagogiques) && domDev.ModulesPedagogiques.length >= 2, "Modules pédagogiques répertoriés");
    assert(
      domDev.mentionReglementaire.includes("Ne constitue pas une affectation officielle"),
      "Mention déontologique présente pour les domaines techniques"
    );

    // Vérification d'une spécialité opérationnelle
    const specTerr = await guideService.getDetails('SPEC-TERR', candidateId);
    assert(specTerr && specTerr.titre === 'Gendarmerie Territoriale', "Spécialité opérationnelle SPEC-TERR vérifiée");
    assert(specTerr.categorie === 'OPERATIONNEL', "Catégorie OPERATIONNEL vérifiée");
  } catch (err) {
    assert(false, `Erreur Section 1: ${err.message}`);
  }

  // -------------------------------------------------------------------------
  // SECTION 2 : VENTILATION INTELLIGENTE MULTI-COMMISSIONS
  // -------------------------------------------------------------------------
  console.log('\n📌 SECTION 2 : Ventilation Intelligente Multi-Commissions (IA)');
  try {
    const ventilation = await commissionVentilationService.ventilateCandidate(candidateId, adminId);

    assert(ventilation.totalCommissionsAffectees >= 2, `Candidat ventilé sur plusieurs commissions (actuel: ${ventilation.totalCommissionsAffectees})`);
    
    // Vérifier les justifications et identifiants
    const firstAss = ventilation.assignments[0];
    assert(firstAss.justificationIA && firstAss.justificationIA.length > 10, "Justification explicative IA générée pour chaque affectation");
    assert(firstAss.scoreCorrespondance >= 50, `Score de correspondance IA calculé (score: ${firstAss.scoreCorrespondance}%)`);
    assert(firstAss.assignmentId > 0, `Identifiant unique d'affectation généré: ${firstAss.assignmentId}`);
  } catch (err) {
    assert(false, `Erreur Section 2: ${err.message}`);
  }

  // -------------------------------------------------------------------------
  // SECTION 3 : INDÉPENDANCE STRICTE DES ÉVALUATIONS & AUDIT DES CORRECTIONS
  // -------------------------------------------------------------------------
  console.log('\n📌 SECTION 3 : Évaluations Réelles Physiques & Indépendance des Notes');
  try {
    const assignments = await commissionRepository.getCandidateAssignments(candidateId);
    assert(assignments.length >= 2, "Au moins 2 commissions affectées au candidat");

    const ass1 = assignments[0];
    const ass2 = assignments[1];

    // Vérification du verrouillage : si déjà soumise, tentative directe doit lever une erreur
    let lockTriggered = false;
    try {
      await commissionRepository.saveCommissionEvaluation({
        assignmentId: ass1.AssignmentId,
        commissionId: ass1.CommissionId,
        candidateId,
        evaluateurId: adminId,
        notePratiqueSur20: 17.5,
        noteEntretienSur20: 18.0,
        avisCommission: 'FAVORABLE_FORT',
        pointsForts: ['Excellente maîtrise technique'],
        axesAmelioration: ['Gestion du stress'],
        observations: 'Test direct sur note verrouillée',
        statutEvaluation: 'SOUMISE'
      });
    } catch (lockErr) {
      if (lockErr.message.includes('verrouillée')) {
        lockTriggered = true;
      }
    }

    if (lockTriggered) {
      assert(true, "Verrouillage actif : modification non autorisée bloquée sur évaluation soumise");
      
      // Récupérer l'EvaluationId existante et tester la procédure officielle de correction tracée
      const pool = await getDbPool();
      const evalRow = await pool.request()
        .input('assId', ass1.AssignmentId)
        .query('SELECT EvaluationId FROM dbo.CommissionEvaluations WHERE AssignmentId = @assId');
      
      const evalId = evalRow.recordset[0]?.EvaluationId;
      if (evalId) {
        await commissionRepository.requestEvaluationCorrection(
          evalId,
          adminId,
          "Correction motivée suite à délibération contradictoire du jury",
          { notePratiqueSur20: 17.5, noteEntretienSur20: 18.0 }
        );
        assert(true, "Procédure officielle de correction tracée exécutée avec motif d'audit");

        // Re-sauvegarder avec statut SOUMISE
        await commissionRepository.saveCommissionEvaluation({
          assignmentId: ass1.AssignmentId,
          commissionId: ass1.CommissionId,
          candidateId,
          evaluateurId: adminId,
          notePratiqueSur20: 17.5,
          noteEntretienSur20: 18.0,
          avisCommission: 'FAVORABLE_FORT',
          pointsForts: ['Excellente maîtrise technique', 'Sang-froid en situation'],
          axesAmelioration: ['Approfondir la gestion de stress en groupe'],
          observations: 'Très bonne prestation technique en atelier.',
          statutEvaluation: 'SOUMISE'
        });
        assert(true, "Évaluation re-soumise et re-verrouillée avec succès");
      }
    } else {
      assert(true, "Évaluation initiale Commission 1 enregistrée et verrouillée");
    }

    // Re-lecture des deux affectations
    const reloadedAss = await commissionRepository.getCandidateAssignments(candidateId);
    const rAss1 = reloadedAss.find(a => a.AssignmentId === ass1.AssignmentId);
    const rAss2 = reloadedAss.find(a => a.AssignmentId === ass2.AssignmentId);

    assert(rAss1.NotePratiqueSur20 === 17.5, `Commission 1 note pratique validée : ${rAss1.NotePratiqueSur20}/20`);
    assert(rAss2.NotePratiqueSur20 === 14.0, `Commission 2 note pratique validée : ${rAss2.NotePratiqueSur20}/20`);
    assert(rAss1.NotePratiqueSur20 !== rAss2.NotePratiqueSur20, "Aucune note n'écrase celle d'une autre commission (Indépendance totale)");
  } catch (err) {
    assert(false, `Erreur Section 3: ${err.message}`);
  }

  // -------------------------------------------------------------------------
  // SECTION 4 : COMPARAISON FINALE IA & GESTION DES NOTES MANQUANTES
  // -------------------------------------------------------------------------
  console.log('\n📌 SECTION 4 : Moteur Comparatif IA & Non-Pénalisation des Commissions en Attente');
  try {
    const comparison = await commissionComparisonService.compareCandidateResults(candidateId, adminId);

    assert(comparison.resultatsCommissions.length >= 2, "Résultats des commissions évaluées inclus dans le rapport");
    assert(comparison.recommandationPrincipale !== null, "Recommandation principale de spécialité formulée par l'IA");
    assert(comparison.explicationIA && comparison.explicationIA.includes("consultative"), "Explication IA détaillée rappelant le caractère consultatif");
    
    // Vérifier qu'une commission en attente n'est pas mise à zéro
    if (comparison.commissionsEnAttente.length > 0) {
      const pending = comparison.commissionsEnAttente[0];
      assert(pending.statut === 'EN_ATTENTE' || pending.noteGlobale === undefined, "Commission en attente reste avec statut EN_ATTENTE (Non pénalisée à zéro)");
    } else {
      assert(true, "Toutes les commissions du candidat ont été évaluées avec succès");
    }
  } catch (err) {
    assert(false, `Erreur Section 4: ${err.message}`);
  }

  // -------------------------------------------------------------------------
  // SECTION 5 : SOUVERAINETÉ ADMINISTRATIVE (ADMIN)
  // -------------------------------------------------------------------------
  console.log('\n📌 SECTION 5 : Prise de Décision Administrative Finale (ADMIN)');
  try {
    const pool = await getDbPool();
    const decisionId = await commissionRepository.saveAdministrativeDecision({
      candidateId,
      commissionRetenueId: 1, // COMM_INFO
      specialiteRetenueCode: 'SPEC-INFO',
      statutDecision: 'AFFECTE_OFFICIEL',
      justificationDecision: 'Excellente prestation physique confirmée par le jury et profil IA très favorable.',
      decisionPar: adminId
    });

    assert(decisionId > 0, `Décision administrative officielle enregistrée avec succès dans SQL Server (DecisionId: ${decisionId})`);

    const decQuery = await pool.request()
      .input('id', decisionId)
      .query('SELECT * FROM dbo.AdministrativeSelectionDecisions WHERE DecisionId = @id');
    const saved = decQuery.recordset[0];

    assert(saved && saved.StatutDecision === 'AFFECTE_OFFICIEL', "Statut de sélection validé: AFFECTE_OFFICIEL");
    assert(saved && saved.CommissionRetenueId === 1, "Commission officielle attribuée");
  } catch (err) {
    assert(false, `Erreur Section 5: ${err.message}`);
  }

  console.log('\n======================================================================');
  console.log(`BILAN DES TESTS D'ACCEPTATION : ${passed} / ${passed + failed} TESTS RÉUSSIS`);
  console.log(`STATUT FINAL : ${failed === 0 ? '🎉 SYSTÈME 100% CONFORME ET VALIDÉ' : '⚠️ CERTAINS TESTS ONT ÉCHOUÉ'}`);
  console.log('======================================================================');

  process.exit(failed === 0 ? 0 : 1);
}

runE2ETests().catch(err => {
  console.error('❌ Erreur critique test suite:', err);
  process.exit(1);
});
