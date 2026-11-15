import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../../middleware/authMiddleware.js';
import { workshopService } from '../../../../../../services/workshopService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ADMIN', 'COMMISSION']);
  if (response) return response;

  try {
    const id = params?.id;
    const userRole = user.role ?? user.Role;
    const userId = user.id ?? user.UtilisateurId;

    // Règle d'affectation : Le membre commission évalue les séances qui lui sont assignées ou sous contrôle admin
    if (userRole === 'COMMISSION') {
      const assignment = await workshopService.getAssignmentById(id);
      if (!assignment) {
        return NextResponse.json({ error: 'Assignation introuvable.' }, { status: 404, headers: corsHeaders() });
      }
      if (assignment.SuperviseurId && assignment.SuperviseurId !== userId) {
        return NextResponse.json(
          { error: "Accès refusé : Vous n'êtes pas assigné à l'évaluation de cet élève." },
          { status: 403, headers: corsHeaders() }
        );
      }
    }

    const body = await request.json();
    const result = await workshopService.evaluateTrainee(id, {
      ...body,
      superviseurId: body.superviseurId || userId,
      superviseurNom: body.superviseurNom || `${user.prenom || ''} ${user.nom || ''}`.trim() || 'Membre Évaluateur'
    });

    return NextResponse.json(result, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400, headers: corsHeaders() });
  }
}

