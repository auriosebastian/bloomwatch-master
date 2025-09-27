"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  Thermometer, Droplets, CloudRain, Filter, TrendingUp, TrendingDown, Minus, Calendar, MapPin, BarChart3, Leaf, AlertTriangle
} from 'lucide-react';

// --- Tipos de Dados ---
type RiskLevel = 'baixo' | 'medio' | 'alto' | 'critico';

interface ClimateRecord {
  date: string;
  region: 'Cunene, Angola' | 'Costa da Namíbia' | 'Delta do Okavango';
  temperature: number; // em °C
  soil_moisture: number; // em %
  precipitation: number; // em mm
  ndvi: number; // Valor de 0 a 1
  risk_level: RiskLevel;
}

type DataType = 'temperature' | 'soil_moisture' | 'precipitation' | 'ndvi';

// --- Dados Simulados (com NDVI e Risco) ---
const generateMockData = (): ClimateRecord[] => {
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
};

const mockClimateData: ClimateRecord[] = generateMockData();

// --- Configurações para cada tipo de dado ---
const dataConfigs = {
  temperature: { label: 'Temperatura', unit: '°C', color: '#EF4444', icon: Thermometer },
  soil_moisture: { label: 'Umidade do Solo', unit: '%', color: '#3B82F6', icon: Droplets },
  precipitation: { label: 'Precipitação', unit: 'mm', color: '#10B981', icon: CloudRain },
  ndvi: { label: 'NDVI', unit: '', color: '#84CC16', icon: Leaf },
};

