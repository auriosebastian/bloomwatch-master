// src/app/climate/page.tsx - VERSÃO FINAL REFATORADA
"use client";

import React, { useState, useMemo } from 'react';
import { subDays } from 'date-fns';
import { useData } from '@/context/DataContext';

// Importando os novos subcomponentes
import { ClimateHeader } from '@/components/climate/ClimateHeader';
import { FilterPanel } from '@/components/climate/FilterPanel';
import { StatsCards } from '@/components/climate/StatsCards';
import { ClimateChart } from '@/components/climate/ClimateChart';
import { DataTable } from '@/components/climate/DataTable';

import { Thermometer, Droplets, CloudRain, Leaf } from 'lucide-react';

// Tipos e Configs específicos da UI desta página
type DataType = 'temperature' | 'soil_moisture' | 'precipitation' | 'ndvi';
type RiskLevel = 'baixo' | 'medio' | 'alto' | 'critico';

const dataConfigs = {
  temperature: { label: 'Temperatura', unit: '°C', color: '#EF4444', icon: Thermometer },
  soil_moisture: { label: 'Umidade do Solo', unit: '%', color: '#3B82F6', icon: Droplets },
  precipitation: { label: 'Precipitação', unit: 'mm', color: '#22C55E', icon: CloudRain },
  ndvi: { label: 'NDVI', unit: '', color: '#84CC16', icon: Leaf },
};
const riskConfig: Record<RiskLevel, { label: string, color: string }> = {
    baixo: { label: 'Baixo', color: 'bg-green-100 text-green-800' },
    medio: { label: 'Médio', color: 'bg-yellow-100 text-yellow-800' },
    alto: { label: 'Alto', color: 'bg-orange-100 text-orange-800' },
    critico: { label: 'Crítico', color: 'bg-red-100 text-red-800' },
};

export default function ClimateDataPage() {
  const { climateData, loading } = useData();

  const [filters, setFilters] = useState({
    region: 'Cunene, Angola' as const,
    dataType: 'temperature' as DataType,
    period: '30days'
  });

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredData = useMemo(() => {
    if (loading || !climateData) return [];
    let data = climateData.filter(d => d.region === filters.region);
    const days = filters.period === '7days' ? 7 : 30;
    const cutoffDate = subDays(new Date(), days);
    return data.filter(d => new Date(d.date) >= cutoffDate);
  }, [filters, climateData, loading]);

  const stats = useMemo(() => {
    if (filteredData.length === 0) return { avg: '0', max: '0', min: '0' };
    const values = filteredData.map(d => d[filters.dataType]);
    const sum = values.reduce((a, b) => a + b, 0);
    return {
      avg: (sum / values.length).toFixed(filters.dataType === 'ndvi' ? 3 : 1),
      max: Math.max(...values).toFixed(filters.dataType === 'ndvi' ? 3 : 1),
      min: Math.min(...values).toFixed(filters.dataType === 'ndvi' ? 3 : 1),
    };
  }, [filteredData, filters.dataType]);
  
  const selectedConfig = dataConfigs[filters.dataType];

  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
    );
  }

  return (
    <div className="flex flex-col">
      <ClimateHeader />
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-6">
        <div className="grid lg:grid-cols-4 gap-6 h-full">
          <aside className="lg:col-span-1">
            <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
          </aside>
          <section className="lg:col-span-3 space-y-6">
            <StatsCards stats={stats} unit={selectedConfig.unit} />
            <ClimateChart 
              data={filteredData}
              config={selectedConfig}
              dataType={filters.dataType}
              region={filters.region}
            />
            <DataTable data={filteredData} riskConfig={riskConfig} />
          </section>
        </div>
      </main>
    </div>
  );
}