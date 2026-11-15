import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { workshopService } from '../../services/workshopService.js';
import {
  Wrench,
  Cpu,
  Radio,
  Boxes,
  Layers,
  ArrowLeft,
  ArrowRight,
  Clock,
  UserCheck,
  CheckCircle2,
  AlertOctagon,
  ShieldCheck,
  ShieldAlert,
  Play,
  Save,
  Send,
  FileText,
  Paperclip,
  Plus,
  Trash2,
  Sparkles,
  Info,
  RotateCcw,
  BookOpen,
  CheckSquare,
  Activity,
  HardHat,
  Monitor,
  Target,
  Award,
  Compass,
  ListOrdered
} from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import Modal from '../../components/common/Modal.jsx';
import WorkshopEvaluationModal from '../../components/workshops/WorkshopEvaluationModal.jsx';
import { getWorkshopAcademyDetails, getWorkshopMedia } from '../../data/workshopAcademyData.js';

// Composants d'exercices interactifs
import QcmExercise from '../../components/workshops/exercises/QcmExercise.jsx';
import HotspotExercise from '../../components/workshops/exercises/HotspotExercise.jsx';
import AssociationExercise from '../../components/workshops/exercises/AssociationExercise.jsx';
import OrderingExercise from '../../components/workshops/exercises/OrderingExercise.jsx';
import DiagnosticExercise from '../../components/workshops/exercises/DiagnosticExercise.jsx';
import SimulationMissionRunner from '../../components/workshops/exercises/SimulationMissionRunner.jsx';

