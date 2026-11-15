import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../middleware/authMiddleware.js';
import { group3Repository } from '../../../../repositories/group3Repository.js';
import { coreRepository } from '../../../../repositories/coreRepository.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const questionId = parseInt(params.id, 10);
    const question = await group3Repository.getQuestionById(questionId);
    if (!question) {
      return NextResponse.json({ error: 'Question introuvable.' }, { status: 404, headers: corsHeaders() });
    }
    return NextResponse.json({ question }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

export async function PUT(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  const questionId = parseInt(params.id, 10);

  try {
    const question = await group3Repository.getQuestionById(questionId);
    if (!question) {
      return NextResponse.json({ error: 'Question introuvable.' }, { status: 404, headers: corsHeaders() });
    }

    const body = await request.json();

    if (body.enonce !== undefined) question.Enonce = body.enonce;
    if (body.contexteSituationnel !== undefined) question.ContexteSituationnel = body.contexteSituationnel;
    if (body.difficulte !== undefined) question.Difficulte = body.difficulte;
    if (body.points !== undefined) question.Points = parseInt(body.points, 10);
    if (body.tempsLimiteSecondes !== undefined) question.TempsLimiteSecondes = body.tempsLimiteSecondes ? parseInt(body.tempsLimiteSecondes, 10) : null;
    if (body.explication !== undefined) question.Explication = body.explication;
    if (body.estActive !== undefined) question.EstActive = Boolean(body.estActive);
    if (body.estArchivee !== undefined) question.EstArchivee = Boolean(body.estArchivee);
    if (body.competencesAssociees !== undefined) question.CompetencesAssociees = body.competencesAssociees;
    if (body.specialitesAssociees !== undefined) question.SpecialitesAssociees = body.specialitesAssociees;
    if (body.baremeSubjectif !== undefined) question.BaremeSubjectif = body.baremeSubjectif;

    if (body.options && Array.isArray(body.options) && question.TypeQuestion !== 'QUESTION_SUBJECTIVE') {
      question.Options = body.options.map((opt, idx) => ({
        OptionId: opt.optionId || (100 + question.QuestionId * 10 + idx),
        LettreOption: String.fromCharCode(65 + idx),
        EnonceOption: opt.enonce || opt.EnonceOption,
        SchemaSVG: opt.schemaSvg || null,
        EstCorrecte: Boolean(opt.estCorrecte || opt.EstCorrecte)
      }));
    }

    question.Version = (question.Version || 1) + 1;
    const saved = await group3Repository.updateQuestion(question);

    await coreRepository.appendLog({
      utilisateurId: user.UtilisateurId,
      action: 'QUESTION_MODIFIEE',
      cible: `Question ${question.Code} (v${question.Version})`,
      details: `Mise à jour des critères et du contenu.`,
      adresseIP: '127.0.0.1'
    });

    return NextResponse.json({ message: 'Question mise à jour.', question: saved }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

export async function DELETE(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const questionId = parseInt(params.id, 10);
    const question = await group3Repository.getQuestionById(questionId);
    if (!question) {
      return NextResponse.json({ error: 'Question introuvable.' }, { status: 404, headers: corsHeaders() });
    }

    question.EstArchivee = true;
    question.EstActive = false;
    await group3Repository.updateQuestion(question);

    await coreRepository.appendLog({
      utilisateurId: user.UtilisateurId,
      action: 'QUESTION_ARCHIVEE',
      cible: `Question ${question.Code}`,
      details: `Archivage de l'item sans suppression physique pour préserver l'historique d'audit.`,
      adresseIP: '127.0.0.1'
    });

    return NextResponse.json({ message: 'Question archivée avec succès.' }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

export async function PATCH(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const questionId = parseInt(params.id, 10);
    const question = await group3Repository.getQuestionById(questionId);
    if (!question) {
      return NextResponse.json({ error: 'Question introuvable.' }, { status: 404, headers: corsHeaders() });
    }

    const body = await request.json();
    if (body.estActive !== undefined) {
      question.EstActive = Boolean(body.estActive);
    }
    if (body.estArchivee !== undefined) {
      question.EstArchivee = Boolean(body.estArchivee);
    }
    const saved = await group3Repository.updateQuestion(question);

    await coreRepository.appendLog({
      utilisateurId: user.UtilisateurId,
      action: 'QUESTION_STATUT_MODIFIE',
      cible: `Question ${question.Code}`,
      details: `Statut actif=${question.EstActive}`,
      adresseIP: '127.0.0.1'
    });

    return NextResponse.json({ message: 'Statut mis à jour.', question: saved }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}
