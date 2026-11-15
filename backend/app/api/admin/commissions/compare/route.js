import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../middleware/authMiddleware.js';
import { commissionComparisonService } from '../../../../../services/commissionComparisonService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const body = await request.json();
    const candidateId = parseInt(body.candidateId, 10);
    const adminId = user.UtilisateurId ?? user.id;

    if (!candidateId) {
      return NextResponse.json({ error: 'Le champ candidateId est obligatoire.' }, { status: 400, headers: corsHeaders() });
    }

    const comparisonReport = await commissionComparisonService.compareCandidateResults(candidateId, adminId);

    return NextResponse.json({
      success: true,
      message: 'Rapport comparatif IA généré avec succès.',
      comparison: comparisonReport
    }, { headers: corsHeaders() });
  } catch (err) {
    console.error('[API /api/admin/commissions/compare] Erreur:', err);
    return NextResponse.json({ error: err.message }, { status: 400, headers: corsHeaders() });
  }
}

