import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../middleware/authMiddleware.js';
import { studentService } from '../../../services/studentService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  const url = new URL(request.url);
  const idsParam = url.searchParams.get('ids');

  let studentIds = [];
  if (idsParam) {
    studentIds = idsParam.split(',').map(id => id.trim()).filter(Boolean);
  } else {
    // Par défaut, comparer les deux premiers élèves pour la démo
    studentIds = [2, 3];
  }

  try {
    const comparison = await studentService.compareProfiles(studentIds);
    return NextResponse.json({ comparison }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}
