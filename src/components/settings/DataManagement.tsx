"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Database, RefreshCw, Zap, Calendar, Download, Upload, BarChart3 } from 'lucide-react';

// Tipos para as props
type DataSettingsState = {
  autoRefresh: boolean; dataRetention: string; exportFormat: string;
  highResolution: boolean; realTimeData: boolean; historicalData: boolean; compression: boolean;
};
interface DataManagementProps {
  dataSettings: DataSettingsState;
  onDataSettingChange: (key: keyof DataSettingsState, value: any) => void;
}

// Separando os itens: os que usam Switch (boolean) e os que usam Select (string)
const switchItems = [
    { key: 'autoRefresh', label: '🔄 Atualização Automática', description: 'Dados em tempo real', icon: RefreshCw },
    { key: 'realTimeData', label: '⚡ Dados Tempo Real', description: 'Atualizações instantâneas', icon: Zap },
    { key: 'compression', label: '📦 Compressão', description: 'Otimizar armazenamento', icon: Database },
    { key: 'highResolution', label: '🖼️ Alta Resolução', description: 'Imagens detalhadas', icon: BarChart3 },
    { key: 'historicalData', label: '📊 Dados Históricos', description: 'Acesso ao histórico', icon: Database },
];

export function DataManagement({ dataSettings, onDataSettingChange }: DataManagementProps) {
  return (
    <Card id="data" className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100/50">
        <CardTitle className="flex items-center gap-3 text-xl text-gray-800"><Database className="w-6 h-6 text-purple-600" />Gerenciamento de Dados</CardTitle>
        <p className="text-sm text-gray-600 mt-1">Configurações de exportação, armazenamento e qualidade dos dados</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Coluna 1 */}
          <div className="space-y-6">
            {/* Renderiza apenas os 3 primeiros itens da lista de switches */}
            {switchItems.slice(0, 3).map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4 border border-purple-100 rounded-xl bg-gradient-to-r from-white to-purple-50/50 hover:shadow-md transition-all">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center"><item.icon className="w-5 h-5 text-purple-600" /></div>
                  <div>
                    <Label htmlFor={item.key} className="text-sm font-semibold cursor-pointer">{item.label}</Label>
                    <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                  </div>
                </div>
                <Switch 
                  id={item.key} 
                  checked={dataSettings[item.key as keyof Omit<DataSettingsState, 'dataRetention' | 'exportFormat'>]} 
                  onCheckedChange={(checked) => onDataSettingChange(item.key as keyof DataSettingsState, checked)} 
                  className="data-[state=checked]:bg-purple-600" 
                />
              </div>
            ))}
            <div className="space-y-3">
              <Label htmlFor="dataRetention" className="text-sm font-semibold text-gray-700 flex items-center gap-2"><Calendar className="w-4 h-4 text-purple-500" />Retenção de Dados</Label>
              <Select value={dataSettings.dataRetention} onValueChange={(value) => onDataSettingChange('dataRetention', value)}>
                <SelectTrigger className="bg-white border-2 border-gray-200 rounded-xl h-12 hover:border-purple-300"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">7 dias</SelectItem>
                  <SelectItem value="30days">30 dias</SelectItem>
                  <SelectItem value="90days">90 dias</SelectItem>
                  <SelectItem value="1year">1 ano</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Coluna 2 */}
          <div className="space-y-6">
            {/* Renderiza os 2 últimos itens da lista de switches */}
            {switchItems.slice(3).map((item) => (
               <div key={item.key} className="flex items-center justify-between p-4 border border-purple-100 rounded-xl bg-gradient-to-r from-white to-purple-50/50 hover:shadow-md transition-all">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center"><item.icon className="w-5 h-5 text-purple-600" /></div>
                  <div>
                    <Label htmlFor={item.key} className="text-sm font-semibold cursor-pointer">{item.label}</Label>
                    <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                  </div>
                </div>
                <Switch 
                  id={item.key} 
                  checked={dataSettings[item.key as keyof Omit<DataSettingsState, 'dataRetention' | 'exportFormat'>]} 
                  onCheckedChange={(checked) => onDataSettingChange(item.key as keyof DataSettingsState, checked)} 
                  className="data-[state=checked]:bg-purple-600" 
                />
              </div>
            ))}
            <div className="space-y-3">
              <Label htmlFor="exportFormat" className="text-sm font-semibold text-gray-700 flex items-center gap-2"><Download className="w-4 h-4 text-purple-500" />Formato de Exportação</Label>
              <Select value={dataSettings.exportFormat} onValueChange={(value) => onDataSettingChange('exportFormat', value)}>
                <SelectTrigger className="bg-white border-2 border-gray-200 rounded-xl h-12 hover:border-purple-300"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="gap-2 border-purple-200 hover:bg-purple-50 text-purple-700 flex-1"><Upload className="w-4 h-4"/>Importar</Button>
              <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white flex-1"><Download className="w-4 h-4"/>Exportar</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}