import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { simulationService } from '../../services/simulationService.js';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  Award,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Printer,
  ChevronDown,
  ChevronUp,
  Sparkles,
  TrendingUp,
  FileCheck2,
  Clock,
  Compass,
  FileText,
  HelpCircle,
  Layers,
  ArrowRight,
  Bike,
  Terminal,
  Search,
  Sliders,
  Mountain,
  Crosshair,
  Wrench,
  Check,
  HardHat,
  Cpu,
  Radio,
  Boxes
} from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import CompetencyRadar from '../../components/charts/CompetencyRadar.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

export default function StudentResultsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedSpecialty, setExpandedSpecialty] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const searchParams = new URLSearchParams(window.location.search);
        const paramStudentId = searchParams.get('studentId');
        const targetId = paramStudentId || user?.id || user?.UtilisateurId;

        const data = await simulationService.getOrientationReport(targetId);
        if (data) {
          setReportData(data);
          if (data.topRecommendedSpecialties && data.topRecommendedSpecialties.length > 0) {
            setExpandedSpecialty(data.topRecommendedSpecialties[0].specialiteCode);
          }
        }
      } catch (err) {
        console.error('Erreur chargement rapport orientation:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [user]);

  if (loading) {
    return <LoadingSpinner text="جاري استخراج تقرير التوجيه المهني واحتساب درجات الكفاءات الميدانية..." fullPage />;
  }

  if (!reportData) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4 font-sans" dir="rtl">
        <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto border border-amber-200">
          <Shield className="w-7 h-7 text-gold-dark" />
        </div>
        <h2 className="text-xl font-bold text-gendarmerie font-serif">لا يوجد تقرير توجيه مهني متاح حالياً</h2>
        <p className="text-xs text-slateSubtle-600 leading-relaxed max-w-md mx-auto">
          يرجى إتمام اختبار مهني أو ورشة تطبيقية واحدة على الأقل ليتمكن محرك التقييم من تحليل أدائك واقتراح التخصصات الملائمة.
        </p>
        <Button variant="primary" size="md" onClick={() => navigate('/eleve/guide')}>
          الانتقال إلى دليل التخصصات (GUIDE)
        </Button>
      </div>
    );
  }

  const {
    studentInfo,
    dateBilan,
    statistiquesGlobales,
    traineePracticalProfile,
    completedSimulations = [],
    competenciesProfile = [],
    topRecommendedSpecialties = [],
    administrativeDecision = {}
  } = reportData;

  const iconComponents = {
    Search,
    Bike,
    Terminal,
    Sliders,
    Mountain,
    FileText,
    Crosshair,
    Shield
  };

  // Données pour le radar des 12 compétences
  const radarData = (competenciesProfile || []).map(comp => ({
    domaine: comp.nomAr?.split(' ')[0] + ' ' + (comp.nomAr?.split(' ')[1] || ''),
    DomaineIntitule: comp.nomAr,
    Pourcentage: comp.scorePct
  }));

  const formatDate = (isoString) => {
    if (!isoString) return '2026';
    const d = new Date(isoString);
    return d.toLocaleDateString('ar-MA', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const completedWorkshops = traineePracticalProfile?.participationHistory?.filter(
    h => h.statut === 'VALIDE' || h.statut === 'EVALUE'
  ) || [];

  return (
    <div className="w-full space-y-7 text-right font-sans animate-fade-slide pb-12 print:space-y-4 print:pb-0" dir="rtl">
      {/* 1. En-tête institutionnel du rapport */}
      <div className="bg-white rounded-3xl border border-slateSubtle-200 p-6 sm:p-8 shadow-card space-y-6 print:shadow-none print:border-none print:p-0">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-slateSubtle-200 print:pb-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider">
              <Award className="w-4 h-4 text-gold" />
              <span>المملكة المغربية • الدرك الملكي • القيادة العليا</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-gendarmerie font-serif">
              تقرير التوجيه المهني والتقييم الميداني المركب
            </h1>
            <p className="text-xs text-slateSubtle-600">
              تحليل المهارات العملية والكفاءات الميدانية استناداً إلى الاختبارات المهنية الثلاثة ونتائج الورشات التطبيقية
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto print:hidden">
            <Button
              variant="outline"
              size="sm"
              icon={Printer}
              onClick={() => window.print()}
            >
              طباعة التقرير الرسمي (PDF)
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={ArrowRight}
              onClick={() => navigate('/eleve/profil?tab=competences')}
            >
              ملف الكفاءات المهنية
            </Button>
          </div>
        </div>

        {/* Fiche d'identification militaire de l'élève */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-cream-50/80 rounded-2xl border border-slateSubtle-200/80 text-xs">
          <div>
            <span className="text-[11px] text-slateSubtle-500 block">الاسم والنسب:</span>
            <strong className="text-gendarmerie font-bold">{studentInfo.prenom} {studentInfo.nom}</strong>
          </div>
          <div>
            <span className="text-[11px] text-slateSubtle-500 block">الرقم العسكري:</span>
            <strong className="font-mono text-gendarmerie font-bold">{studentInfo.matricule}</strong>
          </div>
          <div>
            <span className="text-[11px] text-slateSubtle-500 block">فوج التكوين:</span>
            <span className="text-slateSubtle-700">{studentInfo.promotionNom || studentInfo.promotion || 'الفوج 54'}</span>
          </div>
          <div>
            <span className="text-[11px] text-slateSubtle-500 block">تاريخ إصدار التقرير:</span>
            <span className="text-slateSubtle-700 font-medium">{formatDate(dateBilan)}</span>
          </div>
        </div>
      </div>

      {/* 2. Résumé de la performance globale combinée */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-[#153B2B] text-white rounded-3xl p-6 shadow-card space-y-3 relative overflow-hidden print:p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gold font-bold uppercase tracking-wider">معدل الأداء الميداني المركب</span>
            <Sparkles className="w-5 h-5 text-gold" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black font-serif text-white">{statistiquesGlobales.scoreMoyenGlobal}%</span>
            <span className="text-xs text-gold-light font-bold">تقدير: {statistiquesGlobales.mentionGlobale}</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            مؤشر كفاءة هجين يجمع بين الدقة الإجرائية للاختبارات المهنية والمهارات اليدوية بالورشات التطبيقية.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slateSubtle-200 p-6 shadow-sm space-y-2 print:p-4">
          <span className="text-xs text-slateSubtle-500 font-bold uppercase tracking-wider block">الورشات التطبيقية المنجزة</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-gendarmerie font-mono">
              {traineePracticalProfile?.overallPerformance?.completedCount || 0}
              <span className="text-sm font-normal text-slateSubtle-500 mr-1.5">
                / {traineePracticalProfile?.overallPerformance?.totalAssigned || 0}
              </span>
            </span>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {traineePracticalProfile?.overallPerformance?.averageScore20 !== null
                ? `معدل ${traineePracticalProfile?.overallPerformance?.averageScore20}/20`
                : 'في الانتظار'}
            </span>
          </div>
          <p className="text-[11px] text-slateSubtle-600">
            مواقف تقنية واقعية مؤطرة (معلوميات، ميكانيك، إلكترونيات، لوجستيك).
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slateSubtle-200 p-6 shadow-sm space-y-2 print:p-4">
          <span className="text-xs text-slateSubtle-500 font-bold uppercase tracking-wider block">قرار لجنة التوجيه والتعيين</span>
          <div className="flex items-center gap-2 pt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
            <span className="text-sm font-extrabold text-gendarmerie">
              {administrativeDecision.statut === 'VALIDEE_ADMIN'
                ? 'توجيه مصادق عليه رسمياً'
                : 'مقترح استشاري مبني على الكفاءات'}
            </span>
          </div>
          <p className="text-[11px] text-slateSubtle-600 leading-relaxed">
            {administrativeDecision.observationsAr || 'المقترح استشاري وتتخذ القيادة الإدارية القرار النهائي وفق مصلحة الخدمة.'}
          </p>
        </div>
      </div>

      {/* 3. سجل الاختبارات المهنية الثلاثة المكتملة */}
      <div className="bg-white rounded-3xl border border-slateSubtle-200 p-6 sm:p-7 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slateSubtle-200">
          <Layers className="w-4 h-4 text-gold" />
          <h2 className="text-base font-bold text-gendarmerie">الاختبارات المهنية الثلاثة المكتملة</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {completedSimulations.map((mod) => {
            const isDone = mod.statut === 'TERMINE';
            const score = mod.scoreGlobal || 0;
            return (
              <div
                key={mod.moduleId || mod.testId}
                className={`p-4 rounded-2xl border transition-all ${
                  isDone
                    ? 'bg-cream-50/70 border-gendarmerie/20 hover:border-gold/50 shadow-2xs'
                    : 'bg-white border-slateSubtle-200 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white border border-slateSubtle-200 text-gendarmerie">
                    {mod.code}
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    isDone ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isDone ? 'مكتمل ومُقيَّم' : 'غير مجاز'}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-gendarmerie leading-snug line-clamp-1">
                  {mod.titreAr || mod.titreFr}
                </h3>
                {mod.titreFr && mod.titreAr && (
                  <p className="text-[10px] text-slateSubtle-500 font-sans mt-0.5 truncate" dir="ltr">
                    {mod.titreFr}
                  </p>
                )}
                {isDone ? (
                  <div className="mt-2.5 pt-2 border-t border-slateSubtle-200/80 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slateSubtle-600">الدرجة المحصلة:</span>
                      <strong className="text-gendarmerie font-serif font-black">{score}%</strong>
                    </div>
                    {/* Petite jauge visuelle */}
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          score >= 80 ? 'bg-emerald-600' : score >= 60 ? 'bg-gold' : 'bg-amber-500'
                        }`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                    <div className="text-left pt-0.5">
                      <span className="text-[10px] font-bold text-gold-dark font-mono uppercase">
                        {mod.mention}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="mt-2 text-[10px] text-slateSubtle-400">لم يتم إتمام هذا الاختبار المهني بعد</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. سجل الورشات التطبيقية والكفاءات العملية المعتمدة (Section 1 & 5) */}
      {completedWorkshops.length > 0 && (
        <div className="bg-white rounded-3xl border border-slateSubtle-200 p-6 sm:p-7 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slateSubtle-200">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-gold" />
              <h2 className="text-base font-bold text-gendarmerie">الورشات التطبيقية والتقييمات الميدانية المعتمدة</h2>
            </div>
            <span className="text-xs text-slateSubtle-500">
              سُلّم التنقيط الرسمي على 20 نقطة
            </span>
          </div>

          <div className="overflow-x-auto table-responsive-container">
            <table className="w-full text-xs text-right min-w-[580px]">
              <thead className="bg-cream-100/70 text-slateSubtle-700 font-bold border-b border-slateSubtle-200">
                <tr>
                  <th className="p-3">الورشة التطبيقية</th>
                  <th className="p-3">المجال</th>
                  <th className="p-3">المؤطر المشرف</th>
                  <th className="p-3">التاريخ</th>
                  <th className="p-3">النقطة /20</th>
                  <th className="p-3">التقدير</th>
                  <th className="p-3 text-left">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slateSubtle-100">
                {completedWorkshops.map((ws) => (
                  <tr key={ws.assignationId} className="hover:bg-cream-50/50">
                    <td className="p-3">
                      <div className="font-bold text-gendarmerie">{ws.titreAr || ws.titreFr}</div>
                      <div className="text-[10px] font-mono text-slateSubtle-500">{ws.code}</div>
                    </td>
                    <td className="p-3 text-slateSubtle-700">{ws.categorieNom}</td>
                    <td className="p-3 text-slateSubtle-700">{ws.superviseurNom}</td>
                    <td className="p-3 text-slateSubtle-600">{ws.dateRealisation ? new Date(ws.dateRealisation).toLocaleDateString('fr-FR') : '—'}</td>
                    <td className="p-3 font-bold text-gendarmerie font-serif">{ws.scoreObtenu} / {ws.scoreTotalMax || 20}</td>
                    <td className="p-3 font-semibold text-gold-dark">{ws.mention}</td>
                    <td className="p-3 text-left">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        معتمد ومصادق
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. TOP 3 : Recommandations des spécialités professionnelles (Section 4 du prompt) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider">
              <Compass className="w-4 h-4 text-gold" />
              <span>التوافق المهني والميداني المركب</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-gendarmerie font-serif">
              أفضل 3 تخصصات موصى بها وفق المهارات العملية
            </h2>
          </div>
          <span className="text-xs text-slateSubtle-500 bg-cream-100 px-3 py-1.5 rounded-xl border border-slateSubtle-200">
            توصيات استشارية مبنية على تكامل الاختبارات والورشات • لا تلزم قرار التعيين الإداري
          </span>
        </div>

        <div className="space-y-4">
          {topRecommendedSpecialties.map((spec, idx) => {
            const isExpanded = expandedSpecialty === spec.specialiteCode;
            const IconComp = iconComponents[spec.icone] || Shield;

            return (
              <div
                key={spec.specialiteCode}
                className={`bg-white rounded-3xl border-2 transition-all overflow-hidden ${
                  idx === 0
                    ? 'border-gold/60 shadow-card'
                    : 'border-slateSubtle-200 shadow-sm'
                }`}
              >
                {/* Bandeau d'en-tête de la spécialité */}
                <div
                  onClick={() => setExpandedSpecialty(isExpanded ? null : spec.specialiteCode)}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-cream-50/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      idx === 0
                        ? 'bg-gold text-gendarmerie font-black shadow-card ring-4 ring-gold/20'
                        : 'bg-cream-200 text-gendarmerie'
                    }`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          idx === 0 ? 'bg-gold/20 text-gold-dark border border-gold/40' : 'bg-cream-100 text-slateSubtle-600'
                        }`}>
                          التوصية #{spec.rangRecommandation}
                        </span>
                        <span className="text-[10px] font-mono text-slateSubtle-500">
                          {spec.specialiteCode}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                          spec.dataSufficiencyStatus === 'COMPLETE'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {spec.dataSufficiencyStatus === 'COMPLETE' ? 'بيانات كافية' : 'بيانات جزئية'}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-black text-gendarmerie mt-0.5">
                        {spec.intituleAr}
                        <span className="text-xs font-normal text-slateSubtle-500 mr-2" dir="ltr">
                          ({spec.intituleFr})
                        </span>
                      </h3>
                      <p className="text-xs text-slateSubtle-500">
                        {spec.subdivision}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slateSubtle-200/60">
                    <div className="text-right sm:text-right">
                      <span className="text-[10px] text-slateSubtle-500 block">درجة التوافق الميداني:</span>
                      <span className="text-2xl font-black font-serif text-gendarmerie">
                        {spec.scoreCompatibilite}%
                      </span>
                    </div>

                    <button
                      type="button"
                      className="p-2.5 rounded-xl bg-cream-100 hover:bg-cream-200 text-gendarmerie transition cursor-pointer print:hidden min-h-[40px] min-w-[40px] flex items-center justify-center"
                      aria-label="Afficher ou masquer les détails de la recommandation"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Détails déroulants de la recommandation */}
                {(isExpanded || window.matchMedia?.('print')?.matches) && (
                  <div className="p-5 sm:p-6 bg-cream-50/60 border-t border-slateSubtle-200 space-y-5 text-xs">
                    {/* Pourquoi c'est suggéré */}
                    <div className="space-y-1.5 bg-white p-4 rounded-2xl border border-slateSubtle-200/80">
                      <span className="font-bold text-gendarmerie flex items-center gap-1.5 text-xs">
                        <Sparkles className="w-4 h-4 text-gold" />
                        مبررات التوصية والتوافق بين الاختبارات والورشات:
                      </span>
                      <p className="text-slateSubtle-700 leading-relaxed pr-5">
                        {spec.whySuggestedAr}
                      </p>
                      <p className="text-[11px] text-slateSubtle-500 italic pr-5" dir="ltr">
                        {spec.whySuggestedFr}
                      </p>
                    </div>

                    {/* Données probantes : Résultats des Tests et Résultats des Ateliers */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Tests Pertinents */}
                      <div className="bg-white p-4 rounded-2xl border border-slateSubtle-200/80 space-y-2">
                        <span className="font-bold text-gendarmerie flex items-center gap-1.5">
                          <FileCheck2 className="w-4 h-4 text-gold-dark" />
                          الاختبارات المهنية المساهمة في هذا التخصص:
                        </span>
                        {spec.relevantTestResults && spec.relevantTestResults.length > 0 ? (
                          <div className="space-y-1.5">
                            {spec.relevantTestResults.map((t, idx) => (
                              <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-cream-50 text-[11px]">
                                <span className="font-medium text-gendarmerie">{t.titreAr || t.titreFr}</span>
                                <span className="font-mono font-bold text-emerald-800">{t.scorePourcentage}%</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[11px] text-slateSubtle-500 italic">لا توجد اختبارات نظرية خاصة بهذا التخصص.</p>
                        )}
                      </div>

                      {/* Ateliers Pratiques Pertinents */}
                      <div className="bg-white p-4 rounded-2xl border border-slateSubtle-200/80 space-y-2">
                        <span className="font-bold text-gendarmerie flex items-center gap-1.5">
                          <Wrench className="w-4 h-4 text-gold-dark" />
                          الورشات التطبيقية المؤكدة لهذا التخصص:
                        </span>
                        {spec.relevantWorkshopResults && spec.relevantWorkshopResults.length > 0 ? (
                          <div className="space-y-1.5">
                            {spec.relevantWorkshopResults.map((w, idx) => (
                              <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-cream-50 text-[11px]">
                                <div>
                                  <span className="font-medium text-gendarmerie block">{w.titreAr || w.titreFr}</span>
                                  <span className="text-[10px] text-slateSubtle-500 font-mono">{w.code}</span>
                                </div>
                                <span className="font-serif font-bold text-emerald-800">{w.scoreObtenu} / {w.scoreTotalMax} pts</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[11px] text-slateSubtle-500 italic">في انتظار استكمال الورشات التطبيقية الميدانية لهذا التخصص.</p>
                        )}
                      </div>
                    </div>

                    {/* Points forts et axes d'amélioration */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-2xl border border-slateSubtle-200/80 space-y-2">
                        <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          نقاط القوة الميدانية المرصودة:
                        </span>
                        <ul className="space-y-1 pr-5 list-disc text-slateSubtle-700">
                          {spec.demonstratedStrengthsAr.map((st, sIdx) => (
                            <li key={sIdx}>{st}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white p-4 rounded-2xl border border-slateSubtle-200/80 space-y-2">
                        <span className="font-bold text-amber-800 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          محاور التطوير والتأهيل الموصى بها:
                        </span>
                        <ul className="space-y-1 pr-5 list-disc text-slateSubtle-700">
                          {spec.areasForImprovementAr.map((imp, iIdx) => (
                            <li key={iIdx}>{imp}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Conditions d'éligibilité médicale et administrative séparées */}
                    {spec.eligibilityConditions && spec.eligibilityConditions.length > 0 && (
                      <div className="bg-white p-4 rounded-2xl border border-slateSubtle-200/80 space-y-2.5">
                        <div className="flex items-center justify-between pb-1 border-b border-slateSubtle-200">
                          <span className="font-bold text-gendarmerie flex items-center gap-1.5">
                            <Shield className="w-4 h-4 text-gold" />
                            شروط القابلية والفحص الإداري والبدني (منفصلة عن درجات الكفاءة):
                          </span>
                          <span className="text-[10px] text-slateSubtle-500 font-medium">
                            المعايير الإدارية والطبية مستقلة تماماً عن تقييم الكفاءات
                          </span>
                        </div>
                        <div className="space-y-1.5">
                          {spec.eligibilityConditions.map((cond) => (
                            <div key={cond.id} className="flex items-center justify-between p-2.5 rounded-xl bg-cream-50 border border-slateSubtle-200/60">
                              <span className="text-slateSubtle-800">{cond.intituleAr}</span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                cond.statut === 'CONFORME'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-900'
                              }`}>
                                {cond.observationAr}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Profil détaillé des 12 compétences professionnelles */}
      <div className="bg-white rounded-3xl border border-slateSubtle-200 p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slateSubtle-200">
          <div>
            <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-4 h-4 text-gold" />
              <span>الإطار المرجعي الوطني للكفاءات</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-gendarmerie font-serif">
              مستوى التحكم في الكفاءات المهنية الـ 12
            </h2>
          </div>
          <span className="text-xs text-slateSubtle-500">
            تقييم موضوعي يجمع بين دقة الاختبارات والتحكم التقني بالورشات
          </span>
        </div>

        {/* Graphique Radar */}
        <div className="p-4 bg-cream-50/60 rounded-2xl border border-slateSubtle-200">
          <CompetencyRadar domainScores={radarData} height={340} />
        </div>
      </div>

      {/* 7. Cadre de validation légale et signature de la commission */}
      <div className="bg-white rounded-3xl border border-slateSubtle-200 p-6 sm:p-7 shadow-sm text-xs text-slateSubtle-600 space-y-3">
        <div className="flex items-center gap-2 text-gendarmerie font-bold">
          <Shield className="w-4 h-4 text-gold" />
          <span>تنبيه تنظيمي وتوقيع هيئة التوجيه والتعيين</span>
        </div>
        <p className="leading-relaxed">
          هذا التقرير وثيقة استشارية داخلية معتمدة من منصة التوجيه الميداني (ORIENT-G). لا تشكل درجات الملاءمة قراراً حتمياً بالتعيين ولا ضمانة للنجاح في التخصص، وتظل القرارات النهائية خاضعة لاحتياجات القيادة العليا للدرك الملكي، ومداولات لجنة التوجيه، واستيفاء كافة الشروط البدنية والطبية والأمنية المقررة.
        </p>
        <div className="pt-3 border-t border-slateSubtle-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slateSubtle-500">
          <span>المرجع الرسمي: د.م/ق.ع/ت.م/2026/089</span>
          <span className="font-mono">معتمد برمجياً • نظام ORIENT-G للمحاكاة والورشات التطبيقية</span>
        </div>
      </div>
    </div>
  );
}
