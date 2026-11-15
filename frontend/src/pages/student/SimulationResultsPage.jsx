import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { simulationService } from '../../services/simulationService.js';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  Award,
  Shield,
  CheckCircle2,
  Printer,
  ChevronLeft,
  Clock,
  Layers,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  Sparkles
} from 'lucide-react';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

export default function SimulationResultsPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await simulationService.getModuleResults(moduleId);
        if (data) {
          setResults(data);
        }
      } catch (err) {
        console.error('Erreur chargement résultats simulation:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [moduleId]);

  if (loading) {
    return <LoadingSpinner text="جاري استخراج التقرير التقييمي للمحاكاة..." fullPage />;
  }

  if (!results) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-4 font-sans" dir="rtl">
        <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
          <Shield className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-gendarmerie">لم يتم العثور على تقييم منجز لهذه المحاكاة</h2>
        <p className="text-xs text-slateSubtle-600">
          يرجى إتمام مراحل المحاكاة أولاً ليتمكن النظام من احتساب درجات الكفاءات العملية.
        </p>
        <Button variant="primary" size="sm" onClick={() => navigate('/eleve/simulations')}>
          العودة لمركز المحاكاة
        </Button>
      </div>
    );
  }

  const { module, session, scoreGlobal, mention, competences, feedbackRubrique, impactOrientation } = results;

  return (
    <div className="w-full space-y-6 text-right font-sans animate-fade-slide" dir="rtl">
      {/* En-tête institutionnel du rapport */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slateSubtle-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider mb-1">
            <Award className="w-4 h-4 text-gold" />
            <span>المملكة المغربية • الدرك الملكي • تقرير التقييم العملياتي</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gendarmerie font-serif">
            نتائج محاكاة: {module.titreAr}
          </h1>
          <p className="text-xs text-slateSubtle-600 mt-0.5">
            المترشح: <strong>{user?.prenom} {user?.nom}</strong> • الرقم العسكري: <span className="font-mono">{user?.matricule}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            icon={Printer}
            onClick={() => window.print()}
          >
            طباعة التقرير
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={ChevronLeft}
            onClick={() => navigate('/eleve/simulations')}
          >
            مركز المحاكاة
          </Button>
        </div>
      </div>

      {/* Carte du Score Global & Mention */}
      <div className="bg-white rounded-2xl border-2 border-gendarmerie/20 p-6 md:p-8 shadow-card">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-right">
            <span className="text-xs font-bold text-gold uppercase tracking-wider block">
              النتيجة الإجمالية للمحاكاة المهنية
            </span>
            <h2 className="text-lg md:text-xl font-bold text-gendarmerie">
              {module.titreAr}
            </h2>
            <p className="text-xs text-slateSubtle-600 max-w-lg leading-relaxed">
              تقييم عملي محكم مبني على جودة تحليل الوثائق، دقة فرز القرائن، سرعة ترتيب الأولويات، ورصانة الصياغة الإدارية.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="text-center p-4 rounded-2xl bg-cream-100 border border-slateSubtle-200 min-w-[120px]">
              <span className="text-[10px] uppercase font-bold text-slateSubtle-500 block">المعدل العام</span>
              <p className="text-3xl font-extrabold text-gendarmerie font-mono mt-1">
                {scoreGlobal}<span className="text-base font-normal text-slateSubtle-500">%</span>
              </p>
            </div>

            <div className="text-center p-4 rounded-2xl bg-[#153B2B] text-white min-w-[120px] shadow-sm">
              <span className="text-[10px] uppercase font-bold text-gold-light/80 block">التقدير الرسمي</span>
              <p className="text-lg font-bold text-gold mt-1">
                {mention}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grille des compétences pratiques évaluées */}
      <div className="bg-white rounded-2xl border border-slateSubtle-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slateSubtle-200">
          <div className="flex items-center gap-2 text-xs font-bold text-gendarmerie">
            <TrendingUp className="w-4 h-4 text-gold" />
            <span>تفصيل الكفاءات العملية المقاسة في هذا السيناريو</span>
          </div>
          <span className="text-xs text-slateSubtle-500">معيار الإتقان المهني الميداني</span>
        </div>

        <div className="space-y-4">
          {competences.map((comp, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gendarmerie">
                  {comp.nomAr}
                  <span className="text-[10px] font-normal text-slateSubtle-500 mr-2">({comp.nomFr})</span>
                </span>
                <span className="font-mono font-bold text-gendarmerie">{comp.scorePct}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-cream-200 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    comp.scorePct >= 80 ? 'bg-[#153B2B]' : comp.scorePct >= 65 ? 'bg-gold' : 'bg-amber-600'
                  }`}
                  style={{ width: `${comp.scorePct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Remarques et appréciations par étape */}
      {feedbackRubrique && feedbackRubrique.length > 0 && (
        <div className="bg-white rounded-2xl border border-slateSubtle-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slateSubtle-200 text-xs font-bold text-gendarmerie">
            <FileCheck2 className="w-4 h-4 text-gold" />
            <span>الملاحظات التقييمية التفصيلية حسب مراحل المحاكاة</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {feedbackRubrique.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-cream-50 border border-slateSubtle-200 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-gendarmerie">{item.titreAr}</h4>
                  <span className="text-xs font-bold text-gold font-mono">{item.pct}%</span>
                </div>
                <p className="text-xs text-slateSubtle-700 leading-relaxed">
                  {item.remarqueAr}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Impact sur l'orientation et l'adéquation aux spécialités */}
      {impactOrientation && (
        <div className="bg-gradient-to-r from-cream-100 to-cream-50 rounded-2xl border border-slateSubtle-200 p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-gendarmerie">
            <Sparkles className="w-4 h-4 text-gold" />
            <span>الأثر التوجيهي على مسارات التخصص بالدرك الملكي</span>
          </div>
          <p className="text-xs text-slateSubtle-700 leading-relaxed">
            تعكس نتيجتك في هذه المحاكاة ملاءمة مهنية قوية نحو مسار: <strong>{impactOrientation.specialitePrincipale}</strong>، وتُعتبر مؤشراً موثوقاً تستأنس به لجنة الانتقاء والتوجيه بالقيادة العليا.
          </p>
        </div>
      )}
    </div>
  );
}
