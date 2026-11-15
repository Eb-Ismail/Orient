import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../middleware/authMiddleware.js';
import { professionalOrientationService } from '../../../../services/professionalOrientationService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const competencies = await professionalOrientationService.getCompetencyFramework();
    return NextResponse.json({ competencies }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

export async function PUT(request) {
  const { response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const body = await request.json();
    const { code, updates } = body;
    if (!code) {
      return NextResponse.json({ error: 'Code de compétence requis.' }, { status: 400, headers: corsHeaders() });
    }

    const updated = await professionalOrientationService.updateCompetency(code, updates);
    return NextResponse.json({ success: true, competency: updated }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

