import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Cpu,
  Wrench,
  Radio,
  Boxes,
  Layers,
  Clock,
  CheckCircle2,
  AlertOctagon,
  ArrowRight,
  Play,
  RotateCcw,
  Award,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { getWorkshopMedia } from '../../data/workshopAcademyData.js';

export default function WorkshopCard({
  assignment,
  workshop: wsProp,
  userRole = 'ELEVE',
  onViewEvaluation,
  onActionClick
}) {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const assignmentData = assignment || {};
  const w = assignmentData.Atelier || wsProp || {};
  const statut = assignmentData.Statut || 'NON_COMMENCE';
  const progress = assignmentData.AvancementPourcentage !== undefined 
    ? assignmentData.AvancementPourcentage 
    : (statut === 'VALIDE' ? 100 : 0);

  const isRejected = statut === 'REJETE' || assignmentData.ArretSecurite;
  const isNeedsReassessment = statut === 'A_REEVALUER' || isRejected;
  const isValidated = statut === 'VALIDE' || statut === 'EVALUE';
  const isPendingValidation = statut === 'EN_ATTENTE_VALIDATION';
  const isInProgress = statut === 'EN_COURS';
  const isAvailable = statut === 'NON_COMMENCE' || statut === 'ASSIGNE';

  const media = getWorkshopMedia(w.Code, w.CategorieId);

  // Icône professionnelle selon la catégorie
  const renderCategoryIcon = (catId, className = 'w-4 h-4') => {
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

  // Couleurs de catégorie
  const getCategoryTheme = (catId) => {
    switch (catId) {
      case 'CAT-INFO':
        return {
          badge: 'bg-blue-600 text-white',
          glow: 'from-blue-600/20 to-transparent',
          name: 'Informatique & Réseaux'
        };
      case 'CAT-MECA':
        return {
          badge: 'bg-amber-600 text-white',
          glow: 'from-amber-600/20 to-transparent',
          name: 'Mécanique & Automobile'
        };
      case 'CAT-TELECOM':
        return {
          badge: 'bg-indigo-600 text-white',
          glow: 'from-indigo-600/20 to-transparent',
          name: 'Électronique & Télécoms'
        };
      case 'CAT-LOG':
        return {
          badge: 'bg-emerald-700 text-white',
          glow: 'from-emerald-700/20 to-transparent',
          name: 'Logistique & Maintenance'
        };
      default:
        return {
          badge: 'bg-slate-700 text-white',
          glow: 'from-slate-700/20 to-transparent',
          name: 'Atelier Pratique'
        };
    }
  };

  const theme = getCategoryTheme(w.CategorieId);

  // Difficulté : Facile, Moyen, Avancé
  const getDifficultyLabel = (level) => {
    switch (level?.toUpperCase()) {
      case 'AVANCE':
        return { label: 'Avancé', cls: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'FACILE':
        return { label: 'Facile', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      default:
        return { label: 'Moyen', cls: 'bg-amber-50 text-amber-700 border-amber-200' };
    }
  };

  const diff = getDifficultyLabel(w.NiveauDifficulte);

  // Badge Statut
  const renderStatusBadge = () => {
    if (isNeedsReassessment) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-600 text-white shadow-xs">
          <AlertOctagon className="w-3 h-3" />
          <span>À réévaluer</span>
        </span>
      );
    }
    if (isValidated) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-600 text-white shadow-xs">
          <CheckCircle2 className="w-3 h-3" />
          <span>Terminé</span>
        </span>
      );
    }
    if (isPendingValidation) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-600 text-white shadow-xs">
          <Clock className="w-3 h-3" />
          <span>En attente de visa</span>
        </span>
      );
    }
    if (isInProgress) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-600 text-white shadow-xs">
          <Clock className="w-3 h-3" />
          <span>En cours</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-xs text-white border border-white/20">
        <Play className="w-3 h-3 fill-white" />
        <span>Disponible</span>
      </span>
    );
  };

  // Gestion du clic d'action
  const handleAction = () => {
    if (onActionClick) {
      onActionClick(assignmentData);
      return;
    }

    if (isValidated && onViewEvaluation) {
      onViewEvaluation(assignmentData);
      return;
    }

    if (assignmentData.AssignationId) {
      if (userRole === 'ADMIN') {
        navigate(`/admin/ateliers/${w.AtelierId}`);
      } else if (userRole === 'COMMISSION') {
        navigate('/commission/dashboard');
      } else {
        navigate(`/eleve/ateliers/${assignmentData.AssignationId}`);
      }
    } else if (w.AtelierId) {
      navigate(`/admin/ateliers/${w.AtelierId}`);
    }
  };

  return (
    <div
      className={`bg-white rounded-3xl border ${
        isNeedsReassessment
          ? 'border-rose-300 shadow-xs'
          : isValidated
          ? 'border-emerald-200 shadow-2xs hover:border-emerald-300'
          : 'border-slateSubtle-200 shadow-2xs hover:border-gendarmerie/40'
      } flex flex-col justify-between transition-all duration-300 hover:shadow-lg group overflow-hidden`}
    >
      {/* 1. Illustration / Photo Réelle HD */}
      <div className="relative h-44 sm:h-48 w-full bg-slate-900 overflow-hidden cursor-pointer" onClick={handleAction}>
        {/* Image avec zoom fluide */}
        {!imageError ? (
          <img
            src={media.url}
            alt={media.alt || w.Titre}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
              imageLoaded ? 'opacity-95' : 'opacity-0'
            }`}
          />
        ) : (
          /* Fallback visuel élégant si problème de réseau */
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#153B2B] to-[#0A1D15] text-white">
            {renderCategoryIcon(w.CategorieId, 'w-10 h-10 text-gold mb-2')}
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">{theme.name}</span>
          </div>
        )}

        {/* Dégradé de contraste militaire */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Badges flottants sur l'image */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 pointer-events-none">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[10px] font-bold shadow-md uppercase tracking-wider ${theme.badge}`}>
            {renderCategoryIcon(w.CategorieId, 'w-3 h-3')}
            <span>{w.Code || 'ATELIER'}</span>
          </span>
          <div>
            {renderStatusBadge()}
          </div>
        </div>

        {/* Catégorie en bas de photo */}
        <div className="absolute bottom-3 left-3 right-3 text-left pointer-events-none">
          <div className="text-[11px] font-bold text-gold-light tracking-wide uppercase">
            {theme.name}
          </div>
        </div>
      </div>

      {/* 2. Corps de la carte */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Titre & Arabe */}
          <div>
            <h3
              onClick={handleAction}
              className="text-base font-bold text-gendarmerie leading-snug group-hover:text-gold-dark cursor-pointer transition-colors line-clamp-2"
              title={w.Titre}
            >
              {w.Titre}
            </h3>
            {w.TitreAr && (
              <p className="text-[11px] text-slateSubtle-500 font-arabic mt-0.5 line-clamp-1" dir="rtl">
                {w.TitreAr}
              </p>
            )}
          </div>

          {/* Description courte (2 lignes max) */}
          <p className="text-xs text-slateSubtle-600 line-clamp-2 leading-relaxed">
            {w.DescriptionFr || w.MissionPratique?.situationInitiale || 'Atelier pratique de formation et de mise en situation professionnelle.'}
          </p>
        </div>

        {/* Métadonnées : Durée, Difficulté, Exercices */}
        <div className="space-y-3 pt-2 border-t border-slateSubtle-100">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slateSubtle-600">
            <div className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-gold-dark shrink-0" />
              <span>{w.DureeMinutes || 60} min</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${diff.cls}`}>
                {diff.label}
              </span>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-slateSubtle-500 font-semibold">
              <BookOpen className="w-3 h-3 text-gold-dark" />
              <span>Simulation & Exercices</span>
            </div>
          </div>

          {/* Barre de Progression */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-slateSubtle-600">Progression</span>
              <span className={isValidated ? 'text-emerald-700 font-black' : 'text-gendarmerie font-black'}>
                {progress}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isValidated
                    ? 'bg-emerald-600'
                    : isInProgress
                    ? 'bg-amber-500'
                    : isNeedsReassessment
                    ? 'bg-rose-500'
                    : 'bg-gendarmerie'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* 3. Bouton d'action principal */}
        <div className="pt-2">
          {isValidated ? (
            <button
              onClick={handleAction}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition border border-emerald-300 cursor-pointer shadow-2xs"
            >
              <Award className="w-4 h-4 text-emerald-700" />
              <span>Voir les résultats ({assignmentData.ScoreObtenu ? `${assignmentData.ScoreObtenu}/20` : 'Validé'})</span>
            </button>
          ) : isInProgress ? (
            <button
              onClick={handleAction}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
            >
              <Clock className="w-4 h-4" />
              <span>Continuer l'atelier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : isNeedsReassessment ? (
            <button
              onClick={handleAction}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reprendre l'atelier</span>
            </button>
          ) : isPendingValidation ? (
            <button
              onClick={handleAction}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-xs font-bold transition border border-indigo-200 cursor-pointer"
            >
              <Clock className="w-4 h-4" />
              <span>Dossier en attente d'évaluation</span>
            </button>
          ) : (
            <button
              onClick={handleAction}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gendarmerie hover:bg-[#1C4E39] text-white text-xs font-bold transition shadow-xs cursor-pointer group-hover:bg-[#1C4E39]"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Commencer l'atelier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
