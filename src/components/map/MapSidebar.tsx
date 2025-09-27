// src/components/map/MapSidebar.tsx - VERSÃO ORIGINAL RESTAURADA
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Layers, 
  Filter, 
  MapPin,
  RotateCcw,
  Leaf,
  Thermometer,
  Droplets,
  AlertTriangle,
  Calendar,
  Satellite,
  Map,
  Mountain,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

// Definir tipos
interface MapSidebarProps {
  filters: any;
  setFilters: (filters: any) => void;
  activeLayers: any;
  setActiveLayers: (layers: any) => void;
  selectedPoint: any;
  filteredData: any[];
  isLoading: boolean;
}

type RiskLevel = 'baixo' | 'medio' | 'alto' | 'critico';

const riskColors: Record<RiskLevel, string> = {
  baixo: "bg-green-100 text-green-800 border-green-200",
  medio: "bg-yellow-100 text-yellow-800 border-yellow-200",
  alto: "bg-orange-100 text-orange-800 border-orange-200",
  critico: "bg-red-100 text-red-800 border-red-200"
};

const vegetationTypes: Record<string, string> = {
  floresta: "🌳 Floresta",
  savana: "🌾 Savana", 
  agricultura: "🚜 Agricultura",
  pastagem: "🐄 Pastagem",
  vegetacao_costeira: "🏖️ Vegetação Costeira",
  vegetacao_desertica: "🏜️ Vegetação Desértica"
};

const baseLayers = [
  { value: "satellite", label: "🛰️ Satélite", icon: Satellite },
  { value: "street", label: "🗺️ Ruas", icon: Map },
  { value: "terrain", label: "⛰️ Terreno", icon: Mountain }
];

