import React from 'react';
import {
  Award,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  Target,
  CheckCircle2,
  RefreshCw,
  FileCheck,
  BookOpen,
  Info,
  Calendar,
  Compass,
  Zap,
  Activity
} from 'lucide-react';

export default function CompetencyAnalysisView({
  analysis,
  onTriggerAnalysis,
  loading = false,
  onGoToSpecialties,
  onGoToWriter
}) {
  if (!analysis) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-4">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
          <Sparkles className="w-7 h-7" />
        </div>
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-bold text-slate-800">Aucune analyse générée pour le moment</h3>
          <p className="text-xs text-slate-500 mt-1">
            Rédigez quelques lignes sur votre parcours ou échangez avec le Conseiller IA pour générer votre cartographie des compétences.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {onGoToWriter && (
            <button
              type="button"
              onClick={onGoToWriter}
              className="px-4 py-2 rounded-xl bg-[#153B2B] hover:bg-[#1C4E39] text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-gold" />
              <span>Rédiger mon parcours</span>
            </button>
          )}
          <button
            type="button"
            onClick={onTriggerAnalysis}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-gold/20 hover:bg-gold/30 text-gold-darker border border-gold/40 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin text-gold" /> : <Sparkles className="w-4 h-4 text-gold" />}
            <span>Lancer l'analyse automatique</span>
          </button>
        </div>
      </div>
    );
  }

  const {
    statutProfil = 'COMPLET_EVOLUTIF',
    indiceConfianceGlobal = 85,
    competencesDeclarees = [],
    competencesVerifiees = [],
    dimensions = {},
    pointsFortsPotentiels = [],
    competencesADevelopper = [],
    dateAnalyse,
    avisCommissionAvertissement
  } = analysis;

  const formattedDate = dateAnalyse
    ? new Date(dateAnalyse).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : 'Aujourd\'hui';

  return (
    <div className="space-y-6">
      {/* Synthèse du Profil & Indicateur Global */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-gold/10 to-transparent pointer-events-none -mr-16 -mt-16" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#153B2B] text-gold border border-gold/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                Profil Intelligent Évolutif
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Analysé le {formattedDate}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 tracking-tight">
              Cartographie des Compétences & Diagnostic de Potentiel
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Consolidation croisée entre les aptitudes déclarées par l'élève dans son récit de vie et les compétences certifiées en ateliers pratiques sur la plateforme.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onTriggerAnalysis}
              disabled={loading}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-all border border-slate-200 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
              <span>Actualiser le diagnostic</span>
            </button>

            {onGoToSpecialties && (
              <button
                type="button"
                onClick={onGoToSpecialties}
                className="px-4 py-2 rounded-xl bg-[#153B2B] hover:bg-[#1C4E39] text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-xs cursor-pointer border border-[#1C4E39]"
              >
                <Compass className="w-3.5 h-3.5 text-gold" />
                <span>Voir les spécialités recommandées</span>
              </button>
            )}
          </div>
        </div>

        {/* 4 Piliers Fondamentaux */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-5">
          <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
              <span className="font-medium">Capacité d'Analyse</span>
              <span className="font-bold text-[#153B2B]">{dimensions.capaciteAnalyse || 85}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#153B2B] h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${dimensions.capaciteAnalyse || 85}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1.5">Logique, diagnostic & investigation</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
              <span className="font-medium">Responsabilité</span>
              <span className="font-bold text-[#153B2B]">{dimensions.organisationResponsabilite || 88}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#153B2B] h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${dimensions.organisationResponsabilite || 88}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1.5">Rigueur militaire & autonomie</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
              <span className="font-medium">Travail d'Équipe</span>
              <span className="font-bold text-[#153B2B]">{dimensions.communicationEquipe || 91}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#153B2B] h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${dimensions.communicationEquipe || 91}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1.5">Esprit de corps & communication</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
              <span className="font-medium">Terrain & Physique</span>
              <span className="font-bold text-[#C9A052]">{dimensions.aptitudeTerrainPhysique || 82}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#C9A052] h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${dimensions.aptitudeTerrainPhysique || 82}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1.5">Endurance, combat & réactivité</p>
          </div>
        </div>
      </div>

      {/* RÈGLE MAJEURE DU CAHIER DES CHARGES :
          DISTINCTION VISUELLE FORMELLE ENTRE COMPÉTENCES DÉCLARÉES ET COMPÉTENCES VÉRIFIÉES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* SECTION 1 : COMPÉTENCES RÉELLEMENT VÉRIFIÉES */}
        <div className="bg-white rounded-2xl border-2 border-emerald-500/30 p-5 sm:p-6 shadow-xs relative">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-slate-900">Compétences Vérifiées</h3>
                  <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full">
                    Certifié Officiel
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500">
                  Évaluées et notées en conditions réelles par les commissions spécialisées et tests
                </p>
              </div>
            </div>
            <span className="px-3 py-1 text-xs font-extrabold bg-[#153B2B] text-gold rounded-lg border border-gold/30">
              {competencesVerifiees.length} Validées
            </span>
          </div>

          <div className="space-y-3">
            {competencesVerifiees.map((item, idx) => (
              <div
                key={item.id || idx}
                className="p-3.5 rounded-xl bg-emerald-50/40 border border-emerald-200/80 hover:border-emerald-300 transition-all space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{item.intitule}</h4>
                      <p className="text-xs text-slate-600 flex items-center gap-1.5 mt-0.5">
                        <FileCheck className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Source : <strong>{item.sourceEvaluation}</strong></span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="px-2.5 py-1 text-xs font-black bg-white text-emerald-800 border border-emerald-300 rounded-md shadow-2xs font-mono">
                      {item.noteObtenue}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-emerald-100/80 text-xs text-slate-500">
                  <span className="font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                    Niveau : {item.niveauMaitrise}
                  </span>
                  {item.dateValidation && (
                    <span>Validé le {item.dateValidation}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/60 flex items-center gap-2.5 text-xs sm:text-sm text-emerald-900">
            <Info className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              Ces compétences font foi pour le dossier de sélection aux unités spécialisées de la Gendarmerie Royale.
            </span>
          </div>
        </div>

        {/* SECTION 2 : COMPÉTENCES DÉCLARÉES */}
        <div className="bg-white rounded-2xl border-2 border-amber-400/40 p-5 sm:p-6 shadow-xs relative">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-slate-900">Compétences Déclarées</h3>
                  <span className="px-2.5 py-0.5 text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 rounded-full">
                    Auto-évaluation
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500">
                  Issues du récit de vie, des diplômes déclarés et de l'entretien IA
                </p>
              </div>
            </div>
            <span className="px-3 py-1 text-xs font-bold bg-amber-100 text-amber-900 rounded-lg border border-amber-300">
              {competencesDeclarees.length} Détectées
            </span>
          </div>

          <div className="space-y-3">
            {competencesDeclarees.map((item, idx) => (
              <div
                key={item.id || idx}
                className="p-3.5 rounded-xl bg-amber-50/40 border border-amber-200/80 hover:border-amber-300 transition-all space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.intitule}</h4>
                    {item.intituleAr && (
                      <p className="text-xs text-amber-800 font-sans mt-0.5" dir="rtl">
                        {item.intituleAr}
                      </p>
                    )}
                  </div>
                  <span className="px-2.5 py-0.5 text-xs font-semibold bg-amber-100 text-amber-800 rounded border border-amber-200 shrink-0">
                    {item.niveauDeclare}
                  </span>
                </div>

                {item.motsClesDetectes && item.motsClesDetectes.length > 0 && (
                  <div className="flex flex-wrap gap-1 items-center pt-1">
                    <span className="text-xs text-slate-500">Indices textuels :</span>
                    {item.motsClesDetectes.map((mot, mi) => (
                      <span
                        key={mi}
                        className="px-2 py-0.5 text-xs bg-white text-slate-700 border border-slate-200 rounded"
                      >
                        {mot}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-1 border-t border-amber-200/50 text-xs">
                  <span className="text-amber-800 font-medium">Statut : Non encore validé en atelier</span>
                  <span className="text-slate-500">Confiance IA : {item.confianceDetection || 80}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-center gap-2.5 text-xs sm:text-sm text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Attention déontologique :</strong> Ces éléments déclarés nécessitent une validation pratique lors des prochains ateliers pour être certifiés officiellement.
            </span>
          </div>
        </div>

      </div>

      {/* Points Forts & Compétences à Développer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Points forts */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-sm sm:text-base border-b border-slate-100 pb-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3>Points Forts Observés & Potentiels</h3>
          </div>
          <div className="space-y-2.5">
            {pointsFortsPotentiels.map((pf, i) => (
              <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{pf}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Compétences à développer */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-sm sm:text-base border-b border-slate-100 pb-3">
            <div className="w-7 h-7 rounded-lg bg-gold/20 text-[#153B2B] flex items-center justify-center">
              <Target className="w-4 h-4 text-gold-darker" />
            </div>
            <h3>Axes de Perfectionnement Prioritaires</h3>
          </div>
          <div className="space-y-2.5">
            {competencesADevelopper.map((cad, i) => (
              <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                <Zap className="w-4 h-4 text-gold-darker shrink-0 mt-0.5" />
                <span className="leading-relaxed">{cad}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Avertissement & Notice Officielle */}
      {avisCommissionAvertissement && (
        <div className="p-4 rounded-xl bg-slate-100 border border-slate-200/90 text-xs text-slate-600 flex items-start gap-3">
          <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Cadre Institutionnel :</strong> {avisCommissionAvertissement}
          </p>
        </div>
      )}
    </div>
  );
}

