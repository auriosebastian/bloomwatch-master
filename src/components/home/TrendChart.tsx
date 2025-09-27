"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, Calendar } from "lucide-react";

interface TrendChartProps {
  vegetationData: any[];
  isLoading: boolean;
}

export default function TrendChart({ vegetationData, isLoading }: TrendChartProps) {
  if (isLoading) {
    return (
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          <span>Tendências NDVI - Últimas 2 Semanas</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Gráfico NDVI será implementado com Recharts</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-600">0.287</div>
            <div className="text-xs text-gray-500">NDVI Atual</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-600">26.4°C</div>
            <div className="text-xs text-gray-500">Temperatura</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">36.1%</div>
            <div className="text-xs text-gray-500">Umidade</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}