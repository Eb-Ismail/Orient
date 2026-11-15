import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ text = "Chargement des données réglementaires...", fullPage = false }) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3 p-8">
      <div className="relative">
        <Loader2 className="w-9 h-9 text-gendarmerie animate-spin" />
        <div className="absolute inset-0 rounded-full border border-gold/30 animate-ping opacity-25" />
      </div>
      {text && <p className="text-xs font-medium text-slateSubtle-700 tracking-wide">{text}</p>}
    </div>
  );

  if (fullPage) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center w-full">
        {content}
      </div>
    );
  }

  return content;
}
