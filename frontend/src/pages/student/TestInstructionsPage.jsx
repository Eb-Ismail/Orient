import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { testService } from '../../services/testService.js';
import {
  Clock,
  HelpCircle,
  CheckCircle2,
  Shield,
  ArrowRight,
  ArrowLeft,
  Check
} from 'lucide-react';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

export default function TestInstructionsPage() {
  const { id } = useParams();
  const testId = id || 1;
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [agreeRules, setAgreeRules] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await testService.getTestDetails(testId);
        if (data && data.test) {
          setTest(data.test);
        } else {
          setTest({
            TestId: 1,
            Titre: "Épreuve Psychotechnique & Opérationnelle (ORIENT-G)",
            Code: 'TEST-ORIENT-2026',
            DureeMinutes: 30,
            SeuilReussite: 60.0
          });
        }
      } catch (err) {
        console.error('Erreur chargement instructions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [testId]);

  if (loading) {
    return <LoadingSpinner text="Chargement du protocole..." fullPage />;
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-fade-slide">
      {/* En-tête sobre */}
      <div className="text-center space-y-1.5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-100 border border-slateSubtle-200 text-[11px] font-bold text-gendarmerie uppercase tracking-wider">
          <Shield className="w-3.5 h-3.5 text-gold" />
          Protocole d'Évaluation Officiel
        </span>
        <h1 className="text-2xl font-bold text-gendarmerie font-serif">
          Consignes de l'Épreuve
        </h1>
        <p className="text-xs text-slateSubtle-600 max-w-md mx-auto">
          Prenez connaissance des règles avant de lancer l'épreuve.
        </p>
      </div>

      <Card className="p-6 md:p-7 space-y-5 rounded-2xl border border-slateSubtle-200">
        <div>
          <h2 className="text-base font-bold text-gendarmerie">
            {test?.Titre || "Épreuve Psychotechnique & Opérationnelle (ORIENT-G)"}
          </h2>
          <p className="text-xs text-slateSubtle-600 mt-1">
            Test d'aide à l'orientation vers les spécialités de la Gendarmerie Royale.
          </p>
        </div>

        {/* 3 Paramètres clés */}
        <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-cream-50 border border-slateSubtle-200 text-center">
          <div>
            <Clock className="w-4 h-4 text-gold mx-auto mb-1" />
            <span className="text-[10px] uppercase font-bold text-slateSubtle-500 block">Durée</span>
            <span className="text-sm font-bold text-gendarmerie">{test?.DureeMinutes || 30} min</span>
          </div>
          <div>
            <HelpCircle className="w-4 h-4 text-gold mx-auto mb-1" />
            <span className="text-[10px] uppercase font-bold text-slateSubtle-500 block">Questions</span>
            <span className="text-sm font-bold text-gendarmerie">60 QCM</span>
          </div>
          <div>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
            <span className="text-[10px] uppercase font-bold text-slateSubtle-500 block">Seuil</span>
            <span className="text-sm font-bold text-gendarmerie">{test?.SeuilReussite || 60}%</span>
          </div>
        </div>

        {/* 4 points essentiels */}
        <div className="space-y-2.5 text-xs text-slateSubtle-700">
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-cream-100 text-gendarmerie font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
            <span><strong>Sélection équilibrée :</strong> 60 questions tirées aléatoirement sur 10 compétences en langue arabe.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-cream-100 text-gendarmerie font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
            <span><strong>Sauvegarde continue :</strong> Chaque réponse est synchronisée instantanément avec le serveur.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-cream-100 text-gendarmerie font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
            <span><strong>Navigation libre :</strong> Vous pouvez naviguer entre les questions et modifier vos choix jusqu'à la validation finale.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-cream-100 text-gendarmerie font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
            <span><strong>Chronomètre automatique :</strong> À la fin des 30 minutes, le test se soumet automatiquement.</span>
          </div>
        </div>

        {/* Engagement sur l'honneur */}
        <label className="flex items-start gap-3 p-3.5 rounded-xl bg-cream-50/60 border border-slateSubtle-200 cursor-pointer select-none transition hover:bg-cream-100/60">
          <input
            type="checkbox"
            checked={agreeRules}
            onChange={(e) => setAgreeRules(e.target.checked)}
            className="w-4 h-4 rounded text-gendarmerie focus:ring-gold/40 border-slateSubtle-300 mt-0.5"
          />
          <span className="text-xs text-slateSubtle-700">
            Je m'engage sur l'honneur à passer cette épreuve de manière individuelle et sans assistance extérieure.
          </span>
        </label>

        {/* Boutons d'action clairs */}
        <div className="flex items-center justify-between pt-2 border-t border-slateSubtle-200">
          <Button
            variant="ghost"
            size="sm"
            icon={ArrowLeft}
            onClick={() => navigate('/eleve/dashboard')}
          >
            Tableau de bord
          </Button>

          <Button
            variant="gold"
            icon={ArrowRight}
            iconPosition="right"
            disabled={!agreeRules}
            onClick={() => navigate(`/eleve/tests/${testId}/candidat`)}
          >
            Vérifier mon profil & Démarrer
          </Button>
        </div>
      </Card>
    </div>
  );
}
