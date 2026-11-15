import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { testService } from '../../services/testService.js';
import {
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
  FileText
} from 'lucide-react';
import Card from '../common/Card.jsx';
import Button from '../common/Button.jsx';
import Badge from '../common/Badge.jsx';
import LoadingSpinner from '../common/LoadingSpinner.jsx';

export default function OfficialTestsPanel() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const data = await testService.getTests();
        setTests(data || []);
      } catch (err) {
        console.error('Erreur chargement tests:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  if (loading) {
    return <LoadingSpinner text="جاري تحميل سجل الاختبارات المهنية..." />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gendarmerie uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-gold" />
            منظومة التوجيه المهني الرسمي • ORIENT-G
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-gendarmerie font-serif">
            Tests QCM Officiels (الاختبارات المهنية الثلاثة)
          </h2>
          <p className="text-xs text-slateSubtle-600 mt-0.5">
            Trois épreuves QCM officielles (10 questions par test) évaluant l'analyse professionnelle, le terrain et l'organisation.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          icon={Award}
          onClick={() => navigate('/eleve/resultats')}
        >
          Rapport des Tests
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tests.map((test, index) => {
          const isFinished = test.sessionStatus === 'TERMINE';
          const isInProgress = test.sessionStatus === 'EN_COURS';

          return (
            <Card
              key={test.TestId || index}
              className="p-6 rounded-2xl border border-slateSubtle-200 hover:border-gold/60 hover:shadow-card transition-all duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3 flex-1 text-right" dir="rtl">
                  <div className="flex items-center justify-between flex-row-reverse">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cream-200 text-gendarmerie border border-slateSubtle-200">
                      {test.Code || `TEST-0${index + 1}`}
                    </span>
                    <Badge type={test.sessionStatus || 'NON_COMMENCE'} />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gendarmerie font-serif">{test.Titre}</h3>
                    {test.TitreFr && (
                      <p className="text-xs text-slateSubtle-500 font-sans mt-0.5" dir="ltr">
                        {test.TitreFr}
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-slateSubtle-700 leading-relaxed max-w-2xl">{test.Description}</p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slateSubtle-600 pt-2 border-t border-slateSubtle-100 flex-row-reverse">
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <Clock className="w-4 h-4 text-gold" />
                      المدة المحددة : <strong>{test.DureeMinutes || 15} دقيقة</strong>
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <FileText className="w-4 h-4 text-gendarmerie" />
                      عدد الأسئلة : <strong>{test.questionsCount || 10} أسئلة</strong>
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      عتبة الاستحقاق : <strong>{test.SeuilReussite || 60}%</strong>
                    </span>
                    {test.scorePourcentage !== null && (
                      <span className="inline-flex items-center gap-1.5 font-bold text-gendarmerie bg-emerald-50 text-emerald-800 px-3 py-0.5 rounded-full border border-emerald-200 font-mono">
                        النتيجة المحصلة : {test.scorePourcentage}%
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 flex-shrink-0 min-w-[190px]">
                  {isFinished ? (
                    <Button
                      variant="primary"
                      icon={Award}
                      onClick={() => navigate('/eleve/resultats')}
                      fullWidth
                    >
                      عرض النتيجة والتقرير
                    </Button>
                  ) : isInProgress ? (
                    <Button
                      variant="gold"
                      icon={ArrowRight}
                      iconPosition="right"
                      onClick={() => navigate(`/eleve/tests/${test.TestId}/passer`)}
                      fullWidth
                    >
                      متابعة الاختبار
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="gold"
                        icon={ArrowRight}
                        iconPosition="right"
                        onClick={() => navigate(`/eleve/tests/${test.TestId}/passer`)}
                        fullWidth
                      >
                        بدء الاختبار
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/eleve/tests/${test.TestId}/instructions`)}
                        fullWidth
                      >
                        قراءة التعليمات
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

