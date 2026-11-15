import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../middleware/authMiddleware.js';
import { guideService } from '../../../services/guideService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { user, response } = await authenticateRequest(request, ['ELEVE', 'ADMIN', 'COMMISSION']);
  if (response) return response;

  try {
    const studentId = user?.role === 'ELEVE' ? (user.id || user.UtilisateurId) : null;
    const catalogue = await guideService.getCatalogue(studentId);
    return NextResponse.json(catalogue, { headers: corsHeaders() });
  } catch (err) {
    console.error('[API /api/guide] Erreur:', err);
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

