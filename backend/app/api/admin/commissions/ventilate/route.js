import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../middleware/authMiddleware.js';
import { commissionVentilationService } from '../../../../../services/commissionVentilationService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const body = await request.json();
    const candidateId = body.candidateId ? parseInt(body.candidateId, 10) : null;
    const adminId = user.UtilisateurId ?? user.id;

    let result;
    if (candidateId) {
      result = await commissionVentilationService.ventilateCandidate(candidateId, adminId);
    } else {
      result = await commissionVentilationService.ventilateAllCandidates(adminId);
    }

    return NextResponse.json({
      success: true,
      message: 'Ventilation multi-commissions exécutée avec succès.',
      result
    }, { headers: corsHeaders() });
  } catch (err) {
    console.error('[API /api/admin/commissions/ventilate] Erreur:', err);
    return NextResponse.json({ error: err.message }, { status: 400, headers: corsHeaders() });
  }
}

