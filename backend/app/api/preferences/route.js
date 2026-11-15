import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../middleware/authMiddleware.js';
import { coreRepository } from '../../../repositories/coreRepository.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { user, response } = await authenticateRequest(request, ['ELEVE', 'ADMIN']);
  if (response) return response;

  try {
    const [preferences, specialites] = await Promise.all([
      coreRepository.getStudentPreferencesOnly(user.UtilisateurId),
      coreRepository.getActiveSpecialtiesSummary()
    ]);

    return NextResponse.json({
      preferences: preferences.length > 0 ? preferences : (user.PreferencesSpecialites || []),
      specialites
    }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

export async function PUT(request) {
  const { user, response } = await authenticateRequest(request, ['ELEVE', 'ADMIN']);
  if (response) return response;

  try {
    const body = await request.json();
    const { preferences } = body;

    const saved = await coreRepository.saveStudentPreferences(user.UtilisateurId, preferences);
    if (!saved) {
      return NextResponse.json({ error: 'Élève introuvable.' }, { status: 404, headers: corsHeaders() });
    }

    await coreRepository.appendLog({
      utilisateurId: user.UtilisateurId,
      action: 'VOEUX_ORIENTATION_ENREGISTRES',
      cible: `Élève ${saved.matricule}`,
      details: `Enregistrement des préférences professionnelles (${saved.preferences.length} voeux).`,
      adresseIP: '127.0.0.1'
    });

    return NextResponse.json({
      message: 'Préférences professionnelles enregistrées.',
      preferences: saved.preferences
    }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}
