import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../../middleware/authMiddleware.js';
import { professionalOrientationService } from '../../../../../../services/professionalOrientationService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ADMIN', 'ELEVE']);
  if (response) return response;

  try {
    const resolvedParams = await params;
    const targetId = parseInt(resolvedParams?.id, 10);
    const userId = user.UtilisateurId ?? user.id;
    const userRole = user.Role ?? user.role;

    // Un élève ne peut consulter que son propre profil
    if (userRole === 'ELEVE' && userId !== targetId) {
      return NextResponse.json(
        { error: 'Accès non autorisé au profil de compétences d\'un autre élève.' },
        { status: 403, headers: corsHeaders() }
      );
    }

    const profile = await professionalOrientationService.getTraineeProfessionalSkillsProfile(targetId);
    return NextResponse.json({ success: true, profile }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}
