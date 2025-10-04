// Local: src/components/analysis/tabs/TimeseriesTab/MetricSelector.tsx
import React from 'react';

interface MetricSelectorProps {
  availableMetrics: string[];
  selectedMetrics: string[];
  onMetricsChange: (metrics: string[]) => void;
}

const MetricSelector = ({ availableMetrics, selectedMetrics, onMetricsChange }: MetricSelectorProps) => {
  const metricNames: Record<string, string> = {
    ndvi: 'NDVI - Vegetação',
    ndwi: 'NDWI - Água',
    temperature: 'Temperatura',
    precipitation: 'Precipitação'
  };

  const toggleMetric = (metric: string) => {
    if (selectedMetrics.includes(metric)) {
      onMetricsChange(selectedMetrics.filter(m => m !== metric));
    } else {
      onMetricsChange([...selectedMetrics, metric]);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
      <h4 className="font-semibold text-slate-800 mb-3">Métricas para Visualizar</h4>
      <div className="grid grid-cols-2 gap-3">
        {availableMetrics.map(metric => (
          <label key={metric} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedMetrics.includes(metric)}
              onChange={() => toggleMetric(metric)}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <span className="text-sm text-slate-700">
              {metricNames[metric] || metric}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MetricSelector;