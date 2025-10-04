// Local: src/app/analysis/page.tsx
"use client";

import React, { useState } from "react";
import { BarChart3, TrendingUp, Cloud, AlertTriangle, Satellite, Sliders, Server } from "lucide-react";
import AnalysisSidebar from "@/components/analysis/AnalysisSidebar";
import AnalysisContent from "@/components/analysis/AnalysisContent";
import { AnalysisTab, AnalysisData, TabDefinition } from "@/components/analysis/types";

export default function AnalysisPage() {
  const [activeTab, setActiveTab] = useState<AnalysisTab>("overview");
  
  const tabs: TabDefinition[] = [         
    { id: "overview", label: "Visão Geral", icon: BarChart3 },
    { id: "timeseries", label: "Séries Temporais", icon: TrendingUp },
    { id: "climate", label: "Condições Climáticas", icon: Cloud },
    { id: "risk", label: "Risco Ambiental", icon: AlertTriangle },
    { id: "multispectral", label: "Análise Multiespectral", icon: Satellite },
    { id: "custom", label: "Análises Personalizadas", icon: Sliders },
    { id: "infrastructure", label: "Infraestrutura", icon: Server },
  ];

  // CORRIGIDO: trend usa apenas os tipos permitidos
  const analysisData: AnalysisData = {
    monitoredZone: {
      name: "Reserva do Calulu",
      area_km2: 1200,
      biome: "Savana Arborizada",
      coordinates: { lat: -10.73, lng: 14.91 },
      lastUpdate: "Há 45 minutos",
      status: "critical",
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
      vegetationHealth: { 
        value: 0.72, 
        trend: 'improving', 
        change: '+5%',
        level: 'moderate'
      },
      waterStress: { 
        value: 0.45, 
        level: 'high',
        change: '-12%'
      },
      fireRisk: { 
        value: 'Alto', 
        level: 'high',
        probability: 0.87
      },
      temperatureAnomaly: { 
        value: 1.2, 
        unit: '°C',
        trend: 'worsening' // CORRIGIDO: de "rising" para "worsening"
      },
      environmentalScore: {
        value: 68,
        level: 'moderate'
      }
    },
    alerts: [
      {
        id: '1',
        type: 'drought',
        level: 'high',
        message: 'NDWI abaixo de 0.5 - Alerta de Seca Moderada',
        timestamp: '2024-06-01T10:30:00Z'
      },
      {
        id: '2',
        type: 'temperature',
        level: 'moderate',
        message: 'Temperatura +1.2°C acima da média histórica',
        timestamp: '2024-06-01T09:15:00Z'
      },
      {
        id: '3',
        type: 'fire',
        level: 'high',
        message: 'Risco de Incêndio > 80% - Condições críticas',
        timestamp: '2024-06-01T08:45:00Z'
      }
    ]
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="h-4" />
      <div className="flex justify-center flex-1">
        <div className="w-[93%] max-w-7xl/4 flex flex-col justify-between">
          <div className="flex flex-1 items-stretch gap-4 mt-16 mb-4 h-[calc(100vh-8rem)]">
            <AnalysisSidebar 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabs={tabs}
              analysisData={analysisData}
            />
            <AnalysisContent
              activeTab={activeTab}
              tabs={tabs}
              analysisData={analysisData}
            />
          </div>
          <div className="h-4" />
        </div>
      </div>
    </div>
  );
}