import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../../middleware/authMiddleware.js';
import { commissionRepository } from '../../../../../../repositories/commissionRepository.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ADMIN', 'COMMISSION']);
  if (response) return response;

  try {
    const resolvedParams = await params;
    const evaluationId = parseInt(resolvedParams?.id, 10);
    const userId = user.UtilisateurId ?? user.id;

    if (!evaluationId) {
      return NextResponse.json({ error: "Identifiant d'évaluation invalide." }, { status: 400, headers: corsHeaders() });
    }

    const body = await request.json();
    const { motif, nouvellesNotes } = body;

    if (!motif || !motif.trim()) {
      return NextResponse.json({ error: 'Le motif de correction est obligatoire pour toute révision.' }, { status: 400, headers: corsHeaders() });
    }

    await commissionRepository.requestEvaluationCorrection(evaluationId, userId, motif.trim(), nouvellesNotes || {});

    return NextResponse.json({
      success: true,
      message: 'Demande de correction enregistrée. Le statut passe à A_CORRIGER.'
    }, { headers: corsHeaders() });
  } catch (err) {
    console.error('[API /api/commissions/evaluations/:id/correction] Erreur:', err);
    return NextResponse.json({ error: err.message }, { status: 400, headers: corsHeaders() });
  }
}

