"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Leaf, AlertTriangle } from "lucide-react";

interface RegionStatusProps {
  vegetationData: any[];
  isLoading: boolean;
}

// Defina o tipo para as cores de risco
type RiskLevel = 'baixo' | 'medio' | 'alto' | 'critico';

const riskColors: Record<RiskLevel, string> = {
  baixo: "bg-green-100 text-green-800 border-green-200",
  medio: "bg-yellow-100 text-yellow-800 border-yellow-200", 
  alto: "bg-orange-100 text-orange-800 border-orange-200",
  critico: "bg-red-100 text-red-800 border-red-200"
};

// Interface para os dados da região
interface RegionData {
  region: string;
  vegetation: string;
  points: number;
  ndvi: number;
  temperature: number;
  moisture: number;
  risk: RiskLevel;
}

export default function RegionStatus({ vegetationData, isLoading }: RegionStatusProps) {
  if (isLoading) {
    return (
      <Card className="shadow-lg border-0">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(6).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const regionData: RegionData[] = [
    {
      region: "Costa da Namíbia",
      vegetation: "Veg. Desértica",
      points: 2,
      ndvi: 0.14,
      temperature: 30,
      moisture: 6,
      risk: "critico"
    },
    {
      region: "Cunene, Angola", 
      vegetation: "Savana",
      points: 2,
      ndvi: 0.43,
      temperature: 34,
      moisture: 19,
      risk: "alto"
    },
    {
      region: "Costa da Namíbia - Sul",
      vegetation: "Veg. Desértica", 
      points: 1,
      ndvi: 0.18,
      temperature: 38,
      moisture: 6,
      risk: "critico"
    },
    {
      region: "Delta do Okavango",
      vegetation: "Floresta",
      points: 1, 
      ndvi: 0.78,
      temperature: 25,
      moisture: 82,
      risk: "baixo"
    },
    {
      region: "Cunene - Oshakati",
      vegetation: "Agricultura",
      points: 1,
      ndvi: 0.52,
      temperature: 26, 
      moisture: 45,
      risk: "medio"
    },
    {
      region: "Cunene - Ruacana",
      vegetation: "Savana",
      points: 1,
      ndvi: 0.28,
      temperature: 35,
      moisture: 12,
      risk: "alto"
    }
  ];

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-emerald-600" />
          <span>Status por Região</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {regionData.map((region, index) => (
            <div key={index} 
                 className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-200 bg-white/60 hover:scale-[1.02] group">
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
                  {region.region.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">{region.region}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                    <Leaf className="w-3 h-3" />
                    <span>{region.vegetation}</span>
                    <span>•</span>
                    <span>{region.points} pontos</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    NDVI: {region.ndvi}
                  </div>
                  <div className="text-xs text-gray-500">
                    {region.temperature}°C • {region.moisture}%
                  </div>
                </div>
                <Badge className={`${riskColors[region.risk]} border font-medium group-hover:scale-105 transition-transform`}>
                  {region.risk}
                </Badge>
                {region.risk === 'critico' && (
                  <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}