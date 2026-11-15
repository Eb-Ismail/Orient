// ==============================================================================
// ORIENT-GR — Espace Centralisé des Commissions Spécialisées de Recrutement
// Interface institutionnelle d'évaluation présentielle, d'analyse IA et de transmission
// ==============================================================================

import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { commissionService } from '../../services/commissionService.js';
import {
  Shield,
  Users,
  Award,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  FileText,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  Lock,
  Edit3,
  X,
  Laptop,
  Network,
  ShieldAlert,
  Wrench,
  Cpu,
  Microscope,
  Boxes,
  Send,
  UserCheck,
  Calendar,
  Info,
  Check,
  ThumbsUp,
  ThumbsDown,
  AlertCircle
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

export default function CommissionDashboardPage() {
  const { user } = useAuth();
  const { addToast } = useToast() || {};

  const [commissions, setCommissions] = useState([]);
  const [selectedCommId, setSelectedCommId] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [candidatesLoading, setCandidatesLoading] = useState(false);

  // Recherche et filtres (7 statuts demandés)
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'EN_ATTENTE' | 'CONVOQUE' | 'EN_COURS' | 'EVALUATION_TERMINEE' | 'POSITIF' | 'NEGATIF'

  // Modale d'évaluation
  const [activeCandidate, setActiveCandidate] = useState(null);
  const [candidateDetails, setCandidateDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [evalForm, setEvalForm] = useState({
    notePratiqueSur20: '',
    noteEntretienSur20: '',
    noteComplementaireSur20: '',
    observations: '',
    commentairesComplementaires: '',
    pointsForts: [],
    axesAmelioration: [],
    avisCommission: 'FAVORABLE',
    dateEvaluation: new Date().toISOString().split('T')[0],
    nomEvaluateur: '',
    newPointFort: '',
    newAxe: ''
  });
  const [savingEval, setSavingEval] = useState(false);

  // Modale de demande de correction officielle
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [correctionMotif, setCorrectionMotif] = useState('');
  const [submittingCorrection, setSubmittingCorrection] = useState(false);

  // 1. Charger les commissions attribuées au membre connecté
  useEffect(() => {
    async function loadCommissions() {
      try {
        setLoading(true);
        const myComms = await commissionService.getMyCommissions();
        setCommissions(myComms || []);
        if (myComms && myComms.length > 0) {
          setSelectedCommId(myComms[0].CommissionId);
        }
      } catch (err) {
        console.error('Erreur chargement commissions:', err);
        if (addToast) addToast('Impossible de charger vos commissions assignées.', 'error');
      } finally {
        setLoading(false);
      }
    }
    loadCommissions();
  }, []);

  // 2. Charger les candidats de la commission sélectionnée
  useEffect(() => {
    if (!selectedCommId) return;

    async function loadCandidates() {
      try {
        setCandidatesLoading(true);
        const res = await commissionService.getCommissionCandidates(selectedCommId);
        setCandidates(res.candidates || []);
      } catch (err) {
        console.error('Erreur chargement candidats:', err);
        if (addToast) addToast('Impossible de charger la liste des candidats.', 'error');
      } finally {
        setCandidatesLoading(false);
      }
    }
    loadCandidates();
  }, [selectedCommId]);

  const selectedComm = commissions.find(c => c.CommissionId === selectedCommId) || commissions[0];

  // Calcul des 7 métriques obligatoires du Tableau de Bord Commission
  const stats = useMemo(() => {
    const total = candidates.length;
    let enAttente = 0;
    let convoques = 0;
    let enCours = 0;
    let termines = 0;
    let positifs = 0;
    let negatifs = 0;

    candidates.forEach(cand => {
      const sv = cand.StatutVentilation;
      const se = cand.StatutEvaluation;
      const recom = cand.RecommandationIA;

      if (recom === 'POSITIF' || sv === 'POSITIF' || sv === 'ACCEPTE') {
        positifs++;
        termines++;
      } else if (recom === 'NEGATIF' || sv === 'NEGATIF' || sv === 'REFUSE') {
        negatifs++;
        termines++;
      } else if (se === 'SOUMISE' || se === 'VALIDEE' || sv === 'EVALUATION_TERMINEE') {
        termines++;
      } else if (se === 'BROUILLON' || sv === 'EN_COURS') {
        enCours++;
      } else if (sv === 'CONVOQUE') {
        convoques++;
      } else {
        enAttente++;
      }
    });

    const notes = candidates
      .filter(c => c.NoteGlobaleSur20 !== null && c.NoteGlobaleSur20 !== undefined)
      .map(c => Number(c.NoteGlobaleSur20));
    const moyenne = notes.length > 0 ? +(notes.reduce((a, b) => a + b, 0) / notes.length).toFixed(1) : null;

    return { total, enAttente, convoques, enCours, termines, positifs, negatifs, moyenne };
  }, [candidates]);

  // Filtrage des candidats selon recherche et statut sélectionné
  const filteredCandidates = useMemo(() => {
    return candidates.filter(cand => {
      const sv = cand.StatutVentilation;
      const se = cand.StatutEvaluation;
      const recom = cand.RecommandationIA;

      if (statusFilter === 'POSITIF' && recom !== 'POSITIF' && sv !== 'POSITIF' && sv !== 'ACCEPTE') return false;
      if (statusFilter === 'NEGATIF' && recom !== 'NEGATIF' && sv !== 'NEGATIF' && sv !== 'REFUSE') return false;
      if (statusFilter === 'CONVOQUE' && sv !== 'CONVOQUE') return false;
      if (statusFilter === 'EN_COURS' && se !== 'BROUILLON' && sv !== 'EN_COURS') return false;
      if (statusFilter === 'EVALUATION_TERMINEE' && se !== 'SOUMISE' && se !== 'VALIDEE' && sv !== 'EVALUATION_TERMINEE' && sv !== 'POSITIF' && sv !== 'NEGATIF') return false;
      if (statusFilter === 'EN_ATTENTE') {
        const isFinished = se === 'SOUMISE' || se === 'VALIDEE' || sv === 'POSITIF' || sv === 'NEGATIF';
        const isProgress = se === 'BROUILLON' || sv === 'EN_COURS' || sv === 'CONVOQUE';
        if (isFinished || isProgress) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nom = `${cand.Nom || ''} ${cand.Prenom || ''}`.toLowerCase();
        const mat = (cand.Matricule || '').toLowerCase();
        const dip = (cand.DiplomeOrigine || '').toLowerCase();
        if (!nom.includes(q) && !mat.includes(q) && !dip.includes(q)) return false;
      }
      return true;
    });
  }, [candidates, searchQuery, statusFilter]);

  // Ouvrir le dossier candidat et initialiser le formulaire d'évaluation
  const handleOpenEvaluationModal = async (candidate) => {
    setActiveCandidate(candidate);
    setDetailsLoading(true);

    try {
      const details = await commissionService.getCandidateCommissionDetails(selectedCommId, candidate.UtilisateurId);
      setCandidateDetails(details);

      const existingEval = details?.evaluation;
      if (existingEval) {
        setEvalForm({
          notePratiqueSur20: existingEval.NotePratiqueSur20 !== null && existingEval.NotePratiqueSur20 !== undefined ? existingEval.NotePratiqueSur20 : '',
          noteEntretienSur20: existingEval.NoteEntretienSur20 !== null && existingEval.NoteEntretienSur20 !== undefined ? existingEval.NoteEntretienSur20 : '',
          noteComplementaireSur20: existingEval.NoteComplementaireSur20 !== null && existingEval.NoteComplementaireSur20 !== undefined ? existingEval.NoteComplementaireSur20 : '',
          observations: existingEval.Observations || '',
          commentairesComplementaires: existingEval.CommentairesComplementaires || '',
          pointsForts: existingEval.PointsForts || [],
          axesAmelioration: existingEval.AxesAmelioration || [],
          avisCommission: existingEval.AvisCommission || 'FAVORABLE',
          dateEvaluation: existingEval.DateEvaluation ? existingEval.DateEvaluation.split('T')[0] : new Date().toISOString().split('T')[0],
          nomEvaluateur: existingEval.NomEvaluateur || (existingEval.EvaluateurNom ? `${existingEval.EvaluateurPrenom || ''} ${existingEval.EvaluateurNom || ''}`.trim() : `${user?.prenom || ''} ${user?.nom || ''}`.trim()),
          newPointFort: '',
          newAxe: ''
        });
      } else {
        setEvalForm({
          notePratiqueSur20: '',
          noteEntretienSur20: '',
          noteComplementaireSur20: '',
          observations: '',
          commentairesComplementaires: '',
          pointsForts: [],
          axesAmelioration: [],
          avisCommission: 'FAVORABLE',
          dateEvaluation: new Date().toISOString().split('T')[0],
          nomEvaluateur: `${user?.prenom || ''} ${user?.nom || ''}`.trim() || 'Evaluateur Commission',
          newPointFort: '',
          newAxe: ''
        });
      }
    } catch (err) {
      console.error('Erreur chargement détails candidat:', err);
      if (addToast) addToast("Erreur lors de l'ouverture du dossier.", 'error');
    } finally {
      setDetailsLoading(false);
    }
  };

  // Passer un candidat en statut CONVOQUE
  const handleConvoquerCandidate = async (candidate, e) => {
    if (e) e.stopPropagation();
    try {
      await commissionService.updateCandidateStatus(selectedCommId, candidate.UtilisateurId, {
        assignmentId: candidate.AssignmentId,
        statut: 'CONVOQUE',
        dateConvocation: new Date().toISOString()
      });
      if (addToast) addToast(`Convocation enregistrée pour ${candidate.Prenom} ${candidate.Nom}.`, 'success');
      const res = await commissionService.getCommissionCandidates(selectedCommId);
      setCandidates(res.candidates || []);
    } catch (err) {
      console.error('Erreur convocation:', err);
      if (addToast) addToast("Erreur lors de l'enregistrement de la convocation.", 'error');
    }
  };

  // Enregistrer (brouillon) ou soumettre officiellement avec analyse IA et transmission
  const handleSubmitEvaluation = async (statut = 'SOUMISE') => {
    if (!activeCandidate || !selectedCommId) return;

    if (statut === 'SOUMISE') {
      if (evalForm.notePratiqueSur20 === '' || isNaN(parseFloat(evalForm.notePratiqueSur20))) {
        if (addToast) addToast("ÉVALUATION INCOMPLÈTE : La note du test pratique (/20) est obligatoire.", 'warning');
        return;
      }
      if (evalForm.noteEntretienSur20 === '' || isNaN(parseFloat(evalForm.noteEntretienSur20))) {
        if (addToast) addToast("ÉVALUATION INCOMPLÈTE : La note de l'entretien présentiel (/20) est obligatoire.", 'warning');
        return;
      }
      if (!evalForm.observations || !evalForm.observations.trim()) {
        if (addToast) addToast("Les observations du jury sont obligatoires pour valider l'évaluation.", 'warning');
        return;
      }
      if (!window.confirm("Êtes-vous sûr de vouloir soumettre cette évaluation ?\n\n• Une analyse IA sera générée automatiquement.\n• Si le résultat est POSITIF, le dossier sera transmis à la session ADMIN.\n• Si le résultat est NÉGATIF, il sera conservé dans votre commission.\n• L'évaluation sera officiellement verrouillée.")) {
        return;
      }
    }

    try {
      setSavingEval(true);
      const res = await commissionService.saveEvaluation(selectedCommId, activeCandidate.UtilisateurId, {
        assignmentId: activeCandidate.AssignmentId,
        notePratiqueSur20: evalForm.notePratiqueSur20 !== '' ? parseFloat(evalForm.notePratiqueSur20) : null,
        noteEntretienSur20: evalForm.noteEntretienSur20 !== '' ? parseFloat(evalForm.noteEntretienSur20) : null,
        noteComplementaireSur20: evalForm.noteComplementaireSur20 !== '' ? parseFloat(evalForm.noteComplementaireSur20) : null,
        observations: evalForm.observations,
        commentairesComplementaires: evalForm.commentairesComplementaires,
        pointsForts: evalForm.pointsForts,
        axesAmelioration: evalForm.axesAmelioration,
        avisCommission: evalForm.avisCommission,
        nomEvaluateur: evalForm.nomEvaluateur,
        statutEvaluation: statut
      });

      if (addToast) {
        addToast(res.message || (statut === 'SOUMISE' ? "Évaluation soumise et verrouillée." : "Brouillon sauvegardé."), 'success');
      }

      // Rafraîchir
      const refresh = await commissionService.getCommissionCandidates(selectedCommId);
      setCandidates(refresh.candidates || []);
      setActiveCandidate(null);
    } catch (err) {
      console.error('Erreur sauvegarde évaluation:', err);
      if (addToast) addToast(err.response?.data?.error || "Erreur lors de l'enregistrement de l'évaluation.", 'error');
    } finally {
      setSavingEval(false);
    }
  };

  // Traiter la demande de correction officielle
  const handleRequestCorrection = async () => {
    if (!candidateDetails?.evaluation?.EvaluationId) return;
    if (!correctionMotif.trim()) {
      if (addToast) addToast("Le motif officiel de la correction est obligatoire.", 'warning');
      return;
    }

    try {
      setSubmittingCorrection(true);
      await commissionService.requestEvaluationCorrection(candidateDetails.evaluation.EvaluationId, {
        motif: correctionMotif.trim()
      });
      if (addToast) addToast("Autorisation de correction accordée. Dossier déverrouillé pour modification.", 'success');
      setShowCorrectionModal(false);
      setCorrectionMotif('');

      // Recharger les détails
      const details = await commissionService.getCandidateCommissionDetails(selectedCommId, activeCandidate.UtilisateurId);
      setCandidateDetails(details);
      const refresh = await commissionService.getCommissionCandidates(selectedCommId);
      setCandidates(refresh.candidates || []);
    } catch (err) {
      console.error('Erreur demande correction:', err);
      if (addToast) addToast(err.response?.data?.error || "Erreur lors de la demande de correction.", 'error');
    } finally {
      setSubmittingCorrection(false);
    }
  };

  // Calcul dynamique de la note globale
  const dynamicNoteGlobale = useMemo(() => {
    const p = parseFloat(evalForm.notePratiqueSur20);
    const e = parseFloat(evalForm.noteEntretienSur20);
    const c = parseFloat(evalForm.noteComplementaireSur20);

    if (isNaN(p) || isNaN(e)) return null;
    if (!isNaN(c)) {
      return Number(((p * 0.45) + (e * 0.45) + (c * 0.10)).toFixed(2));
    }
    return Number(((p * 0.5) + (e * 0.5)).toFixed(2));
  }, [evalForm.notePratiqueSur20, evalForm.noteEntretienSur20, evalForm.noteComplementaireSur20]);

  if (loading) {
    return <LoadingSpinner text="Chargement de votre espace commission..." fullPage />;
  }

  if (commissions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <ShieldAlert className="w-16 h-16 text-amber-600 mx-auto mb-4" />
        <h2 className="text-xl font-bold font-serif text-[#153B2B]">Aucune commission assignée</h2>
        <p className="text-xs text-slate-600 mt-2">
          Votre compte n'est actuellement rattaché à aucune commission spécialisée de recrutement.
        </p>
      </div>
    );
  }

  const CommIcon = COMMISSION_ICONS[selectedComm?.Icone] || Laptop;
  const isLocked = candidateDetails?.evaluation?.EstVerrouillee === true;

  return (
    <div className="space-y-6">
      {/* 1. SÉLECTEUR DE COMMISSION MULTI-COMMISSIONS */}
      {commissions.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {commissions.map((c) => {
            const Icon = COMMISSION_ICONS[c.Icone] || Laptop;
            const isSelected = c.CommissionId === selectedCommId;
            return (
              <button
                key={c.CommissionId}
                onClick={() => setSelectedCommId(c.CommissionId)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all shadow-2xs shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#153B2B] text-white border-gold shadow-md'
                    : 'bg-white text-slate-700 border-slateSubtle-200 hover:bg-cream-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-gold' : 'text-slate-500'}`} />
                <span>{c.Nom}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* 2. EN-TÊTE OFFICIEL DE LA COMMISSION */}
      <div className="bg-gradient-to-r from-[#153B2B] via-[#1A4533] to-[#0E291E] text-white p-6 sm:p-7 rounded-2xl shadow-card border border-gold/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
            <span className="text-xs uppercase tracking-wider font-bold text-gold-light font-mono">
              Commission de Sélection & Recrutement • {selectedComm?.Code}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono font-medium border border-white/15">
              Évaluateur : {user?.prenom} {user?.nom} ({user?.matricule})
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight flex items-center gap-3">
            <CommIcon className="w-8 h-8 text-gold shrink-0" />
            <span>{selectedComm?.Nom}</span>
          </h1>
          <p className="text-sm text-slate-200 max-w-3xl leading-relaxed">
            {selectedComm?.Description || "Évaluation présentielle des tests pratiques et entretiens de sélection pour l'affectation des élèves gendarmes."}
          </p>
        </div>

        {/* Moyenne Promotion */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-4 sm:p-5 text-center shrink-0 min-w-[150px]">
          <span className="text-xs uppercase font-bold tracking-wider text-gold-light block">Moyenne Promotion</span>
          <span className="text-3xl font-bold font-mono text-gold mt-1 block">
            {stats.moyenne !== null ? `${stats.moyenne}/20` : '—'}
          </span>
        </div>
      </div>

      {/* 3. TABLEAU DE BORD COMMISSION : LES 7 MÉTRIQUES OFFICIELLES */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3.5">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs text-center">
          <span className="text-xs uppercase font-bold tracking-wider text-slate-600 block">Total Affectés</span>
          <span className="text-2xl font-bold font-mono text-slate-900 mt-1.5 block">{stats.total}</span>
        </div>
        <div className="bg-white rounded-2xl border border-amber-300 p-4 shadow-2xs text-center">
          <span className="text-xs uppercase font-bold tracking-wider text-amber-700 block">En Attente</span>
          <span className="text-2xl font-bold font-mono text-amber-600 mt-1.5 block">{stats.enAttente}</span>
        </div>
        <div className="bg-white rounded-2xl border border-blue-300 p-4 shadow-2xs text-center">
          <span className="text-xs uppercase font-bold tracking-wider text-blue-700 block">Convoqués</span>
          <span className="text-2xl font-bold font-mono text-blue-600 mt-1.5 block">{stats.convoques}</span>
        </div>
        <div className="bg-white rounded-2xl border border-indigo-300 p-4 shadow-2xs text-center">
          <span className="text-xs uppercase font-bold tracking-wider text-indigo-700 block">En Cours</span>
          <span className="text-2xl font-bold font-mono text-indigo-600 mt-1.5 block">{stats.enCours}</span>
        </div>
        <div className="bg-white rounded-2xl border border-slate-300 p-4 shadow-2xs text-center">
          <span className="text-xs uppercase font-bold tracking-wider text-slate-700 block">Terminées</span>
          <span className="text-2xl font-bold font-mono text-slate-800 mt-1.5 block">{stats.termines}</span>
        </div>
        <div className="bg-emerald-50/90 rounded-2xl border border-emerald-300 p-4 shadow-2xs text-center">
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-800 block">POSITIFS (Admin)</span>
          <span className="text-2xl font-bold font-mono text-emerald-700 mt-1.5 block">{stats.positifs}</span>
        </div>
        <div className="bg-rose-50/90 rounded-2xl border border-rose-300 p-4 shadow-2xs text-center">
          <span className="text-xs uppercase font-bold tracking-wider text-rose-800 block">NÉGATIFS (Local)</span>
          <span className="text-2xl font-bold font-mono text-rose-700 mt-1.5 block">{stats.negatifs}</span>
        </div>
      </div>

      {/* 4. BARRE DE RECHERCHE ET FILTRES RAPIDES */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3.5">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un candidat par nom, matricule ou diplôme..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-200 focus:bg-white focus:border-gold outline-hidden transition"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition whitespace-nowrap shrink-0 ${
              statusFilter === 'ALL' ? 'bg-[#153B2B] text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Tous ({stats.total})
          </button>
          <button
            onClick={() => setStatusFilter('EN_ATTENTE')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition whitespace-nowrap shrink-0 ${
              statusFilter === 'EN_ATTENTE' ? 'bg-amber-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            En Attente ({stats.enAttente})
          </button>
          <button
            onClick={() => setStatusFilter('CONVOQUE')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition whitespace-nowrap shrink-0 ${
              statusFilter === 'CONVOQUE' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Convoqués ({stats.convoques})
          </button>
          <button
            onClick={() => setStatusFilter('EN_COURS')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition whitespace-nowrap shrink-0 ${
              statusFilter === 'EN_COURS' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            En cours ({stats.enCours})
          </button>
          <button
            onClick={() => setStatusFilter('POSITIF')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition whitespace-nowrap shrink-0 ${
              statusFilter === 'POSITIF' ? 'bg-emerald-700 text-white shadow-xs' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            POSITIFS ({stats.positifs})
          </button>
          <button
            onClick={() => setStatusFilter('NEGATIF')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition whitespace-nowrap shrink-0 ${
              statusFilter === 'NEGATIF' ? 'bg-rose-700 text-white shadow-xs' : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
            }`}
          >
            NÉGATIFS ({stats.negatifs})
          </button>
        </div>
      </div>

      {/* 5. TABLEAU DES CANDIDATS DE LA COMMISSION */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {candidatesLoading ? (
          <div className="py-16 flex justify-center">
            <LoadingSpinner text="Chargement des candidats..." />
          </div>
        ) : filteredCandidates.length === 0 ? (
          <div className="py-16 text-center space-y-2.5">
            <Users className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm text-slate-600 font-semibold">Aucun candidat ne correspond à vos filtres.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-xs">
                  <th className="py-3.5 px-4 sm:px-5">Candidat</th>
                  <th className="py-3.5 px-4 sm:px-5">Diplôme & Filière</th>
                  <th className="py-3.5 px-4 text-center">Score IA</th>
                  <th className="py-3.5 px-4 text-center">Pratique /20</th>
                  <th className="py-3.5 px-4 text-center">Entretien /20</th>
                  <th className="py-3.5 px-4 text-center">Note Globale</th>
                  <th className="py-3.5 px-4 text-center">Avis & Statut</th>
                  <th className="py-3.5 px-4 text-center">Recommandation IA</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCandidates.map((cand) => {
                  const sv = cand.StatutVentilation;
                  const se = cand.StatutEvaluation;
                  const recom = cand.RecommandationIA;
                  const isPositif = recom === 'POSITIF' || sv === 'POSITIF' || sv === 'ACCEPTE';
                  const isNegatif = recom === 'NEGATIF' || sv === 'NEGATIF' || sv === 'REFUSE';

                  return (
                    <tr key={cand.AssignmentId} className="hover:bg-cream-50/70 transition-colors">
                      {/* Identité */}
                      <td className="py-4 px-4 sm:px-5">
                        <div className="font-bold text-[#153B2B] text-sm">
                          {cand.Nom} {cand.Prenom}
                        </div>
                        <div className="text-xs text-slate-600 font-mono mt-0.5">
                          Matricule : {cand.Matricule}
                        </div>
                      </td>

                      {/* Diplôme */}
                      <td className="py-4 px-4 sm:px-5">
                        <div className="font-semibold text-slate-800 text-sm">{cand.DiplomeOrigine || 'Baccalauréat'}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{cand.FiliereEntree || 'Tronc Commun'}</div>
                      </td>

                      {/* Score IA */}
                      <td className="py-4 px-4 text-center">
                        <span className="font-mono font-bold text-sm text-slate-800">
                          {cand.ScoreCorrespondanceIA ? `${cand.ScoreCorrespondanceIA}%` : '—'}
                        </span>
                      </td>

                      {/* Note Pratique */}
                      <td className="py-4 px-4 text-center">
                        {cand.NotePratiqueSur20 !== null && cand.NotePratiqueSur20 !== undefined ? (
                          <span className={`font-mono font-bold text-sm ${cand.NotePratiqueSur20 >= 12 ? 'text-emerald-800' : 'text-rose-700'}`}>
                            {cand.NotePratiqueSur20}/20
                          </span>
                        ) : (
                          <span className="text-slate-400 font-mono text-sm">—</span>
                        )}
                      </td>

                      {/* Note Entretien */}
                      <td className="py-4 px-4 text-center">
                        {cand.NoteEntretienSur20 !== null && cand.NoteEntretienSur20 !== undefined ? (
                          <span className={`font-mono font-bold text-sm ${cand.NoteEntretienSur20 >= 12 ? 'text-emerald-800' : 'text-rose-700'}`}>
                            {cand.NoteEntretienSur20}/20
                          </span>
                        ) : (
                          <span className="text-slate-400 font-mono text-sm">—</span>
                        )}
                      </td>

                      {/* Note Globale */}
                      <td className="py-4 px-4 text-center">
                        {cand.NoteGlobaleSur20 !== null && cand.NoteGlobaleSur20 !== undefined ? (
                          <span className={`px-2.5 py-1 rounded-lg font-mono font-bold text-sm ${
                            cand.NoteGlobaleSur20 >= 14 ? 'bg-emerald-100 text-emerald-900 border border-emerald-200' :
                            cand.NoteGlobaleSur20 >= 12 ? 'bg-blue-100 text-blue-900 border border-blue-200' :
                            'bg-rose-100 text-rose-900 border border-rose-200'
                          }`}>
                            {cand.NoteGlobaleSur20}/20
                          </span>
                        ) : (
                          <span className="text-slate-400 font-mono text-sm">—</span>
                        )}
                      </td>

                      {/* Avis & Statut */}
                      <td className="py-4 px-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          {sv === 'CONVOQUE' && (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-200">
                              Convoqué
                            </span>
                          )}
                          {sv === 'EN_COURS' && (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                              En cours
                            </span>
                          )}
                          {sv === 'EN_ATTENTE' && (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                              En attente
                            </span>
                          )}
                          {cand.AvisCommission && (
                            <span className="text-xs font-mono text-slate-600 font-medium">
                              {cand.AvisCommission}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Recommandation IA */}
                      <td className="py-4 px-4 text-center">
                        {isPositif ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                            POSITIF • Transmis
                          </span>
                        ) : isNegatif ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-900 border border-rose-300">
                            <X className="w-3.5 h-3.5 text-rose-700" />
                            NÉGATIF • Local
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400 font-mono italic">
                            Non délibéré
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {sv === 'EN_ATTENTE' && (
                            <button
                              onClick={(e) => handleConvoquerCandidate(cand, e)}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200 cursor-pointer transition"
                            >
                              Convoquer
                            </button>
                          )}
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleOpenEvaluationModal(cand)}
                            className="text-xs font-bold px-3 py-1.5"
                          >
                            {cand.EstVerrouillee ? (
                              <span className="flex items-center gap-1.5">
                                <FileText className="w-3.5 h-3.5" />
                                Consulter
                              </span>
                            ) : (
                              <span className="flex items-center gap-1.5">
                                <Edit3 className="w-3.5 h-3.5" />
                                Évaluer
                              </span>
                            )}
                          </Button>
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

      {/* 6. MODALE DÉTAILLÉE : FICHE CANDIDAT & ÉVALUATION PRÉSENTIELLE */}
      {activeCandidate && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-150">
            {/* En-tête Modale */}
            <div className="bg-gradient-to-r from-[#153B2B] to-[#1F533E] text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs uppercase font-bold text-gold font-mono tracking-wider">
                    Dossier Candidat Commission • {selectedComm?.Nom}
                  </span>
                  {candidateDetails?.evaluation?.EstVerrouillee && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-gold-light border border-gold/40">
                      <Lock className="w-3 h-3" />
                      Évaluation Verrouillée
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold font-serif text-white flex items-center gap-2.5 flex-wrap">
                  <span>{activeCandidate.Nom} {activeCandidate.Prenom}</span>
                  <span className="text-sm font-mono font-normal text-slate-200">
                    ({activeCandidate.Matricule})
                  </span>
                </h3>
              </div>
              <button
                onClick={() => setActiveCandidate(null)}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Corps Défilable */}
            <div className="p-6 sm:p-7 overflow-y-auto space-y-6 flex-1 text-sm leading-relaxed">
              {detailsLoading ? (
                <div className="py-16 flex justify-center">
                  <LoadingSpinner text="Chargement du dossier complet..." />
                </div>
              ) : (
                <>
                  {/* BANNIÈRE DE RÉSULTAT POST-ÉVALUATION IA (RÈGLE DE TRANSMISSION) */}
                  {candidateDetails?.evaluation?.RecommandationIA && (
                    <div>
                      {candidateDetails.evaluation.RecommandationIA === 'POSITIF' ? (
                        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5 text-emerald-950 space-y-2.5">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                              <span className="font-bold text-base text-emerald-900 font-serif">
                                Recommandation IA : POSITIF • Dossier Transmis à l'Administration
                              </span>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-200 text-emerald-900 font-mono">
                              Transmis le {candidateDetails.evaluation.DateTransmissionAdmin ? new Date(candidateDetails.evaluation.DateTransmissionAdmin).toLocaleDateString('fr-FR') : 'Récemment'}
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed text-emerald-900">
                            {candidateDetails.evaluation.JustificationPostEvalIA || candidateDetails.evaluation.ResumeAnalyseIA}
                          </p>
                        </div>
                      ) : (
                        <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-5 text-rose-950 space-y-2.5">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <AlertCircle className="w-5 h-5 text-rose-700 shrink-0" />
                              <span className="font-bold text-base text-rose-900 font-serif">
                                Recommandation IA : NÉGATIF • Dossier Conservé en Commission
                              </span>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-200 text-rose-900 font-mono">
                              Non transmis à l'ADMIN
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed text-rose-900">
                            {candidateDetails.evaluation.JustificationPostEvalIA || candidateDetails.evaluation.ResumeAnalyseIA}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* A. SYNTHÈSE DU PROFIL & DE L'ENTRETIEN IA INITIAL */}
                  <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3.5">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <span className="font-bold text-slate-800 text-base flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-gold shrink-0" />
                        Rapport de l'Entretien IA Initial & Compétences Détectées
                      </span>
                      <span className="font-mono text-slate-600 text-xs font-bold">
                        Affinité calculée : {activeCandidate.ScoreCorrespondanceIA}%
                      </span>
                    </div>

                    <p className="text-slate-800 italic leading-relaxed text-sm bg-white p-4 rounded-xl border border-slate-200">
                      "{candidateDetails?.assignment?.JustificationIA || "Profil correspondant aux critères opérationnels de cette commission."}"
                    </p>

                    {/* Compétences clés */}
                    {candidateDetails?.assignment?.CompetencesCles?.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-xs uppercase font-bold tracking-wider text-slate-700 block">Compétences Déclarées & Validées :</span>
                        <div className="flex flex-wrap gap-2">
                          {candidateDetails.assignment.CompetencesCles.map((comp, idx) => (
                            <span key={idx} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 font-medium text-xs">
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Points à vérifier par la commission */}
                    {candidateDetails?.assignment?.PointsAVerifier?.length > 0 && (
                      <div className="space-y-1.5 pt-2">
                        <span className="text-xs uppercase font-bold tracking-wider text-amber-800 block">Points d'Attention pour les Épreuves Présentielles :</span>
                        <ul className="list-disc pl-5 space-y-1 text-slate-700 text-xs">
                          {candidateDetails.assignment.PointsAVerifier.map((pt, idx) => (
                            <li key={idx}>{pt}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* B. FORMULAIRE D'ÉVALUATION PRÉSENTIELLE MANUELLE */}
                  <div className="space-y-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-2">
                      <span className="font-bold text-slate-900 text-base flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#153B2B]" />
                        Saisie des Épreuves Présentielles & Entretien Physique
                      </span>
                      {dynamicNoteGlobale !== null && (
                        <div className="flex items-center gap-2">
                          <span className="text-slate-600 text-xs font-semibold">Note Globale Calculée :</span>
                          <span className={`px-3 py-1 rounded-lg font-mono font-bold text-sm ${
                            dynamicNoteGlobale >= 14 ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                            dynamicNoteGlobale >= 12 ? 'bg-blue-100 text-blue-900 border border-blue-300' :
                            'bg-rose-100 text-rose-900 border border-rose-300'
                          }`}>
                            {dynamicNoteGlobale}/20
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Grille de Notes */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Note Test Pratique */}
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                        <label className="text-xs font-bold text-slate-800 block">
                          1. Note Test Pratique (/20) <span className="text-rose-600">*</span>
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="20"
                          disabled={isLocked}
                          value={evalForm.notePratiqueSur20}
                          onChange={(e) => setEvalForm({ ...evalForm, notePratiqueSur20: e.target.value })}
                          placeholder="Ex: 14.5"
                          className="w-full px-3.5 py-2.5 rounded-xl text-base font-mono font-bold border border-slate-300 bg-white focus:border-gold outline-hidden disabled:bg-slate-100 shadow-2xs"
                        />
                        <span className="text-xs text-slate-500 block">Seuil d'admissibilité : 12/20</span>
                      </div>

                      {/* Note Entretien Présentiel */}
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                        <label className="text-xs font-bold text-slate-800 block">
                          2. Note Entretien Présentiel (/20) <span className="text-rose-600">*</span>
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="20"
                          disabled={isLocked}
                          value={evalForm.noteEntretienSur20}
                          onChange={(e) => setEvalForm({ ...evalForm, noteEntretienSur20: e.target.value })}
                          placeholder="Ex: 15.0"
                          className="w-full px-3.5 py-2.5 rounded-xl text-base font-mono font-bold border border-slate-300 bg-white focus:border-gold outline-hidden disabled:bg-slate-100 shadow-2xs"
                        />
                        <span className="text-xs text-slate-500 block">Motivation & posture militaire</span>
                      </div>

                      {/* Note Complémentaire Optionnelle */}
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                        <label className="text-xs font-bold text-slate-800 block">
                          3. Note Complémentaire (/20)
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="20"
                          disabled={isLocked}
                          value={evalForm.noteComplementaireSur20}
                          onChange={(e) => setEvalForm({ ...evalForm, noteComplementaireSur20: e.target.value })}
                          placeholder="Optionnelle"
                          className="w-full px-3.5 py-2.5 rounded-xl text-base font-mono font-bold border border-slate-300 bg-white focus:border-gold outline-hidden disabled:bg-slate-100 shadow-2xs"
                        />
                        <span className="text-xs text-slate-500 block">Aptitudes spécialisées d'atelier</span>
                      </div>
                    </div>

                    {/* Observations du Jury */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-800 block">
                        Observations circonstanciées du Jury <span className="text-rose-600">*</span>
                      </label>
                      <textarea
                        rows={4}
                        disabled={isLocked}
                        value={evalForm.observations}
                        onChange={(e) => setEvalForm({ ...evalForm, observations: e.target.value })}
                        placeholder="Détaillez le comportement pratique, la rigueur technique et les réponses apportées lors de l'entretien..."
                        className="w-full p-4 rounded-xl border border-slate-300 focus:border-gold outline-hidden text-sm leading-relaxed disabled:bg-slate-100 shadow-2xs"
                      />
                    </div>

                    {/* Commentaires complémentaires */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-800 block">
                        Commentaires complémentaires & perspectives
                      </label>
                      <input
                        type="text"
                        disabled={isLocked}
                        value={evalForm.commentairesComplementaires}
                        onChange={(e) => setEvalForm({ ...evalForm, commentairesComplementaires: e.target.value })}
                        placeholder="Remarques additionnelles sur le potentiel d'évolution..."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-gold outline-hidden text-sm disabled:bg-slate-100 shadow-2xs"
                      />
                    </div>

                    {/* Avis de la Commission & Métadonnées d'évaluation */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                      <div>
                        <label className="text-xs font-bold text-slate-800 block mb-1.5">Avis du Jury</label>
                        <select
                          disabled={isLocked}
                          value={evalForm.avisCommission}
                          onChange={(e) => setEvalForm({ ...evalForm, avisCommission: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-semibold text-sm outline-hidden disabled:bg-slate-100 cursor-pointer shadow-2xs"
                        >
                          <option value="FAVORABLE_FORT">Favorable Fort (Prioritaire)</option>
                          <option value="FAVORABLE">Favorable</option>
                          <option value="RESERVE">Avec Réserves</option>
                          <option value="DEFAVORABLE">Défavorable</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-800 block mb-1.5">Date d'évaluation</label>
                        <input
                          type="date"
                          disabled={isLocked}
                          value={evalForm.dateEvaluation}
                          onChange={(e) => setEvalForm({ ...evalForm, dateEvaluation: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-sm outline-hidden disabled:bg-slate-100 shadow-2xs"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-800 block mb-1.5">Identité Évaluateur</label>
                        <input
                          type="text"
                          disabled={isLocked}
                          value={evalForm.nomEvaluateur}
                          onChange={(e) => setEvalForm({ ...evalForm, nomEvaluateur: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-hidden disabled:bg-slate-100 shadow-2xs"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Pied de Modale & Actions */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                {isLocked ? (
                  <button
                    onClick={() => setShowCorrectionModal(true)}
                    className="px-3.5 py-2 rounded-xl border border-amber-300 bg-amber-50 text-amber-900 font-bold text-xs sm:text-sm hover:bg-amber-100 flex items-center gap-2 cursor-pointer transition shadow-2xs"
                  >
                    <Edit3 className="w-4 h-4 text-amber-700" />
                    Demander une Correction Officielle
                  </button>
                ) : (
                  <span className="text-xs text-slate-600 italic">
                    Toutes les modifications sont enregistrées dans SQL Server.
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2.5">
                <Button variant="secondary" size="md" onClick={() => setActiveCandidate(null)} className="text-sm font-semibold">
                  Fermer
                </Button>

                {!isLocked && (
                  <>
                    <Button
                      variant="secondary"
                      size="md"
                      disabled={savingEval}
                      onClick={() => handleSubmitEvaluation('BROUILLON')}
                      className="text-sm font-semibold"
                    >
                      Sauvegarder Brouillon
                    </Button>
                    <Button
                      variant="primary"
                      size="md"
                      disabled={savingEval}
                      onClick={() => handleSubmitEvaluation('SOUMISE')}
                      className="bg-[#153B2B] hover:bg-[#1A4533] text-white text-sm font-bold shadow-xs cursor-pointer"
                    >
                      {savingEval ? 'Analyse IA & Transmission...' : 'Valider & Soumettre Définitivement'}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. MODALE DE DEMANDE DE CORRECTION OFFICIELLE (AUDIT TRAIL) */}
      {showCorrectionModal && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 sm:p-7 space-y-4 border border-slate-200 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h4 className="font-bold text-base text-[#153B2B] flex items-center gap-2">
                <Shield className="w-5 h-5 text-gold" />
                Procédure de Correction Officielle d'Évaluation
              </h4>
              <button onClick={() => setShowCorrectionModal(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-sm text-slate-700 leading-relaxed">
              <p>
                Cette évaluation a déjà été soumise et verrouillée. Conformément à la réglementation militaire, toute modification ultérieure doit être formellement justifiée et fera l'objet d'un audit immuable.
              </p>
              <label className="font-bold text-slate-900 block pt-1 text-sm">
                Motif réglementaire de la demande de révision <span className="text-rose-600">*</span>
              </label>
              <textarea
                rows={4}
                value={correctionMotif}
                onChange={(e) => setCorrectionMotif(e.target.value)}
                placeholder="Précisez la raison administrative ou technique justifiant la réévaluation..."
                className="w-full p-3.5 rounded-xl border border-slate-300 focus:border-gold outline-hidden text-sm leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
              <Button variant="secondary" size="md" onClick={() => setShowCorrectionModal(false)} className="text-sm font-semibold">
                Annuler
              </Button>
              <Button
                variant="primary"
                size="md"
                disabled={submittingCorrection || !correctionMotif.trim()}
                onClick={handleRequestCorrection}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-xs cursor-pointer"
              >
                {submittingCorrection ? 'Enregistrement audit...' : 'Autoriser et Déverrouiller'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
