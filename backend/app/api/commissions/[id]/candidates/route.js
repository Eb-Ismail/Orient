import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../middleware/authMiddleware.js';
import { commissionRepository } from '../../../../../repositories/commissionRepository.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ADMIN', 'COMMISSION']);
  if (response) return response;

  try {
    const resolvedParams = await params;
    const commissionId = parseInt(resolvedParams?.id, 10);
    const userId = user.UtilisateurId ?? user.id;
    const userRole = user.Role ?? user.role;

    if (!commissionId || isNaN(commissionId)) {
      return NextResponse.json({ error: 'Identifiant de commission invalide.' }, { status: 400, headers: corsHeaders() });
    }

    // Contrôle Anti-IDOR : Si rôle COMMISSION, vérifier l'adhésion active à cette commission
    if (userRole === 'COMMISSION') {
      const isMember = await commissionRepository.isUserMemberOfCommission(userId, commissionId);
      if (!isMember) {
        return NextResponse.json({
          error: "Accès refusé. Vous n'êtes pas affecté à cette commission.",
          code: 'FORBIDDEN_COMMISSION_ACCESS'
        }, { status: 403, headers: corsHeaders() });
      }
    }

    const commission = await commissionRepository.getCommissionById(commissionId);
    if (!commission) {
      return NextResponse.json({ error: 'Commission introuvable.' }, { status: 404, headers: corsHeaders() });
    }

    const candidates = await commissionRepository.getCandidatesForCommission(commissionId);

    return NextResponse.json({
      success: true,
      commission,
      candidates
    }, { headers: corsHeaders() });
  } catch (err) {
    console.error('[API /api/commissions/:id/candidates] Erreur:', err);
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}
