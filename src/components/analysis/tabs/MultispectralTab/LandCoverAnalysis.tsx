// Local: src/components/analysis/tabs/MultispectralTab/LandCoverAnalysis.tsx
import React from 'react';
import { LandCoverClass } from '../../types';
import { PieChart, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface LandCoverAnalysisProps {
  landCover: LandCoverClass[];
}

const LandCoverAnalysis = ({ landCover }: LandCoverAnalysisProps) => {
  const totalArea = landCover.reduce((sum, item) => sum + item.area, 0);

  const trendIcons = {
    increasing: <TrendingUp className="w-4 h-4 text-red-500" />,
    decreasing: <TrendingDown className="w-4 h-4 text-emerald-500" />,
    stable: <Minus className="w-4 h-4 text-slate-400" />
  };

  // Função para calcular as fatias do gráfico de pizza
  const renderPieSlices = () => {
    let currentAngle = 0;
    const slices = [];

    for (const item of landCover) {
      const angle = (item.percentage / 100) * 360;
      const rotation = currentAngle;
      
      slices.push(
        <div
          key={item.id}
          className="absolute inset-0 rounded-full"
          style={{
            backgroundColor: item.color,
            clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((rotation * Math.PI) / 180)}% ${50 + 50 * Math.sin((rotation * Math.PI) / 180)}%, ${50 + 50 * Math.cos(((rotation + angle) * Math.PI) / 180)}% ${50 + 50 * Math.sin(((rotation + angle) * Math.PI) / 180)}%)`,
            transform: 'rotate(0deg)' // A rotação é aplicada via clipPath
          }}
        />
      );
      
      currentAngle += angle;
    }

    return slices;
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-slate-800">Análise de Cobertura do Solo</h3>
        <div className="text-sm text-slate-600">
          Área Total: {totalArea} km²
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Pizza Simulado */}
        <div className="flex items-center justify-center">
          <div className="relative w-48 h-48">
            {/* Fundo do gráfico */}
            <div className="absolute inset-0 rounded-full border-8 border-slate-200" />
            
            {/* Fatias do gráfico */}
            {renderPieSlices()}

            {/* Centro do gráfico */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <PieChart className="w-8 h-8 text-slate-400 mx-auto mb-1" />
                <div className="text-xs text-slate-500">Cobertura</div>
              </div>
            </div>
          </div>
        </div>

        {/* Legenda e Detalhes */}
        <div className="space-y-3">
          {landCover.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: item.color }}
                />
                <div>
                  <div className="font-medium text-slate-800">{item.name}</div>
                  <div className="text-sm text-slate-600">
                    {item.area} km² ({item.percentage}%)
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {trendIcons[item.trend]}
                <div className="text-xs text-slate-500 w-16 text-right">
                  {item.trend === 'increasing' && 'Aumentando'}
                  {item.trend === 'decreasing' && 'Diminuindo'}
                  {item.trend === 'stable' && 'Estável'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resumo */}
      <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="font-medium text-slate-800">
              {landCover.filter(item => item.trend === 'increasing').length}
            </div>
            <div className="text-slate-600">Classes em Expansão</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-slate-800">
              {landCover.filter(item => item.trend === 'decreasing').length}
            </div>
            <div className="text-slate-600">Classes em Redução</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-slate-800">
              {landCover.find(item => item.name === 'Floresta Densa')?.percentage}%
            </div>
            <div className="text-slate-600">Cobertura Florestal</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-slate-800">
              {landCover.find(item => item.name === 'Área Urbana')?.percentage}%
            </div>
            <div className="text-slate-600">Área Urbana</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandCoverAnalysis;