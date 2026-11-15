import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../middleware/authMiddleware.js';
import { professionalOrientationService } from '../../../../../services/professionalOrientationService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const { headers, rows } = await professionalOrientationService.generateAssessmentExportData();

    // Construction du CSV avec BOM UTF-8 (\uFEFF) pour compatibilité Excel arabe immédiate
    const csvLines = [
      headers.map(h => `"${h.replace(/"/g, '""')}"`).join(';')
    ];

    rows.forEach(r => {
      csvLines.push(r.map(cell => `"${String(cell || '').replace(/"/g, '""')}"`).join(';'));
    });

    const csvContent = '\uFEFF' + csvLines.join('\r\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        ...corsHeaders(),
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="orient_gr_simulations_export_2026.csv"'
      }
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

