import { NextResponse } from 'next/server';
import { corsHeaders } from '../../../../middleware/authMiddleware.js';
import { smartJourneyService } from '../../../../lib/smartJourneyService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET() {
  try {
    const health = await smartJourneyService.getAiArchitectureHealth();
    return NextResponse.json(health, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

