"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Bell, 
  Download, 
  Upload, 
  Shield, 
  User, 
  Globe,
  Mail,
  Smartphone,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Users,
  Code,
  Calendar,
  Map,
  BarChart3,
  Thermometer,
  Droplets,
  AlertTriangle,
  Zap,
  RefreshCw,
  Database,
  FileText
} from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: false,
    criticalAlerts: true,
    weeklyReports: true,
    systemUpdates: false,
    vegetationAlerts: true,
    temperatureAlerts: false,
    moistureAlerts: true
  });

  const [preferences, setPreferences] = useState({
    language: 'pt-BR',
    temperatureUnit: 'celsius',
    distanceUnit: 'kilometers',
    timeFormat: '24h',
    theme: 'auto',
    mapStyle: 'satellite',
    defaultView: 'overview'
  });

  const [dataSettings, setDataSettings] = useState({
    autoRefresh: true,
    dataRetention: '30days',
    exportFormat: 'csv',
    highResolution: false,
    realTimeData: true,
    historicalData: false,
    compression: true
  });

  const [appInfo, setAppInfo] = useState({
    version: '2.1.0',
    team: 'NASA Space Apps 2025 - Grupo Galactus X',
    lastUpdate: '01/12/2024',
    region: 'África Austral',
    status: 'stable'
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePreferenceChange = (key: keyof typeof preferences, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDataSettingChange = (key: keyof typeof dataSettings, value: any) => {
    setDataSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    console.log('Configurações salvas:', { notifications, preferences, dataSettings, appInfo });
    alert('Configurações aplicadas com sucesso!');
  };

  const handleResetSettings = () => {
    setNotifications({
      emailAlerts: true,
      pushNotifications: false,
      criticalAlerts: true,
      weeklyReports: true,
      systemUpdates: false,
      vegetationAlerts: true,
      temperatureAlerts: false,
      moistureAlerts: true
    });
    setPreferences({
      language: 'pt-BR',
      temperatureUnit: 'celsius',
      distanceUnit: 'kilometers',
      timeFormat: '24h',
      theme: 'auto',
      mapStyle: 'satellite',
      defaultView: 'overview'
    });
    setDataSettings({
      autoRefresh: true,
      dataRetention: '30days',
      exportFormat: 'csv',
      highResolution: false,
      realTimeData: true,
      historicalData: false,
      compression: true
    });
  };

  // Dados da equipe Galactus X
  const teamMembers = [
    { name: "Aurio Sebastião", role: "Desenvolvedor Frontend", avatar: "AS", color: "from-blue-400 to-cyan-400" },
    { name: "Americo Andre", role: "Especialista GIS", avatar: "AA", color: "from-emerald-400 to-green-400" },
    { name: "Francisco André", role: "Cientista de Dados", avatar: "FA", color: "from-purple-400 to-pink-400" },
    { name: "Jaime Francisco", role: "Desenvolvedor Backend", avatar: "JF", color: "from-orange-400 to-red-400" },
    { name: "Lirio João", role: "Designer UX/UI", avatar: "LJ", color: "from-yellow-400 to-amber-400" },
    { name: "Rayssa Rodrigues", role: "Product Manager", avatar: "RR", color: "from-indigo-400 to-blue-400" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 to-blue-50">
      {/* Header */}
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
              <Button 
                variant="outline" 
                className="gap-2 border-emerald-200 hover:bg-emerald-50 text-emerald-700 font-medium"
                onClick={handleResetSettings}
              >
                <RotateCcw className="w-4 h-4"/>
                Restaurar Padrões
              </Button>
              <Button 
                className="gap-2 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg text-white font-medium"
                onClick={handleSaveSettings}
              >
                <Save className="w-4 h-4"/>
                Aplicar Alterações
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-6">
        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Coluna Esquerda - Navegação Rápida */}
          <div className="lg:col-span-1">
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50 border-b border-emerald-100/50">
                <CardTitle className="flex items-center gap-3 text-lg font-bold text-gray-800">
                  <Map className="w-5 h-5 text-emerald-600" />
                  Navegação Rápida
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {[
                  { id: 'notifications', icon: Bell, label: 'Notificações', badge: '8' },
                  { id: 'preferences', icon: Globe, label: 'Preferências', badge: '' },
                  { id: 'data', icon: Database, label: 'Gerenciamento', badge: 'New' },
                  { id: 'app-info', icon: Users, label: 'Nossa Equipe', badge: '' },
                ].map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className="w-full justify-start hover:bg-gradient-to-r hover:from-emerald-50 hover:to-blue-50 hover:text-emerald-700 transition-all duration-300 text-left h-12 px-3 rounded-lg group"
                    onClick={() => {
                      const element = document.getElementById(item.id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-lg flex items-center justify-center group-hover:from-emerald-200 group-hover:to-blue-200 transition-colors">
                        <item.icon className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="flex-1 font-medium">{item.label}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-xs border-0">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Status do Sistema */}
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm mt-6">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100/50">
                <CardTitle className="flex items-center gap-3 text-lg font-bold text-gray-800">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  Status do Sistema
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Sincronização</span>
                  <Badge className="bg-green-100 text-green-800 border-0">Ativa</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Armazenamento</span>
                  <Badge className="bg-blue-100 text-blue-800 border-0">3.3GB/5GB</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Última Backup</span>
                  <Badge variant="outline" className="border-amber-300 text-amber-700">Hoje 14:30</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coluna Direita - Conteúdo Principal */}
          <div className="lg:col-span-3 space-y-8">
            {/* Notificações - Design Melhorado */}
            <Card id="notifications" className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-100/50">
                <CardTitle className="flex items-center gap-3 text-xl text-gray-800">
                  <Bell className="w-6 h-6 text-emerald-600" />
                  Configurações de Notificação
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Gerencie como você deseja receber alertas e atualizações do sistema
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Coluna 1 */}
                  <div className="space-y-4">
                    {[
                      { key: 'emailAlerts', label: '📧 Alertas por Email', description: 'Notificações importantes por email', icon: Mail },
                      { key: 'pushNotifications', label: '📱 Notificações Push', description: 'Alertas em tempo real', icon: Smartphone },
                      { key: 'criticalAlerts', label: '🚨 Alertas Críticos', description: 'Sempre notificar riscos', icon: AlertTriangle },
                      { key: 'vegetationAlerts', label: '🌿 Alertas Vegetação', description: 'Mudanças no NDVI', icon: AlertCircle },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 border border-emerald-100 rounded-xl bg-gradient-to-r from-white to-emerald-50/50 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg flex items-center justify-center">
                            <item.icon className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div className="flex-1">
                            <Label htmlFor={item.key} className="text-sm font-semibold text-gray-900 cursor-pointer block">
                              {item.label}
                            </Label>
                            <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                          </div>
                        </div>
                        <Switch
                          id={item.key}
                          checked={notifications[item.key as keyof typeof notifications]}
                          onCheckedChange={() => handleNotificationChange(item.key as keyof typeof notifications)}
                          className="data-[state=checked]:bg-emerald-600 data-[state=unchecked]:bg-gray-300"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Coluna 2 */}
                  <div className="space-y-4">
                    {[
                      { key: 'weeklyReports', label: '📊 Relatórios Semanais', description: 'Resumo semanal automático', icon: FileText },
                      { key: 'systemUpdates', label: '⚡ Atualizações', description: 'Novas funcionalidades', icon: Zap },
                      { key: 'temperatureAlerts', label: '🌡️ Alertas Temperatura', description: 'Temperaturas extremas', icon: Thermometer },
                      { key: 'moistureAlerts', label: '💧 Alertas Umidade', description: 'Níveis de umidade', icon: Droplets },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 border border-emerald-100 rounded-xl bg-gradient-to-r from-white to-emerald-50/50 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg flex items-center justify-center">
                            <item.icon className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div className="flex-1">
                            <Label htmlFor={item.key} className="text-sm font-semibold text-gray-900 cursor-pointer block">
                              {item.label}
                            </Label>
                            <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                          </div>
                        </div>
                        <Switch
                          id={item.key}
                          checked={notifications[item.key as keyof typeof notifications]}
                          onCheckedChange={() => handleNotificationChange(item.key as keyof typeof notifications)}
                          className="data-[state=checked]:bg-emerald-600 data-[state=unchecked]:bg-gray-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preferências Gerais - Design Suave */}
            <Card id="preferences" className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100/50">
                <CardTitle className="flex items-center gap-3 text-xl text-gray-800">
                  <Globe className="w-6 h-6 text-blue-600" />
                  Preferências Gerais
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Personalize a experiência de uso da aplicação
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Coluna 1 */}
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="language" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Globe className="w-4 h-4 text-blue-500" />
                        Idioma
                      </Label>
                      <Select value={preferences.language} onValueChange={(value) => handlePreferenceChange('language', value)}>
                        <SelectTrigger className="bg-white border-2 border-gray-200 rounded-xl h-12 hover:border-blue-300 transition-colors">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pt-BR">🇧🇷 Português (BR)</SelectItem>
                          <SelectItem value="en-US">🇺🇸 English (US)</SelectItem>
                          <SelectItem value="es-ES">🇪🇸 Español</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="temperatureUnit" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-red-500" />
                        Unidade de Temperatura
                      </Label>
                      <Select value={preferences.temperatureUnit} onValueChange={(value) => handlePreferenceChange('temperatureUnit', value)}>
                        <SelectTrigger className="bg-white border-2 border-gray-200 rounded-xl h-12 hover:border-blue-300 transition-colors">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="celsius">Celsius (°C)</SelectItem>
                          <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="mapStyle" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Map className="w-4 h-4 text-green-500" />
                        Estilo do Mapa
                      </Label>
                      <Select value={preferences.mapStyle} onValueChange={(value) => handlePreferenceChange('mapStyle', value)}>
                        <SelectTrigger className="bg-white border-2 border-gray-200 rounded-xl h-12 hover:border-blue-300 transition-colors">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="satellite">Satélite</SelectItem>
                          <SelectItem value="terrain">Terreno</SelectItem>
                          <SelectItem value="streets">Ruas</SelectItem>
                          <SelectItem value="light">Claro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Coluna 2 */}
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="distanceUnit" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Map className="w-4 h-4 text-purple-500" />
                        Unidade de Distância
                      </Label>
                      <Select value={preferences.distanceUnit} onValueChange={(value) => handlePreferenceChange('distanceUnit', value)}>
                        <SelectTrigger className="bg-white border-2 border-gray-200 rounded-xl h-12 hover:border-blue-300 transition-colors">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kilometers">Quilômetros (km)</SelectItem>
                          <SelectItem value="miles">Milhas (mi)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="timeFormat" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-amber-500" />
                        Formato de Hora
                      </Label>
                      <Select value={preferences.timeFormat} onValueChange={(value) => handlePreferenceChange('timeFormat', value)}>
                        <SelectTrigger className="bg-white border-2 border-gray-200 rounded-xl h-12 hover:border-blue-300 transition-colors">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="24h">24 horas</SelectItem>
                          <SelectItem value="12h">12 horas (AM/PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="defaultView" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-blue-500" />
                        Visualização Padrão
                      </Label>
                      <Select value={preferences.defaultView} onValueChange={(value) => handlePreferenceChange('defaultView', value)}>
                        <SelectTrigger className="bg-white border-2 border-gray-200 rounded-xl h-12 hover:border-blue-300 transition-colors">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="overview">Visão Geral</SelectItem>
                          <SelectItem value="alerts">Alertas</SelectItem>
                          <SelectItem value="climate">Clima</SelectItem>
                          <SelectItem value="vegetation">Vegetação</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gerenciamento de Dados - Design Melhorado */}
            <Card id="data" className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100/50">
                <CardTitle className="flex items-center gap-3 text-xl text-gray-800">
                  <Database className="w-6 h-6 text-purple-600" />
                  Gerenciamento de Dados
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Configurações de exportação, armazenamento e qualidade dos dados
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Coluna 1 */}
                  <div className="space-y-6">
                    {[
                      { key: 'autoRefresh', label: '🔄 Atualização Automática', description: 'Dados em tempo real', icon: RefreshCw },
                      { key: 'realTimeData', label: '⚡ Dados Tempo Real', description: 'Atualizações instantâneas', icon: Zap },
                      { key: 'compression', label: '📦 Compressão', description: 'Otimizar armazenamento', icon: Database },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 border border-purple-100 rounded-xl bg-gradient-to-r from-white to-purple-50/50 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                            <item.icon className="w-5 h-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <Label htmlFor={item.key} className="text-sm font-semibold text-gray-900 cursor-pointer block">
                              {item.label}
                            </Label>
                            <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                          </div>
                        </div>
                        <Switch
                          id={item.key}
                          checked={dataSettings[item.key as keyof typeof dataSettings]}
                          onCheckedChange={(checked) => handleDataSettingChange(item.key as keyof typeof dataSettings, checked)}
                          className="data-[state=checked]:bg-purple-600 data-[state=unchecked]:bg-gray-300"
                        />
                      </div>
                    ))}

                    <div className="space-y-3">
                      <Label htmlFor="dataRetention" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-purple-500" />
                        Retenção de Dados
                      </Label>
                      <Select value={dataSettings.dataRetention} onValueChange={(value) => handleDataSettingChange('dataRetention', value)}>
                        <SelectTrigger className="bg-white border-2 border-gray-200 rounded-xl h-12 hover:border-purple-300 transition-colors">
                          <SelectValue />
                        </SelectTrigger>
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
                    {[
                      { key: 'highResolution', label: '🖼️ Alta Resolução', description: 'Imagens detalhadas', icon: BarChart3 },
                      { key: 'historicalData', label: '📊 Dados Históricos', description: 'Acesso ao histórico', icon: Database },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 border border-purple-100 rounded-xl bg-gradient-to-r from-white to-purple-50/50 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                            <item.icon className="w-5 h-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <Label htmlFor={item.key} className="text-sm font-semibold text-gray-900 cursor-pointer block">
                              {item.label}
                            </Label>
                            <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                          </div>
                        </div>
                        <Switch
                          id={item.key}
                          checked={dataSettings[item.key as keyof typeof dataSettings]}
                          onCheckedChange={(checked) => handleDataSettingChange(item.key as keyof typeof dataSettings, checked)}
                          className="data-[state=checked]:bg-purple-600 data-[state=unchecked]:bg-gray-300"
                        />
                      </div>
                    ))}

                    <div className="space-y-3">
                      <Label htmlFor="exportFormat" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Download className="w-4 h-4 text-purple-500" />
                        Formato de Exportação
                      </Label>
                      <Select value={dataSettings.exportFormat} onValueChange={(value) => handleDataSettingChange('exportFormat', value)}>
                        <SelectTrigger className="bg-white border-2 border-gray-200 rounded-xl h-12 hover:border-purple-300 transition-colors">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="csv">CSV</SelectItem>
                          <SelectItem value="json">JSON</SelectItem>
                          <SelectItem value="excel">Excel</SelectItem>
                          <SelectItem value="pdf">PDF</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button variant="outline" className="gap-2 border-purple-200 hover:bg-purple-50 text-purple-700 flex-1">
                        <Upload className="w-4 h-4"/>
                        Importar
                      </Button>
                      <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex-1">
                        <Download className="w-4 h-4"/>
                        Exportar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nossa Equipe - Grupo Galactus X */}
            <Card id="app-info" className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100/50">
                <CardTitle className="flex items-center gap-3 text-xl text-gray-800">
                  <Users className="w-6 h-6 text-amber-600" />
                  Nossa Equipe - Grupo Galactus X
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Conheça a equipe por trás do projeto BloomWatch
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Informações do App */}
                  <div className="space-y-6">
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2 text-lg">
                      <Code className="w-5 h-5 text-blue-600" />
                      Sobre o Projeto
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                        <span className="text-sm font-medium text-gray-700">Versão</span>
                        <Badge className="bg-blue-100 text-blue-800 border-0 font-mono">{appInfo.version}</Badge>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                        <span className="text-sm font-medium text-gray-700">Equipe</span>
                        <span className="text-sm text-gray-600 text-right">{appInfo.team}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
                        <span className="text-sm font-medium text-gray-700">Última Atualização</span>
                        <span className="text-sm text-gray-600">{appInfo.lastUpdate}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl">
                        <span className="text-sm font-medium text-gray-700">Região Monitorada</span>
                        <span className="text-sm text-gray-600">{appInfo.region}</span>
                      </div>
                    </div>
                  </div>

                  {/* Foto da Equipe */}
                  <div className="space-y-6">
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2 text-lg">
                      <Users className="w-5 h-5 text-purple-600" />
                      Membros da Equipe
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {teamMembers.map((member, index) => (
                        <div key={index} className="text-center p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                          <div className={`w-12 h-12 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-3 shadow-md`}>
                            {member.avatar}
                          </div>
                          <div className="font-semibold text-gray-800 text-sm leading-tight">{member.name}</div>
                          <div className="text-xs text-gray-600 mt-1 leading-tight">{member.role}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}