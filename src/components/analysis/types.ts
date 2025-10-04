// Local: src/components/analysis/types.ts
import { LucideIcon, BarChart3, TrendingUp, Cloud, AlertTriangle, Satellite, Sliders, Server } from "lucide-react";

// ========== TIPOS PRINCIPAIS ==========

export type AnalysisTab = 
  | "overview"           // 1. Visão Geral
  | "timeseries"         // 2. Séries Temporais  
  | "climate"            // 3. Condições Climáticas
  | "risk"               // 4. Risco Ambiental
  | "multispectral"      // 5. Análise Multiespectral
  | "custom"             // 6. Análises Personalizadas
  | "infrastructure";    // 7. Infraestrutura Técnica

export interface TabDefinition {
  id: AnalysisTab;
  label: string;
  icon: LucideIcon;
}

// ========== TIPOS DE DADOS ==========

export interface Sensor {
  id: string;
  name: string;
}

export interface Alert {
  id: string;
  type: 'drought' | 'fire' | 'temperature' | 'vegetation';
  level: 'low' | 'moderate' | 'high' | 'critical';
  message: string;
  timestamp: string;
}

// Tipos para dados de série temporal
export interface TimeSeriesData {
  date: string;
  ndvi: number;
  ndwi: number;
  temperature: number;
  precipitation?: number;
  anomaly?: boolean;
}

export interface PeriodOption {
  value: string;
  label: string;
  days: number;
}

export interface ComparisonZone {
  id: string;
  name: string;
  data: TimeSeriesData[];
}

export interface TimeSeriesConfig {
  currentZone: TimeSeriesData[];
  comparisonZones: ComparisonZone[];
  periodOptions: PeriodOption[];
  selectedPeriod: string;
  selectedMetrics: string[];
}

// ========== ANÁLISE DATA PRINCIPAL ==========

export interface AnalysisData {
  monitoredZone: {
    name: string;
    area_km2: number;
    biome: string;
    coordinates: { lat: number; lng: number };
    lastUpdate: string;
    status: 'active' | 'critical' | 'warning';
  };
  period: {
    start: string;
    end: string;
  };
  availableSensors: Sensor[];
  metrics: {
    vegetationHealth: { 
      value: number; 
      trend: 'improving' | 'stable' | 'worsening';
      change: string;
      level: 'low' | 'moderate' | 'high';
    };
    waterStress: { 
      value: number; 
      level: 'low' | 'moderate' | 'high';
      change: string;
    };
    fireRisk: { 
      value: string; 
      level: 'low' | 'moderate' | 'high' | 'very_high';
      probability: number;
    };
    temperatureAnomaly: { 
      value: number; 
      unit: '°C';
      trend: 'improving' | 'stable' | 'worsening';
    };
    environmentalScore: {
      value: number;
      level: 'excellent' | 'good' | 'moderate' | 'poor' | 'critical';
    };
  };
  alerts: Alert[];
  // NOVOS: Dados para séries temporais
  timeSeries?: TimeSeriesConfig;
  // NOVO: Dados climáticos
  climate?: ClimateConfig;
   // NOVO: Dados de risco ambiental
  risk?: RiskConfig;
  // NOVO: Dados multiespectrais
  multispectral?: MultispectralConfig;
}



// ========== TIPOS CLIMÁTICOS ==========

export interface WeatherCurrent {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  precipitation: number;
  pressure: number;
  uvIndex: number;
  visibility: number;
  condition: 'clear' | 'cloudy' | 'rain' | 'storm' | 'fog';
  icon: string;
  lastUpdated: string;
}

export interface WeatherForecast {
  date: string;
  highTemp: number;
  lowTemp: number;
  condition: string;
  icon: string;
  precipitationChance: number;
  humidity: number;
  windSpeed: number;
}

