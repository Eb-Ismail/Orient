import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../middleware/authMiddleware.js';
import { simulationService } from '../../../../../services/simulationService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ADMIN', 'ELEVE']);
  if (response) return response;

  const { moduleId } = params;
  try {
    const results = await simulationService.getModuleResults(moduleId, user.UtilisateurId);
    if (!results) {
      return NextResponse.json(
        { error: 'Aucun résultat disponible pour ce module de simulation.' },
        { status: 404, headers: corsHeaders() }
      );
    }
    return NextResponse.json(results, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}
