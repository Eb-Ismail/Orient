import React from 'react';
import { ShieldAlert } from 'lucide-react';
import Button from './Button.jsx';

export default function EmptyState({
  title = "Aucune donnée disponible",
  description = "Aucun enregistrement ne correspond aux critères de sélection actuels.",
  icon: Icon = ShieldAlert,
  actionLabel = null,
  onAction = null
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center rounded-xl border border-dashed border-slateSubtle-200 bg-white shadow-2xs">
      <div className="w-12 h-12 rounded-2xl bg-cream-100 border border-slateSubtle-200 flex items-center justify-center text-gold mb-3.5 shadow-2xs">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-base font-bold text-gendarmerie mb-1">{title}</h4>
      <p className="text-xs text-slateSubtle-700 max-w-sm mb-4 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
