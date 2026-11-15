import { guideRepository } from '../repositories/guideRepository.js';

// Les 7 Spécialités Opérationnelles Officielles de la Gendarmerie Royale
const SPECIALITES_OPERATIONNELLES = [
  {
    id: 'SPEC-TERR',
    code: 'GEND-TERR',
    titre: 'Gendarmerie Territoriale',
    titreAr: 'الدرك الملكي الإقليمي',
    categorie: 'OPERATIONNEL',
    descriptionCourte: "Sécurité publique, police de proximité, surveillance générale et contrôle des flux routiers sur l'ensemble du territoire national.",
    presentation: "La Gendarmerie Territoriale constitue le socle opérationnel fondamental de la Gendarmerie Royale. Répartie sur l'ensemble du territoire à travers les Compagnies et les Brigades territoriales, elle assure la sécurité publique, la police judiciaire et la protection des citoyens.",
    icone: 'Shield',
    couleur: 'emerald',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    imageUrl: '/images/ateliers/gendarmerie-territoriale.webp',
    missionsCount: 7,
    modulesCount: 3,
    type: 'SPECIALITE_OFFICIELLE'
  },
  {
    id: 'SPEC-MOB',
    code: 'GEND-MOB',
    titre: 'Gendarmerie Mobile',
    titreAr: 'الدرك الملكي المتنقل',
    categorie: 'OPERATIONNEL',
    descriptionCourte: "Maintien et rétablissement de l'ordre public, sécurisation des grands événements et renfort tactique des unités territoriales.",
    presentation: "Force de manœuvre et de réserve générale, la Gendarmerie Mobile est projetable sans préavis sur tout point du territoire national pour rétablir l'ordre, faire face aux troubles graves ou apporter son appui lors de crises majeures.",
    icone: 'Users',
    couleur: 'blue',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-300',
    imageUrl: '/images/ateliers/gendarmerie-mobile.webp',
    missionsCount: 6,
    modulesCount: 3,
    type: 'SPECIALITE_OFFICIELLE'
  },
  {
    id: 'SPEC-MARIT',
    code: 'GEND-MARIT',
    titre: 'Gendarmerie Maritime',
    titreAr: 'الدرك الملكي البحري',
    categorie: 'OPERATIONNEL',
    descriptionCourte: "Surveillance des façades maritimes atlantique et méditerranéenne, police des pêches et sauvetage en mer.",
    presentation: "Armant des patrouilleurs hauturiers et des vedettes rapides de surveillance côtière, la Gendarmerie Maritime assure la souveraineté maritime du Royaume, la lutte contre les trafics illicites en mer et la sécurité des zones portuaires.",
    icone: 'Anchor',
    couleur: 'cyan',
    badgeClass: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    imageUrl: '/images/ateliers/gendarmerie-maritime.webp',
    missionsCount: 6,
    modulesCount: 3,
    type: 'SPECIALITE_OFFICIELLE'
  },
  {
    id: 'SPEC-AIR',
    code: 'GEND-AIR',
    titre: 'Gendarmerie Aérienne',
    titreAr: 'الدرك الملكي الجوي',
    categorie: 'OPERATIONNEL',
    descriptionCourte: "Moyens héliportés et aéronefs légers d'appui tactique, hélitreuillage de secours et surveillance des aéroports.",
    presentation: "Composante aérienne spécialisée de la Gendarmerie Royale, elle met en œuvre une flotte d'hélicoptères modernes pour l'évacuation sanitaire d'urgence, la reconnaissance tactique, la lutte contre les feux de forêts et la police des airs.",
    icone: 'Plane',
    couleur: 'sky',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
    imageUrl: '/images/ateliers/gendarmerie-aerienne.webp',
    missionsCount: 5,
    modulesCount: 3,
    type: 'SPECIALITE_OFFICIELLE'
  },
  {
    id: 'SPEC-PREV',
    code: 'GEND-PREV',
    titre: 'Prévôté – Gendarmerie Militaire',
    titreAr: 'الشرطة العسكرية والضابطة القضائية العسكرية',
    categorie: 'OPERATIONNEL',
    descriptionCourte: "Police militaire, discipline aux armées et exercice de la police judiciaire militaire auprès des Forces Armées Royales.",
    presentation: "La Prévôté militaire veille au respect des lois et règlements militaires, exerce les missions de police judiciaire aux armées et assure la sécurité et l'escorte des détachements militaires déployés au Maroc ou en opérations extérieures.",
    icone: 'Scale',
    couleur: 'indigo',
    badgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    imageUrl: '/images/ateliers/prevote-militaire.webp',
    missionsCount: 5,
    modulesCount: 3,
    type: 'SPECIALITE_OFFICIELLE'
  },
  {
    id: 'SPEC-PST',
    code: 'GEND-PST',
    titre: 'Police Scientifique et Technique',
    titreAr: 'الشرطة التقنية والعلمية',
    categorie: 'OPERATIONNEL',
    descriptionCourte: "Gestion de scène de crime, relevé d'empreintes, balistique, analyses ADN et criminalistique numérique.",
    presentation: "Fer de lance de l'enquête moderne, les techniciens et experts en criminalistique de la Gendarmerie Royale exploitent les sciences forensiques pour faire parler les indices matériels et soutenir la manifestation de la vérité judiciaire.",
    icone: 'Microscope',
    couleur: 'purple',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-300',
    imageUrl: '/images/ateliers/police-scientifique.webp',
    missionsCount: 6,
    modulesCount: 3,
    type: 'SPECIALITE_OFFICIELLE'
  },
  {
    id: 'SPEC-INTERV',
    code: 'GEND-INTERV',
    titre: "Unités d'Intervention Spécialisées",
    titreAr: 'وحدات التدخل والفرق الخاصة',
    categorie: 'OPERATIONNEL',
    descriptionCourte: "Intervention haute intensité, neutralisation de forcenés, libération d'otages et protection rapprochée de hautes personnalités.",
    presentation: "Composées d'opérateurs d'élite surentraînés (GSI / pelotons d'intervention rapide), ces unités interviennent sur les situations de crise majeure, les arrestations dangereuses et les missions de contre-terrorisme.",
    icone: 'Crosshair',
    couleur: 'rose',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
    imageUrl: '/images/ateliers/unites-intervention.webp',
    missionsCount: 6,
    modulesCount: 3,
    type: 'SPECIALITE_OFFICIELLE'
  }
];

