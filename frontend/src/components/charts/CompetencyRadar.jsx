import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

export default function CompetencyRadar({ domainScores = [], height = 320 }) {
  const chartData = domainScores.map(d => ({
    domaine: d.DomaineIntitule || d.domaine || d.DomaineCode,
    score: d.Pourcentage !== undefined ? d.Pourcentage : (d.moyenne !== undefined ? d.moyenne : 75),
    fullMark: 100
  }));

  if (chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-xs text-slateSubtle-700">
        Données de compétences insuffisantes
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gendarmerie-darkest/95 backdrop-blur-sm text-white text-xs p-3 rounded-xl shadow-card border border-gold/40">
          <p className="font-semibold text-gold">{payload[0].payload.domaine}</p>
          <p className="mt-1">Score : <strong>{payload[0].value}%</strong></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full min-w-0 overflow-hidden" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="68%" data={chartData}>
          <PolarGrid stroke="#DCE4EA" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="domaine"
            tick={{ fill: '#344256', fontSize: 10, fontWeight: 500 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: '#64748B', fontSize: 9 }}
            stroke="#DCE4EA"
          />
          <Tooltip content={<CustomTooltip />} />
          <Radar
            name="Score Élève"
            dataKey="score"
            stroke="#C9A052"
            strokeWidth={2.5}
            fill="#153B2B"
            fillOpacity={0.45}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
