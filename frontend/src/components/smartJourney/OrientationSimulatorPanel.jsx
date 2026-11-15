import React, { useState, useEffect } from 'react';
import {
  Shield,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Award,
  Users,
  FileCheck2,
  Brain,
  Anchor,
  Plane,
  Crosshair,
  BadgeCheck,
  ChevronRight,
  Info,
  Sparkles,
  Tag,
  GraduationCap
} from 'lucide-react';
import { talentPlatformService } from '../../services/talentPlatformService.js';
import { useAuth } from '../../context/AuthContext.jsx';
import Badge from '../common/Badge.jsx';

const INITIAL_SLIDERS = {
  analyseRaisonnement: 0,
  communication: 0,
  organisation: 0,
  precisionAttention: 0,
  travailEquipe: 0,
  competencesTechniques: 0,
  capaciteApprentissage: 0
};

export default function OrientationSimulatorPanel() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [simulationData, setSimulationData] = useState(null);
  const [preselection, setPreselection] = useState(null);
  const [hypothesisSliders, setHypothesisSliders] = useState(INITIAL_SLIDERS);
  const [activeTabSpecialty, setActiveTabSpecialty] = useState(null);

  const loadOrientationData = async (adjustments = null) => {
    if (!adjustments) setLoading(true);
    try {
      const targetId = user?.id || user?.UtilisateurId;
      const [data, preselRes] = await Promise.all([
        talentPlatformService.getOrientationSimulator(targetId, adjustments),
        talentPlatformService.getStudentPreselection(targetId).catch(() => null)
      ]);
      setSimulationData(data);
      if (preselRes?.preselection) {
        setPreselection(preselRes.preselection);
      }
      if (data?.topSpecialty && !activeTabSpecialty) {
        setActiveTabSpecialty(data.topSpecialty.id);
      }
    } catch (err) {
      console.error('Erreur chargement simulateur orientation:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrientationData();
  }, [user?.id, user?.UtilisateurId]);

  const handleSliderChange = (key, value) => {
    const updated = { ...hypothesisSliders, [key]: Number(value) };
    setHypothesisSliders(updated);
    loadOrientationData(updated);
  };

  const resetHypotheses = () => {
    setHypothesisSliders(INITIAL_SLIDERS);
    loadOrientationData(null);
  };

  const getSpecialtyIcon = (id) => {
    switch (id) {
      case 'SPEC-PST': return Brain;
      case 'SPEC-INTERV': return Crosshair;
      case 'SPEC-MARIT': return Anchor;
      case 'SPEC-AIR': return Plane;
      case 'SPEC-MOB': return Users;
      case 'SPEC-PREV': return FileCheck2;
      default: return Shield;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-[#153B2B] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold text-slate-600">Croisement des 5 sources & calcul des affinités tactiques...</p>
      </div>
    );
  }

  if (simulationData?.restricted) {
    return (
      <div className="bg-white rounded-2xl border border-amber-200 p-6 text-center space-y-2">
        <Shield className="w-8 h-8 text-[#153B2B] mx-auto" />
        <h3 className="text-sm font-bold text-slate-800">Simulateur d'Orientation réservé à l'Administration</h3>
        <p className="text-xs text-slate-600">{simulationData.message}</p>
      </div>
    );
  }

  const recommendations = simulationData?.allRecommendations || [];
  const selectedSpecialty = recommendations.find(s => s.id === activeTabSpecialty) || simulationData?.topSpecialty;
  const isHypothesisActive = Object.values(hypothesisSliders).some(v => v !== 0);

  return (
    <div className="w-full space-y-6">
      {/* En-tête Synthèse des 5 Sources */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#153B2B]/10 text-[#153B2B] tracking-wide uppercase border border-[#153B2B]/20">
                Simulateur d'Orientation • 5 Flux Croisés
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#153B2B] tracking-tight flex items-center gap-2.5">
              Projection & Simulation d'Hypothèses <span className="text-base font-bold text-slate-400 font-arabic">محاكي التوجيه</span>
            </h2>
            <p className="text-xs text-slate-600 max-w-3xl">
              Testez l'impact d'une progression de compétences sur votre classement indicatif parmi les 7 spécialités de la Gendarmerie Royale.
            </p>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-[10px] font-bold text-slate-500 uppercase">1. Récit Personnel</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">Parcours & Diplômes</div>
              <div className="text-[10px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Intégré
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-[10px] font-bold text-slate-500 uppercase">2. Entretien IA</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">Gemma 4 & Moulsot</div>
              <div className="text-[10px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Synchronisé
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-[10px] font-bold text-slate-500 uppercase">3. Comp. Déclarées</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">7 Dimensions</div>
              <div className="text-[10px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Actif
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-[10px] font-bold text-slate-500 uppercase">4. Simulations</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">Pratique factuelle</div>
              <div className="text-[10px] text-amber-700 font-semibold mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Mises en situation
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 col-span-2 sm:col-span-1">
              <div className="text-[10px] font-bold text-slate-500 uppercase">5. Encadrement</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">Visa Formateur</div>
              <div className="text-[10px] text-[#153B2B] font-semibold mt-1 flex items-center gap-1">
                <BadgeCheck className="w-3 h-3 text-[#C9A052]" /> Instruction validée
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5.1 Synthèse de Pré-sélection & Détection des Talents */}
      {preselection && (
        <div className={`rounded-2xl border p-5 shadow-xs transition-all ${
          preselection.statutPreselection === 'TALENT_CACHE'
            ? 'bg-amber-500/10 border-amber-500/30'
            : preselection.statutPreselection === 'SPECIALISTE_CONFIRME'
            ? 'bg-emerald-500/10 border-emerald-500/30'
            : preselection.statutPreselection === 'AFFECTATION_VALIDEE'
            ? 'bg-blue-500/10 border-blue-500/30'
            : 'bg-white border-slate-200'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#1B4332] text-gold flex items-center justify-center shadow-xs">
                {preselection.statutPreselection === 'TALENT_CACHE' ? (
                  <Sparkles className="w-5 h-5 text-gold" />
                ) : (
                  <Award className="w-5 h-5 text-gold" />
                )}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Pré-sélection Métier & Détection des Talents
                </span>
                <h3 className="text-base font-extrabold text-[#1B4332]">
                  {preselection.statutLabel || preselection.statutPreselection}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                type={
                  preselection.statutPreselection === 'TALENT_CACHE'
                    ? 'WARNING'
                    : preselection.statutPreselection === 'SPECIALISTE_CONFIRME'
                    ? 'SUCCESS'
                    : 'INFO'
                }
                label={preselection.filiereLabel || preselection.filiereEntree}
                size="sm"
              />
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1B4332] text-white">
                Spécialité suggérée : {preselection.specialiteProposeeCode}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3 text-xs">
            <div className="p-3 bg-white/80 rounded-xl border border-slate-200/60">
              <span className="text-[10px] text-slate-500 uppercase block">Domaine Technique Détecté</span>
              <strong className="text-slate-800 text-sm">{preselection.domaineTechnique || 'Général'}</strong>
            </div>
            <div className="p-3 bg-white/80 rounded-xl border border-slate-200/60">
              <span className="text-[10px] text-slate-500 uppercase block">Moyenne Pratique en Atelier</span>
              <strong className="text-emerald-700 text-sm">
                {preselection.moyennePratique !== null ? `${preselection.moyennePratique} / 20` : 'En attente d\'évaluation'}
              </strong>
            </div>
            <div className="p-3 bg-white/80 rounded-xl border border-slate-200/60">
              <span className="text-[10px] text-slate-500 uppercase block">Meilleure Note Pratique</span>
              <strong className="text-slate-800 text-sm">
                {preselection.meilleureNotePratique !== null ? `${preselection.meilleureNotePratique} / 20` : '—'}
              </strong>
            </div>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed bg-white/60 p-3 rounded-xl border border-slate-200/40">
            {preselection.explication}
          </p>

          {/* Compétences Validées */}
          {(preselection.competencesValidees || []).length > 0 && (
            <div className="mt-3 pt-3 border-t border-black/5">
              <div className="text-[10px] font-bold text-slate-500 uppercase mb-1.5 flex items-center gap-1">
                <Tag className="w-3 h-3 text-slate-400" />
                Compétences techniques validées sur le terrain :
              </div>
              <div className="flex flex-wrap gap-1.5">
                {preselection.competencesValidees.map((c, i) => (
                  <span key={i} className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                    ✓ {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Évaluations utilisées pour le calcul */}
          {(preselection.evaluationsPratiques || []).length > 0 && (
            <div className="mt-3 pt-2 text-[11px] text-slate-500 flex items-center gap-2 flex-wrap">
              <span>Évaluations réelles prises en compte ({preselection.evaluationsPratiques.length}) :</span>
              {preselection.evaluationsPratiques.map((ev, i) => (
                <span key={i} className="bg-white px-2 py-0.5 rounded border text-slate-700 font-medium">
                  {ev.workshopTitre} ({ev.notePratique}/20 - {ev.niveauAutonomie})
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Panneau Hypothèses + Classement des 7 Spécialités */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#153B2B]" />
                Curseurs d'Hypothèses
              </h3>
              <p className="text-[11px] text-slate-500">Testez des scénarios d'acquisition</p>
            </div>
            {isHypothesisActive && (
              <button
                type="button"
                onClick={resetHypotheses}
                className="text-[11px] font-semibold text-rose-700 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Réinitialiser
              </button>
            )}
          </div>

          <div className="space-y-4">
            {[
              { key: 'analyseRaisonnement', label: 'Analyse et raisonnement' },
              { key: 'precisionAttention', label: 'Précision et attention' },
              { key: 'communication', label: 'Communication professionnelle' },
              { key: 'travailEquipe', label: 'Travail en équipe & cohésion' },
              { key: 'organisation', label: 'Organisation des urgences' },
              { key: 'competencesTechniques', label: 'Compétences techniques' },
              { key: 'capaciteApprentissage', label: "Capacité d'apprentissage" }
            ].map((dim) => {
              const val = hypothesisSliders[dim.key];
              return (
                <div key={dim.key} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-slate-700">{dim.label}</span>
                    <span className={`font-bold ${val > 0 ? 'text-emerald-700' : val < 0 ? 'text-rose-700' : 'text-slate-400'}`}>
                      {val > 0 ? `+${val}%` : `${val}%`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-20"
                    max="20"
                    step="5"
                    value={val}
                    onChange={(e) => handleSliderChange(dim.key, e.target.value)}
                    className="w-full accent-[#153B2B] h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 leading-relaxed">
            <strong className="font-bold flex items-center gap-1 mb-1">
              <Info className="w-3.5 h-3.5 text-amber-700" />
              Simulation Non Destructive
            </strong>
            Les curseurs ajustent la projection sans altérer vos notes réelles.
          </div>
        </div>

        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#153B2B]" />
              Projection Dynamique des 7 Spécialités
            </h3>
            <span className="text-xs text-slate-500 font-medium">Trié par compatibilité</span>
          </div>

          <div className="space-y-3">
            {recommendations.map((spec, idx) => {
              const Icon = getSpecialtyIcon(spec.id);
              const isSelected = selectedSpecialty?.id === spec.id;
              const isRank1 = idx === 0;

              return (
                <div
                  key={spec.id}
                  onClick={() => setActiveTabSpecialty(spec.id)}
                  className={`bg-white rounded-2xl border transition-all duration-200 p-4 sm:p-5 cursor-pointer shadow-xs ${
                    isSelected ? 'border-[#153B2B] ring-2 ring-[#153B2B]/20 shadow-md' : 'border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                        isRank1 ? 'bg-[#153B2B] text-[#C9A052]' : 'bg-slate-100 text-slate-700'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm sm:text-base font-bold text-slate-900">{spec.nomFr}</h4>
                          {isRank1 && (
                            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C9A052]/20 text-[#8F6B20] border border-[#C9A052]/30">
                              N°1 Recommandé
                            </span>
                          )}
                          {spec.instructorVisaStatus === 'RECOMMANDE_PAR_FORMATEUR' && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                              <BadgeCheck className="w-3 h-3" /> Visa Formateur
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-slate-400 font-arabic mt-0.5">{spec.nomAr}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <div className="text-xl font-black text-[#153B2B]">{spec.affinityScore}%</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Affinité</div>
                      </div>
                      <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${isSelected ? 'rotate-90 text-[#153B2B]' : ''}`} />
                    </div>
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        spec.affinityScore >= 80 ? 'bg-[#153B2B]' : spec.affinityScore >= 65 ? 'bg-[#C9A052]' : 'bg-slate-400'
                      }`}
                      style={{ width: `${spec.affinityScore}%` }}
                    />
                  </div>

                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs text-slate-700 space-y-1">
                        <strong className="font-bold text-slate-800 block">Justification de la projection :</strong>
                        {(spec.reasons || []).map((r, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <span className="text-[#153B2B] font-bold">•</span>
                            <span>{r}</span>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-1">
                          <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Aptitudes Clés Identifiées :
                          </span>
                          <ul className="space-y-1 text-slate-700">
                            {(spec.matchingCompetencies || []).map((c, i) => (
                              <li key={i} className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-100 space-y-1">
                          <span className="font-bold text-amber-900 flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                            Axe Technique à Renforcer :
                          </span>
                          <ul className="space-y-1 text-slate-700">
                            {(spec.axesAmelioration || []).map((a, i) => (
                              <li key={i} className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                <span>{a}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-3.5 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-600">
            <div className="font-bold text-slate-700 flex items-center gap-1.5 mb-0.5">
              <Shield className="w-3.5 h-3.5 text-[#153B2B]" />
              Avertissement Institutionnel
            </div>
            <p className="text-[11px] text-slate-500">
              {simulationData?.avertissementLegal || "Simulateur consultatif d'aide à la décision. L'affectation définitive relève exclusivement du Commandement de la Gendarmerie Royale."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

