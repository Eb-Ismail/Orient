import React, { useState } from 'react';
import { Database, Search, AlertCircle, CheckCircle2, Filter } from 'lucide-react';

const COLUMN_LABELS_AR = {
  timestamp: 'التوقيت',
  time: 'التوقيت',
  period: 'الفترة الزمنية',
  user: 'المستخدم / الفاعل',
  matricule: 'الرقم العسكري',
  caller: 'رقم الهاتف / المتصل',
  cellTower: 'محطة الإرسال الخلوية',
  ip: 'عنوان IP',
  action: 'العملية / الإجراء',
  location: 'الموقع الجغرافي',
  coord: 'الإحداثيات الجغرافية',
  typeAr: 'النوع / الصنف',
  vin: 'رقم الإطار (VIN)',
  docVin: 'رقم VIN بالوثيقة الرسمية',
  year: 'سنة الصنع',
  speed: 'السرعة المسجلة',
  activity: 'النشاط المسجل',
  duration: 'المدة المستغرقة',
  query: 'استعلام قاعدة البيانات SQL',
  depth: 'عمق الحفر (متر)',
  permitNumber: 'رقم رخصة الحفر / الاستغلال',
  piecesFourniesAr: 'الوثائق المدلى بها',
  pieceManquanteAr: 'الوضعية / الوثائق الناقصة',
  garde1: 'فترة الخدمة 1',
  garde2: 'فترة الخدمة 2',
  reposeHours: 'ساعات الراحة الفاصلة'
};

export default function DataTableInspector({ dataset = [], anomaliesToSelect = [], values = {}, onChange }) {
  const [searchTerm, setSearchTerm] = useState('');

  const selectedAnomalies = values.selectedAnomalies || [];

  const toggleSelectRow = (rowId) => {
    let next;
    if (selectedAnomalies.includes(rowId)) {
      next = selectedAnomalies.filter(id => id !== rowId);
    } else {
      next = [...selectedAnomalies, rowId];
    }
    if (onChange) {
      onChange({ ...values, selectedAnomalies: next });
    }
  };

  const hiddenKeys = new Set(['id', 'status', 'estComplet']);
  const sampleRow = dataset[0] || {};
  const visibleColumns = Object.keys(sampleRow).filter(k => !hiddenKeys.has(k));

  const filteredData = dataset.filter(row => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return visibleColumns.some(colKey => {
      const val = row[colKey];
      return val !== undefined && String(val).toLowerCase().includes(term);
    });
  });

  return (
    <div className="space-y-5 text-right font-sans" dir="rtl">
      {/* Barre de recherche et statut */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-slateSubtle-200 shadow-2xs">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="ابحث في السجلات والبيانات..."
              className="w-full pl-3 pr-9 py-2 text-xs rounded-xl border border-slateSubtle-200 bg-cream-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/30"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-xl font-medium">
            <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>السجلات المشبوهة المحددة:</span>
            <span className="font-bold font-mono">
              {selectedAnomalies.length}
              {anomaliesToSelect && anomaliesToSelect.length > 0 ? ` / ${anomaliesToSelect.length}` : ' محددة'}
            </span>
          </div>
        </div>
      </div>

      {/* Table interactive */}
      <div className="bg-white rounded-2xl border border-slateSubtle-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto table-responsive-container">
          <table className="w-full text-right text-xs min-w-[550px]">
            <thead className="bg-[#153B2B] text-white">
              <tr>
                <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider w-24">
                  تحديد كشبهة
                </th>
                {visibleColumns.map(colKey => (
                  <th key={colKey} className="py-3 px-4 font-bold text-[11px] whitespace-nowrap">
                    {COLUMN_LABELS_AR[colKey] || colKey}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slateSubtle-100">
              {filteredData.map((row, idx) => {
                const isSelected = selectedAnomalies.includes(row.id);
                return (
                  <tr
                    key={row.id || idx}
                    onClick={() => toggleSelectRow(row.id)}
                    className={`transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-amber-50/90 text-amber-950 font-medium'
                        : idx % 2 === 0
                        ? 'bg-white hover:bg-cream-100/70'
                        : 'bg-cream-50/50 hover:bg-cream-100/70'
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        isSelected ? 'bg-amber-600 border-amber-700 text-white' : 'border-slateSubtle-300 bg-white'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </td>
                    {visibleColumns.map(colKey => {
                      const val = row[colKey];
                      if (colKey === 'pieceManquanteAr') {
                        return (
                          <td key={colKey} className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              row.estComplet ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {val}
                            </span>
                          </td>
                        );
                      }
                      const isMono = ['ip', 'timestamp', 'time', 'vin', 'docVin', 'coord', 'permitNumber', 'query', 'speed'].includes(colKey);
                      return (
                        <td
                          key={colKey}
                          className={`py-3 px-4 ${isMono ? 'font-mono text-[11px]' : ''} ${
                            colKey === 'user' || colKey === 'typeAr' ? 'font-bold text-gendarmerie' : 'text-slateSubtle-700'
                          }`}
                        >
                          {val !== undefined ? String(val) : '-'}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
