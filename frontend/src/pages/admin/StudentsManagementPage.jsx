import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../services/adminService.js';
import { useToast } from '../../context/ToastContext.jsx';
import {
  Users,
  Search,
  Plus,
  Filter,
  Eye,
  Award,
  Shield,
  FileCheck2,
  Trash2,
  Mail,
  Hash
} from 'lucide-react';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import Badge from '../../components/common/Badge.jsx';
import Modal from '../../components/common/Modal.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

export default function StudentsManagementPage() {
  const [students, setStudents] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedPromotion, setSelectedPromotion] = useState('');
  const [selectedMedical, setSelectedMedical] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Données du formulaire d'ajout
  const [formData, setFormData] = useState({
    matricule: '',
    nom: '',
    prenom: '',
    email: '',
    promotionId: '1',
    noteFormationPro: '14.5',
    aptitudePhysique: '15.0',
    statutMedical: 'SIGYCOP_VALIDE',
    tailleCm: '180',
    visionSIGYCOP_Y: '1'
  });

  const { addToast } = useToast();
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const [studentsData, promosData] = await Promise.all([
        adminService.getStudents({
          promotionId: selectedPromotion || undefined,
          search: search || undefined,
          statutMedical: selectedMedical || undefined
        }),
        adminService.getPromotions()
      ]);
      setStudents(studentsData || []);
      setPromotions(promosData || []);
    } catch (err) {
      console.error('Erreur chargement élèves:', err);
      addToast({ title: 'Erreur', message: 'Impossible de charger les élèves.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [selectedPromotion, selectedMedical]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchStudents();
  };

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await adminService.createStudent(formData);
      addToast({
        title: 'Élève gendarme enregistré',
        message: `${formData.prenom} ${formData.nom} (${formData.matricule}) a été ajouté avec succès.`,
        type: 'success'
      });
      setIsAddModalOpen(false);
      setFormData({
        matricule: '',
        nom: '',
        prenom: '',
        email: '',
        promotionId: '1',
        noteFormationPro: '14.5',
        aptitudePhysique: '15.0',
        statutMedical: 'SIGYCOP_VALIDE',
        tailleCm: '180',
        visionSIGYCOP_Y: '1'
      });
      fetchStudents();
    } catch (err) {
      addToast({
        title: 'Erreur d\'enregistrement',
        message: err.response?.data?.error || err.message,
        type: 'error'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-slide">
      {/* Entête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-gendarmerie uppercase tracking-wider mb-1">
            <Users className="w-4 h-4 text-gold" />
            Gestion des Effectifs & Promotions
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gendarmerie font-serif">
            Registre des Élèves Gendarmes
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Consultation, notation et suivi des épreuves d'orientation par promotion.
          </p>
        </div>

        <Button
          variant="gold"
          icon={Plus}
          onClick={() => setIsAddModalOpen(true)}
        >
          Inscrire un Élève
        </Button>
      </div>

      {/* Barre de recherche et filtres */}
      <Card className="p-4 bg-white">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par nom, prénom, matricule ou e-mail..."
              className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie text-slate-800 transition-colors bg-white hover:border-slate-300"
            />
          </div>

          <select
            value={selectedPromotion}
            onChange={(e) => setSelectedPromotion(e.target.value)}
            className="text-sm py-2.5 px-3.5 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie text-slate-800 transition-colors hover:border-slate-300"
          >
            <option value="">Toutes les promotions</option>
            {promotions.map((p) => (
              <option key={p.PromotionId} value={p.PromotionId}>
                {p.Nom}
              </option>
            ))}
          </select>

          <select
            value={selectedMedical}
            onChange={(e) => setSelectedMedical(e.target.value)}
            className="text-sm py-2.5 px-3.5 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie text-slate-800 transition-colors hover:border-slate-300"
          >
            <option value="">Tous statuts SIGYCOP</option>
            <option value="SIGYCOP_VALIDE">SIGYCOP Apte</option>
            <option value="RESTRICTION_TEMPORAIRE">Restriction Temporaire</option>
          </select>
        </form>
      </Card>

      {/* Table des élèves */}
      <Card noPadding>
        {loading ? (
          <LoadingSpinner text="Chargement du registre..." />
        ) : students.length === 0 ? (
          <EmptyState
            title="Aucun élève trouvé"
            description="Modifiez vos critères de recherche ou inscrivez un nouvel élève gendarme."
            actionLabel="Réinitialiser les filtres"
            onAction={() => {
              setSearch('');
              setSelectedPromotion('');
              setSelectedMedical('');
            }}
          />
        ) : (
          <div className="overflow-x-auto table-responsive-container">
            <table className="w-full text-left text-sm min-w-[750px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-xs">
                  <th className="py-3.5 px-4">Élève Gendarme</th>
                  <th className="py-3.5 px-4">Promotion</th>
                  <th className="py-3.5 px-4 text-center">Rang</th>
                  <th className="py-3.5 px-4 text-center">Note Formation</th>
                  <th className="py-3.5 px-4 text-center">Sport /20</th>
                  <th className="py-3.5 px-4">SIGYCOP</th>
                  <th className="py-3.5 px-4 text-center">Statut Test</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((student) => (
                  <tr key={student.UtilisateurId} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-gendarmerie text-sm">
                        {student.nom} {student.prenom}
                      </div>
                      <div className="text-xs font-mono text-slate-500 mt-0.5">
                        {student.matricule} • {student.TailleCm ? `${student.TailleCm} cm` : 'Taille n.r.'} • Y={student.VisionSIGYCOP_Y || 1}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slateSubtle-800 max-w-[180px] truncate">
                      {student.promotionNom}
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-gendarmerie">
                      {student.classementInitial ? `${student.classementInitial}e` : '-'}
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-semibold">
                      {student.noteFormationPro ? `${student.noteFormationPro}/20` : '-'}
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-semibold">
                      {student.aptitudePhysique ? `${student.aptitudePhysique}/20` : '-'}
                    </td>
                    <td className="py-3 px-4">
                      <Badge type={student.statutMedical} size="xs" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge type={student.statutTest} size="xs" />
                      {student.scoreTest && (
                        <span className="block font-bold text-gendarmerie text-[10px] mt-0.5">
                          {student.scoreTest}%
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {student.statutTest === 'TERMINE' && (
                        <Button
                          variant="outline"
                          size="sm"
                          icon={Award}
                          onClick={() => navigate('/admin/resultats')}
                        >
                          Bilan
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Modal d'inscription d'un nouvel élève */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Inscrire un Élève Gendarme"
        subtitle="Enregistrement officiel dans le registre de promotion"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Annuler
            </Button>
            <Button variant="gold" onClick={handleCreateStudent} loading={submitting}>
              Enregistrer l'élève
            </Button>
          </>
        }
      >
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">Matricule</label>
              <input
                type="text"
                required
                value={formData.matricule}
                onChange={(e) => setFormData({ ...formData, matricule: e.target.value })}
                placeholder="ex: EG-2025-112"
                className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all hover:border-slateSubtle-300 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">Promotion</label>
              <select
                value={formData.promotionId}
                onChange={(e) => setFormData({ ...formData, promotionId: e.target.value })}
                className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all hover:border-slateSubtle-300 bg-white"
              >
                {promotions.map((p) => (
                  <option key={p.PromotionId} value={p.PromotionId}>
                    {p.Nom}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">Nom de famille</label>
              <input
                type="text"
                required
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                placeholder="DUPONT"
                className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all hover:border-slateSubtle-300"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">Prénom</label>
              <input
                type="text"
                required
                value={formData.prenom}
                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                placeholder="Marc"
                className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all hover:border-slateSubtle-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">E-mail institutionnel</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="marc.dupont@eleve.gendarmerie.fr"
              className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all hover:border-slateSubtle-300"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">Note Formation /20</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="20"
                value={formData.noteFormationPro}
                onChange={(e) => setFormData({ ...formData, noteFormationPro: e.target.value })}
                className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all hover:border-slateSubtle-300"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">Note Sport /20</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="20"
                value={formData.aptitudePhysique}
                onChange={(e) => setFormData({ ...formData, aptitudePhysique: e.target.value })}
                className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all hover:border-slateSubtle-300"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">Profil SIGYCOP</label>
              <select
                value={formData.statutMedical}
                onChange={(e) => setFormData({ ...formData, statutMedical: e.target.value })}
                className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all hover:border-slateSubtle-300 bg-white"
              >
                <option value="SIGYCOP_VALIDE">SIGYCOP Apte</option>
                <option value="RESTRICTION_TEMPORAIRE">Restriction</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">Taille mesurée (cm)</label>
              <input
                type="number"
                min="140"
                max="220"
                value={formData.tailleCm}
                onChange={(e) => setFormData({ ...formData, tailleCm: e.target.value })}
                placeholder="180"
                className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all hover:border-slateSubtle-300"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">Vision SIGYCOP (Y)</label>
              <select
                value={formData.visionSIGYCOP_Y}
                onChange={(e) => setFormData({ ...formData, visionSIGYCOP_Y: e.target.value })}
                className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all hover:border-slateSubtle-300 bg-white"
              >
                <option value="1">Y = 1 (Vision excellente)</option>
                <option value="2">Y = 2 (Vision conforme)</option>
                <option value="3">Y = 3 (Correction requise)</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
