import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../middleware/authMiddleware.js';
import { journeyAndTalentRepository } from '../../../../repositories/journeyAndTalentRepository.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { user, response } = await authenticateRequest(request, ['COMMISSION', 'ADMIN']);
  if (response) return response;

  const url = new URL(request.url);
  const studentId = url.searchParams.get('studentId');
  const workshopId = url.searchParams.get('workshopId');
  const limit = parseInt(url.searchParams.get('limit') || '100', 10);

  try {
    const instructorId = user.Role === 'COMMISSION' ? user.UtilisateurId : null;
    const evaluations = await journeyAndTalentRepository.getPracticalFieldEvaluations({
      studentId: studentId ? parseInt(studentId, 10) : null,
      instructorId: null, // Les évaluateurs peuvent consulter l'historique complet des évaluations
      workshopId: workshopId ? parseInt(workshopId, 10) : null,
      limit
    });

    return NextResponse.json({
      success: true,
      count: evaluations.length,
      evaluations
    }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      code: 'FETCH_EVALUATIONS_ERROR'
    }, { status: 500, headers: corsHeaders() });
  }
}

export async function POST(request) {
  const { user, response } = await authenticateRequest(request, ['COMMISSION', 'ADMIN']);
  if (response) return response;

  try {
    const body = await request.json();
    const {
      evaluationId,
      studentId,
      workshopId,
      domaineCode,
      notePratique,
      tempsMinutes,
      niveauAutonomie,
      competencesValidees,
      observation,
      orientationSuggeree
    } = body;

    // Validations strictes
    if (!studentId) {
      return NextResponse.json({ error: "L'élève gendarme doit obligatoirement être sélectionné." }, { status: 400, headers: corsHeaders() });
    }
    if (!workshopId) {
      return NextResponse.json({ error: "L'atelier pratique doit obligatoirement être sélectionné." }, { status: 400, headers: corsHeaders() });
    }
    const note = parseFloat(notePratique);
    if (isNaN(note) || note < 0 || note > 20) {
      return NextResponse.json({ error: "La note pratique doit être un nombre compris entre 0 et 20." }, { status: 400, headers: corsHeaders() });
    }
    const temps = parseInt(tempsMinutes, 10);
    if (isNaN(temps) || temps <= 0) {
      return NextResponse.json({ error: "Le temps de résolution doit être un nombre de minutes strictement positif (> 0)." }, { status: 400, headers: corsHeaders() });
    }
    if (!niveauAutonomie || !['AUTONOME', 'GUIDE', 'ASSISTE'].includes(niveauAutonomie)) {
      return NextResponse.json({ error: "Le niveau d'autonomie est obligatoire (Autonome, Guidé ou Assisté)." }, { status: 400, headers: corsHeaders() });
    }

    const instructorId = user.UtilisateurId;

    const result = await journeyAndTalentRepository.savePracticalFieldEvaluation({
      evaluationId,
      studentId,
      instructorId,
      workshopId,
      domaineCode,
      notePratique: note,
      tempsMinutes: temps,
      niveauAutonomie,
      competencesValidees: Array.isArray(competencesValidees) ? competencesValidees : [],
      observation: observation || '',
      orientationSuggeree: orientationSuggeree || 'SPEC-TERR',
      userRole: user.role
    });

    return NextResponse.json({
      success: true,
      message: 'Évaluation pratique enregistrée dans SQL Server avec actualisation des indicateurs et de la pré-sélection.',
      evaluation: result.evaluation,
      preselection: result.preselection
    }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      code: 'SAVE_PRACTICAL_EVAL_ERROR'
    }, { status: 500, headers: corsHeaders() });
  }
}

