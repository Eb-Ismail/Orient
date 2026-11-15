import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { testService } from '../../services/testService.js';
import api from '../../services/api.js';
import {
  Shield,
  ArrowRight,
  ArrowLeft,
  Activity
} from 'lucide-react';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

// Validateur unitaire strict pour chaque champ
const validateField = (field, value) => {
  switch (field) {
    case 'tailleCm': {
      if (value === '' || value === null || value === undefined) {
        return 'La taille en centimètres est obligatoire';
      }
      const num = Number(value);
      if (isNaN(num) || !Number.isInteger(num)) {
        return 'La taille doit être un nombre entier valide';
      }
      if (num < 140 || num > 220) {
        return 'La taille doit être comprise entre 140 et 220 cm';
      }
      return null;
    }
    case 'poidsKg': {
      if (value === '' || value === null || value === undefined) {
        return 'Le poids en kilogrammes est obligatoire';
      }
      const num = Number(value);
      if (isNaN(num) || num <= 0) {
        return 'Le poids doit être un nombre valide';
      }
      if (num < 40 || num > 160) {
        return 'Le poids doit être compris entre 40 et 160 kg';
      }
      return null;
    }
    case 'age': {
      if (value === '' || value === null || value === undefined) {
        return "L'âge est obligatoire";
      }
      const num = Number(value);
      if (isNaN(num) || !Number.isInteger(num)) {
        return "L'âge doit être un nombre entier valide";
      }
      if (num < 18 || num > 45) {
        return "L'âge doit être compris entre 18 et 45 ans";
      }
      return null;
    }
    case 'visionSIGYCOP_Y': {
      if (value === '' || value === null || value === undefined) {
        return 'Le coefficient de vision SIGYCOP est obligatoire';
      }
      const num = Number(value);
      if (![1, 2, 3, 4].includes(num)) {
        return 'Veuillez sélectionner un coefficient de vision valide (Y1 à Y4)';
      }
      return null;
    }
    default:
      return null;
  }
};

