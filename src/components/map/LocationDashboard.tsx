// Local: src/components/map/LocationDashboard.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { X, MapPin, ZoomIn, Database, Calendar, Gauge, Loader2, Satellite } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox'; // Agora este import deve funcionar

interface LocationData {
  lat: number;
  lng: number;
  radius: number;
}

interface LocationDashboardProps {
  location: LocationData;
  onClose: () => void;
  onRadiusChange: (radius: number) => void;
  onAnalysisStatusChange?: (isAnalyzing: boolean, analysisType?: string) => void;
}

type AnalysisStatus = 'idle' | 'analyzing' | 'completed';
type RiskLevel = 'Alto' | 'Moderado' | 'Baixo';
type SensorType = 'landsat' | 'modis' | 'smap' | 'grace';
type GraceAnalysisType = 'terrestrial_water_storage' | 'groundwater' | 'soil_moisture';

// Interface para o payload da requisição
interface AnalysisRequest {
  lon: number;
  lat: number;
  buffer_km: number;
  start: string;
  end: string;
  sensors: SensorType[];
  grace_analysis: GraceAnalysisType;
  include_ml_predictions: boolean;
}

export default function LocationDashboard({ 
  location, 
  onClose, 
  onRadiusChange,
  onAnalysisStatusChange
}: LocationDashboardProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 16, y: 50 });
  const [size, setSize] = useState({ width: 320, height: 520 });
  const [isResizing, setIsResizing] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>('idle');
  const [analysisType, setAnalysisType] = useState<string>('');
  const [selectedSensors, setSelectedSensors] = useState<SensorType[]>(['landsat', 'modis']);
  const [graceAnalysis, setGraceAnalysis] = useState<GraceAnalysisType>('terrestrial_water_storage');
  const [includeMLPredictions, setIncludeMLPredictions] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const resizeStartPos = useRef({ x: 0, y: 0, width: 0, height: 0 });

  const coordinates = `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`;
  
  // Determinar estação do ano baseada no mês atual
  const getSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'Outono';
    if (month >= 5 && month <= 7) return 'Inverno';
    if (month >= 8 && month <= 10) return 'Primavera';
    return 'Verão';
  };

  // Dados simulados para a área selecionada
  const areaData = {
    vegetationIndex: 0.67,
    soilMoisture: '42%',
    temperature: 28.5,
    lastUpdate: '2 horas atrás',
    season: getSeason(),
    riskLevel: 'Moderado' as RiskLevel,
  };

  // Efeito para definir datas padrão (últimos 6 meses)
  useEffect(() => {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    
    setStartDate(sixMonthsAgo.toISOString().split('T')[0]);
    setEndDate(today.toISOString().split('T')[0]);
  }, []);

  // Notificar o componente pai sobre mudanças no status de análise
  useEffect(() => {
    if (onAnalysisStatusChange) {
      onAnalysisStatusChange(analysisStatus === 'analyzing', analysisType);
    }
  }, [analysisStatus, analysisType, onAnalysisStatusChange]);

  // Handlers para drag e resize
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, input, select, label')) return;
    
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStartPos.current.x,
        y: e.clientY - dragStartPos.current.y
      });
    }
    
    if (isResizing) {
      const newWidth = Math.max(320, resizeStartPos.current.width + (e.clientX - resizeStartPos.current.x));
      const newHeight = Math.max(450, resizeStartPos.current.height + (e.clientY - resizeStartPos.current.y));
      setSize({ width: newWidth, height: newHeight });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    resizeStartPos.current = {
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height
    };
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

  // Função para fazer a requisição para o backend
  const makeAnalysisRequest = async (requestData: AnalysisRequest): Promise<any> => {
    // TODO: Substituir pela URL real do seu backend
    const response = await fetch('http://localhost:8000/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error('Erro na análise');
    }

    return response.json();
  };

  // Preparar dados para a requisição
  const prepareRequestData = (type: 'basic' | 'deep'): AnalysisRequest => {
    const baseData = {
      lon: location.lng,
      lat: location.lat,
      buffer_km: location.radius,
      start: startDate,
      end: endDate,
      sensors: selectedSensors,
      grace_analysis: graceAnalysis,
      include_ml_predictions: includeMLPredictions,
    };

    if (type === 'basic') {
      return {
        ...baseData,
        sensors: ['landsat', 'modis'] as SensorType[],
        include_ml_predictions: false,
      };
    } else {
      return {
        ...baseData,
        include_ml_predictions: true,
      };
    }
  };

  const handleAnalyzeZone = async () => {
    setAnalysisStatus('analyzing');
    setAnalysisType('basic');
    
    try {
      const requestData = prepareRequestData('basic');
      console.log('Enviando análise básica:', requestData);
      
      const result = await makeAnalysisRequest(requestData);
      console.log('Resultado da análise:', result);
      
      setAnalysisStatus('completed');
      setAnalysisType('basic');
    } catch (error) {
      console.error('Erro na análise:', error);
      setAnalysisStatus('idle');
      setAnalysisType('');
    }
  };

  const handleDeepAnalysis = async () => {
    setAnalysisStatus('analyzing');
    setAnalysisType('deep');
    
    try {
      const requestData = prepareRequestData('deep');
      console.log('Enviando análise profunda:', requestData);
      
      const result = await makeAnalysisRequest(requestData);
      console.log('Resultado da análise profunda:', result);
      
      setAnalysisStatus('completed');
      setAnalysisType('deep');
    } catch (error) {
      console.error('Erro na análise profunda:', error);
      setAnalysisStatus('idle');
      setAnalysisType('');
    }
  };

  const handleViewDetails = () => {
    console.log('Ver detalhes da análise:', { analysisType });
  };

  const handleNewAnalysis = () => {
    setAnalysisStatus('idle');
    setAnalysisType('');
  };

  // Função para obter a classe do badge baseada no riskLevel
  const getRiskBadgeClass = (riskLevel: RiskLevel) => {
    switch (riskLevel) {
      case 'Alto':
        return 'bg-red-100 text-red-800';
      case 'Moderado':
        return 'bg-yellow-100 text-yellow-800';
      case 'Baixo':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Toggle sensor selection
  const toggleSensor = (sensor: SensorType) => {
    setSelectedSensors(prev =>
      prev.includes(sensor)
        ? prev.filter(s => s !== sensor)
        : [...prev, sensor]
    );
  };

  // CORREÇÃO: Adicione tipo para o parâmetro checked
  const handleMLPredictionsChange = (checked: boolean) => {
    setIncludeMLPredictions(checked);
  };

  const sensorLabels = {
    landsat: 'Landsat',
    modis: 'MODIS',
    smap: 'SMAP',
    grace: 'GRACE'
  };

  const graceAnalysisLabels = {
    terrestrial_water_storage: 'Armazenamento de Água Terrestre',
    groundwater: 'Água Subterrânea',
    soil_moisture: 'Humidade do Solo'
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
              {analysisStatus === 'analyzing' && (
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              )}
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
          {/* Coordenadas */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Coordenadas:</span>
              <Badge variant="outline" className="font-mono text-xs">
                {coordinates}
              </Badge>
            </div>
            
            {/* Controle de Raio */}
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

          {/* Período de Análise */}
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

          {/* Sensores */}
          <div className="space-y-3 pt-2">
            <Label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Satellite className="w-4 h-4" />
              Sensores Satelitais
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.entries(sensorLabels) as [SensorType, string][]).map(([sensor, label]) => (
                <div key={sensor} className="flex items-center space-x-2">
                  <Checkbox
                    id={`sensor-${sensor}`}
                    checked={selectedSensors.includes(sensor)}
                    onCheckedChange={() => toggleSensor(sensor)}
                    disabled={analysisStatus === 'analyzing'}
                  />
                  <Label htmlFor={`sensor-${sensor}`} className="text-xs cursor-pointer">
                    {label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Tipo de Análise GRACE */}
          <div className="space-y-3 pt-2">
            <Label className="text-sm font-medium text-gray-600">
              Análise GRACE
            </Label>
            <select
              value={graceAnalysis}
              onChange={(e) => setGraceAnalysis(e.target.value as GraceAnalysisType)}
              className="w-full h-8 text-xs border rounded-md px-2 bg-white disabled:bg-gray-100"
              disabled={analysisStatus === 'analyzing'}
            >
              {(Object.entries(graceAnalysisLabels) as [GraceAnalysisType, string][]).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Previsões ML - CORRIGIDO */}
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="ml-predictions"
              checked={includeMLPredictions}
              onCheckedChange={handleMLPredictionsChange}
              disabled={analysisStatus === 'analyzing'}
            />
            <Label htmlFor="ml-predictions" className="text-sm text-gray-600 cursor-pointer">
              Incluir previsões de Machine Learning
            </Label>
          </div>

          {/* Dados da Área */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="text-center p-3 bg-emerald-50 rounded-lg">
              <div className="text-2xl font-bold text-emerald-600">
                {areaData.vegetationIndex}
              </div>
              <div className="text-xs text-gray-600 mt-1">Índice NDVI</div>
            </div>
            
            <div className="text-center p-3 bg-amber-50 rounded-lg">
              <div className="text-2xl font-bold text-amber-600">
                {areaData.temperature}°
              </div>
              <div className="text-xs text-gray-600 mt-1">Temperatura</div>
            </div>
            
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {areaData.soilMoisture}
              </div>
              <div className="text-xs text-gray-600 mt-1">Humidade Solo</div>
            </div>
            
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-sm font-bold text-purple-700 capitalize">
                {areaData.season}
              </div>
              <div className="text-xs text-gray-600 mt-1">Estação</div>
            </div>
          </div>

          {/* Nível de Risco */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-600">Nível de Risco:</span>
            <Badge className={getRiskBadgeClass(areaData.riskLevel)}>
              {areaData.riskLevel}
            </Badge>
          </div>

          {/* Ações de Análise */}
          <div className="space-y-2 pt-2">
            {analysisStatus === 'idle' && (
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  onClick={handleAnalyzeZone}
                  className="bg-emerald-600 hover:bg-emerald-700 text-xs h-10"
                >
                  <ZoomIn className="w-3 h-3 mr-1" />
                  Análise Básica
                </Button>
                
                <Button 
                  onClick={handleDeepAnalysis}
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 text-xs h-10"
                >
                  <Database className="w-3 h-3 mr-1" />
                  Análise LM
                </Button>
              </div>
            )}

            {analysisStatus === 'analyzing' && (
              <Button disabled className="w-full bg-orange-600 hover:bg-orange-600">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processando...
              </Button>
            )}

            {analysisStatus === 'completed' && (
              <div className="space-y-2">
                <Button 
                  onClick={handleViewDetails}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Ver Detalhes
                </Button>
                <Button 
                  onClick={handleNewAnalysis}
                  variant="outline"
                  className="w-full text-gray-600 hover:text-gray-700"
                >
                  Nova Análise
                </Button>
              </div>
            )}
          </div>

          <div className="text-xs text-gray-500 text-center pt-2 border-t">
            Última atualização: {areaData.lastUpdate}
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