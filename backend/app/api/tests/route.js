import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../middleware/authMiddleware.js';
import { testService } from '../../../services/testService.js';
import { mockStore } from '../../../lib/db.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN', 'ELEVE']);
  if (response) return response;

  const allTests = await testService.getActiveTests();
  // Ne présenter que les 3 tests professionnels officiels
  const tests = allTests.filter(t => t.Code.startsWith('TEST-0'));

  // Si c'est un élève, attacher le statut de sa session pour chaque test
  const enrichedTests = tests.map(t => {
    const studentSessions = mockStore.sessions.filter(
      s => s.TestId === t.TestId && s.UtilisateurId === user.UtilisateurId
    );
    const session = studentSessions.slice().reverse().find(s => s.Statut === 'TERMINE') || studentSessions[studentSessions.length - 1];
    const questionsCount = mockStore.questions.filter(q => q.TestId === t.TestId && q.EstActive && !q.EstArchivee).length;

    return {
      ...t,
      questionsCount,
      sessionStatus: session ? session.Statut : 'NON_COMMENCE',
      sessionId: session ? session.SessionId : null,
      scorePourcentage: session ? session.ScorePourcentage : null
    };
  });

  return NextResponse.json({ tests: enrichedTests }, { headers: corsHeaders() });
}

export async function POST(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const body = await request.json();

    if (!body.titre || !body.code) {
      return NextResponse.json({ error: 'Le titre et le code sont obligatoires.' }, { status: 400, headers: corsHeaders() });
    }

    const existing = mockStore.tests.find(t => t.Code === body.code.toUpperCase());
    if (existing) {
      return NextResponse.json({ error: 'Un test avec ce code existe déjà.' }, { status: 400, headers: corsHeaders() });
    }

    const newTest = {
      TestId: mockStore.tests.length + 1,
      Code: body.code.toUpperCase(),
      Titre: body.titre,
      Description: body.description || '',
      DureeMinutes: body.dureeMinutes ? parseInt(body.dureeMinutes, 10) : 35,
      NombreQuestions: body.nombreQuestions ? parseInt(body.nombreQuestions, 10) : 10,
      CategoriesIncluses: body.categoriesIncluses || ['LOGIQUE', 'SITUATION'],
      DifficulteCible: body.difficulteCible || 'TOUS',
      AutoriserRetour: body.autoriserRetour !== undefined ? Boolean(body.autoriserRetour) : true,
      AutoriserPause: body.autoriserPause !== undefined ? Boolean(body.autoriserPause) : true,
      AutoriserReprise: body.autoriserReprise !== undefined ? Boolean(body.autoriserReprise) : true,
      NombreTentativesMax: body.nombreTentativesMax ? parseInt(body.nombreTentativesMax, 10) : 2,
      SeuilReussite: body.seuilReussite ? parseFloat(body.seuilReussite) : 60.0,
      SelectionAleatoire: Boolean(body.selectionAleatoire),
      SeedReproductible: true,
      Version: 1,
      EstActif: true,
      CreatedAt: new Date().toISOString()
    };

    mockStore.tests.push(newTest);

    mockStore.logs.push({
      LogId: mockStore.logs.length + 1,
      UtilisateurId: user.UtilisateurId,
      Action: 'TEST_CREE',
      Cible: `Test ${newTest.Code}`,
      Details: `Création du test d'orientation ${newTest.Titre} (${newTest.DureeMinutes} min).`,
      AdresseIP: '127.0.0.1',
      DateLog: new Date().toISOString()
    });

    return NextResponse.json(
      { message: 'Test créé avec succès.', test: newTest },
      { status: 201, headers: corsHeaders() }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}
