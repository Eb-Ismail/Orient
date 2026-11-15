import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../middleware/authMiddleware.js';
import { studentService } from '../../../../services/studentService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ADMIN', 'ELEVE']);
  if (response) return response;

  const studentId = parseInt(params.id, 10);
  if (user.Role === 'ELEVE' && user.UtilisateurId !== studentId) {
    return NextResponse.json({ error: 'Accès non autorisé.' }, { status: 403, headers: corsHeaders() });
  }

  const student = await studentService.getStudentById(studentId);
  if (!student) {
    return NextResponse.json({ error: 'Élève introuvable.' }, { status: 404, headers: corsHeaders() });
  }

  return NextResponse.json({ student }, { headers: corsHeaders() });
}

export async function PUT(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ADMIN', 'ELEVE']);
  if (response) return response;

  const studentId = parseInt(params.id, 10);
  if (user.Role === 'ELEVE' && user.UtilisateurId !== studentId) {
    return NextResponse.json({ error: 'Accès non autorisé.' }, { status: 403, headers: corsHeaders() });
  }
  try {
    const body = await request.json();
    const updated = await studentService.updateStudent(studentId, body);
    return NextResponse.json({ message: 'Élève mis à jour.', student: updated }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400, headers: corsHeaders() });
  }
}

export async function DELETE(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  const studentId = parseInt(params.id, 10);
  if (!studentId || Number.isNaN(studentId)) {
    return NextResponse.json({ error: 'Identifiant élève invalide.' }, { status: 400, headers: corsHeaders() });
  }

  try {
    const deleted = await studentService.deleteStudent(studentId, user.UtilisateurId);
    if (!deleted) {
      return NextResponse.json({ error: 'Élève introuvable.' }, { status: 404, headers: corsHeaders() });
    }
    return NextResponse.json({ message: 'Élève supprimé.', student: deleted }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400, headers: corsHeaders() });
  }
}
