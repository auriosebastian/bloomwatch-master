"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ElementType } from "react";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-bold text-gray-800">{new Date(label).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'short' })}</p>
        <p style={{ color: payload[0].stroke }}>{`${payload[0].name}: ${payload[0].value}${payload[0].unit || ''}`}</p>
      </div>
    );
  }
  return null;
};

interface ClimateChartProps {
  data: any[];
  config: { label: string; unit: string; color: string; icon: ElementType };
  dataType: string;
  region: string;
}

export function ClimateChart({ data, config, dataType, region }: ClimateChartProps) {
  const Icon = config.icon;
  return (
    <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader><CardTitle className="flex items-center gap-3 text-xl"><Icon className="w-6 h-6" style={{color: config.color}}/>Evolução de {config.label} em {region}</CardTitle></CardHeader>
      <CardContent>
        <div className="h-80 w-full animate-in fade-in-50 duration-500">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit'})} fontSize={12} dy={5} />
              <YAxis domain={dataType === 'ndvi' ? [0, 1] : ['auto', 'auto']} unit={config.unit} fontSize={12} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: config.color, strokeWidth: 1, strokeDasharray: '3 3' }} />
              <Legend />
              <Line type="monotone" dataKey={dataType} name={config.label} stroke={config.color} strokeWidth={3} dot={{ r: 0 }} activeDot={{ r: 6 }} unit={config.unit}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}