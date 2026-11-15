import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../middleware/authMiddleware.js';
import { preselectionEngineService } from '../../../../../services/preselectionEngineService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ELEVE', 'COMMISSION', 'ADMIN']);
  if (response) return response;

  const targetId = parseInt(params?.id, 10);
  if (!targetId) {
    return NextResponse.json({ error: "Identifiant élève invalide." }, { status: 400, headers: corsHeaders() });
  }

  const userRole = user.role || user.Role;
  const currentUserId = user.id || user.UtilisateurId;

  // Contrôle Anti-IDOR strict : un élève ne peut consulter que son propre profil
  if (userRole === 'ELEVE' && currentUserId !== targetId) {
    return NextResponse.json({
      error: "Accès refusé : Vous n'êtes pas autorisé à consulter la pré-sélection d'un autre élève gendarme.",
      code: 'FORBIDDEN_IDOR'
    }, { status: 403, headers: corsHeaders() });
  }

  try {
    const preselection = await preselectionEngineService.calculateStudentPreselection(targetId);
    return NextResponse.json({
      success: true,
      preselection
    }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      code: 'STUDENT_PRESELECTION_ERROR'
    }, { status: 500, headers: corsHeaders() });
  }
}
