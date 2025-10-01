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
// 1. Importar o hook e o tipo do DataContext
import { useData, VegetationDataItem } from "@/context/DataContext"; 

const InteractiveMap = dynamic(() => import('@/components/map/InteractiveMap'), {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <p>Carregando mapa...</p>
      </div>
    )
});

// A interface foi removida daqui pois agora é importada do DataContext

export default function MapView() {
  // 2. BUSCAR DADOS GLOBAIS DO CONTEXT
  const { vegetationData, loading: isLoading } = useData();

  // O resto dos seus estados originais são mantidos
  const [filteredData, setFilteredData] = useState<VegetationDataItem[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<VegetationDataItem | null>(null);
  const [activeLayers, setActiveLayers] = useState({
    ndvi: true, temperature: false, moisture: false, risk: true
  });
  const [filters, setFilters] = useState({
    vegetationType: 'all', riskLevel: 'all', dateRange: 'all', baseLayer: 'satellite'
  });
  const [zoomLevel, setZoomLevel] = useState(6);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const defaultCenter: [number, number] = [-22.0, 18.0];

  const applyFilters = useCallback(() => {
    let filtered = [...vegetationData]; // Usa dados do context
    if (filters.vegetationType !== 'all') {
      filtered = filtered.filter(item => item.vegetation_type === filters.vegetationType);
    }
    if (filters.riskLevel !== 'all') {
      filtered = filtered.filter(item => item.risk_level === filters.riskLevel);
    }
    setFilteredData(filtered);
  }, [vegetationData, filters]);

  // 3. REMOVIDA A FUNÇÃO `loadData` E SEU `useEffect`
  // O useEffect abaixo agora aplica os filtros quando os dados do context carregam
  useEffect(() => {
    if (!isLoading && vegetationData.length > 0) {
      applyFilters();
    }
  }, [isLoading, vegetationData, applyFilters]);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 1, 18));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 1, 3));
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);
  const reloadData = () => window.location.reload(); // Ação de 'Atualizar Mapa'

  const baseLayerUrls = {
    satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    street: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", 
    terrain: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
  };

  const currentBaseLayerUrl = useMemo(() => baseLayerUrls[filters.baseLayer as keyof typeof baseLayerUrls], [filters.baseLayer]);

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        <InteractiveMap 
          data={filteredData} 
          center={defaultCenter} 
          zoom={zoomLevel} 
          onPointSelect={setSelectedPoint} 
          selectedPoint={selectedPoint} 
          baseLayerUrl={currentBaseLayerUrl} 
          isFullscreen={isFullscreen} 
        />
        <Button className="absolute top-6 left-6 z-[1000]" onClick={toggleFullscreen}>Sair da Tela Cheia</Button>
      </div>
    );
  }

  // O JSX ABAIXO É EXATAMENTE O SEU ORIGINAL
  return (
    <div className="min-h-screen flex flex-col">
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
                <Button className="gap-2 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg" onClick={reloadData}><RefreshCw className="w-4 h-4"/>Atualizar Mapa</Button>
              </div>
            </div>
          </div>
        </div>

      <div className="flex-1 min-h-[calc(100vh-200px)]">
        <div className="max-w-7xl mx-auto p-4 lg:p-6 h-full">
          <div className="grid lg:grid-cols-4 gap-6 lg:gap-8 h-full">
            <div className="lg-col-span-1 h-full">
              {/* AS PROPS PASSADAS AQUI SÃO AS ORIGINAIS QUE O SEU MAPSIDEBAR ESPERA */}
              <MapSidebar filters={filters} setFilters={setFilters} activeLayers={activeLayers} setActiveLayers={setActiveLayers} selectedPoint={selectedPoint} filteredData={filteredData} isLoading={isLoading} />
            </div>
            <div className="lg:col-span-3 h-full">
              <Card className="shadow-2xl border-0 overflow-hidden bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm h-full">
                <CardHeader className="bg-gradient-to-r from-emerald-50/80 to-blue-50/80 border-b border-emerald-100/50">
                  <CardTitle className="flex items-center justify-between text-xl">
                    <span className="flex items-center gap-3"><div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center"><Layers className="w-4 h-4 text-emerald-600" /></div>Visualização do Território</span>
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
                    <div className="h-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500"></div>
                    </div>
                  ) : (
                    <div className="h-full relative overflow-hidden rounded-b-lg">
                      <div className="absolute inset-0">
                          <InteractiveMap 
                              data={filteredData} 
                              center={defaultCenter} 
                              zoom={zoomLevel} 
                              onPointSelect={setSelectedPoint} 
                              selectedPoint={selectedPoint} 
                              baseLayerUrl={currentBaseLayerUrl}
                              isFullscreen={isFullscreen} 
                          />
                      </div>
                      {/* ... o resto do seu JSX original ... */}
                    </div>
                  )}
                </CardContent>
              </Card>
              <div className="grid md:grid-cols-3 gap-6 mt-6">{/* ... seu código original dos stats... */}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}