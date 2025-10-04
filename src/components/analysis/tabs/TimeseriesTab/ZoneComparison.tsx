// Local: src/components/analysis/tabs/TimeseriesTab/ZoneComparison.tsx
import React from 'react';
import { ComparisonZone } from '../../types';

interface ZoneComparisonProps {
  currentZone: string;
  comparisonZones: ComparisonZone[];
  selectedZones: string[];
  onZoneToggle: (zoneId: string) => void;
}

const ZoneComparison = ({ 
  currentZone, 
  comparisonZones, 
  selectedZones, 
  onZoneToggle 
}: ZoneComparisonProps) => {
  return (
    <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
      <h4 className="font-semibold text-slate-800 mb-3">Comparar com Outras Zonas</h4>
      
      {/* Zona atual (sempre selecionada) */}
      <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg mb-2">
        <span className="font-medium text-emerald-800">{currentZone}</span>
        <div className="px-2 py-1 bg-emerald-500 text-white text-xs rounded-full">
          Atual
        </div>
      </div>

      {/* Zonas para comparação */}
      <div className="space-y-2">
        {comparisonZones.map(zone => (
          <label key={zone.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedZones.includes(zone.id)}
                onChange={() => onZoneToggle(zone.id)}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <span className="text-sm text-slate-700">{zone.name}</span>
            </div>
            <div className="text-xs text-slate-500">
              {zone.data.length} pontos
            </div>
          </label>
        ))}
      </div>

      {comparisonZones.length === 0 && (
        <div className="text-center py-4 text-slate-500 text-sm">
          Nenhuma zona disponível para comparação
        </div>
      )}
    </div>
  );
};

export default ZoneComparison;