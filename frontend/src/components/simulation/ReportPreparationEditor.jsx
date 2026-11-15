import React from 'react';
import { PenTool, CheckCircle2, FileText, AlertCircle } from 'lucide-react';

export default function ReportPreparationEditor({ rubriqueCriteres = [], champsAttendus = {}, values = {}, onChange }) {
  const texteRapport = values.texteRapport || '';
  const motsCles = champsAttendus.motsClesRequis || [];

  const handleTextChange = (e) => {
    if (onChange) {
      onChange({ ...values, texteRapport: e.target.value });
    }
  };

  const wordCount = texteRapport.trim() ? texteRapport.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-6 text-right font-sans" dir="rtl">
      {/* Modèle de document officiel de la Gendarmerie Royale */}
      <div className="bg-white rounded-2xl border-2 border-gendarmerie/25 p-6 md:p-8 shadow-card space-y-6">
        {/* En-tête militaire */}
        <div className="text-center pb-4 border-b-2 border-gendarmerie/20 space-y-1">
          <p className="text-xs font-bold text-gold uppercase tracking-wider">
            المملكة المغربية • إدارة الدفاع الوطني
          </p>
          <h2 className="text-base sm:text-lg font-bold text-gendarmerie">
            الدرك الملكي • تقرير إخباري تركيبي رسمي
          </h2>
          <div className="text-xs text-slateSubtle-600 pt-1 flex flex-col sm:flex-row items-center justify-center gap-3">
            <span><strong>الموضوع:</strong> {champsAttendus.objet || 'تقرير في شأن مسطرة قضائية'}</span>
            <span className="hidden sm:inline">•</span>
            <span><strong>الجهة الموجه إليها:</strong> {champsAttendus.destinataire || 'السيد وكيل الملك'}</span>
          </div>
        </div>

        {/* Zone de rédaction */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-gendarmerie">
            نص التقرير التركيبي والملاحظات الإجرائية (صياغة موضوعية):
          </label>
          <textarea
            rows={10}
            value={texteRapport}
            onChange={handleTextChange}
            placeholder="يشرفني أن أرفع إلى علمكم الكريم الوقائع التالية: بناءً على المعاينات المجراة والأدلة المستجمعة في إطار المسطرة الجارية..."
            className="w-full text-xs sm:text-sm p-4 rounded-xl border border-slateSubtle-200 bg-cream-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gendarmerie font-serif leading-relaxed text-slateSubtle-800 transition"
          />

          {/* Compteur de mots */}
          <div className="flex items-center justify-between text-xs text-slateSubtle-500 pt-1">
            <span className={wordCount >= 40 ? 'text-emerald-700 font-bold' : 'text-slateSubtle-500'}>
              عدد الكلمات المحررة: <strong>{wordCount}</strong> كلمة (الموصى به: 40 كلمة على الأقل)
            </span>
            <span className="text-[11px] text-slateSubtle-400">
              يتم الحفظ التلقائي فور التحرير
            </span>
          </div>
        </div>

        {/* Mots-clés requis détectés en temps réel */}
        {motsCles.length > 0 && (
          <div className="p-4 rounded-xl bg-cream-50 border border-slateSubtle-200 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gendarmerie block">
              المصطلحات والمفاهيم الإجرائية المستهدفة في الصياغة:
            </span>
            <div className="flex flex-wrap gap-2">
              {motsCles.map((mot, idx) => {
                const isPresent = texteRapport.includes(mot);
                return (
                  <span
                    key={idx}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                      isPresent
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold'
                        : 'bg-white text-slateSubtle-500 border border-slateSubtle-200'
                    }`}
                  >
                    {isPresent && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />}
                    {mot}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Grille des critères d'évaluation */}
        {rubriqueCriteres.length > 0 && (
          <div className="pt-2 border-t border-slateSubtle-200 text-xs text-slateSubtle-600 space-y-1.5">
            <span className="font-bold text-gendarmerie block">معايير تقييم الصياغة:</span>
            <ul className="list-disc list-inside space-y-1 pr-1">
              {rubriqueCriteres.map((crit, idx) => (
                <li key={idx} className="text-slateSubtle-700">{crit}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
