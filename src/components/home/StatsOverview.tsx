"use client";
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Leaf, AlertTriangle, Thermometer, Droplets } from "lucide-react";

interface StatsOverviewProps {
  vegetationData: any[];
  alerts: any[];
  isLoading: boolean;
}

export default function StatsOverview({ vegetationData, alerts, isLoading }: StatsOverviewProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array(4).fill(0).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const totalRegions = [...new Set(vegetationData.map(item => item.region))].length;
  const activeAlerts = alerts.filter(alert => alert.is_active).length;
  const avgTemperature = vegetationData.length > 0 
    ? (vegetationData.reduce((sum, item) => sum + (item.temperature || 0), 0) / vegetationData.length).toFixed(1)
    : 0;
  const avgMoisture = vegetationData.length > 0
    ? (vegetationData.reduce((sum, item) => sum + (item.soil_moisture || 0), 0) / vegetationData.length).toFixed(1)
    : 0;

  const stats = [
    {
      title: "Regiões Monitoradas",
      value: totalRegions,
      icon: Leaf,
      description: "Áreas ativas",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Alertas Ativos", 
      value: activeAlerts,
      icon: AlertTriangle,
      description: "Requerem atenção",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      title: "Temperatura Média",
      value: `${avgTemperature}°C`,
      icon: Thermometer,
      description: "Última semana",
      color: "text-red-600", 
      bgColor: "bg-red-50",
    },
    {
      title: "Umidade do Solo",
      value: `${avgMoisture}%`,
      icon: Droplets,
      description: "Condições atuais",
      color: "text-blue-600",
      bgColor: "bg-blue-50", 
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className={`absolute inset-0 ${stat.bgColor} opacity-20`}></div>
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                <div className="text-sm font-medium text-gray-900">{stat.title}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.description}</div>
              </div>
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}