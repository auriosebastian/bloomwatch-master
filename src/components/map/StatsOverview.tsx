"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Thermometer, AlertTriangle } from "lucide-react";

export function StatsOverview({ stats }: any) {
  const statItems = [
    { icon: Leaf, value: stats.points, label: "Pontos Monitorados", color: "emerald" },
    { icon: Thermometer, value: stats.avgNdvi, label: "NDVI Médio", color: "blue" },
    { icon: AlertTriangle, value: stats.activeAlerts, label: "Alertas Ativos", color: "orange" },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 mt-6">
      {statItems.map((stat, index) => (
        <Card key={index} className={`bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 border-0 shadow-lg hover:shadow-xl transition-shadow`}>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
              <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
            </div>
            <div className={`w-12 h-12 bg-white/50 rounded-xl flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}