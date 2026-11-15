// ==============================================================================
// ORIENT-GR - Utilitaires de formatage institutionnel
// ==============================================================================

export function formatScore(score) {
  if (score === null || score === undefined) return '-';
  return `${Math.round(score * 10) / 10}%`;
}

export function formatGrade(note) {
  if (note === null || note === undefined) return '-';
  return `${Number(note).toFixed(1)} / 20`;
}

export function formatDateFr(dateString) {
  if (!dateString) return '-';
  try {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}

export function formatRank(rank) {
  if (!rank) return '-';
  return `${rank}${rank === 1 ? 'er' : 'e'}`;
}
