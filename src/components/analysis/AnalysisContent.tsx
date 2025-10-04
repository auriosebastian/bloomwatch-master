// Local: src/components/analysis/AnalysisContent.tsx
"use client";

import React from 'react'; 
import { AnalysisTab, AnalysisData, TabDefinition } from './types';
import OverviewTab from './tabs/OverviewTab';
import TimeseriesTab from './tabs/TimeseriesTab';
import ClimateTab from './tabs/ClimateTab';
import RiskTab from './tabs/RiskTab';
import MultispectralTab from './tabs/MultispectralTab';
interface AnalysisContentProps {
  activeTab: AnalysisTab;
  tabs: TabDefinition[];
  analysisData: AnalysisData;
}

// Componente de placeholder para abas não implementadas
const PlaceholderTab = ({ tabName }: { tabName: string }) => (
  <div className="space-y-6">
    <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-200 h-64 flex items-center justify-center">
      <p className="text-slate-500">
        {tabName} - Em desenvolvimento
      </p>
    </div>
  </div>
);

export default function AnalysisContent({ activeTab, tabs, analysisData }: AnalysisContentProps) {
  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab analysisData={analysisData} />;
      
      case 'timeseries':
        return <TimeseriesTab analysisData={analysisData} />;
      
      case 'climate':
  return <ClimateTab analysisData={analysisData} />;
      case 'risk':
  return <RiskTab analysisData={analysisData} />;
      
      case 'multispectral':
  return <MultispectralTab analysisData={analysisData} />;
      
      case 'custom':
        return <PlaceholderTab tabName="🧪 Análises Personalizadas" />;
      
      case 'infrastructure':
        return <PlaceholderTab tabName="⚙️ Infraestrutura Técnica" />;
      
      default:
        return <PlaceholderTab tabName="Conteúdo" />;
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-lg">{activeTabData?.label}</h3>
            <p className="text-sm text-slate-500">
              {activeTab === "overview" && "Resumo dos indicadores principais para a zona selecionada"}
              {activeTab === "timeseries" && "Evolução dos dados ao longo do tempo"}
              {activeTab === "climate" && "Condições meteorológicas atuais e previsões"}
              {activeTab === "risk" && "Análise de riscos ambientais e alertas"}
              {activeTab === "multispectral" && "Análise avançada de imagens satelitais"}
              {activeTab === "custom" && "Crie análises personalizadas e relatórios"}
              {activeTab === "infrastructure" && "Monitoramento técnico do sistema"}
            </p>
          </div>
        </div>
      </div>

      {/* Conteúdo Dinâmico */}
      <div className="flex-1 overflow-y-auto p-6">
        {renderTabContent()}
      </div>
    </div>
  );
}