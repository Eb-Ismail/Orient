import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { workshopService } from '../../services/workshopService.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import {
  ArrowLeft,
  Shield,
  ShieldAlert,
  HardHat,
  Award,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Calendar,
  Save,
  Send,
  Lock,
  Unlock,
  Plus,
  Trash2,
  FileText,
  Paperclip,
  History,
  Sparkles,
  User,
  Wrench,
  Check,
  X,
  FileCheck2,
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import Modal from '../../components/common/Modal.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

// Les 4 critères officiels de l'évaluation pratique (sur 20 pts)
const DEFAULT_CRITERIA = [
  {
    critereId: 'CRIT-SEC-METH',
    code: 'SECURITE_METHODOLOGIE',
    intitule: 'Sécurité et méthodologie',
    intituleAr: 'السلامة والمنهجية الميدانية',
    pointsMax: 5,
    description: 'Respect strict des consignes de sécurité, port obligatoire des EPI, ordre de la zone de travail et conformité des protocoles.',
    descriptionAr: 'الالتزام الصارم بقواعد السلامة، ارتداء معدات الوقاية الفردية، وتطبيق منهجية العمل المنظمة.'
  },
  {
    critereId: 'CRIT-DIAG-PREC',
    code: 'PRECISION_DIAGNOSTIC',
    intitule: 'Précision du diagnostic',
    intituleAr: 'دقة التشخيص التقني',
    pointsMax: 5,
    description: 'Exactitude de la démarche d\'investigation, identification sans devinette de l\'anomalie ou du besoin technique.',
    descriptionAr: 'الدقة في الفحص والتشخيص المنهجي للأعطال والبيانات التقنية بدون تخمين.'
  },
  {
    critereId: 'CRIT-EXEC-QUAL',
    code: 'QUALITE_EXECUTION',
    intitule: 'Qualité de l\'exécution technique',
    intituleAr: 'جودة الإنجاز والإتقan المهني',
    pointsMax: 5,
    description: 'Dextérité manuelle, maîtrise du geste professionnel, qualité des réglages, du montage ou de l\'intervention.',
    descriptionAr: 'البراعة التقنية، نظافة التركيب والإصلاح، ومطابقة الضبط للمعايير الفنية.'
  },
  {
    critereId: 'CRIT-TPS-DISC',
    code: 'TEMPS_DISCIPLINE',
    intitule: 'Gestion du temps et discipline militaire',
    intituleAr: 'تدبير الوقت والانضباط العسكري',
    pointsMax: 5,
    description: 'Respect du temps imparti, sang-froid, posture et maintien militaire, remise en ordre immédiate du poste.',
    descriptionAr: 'احترام التوقيت المحدد، الهدوء، الهيئة العسكرية، وإعادة ترتيب وتسليم محطة العمل.'
  }
];

