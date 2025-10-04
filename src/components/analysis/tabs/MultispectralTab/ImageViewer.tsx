// Local: src/components/analysis/tabs/MultispectralTab/ImageViewer.tsx
import React, { useState } from 'react';
import { SatelliteImage } from '../../types';
import { ZoomIn, ZoomOut, RotateCcw, Download, Layers } from 'lucide-react';

interface ImageViewerProps {
  image: SatelliteImage | null;
  onImageChange: (image: SatelliteImage) => void;
  availableImages: SatelliteImage[];
}

const ImageViewer = ({ image, onImageChange, availableImages }: ImageViewerProps) => {
  const [zoom, setZoom] = useState(1);
  const [selectedBand, setSelectedBand] = useState<string>('natural');

  const bandPresets = {
    natural: { name: 'Color Natural (RGB)', bands: ['B4', 'B3', 'B2'] },
    vegetation: { name: 'Vegetação (NIR)', bands: ['B5', 'B4', 'B3'] },
    water: { name: 'Corpo d\'Água', bands: ['B5', 'B6', 'B4'] },
    urban: { name: 'Área Urbana', bands: ['B7', 'B6', 'B4'] }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const handleReset = () => setZoom(1);

  if (!image) {
    return (
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <div className="text-center py-12 text-slate-500">
          <Layers className="w-12 h-12 mx-auto mb-4 text-slate-400" />
          <div className="text-lg font-medium mb-2">Nenhuma imagem selecionada</div>
          <div className="text-sm">Selecione uma imagem satelital para visualizar</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      {/* Cabeçalho do Visualizador */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <select 
            value={image.id}
            onChange={(e) => {
              const selected = availableImages.find(img => img.id === e.target.value);
              if (selected) onImageChange(selected);
            }}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {availableImages.map(img => (
              <option key={img.id} value={img.id}>
                {img.sensor} - {new Date(img.date).toLocaleDateString('pt-BR')} 
                {img.cloudCover > 0 && ` (${img.cloudCover}% nuvens)`}
              </option>
            ))}
          </select>

          <select 
            value={selectedBand}
            onChange={(e) => setSelectedBand(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {Object.entries(bandPresets).map(([key, preset]) => (
              <option key={key} value={key}>{preset.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
            Resolução: {image.resolution}
          </div>
          {image.cloudCover > 0 && (
            <div className={`text-sm px-3 py-1 rounded-full ${
              image.cloudCover > 50 ? 'bg-orange-100 text-orange-800' : 
              image.cloudCover > 20 ? 'bg-yellow-100 text-yellow-800' : 
              'bg-blue-100 text-blue-800'
            }`}>
              {image.cloudCover}% nuvens
            </div>
          )}
        </div>
      </div>

      {/* Área da Imagem */}
      <div className="relative bg-slate-900 overflow-hidden">
        <div 
          className="flex items-center justify-center min-h-[400px]"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
        >
          {/* Placeholder da imagem satelital */}
          <div className="relative">
            <div className="w-full h-64 bg-gradient-to-br from-green-900 via-blue-900 to-brown-900 rounded-lg shadow-2xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
            
            {/* Informações sobrepostas */}
            <div className="absolute bottom-4 left-4 text-white">
              <div className="text-sm font-medium">{image.sensor}</div>
              <div className="text-xs opacity-80">
                {new Date(image.date).toLocaleDateString('pt-BR')} • 
                Composição: {bandPresets[selectedBand as keyof typeof bandPresets].name}
              </div>
            </div>

            {/* Grade de coordenadas simulada */}
            <div className="absolute top-4 right-4 text-white/60 text-xs">
              <div>Lat: {Math.random() * 0.1 + 10.7}°</div>
              <div>Lon: {Math.random() * 0.1 + 14.9}°</div>
            </div>
          </div>
        </div>

        {/* Controles de Zoom */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-lg transition-colors"
          >
            <ZoomIn className="w-4 h-4 text-slate-700" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-lg transition-colors"
          >
            <ZoomOut className="w-4 h-4 text-slate-700" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-slate-700" />
          </button>
        </div>

        {/* Indicador de Zoom */}
        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
          {Math.round(zoom * 100)}%
        </div>
      </div>

      {/* Rodapé com Metadados */}
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <div className="grid grid-cols-3 gap-4 text-sm text-slate-600">
          <div>
            <div className="font-medium">Sensor</div>
            <div>{image.sensor}</div>
          </div>
          <div>
            <div className="font-medium">Data de Captura</div>
            <div>{new Date(image.date).toLocaleDateString('pt-BR')}</div>
          </div>
          <div>
            <div className="font-medium">Bandas Disponíveis</div>
            <div>{Object.keys(image.bands).length} bandas</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;