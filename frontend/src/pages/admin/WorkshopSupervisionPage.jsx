import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { workshopService } from '../../services/workshopService.js';
import {
  Wrench,
  Cpu,
  Radio,
  Boxes,
  Layers,
  Award,
  CheckCircle2,
  AlertCircle,
  AlertOctagon,
  Clock,
  TrendingUp,
  UserCheck,
  Search,
  Filter,
  Save,
  Send,
  RotateCcw,
  ShieldCheck,
  ShieldAlert,
  Paperclip,
  FileText,
  User,
  GraduationCap,
  Sparkles,
  Check,
  X,
  ExternalLink
} from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import Modal from '../../components/common/Modal.jsx';
import PracticalFieldEvaluationForm from '../../components/workshops/PracticalFieldEvaluationForm.jsx';

export default function WorkshopSupervisionPage() {
  const { user, isCommission, isAdmin } = useAuth();
  const { showToast } = useToast();

  // Mode d'affichage principal
  const [activeTab, setActiveTab] = useState('EVAL_GRID'); // 'EVAL_GRID' | 'ASSIGNMENTS_LIST'

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Filtres
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL'); // 'ALL' | 'PENDING' | 'IN_PROGRESS' | 'VALIDATED' | 'REASSESSMENT'
  const [searchQuery, setSearchQuery] = useState('');

  // Modal d'évaluation
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showEvalModal, setShowEvalModal] = useState(false);
  const [showReassessmentModal, setShowReassessmentModal] = useState(false);

  // Formulaire d'évaluation
  const [notes, setNotes] = useState({
    'CRIT-SEC-METH': 5,
    'CRIT-DIAG-PREC': 4,
    'CRIT-EXEC-QUAL': 4,
    'CRIT-TPS-DISC': 4
  });
  const [criteriaComments, setCriteriaComments] = useState({
    'CRIT-SEC-METH': '',
    'CRIT-DIAG-PREC': '',
    'CRIT-EXEC-QUAL': '',
    'CRIT-TPS-DISC': ''
  });
  const [observations, setObservations] = useState('');
  const [pointsForts, setPointsForts] = useState([]);
  const [newPointFort, setNewPointFort] = useState('');
  const [axesAmelioration, setAxesAmelioration] = useState([]);
  const [newAxe, setNewAxe] = useState('');
  const [competencesDetectees, setCompetencesDetectees] = useState([]);
  const [newCompetence, setNewCompetence] = useState('');
  const [specialiteSuggeree, setSpecialiteSuggeree] = useState('');
  const [reassessmentReason, setReassessmentReason] = useState('');

  const loadAssignments = async () => {
    try {
      setLoading(true);
      const data = await workshopService.getAssignments();
      setAssignments(data || []);
    } catch (err) {
      console.error('Erreur chargement assignations:', err);
      showToast('Impossible de charger les assignations d\'ateliers.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssignments();
  }, [user]);

  // Filtrage
  const filteredAssignments = useMemo(() => {
    return assignments.filter((assign) => {
      const w = assign.Atelier || {};
      const eleve = assign.Eleve || {};
      const statut = assign.Statut || 'NON_COMMENCE';

      // Filtrage commission : si membre COMMISSION (et non ADMIN), vérifier qu'il s'agit de son assignation
      const userId = user?.id ?? user?.UtilisateurId;
      if (isCommission && !isAdmin && assign.SuperviseurId && assign.SuperviseurId !== userId) {
        return false;
      }

      // Catégorie
      if (filterCategory !== 'ALL' && w.CategorieId !== filterCategory) return false;

      // Statut
      if (filterStatus === 'PENDING') {
        if (statut !== 'EN_ATTENTE_VALIDATION') return false;
      } else if (filterStatus === 'IN_PROGRESS') {
        if (statut !== 'EN_COURS' && statut !== 'NON_COMMENCE' && statut !== 'ASSIGNE') return false;
      } else if (filterStatus === 'VALIDATED') {
        if (statut !== 'VALIDE' && statut !== 'EVALUE') return false;
      } else if (filterStatus === 'REASSESSMENT') {
        if (statut !== 'A_REEVALUER' && statut !== 'REJETE' && !assign.ArretSecurite) return false;
      }

      // Recherche
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const codeMatch = w.Code?.toLowerCase().includes(query);
        const titleMatch = w.Titre?.toLowerCase().includes(query);
        const eleveNomMatch = eleve.nom?.toLowerCase().includes(query);
        const elevePrenomMatch = eleve.prenom?.toLowerCase().includes(query);
        const matriculeMatch = eleve.matricule?.toLowerCase().includes(query);
        if (!codeMatch && !titleMatch && !eleveNomMatch && !elevePrenomMatch && !matriculeMatch) {
          return false;
        }
      }

      return true;
    });
  }, [assignments, filterCategory, filterStatus, searchQuery, user, isCommission, isAdmin]);

  // Total calculé /20
  const totalScore20 = useMemo(() => {
    return (
      (parseFloat(notes['CRIT-SEC-METH']) || 0) +
      (parseFloat(notes['CRIT-DIAG-PREC']) || 0) +
      (parseFloat(notes['CRIT-EXEC-QUAL']) || 0) +
      (parseFloat(notes['CRIT-TPS-DISC']) || 0)
    );
  }, [notes]);

  const scorePercentage = Math.round((totalScore20 / 20) * 100);

  // Ouvrir modal d'évaluation
  const handleOpenEvaluate = (assign) => {
    // Vérification RBAC : L'évaluateur ne peut évaluer qu'un élève qui lui est assigné
    const userId = user?.id ?? user?.UtilisateurId;
    if (isCommission && !isAdmin && assign.SuperviseurId && assign.SuperviseurId !== userId) {
      showToast('Accès refusé : Cet élève est affecté à un autre évaluateur.', 'error');
      return;
    }

    setSelectedAssignment(assign);

    // Initialiser les notes existantes ou standard
    const existingNotes = assign.NotesCriteres || {};
    const n = {};
    const c = {};
    ['CRIT-SEC-METH', 'CRIT-DIAG-PREC', 'CRIT-EXEC-QUAL', 'CRIT-TPS-DISC'].forEach((k) => {
      const critVal = existingNotes[k];
      n[k] = typeof critVal === 'object' ? (critVal?.note ?? 4) : (critVal ?? 4);
      c[k] = typeof critVal === 'object' ? (critVal?.commentaire || '') : '';
    });

    setNotes(n);
    setCriteriaComments(c);
    setObservations(assign.ObservationsEvaluateur || '');
    setPointsForts(assign.PointsForts || ['Respect scrupuleux des consignes', 'Bonne autonomie technique']);
    setAxesAmelioration(assign.AxesAmelioration || ['Optimiser le rangement final']);
    setCompetencesDetectees(assign.CompetencesDetectees || (assign.Atelier?.Objectifs?.slice(0, 2) || []));
    setSpecialiteSuggeree(assign.RecommandationSpecialite || '');
    setShowEvalModal(true);
  };

  // Sauvegarder brouillon
  const handleSaveDraft = async () => {
    if (!selectedAssignment) return;
    try {
      setSaving(true);
      const payload = {
        saveDraft: true,
        notesCriteres: {
          'CRIT-SEC-METH': { note: notes['CRIT-SEC-METH'], commentaire: criteriaComments['CRIT-SEC-METH'] },
          'CRIT-DIAG-PREC': { note: notes['CRIT-DIAG-PREC'], commentaire: criteriaComments['CRIT-DIAG-PREC'] },
          'CRIT-EXEC-QUAL': { note: notes['CRIT-EXEC-QUAL'], commentaire: criteriaComments['CRIT-EXEC-QUAL'] },
          'CRIT-TPS-DISC': { note: notes['CRIT-TPS-DISC'], commentaire: criteriaComments['CRIT-TPS-DISC'] }
        },
        observations,
        pointsForts,
        axesAmelioration,
        competencesDetectees,
        recommandationSpecialite: specialiteSuggeree
      };

      await workshopService.evaluateTrainee(selectedAssignment.AssignationId, payload);
      showToast('Évaluation sauvegardée en brouillon (statut En cours).', 'info');
      setShowEvalModal(false);
      loadAssignments();
    } catch (err) {
      showToast(err.message || 'Erreur lors de la sauvegarde.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Valider définitivement
  const handleValidateEvaluation = async () => {
    if (!selectedAssignment) return;
    try {
      setSaving(true);
      const payload = {
        statut: 'VALIDE',
        notesCriteres: {
          'CRIT-SEC-METH': { note: notes['CRIT-SEC-METH'], commentaire: criteriaComments['CRIT-SEC-METH'] },
          'CRIT-DIAG-PREC': { note: notes['CRIT-DIAG-PREC'], commentaire: criteriaComments['CRIT-DIAG-PREC'] },
          'CRIT-EXEC-QUAL': { note: notes['CRIT-EXEC-QUAL'], commentaire: criteriaComments['CRIT-EXEC-QUAL'] },
          'CRIT-TPS-DISC': { note: notes['CRIT-TPS-DISC'], commentaire: criteriaComments['CRIT-TPS-DISC'] }
        },
        observations,
        pointsForts,
        axesAmelioration,
        competencesDetectees,
        recommandationSpecialite: specialiteSuggeree,
        superviseurNom: `${user?.prenom || ''} ${user?.nom || ''}`.trim() || 'Membre Évaluateur'
      };

      await workshopService.evaluateTrainee(selectedAssignment.AssignationId, payload);
      showToast(`Évaluation validée avec succès (${totalScore20}/20). Fiche officielle enregistrée.`, 'success');
      setShowEvalModal(false);
      loadAssignments();
    } catch (err) {
      showToast(err.message || 'Erreur lors de la validation.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Demander une réévaluation
  const handleConfirmReassessment = async () => {
    if (!selectedAssignment) return;
    if (!reassessmentReason.trim()) {
      showToast('Le motif de réévaluation est obligatoire pour l\'élève.', 'warning');
      return;
    }

    try {
      setSaving(true);
      await workshopService.requestReassessment(selectedAssignment.AssignationId, {
        motif: reassessmentReason.trim(),
        observations,
        pointsForts,
        axesAmelioration
      });
      showToast('Demande de réévaluation transmise à l\'élève.', 'warning');
      setShowReassessmentModal(false);
      setShowEvalModal(false);
      setReassessmentReason('');
      loadAssignments();
    } catch (err) {
      showToast(err.message || 'Erreur demande réévaluation.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-slide pb-12">
      {/* 1. Header Évaluation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slateSubtle-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span className="text-[11px] uppercase tracking-wider font-bold text-gendarmerie">
              الدرك الملكي • فضاء التأطير والتقييم الميداني
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gendarmerie font-serif mt-0.5">
            Espace d'Évaluation & Supervision Pratique
          </h1>
          <p className="text-xs text-slateSubtle-700 mt-0.5">
            Supervision des stagiaires, suivi de l'exécution des tâches sur le terrain et notation sur 20 points.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-gendarmerie/10 text-gendarmerie text-xs font-bold border border-gendarmerie/20">
            {isCommission ? 'Évaluateur Commission' : 'Superviseur Commandement'}
          </span>
        </div>
      </div>

      {/* Sélecteur de Vue Principale */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('EVAL_GRID')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'EVAL_GRID'
              ? 'bg-[#1B4332] text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Award className="w-4 h-4 text-gold" />
          <span>Grille d'Évaluation Pratique Terrain</span>
        </button>
        <button
          onClick={() => setActiveTab('ASSIGNMENTS_LIST')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'ASSIGNMENTS_LIST'
              ? 'bg-[#1B4332] text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Layers className="w-4 h-4 text-gold" />
          <span>Suivi des Assignations & Ateliers ({assignments.length})</span>
        </button>
      </div>

      {/* Contenu selon l'onglet actif */}
      {activeTab === 'EVAL_GRID' ? (
        <PracticalFieldEvaluationForm onEvaluationSaved={loadAssignments} />
      ) : (
        <>
      {/* 2. Filtres & Recherche */}
      <div className="bg-white p-4 rounded-xl border border-slateSubtle-200 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Onglets de Statut */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'ALL', label: 'Tous' },
              { id: 'PENDING', label: 'À évaluer / En attente visa' },
              { id: 'IN_PROGRESS', label: 'En manipulation' },
              { id: 'VALIDATED', label: 'Validés' },
              { id: 'REASSESSMENT', label: 'À réévaluer' }
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setFilterStatus(st.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterStatus === st.id
                    ? 'bg-gendarmerie text-white shadow-2xs'
                    : 'bg-cream-100 text-slateSubtle-700 hover:bg-cream-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Recherche */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slateSubtle-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher élève, matricule, atelier..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slateSubtle-200 bg-white focus:outline-none focus:ring-1 focus:ring-gendarmerie shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* 3. Liste Tabulaire des Stagiaires Assignés */}
      {filteredAssignments.length === 0 ? (
        <EmptyState
          title="Aucun élève dans cette sélection"
          description="Vous n'avez aucun stagiaire correspondant aux filtres actifs."
        />
      ) : (
        <div className="bg-white rounded-xl border border-slateSubtle-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto table-responsive-container">
            <table className="w-full text-left text-xs text-slate-800 min-w-[640px]">
              <thead className="bg-cream-100/80 text-[11px] uppercase tracking-wider text-slateSubtle-600 font-bold border-b border-slateSubtle-200">
                <tr>
                  <th className="p-3.5">Élève Gendarme</th>
                  <th className="p-3.5">Atelier Pratique</th>
                  <th className="p-3.5">Progression</th>
                  <th className="p-3.5">Statut</th>
                  <th className="p-3.5">Résultat</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slateSubtle-100">
                {filteredAssignments.map((assign) => {
                  const w = assign.Atelier || {};
                  const eleve = assign.Eleve || {};
                  const statut = assign.Statut || 'NON_COMMENCE';
                  const pct = assign.AvancementPourcentage ?? (statut === 'VALIDE' ? 100 : 0);
                  const isReadyToEvaluate = statut === 'EN_ATTENTE_VALIDATION';

                  return (
                    <tr key={assign.AssignationId} className="hover:bg-cream-50/60 transition-colors">
                      <td className="p-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gendarmerie/10 text-gendarmerie flex items-center justify-center font-bold font-serif shrink-0">
                            {eleve.nom ? eleve.nom[0] : 'E'}
                          </div>
                          <div>
                            <span className="font-bold text-gendarmerie block">
                              {eleve.nom} {eleve.prenom}
                            </span>
                            <span className="font-mono text-[10px] text-slateSubtle-500">
                              {eleve.matricule || 'EG-2025-014'} • {eleve.promotion || 'Promo 54'}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5">
                        <div className="max-w-[240px]">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[10px] font-bold text-gendarmerie bg-cream-200 px-1.5 py-0.2 rounded">
                              {w.Code}
                            </span>
                            <span className="text-xs font-semibold truncate" title={w.Titre}>
                              {w.Titre}
                            </span>
                          </div>
                          <span className="text-[10px] text-slateSubtle-500 block truncate mt-0.5">
                            {w.Categorie?.intituleFr || w.SousDomaine}
                          </span>
                        </div>
                      </td>

                      <td className="p-3.5">
                        <div className="w-32 space-y-1">
                          <div className="flex items-center justify-between text-[10px] font-bold text-slateSubtle-600">
                            <span>Avancement</span>
                            <span>{pct}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                statut === 'VALIDE' ? 'bg-emerald-500' : isReadyToEvaluate ? 'bg-indigo-500' : 'bg-gold'
                              }`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5">
                        {statut === 'VALIDE' ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Validé</span>
                          </span>
                        ) : statut === 'EN_ATTENTE_VALIDATION' ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 animate-pulse">
                            <Clock className="w-3 h-3 text-indigo-600" />
                            <span>À Évaluer</span>
                          </span>
                        ) : statut === 'A_REEVALUER' ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                            <RotateCcw className="w-3 h-3 text-rose-600" />
                            <span>À Réévaluer</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                            <TrendingUp className="w-3 h-3 text-amber-600" />
                            <span>En cours</span>
                          </span>
                        )}
                      </td>

                      <td className="p-3.5">
                        {assign.ScoreObtenu !== null && assign.ScoreObtenu !== undefined ? (
                          <span className="font-extrabold text-sm text-gendarmerie font-serif">
                            {assign.ScoreObtenu}/20
                          </span>
                        ) : (
                          <span className="text-slateSubtle-400 font-semibold">—</span>
                        )}
                      </td>

                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleOpenEvaluate(assign)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            isReadyToEvaluate
                              ? 'bg-gendarmerie text-white hover:bg-[#1C4E39] shadow-xs'
                              : 'bg-cream-200 text-gendarmerie hover:bg-cream-300'
                          }`}
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>{isReadyToEvaluate ? 'Évaluer maintenant' : 'Ouvrir fiche'}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Modal d'Évaluation Pratique */}
      {selectedAssignment && (
        <Modal
          isOpen={showEvalModal}
          onClose={() => setShowEvalModal(false)}
          title={`Fiche d'Évaluation Pratique — ${selectedAssignment.Eleve?.nom} ${selectedAssignment.Eleve?.prenom} (${selectedAssignment.Atelier?.Code})`}
          size="xl"
        >
          <div className="space-y-6 py-1 text-xs">
            {/* Résumé Élève & Statut Tâches Réalisées */}
            <div className="p-4 rounded-xl bg-cream-100 border border-slateSubtle-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-slateSubtle-500 block">Stagiaire Évalué</span>
                <span className="font-bold text-sm text-gendarmerie">
                  {selectedAssignment.Eleve?.nom} {selectedAssignment.Eleve?.prenom} (Matricule {selectedAssignment.Eleve?.matricule || 'EG-2025-014'})
                </span>
                <p className="text-[11px] text-slateSubtle-600 mt-0.5">
                  Atelier : {selectedAssignment.Atelier?.Titre} ({selectedAssignment.Atelier?.DureeMinutes || 90} min)
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold uppercase text-slateSubtle-500 block">Progression Stagiaire</span>
                <span className="text-sm font-extrabold text-emerald-800">
                  {selectedAssignment.AvancementPourcentage ?? 100}% complété
                </span>
                <span className="text-[10px] text-slateSubtle-500 block mt-0.5">
                  {selectedAssignment.PreuvesAttachees?.length || 0} pièce(s) justificative(s)
                </span>
              </div>
            </div>

            {/* Checklist et observations du stagiaire */}
            {selectedAssignment.TachesChecklist?.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-bold text-gendarmerie uppercase tracking-wider text-[11px]">
                  Travaux pratiques réalisés par l'élève :
                </h4>
                <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200 max-h-48 overflow-y-auto">
                  {selectedAssignment.TachesChecklist.map((task, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px]">
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-white ${task.termine ? 'bg-emerald-600' : 'bg-slate-300'}`}>
                        {task.termine && <Check className="w-3 h-3" />}
                      </span>
                      <div className="flex-1">
                        <span className="font-bold text-slate-900">{task.titre || task.instructions}</span>
                        {task.observationEleve && (
                          <p className="text-slateSubtle-600 italic mt-0.5">
                            Note élève : « {task.observationEleve} »
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Note Totale en Direct (/20) */}
            <div className="bg-gradient-to-r from-[#153B2B] to-[#1C4E39] text-white p-4 rounded-xl flex items-center justify-between shadow-sm">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-light">Total Calculé Automatiquement</span>
                <div className="text-2xl font-extrabold font-serif mt-0.5">
                  {totalScore20} / 20 points
                  <span className="text-xs font-semibold text-gold-light ml-2">({scorePercentage}%)</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-gold-light block">Mention</span>
                <span className="text-xs font-bold text-white bg-white/20 px-2.5 py-0.5 rounded-full inline-block mt-0.5">
                  {totalScore20 >= 18 ? 'EXCELLENT' : totalScore20 >= 15 ? 'TRÈS BON' : totalScore20 >= 12 ? 'BON' : totalScore20 >= 10 ? 'SATISFAISANT' : 'À RÉÉVALUER'}
                </span>
              </div>
            </div>

            {/* Grille de Notation des 4 Critères (/5 chacun) */}
            <div className="space-y-3">
              <h4 className="font-bold text-gendarmerie uppercase tracking-wider text-[11px]">
                Notation détaillée des 4 critères réglementaires (/5 points) :
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'CRIT-SEC-METH', name: '1. Sécurité et méthodologie', desc: 'Port des EPI, zone de travail dégagée, conformité militaire' },
                  { id: 'CRIT-DIAG-PREC', name: '2. Précision du diagnostic', desc: 'Exactitude de la démarche d\'investigation sans conjecture' },
                  { id: 'CRIT-EXEC-QUAL', name: '3. Qualité d\'exécution', desc: 'Dextérité manuelle, précision du réglage et finitions' },
                  { id: 'CRIT-TPS-DISC', name: '4. Temps et discipline', desc: 'Respect du temps imparti, sang-froid et maintien' }
                ].map((crit) => (
                  <div key={crit.id} className="p-3 rounded-xl bg-cream-100 border border-slateSubtle-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gendarmerie">{crit.name}</span>
                      <select
                        value={notes[crit.id]}
                        onChange={(e) => setNotes({ ...notes, [crit.id]: parseFloat(e.target.value) })}
                        className="text-xs font-bold px-2 py-1 rounded bg-white border border-slateSubtle-300 text-gendarmerie focus:outline-none"
                      >
                        {[5, 4.5, 4, 3.5, 3, 2.5, 2, 1, 0].map((v) => (
                          <option key={v} value={v}>{v} / 5 pts</option>
                        ))}
                      </select>
                    </div>
                    <p className="text-[10px] text-slateSubtle-600">{crit.desc}</p>
                    <input
                      type="text"
                      value={criteriaComments[crit.id]}
                      onChange={(e) => setCriteriaComments({ ...criteriaComments, [crit.id]: e.target.value })}
                      placeholder="Commentaire justificatif pour ce critère..."
                      className="w-full text-[11px] px-2 py-1 rounded border border-slateSubtle-200 bg-white"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Observations Générales de l'Évaluateur */}
            <div className="space-y-1.5">
              <label className="font-bold text-gendarmerie uppercase tracking-wider text-[11px] block">
                Observations globales de l'évaluateur :
              </label>
              <textarea
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                rows={3}
                placeholder="Rédigez l'appréciation officielle sur la prestation pratique du stagiaire..."
                className="w-full text-xs p-3 rounded-xl border border-slateSubtle-300 bg-white focus:outline-none focus:ring-1 focus:ring-gendarmerie"
              />
            </div>

            {/* Boutons d'Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slateSubtle-200">
              <button
                onClick={() => setShowReassessmentModal(true)}
                disabled={saving}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-rose-50 text-rose-700 border border-rose-300 font-bold hover:bg-rose-100 transition-all text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Demander une Réévaluation</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveDraft}
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-slateSubtle-300 text-slate-700 font-bold hover:bg-cream-100 transition-all text-xs"
                >
                  <Save className="w-3.5 h-3.5 text-gold-dark" />
                  <span>Enregistrer Brouillon</span>
                </button>

                <button
                  onClick={handleValidateEvaluation}
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-700 text-white font-bold hover:bg-emerald-800 transition-all text-xs shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Valider & Certifier ({totalScore20}/20)</span>
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* 5. Modal de Demande de Réévaluation avec Motif Obligatoire */}
      <Modal
        isOpen={showReassessmentModal}
        onClose={() => setShowReassessmentModal(false)}
        title="Demande de Réévaluation Pratique"
        size="md"
      >
        <div className="space-y-4 py-1 text-xs">
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-2.5">
            <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Consigne formelle de réévaluation</strong>
              <p className="text-rose-950 mt-0.5">
                L'atelier sera remis au statut "À Réévaluer" et l'élève recevra vos instructions pour parfaire sa manipulation avant nouveau visa.
              </p>
            </div>
          </div>

          <div>
            <label className="font-bold text-gendarmerie block mb-1">
              Motif circonstancié et directives de perfectionnement (Obligatoire) :
            </label>
            <textarea
              value={reassessmentReason}
              onChange={(e) => setReassessmentReason(e.target.value)}
              rows={4}
              placeholder="Ex: La procédure de purge a été exécutée de manière incomplète. Séance de perfectionnement obligatoire avant nouvelle validation..."
              className="w-full text-xs p-3 rounded-xl border border-slateSubtle-300 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slateSubtle-200">
            <button
              onClick={() => setShowReassessmentModal(false)}
              className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
            >
              Annuler
            </button>
            <button
              onClick={handleConfirmReassessment}
              disabled={saving || !reassessmentReason.trim()}
              className="px-4 py-2 rounded-lg bg-rose-600 text-white font-bold hover:bg-rose-700 disabled:opacity-50"
            >
              Confirmer la Demande
            </button>
          </div>
        </div>
      </Modal>
        </>
      )}
    </div>
  );
}

