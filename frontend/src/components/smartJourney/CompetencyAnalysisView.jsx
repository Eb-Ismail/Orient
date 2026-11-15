import React from 'react';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Target,
  RefreshCw,
  FileCheck,
  Compass,
  ArrowRight,
  Calendar,
  Layers,
  ChevronRight,
  BookOpen,
  HelpCircle,
  Clock
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
      <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-4 shadow-xs">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#153B2B]/10 border border-[#153B2B]/20 flex items-center justify-center text-[#153B2B]">
          <Award className="w-7 h-7 text-[#153B2B]" />
        </div>
        <div className="max-w-md mx-auto space-y-1">
          <h3 className="text-lg font-bold text-slate-800">Votre profil est en cours de constitution</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Échangez avec votre conseiller d'orientation ou complétez vos ateliers pratiques pour faire apparaître vos compétences et les spécialités qui vous correspondent.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {onGoToWriter && (
            <button
              type="button"
              onClick={onGoToWriter}
              className="px-4 py-2.5 rounded-xl bg-[#153B2B] hover:bg-[#1C4E39] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-gold" />
              <span>Accéder à Mon Entretien</span>
            </button>
          )}
          <button
            type="button"
            onClick={onTriggerAnalysis}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin text-slate-600" /> : <RefreshCw className="w-4 h-4 text-slate-600" />}
            <span>Actualiser mon profil</span>
          </button>
        </div>
      </div>
    );
  }

  const {
    competencesDeclarees = [],
    competencesVerifiees = [],
    pointsFortsPotentiels = [],
    competencesADevelopper = [],
    recommendations = [],
    specialitesRecommandees = [],
    dimensions = {},
    dateAnalyse
  } = analysis;

  const rawSpecialties = recommendations.length > 0 ? recommendations : specialitesRecommandees;
  
  // Spécialités adaptées (triées par pertinence)
  const displaySpecialties = rawSpecialties.length > 0 ? rawSpecialties.slice(0, 3) : [
    {
      id: 'SPEC-TERR',
      nomFr: 'Gendarmerie Territoriale & Sécurité Publique',
      nomAr: 'الدرك الإقليمي والأمن العمومي',
      raisons: ['Sens affirmé du contact humain, rigueur procédurale et polyvalence sur le terrain.'],
      competencesCorrespondantes: ['Application des consignes', 'Médiation & Contact citoyen', 'Posture militaire']
    },
    {
      id: 'SPEC-MOB',
      nomFr: 'Gendarmerie Mobile & Maintien de l’Ordre',
      nomAr: 'الدرك المتنقل وحفظ النظام',
      raisons: ['Excellente endurance physique, esprit de cohésion et réactivité en situation collective.'],
      competencesCorrespondantes: ['Endurance & Condition physique', 'Esprit d\'équipe', 'Sang-froid sous pression']
    },
    {
      id: 'SPEC-PST',
      nomFr: 'Police Scientifique, Technique & Systèmes',
      nomAr: 'الشرطة التقنية والعلمية والأنظمة',
      raisons: ['Aptitude démontrée à l\'analyse méthodique, à la logique technique et au recueil rigoureux d\'indices.'],
      competencesCorrespondantes: ['Capacité d\'analyse', 'Rigueur méthodologique', 'Intérêt technologique']
    }
  ];

  const formattedDate = dateAnalyse
    ? new Date(dateAnalyse).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : 'Aujourd\'hui';

  return (
    <div className="space-y-6">
      
      {/* ========================================================================= */}
      {/* EN-TÊTE PRINCIPAL : MON PROFIL & MES COMPÉTENCES */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#153B2B] text-gold border border-gold/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                Dossier Officiel d'Orientation
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Mis à jour le {formattedDate}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 tracking-tight">
              Mon Profil & Mes Compétences
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Consultez la synthèse de vos compétences vérifiées en pratique, vos déclarations d'expérience, vos points forts et les filières qui correspondent le mieux à votre profil.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onTriggerAnalysis}
              disabled={loading}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-all border border-slate-200 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
              <span>Actualiser mon profil</span>
            </button>

            {onGoToSpecialties && (
              <button
                type="button"
                onClick={onGoToSpecialties}
                className="px-4 py-2 rounded-xl bg-[#153B2B] hover:bg-[#1C4E39] text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-xs cursor-pointer border border-[#1C4E39]"
              >
                <Compass className="w-3.5 h-3.5 text-gold" />
                <span>Découvrir les spécialités</span>
              </button>
            )}
          </div>
        </div>

        {/* Vue d'ensemble sobre des aptitudes fondamentales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-5">
          <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80">
            <span className="text-xs font-bold text-slate-700 block mb-1">Capacité d'Analyse</span>
            <p className="text-xs text-slate-500">Logique, observation et discernement</p>
            <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2.5 overflow-hidden">
              <div className="bg-[#153B2B] h-1.5 rounded-full" style={{ width: `${dimensions.capaciteAnalyse || 85}%` }} />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80">
            <span className="text-xs font-bold text-slate-700 block mb-1">Rigueur & Organisation</span>
            <p className="text-xs text-slate-500">Discipline, respect des consignes et autonomie</p>
            <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2.5 overflow-hidden">
              <div className="bg-[#153B2B] h-1.5 rounded-full" style={{ width: `${dimensions.organisationResponsabilite || 88}%` }} />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80">
            <span className="text-xs font-bold text-slate-700 block mb-1">Esprit d'Équipe</span>
            <p className="text-xs text-slate-500">Cohésion, communication et solidarité</p>
            <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2.5 overflow-hidden">
              <div className="bg-[#153B2B] h-1.5 rounded-full" style={{ width: `${dimensions.communicationEquipe || 91}%` }} />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80">
            <span className="text-xs font-bold text-slate-700 block mb-1">Aptitude Terrain</span>
            <p className="text-xs text-slate-500">Endurance, réactivité et engagement physique</p>
            <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2.5 overflow-hidden">
              <div className="bg-[#C9A052] h-1.5 rounded-full" style={{ width: `${dimensions.aptitudeTerrainPhysique || 85}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1 & 2 : COMPÉTENCES VÉRIFIÉES VS COMPÉTENCES DÉCLARÉES */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. MES COMPÉTENCES VÉRIFIÉES */}
        <div className="bg-white rounded-2xl border-2 border-emerald-500/30 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-slate-900">Mes Compétences Vérifiées</h3>
                    <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full">
                      Certifiées
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Compétences validées lors de vos tests d'aptitude et ateliers pratiques
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 text-xs font-bold bg-[#153B2B] text-gold rounded-lg border border-gold/30 shrink-0">
                {competencesVerifiees.length} validée(s)
              </span>
            </div>

            {competencesVerifiees.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500 my-2">
                Aucune compétence vérifiée pour le moment. Vos notes d'ateliers apparaîtront automatiquement ici au fur et à mesure de votre progression.
              </div>
            ) : (
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
                            <span>Source : <strong>{item.sourceEvaluation || 'Atelier pratique officiel'}</strong></span>
                          </p>
                        </div>
                      </div>
                      {item.noteObtenue && (
                        <span className="px-2.5 py-1 text-xs font-black bg-white text-emerald-800 border border-emerald-300 rounded-md shadow-2xs font-mono">
                          {item.noteObtenue}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-emerald-100/80 text-xs text-slate-500">
                      <span className="font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                        Niveau : {item.niveauMaitrise || 'Acquis'}
                      </span>
                      {item.dateValidation && (
                        <span>Validé le {item.dateValidation}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/60 flex items-center gap-2.5 text-xs text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              Ces compétences sont officiellement enregistrées dans votre dossier militaire.
            </span>
          </div>
        </div>

        {/* 2. MES COMPÉTENCES DÉCLARÉES */}
        <div className="bg-white rounded-2xl border-2 border-amber-400/40 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                  <Layers className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-slate-900">Mes Compétences Déclarées</h3>
                    <span className="px-2.5 py-0.5 text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 rounded-full">
                      Dossier & Entretien
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Aptitudes et expériences mentionnées dans votre parcours personnel
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 text-xs font-bold bg-amber-100 text-amber-900 rounded-lg border border-amber-300 shrink-0">
                {competencesDeclarees.length} déclarée(s)
              </span>
            </div>

            {competencesDeclarees.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500 my-2">
                Aucune compétence déclarée pour le moment. Mentionnez vos diplômes et vos expériences lors de votre entretien pour les ajouter.
              </div>
            ) : (
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
                        {item.niveauDeclare || 'Déclaré'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-amber-200/50 text-xs">
                      <span className="text-amber-800 font-medium">Statut : En attente d'atelier pratique</span>
                      <span className="text-slate-500">Dossier élève</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-center gap-2.5 text-xs text-amber-900">
            <Clock className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              Vos compétences déclarées seront certifiées lors de vos prochains passages en ateliers.
            </span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SECTION 3 & 4 : MES POINTS FORTS & MES AXES D'AMÉLIORATION */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 3. MES POINTS FORTS */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base border-b border-slate-100 pb-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3>Mes Points Forts</h3>
              <p className="text-xs font-normal text-slate-500">Vos atouts majeurs reconnus dans votre dossier</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {pointsFortsPotentiels.map((pf, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/30 border border-emerald-100 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">{pf}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. MES AXES D'AMÉLIORATION */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base border-b border-slate-100 pb-3">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h3>Mes Axes d'Amélioration</h3>
              <p className="text-xs font-normal text-slate-500">Les points à travailler pour optimiser votre progression</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {competencesADevelopper.map((cad, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/30 border border-amber-100 text-xs sm:text-sm text-slate-700">
                <Target className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">{cad}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SECTION 5 : LES SPÉCIALITÉS CORRESPONDANT À MON PROFIL */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#C9A052]" />
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Spécialités Correspondant à Mon Profil
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Filières de la Gendarmerie Royale où vos compétences et vos points forts s'expriment le mieux
            </p>
          </div>

          {onGoToSpecialties && (
            <button
              type="button"
              onClick={onGoToSpecialties}
              className="text-xs font-bold text-[#153B2B] hover:text-[#1C4E39] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Consulter toutes les spécialités</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displaySpecialties.map((spec, i) => {
            const reasonsText = Array.isArray(spec.raisons)
              ? spec.raisons.join(' ')
              : Array.isArray(spec.reasons)
              ? spec.reasons.join(' ')
              : 'Profil fortement recommandé compte tenu de vos aptitudes opérationnelles et de votre discipline.';

            const matchingList = spec.competencesCorrespondantes || spec.matchingSkills || [];

            return (
              <div
                key={spec.id || i}
                className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-[#153B2B]/40 hover:shadow-sm transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#153B2B] text-gold border border-gold/30">
                      {spec.id || `FILIERE-0${i+1}`}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Forte adéquation
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 leading-snug">
                    {spec.nomFr || spec.titre || spec.nom || 'Spécialité Opérationnelle'}
                  </h4>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {reasonsText}
                  </p>

                  {matchingList.length > 0 && (
                    <div className="pt-1">
                      <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                        Compétences clés associées :
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {matchingList.slice(0, 3).map((comp, ci) => (
                          <span
                            key={ci}
                            className="text-[10px] bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                          >
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-200/70">
                  <button
                    type="button"
                    onClick={onGoToSpecialties}
                    className="w-full py-2 px-3 rounded-lg bg-white hover:bg-[#153B2B] text-[#153B2B] hover:text-white border border-[#153B2B]/30 hover:border-[#153B2B] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <span>Découvrir la filière</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
