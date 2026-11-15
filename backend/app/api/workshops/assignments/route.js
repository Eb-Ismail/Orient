import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../middleware/authMiddleware.js';
import { workshopService } from '../../../../services/workshopService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN', 'COMMISSION']);
  if (response) return response;

  try {
    const { searchParams } = new URL(request.url);
    const workshopId = searchParams.get('workshopId');
    const traineeId = searchParams.get('traineeId');
    const promotionId = searchParams.get('promotionId');
    const statut = searchParams.get('statut') || searchParams.get('status');

    const userRole = user.role ?? user.Role;
    const userId = user.id ?? user.UtilisateurId;
    // Si membre commission non ADMIN, filtrer par superviseurId
    const superviseurId = userRole === 'COMMISSION' ? userId : (searchParams.get('superviseurId') || searchParams.get('instructorId'));

    const assignments = await workshopService.getAssignments({
      workshopId,
      traineeId,
      promotionId,
      statut,
      superviseurId
    });

    return NextResponse.json({ assignments }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

