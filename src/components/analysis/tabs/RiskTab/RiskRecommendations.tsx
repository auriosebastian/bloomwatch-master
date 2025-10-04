// Local: src/components/analysis/tabs/RiskTab/RiskRecommendations.tsx
import React from 'react';
import { RiskRecommendation } from '../../types';
import { AlertTriangle, Clock, DollarSign, CheckCircle } from 'lucide-react';

interface RiskRecommendationsProps {
  recommendations: RiskRecommendation[];
}

const RiskRecommendations = ({ recommendations }: RiskRecommendationsProps) => {
  const typeConfig: Record<string, { icon: React.ElementType; color: string; label: string }> = {
    prevention: { icon: CheckCircle, color: 'bg-emerald-100 text-emerald-800', label: 'Prevenção' },
    mitigation: { icon: AlertTriangle, color: 'bg-orange-100 text-orange-800', label: 'Mitigação' },
    alert: { icon: AlertTriangle, color: 'bg-red-100 text-red-800', label: 'Alerta' },
    monitoring: { icon: Clock, color: 'bg-blue-100 text-blue-800', label: 'Monitoramento' }
  };

  const priorityColors: Record<string, string> = {
    low: 'border-l-emerald-400',
    medium: 'border-l-yellow-400',
    high: 'border-l-orange-400',
    critical: 'border-l-red-400'
  };

  const timeframeLabels: Record<string, string> = {
    immediate: 'Imediato',
    short_term: 'Curto Prazo',
    medium_term: 'Médio Prazo'
  };

  const costLabels: Record<string, string> = {
    low: 'Baixo',
    medium: 'Médio',
    high: 'Alto'
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
      <h3 className="font-semibold text-slate-800 mb-6">Recomendações de Ação</h3>

      <div className="space-y-4">
        {recommendations.map((recommendation, index) => {
          const typeConfigItem = typeConfig[recommendation.type];
          const Icon = typeConfigItem.icon;

          return (
            <div 
              key={index}
              className={`border-l-4 ${priorityColors[recommendation.priority]} border border-slate-200 rounded-lg p-4 bg-slate-50`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <div>
                    <div className="font-medium text-slate-800">{recommendation.title}</div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${typeConfigItem.color} inline-block mt-1`}>
                      {typeConfigItem.label}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock className="w-4 h-4" />
                  <span>{timeframeLabels[recommendation.timeframe]}</span>
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-3">{recommendation.description}</p>

              <div className="space-y-2">
                <div className="text-sm font-medium text-slate-700">Ações Recomendadas:</div>
                <ul className="text-sm text-slate-600 space-y-1">
                  {recommendation.actions.map((action: string, actionIndex: number) => (
                    <li key={actionIndex} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-slate-400 rounded-full" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200">
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Prioridade: 
                    <span className="font-medium text-slate-700 ml-1">
                      {recommendation.priority === 'low' && 'Baixa'}
                      {recommendation.priority === 'medium' && 'Média'}
                      {recommendation.priority === 'high' && 'Alta'}
                      {recommendation.priority === 'critical' && 'Crítica'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    Custo: 
                    <span className="font-medium text-slate-700 ml-1">
                      {costLabels[recommendation.cost]}
                    </span>
                  </div>
                </div>

                <button className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white text-sm rounded-lg transition-colors">
                  Implementar
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {recommendations.length === 0 && (
        <div className="text-center py-8 text-slate-500">
          <div className="text-2xl mb-2">✅</div>
          <div>Nenhuma recomendação necessária no momento</div>
          <div className="text-sm mt-1">Todos os riscos estão sob controle</div>
        </div>
      )}
    </div>
  );
};

export default RiskRecommendations;