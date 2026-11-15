import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../middleware/authMiddleware.js';
import { talentPlatformService } from '../../../../lib/talentPlatformService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { user, response } = await authenticateRequest(request, ['COMMISSION', 'ADMIN']);
  if (response) return response;

  try {
    const students = await talentPlatformService.getInstructorStudentsList();
    return NextResponse.json({
      success: true,
      count: students.length,
      students
    }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      code: 'INSTRUCTOR_STUDENTS_ERROR'
    }, { status: 500, headers: corsHeaders() });
  }
}

