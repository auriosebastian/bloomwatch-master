"use client";
import { BarChart3 } from 'lucide-react';

export function ClimateHeader() {
  return (
    <div className="bg-white/80 backdrop-blur-md border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg"><BarChart3 className="w-6 h-6 text-white" /></div>
          Dados Climáticos Históricos
        </h1>
        <p className="text-lg text-gray-600 mt-1">Análise de tendências de clima e vegetação.</p>
      </div>
    </div>
  );
}