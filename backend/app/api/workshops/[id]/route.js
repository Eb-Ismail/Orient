import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../middleware/authMiddleware.js';
import { workshopService } from '../../../../services/workshopService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request, { params }) {
  const { response } = await authenticateRequest(request, ['ADMIN', 'COMMISSION', 'ELEVE']);
  if (response) return response;

  try {
    const id = params?.id;
    const workshop = await workshopService.getWorkshopById(id);
    if (!workshop) {
      return NextResponse.json({ error: 'Atelier introuvable.' }, { status: 404, headers: corsHeaders() });
    }
    return NextResponse.json({ workshop }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

export async function PUT(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const id = params?.id;
    const body = await request.json();
    const updated = await workshopService.updateWorkshop(id, body, user.id);
    return NextResponse.json({ success: true, workshop: updated }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400, headers: corsHeaders() });
  }
}

export async function DELETE(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const id = params?.id;
    const archived = await workshopService.archiveWorkshop(id, true, user.id);
    return NextResponse.json({ success: true, workshop: archived }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400, headers: corsHeaders() });
  }
}

