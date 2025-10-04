// Local: src/components/analysis/tabs/OverviewTab/AlertCard.tsx
import React from 'react';
import { Droplets, Flame, Thermometer, Leaf } from 'lucide-react';
import { Alert } from '../../types';

interface AlertCardProps {
  alert: Alert;
}

const AlertCard = ({ alert }: AlertCardProps) => {
  const alertConfig: Record<string, { icon: React.ElementType; color: string }> = {
    drought: { icon: Droplets, color: 'bg-blue-50 border-blue-200' },
    fire: { icon: Flame, color: 'bg-orange-50 border-orange-200' },
    temperature: { icon: Thermometer, color: 'bg-red-50 border-red-200' },
    vegetation: { icon: Leaf, color: 'bg-emerald-50 border-emerald-200' }
  };

  const levelColors: Record<string, string> = {
    low: 'text-blue-600',
    moderate: 'text-amber-600',
    high: 'text-orange-600',
    critical: 'text-red-600'
  };

  const config = alertConfig[alert.type] || alertConfig.vegetation;
  const Icon = config.icon;

  return (
    <div className={`p-3 rounded-lg border ${config.color} flex items-start gap-3`}>
      <Icon className={`w-4 h-4 mt-0.5 ${levelColors[alert.level]}`} />
      <div className="flex-1">
        <div className="text-sm font-medium text-slate-800">{alert.message}</div>
        <div className="text-xs text-slate-500 mt-1">
          {new Date(alert.timestamp).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default AlertCard;