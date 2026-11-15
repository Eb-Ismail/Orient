import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Bot,
  Sparkles,
  Award,
  History,
  Shield,
  Clock,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { smartJourneyService } from '../../services/smartJourneyService.js';
import { useToast } from '../../context/ToastContext.jsx';

import AiInterviewChat from '../../components/smartJourney/AiInterviewChat.jsx';
import CompetencyAnalysisView from '../../components/smartJourney/CompetencyAnalysisView.jsx';
import JourneyHistoryTimeline from '../../components/smartJourney/JourneyHistoryTimeline.jsx';
import TalentRadarPanel from '../../components/smartJourney/TalentRadarPanel.jsx';

export default function SmartJourneyPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToast } = useToast() || {};

  const validTabs = ['interview', 'analysis', 'history'];
  const requestedTab = searchParams.get('tab');
  const [activeTab, setActiveTabState] = useState(
    validTabs.includes(requestedTab) ? requestedTab : 'interview'
  ); // 'interview' | 'analysis' | 'history'

  const setActiveTab = (tabId) => {
    setActiveTabState(tabId);
    setSearchParams({ tab: tabId }, { replace: true });
  };

  useEffect(() => {
    const paramTab = searchParams.get('tab');
    if (paramTab && validTabs.includes(paramTab) && paramTab !== activeTab) {
      setActiveTabState(paramTab);
    }
  }, [searchParams]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [interviewLoading, setInterviewLoading] = useState(false);
  const [analysisLoading, setAnalysisLoading] = useState(false);

  const [journey, setJourney] = useState({
    version: 1,
    lastUpdated: new Date().toISOString(),
    bioLibre: '',
    sections: {
      scolaire: '',
      professionnel: '',
      sportAssociatif: '',
      competencesTechniques: '',
      languesCentresInteret: '',
      responsabilitesEtDefis: '',
      autresExperiences: ''
    },
    conversation: [],
    analysis: null
  });

  const [historyData, setHistoryData] = useState({
    currentVersion: 1,
    snapshots: []
  });

  // Chargement initial des données
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setLoading(true);
      try {
        const [jData, hData] = await Promise.all([
          smartJourneyService.getJourney(),
          smartJourneyService.getHistory()
        ]);

        if (isMounted) {
          if (jData) setJourney(jData);
          if (hData) setHistoryData(hData);
        }
      } catch (err) {
        console.error('[SmartJourneyPage] Erreur chargement initial:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Sauvegarde manuelle ou automatique du parcours
  const handleSaveJourney = async (updatedData, triggerAnalysis = false) => {
    setSaving(true);
    try {
      const saved = await smartJourneyService.saveJourney(updatedData, triggerAnalysis);
      if (saved) {
        setJourney(saved);
        if (addToast) {
          addToast(
            triggerAnalysis
              ? 'Parcours sauvegardé et nouvelle analyse générée avec succès.'
              : 'Votre parcours a été enregistré avec succès.',
            'success'
          );
        }
        // Rafraîchir l'historique
        const hData = await smartJourneyService.getHistory();
        if (hData) setHistoryData(hData);

        if (triggerAnalysis) {
          setActiveTab('analysis');
        }
      }
    } catch (err) {
      console.error('[SmartJourneyPage] Erreur sauvegarde:', err);
      if (addToast) {
        addToast('Erreur lors de la sauvegarde du parcours.', 'error');
      }
    } finally {
      setSaving(false);
    }
  };

  // Envoi d'un message dans l'entretien interactif (Gemma 4:12B texte ou Moulsot v0.3 vocal)
  const handleSendMessage = async (text, options = {}) => {
    setInterviewLoading(true);
    const mode = options.mode || 'text';

    // Ajout optimiste du message de l'élève
    const tempUserMsg = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      mode,
      text,
      transcription: mode === 'voice' ? text : null,
      timestamp: new Date().toISOString()
    };
    setJourney((prev) => ({
      ...prev,
      conversation: [...(prev.conversation || []), tempUserMsg]
    }));

    try {
      const res = await smartJourneyService.sendInterviewMessage(text, options);
      if (res) {
        if (res.success === false) {
          if (addToast) addToast(res.error || 'Erreur de communication avec le serveur IA', 'error');
        } else {
          setJourney((prev) => ({
            ...prev,
            conversation: res.conversation || prev.conversation,
            analysis: res.analysis || prev.analysis
          }));
        }
        return res;
      }
    } catch (err) {
      console.error('[SmartJourneyPage] Erreur envoi interview:', err);
    } finally {
      setInterviewLoading(false);
    }
  };

  // Réinitialiser la conversation
  const handleResetConversation = () => {
    if (window.confirm("Souhaitez-vous réinitialiser le fil de discussion avec l'IA ? Votre récit de vie sera conservé.")) {
      const initialMsg = {
        id: `msg-reset-${Date.now()}`,
        role: 'assistant',
        text: "مرحباً بك مجدداً. لقد قمت بإعادة ضبط المحادثة. يمكنك الآن طرح أي نقطة جديدة حول مسارك الدراسي، خبراتك أو رغبتك في الالتحاق بسلك الدرك الملكي.",
        timestamp: new Date().toISOString()
      };
      setJourney(prev => ({
        ...prev,
        conversation: [initialMsg]
      }));
      smartJourneyService.saveJourney({ conversation: [initialMsg] });
    }
  };

  // Déclencher une analyse explicite
  const handleTriggerAnalysis = async () => {
    setAnalysisLoading(true);
    try {
      const newAnalysis = await smartJourneyService.triggerAnalysis();
      if (newAnalysis) {
        setJourney((prev) => ({
          ...prev,
          analysis: newAnalysis
        }));
        if (addToast) {
          addToast('Diagnostic des compétences actualisé avec succès.', 'success');
        }
      }
    } catch (err) {
      console.error('[SmartJourneyPage] Erreur analyse:', err);
      if (addToast) {
        addToast("Impossible d'actualiser l'analyse pour le moment.", 'error');
      }
    } finally {
      setAnalysisLoading(false);
    }
  };

  const tabs = [
    {
      id: 'interview',
      label: 'Mon Entretien',
      icon: MessageSquare
    },
    {
      id: 'analysis',
      label: 'Mon Profil & Mes Compétences',
      icon: Award
    },
    {
      id: 'history',
      label: 'Mon Parcours',
      icon: History
    }
  ];

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-[#153B2B] text-gold flex items-center justify-center border border-gold/40 shadow-sm animate-pulse">
          <Shield className="w-6 h-6 text-gold" />
        </div>
        <h3 className="text-base font-bold text-slate-800">
          Chargement de votre Parcours Intelligent...
        </h3>
        <p className="text-xs text-slate-500">
          Initialisation de l'environnement d'analyse et de l'assistant d'orientation.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* BARRE D'ONGLETS / ÉTAPES DU PARCOURS */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-2 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#153B2B] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-gold' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`ml-1 px-2.5 py-0.5 text-xs rounded-full font-mono font-bold ${
                      isActive
                        ? 'bg-gold text-[#153B2B]'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* CONTENU ACTIF SELON L'ONGLET SÉLECTIONNÉ */}
      <div className="transition-opacity duration-300">
        
        {/* ONGLET 1 : ENTRETIEN CONVERSATIONNEL AVEC L'IA */}
        {activeTab === 'interview' && (
          <div className="space-y-4">
            <AiInterviewChat
              conversation={journey.conversation || []}
              onSendMessage={handleSendMessage}
              loading={interviewLoading}
              onGoToAnalysis={() => setActiveTab('analysis')}
              onResetConversation={handleResetConversation}
            />

            <div className="flex justify-end items-center pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('analysis')}
                className="px-5 py-2.5 rounded-xl bg-[#153B2B] hover:bg-[#1C4E39] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
              >
                <span>Voir Mon Profil & Mes Compétences</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </button>
            </div>
          </div>
        )}

        {/* ONGLET 2 : MON PROFIL & MES COMPÉTENCES */}
        {activeTab === 'analysis' && (
          <div className="space-y-4">
            {journey.orientationResultsLocked ? (
              <div className="bg-white rounded-2xl border border-amber-200/90 p-8 text-center space-y-4 shadow-xs">
                <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center mx-auto border border-amber-200">
                  <Shield className="w-7 h-7 text-[#153B2B]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-serif text-[#153B2B]">
                    Résultats d'Orientation Réservés à l'Administration
                  </h3>
                  <p className="text-sm text-slate-700 max-w-lg mx-auto leading-relaxed">
                    La consultation des résultats d'orientation est actuellement réservée aux administrateurs de la commission. Vos déclarations et échanges avec votre conseiller ont bien été enregistrés dans votre dossier.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('interview')}
                  className="px-5 py-2.5 rounded-xl bg-[#153B2B] hover:bg-[#1A4533] text-white text-xs sm:text-sm font-bold cursor-pointer transition shadow-xs"
                >
                  Poursuivre mon entretien
                </button>
              </div>
            ) : (
              <>
                <CompetencyAnalysisView
                  analysis={journey.analysis}
                  onTriggerAnalysis={handleTriggerAnalysis}
                  loading={analysisLoading}
                  onGoToSpecialties={() => navigate('/eleve/guide')}
                  onGoToWriter={() => setActiveTab('interview')}
                />

                {/* Talent Radar 3 couches intégré dans l'Analyse des Compétences */}
                <div className="pt-4 border-t border-slate-200/80">
                  <TalentRadarPanel
                    onNavigateToSimulations={() => navigate('/eleve/guide')}
                    onNavigateToOrientation={() => setActiveTab('history')}
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('interview')}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Retour à Mon Entretien</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('history')}
                    className="px-5 py-2.5 rounded-xl bg-[#153B2B] hover:bg-[#1C4E39] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
                  >
                    <span>Consulter Mon Parcours</span>
                    <ArrowRight className="w-4 h-4 text-gold" />
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ONGLET 3 : MON PARCOURS */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            <JourneyHistoryTimeline
              historyData={historyData}
              currentJourney={journey}
              onLoadSnapshot={(snap) => {
                // Consultation sans écrasement
                setActiveTab('interview');
              }}
            />
          </div>
        )}

      </div>
    </div>
  );
}

