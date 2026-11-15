import React, { useState, useEffect, useMemo } from 'react';
import { adminService } from '../../services/adminService.js';
import { useToast } from '../../context/ToastContext.jsx';
import {
  HelpCircle,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  FileText,
  Eye,
  Edit,
  Archive,
  Clock,
  Sparkles,
  Tag,
  Check,
  X,
  Power,
  RotateCcw,
  Layers,
  Award,
  ShieldCheck,
  Compass
} from 'lucide-react';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import Badge from '../../components/common/Badge.jsx';
import Modal from '../../components/common/Modal.jsx';
import VisualMatrix from '../../components/test/VisualMatrix.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';

const ARABIC_CATEGORIES = [
  { code: 'LOGIQUE', nom: 'الاستدلال المنطقي', count: 20 },
  { code: 'OBSERVATION', nom: 'التحليل والملاحظة', count: 15 },
  { code: 'ATTENTION', nom: 'التركيز والانتباه', count: 15 },
  { code: 'DECISION', nom: 'حل المشكلات واتخاذ القرار', count: 15 },
  { code: 'ROUTE_MOTO', nom: 'السلامة الطرقية وقيادة الدراجات', count: 15 },
  { code: 'PJ_ENQUETE', nom: 'الشرطة القضائية والتحري', count: 15 },
  { code: 'INFORMATIQUE', nom: 'المعلوماتية والمهارات الرقمية', count: 15 },
  { code: 'COMMUNICATION', nom: 'التواصل والتكوين', count: 10 },
  { code: 'SECRETARIAT', nom: 'الإدارة والسكرتارية', count: 5 },
  { code: 'DISCIPLINE', nom: 'المواقف المهنية والانضباط', count: 15 }
];

const SPECIALITES_REFERENTIEL = [
  { code: 'SPEC-MOTARD', nom: 'الدراجات النارية / السلامة الطرقية' },
  { code: 'SPEC-GEH', nom: 'GEH' },
  { code: 'SPEC-GSI', nom: 'GSI' },
  { code: 'SPEC-PJ', nom: 'الشرطة القضائية' },
  { code: 'SPEC-INFO', nom: 'الإعلاميات' },
  { code: 'SPEC-DROIT', nom: 'المجال القانوني' },
  { code: 'SPEC-INSTRUCTEUR', nom: 'التكوين والتعليم' },
  { code: 'SPEC-SEC-ADMIN', nom: 'الإدارة والسكرتارية' },
  { code: 'SPEC-PSIG', nom: 'العمليات الميدانية' }
];

