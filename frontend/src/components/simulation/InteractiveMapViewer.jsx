import React, { useState } from 'react';
import { MapPin, AlertTriangle, Shield, CheckCircle2, Info, Compass, Flame, Car, TreePine, Waves } from 'lucide-react';

export default function InteractiveMapViewer({ mapData, hotspotsAIdentifier = [], values = {}, onChange }) {
  const selectedHotspots = values.selectedHotspots || [];
  const [activeZone, setActiveZone] = useState(null);

  const toggleHotspot = (hotspotId) => {
    let next;
    if (selectedHotspots.includes(hotspotId)) {
      next = selectedHotspots.filter(id => id !== hotspotId);
    } else {
      next = [...selectedHotspots, hotspotId];
    }
    if (onChange) {
      onChange({ ...values, selectedHotspots: next });
    }
  };

  const zones = mapData?.zones || [];

  return (
    <div className="space-y-6 text-right font-sans" dir="rtl">
      {/* En-tête de la carte tactique */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-slateSubtle-200">
        <div>
          <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-wider mb-0.5">
            <Compass className="w-4 h-4 text-gold" />
            <span>المخطط الطبوغرافي والعملياتي الميداني</span>
          </div>
          <h3 className="text-base font-bold text-gendarmerie">
            المحور: {mapData?.axe} • {mapData?.pk}
          </h3>
        </div>
        <div className="flex items-center gap-2 bg-cream-100 px-3 py-1.5 rounded-xl border border-slateSubtle-200 text-xs">
          <span className="text-slateSubtle-600">البؤر المحددة:</span>
          <span className="font-bold text-gendarmerie font-mono">
            {selectedHotspots.length} / {hotspotsAIdentifier.length}
          </span>
        </div>
      </div>

      {/* Rendu visuel interactif de la scène opérationnelle (SVG Tactique) */}
      <div className="relative bg-[#0E291E] rounded-2xl border-2 border-[#1C4E39] p-4 sm:p-6 shadow-card overflow-hidden">
        {/* Grille tactique militaire en arrière-plan */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#C9A052 1px, transparent 1px), linear-gradient(90deg, #C9A052 1px, transparent 1px)',
            backgroundSize: '36px 36px'
          }}
        />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {zones.map((zone, idx) => {
            const isZoneSelected = activeZone?.id === zone.id;
            const dangerColor =
              zone.dangerLevel === 'EXTREME'
                ? 'border-rose-500 bg-rose-950/40 text-rose-200'
                : zone.dangerLevel === 'CRITICAL'
                ? 'border-amber-500 bg-amber-950/40 text-amber-200'
                : zone.dangerLevel === 'HIGH'
                ? 'border-yellow-500 bg-yellow-950/40 text-yellow-200'
                : 'border-emerald-500 bg-emerald-950/40 text-emerald-200';

            return (
              <div
                key={zone.id || idx}
                onClick={() => setActiveZone(zone)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer backdrop-blur-sm ${dangerColor} ${
                  isZoneSelected ? 'ring-2 ring-gold scale-[1.01]' : 'hover:opacity-95'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
                    <h4 className="font-bold text-sm text-white">{zone.nomAr}</h4>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/40 border border-white/20 text-gold">
                    {zone.dangerLevel}
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {zone.descriptionAr}
                </p>
              </div>
            );
          })}
        </div>

        {/* Boussole et coordonnées */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
          <span className="font-mono">COORD: 33°35'N 07°36'W • SECTEUR OPERATIONNEL GENDARMERIE</span>
          <span className="text-gold font-bold">DIRECTION : NORD-EST ↗</span>
        </div>
      </div>

      {/* Liste d'identification des bؤر الحرجة للمتدرب */}
      <div className="bg-white rounded-2xl border border-slateSubtle-200 p-5 md:p-6 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between pb-2 border-b border-slateSubtle-200">
          <div className="flex items-center gap-2 text-xs font-bold text-gendarmerie">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>بؤر الخطر الميداني المطلوب رصدها وتحديدها</span>
          </div>
          <span className="text-xs text-slateSubtle-500">انقر لتحديد أو إلغاء تحديد البؤرة</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {hotspotsAIdentifier.map(spot => {
            const isChecked = selectedHotspots.includes(spot.id);
            return (
              <button
                key={spot.id}
                type="button"
                onClick={() => toggleHotspot(spot.id)}
                className={`p-3.5 rounded-xl border text-right transition-all flex items-start gap-3 cursor-pointer ${
                  isChecked
                    ? 'bg-[#153B2B] text-white border-[#153B2B] shadow-card'
                    : 'bg-white hover:bg-cream-100 text-slateSubtle-800 border-slateSubtle-200'
                }`}
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 border ${
                  isChecked ? 'bg-gold text-gendarmerie border-gold' : 'border-slateSubtle-300 bg-cream-50'
                }`}>
                  {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold leading-snug">{spot.titreAr}</p>
                  <span className={`text-[10px] mt-1 inline-block ${isChecked ? 'text-gold-light' : 'text-slateSubtle-500'}`}>
                    النطاق: {spot.zoneId}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
