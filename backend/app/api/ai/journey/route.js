import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../middleware/authMiddleware.js';
import { smartJourneyService } from '../../../../lib/smartJourneyService.js';
import { canUserViewOrientationResults, getOrientationResultsVisibility, syncOrientationVisibilityFromDb } from '../../../../lib/orientationConfig.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { user, response } = await authenticateRequest(request, ['ELEVE', 'ADMIN']);
  if (response) return response;

  try {
    await syncOrientationVisibilityFromDb();
    const journey = await smartJourneyService.getStudentJourney(user.UtilisateurId);
    
    // Contrôle de visibilité des résultats d'orientation
    const canViewResults = canUserViewOrientationResults(user);
    const sanitizedJourney = { ...journey };

    if (!canViewResults) {
      sanitizedJourney.analysis = null;
      sanitizedJourney.orientationResultsLocked = true;
    } else {
      sanitizedJourney.orientationResultsLocked = false;
    }
    sanitizedJourney.visibilityMode = getOrientationResultsVisibility();

    return NextResponse.json({ journey: sanitizedJourney }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

export async function POST(request) {
  const { user, response } = await authenticateRequest(request, ['ELEVE', 'ADMIN']);
  if (response) return response;

  try {
    const body = await request.json();
    const updatedJourney = await smartJourneyService.saveStudentJourney(user.UtilisateurId, body);
    
    // Si demandé, régénérer également l'analyse (uniquement si autorisé)
    if (body.triggerAnalysis) {
      await syncOrientationVisibilityFromDb();
      if (canUserViewOrientationResults(user)) {
        updatedJourney.analysis = await smartJourneyService.generateProfileAnalysis(user.UtilisateurId);
      } else {
        updatedJourney.analysis = null;
        updatedJourney.orientationResultsLocked = true;
      }
    }

    return NextResponse.json({
      message: 'Parcours sauvegardé avec succès.',
      journey: updatedJourney
    }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

