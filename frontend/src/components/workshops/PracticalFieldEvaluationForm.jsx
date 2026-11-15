import React, { useState, useEffect, useMemo } from 'react';
import {
  Wrench,
  Cpu,
  Radio,
  Boxes,
  Award,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  User,
  GraduationCap,
  Shield,
  Save,
  RotateCcw,
  Tag,
  Check,
  Edit3,
  Calendar,
  AlertTriangle,
  History
} from 'lucide-react';
import Card from '../common/Card.jsx';
import Button from '../common/Button.jsx';
import Badge from '../common/Badge.jsx';
import LoadingSpinner from '../common/LoadingSpinner.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { talentPlatformService } from '../../services/talentPlatformService.js';
import { workshopService } from '../../services/workshopService.js';

// Référentiel des domaines pratiques
const DOMAINES_OPTIONS = [
  { id: 'CAT-INFO', label: 'Informatique & Réseaux (SIC / Cyber)', icon: Cpu },
  { id: 'CAT-MECA', label: 'Maintenance Mécanique & Électronique Automobile', icon: Wrench },
  { id: 'CAT-TELECOM', label: 'Électronique & Télécommunications Tactiques', icon: Radio },
  { id: 'CAT-LOG', label: 'Logistique & Gestion des Équipements', icon: Boxes }
];

// Référentiel des 7 spécialités officielles
const SPECIALITES_OFFICIELLES = [
  { code: 'SPEC-TERR', label: 'SPEC-TERR — Gendarmerie Territoriale' },
  { code: 'SPEC-MOB', label: 'SPEC-MOB — Gendarmerie Mobile' },
  { code: 'SPEC-MARIT', label: 'SPEC-MARIT — Gendarmerie Maritime' },
  { code: 'SPEC-AIR', label: 'SPEC-AIR — Gendarmerie Aérienne' },
  { code: 'SPEC-PREV', label: 'SPEC-PREV — Prévôté Militaire' },
  { code: 'SPEC-PST', label: 'SPEC-PST — Police Scientifique et Technique' },
  { code: 'SPEC-INTERV', label: "SPEC-INTERV — Unités d'Intervention et Spécialisées" }
];

// Suggestions de compétences techniques par domaine
const SKILL_SUGGESTIONS = {
  'CAT-INFO': [
    'Diagnostic matériel & BIOS',
    'Câblage structuré RJ45',
    'Adressage IP & Routage',
    'Sécurisation des postes & OS',
    'Analyse de logs & forensic',
    'Bureautique avancée & Tableur'
  ],
  'CAT-MECA': [
    'Diagnostic valise OBD-II',
    'Circuit de refroidissement',
    'Freinage & Sécurité active',
    'Système d’injection diesel/essence',
    'Électricité automobile 12V/24V',
    'Contrôle trains roulants'
  ],
  'CAT-TELECOM': [
    'Émetteurs-récepteurs VHF/UHF',
    'Mesure ROS & Puissance HF',
    'Câblage coaxial & Antennes tactiques',
    'Micro-soudure électronique',
    'Chiffrement radio & Fréquences'
  ],
  'CAT-LOG': [
    'Gestion informatisée des stocks',
    'Traçabilité armement & optiques',
    'Maintenance préventive des infrastructures',
    'Sécurité des approvisionnements'
  ]
};

