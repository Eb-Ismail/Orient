import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../middleware/authMiddleware.js';
import { coreRepository } from '../../../../repositories/coreRepository.js';
import { validateCondition } from '../../../../validators/index.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN', 'ELEVE']);
  if (response) return response;

  try {
    const url = new URL(request.url);
    const specialiteId = url.searchParams.get('specialiteId');
    const conditions = await coreRepository.getConditions(specialiteId);
    return NextResponse.json({ conditions }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

export async function POST(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const body = await request.json();
    const validation = validateCondition(body);
    if (!validation.isValid) {
      return NextResponse.json({ error: 'Condition invalide.', details: validation.errors }, { status: 400, headers: corsHeaders() });
    }

    const res = await coreRepository.createCondition(body);
    if (res.notFound) {
      return NextResponse.json({ error: 'Spécialité introuvable.' }, { status: 404, headers: corsHeaders() });
    }

    await coreRepository.appendLog({
      utilisateurId: user.UtilisateurId,
      action: 'CONDITION_CREEE',
      cible: `Spécialité ${res.specialite.Code}`,
      details: `Ajout condition ${res.condition.TypeCondition} ${res.condition.Operateur} ${res.condition.Seuil} (${res.condition.StatutValidation}).`,
      adresseIP: '127.0.0.1'
    });

    return NextResponse.json(
      { message: 'Condition enregistrée.', condition: res.condition },
      { status: 201, headers: corsHeaders() }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

export async function PUT(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const body = await request.json();
    const cond = await coreRepository.updateCondition(body);
    if (!cond) {
      return NextResponse.json({ error: 'Condition introuvable.' }, { status: 404, headers: corsHeaders() });
    }

    await coreRepository.appendLog({
      utilisateurId: user.UtilisateurId,
      action: 'CONDITION_MODIFIEE',
      cible: `Condition #${cond.ConditionId}`,
      details: `Modification du seuil ou du statut de validation (${cond.StatutValidation}).`,
      adresseIP: '127.0.0.1'
    });

    return NextResponse.json(
      { message: 'Condition mise à jour.', condition: cond },
      { headers: corsHeaders() }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

export async function DELETE(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  const url = new URL(request.url);
  const conditionId = url.searchParams.get('id');

  if (!conditionId) {
    return NextResponse.json({ error: 'Identifiant requis.' }, { status: 400, headers: corsHeaders() });
  }

  try {
    const deleted = await coreRepository.deleteCondition(conditionId);
    if (!deleted) {
      return NextResponse.json({ error: 'Condition introuvable.' }, { status: 404, headers: corsHeaders() });
    }

    await coreRepository.appendLog({
      utilisateurId: user.UtilisateurId,
      action: 'CONDITION_SUPPRIMEE',
      cible: `Condition #${deleted.ConditionId}`,
      details: `Suppression de la règle ${deleted.Description}.`,
      adresseIP: '127.0.0.1'
    });

    return NextResponse.json({ message: 'Condition supprimée.' }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}
