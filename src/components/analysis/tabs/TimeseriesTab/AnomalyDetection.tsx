// Local: src/components/analysis/tabs/TimeseriesTab/AnomalyDetection.tsx
import React from 'react';
import { TimeSeriesData } from '../../types';

interface AnomalyDetectionProps {
  data: TimeSeriesData[];
  onAnomaliesDetected: (anomalies: TimeSeriesData[]) => void;
}

const AnomalyDetection = ({ data, onAnomaliesDetected }: AnomalyDetectionProps) => {
  // Simulação de detecção de anomalias
  const detectAnomalies = () => {
    // Algoritmo simples baseado em desvio padrão
    const ndviValues = data.map(d => d.ndvi);
    const mean = ndviValues.reduce((a, b) => a + b, 0) / ndviValues.length;
    const std = Math.sqrt(ndviValues.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / ndviValues.length);
    
    const anomalies = data.filter(d => Math.abs(d.ndvi - mean) > 2 * std);
    onAnomaliesDetected(anomalies);
    
    return anomalies;
  };

  const anomalies = data.filter(d => d.anomaly);
  const hasAnomalies = anomalies.length > 0;

  return (
    <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
      <h4 className="font-semibold text-slate-800 mb-3">Detecção de Anomalias</h4>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Anomalias detectadas:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            hasAnomalies ? 'bg-orange-100 text-orange-800' : 'bg-emerald-100 text-emerald-800'
          }`}>
            {anomalies.length} {hasAnomalies ? 'anomalias' : 'normal'}
          </span>
        </div>

        <button
          onClick={() => detectAnomalies()}
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
        >
          🔍 Executar Detecção de Anomalias
        </button>

        {hasAnomalies && (
          <div className="mt-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
            <div className="text-sm font-medium text-orange-800 mb-2">
              ⚡ Anomalias Encontradas
            </div>
            <div className="text-xs text-orange-600 space-y-1">
              {anomalies.slice(0, 3).map((anomaly, index) => (
                <div key={index}>
                  {new Date(anomaly.date).toLocaleDateString('pt-BR')} - NDVI: {anomaly.ndvi}
                </div>
              ))}
              {anomalies.length > 3 && (
                <div>... e mais {anomalies.length - 3} anomalias</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnomalyDetection;