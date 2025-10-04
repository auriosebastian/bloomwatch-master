// Local: src/app/analysis/page.tsx
"use client";

import React, { useState } from "react";
import { BarChart3, TrendingUp, Database } from "lucide-react";
import AnalysisSidebar from "@/components/analysis/AnalysisSidebar";
import AnalysisContent from "@/components/analysis/AnalysisContent";
import { AnalysisTab, AnalysisData, TabDefinition } from "@/components/analysis/types";


export default function AnalysisPage() {
  const [activeTab, setActiveTab] = useState<AnalysisTab>("overview");
  const tabs: TabDefinition[] = [         
     { id: "overview" as AnalysisTab, label: "Análises", icon: BarChart3 },
     { id: "timeseries" as AnalysisTab, label: "Séries Temporais", icon: TrendingUp },
      { id: "rawdata" as AnalysisTab, label: "Dados Brutos", icon: Database },
    ];

  // ===== ATUALIZE ESTE OBJETO =====
  const analysisData: AnalysisData = {
    monitoredZone: {
      name: "Reserva do Calulu",
      area_km2: 1200,
      biome: "Savana Arborizada",
      coordinates: { lat: -10.73, lng: 14.91 },
      lastUpdate: "Há 45 minutos",
    },
    period: {
      start: "2024-05-01",
      end: "2024-06-01",
    },
    availableSensors: [
      { id: 'landsat', name: 'Landsat' },
      { id: 'modis', name: 'MODIS' },
      { id: 'smap', name: 'SMAP' },
      { id: 'grace', name: 'GRACE' },
    ],
    metrics: {
      vegetationHealth: { value: 0.72, trend: 'improving' },
      waterStress: { value: 0.45, level: 'moderate' },
      fireRisk: { value: 'Alto', level: 'high' },
      temperatureAnomaly: { value: 1.2, unit: '°C' },
    },
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Espaçamento superior */}
      <div className="h-4" />

      {/* Container central */}
      <div className="flex justify-center flex-1">
        <div className="w-[93%] max-w-7xl/4 flex flex-col justify-between">
          <div className="flex flex-1 items-stretch gap-4 mt-16 mb-4">
            
            {/* Componente da Sidebar Esquerda */}
            <AnalysisSidebar 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabs={tabs}
              analysisData={analysisData}
            />

            {/* Componente do Conteúdo Direito */}
            <AnalysisContent
              activeTab={activeTab}
              tabs={tabs}
              analysisData={analysisData}
            />
            
          </div>
          {/* Espaçamento inferior */}
          <div className="h-4" />
        </div>
      </div>
    </div>
  );
}