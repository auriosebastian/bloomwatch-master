// Local: src/components/analysis/tabs/TimeseriesTab/index.tsx
"use client";

import React, { useState } from 'react';
import { AnalysisData } from '../../types';
import LineChart from './LineChart';
import PeriodSelector from './PeriodSelector';
import MetricSelector from './MetricSelector';
import ZoneComparison from './ZoneComparison';
import AnomalyDetection from './AnomalyDetection';

interface TimeseriesTabProps {
  analysisData: AnalysisData;
}

export default function TimeseriesTab({ analysisData }: TimeseriesTabProps) {
  // Dados padrão para demonstração
  const defaultTimeSeriesData: AnalysisData['timeSeries'] = {
    currentZone: [
      { date: '2024-01-01', ndvi: 0.65, ndwi: 0.42, temperature: 28.5 },
      { date: '2024-01-15', ndvi: 0.68, ndwi: 0.45, temperature: 29.1 },
      { date: '2024-02-01', ndvi: 0.72, ndwi: 0.41, temperature: 30.2 },
      { date: '2024-02-15', ndvi: 0.75, ndwi: 0.38, temperature: 31.5 },
      { date: '2024-03-01', ndvi: 0.71, ndwi: 0.35, temperature: 32.1 },
      { date: '2024-03-15', ndvi: 0.68, ndwi: 0.32, temperature: 31.8 },
      { date: '2024-04-01', ndvi: 0.72, ndwi: 0.45, temperature: 29.5, anomaly: true },
    ],
    comparisonZones: [
      { 
        id: 'benguela', 
        name: 'Benguela', 
        data: [
          { date: '2024-01-01', ndvi: 0.60, ndwi: 0.38, temperature: 27.8 },
          { date: '2024-02-01', ndvi: 0.65, ndwi: 0.35, temperature: 28.9 },
          { date: '2024-03-01', ndvi: 0.68, ndwi: 0.32, temperature: 30.1 },
          { date: '2024-04-01', ndvi: 0.70, ndwi: 0.40, temperature: 28.7 },
        ]
      },
      { 
        id: 'huambo', 
        name: 'Huambo', 
        data: [
          { date: '2024-01-01', ndvi: 0.70, ndwi: 0.45, temperature: 26.5 },
          { date: '2024-02-01', ndvi: 0.73, ndwi: 0.42, temperature: 27.8 },
          { date: '2024-03-01', ndvi: 0.75, ndwi: 0.38, temperature: 29.2 },
          { date: '2024-04-01', ndvi: 0.72, ndwi: 0.44, temperature: 27.9 },
        ]
      }
    ],
    periodOptions: [
      { value: '7d', label: '7 Dias', days: 7 },
      { value: '30d', label: '30 Dias', days: 30 },
      { value: '90d', label: '3 Meses', days: 90 },
      { value: '1y', label: '1 Ano', days: 365 },
      { value: '5y', label: '5 Anos', days: 1825 },
    ],
    selectedPeriod: '30d',
    selectedMetrics: ['ndvi', 'ndwi', 'temperature']
  };

  const timeSeriesData = analysisData.timeSeries || defaultTimeSeriesData;

  // Estados
  const [selectedPeriod, setSelectedPeriod] = useState(timeSeriesData.selectedPeriod);
  const [selectedMetrics, setSelectedMetrics] = useState(timeSeriesData.selectedMetrics);
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [showAnomalies, setShowAnomalies] = useState(true);

  const toggleZone = (zoneId: string) => {
    setSelectedZones(prev => 
      prev.includes(zoneId) 
        ? prev.filter(id => id !== zoneId)
        : [...prev, zoneId]
    );
  };

  const handleAnomaliesDetected = (anomalies: any[]) => {
    console.log('Anomalias detectadas:', anomalies);
    // Aqui integraríamos com o backend/IA real
  };

  return (
    <div className="space-y-6">
      {/* Controles Superiores */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <PeriodSelector
          periods={timeSeriesData.periodOptions}
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
        />
        
        <MetricSelector
          availableMetrics={['ndvi', 'ndwi', 'temperature', 'precipitation']}
          selectedMetrics={selectedMetrics}
          onMetricsChange={setSelectedMetrics}
        />
        
        <AnomalyDetection
          data={timeSeriesData.currentZone}
          onAnomaliesDetected={handleAnomaliesDetected}
        />
      </div>

      {/* Gráfico Principal */}
      <LineChart
        data={timeSeriesData.currentZone}
        metrics={selectedMetrics}
        title={`Séries Temporais - ${analysisData.monitoredZone.name}`}
        height={400}
        showAnomalies={showAnomalies}
      />

      {/* Comparação de Zonas */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <ZoneComparison
            currentZone={analysisData.monitoredZone.name}
            comparisonZones={timeSeriesData.comparisonZones}
            selectedZones={selectedZones}
            onZoneToggle={toggleZone}
          />
        </div>
        
        <div className="lg:col-span-3">
          {selectedZones.length > 0 ? (
            <LineChart
              data={timeSeriesData.currentZone}
              metrics={selectedMetrics}
              title="Comparação entre Zonas"
              height={300}
            />
          ) : (
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 text-center">
              <div className="text-slate-400 text-lg mb-2">📊 Comparação de Zonas</div>
              <p className="text-slate-500 text-sm">
                Selecione zonas para comparar no painel lateral
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm text-center">
          <div className="text-2xl font-bold text-emerald-600">
            {timeSeriesData.currentZone.length}
          </div>
          <div className="text-xs text-slate-500">Pontos de Dados</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm text-center">
          <div className="text-2xl font-bold text-blue-600">
            {selectedMetrics.length}
          </div>
          <div className="text-xs text-slate-500">Métricas Ativas</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm text-center">
          <div className="text-2xl font-bold text-orange-600">
            {timeSeriesData.currentZone.filter(d => d.anomaly).length}
          </div>
          <div className="text-xs text-slate-500">Anomalias</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm text-center">
          <div className="text-2xl font-bold text-purple-600">
            {selectedZones.length}
          </div>
          <div className="text-xs text-slate-500">Zonas Comparadas</div>
        </div>
      </div>
    </div>
  );
}