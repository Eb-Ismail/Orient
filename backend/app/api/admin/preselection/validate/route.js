import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../middleware/authMiddleware.js';
import { preselectionEngineService } from '../../../../../services/preselectionEngineService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request) {
  // Seul le rôle ADMIN peut valider officiellement une affectation
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const body = await request.json();
    const { studentId, action = 'VALIDER', specialiteRetenueCode, justification } = body;

    if (!studentId) {
      return NextResponse.json({
        error: "L'identifiant de l'élève (studentId) est requis.",
        code: 'BAD_REQUEST'
      }, { status: 400, headers: corsHeaders() });
    }

    if (!['VALIDER', 'REJETER'].includes(action)) {
      return NextResponse.json({
        error: "L'action doit être 'VALIDER' ou 'REJETER'.",
        code: 'BAD_REQUEST'
      }, { status: 400, headers: corsHeaders() });
    }

    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('remote-addr') || '127.0.0.1';

    const result = await preselectionEngineService.validateAdministrativeAssignment(studentId, {
      action,
      specialiteRetenueCode: specialiteRetenueCode || 'SPEC-TERR',
      justification: justification || '',
      adminId: user.UtilisateurId,
      ipAddress
    });

    return NextResponse.json(result, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      code: 'ADMIN_VALIDATE_ASSIGNMENT_ERROR'
    }, { status: 500, headers: corsHeaders() });
  }
}

