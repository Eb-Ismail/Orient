import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../middleware/authMiddleware.js';
import { coreRepository } from '../../../repositories/coreRepository.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN', 'ELEVE']);
  if (response) return response;

  try {
    const promotions = await coreRepository.getAllPromotions();
    return NextResponse.json({ promotions }, { headers: corsHeaders() });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders() });
  }
}

export async function POST(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const body = await request.json();
    if (!body.nom || !body.code) {
      return NextResponse.json(
        { error: 'Le code et le nom de la promotion sont requis.' },
        { status: 400, headers: corsHeaders() }
      );
    }

    const newPromo = await coreRepository.createPromotion(body);
    await coreRepository.appendLog({
      utilisateurId: user.UtilisateurId,
      action: 'PROMOTION_CREEE',
      cible: `Promotion ${newPromo.Code}`,
      details: `Création de la promotion ${newPromo.Nom}.`,
      adresseIP: '127.0.0.1'
    });

    return NextResponse.json(
      { message: 'Promotion créée avec succès.', promotion: newPromo },
      { status: 201, headers: corsHeaders() }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders() });
  }
}
