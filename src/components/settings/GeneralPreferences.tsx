"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Thermometer, Map, Calendar, BarChart3 } from 'lucide-react';

// Tipos para as props
type PreferenceState = {
  language: string; temperatureUnit: string; distanceUnit: string;
  timeFormat: string; theme: string; mapStyle: string; defaultView: string;
};
interface GeneralPreferencesProps {
  preferences: PreferenceState;
  onPreferenceChange: (key: keyof PreferenceState, value: string) => void;
}

export function GeneralPreferences({ preferences, onPreferenceChange }: GeneralPreferencesProps) {
  return (
    <Card id="preferences" className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100/50">
        <CardTitle className="flex items-center gap-3 text-xl text-gray-800"><Globe className="w-6 h-6 text-blue-600" />Preferências Gerais</CardTitle>
        <p className="text-sm text-gray-600 mt-1">Personalize a experiência de uso da aplicação</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-sm font-semibold flex items-center gap-2"><Globe className="w-4 h-4 text-blue-500" />Idioma</Label>
              <Select value={preferences.language} onValueChange={(value) => onPreferenceChange('language', value)}><SelectTrigger className="bg-white border-2 rounded-xl h-12"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="pt-BR">🇧🇷 Português (BR)</SelectItem><SelectItem value="en-US">🇺🇸 English (US)</SelectItem><SelectItem value="es-ES">🇪🇸 Español</SelectItem></SelectContent></Select>
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-semibold flex items-center gap-2"><Thermometer className="w-4 h-4 text-red-500" />Unidade de Temperatura</Label>
              <Select value={preferences.temperatureUnit} onValueChange={(value) => onPreferenceChange('temperatureUnit', value)}><SelectTrigger className="bg-white border-2 rounded-xl h-12"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="celsius">Celsius (°C)</SelectItem><SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem></SelectContent></Select>
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-semibold flex items-center gap-2"><Map className="w-4 h-4 text-green-500" />Estilo do Mapa</Label>
              <Select value={preferences.mapStyle} onValueChange={(value) => onPreferenceChange('mapStyle', value)}><SelectTrigger className="bg-white border-2 rounded-xl h-12"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="satellite">Satélite</SelectItem><SelectItem value="terrain">Terreno</SelectItem><SelectItem value="streets">Ruas</SelectItem><SelectItem value="light">Claro</SelectItem></SelectContent></Select>
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-sm font-semibold flex items-center gap-2"><Map className="w-4 h-4 text-purple-500" />Unidade de Distância</Label>
              <Select value={preferences.distanceUnit} onValueChange={(value) => onPreferenceChange('distanceUnit', value)}><SelectTrigger className="bg-white border-2 rounded-xl h-12"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="kilometers">Quilômetros (km)</SelectItem><SelectItem value="miles">Milhas (mi)</SelectItem></SelectContent></Select>
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-semibold flex items-center gap-2"><Calendar className="w-4 h-4 text-amber-500" />Formato de Hora</Label>
              <Select value={preferences.timeFormat} onValueChange={(value) => onPreferenceChange('timeFormat', value)}><SelectTrigger className="bg-white border-2 rounded-xl h-12"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="24h">24 horas</SelectItem><SelectItem value="12h">12 horas (AM/PM)</SelectItem></SelectContent></Select>
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-semibold flex items-center gap-2"><BarChart3 className="w-4 h-4 text-blue-500" />Visualização Padrão</Label>
              <Select value={preferences.defaultView} onValueChange={(value) => onPreferenceChange('defaultView', value)}><SelectTrigger className="bg-white border-2 rounded-xl h-12"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="overview">Visão Geral</SelectItem><SelectItem value="alerts">Alertas</SelectItem><SelectItem value="climate">Clima</SelectItem><SelectItem value="vegetation">Vegetação</SelectItem></SelectContent></Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}