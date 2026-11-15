import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../middleware/authMiddleware.js';
import { simulationService } from '../../../../../services/simulationService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ADMIN', 'ELEVE']);
  if (response) return response;

  const { moduleId } = params;
  try {
    const session = await simulationService.startOrResumeSession(moduleId, user.UtilisateurId);
    return NextResponse.json({ session }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400, headers: corsHeaders() });
  }
}