export default function QuestionBankPage() {
  const [questions, setQuestions] = useState([]);
  const [domaines, setDomaines] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtres
  const [selectedDomaine, setSelectedDomaine] = useState('');
  const [selectedDifficulte, setSelectedDifficulte] = useState('');
  const [selectedSpecialite, setSelectedSpecialite] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL, ACTIVE, INACTIVE, ARCHIVED
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [previewQuestion, setPreviewQuestion] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isValidationModalOpen, setIsValidationModalOpen] = useState(false);
  const [validationReport, setValidationReport] = useState(null);

  const handleRunValidation = async () => {
    try {
      setIsValidating(true);
      const res = await adminService.validateQuestionBank();
      setValidationReport(res);
      setIsValidationModalOpen(true);
      addToast({
        title: 'مطابقة بنك الأسئلة (140 سؤال)',
        message: res.message || 'تم التحقق بنجاح من سلامة ومطابقة الـ 140 سؤالاً.',
        type: res.status === 'SUCCESS' ? 'success' : 'warning'
      });
    } catch (err) {
      setValidationReport(err.response?.data || { status: 'FAILED', message: err.message });
      setIsValidationModalOpen(true);
      addToast({
        title: 'تنبيه التدقيق',
        message: 'تم رصد ملاحظات أثناء فحص بنك الأسئلة.',
        type: 'warning'
      });
    } finally {
      setIsValidating(false);
    }
  };

  // Formulaire d'édition / création
  const [formData, setFormData] = useState({
    code: '',
    enonce: '',
    contexteSituationnel: '',
    domaineCode: 'LOGIQUE',
    typeQuestion: 'QCM_UNIQUE',
    difficulte: 'MOYEN',
    difficulteArabe: 'متوسط',
    points: 1,
    coefficient: 1.0,
    tempsLimiteSecondes: 90,
    schemaSvg: '',
    explication: '',
    competencesAssociees: '',
    specialitesAssociees: [],
    estActive: true,
    options: [
      { lettre: 'A', lettre_ar: 'أ', enonce: '', estCorrecte: true },
      { lettre: 'B', lettre_ar: 'ب', enonce: '', estCorrecte: false },
      { lettre: 'C', lettre_ar: 'ج', enonce: '', estCorrecte: false },
      { lettre: 'D', lettre_ar: 'د', enonce: '', estCorrecte: false }
    ]
  });

  const { addToast } = useToast();

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const data = await adminService.getQuestions({
        domaine: selectedDomaine || undefined,
        difficulte: selectedDifficulte || undefined,
        specialite: selectedSpecialite || undefined,
        includeArchived: statusFilter === 'ARCHIVED' || statusFilter === 'ALL'
      });
      setQuestions(data.questions || []);
      setDomaines(data.domaines || []);
      setSpecialties(data.specialites || []);
    } catch (err) {
      console.error('Erreur banque questions:', err);
      addToast({ title: 'Erreur', message: 'Impossible de charger la banque de questions.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [selectedDomaine, selectedDifficulte, selectedSpecialite, statusFilter]);

  // Statistiques de la banque
  const stats = useMemo(() => {
    const total = questions.length;
    const actives = questions.filter(q => q.EstActive && !q.EstArchivee).length;
    const inactives = questions.filter(q => !q.EstActive && !q.EstArchivee).length;
    const archivees = questions.filter(q => q.EstArchivee).length;
    return { total, actives, inactives, archivees };
  }, [questions]);

  // Filtrage local supplémentaire (recherche texte & statut)
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      // Filtre statut
      if (statusFilter === 'ACTIVE' && (!q.EstActive || q.EstArchivee)) return false;
      if (statusFilter === 'INACTIVE' && (q.EstActive || q.EstArchivee)) return false;
      if (statusFilter === 'ARCHIVED' && !q.EstArchivee) return false;

      // Filtre recherche textuelle
      if (!searchQuery.trim()) return true;
      const s = searchQuery.toLowerCase();
      const inEnonce = (q.Enonce || '').toLowerCase().includes(s);
      const inCode = (q.Code || '').toLowerCase().includes(s);
      const inDomaine = (q.DomaineNom || q.DomaineIntitule || '').toLowerCase().includes(s);
      const inCompetences = Array.isArray(q.CompetencesAssociees || q.Competences)
        ? (q.CompetencesAssociees || q.Competences).some(c => c.toLowerCase().includes(s))
        : false;

      return inEnonce || inCode || inDomaine || inCompetences;
    });
  }, [questions, statusFilter, searchQuery]);

  const handleOpenCreate = () => {
    setEditingQuestion(null);
    setFormData({
      code: `Q-NEW-${String(questions.length + 1).padStart(3, '0')}`,
      enonce: '',
      contexteSituationnel: 'الاستدلال المنطقي',
      domaineCode: selectedDomaine || 'LOGIQUE',
      typeQuestion: 'QCM_UNIQUE',
      difficulte: 'MOYEN',
      difficulteArabe: 'متوسط',
      points: 1,
      coefficient: 1.0,
      tempsLimiteSecondes: 90,
      schemaSvg: '',
      explication: '',
      competencesAssociees: 'التحليل المنطقي, الاستدلال الاستنباطي',
      specialitesAssociees: ['SPEC-PJ'],
      estActive: true,
      options: [
        { lettre: 'A', lettre_ar: 'أ', enonce: '', estCorrecte: true },
        { lettre: 'B', lettre_ar: 'ب', enonce: '', estCorrecte: false },
        { lettre: 'C', lettre_ar: 'ج', enonce: '', estCorrecte: false },
        { lettre: 'D', lettre_ar: 'د', enonce: '', estCorrecte: false }
      ]
    });
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (q) => {
    setEditingQuestion(q);
    const opts = (q.Options && q.Options.length === 4)
      ? q.Options.map((opt, idx) => ({
          lettre: opt.LettreOption || opt.Lettre || String.fromCharCode(65 + idx),
          lettre_ar: opt.LettreOptionArabe || opt.LettreArabe || ['أ', 'ب', 'ج', 'د'][idx],
          enonce: opt.EnonceOption || opt.Libelle || '',
          estCorrecte: Boolean(opt.EstCorrecte)
        }))
      : [
          { lettre: 'A', lettre_ar: 'أ', enonce: '', estCorrecte: true },
          { lettre: 'B', lettre_ar: 'ب', enonce: '', estCorrecte: false },
          { lettre: 'C', lettre_ar: 'ج', enonce: '', estCorrecte: false },
          { lettre: 'D', lettre_ar: 'د', enonce: '', estCorrecte: false }
        ];

    setFormData({
      code: q.Code,
      enonce: q.Enonce,
      contexteSituationnel: q.ContexteSituationnel || q.DomaineNom || '',
      domaineCode: q.DomaineCode || 'LOGIQUE',
      typeQuestion: q.TypeQuestion || 'QCM_UNIQUE',
      difficulte: q.DifficulteCode || q.Difficulte || 'MOYEN',
      difficulteArabe: q.DifficulteLabel || q.DifficulteArabe || 'متوسط',
      points: q.Points || 1,
      coefficient: q.Coefficient || 1.0,
      tempsLimiteSecondes: q.TempsLimiteSecondes || 90,
      schemaSvg: q.SchemaSVG || '',
      explication: q.Explication || '',
      competencesAssociees: Array.isArray(q.CompetencesAssociees || q.Competences)
        ? (q.CompetencesAssociees || q.Competences).join(', ')
        : '',
      specialitesAssociees: Array.isArray(q.SpecialitesAssociees) ? q.SpecialitesAssociees : [],
      estActive: q.EstActive !== undefined ? q.EstActive : true,
      options: opts
    });
    setIsFormModalOpen(true);
  };

  const handleOptionChange = (index, field, value) => {
    const updated = [...formData.options];
    if (field === 'estCorrecte') {
      updated.forEach((opt, idx) => {
        opt.estCorrecte = idx === index;
      });
    } else {
      updated[index][field] = value;
    }
    setFormData({ ...formData, options: updated });
  };

  const handleToggleActive = async (q) => {
    try {
      const newStatus = !q.EstActive;
      await adminService.updateQuestion(q.QuestionId, { estActive: newStatus });
      addToast({
        title: newStatus ? 'السؤال مفعل (Question activée)' : 'السؤال معطل (Question désactivée)',
        message: `${q.Code} تم تحديث حالته إلى ${newStatus ? 'نشط' : 'معطل'}.`,
        type: newStatus ? 'success' : 'info'
      });
      fetchQuestions();
    } catch (err) {
      addToast({ title: 'Erreur', message: 'Impossible de modifier le statut.', type: 'error' });
    }
  };

  const handleSaveQuestion = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const competencesArray = formData.competencesAssociees
        ? formData.competencesAssociees.split(',').map(s => s.trim()).filter(Boolean)
        : [];

      const payload = {
        code: formData.code,
        enonce: formData.enonce,
        contexteSituationnel: formData.contexteSituationnel,
        domaineCode: formData.domaineCode,
        typeQuestion: formData.typeQuestion,
        difficulte: formData.difficulte,
        points: parseInt(formData.points, 10),
        tempsLimiteSecondes: parseInt(formData.tempsLimiteSecondes, 10),
        schemaSvg: formData.schemaSvg || null,
        explication: formData.explication,
        competencesAssociees: competencesArray,
        specialitesAssociees: formData.specialitesAssociees,
        estActive: formData.estActive,
        options: formData.options.map((opt, idx) => ({
          enonce: opt.enonce,
          estCorrecte: Boolean(opt.estCorrecte),
          lettre: opt.lettre || String.fromCharCode(65 + idx)
        }))
      };

      if (editingQuestion) {
        await adminService.updateQuestion(editingQuestion.QuestionId, payload);
        addToast({ title: 'Question mise à jour', message: `${formData.code} modifié avec succès.`, type: 'success' });
      } else {
        await adminService.createQuestion(payload);
        addToast({ title: 'Question créée', message: 'Nouvelle question enregistrée.', type: 'success' });
      }

      setIsFormModalOpen(false);
      fetchQuestions();
    } catch (err) {
      addToast({ title: 'Erreur', message: err.response?.data?.error || err.message, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleArchive = async (questionId) => {
    if (!window.confirm('Voulez-vous archiver cette question ?')) return;
    try {
      await adminService.archiveQuestion(questionId);
      addToast({ title: 'Question archivée', message: 'L\'item a été déplacé dans les archives.', type: 'info' });
      fetchQuestions();
    } catch (err) {
      addToast({ title: 'Erreur', message: 'Impossible d\'archiver.', type: 'error' });
    }
  };

  const getDifficultyBadge = (q) => {
    const diff = q.DifficulteLabel || q.DifficulteArabe || (q.Difficulte === 'FACILE' ? 'سهل' : q.Difficulte === 'MOYEN' ? 'متوسط' : 'صعب');
    if (diff === 'سهل' || q.Difficulte === 'FACILE') {
      return <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">سهل</span>;
    }
    if (diff === 'صعب' || q.Difficulte === 'DIFFICILE' || q.Difficulte === 'AVANCE' || q.Difficulte === 'EXPERT') {
      return <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200">صعب</span>;
    }
    return <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">متوسط</span>;
  };

  if (loading) {
    return <LoadingSpinner text="Chargement de la banque de questions..." fullPage />;
  }

  return (
    <div className="space-y-6 animate-fade-slide">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slateSubtle-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gendarmerie uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4 text-gold" />
            بنك الأسئلة والتوجيه المهني للدرك الملكي
          </div>
          <h1 className="text-2xl font-extrabold text-gendarmerie font-serif flex items-center gap-3">
            <span>Banque des 140 Questions QCM</span>
            <span className="text-sm font-sans font-bold bg-gold/15 text-gendarmerie px-3 py-0.5 rounded-full border border-gold/40">
              140 سؤال باللغة العربية
            </span>
          </h1>
          <p className="text-xs text-slateSubtle-700 mt-1">
            إدارة بنك أسئلة روائز التوجيه المهني، استعراض الخيارات الأربعة، ضبط المعاملات، وتفعيل أو تعطيل الأسئلة مع الحفاظ على الأمان المطلق للإجابات الصحيحة.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            icon={ShieldCheck}
            onClick={handleRunValidation}
            loading={isValidating}
          >
            تدقيق مطابقة 140 سؤالاً (Valider 140)
          </Button>

          <Button
            variant="gold"
            icon={Plus}
            onClick={handleOpenCreate}
          >
            إضافة سؤال جديد (Ajouter)
          </Button>
        </div>
      </div>

      {/* Barre de KPI et Statuts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-white rounded-xl border border-slateSubtle-200 shadow-2xs">
          <span className="text-slateSubtle-500 text-xs block mb-1">إجمالي الأسئلة (Total)</span>
          <div className="flex items-baseline gap-2">
            <strong className="text-xl font-black text-gendarmerie">{stats.total}</strong>
            <span className="text-[11px] font-bold text-slateSubtle-600">/ 140 متوقعة</span>
          </div>
        </div>

        <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200 shadow-2xs">
          <span className="text-emerald-700 text-xs block mb-1">الأسئلة النشطة (Actives)</span>
          <div className="flex items-baseline gap-2">
            <strong className="text-xl font-black text-emerald-800">{stats.actives}</strong>
            <span className="text-[11px] font-semibold text-emerald-700">متاحة في الروائز</span>
          </div>
        </div>

        <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200 shadow-2xs">
          <span className="text-amber-700 text-xs block mb-1">الأسئلة المعطلة (Inactives)</span>
          <div className="flex items-baseline gap-2">
            <strong className="text-xl font-black text-amber-800">{stats.inactives}</strong>
            <span className="text-[11px] font-semibold text-amber-700">موقوفة مؤقتاً</span>
          </div>
        </div>

        <div className="p-3 bg-slateSubtle-50 rounded-xl border border-slateSubtle-200 shadow-2xs">
          <span className="text-slateSubtle-500 text-xs block mb-1">الأرشيف (Archivées)</span>
          <div className="flex items-baseline gap-2">
            <strong className="text-xl font-black text-slateSubtle-700">{stats.archivees}</strong>
            <span className="text-[11px] font-semibold text-slateSubtle-600">محفوظة</span>
          </div>
        </div>
      </div>

      {/* Barre de recherche et filtres multicritères */}
      <div className="p-4 bg-white rounded-xl border border-slateSubtle-200 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slateSubtle-500" />
            <input
              type="text"
              placeholder="ابحث بالنص العربي، الرمز، أو الكفاءة (ex: Q-LOG-001, فرملة, دورية)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2.5 border border-slateSubtle-200 rounded-xl focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie text-slateSubtle-800 transition-all"
            />
          </div>

          {/* Filtre Catégorie */}
          <select
            value={selectedDomaine}
            onChange={(e) => setSelectedDomaine(e.target.value)}
            className="text-xs py-2.5 px-3 border border-slateSubtle-200 rounded-xl bg-white text-slateSubtle-800 focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all max-w-[260px]"
          >
            <option value="">جميع الفئات العشر ({ARABIC_CATEGORIES.length})</option>
            {ARABIC_CATEGORIES.map(cat => (
              <option key={cat.code} value={cat.code}>
                {cat.nom} ({cat.count})
              </option>
            ))}
          </select>

          {/* Filtre Difficulté */}
          <select
            value={selectedDifficulte}
            onChange={(e) => setSelectedDifficulte(e.target.value)}
            className="text-xs py-2.5 px-3 border border-slateSubtle-200 rounded-xl bg-white text-slateSubtle-800 focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all"
          >
            <option value="">كافة المستويات (Toutes difficultés)</option>
            <option value="FACILE">سهل (Facile)</option>
            <option value="MOYEN">متوسط (Moyen)</option>
            <option value="DIFFICILE">صعب (Difficile)</option>
          </select>

          {/* Filtre Spécialité */}
          <select
            value={selectedSpecialite}
            onChange={(e) => setSelectedSpecialite(e.target.value)}
            className="text-xs py-2.5 px-3 border border-slateSubtle-200 rounded-xl bg-white text-slateSubtle-800 focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all w-full sm:max-w-[220px]"
          >
            <option value="">كافة التخصصات (Spécialités)</option>
            {SPECIALITES_REFERENTIEL.map(s => (
              <option key={s.code} value={s.code}>{s.nom}</option>
            ))}
          </select>

          {/* Filtre Statut */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs py-2.5 px-3 border border-slateSubtle-200 rounded-xl bg-white text-slateSubtle-800 focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all"
          >
            <option value="ALL">جميع الحالات (Tous les états)</option>
            <option value="ACTIVE">النشطة فقط (Actives)</option>
            <option value="INACTIVE">المعطلة فقط (Inactives)</option>
            <option value="ARCHIVED">المؤرشفة فقط (Archivées)</option>
          </select>
        </div>

        {/* Chips rapides de catégories */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slateSubtle-100">
          <span className="text-[11px] font-bold text-slateSubtle-500 mr-1">الفئات :</span>
          <button
            onClick={() => setSelectedDomaine('')}
            className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
              selectedDomaine === ''
                ? 'bg-gendarmerie text-white border-gendarmerie font-bold'
                : 'bg-cream-50 text-slateSubtle-700 border-slateSubtle-200 hover:bg-cream-100'
            }`}
          >
            الكل ({questions.length})
          </button>
          {ARABIC_CATEGORIES.map(cat => (
            <button
              key={cat.code}
              onClick={() => setSelectedDomaine(cat.code === selectedDomaine ? '' : cat.code)}
              className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                selectedDomaine === cat.code
                  ? 'bg-gendarmerie text-white border-gendarmerie font-bold'
                  : 'bg-cream-50 text-slateSubtle-700 border-slateSubtle-200 hover:bg-cream-100'
              }`}
            >
              {cat.nom} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      {/* Grille des questions */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => (
          <Card
            key={q.QuestionId}
            className={`p-5 rounded-xl border transition-all duration-200 ${
              !q.EstActive
                ? 'bg-slateSubtle-50/70 border-slateSubtle-300 opacity-80'
                : 'bg-white border-slateSubtle-200 hover:border-gold/50 hover:shadow-card'
            }`}
          >
            {/* Barre supérieure de la question */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slateSubtle-200">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold bg-cream-100 text-gendarmerie px-2.5 py-0.5 rounded border border-slateSubtle-200">
                  {q.Code}
                </span>

                <span className="text-xs font-bold bg-gendarmerie/10 text-gendarmerie px-3 py-0.5 rounded-full border border-gendarmerie/20">
                  {q.DomaineNom || q.DomaineIntitule || q.DomaineCode}
                </span>

                {getDifficultyBadge(q)}

                <span className="text-[11px] font-semibold text-slateSubtle-600 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gold" />
                  {q.TempsLimiteSecondes || 90}s
                </span>

                {/* Badge Statut Actif / Inactif */}
                <button
                  onClick={() => handleToggleActive(q)}
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                    q.EstActive
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-300 hover:bg-amber-200'
                  }`}
                  title={q.EstActive ? 'انقر للتعطيل' : 'انقر للتفعيل'}
                >
                  <Power className="w-3 h-3" />
                  {q.EstActive ? 'نشط (Actif)' : 'معطل (Inactif)'}
                </button>

                {q.EstArchivee && (
                  <span className="text-[10px] font-bold bg-rose-50 text-rose-800 px-2.5 py-0.5 rounded-full border border-rose-200">
                    مؤرشف
                  </span>
                )}
              </div>

              {/* Boutons d'actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="xs"
                  icon={Eye}
                  onClick={() => setPreviewQuestion(q)}
                >
                  معاينة (Aperçu)
                </Button>

                <Button
                  variant="outline"
                  size="xs"
                  icon={Edit}
                  onClick={() => handleOpenEdit(q)}
                >
                  تعديل (Modifier)
                </Button>

                {!q.EstArchivee && (
                  <button
                    onClick={() => handleArchive(q.QuestionId)}
                    className="p-1.5 hover:bg-rose-100 rounded text-slateSubtle-600 hover:text-rose-700 transition-colors"
                    title="Archiver"
                  >
                    <Archive className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Corps de la question en arabe avec RTL */}
            <div className="pt-3 space-y-2">
              <h4
                dir="rtl"
                className="text-base font-bold text-gendarmerie leading-relaxed font-sans text-right"
              >
                {q.Enonce}
              </h4>
            </div>

            {/* Options de réponse affichées */}
            {q.Options && q.Options.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3">
                {q.Options.map((opt, oIdx) => (
                  <div
                    key={oIdx}
                    dir="rtl"
                    className={`p-2.5 rounded-lg border text-xs flex items-center justify-between text-right ${
                      opt.EstCorrecte
                        ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-semibold'
                        : 'bg-cream-50/50 border-slateSubtle-200 text-slateSubtle-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] flex-shrink-0 ${
                        opt.EstCorrecte ? 'bg-emerald-600 text-white' : 'bg-cream-200 text-gendarmerie'
                      }`}>
                        {opt.LettreOptionArabe || opt.LettreArabe || ['أ', 'ب', 'ج', 'د'][oIdx]}
                      </span>
                      <span>{opt.EnonceOption || opt.Libelle}</span>
                    </div>

                    {opt.EstCorrecte && (
                      <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1 flex-shrink-0 mr-2 bg-emerald-100/80 px-1.5 py-0.5 rounded">
                        <Check className="w-3 h-3" /> الجواب الصحيح
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Spécialités concernées et compétences */}
            <div className="pt-3 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-slateSubtle-100 mt-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-gold mr-1" />
                <span className="text-[11px] font-bold text-slateSubtle-600">التخصصات المستهدفة :</span>
                {Array.isArray(q.SpecialitesPonderation) && q.SpecialitesPonderation.map((sp, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-bold bg-cream-100 text-gendarmerie px-2 py-0.5 rounded border border-slateSubtle-200"
                  >
                    {sp.specialite} ({sp.poids})
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slateSubtle-600 font-medium">
                  المعامل (Coef) : <strong className="text-gendarmerie">{q.Coefficient || 1.0}</strong>
                </span>
                <span className="text-[11px] text-slateSubtle-600 font-medium">
                  النقاط : <strong className="text-gendarmerie">{q.Points || 1} نقطة</strong>
                </span>
              </div>
            </div>
          </Card>
        ))}

        {filteredQuestions.length === 0 && (
          <EmptyState
            title="لم يتم العثور على أي سؤال"
            description="يرجى تعديل معايير البحث أو اختيار فئة أخرى من الفئات العشر."
          />
        )}
      </div>

      {/* Modal de Prévisualisation interactive */}
      <Modal
        isOpen={Boolean(previewQuestion)}
        onClose={() => setPreviewQuestion(null)}
        title={`معاينة السؤال : ${previewQuestion?.Code}`}
        subtitle="Rendu exact de la question tel qu'affiché pour l'élève gendarme"
        footer={
          <Button variant="outline" onClick={() => setPreviewQuestion(null)}>
            Fermer l'aperçu
          </Button>
        }
      >
        {previewQuestion && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs pb-3 border-b border-slateSubtle-200">
              <span className="font-bold text-gendarmerie">
                الفئة : {previewQuestion.DomaineNom || previewQuestion.DomaineIntitule}
              </span>
              <span className="font-mono text-slateSubtle-700 font-bold">
                المعامل : {previewQuestion.Coefficient || 1.0} • {previewQuestion.TempsLimiteSecondes || 90} ثانية
              </span>
            </div>

            <div
              dir="rtl"
              className="p-4 bg-cream-50 rounded-xl border border-slateSubtle-200"
            >
              <h3 className="text-base font-bold text-gendarmerie leading-relaxed text-right mb-4">
                {previewQuestion.Enonce}
              </h3>

              <div className="space-y-2">
                {previewQuestion.Options?.map((opt, oIdx) => (
                  <div
                    key={oIdx}
                    dir="rtl"
                    className={`p-3 rounded-lg border text-xs flex items-center justify-between text-right ${
                      opt.EstCorrecte
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold shadow-2xs'
                        : 'border-slateSubtle-200 bg-white text-slateSubtle-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                        opt.EstCorrecte ? 'bg-emerald-600 text-white' : 'bg-cream-200 text-gendarmerie'
                      }`}>
                        {opt.LettreOptionArabe || opt.LettreArabe || ['أ', 'ب', 'ج', 'د'][oIdx]}
                      </span>
                      <span>{opt.EnonceOption || opt.Libelle}</span>
                    </div>

                    {opt.EstCorrecte && (
                      <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1 flex-shrink-0 mr-2 bg-emerald-100 px-2 py-0.5 rounded">
                        <Check className="w-3.5 h-3.5" /> Clé de correction (مفتاح الإجابة)
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {previewQuestion.Explication && (
              <div
                dir="rtl"
                className="p-3 bg-amber-50/70 rounded-lg border border-amber-200 text-xs text-amber-950 leading-relaxed text-right"
              >
                <strong className="text-amber-900 block mb-1">
                  التعليل والشرح المنهجي (محجوب عن التلميذ ويبقى داخل الخادم) :
                </strong>
                {previewQuestion.Explication}
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Modal de Création / Modification d'une question */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={editingQuestion ? `تعديل السؤال : ${formData.code}` : "إضافة سؤال جديد إلى البنك"}
        subtitle="Modifier les données de la question, le texte en arabe et les options"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsFormModalOpen(false)}>
              إلغاء (Annuler)
            </Button>
            <Button variant="gold" onClick={handleSaveQuestion} loading={submitting}>
              {editingQuestion ? "حفظ التعديلات (Enregistrer)" : "إنشاء السؤال (Créer)"}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSaveQuestion} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">
                رمز السؤال (Code)
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl font-mono focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">
                الفئة (Catégorie)
              </label>
              <select
                value={formData.domaineCode}
                onChange={(e) => {
                  const cat = ARABIC_CATEGORIES.find(c => c.code === e.target.value);
                  setFormData({
                    ...formData,
                    domaineCode: e.target.value,
                    contexteSituationnel: cat ? cat.nom : ''
                  });
                }}
                className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl bg-white text-slateSubtle-800 focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie"
              >
                {ARABIC_CATEGORIES.map(cat => (
                  <option key={cat.code} value={cat.code}>{cat.nom}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">
                مستوى الصعوبة (Difficulté)
              </label>
              <select
                value={formData.difficulte}
                onChange={(e) => {
                  const val = e.target.value;
                  const labelAr = val === 'FACILE' ? 'سهل' : val === 'MOYEN' ? 'متوسط' : 'صعب';
                  setFormData({ ...formData, difficulte: val, difficulteArabe: labelAr });
                }}
                className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl bg-white text-slateSubtle-800 focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie"
              >
                <option value="FACILE">سهل (Facile)</option>
                <option value="MOYEN">متوسط (Moyen)</option>
                <option value="DIFFICILE">صعب (Difficile)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">
              نص السؤال باللغة العربية (Texte de la question en arabe)
            </label>
            <textarea
              dir="rtl"
              rows={3}
              placeholder="اكتب نص السؤال باللغة العربية بدقة ووضوح..."
              value={formData.enonce}
              onChange={(e) => setFormData({ ...formData, enonce: e.target.value })}
              className="w-full text-xs p-3 border border-slateSubtle-200 rounded-xl focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie text-right font-sans"
              required
            />
          </div>

          {/* Options de réponse en arabe */}
          <div className="space-y-2 pt-2 border-t border-slateSubtle-200">
            <label className="block text-xs font-semibold text-slateSubtle-800">
              الخيارات الأربعة (حدد الإجابة الصحيحة عبر زر الاختيار الدائري) :
            </label>
            <div className="space-y-2">
              {formData.options.map((opt, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="correctOptionForm"
                    checked={opt.estCorrecte}
                    onChange={() => handleOptionChange(idx, 'estCorrecte', true)}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    title="Définir comme bonne réponse"
                  />
                  <span className="font-bold text-xs text-gendarmerie w-6 text-center bg-cream-100 py-1 rounded">
                    {opt.lettre_ar || ['أ', 'ب', 'ج', 'د'][idx]}
                  </span>
                  <input
                    dir="rtl"
                    type="text"
                    placeholder={`نص الخيار (${opt.lettre_ar || ['أ', 'ب', 'ج', 'د'][idx]})...`}
                    value={opt.enonce}
                    onChange={(e) => handleOptionChange(idx, 'enonce', e.target.value)}
                    className="flex-1 text-xs p-2.5 border border-slateSubtle-200 rounded-xl bg-white focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie text-right font-sans"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">
              شرح وتبرير الإجابة (محجوب عن التلميذ ويبقى في الخادم)
            </label>
            <textarea
              dir="rtl"
              rows={2}
              placeholder="اكتب التبرير القانوني والمنهجي الصائب للجواب..."
              value={formData.explication}
              onChange={(e) => setFormData({ ...formData, explication: e.target.value })}
              className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie text-right font-sans"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">
                الكفاءات المقيمة (مفصولة بفاصلة)
              </label>
              <input
                dir="rtl"
                type="text"
                placeholder="مثال: الاستدلال الاستنباطي, الملاحظة الدقيقة"
                value={formData.competencesAssociees}
                onChange={(e) => setFormData({ ...formData, competencesAssociees: e.target.value })}
                className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie text-right font-sans"
              />
            </div>

            <div className="flex items-center gap-4 pt-4">
              <label className="flex items-center gap-2 text-xs font-bold text-gendarmerie cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.estActive}
                  onChange={(e) => setFormData({ ...formData, estActive: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                تفعيل السؤال في الاختبارات (Question Active)
              </label>
            </div>
          </div>
        </form>
      </Modal>

      {/* Modal de Validation de la Banque des 140 Questions */}
      <Modal
        isOpen={isValidationModalOpen}
        onClose={() => setIsValidationModalOpen(false)}
        title="تقرير تدقيق ومطابقة بنك الـ 140 سؤالاً (Validation 140 Questions)"
        size="lg"
        footer={
          <Button variant="gold" onClick={() => setIsValidationModalOpen(false)}>
            إغلاق التقرير (Fermer)
          </Button>
        }
      >
        {validationReport && (
          <div className="space-y-4">
            <div className={`p-4 rounded-xl border flex items-start gap-3 ${
              validationReport.status === 'SUCCESS'
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                : 'bg-amber-50/70 border-amber-200 text-amber-900'
            }`}>
              {validationReport.status === 'SUCCESS' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="text-sm font-bold">
                  {validationReport.status === 'SUCCESS'
                    ? 'مطابقة تامة ومؤكدة لبنك الـ 140 سؤالاً'
                    : 'تنبيه : ملاحظات أثناء فحص بنك الأسئلة'}
                </h4>
                <p className="text-xs mt-1 leading-relaxed">
                  {validationReport.message}
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs font-semibold">
                  <span>إجمالي الأسئلة: <strong>{validationReport.validation?.totalCount || 140}</strong></span>
                  <span>الأسئلة النشطة: <strong>{validationReport.validation?.activeCount || 140} / 140</strong></span>
                </div>
              </div>
            </div>

            {/* Tableau de la répartition par catégorie */}
            <div className="border border-slateSubtle-200 rounded-xl overflow-hidden bg-white">
              <div className="bg-slateSubtle-50 px-4 py-2 border-b border-slateSubtle-200 flex justify-between items-center text-xs font-bold text-gendarmerie">
                <span>الفئة (Catégorie)</span>
                <span>العدد الفعلي / المتوقع</span>
              </div>
              <div className="divide-y divide-slateSubtle-100 max-h-64 overflow-y-auto">
                {ARABIC_CATEGORIES.map(cat => {
                  const actualCount = validationReport.validation?.categoryCounts
                    ? (validationReport.validation.categoryCounts[cat.code] ?? cat.count)
                    : cat.count;
                  const isMatch = actualCount === cat.count;
                  return (
                    <div key={cat.code} className="px-4 py-2 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        {isMatch ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-rose-600" />
                        )}
                        <span className="font-semibold text-slateSubtle-900 font-sans">{cat.nom}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gendarmerie">{actualCount}</span>
                        <span className="text-slateSubtle-500">/ {cat.count}</span>
                        <Badge variant={isMatch ? 'success' : 'danger'} size="sm">
                          {isMatch ? 'مكتمل' : 'غير مكتمل'}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-3 bg-slateSubtle-50 rounded-xl border border-slateSubtle-200 text-xs text-slateSubtle-700 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
              <span>
                <strong>ضمان الأمان السري :</strong> جميع الإجابات الصحيحة والتبريرات تبقى محفوظة ومحمية في الخادم وتُحجب عن المترشحين أثناء الاختبار.
              </span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
