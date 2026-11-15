import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService.js';
import { useToast } from '../../context/ToastContext.jsx';
import {
  GraduationCap,
  Plus,
  Calendar,
  Users,
  School,
  CheckCircle2,
  Clock
} from 'lucide-react';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import Modal from '../../components/common/Modal.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

export default function PromotionsManagementPage() {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [newPromo, setNewPromo] = useState({
    code: '',
    nom: '',
    ecole: 'École de Gendarmerie de Rochefort',
    dateDebut: '2025-09-01',
    dateFin: '2027-06-30',
    statut: 'PREPARATION',
    description: ''
  });

  const { addToast } = useToast();

  const fetchPromos = async () => {
    try {
      setLoading(true);
      const data = await adminService.getPromotions();
      setPromotions(data || []);
    } catch (err) {
      console.error('Erreur promotions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await adminService.createPromotion(newPromo);
      addToast({
        title: 'Promotion créée',
        message: `${newPromo.nom} enregistrée avec succès.`,
        type: 'success'
      });
      setIsModalOpen(false);
      setNewPromo({
        code: '',
        nom: '',
        ecole: 'École de Gendarmerie de Rochefort',
        dateDebut: '2025-09-01',
        dateFin: '2027-06-30',
        statut: 'PREPARATION',
        description: ''
      });
      fetchPromos();
    } catch (err) {
      addToast({ title: 'Erreur', message: err.message, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Chargement des promotions..." fullPage />;
  }

  return (
    <div className="space-y-6 animate-fade-slide">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slateSubtle-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gendarmerie uppercase tracking-wider mb-1">
            <GraduationCap className="w-4 h-4 text-gold" />
            Écoles de Formation Initiale
          </div>
          <h1 className="text-2xl font-extrabold text-gendarmerie font-serif">
            Gestion des Promotions d'Élèves Gendarmes
          </h1>
          <p className="text-xs text-slateSubtle-700">
            Suivi des cohortes de Rochefort, Chaumont, Montluçon, Châteaulin et Tulle.
          </p>
        </div>

        <Button
          variant="gold"
          icon={Plus}
          onClick={() => setIsModalOpen(true)}
        >
          Créer une Promotion
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {promotions.map((promo) => (
          <Card key={promo.PromotionId} className="p-6 space-y-4 rounded-xl border border-slateSubtle-200 hover:border-gold/50 hover:shadow-card transition-all duration-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slateSubtle-700">
                {promo.Code}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border shadow-2xs ${
                promo.Statut === 'ACTIVE'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : promo.Statut === 'PREPARATION'
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-cream-100 text-slateSubtle-700 border-slateSubtle-200'
              }`}>
                {promo.Statut}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-gendarmerie">
                {promo.Nom}
              </h3>
              <p className="text-xs text-gendarmerie font-medium flex items-center gap-1.5 mt-1">
                <School className="w-3.5 h-3.5 text-gold" />
                {promo.Ecole}
              </p>
            </div>

            <p className="text-xs text-slateSubtle-700 leading-relaxed">
              {promo.Description || "Promotion d'élèves gendarmes sous contrat en formation initiale."}
            </p>

            <div className="pt-3 border-t border-slateSubtle-100 flex items-center justify-between text-xs text-slateSubtle-700">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-gold" />
                Effectif : <strong>{promo.EffectifTotal} élèves</strong>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slateSubtle-700" />
                {new Date(promo.DateFin).getFullYear()}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal Création Promotion */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Créer une Promotion d'Élèves Gendarmes"
        subtitle="Ouverture d'une nouvelle cohorte d'instruction"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Annuler</Button>
            <Button variant="gold" onClick={handleCreate} loading={submitting}>Créer la promotion</Button>
          </>
        }
      >
        <form className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">Code Promotion</label>
            <input
              type="text"
              required
              value={newPromo.code}
              onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value })}
              placeholder="ex: PROM-2026-56"
              className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">Nom / Parrain de Promotion</label>
            <input
              type="text"
              required
              value={newPromo.nom}
              onChange={(e) => setNewPromo({ ...newPromo, nom: e.target.value })}
              placeholder="ex: 56ème Promotion - Gendarme..."
              className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">École de Rattachement</label>
            <select
              value={newPromo.ecole}
              onChange={(e) => setNewPromo({ ...newPromo, ecole: e.target.value })}
              className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl bg-white text-slateSubtle-800 focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie transition-all"
            >
              <option value="École de Gendarmerie de Rochefort">École de Gendarmerie de Rochefort</option>
              <option value="École de Gendarmerie de Chaumont">École de Gendarmerie de Chaumont</option>
              <option value="École de Gendarmerie de Montluçon">École de Gendarmerie de Montluçon</option>
              <option value="École de Gendarmerie de Châteaulin">École de Gendarmerie de Châteaulin</option>
              <option value="École de Gendarmerie de Tulle">École de Gendarmerie de Tulle</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
}
