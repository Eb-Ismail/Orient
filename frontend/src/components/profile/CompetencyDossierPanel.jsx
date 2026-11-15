import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  CheckCircle2,
  Printer,
  Wrench,
  Cpu,
  Radio,
  Boxes,
  Layers,
  ChevronDown,
  ChevronUp,
  FileText,
  AlertTriangle,
  Check,
  TrendingUp,
  Calendar,
  HardHat,
  ArrowRight,
  Sparkles,
  Tag,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { workshopService } from '../../services/workshopService.js';
import { talentPlatformService } from '../../services/talentPlatformService.js';
import LoadingSpinner from '../common/LoadingSpinner.jsx';
import EmptyState from '../common/EmptyState.jsx';
import Button from '../common/Button.jsx';
import Badge from '../common/Badge.jsx';

export default function CompetencyDossierPanel() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [preselection, setPreselection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedGroupId, setExpandedGroupId] = useState('GROUP-INFO');
  const [filterHistory, setFilterHistory] = useState('ALL');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const targetId = user?.id || user?.UtilisateurId;
        const [res, preselRes] = await Promise.all([
          workshopService.getTraineeSkillsProfile(targetId),
          talentPlatformService.getStudentPreselection(targetId).catch(() => null)
        ]);
        setProfile(res);
        if (preselRes?.preselection) {
          setPreselection(preselRes.preselection);
        }
      } catch (err) {
        console.error('Erreur chargement dossier compétences:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id || user?.UtilisateurId) {
      fetchProfile();
    }
  }, [user]);

  const renderGroupIcon = (groupId, className = 'w-5 h-5') => {
    switch (groupId) {
      case 'GROUP-INFO': return <Cpu className={className} />;
      case 'GROUP-MECA': return <Wrench className={className} />;
      case 'GROUP-TELECOM': return <Radio className={className} />;
      case 'GROUP-LOG': return <Boxes className={className} />;
      default: return <Layers className={className} />;
    }
  };

  const getStatusBadge = (statut, arretSecurite = false) => {
    if (arretSecurite || statut === 'REJETE') {
      return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">REJETÉ / À RÉÉVALUER</span>;
    }
    switch (statut) {
      case 'VALIDE':
      case 'EVALUE':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">VALIDÉ</span>;
      case 'EN_ATTENTE_VALIDATION':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">EN ATTENTE VISA</span>;
      case 'EN_COURS':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">EN COURS</span>;
      default:
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">PROGRAMMÉ</span>;
    }
  };

  if (loading) {
    return <LoadingSpinner text="Consolidation de votre dossier de compétences professionnelles..." />;
  }

  if (!profile) {
    return (
      <EmptyState
        title="Dossier de compétences indisponible"
        description="Aucune donnée d'atelier pratique n'a encore été enregistrée pour votre compte."
        action={
          <Link to="/eleve/guide">
            <Button variant="primary">Explorer le GUIDE</Button>
          </Link>
        }
      />
    );
  }

  const {
    overallPerformance = {},
    participationHistory = [],
    competencyGroupsAnalysis = [],
    validatedTechnicalSkills = [],
    identifiedStrengths = [],
    skillsRequiringImprovement = [],
    evaluatorObservations = []
  } = profile;

  const filteredHistory = participationHistory.filter(h => {
    if (filterHistory === 'VALIDATED') return h.statut === 'VALIDE' || h.statut === 'EVALUE';
    if (filterHistory === 'PENDING') return h.statut !== 'VALIDE' && h.statut !== 'EVALUE';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* 5.2 Synthèse Pré-sélection & Détection des Talents (SQL Server) */}
      {preselection && (
        <div className={`rounded-2xl p-5 border shadow-2xs transition-all ${
          preselection.statutPreselection === 'TALENT_CACHE'
            ? 'bg-amber-500/10 border-amber-500/30'
            : preselection.statutPreselection === 'SPECIALISTE_CONFIRME'
            ? 'bg-emerald-500/10 border-emerald-500/30'
            : preselection.statutPreselection === 'AFFECTATION_VALIDEE'
            ? 'bg-blue-500/10 border-blue-500/30'
            : 'bg-white border-slate-200'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1B4332] text-gold flex items-center justify-center shadow-xs">
                {preselection.statutPreselection === 'TALENT_CACHE' ? (
                  <Sparkles className="w-5 h-5 text-gold" />
                ) : (
                  <Award className="w-5 h-5 text-gold" />
                )}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Statut de Pré-sélection Officiel (SQL Server)
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
                Spécialité Proposée : {preselection.specialiteProposeeCode}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-black/5 text-xs">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">Filière d'Entrée</span>
              <strong className="text-slate-800">{preselection.filiereLabel}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">Moyenne Pratique</span>
              <strong className="text-emerald-700 text-sm">
                {preselection.moyennePratique !== null ? `${preselection.moyennePratique} / 20` : 'En attente'}
              </strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">Domaine Détecté</span>
              <strong className="text-slate-800">{preselection.domaineTechnique || 'Général'}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">Commission / Évaluateur</span>
              <strong className="text-slate-800">{preselection.dernierInstructeur || '—'}</strong>
            </div>
          </div>

          <p className="text-xs text-slate-700 mt-3 pt-2 border-t border-black/5 leading-relaxed">
            {preselection.explication}
          </p>
        </div>
      )}

      {/* KPIs de Synthèse Compétences */}
      <div className="bg-gradient-to-r from-[#153B2B] via-[#1C4E39] to-[#0E291E] rounded-2xl p-5 sm:p-6 text-white shadow-card border border-gold/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-bold font-serif text-white">Dossier de Compétences Validées (Ateliers Pratiques)</h2>
            <p className="text-xs text-slate-200 mt-0.5">
              Compétences techniques observées en séance réelle et évaluées par les commissions sur 20 points.
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition cursor-pointer shrink-0 self-start"
          >
            <Printer className="w-3.5 h-3.5 text-gold" />
            <span>Imprimer mon bilan</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white/10 rounded-xl p-3 border border-white/15 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-300 block">Ateliers Validés</span>
            <span className="text-xl font-bold text-white font-serif mt-0.5 block">
              {overallPerformance.completedCount || 0} / {overallPerformance.totalAssigned || 0}
            </span>
          </div>
          <div className="bg-white/10 rounded-xl p-3 border border-white/15 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-300 block">Note Moyenne</span>
            <span className="text-xl font-bold text-gold-light font-serif mt-0.5 block">
              {overallPerformance.averageScore20 !== null && overallPerformance.averageScore20 !== undefined
                ? `${overallPerformance.averageScore20} / 20`
                : '—'}
            </span>
          </div>
          <div className="bg-white/10 rounded-xl p-3 border border-white/15 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-300 block">Moyenne Globale</span>
            <span className="text-xl font-bold text-white font-serif mt-0.5 block">
              {overallPerformance.averageScorePct !== null && overallPerformance.averageScorePct !== undefined
                ? `${overallPerformance.averageScorePct}%`
                : '—'}
            </span>
          </div>
          <div className="bg-white/10 rounded-xl p-3 border border-white/15 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-300 block">Compétences</span>
            <span className="text-xl font-bold text-white font-serif mt-0.5 block">{validatedTechnicalSkills.length}</span>
          </div>
        </div>
      </div>

      {/* 4 Groupes de Compétences Professionnelles */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slateSubtle-200">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-gold-dark" />
            <h3 className="font-bold text-sm text-gendarmerie uppercase tracking-wide">
              Compétences Techniques par Domaine
            </h3>
          </div>
          <span className="text-xs text-slateSubtle-600">4 domaines spécialisés</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {competencyGroupsAnalysis.map((grp) => {
            const isExpanded = expandedGroupId === grp.groupId;
            const percentage = grp.totalCompetences > 0
              ? Math.round((grp.competencesValideesCount / grp.totalCompetences) * 100)
              : 0;

            return (
              <div key={grp.groupId} className="bg-white rounded-2xl border border-slateSubtle-200 shadow-2xs overflow-hidden">
                <div
                  onClick={() => setExpandedGroupId(isExpanded ? null : grp.groupId)}
                  className="p-4 cursor-pointer hover:bg-cream-50/50 transition flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gendarmerie/10 text-gendarmerie flex items-center justify-center shrink-0">
                      {renderGroupIcon(grp.groupId, 'w-5 h-5')}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gendarmerie leading-snug">{grp.nomFr}</h4>
                      <p className="text-[11px] text-slateSubtle-600" dir="rtl">{grp.nomAr}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-xs font-bold text-gendarmerie block">
                        {grp.competencesValideesCount} / {grp.totalCompetences}
                      </span>
                      <span className="text-[10px] text-slateSubtle-500 font-medium">{percentage}% validées</span>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slateSubtle-500" /> : <ChevronDown className="w-4 h-4 text-slateSubtle-500" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-4 pt-0 border-t border-slateSubtle-100 bg-cream-50/30 space-y-2.5">
                    {grp.competences.map((c) => (
                      <div key={c.code} className="p-3 rounded-xl bg-white border border-slateSubtle-200 text-xs space-y-1.5 shadow-xs">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${c.isDemonstrated ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                            <strong className="text-gendarmerie">{c.nomFr}</strong>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            c.isDemonstrated ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}>
                            {c.isDemonstrated ? `VALIDÉE (${c.scorePourcentage}%)` : 'À VALIDER'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slateSubtle-600">{c.descriptionFr}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Points Forts & Axes d'Amélioration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-emerald-200/80 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-emerald-800 pb-2 border-b border-emerald-100">
            <Check className="w-4 h-4 text-emerald-700" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-900">Points Forts Identifiés</h3>
          </div>
          {identifiedStrengths.length === 0 ? (
            <p className="text-xs text-slateSubtle-500 italic">Aucun point fort consigné pour le moment.</p>
          ) : (
            <ul className="space-y-2 text-xs">
              {identifiedStrengths.map((str, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium text-emerald-950">{str}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-2xl p-5 border border-amber-200/80 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-amber-800 pb-2 border-b border-amber-100">
            <AlertTriangle className="w-4 h-4 text-amber-700" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-amber-900">Axes de Perfectionnement</h3>
          </div>
          {skillsRequiringImprovement.length === 0 ? (
            <p className="text-xs text-slateSubtle-500 italic">Aucun axe particulier signalé.</p>
          ) : (
            <ul className="space-y-2 text-xs">
              {skillsRequiringImprovement.map((imp, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
                  <TrendingUp className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span className="font-medium text-amber-950">{imp}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Historique de participation */}
      <div className="bg-white rounded-2xl border border-slateSubtle-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slateSubtle-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gold-dark" />
            <h3 className="font-bold text-sm text-gendarmerie uppercase tracking-wide">
              Historique des Ateliers Pratiques
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'ALL', label: `Tous (${participationHistory.length})` },
              { id: 'VALIDATED', label: `Validés (${participationHistory.filter(h => h.statut === 'VALIDE' || h.statut === 'EVALUE').length})` },
              { id: 'PENDING', label: `À réaliser (${participationHistory.filter(h => h.statut !== 'VALIDE' && h.statut !== 'EVALUE').length})` }
            ].map(f => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilterHistory(f.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  filterHistory === f.id ? 'bg-gendarmerie text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {filteredHistory.length === 0 ? (
          <div className="p-8 text-center text-xs text-slateSubtle-500">Aucune séance pour ce filtre.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left min-w-[700px]">
              <thead className="bg-cream-100/70 text-slateSubtle-700 font-bold border-b border-slateSubtle-200">
                <tr>
                  <th className="p-3.5">Atelier Pratique</th>
                  <th className="p-3.5">Catégorie / Domaine</th>
                  <th className="p-3.5">Commission / Évaluateur</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5 text-center">Temps</th>
                  <th className="p-3.5 text-center">Note / 20</th>
                  <th className="p-3.5 text-center">Autonomie</th>
                  <th className="p-3.5 text-right">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slateSubtle-100">
                {filteredHistory.map((item) => {
                  const isEvaluated = item.statut === 'VALIDE' || item.statut === 'EVALUE';
                  return (
                    <tr key={item.assignationId} className="hover:bg-cream-50/50 transition">
                      <td className="p-3.5">
                        <div className="font-bold text-gendarmerie">{item.titreFr}</div>
                        <div className="text-[10px] font-mono text-slateSubtle-500">{item.code}</div>
                      </td>
                      <td className="p-3.5 text-slateSubtle-700">{item.categorieNom}</td>
                      <td className="p-3.5 text-slateSubtle-700 flex items-center gap-1.5">
                        <HardHat className="w-3.5 h-3.5 text-gold-dark shrink-0" />
                        <span>{item.superviseurNom || 'Membre Commission'}</span>
                      </td>
                      <td className="p-3.5 text-slateSubtle-700">
                        {item.dateRealisation ? new Date(item.dateRealisation).toLocaleDateString('fr-FR') : '—'}
                      </td>
                      <td className="p-3.5 text-center text-slate-700 font-medium">
                        {item.tempsMinutes ? `${item.tempsMinutes} min` : '—'}
                      </td>
                      <td className="p-3.5 text-center font-black text-gendarmerie text-sm">
                        {isEvaluated && item.scoreObtenu !== null ? `${item.scoreObtenu} / 20` : '—'}
                      </td>
                      <td className="p-3.5 text-center">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border">
                          {item.niveauAutonomie || 'AUTONOME'}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">{getStatusBadge(item.statut, item.arretSecurite)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Observations instructeurs */}
      {evaluatorObservations.length > 0 && (
        <div className="bg-white rounded-2xl p-5 border border-slateSubtle-200 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slateSubtle-200">
            <FileText className="w-4 h-4 text-gold-dark" />
            <h3 className="font-bold text-sm text-gendarmerie uppercase tracking-wide">
              Observations des Commissions
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {evaluatorObservations.map((obs, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-cream-50/70 border border-slateSubtle-200 text-xs space-y-2">
                <div className="italic text-slateSubtle-800">« {obs.observation} »</div>
                <div className="pt-2 border-t border-slateSubtle-100 flex items-center justify-between text-[11px] text-slateSubtle-600">
                  <span className="font-bold text-gendarmerie">{obs.atelierTitre}</span>
                  <span>{obs.superviseurNom}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <Link
          to="/eleve/guide"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gendarmerie hover:text-gold-dark transition-colors"
        >
          <span>Consulter le GUIDE officiel</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

