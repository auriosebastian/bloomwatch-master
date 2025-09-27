"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import dynamic from 'next/dynamic';
import { 
  AlertTriangle, Filter, Search, Download, Calendar, MapPin, Eye, Bell, Clock,
  Leaf, ZoomIn, ZoomOut, Maximize2, Navigation, RotateCcw
} from "lucide-react";
import { format, parseISO, subDays } from "date-fns";

const InteractiveMap = dynamic(() => import('@/components/map/InteractiveMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-100">
      <p>Carregando mapa...</p>
    </div>
  )
});

// Tipos para os alertas
interface Alert {
  id: string; title: string; description: string; region: string; date: string;
  severity: 'baixa' | 'media' | 'alta' | 'critica';
  type: 'vegetation' | 'temperature' | 'moisture' | 'fire' | 'flood';
  status: 'active' | 'resolved' | 'investigating';
  coordinates?: { latitude: number; longitude: number; };
  ndvi_value?: number; temperature?: number; soil_moisture?: number; affected_area?: number;
}

// Tipo que o InteractiveMap espera
type MapPointRiskLevel = 'baixo' | 'medio' | 'alto' | 'critico';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ severity: 'all', type: 'all', status: 'active', dateRange: '7days' });
  const [zoomLevel, setZoomLevel] = useState(6);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([-22.0, 18.0]);

  const mockAlerts: Alert[] = [
    { id: "1", title: "Queda Acentuada no NDVI", description: "Redução de 45% no índice de vegetação na região do Cunene nos últimos 15 dias", region: "Cunene, Angola", date: new Date().toISOString(), severity: "critica", type: "vegetation", status: "active", coordinates: { latitude: -16.3167, longitude: 15.8167 }, ndvi_value: 0.23, temperature: 34.5, soil_moisture: 18, affected_area: 12500 },
    { id: "2", title: "Temperatura Extremamente Alta", description: "Temperatura atingiu 42°C, acima da média histórica para a região", region: "Costa da Namíbia", date: subDays(new Date(), 1).toISOString(), severity: "alta", type: "temperature", status: "investigating", coordinates: { latitude: -22.9576, longitude: 14.5053 }, temperature: 42.1, soil_moisture: 8, affected_area: 8500 },
    { id: "3", title: "Umidade do Solo Crítica", description: "Níveis de umidade abaixo de 15% por mais de 10 dias consecutivos", region: "Kalahari Central", date: subDays(new Date(), 2).toISOString(), severity: "alta", type: "moisture", status: "active", coordinates: { latitude: -23.0, longitude: 21.0 }, ndvi_value: 0.18, soil_moisture: 12, affected_area: 20000 },
    { id: "4", title: "Risco de Incêndio Florestal", description: "Condições climáticas favoráveis para propagação de incêndios", region: "Delta do Okavango", date: subDays(new Date(), 3).toISOString(), severity: "media", type: "fire", status: "active", coordinates: { latitude: -18.7573, longitude: 22.0589 }, temperature: 38.7, soil_moisture: 22, affected_area: 15000 },
    { id: "5", title: "Alerta de Inundação", description: "Chuvas intensas podem causar inundações em áreas baixas", region: "Zambeze", date: subDays(new Date(), 4).toISOString(), severity: "media", type: "flood", status: "investigating", affected_area: 7500 },
    { id: "6", title: "Degradação de Pastagem", description: "Redução significativa na qualidade da vegetação de pastagem", region: "Cunene - Oshakati", date: subDays(new Date(), 5).toISOString(), severity: "baixa", type: "vegetation", status: "resolved", coordinates: { latitude: -17.7833, longitude: 15.6833 }, ndvi_value: 0.31, soil_moisture: 25, affected_area: 5000 }
  ];

  const severityColors = { baixa: "bg-green-100 text-green-800 border-green-200", media: "bg-yellow-100 text-yellow-800 border-yellow-200", alta: "bg-orange-100 text-orange-800 border-orange-200", critica: "bg-red-100 text-red-800 border-red-200" };
  const severityIcons = { baixa: "🟢", media: "🟡", alta: "🟠", critica: "🔴" };
  const typeIcons = { vegetation: "🌿", temperature: "🌡️", moisture: "💧", fire: "🔥", flood: "🌊" };
  const statusIcons = { active: "🔴", investigating: "🟡", resolved: "🟢" };

  useEffect(() => {
    const loadAlerts = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAlerts(mockAlerts);
      setFilteredAlerts(mockAlerts);
      if (mockAlerts.length > 0) { setSelectedAlert(mockAlerts[0]); }
      setIsLoading(false);
    };
    loadAlerts();
  }, []);

  useEffect(() => {
    let filtered = [...alerts];
    if (searchTerm) { filtered = filtered.filter(alert => alert.title.toLowerCase().includes(searchTerm.toLowerCase()) || alert.region.toLowerCase().includes(searchTerm.toLowerCase()) || alert.description.toLowerCase().includes(searchTerm.toLowerCase())); }
    if (filters.severity !== 'all') { filtered = filtered.filter(alert => alert.severity === filters.severity); }
    if (filters.type !== 'all') { filtered = filtered.filter(alert => alert.type === filters.type); }
    if (filters.status !== 'all') { filtered = filtered.filter(alert => alert.status === filters.status); }
    if (filters.dateRange !== 'all') { const daysAgo = parseInt(filters.dateRange.replace('days', '')); const cutoffDate = subDays(new Date(), daysAgo); filtered = filtered.filter(alert => new Date(alert.date) >= cutoffDate); }
    setFilteredAlerts(filtered);
  }, [alerts, searchTerm, filters]);

  useEffect(() => {
    if (selectedAlert?.coordinates) {
      setMapCenter([selectedAlert.coordinates.latitude, selectedAlert.coordinates.longitude]);
      setZoomLevel(9);
    }
  }, [selectedAlert]);

  // ===== CORREÇÃO DO ERRO DE TYPESCRIPT =====
  // Esta função auxiliar garante que a conversão de tipos seja explícita e correta.
  const mapSeverityToRiskLevel = (severity: Alert['severity']): MapPointRiskLevel => {
    const mapping = {
      baixa: 'baixo',
      media: 'medio',
      alta: 'alto',
      critica: 'critico'
    };
    return mapping[severity];
  };

  const mapData = useMemo(() => {
    return filteredAlerts.filter(alert => alert.coordinates).map(alert => ({
      id: alert.id,
      region: alert.region,
      coordinates: alert.coordinates!,
      risk_level: mapSeverityToRiskLevel(alert.severity), // Usando a função auxiliar
      ndvi_value: alert.ndvi_value || 0,
    }));
  }, [filteredAlerts]);
  
  const resetFilters = () => { setSearchTerm(""); setFilters({ severity: 'all', type: 'all', status: 'active', dateRange: '7days' }); };
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 1, 18));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 1, 3));
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);
  const stats = { totalAlerts: alerts.length, activeAlerts: alerts.filter(a => a.status === 'active').length, criticalAlerts: alerts.filter(a => a.severity === 'critica').length, resolvedAlerts: alerts.filter(a => a.status === 'resolved').length };

  const commonMapProps = {
    data: mapData,
    center: mapCenter,
    zoom: zoomLevel,
    onPointSelect: (point: { id: string; }) => {
      const clickedAlert = alerts.find(a => a.id === point.id);
      if (clickedAlert) setSelectedAlert(clickedAlert);
    },
    selectedPoint: selectedAlert ? mapData.find(p => p.id === selectedAlert.id) || null : null,
    baseLayerUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    isFullscreen: isFullscreen,
  };

  // ===== CORREÇÃO DA LÓGICA DE TELA CHEIA =====
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        <InteractiveMap {...commonMapProps} />
        <Button 
          className="absolute top-4 left-4 z-[1000] bg-white/80 hover:bg-white text-black"
          onClick={toggleFullscreen}
        >
          Sair da Tela Cheia
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Seu Header Original */}
      <div className="bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-2"><div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg"><AlertTriangle className="w-6 h-6 text-white" /></div>Sistema de Alertas - África Austral</h1>
              <p className="text-lg text-gray-600">Monitoramento em tempo real de riscos ambientais e climáticos</p>
            </div>
            <div className="flex gap-3 flex-wrap"><Button variant="outline" className="gap-2 border-red-200 hover:bg-red-50"><Download className="w-4 h-4"/>Exportar Relatório</Button><Button className="gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 shadow-lg" onClick={resetFilters}><RotateCcw className="w-4 h-4"/>Limpar Filtros</Button></div>
          </div>
        </div>
      </div>
      {/* Seu Conteúdo Principal Original */}
      <div className="flex-1 min-h-[calc(100vh-200px)]">
        <div className="h-full max-w-7xl mx-auto p-4 lg:p-6">
          <div className="grid lg:grid-cols-4 gap-6 lg:gap-8 h-full">
            <div className="lg:col-span-1 h-full space-y-6">
              <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-100/50 pb-4"><CardTitle className="flex items-center gap-3 text-lg font-bold text-gray-800"><Filter className="w-5 h-5 text-red-600" />Filtros e Busca</CardTitle></CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="relative"><Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><Input placeholder="Buscar alertas..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 border-2 border-gray-200 rounded-xl focus:border-red-500"/></div>
                  <div className="space-y-3">
                    <div><label className="text-sm font-medium text-gray-700 mb-2 block">🚨 Severidade</label><select value={filters.severity} onChange={(e) => setFilters(prev => ({ ...prev, severity: e.target.value }))} className="w-full p-2 border-2 border-gray-200 rounded-xl bg-white focus:border-red-500"><option value="all">📊 Todas</option><option value="baixa">🟢 Baixa</option><option value="media">🟡 Média</option><option value="alta">🟠 Alta</option><option value="critica">🔴 Crítica</option></select></div>
                    <div><label className="text-sm font-medium text-gray-700 mb-2 block">📋 Tipo de Alerta</label><select value={filters.type} onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))} className="w-full p-2 border-2 border-gray-200 rounded-xl bg-white focus:border-red-500"><option value="all">🌍 Todos</option><option value="vegetation">🌿 Vegetação</option><option value="temperature">🌡️ Temperatura</option><option value="moisture">💧 Umidade</option><option value="fire">🔥 Incêndio</option><option value="flood">🌊 Inundação</option></select></div>
                    <div><label className="text-sm font-medium text-gray-700 mb-2 block">📊 Status</label><select value={filters.status} onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))} className="w-full p-2 border-2 border-gray-200 rounded-xl bg-white focus:border-red-500"><option value="all">📈 Todos</option><option value="active">🔴 Ativo</option><option value="investigating">🟡 Investigando</option><option value="resolved">🟢 Resolvido</option></select></div>
                    <div><label className="text-sm font-medium text-gray-700 mb-2 block">📅 Período</label><select value={filters.dateRange} onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))} className="w-full p-2 border-2 border-gray-200 rounded-xl bg-white focus:border-red-500"><option value="1day">⏰ Últimas 24h</option><option value="7days">📆 Últimos 7 dias</option><option value="30days">🗓️ Últimos 30 dias</option><option value="all">🕒 Todo o período</option></select></div>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-100/50 pb-4"><CardTitle className="flex items-center gap-3 text-lg font-bold text-gray-800"><span>📊 Estatísticas</span></CardTitle></CardHeader>
                <CardContent className="p-4 space-y-3"><div className="grid grid-cols-2 gap-3"><div className="text-center p-3 bg-red-50 rounded-xl"><div className="text-2xl font-bold text-red-600">{stats.totalAlerts}</div><div className="text-xs text-gray-600">Total</div></div><div className="text-center p-3 bg-orange-50 rounded-xl"><div className="text-2xl font-bold text-orange-600">{stats.activeAlerts}</div><div className="text-xs text-gray-600">Ativos</div></div><div className="text-center p-3 bg-red-100 rounded-xl"><div className="text-2xl font-bold text-red-700">{stats.criticalAlerts}</div><div className="text-xs text-gray-600">Críticos</div></div><div className="text-center p-3 bg-green-50 rounded-xl"><div className="text-2xl font-bold text-green-600">{stats.resolvedAlerts}</div><div className="text-xs text-gray-600">Resolvidos</div></div></div></CardContent>
              </Card>
            </div>
            <div className="lg:col-span-3 h-full space-y-6">
              <Card className="shadow-2xl border-0 overflow-hidden bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-red-50/80 to-orange-50/80 border-b border-red-100/50"><CardTitle className="flex items-center justify-between text-xl"><span className="flex items-center gap-3"><div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center"><Bell className="w-4 h-4 text-red-600" /></div>Alertas Ativos ({filteredAlerts.length})</span><Badge variant="outline" className="px-3 py-1 bg-white/80">{zoomLevel}x</Badge></CardTitle></CardHeader>
                <CardContent className="p-0">
                  {isLoading ? ('...') : filteredAlerts.length === 0 ? ('...') : (
                    <div className="max-h-96 overflow-y-auto">{filteredAlerts.map(alert => (<div key={alert.id} className={`border-b border-gray-100 last:border-0 p-4 hover:bg-gray-50 cursor-pointer transition-colors ${selectedAlert?.id === alert.id ? 'bg-red-50 border-l-4 border-l-red-500' : ''}`} onClick={() => setSelectedAlert(alert)}><div className="flex items-start justify-between"><div className="flex-1"><div className="flex items-center gap-2 mb-1"><span className="text-lg">{typeIcons[alert.type]}</span><h3 className="font-semibold text-gray-900">{alert.title}</h3><Badge className={`${severityColors[alert.severity]} border-0 text-xs`}>{severityIcons[alert.severity]} {alert.severity}</Badge></div><p className="text-sm text-gray-600 mb-2">{alert.description}</p><div className="flex items-center gap-4 text-xs text-gray-500"><span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{alert.region}</span><span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{format(parseISO(alert.date), "dd/MM/yyyy")}</span><span className="flex items-center gap-1">{statusIcons[alert.status]} {alert.status}</span></div></div><div className="flex items-center gap-2">{alert.coordinates && (<Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={(e) => { e.stopPropagation(); setSelectedAlert(alert); }}><Eye className="w-3 h-3" /></Button>)}</div></div></div>))}</div>
                  )}
                </CardContent>
              </Card>
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="shadow-2xl border-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-red-50/80 to-orange-50/80 border-b border-red-100/50 py-3"><div className="flex items-center justify-between"><CardTitle className="text-lg flex items-center gap-2"><Navigation className="w-4 h-4 text-red-600" />Visualização no Mapa</CardTitle><div className="flex gap-1"><Button size="sm" variant="outline" onClick={handleZoomOut}><ZoomOut className="w-3 h-3" /></Button><Button size="sm" variant="outline" onClick={handleZoomIn}><ZoomIn className="w-3 h-3" /></Button><Button size="sm" variant="outline" onClick={toggleFullscreen}><Maximize2 className="w-3 h-3" /></Button></div></div></CardHeader>
                  <CardContent className="p-0 h-64"><InteractiveMap {...commonMapProps} /></CardContent>
                </Card>
                <Card className="shadow-2xl border-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-red-50/80 to-orange-50/80 border-b border-red-100/50 py-3"><CardTitle className="text-lg flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-red-600" />Detalhes do Alerta</CardTitle></CardHeader>
                  <CardContent className="p-4">{selectedAlert ? (<div className="space-y-4"><div><h3 className="font-bold text-lg text-gray-900">{selectedAlert.title}</h3><p className="text-sm text-gray-600 mt-1">{selectedAlert.description}</p></div><div className="grid grid-cols-2 gap-3"><div className="bg-red-50 p-3 rounded-lg"><div className="flex items-center gap-2 text-gray-600 mb-1"><MapPin className="w-4 h-4"/>Localização</div><div className="font-semibold text-red-700">{selectedAlert.region}</div></div><div className="bg-orange-50 p-3 rounded-lg"><div className="flex items-center gap-2 text-gray-600 mb-1"><Clock className="w-4 h-4"/>Data</div><div className="font-semibold text-orange-700">{format(parseISO(selectedAlert.date), "dd/MM/yyyy")}</div></div></div>{selectedAlert.ndvi_value && (<div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-xl border border-green-200"><div className="flex items-center gap-2 text-gray-600 mb-1"><Leaf className="w-4 h-4"/>NDVI Atual</div><div className="font-bold text-2xl text-emerald-600">{selectedAlert.ndvi_value.toFixed(3)}</div></div>)}<div className="flex gap-2"><Button className="flex-1 bg-red-600 hover:bg-red-700"><Bell className="w-4 h-4 mr-2"/>Notificar Equipe</Button><Button variant="outline" className="border-red-200"><Eye className="w-4 h-4 mr-2"/>Investigar</Button></div></div>) : (<div className="text-center text-gray-500 py-8"><AlertTriangle className="w-12 h-12 mx-auto text-gray-300 mb-4" /><p>Selecione um alerta para ver os detalhes</p></div>)}</CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}