const riskConfig: Record<RiskLevel, { label: string, color: string }> = {
    baixo: { label: 'Baixo', color: 'bg-green-100 text-green-800' },
    medio: { label: 'Médio', color: 'bg-yellow-100 text-yellow-800' },
    alto: { label: 'Alto', color: 'bg-orange-100 text-orange-800' },
    critico: { label: 'Crítico', color: 'bg-red-100 text-red-800' },
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <div className="text-xs font-bold text-gray-700 mb-1">
          {new Date(label).toLocaleDateString('pt-BR')}
        </div>
        {payload.map((entry: any, idx: number) => (
          <div key={idx} className="flex items-center gap-2 text-xs">
            <span style={{ color: entry.color, fontWeight: 700 }}>{entry.name}:</span>
            <span>{entry.value}{entry.unit}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};


export default function ClimateDataPage() {
  const [filters, setFilters] = useState({
    region: 'Cunene, Angola' as ClimateRecord['region'],
    dataType: 'temperature' as DataType,
    period: '30days'
  });

  const filteredData = useMemo(() => {
    let data = mockClimateData.filter(d => d.region === filters.region);
    const days = filters.period === '7days' ? 7 : 30;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    return data.filter(d => new Date(d.date) >= cutoffDate);
  }, [filters]);

  const stats = useMemo(() => {
    if (filteredData.length === 0) return { avg: 0, max: 0, min: 0 };
    const values = filteredData.map(d => d[filters.dataType]);
    const sum = values.reduce((a, b) => a + b, 0);
    return {
      avg: (sum / values.length).toFixed(filters.dataType === 'ndvi' ? 3 : 1),
      max: Math.max(...values).toFixed(filters.dataType === 'ndvi' ? 3 : 1),
      min: Math.min(...values).toFixed(filters.dataType === 'ndvi' ? 3 : 1),
    };
  }, [filteredData, filters.dataType]);
  
  const selectedConfig = dataConfigs[filters.dataType];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <div className="bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg"><BarChart3 className="w-6 h-6 text-white" /></div>
            Dados Climáticos Históricos
          </h1>
          <p className="text-lg text-gray-600 mt-1">Análise de tendências de clima e vegetação.</p>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-6">
        <div className="grid lg:grid-cols-4 gap-6 h-full">
          <div className="lg:col-span-1">
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm sticky top-24">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100/50"><CardTitle className="flex items-center gap-3 text-lg font-bold text-gray-800"><Filter className="w-5 h-5 text-blue-600" />Filtros e Parâmetros</CardTitle></CardHeader>
              <CardContent className="p-4 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2"><MapPin size={16} className="text-gray-500"/> Região</label>
                  <select value={filters.region} onChange={e => setFilters(prev => ({ ...prev, region: e.target.value as ClimateRecord['region'] }))} className="w-full p-2 border-2 border-gray-200 rounded-xl bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition">
                    <option>Cunene, Angola</option><option>Costa da Namíbia</option><option>Delta do Okavango</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2"><BarChart3 size={16} className="text-gray-500"/> Tipo de Dado</label>
                  <select value={filters.dataType} onChange={e => setFilters(prev => ({ ...prev, dataType: e.target.value as DataType }))} className="w-full p-2 border-2 border-gray-200 rounded-xl bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition">
                    <option value="temperature">🌡️ Temperatura</option>
                    <option value="soil_moisture">💧 Umidade do Solo</option>
                    <option value="precipitation">🌧️ Precipitação</option>
                    <option value="ndvi">🌿 NDVI</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2"><Calendar size={16} className="text-gray-500"/> Período</label>
                  <select value={filters.period} onChange={e => setFilters(prev => ({ ...prev, period: e.target.value }))} className="w-full p-2 border-2 border-gray-200 rounded-xl bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition">
                    <option value="7days">Últimos 7 dias</option><option value="30days">Últimos 30 dias</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* ... Cards de estatísticas (código mantido) ... */}
            </div>
            
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader><CardTitle className="flex items-center gap-3 text-xl"><selectedConfig.icon className="w-6 h-6" style={{color: selectedConfig.color}}/>Evolução de {selectedConfig.label} em {filters.region}</CardTitle></CardHeader>
              <CardContent>
                <div className="h-80 w-full animate-in fade-in-50 duration-500">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={filteredData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit'})} fontSize={12} dy={5} />
                      <YAxis domain={filters.dataType === 'ndvi' ? [0, 1] : ['auto', 'auto']} unit={selectedConfig.unit} fontSize={12} />
                      <Tooltip content={<CustomTooltip />} cursor={{ stroke: selectedConfig.color, strokeWidth: 1, strokeDasharray: '3 3' }} />
                      <Legend />
                      <Line type="monotone" dataKey={filters.dataType} name={selectedConfig.label} stroke={selectedConfig.color} strokeWidth={3} dot={{ r: 0 }} activeDot={{ r: 6 }} unit={selectedConfig.unit}/>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
                <CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 size={18} /> Dados Detalhados</CardTitle></CardHeader>
                <CardContent>
                    <div className="max-h-[400px] overflow-y-auto relative">
                        <div className="grid grid-cols-6 gap-4 px-4 py-2 text-xs font-bold text-gray-600 bg-gray-100 rounded-t-lg sticky top-0 z-10">
                            <div>Data</div>
                            <div className="text-right flex items-center justify-end gap-1"><Thermometer size={12}/>Temp.</div>
                            <div className="text-right flex items-center justify-end gap-1"><Droplets size={12}/>Umidade</div>
                            <div className="text-right flex items-center justify-end gap-1"><CloudRain size={12}/>Chuva</div>
                            <div className="text-right flex items-center justify-end gap-1"><Leaf size={12}/>NDVI</div>
                            <div className="text-center flex items-center justify-center gap-1"><AlertTriangle size={12}/>Risco</div>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {filteredData.slice().reverse().map(record => (
                                <div key={record.date} className="grid grid-cols-6 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors items-center">
                                    <div className="font-medium text-gray-800">{new Date(record.date).toLocaleDateString('pt-BR')}</div>
                                    <div className="text-right font-mono text-red-600">{record.temperature.toFixed(1)}°C</div>
                                    <div className="text-right font-mono text-blue-600">{record.soil_moisture.toFixed(1)}%</div>
                                    <div className="text-right font-mono text-green-600">{record.precipitation.toFixed(1)} mm</div>
                                    <div className="text-right font-mono text-lime-600">{record.ndvi.toFixed(3)}</div>
                                    <div className="text-center">
                                        <Badge className={`border-0 text-xs ${riskConfig[record.risk_level].color}`}>
                                            {riskConfig[record.risk_level].label}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}