import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService.js';
import {
  Users,
  CheckCircle2,
  Clock,
  TrendingUp,
  Shield,
  Filter,
  BarChart3
} from 'lucide-react';
import Card from '../../components/common/Card.jsx';
import Badge from '../../components/common/Badge.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import CompetencyRadar from '../../components/charts/CompetencyRadar.jsx';
import ScoreDistributionChart from '../../components/charts/ScoreDistributionChart.jsx';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPromotion, setSelectedPromotion] = useState('');

  const loadMetrics = async (promoId = '') => {
    try {
      setLoading(true);
      const data = await adminService.getDashboardStats(promoId || null);
      setStats(data);
    } catch (err) {
      console.error('Erreur chargement dashboard admin:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMetrics(selectedPromotion);
  }, [selectedPromotion]);

  if (loading && !stats) {
    return <LoadingSpinner text="Calcul des indicateurs..." fullPage />;
  }

  const { kpis, scoreDistribution, domainAverages, specialtyDistribution, recentActivities, promotions } = stats || {};

  return (
    <div className="space-y-6 animate-fade-slide">
      {/* En-tête avec filtre promotion */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-gendarmerie uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4 text-gold" />
            Commandement & Formation
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gendarmerie font-serif">
            Tableau de Bord
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Supervision de la campagne d'évaluation et statistiques d'orientation.
          </p>
        </div>

        {/* Sélecteur de promotion */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gold flex-shrink-0" />
          <select
            value={selectedPromotion}
            onChange={(e) => setSelectedPromotion(e.target.value)}
            className="text-sm font-medium py-2 px-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie"
          >
            <option value="">Toutes les promotions</option>
            {promotions?.map((p) => (
              <option key={p.PromotionId} value={p.PromotionId}>
                {p.Nom}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4 KPIs clés */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Élèves
            </span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-gendarmerie flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-gendarmerie font-mono">
            {kpis?.totalStudents || 0}
          </div>
          <span className="text-xs text-slate-500 block mt-1">Élèves inscrits</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Tests Terminés
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-800 font-mono">
            {kpis?.testsCompleted || 0}
          </div>
          <span className="text-xs text-emerald-800 font-medium block mt-1">
            Participation : {kpis?.tauxParticipation || 0}%
          </span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Tests en Cours
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-amber-900 font-mono">
            {kpis?.testsInProgress || 0}
          </div>
          <span className="text-xs text-slate-500 block mt-1">Sessions actives</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Moyenne
            </span>
            <div className="w-8 h-8 rounded-lg bg-gold/15 text-gold flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-gendarmerie font-mono">
            {kpis?.averageScore || 0}%
          </div>
          <span className="text-xs text-slate-500 block mt-1">Score moyen global</span>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Moyenne par Domaine" subtitle="Aptitudes collectives mesurées sur la promotion">
          <CompetencyRadar domainScores={domainAverages} height={280} />
        </Card>

        <Card title="Distribution des Scores" subtitle="Répartition des élèves par tranche de résultat">
          <ScoreDistributionChart distribution={scoreDistribution} height={280} />
        </Card>
      </div>

      {/* Répartition prévisionnelle par spécialité */}
      <Card title="Adéquation et Besoins par Spécialité" subtitle="Candidats recommandés rang 1 vs places disponibles">
        <div className="overflow-x-auto table-responsive-container">
          <table className="w-full text-left text-sm min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase text-xs tracking-wider">
                <th className="py-3 px-4">Spécialité</th>
                <th className="py-3 px-4">Subdivision</th>
                <th className="py-3 px-4 text-center">Places</th>
                <th className="py-3 px-4 text-center">Candidats Match #1</th>
                <th className="py-3 px-4 text-right">Taux</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {specialtyDistribution?.map((spec) => {
                const ratio = spec.places > 0 ? Math.round((spec.candidatsRecommandes / spec.places) * 100) : 0;
                return (
                  <tr key={spec.code} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-bold text-gendarmerie">{spec.specialite}</td>
                    <td className="py-3 px-4 text-slate-600">{spec.subdivision}</td>
                    <td className="py-3 px-4 text-center font-mono font-medium">{spec.places}</td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-gendarmerie">{spec.candidatsRecommandes}</td>
                    <td className="py-3 px-4 text-right">
                      <span className={`inline-block font-mono text-xs px-2.5 py-0.5 rounded-full font-bold ${
                        ratio > 100 ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}>
                        {ratio}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Activités récentes */}
      <Card title="Activités Récentes" subtitle="Traçabilité des connexions et passages d'épreuves">
        <div className="divide-y divide-slate-100">
          {recentActivities?.slice(0, 5).map((log) => (
            <div key={log.LogId} className="py-3 flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                <span className="font-bold text-gendarmerie">{log.Action}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600 truncate max-w-md">{log.Details}</span>
              </div>
              <span className="text-xs font-mono text-slate-400 flex-shrink-0">
                {new Date(log.DateLog).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
