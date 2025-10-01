"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Droplets, CloudRain, Leaf, AlertTriangle, BarChart3 } from 'lucide-react';

export function DataTable({ data, riskConfig }: { data: any[], riskConfig: any }) {
  return (
    <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 size={18} /> Dados Detalhados</CardTitle></CardHeader>
      <CardContent>
        <div className="max-h-[400px] overflow-y-auto relative">
          <div className="grid grid-cols-6 gap-4 px-4 py-2 text-xs font-bold text-gray-600 bg-gray-100 rounded-t-lg sticky top-0 z-10">
            <div>Data</div>
            <div className="text-right flex items-center justify-end gap-1"><Thermometer size={12}/>Temp.</div>
            <div className="text-right flex items-center justify-end gap-1"><Droplets size={12}/>Umidade</div>
            <div className="text-right flex items-center justify-end gap-1"><CloudRain size={12}/>Chuva</div>
            <div className="text-right flex items-center justify-end gap-1"><Leaf size={12}/>NDVI</div>
            <div className="text-center flex items-center justify-center gap-1"><AlertTriangle size={12}/>Risco</div>
          </div>
          <div className="divide-y divide-gray-100">
            {data.slice().reverse().map((record: any) => (
              <div key={record.date} className="grid grid-cols-6 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors items-center">
                <div className="font-medium text-gray-800">{new Date(record.date).toLocaleDateString('pt-BR')}</div>
                <div className="text-right font-mono text-red-600">{record.temperature.toFixed(1)}°C</div>
                <div className="text-right font-mono text-blue-600">{record.soil_moisture.toFixed(1)}%</div>
                <div className="text-right font-mono text-green-600">{record.precipitation.toFixed(1)} mm</div>
                <div className="text-right font-mono text-lime-600">{record.ndvi.toFixed(3)}</div>
                <div className="text-center"><Badge className={`border-0 text-xs ${riskConfig[record.risk_level].color}`}>{riskConfig[record.risk_level].label}</Badge></div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}