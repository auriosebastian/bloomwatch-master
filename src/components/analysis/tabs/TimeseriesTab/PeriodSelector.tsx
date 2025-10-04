// Local: src/components/analysis/tabs/TimeseriesTab/PeriodSelector.tsx
import React from 'react';
import { PeriodOption } from '../../types';

interface PeriodSelectorProps {
  periods: PeriodOption[];
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

const PeriodSelector = ({ periods, selectedPeriod, onPeriodChange }: PeriodSelectorProps) => {
  return (
    <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
      <h4 className="font-semibold text-slate-800 mb-3">Período de Análise</h4>
      <div className="flex flex-wrap gap-2">
        {periods.map(period => (
          <button
            key={period.value}
            onClick={() => onPeriodChange(period.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedPeriod === period.value
                ? 'bg-emerald-500 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PeriodSelector;