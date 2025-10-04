// Local: src/components/analysis/tabs/RiskTab/RiskMeter.tsx
import React from 'react';
import { RiskIndex } from '../../types';
import { TrendingUp, TrendingDown, Minus, Flame, Droplets, TreePine, AlertTriangle } from 'lucide-react';

interface RiskMeterProps {
  risks: RiskIndex[];
}

const RiskMeter = ({ risks }: RiskMeterProps) => {
  const riskConfig: Record<string, { icon: React.ElementType; color: string; label: string }> = {
    fire: { icon: Flame, color: 'from-red-500 to-orange-500', label: 'Incêndio' },
    drought: { icon: Droplets, color: 'from-blue-500 to-cyan-500', label: 'Seca' },
    degradation: { icon: TreePine, color: 'from-emerald-500 to-green-500', label: 'Degradação' },
    flood: { icon: AlertTriangle, color: 'from-indigo-500 to-purple-500', label: 'Inundação' }
  };

  const levelColors: Record<string, string> = {
    low: 'text-emerald-600 bg-emerald-100',
    moderate: 'text-yellow-600 bg-yellow-100',
    high: 'text-orange-600 bg-orange-100',
    very_high: 'text-red-600 bg-red-100',
    extreme: 'text-purple-600 bg-purple-100'
  };

  const trendIcons = {
    increasing: <TrendingUp className="w-4 h-4 text-red-500" />,
    decreasing: <TrendingDown className="w-4 h-4 text-emerald-500" />,
    stable: <Minus className="w-4 h-4 text-slate-400" />
  };

  const getRiskLevelColor = (value: number) => {
    if (value <= 20) return 'text-emerald-500';
    if (value <= 40) return 'text-yellow-500';
    if (value <= 60) return 'text-orange-500';
    if (value <= 80) return 'text-red-500';
    return 'text-purple-500';
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
      <h3 className="font-semibold text-slate-800 mb-6">Índices de Risco Atuais</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {risks.map((risk, index) => {
          const config = riskConfig[risk.type];
          const Icon = config.icon;

          return (
            <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-slate-600" />
                  <span className="font-medium text-slate-800">{config.label}</span>
                </div>
                {trendIcons[risk.trend]}
              </div>

              {/* Medidor de Risco */}
              <div className="mb-3">
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                  <span>Risco</span>
                  <span className="font-bold">{risk.value}/100</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full bg-gradient-to-r ${config.color}`}
                    style={{ width: `${risk.value}%` }}
                  />
                </div>
              </div>

              {/* Nível e Probabilidade */}
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${levelColors[risk.level]}`}>
                  {risk.level === 'low' && 'Baixo'}
                  {risk.level === 'moderate' && 'Moderado'}
                  {risk.level === 'high' && 'Alto'}
                  {risk.level === 'very_high' && 'Muito Alto'}
                  {risk.level === 'extreme' && 'Extremo'}
                </span>
                <span className="text-sm text-slate-600">
                  {(risk.probability * 100).toFixed(0)}% prob.
                </span>
              </div>

              {/* Fatores Principais */}
              <div className="mt-3">
                <div className="text-xs text-slate-500 mb-1">Fatores:</div>
                <div className="flex flex-wrap gap-1">
                  {risk.factors.slice(0, 2).map((factor, factorIndex) => (
                    <span 
                      key={factorIndex}
                      className="px-2 py-1 bg-white rounded text-xs text-slate-600 border border-slate-300"
                    >
                      {factor}
                    </span>
                  ))}
                  {risk.factors.length > 2 && (
                    <span className="px-2 py-1 bg-white rounded text-xs text-slate-500 border border-slate-300">
                      +{risk.factors.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resumo Geral */}
      <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-slate-800">Status Geral de Risco</div>
            <div className="text-sm text-slate-600">
              {risks.filter(r => r.level === 'extreme' || r.level === 'very_high').length} risco(s) crítico(s)
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            risks.some(r => r.level === 'extreme') 
              ? 'bg-purple-100 text-purple-800'
              : risks.some(r => r.level === 'very_high')
              ? 'bg-red-100 text-red-800'
              : 'bg-emerald-100 text-emerald-800'
          }`}>
            {risks.some(r => r.level === 'extreme') ? 'CRÍTICO' :
             risks.some(r => r.level === 'very_high') ? 'ALTO' : 'ESTÁVEL'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskMeter;