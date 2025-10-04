// Local: src/components/analysis/AnalysisContent.tsx
"use client";

// AQUI ESTÁ A CORREÇÃO: A importação do React e useState está correta agora.
import React, { useState } from 'react'; 
import { AnalysisTab, AnalysisData, TabDefinition } from './types';
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Satellite, Maximize, AreaChart } from 'lucide-react';

// Componente para um item de metadados (Key-Value)
const MetadataItem = ({ label, value }: { label: string, value: React.ReactNode }) => (
  <div className="flex justify-between items-center text-sm py-2 border-b border-slate-200 last:border-b-0">
    <dt className="text-slate-500">{label}</dt>
    <dd className="font-medium text-slate-800 text-right">{value}</dd>
  </div>
);

interface AnalysisContentProps {
  activeTab: AnalysisTab;
  tabs: TabDefinition[];
  analysisData: AnalysisData;
}

export default function AnalysisContent({ activeTab, tabs, analysisData }: AnalysisContentProps) {
  const activeTabData = tabs.find((tab) => tab.id === activeTab);
  const [activeSensors, setActiveSensors] = useState(['landsat', 'modis']);

  const toggleSensor = (sensorId: string) => {
    setActiveSensors(prev => 
      prev.includes(sensorId) 
        ? prev.filter(id => id !== sensorId) 
        : [...prev, sensorId]
    );
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm flex-1 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="font-bold text-slate-800 text-lg">{activeTabData?.label}</h3>
            <p className="text-sm text-slate-500">
              {activeTab === "overview" && "Resumo dos indicadores principais para a zona selecionada"}
              {activeTab === "timeseries" && "Evolução dos dados ao longo do tempo"}
              {activeTab === "rawdata" && "Acesso e download dos dados brutos"}
            </p>
          </div>
        </div>
      </div>

      {/* Conteúdo Dinâmico */}
      <div className="flex-1 overflow-y-auto p-6">
        
        {/* === ABA VISÃO GERAL === */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Seção Principal: Metadados e Mapa */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-200">
                <dl>
                  <MetadataItem label="Zona Monitorada" value={analysisData.monitoredZone.name} />
                  <MetadataItem label="Coordenadas" value={<span className="font-mono">{analysisData.monitoredZone.coordinates.lat}, {analysisData.monitoredZone.coordinates.lng}</span>} />
                  <MetadataItem label="Bioma" value={analysisData.monitoredZone.biome} />
                  <MetadataItem label="Área" value={`${analysisData.monitoredZone.area_km2} km²`} />
                  <MetadataItem label="Período de Análise" value={`${analysisData.period.start} a ${analysisData.period.end}`} />
                  <MetadataItem label="Última Atualização" value={analysisData.monitoredZone.lastUpdate} />
                </dl>
              </div>
              <div className="relative bg-slate-200 rounded-xl border border-slate-200 flex items-center justify-center min-h-[200px]">
                <p className="text-slate-500 text-sm">Mini-Mapa da Zona Monitorada</p>
                <button className="absolute top-2 right-2 p-2 bg-white/50 rounded-lg hover:bg-white transition">
                  <Maximize className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>

            {/* Seção de Sensores Satelitais */}
            <div>
              <h4 className="font-semibold text-slate-800 flex items-center gap-2 mb-4">
                <Satellite className="w-5 h-5 text-slate-500" />
                Sensores Satelitais Ativos
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-200">
                {analysisData.availableSensors.map(sensor => (
                  <div key={sensor.id} className="flex items-center space-x-2">
                    <Checkbox id={sensor.id} checked={activeSensors.includes(sensor.id)} onCheckedChange={() => toggleSensor(sensor.id)} />
                    <Label htmlFor={sensor.id} className="font-medium text-slate-800 cursor-pointer">{sensor.name}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Seção de Métricas Principais */}
            <div>
               <h4 className="font-semibold text-slate-800 flex items-center gap-2 mb-4">
                <AreaChart className="w-5 h-5 text-slate-500" />
                Métricas Chave
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-200">
                  <div className="text-2xl font-bold text-emerald-600">{analysisData.metrics.vegetationHealth.value}</div>
                  <div className="text-xs text-slate-500">Saúde da Vegetação (NDVI)</div>
                </div>
                 <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-200">
                  <div className="text-2xl font-bold text-cyan-600">{analysisData.metrics.waterStress.value}</div>
                  <div className="text-xs text-slate-500">Stress Hídrico (NDWI)</div>
                </div>
                 <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-200">
                  <div className="text-2xl font-bold text-orange-600">{analysisData.metrics.fireRisk.value}</div>
                  <div className="text-xs text-slate-500">Risco de Incêndio</div>
                </div>
                 <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-200">
                  <div className="text-2xl font-bold text-blue-600">+{analysisData.metrics.temperatureAnomaly.value}{analysisData.metrics.temperatureAnomaly.unit}</div>
                  <div className="text-xs text-slate-500">Anomalia de Temperatura</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* === ABA SÉRIES TEMPORAIS === */}
        {activeTab === "timeseries" && (
          <div className="space-y-6">
            <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-200 h-64 flex items-center justify-center">
              <p className="text-slate-500">Componente de Gráfico de Linha (Evolução NDVI) virá aqui.</p>
            </div>
            <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-200 h-64 flex items-center justify-center">
              <p className="text-slate-500">Componente de Gráfico de Barras (Anomalia de Temperatura Mensal) virá aqui.</p>
            </div>
          </div>
        )}

        {/* === ABA DADOS BRUTOS === */}
        {activeTab === "rawdata" && (
          <div className="space-y-6">
            <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-200">
              <h4 className="font-semibold text-slate-700 text-sm mb-4">Tabela de Dados Coletados</h4>
              <div className="h-96 flex items-center justify-center">
                <p className="text-slate-500">Componente de Tabela de Dados (DataTable) virá aqui.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}