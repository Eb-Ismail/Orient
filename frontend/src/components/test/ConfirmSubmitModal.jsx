import React from 'react';
import Modal from '../common/Modal.jsx';
import Button from '../common/Button.jsx';
import { AlertTriangle, CheckCircle2, Send } from 'lucide-react';

export default function ConfirmSubmitModal({
  isOpen,
  onClose,
  onConfirm,
  totalQuestions,
  answeredCount,
  loading = false
}) {
  const unansweredCount = totalQuestions - answeredCount;
  const isComplete = unansweredCount === 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="تأكيد إنهاء وإرسال الاختبار (Confirmation de Clôture)"
      subtitle="منظومة التوجيه المهني الرسمي للدرك الملكي • ORIENT-G"
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            العودة للأسئلة
          </Button>
          <Button
            variant="gold"
            icon={Send}
            onClick={onConfirm}
            loading={loading}
          >
            تأكيد الإرسال النهائي
          </Button>
        </>
      }
    >
      <div className="space-y-4 text-right" dir="rtl">
        {isComplete ? (
          <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-emerald-950 text-sm font-serif">تمت الإجابة على جميع الأسئلة بنجاح</h4>
              <p className="text-xs text-emerald-900 mt-1 leading-relaxed">
                لقد أجبت على كافة الأسئلة الـ {totalQuestions}. عند تأكيد الإرسال، سيتم حفظ إجاباتك نهائياً وتحديث كفاءاتك في تقرير التوجيه.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-950 text-sm font-serif">تنبيه : توجد أسئلة لم تتم الإجابة عليها بعد</h4>
              <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                يتبقى لديك <strong>{unansweredCount} سؤال{unansweredCount > 1 ? ' أسئلة' : ''}</strong> بدون إجابة من أصل {totalQuestions}. أي سؤال غير مجاب سيحصل على 0 نقطة.
              </p>
            </div>
          </div>
        )}

        <div className="bg-cream-100/70 rounded-xl p-3.5 text-xs text-slateSubtle-700 space-y-1.5 border border-slateSubtle-200 font-sans">
          <div className="flex justify-between">
            <span>عدد الأسئلة المجاب عنها :</span>
            <strong className="text-gendarmerie font-mono">{answeredCount} / {totalQuestions}</strong>
          </div>
          <div className="flex justify-between">
            <span>حالة الاختبار بعد الإرسال :</span>
            <span className="font-medium text-slateSubtle-800">مكتمل ومسجل في سجل التوجيه</span>
          </div>
        </div>

        <p className="text-xs text-slateSubtle-600 italic text-center font-serif">
          « تشارك نتائج الاختبارات المهنية في تحديد أفضل التخصصات الملائمة لكل تلميذ دركي وفق الجدارة والاستحقاق. »
        </p>
      </div>
    </Modal>
  );
}
