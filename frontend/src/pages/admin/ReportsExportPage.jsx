import React, { useState, useEffect } from 'react';
import {
  FileText,
  Printer,
  Download,
  Shield,
  FileSpreadsheet,
  CheckCircle2,
  Calendar,
  Users,
  BarChart3,
  GitCompare,
  Wrench,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import Badge from '../../components/common/Badge.jsx';
import { adminService } from '../../services/adminService.js';

export default function ReportsExportPage() {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(2);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await adminService.getStudents();
        setStudents(data || []);
      } catch (err) {
        console.error('Erreur chargement élèves:', err);
      }
    };
    fetchStudents();
  }, []);

  const handleDownloadExcel = () => {
    window.open('http://localhost:5050/api/admin/export/excel', '_blank');
  };

  const handlePrintIndividualReport = async () => {
    setGeneratingPdf(true);
    try {
      window.open(`/eleve/resultats?studentId=${selectedStudentId}`, '_blank');
    } finally {
      setGeneratingPdf(false);
    }
  };

  const reports = [
    {
      id: 1,
      titre: "Matrice d'Évaluation & Scores Combinés (Export Excel / CSV)",
      type: "Fichier CSV / Excel Officiel",
      date: "2026-03-01",
      description: "Tableau récapitulatif officiel avec encodage UTF-8 : matricule, nom, promotion, tests complétés, ateliers validés, moyennes sur 20, spécialités recommandées et décision de la commission.",
      taille: "Téléchargement Direct",
      onDownload: handleDownloadExcel
    },
    {
      id: 2,
      titre: "Procès-Verbal Officiel de la Commission d'Orientation 2026",
      type: "PDF / Impression Officielle",
      date: "2026-03-01",
      description: "Synthèse nominative des propositions d'affectation par spécialité avec avis motivés de l'algorithme et visa de commandement.",
      taille: "Imprimable A4",
      onDownload: () => window.print()
    },
    {
      id: 3,
      titre: "Cartographie Globale des Compétences & Ateliers Pratiques",
      type: "Rapport Statistique",
      date: "2026-03-01",
      description: "Taux de participation par atelier, compétences techniques les plus démontrées et répartition des moyennes par cohorte.",
      taille: "Vue Analytique",
      link: "/admin/ateliers/analytics"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-slide">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slateSubtle-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gendarmerie uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4 text-gold" />
            Édition des Actes Administratifs & Reporting
          </div>
          <h1 className="text-2xl font-extrabold text-gendarmerie font-serif">
            Rapports Officiels & Exports de Données
          </h1>
          <p className="text-xs text-slateSubtle-700">
            Exportation de la matrice d'évaluation sous Excel (CSV), bilans individuels officiels en PDF et comparateur de compétences.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/admin/ateliers/analytics">
            <Button variant="outline" size="sm" icon={BarChart3}>
              Tableau Analytique
            </Button>
          </Link>
          <Link to="/admin/comparaison">
            <Button variant="outline" size="sm" icon={GitCompare}>
              Comparateur de Profils
            </Button>
          </Link>
        </div>
      </div>

      {/* Module Export Bilan Individuel Élève */}
      <Card className="p-6 bg-white rounded-2xl border-2 border-gendarmerie/20 shadow-card space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slateSubtle-200 text-sm font-bold text-gendarmerie">
          <Users className="w-4 h-4 text-gold" />
          <span>Édition du Rapport Individuel Officiel par Élève (PDF / Impression)</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 text-xs">
          <div className="flex-1 w-full">
            <label className="block text-slateSubtle-700 font-semibold mb-1">
              Sélectionner l'élève gendarme :
            </label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(parseInt(e.target.value, 10))}
              className="w-full p-2.5 rounded-xl border border-slateSubtle-200 bg-cream-50 font-bold text-gendarmerie"
            >
              {students.map(st => (
                <option key={st.id || st.UtilisateurId} value={st.id || st.UtilisateurId}>
                  {st.nom} {st.prenom} ({st.matricule}) - {st.promotionNom || 'Promotion 54'}
                </option>
              ))}
            </select>
          </div>

          <div className="self-end sm:self-auto pt-4 flex gap-2">
            <Button
              variant="gold"
              size="md"
              icon={Printer}
              loading={generatingPdf}
              onClick={handlePrintIndividualReport}
            >
              Bilan Officiel (PDF)
            </Button>
          </div>
        </div>
      </Card>

      {/* Liste des rapports d'ensemble */}
      <div className="grid grid-cols-1 gap-4">
        {reports.map((rep) => (
          <Card key={rep.id} className="p-6 rounded-2xl border border-slateSubtle-200 hover:border-gold/50 hover:shadow-card transition-all duration-200 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cream-100 text-gendarmerie border border-slateSubtle-200 shadow-2xs font-bold">
                    {rep.type}
                  </span>
                  <span className="text-xs text-slateSubtle-700 font-mono">
                    Date : {rep.date} • {rep.taille}
                  </span>
                </div>
                <h3 className="text-base font-bold text-gendarmerie">
                  {rep.titre}
                </h3>
                <p className="text-xs text-slateSubtle-700 leading-relaxed max-w-2xl">
                  {rep.description}
                </p>
              </div>

              <div className="flex gap-2.5 flex-shrink-0">
                {rep.link ? (
                  <Link to={rep.link}>
                    <Button variant="outline" size="sm" icon={ArrowRight}>
                      Consulter
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Download}
                    onClick={rep.onDownload}
                  >
                    Télécharger
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
