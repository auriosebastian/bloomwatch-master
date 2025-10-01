"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";

export function FilterPanel({ searchTerm, setSearchTerm, filters, setFilters, stats }: any) {
  return (
    <div className="lg:col-span-1 h-full space-y-6">
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b pb-4"><CardTitle className="flex items-center gap-3 text-lg font-bold"><Filter className="w-5 h-5 text-red-600" />Filtros e Busca</CardTitle></CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="relative"><Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><Input placeholder="Buscar alertas..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 border-2 rounded-xl focus:border-red-500"/></div>
          <div className="space-y-3">
            <div><label className="text-sm font-medium mb-2 block">🚨 Severidade</label><select value={filters.severity} onChange={(e) => setFilters((prev: any) => ({ ...prev, severity: e.target.value }))} className="w-full p-2 border-2 rounded-xl focus:border-red-500"><option value="all">📊 Todas</option><option value="baixa">🟢 Baixa</option><option value="media">🟡 Média</option><option value="alta">🟠 Alta</option><option value="critica">🔴 Crítica</option></select></div>
            <div><label className="text-sm font-medium mb-2 block">📋 Tipo de Alerta</label><select value={filters.type} onChange={(e) => setFilters((prev: any) => ({ ...prev, type: e.target.value }))} className="w-full p-2 border-2 rounded-xl focus:border-red-500"><option value="all">🌍 Todos</option><option value="vegetation">🌿 Vegetação</option><option value="temperature">🌡️ Temperatura</option><option value="moisture">💧 Umidade</option><option value="fire">🔥 Incêndio</option><option value="flood">🌊 Inundação</option></select></div>
            <div><label className="text-sm font-medium mb-2 block">📊 Status</label><select value={filters.status} onChange={(e) => setFilters((prev: any) => ({ ...prev, status: e.target.value }))} className="w-full p-2 border-2 rounded-xl focus:border-red-500"><option value="all">📈 Todos</option><option value="active">🔴 Ativo</option><option value="investigating">🟡 Investigando</option><option value="resolved">🟢 Resolvido</option></select></div>
            <div><label className="text-sm font-medium mb-2 block">📅 Período</label><select value={filters.dateRange} onChange={(e) => setFilters((prev: any) => ({ ...prev, dateRange: e.target.value }))} className="w-full p-2 border-2 rounded-xl focus:border-red-500"><option value="7days">📆 Últimos 7 dias</option><option value="30days">🗓️ Últimos 30 dias</option><option value="all">🕒 Todo o período</option></select></div>
          </div>
        </CardContent>
      </Card>
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b pb-4"><CardTitle className="text-lg font-bold"><span>📊 Estatísticas</span></CardTitle></CardHeader>
        <CardContent className="p-4"><div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-red-50 rounded-xl"><div className="text-2xl font-bold text-red-600">{stats.totalAlerts}</div><div className="text-xs text-gray-600">Total</div></div>
            <div className="text-center p-3 bg-orange-50 rounded-xl"><div className="text-2xl font-bold text-orange-600">{stats.activeAlerts}</div><div className="text-xs text-gray-600">Ativos</div></div>
            <div className="text-center p-3 bg-red-100 rounded-xl"><div className="text-2xl font-bold text-red-700">{stats.criticalAlerts}</div><div className="text-xs text-gray-600">Críticos</div></div>
            <div className="text-center p-3 bg-green-50 rounded-xl"><div className="text-2xl font-bold text-green-600">{stats.resolvedAlerts}</div><div className="text-xs text-gray-600">Resolvidos</div></div>
        </div></CardContent>
      </Card>
    </div>
  );
}