export const guideService = {
  /**
   * Retourne l'ensemble du catalogue GUIDE organisé en 3 catégories visuelles,
   * avec calcul personnalisé des affinités IA pour l'élève.
   */
  async getCatalogue(utilisateurId = null) {
    // 1. Récupérer les 10 domaines techniques depuis SQL Server
    const domainesDb = await guideRepository.getAllDomaines();

    // 2. Récupérer le profil élève si un utilisateur est fourni
    let studentData = null;
    if (utilisateurId) {
      try {
        studentData = await guideRepository.getStudentProfileForGuide(utilisateurId);
      } catch (err) {
        console.warn('[guideService] Profil élève non récupéré:', err.message);
      }
    }

    // 3. Calcul de compatibilité IA pour chaque domaine
    const domainesEnrichis = domainesDb.map((dom) => {
      const match = computeDomainMatch(dom, studentData);
      return {
        ...dom,
        type: 'DOMAINE_TECHNIQUE',
        compatibilite: match.score,
        estRecommande: match.recommande,
        explicationIA: match.explication,
        mentionReglementaire: "Catégorie pédagogique de découverte et de compétences — Ne constitue pas une affectation officielle."
      };
    });

    // 4. Calcul de compatibilité IA pour les 7 spécialités opérationnelles
    const specialitesEnrichies = SPECIALITES_OPERATIONNELLES.map((spec) => {
      const match = computeSpecialtyMatch(spec, studentData);
      return {
        ...spec,
        compatibilite: match.score,
        estRecommande: match.recommande,
        explicationIA: match.explication,
        mentionReglementaire: "Filière officielle de la Gendarmerie Royale soumise aux critères réglementaires et commissions de sélection."
      };
    });

    // 5. Partitionner les domaines techniques selon les deux catégories
    const domainesTechnologiques = domainesEnrichis.filter(d => d.Categorie === 'TECHNOLOGIQUE');
    const domainesTechniquesLogistiques = domainesEnrichis.filter(d => d.Categorie === 'TECHNIQUE_LOGISTIQUE');

    return {
      nomOfficiel: "GUIDE",
      sousTitre: "Découvrez les spécialités et les domaines professionnels de la Gendarmerie Royale.",
      description: "Espace de découverte, d'information et d'orientation de l'élève. Explorez les 7 spécialités opérationnelles de la Gendarmerie Royale et les 10 domaines professionnels et techniques.",
      statistiques: {
        totalEntrees: specialitesEnrichies.length + domainesEnrichis.length,
        specialitesOperationnellesCount: specialitesEnrichies.length,
        domainesTechnologiquesCount: domainesTechnologiques.length,
        domainesTechniquesLogistiquesCount: domainesTechniquesLogistiques.length,
        domainesRecommandesCount: [...specialitesEnrichies, ...domainesEnrichis].filter(x => x.estRecommande).length
      },
      categories: [
        {
          id: 'operationnelles',
          titre: 'Spécialités opérationnelles',
          description: 'Les 7 filières majeures d’intervention, de maintien de l’ordre et de sécurité publique de la Gendarmerie Royale.',
          badge: '7 Spécialités officielles',
          couleur: 'emerald',
          items: specialitesEnrichies
        },
        {
          id: 'technologiques',
          titre: 'Domaines technologiques',
          description: 'Expertises de pointe dédiées aux systèmes d’information, à la cyberdéfense, à la data intelligence, aux télécommunications et à la robotique.',
          badge: '6 Domaines de compétences',
          couleur: 'indigo',
          items: domainesTechnologiques
        },
        {
          id: 'techniques_logistiques',
          titre: 'Domaines techniques et logistiques',
          description: 'Compétences clés indispensables au soutien des forces : maintien en condition opérationnelle mécanique, électronique de pointe, énergie et chaîne logistique.',
          badge: '4 Domaines de compétences',
          couleur: 'amber',
          items: domainesTechniquesLogistiques
        }
      ]
    };
  },

  /**
   * Retourne la fiche détaillée d'un domaine ou d'une spécialité
   */
  async getDetails(idOrCode, utilisateurId = null) {
    // Cas 1 : Spécialité opérationnelle
    const spec = SPECIALITES_OPERATIONNELLES.find(s => s.id === idOrCode || s.code === idOrCode);
    if (spec) {
      let studentData = null;
      if (utilisateurId) {
        studentData = await guideRepository.getStudentProfileForGuide(utilisateurId).catch(() => null);
      }
      const match = computeSpecialtyMatch(spec, studentData);
      return {
        ...spec,
        compatibilite: match.score,
        estRecommande: match.recommande,
        explicationIA: match.explication,
        mentionReglementaire: "Filière officielle de la Gendarmerie Royale — Orientation soumise aux commissions de sélection."
      };
    }

    // Cas 2 : Domaine technique dans SQL Server
    const dom = await guideRepository.getDomaineByCode(idOrCode);
    if (!dom) return null;

    let studentData = null;
    if (utilisateurId) {
      studentData = await guideRepository.getStudentProfileForGuide(utilisateurId).catch(() => null);
    }
    const match = computeDomainMatch(dom, studentData);

    return {
      ...dom,
      type: 'DOMAINE_TECHNIQUE',
      compatibilite: match.score,
      estRecommande: match.recommande,
      explicationIA: match.explication,
      mentionReglementaire: "Catégorie pédagogique de découverte et de compétences — Ne constitue pas une affectation officielle."
    };
  }
};

