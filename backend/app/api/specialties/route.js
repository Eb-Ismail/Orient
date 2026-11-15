import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../middleware/authMiddleware.js';
import { coreRepository } from '../../../repositories/coreRepository.js';
import { validateSpecialty } from '../../../validators/index.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN', 'ELEVE', 'COMMISSION']);
  if (response) return response;

  try {
    const data = await coreRepository.getSpecialtiesAndDomains();
    return NextResponse.json(data, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

export async function POST(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const body = await request.json();
    const validation = validateSpecialty(body);
    if (!validation.isValid) {
      return NextResponse.json({ error: 'Spécialité invalide.', details: validation.errors }, { status: 400, headers: corsHeaders() });
    }

    const newSpecialty = await coreRepository.createSpecialty(body);

    await coreRepository.appendLog({
      utilisateurId: user.UtilisateurId,
      action: 'SPECIALITE_CREEE',
      cible: `Spécialité ${newSpecialty.Code}`,
      details: `Création de la filière ${newSpecialty.Intitule} (${newSpecialty.PlacesDisponibles} places).`,
      adresseIP: '127.0.0.1'
    });

    return NextResponse.json(
      { message: 'Spécialité créée avec succès.', specialite: newSpecialty },
      { status: 201, headers: corsHeaders() }
    );
  } catch (err) {
    const status = err.message.includes('existe déjà') ? 400 : 500;
    return NextResponse.json({ error: err.message }, { status, headers: corsHeaders() });
  }
}

export async function PUT(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const body = await request.json();
    const spec = await coreRepository.updateSpecialty(body);
    if (!spec) {
      return NextResponse.json({ error: 'Spécialité introuvable.' }, { status: 404, headers: corsHeaders() });
    }

    await coreRepository.appendLog({
      utilisateurId: user.UtilisateurId,
      action: 'SPECIALITE_MODIFIEE',
      cible: `Spécialité ${spec.Code}`,
      details: `Modification des paramètres de la spécialité ${spec.Intitule}.`,
      adresseIP: '127.0.0.1'
    });

    return NextResponse.json(
      { message: 'Spécialité mise à jour.', specialite: spec },
      { headers: corsHeaders() }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}
