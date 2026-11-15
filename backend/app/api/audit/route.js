import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../middleware/authMiddleware.js';
import { coreRepository } from '../../../repositories/coreRepository.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const url = new URL(request.url);
    const action = url.searchParams.get('action');
    const limit = url.searchParams.get('limit') ? parseInt(url.searchParams.get('limit'), 10) : 50;
    const data = await coreRepository.getLogs({ action, limit });
    return NextResponse.json(data, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}