/**
 * Calcul d'adéquation entre le profil élève et un domaine technique
 */
function computeDomainMatch(domain, studentData) {
  if (!studentData || (!studentData.journey && !studentData.talent)) {
    // Score d'intérêt par défaut basé sur le poids
    return {
      score: 72 + (domain.PoidsPriorite % 4) * 5,
      recommande: false,
      explication: "Découvrez les missions et compétences de ce domaine pour évaluer votre affinité."
    };
  }

  const recit = (studentData.journey?.recitPersonnel || '').toLowerCase();
  const competencesDetectees = (studentData.journey?.competencesDetectees || []).map(c => (c.nom || c.label || '').toLowerCase());
  const motsCles = domain.MotsClesCompatibilite || [];

  let matchHits = 0;
  for (const kw of motsCles) {
    const k = kw.toLowerCase();
    if (recit.includes(k)) matchHits += 2;
    if (competencesDetectees.some(cd => cd.includes(k))) matchHits += 3;
  }

  // Calcul du score entre 65% et 95%
  let score = 65 + Math.min(matchHits * 5, 29);
  const recommande = score >= 80;

  let explication = "";
  if (score >= 88) {
    explication = `Forte corrélation IA : vos déclarations et compétences détectées en ${motsCles.slice(0, 3).join(', ')} démontrent une excellente adéquation avec ce domaine.`;
  } else if (score >= 80) {
    explication = `Profil adapté : vos aptitudes transversales et vos centres d'intérêt sont cohérents avec les missions de ce domaine.`;
  } else {
    explication = `Domaine d'exploration recommandé pour élargir vos perspectives techniques et consolider votre polyvalence.`;
  }

  return { score, recommande, explication };
}

