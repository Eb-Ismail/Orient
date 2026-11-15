import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../../middleware/authMiddleware.js';
import { workshopService } from '../../../../../../services/workshopService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ADMIN', 'COMMISSION', 'ELEVE']);
  if (response) return response;

  try {
    const id = params?.id;
    const userRole = user.role ?? user.Role;
    const userId = user.id ?? user.UtilisateurId;

    if (userRole === 'ELEVE') {
      const assignment = await workshopService.getAssignmentById(id);
      if (!assignment || assignment.UtilisateurId !== userId) {
        return NextResponse.json({ error: 'Accès non autorisé.' }, { status: 403, headers: corsHeaders() });
      }
      if (assignment.EstVerrouille) {
        return NextResponse.json({ error: 'Cette fiche est validée et verrouillée.' }, { status: 403, headers: corsHeaders() });
      }
    }

    const body = await request.json();
    const result = await workshopService.addEvidence(id, body, user);
    return NextResponse.json(result, { status: 201, headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400, headers: corsHeaders() });
  }
}

export async function DELETE(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ADMIN', 'COMMISSION', 'ELEVE']);
  if (response) return response;

  try {
    const id = params?.id;
    const { searchParams } = new URL(request.url);
    const evidenceId = searchParams.get('evidenceId');
    if (!evidenceId) {
      return NextResponse.json({ error: 'Identifiant de pièce justificative requis.' }, { status: 400, headers: corsHeaders() });
    }

    const userRole = user.role ?? user.Role;
    const userId = user.id ?? user.UtilisateurId;

    if (userRole === 'ELEVE') {
      const assignment = await workshopService.getAssignmentById(id);
      if (!assignment || assignment.UtilisateurId !== userId) {
        return NextResponse.json({ error: 'Accès non autorisé.' }, { status: 403, headers: corsHeaders() });
      }
      if (assignment.EstVerrouille) {
        return NextResponse.json({ error: 'Cette fiche est validée et verrouillée.' }, { status: 403, headers: corsHeaders() });
      }
    }

    const result = await workshopService.deleteEvidence(id, evidenceId, user);
    return NextResponse.json(result, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400, headers: corsHeaders() });
  }
}

