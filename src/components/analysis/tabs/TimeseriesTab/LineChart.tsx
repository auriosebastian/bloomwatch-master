// Local: src/components/analysis/tabs/TimeseriesTab/LineChart.tsx
import React from 'react';
import { TimeSeriesData } from '../../types';

interface LineChartProps {
  data: TimeSeriesData[];
  metrics: string[];
  title: string;
  height?: number;
  showAnomalies?: boolean;
}

const LineChart = ({ data, metrics, title, height = 300, showAnomalies = true }: LineChartProps) => {
  // Cores para cada métrica
  const metricColors: Record<string, string> = {
    ndvi: '#10b981',
    ndwi: '#3b82f6',
    temperature: '#ef4444',
    precipitation: '#8b5cf6'
  };

  const metricNames: Record<string, string> = {
    ndvi: 'NDVI',
    ndwi: 'NDWI',
    temperature: 'Temperatura (°C)',
    precipitation: 'Precipitação (mm)'
  };

  // Simulação de dados para demonstração - CORRIGIDO
  const chartData = data.map(item => ({
    formattedDate: new Date(item.date).toLocaleDateString('pt-BR'),
    ...item
  }));

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-slate-800">{title}</h3>
        <div className="flex gap-4">
          {metrics.map(metric => (
            <div key={metric} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: metricColors[metric] }}
              />
              <span className="text-sm text-slate-600">{metricNames[metric]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Área do gráfico - placeholder para biblioteca de gráficos */}
      <div 
        className="relative bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center"
        style={{ height: `${height}px` }}
      >
        <div className="text-center">
          <div className="text-slate-400 mb-2">📊 Gráfico Interativo</div>
          <div className="text-sm text-slate-500">
            {metrics.length} métricas | {data.length} pontos de dados
          </div>
          {showAnomalies && (
            <div className="mt-2 text-xs text-orange-600">
              ⚡ {data.filter(d => d.anomaly).length} anomalias detectadas
            </div>
          )}
        </div>

        {/* Legenda simulada do eixo Y */}
        <div className="absolute left-4 top-4 bottom-4 flex flex-col justify-between text-xs text-slate-400">
          <span>1.0</span>
          <span>0.5</span>
          <span>0.0</span>
        </div>

        {/* Linhas do gráfico simuladas */}
        <div className="absolute inset-0 flex items-end justify-center">
          <div className="w-full h-4/5 flex items-end px-8">
            {metrics.map((metric) => (
              <div
                key={metric}
                className="flex-1 mx-1 relative"
                style={{ 
                  height: '70%',
                  background: `linear-gradient(to top, ${metricColors[metric]}22, transparent)`,
                  borderTop: `2px solid ${metricColors[metric]}`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Eixo X simulado */}
      <div className="flex justify-between mt-4 px-4 text-xs text-slate-400">
        <span>{chartData[0]?.formattedDate}</span>
        <span>{chartData[Math.floor(chartData.length / 2)]?.formattedDate}</span>
        <span>{chartData[chartData.length - 1]?.formattedDate}</span>
      </div>
    </div>
  );
};

export default LineChart;