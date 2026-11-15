import React, { useState, useEffect } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import {
  Shield,
  Brain,
  MessageSquare,
  Calendar,
  Target,
  Users,
  Wrench,
  Sparkles,
  Award,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
  Flame
} from 'lucide-react';
import { talentPlatformService, TALENT_RADAR_DIMENSIONS_CONFIG } from '../../services/talentPlatformService.js';
import { useAuth } from '../../context/AuthContext.jsx';

export default function TalentRadarPanel({ onNavigateToSimulations, onNavigateToOrientation }) {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [activeLayerFilter, setActiveLayerFilter] = useState('ALL');
  const [selectedDimension, setSelectedDimension] = useState('analyseRaisonnement');

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const data = await talentPlatformService.getTalentRadar(user?.id || user?.UtilisateurId);
        if (mounted) setProfile(data);
      } catch (err) {
        console.error('Erreur chargement Talent Radar:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [user?.id, user?.UtilisateurId]);

  const getDimensionIcon = (key) => {
    switch (key) {
      case 'analyseRaisonnement': return Brain;
      case 'communication': return MessageSquare;
      case 'organisation': return Calendar;
      case 'precisionAttention': return Target;
      case 'travailEquipe': return Users;
      case 'competencesTechniques': return Wrench;
      case 'capaciteApprentissage': return Sparkles;
      default: return Award;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-[#153B2B] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold text-slate-600">Calcul et synchronisation du Talent Radar 360°...</p>
      </div>
    );
  }

  if (profile?.restricted) {
    return (
      <div className="bg-white rounded-2xl border border-amber-200 p-6 text-center space-y-2">
        <Shield className="w-8 h-8 text-[#153B2B] mx-auto" />
        <h3 className="text-sm font-bold text-slate-800">Talent Radar réservé à l'Administration</h3>
        <p className="text-xs text-slate-600">{profile.message}</p>
      </div>
    );
  }

  const radarData = TALENT_RADAR_DIMENSIONS_CONFIG.map((dim) => {
    const dimValues = profile?.dimensions?.[dim.key] || { declare: 70, observe: 70, valide: 70 };
    return {
      dimensionKey: dim.key,
      dimensionName: dim.nomFr,
      dimensionAr: dim.nomAr,
      Déclaré: dimValues.declare || 0,
      Observé: dimValues.observe || 0,
      Validé: dimValues.valide || 0,
      fullMark: 100
    };
  });

  const activeDimObj = TALENT_RADAR_DIMENSIONS_CONFIG.find(d => d.key === selectedDimension) || TALENT_RADAR_DIMENSIONS_CONFIG[0];
  const activeDimValues = profile?.dimensions?.[selectedDimension] || { declare: 75, observe: 75, valide: 75, feedback: '' };
  const ActiveIcon = getDimensionIcon(selectedDimension);

  return (
    <div className="w-full space-y-6">
      {/* En-tête synthétique Talent Radar 3 couches */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#153B2B]/10 text-[#153B2B] tracking-wide uppercase border border-[#153B2B]/20">
                Talent Radar 360° • 7 Dimensions
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Synchro : {new Date(profile?.updatedAt || Date.now()).toLocaleDateString('fr-FR')}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#153B2B] tracking-tight flex items-center gap-2.5">
              Convergence des Compétences <span className="text-base font-bold text-slate-400 font-arabic">رادار المواهب</span>
            </h2>
            <p className="text-xs text-slate-600 max-w-3xl">
              Comparez vos <strong className="text-blue-700">compétences déclarées</strong> (récit & IA), vos{' '}
              <strong className="text-amber-700">compétences observées</strong> (simulations pratiques) et vos{' '}
              <strong className="text-[#153B2B]">compétences validées</strong> (visa formateur).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {onNavigateToSimulations && (
              <button
                type="button"
                onClick={onNavigateToSimulations}
                className="px-3.5 py-2 rounded-xl bg-[#153B2B] text-white text-xs font-semibold hover:bg-[#1C4E39] transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <Target className="w-3.5 h-3.5 text-[#C9A052]" />
                <span>Passer des simulations</span>
              </button>
            )}
            {onNavigateToOrientation && (
              <button
                type="button"
                onClick={onNavigateToOrientation}
                className="px-3.5 py-2 rounded-xl bg-white text-[#153B2B] border border-slate-300 hover:border-[#153B2B] text-xs font-semibold transition-all shadow-2xs flex items-center gap-2 cursor-pointer"
              >
                <Award className="w-3.5 h-3.5 text-[#153B2B]" />
                <span>Simulateur d'Orientation</span>
              </button>
            )}
          </div>
        </div>

        {/* Filtres par couche */}
        <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div
            onClick={() => setActiveLayerFilter(activeLayerFilter === 'DECLARE' ? 'ALL' : 'DECLARE')}
            className={`p-3 rounded-xl border transition-all cursor-pointer ${
              activeLayerFilter === 'DECLARE'
                ? 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-300'
                : 'bg-blue-50/40 border-blue-200/60 hover:bg-blue-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                1. Déclaré
              </span>
              <span className="text-[10px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">
                Récit & IA
              </span>
            </div>
          </div>

          <div
            onClick={() => setActiveLayerFilter(activeLayerFilter === 'OBSERVE' ? 'ALL' : 'OBSERVE')}
            className={`p-3 rounded-xl border transition-all cursor-pointer ${
              activeLayerFilter === 'OBSERVE'
                ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-300'
                : 'bg-amber-50/40 border-amber-200/60 hover:bg-amber-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C9A052] inline-block" />
                2. Observé
              </span>
              <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                Simulations
              </span>
            </div>
          </div>

          <div
            onClick={() => setActiveLayerFilter(activeLayerFilter === 'VALIDE' ? 'ALL' : 'VALIDE')}
            className={`p-3 rounded-xl border transition-all cursor-pointer ${
              activeLayerFilter === 'VALIDE'
                ? 'bg-emerald-50/80 border-emerald-400 ring-2 ring-emerald-300'
                : 'bg-emerald-50/40 border-emerald-200/60 hover:bg-emerald-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#153B2B] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#153B2B] inline-block" />
                3. Validé
              </span>
              <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                Visa Formateur
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Radar & Fiche dimension */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#153B2B]" />
                Polygone des 7 Dimensions Tactiques
              </h3>
              <span className="text-xs font-medium text-slate-500">Échelle 0–100</span>
            </div>
            <p className="text-xs text-slate-500">
              Sélectionnez une dimension ci-dessous pour inspecter son détail par couche.
            </p>
          </div>

          <div className="w-full h-[340px] sm:h-[390px] my-3">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                <PolarAngleAxis dataKey="dimensionName" tick={{ fill: '#334155', fontSize: 11, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" tick={{ fontSize: 10 }} />

                {(activeLayerFilter === 'ALL' || activeLayerFilter === 'DECLARE') && (
                  <Radar name="1. Déclaré (Récit/IA)" dataKey="Déclaré" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.25} strokeWidth={2} />
                )}
                {(activeLayerFilter === 'ALL' || activeLayerFilter === 'OBSERVE') && (
                  <Radar name="2. Observé (Simulations)" dataKey="Observé" stroke="#C9A052" fill="#C9A052" fillOpacity={0.35} strokeWidth={2} />
                )}
                {(activeLayerFilter === 'ALL' || activeLayerFilter === 'VALIDE') && (
                  <Radar name="3. Validé (Formateur)" dataKey="Validé" stroke="#153B2B" fill="#153B2B" fillOpacity={0.4} strokeWidth={2.5} />
                )}
                <Tooltip
                  formatter={(value, name) => [`${value} / 100`, name]}
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
            {TALENT_RADAR_DIMENSIONS_CONFIG.map((dim) => {
              const isSelected = dim.key === selectedDimension;
              const Icon = getDimensionIcon(dim.key);
              return (
                <button
                  key={dim.key}
                  type="button"
                  onClick={() => setSelectedDimension(dim.key)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#153B2B] text-white font-semibold shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{dim.nomFr}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#153B2B]/10 text-[#153B2B] flex items-center justify-center font-bold">
                  <ActiveIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-800 leading-snug">{activeDimObj.nomFr}</h4>
                  <p className="text-xs font-semibold text-slate-400 font-arabic">{activeDimObj.nomAr}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#153B2B] bg-[#153B2B]/10 px-2.5 py-1 rounded-full shrink-0">
                Moy. : {Math.round(((activeDimValues.declare || 0) + (activeDimValues.observe || 0) + (activeDimValues.valide || 0)) / 3)}%
              </span>
            </div>

            <p className="text-xs text-slate-600 mt-3 leading-relaxed">{activeDimObj.description}</p>

            <div className="mt-4 space-y-3 pt-4 border-t border-slate-100">
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-blue-800">Déclaré (Récit & IA)</span>
                  <span className="font-bold text-blue-900">{activeDimValues.declare || 0} / 100</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: `${activeDimValues.declare || 0}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-amber-800">Observé (Simulations)</span>
                  <span className="font-bold text-amber-900">{activeDimValues.observe || 0} / 100</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-[#C9A052] h-2 rounded-full transition-all duration-500" style={{ width: `${activeDimValues.observe || 0}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-[#153B2B]">Validé (Visa Formateur)</span>
                  <span className="font-bold text-[#153B2B]">{activeDimValues.valide || 0} / 100</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-[#153B2B] h-2 rounded-full transition-all duration-500" style={{ width: `${activeDimValues.valide || 0}%` }} />
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
              <div className="font-semibold text-slate-700 flex items-center gap-1.5 mb-1">
                <Info className="w-3.5 h-3.5 text-[#153B2B]" />
                Diagnostic de Convergence
              </div>
              <p className="text-slate-600">
                {activeDimValues.feedback || "Cohérence entre le positionnement initial et les résultats observés."}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3.5">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-2">
                <Flame className="w-4 h-4 text-emerald-600" />
                Points Forts Dominants
              </h4>
              <ul className="space-y-1.5">
                {(profile?.strengthsDominants || []).map((str, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-start gap-2 bg-emerald-50/60 p-2 rounded-lg border border-emerald-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Axes d'Amélioration Recommandés
              </h4>
              <ul className="space-y-1.5">
                {(profile?.axesAmelioration || []).map((axe, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-start gap-2 bg-amber-50/60 p-2 rounded-lg border border-amber-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                    <span>{axe}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

