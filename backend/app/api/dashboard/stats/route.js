import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../middleware/authMiddleware.js';
import { analyticsService } from '../../../../services/analyticsService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  // Seul ADMIN peut consulter les statistiques complètes de l'école
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  const url = new URL(request.url);
  const promotionId = url.searchParams.get('promotionId');

  try {
    const stats = await analyticsService.getDashboardMetrics({ promotionId });
    return NextResponse.json(stats, { headers: corsHeaders() });
  } catch (err) {
    console.error('Erreur stats dashboard:', err);
    return NextResponse.json(
      { error: "Impossible de calculer les statistiques de l'école." },
      { status: 500, headers: corsHeaders() }
    );
  }
}
