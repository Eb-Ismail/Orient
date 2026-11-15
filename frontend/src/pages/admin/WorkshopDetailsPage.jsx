import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { workshopService } from '../../services/workshopService.js';
import { adminService } from '../../services/adminService.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import {
  Wrench,
  Cpu,
  Radio,
  Boxes,
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  UserCheck,
  Award,
  CheckCircle2,
  AlertCircle,
  Archive,
  RefreshCw,
  UserPlus,
  Shield,
  Layers,
  Sparkles,
  HardHat,
  ShieldAlert,
  ClipboardCheck,
  Check,
  X,
  FileText
} from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import Modal from '../../components/common/Modal.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

export default function WorkshopDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('FICHE'); // 'FICHE' ou 'ELEVES'

  // Modal Évaluation
  const [showEvaluateModal, setShowEvaluateModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [evalNotes, setEvalNotes] = useState({});
  const [evalObservations, setEvalObservations] = useState('');
  const [evalSkills, setEvalSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [evalSpecialty, setEvalSpecialty] = useState('');

  // Modal Assignation
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [promotions, setPromotions] = useState([]);
  const [students, setStudents] = useState([]);
  const [assignMode, setAssignMode] = useState('PROMOTION');
  const [assignPromoId, setAssignPromoId] = useState('');
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [assignDate, setAssignDate] = useState('');
  const [assignSupervisor, setAssignSupervisor] = useState('');

  const loadWorkshopDetails = async () => {
    try {
      setLoading(true);
      const data = await workshopService.getWorkshopById(id);
      if (!data) {
        showToast('Atelier introuvable.', 'error');
        navigate('/admin/ateliers');
        return;
      }
      setWorkshop(data);

      const [promos, studs] = await Promise.all([
        adminService.getPromotions().catch(() => []),
        adminService.getStudents().catch(() => [])
      ]);
      setPromotions(promos || []);
      setStudents(studs || []);
      setAssignPromoId(promos[0]?.PromotionId || '1');
    } catch (err) {
      console.error('Erreur détails atelier:', err);
      showToast('Impossible de charger les détails de l\'atelier.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkshopDetails();
  }, [id]);

  const handleOpenEvaluate = (assignment) => {
    setSelectedAssignment(assignment);
    const initialNotes = {};
    (workshop.CriteresEvaluation || []).forEach((crit) => {
      initialNotes[crit.critereId] =
        assignment.NotesCriteres?.[crit.critereId]?.note ?? Math.round(crit.pointsMax * 0.85);
    });
    setEvalNotes(initialNotes);
    setEvalObservations(assignment.ObservationsEvaluateur || '');
    setEvalSkills(assignment.CompetencesDetectees || []);
    setEvalSpecialty(assignment.RecommandationSpecialite || '');
    setShowEvaluateModal(true);
  };

  const handleSubmitEvaluate = async () => {
    try {
      if (!selectedAssignment) return;

      await workshopService.evaluateTrainee(selectedAssignment.AssignationId, {
        notesCriteres: evalNotes,
        observations: evalObservations,
        competencesDetectees: evalSkills,
        recommandationSpecialite: evalSpecialty || null
      });

      showToast('Évaluation pratique enregistrée avec succès.', 'success');
      setShowEvaluateModal(false);
      loadWorkshopDetails();
    } catch (err) {
      showToast(err.response?.data?.error || err.message || 'Erreur évaluation.', 'error');
    }
  };

  const handleSubmitAssign = async () => {
    try {
      const payload = {
        datePrevue: assignDate ? new Date(assignDate).toISOString() : null,
        superviseurNom: assignSupervisor || workshop.SuperviseurParDefaut,
        promotionId: assignMode === 'PROMOTION' ? assignPromoId : null,
        traineeIds: assignMode === 'ELEVES' ? selectedStudentIds : []
      };

      const res = await workshopService.assignWorkshop(workshop.AtelierId, payload);
      showToast(`${res.assignesCount || 0} élève(s) assigné(s) avec succès.`, 'success');
      setShowAssignModal(false);
      loadWorkshopDetails();
    } catch (err) {
      showToast(err.response?.data?.error || err.message || 'Erreur assignation.', 'error');
    }
  };

  const handleToggleArchive = async () => {
    try {
      const isArchived = workshop.Statut === 'ACTIF';
      await workshopService.archiveWorkshop(workshop.AtelierId, isArchived);
      showToast(isArchived ? 'Atelier archivé.' : 'Atelier réactivé.', 'info');
      loadWorkshopDetails();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  if (loading) {
    return <LoadingSpinner text="Chargement de la fiche atelier..." fullPage />;
  }

  if (!workshop) return null;

  return (
    <div className="space-y-6 animate-fade-slide">
      {/* 1. Bouton Retour & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={() => navigate('/admin/ateliers')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-gendarmerie hover:text-gold-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à la liste des ateliers pratiques</span>
        </button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleToggleArchive}
            icon={workshop.Statut === 'ACTIF' ? Archive : RefreshCw}
          >
            {workshop.Statut === 'ACTIF' ? 'Archiver l\'atelier' : 'Réactiver l\'atelier'}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setAssignDate(new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0]);
              setAssignSupervisor(workshop.SuperviseurParDefaut || '');
              setShowAssignModal(true);
            }}
            icon={UserPlus}
          >
            Assigner des Élèves
          </Button>
        </div>
      </div>

      {/* 2. En-tête de la Fiche Atelier */}
      <div className="bg-white rounded-2xl p-6 border border-slateSubtle-200 shadow-card">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-gendarmerie px-2.5 py-0.5 rounded-lg bg-cream-200 border border-slateSubtle-200">
                {workshop.Code}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gendarmerie/10 text-gendarmerie">
                {workshop.Category?.intituleFr || 'Catégorie Technique'}
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  workshop.NiveauDifficulte === 'AVANCE'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : workshop.NiveauDifficulte === 'INTERMEDIAIRE'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}
              >
                Niveau {workshop.NiveauDifficulte}
              </span>
              {workshop.Statut === 'ARCHIVE' && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  ARCHIVÉ
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-gendarmerie font-serif leading-tight">
              {workshop.Titre}
            </h1>
            <p className="text-sm font-semibold text-gold-dark" dir="rtl">
              {workshop.TitreAr}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-cream-100 p-3 rounded-xl border border-slateSubtle-200">
            <Award className="w-8 h-8 text-gold-dark shrink-0" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slateSubtle-600">
                Barème Officiel
              </div>
              <div className="text-lg font-bold text-gendarmerie">
                {workshop.ScoreTotalMax || 20} Points
              </div>
            </div>
          </div>
        </div>

        {/* Barre des Métadonnées */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slateSubtle-200 text-xs">
          <div className="flex items-center gap-2 text-slateSubtle-700">
            <Clock className="w-4 h-4 text-gold-dark shrink-0" />
            <div>
              <div className="text-[10px] text-slateSubtle-500 uppercase font-semibold">Durée</div>
              <div className="font-semibold text-gendarmerie">{workshop.DureeMinutes} minutes</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slateSubtle-700">
            <MapPin className="w-4 h-4 text-gold-dark shrink-0" />
            <div>
              <div className="text-[10px] text-slateSubtle-500 uppercase font-semibold">Lieu / Salle</div>
              <div className="font-semibold text-gendarmerie truncate">{workshop.LieuAtelier || 'Atelier Caserne'}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slateSubtle-700">
            <HardHat className="w-4 h-4 text-gold-dark shrink-0" />
            <div>
              <div className="text-[10px] text-slateSubtle-500 uppercase font-semibold">Capacité</div>
              <div className="font-semibold text-gendarmerie">{workshop.CapaciteMax || 6} élèves / session</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slateSubtle-700">
            <UserCheck className="w-4 h-4 text-gold-dark shrink-0" />
            <div>
              <div className="text-[10px] text-slateSubtle-500 uppercase font-semibold">Superviseur</div>
              <div className="font-semibold text-gendarmerie truncate">{workshop.SuperviseurParDefaut || 'Évaluateur'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Onglets de Navigation */}
      <div className="flex items-center gap-2 border-b border-slateSubtle-200">
        <button
          onClick={() => setActiveTab('FICHE')}
          className={`px-4 py-2 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'FICHE'
              ? 'border-gendarmerie text-gendarmerie'
              : 'border-transparent text-slateSubtle-600 hover:text-gendarmerie'
          }`}
        >
          <ClipboardCheck className="w-4 h-4" />
          <span>Fiche Pédagogique & Critères</span>
        </button>

        <button
          onClick={() => setActiveTab('ELEVES')}
          className={`px-4 py-2 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'ELEVES'
              ? 'border-gendarmerie text-gendarmerie'
              : 'border-transparent text-slateSubtle-600 hover:text-gendarmerie'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>
            Élèves Assignés ({workshop.Assignations?.length || 0})
          </span>
        </button>
      </div>

      {/* 4. Contenu Onglet 1 : Fiche Pédagogique & Critères */}
      {activeTab === 'FICHE' && (
        <div className="space-y-6">
          {/* Mise en situation */}
          <div className="bg-white rounded-xl p-5 border border-slateSubtle-200 shadow-2xs space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gendarmerie flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-gendarmerie rounded-full" />
              Mise en situation opérationnelle & Contexte
            </h2>
            <div className="text-xs text-slateSubtle-700 leading-relaxed bg-cream-100/50 p-3.5 rounded-lg border border-slateSubtle-200">
              {workshop.DescriptionFr}
            </div>
            {workshop.DescriptionAr && (
              <div className="text-xs text-slateSubtle-700 leading-relaxed bg-cream-100/30 p-3.5 rounded-lg border border-slateSubtle-200 text-right" dir="rtl">
                {workshop.DescriptionAr}
              </div>
            )}
          </div>

          {/* Objectifs, Équipements, EPI */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Objectifs */}
            <div className="bg-white rounded-xl p-4 border border-slateSubtle-200 shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 text-gendarmerie font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Objectifs Pédagogiques</span>
              </div>
              <ul className="space-y-2 text-xs text-slateSubtle-700">
                {workshop.Objectifs?.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-dark mt-1 shrink-0" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Équipements Requis */}
            <div className="bg-white rounded-xl p-4 border border-slateSubtle-200 shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 text-gendarmerie font-bold text-xs uppercase tracking-wider">
                <Wrench className="w-4 h-4 text-blue-600" />
                <span>Équipements & Matériels</span>
              </div>
              <ul className="space-y-2 text-xs text-slateSubtle-700">
                {workshop.EquipementsRequis?.map((eq, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 shrink-0" />
                    <span>{eq}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Consignes de Sécurité EPI */}
            <div className="bg-white rounded-xl p-4 border border-rose-200/80 bg-rose-50/20 shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Sécurité & Port des EPI</span>
              </div>
              <ul className="space-y-2 text-xs text-rose-950">
                {workshop.ConsignesSecurite?.map((cs, i) => (
                  <li key={i} className="flex items-start gap-2 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1 shrink-0" />
                    <span>{cs}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tâches Pratiques */}
          <div className="bg-white rounded-xl p-5 border border-slateSubtle-200 shadow-2xs space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gendarmerie flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-gendarmerie rounded-full" />
              Tâches Pratiques & Résultats Attendus
            </h2>
            <div className="overflow-x-auto table-responsive-container">
              <table className="w-full text-xs text-left min-w-[550px]">
                <thead className="bg-cream-100 text-gendarmerie uppercase text-[10px] tracking-wider border-b border-slateSubtle-200">
                  <tr>
                    <th className="px-3 py-2 w-12 text-center">N°</th>
                    <th className="px-3 py-2">Description de la Tâche Pratique</th>
                    <th className="px-3 py-2">Résultat Opérationnel Attendu</th>
                    <th className="px-3 py-2 w-20 text-center">Barème</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slateSubtle-200">
                  {workshop.TachesPratiques?.map((tache) => (
                    <tr key={tache.taskId || tache.ordre} className="hover:bg-cream-50">
                      <td className="px-3 py-2.5 text-center font-bold text-gendarmerie">
                        {tache.ordre}
                      </td>
                      <td className="px-3 py-2.5 font-medium text-gendarmerie">
                        {tache.description}
                      </td>
                      <td className="px-3 py-2.5 text-slateSubtle-700">
                        {tache.resultatAttendu}
                      </td>
                      <td className="px-3 py-2.5 text-center font-bold text-gold-dark">
                        {tache.baremePoints} pts
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Critères d'évaluation */}
          <div className="bg-white rounded-xl p-5 border border-slateSubtle-200 shadow-2xs space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gendarmerie flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-gold rounded-full" />
              Matrice Officielle d'Évaluation des Compétences
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {workshop.CriteresEvaluation?.map((crit) => (
                <div
                  key={crit.critereId}
                  className="p-3.5 rounded-lg border border-slateSubtle-200 bg-cream-100/30 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-gendarmerie">
                        {crit.intitule}
                      </h4>
                      <span className="font-bold text-xs px-2 py-0.5 rounded-full bg-gold/15 text-gold-dark border border-gold/30">
                        {crit.pointsMax} pts
                      </span>
                    </div>
                    <div className="text-[11px] text-slateSubtle-600" dir="rtl">
                      {crit.intituleAr}
                    </div>
                    <p className="text-[11px] text-slateSubtle-700 pt-1">
                      {crit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. Contenu Onglet 2 : Élèves Assignés & Évaluations */}
      {activeTab === 'ELEVES' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gendarmerie flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-gendarmerie rounded-full" />
              Liste des Élèves Assignés ({workshop.Assignations?.length || 0})
            </h2>
          </div>

          {workshop.Assignations?.length === 0 ? (
            <div className="bg-white rounded-xl p-8 border border-slateSubtle-200 text-center space-y-3">
              <UserCheck className="w-10 h-10 text-slateSubtle-400 mx-auto" />
              <div className="font-bold text-sm text-gendarmerie">
                Aucun élève n'est encore assigné à cet atelier.
              </div>
              <p className="text-xs text-slateSubtle-600 max-w-sm mx-auto">
                Assignez une promotion ou des élèves individuellement pour planifier la séance.
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowAssignModal(true)}
                icon={UserPlus}
              >
                Assigner des Élèves
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {workshop.Assignations.map((a) => {
                const isEvaluated = a.Statut === 'EVALUE';

                return (
                  <div
                    key={a.AssignationId}
                    className="bg-white rounded-xl p-4 border border-slateSubtle-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-gendarmerie">
                          {a.Eleve?.prenom} {a.Eleve?.nom}
                        </span>
                        <span className="font-mono text-[11px] text-slateSubtle-600 bg-cream-200 px-2 py-0.5 rounded">
                          {a.Eleve?.matricule}
                        </span>
                        <span className="text-[11px] text-slateSubtle-600">
                          • {a.Eleve?.promotion}
                        </span>
                      </div>

                      {/* Statut & Score */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            isEvaluated
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : a.Statut === 'EN_COURS'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {isEvaluated ? 'ÉVALUÉ' : a.Statut === 'EN_COURS' ? 'EN COURS' : 'ASSIGNÉ'}
                        </span>

                        {isEvaluated && (
                          <span className="text-xs font-bold text-gendarmerie">
                            Score : {a.ScoreObtenu} / {a.ScoreTotalMax} ({a.ScorePourcentage}%) — Mention {a.Mention}
                          </span>
                        )}
                      </div>

                      {/* Compétences Pratiques Détectées */}
                      {isEvaluated && a.CompetencesDetectees?.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {a.CompetencesDetectees.map((skill, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-gold/15 text-gold-dark border border-gold/30 flex items-center gap-1"
                            >
                              <Sparkles className="w-2.5 h-2.5 text-gold" />
                              <span>{skill}</span>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Observations de la commission */}
                      {isEvaluated && a.ObservationsEvaluateur && (
                        <p className="text-[11px] text-slateSubtle-700 italic bg-cream-100/50 p-2 rounded border border-slateSubtle-200">
                          « {a.ObservationsEvaluateur} »
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant={isEvaluated ? 'outline' : 'primary'}
                        size="sm"
                        onClick={() => navigate(`/admin/ateliers/evaluations/${a.AssignationId}`)}
                        icon={isEvaluated ? Award : CheckCircle2}
                      >
                        {isEvaluated ? 'Consulter / Réviser la fiche' : 'Ouvrir l\'évaluation'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 6. MODAL ÉVALUATION PRATIQUE */}
      <Modal
        isOpen={showEvaluateModal}
        onClose={() => setShowEvaluateModal(false)}
        maxWidth="max-w-2xl"
        title="Évaluation pratique de l'élève"
        subtitle={
          selectedAssignment
            ? `Élève: ${selectedAssignment.Eleve?.prenom} ${selectedAssignment.Eleve?.nom} (${selectedAssignment.Eleve?.matricule})`
            : ''
        }
        footer={
          <div className="flex items-center justify-end gap-2 w-full">
            <Button variant="outline" size="sm" onClick={() => setShowEvaluateModal(false)}>
              Annuler
            </Button>
            <Button variant="primary" size="sm" onClick={handleSubmitEvaluate}>
              Enregistrer l'évaluation
            </Button>
          </div>
        }
      >
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1 text-xs">
          {/* Synthèse Score */}
          <div className="p-3 bg-cream-100 rounded-xl border border-slateSubtle-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase font-bold text-slateSubtle-600">
                Score Calculé
              </div>
              <div className="text-xl font-bold text-gendarmerie font-serif mt-0.5">
                {Object.values(evalNotes).reduce((sum, v) => sum + (Number(v) || 0), 0)} /{' '}
                {workshop.ScoreTotalMax || 20} pts
                <span className="text-xs font-semibold text-gold-dark ml-2">
                  (
                  {Math.round(
                    (Object.values(evalNotes).reduce((sum, v) => sum + (Number(v) || 0), 0) /
                      (workshop.ScoreTotalMax || 20)) *
                      100
                  )}
                  %)
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slateSubtle-600">
                Mention Estimée
              </span>
              <div className="font-bold text-sm text-gendarmerie mt-0.5">
                {(() => {
                  const pct = Math.round(
                    (Object.values(evalNotes).reduce((sum, v) => sum + (Number(v) || 0), 0) /
                      (workshop.ScoreTotalMax || 20)) *
                      100
                  );
                  if (pct >= 90) return 'EXCELLENT';
                  if (pct >= 80) return 'TRÈS BIEN';
                  if (pct >= 70) return 'BIEN';
                  if (pct >= 50) return 'SATISFAISANT';
                  return 'À PERFECTIONNER';
                })()}
              </div>
            </div>
          </div>

          {/* Notation par critère */}
          <div>
            <label className="block font-semibold text-gendarmerie mb-2">
              Barème par critère
            </label>
            <div className="space-y-2.5">
              {workshop.CriteresEvaluation?.map((crit) => {
                const currentVal = evalNotes[crit.critereId] ?? 0;
                return (
                  <div
                    key={crit.critereId}
                    className="p-3 rounded-lg border border-slateSubtle-200 bg-white space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-gendarmerie">
                        {crit.intitule}
                      </div>
                      <span className="font-bold text-gendarmerie text-sm">
                        {currentVal} / {crit.pointsMax} pts
                      </span>
                    </div>
                    <div className="text-[11px] text-slateSubtle-600" dir="rtl">
                      {crit.intituleAr}
                    </div>

                    <input
                      type="range"
                      min="0"
                      max={crit.pointsMax}
                      value={currentVal}
                      onChange={(e) =>
                        setEvalNotes({
                          ...evalNotes,
                          [crit.critereId]: parseInt(e.target.value, 10)
                        })
                      }
                      className="w-full accent-gendarmerie cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Compétences Détectées */}
          <div className="pt-2 border-t border-slateSubtle-200">
            <label className="block font-semibold text-gendarmerie mb-1">
              Aptitudes techniques et compétences pratiques détectées
            </label>
            <div className="flex gap-1.5 mb-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && skillInput.trim()) {
                    e.preventDefault();
                    if (!evalSkills.includes(skillInput.trim())) {
                      setEvalSkills([...evalSkills, skillInput.trim()]);
                    }
                    setSkillInput('');
                  }
                }}
                placeholder="Ex: Câblage RJ45, Analyse trames OBD, Réglage TOS..."
                className="flex-1 px-3 py-1.5 rounded-lg border border-slateSubtle-200"
              />
              <Button
                type="button"
                variant="secondary"
                size="xs"
                onClick={() => {
                  if (skillInput.trim() && !evalSkills.includes(skillInput.trim())) {
                    setEvalSkills([...evalSkills, skillInput.trim()]);
                    setSkillInput('');
                  }
                }}
              >
                Ajouter
              </Button>
            </div>

            <div className="flex flex-wrap gap-1.5 min-h-[30px]">
              {evalSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gold/15 text-gold-dark font-medium border border-gold/30"
                >
                  <Sparkles className="w-3 h-3 text-gold" />
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => setEvalSkills(evalSkills.filter((_, i) => i !== idx))}
                    className="hover:text-rose-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Observations */}
          <div>
            <label className="block font-semibold text-gendarmerie mb-1">
              Observations qualitatives de l'évaluateur
            </label>
            <textarea
              rows="3"
              value={evalObservations}
              onChange={(e) => setEvalObservations(e.target.value)}
              placeholder="Rigueur technique, autonomie, respect des consignes de sécurité..."
              className="w-full px-3 py-1.5 rounded-lg border border-slateSubtle-200"
            />
          </div>

          {/* Recommandation de spécialité */}
          <div>
            <label className="block font-semibold text-gendarmerie mb-1">
              Recommandation de spécialité suggérée (Optionnel)
            </label>
            <select
              value={evalSpecialty}
              onChange={(e) => setEvalSpecialty(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-slateSubtle-200 bg-white"
            >
              <option value="">Aucune recommandation particulière</option>
              <option value="SPEC-INFO">Informatique & Réseaux (SIC)</option>
              <option value="SPEC-SEC-INFO">Cybersécurité & Investigation Numérique</option>
              <option value="SPEC-MOTARD">Escadron Motocycliste & Intervention Rapide</option>
              <option value="SPEC-PJ">Police Judiciaire & Criminologie</option>
              <option value="SPEC-SEC-ADMIN">Secrétariat & Chancellerie Militaire</option>
              <option value="SPEC-GM">Gendarmerie Mobile / Soutien Logistique</option>
            </select>
          </div>
        </div>
      </Modal>

      {/* 7. MODAL ASSIGNATION */}
      <Modal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        maxWidth="max-w-xl"
        title="Assigner des élèves à l'atelier"
        subtitle={`${workshop.Code} — ${workshop.Titre}`}
        footer={
          <div className="flex items-center justify-end gap-2 w-full">
            <Button variant="outline" size="sm" onClick={() => setShowAssignModal(false)}>
              Annuler
            </Button>
            <Button variant="primary" size="sm" onClick={handleSubmitAssign}>
              Confirmer l'assignation
            </Button>
          </div>
        }
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-gendarmerie mb-1.5">
              Mode d'assignation
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAssignMode('PROMOTION')}
                className={`p-2.5 rounded-lg border text-left font-semibold transition-all ${
                  assignMode === 'PROMOTION'
                    ? 'border-gendarmerie bg-gendarmerie/5 text-gendarmerie'
                    : 'border-slateSubtle-200 text-slateSubtle-700'
                }`}
              >
                Promotion complète
              </button>
              <button
                type="button"
                onClick={() => setAssignMode('ELEVES')}
                className={`p-2.5 rounded-lg border text-left font-semibold transition-all ${
                  assignMode === 'ELEVES'
                    ? 'border-gendarmerie bg-gendarmerie/5 text-gendarmerie'
                    : 'border-slateSubtle-200 text-slateSubtle-700'
                }`}
              >
                Sélection individuelle
              </button>
            </div>
          </div>

          {assignMode === 'PROMOTION' ? (
            <div>
              <label className="block font-semibold text-gendarmerie mb-1">
                Sélectionnez la promotion
              </label>
              <select
                value={assignPromoId}
                onChange={(e) => setAssignPromoId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slateSubtle-200 bg-white"
              >
                {promotions.map((p) => (
                  <option key={p.PromotionId} value={p.PromotionId}>
                    {p.Nom} ({p.Annee || '2026'})
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="block font-semibold text-gendarmerie mb-1">
                Sélectionnez les élèves ({selectedStudentIds.length} sélectionné(s))
              </label>
              <div className="max-h-44 overflow-y-auto border border-slateSubtle-200 rounded-lg p-2 space-y-1">
                {students.map((s) => {
                  const isChecked = selectedStudentIds.includes(s.UtilisateurId);
                  return (
                    <label
                      key={s.UtilisateurId}
                      className="flex items-center gap-2 p-1.5 hover:bg-cream-100 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          if (isChecked) {
                            setSelectedStudentIds(selectedStudentIds.filter((id) => id !== s.UtilisateurId));
                          } else {
                            setSelectedStudentIds([...selectedStudentIds, s.UtilisateurId]);
                          }
                        }}
                        className="rounded border-slateSubtle-300 text-gendarmerie"
                      />
                      <span className="font-medium text-gendarmerie">
                        {s.Prenom} {s.Nom}
                      </span>
                      <span className="font-mono text-[10px] text-slateSubtle-600">
                        ({s.Matricule})
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slateSubtle-200">
            <div>
              <label className="block font-semibold text-gendarmerie mb-1">
                Date prévue
              </label>
              <input
                type="date"
                value={assignDate}
                onChange={(e) => setAssignDate(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slateSubtle-200"
              />
            </div>
            <div>
              <label className="block font-semibold text-gendarmerie mb-1">
                Superviseur désigné
              </label>
              <input
                type="text"
                value={assignSupervisor}
                onChange={(e) => setAssignSupervisor(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slateSubtle-200"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
