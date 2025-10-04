// Local: src/components/analysis/tabs/RiskTab/RiskPredictions.tsx
import React from 'react';
import { RiskPrediction } from '../../types';
import { Calendar, TrendingUp, AlertTriangle, BarChart3 } from 'lucide-react';

interface RiskPredictionsProps {
  predictions: RiskPrediction[];
}

const RiskPredictions = ({ predictions }: RiskPredictionsProps) => {
  const riskLabels: Record<string, string> = {
    fire: 'Incêndio',
    drought: 'Seca',
    degradation: 'Degradação'
  };

  const impactColors: Record<string, string> = {
    low: 'bg-emerald-100 text-emerald-800',
    moderate: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    severe: 'bg-red-100 text-red-800'
  };

  const periodLabels: Record<string, string> = {
    '7d': '7 Dias',
    '15d': '15 Dias',
    '30d': '30 Dias'
  };

  const getProbabilityColor = (probability: number) => {
    if (probability <= 0.3) return 'text-emerald-600';
    if (probability <= 0.6) return 'text-yellow-600';
    if (probability <= 0.8) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-5 h-5 text-blue-500" />
        <h3 className="font-semibold text-slate-800">Previsões de Risco (IA)</h3>
      </div>

      <div className="space-y-4">
        {predictions.map((prediction, index) => (
          <div key={index} className="border border-slate-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <div>
                  <div className="font-medium text-slate-800">
                    {riskLabels[prediction.riskType]} - {periodLabels[prediction.period]}
                  </div>
                  <div className="text-sm text-slate-500">
                    Confiança do modelo: {prediction.confidence}%
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className={`text-xl font-bold ${getProbabilityColor(prediction.probability)}`}>
                    {(prediction.probability * 100).toFixed(0)}%
                  </div>
                  <div className="text-xs text-slate-500">Probabilidade</div>
                </div>
                
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${impactColors[prediction.expectedImpact]}`}>
                  {prediction.expectedImpact === 'low' && 'Baixo'}
                  {prediction.expectedImpact === 'moderate' && 'Moderado'}
                  {prediction.expectedImpact === 'high' && 'Alto'}
                  {prediction.expectedImpact === 'severe' && 'Severo'}
                </div>
              </div>
            </div>

            {/* Fatores de Influência */}
            <div className="mt-3">
              <div className="text-sm font-medium text-slate-700 mb-2">Fatores de Influência:</div>
              <div className="space-y-2">
                {prediction.factors.map((factor, factorIndex: number) => (
                  <div key={factorIndex} className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">{factor.name}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-20 bg-slate-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: `${factor.contribution * 100}%` }}
                        />
                      </div>
                      <span className="text-slate-500 text-xs w-16">
                        {(factor.contribution * 100).toFixed(0)}%
                      </span>
                      <TrendingUp className={`w-4 h-4 ${
                        factor.trend === 'worsening' ? 'text-red-500' :
                        factor.trend === 'improving' ? 'text-emerald-500' : 'text-slate-400'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2 text-sm text-blue-800">
          <BarChart3 className="w-4 h-4" />
          <span>Previsões baseadas em modelos de machine learning com dados históricos e em tempo real</span>
        </div>
      </div>
    </div>
  );
};

export default RiskPredictions;