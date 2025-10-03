// Local: src/components/map/SatNogsMap.tsx
"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, Circle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Componente para controlar o zoom automático
const ZoomToMarker = ({ markerPosition, radius }: { markerPosition: L.LatLng | null; radius: number }) => {
  const map = useMap();

  React.useEffect(() => {
    if (markerPosition) {
      const zoomLevel = Math.max(6, 12 - Math.log2(radius / 10));
      map.setView(markerPosition, zoomLevel, {
        animate: true,
        duration: 1
      });
    }
  }, [markerPosition, radius, map]);

  return null;
};

// Componente interno para lidar com eventos do mapa
const MapEventsHandler = ({ onMapClick }: { onMapClick: (latlng: L.LatLng) => void }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
};

// Criar ícones customizados para diferentes estados
const createPulsingIcon = (color: 'blue' | 'red' | 'green' = 'blue') => {
  const colors = {
    blue: { dot: '#3b82f6', ring: '#3b82f6' },
    red: { dot: '#dc2626', ring: '#dc2626' },
    green: { dot: '#16a34a', ring: '#16a34a' }
  };

  const selectedColor = colors[color];

  return L.divIcon({
    className: `pulsing-dot-container ${color}`,
    html: `
      <div class="pulsing-dot-pulse" style="background: ${selectedColor.ring}"></div>
      <div class="pulsing-dot" style="background: ${selectedColor.dot}"></div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

interface SatNogsMapProps {
  layerType: 'satellite' | 'terrain';
  onMapClick: (latlng: L.LatLng) => void;
  markerPosition: L.LatLng | null;
  radius: number;
  analysisStatus?: 'idle' | 'analyzing' | 'completed';
}

const tileLayers = {
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  },
  terrain: {
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
  }
};

export default function SatNogsMap({ 
  layerType, 
  onMapClick, 
  markerPosition, 
  radius,
  analysisStatus = 'idle'
}: SatNogsMapProps) {
  const initialPosition: L.LatLngExpression = [-17.92366, 19.7667];
  const initialZoom = 6;
  const selectedLayer = tileLayers[layerType];

  // Determinar cor baseada no status de análise
  const getMarkerColor = () => {
    switch (analysisStatus) {
      case 'analyzing': return 'red';
      case 'completed': return 'green';
      default: return 'blue';
    }
  };

  // Determinar cor do círculo baseada no status
  const getCircleColor = () => {
    switch (analysisStatus) {
      case 'analyzing': return '#dc2626'; // Vermelho
      case 'completed': return '#16a34a'; // Verde
      default: return '#3b82f6'; // Azul
    }
  };

  const radiusInMeters = radius * 1000;
  const markerColor = getMarkerColor();
  const circleColor = getCircleColor();

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={initialPosition}
        zoom={initialZoom}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
        worldCopyJump={true}
        maxBounds={[[-85, -180], [85, 180]]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          key={layerType}
          attribution={selectedLayer.attribution}
          url={selectedLayer.url}
        />
        
        <MapEventsHandler onMapClick={onMapClick} />
        <ZoomToMarker markerPosition={markerPosition} radius={radius} />

        {markerPosition && (
          <>
            <Marker 
              position={markerPosition} 
              icon={createPulsingIcon(markerColor as any)} 
            />
            <Circle
              center={markerPosition}
              radius={radiusInMeters}
              pathOptions={{
                color: circleColor,
                fillColor: circleColor,
                fillOpacity: analysisStatus === 'analyzing' ? 0.2 : 0.1,
                weight: analysisStatus === 'analyzing' ? 3 : 2,
                opacity: 0.8
              }}
            />
          </>
        )}
      </MapContainer>

      <style jsx global>{`
        .pulsing-dot-container {
          background: transparent;
          border: none;
          position: relative;
        }

        .pulsing-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          position: absolute;
          top: 4px;
          left: 4px;
          z-index: 2;
          box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
          animation: pulse 2s infinite;
        }

        .pulsing-dot-pulse {
          position: absolute;
          top: 0;
          left: 0;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          opacity: 0.6;
          animation: pulse-ring 2s ease-out infinite;
          z-index: 1;
        }

        /* Animações para todas as cores */
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }

        @keyframes pulse-ring {
          0% {
            transform: scale(0.1);
            opacity: 0.8;
          }
          75% {
            opacity: 0.3;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        /* Cores específicas para análise */
        .pulsing-dot-container.red .pulsing-dot {
          background: #dc2626;
          box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7);
          animation: pulse-red 2s infinite;
        }

        .pulsing-dot-container.red .pulsing-dot-pulse {
          background: #dc2626;
          animation: pulse-ring-red 2s ease-out infinite;
        }

        .pulsing-dot-container.green .pulsing-dot {
          background: #16a34a;
          box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.7);
          animation: pulse-green 2s infinite;
        }

        .pulsing-dot-container.green .pulsing-dot-pulse {
          background: #16a34a;
          animation: pulse-ring-green 2s ease-out infinite;
        }

        @keyframes pulse-red {
          0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(220, 38, 38, 0); }
          100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
        }

        @keyframes pulse-ring-red {
          0% { transform: scale(0.1); opacity: 0.8; }
          75% { opacity: 0.3; }
          100% { transform: scale(2); opacity: 0; }
        }

        @keyframes pulse-green {
          0% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(22, 163, 74, 0); }
          100% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0); }
        }

        @keyframes pulse-ring-green {
          0% { transform: scale(0.1); opacity: 0.8; }
          75% { opacity: 0.3; }
          100% { transform: scale(2); opacity: 0; }
        }

        .leaflet-interactive {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
}