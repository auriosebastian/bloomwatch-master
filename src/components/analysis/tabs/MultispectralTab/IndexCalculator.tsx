// Local: src/components/analysis/tabs/MultispectralTab/IndexCalculator.tsx
import React, { useState } from 'react';
import { SpectralIndex, IndexCalculation } from '../../types';
import { Calculator, TrendingUp, BarChart3, Download } from 'lucide-react';

interface IndexCalculatorProps {
  availableIndices: SpectralIndex[];
  selectedIndices: string[];
  onIndicesChange: (indices: string[]) => void;
  calculations: IndexCalculation[];
  currentCalculation: {
    index: string;
    result: number | null;
    area: number;
  };
  onCalculate: (indexId: string) => void;
}

const IndexCalculator = ({ 
  availableIndices, 
  selectedIndices, 
  onIndicesChange, 
  calculations,
  currentCalculation,
  onCalculate 
}: IndexCalculatorProps) => {
  const [selectedIndex, setSelectedIndex] = useState<string>('');

  const handleIndexToggle = (indexId: string) => {
    if (selectedIndices.includes(indexId)) {
      onIndicesChange(selectedIndices.filter(id => id !== indexId));
    } else {
      onIndicesChange([...selectedIndices, indexId]);
    }
  };

  const getIndexColor = (value: number, index: SpectralIndex) => {
    if (value < index.range.min + (index.range.max - index.range.min) * 0.33) {
      return 'text-red-500';
    } else if (value < index.range.min + (index.range.max - index.range.min) * 0.66) {
      return 'text-yellow-500';
    } else {
      return 'text-emerald-500';
    }
  };

  const getInterpretation = (value: number, index: SpectralIndex) => {
    if (value < index.range.min + (index.range.max - index.range.min) * 0.33) {
      return index.interpretation.low;
    } else if (value < index.range.min + (index.range.max - index.range.min) * 0.66) {
      return index.interpretation.medium;
    } else {
      return index.interpretation.high;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      {/* Cabeçalho */}
      <div className="p-4 border-b border-slate-200">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-500" />
          Calculadora de Índices Espectrais
        </h3>
      </div>

      <div className="p-4 space-y-6">
        {/* Seleção de Índices */}
        <div>
          <h4 className="font-medium text-slate-700 mb-3">Índices Disponíveis</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availableIndices.map(index => (
              <div key={index.id} className="border border-slate-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-medium text-slate-800">{index.name}</div>
                    <div className="text-sm text-slate-600">{index.formula}</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedIndices.includes(index.id)}
                    onChange={() => handleIndexToggle(index.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="text-xs text-slate-500 mb-2">{index.description}</div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Faixa: {index.range.min} a {index.range.max}</span>
                  <button
                    onClick={() => {
                      setSelectedIndex(index.id);
                      onCalculate(index.id);
                    }}
                    className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs"
                  >
                    Calcular
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cálculo Atual */}
        {currentCalculation.result !== null && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-blue-800">Cálculo Atual</h4>
              <div className="flex items-center gap-2">
                <span className="text-sm text-blue-600">
                  Área: {currentCalculation.area} km²
                </span>
                <button className="p-1 hover:bg-blue-100 rounded">
                  <Download className="w-4 h-4 text-blue-600" />
                </button>
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {currentCalculation.result.toFixed(4)}
              </div>
              <div className="text-sm text-blue-700">
                {availableIndices.find(idx => idx.id === currentCalculation.index)?.name}
              </div>
              {currentCalculation.result !== null && (
                <div className="text-xs text-blue-600 mt-1">
                  {getInterpretation(
                    currentCalculation.result, 
                    availableIndices.find(idx => idx.id === currentCalculation.index)!
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Histórico de Cálculos */}
        <div>
          <h4 className="font-medium text-slate-700 mb-3 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Histórico de Cálculos
          </h4>

          {calculations.length === 0 ? (
            <div className="text-center py-4 text-slate-500 text-sm">
              Nenhum cálculo realizado ainda
            </div>
          ) : (
            <div className="space-y-2">
              {calculations.slice(0, 5).map((calc, index) => {
                const indexInfo = availableIndices.find(idx => idx.id === calc.index);
                if (!indexInfo) return null;

                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div>
                      <div className="font-medium text-slate-800">{indexInfo.name}</div>
                      <div className="text-sm text-slate-600">
                        {new Date(calc.date).toLocaleDateString('pt-BR')} • {calc.area} km²
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getIndexColor(calc.value, indexInfo)}`}>
                        {calc.value.toFixed(4)}
                      </div>
                      <div className="text-xs text-slate-500">
                        Conf: {calc.confidence}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndexCalculator;