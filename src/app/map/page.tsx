// src/app/map/page.tsx - AJUSTADO PARA CORRIGIR O PROBLEMA DE TELA CHEIA
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Layers, 
  Filter, 
  Download,
  Leaf,
  Thermometer,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  Navigation,
  RefreshCw,
  Maximize2
} from "lucide-react";

import MapSidebar from "@/components/map/MapSidebar";

const InteractiveMap = dynamic(() => import('@/components/map/InteractiveMap'), {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <p>Carregando mapa...</p>
      </div>
    )
});

interface VegetationDataItem {
  id: string;
  region: string;
  date: string;
  ndvi_value: number;
  temperature: number;
  soil_moisture: number;
  risk_level: 'baixo' | 'medio' | 'alto' | 'critico';
  vegetation_type: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export default function MapView() {
  const [vegetationData, setVegetationData] = useState<VegetationDataItem[]>([]);
  const [filteredData, setFilteredData] = useState<VegetationDataItem[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<VegetationDataItem | null>(null);
  const [activeLayers, setActiveLayers] = useState({
    ndvi: true, temperature: false, moisture: false, risk: true
  });
  const [filters, setFilters] = useState({
    vegetationType: 'all', riskLevel: 'all', dateRange: 'all', baseLayer: 'satellite'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(6);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const defaultCenter: [number, number] = [-22.0, 18.0];

  const applyFilters = useCallback(() => {
    let filtered = [...vegetationData];
    if (filters.vegetationType !== 'all') {
      filtered = filtered.filter(item => item.vegetation_type === filters.vegetationType);
    }
    if (filters.riskLevel !== 'all') {
      filtered = filtered.filter(item => item.risk_level === filters.riskLevel);
    }
    setFilteredData(filtered);
  }, [vegetationData, filters]);

  useEffect(() => { loadData(); }, []);
  useEffect(() => { applyFilters(); }, [applyFilters]);

  const loadData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const simulatedData: VegetationDataItem[] = [
      { id: "1", region: "Costa da Namíbia", date: new Date().toISOString(), ndvi_value: 0.14, temperature: 28.5, soil_moisture: 12, risk_level: 'critico', vegetation_type: 'vegetacao_desertica', coordinates: { latitude: -22.9576, longitude: 14.5053 } },
      { id: "2", region: "Cunene, Angola", date: new Date().toISOString(), ndvi_value: 0.43, temperature: 32.1, soil_moisture: 25, risk_level: 'alto', vegetation_type: 'savana', coordinates: { latitude: -16.3167, longitude: 15.8167 } },
      { id: "3", region: "Delta do Okavango", date: new Date().toISOString(), ndvi_value: 0.78, temperature: 26.8, soil_moisture: 85, risk_level: 'baixo', vegetation_type: 'floresta', coordinates: { latitude: -18.7573, longitude: 22.0589 } },
      { id: "4", region: "Cunene - Oshakati", date: new Date().toISOString(), ndvi_value: 0.52, temperature: 30.2, soil_moisture: 35, risk_level: 'medio', vegetation_type: 'savana', coordinates: { latitude: -17.7833, longitude: 15.6833 } }
    ];
    setVegetationData(simulatedData);
    setIsLoading(false);
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 1, 18));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 1, 3));
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  const baseLayerUrls = {
    satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    street: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", 
    terrain: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
  };

  const currentBaseLayerUrl = useMemo(() => baseLayerUrls[filters.baseLayer as keyof typeof baseLayerUrls], [filters.baseLayer]);

  return (
    <div className={`min-h-screen flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}>
      {!isFullscreen && (
        <div className="bg-white/80 backdrop-blur-md border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg"><MapPin className="w-6 h-6 text-white" /></div>
                  Mapa Interativo - África Austral
                </h1>
                <p className="text-lg text-gray-600">Monitoramento em tempo real da vegetação e condições climáticas</p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Button variant="outline" className="gap-2 border-emerald-200 hover:bg-emerald-50"><Download className="w-4 h-4"/>Exportar Dados</Button>
                <Button className="gap-2 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg" onClick={loadData}><RefreshCw className="w-4 h-4"/>Atualizar Mapa</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`flex-1 ${isFullscreen ? 'h-screen' : 'min-h-[calc(100vh-200px)]'}`}>
        <div className={`${isFullscreen ? 'h-full' : 'max-w-7xl mx-auto p-4 lg:p-6'} h-full`}>
          <div className={`grid ${isFullscreen ? 'grid-cols-1' : 'lg:grid-cols-4'} gap-6 lg:gap-8 h-full`}>
            {!isFullscreen && (
              <div className="lg:col-span-1 h-full">
                <MapSidebar filters={filters} setFilters={setFilters} activeLayers={activeLayers} setActiveLayers={setActiveLayers} selectedPoint={selectedPoint} filteredData={filteredData} isLoading={isLoading} />
              </div>
            )}
            <div className={`${isFullscreen ? 'col-span-1' : 'lg:col-span-3'} h-full`}>
              <Card className="shadow-2xl border-0 overflow-hidden bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm h-full">
                <CardHeader className="bg-gradient-to-r from-emerald-50/80 to-blue-50/80 border-b border-emerald-100/50">
                  <CardTitle className="flex items-center justify-between text-xl">
                    <span className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center"><Layers className="w-4 h-4 text-emerald-600" /></div>
                      Visualização do Território - África Austral
                    </span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="gap-1 border-emerald-200 hover:bg-emerald-50" onClick={handleZoomOut}><ZoomOut className="w-4 h-4" /></Button>
                      <Badge variant="outline" className="px-3 py-1 bg-white/80">Zoom: {zoomLevel}x</Badge>
                      <Button size="sm" variant="outline" className="gap-1 border-emerald-200 hover:bg-emerald-50" onClick={handleZoomIn}><ZoomIn className="w-4 h-4" /></Button>
                      <Button size="sm" variant="outline" className="gap-1 border-emerald-200 hover:bg-emerald-50" onClick={toggleFullscreen}><Maximize2 className="w-4 h-4" /></Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 h-full">
                  {isLoading ? (
                    <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 border-t-emerald-600 mx-auto"></div>
                        <p className="text-gray-700 font-medium">Carregando mapa interativo...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full bg-gradient-to-br from-emerald-50 to-blue-50 relative overflow-hidden rounded-b-lg">
                      <div className="absolute inset-0">
                          <InteractiveMap 
                              data={filteredData}
                              center={defaultCenter}
                              zoom={zoomLevel}
                              onPointSelect={setSelectedPoint}
                              selectedPoint={selectedPoint}
                              baseLayerUrl={currentBaseLayerUrl}
                              // AQUI ESTÁ A ÚNICA MUDANÇA NESTE ARQUIVO
                              isFullscreen={isFullscreen} 
                          />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 pointer-events-none"></div>
                      <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-emerald-100/50 z-[1000]">
                        <h4 className="font-bold text-sm mb-3 flex items-center gap-2"><Filter className="w-4 h-4 text-emerald-600" />Legenda do Mapa</h4>
                        <div className="space-y-2 text-xs">{[{ color: '#10B981', label: '🌿 Baixo Risco', desc: 'Vegetação saudável' }, { color: '#F59E0B', label: '⚠️ Médio Risco', desc: 'Monitorar' }, { color: '#F97316', label: '🔥 Alto Risco', desc: 'Atenção' }, { color: '#EF4444', label: '💀 Crítico', desc: 'Ação necessária' }].map((item, index) => (<div key={index} className="flex items-center gap-3 py-1"><div className="w-4 h-4 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: item.color }}></div><div><div className="font-semibold">{item.label}</div><div className="text-gray-500">{item.desc}</div></div></div>))}</div>
                      </div>
                      <div className="absolute top-6 right-6 flex flex-col gap-2 z-[1000]"><Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm border-emerald-200 shadow-lg"><Navigation className="w-4 h-4" /></Button></div>
                      {isFullscreen && (<div className="absolute top-6 left-6 z-[1000]"><Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm border-emerald-200 shadow-lg" onClick={toggleFullscreen}>Sair da Tela Cheia</Button></div>)}
                    </div>
                  )}
                </CardContent>
              </Card>
              {!isFullscreen && (
                <div className="grid md:grid-cols-3 gap-6 mt-6">{[{ icon: Leaf, value: filteredData.length, label: "Pontos Monitorados", color: "from-green-50 to-emerald-50", textColor: "text-emerald-600", iconColor: "text-emerald-400" }, { icon: Thermometer, value: vegetationData.length > 0 ? (vegetationData.reduce((sum, item) => sum + item.ndvi_value, 0) / vegetationData.length).toFixed(3) : '0.000', label: "NDVI Médio", color: "from-blue-50 to-cyan-50", textColor: "text-blue-600", iconColor: "text-blue-400" }, { icon: AlertTriangle, value: vegetationData.filter(item => item.risk_level === 'critico' || item.risk_level === 'alto').length, label: "Alertas Ativos", color: "from-amber-50 to-orange-50", textColor: "text-orange-600", iconColor: "text-orange-400" }].map((stat, index) => (<Card key={index} className={`bg-gradient-to-br ${stat.color} border-0 shadow-lg hover:shadow-xl transition-shadow duration-300`}><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p><p className="text-sm text-gray-600 mt-1">{stat.label}</p></div><div className="w-12 h-12 bg-white/50 rounded-xl flex items-center justify-center"><stat.icon className={`w-6 h-6 ${stat.iconColor}`} /></div></div></CardContent></Card>))}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}