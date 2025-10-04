// Local: src/components/analysis/AnalysisSidebar.tsx
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar } from 'lucide-react';
import { AnalysisTab, AnalysisData, TabDefinition } from './types';

interface AnalysisSidebarProps {
  activeTab: AnalysisTab;
  setActiveTab: (tab: AnalysisTab) => void;
  tabs: TabDefinition[];
  analysisData: AnalysisData;
}

export default function AnalysisSidebar({ activeTab, setActiveTab, tabs, analysisData }: AnalysisSidebarProps) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm w-80 flex flex-col h-[calc(100vh-8rem)]">
      
      {/* Header */}
      <div className="p-6 border-b border-slate-200 flex-shrink-0">
        <h2 className="text-xl font-bold text-emerald-700">Painel de Análises</h2>
        <p className="text-sm text-slate-500 mt-1">Navegue entre as diferentes visualizações</p>
      </div>

      {/* Navegação - CORRIGIDO: variant="default" */}
      <div className="p-4 space-y-2 flex-1 overflow-y-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <Button
              key={tab.id}
              variant={isActive ? "default" : "ghost"} // CORRIGIDO
              onClick={() => setActiveTab(tab.id)}
              className={`w-full justify-start transition-all duration-300 rounded-xl h-12 ${isActive ? 'shadow-md' : ''}`}
            >
              <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-emerald-600' : 'text-slate-500'}`} />
              <span className={`${isActive ? 'font-semibold text-slate-800' : 'font-normal text-slate-600'}`}>{tab.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Rodapé */}
      <div className="p-4 border-t border-slate-200 flex-shrink-0">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Área Monitorada</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2 text-slate-500">
            <MapPin className="w-4 h-4" />
            <span className="font-mono">
              {analysisData.monitoredZone.coordinates.lat.toFixed(4)}, {analysisData.monitoredZone.coordinates.lng.toFixed(4)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <Calendar className="w-4 h-4" />
            <span>{analysisData.period.start} à {analysisData.period.end}</span>
          </div>
        </div>
      </div>
    </div>
  );
}