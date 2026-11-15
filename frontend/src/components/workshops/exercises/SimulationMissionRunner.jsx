import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Wrench,
  Activity,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  RefreshCw,
  Award,
  Clock,
  AlertTriangle,
  Monitor,
  FileText,
  Check
} from 'lucide-react';

export default function SimulationMissionRunner({ simulation, onCompleteMission }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedTools, setSelectedTools] = useState([]);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);
  const [missionValidated, setMissionValidated] = useState(false);
  const [safetyAlertTriggered, setSafetyAlertTriggered] = useState(false);

  const etapes = simulation?.etapes || [];
  const currentStep = etapes[currentStepIndex] || {};
  const isLastStep = currentStepIndex === etapes.length - 1;

  // Gestion de la sélection d'outils
  const handleToggleTool = (toolId) => {
    if (selectedTools.includes(toolId)) {
      setSelectedTools(selectedTools.filter((id) => id !== toolId));
    } else {
      setSelectedTools([...selectedTools, toolId]);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < etapes.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    } else {
      setMissionValidated(true);
      if (onCompleteMission) {
        onCompleteMission({
          score: 20,
          completedAt: new Date().toISOString()
        });
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleRestartMission = () => {
    setCurrentStepIndex(0);
    setSelectedTools([]);
    setSelectedDiagnosis(null);
    setMissionValidated(false);
    setSafetyAlertTriggered(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-slateSubtle-200 shadow-md overflow-hidden space-y-0">
      {/* 1. Bandeau supérieur Mission Tactique */}
      <div className="bg-gradient-to-r from-[#153B2B] via-[#1C4E39] to-[#0D241A] text-white p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-gold-light font-mono">
              [ MODE SIMULATION PROFESSIONNELLE • GENDARMERIE ROYALE ]
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-serif text-white">
            {simulation.titre}
          </h3>
          <p className="text-xs text-slate-200 max-w-2xl leading-relaxed">
            {simulation.contexte}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-gold-light">Étape en cours</div>
            <div className="text-base font-bold font-mono text-white">
              {currentStepIndex + 1} / {etapes.length}
            </div>
          </div>
          <button
            onClick={handleRestartMission}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition text-xs font-semibold flex items-center gap-1 cursor-pointer"
            title="Recommencer la simulation"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Barre de progression horizontale par étape */}
      <div className="bg-cream-100/90 border-b border-slateSubtle-200 px-4 py-2.5 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 min-w-max">
          {etapes.map((step, idx) => {
            const isCurrent = idx === currentStepIndex;
            const isDone = idx < currentStepIndex;

            return (
              <button
                key={idx}
                onClick={() => {
                  if (idx <= currentStepIndex) setCurrentStepIndex(idx);
                }}
                disabled={idx > currentStepIndex}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  isCurrent
                    ? 'bg-gendarmerie text-white shadow-xs'
                    : isDone
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-white text-slate-400 opacity-60 cursor-not-allowed'
                }`}
              >
                <span className="w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-mono border border-current">
                  {idx + 1}
                </span>
                <span className="truncate max-w-[120px]">{step.titre.split('.')[1] || step.titre}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Contenu interactif de l'étape active */}
      <div className="p-5 sm:p-8 space-y-6">
        {/* Titre et consigne de l'étape */}
        <div className="space-y-1.5 pb-4 border-b border-slateSubtle-200">
          <div className="text-xs font-bold uppercase tracking-wider text-gendarmerie flex items-center gap-2">
            <Activity className="w-4 h-4 text-gold-dark" />
            <span>Phase Opérationnelle #{currentStep.numero}</span>
          </div>
          <h4 className="text-lg font-bold text-gendarmerie font-serif">
            {currentStep.titre}
          </h4>
          <p className="text-xs sm:text-sm text-slateSubtle-700 leading-relaxed font-medium">
            {currentStep.instructions}
          </p>
        </div>

        {/* Détails spécifiques à chaque étape */}
        {currentStep.details && (
          <div className="p-4 rounded-2xl bg-cream-50 border border-slateSubtle-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-serif italic border-l-4 border-l-gold">
            « {currentStep.details} »
          </div>
        )}

        {/* Symptômes observés */}
        {currentStep.symptomesObserves && (
          <div className="space-y-2.5 p-4 rounded-2xl bg-amber-50/80 border border-amber-200">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>Constatations initiales consignées :</span>
            </div>
            <ul className="space-y-1.5 text-xs text-amber-950">
              {currentStep.symptomesObserves.map((symp, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">•</span>
                  <span>{symp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Mesure disponible / Écran de testeur */}
        {currentStep.mesureDisponible && (
          <div className="p-4 rounded-2xl bg-slate-900 text-white font-mono space-y-2 border border-slate-700 shadow-inner">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-1 border-b border-slate-800">
              <span>[ INTERFACE DE CONTRÔLE NUMÉRIQUE ]</span>
              <span className="text-emerald-400">EN LIGNE</span>
            </div>
            <p className="text-xs text-emerald-300 leading-relaxed">
              &gt; {currentStep.mesureDisponible}
            </p>
          </div>
        )}

        {/* Sélection de l'outillage tactique (Boîte à outils interactive) */}
        {currentStep.outilsDisponibles && (
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-gendarmerie flex items-center gap-2">
              <Wrench className="w-4 h-4 text-gold-dark" />
              <span>Armoire d'outillage : Sélectionnez le matériel adéquat</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {currentStep.outilsDisponibles.map((tool) => {
                const isSelected = selectedTools.includes(tool.id);

                return (
                  <button
                    key={tool.id}
                    onClick={() => handleToggleTool(tool.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between gap-2.5 cursor-pointer ${
                      isSelected
                        ? 'border-gendarmerie bg-gendarmerie text-white shadow-xs font-semibold'
                        : 'border-slateSubtle-200 bg-white hover:border-gendarmerie/40 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-cream-200 text-gendarmerie'
                      }`}>
                        <Wrench className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold leading-snug">{tool.nom}</span>
                    </div>

                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-white bg-white text-gendarmerie' : 'border-slate-300'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Relevés de mesures avec jauges */}
        {currentStep.resultatsMesures && (
          <div className="space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-gendarmerie flex items-center gap-2">
              <Activity className="w-4 h-4 text-gold-dark" />
              <span>Relevés sur le banc de diagnostic :</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentStep.resultatsMesures.map((m, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-900 text-white space-y-1.5 font-mono border border-slate-700">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gold-light font-bold">{m.rail}</span>
                    <span className="text-rose-400 font-bold">{m.valeur}</span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Valeur nominale attendue : {m.attendu}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sélection du diagnostic exact */}
        {currentStep.diagnosticOptions && (
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-gendarmerie flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-dark" />
              <span>Formulez votre diagnostic technique définitif :</span>
            </div>

            <div className="space-y-2">
              {currentStep.diagnosticOptions.map((opt, optIndex) => {
                const isSelected = selectedDiagnosis === optIndex;
                const isCorrect = optIndex === currentStep.bonneReponseIndex;

                return (
                  <button
                    key={optIndex}
                    onClick={() => setSelectedDiagnosis(optIndex)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-gendarmerie bg-gendarmerie/10 ring-2 ring-gendarmerie font-bold text-gendarmerie'
                        : 'border-slateSubtle-200 bg-white hover:border-slateSubtle-400 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-cream-200 text-gendarmerie flex items-center justify-center text-xs font-bold shrink-0">
                        {String.fromCharCode(65 + optIndex)}
                      </span>
                      <span className="text-xs sm:text-sm">{opt}</span>
                    </div>

                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-gendarmerie shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Opérations de remplacement */}
        {currentStep.operations && (
          <div className="space-y-2.5 p-4 rounded-2xl bg-cream-100/70 border border-slateSubtle-200">
            <div className="text-xs font-bold uppercase tracking-wider text-gendarmerie flex items-center gap-2">
              <Wrench className="w-4 h-4 text-gold-dark" />
              <span>Plan d'intervention technique exécuté :</span>
            </div>
            <div className="space-y-2">
              {currentStep.operations.map((op, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-800 bg-white p-2.5 rounded-lg border border-slateSubtle-200">
                  <span className="w-5 h-5 rounded bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    ✓
                  </span>
                  <span>{op}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Conclusion / Bilan final de la mission */}
        {currentStep.conclusion && (
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-300 text-emerald-950 space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-900 uppercase tracking-wider">
              <Award className="w-5 h-5 text-emerald-700" />
              <span>Mission Opérationnelle Accomplie avec Succès !</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed">
              {currentStep.conclusion}
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold">
                Note de simulation : 20 / 20 points
              </span>
              <span className="px-3 py-1 rounded-lg bg-white border border-emerald-300 text-emerald-800 font-semibold">
                Règles de sécurité respectées à 100%
              </span>
            </div>
          </div>
        )}

        {/* 4. Barre de navigation de simulation */}
        <div className="flex items-center justify-between gap-3 pt-6 border-t border-slateSubtle-200">
          <button
            onClick={handlePrevStep}
            disabled={currentStepIndex === 0}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slateSubtle-200 text-xs font-bold text-slateSubtle-700 hover:bg-cream-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Étape précédente</span>
          </button>

          <button
            onClick={handleNextStep}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gendarmerie text-white text-xs font-bold hover:bg-[#1C4E39] shadow-xs cursor-pointer transition"
          >
            <span>{isLastStep ? 'Clôturer la simulation' : 'Passer à l\'étape suivante'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

