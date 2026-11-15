import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../middleware/authMiddleware.js';
import { workshopService } from '../../../../../services/workshopService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ADMIN', 'COMMISSION', 'ELEVE']);
  if (response) return response;

  try {
    const id = params?.id;
    const assignment = await workshopService.getAssignmentById(id);
    if (!assignment) {
      return NextResponse.json({ error: 'Assignation introuvable.' }, { status: 404, headers: corsHeaders() });
    }

    // Si élève, vérifier qu'il s'agit bien de sa propre assignation
    const userRole = user.role ?? user.Role;
    const userId = user.id ?? user.UtilisateurId;
    if (userRole === 'ELEVE' && assignment.UtilisateurId !== userId) {
      return NextResponse.json({ error: 'Accès non autorisé.' }, { status: 403, headers: corsHeaders() });
    }

    return NextResponse.json({ assignment }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

export async function PATCH(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ADMIN', 'COMMISSION', 'ELEVE']);
  if (response) return response;

  try {
    const id = params?.id;
    const body = await request.json();
    const result = await workshopService.updateAssignmentProgress(id, body, user);
    return NextResponse.json(result, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400, headers: corsHeaders() });
  }
}

export async function PUT(request, context) {
  return PATCH(request, context);
}

