"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, MapPin, BarChart3, Calendar } from 'lucide-react';

type Filters = { region: string; dataType: string; period: string; }
interface FilterPanelProps {
  filters: Filters;
  onFilterChange: (key: keyof Filters, value: string) => void;
}

export function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  return (
    <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm sticky top-24">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100/50"><CardTitle className="flex items-center gap-3 text-lg font-bold text-gray-800"><Filter className="w-5 h-5 text-blue-600" />Filtros e Parâmetros</CardTitle></CardHeader>
      <CardContent className="p-4 space-y-4">
        <div>
         <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><MapPin size={16} className="text-gray-500"/> Região</label>
          <select value={filters.region} onChange={e => onFilterChange('region', e.target.value)} className="w-full p-2 border-2 border-gray-200 rounded-xl bg-white focus:border-blue-500 transition">
            <option>Cunene, Angola</option><option>Costa da Namíbia</option><option>Delta do Okavango</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><BarChart3 size={16} className="text-gray-500"/> Tipo de Dado</label>
          <select value={filters.dataType} onChange={e => onFilterChange('dataType', e.target.value)} className="w-full p-2 border-2 border-gray-200 rounded-xl bg-white focus:border-blue-500 transition">
            <option value="temperature">🌡️ Temperatura</option><option value="soil_moisture">💧 Umidade do Solo</option><option value="precipitation">🌧️ Precipitação</option><option value="ndvi">🌿 NDVI</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><Calendar size={16} className="text-gray-500"/> Período</label>
          <select value={filters.period} onChange={e => onFilterChange('period', e.target.value)} className="w-full p-2 border-2 border-gray-200 rounded-xl bg-white focus:border-blue-500 transition">
            <option value="7days">Últimos 7 dias</option><option value="30days">Últimos 30 dias</option>
          </select>
        </div>
      </CardContent>
    </Card>
  );
}