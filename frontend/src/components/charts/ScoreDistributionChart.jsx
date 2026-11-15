import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function ScoreDistributionChart({ distribution = [], height = 260 }) {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gendarmerie-darkest/95 backdrop-blur-sm text-white text-xs p-3 rounded-xl shadow-card border border-gold/40">
          <p className="font-bold text-gold">{data.label} ({data.tranche})</p>
          <p className="mt-1">Élèves : <strong>{data.count}</strong></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={distribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#DCE4EA" />
          <XAxis dataKey="tranche" tick={{ fontSize: 11, fill: '#344256' }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#344256' }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" fill="#153B2B" radius={[4, 4, 0, 0]} barSize={28} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
