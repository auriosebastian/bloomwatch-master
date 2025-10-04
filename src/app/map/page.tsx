// Local: src/app/map/page.tsx
"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Layers, Satellite, Mountain, BarChart3 } from 'lucide-react';
import LocationDashboard from '@/components/map/LocationDashboard';
import { Button } from '@/components/ui/button'; // ← IMPORT ADICIONADO
import L from 'leaflet';
import { useRouter } from 'next/navigation';

const SatNogsMap = dynamic(() => import('@/components/map/SatNogsMap'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-800">
      <p className="text-lg text-gray-200">Carregando Mapa...</p>
    </div>
  )
});

type LayerType = 'satellite' | 'terrain';

interface SelectedLocation {
  lat: number;
  lng: number;
  radius: number;
}

interface AnalysisPayload {
  coordinates: { lat: number; lng: number };
  radius: number;
  period: { start: string; end: string };
  locationName?: string;
}

export default function MapPage() {
  const [activeLayer, setActiveLayer] = useState<LayerType>('satellite');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation | null>(null);
  const [analysisStatus, setAnalysisStatus] = useState<'idle' | 'analyzing' | 'completed'>('idle');
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisPayload | null>(null);
  const router = useRouter();

  const selectLayer = (layer: LayerType) => {
    setActiveLayer(layer);
    setIsPanelOpen(false); 
  };

  const handleMapClick = (latlng: L.LatLng) => {
    const { lat, lng } = latlng;
    
    // Se clicar no mesmo local, remove o marcador
    if (selectedLocation && 
        Math.abs(selectedLocation.lat - lat) < 0.0001 && 
        Math.abs(selectedLocation.lng - lng) < 0.0001) {
      setSelectedLocation(null);
      setAnalysisStatus('idle');
      setCurrentAnalysis(null);
    } else {
      // Caso contrário, adiciona/atualiza o marcador
      setSelectedLocation({
        lat,
        lng,
        radius: 50, // Default radius
      });
      setAnalysisStatus('idle');
      setCurrentAnalysis(null);
    }
  };

  const handleCloseDashboard = () => {
    setSelectedLocation(null);
    setAnalysisStatus('idle');
    setCurrentAnalysis(null);
  };

  const handleRadiusChange = (radius: number) => {
    if (selectedLocation) {
      setSelectedLocation({
        ...selectedLocation,
        radius,
      });
    }
  };

  // 🎯 Nova função: Quando análise é iniciada
  const handleAnalysisStart = (analysisData: AnalysisPayload) => {
    setCurrentAnalysis(analysisData);
    setAnalysisStatus('completed');
    
    // Aqui você pode salvar no contexto global ou localStorage
    // para as abas de análise acessarem
    localStorage.setItem('currentAnalysis', JSON.stringify(analysisData));
    console.log('Análise salva para as abas:', analysisData);
  };

  // 🎯 Nova função: Navegar para análise detalhada
  const handleNavigateToAnalysis = () => {
    if (currentAnalysis) {
      // Salvar dados no contexto da aplicação
      localStorage.setItem('currentAnalysis', JSON.stringify(currentAnalysis));
      
      // Navegar para a página de análises
      router.push('/analysis');
    }
  };

  return (
    <div className="relative w-screen h-screen">
      <SatNogsMap 
        layerType={activeLayer} 
        onMapClick={handleMapClick}
        markerPosition={selectedLocation ? new L.LatLng(selectedLocation.lat, selectedLocation.lng) : null}
        radius={selectedLocation?.radius || 50}
        analysisStatus={analysisStatus}
      />

      {/* Dashboard de Localização ATUALIZADO */}
      {selectedLocation && (
        <LocationDashboard
          location={selectedLocation}
          onClose={handleCloseDashboard}
          onRadiusChange={handleRadiusChange}
          onAnalysisStart={handleAnalysisStart}
          onNavigateToAnalysis={handleNavigateToAnalysis}
        />
      )}

      {/* Botão para ir direto para Análises (quando houver dados) */}
      {currentAnalysis && (
        <div className="absolute top-4 left-4 z-[1000]">
          <Button
            onClick={handleNavigateToAnalysis}
            className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Ver Análises
          </Button>
        </div>
      )}

      {/* Seletor de Camadas (manter igual) */}
      <div className="absolute bottom-8 right-4 z-[1000] flex flex-col items-end">
        {isPanelOpen && (
          <div className="mb-2 p-2 flex gap-2 rounded-2xl bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl animate-in fade-in-50 slide-in-from-bottom-5 duration-300">
            <div 
              className="flex flex-col items-center cursor-pointer p-1 rounded-lg"
              onClick={() => selectLayer('satellite')}
            >
              <div className={`
                bg-white/30 w-16 h-16 rounded-xl flex items-center justify-center border-2 transition-all
                ${activeLayer === 'satellite' ? 'border-emerald-500 shadow-md' : 'border-transparent hover:border-white/50'}
              `}>
                <Satellite className="w-8 h-8 text-gray-700"/>
              </div>
              <span className={`text-sm mt-1 font-semibold ${activeLayer === 'satellite' ? 'text-emerald-700' : 'text-gray-600'}`}>
                Satélite
              </span>
            </div>
            
            <div 
              className="flex flex-col items-center cursor-pointer p-1 rounded-lg"
              onClick={() => selectLayer('terrain')}
            >
              <div className={`
                bg-white/30 w-16 h-16 rounded-xl flex items-center justify-center border-2 transition-all
                ${activeLayer === 'terrain' ? 'border-emerald-500 shadow-md' : 'border-transparent hover:border-white/50'}
              `}>
                <Mountain className="w-8 h-8 text-gray-700"/>
              </div>
              <span className={`text-sm mt-1 font-semibold ${activeLayer === 'terrain' ? 'text-emerald-700' : 'text-gray-600'}`}>
                Terreno
              </span>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsPanelOpen(!isPanelOpen)}
          className="
            p-3
            rounded-2xl bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl 
            hover:bg-white/50 transition-all
          "
          aria-label="Selecionar tipo de mapa"
        >
          <Layers className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
}