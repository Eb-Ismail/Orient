import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../middleware/authMiddleware.js';
import { workshopService } from '../../../../../services/workshopService.js';

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

    // Si l'utilisateur est un élève, il ne peut voir que ses propres ateliers
    if (userRole === 'ELEVE' && userId !== targetId) {
      return NextResponse.json({ error: 'Accès non autorisé aux ateliers d\'un autre élève.' }, { status: 403, headers: corsHeaders() });
    }

    const data = await workshopService.getTraineeWorkshops(targetId);
    return NextResponse.json(data, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}
