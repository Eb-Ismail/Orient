import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../middleware/authMiddleware.js';
import { talentPlatformService } from '../../../../../lib/talentPlatformService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['COMMISSION', 'ADMIN']);
  if (response) return response;

  const { studentId } = await params;
  const parsedId = parseInt(studentId, 10);
  if (!parsedId || Number.isNaN(parsedId)) {
    return NextResponse.json({ error: 'Identifiant élève invalide.', code: 'INVALID_STUDENT_ID' }, { status: 400, headers: corsHeaders() });
  }

  try {
    const studentDetail = await talentPlatformService.getInstructorStudentDetail(parsedId);
    return NextResponse.json({
      success: true,
      detail: studentDetail
    }, { headers: corsHeaders() });
  } catch (err) {
    const status = err.message === 'Élève introuvable' ? 404 : 500;
    return NextResponse.json({
      error: err.message,
      code: 'STUDENT_DETAIL_ERROR'
    }, { status, headers: corsHeaders() });
  }
}