export default function CandidateInfoPage() {
  const { id } = useParams();
  const testId = id || 1;
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast, removeToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    matricule: '',
    age: '23',
    tailleCm: '180',
    poidsKg: '75',
    visionSIGYCOP_Y: '1',
    acuiteVisuelle: '10/10'
  });

  const [errors, setErrors] = useState({});

  // Nettoyage de la notification de validation lors du démontage du composant
  useEffect(() => {
    return () => {
      removeToast('profile-validation');
    };
  }, [removeToast]);

  // Chargement des données du candidat
  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        setLoading(true);
        if (user && user.UtilisateurId) {
          const res = await api.get(`/students/${user.UtilisateurId}`);
          if (res.data?.student && isMounted) {
            const s = res.data.student;
            setFormData({
              matricule: s.Matricule || user.Matricule || user.matricule || 'EG-2025-014',
              age: s.Age !== undefined && s.Age !== null ? String(s.Age) : '23',
              tailleCm: s.TailleCm !== undefined && s.TailleCm !== null ? String(s.TailleCm) : '180',
              poidsKg: s.PoidsKg !== undefined && s.PoidsKg !== null ? String(s.PoidsKg) : '75',
              visionSIGYCOP_Y: s.VisionSIGYCOP_Y !== undefined && s.VisionSIGYCOP_Y !== null ? String(s.VisionSIGYCOP_Y) : '1',
              acuiteVisuelle: s.AcuiteVisuelle || '10/10'
            });
          }
        }
      } catch (err) {
        if (isMounted) {
          setFormData(prev => ({
            ...prev,
            matricule: user?.matricule || user?.Matricule || 'EG-2025-014'
          }));
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadData();
    return () => { isMounted = false; };
  }, [user]);

  // Calcul instantané et indicatif de l'IMC
  const imc = useMemo(() => {
    const t = parseFloat(formData.tailleCm) / 100;
    const p = parseFloat(formData.poidsKg);
    if (!t || !p || t <= 0) return null;
    return Math.round((p / (t * t)) * 10) / 10;
  }, [formData.tailleCm, formData.poidsKg]);

  // Mise à jour de champ avec suppression de l'erreur associée dès correction
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Si ce champ présentait une erreur, vérifier s'il est désormais valide
    if (errors[field]) {
      const fieldError = validateField(field, value);
      if (!fieldError) {
        setErrors(prevErrors => {
          const updated = { ...prevErrors };
          delete updated[field];

          // Si toutes les erreurs sont corrigées, fermer la notification immédiatement
          if (Object.keys(updated).length === 0) {
            removeToast('profile-validation');
          }
          return updated;
        });
      }
    }
  };

  // Validation globale et démarrage de l'épreuve
  const handleStart = async (e) => {
    e.preventDefault();

    // 1. Valider l'ensemble des 4 champs requis
    const newErrors = {};
    const invalidFieldsList = [];

    const tailleErr = validateField('tailleCm', formData.tailleCm);
    if (tailleErr) {
      newErrors.tailleCm = tailleErr;
      invalidFieldsList.push('Taille');
    }

    const poidsErr = validateField('poidsKg', formData.poidsKg);
    if (poidsErr) {
      newErrors.poidsKg = poidsErr;
      invalidFieldsList.push('Poids');
    }

    const ageErr = validateField('age', formData.age);
    if (ageErr) {
      newErrors.age = ageErr;
      invalidFieldsList.push('Âge');
    }

    const visionErr = validateField('visionSIGYCOP_Y', formData.visionSIGYCOP_Y);
    if (visionErr) {
      newErrors.visionSIGYCOP_Y = visionErr;
      invalidFieldsList.push('Vision');
    }

    setErrors(newErrors);

    // 2. Si des erreurs existent : afficher UNE SEULE notification groupée
    if (invalidFieldsList.length > 0) {
      addToast({
        id: 'profile-validation',
        title: 'Champs à vérifier',
        message: 'Veuillez vérifier les informations suivantes :',
        type: 'error',
        items: invalidFieldsList,
        duration: 5000
      });
      return;
    }

    // 3. Tous les champs sont valides : fermer la notification de validation
    removeToast('profile-validation');

    setSubmitting(true);
    try {
      const matricule = formData.matricule || user?.matricule || user?.Matricule || 'EG-2025-014';
      const payload = {
        matricule: String(matricule).trim().toUpperCase(),
        age: parseInt(formData.age, 10),
        tailleCm: parseInt(formData.tailleCm, 10),
        poidsKg: parseFloat(formData.poidsKg),
        imc,
        visionSIGYCOP_Y: parseInt(formData.visionSIGYCOP_Y, 10) || 1,
        acuiteVisuelle: formData.acuiteVisuelle?.trim() || '10/10'
      };

      if (user?.UtilisateurId) {
        try {
          await api.put(`/students/${user.UtilisateurId}`, payload);
        } catch (_) {}
      }

      await testService.startTest(testId, payload);
      navigate(`/eleve/tests/${testId}/passer`);
    } catch (err) {
      addToast({
        id: 'start-test-error',
        title: 'Erreur',
        message: err.response?.data?.error || "Impossible d'initialiser l'épreuve.",
        type: 'error'
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Vérification du dossier..." fullPage />;
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fade-slide">
      <div className="text-center space-y-1.5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-100 border border-slateSubtle-200 text-[11px] font-bold text-gendarmerie uppercase tracking-wider">
          <Shield className="w-3.5 h-3.5 text-gold" />
          Élève Gendarme • Vérification Rapide
        </span>
        <h1 className="text-2xl font-bold text-gendarmerie font-serif">
          Confirmation du Profil
        </h1>
        <p className="text-xs text-slateSubtle-600">
          Vérifiez vos données physiques avant de lancer le chronomètre.
        </p>
      </div>

      <Card className="p-6 md:p-7 rounded-2xl border border-slateSubtle-200 shadow-sm">
        {/* Résumé candidat */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slateSubtle-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gendarmerie text-white flex items-center justify-center font-bold text-sm">
              {user?.prenom?.[0] || 'E'}{user?.nom?.[0] || 'G'}
            </div>
            <div>
              <span className="text-sm font-bold text-gendarmerie block">
                {user?.prenom} {user?.nom}
              </span>
              <span className="text-xs font-mono text-slateSubtle-500">
                Matricule : {formData.matricule || user?.matricule || user?.Matricule || 'EG-2025-014'}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slateSubtle-500 block">Test Prêt</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              60 Questions
            </span>
          </div>
        </div>

        <form onSubmit={handleStart} className="space-y-4" noValidate>
          <div className="grid grid-cols-2 gap-3.5">
            {/* Taille */}
            <div>
              <label htmlFor="tailleCm" className="block text-xs font-semibold text-slateSubtle-700 mb-1">
                Taille (cm) <span className="text-rose-600">*</span>
              </label>
              <input
                id="tailleCm"
                type="number"
                value={formData.tailleCm}
                onChange={(e) => handleChange('tailleCm', e.target.value)}
                placeholder="Ex: 180"
                aria-invalid={Boolean(errors.tailleCm)}
                className={`w-full text-xs p-2.5 rounded-xl border transition-all ${
                  errors.tailleCm
                    ? 'border-rose-400 focus:border-rose-600 focus:ring-2 focus:ring-rose-200 bg-rose-50/20'
                    : 'border-slateSubtle-200 focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie'
                }`}
              />
              {errors.tailleCm && (
                <span className="text-[11px] text-rose-600 font-medium block mt-1">
                  {errors.tailleCm}
                </span>
              )}
            </div>

            {/* Poids */}
            <div>
              <label htmlFor="poidsKg" className="block text-xs font-semibold text-slateSubtle-700 mb-1">
                Poids (kg) <span className="text-rose-600">*</span>
              </label>
              <input
                id="poidsKg"
                type="number"
                step="0.5"
                value={formData.poidsKg}
                onChange={(e) => handleChange('poidsKg', e.target.value)}
                placeholder="Ex: 75"
                aria-invalid={Boolean(errors.poidsKg)}
                className={`w-full text-xs p-2.5 rounded-xl border transition-all ${
                  errors.poidsKg
                    ? 'border-rose-400 focus:border-rose-600 focus:ring-2 focus:ring-rose-200 bg-rose-50/20'
                    : 'border-slateSubtle-200 focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie'
                }`}
              />
              {errors.poidsKg && (
                <span className="text-[11px] text-rose-600 font-medium block mt-1">
                  {errors.poidsKg}
                </span>
              )}
            </div>

            {/* Âge */}
            <div>
              <label htmlFor="age" className="block text-xs font-semibold text-slateSubtle-700 mb-1">
                Âge (ans) <span className="text-rose-600">*</span>
              </label>
              <input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleChange('age', e.target.value)}
                placeholder="Ex: 23"
                aria-invalid={Boolean(errors.age)}
                className={`w-full text-xs p-2.5 rounded-xl border transition-all ${
                  errors.age
                    ? 'border-rose-400 focus:border-rose-600 focus:ring-2 focus:ring-rose-200 bg-rose-50/20'
                    : 'border-slateSubtle-200 focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie'
                }`}
              />
              {errors.age && (
                <span className="text-[11px] text-rose-600 font-medium block mt-1">
                  {errors.age}
                </span>
              )}
            </div>

            {/* Vision Y */}
            <div>
              <label htmlFor="visionSIGYCOP_Y" className="block text-xs font-semibold text-slateSubtle-700 mb-1">
                Vision (SIGYCOP Y) <span className="text-rose-600">*</span>
              </label>
              <select
                id="visionSIGYCOP_Y"
                value={formData.visionSIGYCOP_Y}
                onChange={(e) => handleChange('visionSIGYCOP_Y', e.target.value)}
                aria-invalid={Boolean(errors.visionSIGYCOP_Y)}
                className={`w-full text-xs p-2.5 rounded-xl border bg-white transition-all ${
                  errors.visionSIGYCOP_Y
                    ? 'border-rose-400 focus:border-rose-600 focus:ring-2 focus:ring-rose-200 bg-rose-50/20'
                    : 'border-slateSubtle-200 focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie'
                }`}
              >
                <option value="1">Y1 (Excellente • 10/10)</option>
                <option value="2">Y2 (Bonne • 8-9/10)</option>
                <option value="3">Y3 (Moyenne corrigée)</option>
                <option value="4">Y4 (Inapte spécialités strictes)</option>
              </select>
              {errors.visionSIGYCOP_Y && (
                <span className="text-[11px] text-rose-600 font-medium block mt-1">
                  {errors.visionSIGYCOP_Y}
                </span>
              )}
            </div>
          </div>

          {/* IMC calculé */}
          {imc && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-cream-50 border border-slateSubtle-200 text-xs">
              <span className="text-slateSubtle-600 flex items-center gap-1.5 font-medium">
                <Activity className="w-4 h-4 text-gold" /> IMC Indicatif :
              </span>
              <span className="font-bold text-gendarmerie">
                {imc} kg/m² • {imc >= 18.5 && imc <= 25 ? 'Normal' : imc > 25 ? 'Surpoids' : 'Minceur'}
              </span>
            </div>
          )}

          {/* Boutons d'action */}
          <div className="flex items-center justify-between pt-4 border-t border-slateSubtle-200">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              icon={ArrowLeft}
              onClick={() => {
                removeToast('profile-validation');
                navigate(`/eleve/tests/${testId}/instructions`);
              }}
            >
              Consignes
            </Button>

            <Button
              type="submit"
              variant="gold"
              icon={ArrowRight}
              iconPosition="right"
              loading={submitting}
            >
              Démarrer le test (60 Q)
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