export default function WorkshopEvaluationSheetPage() {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Notes sur les 4 critères
  const [notes, setNotes] = useState({
    'CRIT-SEC-METH': { note: 5, commentaire: '' },
    'CRIT-DIAG-PREC': { note: 4, commentaire: '' },
    'CRIT-EXEC-QUAL': { note: 4, commentaire: '' },
    'CRIT-TPS-DISC': { note: 4, commentaire: '' }
  });

  // Checklist de sécurité préalable (Règles impératives de sécurité)
  const [safetyChecklist, setSafetyChecklist] = useState({
    epiVerifies: true,
    autoriseParSuperviseur: true,
    outillageConforme: true
  });

  // Arrêt d'urgence de sécurité
  const [arretSecurite, setArretSecurite] = useState(false);
  const [motifArretSecurite, setMotifArretSecurite] = useState('');

  // Observations et synthèse
  const [observations, setObservations] = useState('');
  const [pointsForts, setPointsForts] = useState([]);
  const [newPointFort, setNewPointFort] = useState('');
  const [axesAmelioration, setAxesAmelioration] = useState([]);
  const [newAxe, setNewAxe] = useState('');
  const [competencesDetectees, setCompetencesDetectees] = useState([]);
  const [newCompetence, setNewCompetence] = useState('');
  const [recommandationSpecialite, setRecommandationSpecialite] = useState('');

  // Pièces justificatives / Preuves
  const [preuves, setPreuves] = useState([]);
  const [showAddEvidenceModal, setShowAddEvidenceModal] = useState(false);
  const [newEvidenceFile, setNewEvidenceFile] = useState({
    nomFichier: '',
    type: 'application/pdf',
    taille: '450 Ko',
    description: ''
  });

  // Modals de validation et de révision
  const [showConfirmValidationModal, setShowConfirmValidationModal] = useState(false);
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  const [motifRevision, setMotifRevision] = useState('');

  // Chargement de l'assignation
  const loadAssignment = async () => {
    try {
      setLoading(true);
      const data = await workshopService.getAssignmentById(assignmentId);
      if (!data) {
        showToast('Assignation d\'atelier introuvable.', 'error');
        navigate('/admin/ateliers');
        return;
      }
      setAssignment(data);

      // Pré-remplir les notes si déjà enregistrées
      if (data.NotesCriteres && Object.keys(data.NotesCriteres).length > 0) {
        const loadedNotes = {};
        DEFAULT_CRITERIA.forEach((crit) => {
          const existing = data.NotesCriteres[crit.critereId];
          loadedNotes[crit.critereId] = {
            note: existing ? existing.note : (data.ArretSecurite && crit.critereId === 'CRIT-SEC-METH' ? 0 : 4),
            commentaire: existing ? (existing.commentaire || '') : ''
          };
        });
        setNotes(loadedNotes);
      }

      setObservations(data.ObservationsEvaluateur || '');
      setPointsForts(data.PointsForts || []);
      setAxesAmelioration(data.AxesAmelioration || []);
      setCompetencesDetectees(data.CompetencesDetectees || []);
      setRecommandationSpecialite(data.RecommandationSpecialite || '');
      setArretSecurite(Boolean(data.ArretSecurite));
      setMotifArretSecurite(data.MotifArretSecurite || '');
      setPreuves(data.PreuvesAttachees || []);
    } catch (err) {
      console.error('Erreur chargement assignation:', err);
      showToast('Impossible de charger la fiche d\'évaluation.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssignment();
  }, [assignmentId]);

  // Calcul dynamique du score total
  const totalScore = Object.values(notes).reduce((sum, item) => sum + (Number(item?.note) || 0), 0);
  const totalMax = 20;
  const scorePourcentage = Math.round((totalScore / totalMax) * 100);

  // Mention automatique
  const getMention = (score, isSecurityStop) => {
    if (isSecurityStop) return 'REJETÉ (ARRÊT SÉCURITÉ)';
    if (score >= 18) return 'EXCELLENT';
    if (score >= 16) return 'TRÈS BIEN';
    if (score >= 14) return 'BIEN';
    if (score >= 10) return 'SATISFAISANT';
    return 'À PERFECTIONNER';
  };

  // Gestion du basculement Arrêt d'urgence sécurité
  const handleToggleSafetyStop = (checked) => {
    setArretSecurite(checked);
    if (checked) {
      setNotes((prev) => ({
        ...prev,
        'CRIT-SEC-METH': { note: 0, commentaire: 'Arrêt d\'urgence pour manquement aux règles impératives de sécurité.' }
      }));
      if (!motifArretSecurite) {
        setMotifArretSecurite('Arrêt immédiat : comportement ou geste dangereux non conforme aux consignes de sécurité militaire.');
      }
    }
  };

  // Enregistrement générique (Brouillon, Validation, Rejet)
  const handleSaveEvaluation = async (options = {}) => {
    const { saveDraft = false, submitForValidation = false, validateDirectly = false, reject = false } = options;

    try {
      setSaving(true);

      const payload = {
        notesCriteres: notes,
        observations,
        pointsForts,
        axesAmelioration,
        competencesDetectees,
        recommandationSpecialite: recommandationSpecialite || null,
        arretSecurite,
        motifArretSecurite: arretSecurite ? motifArretSecurite : null,
        saveDraft,
        submitForValidation,
        reject: reject || arretSecurite,
        statut: validateDirectly ? 'VALIDE' : undefined,
        superviseurId: user?.id,
        superviseurNom: `${user?.prenom || ''} ${user?.nom || ''}`.trim() || 'Évaluateur Référent',
        isRevision: !assignment.EstVerrouille && Boolean(assignment.MotifRevision)
      };

      await workshopService.evaluateTrainee(assignment.AssignationId, payload);

      if (saveDraft) {
        showToast('Brouillon d\'évaluation enregistré avec succès.', 'info');
      } else if (submitForValidation) {
        showToast('Évaluation soumise en attente de validation.', 'success');
      } else if (reject || arretSecurite) {
        showToast('Évaluation rejetée / À réévaluer pour manquement à la sécurité.', 'warning');
      } else {
        showToast('Évaluation pratique validée et verrouillée avec succès.', 'success');
      }

      setShowConfirmValidationModal(false);
      loadAssignment();
    } catch (err) {
      showToast(err.response?.data?.error || err.message || 'Erreur lors de l\'enregistrement.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Processus de déverrouillage pour révision autorisée
  const handleOpenRevision = async () => {
    if (!motifRevision.trim()) {
      showToast('Veuillez préciser le motif officiel de révision.', 'warning');
      return;
    }

    try {
      setSaving(true);
      await workshopService.requestRevision(assignment.AssignationId, {
        motif: motifRevision.trim()
      });
      showToast('Procédure de révision ouverte avec succès. Les notes peuvent être ajustées.', 'success');
      setShowRevisionModal(false);
      setMotifRevision('');
      loadAssignment();
    } catch (err) {
      showToast(err.response?.data?.error || err.message || 'Erreur ouverture révision.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Ajout de pièce justificative
  const handleAddEvidence = async () => {
    if (!newEvidenceFile.nomFichier.trim()) {
      showToast('Le nom de la pièce justificative est obligatoire.', 'warning');
      return;
    }

    try {
      setSaving(true);
      await workshopService.addEvidence(assignment.AssignationId, newEvidenceFile);
      showToast('Pièce justificative ajoutée avec succès.', 'success');
      setShowAddEvidenceModal(false);
      setNewEvidenceFile({ nomFichier: '', type: 'application/pdf', taille: '450 Ko', description: '' });
      loadAssignment();
    } catch (err) {
      showToast(err.response?.data?.error || err.message || 'Erreur ajout pièce.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Suppression de pièce justificative
  const handleDeleteEvidence = async (evidenceId) => {
    try {
      setSaving(true);
      await workshopService.deleteEvidence(assignment.AssignationId, evidenceId);
      showToast('Pièce justificative retirée.', 'info');
      loadAssignment();
    } catch (err) {
      showToast(err.response?.data?.error || err.message || 'Erreur suppression pièce.', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Chargement du bordereau officiel d'évaluation pratique..." fullPage />;
  }

  if (!assignment) return null;

  const isLocked = Boolean(assignment.EstVerrouille);
  const eleve = assignment.Eleve || {};
  const atelier = assignment.Atelier || {};

  return (
    <div className="space-y-6 animate-fade-slide pb-12">
      {/* 1. Bouton Retour & Fil d'Ariane */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={() => navigate(`/admin/ateliers/${atelier.AtelierId || atelier.id || ''}`)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-gendarmerie hover:text-gold-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à l'atelier {atelier.Code}</span>
        </button>

        <div className="flex items-center gap-2">
          {isLocked ? (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-300">
                <Lock className="w-3.5 h-3.5 text-emerald-700" />
                Évaluation Validée & Verrouillée
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowRevisionModal(true)}
                icon={Unlock}
              >
                Ouvrir Révision Autorisée
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-300">
                <FileCheck2 className="w-3.5 h-3.5 text-amber-600" />
                Session d'évaluation active
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 2. En-tête de la Fiche d'Évaluation Pratique */}
      <div className="bg-white rounded-2xl p-6 border border-slateSubtle-200 shadow-card">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Identité de l'élève & Atelier */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-gendarmerie px-2.5 py-0.5 rounded-lg bg-cream-200 border border-slateSubtle-200">
                {atelier.Code}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gendarmerie/10 text-gendarmerie">
                {atelier.CategorieId || 'Atelier Technique'}
              </span>
              {/* Statut de l'évaluation */}
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  assignment.Statut === 'VALIDE' || assignment.Statut === 'EVALUE'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                    : assignment.Statut === 'EN_ATTENTE_VALIDATION'
                    ? 'bg-purple-50 text-purple-800 border border-purple-300'
                    : assignment.Statut === 'REJETE'
                    ? 'bg-rose-50 text-rose-800 border border-rose-300'
                    : assignment.Statut === 'EN_COURS'
                    ? 'bg-amber-50 text-amber-800 border border-amber-300'
                    : 'bg-blue-50 text-blue-800 border border-blue-300'
                }`}
              >
                {assignment.Statut === 'VALIDE' || assignment.Statut === 'EVALUE'
                  ? 'VALIDÉ'
                  : assignment.Statut === 'EN_ATTENTE_VALIDATION'
                  ? 'EN ATTENTE DE VALIDATION'
                  : assignment.Statut === 'REJETE'
                  ? 'REJETÉ / À RÉÉVALUER'
                  : assignment.Statut === 'EN_COURS'
                  ? 'EN COURS (BROUILLON)'
                  : 'NON COMMENCÉ'}
              </span>
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gendarmerie font-serif leading-tight">
                {atelier.Titre}
              </h1>
              <p className="text-xs font-semibold text-gold-dark mt-0.5" dir="rtl">
                {atelier.TitreAr}
              </p>
            </div>

            {/* Fiche de l'Élève Gendarme */}
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slateSubtle-700">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gendarmerie text-white flex items-center justify-center font-bold text-xs">
                  {eleve.prenom?.charAt(0)}{eleve.nom?.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-gendarmerie text-sm">
                    {eleve.prenom} {eleve.nom}
                  </div>
                  <div className="text-[11px] text-slateSubtle-500 font-mono">
                    Matricule : <strong>{eleve.matricule}</strong> • {eleve.promotion}
                  </div>
                </div>
              </div>

              <div className="border-l border-slateSubtle-200 pl-4 space-y-0.5">
                <div className="text-[10px] text-slateSubtle-500 uppercase font-semibold">
                  Évaluateur Référent
                </div>
                <div className="font-semibold text-gendarmerie">
                  {assignment.SuperviseurNom || 'Évaluateur Référent'}
                </div>
              </div>

              <div className="border-l border-slateSubtle-200 pl-4 space-y-0.5">
                <div className="text-[10px] text-slateSubtle-500 uppercase font-semibold">
                  Date de séance
                </div>
                <div className="font-semibold text-gendarmerie">
                  {assignment.DateRealisation
                    ? new Date(assignment.DateRealisation).toLocaleDateString('fr-FR')
                    : assignment.DatePrevue
                    ? `Prévue le ${new Date(assignment.DatePrevue).toLocaleDateString('fr-FR')}`
                    : 'Aujourd\'hui'}
                </div>
              </div>
            </div>
          </div>

          {/* Synthèse du Score / Barème sur 20 */}
          <div className="bg-cream-100 p-5 rounded-2xl border border-slateSubtle-200 flex flex-col items-center justify-center min-w-[200px] text-center shadow-xs">
            <div className="text-[11px] uppercase font-bold text-slateSubtle-600 tracking-wider">
              Note Pratique Globale
            </div>
            <div className="text-3xl font-extrabold text-gendarmerie font-serif mt-1">
              {totalScore} <span className="text-lg text-slateSubtle-500 font-normal">/ 20</span>
            </div>
            <div className="text-xs font-bold text-gold-dark mt-0.5">
              {scorePourcentage}% • {getMention(totalScore, arretSecurite)}
            </div>
            <div className="w-full bg-slateSubtle-200 h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  arretSecurite
                    ? 'bg-rose-600'
                    : totalScore >= 16
                    ? 'bg-emerald-600'
                    : totalScore >= 12
                    ? 'bg-gold'
                    : 'bg-amber-500'
                }`}
                style={{ width: `${scorePourcentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Encadré Impératif de Sécurité Militaire (Section 4 du cahier des charges) */}
      <div className={`rounded-2xl p-5 border transition-all ${
        arretSecurite
          ? 'bg-rose-50 border-rose-300 shadow-sm'
          : 'bg-white border-slateSubtle-200 shadow-2xs'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              arretSecurite ? 'bg-rose-600 text-white' : 'bg-amber-100 text-amber-800'
            }`}>
              {arretSecurite ? <ShieldAlert className="w-5 h-5" /> : <HardHat className="w-5 h-5" />}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className={`font-bold text-sm ${arretSecurite ? 'text-rose-900' : 'text-gendarmerie'}`}>
                  Règles Impératives de Sécurité Militaire
                </h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.2 rounded-full bg-rose-100 text-rose-800">
                  Priorité Absolue
                </span>
              </div>
              <p className="text-xs text-slateSubtle-700 leading-relaxed max-w-3xl">
                La sécurité prime sur la rapidité d'exécution. Tout comportement imprudent ou non-respect des EPI entraîne l'interruption immédiate de l'atelier, la mise à zéro de la note de sécurité et l'obligation d'un rapport circonstancié.
              </p>

              {/* Checklist préalable */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={safetyChecklist.epiVerifies}
                    disabled={isLocked}
                    onChange={(e) => setSafetyChecklist({ ...safetyChecklist, epiVerifies: e.target.checked })}
                    className="rounded text-gendarmerie focus:ring-0"
                  />
                  <span className="font-medium text-slateSubtle-800">EPI obligatoires vérifiés et portés</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={safetyChecklist.autoriseParSuperviseur}
                    disabled={isLocked}
                    onChange={(e) => setSafetyChecklist({ ...safetyChecklist, autoriseParSuperviseur: e.target.checked })}
                    className="rounded text-gendarmerie focus:ring-0"
                  />
                  <span className="font-medium text-slateSubtle-800">Autorisation superviseur avant intervention</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={safetyChecklist.outillageConforme}
                    disabled={isLocked}
                    onChange={(e) => setSafetyChecklist({ ...safetyChecklist, outillageConforme: e.target.checked })}
                    className="rounded text-gendarmerie focus:ring-0"
                  />
                  <span className="font-medium text-slateSubtle-800">Outillage sécurisé et conforme</span>
                </label>
              </div>
            </div>
          </div>

          {/* Déclencheur Arrêt de Sécurité */}
          <div className="shrink-0 flex flex-col items-start md:items-end gap-1">
            <label className="flex items-center gap-2 px-3 py-2 rounded-xl border border-rose-300 bg-rose-100/60 text-rose-900 cursor-pointer font-bold text-xs hover:bg-rose-100 transition-colors">
              <input
                type="checkbox"
                checked={arretSecurite}
                disabled={isLocked}
                onChange={(e) => handleToggleSafetyStop(e.target.checked)}
                className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
              />
              <span>Arrêt d'urgence pour manquement à la sécurité</span>
            </label>
            {arretSecurite && (
              <span className="text-[10px] text-rose-700 font-semibold">
                Note sécurité fixée à 0/5 • Statut Rejeté
              </span>
            )}
          </div>
        </div>

        {/* Motif circonstancié si arrêt sécurité déclenché */}
        {arretSecurite && (
          <div className="mt-4 pt-3 border-t border-rose-200 space-y-1.5 animate-fade-slide">
            <label className="block text-xs font-bold text-rose-900">
              Rapport d'incident de sécurité (Obligatoire) *
            </label>
            <textarea
              rows="2"
              value={motifArretSecurite}
              disabled={isLocked}
              onChange={(e) => setMotifArretSecurite(e.target.value)}
              placeholder="Décrivez précisément le geste ou comportement dangereux ayant justifié l'interruption immédiate de la séance..."
              className="w-full px-3 py-2 text-xs rounded-lg border border-rose-300 bg-white text-rose-950 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>
        )}
      </div>

      {/* 4. Les 4 Cartes Officielles de Notation (4 x 5 points = 20 pts) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gendarmerie flex items-center gap-2">
            <span className="w-1.5 h-3.5 bg-gendarmerie rounded-full" />
            Grille des 4 Critères d'Évaluation Pratique (Total 20 Points)
          </h2>
          <span className="text-xs text-slateSubtle-500">
            Échelle officielle standardisée de 0 à 5 points par carte
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DEFAULT_CRITERIA.map((crit, index) => {
            const currentItem = notes[crit.critereId] || { note: 0, commentaire: '' };
            const isSafetyCrit = crit.critereId === 'CRIT-SEC-METH';

            return (
              <div
                key={crit.critereId}
                className={`bg-white rounded-2xl p-5 border shadow-2xs flex flex-col justify-between transition-all ${
                  isSafetyCrit && arretSecurite
                    ? 'border-rose-300 bg-rose-50/40'
                    : 'border-slateSubtle-200 hover:border-gold/40'
                }`}
              >
                <div className="space-y-3">
                  {/* Titre & Barème de la Carte */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-cream-200 text-gendarmerie font-bold text-xs flex items-center justify-center">
                          {index + 1}
                        </span>
                        <h3 className="font-bold text-sm text-gendarmerie">
                          {crit.intitule}
                        </h3>
                      </div>
                      <p className="text-[11px] font-semibold text-gold-dark mt-0.5 ml-7" dir="rtl">
                        {crit.intituleAr}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-lg font-extrabold text-gendarmerie font-serif">
                        {currentItem.note}
                      </span>
                      <span className="text-xs font-semibold text-slateSubtle-500"> / {crit.pointsMax} pts</span>
                    </div>
                  </div>

                  <p className="text-xs text-slateSubtle-600 bg-cream-100/50 p-2.5 rounded-lg border border-slateSubtle-200/60 leading-relaxed">
                    {crit.description}
                  </p>

                  {/* Boutons Sélecteurs de Points (0 à 5) */}
                  <div className="space-y-1.5 pt-1">
                    <label className="block text-[11px] font-bold text-slateSubtle-700">
                      Attribuer les points :
                    </label>
                    <div className="grid grid-cols-6 gap-1.5">
                      {[0, 1, 2, 3, 4, 5].map((val) => {
                        const isSelected = currentItem.note === val;
                        const disabledBtn = isLocked || (isSafetyCrit && arretSecurite && val > 0);

                        return (
                          <button
                            key={val}
                            type="button"
                            disabled={disabledBtn}
                            onClick={() => {
                              setNotes({
                                ...notes,
                                [crit.critereId]: { ...currentItem, note: val }
                              });
                            }}
                            className={`py-1.5 rounded-lg font-bold text-xs transition-all ${
                              isSelected
                                ? isSafetyCrit && arretSecurite
                                  ? 'bg-rose-600 text-white shadow-xs'
                                  : 'bg-gendarmerie text-white shadow-xs'
                                : 'bg-cream-100 hover:bg-cream-200 text-gendarmerie border border-slateSubtle-200'
                            } ${disabledBtn ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                          >
                            {val}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Commentaire spécifique sur le critère */}
                  <div className="pt-1">
                    <input
                      type="text"
                      disabled={isLocked}
                      value={currentItem.commentaire || ''}
                      onChange={(e) => {
                        setNotes({
                          ...notes,
                          [crit.critereId]: { ...currentItem, commentaire: e.target.value }
                        });
                      }}
                      placeholder={`Observations sur ${crit.intitule.toLowerCase()}...`}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slateSubtle-200 focus:outline-none focus:ring-1 focus:ring-gendarmerie bg-white"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Points Forts & Axes d'Amélioration (Cahier des charges : Strengths & Areas for improvement) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Points Forts Constatés */}
        <div className="bg-white rounded-2xl p-5 border border-slateSubtle-200 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-gendarmerie font-bold text-xs uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Points Forts & Aptitudes Constatées</span>
          </div>

          <div className="space-y-2">
            {!isLocked && (
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={newPointFort}
                  onChange={(e) => setNewPointFort(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newPointFort.trim()) {
                      e.preventDefault();
                      setPointsForts([...pointsForts, newPointFort.trim()]);
                      setNewPointFort('');
                    }
                  }}
                  placeholder="Ex: Rigueur méthodologique, calme sous pression..."
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slateSubtle-200"
                />
                <Button
                  variant="secondary"
                  size="xs"
                  onClick={() => {
                    if (newPointFort.trim()) {
                      setPointsForts([...pointsForts, newPointFort.trim()]);
                      setNewPointFort('');
                    }
                  }}
                >
                  Ajouter
                </Button>
              </div>
            )}

            {pointsForts.length === 0 ? (
              <p className="text-xs text-slateSubtle-500 italic py-2">
                Aucun point fort spécifié pour l'instant.
              </p>
            ) : (
              <ul className="space-y-1.5 text-xs">
                {pointsForts.map((pt, idx) => (
                  <li
                    key={idx}
                    className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-200/60 flex items-center justify-between text-emerald-950 font-medium"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>{pt}</span>
                    </span>
                    {!isLocked && (
                      <button
                        type="button"
                        onClick={() => setPointsForts(pointsForts.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-rose-600 p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Axes d'Amélioration Requis */}
        <div className="bg-white rounded-2xl p-5 border border-slateSubtle-200 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-gendarmerie font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Axes d'Amélioration & Points à Perfectionner</span>
          </div>

          <div className="space-y-2">
            {!isLocked && (
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={newAxe}
                  onChange={(e) => setNewAxe(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newAxe.trim()) {
                      e.preventDefault();
                      setAxesAmelioration([...axesAmelioration, newAxe.trim()]);
                      setNewAxe('');
                    }
                  }}
                  placeholder="Ex: Soigner l'organisation de la boîte à outils, accélérer la prise de mesure..."
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slateSubtle-200"
                />
                <Button
                  variant="secondary"
                  size="xs"
                  onClick={() => {
                    if (newAxe.trim()) {
                      setAxesAmelioration([...axesAmelioration, newAxe.trim()]);
                      setNewAxe('');
                    }
                  }}
                >
                  Ajouter
                </Button>
              </div>
            )}

            {axesAmelioration.length === 0 ? (
              <p className="text-xs text-slateSubtle-500 italic py-2">
                Aucun axe d'amélioration spécifié.
              </p>
            ) : (
              <ul className="space-y-1.5 text-xs">
                {axesAmelioration.map((axe, idx) => (
                  <li
                    key={idx}
                    className="p-2 rounded-lg bg-amber-50/60 border border-amber-200/60 flex items-center justify-between text-amber-950 font-medium"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                      <span>{axe}</span>
                    </span>
                    {!isLocked && (
                      <button
                        type="button"
                        onClick={() => setAxesAmelioration(axesAmelioration.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-rose-600 p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* 6. Observations Qualitatives de la Commission & Compétences Révélées */}
      <div className="bg-white rounded-2xl p-5 border border-slateSubtle-200 shadow-2xs space-y-4">
        <div>
          <label className="block text-xs font-bold text-gendarmerie uppercase tracking-wider mb-1.5">
            Observations Globales de l'Évaluateur
          </label>
          <textarea
            rows="3"
            disabled={isLocked}
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            placeholder="Comportement professionnel général, dextérité manuelle, sens des responsabilités, attitude face aux imprévus techniques..."
            className="w-full px-3 py-2 text-xs rounded-xl border border-slateSubtle-200 focus:outline-none focus:ring-1 focus:ring-gendarmerie"
          />
        </div>

        {/* Compétences Pratiques Détectées (Tags) & Recommandation Spécialité */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slateSubtle-200 text-xs">
          <div>
            <label className="block font-semibold text-gendarmerie mb-1">
              Compétences et aptitudes techniques qualifiées
            </label>
            {!isLocked && (
              <div className="flex gap-1.5 mb-2">
                <input
                  type="text"
                  value={newCompetence}
                  onChange={(e) => setNewCompetence(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newCompetence.trim()) {
                      e.preventDefault();
                      if (!competencesDetectees.includes(newCompetence.trim())) {
                        setCompetencesDetectees([...competencesDetectees, newCompetence.trim()]);
                      }
                      setNewCompetence('');
                    }
                  }}
                  placeholder="Ex: Câblage RJ45 Cat6, Mesure TOS..."
                  className="flex-1 px-3 py-1.5 rounded-lg border border-slateSubtle-200"
                />
                <Button
                  variant="secondary"
                  size="xs"
                  onClick={() => {
                    if (newCompetence.trim() && !competencesDetectees.includes(newCompetence.trim())) {
                      setCompetencesDetectees([...competencesDetectees, newCompetence.trim()]);
                      setNewCompetence('');
                    }
                  }}
                >
                  Ajouter
                </Button>
              </div>
            )}

            <div className="flex flex-wrap gap-1.5 min-h-[30px]">
              {competencesDetectees.map((comp, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gold/15 text-gold-dark font-medium border border-gold/30"
                >
                  <Sparkles className="w-3 h-3 text-gold" />
                  <span>{comp}</span>
                  {!isLocked && (
                    <button
                      type="button"
                      onClick={() => setCompetencesDetectees(competencesDetectees.filter((_, i) => i !== idx))}
                      className="hover:text-rose-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gendarmerie mb-1">
              Recommandation de spécialité (Optionnel)
            </label>
            <select
              disabled={isLocked}
              value={recommandationSpecialite}
              onChange={(e) => setRecommandationSpecialite(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-slateSubtle-200 bg-white"
            >
              <option value="">Aucune recommandation spécifique</option>
              <option value="SPEC-INFO">Informatique & Réseaux (SIC)</option>
              <option value="SPEC-SEC-INFO">Cybersécurité & Investigation Numérique</option>
              <option value="SPEC-MOTARD">Escadron Motocycliste & Intervention Rapide</option>
              <option value="SPEC-PJ">Police Judiciaire & Criminologie</option>
              <option value="SPEC-SEC-ADMIN">Secrétariat & Chancellerie Militaire</option>
              <option value="SPEC-GM">Gendarmerie Mobile / Soutien Logistique</option>
            </select>
          </div>
        </div>
      </div>

      {/* 7. Pièces Justificatives & Preuves d'Intervention (Cahier des charges : Evidence attachment) */}
      <div className="bg-white rounded-2xl p-5 border border-slateSubtle-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gendarmerie font-bold text-xs uppercase tracking-wider">
            <Paperclip className="w-4 h-4 text-gold-dark" />
            <span>Pièces Justificatives & Preuves d'Évaluation Pratique ({preuves.length})</span>
          </div>

          {!isLocked && (
            <Button
              variant="outline"
              size="xs"
              onClick={() => setShowAddEvidenceModal(true)}
              icon={Plus}
            >
              Joindre une preuve (Photo, PV, Relevé)
            </Button>
          )}
        </div>

        {preuves.length === 0 ? (
          <p className="text-xs text-slateSubtle-500 italic py-2">
            Aucune pièce justificative attachée à cette évaluation.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {preuves.map((prv) => (
              <div
                key={prv.id}
                className="p-3 rounded-xl border border-slateSubtle-200 bg-cream-100/40 flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div className="w-8 h-8 rounded-lg bg-gendarmerie/10 text-gendarmerie flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="font-semibold text-xs text-gendarmerie truncate">
                      {prv.nomFichier}
                    </div>
                    <div className="text-[10px] text-slateSubtle-500">
                      {prv.taille} • {prv.dateUpload ? new Date(prv.dateUpload).toLocaleDateString('fr-FR') : ''}
                    </div>
                  </div>
                </div>

                {!isLocked && (
                  <button
                    type="button"
                    onClick={() => handleDeleteEvidence(prv.id)}
                    className="text-slate-400 hover:text-rose-600 p-1 rounded"
                    title="Supprimer la pièce"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 8. Historique des Révisions & Journal d'Audit (Cahier des charges : Maintain evaluation history) */}
      {assignment.HistoriqueRevisions && assignment.HistoriqueRevisions.length > 0 && (
        <div className="bg-white rounded-2xl p-5 border border-slateSubtle-200 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-gendarmerie font-bold text-xs uppercase tracking-wider">
            <History className="w-4 h-4 text-slateSubtle-600" />
            <span>Historique d'Audit & Traçabilité des Révisions</span>
          </div>

          <div className="space-y-2">
            {assignment.HistoriqueRevisions.map((rev, idx) => (
              <div
                key={rev.revisionId || idx}
                className="p-3 rounded-xl bg-cream-50 border border-slateSubtle-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gendarmerie px-2 py-0.5 rounded bg-cream-200 text-[10px] font-mono">
                      {rev.action}
                    </span>
                    <span className="font-semibold text-slateSubtle-800">
                      {rev.auteurNom}
                    </span>
                    <span className="text-[11px] text-slateSubtle-500">
                      • {new Date(rev.dateAction).toLocaleString('fr-FR')}
                    </span>
                  </div>
                  <p className="text-slateSubtle-700 italic">
                    « {rev.commentaire} »
                  </p>
                </div>

                {rev.scoreSnapshot !== null && rev.scoreSnapshot !== undefined && (
                  <div className="text-right shrink-0">
                    <span className="font-bold text-gendarmerie">
                      Note : {rev.scoreSnapshot} / 20
                    </span>
                    <div className="text-[10px] text-slateSubtle-500 font-semibold uppercase">
                      Statut : {rev.statutSnapshot}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 9. Barre d'Actions Principale (Sauvegarder Brouillon, Soumettre, Valider, Rejeter) */}
      <div className="sticky bottom-4 z-30 bg-[#153B2B] text-white p-4 rounded-2xl shadow-xl border border-gold/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold text-gold">
            <Award className="w-5 h-5 text-gold" />
          </div>
          <div>
            <div className="text-xs text-white/80">
              Score total calculé : <strong className="text-gold font-serif text-sm">{totalScore} / 20</strong> ({scorePourcentage}%)
            </div>
            <div className="text-[11px] text-white/60">
              Mention : <strong>{getMention(totalScore, arretSecurite)}</strong> • Statut actuel : <strong>{assignment.Statut}</strong>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!isLocked ? (
            <>
              {/* Bouton Sauvegarder Brouillon */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSaveEvaluation({ saveDraft: true })}
                disabled={saving}
                icon={Save}
                className="border-white/40 text-white hover:bg-white/10"
              >
                Sauvegarder Brouillon
              </Button>

              {/* Bouton Soumettre pour Validation */}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleSaveEvaluation({ submitForValidation: true })}
                disabled={saving}
                icon={Send}
              >
                Soumettre pour Validation
              </Button>

              {/* Bouton Rejeter / À réévaluer */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSaveEvaluation({ reject: true })}
                disabled={saving}
                icon={X}
                className="border-rose-300 text-rose-200 hover:bg-rose-950/40"
              >
                Rejeter / À réévaluer
              </Button>

              {/* Bouton Valider Définitivement */}
              <Button
                variant="gold"
                size="sm"
                onClick={() => setShowConfirmValidationModal(true)}
                disabled={saving}
                icon={CheckCircle2}
              >
                Valider Définitivement
              </Button>
            </>
          ) : (
            <Button
              variant="gold"
              size="sm"
              onClick={() => setShowRevisionModal(true)}
              icon={Unlock}
            >
              Initier une Révision Autorisée
            </Button>
          )}
        </div>
      </div>

      {/* 10. MODAL DE CONFIRMATION AVANT VALIDATION DÉFINITIVE */}
      <Modal
        isOpen={showConfirmValidationModal}
        onClose={() => setShowConfirmValidationModal(false)}
        maxWidth="max-w-md"
        title="Confirmation de la validation définitive"
        subtitle="Cette action verrouille la notation dans le dossier officiel de l'élève."
        footer={
          <div className="flex items-center justify-end gap-2 w-full">
            <Button variant="outline" size="sm" onClick={() => setShowConfirmValidationModal(false)}>
              Annuler
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleSaveEvaluation({ validateDirectly: true })}
            >
              Confirmer la validation
            </Button>
          </div>
        }
      >
        <div className="space-y-3 text-xs">
          <div className="p-3 rounded-xl bg-cream-100 border border-slateSubtle-200 space-y-1">
            <div className="font-bold text-gendarmerie">
              {eleve.prenom} {eleve.nom} ({eleve.matricule})
            </div>
            <div className="text-slateSubtle-700">
              Atelier : <strong>{atelier.Code} — {atelier.Titre}</strong>
            </div>
            <div className="font-bold text-sm text-gendarmerie mt-1">
              Note finale : <span className="text-gold-dark">{totalScore} / 20</span> ({scorePourcentage}%) — Mention {getMention(totalScore, arretSecurite)}
            </div>
          </div>

          <p className="text-slateSubtle-600 leading-relaxed">
            Conformément aux directives de commandement, une évaluation validée est définitivement verrouillée. Toute modification ultérieure nécessitera une procédure de révision formelle avec motif circonstancié.
          </p>
        </div>
      </Modal>

      {/* 11. MODAL D'OUVERTURE DE RÉVISION AUTORISÉE */}
      <Modal
        isOpen={showRevisionModal}
        onClose={() => setShowRevisionModal(false)}
        maxWidth="max-w-lg"
        title="Procédure de Révision Autorisée"
        subtitle="Déverrouillage exceptionnel de la notation pratique"
        footer={
          <div className="flex items-center justify-end gap-2 w-full">
            <Button variant="outline" size="sm" onClick={() => setShowRevisionModal(false)}>
              Annuler
            </Button>
            <Button variant="primary" size="sm" onClick={handleOpenRevision}>
              Déverrouiller pour révision
            </Button>
          </div>
        }
      >
        <div className="space-y-3 text-xs">
          <p className="text-slateSubtle-700 leading-relaxed">
            Pour garantir l'intégrité et la traçabilité des évaluations du corps, veuillez motiver par écrit la raison du réexamen (erreur matérielle de pointage, complément d'investigation, avis de commandement).
          </p>

          <div>
            <label className="block font-bold text-gendarmerie mb-1">
              Motif officiel de la révision *
            </label>
            <textarea
              rows="3"
              value={motifRevision}
              onChange={(e) => setMotifRevision(e.target.value)}
              placeholder="Ex: Rectification de la note d'exécution suite à vérification contradictoire du rapport technique..."
              className="w-full px-3 py-2 rounded-lg border border-slateSubtle-200 focus:outline-none focus:ring-1 focus:ring-gendarmerie"
            />
          </div>
        </div>
      </Modal>

      {/* 12. MODAL D'AJOUT DE PIÈCE JUSTIFICATIVE / PREUVE */}
      <Modal
        isOpen={showAddEvidenceModal}
        onClose={() => setShowAddEvidenceModal(false)}
        maxWidth="max-w-md"
        title="Ajouter une preuve pratique"
        subtitle="Photos d'intervention, procès-verbaux, fiches de mesure"
        footer={
          <div className="flex items-center justify-end gap-2 w-full">
            <Button variant="outline" size="sm" onClick={() => setShowAddEvidenceModal(false)}>
              Annuler
            </Button>
            <Button variant="primary" size="sm" onClick={handleAddEvidence}>
              Attacher la pièce
            </Button>
          </div>
        }
      >
        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-gendarmerie mb-1">
              Intitulé du document / Fichier *
            </label>
            <input
              type="text"
              value={newEvidenceFile.nomFichier}
              onChange={(e) => setNewEvidenceFile({ ...newEvidenceFile, nomFichier: e.target.value })}
              placeholder="Ex: rapport_etalonnage_antenne.pdf, photo_montage.jpg"
              className="w-full px-3 py-1.5 rounded-lg border border-slateSubtle-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-semibold text-gendarmerie mb-1">
                Type de document
              </label>
              <select
                value={newEvidenceFile.type}
                onChange={(e) => setNewEvidenceFile({ ...newEvidenceFile, type: e.target.value })}
                className="w-full px-2 py-1.5 rounded-lg border border-slateSubtle-200 bg-white"
              >
                <option value="application/pdf">Document PDF</option>
                <option value="image/jpeg">Photo JPEG</option>
                <option value="image/png">Capture PNG</option>
                <option value="application/vnd.ms-excel">Fichier Excel / CSV</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-gendarmerie mb-1">
                Taille estimée
              </label>
              <input
                type="text"
                value={newEvidenceFile.taille}
                onChange={(e) => setNewEvidenceFile({ ...newEvidenceFile, taille: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-slateSubtle-200"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gendarmerie mb-1">
              Description de la preuve
            </label>
            <input
              type="text"
              value={newEvidenceFile.description}
              onChange={(e) => setNewEvidenceFile({ ...newEvidenceFile, description: e.target.value })}
              placeholder="Ex: Relevé numérique attestant du bon fonctionnement de la liaison"
              className="w-full px-3 py-1.5 rounded-lg border border-slateSubtle-200"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

