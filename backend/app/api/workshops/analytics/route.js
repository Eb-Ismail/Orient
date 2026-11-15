import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../middleware/authMiddleware.js';
import { professionalOrientationService } from '../../../../services/professionalOrientationService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { response } = await authenticateRequest(request, ['ADMIN', 'COMMISSION']);
  if (response) return response;

  try {
    const url = new URL(request.url);
    const promotionId = url.searchParams.get('promotionId') || null;

    const analytics = await professionalOrientationService.getWorkshopAnalyticsDashboard(promotionId);
    return NextResponse.json({ success: true, analytics }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

