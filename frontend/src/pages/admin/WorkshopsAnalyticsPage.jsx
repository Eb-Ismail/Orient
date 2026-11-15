import React, { useState, useEffect } from 'react';
import { workshopService } from '../../services/workshopService.js';
import { adminService } from '../../services/adminService.js';
import {
  BarChart3,
  Users,
  CheckCircle2,
  Award,
  TrendingUp,
  Download,
  Filter,
  Layers,
  Wrench,
  Sparkles,
  Printer,
  ChevronRight,
  GraduationCap,
  HardHat,
  Search,
  ArrowUpRight,
  ShieldAlert,
  FileSpreadsheet
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import Badge from '../../components/common/Badge.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

export default function WorkshopsAnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [promotions, setPromotions] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState('');
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [searchStudent, setSearchStudent] = useState('');
  const navigate = useNavigate();

  const loadDashboard = async (promoId = '') => {
    try {
      setLoading(true);
      const [analyticsData, promosData] = await Promise.all([
        workshopService.getWorkshopAnalytics(promoId || null),
        adminService.getPromotions()
      ]);
      setAnalytics(analyticsData);
      setPromotions(promosData || []);
    } catch (err) {
      console.error('Erreur chargement analytics ateliers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard(selectedPromotion);
  }, [selectedPromotion]);

  const handleDownloadExcel = () => {
    window.open('http://localhost:5050/api/admin/export/excel', '_blank');
  };

  if (loading && !analytics) {
    return <LoadingSpinner text="Calcul et consolidation des statistiques analytiques des ateliers..." fullPage />;
  }

  const {
    kpis = {},
    mostDemonstratedCompetencies = [],
    workshopsParticipation = [],
    topPerformingTrainees = [],
    performanceDistributionByGroup = [],
    statusBreakdown = {}
  } = analytics || {};

  // Filtrer les ateliers par catégorie
  const filteredWorkshops = workshopsParticipation.filter(w => {
    if (categoryFilter === 'ALL') return true;
    return w.categorieId === categoryFilter;
  });

  // Filtrer les élèves d'élite par recherche
  const filteredTopStudents = topPerformingTrainees.filter(s => {
    if (!searchStudent) return true;
    const term = searchStudent.toLowerCase();
    return (
      s.nom.toLowerCase().includes(term) ||
      s.prenom.toLowerCase().includes(term) ||
      s.matricule.toLowerCase().includes(term) ||
      s.promotionNom.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6 animate-fade-slide">
      {/* 1. En-tête avec filtres de promotion et export Excel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slateSubtle-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gendarmerie uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4 text-gold" />
            <span>Direction de la Formation • Analyse des Compétences</span>
          </div>
          <h1 className="text-2xl font-extrabold text-gendarmerie font-serif">
            Tableau de Bord Analytique des Ateliers & Compétences
          </h1>
          <p className="text-xs text-slateSubtle-700">
            Indicateurs de performance pratique, compétences démontrées sur le terrain et cartographie d'orientation.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Sélecteur de promotion */}
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slateSubtle-200 text-xs shadow-2xs">
            <Filter className="w-3.5 h-3.5 text-gold-dark shrink-0" />
            <select
              value={selectedPromotion}
              onChange={(e) => setSelectedPromotion(e.target.value)}
              className="bg-transparent font-medium text-slateSubtle-800 focus:outline-none"
            >
              <option value="">Toutes les promotions</option>
              {promotions.map((p) => (
                <option key={p.PromotionId} value={p.PromotionId}>
                  {p.Nom}
                </option>
              ))}
            </select>
          </div>

          {/* Export Excel / CSV */}
          <Button
            variant="secondary"
            icon={FileSpreadsheet}
            onClick={handleDownloadExcel}
          >
            Export Excel (Groupe)
          </Button>

          <Link to="/admin/ateliers">
            <Button variant="primary" icon={Wrench}>
              Gérer les Ateliers
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. KPIs d'Analyse Globale */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slateSubtle-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slateSubtle-600">
            <span className="text-[11px] font-bold uppercase tracking-wider">Élèves Évalués</span>
            <div className="w-9 h-9 rounded-xl bg-gendarmerie/10 text-gendarmerie flex items-center justify-center">
              <Users className="w-4.5 h-4.5 text-gendarmerie" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-3xl font-extrabold text-gendarmerie font-serif">
              {kpis.totalTraineesEvaluated || 0}
              <span className="text-xs font-normal text-slateSubtle-500 ml-1.5">
                / {kpis.totalTrainees || 0}
              </span>
            </div>
            <div className="text-xs text-emerald-700 font-semibold mt-1">
              {kpis.tauxCouvertureEvaluation || 0}% de couverture
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slateSubtle-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slateSubtle-600">
            <span className="text-[11px] font-bold uppercase tracking-wider">Ateliers Complétés</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-700" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-3xl font-extrabold text-gendarmerie font-serif">
              {kpis.totalCompletedWorkshops || 0}
            </div>
            <div className="text-xs text-slateSubtle-600 mt-1">
              Séances pratiques validées
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slateSubtle-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slateSubtle-600">
            <span className="text-[11px] font-bold uppercase tracking-wider">Note Pratique Moyenne</span>
            <div className="w-9 h-9 rounded-xl bg-gold/15 text-gold-dark flex items-center justify-center">
              <Award className="w-4.5 h-4.5 text-gold-dark" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-3xl font-extrabold text-gendarmerie font-serif">
              {kpis.averageScore20 || 0}
              <span className="text-xs font-normal text-slateSubtle-500 ml-1">/ 20 pts</span>
            </div>
            <div className="text-xs text-gold-dark font-semibold mt-1">
              {kpis.averagePerformancePct || 0}% de moyenne générale
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slateSubtle-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slateSubtle-600">
            <span className="text-[11px] font-bold uppercase tracking-wider">Séances en Cours</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <TrendingUp className="w-4.5 h-4.5 text-indigo-700" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-3xl font-extrabold text-gendarmerie font-serif">
              {(statusBreakdown.enAttenteValidation || 0) + (statusBreakdown.enCours || 0)}
            </div>
            <div className="text-xs text-indigo-700 font-semibold mt-1">
              {statusBreakdown.enAttenteValidation || 0} en attente de visa officiel
            </div>
          </div>
        </div>
      </div>

      {/* 3. Deux Colonnes : Compétences les Plus Démontrées & Distribution par Promotion */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compétences les plus démontrées */}
        <div className="bg-white rounded-2xl p-5 border border-slateSubtle-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slateSubtle-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-dark" />
              <h3 className="font-bold text-sm text-gendarmerie uppercase tracking-wide">
                Compétences Pratiques les Plus Démontrées
              </h3>
            </div>
            <span className="text-[11px] text-slateSubtle-500 font-semibold">
              Fréquence d'apparition
            </span>
          </div>

          {mostDemonstratedCompetencies.length === 0 ? (
            <p className="text-xs text-slateSubtle-500 italic py-4 text-center">Aucune compétence qualifiée pour l'instant.</p>
          ) : (
            <div className="space-y-3">
              {mostDemonstratedCompetencies.map((skill, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gendarmerie">{skill.nom}</span>
                    <span className="font-mono text-slateSubtle-600 font-bold">
                      {skill.count} élève(s) ({skill.pourcentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-cream-200 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gendarmerie transition-all duration-300"
                      style={{ width: `${Math.min(100, skill.pourcentage)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Distribution de la performance par groupe / promotion */}
        <div className="bg-white rounded-2xl p-5 border border-slateSubtle-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slateSubtle-200">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-gold-dark" />
              <h3 className="font-bold text-sm text-gendarmerie uppercase tracking-wide">
                Performance Pratique par Promotion / Cohorte
              </h3>
            </div>
            <span className="text-[11px] text-slateSubtle-500 font-semibold">
              Moyennes comparatives
            </span>
          </div>

          {performanceDistributionByGroup.length === 0 ? (
            <p className="text-xs text-slateSubtle-500 italic py-4 text-center">Aucune cohorte enregistrée.</p>
          ) : (
            <div className="space-y-3">
              {performanceDistributionByGroup.map((grp) => (
                <div
                  key={grp.promotionId}
                  className="p-3.5 rounded-xl bg-cream-50/70 border border-slateSubtle-200 flex items-center justify-between gap-4"
                >
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-xs text-gendarmerie">
                      {grp.nom} ({grp.annee})
                    </h4>
                    <div className="text-[11px] text-slateSubtle-600">
                      {grp.elevesEvaluesCount} / {grp.effectifTotal} élèves évalués • {grp.ateliersRealisesCount} séances
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-base font-bold text-gendarmerie font-serif">
                      {grp.scoreMoyen20 !== null ? `${grp.scoreMoyen20} / 20` : '—'}
                    </div>
                    <div className="text-[10px] text-gold-dark font-semibold">
                      {grp.scoreMoyenPct !== null ? `${grp.scoreMoyenPct}% de moyenne` : 'Non évalué'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 4. Ateliers avec la Plus Forte Participation */}
      <div className="bg-white rounded-2xl border border-slateSubtle-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slateSubtle-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-gold-dark" />
              <h3 className="font-bold text-sm text-gendarmerie uppercase tracking-wide">
                Taux de Participation & Réussite par Atelier Pratique
              </h3>
            </div>
            <p className="text-xs text-slateSubtle-600 mt-0.5">
              Classement des ateliers selon le volume de séances complétées et la note moyenne obtenue.
            </p>
          </div>

          {/* Filtre catégorie */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCategoryFilter('ALL')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                categoryFilter === 'ALL'
                  ? 'bg-gendarmerie text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Toutes
            </button>
            <button
              onClick={() => setCategoryFilter('CAT-INFO')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                categoryFilter === 'CAT-INFO'
                  ? 'bg-gendarmerie text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Info
            </button>
            <button
              onClick={() => setCategoryFilter('CAT-MECA')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                categoryFilter === 'CAT-MECA'
                  ? 'bg-gendarmerie text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Méca
            </button>
            <button
              onClick={() => setCategoryFilter('CAT-TELECOM')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                categoryFilter === 'CAT-TELECOM'
                  ? 'bg-gendarmerie text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Télécom
            </button>
            <button
              onClick={() => setCategoryFilter('CAT-LOG')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                categoryFilter === 'CAT-LOG'
                  ? 'bg-gendarmerie text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Logistique
            </button>
          </div>
        </div>

        <div className="overflow-x-auto table-responsive-container">
          <table className="w-full text-xs text-left min-w-[700px]">
            <thead className="bg-cream-100/70 text-slateSubtle-700 font-bold border-b border-slateSubtle-200">
              <tr>
                <th className="p-3.5">Code & Titre de l'Atelier</th>
                <th className="p-3.5">Catégorie</th>
                <th className="p-3.5">Assignations</th>
                <th className="p-3.5">Séances Complétées</th>
                <th className="p-3.5">Taux de Complétion</th>
                <th className="p-3.5">Note Moyenne</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slateSubtle-100">
              {filteredWorkshops.map((w) => (
                <tr key={w.atelierId} className="hover:bg-cream-50/50 transition">
                  <td className="p-3.5">
                    <div className="font-bold text-gendarmerie">{w.titre}</div>
                    <div className="text-[10px] font-mono text-slateSubtle-500">{w.code}</div>
                  </td>
                  <td className="p-3.5 text-slateSubtle-700 font-medium">
                    {w.categorieNom}
                  </td>
                  <td className="p-3.5 font-semibold text-gendarmerie">
                    {w.assignesCount}
                  </td>
                  <td className="p-3.5 font-bold text-emerald-800">
                    {w.completesCount}
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 rounded-full bg-cream-200 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gendarmerie"
                          style={{ width: `${w.tauxCompletion}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] font-bold text-slateSubtle-700">{w.tauxCompletion}%</span>
                    </div>
                  </td>
                  <td className="p-3.5 font-bold text-gendarmerie">
                    {w.scoreMoyenPourcentage !== null ? `${w.scoreMoyenPourcentage}%` : '—'}
                  </td>
                  <td className="p-3.5 text-right">
                    <Link
                      to={`/admin/ateliers/${w.atelierId}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-gendarmerie hover:text-gold-dark transition"
                    >
                      <span>Consulter</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Élèves aux Performances Pratiques Remarquables (Top Performers) */}
      <div className="bg-white rounded-2xl border border-slateSubtle-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slateSubtle-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-gold-dark" />
              <h3 className="font-bold text-sm text-gendarmerie uppercase tracking-wide">
                Élèves Gendarmes aux Performances Pratiques Supérieures
              </h3>
            </div>
            <p className="text-xs text-slateSubtle-600 mt-0.5">
              Classement des élèves s'étant particulièrement distingués dans les ateliers techniques et de maintenance.
            </p>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slateSubtle-400" />
            <input
              type="text"
              placeholder="Rechercher élève ou matricule..."
              value={searchStudent}
              onChange={(e) => setSearchStudent(e.target.value)}
              className="text-xs pl-8 pr-3 py-1.5 rounded-xl border border-slateSubtle-200 w-56 focus:outline-none focus:border-gendarmerie"
            />
          </div>
        </div>

        {filteredTopStudents.length === 0 ? (
          <div className="p-8 text-center text-xs text-slateSubtle-500">
            Aucun élève trouvé.
          </div>
        ) : (
          <div className="overflow-x-auto table-responsive-container">
            <table className="w-full text-xs text-left min-w-[850px]">
              <thead className="bg-cream-100/70 text-slateSubtle-700 font-bold border-b border-slateSubtle-200">
                <tr>
                  <th className="p-3.5">Matricule</th>
                  <th className="p-3.5">Élève Gendarme</th>
                  <th className="p-3.5">Promotion</th>
                  <th className="p-3.5">Ateliers Validés</th>
                  <th className="p-3.5">Moyenne /20</th>
                  <th className="p-3.5">Mention</th>
                  <th className="p-3.5">Aptitudes Clés</th>
                  <th className="p-3.5">Orientation Suggérée</th>
                  <th className="p-3.5 text-right">Rapport</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slateSubtle-100">
                {filteredTopStudents.map((st) => (
                  <tr key={st.studentId} className="hover:bg-cream-50/50 transition">
                    <td className="p-3.5 font-mono font-bold text-gendarmerie">
                      {st.matricule}
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-gendarmerie">{st.prenom} {st.nom}</div>
                    </td>
                    <td className="p-3.5 text-slateSubtle-600">
                      {st.promotionNom}
                    </td>
                    <td className="p-3.5 font-semibold text-gendarmerie">
                      {st.ateliersCompletes} séances
                    </td>
                    <td className="p-3.5">
                      <span className="font-bold text-sm text-gendarmerie font-serif">
                        {st.scoreMoyen20} / 20
                      </span>
                      <span className="text-[10px] text-slateSubtle-500 block">
                        ({st.scoreMoyenPct}%)
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="font-semibold text-gold-dark">
                        {st.mention}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="flex flex-wrap gap-1">
                        {st.competencesCles.map((sk, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-cream-200 text-gendarmerie font-medium"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="font-bold text-xs px-2 py-0.5 rounded-full bg-gendarmerie text-white inline-block">
                        {st.recommandationTop}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <Link
                        to={`/eleve/resultats?studentId=${st.studentId}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-gendarmerie hover:text-gold-dark transition"
                      >
                        <span>Fiche</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

