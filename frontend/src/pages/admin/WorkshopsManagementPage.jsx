import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { workshopService } from '../../services/workshopService.js';
import { adminService } from '../../services/adminService.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import {
  Wrench,
  Cpu,
  Radio,
  Boxes,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  MapPin,
  UserCheck,
  Award,
  CheckCircle2,
  AlertCircle,
  Archive,
  RefreshCw,
  Eye,
  Edit,
  UserPlus,
  Sliders,
  Sparkles,
  Shield,
  Layers,
  FileSpreadsheet,
  Check,
  X,
  ChevronRight,
  ClipboardList,
  BarChart3
} from 'lucide-react';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import Badge from '../../components/common/Badge.jsx';
import Modal from '../../components/common/Modal.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';

export default function WorkshopsManagementPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Données
  const [categories, setCategories] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtres
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ACTIF');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showEvaluateModal, setShowEvaluateModal] = useState(false);

  // Sélections pour modals
  const [currentWorkshop, setCurrentWorkshop] = useState(null);
  const [currentAssignment, setCurrentAssignment] = useState(null);

  // Formulaire Création / Édition
  const initialFormData = {
    Titre: '',
    TitreAr: '',
    CategorieId: 'CAT-INFO',
    SousDomaine: '',
    NiveauDifficulte: 'INTERMEDIAIRE',
    DureeMinutes: 90,
    LieuAtelier: '',
    CapaciteMax: 6,
    SuperviseurParDefaut: '',
    DescriptionFr: '',
    DescriptionAr: '',
    Objectifs: [''],
    EquipementsRequis: [''],
    ConsignesSecurite: [''],
    TachesPratiques: [
      { taskId: 'TASK-1', ordre: 1, description: '', resultatAttendu: '', baremePoints: 10 }
    ],
    CriteresEvaluation: [
      { critereId: 'CRIT-1', intitule: 'Rigueur et respect des protocoles', intituleAr: 'الانضباط واحترام البروتوكولات', pointsMax: 10, description: '' },
      { critereId: 'CRIT-2', intitule: 'Exactitude technique du geste professionnel', intituleAr: 'الدقة التقنية في الإنجاز العملي', pointsMax: 10, description: '' }
    ],
    ScoreTotalMax: 20
  };
  const [formData, setFormData] = useState(initialFormData);

  // Formulaire Assignation
  const [assignMode, setAssignMode] = useState('PROMOTION'); // 'PROMOTION' ou 'ELEVES'
  const [assignPromoId, setAssignPromoId] = useState('');
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [assignDate, setAssignDate] = useState('');
  const [assignSupervisor, setAssignSupervisor] = useState('');

  // Formulaire Évaluation
  const [evalNotes, setEvalNotes] = useState({});
  const [evalObservations, setEvalObservations] = useState('');
  const [evalSkills, setEvalSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [evalSpecialty, setEvalSpecialty] = useState('');

  // Chargement initial
  const loadData = async () => {
    try {
      setLoading(true);
      const [catsRes, workshopsRes, statsRes, studentsRes, promosRes] = await Promise.all([
        workshopService.getCategories(),
        workshopService.getWorkshops({ includeArchived: true }),
        workshopService.getStats(),
        adminService.getStudents().catch(() => []),
        adminService.getPromotions().catch(() => [])
      ]);

      setCategories(catsRes || []);
      setWorkshops(workshopsRes || []);
      setStats(statsRes || null);
      setStudents(studentsRes || []);
      setPromotions(promosRes || []);
    } catch (err) {
      console.error('Erreur chargement ateliers:', err);
      showToast('Erreur lors du chargement des ateliers pratiques.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtrage local des ateliers
  const filteredWorkshops = workshops.filter(w => {
    if (selectedCategory !== 'ALL' && w.CategorieId !== selectedCategory) return false;
    if (selectedDifficulty !== 'ALL' && w.NiveauDifficulte !== selectedDifficulty) return false;
    if (selectedStatus !== 'TOUS' && w.Statut !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        (w.Titre && w.Titre.toLowerCase().includes(q)) ||
        (w.TitreAr && w.TitreAr.includes(q)) ||
        (w.Code && w.Code.toLowerCase().includes(q)) ||
        (w.SousDomaine && w.SousDomaine.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  // Gestionnaires Modal Création / Édition
  const handleOpenCreate = () => {
    setFormData(initialFormData);
    setShowCreateModal(true);
  };

  const handleOpenEdit = (w) => {
    setCurrentWorkshop(w);
    setFormData({
      Titre: w.Titre || '',
      TitreAr: w.TitreAr || '',
      CategorieId: w.CategorieId || 'CAT-INFO',
      SousDomaine: w.SousDomaine || '',
      NiveauDifficulte: w.NiveauDifficulte || 'INTERMEDIAIRE',
      DureeMinutes: w.DureeMinutes || 90,
      LieuAtelier: w.LieuAtelier || '',
      CapaciteMax: w.CapaciteMax || 6,
      SuperviseurParDefaut: w.SuperviseurParDefaut || '',
      DescriptionFr: w.DescriptionFr || '',
      DescriptionAr: w.DescriptionAr || '',
      Objectifs: w.Objectifs?.length ? [...w.Objectifs] : [''],
      EquipementsRequis: w.EquipementsRequis?.length ? [...w.EquipementsRequis] : [''],
      ConsignesSecurite: w.ConsignesSecurite?.length ? [...w.ConsignesSecurite] : [''],
      TachesPratiques: w.TachesPratiques?.length ? JSON.parse(JSON.stringify(w.TachesPratiques)) : [],
      CriteresEvaluation: w.CriteresEvaluation?.length ? JSON.parse(JSON.stringify(w.CriteresEvaluation)) : [],
      ScoreTotalMax: w.ScoreTotalMax || 20
    });
    setShowEditModal(true);
  };

  const handleSaveWorkshop = async (isEdit = false) => {
    try {
      if (!formData.Titre.trim()) {
        showToast('Veuillez renseigner le titre de l\'atelier.', 'warning');
        return;
      }

      // Nettoyer les listes
      const payload = {
        ...formData,
        Objectifs: formData.Objectifs.filter(o => o.trim()),
        EquipementsRequis: formData.EquipementsRequis.filter(e => e.trim()),
        ConsignesSecurite: formData.ConsignesSecurite.filter(c => c.trim()),
        ScoreTotalMax: formData.CriteresEvaluation.reduce((sum, c) => sum + (Number(c.pointsMax) || 0), 0) || 20
      };

      if (isEdit && currentWorkshop) {
        await workshopService.updateWorkshop(currentWorkshop.AtelierId, payload);
        showToast('Atelier pratique mis à jour avec succès.', 'success');
        setShowEditModal(false);
      } else {
        await workshopService.createWorkshop(payload);
        showToast('Nouvel atelier pratique créé avec succès.', 'success');
        setShowCreateModal(false);
      }

      loadData();
    } catch (err) {
      showToast(err.response?.data?.error || err.message || 'Erreur lors de l\'enregistrement.', 'error');
    }
  };

  // Archivage / Réactivation
  const handleToggleArchive = async (w) => {
    try {
      const isArchived = w.Statut === 'ACTIF';
      await workshopService.archiveWorkshop(w.AtelierId, isArchived);
      showToast(isArchived ? 'Atelier archivé avec succès.' : 'Atelier réactivé avec succès.', 'info');
      loadData();
    } catch (err) {
      showToast(err.message || 'Erreur archivage.', 'error');
    }
  };

  // Modal Assignation
  const handleOpenAssign = (w) => {
    setCurrentWorkshop(w);
    setAssignPromoId(promotions[0]?.PromotionId || '1');
    setSelectedStudentIds([]);
    setAssignDate(new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0]);
    setAssignSupervisor(w.SuperviseurParDefaut || '');
    setShowAssignModal(true);
  };

  const handleSubmitAssign = async () => {
    try {
      if (!currentWorkshop) return;

      const payload = {
        datePrevue: assignDate ? new Date(assignDate).toISOString() : null,
        superviseurNom: assignSupervisor,
        promotionId: assignMode === 'PROMOTION' ? assignPromoId : null,
        traineeIds: assignMode === 'ELEVES' ? selectedStudentIds : []
      };

      const res = await workshopService.assignWorkshop(currentWorkshop.AtelierId, payload);
      showToast(`${res.assignesCount || 0} élève(s) assigné(s) à l'atelier avec succès.`, 'success');
      setShowAssignModal(false);
      loadData();
    } catch (err) {
      showToast(err.response?.data?.error || err.message || 'Erreur assignation.', 'error');
    }
  };

  // Navigation vers la fiche officielle d'évaluation pratique
  const handleOpenEvaluate = async (w) => {
    try {
      // Charger les détails de l'atelier pour avoir les assignations
      const details = await workshopService.getWorkshopById(w.AtelierId);
      const pendingAssignment = details.Assignations?.find(
        a => a.Statut !== 'VALIDE' && a.Statut !== 'EVALUE'
      ) || details.Assignations?.[0];

      if (!pendingAssignment) {
        showToast('Aucun élève assigné à cet atelier. Veuillez d\'abord assigner des élèves.', 'warning');
        return;
      }

      navigate(`/admin/ateliers/evaluations/${pendingAssignment.AssignationId}`);
    } catch (err) {
      showToast('Impossible d\'ouvrir la fiche d\'évaluation.', 'error');
    }
  };

  const handleSubmitEvaluate = async () => {
    try {
      if (!currentAssignment) return;

      await workshopService.evaluateTrainee(currentAssignment.AssignationId, {
        notesCriteres: evalNotes,
        observations: evalObservations,
        competencesDetectees: evalSkills,
        recommandationSpecialite: evalSpecialty || null
      });

      showToast('Évaluation pratique et compétences enregistrées avec succès.', 'success');
      setShowEvaluateModal(false);
      loadData();
    } catch (err) {
      showToast(err.response?.data?.error || err.message || 'Erreur évaluation.', 'error');
    }
  };

  // Helper icône de catégorie
  const renderCategoryIcon = (catId, className = 'w-5 h-5') => {
    switch (catId) {
      case 'CAT-INFO':
        return <Cpu className={className} />;
      case 'CAT-MECA':
        return <Wrench className={className} />;
      case 'CAT-TELECOM':
        return <Radio className={className} />;
      case 'CAT-LOG':
        return <Boxes className={className} />;
      default:
        return <Layers className={className} />;
    }
  };

  if (loading) {
    return <LoadingSpinner text="Chargement des ateliers pratiques..." fullPage />;
  }

  return (
    <div className="space-y-6 animate-fade-slide">
      {/* 1. Header Officiel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slateSubtle-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gold" />
            <span className="text-[11px] uppercase tracking-wider font-bold text-gendarmerie">
              الدرك الملكي • وحدة الكفاءات المهنية والورشات التطبيقية
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gendarmerie font-serif mt-1">
            Compétences Professionnelles & Ateliers Pratiques
          </h1>
          <p className="text-xs text-slateSubtle-700 mt-0.5">
            Évaluation de la performance pratique en situation réelle pour révéler les aptitudes techniques cachées des élèves gendarmes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link to="/admin/ateliers/analytics">
            <Button
              variant="outline"
              size="sm"
              icon={BarChart3}
            >
              Tableau Analytique
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={loadData}
            icon={RefreshCw}
          >
            Actualiser
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleOpenCreate}
            icon={Plus}
          >
            Nouvel Atelier Pratique
          </Button>
        </div>
      </div>

      {/* 2. Top KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slateSubtle-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase text-slateSubtle-600 tracking-wider">
              Ateliers Actifs
            </div>
            <div className="text-2xl font-bold text-gendarmerie font-serif mt-0.5">
              {stats?.activeWorkshops || 0}
              <span className="text-xs font-normal text-slateSubtle-600 ml-1.5">
                sur {stats?.totalWorkshops || 0}
              </span>
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-1">
              4 catégories techniques
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-gendarmerie/10 text-gendarmerie flex items-center justify-center">
            <ClipboardList className="w-5 h-5 text-gendarmerie" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slateSubtle-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase text-slateSubtle-600 tracking-wider">
              Élèves Assignés
            </div>
            <div className="text-2xl font-bold text-gendarmerie font-serif mt-0.5">
              {stats?.totalAssignments || 0}
            </div>
            <div className="text-[11px] text-slateSubtle-600 font-medium mt-1">
              {stats?.evaluatedAssignments || 0} évalués ({stats?.completionRate || 0}%)
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-gold/15 text-gold-dark flex items-center justify-center">
            <UserCheck className="w-5 h-5 text-gold-dark" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slateSubtle-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase text-slateSubtle-600 tracking-wider">
              Score Moyen Pratique
            </div>
            <div className="text-2xl font-bold text-gendarmerie font-serif mt-0.5">
              {stats?.averageScore || 0}%
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-1">
              Mention dominante : Très Bien
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Award className="w-5 h-5 text-emerald-700" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slateSubtle-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase text-slateSubtle-600 tracking-wider">
              Compétences Révélées
            </div>
            <div className="text-2xl font-bold text-gendarmerie font-serif mt-0.5">
              {stats?.topDetectedSkills?.length || 0}
            </div>
            <div className="text-[11px] text-gold-dark font-medium mt-1">
              Aptitudes techniques qualifiées
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-amber-600" />
          </div>
        </div>
      </div>

      {/* 3. Les 4 Catégories Professionnelles Pratiques */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gendarmerie flex items-center gap-2">
            <span className="w-1.5 h-3.5 bg-gendarmerie rounded-full" />
            Les 4 Domaines Pratiques Professionnels
          </h2>
          <span className="text-xs text-slateSubtle-600">
            Cliquez sur un domaine pour filtrer
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(isSelected ? 'ALL' : cat.id)}
                className={`cursor-pointer rounded-xl p-4 border transition-all duration-150 ${
                  isSelected
                    ? 'bg-gendarmerie text-white border-gendarmerie shadow-md scale-[1.01]'
                    : 'bg-white hover:bg-cream-100/60 border-slateSubtle-200 shadow-2xs hover:border-gold/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      isSelected
                        ? 'bg-white/15 text-gold'
                        : 'bg-gendarmerie/10 text-gendarmerie'
                    }`}
                  >
                    {renderCategoryIcon(cat.id, 'w-5 h-5')}
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-cream-200 text-gendarmerie'
                    }`}
                  >
                    {cat.ateliersActifs || 0} atelier(s)
                  </span>
                </div>

                <div className="font-bold text-sm leading-tight">
                  {cat.intituleFr}
                </div>
                <div
                  className={`text-xs mt-0.5 font-medium ${
                    isSelected ? 'text-gold-light' : 'text-slateSubtle-600'
                  }`}
                  dir="rtl"
                >
                  {cat.intituleAr}
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/10 text-[11px] space-y-1">
                  {cat.sousDomaines?.map((sub) => (
                    <div
                      key={sub.id}
                      className={`truncate flex items-center gap-1.5 ${
                        isSelected ? 'text-white/80' : 'text-slateSubtle-700'
                      }`}
                    >
                      <span className="w-1 h-1 rounded-full bg-gold shrink-0" />
                      <span>{sub.titreFr}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Barre de Filtres & Recherche */}
      <div className="bg-white rounded-xl p-3.5 border border-slateSubtle-200 shadow-2xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slateSubtle-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher par titre, code, sous-domaine..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slateSubtle-200 focus:outline-none focus:ring-1 focus:ring-gendarmerie"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Filtre Catégorie */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg border border-slateSubtle-200 bg-white font-medium text-gendarmerie focus:outline-none"
          >
            <option value="ALL">Tous les domaines</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.intituleFr}
              </option>
            ))}
          </select>

          {/* Filtre Difficulté */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg border border-slateSubtle-200 bg-white font-medium text-gendarmerie focus:outline-none"
          >
            <option value="ALL">Toutes difficultés</option>
            <option value="DEBUTANT">Débutant</option>
            <option value="INTERMEDIAIRE">Intermédiaire</option>
            <option value="AVANCE">Avancé</option>
          </select>

          {/* Filtre Statut */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg border border-slateSubtle-200 bg-white font-medium text-gendarmerie focus:outline-none"
          >
            <option value="ACTIF">Actifs seulement</option>
            <option value="ARCHIVE">Archivés</option>
            <option value="TOUS">Tous statuts</option>
          </select>
        </div>
      </div>

      {/* 5. Grille des Ateliers */}
      {filteredWorkshops.length === 0 ? (
        <EmptyState
          title="Aucun atelier trouvé"
          description="Aucun atelier pratique ne correspond aux critères de recherche sélectionnés."
          actionLabel="Créer un nouvel atelier"
          onAction={handleOpenCreate}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWorkshops.map((w) => {
            const isArchived = w.Statut === 'ARCHIVE';
            const cat = categories.find((c) => c.id === w.CategorieId);

            return (
              <div
                key={w.AtelierId}
                className={`bg-white rounded-xl border flex flex-col justify-between transition-all duration-150 ${
                  isArchived
                    ? 'border-dashed border-slateSubtle-300 opacity-75'
                    : 'border-slateSubtle-200 shadow-2xs hover:shadow-card hover:border-gold/40'
                }`}
              >
                {/* Header Carte */}
                <div className="p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-gendarmerie/10 text-gendarmerie flex items-center justify-center">
                        {renderCategoryIcon(w.CategorieId, 'w-3.5 h-3.5')}
                      </div>
                      <span className="font-mono text-[11px] font-bold text-gendarmerie px-2 py-0.5 rounded-md bg-cream-200">
                        {w.Code}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          w.NiveauDifficulte === 'AVANCE'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : w.NiveauDifficulte === 'INTERMEDIAIRE'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {w.NiveauDifficulte}
                      </span>
                      {isArchived && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          ARCHIVÉ
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-gendarmerie leading-snug">
                      {w.Titre}
                    </h3>
                    <p className="text-xs text-slateSubtle-600 mt-0.5 font-medium" dir="rtl">
                      {w.TitreAr}
                    </p>
                  </div>

                  <div className="text-[11px] text-slateSubtle-700 bg-cream-100/70 p-2 rounded-lg border border-slateSubtle-200/60 line-clamp-2">
                    {w.DescriptionFr || 'Atelier pratique de terrain supervisé.'}
                  </div>

                  {/* Métadonnées rapides */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slateSubtle-700 pt-1">
                    <div className="flex items-center gap-1.5 truncate">
                      <Clock className="w-3.5 h-3.5 text-gold-dark shrink-0" />
                      <span>{w.DureeMinutes} minutes</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-gold-dark shrink-0" />
                      <span className="truncate">{w.LieuAtelier || 'Atelier Régiment'}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Carte & Actions */}
                <div className="p-3 bg-cream-100/50 border-t border-slateSubtle-200/80 rounded-b-xl space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slateSubtle-600">
                    <span>
                      <strong className="text-gendarmerie">{w.TachesPratiques?.length || 0}</strong> tâches •{' '}
                      <strong className="text-gendarmerie">{w.CriteresEvaluation?.length || 0}</strong> critères
                    </span>
                    <span>
                      <strong className="text-gendarmerie">{w.totalAssignes || 0}</strong> assigné(s)
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-1 pt-1">
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => navigate(`/admin/ateliers/${w.AtelierId}`)}
                      icon={Eye}
                    >
                      Détails
                    </Button>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="secondary"
                        size="xs"
                        onClick={() => handleOpenAssign(w)}
                        icon={UserPlus}
                        disabled={isArchived}
                      >
                        Assigner
                      </Button>
                      <Button
                        variant="primary"
                        size="xs"
                        onClick={() => handleOpenEvaluate(w)}
                        icon={CheckCircle2}
                        disabled={isArchived}
                      >
                        Évaluer
                      </Button>
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => handleOpenEdit(w)}
                        icon={Edit}
                        title="Modifier"
                      />
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => handleToggleArchive(w)}
                        icon={isArchived ? RefreshCw : Archive}
                        title={isArchived ? 'Réactiver' : 'Archiver'}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 6. MODAL CRÉATION / MODIFICATION ATELIER */}
      <Modal
        isOpen={showCreateModal || showEditModal}
        onClose={() => {
          setShowCreateModal(false);
          setShowEditModal(false);
        }}
        maxWidth="max-w-3xl"
        title={showEditModal ? "Modifier l'atelier pratique" : "Créer un nouvel atelier pratique"}
        subtitle="Définissez les objectifs, consignes de sécurité, tâches et barème d'évaluation"
        footer={
          <div className="flex items-center justify-end gap-2 w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setShowCreateModal(false);
                setShowEditModal(false);
              }}
            >
              Annuler
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleSaveWorkshop(showEditModal)}
            >
              {showEditModal ? 'Mettre à jour' : 'Créer l\'atelier'}
            </Button>
          </div>
        }
      >
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1 text-xs">
          {/* Ligne 1: Titres FR & AR */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-gendarmerie mb-1">
                Titre de l'atelier (Français) *
              </label>
              <input
                type="text"
                value={formData.Titre}
                onChange={(e) => setFormData({ ...formData, Titre: e.target.value })}
                placeholder="Ex: Câblage réseau blindé RJ45..."
                className="w-full px-3 py-1.5 rounded-lg border border-slateSubtle-200 focus:outline-none focus:ring-1 focus:ring-gendarmerie"
              />
            </div>
            <div>
              <label className="block font-semibold text-gendarmerie mb-1" dir="rtl">
                عنوان الورشة التطبيقية (بالعربية) *
              </label>
              <input
                type="text"
                value={formData.TitreAr}
                onChange={(e) => setFormData({ ...formData, TitreAr: e.target.value })}
                placeholder="Ex: تركيب الشبكات المحلية..."
                dir="rtl"
                className="w-full px-3 py-1.5 rounded-lg border border-slateSubtle-200 focus:outline-none focus:ring-1 focus:ring-gendarmerie"
              />
            </div>
          </div>

          {/* Ligne 2: Catégorie, Sous-domaine, Difficulté */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-gendarmerie mb-1">
                Catégorie Professionnelle *
              </label>
              <select
                value={formData.CategorieId}
                onChange={(e) => setFormData({ ...formData, CategorieId: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slateSubtle-200 bg-white"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.intituleFr}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-gendarmerie mb-1">
                Sous-domaine Spécialisé
              </label>
              <input
                type="text"
                value={formData.SousDomaine}
                onChange={(e) => setFormData({ ...formData, SousDomaine: e.target.value })}
                placeholder="Ex: Diagnostic OBD, Réseau..."
                className="w-full px-3 py-1.5 rounded-lg border border-slateSubtle-200"
              />
            </div>
            <div>
              <label className="block font-semibold text-gendarmerie mb-1">
                Niveau de Difficulté
              </label>
              <select
                value={formData.NiveauDifficulte}
                onChange={(e) => setFormData({ ...formData, NiveauDifficulte: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slateSubtle-200 bg-white"
              >
                <option value="DEBUTANT">Débutant</option>
                <option value="INTERMEDIAIRE">Intermédiaire</option>
                <option value="AVANCE">Avancé</option>
              </select>
            </div>
          </div>

          {/* Ligne 3: Durée, Capacité, Lieu, Superviseur */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label className="block font-semibold text-gendarmerie mb-1">
                Durée (Minutes)
              </label>
              <input
                type="number"
                min="15"
                max="360"
                value={formData.DureeMinutes}
                onChange={(e) => setFormData({ ...formData, DureeMinutes: parseInt(e.target.value, 10) || 60 })}
                className="w-full px-3 py-1.5 rounded-lg border border-slateSubtle-200"
              />
            </div>
            <div>
              <label className="block font-semibold text-gendarmerie mb-1">
                Capacité Max
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={formData.CapaciteMax}
                onChange={(e) => setFormData({ ...formData, CapaciteMax: parseInt(e.target.value, 10) || 6 })}
                className="w-full px-3 py-1.5 rounded-lg border border-slateSubtle-200"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-semibold text-gendarmerie mb-1">
                Lieu de l'Atelier / Salle
              </label>
              <input
                type="text"
                value={formData.LieuAtelier}
                onChange={(e) => setFormData({ ...formData, LieuAtelier: e.target.value })}
                placeholder="Ex: Hangar Flotte Véhicules..."
                className="w-full px-3 py-1.5 rounded-lg border border-slateSubtle-200"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gendarmerie mb-1">
              Superviseur / Évaluateur désigné
            </label>
            <input
              type="text"
              value={formData.SuperviseurParDefaut}
              onChange={(e) => setFormData({ ...formData, SuperviseurParDefaut: e.target.value })}
              placeholder="Ex: Adjudant-Chef M. El Fassi (Section SIC)"
              className="w-full px-3 py-1.5 rounded-lg border border-slateSubtle-200"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-gendarmerie mb-1">
              Description de la mise en situation
            </label>
            <textarea
              rows="2"
              value={formData.DescriptionFr}
              onChange={(e) => setFormData({ ...formData, DescriptionFr: e.target.value })}
              placeholder="Expliquez brièvement le contexte et la mission pratique..."
              className="w-full px-3 py-1.5 rounded-lg border border-slateSubtle-200"
            />
          </div>

          {/* Objectifs & Consignes de Sécurité */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slateSubtle-200">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-gendarmerie">Objectifs Pédagogiques</span>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, Objectifs: [...formData.Objectifs, ''] })}
                  className="text-gold-dark hover:underline text-[11px] font-bold"
                >
                  + Ajouter
                </button>
              </div>
              {formData.Objectifs.map((obj, idx) => (
                <div key={idx} className="flex items-center gap-1 mb-1.5">
                  <input
                    type="text"
                    value={obj}
                    onChange={(e) => {
                      const updated = [...formData.Objectifs];
                      updated[idx] = e.target.value;
                      setFormData({ ...formData, Objectifs: updated });
                    }}
                    placeholder={`Objectif ${idx + 1}...`}
                    className="flex-1 px-2.5 py-1 text-xs rounded border border-slateSubtle-200"
                  />
                  {formData.Objectifs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, Objectifs: formData.Objectifs.filter((_, i) => i !== idx) })}
                      className="text-rose-500 hover:text-rose-700 p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-gendarmerie">Consignes de Sécurité (EPI)</span>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, ConsignesSecurite: [...formData.ConsignesSecurite, ''] })}
                  className="text-gold-dark hover:underline text-[11px] font-bold"
                >
                  + Ajouter
                </button>
              </div>
              {formData.ConsignesSecurite.map((cs, idx) => (
                <div key={idx} className="flex items-center gap-1 mb-1.5">
                  <input
                    type="text"
                    value={cs}
                    onChange={(e) => {
                      const updated = [...formData.ConsignesSecurite];
                      updated[idx] = e.target.value;
                      setFormData({ ...formData, ConsignesSecurite: updated });
                    }}
                    placeholder={`Consigne sécurité ${idx + 1}...`}
                    className="flex-1 px-2.5 py-1 text-xs rounded border border-slateSubtle-200"
                  />
                  {formData.ConsignesSecurite.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, ConsignesSecurite: formData.ConsignesSecurite.filter((_, i) => i !== idx) })}
                      className="text-rose-500 hover:text-rose-700 p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Critères d'évaluation & Barème */}
          <div className="pt-2 border-t border-slateSubtle-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gendarmerie">
                Critères d'évaluation pratiques (Total Max:{' '}
                {formData.CriteresEvaluation.reduce((sum, c) => sum + (Number(c.pointsMax) || 0), 0)} pts)
              </span>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    CriteresEvaluation: [
                      ...formData.CriteresEvaluation,
                      {
                        critereId: `CRIT-${Date.now()}`,
                        intitule: 'Nouveau critère pratique',
                        intituleAr: 'معيار تقييم جديد',
                        pointsMax: 5,
                        description: ''
                      }
                    ]
                  })
                }
                className="text-gold-dark hover:underline text-[11px] font-bold"
              >
                + Ajouter un critère
              </button>
            </div>

            <div className="space-y-2">
              {formData.CriteresEvaluation.map((crit, idx) => (
                <div key={crit.critereId || idx} className="p-2.5 rounded-lg border border-slateSubtle-200 bg-cream-100/40 grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                  <div className="md:col-span-5">
                    <input
                      type="text"
                      value={crit.intitule}
                      onChange={(e) => {
                        const updated = [...formData.CriteresEvaluation];
                        updated[idx].intitule = e.target.value;
                        setFormData({ ...formData, CriteresEvaluation: updated });
                      }}
                      placeholder="Intitulé du critère FR"
                      className="w-full px-2 py-1 text-xs rounded border border-slateSubtle-200"
                    />
                  </div>
                  <div className="md:col-span-4">
                    <input
                      type="text"
                      value={crit.intituleAr}
                      onChange={(e) => {
                        const updated = [...formData.CriteresEvaluation];
                        updated[idx].intituleAr = e.target.value;
                        setFormData({ ...formData, CriteresEvaluation: updated });
                      }}
                      placeholder="Intitulé AR"
                      dir="rtl"
                      className="w-full px-2 py-1 text-xs rounded border border-slateSubtle-200"
                    />
                  </div>
                  <div className="md:col-span-2 flex items-center gap-1">
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={crit.pointsMax}
                      onChange={(e) => {
                        const updated = [...formData.CriteresEvaluation];
                        updated[idx].pointsMax = parseInt(e.target.value, 10) || 0;
                        setFormData({ ...formData, CriteresEvaluation: updated });
                      }}
                      className="w-16 px-2 py-1 text-xs rounded border border-slateSubtle-200 text-center font-bold"
                    />
                    <span className="text-[10px] text-slateSubtle-600">pts</span>
                  </div>
                  <div className="md:col-span-1 text-right">
                    {formData.CriteresEvaluation.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            CriteresEvaluation: formData.CriteresEvaluation.filter((_, i) => i !== idx)
                          })
                        }
                        className="text-rose-500 hover:text-rose-700 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {/* 7. MODAL ASSIGNATION ATELIER */}
      <Modal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        maxWidth="max-w-xl"
        title="Assigner des élèves à l'atelier"
        subtitle={currentWorkshop ? `${currentWorkshop.Code} — ${currentWorkshop.Titre}` : ''}
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
          {/* Mode d'assignation */}
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
                <div className="text-[10px] font-normal text-slateSubtle-600 mt-0.5">
                  Assigner toute la cohorte
                </div>
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
                <div className="text-[10px] font-normal text-slateSubtle-600 mt-0.5">
                  Choisir des élèves spécifiques
                </div>
              </button>
            </div>
          </div>

          {/* Choix Promotion ou Élèves */}
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

          {/* Date prévue & Superviseur */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slateSubtle-200">
            <div>
              <label className="block font-semibold text-gendarmerie mb-1">
                Date prévue pour la séance
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
                Évaluateur / Superviseur désigné
              </label>
              <input
                type="text"
                value={assignSupervisor}
                onChange={(e) => setAssignSupervisor(e.target.value)}
                placeholder="Ex: Adjudant-Chef M. El Fassi"
                className="w-full px-3 py-1.5 rounded-lg border border-slateSubtle-200"
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* 8. MODAL ÉVALUATION ÉLÈVE & COMPÉTENCES DÉTECTÉES */}
      <Modal
        isOpen={showEvaluateModal}
        onClose={() => setShowEvaluateModal(false)}
        maxWidth="max-w-2xl"
        title="Évaluation pratique de l'élève"
        subtitle={
          currentAssignment
            ? `Élève: ${currentAssignment.Eleve?.prenom || ''} ${currentAssignment.Eleve?.nom || ''} • Atelier: ${currentWorkshop?.Code || ''}`
            : ''
        }
        footer={
          <div className="flex items-center justify-end gap-2 w-full">
            <Button variant="outline" size="sm" onClick={() => setShowEvaluateModal(false)}>
              Annuler
            </Button>
            <Button variant="primary" size="sm" onClick={handleSubmitEvaluate}>
              Valider l'évaluation pratique
            </Button>
          </div>
        }
      >
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1 text-xs">
          {/* Synthèse du score dynamique */}
          <div className="p-3 bg-cream-100 rounded-xl border border-slateSubtle-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase font-bold text-slateSubtle-600">
                Score Calculé
              </div>
              <div className="text-xl font-bold text-gendarmerie font-serif mt-0.5">
                {Object.values(evalNotes).reduce((sum, v) => sum + (Number(v) || 0), 0)} /{' '}
                {currentWorkshop?.ScoreTotalMax || 20} pts
                <span className="text-xs font-semibold text-gold-dark ml-2">
                  (
                  {Math.round(
                    (Object.values(evalNotes).reduce((sum, v) => sum + (Number(v) || 0), 0) /
                      (currentWorkshop?.ScoreTotalMax || 20)) *
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
                      (currentWorkshop?.ScoreTotalMax || 20)) *
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

          {/* Grille de notation par critère */}
          <div>
            <label className="block font-semibold text-gendarmerie mb-2">
              Notation par critère officiel
            </label>
            <div className="space-y-2.5">
              {currentWorkshop?.CriteresEvaluation?.map((crit) => {
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

          {/* Compétences Pratiques Détectées (Tags) */}
          <div className="pt-2 border-t border-slateSubtle-200">
            <label className="block font-semibold text-gendarmerie mb-1">
              Compétences et aptitudes techniques détectées
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
                placeholder="Ex: Câblage RJ45, Chiffrement LUKS, Diagnostic OBD..."
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

            <div className="flex flex-wrap gap-1.5 min-h-[32px]">
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

          {/* Observations de l'évaluateur */}
          <div>
            <label className="block font-semibold text-gendarmerie mb-1">
              Observations qualitatives de l'évaluateur
            </label>
            <textarea
              rows="3"
              value={evalObservations}
              onChange={(e) => setEvalObservations(e.target.value)}
              placeholder="Comportement professionnel, rigueur sécuritaire, dextérité manuelle..."
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
    </div>
  );
}
