import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../../middleware/authMiddleware.js';
import { commissionRepository } from '../../../../../../repositories/commissionRepository.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const resolvedParams = await params;
    const assignmentId = parseInt(resolvedParams?.id, 10);
    const adminId = user.UtilisateurId ?? user.id;

    if (!assignmentId || isNaN(assignmentId)) {
      return NextResponse.json({ error: "Identifiant d'affectation invalide." }, { status: 400, headers: corsHeaders() });
    }

    const body = await request.json();
    const { decision, justification, specialiteRetenueCode } = body;

    if (!decision || !['ACCEPTE', 'REFUSE'].includes(decision)) {
      return NextResponse.json({
        error: "La décision administrative doit être soit 'ACCEPTE' soit 'REFUSE'."
      }, { status: 400, headers: corsHeaders() });
    }

    if (!justification || !justification.trim()) {
      return NextResponse.json({
        error: "Une justification administrative officielle est obligatoire pour valider la décision."
      }, { status: 400, headers: corsHeaders() });
    }

    const adminNom = `${user.Prenom || ''} ${user.Nom || ''}`.trim() || 'Commandement ADMIN';

    const result = await commissionRepository.saveAdminDecisionForAssignment({
      assignmentId,
      decision,
      justification: justification.trim(),
      adminId,
      adminNom,
      specialiteRetenueCode
    });

    return NextResponse.json({
      success: true,
      message: `Décision officielle '${decision}' enregistrée avec succès dans SQL Server.`,
      ...result
    }, { headers: corsHeaders() });
  } catch (err) {
    console.error('[API /api/admin/commissions/positive-dossiers/:id/decision] Erreur:', err);
    return NextResponse.json({ error: err.message }, { status: 400, headers: corsHeaders() });
  }
}