export interface ClimateAnomaly {
  metric: 'temperature' | 'precipitation' | 'humidity';
  value: number;
  normal: number;
  deviation: number;
  severity: 'low' | 'moderate' | 'high' | 'extreme';
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface DroughtForecast {
  period: string;
  severity: 'none' | 'mild' | 'moderate' | 'severe' | 'extreme';
  probability: number;
  confidence: number;
  affectedArea: number; // porcentagem
  recommendations: string[];
}

export interface ClimateComparison {
  period: string;
  current: number;
  average: number;
  deviation: number;
  trend: 'above' | 'below' | 'normal';
}

export interface ClimateConfig {
  current: WeatherCurrent;
  forecast: WeatherForecast[];
  anomalies: ClimateAnomaly[];
  droughtForecast: DroughtForecast[];
  historicalComparison: ClimateComparison[];
  airQuality?: {
    index: number;
    level: 'good' | 'moderate' | 'unhealthy' | 'hazardous';
    pollutants: string[];
  };
}
// ========== TIPOS DE RISCO AMBIENTAL ==========

export interface RiskIndex {
  type: 'fire' | 'drought' | 'degradation' | 'flood';
  value: number; // 0-100
  level: 'low' | 'moderate' | 'high' | 'very_high' | 'extreme';
  trend: 'increasing' | 'decreasing' | 'stable';
  factors: string[];
  probability: number; // 0-1
}

export interface RiskHotspot {
  id: string;
  coordinates: { lat: number; lng: number };
  riskType: 'fire' | 'drought' | 'degradation';
  intensity: number; // 0-100
  area: number; // km²
  trend: 'expanding' | 'stable' | 'contracting';
  lastDetection: string;
}

export interface RiskPrediction {
  period: string; // '7d', '15d', '30d'
  riskType: 'fire' | 'drought' | 'degradation';
  probability: number;
  confidence: number;
  expectedImpact: 'low' | 'moderate' | 'high' | 'severe';
  factors: {
    name: string;
    contribution: number;
    trend: 'improving' | 'worsening' | 'stable';
  }[];
}

export interface RiskRecommendation {
  type: 'prevention' | 'mitigation' | 'alert' | 'monitoring';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  actions: string[];
  timeframe: 'immediate' | 'short_term' | 'medium_term';
  cost: 'low' | 'medium' | 'high';
}

export interface RiskConfig {
  currentRisks: RiskIndex[];
  hotspots: RiskHotspot[];
  predictions: RiskPrediction[];
  recommendations: RiskRecommendation[];
  historicalTrend: {
    period: string;
    fire: number;
    drought: number;
    degradation: number;
  }[];
}

// Local: src/components/analysis/types.ts
// ADICIONAR estas interfaces:

// ========== TIPOS MULTIESPECTRAIS ==========

export interface SatelliteImage {
  id: string;
  date: string;
  sensor: 'Landsat-8' | 'Landsat-9' | 'Sentinel-2' | 'MODIS';
  resolution: string;
  cloudCover: number;
  url: string;
  thumbnail: string;
  bands: {
    [key: string]: string; // bandId: url
  };
}

export interface SpectralIndex {
  id: string;
  name: string;
  formula: string;
  description: string;
  range: { min: number; max: number };
  interpretation: {
    low: string;
    medium: string;
    high: string;
  };
}

export interface IndexCalculation {
  index: string;
  value: number;
  date: string;
  area: number; // km²
  confidence: number;
}

export interface LandCoverClass {
  id: string;
  name: string;
  color: string;
  area: number; // km²
  percentage: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface ImageComparison {
  before: SatelliteImage;
  after: SatelliteImage;
  changes: {
    type: 'deforestation' | 'urbanization' | 'water_change' | 'vegetation_growth';
    area: number;
    confidence: number;
    coordinates: { lat: number; lng: number }[];
  }[];
}

export interface MultispectralConfig {
  availableImages: SatelliteImage[];
  selectedImage: SatelliteImage | null;
  availableIndices: SpectralIndex[];
  selectedIndices: string[];
  indexCalculations: IndexCalculation[];
  landCover: LandCoverClass[];
  comparisons: ImageComparison[];
  currentCalculation: {
    index: string;
    result: number | null;
    area: number;
  };
}