import React, { useState, useEffect, useMemo } from 'react';
import { adminService } from '../../services/adminService.js';
import { useToast } from '../../context/ToastContext.jsx';
import {
  BarChart3,
  Search,
  Filter,
  Eye,
  Award,
  Shield,
  Download,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileSpreadsheet,
  Printer,
  Sparkles,
  TrendingUp,
  Sliders,
  Check,
  Edit3,
  Users,
  GraduationCap,
  ShieldCheck,
  Wrench,
  Clock,
  RotateCcw,
  FileText
} from 'lucide-react';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import Badge from '../../components/common/Badge.jsx';
import Modal from '../../components/common/Modal.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

// 7 Spécialités Officielles
const SPECIALITES_OFFICIELLES = [
  { code: 'SPEC-TERR', intitule: 'SPEC-TERR — Gendarmerie Territoriale' },
  { code: 'SPEC-MOB', intitule: 'SPEC-MOB — Gendarmerie Mobile' },
  { code: 'SPEC-MARIT', intitule: 'SPEC-MARIT — Gendarmerie Maritime' },
  { code: 'SPEC-AIR', intitule: 'SPEC-AIR — Gendarmerie Aérienne' },
  { code: 'SPEC-PREV', intitule: 'SPEC-PREV — Prévôté Militaire' },
  { code: 'SPEC-PST', intitule: 'SPEC-PST — Police Scientifique et Technique' },
  { code: 'SPEC-INTERV', intitule: "SPEC-INTERV — Unités d'Intervention et Spécialisées" }
];

