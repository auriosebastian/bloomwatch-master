// Local: src/components/analysis/tabs/RiskTab/RiskHotspots.tsx
import React from 'react';
import { RiskHotspot } from '../../types';
import { MapPin, TrendingUp, TrendingDown, Minus, Maximize2 } from 'lucide-react';

interface RiskHotspotsProps {
  hotspots: RiskHotspot[];
}

const RiskHotspots = ({ hotspots }: RiskHotspotsProps) => {
  const riskColors: Record<string, string> = {
    fire: 'bg-red-500',
    drought: 'bg-orange-500',
    degradation: 'bg-amber-500'
  };

  const riskLabels: Record<string, string> = {
    fire: 'Incêndio',
    drought: 'Seca',
    degradation: 'Degradação'
  };

  const trendIcons = {
    expanding: <TrendingUp className="w-4 h-4 text-red-500" />,
    contracting: <TrendingDown className="w-4 h-4 text-emerald-500" />,
    stable: <Minus className="w-4 h-4 text-slate-400" />
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity <= 25) return 'text-emerald-600';
    if (intensity <= 50) return 'text-yellow-600';
    if (intensity <= 75) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-slate-800">Hotspots de Risco</h3>
        <button className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm text-slate-700 transition-colors">
          <Maximize2 className="w-4 h-4" />
          Ver Mapa Completo
        </button>
      </div>

      {hotspots.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          <div className="text-2xl mb-2">✅</div>
          <div>Nenhum hotspot de risco detectado</div>
          <div className="text-sm mt-1">Todas as áreas estão estáveis</div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Mapa Simulado */}
          <div className="bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 h-48 flex items-center justify-center relative">
            <div className="text-center text-slate-500">
              <MapPin className="w-8 h-8 mx-auto mb-2" />
              <div>Mapa de Hotspots Interativo</div>
            </div>
            
            {/* Pontos de hotspot simulados */}
            {hotspots.map((hotspot, index) => (
              <div
                key={hotspot.id}
                className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg ${riskColors[hotspot.riskType]}`}
                style={{
                  left: `${20 + (index * 15)}%`,
                  top: `${30 + (index * 10)}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            ))}
          </div>

          {/* Lista de Hotspots */}
          <div className="space-y-3">
            {hotspots.map((hotspot) => (
              <div key={hotspot.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${riskColors[hotspot.riskType]}`} />
                  
                  <div>
                    <div className="font-medium text-slate-800">
                      {riskLabels[hotspot.riskType]} - {hotspot.area} km²
                    </div>
                    <div className="text-sm text-slate-500">
                      {hotspot.coordinates.lat.toFixed(4)}, {hotspot.coordinates.lng.toFixed(4)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className={`font-bold text-lg ${getIntensityColor(hotspot.intensity)}`}>
                      {hotspot.intensity}%
                    </div>
                    <div className="text-xs text-slate-500">Intensidade</div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {trendIcons[hotspot.trend]}
                    <div className="text-xs text-slate-500">
                      {hotspot.trend === 'expanding' && 'Expandindo'}
                      {hotspot.trend === 'contracting' && 'Recuando'}
                      {hotspot.trend === 'stable' && 'Estável'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 text-xs text-slate-500">
        {hotspots.length} hotspot(s) monitorado(s) • Última detecção: {hotspots[0]?.lastDetection ? new Date(hotspots[0].lastDetection).toLocaleDateString('pt-BR') : 'N/A'}
      </div>
    </div>
  );
};

export default RiskHotspots;