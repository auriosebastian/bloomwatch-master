// Local: src/components/analysis/types.ts

import { LucideIcon } from "lucide-react";

export type AnalysisTab = "overview" | "timeseries" | "rawdata";

export interface TabDefinition {
  id: AnalysisTab;
  label: string;
  icon: LucideIcon;
}

// NOVO: Tipo para definir um Sensor
export interface Sensor {
  id: string;
  name: string;
  // Podemos adicionar mais propriedades depois, como resolução, data de lançamento, etc.
}

// ATUALIZADO: A estrutura principal de dados com campos mais detalhados
export interface AnalysisData {
  // Informações da Zona Monitorada
  monitoredZone: {
    name: string;
    area_km2: number;
    biome: string;
    coordinates: { lat: number; lng: number };
    lastUpdate: string;
  };
  // Informações do período de análise
  period: {
    start: string;
    end: string;
  };
  // Lista de todos os sensores disponíveis para esta análise
  availableSensors: Sensor[];
  // Métricas principais
  metrics: {
    vegetationHealth: { value: number; trend: 'improving' | 'stable' | 'worsening' };
    waterStress: { value: number; level: 'low' | 'moderate' | 'high' };
    fireRisk: { value: string; level: 'low' | 'moderate' | 'high' | 'very_high' };
    temperatureAnomaly: { value: number; unit: '°C' };
  };
}