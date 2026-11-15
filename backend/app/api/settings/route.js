import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../middleware/authMiddleware.js';
import { coreRepository } from '../../../repositories/coreRepository.js';
import {
  getOrientationResultsVisibility,
  setOrientationResultsVisibilityAsync,
  syncOrientationVisibilityFromDb
} from '../../../lib/orientationConfig.js';

const defaultSettings = {
  institutionNom: 'Gendarmerie Royale Marocaine - Direction Générale (DGGN)',
  commissionOrientationActif: true,
  dureeDefautTestMinutes: 35,
  seuilReussiteGeneral: 60,
  autoriserRepriseTest: true,
  autoriserConsultationResultatsEleve: true,
  orientationResultsVisibility: 'student_and_admin',
  modeMaintenance: false,
  anneePromotionEnCours: 2026
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN', 'ELEVE', 'COMMISSION']);
  if (response) return response;

  try {
    const dbMap = await coreRepository.getSystemSettingsMap();
    const visibility = await syncOrientationVisibilityFromDb();
    const currentSettings = {
      ...defaultSettings,
      ...dbMap,
      orientationResultsVisibility: visibility
    };
    return NextResponse.json({ settings: currentSettings }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

export async function PUT(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const body = await request.json();

    if (body.orientationResultsVisibility) {
      await setOrientationResultsVisibilityAsync(body.orientationResultsVisibility, user.UtilisateurId);
    }

    const updatedMap = await coreRepository.upsertSystemSettings(body, user.UtilisateurId);
    const updatedSettings = {
      ...defaultSettings,
      ...updatedMap,
      orientationResultsVisibility: getOrientationResultsVisibility()
    };

    await coreRepository.appendLog({
      utilisateurId: user.UtilisateurId,
      action: 'PARAMETRES_MIS_A_JOUR',
      cible: 'Configuration Système & Permissions Orientation',
      details: `Visibilité résultats orientation : ${getOrientationResultsVisibility()}`,
      adresseIP: '127.0.0.1'
    });

    return NextResponse.json(
      { message: 'Paramètres mis à jour.', settings: updatedSettings },
      { headers: corsHeaders() }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}
