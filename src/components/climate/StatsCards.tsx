"use client";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatsCardsProps {
  stats: { avg: string | number; max: string | number; min: string | number; };
  unit: string;
}

export function StatsCards({ stats, unit }: StatsCardsProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow"><CardContent className="p-4 flex items-center gap-4"><div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center"><Minus className="h-6 w-6 text-blue-600"/></div><div><p className="text-sm text-gray-500">Média</p><p className="text-2xl font-bold text-gray-800">{stats.avg} {unit}</p></div></CardContent></Card>
      <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow"><CardContent className="p-4 flex items-center gap-4"><div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center"><TrendingUp className="h-6 w-6 text-red-600"/></div><div><p className="text-sm text-gray-500">Máxima</p><p className="text-2xl font-bold text-red-600">{stats.max} {unit}</p></div></CardContent></Card>
      <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow"><CardContent className="p-4 flex items-center gap-4"><div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center"><TrendingDown className="h-6 w-6 text-cyan-600"/></div><div><p className="text-sm text-gray-500">Mínima</p><p className="text-2xl font-bold text-cyan-600">{stats.min} {unit}</p></div></CardContent></Card>
    </div>
  );
}