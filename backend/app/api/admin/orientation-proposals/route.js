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
    const summaries = await professionalOrientationService.getAllStudentsAssessmentSummary();
    return NextResponse.json({ summaries }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

export async function POST(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const body = await request.json();
    const { studentId, statut, specialiteRetenueCode, observationsAr } = body;
    if (!studentId) {
      return NextResponse.json({ error: 'studentId requis.' }, { status: 400, headers: corsHeaders() });
    }

    const decision = await professionalOrientationService.updateAdministrativeDecision(studentId, {
      statut,
      specialiteRetenueCode,
      observationsAr,
      adminId: user.UtilisateurId
    });

    return NextResponse.json({ success: true, decision }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

