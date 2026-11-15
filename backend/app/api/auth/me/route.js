import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../middleware/authMiddleware.js';
import { coreRepository } from '../../../../repositories/coreRepository.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { user, response } = await authenticateRequest(request);
  if (response) return response;

  const promo = user.PromotionId
    ? await coreRepository.getPromotionById(user.PromotionId)
    : null;

  return NextResponse.json(
    {
      user: {
        id: user.UtilisateurId,
        matricule: user.Matricule,
        email: user.Email,
        nom: user.Nom,
        prenom: user.Prenom,
        role: user.Role,
        promotionId: user.PromotionId,
        promotionNom: promo ? promo.Nom : null,
        classementInitial: user.ClassementInitial,
        noteFormationPro: user.NoteFormationPro,
        aptitudePhysique: user.AptitudePhysique,
        statutMedical: user.StatutMedical,
        tailleCm: user.TailleCm,
        poidsKg: user.PoidsKg,
        visionSIGYCOP_Y: user.VisionSIGYCOP_Y,
        moyennesMatieres: user.MoyennesMatieres || {},
        competencesPratiques: user.CompetencesPratiques || {},
        preferencesSpecialites: user.PreferencesSpecialites || []
      }
    },
    { headers: corsHeaders() }
  );
}
