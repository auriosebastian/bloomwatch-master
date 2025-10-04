// Local: src/components/analysis/tabs/ClimateTab/DroughtForecast.tsx
import React from 'react';
import type { DroughtForecast as DroughtForecastType } from '../../types'; // ← type-only import
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface DroughtForecastProps {
  forecasts: DroughtForecastType[];
}

const DroughtForecast = ({ forecasts }: DroughtForecastProps) => {
  const severityConfig: Record<string, { color: string; icon: React.ElementType; label: string }> = {
    none: { color: 'bg-emerald-100 text-emerald-800', icon: CheckCircle, label: 'Sem Risco' },
    mild: { color: 'bg-blue-100 text-blue-800', icon: Info, label: 'Leve' },
    moderate: { color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle, label: 'Moderado' },
    severe: { color: 'bg-orange-100 text-orange-800', icon: AlertTriangle, label: 'Severo' },
    extreme: { color: 'bg-red-100 text-red-800', icon: AlertTriangle, label: 'Extremo' }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <AlertTriangle className="w-5 h-5 text-orange-500" />
        <h3 className="font-semibold text-slate-800">Previsão de Seca</h3>
      </div>

      <div className="space-y-4">
        {forecasts.map((forecast, index) => {
          const config = severityConfig[forecast.severity];
          const Icon = config.icon;

          return (
            <div key={index} className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-slate-800">{forecast.period}</span>
                </div>
                
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
                  {config.label}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-slate-500">Probabilidade</div>
                  <div className="font-bold text-slate-800">{forecast.probability}%</div>
                </div>
                
                <div className="text-center">
                  <div className="text-slate-500">Confiança</div>
                  <div className="font-bold text-slate-800">{forecast.confidence}%</div>
                </div>
                
                <div className="text-center">
                  <div className="text-slate-500">Área Afetada</div>
                  <div className="font-bold text-slate-800">{forecast.affectedArea}%</div>
                </div>
              </div>

              {forecast.recommendations.length > 0 && (
                <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                  <div className="text-sm font-medium text-slate-700 mb-2">Recomendações:</div>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {forecast.recommendations.map((rec, recIndex) => (
                      <li key={recIndex}>• {rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-xs text-slate-500 flex items-center gap-2">
        <Info className="w-3 h-3" />
        Baseado em dados de precipitação, umidade do solo e temperaturas históricas
      </div>
    </div>
  );
};

export default DroughtForecast;