export default function StudentResultsAdminPage() {
  const { showSuccessToast, showErrorToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [dataPayload, setDataPayload] = useState({ kpi: {}, summaries: [] });

  // Filtres
  const [search, setSearch] = useState('');
  const [filterFiliere, setFilterFiliere] = useState('ALL');
  const [filterSpecialite, setFilterSpecialite] = useState('ALL');
  const [filterPromotion, setFilterPromotion] = useState('ALL');
  const [filterDomaine, setFilterDomaine] = useState('ALL');
  const [filterStatut, setFilterStatut] = useState('ALL');
  const [filterEvaluateur, setFilterEvaluateur] = useState('');

  // Modal de validation administrative
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [modalAction, setModalAction] = useState('VALIDER'); // 'VALIDER' | 'REJETER'
  const [selectedSpec, setSelectedSpec] = useState('SPEC-TERR');
  const [justification, setJustification] = useState('');
  const [confirmCheckbox, setConfirmCheckbox] = useState(false);
  const [savingDecision, setSavingDecision] = useState(false);

  // Modal de consultation approfondie
  const [detailStudent, setDetailStudent] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const fetchPreselectionData = async () => {
    try {
      setLoading(true);
      const res = await adminService.getPreselectionOverview();
      setDataPayload(res || { kpi: {}, summaries: [] });
    } catch (err) {
      console.error('Erreur chargement pré-sélection admin:', err);
      showErrorToast("Erreur lors de la récupération des synthèses SQL.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreselectionData();
  }, []);

  const kpi = dataPayload?.kpi || {};
  const rawSummaries = dataPayload?.summaries || [];

  // Options uniques pour les filtres
  const uniquePromotions = useMemo(() => {
    const set = new Set();
    rawSummaries.forEach(s => { if (s.promotionNom) set.add(s.promotionNom); });
    return Array.from(set);
  }, [rawSummaries]);

  const uniqueDomaines = useMemo(() => {
    const set = new Set();
    rawSummaries.forEach(s => { if (s.domaineTechnique) set.add(s.domaineTechnique); });
    return Array.from(set);
  }, [rawSummaries]);

  // Filtrage combiné
  const filteredSummaries = useMemo(() => {
    return rawSummaries.filter(s => {
      // Recherche
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchName = `${s.nom} ${s.prenom} ${s.matricule}`.toLowerCase().includes(q);
        if (!matchName) return false;
      }
      // Filière d'entrée
      if (filterFiliere !== 'ALL' && s.filiereEntree !== filterFiliere) return false;
      // Spécialité proposée
      if (filterSpecialite !== 'ALL' && s.specialiteProposeeCode !== filterSpecialite) return false;
      // Promotion
      if (filterPromotion !== 'ALL' && s.promotionNom !== filterPromotion) return false;
      // Domaine technique
      if (filterDomaine !== 'ALL' && s.domaineTechnique !== filterDomaine) return false;
      // Statut de pré-sélection
      if (filterStatut !== 'ALL' && s.statutPreselection !== filterStatut) return false;
      // Évaluateur / Commission
      if (filterEvaluateur.trim()) {
        const instMatch = ((s.evaluateurNom || s.dernierInstructeur) || '').toLowerCase().includes(filterEvaluateur.toLowerCase());
        if (!instMatch) return false;
      }
      return true;
    });
  }, [rawSummaries, search, filterFiliere, filterSpecialite, filterPromotion, filterDomaine, filterStatut, filterEvaluateur]);

  // Ouverture du modal de validation administrative
  const handleOpenValidation = (student, action = 'VALIDER') => {
    setSelectedStudent(student);
    setModalAction(action);
    setSelectedSpec(student.specialiteProposeeCode || 'SPEC-TERR');
    setJustification(
      action === 'VALIDER'
        ? `Affectation validée conformément aux compétences de terrain et aux délibérations de la commission d'orientation 2026.`
        : `Dossier réorienté vers une évaluation complémentaire ou spécialité alternative.`
    );
    setConfirmCheckbox(false);
    setShowValidationModal(true);
  };

  // Enregistrement de la décision administrative dans SQL Server
  const handleConfirmDecision = async (e) => {
    e.preventDefault();
    if (!selectedStudent) return;

    if (!confirmCheckbox) {
      showErrorToast("Veuillez cocher la confirmation explicite de la commission.");
      return;
    }
    if (!justification.trim()) {
      showErrorToast("La justification administrative est obligatoire.");
      return;
    }

    try {
      setSavingDecision(true);
      await adminService.validateAssignment({
        studentId: selectedStudent.studentId,
        action: modalAction,
        specialiteRetenueCode: selectedSpec,
        justification: justification.trim()
      });

      showSuccessToast(
        modalAction === 'VALIDER'
          ? `Affectation validée avec succès pour ${selectedStudent.prenom} ${selectedStudent.nom} (${selectedSpec}). Décision verrouillée.`
          : `Proposition rejetée pour ${selectedStudent.prenom} ${selectedStudent.nom}.`
      );

      setShowValidationModal(false);
      await fetchPreselectionData();
    } catch (err) {
      console.error('Erreur validation administrative:', err);
      showErrorToast(err.response?.data?.error || err.message || "Erreur lors de la validation SQL.");
    } finally {
      setSavingDecision(false);
    }
  };

  // Badge du statut de pré-sélection
  const renderStatusBadge = (statut) => {
    switch (statut) {
      case 'TALENT_CACHE':
        return <Badge type="WARNING" label="Talent Caché" size="xs" />;
      case 'SPECIALISTE_CONFIRME':
        return <Badge type="SUCCESS" label="Spécialiste confirmé" size="xs" />;
      case 'AFFECTATION_VALIDEE':
        return <Badge type="ADMIN" label="Affectation validée" size="xs" />;
      case 'PROPOSITION_REJETEE':
        return <Badge type="DANGER" label="Proposition rejetée" size="xs" />;
      case 'SOUS_SPECIALISATION_RECOMMANDEE':
        return <Badge type="INFO" label="Sous-spécialisation" size="xs" />;
      case 'EVAL_COMPLEMENTAIRE':
        return <Badge type="NEUTRAL" label="Éval. complémentaire" size="xs" />;
      default:
        return <Badge type="NEUTRAL" label="Service Général" size="xs" />;
    }
  };

  if (loading) {
    return <LoadingSpinner text="Chargement des synthèses de pré-sélection et affectation..." fullPage />;
  }

  return (
    <div className="space-y-6 animate-fade-slide pb-12">
      {/* 1. En-tête de la page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slateSubtle-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gendarmerie uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4 text-gold" />
            Commission de Pré-sélection & Gouvernance • 2026
          </div>
          <h1 className="text-2xl font-extrabold text-gendarmerie font-serif">
            Pré-sélection & Affectation par Spécialité
          </h1>
          <p className="text-xs text-slateSubtle-700 mt-1 max-w-3xl">
            Croisement des évaluations pratiques de terrain, des diplômes ISTA, des aptitudes Bac et validation officielle des affectations par le Commandement.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchPreselectionData}
            icon={RotateCcw}
          >
            Actualiser SQL
          </Button>
        </div>
      </div>

      {/* 2. Les 4 Cartes KPI Officielles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 : Total Élèves Évalués */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              1. Élèves Évalués Terrain
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {kpi.totalElevesEvalues || 0}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              / {kpi.totalElevesCohorte || 0} élèves
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Évaluations pratiques réelles sur atelier
          </p>
        </div>

        {/* KPI 2 : Spécialistes ISTA Confirmés */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              2. Spécialistes ISTA Confirmés
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-700">
              {kpi.specialistesIstaConfirmes || 0}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              profils certifiés
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Diplôme technique + validation terrain
          </p>
        </div>

        {/* KPI 3 : Talents Cachés Détectés — Profils Bac */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              3. Talents Cachés (Bac)
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-gold" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-600">
              {kpi.talentsCachesDetectes || 0}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              réserves techniques
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Moyenne ≥ 15/20 & autonomie constatée
          </p>
        </div>

        {/* KPI 4 : Taux d'Adéquation Globale */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              4. Taux d'Adéquation
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-purple-700">
              {kpi.tauxAdequationGlobale || 0}%
            </span>
            <span className="text-xs text-slate-500 font-medium">
              adéquation ciblée
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Rapprochement compétences / besoins
          </p>
        </div>
      </div>

      {/* 3. Filtres du Tableau Général */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <Filter className="w-4 h-4 text-gold" />
          Filtres Opérationnels Multi-Critères
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {/* Recherche Nom/Matricule */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Recherche</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Nom, matricule..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-xs rounded-lg border border-slate-300 pl-8 pr-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-gendarmerie"
              />
            </div>
          </div>

          {/* Filtre Filière */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Filière d'Entrée</label>
            <select
              value={filterFiliere}
              onChange={(e) => setFilterFiliere(e.target.value)}
              className="w-full text-xs rounded-lg border border-slate-300 px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-gendarmerie"
            >
              <option value="ALL">Toutes filières</option>
              <option value="NORMAL_BAC">Baccalauréat (Normal)</option>
              <option value="SPECIALISTE_ISTA">Spécialiste (ISTA/OFPPT)</option>
            </select>
          </div>

          {/* Filtre Spécialité */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Spécialité Proposée</label>
            <select
              value={filterSpecialite}
              onChange={(e) => setFilterSpecialite(e.target.value)}
              className="w-full text-xs rounded-lg border border-slate-300 px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-gendarmerie"
            >
              <option value="ALL">Toutes spécialités</option>
              {SPECIALITES_OFFICIELLES.map(s => (
                <option key={s.code} value={s.code}>{s.code}</option>
              ))}
            </select>
          </div>

          {/* Filtre Promotion */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Promotion</label>
            <select
              value={filterPromotion}
              onChange={(e) => setFilterPromotion(e.target.value)}
              className="w-full text-xs rounded-lg border border-slate-300 px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-gendarmerie"
            >
              <option value="ALL">Toutes promotions</option>
              {uniquePromotions.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Filtre Domaine */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Domaine Technique</label>
            <select
              value={filterDomaine}
              onChange={(e) => setFilterDomaine(e.target.value)}
              className="w-full text-xs rounded-lg border border-slate-300 px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-gendarmerie"
            >
              <option value="ALL">Tous domaines</option>
              {uniqueDomaines.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Filtre Statut */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Statut Pré-sélection</label>
            <select
              value={filterStatut}
              onChange={(e) => setFilterStatut(e.target.value)}
              className="w-full text-xs rounded-lg border border-slate-300 px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-gendarmerie"
            >
              <option value="ALL">Tous statuts</option>
              <option value="TALENT_CACHE">Talent Caché (Bac)</option>
              <option value="SPECIALISTE_CONFIRME">Spécialiste confirmé</option>
              <option value="AFFECTATION_VALIDEE">Affectation validée</option>
              <option value="PROPOSITION_REJETEE">Proposition rejetée</option>
              <option value="EVAL_COMPLEMENTAIRE">Éval. complémentaire</option>
              <option value="SERVICE_GENERAL">Service Général</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. Tableau Général de Pré-sélection & Affectation */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gendarmerie" />
            <h3 className="font-bold text-sm text-gendarmerie">
              Liste des Candidatures à l'Arbitrage ({filteredSummaries.length} élève{filteredSummaries.length > 1 ? 's' : ''})
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            Données SQL réelles • Commission d'Affectation
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider">
                <th className="py-3 px-3.5">Élève Gendarme</th>
                <th className="py-3 px-3">Matricule</th>
                <th className="py-3 px-3">Filière d'Entrée</th>
                <th className="py-3 px-3">Diplôme d'Origine</th>
                <th className="py-3 px-3 text-center">Max Pratique</th>
                <th className="py-3 px-3 text-center">Moy. Pratique</th>
                <th className="py-3 px-3">Commission / Évaluateur</th>
                <th className="py-3 px-3">Spécialité Proposée</th>
                <th className="py-3 px-3 text-center">Statut Pré-sélection</th>
                <th className="py-3 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredSummaries.length === 0 ? (
                <tr>
                  <td colSpan="10" className="py-8 text-center text-slate-500 italic">
                    Aucun élève ne correspond aux filtres sélectionnés.
                  </td>
                </tr>
              ) : (
                filteredSummaries.map((st) => (
                  <tr key={st.studentId} className="hover:bg-slate-50/80 transition-colors">
                    {/* Nom et Prénom */}
                    <td className="py-2.5 px-3.5">
                      <div className="font-bold text-slate-900 text-sm">
                        {st.nom?.toUpperCase()} {st.prenom}
                      </div>
                      <div className="text-[10px] text-slate-500">{st.promotionNom}</div>
                    </td>

                    {/* Matricule */}
                    <td className="py-2.5 px-3 font-mono font-semibold text-slate-700">
                      {st.matricule}
                    </td>

                    {/* Filière d'Entrée */}
                    <td className="py-2.5 px-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        st.filiereEntree === 'SPECIALISTE_ISTA'
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {st.filiereEntree === 'SPECIALISTE_ISTA' ? 'ISTA / Spécialiste' : 'Bac / Normal'}
                      </span>
                    </td>

                    {/* Diplôme d'origine */}
                    <td className="py-2.5 px-3 text-slate-700">
                      {st.diplomeOrigine ? (
                        <span className="truncate max-w-[180px] block" title={st.diplomeOrigine}>
                          {st.diplomeOrigine}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">Non renseigné</span>
                      )}
                    </td>

                    {/* Meilleure note pratique */}
                    <td className="py-2.5 px-3 text-center">
                      <span className="font-bold text-slate-800">
                        {st.meilleureNotePratique !== null ? `${st.meilleureNotePratique}/20` : '—'}
                      </span>
                    </td>

                    {/* Moyenne pratique */}
                    <td className="py-2.5 px-3 text-center">
                      <span className={`font-black text-sm ${
                        (st.moyennePratique || 0) >= 15 ? 'text-emerald-700' : (st.moyennePratique || 0) >= 10 ? 'text-blue-700' : 'text-slate-500'
                      }`}>
                        {st.moyennePratique !== null ? `${st.moyennePratique}/20` : '—'}
                      </span>
                    </td>

                    {/* Commission / Évaluateur */}
                    <td className="py-2.5 px-3 text-slate-700 text-[11px]">
                      {st.evaluateurNom || st.dernierInstructeur || <span className="text-slate-400 italic">En attente</span>}
                    </td>

                    {/* Spécialité proposée */}
                    <td className="py-2.5 px-3">
                      <span className="font-bold text-gendarmerie text-xs px-2 py-0.5 rounded bg-cream-100 border border-gold/30">
                        {st.specialiteProposeeCode}
                      </span>
                    </td>

                    {/* Statut Pré-sélection */}
                    <td className="py-2.5 px-3 text-center">
                      {renderStatusBadge(st.statutPreselection)}
                    </td>

                    {/* Action */}
                    <td className="py-2.5 px-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => {
                            setDetailStudent(st);
                            setShowDetailModal(true);
                          }}
                          className="p-1 rounded hover:bg-slate-200 text-slate-600 transition"
                          title="Consulter le dossier d'arbitrage"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleOpenValidation(st, 'VALIDER')}
                          className="px-2 py-1 rounded bg-[#1B4332] hover:bg-[#153B2B] text-white text-[11px] font-bold transition flex items-center gap-1 shadow-2xs"
                          title="Valider officiellement l'affectation"
                        >
                          <ShieldCheck className="w-3 h-3 text-gold" />
                          <span>Valider</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Modal de Validation Administrative Officielle */}
      {showValidationModal && selectedStudent && (
        <Modal
          isOpen={showValidationModal}
          onClose={() => setShowValidationModal(false)}
          title={`Décision Administrative d'Affectation — ${selectedStudent.prenom} ${selectedStudent.nom?.toUpperCase()}`}
          size="lg"
        >
          <form onSubmit={handleConfirmDecision} className="space-y-4 text-xs">
            {/* Récapitulatif de l'élève */}
            <div className="p-3.5 rounded-xl bg-cream-50 border border-cream-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-gendarmerie">
                  {selectedStudent.prenom} {selectedStudent.nom?.toUpperCase()} ({selectedStudent.matricule})
                </span>
                <Badge
                  type={selectedStudent.filiereEntree === 'SPECIALISTE_ISTA' ? 'SUCCESS' : 'INFO'}
                  label={selectedStudent.filiereLabel}
                  size="sm"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-cream-200 text-[11px]">
                <div>
                  <span className="text-slate-500 block">Moyenne Pratique :</span>
                  <strong className="text-emerald-800 text-sm">{selectedStudent.moyennePratique ?? '—'} / 20</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Meilleure Note :</span>
                  <strong className="text-slate-800">{selectedStudent.meilleureNotePratique ?? '—'} / 20</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Filière / Diplôme :</span>
                  <span className="text-slate-800 truncate block">{selectedStudent.diplomeOrigine || 'Bac Général'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Statut Actuel :</span>
                  <strong className="text-gold-dark">{selectedStudent.statutLabel}</strong>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-700 bg-white/80 p-2 rounded border border-slate-200">
                <strong>Analyse consultative du moteur :</strong> {selectedStudent.explication}
              </div>
            </div>

            {/* Choix de l'action : Valider ou Rejeter */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setModalAction('VALIDER')}
                className={`py-2 px-3 rounded-xl font-bold border transition text-center ${
                  modalAction === 'VALIDER'
                    ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                ✓ Valider l'affectation officielle
              </button>
              <button
                type="button"
                onClick={() => setModalAction('REJETER')}
                className={`py-2 px-3 rounded-xl font-bold border transition text-center ${
                  modalAction === 'REJETER'
                    ? 'bg-rose-800 text-white border-rose-900 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                ✕ Rejeter / Réorienter la proposition
              </button>
            </div>

            {/* Sélection de la spécialité officielle retenue */}
            {modalAction === 'VALIDER' && (
              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider text-[10px]">
                  Spécialité Officielle d'Affectation Retenue
                </label>
                <select
                  value={selectedSpec}
                  onChange={(e) => setSelectedSpec(e.target.value)}
                  className="w-full text-xs rounded-lg border border-slate-300 p-2 focus:ring-2 focus:ring-gendarmerie"
                >
                  {SPECIALITES_OFFICIELLES.map(s => (
                    <option key={s.code} value={s.code}>{s.intitule}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Justification de la décision */}
            <div>
              <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider text-[10px]">
                Motif & Justification Administrative (Consigné dans le Journal d'Audit SQL)
              </label>
              <textarea
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                rows={3}
                required
                placeholder="Renseigner les considérations ayant motivé l'arbitrage de la commission..."
                className="w-full text-xs rounded-lg border border-slate-300 p-2.5 focus:ring-2 focus:ring-gendarmerie"
              />
            </div>

            {/* Confirmation explicite */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2.5">
              <input
                type="checkbox"
                id="confirmDecisionCheck"
                checked={confirmCheckbox}
                onChange={(e) => setConfirmCheckbox(e.target.checked)}
                className="mt-0.5 accent-gendarmerie cursor-pointer"
              />
              <label htmlFor="confirmDecisionCheck" className="text-[11px] text-amber-950 cursor-pointer">
                <strong>Attestation formelle :</strong> Je confirme que cette décision engage officiellement la commission d'orientation et sera verrouillée dans la base de données sans écrasement automatique par les algorithmes IA.
              </label>
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowValidationModal(false)}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                loading={savingDecision}
                disabled={!confirmCheckbox || !justification.trim()}
                className={modalAction === 'VALIDER' ? 'bg-[#1B4332] text-white' : 'bg-rose-700 text-white'}
              >
                {modalAction === 'VALIDER' ? 'Confirmer la Validation Officielle' : 'Confirmer le Rejet de la Proposition'}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* 6. Modal de Consultation Détaillée du Dossier Élève */}
      {showDetailModal && detailStudent && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title={`Dossier de Pré-sélection — ${detailStudent.prenom} ${detailStudent.nom?.toUpperCase()}`}
          size="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">
                    {detailStudent.prenom} {detailStudent.nom?.toUpperCase()}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Matricule: {detailStudent.matricule} • {detailStudent.promotionNom}
                  </p>
                </div>
                {renderStatusBadge(detailStudent.statutPreselection)}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-200">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Filière d'Entrée</span>
                  <strong className="text-slate-800">{detailStudent.filiereLabel}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Moyenne Pratique</span>
                  <strong className="text-emerald-700 text-sm">{detailStudent.moyennePratique ?? '—'} / 20</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Meilleure Note</span>
                  <strong className="text-slate-800">{detailStudent.meilleureNotePratique ?? '—'} / 20</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Spécialité Proposée</span>
                  <strong className="text-gendarmerie">{detailStudent.specialiteProposeeCode}</strong>
                </div>
              </div>
            </div>

            {/* Compétences Validées */}
            <div>
              <h5 className="font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-2">
                Compétences Pratiques Validées sur Atelier
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {(detailStudent.competencesValidees || []).length === 0 ? (
                  <span className="text-slate-400 italic">Aucune compétence validée enregistrée.</span>
                ) : (
                  detailStudent.competencesValidees.map((c, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-medium">
                      ✓ {c}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Justification & Évaluations utilisées */}
            <div>
              <h5 className="font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-1">
                Analyse & Motivation Consultative
              </h5>
              <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 leading-relaxed">
                {detailStudent.explication}
              </p>
            </div>

            {/* Évaluations pratiques réelles */}
            {detailStudent.evaluationsPratiques && detailStudent.evaluationsPratiques.length > 0 && (
              <div>
                <h5 className="font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-2">
                  Séances Pratiques Évaluées en Commission ({detailStudent.evaluationsPratiques.length})
                </h5>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {detailStudent.evaluationsPratiques.map((ev, i) => (
                    <div key={i} className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between text-[11px]">
                      <div>
                        <strong className="text-slate-800">{ev.workshopTitre || ev.workshopCode}</strong>
                        <div className="text-[10px] text-slate-500">
                          Évaluateur: {ev.evaluateurNom || ev.instructeurNom} • Temps: {ev.tempsMinutes} min • Autonomie: {ev.niveauAutonomie}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-emerald-700 text-sm">{ev.notePratique}/20</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2 border-t border-slate-200">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDetailModal(false)}
              >
                Fermer
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
