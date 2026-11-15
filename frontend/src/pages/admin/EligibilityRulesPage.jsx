import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService.js';
import { useToast } from '../../context/ToastContext.jsx';
import {
  Sliders,
  ShieldAlert,
  CheckCircle2,
  Plus,
  Trash2,
  Edit,
  Save,
  HelpCircle,
  AlertTriangle,
  Scale,
  Calendar,
  FileCheck2,
  Info
} from 'lucide-react';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import Badge from '../../components/common/Badge.jsx';
import Modal from '../../components/common/Modal.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

export default function EligibilityRulesPage() {
  const [specialties, setSpecialties] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCondition, setEditingCondition] = useState(null);

  const [formData, setFormData] = useState({
    specialiteId: '',
    typeCondition: 'TAILLE_MIN',
    cibleCondition: 'TailleCm',
    operateur: '>=',
    seuil: '180',
    estObligatoire: true,
    sourceOfficielle: '',
    dateValidation: new Date().toISOString().split('T')[0],
    statutValidation: 'VALIDEE_OFFICIELLE',
    description: ''
  });

  const { addToast } = useToast();

  const loadData = async () => {
    try {
      setLoading(true);
      const [specData, condData] = await Promise.all([
        adminService.getSpecialties(),
        adminService.getConditions()
      ]);
      setSpecialties(specData.specialites || []);
      setConditions(condData || []);
    } catch (err) {
      console.error('Erreur chargement critères:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = (defaultSpecId = '') => {
    setEditingCondition(null);
    setFormData({
      specialiteId: defaultSpecId || (specialties[0]?.SpecialiteId || '1'),
      typeCondition: 'TAILLE_MIN',
      cibleCondition: 'TailleCm',
      operateur: '>=',
      seuil: '180',
      estObligatoire: true,
      sourceOfficielle: '',
      dateValidation: new Date().toISOString().split('T')[0],
      statutValidation: 'VALIDEE_OFFICIELLE',
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cond) => {
    setEditingCondition(cond);
    setFormData({
      conditionId: cond.ConditionId,
      specialiteId: cond.SpecialiteId,
      typeCondition: cond.TypeCondition,
      cibleCondition: cond.CibleCondition,
      operateur: cond.Operateur,
      seuil: cond.Seuil,
      estObligatoire: cond.EstObligatoire,
      sourceOfficielle: cond.SourceOfficielle || '',
      dateValidation: cond.DateValidation ? cond.DateValidation.split('T')[0] : '',
      statutValidation: cond.StatutValidation || 'VALIDEE_OFFICIELLE',
      description: cond.Description
    });
    setIsModalOpen(true);
  };

  const handleTypeChange = (newType) => {
    let cible = 'TailleCm';
    let defaultSeuil = '180';
    let defaultDesc = '';

    if (newType === 'TAILLE_MIN') {
      cible = 'TailleCm';
      defaultSeuil = '180';
      defaultDesc = 'Taille minimale requise';
    } else if (newType === 'TAILLE_MAX') {
      cible = 'TailleCm';
      defaultSeuil = '195';
      defaultDesc = 'Taille maximale autorisée';
    } else if (newType === 'AGE_MIN') {
      cible = 'Age';
      defaultSeuil = '20';
      defaultDesc = 'Âge minimum réglementaire de service';
    } else if (newType === 'AGE_MAX') {
      cible = 'Age';
      defaultSeuil = '35';
      defaultDesc = 'Âge maximum réglementaire pour recrutement spécialité';
    } else if (newType === 'POIDS_MEDICAL' || newType === 'POIDS_MAX') {
      cible = 'PoidsKg';
      defaultSeuil = '95';
      defaultDesc = 'Poids corporel médical indicatif pour la visite d\'aptitude';
    } else if (newType === 'POIDS_MIN') {
      cible = 'PoidsKg';
      defaultSeuil = '55';
      defaultDesc = 'Poids corporel minimum indicatif';
    } else if (newType === 'VISION') {
      cible = 'VisionSIGYCOP_Y';
      defaultSeuil = '2';
      defaultDesc = 'Contrôle vision SIGYCOP Y <= 2';
    } else if (newType === 'VISION_ACUITE') {
      cible = 'AcuiteVisuelle';
      defaultSeuil = '10/10';
      defaultDesc = 'Acuité visuelle minimale mesurée (ex: 10/10)';
    } else if (newType === 'APTITUDE_PHYSIQUE') {
      cible = 'AptitudePhysique';
      defaultSeuil = '14.0';
      defaultDesc = 'Note sportive minimale de 14.0/20';
    } else if (newType === 'NOTE_MIN_FORMATION') {
      cible = 'NoteFormationPro';
      defaultSeuil = '13.5';
      defaultDesc = 'Moyenne générale de formation minimale';
    } else if (newType === 'NOTE_MIN_MATIERE') {
      cible = 'ProcedurePenale';
      defaultSeuil = '12.0';
      defaultDesc = 'Note minimale dans la matière spécifique';
    } else if (newType === 'MEDICAL') {
      cible = 'StatutMedical';
      defaultSeuil = 'SIGYCOP_VALIDE';
      defaultDesc = 'Profil SIGYCOP strictement valide';
    }

    setFormData({
      ...formData,
      typeCondition: newType,
      cibleCondition: cible,
      seuil: defaultSeuil,
      description: defaultDesc
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCondition) {
        await adminService.updateCondition(formData);
        addToast({ title: 'Règle modifiée', message: 'La condition d\'éligibilité a été mise à jour.', type: 'success' });
      } else {
        await adminService.createCondition(formData);
        addToast({ title: 'Règle ajoutée', message: 'Nouvelle condition d\'éligibilité enregistrée.', type: 'success' });
      }
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      addToast({ title: 'Erreur', message: err.response?.data?.error || err.message, type: 'error' });
    }
  };

  const handleDelete = async (condId) => {
    if (!window.confirm('Confirmer la suppression de cette condition d\'éligibilité ?')) return;
    try {
      await adminService.deleteCondition(condId);
      addToast({ title: 'Règle supprimée', message: 'La condition a été retirée.', type: 'info' });
      loadData();
    } catch (err) {
      addToast({ title: 'Erreur', message: 'Impossible de supprimer la condition.', type: 'error' });
    }
  };

  if (loading) {
    return <LoadingSpinner text="Chargement des critères d'éligibilité réglementaires..." fullPage />;
  }

  return (
    <div className="space-y-6 animate-fade-slide">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slateSubtle-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gendarmerie uppercase tracking-wider mb-1">
            <Sliders className="w-4 h-4 text-gold" />
            Paramétrage Réglementaire & Conditions Couperets
          </div>
          <h1 className="text-2xl font-extrabold text-gendarmerie font-serif">
            Conditions d'Éligibilité par Spécialité
          </h1>
          <p className="text-xs text-slateSubtle-700">
            Critères physiques, médicaux, vision et académiques. Gestion des sources officielles et des paramètres de démonstration.
          </p>
        </div>

        <Button
          variant="gold"
          icon={Plus}
          onClick={() => handleOpenAdd()}
        >
          Ajouter une Règle
        </Button>
      </div>

      {/* Avertissement Déontologique et Institutionnel */}
      <div className="p-4 rounded-xl bg-amber-50/70 border border-gold/30 shadow-2xs text-xs text-amber-900 flex items-start gap-3">
        <Info className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-bold text-amber-950 block">Directives Réglementaires d'Affectation :</strong>
          <p>
            Les seuils de taille minimale de <strong>180 cm</strong> pour <em>MOTARD</em>, <em>GEH</em> et <em>GSI</em> sont configurés à titre de <strong>paramètres provisoires de démonstration</strong> demandés par le commanditaire. Ils ne constituent pas des critères officiellement homologués.
          </p>
          <p className="text-[11px] text-amber-800">
            Le poids n'est jamais évalué sur la base d'un IMC générique automatique. Tout critère médical doit émaner d'un certificat d'aptitude délivré par les médecins militaires agréés.
          </p>
        </div>
      </div>

      {/* Liste des spécialités avec leurs conditions respectives */}
      <div className="space-y-6">
        {specialties.map((spec) => {
          const specConds = conditions.filter(c => c.SpecialiteId === spec.SpecialiteId);
          return (
            <Card
              key={spec.SpecialiteId}
              className="rounded-xl border border-slateSubtle-200 shadow-2xs"
              title={spec.Intitule}
              subtitle={`${spec.Subdivision} • Réf: ${spec.Code}`}
              headerAction={
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-slateSubtle-600">
                    {specConds.length} critère{specConds.length > 1 ? 's' : ''}
                  </span>
                  <Button
                    variant="outline"
                    size="xs"
                    icon={Plus}
                    onClick={() => handleOpenAdd(spec.SpecialiteId)}
                  >
                    Ajouter
                  </Button>
                </div>
              }
            >
              <div className="overflow-x-auto table-responsive-container">
                <table className="w-full text-left text-xs min-w-[700px]">
                  <thead>
                    <tr className="border-b border-slateSubtle-200 bg-cream-50 text-slateSubtle-700 font-semibold uppercase tracking-wider text-[11px]">
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Cible / Paramètre</th>
                      <th className="py-2.5 px-3 text-center">Op.</th>
                      <th className="py-2.5 px-3">Seuil</th>
                      <th className="py-2.5 px-3">Nature</th>
                      <th className="py-2.5 px-3">Statut & Source</th>
                      <th className="py-2.5 px-3">Libellé Explicatif</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slateSubtle-100">
                    {specConds.map((cond) => (
                      <tr key={cond.ConditionId} className="hover:bg-cream-50/50">
                        <td className="py-2.5 px-3 font-semibold text-gendarmerie font-mono">
                          {cond.TypeCondition}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-slateSubtle-800">
                          {cond.CibleCondition}
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-gold-dark">
                          {cond.Operateur}
                        </td>
                        <td className="py-2.5 px-3 font-mono font-bold text-gendarmerie">
                          {cond.Seuil}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${
                            cond.EstObligatoire
                              ? 'bg-rose-50 text-rose-800 border-rose-200'
                              : 'bg-cream-100 text-slateSubtle-700 border-slateSubtle-200'
                          }`}>
                            {cond.EstObligatoire ? 'Obligatoire' : 'Indicatif'}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          {cond.StatutValidation === 'PROVISOIRE_DEMO' ? (
                            <div className="space-y-0.5">
                              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                                Provisoire Démo
                              </span>
                              <span className="block text-[10px] text-slateSubtle-600 truncate max-w-[150px]" title={cond.SourceOfficielle}>
                                {cond.SourceOfficielle}
                              </span>
                            </div>
                          ) : (
                            <div className="space-y-0.5">
                              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                Officielle
                              </span>
                              <span className="block text-[10px] text-slateSubtle-600 truncate max-w-[150px]" title={cond.SourceOfficielle}>
                                {cond.SourceOfficielle}
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-slateSubtle-800 font-medium max-w-xs">
                          {cond.Description}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEdit(cond)}
                              className="p-1 hover:bg-cream-200 rounded text-slateSubtle-700 hover:text-gendarmerie"
                              title="Modifier la condition"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(cond.ConditionId)}
                              className="p-1 hover:bg-rose-100 rounded text-slateSubtle-700 hover:text-rose-700"
                              title="Supprimer la condition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {specConds.length === 0 && (
                      <tr>
                        <td colSpan={8} className="py-4 text-center text-slateSubtle-600 italic">
                          Aucune condition spécifique définie pour cette filière.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Modal d'ajout / modification de règle */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCondition ? "Modifier la Condition d'Éligibilité" : "Ajouter une Condition d'Éligibilité"}
        subtitle="Définition des critères d'admission et sources officielles"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Annuler
            </Button>
            <Button variant="gold" onClick={handleSubmit}>
              {editingCondition ? "Enregistrer" : "Créer la règle"}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">
              Spécialité concernée
            </label>
            <select
              value={formData.specialiteId}
              onChange={(e) => setFormData({ ...formData, specialiteId: e.target.value })}
              className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl bg-white text-slateSubtle-800 focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all"
              required
            >
              {specialties.map(s => (
                <option key={s.SpecialiteId} value={s.SpecialiteId}>
                  {s.Intitule} ({s.Code})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">
                Type de Condition
              </label>
              <select
                value={formData.typeCondition}
                onChange={(e) => handleTypeChange(e.target.value)}
                className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl bg-white text-slateSubtle-800 focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all"
              >
                <option value="TAILLE_MIN">Taille minimale (cm)</option>
                <option value="TAILLE_MAX">Taille maximale (cm)</option>
                <option value="AGE_MIN">Âge minimum réglementaire (ans)</option>
                <option value="AGE_MAX">Âge maximum réglementaire (ans)</option>
                <option value="POIDS_MEDICAL">Poids corporel indicatif (kg)</option>
                <option value="POIDS_MIN">Poids minimal (kg)</option>
                <option value="POIDS_MAX">Poids maximal (kg)</option>
                <option value="VISION">Contrôle de la vision (SIGYCOP Y)</option>
                <option value="VISION_ACUITE">Acuité visuelle (dixièmes - ex: 10/10)</option>
                <option value="APTITUDE_PHYSIQUE">Aptitude physique / Sport</option>
                <option value="NOTE_MIN_FORMATION">Note minimale de formation générale</option>
                <option value="NOTE_MIN_MATIERE">Note minimale dans une matière</option>
                <option value="MEDICAL">Aptitude médicale SIGYCOP</option>
                <option value="COMPETENCE_TECHNIQUE">Compétence technique obligatoire</option>
                <option value="AUTRE">Autre condition</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">
                Paramètre / Cible
              </label>
              <input
                type="text"
                value={formData.cibleCondition}
                onChange={(e) => setFormData({ ...formData, cibleCondition: e.target.value })}
                className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl font-mono focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">
                Opérateur
              </label>
              <select
                value={formData.operateur}
                onChange={(e) => setFormData({ ...formData, operateur: e.target.value })}
                className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl bg-white font-mono text-slateSubtle-800 focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all"
              >
                <option value=">=">&gt;= (Supérieur ou égal)</option>
                <option value="<=">&lt;= (Inférieur ou égal)</option>
                <option value="==">== (Strictement égal)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">
                Seuil Réglementaire
              </label>
              <input
                type="text"
                value={formData.seuil}
                onChange={(e) => setFormData({ ...formData, seuil: e.target.value })}
                className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl font-mono font-bold focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">
                Statut de Validation
              </label>
              <select
                value={formData.statutValidation}
                onChange={(e) => setFormData({ ...formData, statutValidation: e.target.value })}
                className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl bg-white text-slateSubtle-800 focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all"
              >
                <option value="VALIDEE_OFFICIELLE">Validée Officielle (Texte réglementaire)</option>
                <option value="PROVISOIRE_DEMO">Provisoire Démo (Paramètre de démonstration)</option>
                <option value="A_VERIFIER">À vérifier (En attente d'homologation)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">
                Source Officielle
              </label>
              <input
                type="text"
                placeholder="Ex: Instruction N° 2100/DEF/GEND/RH"
                value={formData.sourceOfficielle}
                onChange={(e) => setFormData({ ...formData, sourceOfficielle: e.target.value })}
                className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">
              Libellé Explicatif de la Règle
            </label>
            <input
              type="text"
              placeholder="Ex: Taille minimale indicative de 180 cm pour le protocole d'escorte"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all"
              required
            />
          </div>

          <label className="flex items-center gap-3 p-3 rounded-xl border border-slateSubtle-200 bg-cream-50 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.estObligatoire}
              onChange={(e) => setFormData({ ...formData, estObligatoire: e.target.checked })}
              className="w-4 h-4 rounded text-gendarmerie focus:ring-gold/30"
            />
            <span className="text-xs font-medium text-slateSubtle-800">
              Condition obligatoire (si non satisfaite, empêche l'éligibilité immédiate)
            </span>
          </label>
        </form>
      </Modal>
    </div>
  );
}
