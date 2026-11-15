import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../middleware/authMiddleware.js';
import { commissionRepository } from '../../../../../repositories/commissionRepository.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const { searchParams } = new URL(request.url);
    const commissionId = searchParams.get('commissionId') || null;
    const statutDecision = searchParams.get('statutDecision') || null;
    const search = searchParams.get('search') || null;

    const result = await commissionRepository.getPositiveDossiersForAdmin({
      commissionId,
      statutDecision,
      search
    });

    const commissions = await commissionRepository.getAllCommissions();

    return NextResponse.json({
      success: true,
      ...result,
      commissions
    }, { headers: corsHeaders() });
  } catch (err) {
    console.error('[API /api/admin/commissions/positive-dossiers] Erreur:', err);
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

