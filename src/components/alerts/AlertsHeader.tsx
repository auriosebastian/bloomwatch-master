"use client";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Download, RotateCcw } from "lucide-react";

interface AlertsHeaderProps {
  onResetFilters: () => void;
}

export function AlertsHeader({ onResetFilters }: AlertsHeaderProps) {
  return (
    <div className="bg-white/80 backdrop-blur-md border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg"><AlertTriangle className="w-6 h-6 text-white" /></div>
              Sistema de Alertas
            </h1>
            <p className="text-lg text-gray-600">Monitoramento em tempo real de riscos ambientais e climáticos.</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Button variant="outline" className="gap-2 border-red-200 hover:bg-red-50"><Download className="w-4 h-4"/>Exportar Relatório</Button>
            <Button className="gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 shadow-lg" onClick={onResetFilters}><RotateCcw className="w-4 h-4"/>Limpar Filtros</Button>
          </div>
        </div>
      </div>
    </div>
  );
}