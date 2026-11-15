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
    const summary = await commissionRepository.getAdminRecruitmentSummary();
    const commissions = await commissionRepository.getAllCommissions();

    return NextResponse.json({
      success: true,
      ...summary,
      commissions
    }, { headers: corsHeaders() });
  } catch (err) {
    console.error('[API /api/admin/commissions/summary] Erreur:', err);
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

