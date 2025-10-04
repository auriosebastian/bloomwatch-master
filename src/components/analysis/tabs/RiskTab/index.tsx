// Local: src/components/analysis/tabs/RiskTab/index.tsx
"use client";

import React from 'react';
import { AnalysisData, RiskIndex, RiskHotspot, RiskPrediction, RiskRecommendation } from '../../types';
import RiskMeter from './RiskMeter';
import RiskHotspots from './RiskHotspots';
import RiskPredictions from './RiskPredictions';
import RiskRecommendations from './RiskRecommendations';

interface RiskTabProps {
  analysisData: AnalysisData;
}

export default function RiskTab({ analysisData }: RiskTabProps) {
  // Dados padrão para demonstração - COM TIPOS ESPECÍFICOS
  const defaultRiskData = {
    currentRisks: [
      {
        type: 'fire' as const,
        value: 78,
        level: 'high' as const,
        trend: 'increasing' as const,
        factors: ['Temperatura elevada', 'Baixa umidade', 'Vegetação seca', 'Ventos fortes'],
        probability: 0.78
      },
      {
        type: 'drought' as const,
        value: 65,
        level: 'moderate' as const,
        trend: 'stable' as const,
        factors: ['Precipitação abaixo da média', 'Umidade do solo baixa', 'Temperaturas altas'],
        probability: 0.65
      },
      {
        type: 'degradation' as const,
        value: 42,
        level: 'moderate' as const,
        trend: 'increasing' as const,
        factors: ['Desmatamento recente', 'Solo exposto', 'Erosão'],
        probability: 0.42
      },
      {
        type: 'flood' as const,
        value: 15,
        level: 'low' as const,
        trend: 'decreasing' as const,
        factors: ['Baixa precipitação', 'Topografia favorável'],
        probability: 0.15
      }
    ] as RiskIndex[],
    hotspots: [
      {
        id: 'hs1',
        coordinates: { lat: -10.735, lng: 14.915 },
        riskType: 'fire' as const,
        intensity: 85,
        area: 12.5,
        trend: 'expanding' as const,
        lastDetection: '2024-06-01T10:30:00Z'
      },
      {
        id: 'hs2',
        coordinates: { lat: -10.725, lng: 14.905 },
        riskType: 'drought' as const,
        intensity: 70,
        area: 25.3,
        trend: 'stable' as const,
        lastDetection: '2024-06-01T09:15:00Z'
      },
      {
        id: 'hs3',
        coordinates: { lat: -10.745, lng: 14.925 },
        riskType: 'degradation' as const,
        intensity: 55,
        area: 8.7,
        trend: 'expanding' as const,
        lastDetection: '2024-05-31T14:20:00Z'
      }
    ] as RiskHotspot[],
    predictions: [
      {
        period: '7d',
        riskType: 'fire' as const,
        probability: 0.82,
        confidence: 85,
        expectedImpact: 'high' as const,
        factors: [
          { name: 'Temperatura', contribution: 0.35, trend: 'worsening' as const },
          { name: 'Umidade', contribution: 0.25, trend: 'worsening' as const },
          { name: 'Ventos', contribution: 0.20, trend: 'stable' as const },
          { name: 'Combustível', contribution: 0.20, trend: 'worsening' as const }
        ]
      },
      {
        period: '15d',
        riskType: 'drought' as const,
        probability: 0.71,
        confidence: 78,
        expectedImpact: 'moderate' as const,
        factors: [
          { name: 'Precipitação', contribution: 0.40, trend: 'worsening' as const },
          { name: 'Umidade Solo', contribution: 0.35, trend: 'worsening' as const },
          { name: 'Temperatura', contribution: 0.25, trend: 'stable' as const }
        ]
      },
      {
        period: '30d',
        riskType: 'degradation' as const,
        probability: 0.58,
        confidence: 72,
        expectedImpact: 'moderate' as const,
        factors: [
          { name: 'Atividade Humana', contribution: 0.45, trend: 'worsening' as const },
          { name: 'Cobertura Vegetal', contribution: 0.35, trend: 'worsening' as const },
          { name: 'Erosão', contribution: 0.20, trend: 'stable' as const }
        ]
      }
    ] as RiskPrediction[],
    recommendations: [
      {
        type: 'prevention' as const,
        priority: 'high' as const,
        title: 'Reforçar Monitoramento de Incêndios',
        description: 'Aumentar a frequência de sobrevoos e ativar câmeras de monitoramento nas áreas de alto risco.',
        actions: [
          'Programar sobrevoos diários',
          'Ativar câmeras térmicas 24/7',
          'Coordenar com brigadas locais',
          'Estabelecer pontos de água estratégicos'
        ],
        timeframe: 'immediate' as const,
        cost: 'medium' as const
      },
      {
        type: 'mitigation' as const,
        priority: 'medium' as const,
        title: 'Programa de Conservação de Água',
        description: 'Implementar medidas para otimizar o uso de água e preparar para possível escassez.',
        actions: [
          'Instalar sistemas de irrigação eficientes',
          'Promover culturas resistentes à seca',
          'Educar comunidades sobre conservação',
          'Monitorar níveis de aquíferos'
        ],
        timeframe: 'short_term' as const,
        cost: 'low' as const
      },
      {
        type: 'alert' as const,
        priority: 'critical' as const,
        title: 'Alerta para Agricultores Locais',
        description: 'Notificar produtores rurais sobre condições críticas e fornecer orientações.',
        actions: [
          'Emitir alerta via SMS/WhatsApp',
          'Realizar reuniões com comunidades',
          'Distribuir material informativo',
          'Estabelecer canal de emergência'
        ],
        timeframe: 'immediate' as const,
        cost: 'low' as const
      }
    ] as RiskRecommendation[],
    historicalTrend: [
      { period: 'Jan', fire: 45, drought: 35, degradation: 28 },
      { period: 'Fev', fire: 52, drought: 38, degradation: 31 },
      { period: 'Mar', fire: 48, drought: 42, degradation: 35 },
      { period: 'Abr', fire: 65, drought: 55, degradation: 38 },
      { period: 'Mai', fire: 72, drought: 62, degradation: 42 },
      { period: 'Jun', fire: 78, drought: 65, degradation: 45 }
    ]
  };

  const riskData = analysisData.risk || defaultRiskData;

  return (
    <div className="space-y-6">
      {/* Medidores de Risco */}
      <RiskMeter risks={riskData.currentRisks} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hotspots de Risco */}
        <div className="lg:col-span-1">
          <RiskHotspots hotspots={riskData.hotspots} />
        </div>

        {/* Previsões de Risco */}
        <div className="lg:col-span-1">
          <RiskPredictions predictions={riskData.predictions} />
        </div>
      </div>

      {/* Recomendações de Ação */}
      <RiskRecommendations recommendations={riskData.recommendations} />

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm text-center">
          <div className="text-2xl font-bold text-red-600">
            {riskData.currentRisks.filter(r => r.level === 'high' || r.level === 'very_high' || r.level === 'extreme').length}
          </div>
          <div className="text-xs text-slate-500">Riscos Críticos</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm text-center">
          <div className="text-2xl font-bold text-orange-600">
            {riskData.hotspots.length}
          </div>
          <div className="text-xs text-slate-500">Hotspots Ativos</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm text-center">
          <div className="text-2xl font-bold text-blue-600">
            {riskData.predictions.filter(p => p.probability > 0.7).length}
          </div>
          <div className="text-xs text-slate-500">Previsões 70%</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm text-center">
          <div className="text-2xl font-bold text-emerald-600">
            {riskData.recommendations.filter(r => r.priority === 'critical' || r.priority === 'high').length}
          </div>
          <div className="text-xs text-slate-500">Ações Prioritárias</div>
        </div>
      </div>
    </div>
  );
}