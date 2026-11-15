import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../middleware/authMiddleware.js';
import { guideService } from '../../../../services/guideService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ELEVE', 'ADMIN', 'COMMISSION']);
  if (response) return response;

  try {
    const { id } = await params;
    const studentId = user?.role === 'ELEVE' ? (user.id || user.UtilisateurId) : null;
    const item = await guideService.getDetails(id, studentId);

    if (!item) {
      return NextResponse.json({ error: 'Domaine ou spécialité introuvable.' }, { status: 404, headers: corsHeaders() });
    }

    return NextResponse.json(item, { headers: corsHeaders() });
  } catch (err) {
    console.error('[API /api/guide/[id]] Erreur:', err);
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

