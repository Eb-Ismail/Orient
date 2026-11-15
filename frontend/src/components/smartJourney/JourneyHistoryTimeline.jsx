import React, { useState } from 'react';
import {
  History,
  Clock,
  Calendar,
  CheckCircle2,
  FileCheck,
  Compass,
  ArrowRight,
  Eye,
  Info,
  Layers,
  ChevronRight,
  Shield,
  MessageSquare,
  Award,
  Milestone,
  Check,
  AlertCircle
} from 'lucide-react';

export default function JourneyHistoryTimeline({
  historyData,
  currentJourney,
  onLoadSnapshot
}) {
  const [selectedSnapshot, setSelectedSnapshot] = useState(null);

  const snapshots = historyData?.snapshots || [];
  const currentVersion = historyData?.currentVersion || currentJourney?.version || 1;
  const conversation = currentJourney?.conversation || [];
  const analysis = currentJourney?.analysis || null;
  const competencesVerifiees = analysis?.competencesVerifiees || [];
  const competencesDeclarees = analysis?.competencesDeclarees || [];
  const recommendations = analysis?.recommendations || analysis?.specialitesRecommandees || [];

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  // Dates et statuts réels
  const lastInterviewMsg = conversation.length > 0 ? conversation[conversation.length - 1] : null;
  const interviewDate = lastInterviewMsg?.timestamp ? formatDate(lastInterviewMsg.timestamp) : formatDate(currentJourney?.lastUpdated);
  const interviewStatus = conversation.length > 1 ? 'Réalisé' : 'En cours';

  const analysisDate = analysis?.dateAnalyse ? formatDate(analysis.dateAnalyse) : (conversation.length > 1 ? interviewDate : 'En attente');
  const analysisStatus = analysis ? 'Analysé' : (conversation.length > 1 ? 'En cours' : 'En attente');

  const evalDate = competencesVerifiees.length > 0 && competencesVerifiees[0]?.dateValidation
    ? competencesVerifiees[0].dateValidation
    : analysisDate;
  const evalStatus = competencesVerifiees.length > 0 ? 'Évalué' : 'En cours d\'évaluation';

  const orientationDate = recommendations.length > 0 ? analysisDate : 'Prochainement';
  const orientationStatus = recommendations.length > 0 ? 'Orientation proposée' : 'En délibération';

  // 5 Étapes chronologiques claires
  const steps = [
    {
      num: 1,
      title: 'Entretien Réalisé',
      status: interviewStatus,
      isCompleted: conversation.length > 1,
      isCurrent: conversation.length <= 1,
      date: interviewDate,
      desc: 'Échange avec votre conseiller d’orientation sur votre parcours personnel, scolaire et vos motivations militaires.',
      badge: conversation.length > 1 ? 'Complété' : 'En cours',
      detail: `${conversation.length} message(s) d’échange enregistrés`
    },
    {
      num: 2,
      title: 'Profil Analysé',
      status: analysisStatus,
      isCompleted: !!analysis,
      isCurrent: !analysis && conversation.length > 1,
      date: analysisDate,
      desc: 'Synthèse de vos déclarations et cartographie de vos aptitudes fondamentales.',
      badge: analysis ? 'Analysé' : 'En attente',
      detail: analysis ? 'Cartographie des aptitudes établie' : 'En attente d’échanges complémentaires'
    },
    {
      num: 3,
      title: 'Compétences Évaluées',
      status: evalStatus,
      isCompleted: competencesVerifiees.length > 0,
      isCurrent: !competencesVerifiees.length && !!analysis,
      date: evalDate,
      desc: 'Validation sur le terrain lors des tests d’aptitude et ateliers pratiques officiels.',
      badge: competencesVerifiees.length > 0 ? 'Validé en atelier' : 'En cours',
      detail: `${competencesVerifiees.length} compétence(s) vérifiée(s) en pratique • ${competencesDeclarees.length} déclarée(s)`
    },
    {
      num: 4,
      title: 'Orientation Proposée',
      status: orientationStatus,
      isCompleted: recommendations.length > 0,
      isCurrent: !recommendations.length && competencesVerifiees.length > 0,
      date: orientationDate,
      desc: 'Filières de spécialité recommandées en adéquation avec vos points forts et votre profil.',
      badge: recommendations.length > 0 ? 'Disponible' : 'En délibération',
      detail: recommendations.length > 0 ? `${recommendations.length} spécialité(s) recommandée(s)` : 'En attente de consolidation'
    },
    {
      num: 5,
      title: 'Étapes Restantes',
      status: 'À venir',
      isCompleted: false,
      isCurrent: false,
      date: 'Calendrier académique officiel',
      desc: 'Ateliers pratiques de perfectionnement et entretien final devant la Commission Spécialisée.',
      badge: 'Prochaine étape',
      detail: 'Préparation aux délibérations finales de la Gendarmerie Royale'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* ========================================================================= */}
      {/* EN-TÊTE : MON PARCOURS */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#153B2B] text-gold border border-gold/30 flex items-center gap-1.5">
                <Milestone className="w-3.5 h-3.5 text-gold" />
                Suivi Pédagogique Officiel
              </span>
              <span className="text-xs text-slate-500">
                Dernière activité : <strong>{interviewDate}</strong>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 tracking-tight">
              Mon Parcours d'Orientation
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Visualisez clairement votre progression étape par étape au sein de l’Académie, depuis votre premier entretien jusqu’à la proposition d’affectation en unité.
            </p>
          </div>

          <div className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-left sm:text-right shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Progression</span>
            <span className="text-sm font-bold text-[#153B2B]">
              Étape {steps.filter(s => s.isCompleted).length} sur 5
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CHRONOLOGIE DES 5 ÉTAPES DU PARCOURS */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#153B2B]" />
            <span>Chronologie de mon dossier d'orientation</span>
          </h3>
          <span className="text-xs font-semibold text-slate-500">
            Dates & statuts certifiés
          </span>
        </div>

        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
          {steps.map((step) => {
            const isCompleted = step.isCompleted;
            const isCurrent = step.isCurrent;

            return (
              <div key={step.num} className="relative group">
                {/* Pastille indicatrice */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                    isCompleted
                      ? 'bg-[#153B2B] text-white ring-4 ring-[#153B2B]/10'
                      : isCurrent
                      ? 'bg-[#C9A052] text-white ring-4 ring-gold/20 animate-pulse'
                      : 'bg-white border-2 border-slate-300 text-slate-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : step.num}
                </div>

                {/* Contenu de l'étape */}
                <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  isCompleted
                    ? 'bg-emerald-50/20 border-emerald-200/80 hover:border-emerald-300'
                    : isCurrent
                    ? 'bg-amber-50/30 border-amber-300 shadow-xs'
                    : 'bg-slate-50/50 border-slate-200/80 opacity-90'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h4 className="font-bold text-sm sm:text-base text-slate-900">
                        {step.num}. {step.title}
                      </h4>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : isCurrent
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {step.status}
                      </span>
                    </div>

                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1 shrink-0">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {step.date}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-2.5">
                    {step.desc}
                  </p>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-[#153B2B]" />
                      {step.detail}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* HISTORIQUE DES VERSIONS & INSTANTANÉS (CONSERVE TOUTE LA TRAÇABILITÉ) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <History className="w-4 h-4 text-[#153B2B]" />
              <span>Historique des Mises à Jour de Mon Dossier</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Toutes vos étapes précédentes restent sauvegardées et consultables en toute sécurité.
            </p>
          </div>
          <span className="text-xs font-bold text-[#153B2B] bg-[#153B2B]/10 px-3 py-1 rounded-lg">
            {snapshots.length + 1} mise(s) à jour
          </span>
        </div>

        {snapshots.length === 0 ? (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
            Votre dossier est dans sa version initiale. À chaque nouvelle expérience enregistrée ou validation d’atelier, un instantané historique est automatiquement archivé.
          </div>
        ) : (
          <div className="space-y-3">
            {snapshots.map((snap, index) => {
              const isSelected = selectedSnapshot?.id === snap.id;

              return (
                <div
                  key={snap.id || index}
                  className={`rounded-xl border transition-all overflow-hidden ${
                    isSelected ? 'border-[#153B2B] bg-slate-50/70 shadow-xs' : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="p-3.5 sm:p-4 flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-slate-900">
                          Mise à jour du {formatDate(snap.savedAt)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {snap.bioSnippet ? `« ${snap.bioSnippet} »` : 'Échanges enregistrés lors de votre parcours d\'orientation.'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedSnapshot(isSelected ? null : snap)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>{isSelected ? 'Masquer' : 'Consulter'}</span>
                    </button>
                  </div>

                  {isSelected && (
                    <div className="px-4 pb-4 pt-1 border-t border-slate-200 text-xs space-y-2 bg-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Extrait archivé :
                      </span>
                      <p className="leading-relaxed italic text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        {snap.bioSnippet || 'Récit initial en cours de rédaction.'}
                      </p>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                        <span>Horodatage : {snap.savedAt}</span>
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Données archivées en sécurité
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
