// Local: src/app/analysis/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Cloud, AlertTriangle, Satellite, Sliders, Server, MapPin } from "lucide-react";
import AnalysisSidebar from "@/components/analysis/AnalysisSidebar";
import AnalysisContent from "@/components/analysis/AnalysisContent";
import { AnalysisTab, AnalysisData, TabDefinition } from "@/components/analysis/types";

interface StoredAnalysis {
  coordinates: { lat: number; lng: number };
  radius: number;
  period: { start: string; end: string };
  locationName?: string;
}

export default function AnalysisPage() {
  const [activeTab, setActiveTab] = useState<AnalysisTab>("overview");
  const [currentAnalysis, setCurrentAnalysis] = useState<StoredAnalysis | null>(null);
  
  const tabs: TabDefinition[] = [         
    { id: "overview", label: "Visão Geral", icon: BarChart3 },
    { id: "timeseries", label: "Séries Temporais", icon: TrendingUp },
    { id: "climate", label: "Condições Climáticas", icon: Cloud },
    { id: "risk", label: "Risco Ambiental", icon: AlertTriangle },
    { id: "multispectral", label: "Análise Multiespectral", icon: Satellite },
  ];

  // Carregar análise do localStorage quando a página carregar
  useEffect(() => {
    const storedAnalysis = localStorage.getItem('currentAnalysis');
    if (storedAnalysis) {
      setCurrentAnalysis(JSON.parse(storedAnalysis));
      console.log('Análise carregada:', JSON.parse(storedAnalysis));
    }
  }, []);

  // Dados de exemplo ATUALIZADOS para usar a análise atual
  const analysisData: AnalysisData = {
    monitoredZone: {
      name: currentAnalysis?.locationName || "Zona Selecionada",
      area_km2: Math.PI * Math.pow((currentAnalysis?.radius || 50), 2), // Área do círculo
      biome: "Savana Arborizada", // Isso poderia vir do backend
      coordinates: currentAnalysis?.coordinates || { lat: -10.73, lng: 14.91 },
      lastUpdate: "Há alguns segundos",
      status: "active",
    },
    period: {
      start: currentAnalysis?.period.start || "2024-01-01",
      end: currentAnalysis?.period.end || "2024-06-01",
    },
    availableSensors: [
      { id: 'landsat', name: 'Landsat' },
      { id: 'modis', name: 'MODIS' },
    ],
    metrics: {
      vegetationHealth: { 
        value: 0.72, 
        trend: 'improving' as const, 
        change: '+5%',
        level: 'moderate' as const
      },
      waterStress: { 
        value: 0.45, 
        level: 'high' as const,
        change: '-12%'
      },
      fireRisk: { 
        value: 'Alto', 
        level: 'high' as const,
        probability: 0.87
      },
      temperatureAnomaly: { 
        value: 1.2, 
        unit: '°C',
        trend: 'worsening' as const
      },
      environmentalScore: {
        value: 68,
        level: 'moderate' as const
      }
    },
    alerts: [
      {
        id: '1',
        type: 'drought' as const,
        level: 'high' as const,
        message: 'NDWI abaixo de 0.5 - Alerta de Seca Moderada',
        timestamp: new Date().toISOString()
      }
    ]
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Header com informações da zona */}
      <div className="bg-white border-b border-slate-200 py-3 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <div>
              <h1 className="font-bold text-slate-800 text-lg">
                {analysisData.monitoredZone.name}
              </h1>
              <p className="text-sm text-slate-500">
                {analysisData.monitoredZone.coordinates.lat.toFixed(4)}, {analysisData.monitoredZone.coordinates.lng.toFixed(4)} • 
                Raio: {currentAnalysis?.radius || 50}km • 
                {analysisData.period.start} a {analysisData.period.end}
              </p>
            </div>
          </div>
          <div className="text-sm text-slate-500">
            Dados atualizados em tempo real
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-center flex-1">
          <div className="w-[93%] max-w-7xl/4 flex flex-col justify-between">
            <div className="flex flex-1 items-stretch gap-4 mt-4 mb-4 h-[calc(100vh-8rem)]">
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
          </div>
        </div>
      </div>
    </div>
  );
}