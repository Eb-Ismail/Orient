import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../../middleware/authMiddleware.js';
import { workshopService } from '../../../../../../services/workshopService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const id = params?.id;
    const body = await request.json();
    const result = await workshopService.requestEvaluationRevision(id, {
      motif: body.motif,
      adminId: user.id,
      adminNom: `${user.prenom || ''} ${user.nom || ''}`.trim() || 'Commandement'
    });

    return NextResponse.json(result, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400, headers: corsHeaders() });
  }
}

