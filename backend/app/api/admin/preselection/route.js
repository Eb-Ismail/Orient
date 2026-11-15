import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../middleware/authMiddleware.js';
import { preselectionEngineService } from '../../../../services/preselectionEngineService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const data = await preselectionEngineService.getAllStudentsPreselectionSummary();
    return NextResponse.json({
      success: true,
      ...data
    }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      code: 'PRESELECTION_SUMMARY_ERROR'
    }, { status: 500, headers: corsHeaders() });
  }
}

