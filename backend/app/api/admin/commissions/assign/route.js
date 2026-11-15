import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../middleware/authMiddleware.js';
import { commissionRepository } from '../../../../../repositories/commissionRepository.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const body = await request.json();
    const { candidateId, commissionId, scoreIA, justificationAdmin } = body;
    const adminId = user.UtilisateurId ?? user.id;

    if (!candidateId || !commissionId) {
      return NextResponse.json({ error: 'Les champs candidateId et commissionId sont obligatoires.' }, { status: 400, headers: corsHeaders() });
    }

    const assignment = await commissionRepository.assignCandidateToCommission({
      candidateId: parseInt(candidateId, 10),
      commissionId: parseInt(commissionId, 10),
      scoreIA: scoreIA ? parseFloat(scoreIA) : null,
      statut: 'ASSIGNEE_MANUELLE',
      affectePar: adminId,
      justificationAdmin: justificationAdmin?.trim() || 'Affectation manuelle par le Commandement'
    });

    return NextResponse.json({
      success: true,
      message: 'Affectation candidat enregistrée avec succès.',
      assignment
    }, { headers: corsHeaders() });
  } catch (err) {
    console.error('[API /api/admin/commissions/assign] Erreur:', err);
    return NextResponse.json({ error: err.message }, { status: 400, headers: corsHeaders() });
  }
}

