"use client";

import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { subDays } from 'date-fns';

// --- 1. DEFINIÇÃO DOS TIPOS DE DADOS GLOBAIS ---
export type RiskLevel = 'baixo' | 'medio' | 'alto' | 'critico';  // Adicionado 'export' aqui

export interface ClimateRecord {
  date: string;
  region: 'Cunene, Angola' | 'Costa da Namíbia' | 'Delta do Okavango';
  temperature: number;
  soil_moisture: number;
  precipitation: number;
  ndvi: number;
  risk_level: RiskLevel;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  region: string;
  date: string;
  severity: 'baixa' | 'media' | 'alta' | 'critica';
  type: 'vegetation' | 'temperature' | 'moisture' | 'fire' | 'flood';
  status: 'active' | 'resolved' | 'investigating';
  coordinates?: { latitude: number; longitude: number; };
  ndvi_value?: number;
  temperature?: number;
  soil_moisture?: number;
}

export interface VegetationDataItem {
  id: string;
  region: string;
  date: string;
  ndvi_value: number;
  temperature: number;
  soil_moisture: number;
  risk_level: RiskLevel;
  vegetation_type: string;
  coordinates: { latitude: number; longitude: number; };
}


// --- 2. ESTRUTURA DO NOSSO CONTEXTO (ATUALIZADA) ---
interface DataContextType {
  climateData: ClimateRecord[];
  alerts: Alert[];
  vegetationData: VegetationDataItem[];
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);


// --- 3. FUNÇÕES PARA GERAR DADOS SIMULADOS ---
const generateMockClimateData = (): ClimateRecord[] => {
    // ===== CÓDIGO RESTAURADO AQUI =====
    const data: ClimateRecord[] = [];
    const regions: ClimateRecord['region'][] = ['Cunene, Angola', 'Costa da Namíbia', 'Delta do Okavango'];
    for (let i = 29; i >= 0; i--) {
        regions.forEach(region => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            let baseTemp = 28, baseMoisture = 40, basePrecip = 2, baseNdvi = 0.5;
            if (region === 'Costa da Namíbia') { baseTemp = 22; baseMoisture = 20; basePrecip = 0.5; baseNdvi = 0.2; }
            if (region === 'Delta do Okavango') { baseTemp = 30; baseMoisture = 70; basePrecip = 5; baseNdvi = 0.8; }
            const temperature = parseFloat((baseTemp + Math.sin(i / 3) * 3 + (Math.random() - 0.5) * 2).toFixed(1));
            const soil_moisture = Math.max(0, Math.min(100, parseFloat((baseMoisture - Math.cos(i / 5) * 15 + (Math.random() - 0.5) * 10).toFixed(1))));
            const precipitation = Math.max(0, parseFloat((basePrecip + (Math.random() > 0.8 ? Math.random() * 10 : 0)).toFixed(1)));
            const ndvi = Math.max(0, Math.min(1, parseFloat((baseNdvi + (soil_moisture - baseMoisture) / 200 - (temperature - baseTemp) / 100).toFixed(3))));
            let risk_level: RiskLevel = 'baixo';
            if (ndvi < 0.3 || temperature > 35) risk_level = 'critico';
            else if (ndvi < 0.45 || temperature > 32) risk_level = 'alto';
            else if (ndvi < 0.6) risk_level = 'medio';
            data.push({ date: date.toISOString().split('T')[0], region, temperature, soil_moisture, precipitation, ndvi, risk_level });
        });
    }
    return data;
    // ===================================
};

const generateMockAlerts = (): Alert[] => [
    { id: "1", title: "Queda Acentuada no NDVI", description: "Redução de 45% no índice de vegetação no Cunene.", region: "Cunene, Angola", date: new Date().toISOString(), severity: "critica", type: "vegetation", status: "active", coordinates: { latitude: -16.3167, longitude: 15.8167 }, ndvi_value: 0.23 },
    { id: "2", title: "Temperatura Extremamente Alta", description: "Temperatura atingiu 42°C, acima da média histórica.", region: "Costa da Namíbia", date: subDays(new Date(), 1).toISOString(), severity: "alta", type: "temperature", status: "investigating", coordinates: { latitude: -22.9576, longitude: 14.5053 } },
    { id: "3", title: "Umidade do Solo Crítica", description: "Níveis de umidade abaixo de 15% por mais de 10 dias.", region: "Kalahari Central", date: subDays(new Date(), 2).toISOString(), severity: "alta", type: "moisture", status: "active", coordinates: { latitude: -23.0, longitude: 21.0 }, ndvi_value: 0.18 },
    { id: "4", title: "Risco de Incêndio Florestal", description: "Condições climáticas favoráveis para incêndios.", region: "Delta do Okavango", date: subDays(new Date(), 3).toISOString(), severity: "media", type: "fire", status: "active", coordinates: { latitude: -18.7573, longitude: 22.0589 } },
    { id: "6", title: "Degradação de Pastagem", description: "Redução na qualidade da vegetação.", region: "Cunene - Oshakati", date: subDays(new Date(), 5).toISOString(), severity: "baixa", type: "vegetation", status: "resolved", coordinates: { latitude: -17.7833, longitude: 15.6833 }, ndvi_value: 0.31 },
];

const generateMockVegetationData = (): VegetationDataItem[] => [
  { id: "1", region: "Costa da Namíbia", date: new Date().toISOString(), ndvi_value: 0.14, temperature: 28.5, soil_moisture: 12, risk_level: 'critico', vegetation_type: 'vegetacao_desertica', coordinates: { latitude: -22.9576, longitude: 14.5053 } },
  { id: "2", region: "Cunene, Angola", date: new Date().toISOString(), ndvi_value: 0.43, temperature: 32.1, soil_moisture: 25, risk_level: 'alto', vegetation_type: 'savana', coordinates: { latitude: -16.3167, longitude: 15.8167 } },
  { id: "3", region: "Delta do Okavango", date: new Date().toISOString(), ndvi_value: 0.78, temperature: 26.8, soil_moisture: 85, risk_level: 'baixo', vegetation_type: 'floresta', coordinates: { latitude: -18.7573, longitude: 22.0589 } },
  { id: "4", region: "Cunene - Oshakati", date: new Date().toISOString(), ndvi_value: 0.52, temperature: 30.2, soil_moisture: 35, risk_level: 'medio', vegetation_type: 'savana', coordinates: { latitude: -17.7833, longitude: 15.6833 } }
];


// --- 4. O PROVEDOR (ATUALIZADO) ---
export function DataProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  const climateData = useMemo(() => generateMockClimateData(), []);
  const alerts = useMemo(() => generateMockAlerts(), []);
  const vegetationData = useMemo(() => generateMockVegetationData(), []);

  useMemo(() => {
    if (climateData.length > 0 && alerts.length > 0 && vegetationData.length > 0) {
      setLoading(false);
    }
  }, [climateData, alerts, vegetationData]);

  const value = {
    climateData,
    alerts,
    vegetationData,
    loading,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

// --- 5. O "GANCHO" (HOOK) PARA ACESSAR OS DADOS ---
export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}