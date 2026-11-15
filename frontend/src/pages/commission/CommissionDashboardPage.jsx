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
      <div className="bg-gradient-to-r from-[#153B2B] via-[#1A4533] to-[#0E291E] text-white p-6 rounded-2xl shadow-md border border-gold/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[11px] uppercase tracking-wider font-bold text-gold-light font-mono">
              Commission de Sélection & Recrutement • {selectedComm?.Code}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-mono border border-white/15">
              Évaluateur : {user?.prenom} {user?.nom} ({user?.matricule})
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-tight flex items-center gap-3">
            <CommIcon className="w-7 h-7 text-gold shrink-0" />
            <span>{selectedComm?.Nom}</span>
          </h1>
          <p className="text-xs text-slate-200 max-w-2xl leading-relaxed">
            {selectedComm?.Description || "Évaluation présentielle des tests pratiques et entretiens de sélection pour l'affectation des élèves gendarmes."}
          </p>
        </div>

        {/* Moyenne Générale */}
        <div className="bg-white/10 border border-white/15 rounded-xl p-3.5 text-center shrink-0 min-w-[130px]">
          <span className="text-[10px] uppercase font-bold text-gold-light block">Moyenne Promotion</span>
          <span className="text-2xl font-bold font-mono text-gold mt-0.5 block">
            {stats.moyenne !== null ? `${stats.moyenne}/20` : '—'}
          </span>
        </div>
      </div>

      {/* 3. TABLEAU DE BORD COMMISSION : LES 7 MÉTRIQUES OFFICIELLES */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="bg-white rounded-xl border border-slateSubtle-200 p-3.5 shadow-2xs text-center">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Affectés</span>
          <span className="text-xl font-bold font-mono text-slate-900 mt-1 block">{stats.total}</span>
        </div>
        <div className="bg-white rounded-xl border border-amber-200 p-3.5 shadow-2xs text-center">
          <span className="text-[10px] uppercase font-bold text-amber-700 block">En Attente</span>
          <span className="text-xl font-bold font-mono text-amber-600 mt-1 block">{stats.enAttente}</span>
        </div>
        <div className="bg-white rounded-xl border border-blue-200 p-3.5 shadow-2xs text-center">
          <span className="text-[10px] uppercase font-bold text-blue-700 block">Convoqués</span>
          <span className="text-xl font-bold font-mono text-blue-600 mt-1 block">{stats.convoques}</span>
        </div>
        <div className="bg-white rounded-xl border border-indigo-200 p-3.5 shadow-2xs text-center">
          <span className="text-[10px] uppercase font-bold text-indigo-700 block">En Cours</span>
          <span className="text-xl font-bold font-mono text-indigo-600 mt-1 block">{stats.enCours}</span>
        </div>
        <div className="bg-white rounded-xl border border-slate-300 p-3.5 shadow-2xs text-center">
          <span className="text-[10px] uppercase font-bold text-slate-700 block">Terminées</span>
          <span className="text-xl font-bold font-mono text-slate-800 mt-1 block">{stats.termines}</span>
        </div>
        <div className="bg-emerald-50/80 rounded-xl border border-emerald-300 p-3.5 shadow-2xs text-center">
          <span className="text-[10px] uppercase font-bold text-emerald-800 block">POSITIFS (Admin)</span>
          <span className="text-xl font-bold font-mono text-emerald-700 mt-1 block">{stats.positifs}</span>
        </div>
        <div className="bg-rose-50/80 rounded-xl border border-rose-300 p-3.5 shadow-2xs text-center">
          <span className="text-[10px] uppercase font-bold text-rose-800 block">NÉGATIFS (Local)</span>
          <span className="text-xl font-bold font-mono text-rose-700 mt-1 block">{stats.negatifs}</span>
        </div>
      </div>

      {/* 4. BARRE DE RECHERCHE ET FILTRES RAPIDES */}
      <div className="bg-white rounded-2xl border border-slateSubtle-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un candidat par nom, matricule ou diplôme..."
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 border border-slateSubtle-200 focus:bg-white focus:border-gold outline-hidden transition"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
              statusFilter === 'ALL' ? 'bg-[#153B2B] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tous ({stats.total})
          </button>
          <button
            onClick={() => setStatusFilter('EN_ATTENTE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
              statusFilter === 'EN_ATTENTE' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            En Attente ({stats.enAttente})
          </button>
          <button
            onClick={() => setStatusFilter('CONVOQUE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
              statusFilter === 'CONVOQUE' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Convoqués ({stats.convoques})
          </button>
          <button
            onClick={() => setStatusFilter('EN_COURS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
              statusFilter === 'EN_COURS' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            En cours ({stats.enCours})
          </button>
          <button
            onClick={() => setStatusFilter('POSITIF')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
              statusFilter === 'POSITIF' ? 'bg-emerald-700 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            POSITIFS ({stats.positifs})
          </button>
          <button
            onClick={() => setStatusFilter('NEGATIF')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
              statusFilter === 'NEGATIF' ? 'bg-rose-700 text-white' : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
            }`}
          >
            NÉGATIFS ({stats.negatifs})
          </button>
        </div>
      </div>

      {/* 5. TABLEAU DES CANDIDATS DE LA COMMISSION */}
      <div className="bg-white rounded-2xl border border-slateSubtle-200 shadow-xs overflow-hidden">
        {candidatesLoading ? (
          <div className="py-12 flex justify-center">
            <LoadingSpinner text="Chargement des candidats..." />
          </div>
        ) : filteredCandidates.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <Users className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs text-slate-500 font-semibold">Aucun candidat ne correspond à vos filtres.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slateSubtle-200 text-slateSubtle-600 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Candidat</th>
                  <th className="py-3 px-4">Diplôme & Filière</th>
                  <th className="py-3 px-4 text-center">Score IA</th>
                  <th className="py-3 px-4 text-center">Pratique /20</th>
                  <th className="py-3 px-4 text-center">Entretien /20</th>
                  <th className="py-3 px-4 text-center">Note Globale</th>
                  <th className="py-3 px-4 text-center">Avis & Statut</th>
                  <th className="py-3 px-4 text-center">Recommandation IA</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slateSubtle-100">
                {filteredCandidates.map((cand) => {
                  const sv = cand.StatutVentilation;
                  const se = cand.StatutEvaluation;
                  const recom = cand.RecommandationIA;
                  const isPositif = recom === 'POSITIF' || sv === 'POSITIF' || sv === 'ACCEPTE';
                  const isNegatif = recom === 'NEGATIF' || sv === 'NEGATIF' || sv === 'REFUSE';

                  return (
                    <tr key={cand.AssignmentId} className="hover:bg-cream-50/50 transition-colors">
                      {/* Identité */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#153B2B] flex items-center gap-1.5">
                          <span>{cand.Nom} {cand.Prenom}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          Matricule : {cand.Matricule}
                        </div>
                      </td>

                      {/* Diplôme */}
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-800">{cand.DiplomeOrigine || 'Baccalauréat'}</div>
                        <div className="text-[11px] text-slate-500">{cand.FiliereEntree || 'Tronc Commun'}</div>
                      </td>

                      {/* Score IA */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="font-mono font-bold text-slate-800">
                          {cand.ScoreCorrespondanceIA ? `${cand.ScoreCorrespondanceIA}%` : '—'}
                        </span>
                      </td>

                      {/* Note Pratique */}
                      <td className="py-3.5 px-4 text-center">
                        {cand.NotePratiqueSur20 !== null && cand.NotePratiqueSur20 !== undefined ? (
                          <span className={`font-mono font-bold ${cand.NotePratiqueSur20 >= 12 ? 'text-emerald-700' : 'text-rose-600'}`}>
                            {cand.NotePratiqueSur20}/20
                          </span>
                        ) : (
                          <span className="text-slate-400 font-mono">—</span>
                        )}
                      </td>

                      {/* Note Entretien */}
                      <td className="py-3.5 px-4 text-center">
                        {cand.NoteEntretienSur20 !== null && cand.NoteEntretienSur20 !== undefined ? (
                          <span className={`font-mono font-bold ${cand.NoteEntretienSur20 >= 12 ? 'text-emerald-700' : 'text-rose-600'}`}>
                            {cand.NoteEntretienSur20}/20
                          </span>
                        ) : (
                          <span className="text-slate-400 font-mono">—</span>
                        )}
                      </td>

                      {/* Note Globale */}
                      <td className="py-3.5 px-4 text-center">
                        {cand.NoteGlobaleSur20 !== null && cand.NoteGlobaleSur20 !== undefined ? (
                          <span className={`px-2 py-0.5 rounded-md font-mono font-bold text-xs ${
                            cand.NoteGlobaleSur20 >= 14 ? 'bg-emerald-100 text-emerald-800' :
                            cand.NoteGlobaleSur20 >= 12 ? 'bg-blue-100 text-blue-800' :
                            'bg-rose-100 text-rose-800'
                          }`}>
                            {cand.NoteGlobaleSur20}/20
                          </span>
                        ) : (
                          <span className="text-slate-400 font-mono">—</span>
                        )}
                      </td>

                      {/* Avis & Statut */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          {sv === 'CONVOQUE' && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                              Convoqué
                            </span>
                          )}
                          {sv === 'EN_COURS' && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                              En cours
                            </span>
                          )}
                          {sv === 'EN_ATTENTE' && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                              En attente
                            </span>
                          )}
                          {cand.AvisCommission && (
                            <span className="text-[10px] font-mono text-slate-600">
                              {cand.AvisCommission}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Recommandation IA */}
                      <td className="py-3.5 px-4 text-center">
                        {isPositif ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            POSITIF • Transmis
                          </span>
                        ) : isNegatif ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
                            <X className="w-3 h-3 text-rose-600" />
                            NÉGATIF • Local
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400 font-mono italic">
                            Non délibéré
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {sv === 'EN_ATTENTE' && (
                            <button
                              onClick={(e) => handleConvoquerCandidate(cand, e)}
                              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 cursor-pointer transition"
                            >
                              Convoquer
                            </button>
                          )}
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleOpenEvaluationModal(cand)}
                            className="text-xs"
                          >
                            {cand.EstVerrouillee ? (
                              <span className="flex items-center gap-1">
                                <FileText className="w-3.5 h-3.5" />
                                Consulter
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slateSubtle-200 animate-in fade-in zoom-in duration-150">
            {/* En-tête Modale */}
            <div className="bg-gradient-to-r from-[#153B2B] to-[#1F533E] text-white p-5 flex items-center justify-between shrink-0">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-gold font-mono tracking-wider">
                    Dossier Candidat Commission • {selectedComm?.Nom}
                  </span>
                  {candidateDetails?.evaluation?.EstVerrouillee && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/20 text-gold-light border border-gold/30">
                      <Lock className="w-2.5 h-2.5" />
                      Évaluation Verrouillée
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
                  <span>{activeCandidate.Nom} {activeCandidate.Prenom}</span>
                  <span className="text-xs font-mono font-normal text-slate-200">
                    ({activeCandidate.Matricule})
                  </span>
                </h3>
              </div>
              <button
                onClick={() => setActiveCandidate(null)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Corps Défilable */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {detailsLoading ? (
                <div className="py-12 flex justify-center">
                  <LoadingSpinner text="Chargement du dossier complet..." />
                </div>
              ) : (
                <>
                  {/* BANNIÈRE DE RÉSULTAT POST-ÉVALUATION IA (RÈGLE DE TRANSMISSION) */}
                  {candidateDetails?.evaluation?.RecommandationIA && (
                    <div>
                      {candidateDetails.evaluation.RecommandationIA === 'POSITIF' ? (
                        <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 text-emerald-950 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                              <span className="font-bold text-sm text-emerald-900 font-serif">
                                Recommandation IA : POSITIF • Dossier Transmis à l'Administration
                              </span>
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-200 text-emerald-900 font-mono">
                              Transmis le {candidateDetails.evaluation.DateTransmissionAdmin ? new Date(candidateDetails.evaluation.DateTransmissionAdmin).toLocaleDateString('fr-FR') : 'Récemment'}
                            </span>
                          </div>
                          <p className="text-xs leading-relaxed text-emerald-900">
                            {candidateDetails.evaluation.JustificationPostEvalIA || candidateDetails.evaluation.ResumeAnalyseIA}
                          </p>
                        </div>
                      ) : (
                        <div className="bg-rose-50 border border-rose-300 rounded-xl p-4 text-rose-950 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <AlertCircle className="w-5 h-5 text-rose-700 shrink-0" />
                              <span className="font-bold text-sm text-rose-900 font-serif">
                                Recommandation IA : NÉGATIF • Dossier Conservé en Commission
                              </span>
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-200 text-rose-900 font-mono">
                              Non transmis à l'ADMIN
                            </span>
                          </div>
                          <p className="text-xs leading-relaxed text-rose-900">
                            {candidateDetails.evaluation.JustificationPostEvalIA || candidateDetails.evaluation.ResumeAnalyseIA}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* A. SYNTHÈSE DU PROFIL & DE L'ENTRETIEN IA INITIAL */}
                  <div className="bg-slate-50 rounded-xl border border-slateSubtle-200 p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-slateSubtle-200 pb-2">
                      <span className="font-bold text-slate-800 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-gold" />
                        Rapport de l'Entretien IA Initial & Compétences Détectées
                      </span>
                      <span className="font-mono text-slate-500 text-[11px]">
                        Affinité calculée : {activeCandidate.ScoreCorrespondanceIA}%
                      </span>
                    </div>

                    <p className="text-slate-700 italic leading-relaxed">
                      "{candidateDetails?.assignment?.JustificationIA || "Profil correspondant aux critères opérationnels de cette commission."}"
                    </p>

                    {/* Compétences clés */}
                    {candidateDetails?.assignment?.CompetencesCles?.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">Compétences Déclarées & Validées :</span>
                        <div className="flex flex-wrap gap-1.5">
                          {candidateDetails.assignment.CompetencesCles.map((comp, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-slateSubtle-200 text-slate-700 font-medium text-[11px]">
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Points à vérifier par la commission */}
                    {candidateDetails?.assignment?.PointsAVerifier?.length > 0 && (
                      <div className="space-y-1 pt-1">
                        <span className="text-[10px] uppercase font-bold text-amber-800 block">Points d'Attention pour les Épreuves Présentielles :</span>
                        <ul className="list-disc pl-4 space-y-0.5 text-slate-600 text-[11px]">
                          {candidateDetails.assignment.PointsAVerifier.map((pt, idx) => (
                            <li key={idx}>{pt}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* B. FORMULAIRE D'ÉVALUATION PRÉSENTIELLE MANUELLE */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slateSubtle-200 pb-2">
                      <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-[#153B2B]" />
                        Saisie des Épreuves Présentielles & Entretien Physique
                      </span>
                      {dynamicNoteGlobale !== null && (
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 text-[11px]">Note Globale Calculée :</span>
                          <span className={`px-2.5 py-0.5 rounded-md font-mono font-bold text-xs ${
                            dynamicNoteGlobale >= 14 ? 'bg-emerald-100 text-emerald-800' :
                            dynamicNoteGlobale >= 12 ? 'bg-blue-100 text-blue-800' :
                            'bg-rose-100 text-rose-800'
                          }`}>
                            {dynamicNoteGlobale}/20
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Grille de Notes */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Note Test Pratique */}
                      <div className="bg-white p-3.5 rounded-xl border border-slateSubtle-200 space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-700 block">
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
                          className="w-full px-3 py-2 rounded-lg text-sm font-mono font-bold border border-slateSubtle-300 focus:border-gold outline-hidden disabled:bg-slate-100"
                        />
                        <span className="text-[10px] text-slate-500 block">Seuil d'admissibilité : 12/20</span>
                      </div>

                      {/* Note Entretien Présentiel */}
                      <div className="bg-white p-3.5 rounded-xl border border-slateSubtle-200 space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-700 block">
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
                          className="w-full px-3 py-2 rounded-lg text-sm font-mono font-bold border border-slateSubtle-300 focus:border-gold outline-hidden disabled:bg-slate-100"
                        />
                        <span className="text-[10px] text-slate-500 block">Motivation & posture militaire</span>
                      </div>

                      {/* Note Complémentaire Optionnelle */}
                      <div className="bg-white p-3.5 rounded-xl border border-slateSubtle-200 space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-700 block">
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
                          className="w-full px-3 py-2 rounded-lg text-sm font-mono font-bold border border-slateSubtle-300 focus:border-gold outline-hidden disabled:bg-slate-100"
                        />
                        <span className="text-[10px] text-slate-500 block">Aptitudes spécialisées d'atelier</span>
                      </div>
                    </div>

                    {/* Observations du Jury */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-700 block">
                        Observations circonstanciées du Jury <span className="text-rose-600">*</span>
                      </label>
                      <textarea
                        rows={3}
                        disabled={isLocked}
                        value={evalForm.observations}
                        onChange={(e) => setEvalForm({ ...evalForm, observations: e.target.value })}
                        placeholder="Détaillez le comportement pratique, la rigueur technique et les réponses apportées lors de l'entretien..."
                        className="w-full p-3 rounded-xl border border-slateSubtle-300 focus:border-gold outline-hidden text-xs leading-relaxed disabled:bg-slate-100"
                      />
                    </div>

                    {/* Commentaires complémentaires */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-700 block">
                        Commentaires complémentaires & perspectives
                      </label>
                      <input
                        type="text"
                        disabled={isLocked}
                        value={evalForm.commentairesComplementaires}
                        onChange={(e) => setEvalForm({ ...evalForm, commentairesComplementaires: e.target.value })}
                        placeholder="Remarques additionnelles sur le potentiel d'évolution..."
                        className="w-full px-3 py-2 rounded-xl border border-slateSubtle-300 focus:border-gold outline-hidden text-xs disabled:bg-slate-100"
                      />
                    </div>

                    {/* Avis de la Commission & Métadonnées d'évaluation */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Avis du Jury</label>
                        <select
                          disabled={isLocked}
                          value={evalForm.avisCommission}
                          onChange={(e) => setEvalForm({ ...evalForm, avisCommission: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slateSubtle-300 font-semibold text-xs outline-hidden disabled:bg-slate-100"
                        >
                          <option value="FAVORABLE_FORT">Favorable Fort (Prioritaire)</option>
                          <option value="FAVORABLE">Favorable</option>
                          <option value="RESERVE">Avec Réserves</option>
                          <option value="DEFAVORABLE">Défavorable</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Date d'évaluation</label>
                        <input
                          type="date"
                          disabled={isLocked}
                          value={evalForm.dateEvaluation}
                          onChange={(e) => setEvalForm({ ...evalForm, dateEvaluation: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slateSubtle-300 font-mono text-xs outline-hidden disabled:bg-slate-100"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Identité Évaluateur</label>
                        <input
                          type="text"
                          disabled={isLocked}
                          value={evalForm.nomEvaluateur}
                          onChange={(e) => setEvalForm({ ...evalForm, nomEvaluateur: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slateSubtle-300 text-xs outline-hidden disabled:bg-slate-100"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Pied de Modale & Actions */}
            <div className="p-4 bg-slate-50 border-t border-slateSubtle-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                {isLocked ? (
                  <button
                    onClick={() => setShowCorrectionModal(true)}
                    className="px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 text-amber-800 font-semibold text-xs hover:bg-amber-100 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Demander une Correction Officielle
                  </button>
                ) : (
                  <span className="text-[11px] text-slate-500 italic">
                    Toutes les modifications sont enregistrées dans SQL Server.
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" onClick={() => setActiveCandidate(null)}>
                  Fermer
                </Button>

                {!isLocked && (
                  <>
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={savingEval}
                      onClick={() => handleSubmitEvaluation('BROUILLON')}
                    >
                      Sauvegarder Brouillon
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      disabled={savingEval}
                      onClick={() => handleSubmitEvaluation('SOUMISE')}
                      className="bg-[#153B2B] hover:bg-[#1A4533] text-white font-bold"
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
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 space-y-4 border border-slateSubtle-200 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-slateSubtle-200 pb-3">
              <h4 className="font-bold text-sm text-[#153B2B] flex items-center gap-2">
                <Shield className="w-4 h-4 text-gold" />
                Procédure de Correction Officielle d'Évaluation
              </h4>
              <button onClick={() => setShowCorrectionModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <p>
                Cette évaluation a déjà été soumise et verrouillée. Conformément à la réglementation militaire, toute modification ultérieure doit être formellement justifiée et fera l'objet d'un audit immuable.
              </p>
              <label className="font-bold text-slate-700 block pt-1">
                Motif réglementaire de la demande de révision <span className="text-rose-600">*</span>
              </label>
              <textarea
                rows={3}
                value={correctionMotif}
                onChange={(e) => setCorrectionMotif(e.target.value)}
                placeholder="Précisez la raison administrative ou technique justifiant la réévaluation..."
                className="w-full p-3 rounded-xl border border-slateSubtle-300 focus:border-gold outline-hidden text-xs leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slateSubtle-200">
              <Button variant="secondary" size="sm" onClick={() => setShowCorrectionModal(false)}>
                Annuler
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={submittingCorrection || !correctionMotif.trim()}
                onClick={handleRequestCorrection}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold"
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
