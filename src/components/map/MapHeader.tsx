"use client";
import { Button } from "@/components/ui/button";
import { MapPin, Download, RefreshCw } from "lucide-react";

interface MapHeaderProps {
  onUpdate: () => void;
}

export function MapHeader({ onUpdate }: MapHeaderProps) {
  return (
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
            <Button className="gap-2 bg-gradient-to-r from-emerald-600 to-blue-600" onClick={onUpdate}><RefreshCw className="w-4 h-4"/>Atualizar Mapa</Button>
          </div>
        </div>
      </div>
    </div>
  );
}