/**
 * Calcul d'adéquation pour les 7 spécialités opérationnelles
 */
function computeSpecialtyMatch(specialty, studentData) {
  if (!studentData) {
    return {
      score: 75,
      recommande: false,
      explication: "Filière opérationnelle majeure de la Gendarmerie Royale."
    };
  }

  const recit = (studentData.journey?.recitPersonnel || '').toLowerCase();
  let score = 70;
  let matches = [];

  if (specialty.id === 'SPEC-TERR' && (recit.includes('terrain') || recit.includes('route') || recit.includes('contact') || recit.includes('sécurité'))) {
    score = 88;
    matches.push('sens du contact et sécurité publique');
  } else if (specialty.id === 'SPEC-PST' && (recit.includes('science') || recit.includes('enquete') || recit.includes('analyse') || recit.includes('chimie') || recit.includes('biologie'))) {
    score = 92;
    matches.push('rigueur d\'investigation et appétence scientifique');
  } else if (specialty.id === 'SPEC-INTERV' && (recit.includes('sport') || recit.includes('action') || recit.includes('combat') || recit.includes('tactique'))) {
    score = 90;
    matches.push('condition physique et réactivité tactique');
  } else if (specialty.id === 'SPEC-MARIT' && (recit.includes('mer') || recit.includes('plongee') || recit.includes('maritime') || recit.includes('bateau'))) {
    score = 87;
    matches.push('affinité avec le milieu aquatique et côtier');
  } else if (specialty.id === 'SPEC-AIR' && (recit.includes('aero') || recit.includes('vol') || recit.includes('pilotage') || recit.includes('drone'))) {
    score = 86;
    matches.push('intérêt pour les vecteurs aériens et le pilotage');
  } else if (specialty.id === 'SPEC-MOB' && (recit.includes('collectif') || recit.includes('maintien') || recit.includes('ordre') || recit.includes('cohésion'))) {
    score = 85;
    matches.push('esprit de corps et capacité d\'action collective');
  } else if (specialty.id === 'SPEC-PREV' && (recit.includes('droit') || recit.includes('justice') || recit.includes('reglement') || recit.includes('discipline'))) {
    score = 84;
    matches.push('respect rigoureux des normes juridiques et militaires');
  }

  const recommande = score >= 80;
  const explication = matches.length > 0
    ? `Recommandation IA basée sur votre : ${matches.join(', ')}.`
    : `Filière opérationnelle accessible selon vos choix de parcours.`;

  return { score, recommande, explication };
}

