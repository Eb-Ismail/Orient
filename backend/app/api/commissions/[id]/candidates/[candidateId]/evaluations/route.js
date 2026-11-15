import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../../../middleware/authMiddleware.js';
import { commissionRepository } from '../../../../../../../repositories/commissionRepository.js';
import { coreRepository } from '../../../../../../../repositories/coreRepository.js';
import { journeyAndTalentRepository } from '../../../../../../../repositories/journeyAndTalentRepository.js';
import { commissionEvaluationService } from '../../../../../../../services/commissionEvaluationService.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request, { params }) {
  const { user, response } = await authenticateRequest(request, ['ADMIN', 'COMMISSION']);
  if (response) return response;

  try {
    const resolvedParams = await params;
    const commissionId = parseInt(resolvedParams?.id, 10);
    const candidateId = parseInt(resolvedParams?.candidateId, 10);
    const userId = user.UtilisateurId ?? user.id;
    const userRole = user.Role ?? user.role;

    if (!commissionId || !candidateId) {
      return NextResponse.json({ error: 'Identifiants invalides.' }, { status: 400, headers: corsHeaders() });
    }

    // Contrôle Anti-IDOR pour COMMISSION
    if (userRole === 'COMMISSION') {
      const isMember = await commissionRepository.isUserMemberOfCommission(userId, commissionId);
      if (!isMember) {
        return NextResponse.json({
          error: "Accès refusé. Vous n'avez pas l'autorisation d'évaluer dans cette commission.",
          code: 'FORBIDDEN_COMMISSION'
        }, { status: 403, headers: corsHeaders() });
      }
    }

    const body = await request.json();
    const {
      assignmentId,
      notePratiqueSur20,
      noteEntretienSur20,
      noteComplementaireSur20,
      observations,
      commentairesComplementaires,
      pointsForts,
      axesAmelioration,
      avisCommission,
      statutEvaluation,
      nomEvaluateur
    } = body;

    if (!assignmentId) {
      return NextResponse.json({ error: "L'identifiant d'affectation (assignmentId) est obligatoire." }, { status: 400, headers: corsHeaders() });
    }

    // Validation des notes
    const validateNote = (val, name) => {
      if (val !== null && val !== undefined && val !== '') {
        const num = parseFloat(val);
        if (isNaN(num) || num < 0 || num > 20) {
          throw new Error(`La note ${name} doit être comprise entre 0 et 20.`);
        }
        return num;
      }
      return null;
    };

    const cleanPrat = validateNote(notePratiqueSur20, 'pratique');
    const cleanEnt = validateNote(noteEntretienSur20, 'entretien');
    const cleanComp = validateNote(noteComplementaireSur20, 'complémentaire');

    const isSubmitting = statutEvaluation === 'SOUMISE' || statutEvaluation === 'VALIDEE';

    // Règle d'or : En cas de soumission officielle, les notes pratique et entretien sont obligatoires
    if (isSubmitting) {
      if (cleanPrat === null || cleanEnt === null) {
        return NextResponse.json({
          error: "ÉVALUATION INCOMPLÈTE : Les notes du test pratique et de l'entretien présentiel (/20) sont obligatoires.",
          code: 'EVALUATION_INCOMPLETE'
        }, { status: 400, headers: corsHeaders() });
      }
    }

    // Récupérer le candidat et la commission pour l'analyse IA
    const candidate = await coreRepository.findActiveUserById(candidateId);
    const commission = await commissionRepository.getCommissionById(commissionId);
    const journey = await journeyAndTalentRepository.getOrCreateJourney(candidateId);

    // Nom de l'évaluateur connecté
    const evalName = nomEvaluateur || `${user.Prenom || ''} ${user.Nom || ''}`.trim() || 'Évaluateur Commission';

    let aiAnalysis = null;
    if (isSubmitting) {
      aiAnalysis = commissionEvaluationService.performPostEvaluationAiAnalysis({
        candidate,
        journey,
        commission,
        notePratique: cleanPrat,
        noteEntretien: cleanEnt,
        noteComplementaire: cleanComp,
        observations: observations?.trim() || null,
        commentairesComplementaires: commentairesComplementaires?.trim() || null,
        avisCommission: avisCommission || 'RESERVE'
      });
    }

    const result = await commissionRepository.saveCommissionEvaluation({
      assignmentId,
      candidateId,
      commissionId,
      evaluateurId: userId,
      nomEvaluateur: evalName,
      notePratiqueSur20: cleanPrat,
      noteEntretienSur20: cleanEnt,
      noteComplementaireSur20: cleanComp,
      observations: observations?.trim() || null,
      commentairesComplementaires: commentairesComplementaires?.trim() || null,
      pointsForts: Array.isArray(pointsForts) ? pointsForts : [],
      axesAmelioration: Array.isArray(axesAmelioration) ? axesAmelioration : [],
      avisCommission: avisCommission || 'RESERVE',
      statutEvaluation: statutEvaluation || 'BROUILLON',
      recommandationIA: aiAnalysis?.recommandationIA || null,
      resumeAnalyseIA: aiAnalysis?.resumeAnalyseIA || null,
      justificationIA: aiAnalysis?.justificationIA || null,
      pointsFortsIA: aiAnalysis?.pointsForts || [],
      pointsFaiblesIA: aiAnalysis?.pointsFaibles || [],
      notesPrisesEnCompte: aiAnalysis?.notesPrisesEnCompte || null,
      observationsPrisesEnCompte: aiAnalysis?.observationsPrisesEnCompte || null,
      dateAnalyseIA: aiAnalysis?.dateAnalyseIA || null,
      modeleIAVersion: aiAnalysis?.modeleIAVersion || 'v1.0-2026',
      estTransmisAdmin: aiAnalysis?.estTransmisAdmin || false,
      dateTransmissionAdmin: aiAnalysis?.estTransmisAdmin ? new Date() : null
    });

    let returnMessage = "Brouillon d'évaluation enregistré avec succès.";
    if (isSubmitting) {
      if (aiAnalysis?.recommandationIA === 'POSITIF') {
        returnMessage = "Évaluation soumise et verrouillée. Recommandation IA POSITIVE : Dossier transmis automatiquement à la session ADMIN.";
      } else {
        returnMessage = "Évaluation soumise et verrouillée. Recommandation IA NÉGATIVE : Dossier conservé au sein de votre commission (non transmis à l'administration).";
      }
    }

    return NextResponse.json({
      success: true,
      message: returnMessage,
      ...result,
      aiAnalysis
    }, { headers: corsHeaders() });
  } catch (err) {
    console.error('[API /api/commissions/:id/candidates/:candidateId/evaluations] Erreur:', err);
    return NextResponse.json({ error: err.message }, { status: 400, headers: corsHeaders() });
  }
}
