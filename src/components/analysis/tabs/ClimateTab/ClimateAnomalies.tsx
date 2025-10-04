// Local: src/components/analysis/tabs/ClimateTab/ClimateAnomalies.tsx
import React from 'react';
import { ClimateAnomaly } from '../../types';
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';

interface ClimateAnomaliesProps {
  anomalies: ClimateAnomaly[];
}

const ClimateAnomalies = ({ anomalies }: ClimateAnomaliesProps) => {
  const metricNames: Record<string, string> = {
    temperature: 'Temperatura',
    precipitation: 'Precipitação',
    humidity: 'Umidade'
  };

  const metricUnits: Record<string, string> = {
    temperature: '°C',
    precipitation: 'mm',
    humidity: '%'
  };

  const severityColors: Record<string, string> = {
    low: 'bg-blue-100 text-blue-800',
    moderate: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    extreme: 'bg-red-100 text-red-800'
  };

  const trendIcons = {
    increasing: <TrendingUp className="w-4 h-4 text-red-500" />,
    decreasing: <TrendingDown className="w-4 h-4 text-blue-500" />,
    stable: <Minus className="w-4 h-4 text-slate-400" />
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <AlertTriangle className="w-5 h-5 text-orange-500" />
        <h3 className="font-semibold text-slate-800">Anomalias Climáticas</h3>
      </div>

      {anomalies.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          <div className="text-2xl mb-2">✅</div>
          <div>Nenhuma anomalia climática detectada</div>
          <div className="text-sm mt-1">Condições dentro da normalidade</div>
        </div>
      ) : (
        <div className="space-y-4">
          {anomalies.map((anomaly, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="text-2xl">
                  {anomaly.metric === 'temperature' && '🌡️'}
                  {anomaly.metric === 'precipitation' && '🌧️'}
                  {anomaly.metric === 'humidity' && '💧'}
                </div>
                
                <div>
                  <div className="font-medium text-slate-800">
                    {metricNames[anomaly.metric]}
                  </div>
                  <div className="text-sm text-slate-500">
                    {anomaly.value}{metricUnits[anomaly.metric]} vs normal de {anomaly.normal}{metricUnits[anomaly.metric]}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${severityColors[anomaly.severity]}`}>
                    {anomaly.severity === 'low' && 'Leve'}
                    {anomaly.severity === 'moderate' && 'Moderado'}
                    {anomaly.severity === 'high' && 'Alto'}
                    {anomaly.severity === 'extreme' && 'Extremo'}
                  </div>
                  <div className="text-sm text-slate-600 mt-1">
                    {anomaly.deviation > 0 ? '+' : ''}{anomaly.deviation.toFixed(1)}
                    {metricUnits[anomaly.metric]}
                  </div>
                </div>

                {trendIcons[anomaly.trend]}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 text-xs text-slate-500">
        {anomalies.length} anomalia(s) detectada(s) em relação à média histórica
      </div>
    </div>
  );
};

export default ClimateAnomalies;