export default function PracticalFieldEvaluationForm({ onEvaluationSaved }) {
  const { showSuccessToast, showErrorToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Données référentielles chargées depuis SQL Server
  const [workshops, setWorkshops] = useState([]);
  const [students, setStudents] = useState([]);
  const [historyEvals, setHistoryEvals] = useState([]);

  // États du formulaire
  const [selectedDomain, setSelectedDomain] = useState('CAT-INFO');
  const [selectedWorkshopId, setSelectedWorkshopId] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [editingEvalId, setEditingEvalId] = useState(null);

  const [notePratique, setNotePratique] = useState('15');
  const [tempsMinutes, setTempsMinutes] = useState('45');
  const [niveauAutonomie, setNiveauAutonomie] = useState('AUTONOME'); // 'AUTONOME' | 'GUIDE' | 'ASSISTE'
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [customSkillInput, setCustomSkillInput] = useState('');
  const [observation, setObservation] = useState('');
  const [orientationSuggeree, setOrientationSuggeree] = useState('SPEC-PST');

  // Feedback post-enregistrement (résultat de la détection de talent)
  const [lastResultFeedback, setLastResultFeedback] = useState(null);

  // Chargement initial des données
  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [wsList, stList, evalsList] = await Promise.all([
        workshopService.getWorkshops(),
        talentPlatformService.getInstructorStudents(),
        talentPlatformService.getPracticalEvaluations({ limit: 50 })
      ]);

      setWorkshops(wsList || []);
      setStudents(stList || []);
      setHistoryEvals(evalsList?.evaluations || []);

      // Sélection par défaut du premier atelier correspondant au domaine
      const firstWs = (wsList || []).find(w => (w.CategoryId || w.categoryId) === selectedDomain);
      if (firstWs) {
        setSelectedWorkshopId(String(firstWs.WorkshopId || firstWs.AtelierId || firstWs.id));
      }

      // Sélection par défaut du premier élève
      if (stList && stList.length > 0) {
        setSelectedStudentId(String(stList[0].id));
      }
    } catch (err) {
      console.error('Erreur initialisation formulaire instructeur:', err);
      showErrorToast('Erreur lors du chargement des données SQL Server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Filtrage des ateliers selon le domaine sélectionné
  const filteredWorkshops = useMemo(() => {
    return workshops.filter(w => {
      const cat = w.CategoryId || w.categoryId;
      return cat === selectedDomain;
    });
  }, [workshops, selectedDomain]);

  // Synchronisation de l'atelier sélectionné lors du changement de domaine
  useEffect(() => {
    if (filteredWorkshops.length > 0 && !filteredWorkshops.some(w => String(w.WorkshopId || w.AtelierId || w.id) === String(selectedWorkshopId))) {
      setSelectedWorkshopId(String(filteredWorkshops[0].WorkshopId || filteredWorkshops[0].AtelierId || filteredWorkshops[0].id));
    }
  }, [filteredWorkshops, selectedDomain]);

  // Élève gendarme actuellement sélectionné
  const currentStudent = useMemo(() => {
    return students.find(s => String(s.id) === String(selectedStudentId));
  }, [students, selectedStudentId]);

  // Atelier actuellement sélectionné
  const currentWorkshop = useMemo(() => {
    return workshops.find(w => String(w.WorkshopId || w.AtelierId || w.id) === String(selectedWorkshopId));
  }, [workshops, selectedWorkshopId]);

  // Compétences suggérées pour le domaine actif
  const currentDomainSkills = useMemo(() => {
    return SKILL_SUGGESTIONS[selectedDomain] || [];
  }, [selectedDomain]);

  // Gestion des tags de compétences
  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const addCustomSkill = (e) => {
    e.preventDefault();
    const trimmed = customSkillInput.trim();
    if (trimmed && !selectedSkills.includes(trimmed)) {
      setSelectedSkills([...selectedSkills, trimmed]);
      setCustomSkillInput('');
    }
  };

  // Réinitialisation du formulaire
  const resetForm = () => {
    setEditingEvalId(null);
    setNotePratique('15');
    setTempsMinutes('45');
    setNiveauAutonomie('AUTONOME');
    setSelectedSkills([]);
    setObservation('');
    setOrientationSuggeree('SPEC-TERR');
    setLastResultFeedback(null);
  };

  // Chargement d'une évaluation pour modification
  const handleEditEvaluation = (ev) => {
    setEditingEvalId(ev.dbId);
    setSelectedStudentId(String(ev.studentId));
    if (ev.workshopId) setSelectedWorkshopId(String(ev.workshopId));
    if (ev.domaineCode) setSelectedDomain(ev.domaineCode);
    setNotePratique(String(ev.notePratique || 15));
    setTempsMinutes(String(ev.tempsMinutes || 45));
    setNiveauAutonomie(ev.niveauAutonomie || 'AUTONOME');
    setSelectedSkills(ev.competencesValidees || []);
    setObservation(ev.observations || '');
    setOrientationSuggeree(ev.orientationSuggereCode || 'SPEC-TERR');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Soumission et enregistrement SQL Server
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedStudentId) {
      showErrorToast("Veuillez sélectionner un élève gendarme.");
      return;
    }
    if (!selectedWorkshopId) {
      showErrorToast("Veuillez sélectionner un atelier pratique.");
      return;
    }

    const noteNum = parseFloat(notePratique);
    if (isNaN(noteNum) || noteNum < 0 || noteNum > 20) {
      showErrorToast("La note pratique doit être comprise entre 0 et 20.");
      return;
    }

    const tempsNum = parseInt(tempsMinutes, 10);
    if (isNaN(tempsNum) || tempsNum <= 0) {
      showErrorToast("Le temps de résolution doit être strictement supérieur à 0 minute.");
      return;
    }

    if (!niveauAutonomie) {
      showErrorToast("Le niveau d'autonomie est obligatoire.");
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        evaluationId: editingEvalId,
        studentId: parseInt(selectedStudentId, 10),
        workshopId: parseInt(selectedWorkshopId, 10),
        domaineCode: selectedDomain,
        notePratique: noteNum,
        tempsMinutes: tempsNum,
        niveauAutonomie,
        competencesValidees: selectedSkills,
        observation,
        orientationSuggeree
      };

      const res = await talentPlatformService.savePracticalEvaluation(payload);

      showSuccessToast(
        editingEvalId
          ? "Évaluation modifiée avec succès dans SQL Server."
          : "Évaluation enregistrée avec succès dans SQL Server."
      );

      setLastResultFeedback(res.preselection);

      // Recharger l'historique
      const updatedEvals = await talentPlatformService.getPracticalEvaluations({ limit: 50 });
      setHistoryEvals(updatedEvals?.evaluations || []);

      if (onEvaluationSaved) {
        onEvaluationSaved(res);
      }

      // Si c'était une création, réinitialiser les champs de saisie
      if (!editingEvalId) {
        setNotePratique('15');
        setTempsMinutes('45');
        setSelectedSkills([]);
        setObservation('');
      } else {
        setEditingEvalId(null);
      }
    } catch (err) {
      console.error('Erreur enregistrement évaluation:', err);
      showErrorToast(err.response?.data?.error || err.message || "Erreur lors de l'enregistrement SQL.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12 flex justify-center items-center">
        <LoadingSpinner text="Chargement du référentiel des ateliers et élèves..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Alerte / Bannière de résultat du moteur de détection */}
      {lastResultFeedback && (
        <div className={`p-4 rounded-xl border ${
          lastResultFeedback.statutPreselection === 'TALENT_CACHE'
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-900'
            : lastResultFeedback.statutPreselection === 'SPECIALISTE_CONFIRME'
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900'
            : 'bg-blue-500/10 border-blue-500/30 text-blue-900'
        } transition-all`}>
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-bold text-sm">
                  Actualisation du profil & de la pré-sélection :
                </span>
                <Badge
                  type={
                    lastResultFeedback.statutPreselection === 'TALENT_CACHE'
                      ? 'WARNING'
                      : lastResultFeedback.statutPreselection === 'SPECIALISTE_CONFIRME'
                      ? 'SUCCESS'
                      : 'INFO'
                  }
                  label={lastResultFeedback.statutLabel || lastResultFeedback.statutPreselection}
                  size="sm"
                />
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/80 border">
                  Spécialité suggérée : {lastResultFeedback.specialiteProposeeCode}
                </span>
              </div>
              <p className="text-xs leading-relaxed opacity-90">
                {lastResultFeedback.explication}
              </p>
            </div>
            <button
              onClick={() => setLastResultFeedback(null)}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Formulaire Principal d'Évaluation Pratique */}
      <Card
        title={editingEvalId ? "Modification de l'Évaluation Pratique Terrain" : "Grille d'Évaluation Pratique Terrain"}
        subtitle="Saisie opérationnelle de la séance pratique, validation des compétences et détection des aptitudes"
        icon={Award}
      >
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Ligne 1 : Sélection Domaine & Atelier */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                1. Domaine Technique de l'Atelier
              </label>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="w-full text-sm rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-gendarmerie"
              >
                {DOMAINES_OPTIONS.map(d => (
                  <option key={d.id} value={d.id}>{d.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                2. Atelier Pratique (chargé depuis SQL Server)
              </label>
              <select
                value={selectedWorkshopId}
                onChange={(e) => setSelectedWorkshopId(e.target.value)}
                className="w-full text-sm rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-gendarmerie"
              >
                {filteredWorkshops.length === 0 ? (
                  <option value="">Aucun atelier disponible pour ce domaine</option>
                ) : (
                  filteredWorkshops.map(w => (
                    <option key={w.WorkshopId || w.AtelierId || w.id} value={w.WorkshopId || w.AtelierId || w.id}>
                      [{w.Code || `ATEL-${w.WorkshopId}`}] {w.Titre || w.titre} ({w.DureeMinutes || 60} min)
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          {/* Ligne 2 : Sélection Élève Gendarme & Carte d'identité */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              3. Élève Gendarme Évalué
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <div className="md:col-span-1">
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full text-sm rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-gendarmerie"
                >
                  {students.map(st => (
                    <option key={st.id} value={st.id}>
                      {st.nom?.toUpperCase()} {st.prenom} ({st.matricule})
                    </option>
                  ))}
                </select>
              </div>

              {/* Fiche récapitulative de l'élève */}
              {currentStudent && (
                <div className="md:col-span-2 p-3 bg-cream-50 rounded-xl border border-cream-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gendarmerie/10 border border-gendarmerie/30 flex items-center justify-center font-bold text-gendarmerie text-sm">
                      {currentStudent.nom?.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">
                        {currentStudent.prenom} {currentStudent.nom?.toUpperCase()}
                      </div>
                      <div className="text-xs text-slate-600 flex items-center gap-2">
                        <span>Matricule: <strong className="text-slate-800">{currentStudent.matricule}</strong></span>
                        <span>•</span>
                        <span>{currentStudent.promotion || '54ème Promotion'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge
                      type={currentStudent.filiereEntree === 'SPECIALISTE_ISTA' ? 'SUCCESS' : 'INFO'}
                      label={currentStudent.filiereLabel || (currentStudent.filiereEntree === 'SPECIALISTE_ISTA' ? 'Spécialiste ISTA' : 'Niveau Bac')}
                      size="sm"
                    />
                    {currentStudent.diplomeOrigine && (
                      <span className="text-[11px] text-slate-600 bg-white px-2 py-1 rounded border border-slate-200 max-w-[200px] truncate" title={currentStudent.diplomeOrigine}>
                        🎓 {currentStudent.diplomeOrigine}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-5">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-gold" /> Grille de Notation & Critères d'Exécution
            </h4>

            {/* Note & Temps de résolution */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Note sur 20 */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700">Note Pratique sur 20</label>
                  <span className="text-lg font-black text-gendarmerie">
                    {parseFloat(notePratique).toFixed(1)} <span className="text-xs text-slate-500 font-normal">/ 20</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="0.5"
                  value={notePratique}
                  onChange={(e) => setNotePratique(e.target.value)}
                  className="w-full accent-gendarmerie cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>0 (Échec)</span>
                  <span>10 (Moyenne)</span>
                  <span>15 (Seuil Talent)</span>
                  <span>20 (Parfait)</span>
                </div>
              </div>

              {/* Temps de résolution */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700">Temps de Résolution</label>
                  <span className="text-sm font-bold text-slate-800 flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gold" /> {tempsMinutes} min
                  </span>
                </div>
                <input
                  type="number"
                  min="1"
                  max="300"
                  value={tempsMinutes}
                  onChange={(e) => setTempsMinutes(e.target.value)}
                  className="w-full text-sm rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-gendarmerie"
                  placeholder="Ex: 45"
                  required
                />
                <span className="text-[10px] text-slate-500 block mt-1">
                  Durée standard atelier : {currentWorkshop?.DureeMinutes || 60} minutes
                </span>
              </div>

              {/* Niveau d'autonomie */}
              <div className="sm:col-span-2 md:col-span-1 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Niveau d'Autonomie Observé
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'AUTONOME', label: 'Autonome', color: 'emerald' },
                    { id: 'GUIDE', label: 'Guidé', color: 'blue' },
                    { id: 'ASSISTE', label: 'Assisté', color: 'amber' }
                  ].map(lvl => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setNiveauAutonomie(lvl.id)}
                      className={`text-xs py-2 px-1 rounded-lg font-semibold transition-all text-center border ${
                        niveauAutonomie === lvl.id
                          ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-xs'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
                <span className="text-[10px] text-slate-500 block mt-1.5">
                  {niveauAutonomie === 'AUTONOME' && "Exécution fluide sans solliciter le formateur (éligible Talent Caché)."}
                  {niveauAutonomie === 'GUIDE' && "Nécessite des rappels de procédure ponctuels."}
                  {niveauAutonomie === 'ASSISTE' && "Guidage pas-à-pas continu indispensable."}
                </span>
              </div>
            </div>

            {/* Compétences techniques validées sous forme de tags sélectionnables */}
            <div className="mt-5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Compétences Techniques Validées (cliquer pour activer)</span>
                <span className="text-[11px] font-normal text-slate-500">
                  {selectedSkills.length} compétence(s) sélectionnée(s)
                </span>
              </label>

              <div className="flex flex-wrap gap-2 mb-3">
                {currentDomainSkills.map(skill => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all flex items-center gap-1.5 border ${
                        isSelected
                          ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {isSelected ? <Check className="w-3.5 h-3.5" /> : <Tag className="w-3 h-3 text-slate-400" />}
                      <span>{skill}</span>
                    </button>
                  );
                })}
              </div>

              {/* Ajout d'une compétence personnalisée */}
              <div className="flex gap-2 max-w-md">
                <input
                  type="text"
                  value={customSkillInput}
                  onChange={(e) => setCustomSkillInput(e.target.value)}
                  placeholder="Ajouter une autre compétence spécifique..."
                  className="flex-1 text-xs rounded-lg border border-slate-300 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-gendarmerie"
                />
                <button
                  type="button"
                  onClick={addCustomSkill}
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-medium"
                >
                  Ajouter tag
                </button>
              </div>
            </div>

            {/* Orientation Suggérée & Observations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Orientation Métier Suggérée par la Commission
                </label>
                <select
                  value={orientationSuggeree}
                  onChange={(e) => setOrientationSuggeree(e.target.value)}
                  className="w-full text-sm rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-gendarmerie"
                >
                  {SPECIALITES_OFFICIELLES.map(s => (
                    <option key={s.code} value={s.code}>{s.label}</option>
                  ))}
                </select>
                <span className="text-[10px] text-slate-500 block mt-1">
                  Recommandation consultative transmise à la commission de pré-sélection.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Observations Qualitatives du Formateur
                </label>
                <textarea
                  value={observation}
                  onChange={(e) => setObservation(e.target.value)}
                  rows="2"
                  placeholder="Renseigner les points remarquables, posture professionnelle, rigueur sécuritaire..."
                  className="w-full text-xs rounded-lg border border-slate-300 p-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-gendarmerie"
                />
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            {editingEvalId ? (
              <button
                type="button"
                onClick={resetForm}
                className="text-xs text-rose-600 hover:text-rose-800 font-medium flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Annuler la modification
              </button>
            ) : (
              <span className="text-xs text-slate-500 italic">
                Enregistrement direct et persistant dans SQL Server `OrientGR_DB`.
              </span>
            )}

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={resetForm}
              >
                Réinitialiser
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                loading={submitting}
                className="bg-[#1B4332] hover:bg-[#153B2B] text-white"
              >
                <Save className="w-4 h-4 mr-1.5" />
                {editingEvalId ? "Mettre à jour l'évaluation SQL" : "Enregistrer l'évaluation pratique"}
              </Button>
            </div>
          </div>
        </form>
      </Card>

      {/* Tableau de l'Historique des Évaluations Pratiques Enregistrées */}
      <Card
        title="Historique des Évaluations Pratiques Récentes"
        subtitle="Consultation des fiches enregistrées par les évaluateurs sur la base SQL Server"
        icon={History}
      >
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Élève</th>
                <th className="py-2.5 px-3">Atelier & Domaine</th>
                <th className="py-2.5 px-3 text-center">Note / 20</th>
                <th className="py-2.5 px-3 text-center">Temps</th>
                <th className="py-2.5 px-3 text-center">Autonomie</th>
                <th className="py-2.5 px-3">Compétences Validées</th>
                <th className="py-2.5 px-3">Évaluateur</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {historyEvals.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-6 text-center text-slate-500 italic">
                    Aucune évaluation pratique de terrain enregistrée pour le moment.
                  </td>
                </tr>
              ) : (
                historyEvals.map((ev) => (
                  <tr key={ev.dbId || ev.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2 px-3 text-slate-500 whitespace-nowrap">
                      {new Date(ev.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                    </td>
                    <td className="py-2 px-3">
                      <div className="font-bold text-slate-900">{ev.studentNom} {ev.studentPrenom}</div>
                      <div className="text-[10px] text-slate-500">{ev.studentMatricule}</div>
                    </td>
                    <td className="py-2 px-3">
                      <div className="font-semibold text-slate-800 truncate max-w-[200px]" title={ev.workshopTitre}>
                        {ev.workshopTitre || ev.workshopCode || 'Atelier'}
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {ev.domaineCode}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className={`font-black text-sm ${
                        (ev.notePratique || 0) >= 15 ? 'text-emerald-700' : (ev.notePratique || 0) >= 10 ? 'text-blue-700' : 'text-rose-700'
                      }`}>
                        {ev.notePratique !== null ? ev.notePratique : '—'}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-center text-slate-700 font-medium whitespace-nowrap">
                      {ev.tempsMinutes ? `${ev.tempsMinutes} min` : '—'}
                    </td>
                    <td className="py-2 px-3 text-center">
                      <Badge
                        type={ev.niveauAutonomie === 'AUTONOME' ? 'SUCCESS' : ev.niveauAutonomie === 'GUIDE' ? 'INFO' : 'WARNING'}
                        label={ev.niveauAutonomie || 'GUIDE'}
                        size="xs"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex flex-wrap gap-1 max-w-[220px]">
                        {(ev.competencesValidees || []).slice(0, 2).map((c, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200 truncate max-w-[120px]">
                            {c}
                          </span>
                        ))}
                        {(ev.competencesValidees || []).length > 2 && (
                          <span className="text-[10px] text-slate-500 font-medium">
                            +{(ev.competencesValidees || []).length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-3 text-slate-600 text-[11px] whitespace-nowrap">
                      {ev.instructorName}
                    </td>
                    <td className="py-2 px-3 text-center">
                      <button
                        onClick={() => handleEditEvaluation(ev)}
                        className="p-1 rounded hover:bg-slate-200 text-slate-700 transition"
                        title="Modifier l'évaluation"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

