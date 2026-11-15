import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../../middleware/authMiddleware.js';
import { commissionRepository } from '../../../../../../repositories/commissionRepository.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ADMIN', 'COMMISSION']);
  if (response) return response;

  try {
    const resolvedParams = await params;
    const commissionId = parseInt(resolvedParams?.id, 10);
    const candidateId = parseInt(resolvedParams?.candidateId, 10);
    const userId = user.UtilisateurId ?? user.id;
    const userRole = user.Role ?? user.role;

    if (!commissionId || !candidateId) {
      return NextResponse.json({ error: 'Identifiants invalides.' }, { status: 400, headers: corsHeaders() });
    }

    // Contrôle Anti-IDOR pour rôle COMMISSION
    if (userRole === 'COMMISSION') {
      const isMember = await commissionRepository.isUserMemberOfCommission(userId, commissionId);
      if (!isMember) {
        return NextResponse.json({
          error: "Accès refusé. Vous n'êtes pas autorisé sur cette commission.",
          code: 'FORBIDDEN_COMMISSION'
        }, { status: 403, headers: corsHeaders() });
      }
    }

    const details = await commissionRepository.getCandidateCommissionDetails(commissionId, candidateId);
    if (!details) {
      return NextResponse.json({
        error: "Candidat non affecté à cette commission ou introuvable.",
        code: 'CANDIDATE_NOT_ASSIGNED'
      }, { status: 404, headers: corsHeaders() });
    }

    return NextResponse.json({
      success: true,
      ...details
    }, { headers: corsHeaders() });
  } catch (err) {
    console.error('[API /api/commissions/:id/candidates/:candidateId] Erreur:', err);
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

