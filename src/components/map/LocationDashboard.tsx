// Local: src/components/map/LocationDashboard.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { X, MapPin, ZoomIn, Calendar, Search, BarChart3, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LocationData {
  lat: number;
  lng: number;
  radius: number;
}

interface LocationDashboardProps {
  location: LocationData;
  onClose: () => void;
  onRadiusChange: (radius: number) => void;
  onAnalysisStart: (analysisData: AnalysisPayload) => void;
  onNavigateToAnalysis: () => void;
}

interface AnalysisPayload {
  coordinates: { lat: number; lng: number };
  radius: number;
  period: { start: string; end: string };
  locationName?: string;
}

export default function LocationDashboard({ 
  location, 
  onClose, 
  onRadiusChange,
  onAnalysisStart,
  onNavigateToAnalysis
}: LocationDashboardProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 16, y: 50 });
  const [size, setSize] = useState({ width: 320, height: 480 });
  const [isResizing, setIsResizing] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState<'idle' | 'analyzing' | 'completed'>('idle');
  const [locationName, setLocationName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const cardRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const resizeStartPos = useRef({ x: 0, y: 0, width: 0, height: 0 });

  const coordinates = `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`;
  
  // Efeito para definir datas padrão (últimos 6 meses)
  useEffect(() => {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    
    setStartDate(sixMonthsAgo.toISOString().split('T')[0]);
    setEndDate(today.toISOString().split('T')[0]);
  }, []);

  // Handlers para drag e resize (manter igual)
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, input, select, label')) return;
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({ x: e.clientX - dragStartPos.current.x, y: e.clientY - dragStartPos.current.y });
    }
    if (isResizing) {
      const newWidth = Math.max(320, resizeStartPos.current.width + (e.clientX - resizeStartPos.current.x));
      const newHeight = Math.max(400, resizeStartPos.current.height + (e.clientY - resizeStartPos.current.y));
      setSize({ width: newWidth, height: newHeight });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    resizeStartPos.current = { x: e.clientX, y: e.clientY, width: size.width, height: size.height };
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing]);

  // 🔍 Pesquisa por localidade (usando OpenStreetMap Nominatim)
  const handleSearchLocation = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const result = data[0];
        setLocationName(result.display_name);
        // Aqui você poderia atualizar o mapa também
        console.log('Localização encontrada:', result);
      }
    } catch (error) {
      console.error('Erro na pesquisa:', error);
    }
  };

  // 🚀 Iniciar análise
  const handleStartAnalysis = async () => {
    setAnalysisStatus('analyzing');
    
    const analysisPayload: AnalysisPayload = {
      coordinates: { lat: location.lat, lng: location.lng },
      radius: location.radius,
      period: { start: startDate, end: endDate },
      locationName: locationName || searchQuery || `Zona ${coordinates}`
    };

    // Enviar para o backend processar TODOS os dados
    try {
      // TODO: Substituir pela URL real do backend
      const response = await fetch('http://localhost:8000/analyze-zone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(analysisPayload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Análise completa:', result);
        setAnalysisStatus('completed');
        
        // Notificar componente pai sobre análise concluída
        onAnalysisStart(analysisPayload);
      } else {
        throw new Error('Erro na análise');
      }
    } catch (error) {
      console.error('Erro na análise:', error);
      setAnalysisStatus('idle');
    }
  };

  // 📊 Navegar para análise detalhada
  const handleViewDetailedAnalysis = () => {
    onNavigateToAnalysis();
  };

  return (
    <div 
      ref={cardRef}
      className="absolute z-[1000] bg-transparent select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
    >
      <Card 
        className="border-0 shadow-2xl bg-white/95 backdrop-blur-md h-full flex flex-col"
        onMouseDown={handleMouseDown}
        style={{ height: `${size.height}px` }}
      >
        <CardHeader className="pb-3 flex-shrink-0 cursor-move">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="w-5 h-5 text-emerald-600" />
              Análise da Zona
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto space-y-4">
          {/* 🔍 Pesquisa por Localidade */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Search className="w-4 h-4" />
              Pesquisar Localidade
            </Label>
            <div className="flex gap-2">
              <Input
                placeholder="Ex: Luanda, Angola"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchLocation()}
                className="flex-1 h-8 text-sm"
                disabled={analysisStatus === 'analyzing'}
              />
              <Button 
                onClick={handleSearchLocation}
                size="sm"
                variant="outline"
                disabled={analysisStatus === 'analyzing'}
                className="h-8"
              >
                <Search className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* 📍 Coordenadas Atuais */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Coordenadas:</span>
              <Badge variant="outline" className="font-mono text-xs">
                {coordinates}
              </Badge>
            </div>
            
            {/* 🎯 Controle de Raio */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Raio de análise:</span>
                <span className="text-sm font-semibold text-emerald-600">
                  {location.radius} km
                </span>
              </div>
              <div className="flex gap-1 flex-wrap">
                {[10, 25, 50, 100].map((radius) => (
                  <Button
                    key={radius}
                    size="sm"
                    variant={location.radius === radius ? "default" : "outline"}
                    className={`text-xs h-7 ${
                      location.radius === radius 
                        ? 'bg-emerald-600 hover:bg-emerald-700' 
                        : ''
                    }`}
                    onClick={() => onRadiusChange(radius)}
                    disabled={analysisStatus === 'analyzing'}
                  >
                    {radius}km
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* 📅 Período de Análise */}
          <div className="space-y-3 pt-2">
            <Label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Período de Análise
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-xs">Data Início</Label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="h-8 text-xs"
                  disabled={analysisStatus === 'analyzing'}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Data Fim</Label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="h-8 text-xs"
                  disabled={analysisStatus === 'analyzing'}
                />
              </div>
            </div>
          </div>

          {/* 🚀 Ação Principal - Análise Única */}
          <div className="space-y-3 pt-4">
            {analysisStatus === 'idle' && (
              <Button 
                onClick={handleStartAnalysis}
                className="w-full bg-emerald-600 hover:bg-emerald-700 h-10"
                size="lg"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analisar Zona
              </Button>
            )}

            {analysisStatus === 'analyzing' && (
              <Button disabled className="w-full bg-orange-600 hover:bg-orange-600 h-10">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processando Análise...
              </Button>
            )}

            {analysisStatus === 'completed' && (
              <div className="space-y-2">
                <Button 
                  onClick={handleViewDetailedAnalysis}
                  className="w-full bg-green-600 hover:bg-green-700 h-10"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Ver Análise Detalhada
                </Button>
                <div className="text-center text-sm text-green-600 font-medium">
                  ✅ Análise concluída com sucesso!
                </div>
              </div>
            )}
          </div>

          {/* 💡 Informações Rápidas */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
            <div className="text-sm font-medium text-blue-800 mb-1">
              O que será analisado:
            </div>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Saúde da vegetação (NDVI)</li>
              <li>• Stress hídrico (NDWI)</li>
              <li>• Riscos ambientais</li>
              <li>• Condições climáticas</li>
              <li>• Imagens multiespectrais</li>
            </ul>
          </div>
        </CardContent>

        {/* Handle para redimensionamento */}
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-blue-500 opacity-0 hover:opacity-100 rounded-tl-lg"
          onMouseDown={handleResizeMouseDown}
          title="Redimensionar"
        />
      </Card>
    </div>
  );
}