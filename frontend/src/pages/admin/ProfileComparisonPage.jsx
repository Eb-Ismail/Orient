import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService.js';
import {
  GitCompare,
  Shield,
  Award,
  Users,
  CheckCircle2,
  TrendingUp,
  FileCheck2,
  Sparkles,
  Layers,
  Wrench,
  Cpu,
  Radio,
  Boxes,
  Check,
  AlertTriangle
} from 'lucide-react';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import Badge from '../../components/common/Badge.jsx';
import CompetencyRadar from '../../components/charts/CompetencyRadar.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

export default function ProfileComparisonPage() {
  const [candidates, setCandidates] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [selectedId1, setSelectedId1] = useState(2); // Julien Moreau
  const [selectedId2, setSelectedId2] = useState(3); // Clara Bernard
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentsList = async () => {
      try {
        const data = await adminService.getStudents();
        setAllStudents(data || []);
      } catch (err) {
        console.error('Erreur liste:', err);
      }
    };
    fetchStudentsList();
  }, []);

  useEffect(() => {
    const fetchComparison = async () => {
      try {
        setLoading(true);
        const data = await adminService.compareProfiles([selectedId1, selectedId2]);
        setCandidates(data || []);
      } catch (err) {
        console.error('Erreur comparaison:', err);
      } finally {
        setLoading(false);
      }
    };

    if (selectedId1 && selectedId2) {
      fetchComparison();
    }
  }, [selectedId1, selectedId2]);

  return (
    <div className="space-y-6 animate-fade-slide">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slateSubtle-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gendarmerie uppercase tracking-wider mb-1">
            <GitCompare className="w-4 h-4 text-gold" />
            Aide à la Délibération • Commission d'Affectation
          </div>
          <h1 className="text-2xl font-extrabold text-gendarmerie font-serif">
            Comparaison des Profils & Compétences Métier
          </h1>
          <p className="text-xs text-slateSubtle-700">
            Mise en regard des aptitudes démontrées aux tests et aux ateliers pratiques de deux élèves gendarmes pour arbitrage d'affectation.
          </p>
        </div>
      </div>

      {/* Sélecteurs des deux candidats */}
      <Card className="p-5 bg-white rounded-xl border border-slateSubtle-200 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">
              Candidat A :
            </label>
            <select
              value={selectedId1}
              onChange={(e) => setSelectedId1(parseInt(e.target.value, 10))}
              className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie bg-white text-slateSubtle-800 transition-all"
            >
              {allStudents.map((s) => (
                <option key={s.UtilisateurId} value={s.UtilisateurId}>
                  {s.nom} {s.prenom} ({s.matricule}) - Rang {s.classementInitial}e
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slateSubtle-800 mb-1">
              Candidat B :
            </label>
            <select
              value={selectedId2}
              onChange={(e) => setSelectedId2(parseInt(e.target.value, 10))}
              className="w-full text-xs p-2.5 border border-slateSubtle-200 rounded-xl focus:ring-2 focus:ring-gold/30 focus:border-gendarmerie bg-white text-slateSubtle-800 transition-all"
            >
              {allStudents.map((s) => (
                <option key={s.UtilisateurId} value={s.UtilisateurId}>
                  {s.nom} {s.prenom} ({s.matricule}) - Rang {s.classementInitial}e
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Grille comparative */}
      {loading ? (
        <LoadingSpinner text="Calcul du différentiel multicritère..." />
      ) : candidates.length < 2 ? (
        <div className="p-8 text-center text-xs text-slateSubtle-700">Sélectionnez deux candidats distincts.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {candidates.map((cand, idx) => {
            const radarCompData = (cand.ProfessionalCompetencies || []).map(c => ({
              DomaineIntitule: c.nomAr,
              domaine: c.nomAr?.split(' ')[0] + ' ' + (c.nomAr?.split(' ')[1] || ''),
              Pourcentage: c.scorePct
            }));

            const topSimSpec = cand.TopSimulationSpecialties?.[0] || null;
            const practical = cand.PracticalSkillsProfile || {};

            return (
              <Card key={cand.UtilisateurId} className="p-6 space-y-6 rounded-xl border border-slateSubtle-200 hover:border-gold/50 hover:shadow-card transition-all duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-slateSubtle-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-gendarmerie bg-cream-100 border border-slateSubtle-200 px-3 py-1 rounded-full shadow-2xs">
                    Candidat {idx === 0 ? 'A' : 'B'}
                  </span>
                  <span className="text-xs font-mono font-bold text-slateSubtle-700">
                    {cand.Matricule}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gendarmerie font-serif">
                    {cand.Prenom} {cand.Nom}
                  </h3>

                  {/* Métriques Combinées : Ateliers Pratiques & Tests */}
                  <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="p-2.5 rounded-xl bg-cream-50 border border-slateSubtle-200">
                      <span className="text-[10px] text-slateSubtle-700 font-semibold block">Ateliers Validés</span>
                      <strong className="text-gendarmerie text-base font-serif">
                        {practical.overallPerformance?.completedCount || 0} / {practical.overallPerformance?.totalAssigned || 0}
                      </strong>
                      <span className="text-[10px] text-gold-dark block mt-0.5">
                        Moyenne : {practical.overallPerformance?.averageScore20 !== null ? `${practical.overallPerformance?.averageScore20}/20` : '—'}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-cream-50 border border-slateSubtle-200">
                      <span className="text-[10px] text-slateSubtle-700 font-semibold block">Tests Professionnels</span>
                      <strong className="text-gendarmerie text-base font-serif">
                        {cand.ScoreTest || cand.SimulationAvgScore || 80}%
                      </strong>
                      <span className="text-[10px] text-emerald-700 block mt-0.5">
                        Socle théorique validé
                      </span>
                    </div>
                  </div>

                  {/* Notes académiques et rang */}
                  <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-xl bg-white border border-slateSubtle-200">
                      <span className="text-[10px] text-slateSubtle-600 block">Rang Sortie</span>
                      <strong className="text-gendarmerie">{cand.ClassementInitial}e</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-slateSubtle-200">
                      <span className="text-[10px] text-slateSubtle-600 block">Note Pro</span>
                      <strong className="text-gendarmerie">{cand.NoteFormationPro}/20</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-slateSubtle-200">
                      <span className="text-[10px] text-slateSubtle-600 block">Sport (CCPM)</span>
                      <strong className="text-gendarmerie">{cand.AptitudePhysique}/20</strong>
                    </div>
                  </div>
                </div>

                {/* Radar des 12 compétences professionnelles */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gendarmerie mb-2 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-gold" />
                    Radar des 12 Compétences (ORIENT-G)
                  </h4>
                  <CompetencyRadar domainScores={radarCompData} height={220} />
                </div>

                {/* Synthèse des Compétences d'Ateliers par Groupe */}
                {practical.competencyGroupsAnalysis && practical.competencyGroupsAnalysis.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gendarmerie flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-gold-dark" />
                      Aptitudes Techniques par Domaine
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {practical.competencyGroupsAnalysis.map((grp) => (
                        <div key={grp.groupId} className="p-2.5 rounded-lg bg-cream-50/70 border border-slateSubtle-200 flex items-center justify-between">
                          <span className="text-[11px] font-medium text-gendarmerie truncate">{grp.nomFr}</span>
                          <span className="font-bold text-gendarmerie text-xs shrink-0">
                            {grp.competencesValideesCount}/{grp.totalCompetences}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Spécialité recommandée combinée */}
                {topSimSpec && (
                  <div className="p-4 rounded-xl border border-gold/40 bg-gold/10 space-y-1.5 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-gendarmerie block">
                        Recommandation n°1 (Tests + Ateliers) :
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white text-gendarmerie border border-gold/40">
                        {topSimSpec.specialiteCode}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-gendarmerie flex items-center justify-between">
                      <span>{topSimSpec.intituleFr || topSimSpec.intituleAr}</span>
                      <span className="text-gendarmerie font-serif font-extrabold">{topSimSpec.scoreCompatibilite}%</span>
                    </div>
                    <p className="text-[11px] text-slateSubtle-700 leading-relaxed">
                      {topSimSpec.whySuggestedFr || topSimSpec.whySuggestedAr}
                    </p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
