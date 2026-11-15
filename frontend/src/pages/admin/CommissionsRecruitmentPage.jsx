// ==============================================================================
// ORIENT-GR — Espace Administration Centrale :
// « Gestion des Commissions & Résultats de Recrutement »
// Tableau de Bord des Candidatures Positives, Décisions Administratives et Ventilation
// ==============================================================================

import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { commissionService } from '../../services/commissionService.js';
import {
  Shield,
  Users,
  Award,
  Sparkles,
  GitCompare,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  FileText,
  AlertCircle,
  Plus,
  RefreshCw,
  X,
  ExternalLink,
  ChevronRight,
  UserCheck,
  Laptop,
  Network,
  ShieldAlert,
  Wrench,
  Cpu,
  Microscope,
  Boxes,
  ThumbsUp,
  ThumbsDown,
  Check,
  AlertTriangle,
  Calendar,
  Layers
} from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

const COMMISSION_ICONS = {
  Laptop,
  Network,
  ShieldAlert,
  Wrench,
  Cpu,
  Microscope,
  Boxes
};

export default function CommissionsRecruitmentPage() {
  const { user } = useAuth();
  const { addToast } = useToast() || {};

  // Onglet principal : 'dossiers_positifs' en premier comme requis par la spécification
  const [activeTab, setActiveTab] = useState('dossiers_positifs'); // 'dossiers_positifs' | 'candidats' | 'commissions'
  const [loading, setLoading] = useState(true);

  // Données globales
  const [summaryData, setSummaryData] = useState({ kpis: {}, candidats: [], commissions: [] });

  // Données Dossiers Positifs Transmis (Section 6 & 7)
  const [positiveData, setPositiveData] = useState({ kpis: {}, dossiers: [], commissions: [] });
  const [positiveLoading, setPositiveLoading] = useState(false);
  const [positiveSearch, setPositiveSearch] = useState('');
  const [positiveCommFilter, setPositiveCommFilter] = useState('ALL');
  const [positiveStatusFilter, setPositiveStatusFilter] = useState('ALL'); // 'ALL' | 'EN_ATTENTE' | 'ACCEPTE' | 'REFUSE'

  // Modale d'examen & décision administrative d'un dossier positif
  const [selectedDossier, setSelectedDossier] = useState(null);
  const [adminDecisionForm, setAdminDecisionForm] = useState({
    decision: 'ACCEPTE', // 'ACCEPTE' | 'REFUSE'
    justification: '',
    specialiteRetenueCode: ''
  });
  const [savingAdminDecision, setSavingAdminDecision] = useState(false);

  // Recherche & filtres pour l'onglet Candidats globaux
  const [searchQuery, setSearchQuery] = useState('');
  const [commFilter, setCommFilter] = useState('ALL');
  const [filiereFilter, setFiliereFilter] = useState('ALL');

  // Ventilation en masse
  const [ventilating, setVentilating] = useState(false);

  // Comparateur IA
  const [comparisonCandidate, setComparisonCandidate] = useState(null);
  const [comparisonReport, setComparisonReport] = useState(null);
  const [comparisonLoading, setComparisonLoading] = useState(false);

  // 1. Charger les dossiers positifs transmis à l'ADMIN
  const loadPositiveDossiers = async () => {
    try {
      setPositiveLoading(true);
      const res = await commissionService.getPositiveDossiers({
        commissionId: positiveCommFilter !== 'ALL' ? positiveCommFilter : null,
        statutDecision: positiveStatusFilter !== 'ALL' ? positiveStatusFilter : null,
        search: positiveSearch.trim() || null
      });
      setPositiveData(res);
    } catch (err) {
      console.error('Erreur chargement dossiers positifs:', err);
      if (addToast) addToast("Erreur lors de la récupération des dossiers positifs transmis.", 'error');
    } finally {
      setPositiveLoading(false);
    }
  };

  // 2. Charger les données globales de synthèse
  const loadSummaryData = async () => {
    try {
      setLoading(true);
      const res = await commissionService.getAdminRecruitmentSummary();
      setSummaryData(res);
    } catch (err) {
      console.error('Erreur chargement résumé recrutement:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSummaryData();
    loadPositiveDossiers();
  }, []);

  useEffect(() => {
    loadPositiveDossiers();
  }, [positiveCommFilter, positiveStatusFilter]);

  // Filtrage des candidats globaux
  const filteredCandidates = useMemo(() => {
    return (summaryData.candidats || []).filter(c => {
      if (commFilter !== 'ALL') {
        const hasComm = (c.Commissions || []).some(com => com.CommissionCode === commFilter || com.CommissionId === Number(commFilter));
        if (!hasComm) return false;
      }
      if (filiereFilter !== 'ALL' && c.FiliereEntree !== filiereFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nom = `${c.Nom || ''} ${c.Prenom || ''}`.toLowerCase();
        const mat = (c.Matricule || '').toLowerCase();
        const dip = (c.DiplomeOrigine || '').toLowerCase();
        if (!nom.includes(q) && !mat.includes(q) && !dip.includes(q)) return false;
      }
      return true;
    });
  }, [summaryData.candidats, commFilter, filiereFilter, searchQuery]);

  // Filtrage local des dossiers positifs
  const filteredPositiveDossiers = useMemo(() => {
    return (positiveData.dossiers || []).filter(d => {
      if (positiveCommFilter !== 'ALL' && String(d.commission?.id) !== String(positiveCommFilter)) {
        return false;
      }
      if (positiveStatusFilter !== 'ALL') {
        if (positiveStatusFilter === 'EN_ATTENTE' && d.statutDecision !== 'EN_ATTENTE') return false;
        if (positiveStatusFilter === 'ACCEPTE' && d.statutDecision !== 'ACCEPTE') return false;
        if (positiveStatusFilter === 'REFUSE' && d.statutDecision !== 'REFUSE') return false;
      }
      if (positiveSearch.trim()) {
        const q = positiveSearch.toLowerCase().trim();
        const nom = (d.nomComplet || '').toLowerCase();
        const mat = (d.matricule || '').toLowerCase();
        const comm = (d.commission?.nom || '').toLowerCase();
        if (!nom.includes(q) && !mat.includes(q) && !comm.includes(q)) return false;
      }
      return true;
    });
  }, [positiveData.dossiers, positiveCommFilter, positiveStatusFilter, positiveSearch]);

  // Ouvrir la modale d'examen & décision administrative
  const handleOpenDossierDecision = (dossier) => {
    setSelectedDossier(dossier);
    setAdminDecisionForm({
      decision: dossier.statutDecision === 'REFUSE' ? 'REFUSE' : 'ACCEPTE',
      justification: dossier.decision?.justificationDecision || '',
      specialiteRetenueCode: dossier.commission?.code || ''
    });
  };

  // Enregistrer la décision administrative souveraine
  const handleSaveAdminDecision = async () => {
    if (!selectedDossier) return;
    if (!adminDecisionForm.justification.trim()) {
      if (addToast) addToast("Une justification administrative officielle est obligatoire.", 'warning');
      return;
    }

    try {
      setSavingAdminDecision(true);
      await commissionService.savePositiveDossierDecision(selectedDossier.assignmentId, {
        decision: adminDecisionForm.decision,
        justification: adminDecisionForm.justification.trim(),
        specialiteRetenueCode: adminDecisionForm.specialiteRetenueCode || selectedDossier.commission?.code
      });

      if (addToast) {
        addToast(`Décision '${adminDecisionForm.decision}' enregistrée avec succès dans SQL Server.`, 'success');
      }

      setSelectedDossier(null);
      await loadPositiveDossiers();
      await loadSummaryData();
    } catch (err) {
      console.error('Erreur enregistrement décision admin:', err);
      if (addToast) addToast(err.response?.data?.error || "Erreur lors de l'enregistrement de la décision.", 'error');
    } finally {
      setSavingAdminDecision(false);
    }
  };

  // Déclencher la ventilation en masse par l'IA
  const handleTriggerVentilation = async (candidateId = null) => {
    try {
      setVentilating(true);
      const res = await commissionService.triggerVentilation(candidateId);
      if (addToast) {
        addToast(candidateId ? "Ventilation IA effectuée avec succès." : `Ventilation automatique achevée (${res.totalTraites || 0} élèves traités).`, 'success');
      }
      await loadSummaryData();
      await loadPositiveDossiers();
    } catch (err) {
      console.error('Erreur ventilation:', err);
      if (addToast) addToast("Erreur lors du calcul de la ventilation.", 'error');
    } finally {
      setVentilating(false);
    }
  };

  // Déclencher le comparateur IA
  const handleTriggerComparison = async (candidate) => {
    setComparisonCandidate(candidate);
    setComparisonLoading(true);
    setComparisonReport(null);

    try {
      const report = await commissionService.triggerComparison(candidate.UtilisateurId);
      setComparisonReport(report);
    } catch (err) {
      console.error('Erreur comparateur IA:', err);
      if (addToast) addToast("Erreur lors de la génération du rapport comparatif.", 'error');
    } finally {
      setComparisonLoading(false);
    }
  };

  const posKpis = positiveData.kpis || {};

  return (
    <div className="space-y-6">
      {/* 1. EN-TÊTE OFFICIEL DE COMMANDEMENT */}
      <div className="bg-gradient-to-r from-[#153B2B] via-[#1B4332] to-[#0E291E] text-white p-6 sm:p-7 rounded-2xl shadow-card border border-gold/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
            <span className="text-xs uppercase tracking-wider font-bold text-gold-light font-mono">
              Commandement de la Gendarmerie Royale • Direction du Recrutement
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight flex items-center gap-3">
            <Shield className="w-8 h-8 text-gold shrink-0" />
            <span>Sélection & Recrutement par Commissions Spécialisées</span>
          </h1>
          <p className="text-sm text-slate-200 max-w-3xl leading-relaxed">
            Arbitrage souverain des candidatures positives transmises par les commissions spécialisées, ventilation intelligente et décisions officielles de commandement.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="gold"
            size="md"
            onClick={() => handleTriggerVentilation()}
            disabled={ventilating}
            className="text-xs sm:text-sm font-bold shadow-md cursor-pointer"
          >
            <Sparkles className="w-4 h-4 mr-1.5 text-[#153B2B]" />
            {ventilating ? 'Ventilation IA en cours...' : 'Ventiler tous les candidats'}
          </Button>
          <button
            onClick={() => { loadPositiveDossiers(); loadSummaryData(); }}
            className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer border border-white/15"
            title="Rafraîchir les données"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. NAVIGATION PAR ONGLETS INSTITUTIONNELS */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-2 shadow-xs flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-2">
          {/* Onglet 1 : Dossiers Positifs Transmis (Cœur de la Section 6) */}
          <button
            onClick={() => setActiveTab('dossiers_positifs')}
            className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeTab === 'dossiers_positifs'
                ? 'bg-[#153B2B] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Dossiers Positifs Transmis (Arbitrage Final)</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
              activeTab === 'dossiers_positifs' ? 'bg-gold text-[#153B2B]' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {posKpis.totalDossiersPositifs || 0}
            </span>
          </button>

          {/* Onglet 2 : Tous les Candidats & Ventilation */}
          <button
            onClick={() => setActiveTab('candidats')}
            className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeTab === 'candidats'
                ? 'bg-[#153B2B] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4 text-gold" />
            <span>Tous les Candidats & Ventilation</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-slate-100 text-slate-700">
              {summaryData.candidats?.length || 0}
            </span>
          </button>

          {/* Onglet 3 : Référentiel Commissions */}
          <button
            onClick={() => setActiveTab('commissions')}
            className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeTab === 'commissions'
                ? 'bg-[#153B2B] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Shield className="w-4 h-4 text-gold" />
            <span>Commissions Spécialisées</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-slate-100 text-slate-700">
              {summaryData.commissions?.length || 7}
            </span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* SECTION 6 & 7 : DOSSIERS POSITIFS TRANSMIS (TABLEAU DE BORD ADMIN)     */}
      {/* ===================================================================== */}
      {activeTab === 'dossiers_positifs' && (
        <div className="space-y-6">
          {/* TABLEAU DE BORD ADMIN : LES 6 COMPTEURS OFFICIELS EXIGÉS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs text-center">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-600 block">Dossiers Positifs</span>
              <p className="text-2xl sm:text-3xl font-bold font-mono text-[#153B2B] mt-1.5">{posKpis.totalDossiersPositifs || 0}</p>
              <span className="text-xs text-slate-500 mt-0.5 block">Transmis par comm.</span>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs text-center">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-600 block">Élèves Concernés</span>
              <p className="text-2xl sm:text-3xl font-bold font-mono text-slate-800 mt-1.5">{posKpis.elevesConcernes || 0}</p>
              <span className="text-xs text-slate-500 mt-0.5 block">Candidats uniques</span>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs text-center">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-600 block">Commissions</span>
              <p className="text-2xl sm:text-3xl font-bold font-mono text-slate-800 mt-1.5">{posKpis.commissionsContributrices || 0}</p>
              <span className="text-xs text-slate-500 mt-0.5 block">Ayant délibéré</span>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-300 shadow-2xs text-center">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-700 block">En Attente</span>
              <p className="text-2xl sm:text-3xl font-bold font-mono text-amber-600 mt-1.5">{posKpis.decisionsEnAttente || 0}</p>
              <span className="text-xs text-amber-700 mt-0.5 block">À arbitrer</span>
            </div>

            <div className="bg-emerald-50/90 p-4 sm:p-5 rounded-2xl border border-emerald-300 shadow-2xs text-center">
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-800 block">Acceptés</span>
              <p className="text-2xl sm:text-3xl font-bold font-mono text-emerald-700 mt-1.5">{posKpis.decisionsAcceptees || 0}</p>
              <span className="text-xs text-emerald-800 mt-0.5 block">Décisions signées</span>
            </div>

            <div className="bg-rose-50/90 p-4 sm:p-5 rounded-2xl border border-rose-300 shadow-2xs text-center">
              <span className="text-xs uppercase font-bold tracking-wider text-rose-800 block">Refusés</span>
              <p className="text-2xl sm:text-3xl font-bold font-mono text-rose-700 mt-1.5">{posKpis.decisionsRefusees || 0}</p>
              <span className="text-xs text-rose-800 mt-0.5 block">Non retenus</span>
            </div>
          </div>

          {/* BARRE DE RECHERCHE ET FILTRES */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3.5">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={positiveSearch}
                onChange={(e) => setPositiveSearch(e.target.value)}
                placeholder="Rechercher par élève, matricule ou commission..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-200 focus:bg-white focus:border-gold outline-hidden transition"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Filtre Commission */}
              <select
                value={positiveCommFilter}
                onChange={(e) => setPositiveCommFilter(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-700 outline-hidden focus:border-gold cursor-pointer"
              >
                <option value="ALL">Toutes les Commissions</option>
                {(positiveData.commissions || []).map(c => (
                  <option key={c.CommissionId} value={c.CommissionId}>{c.Nom}</option>
                ))}
              </select>

              {/* Filtre Statut Décision */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPositiveStatusFilter('ALL')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition ${
                    positiveStatusFilter === 'ALL' ? 'bg-[#153B2B] text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Tous ({posKpis.totalDossiersPositifs || 0})
                </button>
                <button
                  onClick={() => setPositiveStatusFilter('EN_ATTENTE')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition ${
                    positiveStatusFilter === 'EN_ATTENTE' ? 'bg-amber-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  En Attente ({posKpis.decisionsEnAttente || 0})
                </button>
                <button
                  onClick={() => setPositiveStatusFilter('ACCEPTE')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition ${
                    positiveStatusFilter === 'ACCEPTE' ? 'bg-emerald-700 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Acceptés ({posKpis.decisionsAcceptees || 0})
                </button>
                <button
                  onClick={() => setPositiveStatusFilter('REFUSE')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition ${
                    positiveStatusFilter === 'REFUSE' ? 'bg-rose-700 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Refusés ({posKpis.decisionsRefusees || 0})
                </button>
              </div>
            </div>
          </div>

          {/* TABLEAU DES DOSSIERS TRANSMIS À L'ADMINISTRATION */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            {positiveLoading ? (
              <div className="py-16 flex justify-center">
                <LoadingSpinner text="Chargement des dossiers positifs..." />
              </div>
            ) : filteredPositiveDossiers.length === 0 ? (
              <div className="py-16 text-center space-y-2.5">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">Aucun dossier positif à afficher</h3>
                <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                  Les dossiers des candidats apparaissent automatiquement ici dès qu'une commission soumet une évaluation complète avec une recommandation IA POSITIVE.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-xs">
                      <th className="py-3.5 px-4 sm:px-5">Élève Gendarme</th>
                      <th className="py-3.5 px-4 sm:px-5">Commission d'Origine</th>
                      <th className="py-3.5 px-4 text-center">Pratique /20</th>
                      <th className="py-3.5 px-4 text-center">Entretien /20</th>
                      <th className="py-3.5 px-4 text-center">Note Globale</th>
                      <th className="py-3.5 px-4 text-center">Recommandation IA</th>
                      <th className="py-3.5 px-4 text-center">Transmission</th>
                      <th className="py-3.5 px-4 text-center">Décision Administrative</th>
                      <th className="py-3.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPositiveDossiers.map((dos) => {
                      const CommIcon = COMMISSION_ICONS[dos.commission?.icone] || Laptop;
                      const isMulti = dos.isMultiPositive;

                      return (
                        <tr key={dos.assignmentId} className="hover:bg-cream-50/70 transition-colors">
                          {/* Élève */}
                          <td className="py-4 px-4 sm:px-5">
                            <div className="font-bold text-[#153B2B] text-sm flex items-center gap-2 flex-wrap">
                              <span>{dos.nomComplet}</span>
                              {isMulti && (
                                <span
                                  className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1"
                                  title="Cet élève a également reçu un résultat POSITIF dans une ou plusieurs autres commissions."
                                >
                                  <Layers className="w-3 h-3 text-amber-700" />
                                  Multi-Positif ({dos.autresCommissionsPositives?.length + 1})
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-600 font-mono mt-0.5">
                              Matricule : {dos.matricule} • {dos.diplomeOrigine || 'Général'}
                            </div>
                          </td>

                          {/* Commission */}
                          <td className="py-4 px-4 sm:px-5">
                            <div className="flex items-center gap-2.5">
                              <CommIcon className="w-5 h-5 text-[#153B2B] shrink-0" />
                              <div>
                                <div className="font-semibold text-slate-900 text-sm">{dos.commission?.nom}</div>
                                <div className="text-xs text-slate-500 font-mono">{dos.commission?.code}</div>
                              </div>
                            </div>
                          </td>

                          {/* Pratique */}
                          <td className="py-4 px-4 text-center">
                            <span className="font-mono font-bold text-sm text-emerald-800">
                              {dos.evaluation?.notePratiqueSur20}/20
                            </span>
                          </td>

                          {/* Entretien */}
                          <td className="py-4 px-4 text-center">
                            <span className="font-mono font-bold text-sm text-emerald-800">
                              {dos.evaluation?.noteEntretienSur20}/20
                            </span>
                          </td>

                          {/* Globale */}
                          <td className="py-4 px-4 text-center">
                            <span className="px-2.5 py-1 rounded-lg font-mono font-bold text-sm bg-emerald-100 text-emerald-900 border border-emerald-200">
                              {dos.evaluation?.noteGlobaleSur20}/20
                            </span>
                          </td>

                          {/* Recommandation IA */}
                          <td className="py-4 px-4 text-center">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                              POSITIF
                            </span>
                          </td>

                          {/* Transmission */}
                          <td className="py-4 px-4 text-center">
                            <span className="text-xs font-mono font-medium text-slate-700 block">
                              {dos.transmission?.dateTransmissionAdmin ? new Date(dos.transmission.dateTransmissionAdmin).toLocaleDateString('fr-FR') : 'Reçue'}
                            </span>
                          </td>

                          {/* Statut Décision */}
                          <td className="py-4 px-4 text-center">
                            {dos.statutDecision === 'ACCEPTE' ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-300">
                                <Check className="w-3.5 h-3.5 text-emerald-700" />
                                ACCEPTÉ
                              </span>
                            ) : dos.statutDecision === 'REFUSE' ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-900 border border-rose-300">
                                <X className="w-3.5 h-3.5 text-rose-700" />
                                REFUSÉ
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                                <Clock className="w-3.5 h-3.5 text-amber-700" />
                                En attente
                              </span>
                            )}
                          </td>

                          {/* Action */}
                          <td className="py-4 px-4 text-right">
                            <Button
                              variant="gold"
                              size="sm"
                              onClick={() => handleOpenDossierDecision(dos)}
                              className="text-xs font-bold px-3.5 py-1.5 cursor-pointer shadow-xs"
                            >
                              <FileText className="w-3.5 h-3.5 mr-1.5" />
                              {dos.statutDecision === 'EN_ATTENTE' ? 'Arbitrer' : 'Consulter'}
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* ONGLET 2 : TOUS LES CANDIDATS & VENTILATION MULTI-COMMISSIONS        */}
      {/* ===================================================================== */}
      {activeTab === 'candidats' && (
        <div className="space-y-5">
          {/* Barre de Recherche et Filtres */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par nom, matricule ou diplôme..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-200 focus:bg-white focus:border-gold outline-hidden transition"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <select
                value={commFilter}
                onChange={(e) => setCommFilter(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-700 outline-hidden focus:border-gold cursor-pointer"
              >
                <option value="ALL">Toutes les Commissions</option>
                {(summaryData.commissions || []).map(c => (
                  <option key={c.CommissionId} value={c.Code}>{c.Nom}</option>
                ))}
              </select>

              <select
                value={filiereFilter}
                onChange={(e) => setFiliereFilter(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-700 outline-hidden focus:border-gold cursor-pointer"
              >
                <option value="ALL">Toutes les Filières</option>
                <option value="Scientifique">Scientifique</option>
                <option value="Technique">Technique</option>
                <option value="Littéraire">Littéraire</option>
              </select>
            </div>
          </div>

          {/* Tableau Général des Candidats */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            {loading ? (
              <div className="py-16 flex justify-center">
                <LoadingSpinner text="Chargement des candidats..." />
              </div>
            ) : filteredCandidates.length === 0 ? (
              <div className="py-16 text-center text-slate-600 text-sm font-semibold">
                Aucun candidat ne correspond aux filtres.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-xs">
                      <th className="py-3.5 px-4 sm:px-5">Élève</th>
                      <th className="py-3.5 px-4 sm:px-5">Diplôme d'Origine</th>
                      <th className="py-3.5 px-4 sm:px-5">Commissions Assignées</th>
                      <th className="py-3.5 px-4 text-center">Évaluations Présentielles</th>
                      <th className="py-3.5 px-4 text-center">Décision Finale</th>
                      <th className="py-3.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCandidates.map((cand) => {
                      const comms = cand.Commissions || [];
                      const evaluatedComms = comms.filter(c => c.StatutEvaluation === 'SOUMISE' || c.StatutEvaluation === 'VALIDEE');

                      return (
                        <tr key={cand.UtilisateurId} className="hover:bg-cream-50/70 transition-colors">
                          <td className="py-4 px-4 sm:px-5">
                            <div className="font-bold text-[#153B2B] text-sm">{cand.Nom} {cand.Prenom}</div>
                            <div className="text-xs text-slate-600 font-mono mt-0.5">Matricule : {cand.Matricule}</div>
                          </td>

                          <td className="py-4 px-4 sm:px-5">
                            <div className="font-semibold text-slate-800 text-sm">{cand.DiplomeOrigine || 'Baccalauréat'}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{cand.FiliereEntree}</div>
                          </td>

                          <td className="py-4 px-4 sm:px-5">
                            <div className="flex flex-wrap gap-1.5">
                              {comms.length > 0 ? (
                                comms.map((cm, i) => (
                                  <span
                                    key={i}
                                    className={`px-2.5 py-1 rounded-lg font-mono text-xs font-bold border ${
                                      cm.RecommandationIA === 'POSITIF'
                                        ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                                        : cm.RecommandationIA === 'NEGATIF'
                                        ? 'bg-rose-50 text-rose-900 border-rose-300'
                                        : 'bg-slate-100 text-slate-700 border-slate-200'
                                    }`}
                                  >
                                    {cm.CommissionCode}
                                  </span>
                                ))
                              ) : (
                                <span className="text-slate-400 italic text-xs">Non encore ventilé</span>
                              )}
                            </div>
                          </td>

                          <td className="py-4 px-4 text-center">
                            <span className="font-mono font-bold text-sm text-slate-800">
                              {evaluatedComms.length} / {comms.length}
                            </span>
                          </td>

                          <td className="py-4 px-4 text-center">
                            {cand.DecisionAdministrative ? (
                              <span className="px-3 py-1 rounded-full text-xs font-bold bg-gold/15 text-gold-dark border border-gold/40">
                                {cand.DecisionAdministrative.StatutDecision}
                              </span>
                            ) : (
                              <span className="text-xs text-slate-400 italic">En attente</span>
                            )}
                          </td>

                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {comms.length > 1 && (
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => handleTriggerComparison(cand)}
                                  className="text-xs font-bold px-3 py-1.5"
                                >
                                  <GitCompare className="w-3.5 h-3.5 mr-1 text-[#153B2B]" />
                                  Comparer
                                </Button>
                              )}
                              {comms.length === 0 && (
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={() => handleTriggerVentilation(cand.UtilisateurId)}
                                  className="text-xs font-bold bg-[#153B2B] px-3 py-1.5"
                                >
                                  Ventiler IA
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* ONGLET 3 : RÉFÉRENTIEL DES COMMISSIONS                                 */}
      {/* ===================================================================== */}
      {activeTab === 'commissions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(summaryData.commissions || []).map((comm) => {
            const Icon = COMMISSION_ICONS[comm.Icone] || Laptop;
            return (
              <div key={comm.CommissionId} className="bg-white rounded-2xl border border-slateSubtle-200 p-5 shadow-xs space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center text-[#153B2B]">
                      <Icon className="w-5 h-5 text-[#153B2B]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm font-serif">{comm.Nom}</h4>
                      <span className="font-mono text-[10px] text-slate-500">{comm.Code}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {comm.Description || "Évaluation et sélection des candidats."}
                </p>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slateSubtle-100 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Affectés</span>
                    <span className="font-mono font-bold text-slate-800">{comm.NombreCandidatsAffectes || 0}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-700 uppercase font-bold block">Positifs</span>
                    <span className="font-mono font-bold text-emerald-700">{comm.NombrePositifs || 0}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-rose-700 uppercase font-bold block">Négatifs</span>
                    <span className="font-mono font-bold text-rose-700">{comm.NombreNegatifs || 0}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODALE DE CONSULTATION & DÉCISION ADMINISTRATIVE OFFICIELLE (SECTION 6 & 7) */}
      {/* ===================================================================== */}
      {selectedDossier && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-150">
            {/* En-tête */}
            <div className="bg-gradient-to-r from-[#153B2B] to-[#1F533E] text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs uppercase font-bold text-gold font-mono tracking-wider">
                    Dossier de Sélection Officiel • Décision Administrative
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-200 border border-emerald-400/40">
                    Recommandation IA POSITIVE
                  </span>
                </div>
                <h3 className="text-xl font-bold font-serif text-white flex items-center gap-2.5 flex-wrap">
                  <span>{selectedDossier.nomComplet}</span>
                  <span className="text-sm font-mono font-normal text-slate-200">
                    ({selectedDossier.matricule}) • {selectedDossier.commission?.nom}
                  </span>
                </h3>
              </div>
              <button
                onClick={() => setSelectedDossier(null)}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Corps Défilable */}
            <div className="p-6 sm:p-7 overflow-y-auto space-y-6 flex-1 text-sm leading-relaxed">
              {/* CAS PARTICULIER SECTION 7 : ÉLÈVE POSITIF DANS PLUSIEURS COMMISSIONS */}
              {selectedDossier.isMultiPositive && selectedDossier.autresCommissionsPositives?.length > 0 && (
                <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 text-amber-950 space-y-3">
                  <div className="flex items-center gap-2.5 text-amber-900 font-bold text-base">
                    <Layers className="w-5 h-5 text-amber-700 shrink-0" />
                    <span>Cas Particulier Multi-Commissions : Candidat Positif dans plusieurs Commissions</span>
                  </div>
                  <p className="text-sm leading-relaxed text-amber-900">
                    Cet élève a également reçu une recommandation <strong>POSITIVE</strong> de la part d'autres commissions spécialisées. Vous pouvez comparer les résultats ci-dessous et décider souverainement pour chaque commission sans que l'une n'annule l'autre.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1.5">
                    {selectedDossier.autresCommissionsPositives.map((autre, idx) => (
                      <div key={idx} className="bg-white rounded-xl p-4 border border-amber-200 shadow-2xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-sm">{autre.CommissionNom}</span>
                          <span className="font-mono text-xs text-slate-500 font-semibold">{autre.CommissionCode}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-slate-600">Note Globale : <strong className="text-emerald-800 font-mono font-bold">{autre.NoteGlobaleSur20}/20</strong></span>
                          <span className="text-slate-600">Pratique : <strong className="font-mono font-bold">{autre.NotePratiqueSur20}/20</strong></span>
                        </div>
                        {autre.DecisionAutre && (
                          <div className="text-xs text-gold-dark font-bold pt-1 border-t border-slate-100">
                            Décision Admin sur cette commission : {autre.DecisionAutre}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* RÉSULTAT DE L'ÉVALUATION PHYSIQUE DE CETTE COMMISSION */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#153B2B]" />
                    Évaluation Présentielle & Notes du Jury
                  </span>
                  <span className="text-xs font-mono text-slate-600 font-medium">
                    Évalué par : {selectedDossier.evaluation?.nomEvaluateur || 'Jury Commission'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-center">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-xs uppercase font-bold tracking-wider text-slate-600 block">Test Pratique</span>
                    <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-800 block mt-1">
                      {selectedDossier.evaluation?.notePratiqueSur20}/20
                    </span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-xs uppercase font-bold tracking-wider text-slate-600 block">Entretien Présentiel</span>
                    <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-800 block mt-1">
                      {selectedDossier.evaluation?.noteEntretienSur20}/20
                    </span>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-300 shadow-2xs">
                    <span className="text-xs uppercase font-bold tracking-wider text-emerald-900 block">Note Globale</span>
                    <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-800 block mt-1">
                      {selectedDossier.evaluation?.noteGlobaleSur20}/20
                    </span>
                  </div>
                </div>

                {/* Observations */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-700 block">Observations du Jury :</span>
                  <p className="text-slate-800 bg-white p-4 rounded-xl border border-slate-200 leading-relaxed italic text-sm">
                    "{selectedDossier.evaluation?.observationsJury || "Candidat ayant fait preuve d'une excellente rigueur opérationnelle."}"
                  </p>
                </div>

                {selectedDossier.evaluation?.commentairesComplementaires && (
                  <div className="space-y-1.5">
                    <span className="text-xs uppercase font-bold tracking-wider text-slate-700 block">Commentaires Complémentaires :</span>
                    <p className="text-slate-700 text-sm bg-white p-3.5 rounded-xl border border-slate-200">
                      {selectedDossier.evaluation.commentairesComplementaires}
                    </p>
                  </div>
                )}
              </div>

              {/* ANALYSE IA DE VALIDATION */}
              <div className="bg-emerald-50/70 rounded-2xl border border-emerald-300 p-5 space-y-2.5">
                <span className="font-bold text-emerald-950 flex items-center gap-2 text-base">
                  <Sparkles className="w-5 h-5 text-gold shrink-0" />
                  Rapport de Synthèse IA & Justification d'Admissibilité
                </span>
                <p className="text-emerald-950 text-sm leading-relaxed">
                  {selectedDossier.analyseIA?.justificationIA || selectedDossier.analyseIA?.resumeAnalyseIA}
                </p>
              </div>

              {/* FORMULAIRE DE DÉCISION ADMINISTRATIVE SOUVERAINE (ADMIN) */}
              <div className="bg-white rounded-2xl border-2 border-gold/50 p-5 sm:p-6 space-y-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <Shield className="w-5 h-5 text-gold" />
                    Décision Administrative Officielle du Commandement
                  </span>
                  <span className="text-xs text-slate-600 font-mono font-medium">
                    Autorité : {user?.prenom} {user?.nom} ({user?.matricule})
                  </span>
                </div>

                {/* Choix Décision : ACCEPTE vs REFUSE */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900 block">
                    Nature de la Décision Administrative <span className="text-rose-600">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <button
                      type="button"
                      onClick={() => setAdminDecisionForm({ ...adminDecisionForm, decision: 'ACCEPTE' })}
                      className={`p-4 rounded-xl border text-sm font-bold flex items-center justify-center gap-2.5 cursor-pointer transition ${
                        adminDecisionForm.decision === 'ACCEPTE'
                          ? 'bg-emerald-700 text-white border-emerald-800 shadow-md ring-2 ring-emerald-500/30'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>ACCEPTER (Affectation Confirmée)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAdminDecisionForm({ ...adminDecisionForm, decision: 'REFUSE' })}
                      className={`p-4 rounded-xl border text-sm font-bold flex items-center justify-center gap-2.5 cursor-pointer transition ${
                        adminDecisionForm.decision === 'REFUSE'
                          ? 'bg-rose-700 text-white border-rose-800 shadow-md ring-2 ring-rose-500/30'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span>REFUSER (Candidature Non Retenue)</span>
                    </button>
                  </div>
                </div>

                {/* Justification administrative obligatoire */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900 block">
                    Motivation Administrative & Ordre de Commandement <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={adminDecisionForm.justification}
                    onChange={(e) => setAdminDecisionForm({ ...adminDecisionForm, justification: e.target.value })}
                    placeholder="Précisez la motivation officielle en référence aux notes du jury et aux besoins de service..."
                    className="w-full p-4 rounded-xl border border-slate-300 focus:border-gold outline-hidden text-sm leading-relaxed"
                  />
                  <span className="text-xs text-slate-500 italic block">
                    L'IA formule uniquement une recommandation consultative. Seul le Commandement détient la compétence décisionnelle.
                  </span>
                </div>
              </div>
            </div>

            {/* Pied de Modale */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
              <Button variant="secondary" size="md" onClick={() => setSelectedDossier(null)} className="text-sm font-semibold">
                Fermer
              </Button>

              <Button
                variant="primary"
                size="md"
                disabled={savingAdminDecision || !adminDecisionForm.justification.trim()}
                onClick={handleSaveAdminDecision}
                className="bg-[#153B2B] hover:bg-[#1A4533] text-white text-sm font-bold shadow-xs cursor-pointer"
              >
                {savingAdminDecision ? 'Enregistrement SQL Server...' : 'Signer et Enregistrer la Décision Officielle'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODALE COMPARATEUR IA MULTI-COMMISSIONS */}
      {comparisonCandidate && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slateSubtle-200 shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-[#153B2B] to-[#1F533E] text-white p-5 flex items-center justify-between shrink-0">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-gold tracking-wider">
                  Moteur IA de Comparaison Multi-Commissions
                </span>
                <h3 className="text-base font-bold font-serif text-white">
                  Rapport Comparatif • {comparisonCandidate.Prenom} {comparisonCandidate.Nom} ({comparisonCandidate.Matricule})
                </h3>
              </div>
              <button
                onClick={() => setComparisonCandidate(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              {comparisonLoading ? (
                <div className="py-12 flex justify-center">
                  <LoadingSpinner text="Analyse comparative multi-commissions en cours..." />
                </div>
              ) : (
                <>
                  <div className="p-4 rounded-2xl bg-cream-50 border border-gold/30 space-y-2">
                    <span className="text-[11px] font-bold text-gendarmerie uppercase tracking-wider block">
                      Recommandation Principale IA : {comparisonReport?.recommandationPrincipale?.commissionNom}
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans">
                      {comparisonReport?.explicationIA}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="bg-slate-50 p-4 border-t border-slateSubtle-200 flex justify-end">
              <Button variant="secondary" size="sm" onClick={() => setComparisonCandidate(null)}>
                Fermer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
