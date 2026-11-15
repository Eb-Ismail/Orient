import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../middleware/authMiddleware.js';
import { group3Repository } from '../../../repositories/group3Repository.js';
import { coreRepository } from '../../../repositories/coreRepository.js';
import { validateQuestion } from '../../../validators/index.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const url = new URL(request.url);
    const domaineCode = url.searchParams.get('domaine');
    const difficulte = url.searchParams.get('difficulte');
    const specialite = url.searchParams.get('specialite');
    const includeArchived = url.searchParams.get('includeArchived') === 'true';

    const [allQuestions, { specialites, domaines }] = await Promise.all([
      group3Repository.getQuestions(includeArchived),
      coreRepository.getSpecialtiesAndDomains()
    ]);

    let questions = [...allQuestions];
    if (!includeArchived) {
      questions = questions.filter(q => !q.EstArchivee);
    }
    if (domaineCode) {
      questions = questions.filter(q =>
        q.DomaineCode === domaineCode ||
        q.DomaineNom === domaineCode ||
        q.DomaineIntitule === domaineCode ||
        String(q.DomaineId) === domaineCode
      );
    }
    if (difficulte) {
      questions = questions.filter(q =>
        q.Difficulte === difficulte ||
        q.DifficulteCode === difficulte ||
        q.DifficulteLabel === difficulte ||
        q.DifficulteArabe === difficulte
      );
    }
    if (specialite) {
      questions = questions.filter(q => {
        const inAssociees = Array.isArray(q.SpecialitesAssociees) && q.SpecialitesAssociees.includes(specialite);
        const inPonderation = Array.isArray(q.SpecialitesPonderation) && q.SpecialitesPonderation.some(s => s.code === specialite || s.specialite === specialite);
        return inAssociees || inPonderation;
      });
    }

    return NextResponse.json({
      questions,
      domaines,
      specialites: specialites.map(s => ({ Code: s.Code, Intitule: s.Intitule }))
    }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

export async function POST(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const body = await request.json();
    const validation = validateQuestion(body);

    if (!validation.isValid) {
      return NextResponse.json({ error: 'Question invalide.', details: validation.errors }, { status: 400, headers: corsHeaders() });
    }

    const { domaines } = await coreRepository.getSpecialtiesAndDomains();
    const domain = domaines.find(d => d.Code === body.domaineCode || d.DomaineId === parseInt(body.domaineId, 10));

    const isSubjective = body.typeQuestion === 'QUESTION_SUBJECTIVE';
    const existingQs = await group3Repository.getQuestions(true);

    const newQuestion = await group3Repository.createQuestion({
      QuestionId: existingQs.length + 1,
      TestId: body.testId ? parseInt(body.testId, 10) : 1,
      DomaineId: domain ? domain.DomaineId : 1,
      DomaineCode: domain ? domain.Code : 'LOGIQUE',
      DomaineIntitule: domain ? domain.Intitule : 'Raisonnement Logique',
      Code: body.code || `Q-GEN-${String(existingQs.length + 1).padStart(2, '0')}`,
      Enonce: body.enonce,
      ContexteSituationnel: body.contexteSituationnel || null,
      TypeQuestion: body.typeQuestion || 'QCM_UNIQUE',
      Difficulte: body.difficulte || 'MOYEN',
      Points: body.points ? parseInt(body.points, 10) : 1,
      TempsLimiteSecondes: body.tempsLimiteSecondes ? parseInt(body.tempsLimiteSecondes, 10) : null,
      SchemaSVG: body.schemaSvg || null,
      Explication: body.explication || '',
      CompetencesAssociees: body.competencesAssociees || [],
      SpecialitesAssociees: body.specialitesAssociees || [],
      BaremeSubjectif: isSubjective ? (body.baremeSubjectif || null) : null,
      OrdreAffichage: existingQs.length + 1,
      EstActive: body.estActive !== undefined ? Boolean(body.estActive) : true,
      EstArchivee: false,
      Version: 1,
      Options: isSubjective ? [] : (body.options || []).map((opt, idx) => ({
        OptionId: 100 + existingQs.length * 10 + idx,
        LettreOption: String.fromCharCode(65 + idx),
        EnonceOption: opt.enonce || opt.EnonceOption,
        SchemaSVG: opt.schemaSvg || null,
        EstCorrecte: Boolean(opt.estCorrecte || opt.EstCorrecte)
      }))
    });

    await coreRepository.appendLog({
      utilisateurId: user.UtilisateurId,
      action: 'QUESTION_CREEE',
      cible: `Question ${newQuestion.Code}`,
      details: `Création item (${newQuestion.TypeQuestion}, ${newQuestion.Difficulte}) pour domaine ${newQuestion.DomaineCode}.`,
      adresseIP: '127.0.0.1'
    });

    return NextResponse.json(
      { message: 'Question ajoutée à la banque nationale.', question: newQuestion },
      { status: 201, headers: corsHeaders() }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}
