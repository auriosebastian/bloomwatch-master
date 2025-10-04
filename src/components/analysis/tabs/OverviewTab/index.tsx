// Local: src/components/analysis/tabs/OverviewTab/index.tsx
// ADICIONAR este componente no mesmo arquivo (remover a importação que não existe)
import React from 'react';
import { AnalysisData } from '../../types';
import MetricCard from './MetricCard';
import AlertCard from './AlertCard';
import EnvironmentalScore from './EnvironmentalScore';
import { AreaChart, AlertTriangle, MapPin, Maximize } from 'lucide-react';

interface OverviewTabProps {
  analysisData: AnalysisData;
}

// Componente StatusIndicator movido para dentro do arquivo
const StatusIndicator = ({ status }: { status: string }) => {
  const statusConfig = {
    active: { color: 'bg-emerald-500', text: 'Monitoramento Ativo' },
    warning: { color: 'bg-amber-500', text: 'Atenção' },
    critical: { color: 'bg-red-500', text: 'Crítico' }
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;

  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${config.color} animate-pulse`} />
      <span className="text-sm font-medium text-slate-700">{config.text}</span>
    </div>
  );
};

export default function OverviewTab({ analysisData }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      {/* Seção 1: Status e Alertas Rápidos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Alertas Ativos
          </h4>
          <div className="space-y-3">
            {analysisData.alerts.map(alert => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
        <EnvironmentalScore score={analysisData.metrics.environmentalScore} />
      </div>
      {/* Seção 2: Métricas Principais */}
      <div>
        <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <AreaChart className="w-5 h-5 text-slate-500" />
          Métricas Principais
        </h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Saúde da Vegetação (NDVI)"
            value={analysisData.metrics.vegetationHealth.value}
            change={analysisData.metrics.vegetationHealth.change}
            trend={analysisData.metrics.vegetationHealth.trend}
            level={analysisData.metrics.vegetationHealth.level}
            metricType="vegetation"
          />
          <MetricCard
            title="Stress Hídrico (NDWI)"
            value={analysisData.metrics.waterStress.value}
            change={analysisData.metrics.waterStress.change}
            level={analysisData.metrics.waterStress.level}
            metricType="water"
          />
          <MetricCard
            title="Risco de Incêndio"
            value={`${analysisData.metrics.fireRisk.probability * 100}%`}
            level={analysisData.metrics.fireRisk.level}
            metricType="fire"
          />
          <MetricCard
            title="Anomalia Térmica"
            value={`+${analysisData.metrics.temperatureAnomaly.value}${analysisData.metrics.temperatureAnomaly.unit}`}
            trend={analysisData.metrics.temperatureAnomaly.trend}
            level="high"
            metricType="temperature"
          />
        </div>
      </div>

      {/* Seção 3: Mapa e Informações da Zona */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-slate-500" />
            Informações da Zona
          </h4>
          <dl className="space-y-2">
            <div className="flex justify-between items-center py-1">
              <dt className="text-slate-600">Zona Monitorada</dt>
              <dd className="font-medium text-slate-800">{analysisData.monitoredZone.name}</dd>
            </div>
            <div className="flex justify-between items-center py-1">
              <dt className="text-slate-600">Coordenadas</dt>
              <dd className="font-medium text-slate-800 font-mono">
                {analysisData.monitoredZone.coordinates.lat.toFixed(4)}, {analysisData.monitoredZone.coordinates.lng.toFixed(4)}
              </dd>
            </div>
            <div className="flex justify-between items-center py-1">
              <dt className="text-slate-600">Bioma</dt>
              <dd className="font-medium text-slate-800">{analysisData.monitoredZone.biome}</dd>
            </div>
            <div className="flex justify-between items-center py-1">
              <dt className="text-slate-600">Área</dt>
              <dd className="font-medium text-slate-800">{analysisData.monitoredZone.area_km2} km²</dd>
            </div>
            <div className="flex justify-between items-center py-1">
              <dt className="text-slate-600">Período</dt>
              <dd className="font-medium text-slate-800">
                {analysisData.period.start} a {analysisData.period.end}
              </dd>
            </div>
            <div className="flex justify-between items-center py-1">
              <dt className="text-slate-600">Última Atualização</dt>
              <dd className="font-medium text-slate-800">{analysisData.monitoredZone.lastUpdate}</dd>
            </div>
          </dl>
        </div>

        <div className="relative bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center min-h-[300px]">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">Mini-Mapa Interativo</p>
            <p className="text-slate-400 text-sm mt-1">Localização: {analysisData.monitoredZone.name}</p>
          </div>
          <button className="absolute top-3 right-3 p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <Maximize className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>
    </div>
  );
}