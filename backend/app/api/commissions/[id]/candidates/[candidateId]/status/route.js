import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../../../middleware/authMiddleware.js';
import { commissionRepository } from '../../../../../../../repositories/commissionRepository.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function PATCH(request, { params }) {
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

    // Contrôle Anti-IDOR pour COMMISSION
    if (userRole === 'COMMISSION') {
      const isMember = await commissionRepository.isUserMemberOfCommission(userId, commissionId);
      if (!isMember) {
        return NextResponse.json({
          error: "Accès refusé. Vous n'avez pas l'autorisation d'agir sur cette commission.",
          code: 'FORBIDDEN_COMMISSION'
        }, { status: 403, headers: corsHeaders() });
      }
    }

    const body = await request.json();
    const { assignmentId, statut, dateConvocation, justificationAdmin } = body;

    if (!assignmentId) {
      return NextResponse.json({ error: "L'identifiant d'affectation (assignmentId) est obligatoire." }, { status: 400, headers: corsHeaders() });
    }

    const allowed = ['EN_ATTENTE', 'CONVOQUE', 'EN_COURS', 'EVALUATION_TERMINEE'];
    if (!allowed.includes(statut)) {
      return NextResponse.json({
        error: `Statut non autorisé pour une commission : ${statut}. Statuts valides : ${allowed.join(', ')}`
      }, { status: 400, headers: corsHeaders() });
    }

    const result = await commissionRepository.updateCandidateAssignmentStatus({
      assignmentId,
      statut,
      dateConvocation,
      justificationAdmin,
      updatedBy: userId
    });

    return NextResponse.json({
      success: true,
      message: `Statut du dossier mis à jour vers '${statut}'.`,
      ...result
    }, { headers: corsHeaders() });
  } catch (err) {
    console.error('[API /api/commissions/:id/candidates/:candidateId/status] Erreur:', err);
    return NextResponse.json({ error: err.message }, { status: 400, headers: corsHeaders() });
  }
}

