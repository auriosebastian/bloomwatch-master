"use client";
import { Button } from "@/components/ui/button";
import { Settings, RotateCcw, Save } from 'lucide-react';

interface SettingsHeaderProps {
  onSave: () => void;
  onReset: () => void;
}

export function SettingsHeader({ onSave, onReset }: SettingsHeaderProps) {
  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <Settings className="w-6 h-6 text-white" />
              </div>
              Painel de Configurações
            </h1>
            <p className="text-lg text-gray-600">
              Personalize as configurações de monitoramento e preferências da aplicação
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Button variant="outline" className="gap-2 border-emerald-200 hover:bg-emerald-50 text-emerald-700 font-medium" onClick={onReset}>
              <RotateCcw className="w-4 h-4"/>
              Restaurar Padrões
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg text-white font-medium" onClick={onSave}>
              <Save className="w-4 h-4"/>
              Aplicar Alterações
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}