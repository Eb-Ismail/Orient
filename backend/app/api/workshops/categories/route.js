import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../middleware/authMiddleware.js';
import { workshopService } from '../../../../services/workshopService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { response } = await authenticateRequest(request, ['ADMIN', 'COMMISSION', 'ELEVE']);
  if (response) return response;

  try {
    const categories = await workshopService.getCategories();
    return NextResponse.json({ categories }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

