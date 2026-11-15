// ==============================================================================
// ORIENT-GR - Service Statistiques & Tableaux de Bord Décisionnels
// Agrégations pour le commandement et l'administration de l'école
// ==============================================================================

import { group3Repository } from '../repositories/group3Repository.js';

export const analyticsService = {
  /**
   * Agrège les indicateurs clés et statistiques du dashboard administrateur
   */
  async getDashboardMetrics({ promotionId = null }) {
    const [{ users, promotions, domaines, specialites, logs }, allSessions] = await Promise.all([
      group3Repository.getAllUsersAndPromotions(),
      group3Repository.getTestSessions()
    ]);

    let students = users.filter(u => u.Role === 'ELEVE');
    let sessions = [...allSessions];

    if (promotionId) {
      students = students.filter(u => u.PromotionId === parseInt(promotionId, 10));
      const studentIds = new Set(students.map(s => s.UtilisateurId));
      sessions = sessions.filter(sess => studentIds.has(sess.UtilisateurId));
    }

    const totalStudents = students.length;
    const completedSessions = sessions.filter(s => s.Statut === 'TERMINE');
    const inProgressSessions = sessions.filter(s => s.Statut === 'EN_COURS');
    const pendingCount = Math.max(0, totalStudents - (completedSessions.length + inProgressSessions.length));

    // Moyenne générale aux tests
    const averageScore = completedSessions.length > 0
      ? Math.round(
          completedSessions.reduce((acc, curr) => acc + (curr.ScorePourcentage || 0), 0) / completedSessions.length * 10
        ) / 10
      : 0;

    // Répartition des résultats par tranches de score
    const scoreDistribution = [
      { tranche: '< 50%', count: 0, label: 'Insuffisant' },
      { tranche: '50-65%', count: 0, label: 'Passable' },
      { tranche: '65-80%', count: 0, label: 'Bien' },
      { tranche: '80-90%', count: 0, label: 'Très Bien' },
      { tranche: '> 90%', count: 0, label: 'Excellent' }
    ];

    completedSessions.forEach(s => {
      const score = s.ScorePourcentage || 0;
      if (score < 50) scoreDistribution[0].count += 1;
      else if (score < 65) scoreDistribution[1].count += 1;
      else if (score < 80) scoreDistribution[2].count += 1;
      else if (score < 90) scoreDistribution[3].count += 1;
      else scoreDistribution[4].count += 1;
    });

    // Résultats moyens par domaine de compétences
    const domainAverages = domaines.map(dom => {
      let totalDomainScore = 0;
      let count = 0;

      completedSessions.forEach(s => {
        if (s.ResultatsDomaines) {
          const domRes = s.ResultatsDomaines.find(r => r.DomaineCode === dom.Code);
          if (domRes) {
            totalDomainScore += domRes.Pourcentage;
            count += 1;
          }
        }
      });

      return {
        code: dom.Code,
        domaine: dom.Intitule,
        moyenne: count > 0 ? Math.round(totalDomainScore / count) : 75
      };
    });

    // Répartition des profils par spécialité de prédilection (Top 1)
    const specialtyDistribution = specialites.map(spec => {
      let countTop1 = 0;
      completedSessions.forEach(s => {
        if (s.Recommandations && s.Recommandations.length > 0) {
          const top = s.Recommandations[0];
          if (top.SpecialiteCode === spec.Code) {
            countTop1 += 1;
          }
        }
      });

      return {
        code: spec.Code,
        specialite: spec.Intitule,
        subdivision: spec.Subdivision,
        places: spec.PlacesDisponibles,
        candidatsRecommandes: countTop1
      };
    });

    // Dernières activités administratives
    const recentActivities = [...logs]
      .sort((a, b) => new Date(b.DateLog) - new Date(a.DateLog))
      .slice(0, 8);

    return {
      kpis: {
        totalStudents,
        testsCompleted: completedSessions.length,
        testsInProgress: inProgressSessions.length,
        testsPending: pendingCount,
        averageScore,
        tauxParticipation: totalStudents > 0 ? Math.round((completedSessions.length / totalStudents) * 100) : 0
      },
      scoreDistribution,
      domainAverages,
      specialtyDistribution,
      recentActivities,
      promotions
    };
  }
};