export default function StudentWorkshopSessionPage() {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Onglet principal de l'Académie :
  // 'presentation', 'apprentissage', 'exercices', 'simulation', 'evaluation', 'resultats'
  const [activeTab, setActiveTab] = useState('presentation');

  // Exercice actif dans l'onglet Exercices
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [exerciseScores, setExerciseScores] = useState({});

  // Checklist de tâches pratiques & observations
  const [checklist, setChecklist] = useState([]);
  const [observationsEleve, setObservationsEleve] = useState('');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);

  // Formulaire d'ajout de pièce justificative
  const [newEvidenceName, setNewEvidenceName] = useState('');
  const [newEvidenceType, setNewEvidenceType] = useState('image/png');
  const [newEvidenceSize, setNewEvidenceSize] = useState('1.2 Mo');

  const loadAssignment = async () => {
    try {
      setLoading(true);
      const data = await workshopService.getAssignmentById(assignmentId);
      if (!data) {
        showToast('Atelier introuvable.', 'error');
        navigate('/eleve/guide');
        return;
      }
      setAssignment(data);
      setChecklist(data.TachesChecklist || []);
      setObservationsEleve(data.ObservationsEleve || '');

      // Détermine l'onglet initial selon le statut
      if (data.Statut === 'VALIDE' || data.Statut === 'EVALUE') {
        setActiveTab('resultats');
      } else if (data.Statut === 'EN_ATTENTE_VALIDATION') {
        setActiveTab('evaluation');
      }
    } catch (err) {
      console.error('Erreur chargement session atelier:', err);
      showToast('Impossible de charger la séance d\'atelier.', 'error');
      navigate('/eleve/guide');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (assignmentId) {
      loadAssignment();
    }
  }, [assignmentId]);

  if (loading) {
    return <LoadingSpinner text="Chargement de votre atelier pratique..." fullPage />;
  }

  if (!assignment) return null;

  const w = assignment.Atelier || {};
  const mission = w.MissionPratique || {};
  const statut = assignment.Statut || 'NON_COMMENCE';
  const isLocked = Boolean(assignment.EstVerrouille);
  const isValidated = statut === 'VALIDE' || statut === 'EVALUE';
  const isPending = statut === 'EN_ATTENTE_VALIDATION';
  const isInProgress = statut === 'EN_COURS';
  const isAvailable = statut === 'NON_COMMENCE' || statut === 'ASSIGNE';
  const isNeedsReassessment = statut === 'A_REEVALUER' || statut === 'REJETE' || assignment.ArretSecurite;

  const media = getWorkshopMedia(w.Code, w.CategorieId);
  const academyData = getWorkshopAcademyDetails(w.Code) || {};

  const totalTasks = checklist.length || 3;
  const completedTasks = checklist.filter((t) => t.termine).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : (isValidated ? 100 : 0);

  // Bascule d'une tâche pratique
  const handleToggleTask = async (taskIndex) => {
    if (isLocked || isValidated || isPending) return;

    const updated = checklist.map((item, idx) => {
      if (idx === taskIndex) {
        const nextState = !item.termine;
        return {
          ...item,
          termine: nextState,
          dateCompletion: nextState ? new Date().toISOString() : null
        };
      }
      return item;
    });

    setChecklist(updated);

    try {
      await workshopService.updateProgress(assignmentId, {
        action: 'PROGRESS',
        tachesChecklist: updated,
        observationsEleve
      });
    } catch (e) {
      console.warn('Auto-save progress failed:', e);
    }
  };

  // Sauvegarde manuelle
  const handleManualSave = async () => {
    try {
      setSaving(true);
      const res = await workshopService.updateProgress(assignmentId, {
        action: 'PROGRESS',
        tachesChecklist: checklist,
        observationsEleve
      });
      setAssignment(res.assignment);
      showToast('Progression enregistrée avec succès.', 'success');
    } catch (err) {
      showToast(err.message || 'Erreur lors de la sauvegarde.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Soumission à l'instructeur
  const handleConfirmSubmit = async () => {
    try {
      setSubmitting(true);
      const res = await workshopService.updateProgress(assignmentId, {
        action: 'SUBMIT',
        tachesChecklist: checklist,
        observationsEleve
      });
      setAssignment(res.assignment);
      setShowSubmitModal(false);
      showToast('Atelier soumis avec succès pour évaluation.', 'success');
      setActiveTab('evaluation');
    } catch (err) {
      showToast(err.message || 'Erreur lors de la soumission.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Ajout de pièce justificative
  const handleAddEvidence = async () => {
    if (!newEvidenceName.trim()) {
      showToast('Veuillez renseigner un intitulé de document.', 'error');
      return;
    }
    try {
      const res = await workshopService.addEvidence(assignmentId, {
        nomFichier: newEvidenceName.trim(),
        typeMime: newEvidenceType,
        taille: newEvidenceSize
      });
      setAssignment(res.assignment);
      setNewEvidenceName('');
      setShowEvidenceModal(false);
      showToast('Pièce justificative ajoutée avec succès.', 'success');
    } catch (err) {
      showToast(err.message || 'Erreur lors de l\'ajout de la preuve.', 'error');
    }
  };

  const handleDeleteEvidence = async (evidenceId) => {
    if (isLocked || isValidated) return;
    try {
      const res = await workshopService.deleteEvidence(assignmentId, evidenceId);
      setAssignment(res.assignment);
      showToast('Preuve technique supprimée.', 'info');
    } catch (err) {
      showToast(err.message || 'Erreur lors de la suppression.', 'error');
    }
  };

  // Enregistrement d'un résultat d'exercice
  const handleExerciseComplete = (result) => {
    setExerciseScores((prev) => ({
      ...prev,
      [result.exerciseId]: result.score
    }));
    showToast(result.isCorrect ? 'Exercice validé avec succès ! (+10 pts)' : 'Exercice complété.', result.isCorrect ? 'success' : 'info');
  };

  const exercisesList = academyData.exercices || [];
  const activeExercise = exercisesList[activeExerciseIndex] || null;

  return (
    <div className="w-full space-y-6 animate-fade-slide pb-20">
      {/* 1. Barre de retour et statut supérieur */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slateSubtle-200">
        <button
          onClick={() => navigate('/eleve/guide')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slateSubtle-700 hover:text-gendarmerie transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au GUIDE</span>
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          {isValidated && (
            <button
              onClick={() => setShowEvaluationModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition shadow-xs cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Consulter Mon Résultat ({assignment.ScoreObtenu}/20)</span>
            </button>
          )}

          {isPending && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
              <Clock className="w-3.5 h-3.5" />
              <span>Dossier en attente d'évaluation de la commission</span>
            </span>
          )}

          {isNeedsReassessment && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>À réévaluer</span>
            </span>
          )}
        </div>
      </div>

      {/* 2. Hero Bannière de l'Atelier avec Photo Réelle */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slateSubtle-200 shadow-md">
        <div className="relative h-56 sm:h-64 w-full">
          <img
            src={media.url}
            alt={media.alt || w.Titre}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Informations sur l'image */}
          <div className="absolute bottom-5 inset-x-5 sm:inset-x-6 text-white space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-lg bg-gold text-gendarmerie shadow-xs">
                {w.Code || 'ATELIER'}
              </span>
              <span className="text-white/60">•</span>
              <span className="text-xs font-bold text-gold-light uppercase tracking-wider">
                {w.Categorie?.intituleFr || w.SousDomaine || 'Atelier Professionnel'}
              </span>
              <span className="text-white/60">•</span>
              <span className="text-xs text-slate-200 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gold-light" />
                {w.DureeMinutes || 60} min
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-white leading-tight">
              {w.Titre}
            </h1>
            {w.TitreAr && (
              <p className="text-xs sm:text-sm text-slate-300 font-arabic" dir="rtl">
                {w.TitreAr}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 3. Navigation par Onglets de l'Espace d'Apprentissage */}
      <div className="bg-white rounded-2xl p-2 border border-slateSubtle-200 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          {[
            { id: 'presentation', label: '1. Présentation', icon: BookOpen },
            { id: 'apprentissage', label: '2. Apprentissage', icon: Sparkles },
            { id: 'exercices', label: `3. Exercices (${exercisesList.length})`, icon: Target },
            { id: 'simulation', label: '4. Mode Simulation', icon: Activity },
            { id: 'evaluation', label: `5. Évaluation (${completedTasks}/${totalTasks})`, icon: CheckSquare },
            { id: 'resultats', label: '6. Résultats', icon: Award }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  window.scrollTo({ top: 320, behavior: 'smooth' });
                }}
                className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-gendarmerie text-white shadow-xs font-semibold'
                    : 'bg-cream-50/60 text-slateSubtle-700 hover:bg-cream-100 hover:text-gendarmerie border border-slateSubtle-200/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Contenu dynamique selon l'onglet actif */}

      {/* ======================================================================
          ONGLET 1 : PRÉSENTATION & OBJECTIFS
         ====================================================================== */}
      {activeTab === 'presentation' && (
        <div className="space-y-6 animate-fade-slide">
          {/* Situation & Contexte */}
          <div className="bg-white rounded-2xl border border-slateSubtle-200 p-5 sm:p-6 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-gendarmerie font-serif flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gold-dark" />
              <span>Contexte & Mission Opérationnelle</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {mission.contexteProfessionnel || w.DescriptionFr || 'Mise en situation pratique de formation technique encadrée.'}
            </p>
            {mission.situationInitiale && (
              <div className="p-4 rounded-xl bg-cream-50/90 border border-slateSubtle-200 text-xs sm:text-sm text-slate-800 font-serif italic border-l-4 border-l-gold">
                « {mission.situationInitiale} »
              </div>
            )}
          </div>

          {/* Grille : Objectifs & Compétences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Objectifs pédagogiques */}
            <div className="bg-white rounded-2xl border border-slateSubtle-200 p-5 sm:p-6 shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gendarmerie flex items-center gap-2">
                <Target className="w-4 h-4 text-gold-dark" />
                <span>Objectifs Pédagogiques Clés</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {(w.Objectifs?.length > 0
                  ? w.Objectifs
                  : [
                      "Identifier la source exacte du dysfonctionnement sans devinette",
                      "Appliquer strictement les protocoles de sécurité et le port des EPI",
                      "Utiliser l'outillage de dotation conformément aux règles de l'art",
                      "Rédiger un compte-rendu technique clair pour le commandement"
                    ]
                ).map((obj, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center justify-center shrink-0">
                      ✓
                    </span>
                    <span className="leading-relaxed">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Compétences ciblées & Orientation */}
            <div className="bg-white rounded-2xl border border-slateSubtle-200 p-5 sm:p-6 shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gendarmerie flex items-center gap-2">
                <Compass className="w-4 h-4 text-gold-dark" />
                <span>Compétences Métier Recherchées</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {(academyData.competencesRecherchees || [
                  "Diagnostic méthodique",
                  "Sécurité opérationnelle",
                  "Dextérité technique",
                  "Discipline militaire"
                ]).map((comp, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gendarmerie/10 text-gendarmerie text-xs font-semibold border border-gendarmerie/20"
                  >
                    <span className="text-gold-dark">★</span>
                    <span>{comp}</span>
                  </span>
                ))}
              </div>

              {academyData.specialiteLabel && (
                <div className="pt-3 border-t border-slateSubtle-100">
                  <span className="text-[10px] uppercase font-bold text-slateSubtle-500 block">
                    Orientation militaire associée :
                  </span>
                  <span className="text-xs font-bold text-gendarmerie">
                    {academyData.specialiteLabel}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Matériel Requis & Outillage */}
          <div className="bg-white rounded-2xl border border-slateSubtle-200 p-5 sm:p-6 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gendarmerie flex items-center gap-2">
              <Wrench className="w-4 h-4 text-gold-dark" />
              <span>Matériel Nécessaire & Outillage de Dotation</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {(academyData.materielRequis || [
                { nom: "Fiche technique d'intervention", desc: "Documentation officielle", icon: "FileText" },
                { nom: "Outillage de précision", desc: "Dotation d'atelier", icon: "Wrench" },
                { nom: "Équipements de protection EPI", desc: "Gants, lunettes", icon: "HardHat" }
              ]).map((eq, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-cream-50/60 border border-slateSubtle-200 space-y-1"
                >
                  <div className="text-xs font-bold text-gendarmerie flex items-center gap-2">
                    <Wrench className="w-3.5 h-3.5 text-gold-dark shrink-0" />
                    <span>{eq.nom}</span>
                  </div>
                  <p className="text-[11px] text-slateSubtle-600 leading-snug">
                    {eq.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Consignes de Sécurité Impératives */}
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-900 uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Règles Impératives de Sécurité Militaire</span>
            </div>
            <p className="text-xs text-rose-950 leading-relaxed font-medium">
              Toute intervention doit respecter scrupuleusement la mise hors tension, le port des EPI obligatoires et l'ordre sur le poste de travail. Tout comportement dangereux entraîne un arrêt de sécurité immédiat.
            </p>
          </div>

          {/* Bouton de passage au cours */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => {
                setActiveTab('apprentissage');
                window.scrollTo({ top: 320, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gendarmerie text-white text-xs font-bold hover:bg-[#1C4E39] transition shadow-xs cursor-pointer"
            >
              <span>Accéder au support de cours & schémas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================================
          ONGLET 2 : APPRENTISSAGE & SCHÉMAS INTERACTIFS
         ====================================================================== */}
      {activeTab === 'apprentissage' && (
        <div className="space-y-6 animate-fade-slide">
          {academyData.cours ? (
            <>
              {/* En-tête du cours */}
              <div className="bg-white rounded-2xl border border-slateSubtle-200 p-5 sm:p-6 shadow-xs space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark bg-gold/10 px-2.5 py-0.5 rounded-md">
                  Support Pédagogique Officiel
                </span>
                <h3 className="text-lg font-bold text-gendarmerie font-serif">
                  {academyData.cours.titre}
                </h3>
                <p className="text-xs sm:text-sm text-slateSubtle-700 leading-relaxed">
                  {academyData.cours.description}
                </p>
              </div>

              {/* Fiches de cours illustrées */}
              <div className="space-y-4">
                {academyData.cours.fiches.map((fiche) => (
                  <div
                    key={fiche.id}
                    className="bg-white rounded-2xl border border-slateSubtle-200 p-5 sm:p-6 shadow-xs space-y-3"
                  >
                    <h4 className="text-sm font-bold text-gendarmerie font-serif flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-gold-dark shrink-0" />
                      <span>{fiche.titre}</span>
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                      {fiche.contenu}
                    </p>

                    {/* Points clés */}
                    {fiche.pointsCles && (
                      <div className="p-3.5 rounded-xl bg-cream-50/80 border border-slateSubtle-200 space-y-1.5">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-gendarmerie">
                          Points clés à mémoriser :
                        </div>
                        <ul className="space-y-1 text-xs text-slate-700">
                          {fiche.pointsCles.map((pt, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-gold-dark font-bold">•</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tableau technique si présent */}
                    {fiche.tableau && (
                      <div className="overflow-x-auto no-scrollbar pt-2">
                        <table className="w-full text-left text-xs border border-slateSubtle-200 rounded-xl overflow-hidden">
                          <thead className="bg-cream-100 text-gendarmerie font-bold">
                            <tr>
                              <th className="p-2.5 border-b border-slateSubtle-200">Signal / Symptôme</th>
                              <th className="p-2.5 border-b border-slateSubtle-200">Signification Technique</th>
                              <th className="p-2.5 border-b border-slateSubtle-200">Action Recommandée</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slateSubtle-100">
                            {fiche.tableau.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-cream-50/50">
                                <td className="p-2.5 font-bold font-mono text-gendarmerie">{row.signal}</td>
                                <td className="p-2.5 text-slate-800">{row.signification}</td>
                                <td className="p-2.5 text-slate-600 italic">{row.action}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Astuce de l'Instructeur */}
                    {fiche.astuceInstructeur && (
                      <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 text-xs flex items-start gap-2 font-medium">
                        <UserCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                        <span>{fiche.astuceInstructeur}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Schéma Interactif d'Organes si présent */}
              {academyData.cours.schemaInteractif && (
                <div className="bg-white rounded-2xl border border-slateSubtle-200 p-5 sm:p-6 shadow-xs space-y-4">
                  <h4 className="text-sm font-bold text-gendarmerie font-serif flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-gold-dark" />
                    <span>{academyData.cours.schemaInteractif.titre}</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {academyData.cours.schemaInteractif.composants.map((comp) => (
                      <div
                        key={comp.id}
                        className="p-3.5 rounded-xl bg-cream-50 border border-slateSubtle-200 space-y-1 hover:border-gendarmerie/40 transition"
                      >
                        <div className="text-xs font-bold text-gendarmerie flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                          <span>{comp.nom}</span>
                        </div>
                        <p className="text-[11px] text-slateSubtle-600 leading-snug">
                          {comp.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="p-6 bg-white rounded-2xl border border-slateSubtle-200 text-center text-xs text-slateSubtle-600">
              Support de cours en cours de synchronisation pour cet atelier.
            </div>
          )}

          {/* Bouton vers les exercices */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => {
                setActiveTab('exercices');
                window.scrollTo({ top: 320, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gendarmerie text-white text-xs font-bold hover:bg-[#1C4E39] transition shadow-xs cursor-pointer"
            >
              <span>Tester mes connaissances (Exercices pratiques)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================================
          ONGLET 3 : EXERCICES PRATIQUES INTERACTIFS
         ====================================================================== */}
      {activeTab === 'exercices' && (
        <div className="space-y-6 animate-fade-slide">
          {exercisesList.length > 0 ? (
            <>
              {/* Sélecteur d'exercices */}
              <div className="bg-white rounded-2xl p-3 border border-slateSubtle-200 shadow-xs flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  {exercisesList.map((ex, idx) => {
                    const isCompleted = exerciseScores[ex.id] !== undefined;
                    const isCurrent = idx === activeExerciseIndex;

                    return (
                      <button
                        key={ex.id}
                        onClick={() => setActiveExerciseIndex(idx)}
                        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                          isCurrent
                            ? 'bg-gendarmerie text-white shadow-xs'
                            : isCompleted
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-cream-50 text-slateSubtle-700 hover:bg-cream-100 border border-slateSubtle-200'
                        }`}
                      >
                        <span>Exercice {idx + 1}</span>
                        {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                      </button>
                    );
                  })}
                </div>

                <div className="text-xs font-bold text-slateSubtle-600">
                  Complétés : {Object.keys(exerciseScores).length} / {exercisesList.length}
                </div>
              </div>

              {/* Rendu du type d'exercice actif */}
              {activeExercise && (
                <>
                  {activeExercise.type === 'qcm' && (
                    <QcmExercise
                      key={activeExercise.id}
                      exercise={activeExercise}
                      onComplete={handleExerciseComplete}
                    />
                  )}
                  {activeExercise.type === 'hotspot' && (
                    <HotspotExercise
                      key={activeExercise.id}
                      exercise={activeExercise}
                      onComplete={handleExerciseComplete}
                    />
                  )}
                  {activeExercise.type === 'association' && (
                    <AssociationExercise
                      key={activeExercise.id}
                      exercise={activeExercise}
                      onComplete={handleExerciseComplete}
                    />
                  )}
                  {activeExercise.type === 'ordonnancement' && (
                    <OrderingExercise
                      key={activeExercise.id}
                      exercise={activeExercise}
                      onComplete={handleExerciseComplete}
                    />
                  )}
                  {activeExercise.type === 'diagnostic' && (
                    <DiagnosticExercise
                      key={activeExercise.id}
                      exercise={activeExercise}
                      onComplete={handleExerciseComplete}
                    />
                  )}
                </>
              )}

              {/* Bouton vers la simulation */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    setActiveTab('simulation');
                    window.scrollTo({ top: 320, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gendarmerie text-white text-xs font-bold hover:bg-[#1C4E39] transition shadow-xs cursor-pointer"
                >
                  <span>Passer au Mode Simulation Professionnelle</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="p-8 bg-white rounded-2xl border border-slateSubtle-200 text-center space-y-2">
              <Target className="w-8 h-8 text-gold-dark mx-auto" />
              <h4 className="text-sm font-bold text-gendarmerie">Exercices pratiques</h4>
              <p className="text-xs text-slateSubtle-600">
                Les exercices de cet atelier sont en cours de chargement.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ======================================================================
          ONGLET 4 : MODE SIMULATION PROFESSIONNELLE
         ====================================================================== */}
      {activeTab === 'simulation' && (
        <div className="space-y-6 animate-fade-slide">
          {academyData.simulation ? (
            <SimulationMissionRunner
              simulation={academyData.simulation}
              onCompleteMission={(res) => {
                showToast('Félicitations ! Simulation professionnelle réussie avec 20/20.', 'success');
              }}
            />
          ) : (
            <div className="p-8 bg-white rounded-2xl border border-slateSubtle-200 text-center space-y-2">
              <Activity className="w-8 h-8 text-gendarmerie mx-auto" />
              <h4 className="text-sm font-bold text-gendarmerie">Simulation Professionnelle</h4>
              <p className="text-xs text-slateSubtle-600">
                La mission de simulation numérique sera disponible pour cet atelier prochainement.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ======================================================================
          ONGLET 5 : ÉVALUATION TERRAIN & CHECKLIST
         ====================================================================== */}
      {activeTab === 'evaluation' && (
        <div className="space-y-6 animate-fade-slide">
          {/* Instructions Terrain */}
          <div className="bg-white rounded-2xl border border-slateSubtle-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slateSubtle-100">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-gendarmerie font-serif flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-gold-dark" />
                  <span>Tâches Pratiques Terrain sous Supervision</span>
                </h3>
                <p className="text-xs text-slateSubtle-600">
                  Cochez chaque tâche dès sa réalisation sur le poste sous le contrôle de la commission.
                </p>
              </div>
              <span className="text-xs font-bold font-mono px-3 py-1 rounded-xl bg-cream-100 text-gendarmerie border border-slateSubtle-200">
                {completedTasks} / {totalTasks} tâches
              </span>
            </div>

            {/* Liste des tâches interactives */}
            <div className="space-y-3">
              {checklist.map((task, idx) => (
                <div
                  key={task.taskId || idx}
                  className={`p-4 rounded-xl border transition-all ${
                    task.termine
                      ? 'bg-emerald-50/60 border-emerald-300'
                      : 'bg-white border-slateSubtle-200 hover:border-gendarmerie/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => handleToggleTask(idx)}
                      disabled={isLocked || isValidated || isPending}
                      className={`mt-0.5 w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition cursor-pointer ${
                        task.termine
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-2xs'
                          : 'border-slateSubtle-300 hover:border-gendarmerie bg-white'
                      }`}
                    >
                      {task.termine && <CheckCircle2 className="w-4 h-4" />}
                    </button>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-gendarmerie">
                          {task.titre || `Tâche ${idx + 1}`}
                        </h4>
                        {task.baremePoints && (
                          <span className="text-[10px] font-bold text-slateSubtle-500 font-mono">
                            Barème : {task.baremePoints} pts
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slateSubtle-600 leading-relaxed">
                        {task.instructions || task.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Observations de l'élève */}
            <div className="space-y-2 pt-3 border-t border-slateSubtle-100">
              <label className="block text-xs font-bold text-gendarmerie uppercase tracking-wider">
                Compte-rendu de manipulation de l'élève (Optionnel) :
              </label>
              <textarea
                value={observationsEleve}
                onChange={(e) => setObservationsEleve(e.target.value)}
                disabled={isLocked || isValidated || isPending}
                rows={3}
                placeholder="Consignez vos remarques techniques, difficultés rencontrées ou outillage utilisé..."
                className="w-full p-3 text-xs rounded-xl border border-slateSubtle-200 bg-cream-50/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-gendarmerie"
              />
            </div>

            {/* Actions : Sauvegarder & Soumettre */}
            {!isValidated && !isPending && (
              <div className="flex items-center justify-between gap-3 pt-3">
                <button
                  type="button"
                  onClick={handleManualSave}
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slateSubtle-200 bg-white text-xs font-bold text-slateSubtle-700 hover:bg-cream-100 transition cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5 text-gold-dark" />
                  <span>{saving ? 'Sauvegarde...' : 'Enregistrer le brouillon'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowSubmitModal(true)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gendarmerie text-white text-xs font-bold hover:bg-[#1C4E39] transition shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Soumettre à la commission pour notation</span>
                </button>
              </div>
            )}
          </div>

          {/* Section Pièces justificatives / Photos */}
          <div className="bg-white rounded-2xl border border-slateSubtle-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slateSubtle-100">
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gendarmerie flex items-center gap-2">
                  <Paperclip className="w-4 h-4 text-gold-dark" />
                  <span>Pièces Justificatives & Relevés Techniques ({assignment.PreuvesAttachees?.length || 0})</span>
                </h4>
                <p className="text-xs text-slateSubtle-600">
                  Photos du banc de test, fiches d'autocontrôle, captures de log.
                </p>
              </div>

              {!isLocked && !isValidated && (
                <button
                  type="button"
                  onClick={() => setShowEvidenceModal(true)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gendarmerie/10 text-gendarmerie text-xs font-bold hover:bg-gendarmerie/20 transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ajouter une preuve</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {assignment.PreuvesAttachees?.map((p) => (
                <div
                  key={p.id}
                  className="p-3 rounded-xl bg-cream-50/70 border border-slateSubtle-200 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="w-4 h-4 text-gendarmerie shrink-0" />
                    <span className="font-semibold text-gendarmerie truncate">{p.nomFichier}</span>
                    <span className="text-[10px] text-slateSubtle-500 shrink-0">({p.taille})</span>
                  </div>

                  {!isLocked && !isValidated && (
                    <button
                      type="button"
                      onClick={() => handleDeleteEvidence(p.id)}
                      className="text-slateSubtle-400 hover:text-rose-600 transition p-1"
                      title="Supprimer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================
          ONGLET 6 : RÉSULTATS & BILAN OFFICIEL
         ====================================================================== */}
      {activeTab === 'resultats' && (
        <div className="space-y-6 animate-fade-slide">
          {isValidated ? (
            <div className="bg-white rounded-3xl border border-slateSubtle-200 p-6 sm:p-8 shadow-sm space-y-6">
              {/* Note Finale Hero */}
              <div className="bg-gradient-to-br from-[#153B2B] via-[#1A4533] to-[#0E291E] text-white rounded-2xl p-6 shadow-md border-2 border-gold/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="text-[11px] uppercase font-bold text-gold-light tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-gold" />
                    <span>Note Finale Officielle (/20)</span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl sm:text-5xl font-black font-serif text-white">
                      {assignment.ScoreObtenu ?? '—'}
                    </span>
                    <span className="text-xl text-gold-light">/ {assignment.ScoreTotalMax || 20} points</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowEvaluationModal(true)}
                  className="px-6 py-3 rounded-xl bg-gold hover:bg-gold-light text-gendarmerie font-bold text-xs transition shadow-md cursor-pointer self-start sm:self-auto"
                >
                  Ouvrir la fiche d'évaluation certifiée
                </button>
              </div>

              {/* Observations de la commission */}
              {assignment.ObservationsEvaluateur && (
                <div className="p-5 rounded-2xl bg-cream-50 border border-slateSubtle-200 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-gendarmerie flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-gold-dark" />
                    <span>Appréciation de la commission d'évaluation :</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 font-serif italic leading-relaxed pl-4 border-l-2 border-gold">
                    « {assignment.ObservationsEvaluateur} »
                  </p>
                  <div className="text-right text-[11px] text-slateSubtle-600 font-semibold pt-1">
                    — {assignment.SuperviseurNom || 'Membre Évaluateur'}, Commission Spécialisée
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slateSubtle-200 p-8 text-center space-y-3">
              <Award className="w-10 h-10 text-gold mx-auto" />
              <h4 className="text-base font-bold text-gendarmerie font-serif">
                Atelier en cours de réalisation
              </h4>
              <p className="text-xs text-slateSubtle-600 max-w-md mx-auto leading-relaxed">
                Les résultats officiels et l'évaluation détaillée sur 20 points seront disponibles dès que la commission aura validé votre séance sur le terrain.
              </p>
              <button
                type="button"
                onClick={() => setActiveTab('evaluation')}
                className="px-5 py-2.5 rounded-xl bg-gendarmerie text-white text-xs font-bold hover:bg-[#1C4E39] transition cursor-pointer"
              >
                Compléter mes tâches pratiques
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modal de confirmation de soumission */}
      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Soumettre l'atelier à la commission"
        size="md"
        footer={
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="px-4 py-2 rounded-xl border border-slateSubtle-200 text-xs font-bold text-slateSubtle-700 hover:bg-cream-100 transition cursor-pointer"
            >
              Annuler
            </button>
            <button
              onClick={handleConfirmSubmit}
              disabled={submitting}
              className="px-5 py-2 rounded-xl bg-gendarmerie text-white text-xs font-bold hover:bg-[#1C4E39] transition shadow-xs cursor-pointer"
            >
              {submitting ? 'Transmission...' : 'Confirmer la soumission'}
            </button>
          </div>
        }
      >
        <div className="space-y-3 text-xs text-slateSubtle-700">
          <p>
            Vous êtes sur le point de soumettre votre travail à la commission spécialisée.
          </p>
          <div className="p-3 bg-cream-100 rounded-xl space-y-1">
            <div className="font-bold text-gendarmerie">Synthèse de votre dossier :</div>
            <div>• Tâches complétées : {completedTasks} / {totalTasks}</div>
            <div>• Pièces jointes : {assignment.PreuvesAttachees?.length || 0} document(s)</div>
          </div>
          <p className="italic text-slateSubtle-500">
            Une fois soumis, votre atelier sera en attente de visa et vous ne pourrez plus modifier la checklist sans l'accord de la commission.
          </p>
        </div>
      </Modal>

      {/* Modal d'ajout de preuve */}
      <Modal
        isOpen={showEvidenceModal}
        onClose={() => setShowEvidenceModal(false)}
        title="Ajouter une pièce justificative"
        size="md"
        footer={
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setShowEvidenceModal(false)}
              className="px-4 py-2 rounded-xl border border-slateSubtle-200 text-xs font-bold text-slateSubtle-700 hover:bg-cream-100 transition cursor-pointer"
            >
              Annuler
            </button>
            <button
              onClick={handleAddEvidence}
              className="px-5 py-2 rounded-xl bg-gendarmerie text-white text-xs font-bold hover:bg-[#1C4E39] transition shadow-xs cursor-pointer"
            >
              Ajouter la pièce
            </button>
          </div>
        }
      >
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gendarmerie mb-1">
              Désignation du document / relevé :
            </label>
            <input
              type="text"
              value={newEvidenceName}
              onChange={(e) => setNewEvidenceName(e.target.value)}
              placeholder="Ex: Photo_Releve_Tension_Batterie.jpg"
              className="w-full p-2.5 text-xs rounded-xl border border-slateSubtle-200 focus:outline-none focus:ring-1 focus:ring-gendarmerie"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-gendarmerie mb-1">Type de fichier :</label>
              <select
                value={newEvidenceType}
                onChange={(e) => setNewEvidenceType(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-slateSubtle-200 bg-white"
              >
                <option value="image/jpeg">Photo (JPEG)</option>
                <option value="image/png">Photo (PNG)</option>
                <option value="application/pdf">Rapport PDF</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gendarmerie mb-1">Taille estimée :</label>
              <input
                type="text"
                value={newEvidenceSize}
                onChange={(e) => setNewEvidenceSize(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-slateSubtle-200 bg-white"
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal officiel certifié "Mon Résultat" */}
      <WorkshopEvaluationModal
        isOpen={showEvaluationModal}
        onClose={() => setShowEvaluationModal(false)}
        assignment={assignment}
      />
    </div>
  );
}
