import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../middleware/authMiddleware.js';
import { workshopService } from '../../../services/workshopService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN', 'COMMISSION', 'ELEVE']);
  if (response) return response;

  try {
    const { searchParams } = new URL(request.url);
    const categorieId = searchParams.get('category') || searchParams.get('categorieId');
    const difficulte = searchParams.get('difficulty') || searchParams.get('difficulte');
    const statut = searchParams.get('status') || searchParams.get('statut');
    const search = searchParams.get('search');
    const includeArchived = searchParams.get('includeArchived') === 'true';

    const workshops = await workshopService.getWorkshops({
      categorieId,
      difficulte,
      statut,
      search,
      includeArchived
    });

    return NextResponse.json({ workshops }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

export async function POST(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const body = await request.json();
    const created = await workshopService.createWorkshop(body, user.id);
    return NextResponse.json({ success: true, workshop: created }, { status: 201, headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400, headers: corsHeaders() });
  }
}

