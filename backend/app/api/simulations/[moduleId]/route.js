import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../middleware/authMiddleware.js';
import { simulationService } from '../../../../services/simulationService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ADMIN', 'ELEVE']);
  if (response) return response;

  const { moduleId } = params;
  try {
    const data = await simulationService.getModuleDetails(moduleId, user.UtilisateurId);
    if (!data) {
      return NextResponse.json({ error: 'Module de simulation introuvable.' }, { status: 404, headers: corsHeaders() });
    }
    return NextResponse.json(data, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}
