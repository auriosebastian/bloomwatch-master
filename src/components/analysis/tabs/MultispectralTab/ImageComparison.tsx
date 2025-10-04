// Local: src/components/analysis/tabs/MultispectralTab/ImageComparison.tsx
import React, { useState } from 'react';
import { ImageComparison as ImageComparisonType } from '../../types';
import { ChevronLeft, ChevronRight, AlertTriangle, MapPin } from 'lucide-react';

interface ImageComparisonProps {
  comparisons: ImageComparisonType[];
}

const ImageComparison = ({ comparisons }: ImageComparisonProps) => {
  const [currentComparison, setCurrentComparison] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);

  if (comparisons.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <div className="text-center py-8 text-slate-500">
          <div className="text-2xl mb-2">📊</div>
          <div>Nenhuma comparação disponível</div>
          <div className="text-sm mt-1">Selecione imagens para comparar mudanças</div>
        </div>
      </div>
    );
  }

  const comparison = comparisons[currentComparison];

  const changeTypes = {
    deforestation: { color: 'bg-red-100 text-red-800', icon: '🌳', label: 'Desmatamento' },
    urbanization: { color: 'bg-gray-100 text-gray-800', icon: '🏗️', label: 'Urbanização' },
    water_change: { color: 'bg-blue-100 text-blue-800', icon: '💧', label: 'Mudança Hídrica' },
    vegetation_growth: { color: 'bg-green-100 text-green-800', icon: '🌿', label: 'Crescimento Vegetal' }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      {/* Cabeçalho */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="font-semibold text-slate-800">Comparação Temporal</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentComparison(prev => Math.max(0, prev - 1))}
              disabled={currentComparison === 0}
              className="p-1 disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-slate-600">
              {currentComparison + 1} / {comparisons.length}
            </span>
            <button
              onClick={() => setCurrentComparison(prev => Math.min(comparisons.length - 1, prev + 1))}
              disabled={currentComparison === comparisons.length - 1}
              className="p-1 disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="text-sm text-slate-600">
          {new Date(comparison.before.date).toLocaleDateString('pt-BR')} → {new Date(comparison.after.date).toLocaleDateString('pt-BR')}
        </div>
      </div>

      {/* Comparador de Imagens */}
      <div className="relative bg-slate-900 h-64 overflow-hidden">
        {/* Imagem Antes */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-green-800 to-green-600"
          style={{ width: `${sliderPosition}%` }}
        />
        
        {/* Imagem Depois */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-brown-800 to-brown-600"
          style={{ left: `${sliderPosition}%`, width: `${100 - sliderPosition}%` }}
        />

        {/* Divisor */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize shadow-lg"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={(e) => {
            const startX = e.clientX;
            const startPosition = sliderPosition;

            const handleMouseMove = (moveEvent: MouseEvent) => {
              const container = moveEvent.currentTarget as HTMLElement;
              const containerRect = container.getBoundingClientRect();
              const newPosition = ((moveEvent.clientX - containerRect.left) / containerRect.width) * 100;
              setSliderPosition(Math.max(0, Math.min(100, newPosition)));
            };

            const handleMouseUp = () => {
              document.removeEventListener('mousemove', handleMouseMove);
              document.removeEventListener('mouseup', handleMouseUp);
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
          }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-lg">
            <div className="w-2 h-6 bg-slate-400 rounded-full" />
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 text-white text-sm bg-black/50 px-2 py-1 rounded">
          Antes: {new Date(comparison.before.date).toLocaleDateString('pt-BR')}
        </div>
        <div className="absolute top-4 right-4 text-white text-sm bg-black/50 px-2 py-1 rounded">
          Depois: {new Date(comparison.after.date).toLocaleDateString('pt-BR')}
        </div>
      </div>

      {/* Detalhes das Mudanças */}
      <div className="p-4">
        <h4 className="font-medium text-slate-800 mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-orange-500" />
          Mudanças Detectadas
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {comparison.changes.map((change, index) => {
            const config = changeTypes[change.type];
            return (
              <div key={index} className="border border-slate-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{config.icon}</span>
                    <span className="font-medium text-slate-800">{config.label}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
                    {change.area} km²
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{change.coordinates.length} local(is)</span>
                  </div>
                  <span>Confiança: {change.confidence}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImageComparison;