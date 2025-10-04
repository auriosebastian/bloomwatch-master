// Local: src/components/analysis/tabs/OverviewTab/MetricCard.tsx
import React from 'react';
import { TrendingUp, TrendingDown, Minus, Leaf, Droplets, Flame, Thermometer } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number | string;
  change?: string;
  trend?: 'improving' | 'stable' | 'worsening';
  level?: 'low' | 'moderate' | 'high' | 'very_high';
  metricType: 'vegetation' | 'water' | 'fire' | 'temperature';
}

const MetricCard = ({ 
  title, 
  value, 
  change, 
  trend, 
  level,
  metricType 
}: MetricCardProps) => {
  const trendIcons = {
    improving: <TrendingUp className="w-4 h-4 text-emerald-500" />,
    worsening: <TrendingDown className="w-4 h-4 text-red-500" />,
    stable: <Minus className="w-4 h-4 text-slate-400" />
  };

  const levelColors = {
    low: 'border-l-emerald-400',
    moderate: 'border-l-amber-400',
    high: 'border-l-orange-400',
    very_high: 'border-l-red-400'
  };

  const metricIcons = {
    vegetation: { icon: Leaf, color: 'text-emerald-500' },
    water: { icon: Droplets, color: 'text-cyan-500' },
    fire: { icon: Flame, color: 'text-orange-500' },
    temperature: { icon: Thermometer, color: 'text-red-500' }
  };

  const Icon = metricIcons[metricType].icon;
  const iconColor = metricIcons[metricType].color;

  return (
    <div className={`bg-white rounded-xl p-4 border border-slate-200 border-l-4 ${levelColors[level || 'moderate']} shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between mb-2">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        {trend && trendIcons[trend]}
      </div>
      <div className="text-2xl font-bold text-slate-800">{value}</div>
      <div className="text-sm text-slate-600">{title}</div>
      {change && (
        <div className={`text-xs mt-1 ${change.includes('+') ? 'text-emerald-600' : 'text-red-600'}`}>
          {change} vs última semana
        </div>
      )}
    </div>
  );
};

export default MetricCard;