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
    const matrix = await professionalOrientationService.getSpecialtyMatrix();
    return NextResponse.json({ matrix }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

export async function PUT(request) {
  const { response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const body = await request.json();
    const { specialiteCode, poidsCompetences, justificationAr, conditionsAVerifier } = body;
    if (!specialiteCode) {
      return NextResponse.json({ error: 'Code de spécialité requis.' }, { status: 400, headers: corsHeaders() });
    }

    const updated = await professionalOrientationService.updateSpecialtyMatrix(specialiteCode, {
      poidsCompetences,
      justificationAr,
      conditionsAVerifier
    });

    return NextResponse.json({ success: true, specialty: updated }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

