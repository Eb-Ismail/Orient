import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../middleware/authMiddleware.js';
import { testService } from '../../../../services/testService.js';
import { mockStore } from '../../../../lib/db.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ADMIN', 'ELEVE']);
  if (response) return response;

  const testId = params.id;
  const data = await testService.getTestForStudent(testId, user.UtilisateurId);

  if (!data) {
    return NextResponse.json({ error: 'Évaluation introuvable.' }, { status: 404, headers: corsHeaders() });
  }

  return NextResponse.json(data, { headers: corsHeaders() });
}

export async function PUT(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  const testId = parseInt(params.id, 10);
  const test = mockStore.tests.find(t => t.TestId === testId);

  if (!test) {
    return NextResponse.json({ error: 'Test introuvable.' }, { status: 404, headers: corsHeaders() });
  }

  try {
    const body = await request.json();

    if (body.titre !== undefined) test.Titre = body.titre;
    if (body.description !== undefined) test.Description = body.description;
    if (body.dureeMinutes !== undefined) test.DureeMinutes = parseInt(body.dureeMinutes, 10);
    if (body.nombreQuestions !== undefined) test.NombreQuestions = parseInt(body.nombreQuestions, 10);
    if (body.categoriesIncluses !== undefined) test.CategoriesIncluses = body.categoriesIncluses;
    if (body.difficulteCible !== undefined) test.DifficulteCible = body.difficulteCible;
    if (body.autoriserRetour !== undefined) test.AutoriserRetour = Boolean(body.autoriserRetour);
    if (body.autoriserPause !== undefined) test.AutoriserPause = Boolean(body.autoriserPause);
    if (body.autoriserReprise !== undefined) test.AutoriserReprise = Boolean(body.autoriserReprise);
    if (body.nombreTentativesMax !== undefined) test.NombreTentativesMax = parseInt(body.nombreTentativesMax, 10);
    if (body.seuilReussite !== undefined) test.SeuilReussite = parseFloat(body.seuilReussite);
    if (body.selectionAleatoire !== undefined) test.SelectionAleatoire = Boolean(body.selectionAleatoire);
    if (body.estActif !== undefined) test.EstActif = Boolean(body.estActif);

    test.Version = (test.Version || 1) + 1;

    // Journal d'audit
    mockStore.logs.push({
      LogId: mockStore.logs.length + 1,
      UtilisateurId: user.UtilisateurId,
      Action: 'TEST_MODIFIE',
      Cible: `Test ${test.Code} (v${test.Version})`,
      Details: `Mise à jour des paramètres : Durée ${test.DureeMinutes}min, Reprise ${test.AutoriserReprise}, Seuil ${test.SeuilReussite}%.`,
      AdresseIP: '127.0.0.1',
      DateLog: new Date().toISOString()
    });

    return NextResponse.json({ message: 'Protocole de test mis à jour.', test }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}
