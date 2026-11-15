import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Clock, Shield, Award } from 'lucide-react';

export default function Badge({ type, label, size = 'sm', className = '' }) {
  const configs = {
    ELIGIBLE: {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
      icon: CheckCircle2,
      text: label || 'Éligible'
    },
    SOUS_RESERVE: {
      bg: 'bg-amber-50 text-amber-800 border-amber-200/80',
      icon: AlertTriangle,
      text: label || 'Sous réserve'
    },
    NON_ELIGIBLE: {
      bg: 'bg-rose-50 text-rose-800 border-rose-200/80',
      icon: XCircle,
      text: label || 'Non éligible'
    },
    A_VERIFIER: {
      bg: 'bg-amber-50 text-amber-800 border-amber-200/80',
      icon: AlertTriangle,
      text: label || 'À vérifier'
    },
    CONDITION_SATISFAITE: {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
      icon: CheckCircle2,
      text: label || 'Condition satisfaite'
    },
    CONDITION_NON_SATISFAITE: {
      bg: 'bg-rose-50 text-rose-800 border-rose-200/80',
      icon: XCircle,
      text: label || 'Condition non satisfaite'
    },
    CONDITION_A_VERIFIER: {
      bg: 'bg-amber-50 text-amber-800 border-amber-200/80',
      icon: AlertTriangle,
      text: label || 'Condition à vérifier'
    },
    PROVISOIRE_DEMO: {
      bg: 'bg-amber-50 text-amber-900 border-amber-200/90',
      icon: Clock,
      text: label || 'Paramètre démo'
    },
    TERMINE: {
      bg: 'bg-emerald-50 text-gendarmerie border-gendarmerie/20',
      icon: CheckCircle2,
      text: label || 'Terminé'
    },
    EN_COURS: {
      bg: 'bg-gold-subtle text-gold-dark border-gold/40',
      icon: Clock,
      text: label || 'En cours'
    },
    EN_ATTENTE: {
      bg: 'bg-cream-100 text-slateSubtle-700 border-slateSubtle-200',
      icon: Clock,
      text: label || 'En attente'
    },
    ADMIN: {
      bg: 'bg-gold-subtle text-gold-dark border-gold/40 shadow-xs',
      icon: Shield,
      text: label || 'Commandement (Admin)'
    },
    ELEVE: {
      bg: 'bg-cream-100 text-gendarmerie border-gendarmerie/20 shadow-xs',
      icon: Award,
      text: label || 'Élève Gendarme'
    },
    SIGYCOP_VALIDE: {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
      icon: CheckCircle2,
      text: label || 'SIGYCOP Apte'
    },
    RESTRICTION_TEMPORAIRE: {
      bg: 'bg-amber-50 text-amber-800 border-amber-200/80',
      icon: AlertTriangle,
      text: label || 'Restriction Médicale'
    }
  };

  const current = configs[type] || {
    bg: 'bg-cream-100 text-slateSubtle-800 border-slateSubtle-200',
    icon: null,
    text: label || type
  };

  const Icon = current.icon;
  const sizeClasses = size === 'xs' ? 'text-[10px] px-2 py-0.5 gap-1 font-medium tracking-wide' : 'text-[11px] px-2.5 py-1 gap-1.5 font-medium tracking-wide';

  return (
    <span className={`inline-flex items-center rounded-full border shadow-2xs select-none transition-colors duration-150 ${current.bg} ${sizeClasses} ${className}`}>
      {Icon && <Icon className="w-3 h-3 flex-shrink-0" />}
      <span>{current.text}</span>
    </span>
  );
}
