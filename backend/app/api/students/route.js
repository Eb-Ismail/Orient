import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../middleware/authMiddleware.js';
import { studentService } from '../../../services/studentService.js';
import { validateStudent } from '../../../validators/index.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  const url = new URL(request.url);
  const promotionId = url.searchParams.get('promotionId');
  const search = url.searchParams.get('search');
  const statutMedical = url.searchParams.get('statutMedical');

  try {
    const students = await studentService.getStudents({ promotionId, search, statutMedical });
    return NextResponse.json({ students }, { headers: corsHeaders() });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders() });
  }
}

export async function POST(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const body = await request.json();
    const validation = validateStudent(body);

    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Données élève invalides.', details: validation.errors },
        { status: 400, headers: corsHeaders() }
      );
    }

    const newStudent = await studentService.createStudent(body);
    return NextResponse.json(
      { message: 'Élève gendarme enregistré avec succès.', student: newStudent },
      { status: 201, headers: corsHeaders() }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400, headers: corsHeaders() });
  }
}
