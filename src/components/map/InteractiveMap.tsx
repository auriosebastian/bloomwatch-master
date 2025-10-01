"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Importa o tipo completo do DataContext (remove a interface local)
import { VegetationDataItem } from "@/context/DataContext";

interface InteractiveMapProps {
  data: VegetationDataItem[];
  center: [number, number];
  zoom: number;
  onPointSelect: (point: VegetationDataItem) => void;
  selectedPoint: VegetationDataItem | null;
  baseLayerUrl: string;
  isFullscreen: boolean;
}

// Componente auxiliar para controlar o mapa (zoom, centro E redimensionamento)
const MapController = ({ center, zoom, isFullscreen }: { center: [number, number]; zoom: number; isFullscreen: boolean; }) => {
  const map = useMap();

  // Efeito para centralizar e dar zoom
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  // Efeito para CORRIGIR O PROBLEMA de redimensionamento
  useEffect(() => {
    // Dá um pequeno tempo para a animação CSS da tela cheia terminar
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [isFullscreen, map]); // Executa toda vez que 'isFullscreen' muda

  return null;
};

const getRiskIcon = (riskLevel: string, isSelected: boolean) => {
  const colors = { baixo: '#10B981', medio: '#F59E0B', alto: '#F97316', critico: '#EF4444' };
  const color = colors[riskLevel as keyof typeof colors] || '#10B981';
  const selectedStyles = isSelected 
    ? 'box-shadow: 0 0 0 4px rgba(250, 204, 21, 0.5); transform: scale(1.5);' 
    : 'box-shadow: 0 2px 5px rgba(0,0,0,0.3);';

  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; transition: all 0.3s ease; ${selectedStyles}"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

export default function InteractiveMap({ data, center, zoom, onPointSelect, selectedPoint, baseLayerUrl, isFullscreen }: InteractiveMapProps) {
  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      zoomControl={false}
      scrollWheelZoom={true} 
      style={{ height: '100%', width: '100%', zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye...'
        url={baseLayerUrl}
      />
      
      <MapController center={center} zoom={zoom} isFullscreen={isFullscreen} />

      {data.map((point) => (
        point.coordinates && (
          <Marker
            key={point.id}
            position={[point.coordinates.latitude, point.coordinates.longitude]}
            icon={getRiskIcon(point.risk_level, selectedPoint?.id === point.id)}
            eventHandlers={{ click: () => { onPointSelect(point); } }}
          >
            <Popup>
              <div className="font-semibold">{point.region}</div>
              <div className="text-emerald-600">NDVI: {point.ndvi_value.toFixed(3)}</div>
              {/* Campos adicionais do tipo completo para enriquecer o Popup */}
              <div className="text-gray-500 text-sm">Data: {point.date.split('T')[0]}</div>
              <div className="text-blue-600 text-sm">Temp: {point.temperature}°C</div>
              <div className="text-green-600 text-sm">Umidade: {point.soil_moisture}%</div>
              <div className="text-purple-600 text-sm">Tipo: {point.vegetation_type}</div>
              <div className="text-red-600 font-medium">Risco: {point.risk_level}</div>
            </Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  );
}