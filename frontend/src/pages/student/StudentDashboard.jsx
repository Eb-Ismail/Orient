// ==============================================================================
// ORIENT-GR — Tableau de Bord Élève Épuré & Minimaliste
// لوحة القيادة للتلميذ الدركي — واجهة مبسطة ومباشرة
// ==============================================================================

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { testService } from '../../services/testService.js';
import { workshopService } from '../../services/workshopService.js';
import { smartJourneyService } from '../../services/smartJourneyService.js';
import { simulationService } from '../../services/simulationService.js';
import {
  Award,
  BookOpen,
  Compass,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tests, setTests] = useState([]);
  const [workshopsData, setWorkshopsData] = useState(null);
  const [journeyData, setJourneyData] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  const studentId = user?.id || user?.UtilisateurId;

  useEffect(() => {
    let isMounted = true;

    const loadDashboardData = async () => {
      if (!studentId) return;

      try {
        setLoading(true);

        const [testsList, traineeWorkshops, journey, report] = await Promise.all([
          testService.getTests().catch(() => []),
          workshopService.getTraineeWorkshops(studentId).catch(() => null),
          smartJourneyService.getJourney().catch(() => null),
          simulationService.getOrientationReport(studentId).catch(() => null)
        ]);

        if (isMounted) {
          setTests(testsList || []);
          setWorkshopsData(traineeWorkshops || null);
          setJourneyData(journey || null);
          setReportData(report || null);
        }
      } catch (err) {
        console.error('[StudentDashboard] Erreur chargement données:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, [studentId]);

  // ==========================================================================
  // CALCULS & MÉTRIQUES (SECTION B : MES FORMATIONS)
  // ==========================================================================
  const formationsStats = useMemo(() => {
    const ateliers = workshopsData?.ateliers || [];
    const totalAssignes = workshopsData?.totalAssignes ?? ateliers.length;
    const terminees = workshopsData?.valides ?? ateliers.filter(a => a.Statut === 'VALIDE' || a.Statut === 'EVALUE').length;
    const enCours = workshopsData?.enCours ?? ateliers.filter(a => a.Statut === 'EN_COURS' || a.Statut === 'EN_ATTENTE_VALIDATION').length;

    const progression = totalAssignes > 0
      ? Math.round((terminees / totalAssignes) * 100)
      : 0;

    return {
      totalAssignes,
      terminees,
      enCours,
      progression
    };
  }, [workshopsData]);

  // ==========================================================================
  // CALCULS & MÉTRIQUES (SECTION C : MES ÉVALUATIONS & RÉSULTATS)
  // ==========================================================================
  const evaluationsStats = useMemo(() => {
    // 1. Moyenne des tests QCM
    const finishedTests = tests.filter(t => t.sessionStatus === 'TERMINE' && t.scorePourcentage !== null && t.scorePourcentage !== undefined);
    const moyenneQcmPct = finishedTests.length > 0
      ? Math.round(finishedTests.reduce((acc, t) => acc + (parseFloat(t.scorePourcentage) || 0), 0) / finishedTests.length)
      : null;
    const moyenneQcm20 = moyenneQcmPct !== null
      ? +(moyenneQcmPct * 0.2).toFixed(1)
      : null;

    // 2. Moyenne des ateliers pratiques
    const ateliers = workshopsData?.ateliers || [];
    const evaluatedAteliers = ateliers.filter(a => (a.Statut === 'VALIDE' || a.Statut === 'EVALUE') && a.ScoreObtenu !== null && a.ScoreObtenu !== undefined);
    
    let moyenneAteliers20 = workshopsData?.scoreMoyen20 ?? null;
    if (moyenneAteliers20 === null && evaluatedAteliers.length > 0) {
      const sum = evaluatedAteliers.reduce((acc, a) => acc + (parseFloat(a.ScoreObtenu) || 0), 0);
      moyenneAteliers20 = +(sum / evaluatedAteliers.length).toFixed(1);
    }
    const moyenneAteliersPct = workshopsData?.scoreMoyenPourcentage ?? (moyenneAteliers20 !== null ? Math.round(moyenneAteliers20 * 5) : null);

    // 3. Dernière évaluation obtenue (atelier)
    const derniereEvaluation = evaluatedAteliers.length > 0
      ? [...evaluatedAteliers].sort((a, b) => {
          const dateA = new Date(a.DateValidation || a.DateRealisation || 0).getTime();
          const dateB = new Date(b.DateValidation || b.DateRealisation || 0).getTime();
          return (dateB - dateA) || (b.AssignationId - a.AssignationId);
        })[0]
      : null;

    // 4. Dernier résultat de test
    const dernierTest = finishedTests.length > 0
      ? finishedTests[finishedTests.length - 1]
      : null;

    return {
      moyenneQcmPct,
      moyenneQcm20,
      moyenneAteliers20,
      moyenneAteliersPct,
      derniereEvaluation,
      dernierTest
    };
  }, [tests, workshopsData]);

  // ==========================================================================
  // CALCULS & MÉTRIQUES (SECTION D : MON PARCOURS & MON ORIENTATION)
  // ==========================================================================
  const parcoursOrientationStats = useMemo(() => {
    const conversation = journeyData?.conversation || [];
    const analysis = journeyData?.analysis || null;
    const isLocked = Boolean(journeyData?.orientationResultsLocked);

    // Progression du Parcours IA
    const messagesCount = conversation.length;
    const indiceConfiance = analysis?.indiceConfianceGlobal || null;

    let progressionTexte = "Parcours initialisé • Prêt pour l'entretien interactif.";
    if (analysis && indiceConfiance) {
      progressionTexte = `Diagnostic IA complété (${indiceConfiance}% de confiance globale).`;
    } else if (messagesCount > 1) {
      progressionTexte = `Entretien IA en cours (${messagesCount - 1} échanges enregistrés).`;
    }

    // Statut de mon orientation
    const topRecommended = reportData?.topRecommendedSpecialties?.[0] || null;
    const suggestedFiliere = topRecommended?.intituleFr || topRecommended?.intituleAr || analysis?.recommandations?.[0]?.filiere || null;
    const suggestedDesc = topRecommended?.whySuggestedFr || topRecommended?.whySuggestedAr || analysis?.recommandations?.[0]?.justification || null;

    let statutBadge = "En cours";
    if (isLocked) {
      statutBadge = "Examen Commission";
    } else if (suggestedFiliere) {
      statutBadge = "Orientation Détectée";
    }

    return {
      progressionTexte,
      indiceConfiance,
      suggestedFiliere,
      suggestedDesc,
      statutBadge,
      isLocked
    };
  }, [journeyData, reportData]);

  if (loading) {
    return <LoadingSpinner text="Chargement de votre espace personnel..." fullPage />;
  }

  return (
    <div className="space-y-6 animate-fade-slide pb-10">
      {/* ===================================================================== */}
      {/* SECTION A : EN-TÊTE DE BIENVENUE                                       */}
      {/* ===================================================================== */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-xs uppercase tracking-wider font-bold text-gendarmerie font-mono">
              Gendarmerie Royale • Espace Élève
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gendarmerie font-serif tracking-tight">
            Bonjour, {user?.prenom || 'Élève Gendarme'}
          </h1>
          <p className="text-sm text-slate-600">
            Portail de suivi de formation pratique, d'évaluations et d'orientation professionnelle.
          </p>
        </div>

        {/* Informations essentielles : Matricule, Promotion, Statut */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Matricule */}
          <div className="px-3.5 py-2 rounded-xl bg-cream-100 border border-slate-200 text-xs">
            <span className="text-slate-500 text-xs uppercase font-bold tracking-wider block">Matricule</span>
            <span className="font-mono font-bold text-sm text-gendarmerie mt-0.5 block">
              {user?.matricule || 'N/A'}
            </span>
          </div>

          {/* Promotion */}
          <div className="px-3.5 py-2 rounded-xl bg-cream-100 border border-slate-200 text-xs">
            <span className="text-slate-500 text-xs uppercase font-bold tracking-wider block">Promotion</span>
            <span className="font-bold text-slate-800 text-sm mt-0.5 block">
              {user?.promotionNom || user?.promotion || 'Promotion 54'}
            </span>
          </div>

          {/* Statut de formation */}
          <div className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
            <span className="text-emerald-800 text-xs uppercase font-bold tracking-wider block">Statut</span>
            <span className="font-bold text-sm text-emerald-900 flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              {user?.statutFormation || 'Formation Initiale'}
            </span>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* SECTIONS B, C, D : LES 3 CARTES PRINCIPALES DU DASHBOARD              */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* =================================================================== */}
        {/* SECTION B : MES FORMATIONS                                          */}
        {/* =================================================================== */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between hover:border-gold/60 transition-all">
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200/60">
                  <BookOpen className="w-5 h-5 text-gendarmerie" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gendarmerie font-serif">Mes formations</h2>
                  <p className="text-xs text-slate-500">Cursus pratique & ateliers</p>
                </div>
              </div>
              <span className="text-xs font-bold font-mono px-3 py-1 rounded-full bg-gold/15 text-gold-dark border border-gold/30">
                {formationsStats.progression}%
              </span>
            </div>

            {/* Progression globale */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-700 font-semibold">
                <span>Progression globale</span>
                <span className="font-mono font-bold text-gendarmerie">
                  {formationsStats.progression}%
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gold h-full transition-all duration-500 rounded-full"
                  style={{ width: `${formationsStats.progression}%` }}
                />
              </div>
            </div>

            {/* Compteurs En cours / Terminées */}
            <div className="grid grid-cols-2 gap-3.5 pt-1">
              <div className="p-3.5 rounded-xl bg-cream-50 border border-slate-200/80">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                  En cours
                </span>
                <p className="text-2xl font-bold text-amber-700 font-mono mt-1">
                  {formationsStats.enCours}
                </p>
                <span className="text-xs text-slate-500">ateliers actifs</span>
              </div>

              <div className="p-3.5 rounded-xl bg-cream-50 border border-slate-200/80">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                  Terminées
                </span>
                <p className="text-2xl font-bold text-emerald-800 font-mono mt-1">
                  {formationsStats.terminees}
                </p>
                <span className="text-xs text-slate-500">validées commission</span>
              </div>
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-slate-100">
            <Button
              variant="gold"
              size="md"
              fullWidth
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/eleve/guide')}
              className="text-sm font-bold shadow-xs cursor-pointer py-2.5"
            >
              Explorer le GUIDE
            </Button>
          </div>
        </div>

        {/* =================================================================== */}
        {/* SECTION C : MES ÉVALUATIONS ET RÉSULTATS                            */}
        {/* =================================================================== */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between hover:border-gold/60 transition-all">
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200/60">
                  <Award className="w-5 h-5 text-gendarmerie" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gendarmerie font-serif">Mes évaluations & résultats</h2>
                  <p className="text-xs text-slate-500">Performances théoriques et terrain</p>
                </div>
              </div>
            </div>

            {/* Les 4 indicateurs obligatoires */}
            <div className="grid grid-cols-2 gap-3">
              {/* 1. Moyenne des tests QCM */}
              <div className="p-3.5 rounded-xl bg-cream-50 border border-slate-200/80">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                  Moyenne QCM
                </span>
                <p className="text-xl font-bold text-gendarmerie font-mono mt-1">
                  {evaluationsStats.moyenneQcmPct !== null ? `${evaluationsStats.moyenneQcmPct}%` : '—'}
                </p>
                <span className="text-xs text-slate-500 font-medium">
                  {evaluationsStats.moyenneQcm20 !== null ? `${evaluationsStats.moyenneQcm20} / 20` : 'En attente'}
                </span>
              </div>

              {/* 2. Moyenne des ateliers pratiques */}
              <div className="p-3.5 rounded-xl bg-cream-50 border border-slate-200/80">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                  Moyenne Ateliers
                </span>
                <p className="text-xl font-bold text-gendarmerie font-mono mt-1">
                  {evaluationsStats.moyenneAteliers20 !== null ? `${evaluationsStats.moyenneAteliers20} / 20` : '—'}
                </p>
                <span className="text-xs text-emerald-800 font-medium">
                  {evaluationsStats.moyenneAteliersPct !== null ? `${evaluationsStats.moyenneAteliersPct}% réussite` : 'En attente'}
                </span>
              </div>

              {/* 3. Dernière évaluation obtenue */}
              <div className="p-3.5 rounded-xl bg-cream-50 border border-slate-200/80 col-span-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                    Dernière évaluation atelier
                  </span>
                  {evaluationsStats.derniereEvaluation && (
                    <span className="font-mono font-bold text-emerald-800 text-sm">
                      {evaluationsStats.derniereEvaluation.ScoreObtenu} / {evaluationsStats.derniereEvaluation.ScoreTotalMax || 20}
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold text-slate-900 mt-1 truncate">
                  {evaluationsStats.derniereEvaluation
                    ? (evaluationsStats.derniereEvaluation.Atelier?.Titre || 'Atelier pratique évalué')
                    : 'Aucune évaluation enregistrée'}
                </p>
                <span className="text-xs text-slate-500 block mt-0.5">
                  {evaluationsStats.derniereEvaluation?.Mention
                    ? `Mention : ${evaluationsStats.derniereEvaluation.Mention}`
                    : 'Ateliers au programme de formation'}
                </span>
              </div>

              {/* 4. Dernier résultat de test */}
              <div className="p-3.5 rounded-xl bg-cream-50 border border-slate-200/80 col-span-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                    Dernier résultat QCM
                  </span>
                  {evaluationsStats.dernierTest && (
                    <span className="font-mono font-bold text-gendarmerie text-sm">
                      {evaluationsStats.dernierTest.scorePourcentage}% ({((evaluationsStats.dernierTest.scorePourcentage * 0.2).toFixed(1))} / 20)
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold text-slate-900 mt-1 truncate">
                  {evaluationsStats.dernierTest
                    ? (evaluationsStats.dernierTest.TitreFr || evaluationsStats.dernierTest.Titre)
                    : 'Aucun test complété'}
                </p>
                <span className="text-xs text-slate-500 block mt-0.5">
                  {evaluationsStats.dernierTest ? 'Épreuve théorique validée' : '3 tests QCM officiels'}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-slate-100">
            <Button
              variant="outline"
              size="md"
              fullWidth
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/eleve/resultats')}
              className="text-sm font-bold cursor-pointer py-2.5"
            >
              Consulter mes résultats
            </Button>
          </div>
        </div>

        {/* =================================================================== */}
        {/* SECTION D : MON PARCOURS ET MON ORIENTATION                         */}
        {/* =================================================================== */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between hover:border-gold/60 transition-all">
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-200/60">
                  <Compass className="w-5 h-5 text-gendarmerie" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gendarmerie font-serif">Mon parcours & orientation</h2>
                  <p className="text-xs text-slate-500">Talent Radar & filières Gendarmerie</p>
                </div>
              </div>
              <span className="text-xs font-bold font-mono px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                {parcoursOrientationStats.statutBadge}
              </span>
            </div>

            {/* Progression du Parcours IA */}
            <div className="p-4 rounded-xl bg-cream-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Progression Parcours IA
                </span>
                {parcoursOrientationStats.indiceConfiance && (
                  <span className="text-xs font-bold font-mono text-gendarmerie bg-gold/15 px-2 py-0.5 rounded-full border border-gold/30">
                    {parcoursOrientationStats.indiceConfiance}% confiance
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-800 leading-relaxed font-medium">
                {parcoursOrientationStats.progressionTexte}
              </p>
            </div>

            {/* Statut de mon orientation */}
            <div className="p-4 rounded-xl bg-cream-50 border border-slate-200/80 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                Statut de l'orientation
              </span>
              {parcoursOrientationStats.suggestedFiliere ? (
                <div>
                  <p className="text-sm font-bold text-gendarmerie flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold shrink-0" />
                    <span>Filière : {parcoursOrientationStats.suggestedFiliere}</span>
                  </p>
                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                    {parcoursOrientationStats.suggestedDesc || 'Orientation recommandée à partir de vos évaluations pratiques et de votre profil.'}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-slate-600 leading-relaxed">
                  Parcours en cours — Échangez avec l'assistant IA pour affiner vos compétences et identifier votre filière optimale.
                </p>
              )}
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-slate-100">
            <Button
              variant="primary"
              size="md"
              fullWidth
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/eleve/parcours-intelligent')}
              className="text-sm font-bold shadow-xs cursor-pointer py-2.5 bg-[#153B2B] hover:bg-[#1A4533]"
            >
              Continuer mon Parcours IA
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
