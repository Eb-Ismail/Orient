import React, { useState } from 'react';
import {
  History,
  Clock,
  Calendar,
  FileText,
  MessageSquare,
  Award,
  Compass,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Eye,
  Info
} from 'lucide-react';

export default function JourneyHistoryTimeline({
  historyData,
  currentJourney,
  onLoadSnapshot
}) {
  const [selectedSnapshot, setSelectedSnapshot] = useState(null);

  const snapshots = historyData?.snapshots || [];
  const currentVersion = historyData?.currentVersion || currentJourney?.version || 1;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Historique */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#153B2B] text-gold border border-gold/30 flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-gold" />
                Profil Évolutif dans le Temps
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Version courante : <strong>v{currentVersion}</strong>
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Traçabilité & Historique des Évolutions
            </h2>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              Consultez l'historique de vos versions. Chaque ajout d'expérience, atelier validé ou échange avec l'IA enrichit votre dossier d'orientation sans jamais écraser vos étapes antérieures.
            </p>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-right shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Versions</span>
            <span className="text-base font-black text-[#153B2B]">{snapshots.length + 1} snapshots</span>
          </div>
        </div>
      </div>

      {/* État Actuel - Version En Cours */}
      <div className="bg-emerald-50/50 rounded-2xl border-2 border-emerald-500/30 p-5 shadow-xs">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#153B2B] text-gold flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs">
              v{currentVersion}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-slate-900">
                  Version Actuelle en Cours
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <Clock className="w-3 h-3 text-slate-400" />
                Dernière modification : {formatDate(currentJourney?.lastUpdated || new Date().toISOString())}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="hidden sm:inline">Récit : {currentJourney?.bioLibre?.length || 0} caractères</span>
            <span>•</span>
            <span>{currentJourney?.conversation?.length || 0} messages</span>
          </div>
        </div>
      </div>

      {/* Chronologie des Snapshots */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#153B2B]" />
          <span>Versions Antérieures Enregistrées ({snapshots.length})</span>
        </h3>

        {snapshots.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center text-xs text-slate-500">
            Aucune version archivée pour le moment. Dès que vous sauvegarderez de nouvelles modifications, un instantané historique sera automatiquement créé.
          </div>
        ) : (
          <div className="space-y-3">
            {snapshots.map((snap, index) => {
              const isSelected = selectedSnapshot?.id === snap.id;

              return (
                <div
                  key={snap.id || index}
                  className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                    isSelected ? 'border-[#153B2B] shadow-sm' : 'border-slate-200/90 shadow-2xs'
                  }`}
                >
                  <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700 shrink-0">
                        v{snap.version || index + 1}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                            Instantané du {formatDate(snap.savedAt)}
                          </h4>
                          <span className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-600 rounded">
                            {snap.bioLength || 0} caractères
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1">
                          {snap.bioSnippet ? `« ${snap.bioSnippet} »` : 'Échanges avec le conseiller d\'orientation IA.'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => setSelectedSnapshot(isSelected ? null : snap)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        <span>{isSelected ? 'Masquer' : 'Examiner'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Vue détaillée de l'instantané */}
                  {isSelected && (
                    <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/60 text-xs space-y-3">
                      <div className="p-3 bg-white rounded-xl border border-slate-200 text-slate-700 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Extrait du récit à cette version :
                        </span>
                        <p className="leading-relaxed italic">
                          {snap.bioSnippet || "Récit initial en cours de rédaction."}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>Horodatage : {snap.savedAt}</span>
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Données archivées en sécurité
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Guide & Note Déontologique */}
      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200/90 text-xs text-slate-600 flex items-start gap-3">
        <Info className="w-4 h-4 text-[#153B2B] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Principe de Progression Continue :</strong> Le système d'orientation d'ORIENT-GR est conçu pour refléter l'évolution réelle de l'élève tout au long de sa scolarité. Aucune évaluation passée n'est pénalisante : vos progrès dans les ateliers pratiques revalorisent constamment votre dossier.
        </p>
      </div>
    </div>
  );
}

