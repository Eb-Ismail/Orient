import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService.js';
import { useToast } from '../../context/ToastContext.jsx';
import {
  Shield,
  Search,
  ShieldAlert,
  Users,
  Mountain,
  Gauge,
  Terminal,
  Anchor,
  Edit,
  Plus,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  GraduationCap,
  Briefcase,
  FileText,
  ShieldCheck,
  Bike,
  Award,
  Crosshair,
  Microscope,
  Sliders,
  Scale
} from 'lucide-react';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import Badge from '../../components/common/Badge.jsx';
import Modal from '../../components/common/Modal.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

export default function SpecialtiesManagementPage() {
  const [specialties, setSpecialties] = useState([]);
  const [domaines, setDomaines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubdivision, setSelectedSubdivision] = useState('');

  // Modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingSpec, setEditingSpec] = useState(null);

  // Formulaire d'édition / création
  const [formData, setFormData] = useState({
    code: '',
    intitule: '',
    subdivision: 'Gendarmerie Départementale',
    description: '',
    missionsPrincipales: '',
    icone: 'Shield',
    placesDisponibles: 10,
    estActive: true,
    poidsNotesAcademiques: 0.25,
    poidsRaisonnement: 0.30,
    poidsCompetencesSpecifiques: 0.25,
    poidsSituationsPro: 0.20
  });

  const { addToast } = useToast();

  const iconMap = {
    Search,
    ShieldAlert,
    Users,
    Mountain,
    Gauge,
    Terminal,
    Anchor,
    GraduationCap,
    Briefcase,
    FileText,
    ShieldCheck,
    Bike,
    Award,
    Crosshair,
    Microscope,
    Shield
  };

  const fetchSpecialties = async () => {
    try {
      setLoading(true);
      const data = await adminService.getSpecialties();
      setSpecialties(data.specialites || []);
      setDomaines(data.domaines || []);
    } catch (err) {
      console.error('Erreur chargement spécialités:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const handleOpenEdit = (spec) => {
    setEditingSpec(spec);
    setFormData({
      specialiteId: spec.SpecialiteId,
      code: spec.Code,
      intitule: spec.Intitule,
      subdivision: spec.Subdivision,
      description: spec.Description,
      missionsPrincipales: spec.MissionsPrincipales,
      icone: spec.Icone,
      placesDisponibles: spec.PlacesDisponibles,
      estActive: spec.EstActive,
      poidsNotesAcademiques: spec.PoidsNotesAcademiques ?? 0.25,
      poidsRaisonnement: spec.PoidsRaisonnement ?? 0.30,
      poidsCompetencesSpecifiques: spec.PoidsCompetencesSpecifiques ?? 0.25,
      poidsSituationsPro: spec.PoidsSituationsPro ?? 0.20
    });
    setIsEditModalOpen(true);
  };

  const handleOpenCreate = () => {
    setFormData({
      code: 'SPEC-',
      intitule: '',
      subdivision: 'Gendarmerie Départementale',
      description: '',
      missionsPrincipales: '',
      icone: 'Shield',
      placesDisponibles: 10,
      estActive: true,
      poidsNotesAcademiques: 0.25,
      poidsRaisonnement: 0.30,
      poidsCompetencesSpecifiques: 0.25,
      poidsSituationsPro: 0.20
    });
    setIsCreateModalOpen(true);
  };

  const weightsSum = Math.round((
    (parseFloat(formData.poidsNotesAcademiques) || 0) +
    (parseFloat(formData.poidsRaisonnement) || 0) +
    (parseFloat(formData.poidsCompetencesSpecifiques) || 0) +
    (parseFloat(formData.poidsSituationsPro) || 0)
  ) * 100);

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingSpec) return;
    try {
      await adminService.updateSpecialty(formData);
      addToast({
        title: 'Spécialité mise à jour',
        message: `${formData.intitule} : paramètres, quotas et coefficients enregistrés.`,
        type: 'success'
      });
      setIsEditModalOpen(false);
      setEditingSpec(null);
      fetchSpecialties();
    } catch (err) {
      addToast({ title: 'Erreur', message: err.response?.data?.error || err.message, type: 'error' });
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminService.createSpecialty(formData);
      addToast({
        title: 'Spécialité créée',
        message: `La filière ${formData.intitule} a été intégrée au référentiel.`,
        type: 'success'
      });
      setIsCreateModalOpen(false);
      fetchSpecialties();
    } catch (err) {
      addToast({ title: 'Erreur', message: err.response?.data?.error || err.message, type: 'error' });
    }
  };

  // Filtrage
  const filteredSpecialties = specialties.filter(spec => {
    const matchesSearch = !searchTerm.trim() ||
      spec.Intitule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spec.Code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spec.Description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSub = !selectedSubdivision || spec.Subdivision === selectedSubdivision;
    return matchesSearch && matchesSub;
  });

  const subdivisions = Array.from(new Set(specialties.map(s => s.Subdivision))).filter(Boolean);

  if (loading) {
    return <LoadingSpinner text="Chargement du référentiel des spécialités..." fullPage />;
  }

  return (
    <div className="space-y-6 animate-fade-slide">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-gendarmerie uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4 text-gold" />
            Référentiel des Métiers & Algorithme d'Orientation
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gendarmerie font-serif">
            Gestion Dynamique des Spécialités
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Filières opérationnelles, critères de notation multicritères et conditions d'accès réglementaires.
          </p>
        </div>

        <Button
          variant="gold"
          icon={Plus}
          onClick={handleOpenCreate}
        >
          Ajouter une Spécialité
        </Button>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher une spécialité, code ou mission..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-sm pl-10 pr-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie text-slate-800 bg-white transition-colors"
          />
        </div>

        <select
          value={selectedSubdivision}
          onChange={(e) => setSelectedSubdivision(e.target.value)}
          className="text-sm py-2.5 px-3.5 border border-slate-200 rounded-xl bg-white text-slate-800 focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-colors"
        >
          <option value="">Toutes les subdivisions ({specialties.length})</option>
          {subdivisions.map(sub => (
            <option key={sub} value={sub}>{sub}</option>
          ))}
        </select>
      </div>

      {/* Grille des spécialités */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSpecialties.map((spec) => {
          const IconComponent = iconMap[spec.Icone] || Shield;
          return (
            <Card key={spec.SpecialiteId} className="p-6 space-y-4 rounded-2xl border border-slate-200/90 hover:border-gold/50 shadow-xs transition-all duration-200">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-gold flex-shrink-0 shadow-2xs">
                    <IconComponent className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gendarmerie leading-snug">
                      {spec.Intitule}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-mono font-bold bg-slate-100 text-gendarmerie px-2.5 py-0.5 rounded border border-slate-200">
                        {spec.Code}
                      </span>
                      <span className="text-xs text-slate-600 font-medium">
                        {spec.Subdivision}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  icon={Edit}
                  onClick={() => handleOpenEdit(spec)}
                >
                  Configurer
                </Button>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {spec.Description}
              </p>

              {/* Critères de notation configurables */}
              <div className="p-3 rounded-lg bg-cream-50 border border-slateSubtle-200 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-gendarmerie uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <Sliders className="w-3.5 h-3.5 text-gold" />
                    Pondérations de Notation :
                  </span>
                  <span className="font-mono text-slateSubtle-700 text-[10px]">
                    Total: {Math.round(((spec.PoidsNotesAcademiques || 0.25) + (spec.PoidsRaisonnement || 0.3) + (spec.PoidsCompetencesSpecifiques || 0.25) + (spec.PoidsSituationsPro || 0.2)) * 100)}%
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                  <div className="bg-white p-1.5 rounded border border-slateSubtle-200">
                    <span className="text-slateSubtle-600 block">Notes Acad.</span>
                    <strong className="text-gendarmerie">{Math.round((spec.PoidsNotesAcademiques ?? 0.25) * 100)}%</strong>
                  </div>
                  <div className="bg-white p-1.5 rounded border border-slateSubtle-200">
                    <span className="text-slateSubtle-600 block">Raisonnement</span>
                    <strong className="text-gendarmerie">{Math.round((spec.PoidsRaisonnement ?? 0.30) * 100)}%</strong>
                  </div>
                  <div className="bg-white p-1.5 rounded border border-slateSubtle-200">
                    <span className="text-slateSubtle-600 block">Compétences</span>
                    <strong className="text-gendarmerie">{Math.round((spec.PoidsCompetencesSpecifiques ?? 0.25) * 100)}%</strong>
                  </div>
                  <div className="bg-white p-1.5 rounded border border-slateSubtle-200">
                    <span className="text-slateSubtle-600 block">Situations</span>
                    <strong className="text-gendarmerie">{Math.round((spec.PoidsSituationsPro ?? 0.20) * 100)}%</strong>
                  </div>
                </div>
              </div>

              {/* Conditions d'éligibilité requises */}
              <div className="space-y-1.5 pt-2 border-t border-slateSubtle-100">
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-gendarmerie flex items-center justify-between">
                  <span>Conditions d'Accès Réglementaires :</span>
                  <span className="text-[10px] text-slateSubtle-600 font-normal">
                    {spec.conditions?.length || 0} règle{(spec.conditions?.length || 0) > 1 ? 's' : ''}
                  </span>
                </h5>
                <ul className="space-y-1.5">
                  {spec.conditions?.map((c) => (
                    <li key={c.ConditionId} className="text-xs text-slateSubtle-800 flex items-start gap-2 bg-white p-1.5 rounded border border-slateSubtle-200/60">
                      <span className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${
                        c.StatutValidation === 'PROVISOIRE_DEMO' ? 'bg-amber-500' : 'bg-emerald-600'
                      }`} />
                      <div className="flex-1">
                        <span className="font-medium">{c.Description}</span>
                        {c.StatutValidation === 'PROVISOIRE_DEMO' && (
                          <span className="block text-[10px] text-amber-700 font-semibold italic">
                            * Paramètre provisoire de démonstration (non officiel)
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                  {(!spec.conditions || spec.conditions.length === 0) && (
                    <li className="text-xs text-slateSubtle-600 italic">
                      Conditions générales du classement en sortie d'école.
                    </li>
                  )}
                </ul>
              </div>

              {/* Footer de la carte */}
              <div className="pt-3 border-t border-slateSubtle-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slateSubtle-700">
                  Places offertes : <strong className="text-gendarmerie text-sm">{spec.PlacesDisponibles}</strong>
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                  spec.EstActive
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-cream-100 text-slateSubtle-700 border-slateSubtle-200'
                }`}>
                  {spec.EstActive ? 'Ouverte à la promotion' : 'Fermée'}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Modal d'édition des paramètres & coefficients */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Configuration : ${editingSpec?.Intitule}`}
        subtitle="Quotas, missions et pondérations de notation"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Annuler
            </Button>
            <Button variant="gold" onClick={handleSaveEdit}>
              Enregistrer les modifications
            </Button>
          </>
        }
      >
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">
                Intitulé officiel
              </label>
              <input
                type="text"
                value={formData.intitule}
                onChange={(e) => setFormData({ ...formData, intitule: e.target.value })}
                className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">
                Places offertes à la promotion
              </label>
              <input
                type="number"
                min="0"
                value={formData.placesDisponibles}
                onChange={(e) => setFormData({ ...formData, placesDisponibles: parseInt(e.target.value, 10) })}
                className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">
              Description opérationnelle
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all"
              required
            />
          </div>

          {/* Section Pondérations */}
          <div className="p-4 bg-cream-50 rounded-xl border border-slateSubtle-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gendarmerie uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-gold" />
                Poids Indicatifs de Notation (Total {weightsSum}%)
              </span>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                weightsSum === 100 ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-amber-100 text-amber-800 border-amber-200'
              }`}>
                {weightsSum === 100 ? 'Somme validée (100%)' : 'Attention : somme != 100%'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-medium text-slateSubtle-700 mb-1">Notes Académiques</label>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  max="1"
                  value={formData.poidsNotesAcademiques}
                  onChange={(e) => setFormData({ ...formData, poidsNotesAcademiques: parseFloat(e.target.value) || 0 })}
                  className="w-full text-xs p-2 border border-slateSubtle-200 rounded-xl bg-white focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slateSubtle-700 mb-1">Raisonnement / Logique</label>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  max="1"
                  value={formData.poidsRaisonnement}
                  onChange={(e) => setFormData({ ...formData, poidsRaisonnement: parseFloat(e.target.value) || 0 })}
                  className="w-full text-xs p-2 border border-slateSubtle-200 rounded-xl bg-white focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slateSubtle-700 mb-1">Compétences Spécifiques</label>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  max="1"
                  value={formData.poidsCompetencesSpecifiques}
                  onChange={(e) => setFormData({ ...formData, poidsCompetencesSpecifiques: parseFloat(e.target.value) || 0 })}
                  className="w-full text-xs p-2 border border-slateSubtle-200 rounded-xl bg-white focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slateSubtle-700 mb-1">Situations Pro</label>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  max="1"
                  value={formData.poidsSituationsPro}
                  onChange={(e) => setFormData({ ...formData, poidsSituationsPro: parseFloat(e.target.value) || 0 })}
                  className="w-full text-xs p-2 border border-slateSubtle-200 rounded-xl bg-white focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie"
                />
              </div>
            </div>
            <p className="text-[10px] text-slateSubtle-600 italic">
              * Les poids sont indicatifs et configurables par la commission. Le moteur normalise automatiquement la somme lors du calcul.
            </p>
          </div>

          <label className="flex items-center gap-3 p-3 rounded-xl border border-slateSubtle-200 bg-cream-50 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.estActive}
              onChange={(e) => setFormData({ ...formData, estActive: e.target.checked })}
              className="w-4 h-4 rounded text-gendarmerie focus:ring-gold/30"
            />
            <span className="text-xs font-medium text-slateSubtle-800">
              Spécialité active (ouverte au choix d'orientation des élèves)
            </span>
          </label>
        </form>
      </Modal>

      {/* Modal de création d'une nouvelle spécialité */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Créer une Nouvelle Spécialité"
        subtitle="Ajout d'une filière opérationnelle au référentiel"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Annuler
            </Button>
            <Button variant="gold" onClick={handleCreateSubmit}>
              Créer la spécialité
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">
                Code Référence (ex: SPEC-CYBER)
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl font-mono focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">
                Intitulé de la spécialité
              </label>
              <input
                type="text"
                placeholder="Ex: Secrétariat Informatique"
                value={formData.intitule}
                onChange={(e) => setFormData({ ...formData, intitule: e.target.value })}
                className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">
                Subdivision de rattachement
              </label>
              <select
                value={formData.subdivision}
                onChange={(e) => setFormData({ ...formData, subdivision: e.target.value })}
                className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl bg-white text-slateSubtle-800 focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all"
              >
                <option value="Gendarmerie Départementale">Gendarmerie Départementale</option>
                <option value="Gendarmerie Mobile">Gendarmerie Mobile</option>
                <option value="Garde Républicaine">Garde Républicaine</option>
                <option value="Sécurité des Mobilités">Sécurité des Mobilités</option>
                <option value="Appui Opérationnel & Numérique">Appui Opérationnel & Numérique</option>
                <option value="Formation Initiale & Continue">Formation Initiale & Continue</option>
                <option value="Police Technique & Scientifique">Police Technique & Scientifique</option>
                <option value="Intervention Spécialisée">Intervention Spécialisée</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">
                Places disponibles au classement
              </label>
              <input
                type="number"
                min="1"
                value={formData.placesDisponibles}
                onChange={(e) => setFormData({ ...formData, placesDisponibles: parseInt(e.target.value, 10) })}
                className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">
              Description de la filière
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all"
              required
            />
          </div>

          <div className="p-4 bg-cream-50 rounded-xl border border-slateSubtle-200">
            <span className="text-xs font-bold text-gendarmerie uppercase block mb-2">
              Pondérations par Défaut (25% Notes / 30% Logique / 25% Compétences / 20% Situations)
            </span>
            <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
              <div className="bg-white p-1.5 rounded-lg border border-slateSubtle-200">Notes: 25%</div>
              <div className="bg-white p-1.5 rounded-lg border border-slateSubtle-200">Logique: 30%</div>
              <div className="bg-white p-1.5 rounded-lg border border-slateSubtle-200">Spécifique: 25%</div>
              <div className="bg-white p-1.5 rounded-lg border border-slateSubtle-200">Situation: 20%</div>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
