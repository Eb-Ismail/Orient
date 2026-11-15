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
    const {
      candidateId,
      comparisonId,
      commissionRetenueId,
      specialiteRetenueCode,
      statutDecision,
      justificationDecision
    } = body;

    const adminId = user.UtilisateurId ?? user.id;

    if (!candidateId || !specialiteRetenueCode || !justificationDecision) {
      return NextResponse.json({
        error: 'Les champs candidateId, specialiteRetenueCode et justificationDecision sont obligatoires.'
      }, { status: 400, headers: corsHeaders() });
    }

    const decisionId = await commissionRepository.saveAdministrativeDecision({
      candidateId: parseInt(candidateId, 10),
      comparisonId: comparisonId ? parseInt(comparisonId, 10) : null,
      commissionRetenueId: commissionRetenueId ? parseInt(commissionRetenueId, 10) : null,
      specialiteRetenueCode,
      statutDecision: statutDecision || 'AFFECTE_OFFICIEL',
      justificationDecision: justificationDecision.trim(),
      decisionPar: adminId
    });

    return NextResponse.json({
      success: true,
      message: 'Décision officielle de recrutement enregistrée et verrouillée.',
      decisionId
    }, { headers: corsHeaders() });
  } catch (err) {
    console.error('[API /api/admin/commissions/decision] Erreur:', err);
    return NextResponse.json({ error: err.message }, { status: 400, headers: corsHeaders() });
  }
}

