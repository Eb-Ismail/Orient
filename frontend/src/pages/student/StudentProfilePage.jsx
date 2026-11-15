import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { testService } from '../../services/testService.js';
import { workshopService } from '../../services/workshopService.js';
import { smartJourneyService } from '../../services/smartJourneyService.js';
import { GENDARMERIE_SPECIALTIES } from '../../data/gendarmerieSpecialtiesData.js';
import {
  Shield,
  Save,
  Award,
  Wrench,
  CheckCircle2,
  Sparkles,
  Check,
  ArrowRight,
  User,
  BookOpen,
  Compass
} from 'lucide-react';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import Badge from '../../components/common/Badge.jsx';
import CompetencyDossierPanel from '../../components/profile/CompetencyDossierPanel.jsx';

export default function StudentProfilePage() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  const validTabs = ['infos', 'competences', 'experiences'];
  const requestedTab = searchParams.get('tab');
  const [activeTab, setActiveTabState] = useState(
    validTabs.includes(requestedTab) ? requestedTab : 'infos'
  );

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

  // Référentiel unifié des 7 spécialités officielles de la Gendarmerie Royale
  const officialSpecialties = GENDARMERIE_SPECIALTIES;
  const officialCodesSet = new Set(officialSpecialties.map(s => s.id));

  const [preferences, setPreferences] = useState([
    { rang: 1, code: '', motivation: '' },
    { rang: 2, code: '', motivation: '' },
    { rang: 3, code: '', motivation: '' }
  ]);
  const [savingPrefs, setSavingPrefs] = useState(false);
  const [workshopsData, setWorkshopsData] = useState(null);
  const [loadingWorkshops, setLoadingWorkshops] = useState(true);
  const [journeyData, setJourneyData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [prefsRes, jRes] = await Promise.all([
          testService.getPreferences().catch(() => null),
          smartJourneyService.getJourney().catch(() => null)
        ]);
        if (jRes) setJourneyData(jRes);

        if (prefsRes?.preferences?.length > 0) {
          const loaded = [1, 2, 3].map(rang => {
            const found = prefsRes.preferences.find(p => p.rang === rang);
            return found || { rang, code: '', motivation: '' };
          });
          setPreferences(loaded);
        } else if (user?.preferencesSpecialites?.length > 0) {
          const loaded = [1, 2, 3].map(rang => {
            const found = user.preferencesSpecialites.find(p => p.rang === rang);
            return found || { rang, code: '', motivation: '' };
          });
          setPreferences(loaded);
        }

        // Chargement du dossier des ateliers pratiques
        if (user?.id || user?.UtilisateurId) {
          try {
            setLoadingWorkshops(true);
            const wsRes = await workshopService.getTraineeWorkshops(user?.id || user?.UtilisateurId);
            setWorkshopsData(wsRes);
          } catch (wsErr) {
            console.warn('Erreur chargement ateliers élève:', wsErr);
          } finally {
            setLoadingWorkshops(false);
          }
        }
      } catch (err) {
        console.warn('Erreur chargement préférences:', err);
      }
    };

    loadData();
  }, [user]);

  const handlePreferenceChange = (index, field, value) => {
    setPreferences(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleSavePreferences = async (e) => {
    e.preventDefault();
    setSavingPrefs(true);
    try {
      const filtered = preferences.filter(p => p.code && p.code.trim().length > 0);
      await testService.savePreferences(filtered);
      addToast({
        title: 'Vœux enregistrés',
        message: 'Vos préférences professionnelles ont été mises à jour.',
        type: 'success'
      });
    } catch (err) {
      addToast({
        title: 'Erreur',
        message: "Impossible d'enregistrer vos préférences.",
        type: 'error'
      });
    } finally {
      setSavingPrefs(false);
    }
  };

  const sigycopData = user?.sigycopComplet || {
    S: 1, I: 1, G: 1, Y: user?.visionY || user?.visionSIGYCOP_Y || 1, C: 1, O: 1, P: 1
  };

  const subjectGrades = user?.moyennesMatieres || {
    DROIT_PENAL: 16.0,
    PROCEDURE_PENALE: 15.5,
    DEONTOLOGIE: 17.0,
    POLICE_ROUTE: 14.5,
    TECHNIQUES_ENQUETE: 16.5,
    INFORMATIQUE: 14.0
  };

  const practicalSkills = user?.competencesPratiques || {
    TIR_MAITRISE_ARME: 16.5,
    CONDUITE_RAPIDE: 15.0,
    GESTION_STRESS: 16.0,
    INTERVENTION_TACTIQUE: 15.5
  };

  // Ateliers validés pour le dossier militaire
  const validatedWorkshops = (workshopsData?.ateliers || []).filter(
    a => a.Statut === 'VALIDE' || a.Statut === 'EVALUE'
  );

  return (
    <div className="w-full space-y-6 animate-fade-slide">
      {/* En-tête */}
      <div className="pb-4 border-b border-slateSubtle-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gendarmerie uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4 text-gold" />
            Dossier Militaire Individuel
          </div>
          <h1 className="text-2xl font-bold text-gendarmerie font-serif">
            Mon Profil & Dossier de Compétences
          </h1>
          <p className="text-xs text-slateSubtle-600">
            Informations personnelles, aptitudes biométriques, expériences déclarées, dossier de compétences et vœux sur les 7 spécialités.
          </p>
        </div>

        {/* Navigation interne des 3 sous-espaces de Mon Profil */}
        <div className="bg-white p-1.5 rounded-2xl border border-slateSubtle-200 shadow-2xs flex items-center gap-1 overflow-x-auto shrink-0">
          {[
            { id: 'infos', label: 'Infos & Vœux', icon: User },
            { id: 'competences', label: 'Dossier Compétences', icon: Award },
            { id: 'experiences', label: 'Mes Expériences', icon: BookOpen }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive ? 'bg-gendarmerie text-white shadow-xs' : 'text-slateSubtle-700 hover:bg-cream-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-gold' : 'text-slateSubtle-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Identité militaire */}
      <div className="p-5 bg-white rounded-2xl border border-slateSubtle-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gendarmerie text-white flex items-center justify-center font-bold text-lg font-serif">
            {user?.nom?.charAt(0) || 'E'}
          </div>
          <div>
            <h2 className="text-lg font-bold text-gendarmerie">
              {user?.prenom} {user?.nom}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slateSubtle-600 mt-0.5">
              <span className="font-mono">Matricule : <strong>{user?.matricule}</strong></span>
              <span>•</span>
              <span>{user?.email}</span>
              <span>•</span>
              <span>{user?.promotionNom || "Promotion 2026"}</span>
            </div>
          </div>
        </div>
        <Badge type="ELEVE" />
      </div>

      {activeTab === 'competences' && <CompetencyDossierPanel />}

      {activeTab === 'experiences' && (
        <div className="space-y-4">
          <Card
            title="Récit Personnel & Expériences Déclarées"
            subtitle="Informations issues de votre Parcours IA utilisées pour valoriser votre dossier."
          >
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-cream-50 border border-slateSubtle-200 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-gendarmerie block">Présentation libre :</span>
                <p className="text-slateSubtle-800 whitespace-pre-line leading-relaxed">
                  {journeyData?.bioLibre?.trim() || "Aucun récit libre rédigé pour le moment."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { key: 'scolaire', label: 'Parcours Scolaire & Diplômes' },
                  { key: 'professionnel', label: 'Expériences Professionnelles' },
                  { key: 'sportAssociatif', label: 'Sport, Engagement & Bénévolat' },
                  { key: 'competencesTechniques', label: 'Compétences Techniques & Outils' },
                  { key: 'languesCentresInteret', label: "Langues & Centres d'Intérêt" },
                  { key: 'responsabilitesEtDefis', label: 'Responsabilités & Situations de Crise' }
                ].map((sec) => (
                  <div key={sec.key} className="p-3.5 rounded-xl bg-white border border-slateSubtle-200 space-y-1">
                    <span className="text-[11px] font-bold text-gendarmerie block">{sec.label}</span>
                    <p className="text-slateSubtle-700 leading-relaxed">
                      {journeyData?.sections?.[sec.key]?.trim() || 'Non renseigné'}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-2">
                <Link
                  to="/eleve/parcours-intelligent?tab=interview"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gendarmerie text-white text-xs font-bold hover:bg-[#1C4E39] transition"
                >
                  <Compass className="w-3.5 h-3.5 text-gold" />
                  <span>Compléter ou modifier dans Parcours IA</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'infos' && (
        <div className="space-y-6">

      {/* Données Biométriques & Médicales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Mensurations & Aptitudes Physiques">
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-cream-50 border border-slateSubtle-200">
              <span className="text-slateSubtle-600">Âge</span>
              <strong className="text-gendarmerie">{user?.age || 23} ans</strong>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-cream-50 border border-slateSubtle-200">
              <span className="text-slateSubtle-600">Taille</span>
              <strong className="text-gendarmerie">{user?.tailleCm || 180} cm</strong>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-cream-50 border border-slateSubtle-200">
              <span className="text-slateSubtle-600">Poids</span>
              <strong className="text-gendarmerie">{user?.poidsKg || 75} kg</strong>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-cream-50 border border-slateSubtle-200">
              <span className="text-slateSubtle-600">Vision SIGYCOP (Y)</span>
              <strong className="text-gendarmerie">Y = {user?.visionY || user?.visionSIGYCOP_Y || 1}</strong>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-cream-50 border border-slateSubtle-200">
              <span className="text-slateSubtle-600">Sport (CCPM)</span>
              <strong className="text-gendarmerie">{user?.aptitudePhysique || 16.5} / 20</strong>
            </div>
          </div>
        </Card>

        <Card title="Profil Médical SIGYCOP">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-cream-50 border border-slateSubtle-200 text-xs">
              <span className="text-slateSubtle-700 font-medium">Aptitude Médicale Globale</span>
              <Badge type={user?.statutMedical || 'SIGYCOP_VALIDE'} />
            </div>

            <div className="p-3 rounded-xl border border-slateSubtle-200 bg-white">
              <span className="text-[10px] font-bold text-slateSubtle-500 uppercase tracking-wider block mb-2">
                Coefficients SIGYCOP :
              </span>
              <div className="grid grid-cols-7 gap-1 text-center font-mono">
                {Object.entries(sigycopData).map(([letter, val]) => (
                  <div key={letter} className="bg-cream-50 p-2 rounded-lg border border-slateSubtle-200">
                    <span className="font-bold text-slateSubtle-500 block text-[10px]">{letter}</span>
                    <span className="text-sm font-bold text-gendarmerie">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Notes de Formation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Notes Académiques (Formation Initiale)">
          <div className="space-y-2 text-xs">
            {Object.entries(subjectGrades).map(([code, note]) => (
              <div key={code} className="flex items-center justify-between p-2 rounded-lg bg-cream-50 border border-slateSubtle-100">
                <span className="text-slateSubtle-700 font-medium">{code.replace(/_/g, ' ')}</span>
                <span className="font-bold text-gendarmerie">{note} / 20</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Aptitudes Pratiques & Terrain">
          <div className="space-y-2 text-xs">
            {Object.entries(practicalSkills).map(([code, note]) => (
              <div key={code} className="flex items-center justify-between p-2 rounded-lg bg-cream-50 border border-slateSubtle-100">
                <span className="text-slateSubtle-700 font-medium">{code.replace(/_/g, ' ')}</span>
                <span className="font-bold text-gendarmerie">{note} / 20</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Évaluations en Ateliers Pratiques & Compétences Métier (Étape 7 du Workflow) */}
      <Card
        title="Compétences Professionnelles & Ateliers Pratiques"
        subtitle="Mises en situation technique réelles supervisées et barème officiel sur 20 points"
      >
        <div className="space-y-4">
          {/* Synthèse des KPIs Ateliers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-cream-50 border border-slateSubtle-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slateSubtle-600 block">
                  Ateliers Validés
                </span>
                <span className="text-lg font-bold text-gendarmerie font-serif mt-0.5 block">
                  {validatedWorkshops.length} / {workshopsData?.totalAssignes || 0}
                </span>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>

            <div className="p-3 rounded-xl bg-cream-50 border border-slateSubtle-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slateSubtle-600 block">
                  Moyenne Pratique
                </span>
                <span className="text-lg font-bold text-gendarmerie font-serif mt-0.5 block">
                  {workshopsData?.scoreMoyenPourcentage !== null && workshopsData?.scoreMoyenPourcentage !== undefined
                    ? `${workshopsData.scoreMoyenPourcentage}% (${Math.round((workshopsData.scoreMoyenPourcentage * 20) / 100 * 10) / 10}/20)`
                    : '—'}
                </span>
              </div>
              <Award className="w-5 h-5 text-gold-dark" />
            </div>

            <div className="p-3 rounded-xl bg-cream-50 border border-slateSubtle-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slateSubtle-600 block">
                  Aptitudes Démontrées
                </span>
                <span className="text-lg font-bold text-gendarmerie font-serif mt-0.5 block">
                  {workshopsData?.competencesDetectees?.length || 0} compétences
                </span>
              </div>
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
          </div>

          {/* Badges des compétences métier attestées */}
          {workshopsData?.competencesDetectees?.length > 0 && (
            <div className="p-3 rounded-xl bg-gold/10 border border-gold/25 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-gold-dark block">
                Compétences Pratiques Certifiées par les Commissions :
              </span>
              <div className="flex flex-wrap gap-1.5">
                {workshopsData.competencesDetectees.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white text-gendarmerie border border-gold/30 shadow-2xs"
                  >
                    <Sparkles className="w-3 h-3 text-gold" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Liste des ateliers validés */}
          {validatedWorkshops.length === 0 ? (
            <div className="text-center py-6 px-4 rounded-xl bg-cream-50/50 border border-dashed border-slateSubtle-200 text-xs text-slateSubtle-600">
              <Wrench className="w-6 h-6 text-slateSubtle-400 mx-auto mb-1.5" />
              <p className="font-medium text-gendarmerie">Aucun atelier pratique validé pour le moment</p>
              <p className="text-[11px] mt-0.5">Les évaluations saisies par vos superviseurs d'atelier apparaîtront automatiquement dans ce dossier.</p>
              <div className="mt-3">
                <Link
                  to="/eleve/guide"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gendarmerie hover:text-gold-dark transition-colors"
                >
                  <span>Accéder au GUIDE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              {validatedWorkshops.map((ws) => (
                <div
                  key={ws.AssignationId}
                  className="p-3.5 rounded-xl bg-white border border-slateSubtle-200 hover:border-gold/40 transition-colors text-xs space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-cream-200 text-gendarmerie">
                          {ws.Atelier?.Code}
                        </span>
                        <strong className="text-gendarmerie">{ws.Atelier?.Titre}</strong>
                      </div>
                      <div className="text-[11px] text-slateSubtle-500 mt-0.5">
                        Évalué par {ws.SuperviseurNom} • {ws.DateRealisation ? new Date(ws.DateRealisation).toLocaleDateString('fr-FR') : '—'}
                      </div>
                    </div>

                    <div className="sm:text-right shrink-0">
                      <span className="text-sm font-bold text-gendarmerie font-serif">
                        {ws.ScoreObtenu} / {ws.ScoreTotalMax || 20} pts
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-700 ml-1.5">
                        ({ws.ScorePourcentage}%) — {ws.Mention}
                      </span>
                    </div>
                  </div>

                  {ws.RecommandationSpecialite && (
                    <div className="text-[11px] text-slateSubtle-700 flex items-center gap-1.5">
                      <span className="text-slateSubtle-500">Orientation suggérée :</span>
                      <span className="font-bold text-gendarmerie px-2 py-0.5 rounded bg-cream-100 border border-slateSubtle-200">
                        {ws.RecommandationSpecialite}
                      </span>
                    </div>
                  )}

                  {ws.PointsForts && ws.PointsForts.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slateSubtle-100">
                      <span className="text-[10px] font-bold text-slateSubtle-500">Points forts :</span>
                      {ws.PointsForts.map((pf, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-medium"
                        >
                          <Check className="w-2.5 h-2.5 text-emerald-600" />
                          <span>{pf}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slateSubtle-100">
                <button
                  type="button"
                  onClick={() => setActiveTab('competences')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gendarmerie text-white text-xs font-semibold hover:bg-gendarmerie-dark transition shadow-2xs cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>Ouvrir le Dossier de Compétences Complet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <Link
                  to="/eleve/guide"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gendarmerie hover:text-gold-dark transition-colors"
                >
                  <span>Explorer le GUIDE officiel</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Vœux de Spécialité unifiés sur les 7 branches officielles */}
      <Card
        title="Vœux d'Affectation & Préférences (7 Spécialités Officielles)"
        subtitle="Vos souhaits portent sur le référentiel des 7 branches de la Gendarmerie Royale et sont consultatifs pour la commission."
      >
        <form onSubmit={handleSavePreferences} className="space-y-3.5">
          {preferences.map((pref, idx) => {
            const isLegacyCode = pref.code && !officialCodesSet.has(pref.code);
            return (
              <div key={pref.rang} className="p-3.5 rounded-xl bg-cream-50/50 border border-slateSubtle-200 space-y-2">
                <span className="text-xs font-bold text-gendarmerie block">
                  Choix #{pref.rang} :
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <select
                    value={pref.code}
                    onChange={(e) => handlePreferenceChange(idx, 'code', e.target.value)}
                    className="text-xs p-2.5 border border-slateSubtle-200 rounded-xl bg-white text-slateSubtle-800 focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie"
                  >
                    <option value="">-- Choisir une spécialité --</option>
                    {officialSpecialties.map(spec => (
                      <option key={spec.id} value={spec.id}>
                        {spec.nomFr} ({spec.id})
                      </option>
                    ))}
                    {isLegacyCode && (
                      <option value={pref.code}>
                        Ancien vœu conservé : {pref.code}
                      </option>
                    )}
                  </select>
                  <input
                    type="text"
                    value={pref.motivation}
                    onChange={(e) => handlePreferenceChange(idx, 'motivation', e.target.value)}
                    placeholder="Motivation ou projet professionnel..."
                    className="sm:col-span-2 text-xs p-2.5 border border-slateSubtle-200 rounded-xl bg-white text-slateSubtle-800 focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie"
                  />
                </div>
              </div>
            );
          })}

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              variant="primary"
              icon={Save}
              loading={savingPrefs}
            >
              Enregistrer mes vœux
            </Button>
          </div>
        </form>
      </Card>
        </div>
      )}
    </div>
  );
}