export default function MapSidebar({
  filters,
  setFilters,
  activeLayers,
  setActiveLayers,
  selectedPoint,
  filteredData,
  isLoading
}: MapSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    layers: true,
    filters: true,
    details: false,
    stats: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  const resetFilters = () => {
    setFilters({
      vegetationType: 'all',
      riskLevel: 'all',
      dateRange: 'all'
    });
  };

  const layerOptions = [
    { 
      key: 'ndvi', 
      label: '🌿 NDVI (Vegetação)', 
      icon: Leaf, 
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    { 
      key: 'temperature', 
      label: '🌡️ Temperatura', 
      icon: Thermometer, 
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    { 
      key: 'moisture', 
      label: '💧 Umidade do Solo', 
      icon: Droplets, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    { 
      key: 'risk', 
      label: '⚠️ Zonas de Risco', 
      icon: AlertTriangle, 
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'
    }
  ];
  
  const stats = {
    totalPoints: filteredData.length,
    avgNDVI: filteredData.length > 0 
      ? (filteredData.reduce((sum: number, item: any) => sum + (item.ndvi_value || 0), 0) / filteredData.length)
      : 0,
    riskDistribution: filteredData.reduce((acc: Record<string, number>, item: any) => {
      acc[item.risk_level] = (acc[item.risk_level] || 0) + 1;
      return acc;
    }, {}),
    regions: [...new Set(filteredData.map((item: any) => item.region))].length
  };

  const riskIcons = {
    baixo: "✅",
    medio: "⚠️", 
    alto: "🔥",
    critico: "💀"
  };

  return (
    <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm h-full flex flex-col overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50 border-b border-emerald-100/50 pb-4">
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-800">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
            <Layers className="w-5 h-5 text-white" />
          </div>
          Painel de Controle
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
        {/* Seção: Camadas */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection('layers')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <Satellite className="w-5 h-5 text-emerald-600" />
              <span className="font-semibold text-gray-800">Camadas</span>
            </div>
            {expandedSections.layers ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
          
          {expandedSections.layers && (
            <div className="px-4 pb-4 space-y-4 animate-in fade-in-50">
              {/* Mapa Base */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">🗺️ Mapa Base</label>
                <div className="grid grid-cols-1 gap-2">
                  {baseLayers.map((layer) => (
                    <button
                      key={layer.value}
                      onClick={() => setFilters((prev: any) => ({ ...prev, baseLayer: layer.value }))}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200 ${
                        filters.baseLayer === layer.value
                          ? 'border-emerald-500 bg-emerald-50 shadow-inner'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <layer.icon className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium">{layer.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dados de Satélite */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">📡 Dados de Satélite</label>
                <div className="space-y-2">
                  {layerOptions.map(layer => (
                    <div 
                      key={layer.key}
                      className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                        activeLayers[layer.key] 
                          ? `${layer.bgColor} ${layer.borderColor} shadow-inner`
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                      onClick={() => setActiveLayers((prev: any) => ({...prev, [layer.key]: !prev[layer.key]}))}
                    >
                      <div className="flex items-center gap-3">
                        <layer.icon className={`w-4 h-4 ${layer.color}`} />
                        <span className="text-sm font-medium text-gray-800">{layer.label}</span>
                      </div>
                      <div className={`w-8 h-5 rounded-full transition-all duration-200 relative ${
                        activeLayers[layer.key] ? 'bg-emerald-500' : 'bg-gray-300'
                      }`}>
                        <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform duration-200 ${
                          activeLayers[layer.key] ? 'transform translate-x-4' : 'translate-x-0.5'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Seção: Filtros */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection('filters')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-emerald-600" />
              <span className="font-semibold text-gray-800">Filtros</span>
            </div>
            {expandedSections.filters ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
          
          {expandedSections.filters && (
            <div className="px-4 pb-4 space-y-4 animate-in fade-in-50">
              {/* Tipo de Vegetação */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">🌱 Tipo de Vegetação</label>
                <select 
                  value={filters.vegetationType}
                  onChange={(e) => setFilters((prev: any) => ({ ...prev, vegetationType: e.target.value }))}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                >
                  <option value="all">🌍 Todos os Tipos</option>
                  {Object.entries(vegetationTypes).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Nível de Risco */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">🚨 Nível de Risco</label>
                <select 
                  value={filters.riskLevel}
                  onChange={(e) => setFilters((prev: any) => ({ ...prev, riskLevel: e.target.value }))}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                >
                  <option value="all">📊 Todos os Níveis</option>
                  {Object.keys(riskColors).map(key => (
                    <option key={key} value={key}>
                      {riskIcons[key as RiskLevel]} {key.charAt(0).toUpperCase() + key.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Período */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">📅 Período</label>
                <select 
                  value={filters.dateRange}
                  onChange={(e) => setFilters((prev: any) => ({ ...prev, dateRange: e.target.value }))}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                >
                  <option value="all">🕒 Todo o Período</option>
                  <option value="week">📆 Última Semana</option>
                  <option value="month">🗓️ Último Mês</option>
                </select>
              </div>

              <Button 
                onClick={resetFilters} 
                variant="outline" 
                className="w-full gap-2 border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                <RotateCcw className="w-4 h-4" /> 
                🔄 Limpar Filtros
              </Button>
            </div>
          )}
        </div>

        {/* Seção: Detalhes do Ponto Selecionado */}
        {selectedPoint && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <button
              onClick={() => toggleSection('details')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold text-gray-800">Detalhes do Ponto</span>
              </div>
              {expandedSections.details ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>
            
            {expandedSections.details && (
              <div className="px-4 pb-4 space-y-4 animate-in fade-in-50">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{selectedPoint.region}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {vegetationTypes[selectedPoint.vegetation_type] || selectedPoint.vegetation_type}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-xl border border-green-200">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Leaf className="w-4 h-4"/>NDVI
                    </div>
                    <div className="font-bold text-2xl text-emerald-600">{selectedPoint.ndvi_value?.toFixed(3)}</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 p-3 rounded-xl border border-red-200">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Thermometer className="w-4 h-4"/>Temp.
                    </div>
                    <div className="font-bold text-2xl text-red-600">{selectedPoint.temperature}°C</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-3 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Droplets className="w-4 h-4"/>Umidade
                    </div>
                    <div className="font-bold text-2xl text-blue-600">{selectedPoint.soil_moisture}%</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-3 rounded-xl border border-amber-200">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <AlertTriangle className="w-4 h-4"/>Risco
                    </div>
                    <Badge className={`${riskColors[selectedPoint.risk_level as RiskLevel]} border-0 font-bold text-xs`}>
                      {riskIcons[selectedPoint.risk_level as RiskLevel]} {selectedPoint.risk_level}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-500 border-t pt-3">
                  <Calendar className="w-4 h-4" />
                  <span>{format(parseISO(selectedPoint.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Seção: Estatísticas da Seleção */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection('stats')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">📈</span>
              </div>
              <span className="font-semibold text-gray-800">Estatísticas da Seleção</span>
            </div>
            {expandedSections.stats ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
          
          {expandedSections.stats && (
            <div className="px-4 pb-4 space-y-4 animate-in fade-in-50">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-800">{stats.totalPoints}</div>
                  <div className="text-xs text-gray-600">📍 Pontos Visíveis</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-800">{stats.regions}</div>
                  <div className="text-xs text-gray-600">🌍 Regiões</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">{stats.avgNDVI.toFixed(3)}</div>
                  <div className="text-xs text-gray-600">📊 NDVI Médio</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span>📋 Distribuição de Risco</span>
                </h4>
                <div className="space-y-2">
                  {Object.entries(stats.riskDistribution).map(([risk, count]) => (
                    <div key={risk} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <Badge className={`${riskColors[risk as RiskLevel]} border-0 font-medium`}>
                        {riskIcons[risk as RiskLevel]} {risk.charAt(0).toUpperCase() + risk.slice(1)}
                      </Badge>
                      <span className="font-bold text-gray-800">{count as number}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}