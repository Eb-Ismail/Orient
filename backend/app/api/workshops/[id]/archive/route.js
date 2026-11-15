import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../middleware/authMiddleware.js';
import { workshopService } from '../../../../../services/workshopService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function PATCH(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const id = params?.id;
    const body = await request.json().catch(() => ({}));
    const isArchived = body.isArchived !== undefined ? Boolean(body.isArchived) : true;
    const workshop = await workshopService.archiveWorkshop(id, isArchived, user.id);
    return NextResponse.json({ success: true, workshop }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400, headers: corsHeaders() });
  }
}

