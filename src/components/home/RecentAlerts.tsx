"use client";
// src/components/home/RecentAlerts.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, Clock, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { createPageUrl } from "@/utils";

interface RecentAlertsProps {
  alerts: any[];
  isLoading: boolean;
}

type AlertSeverity = 'info' | 'warning' | 'danger' | 'critical';

const severityColors: Record<AlertSeverity, string> = {
  info: "bg-blue-100 text-blue-800 border-blue-200",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  danger: "bg-orange-100 text-orange-800 border-orange-200",
  critical: "bg-red-100 text-red-800 border-red-200"
};

const alertTypeLabels: Record<string, string> = {
  floracao_algas: "Floração de Algas",
  seca: "Seca",
  temperatura_extrema: "Temperatura Extrema",
  baixa_vegetacao: "Baixa Vegetação",
  risco_incendio: "Risco de Incêndio"
};

export default function RecentAlerts({ alerts, isLoading }: RecentAlertsProps) {
  if (isLoading) {
    return (
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const activeAlerts = alerts.filter(alert => alert.is_active).slice(0, 3);

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>Alertas Recentes</span>
          </div>
          {activeAlerts.length > 0 && (
            <Badge variant="secondary" className="bg-amber-100 text-amber-800">
              {activeAlerts.length} ativos
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeAlerts.map((alert, index) => (
            <div key={alert.id} 
                 className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-200 bg-white/60">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 line-clamp-2">
                      {alert.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {alert.description}
                    </p>
                  </div>
                  <Badge className={`${severityColors[alert.severity as AlertSeverity]} border font-medium ml-3`}>
                    {alert.severity}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{alert.region}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>Há 1 dia</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {alertTypeLabels[alert.alert_type] || alert.alert_type}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
          
          {activeAlerts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-sm">Nenhum alerta ativo no momento</p>
              <p className="text-xs text-gray-400 mt-1">Sistema monitorando normalmente</p>
            </div>
          )}
        </div>
        
        {activeAlerts.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            <Link href={createPageUrl("Alerts")}>
              <Button variant="outline" className="w-full group hover:bg-amber-50 hover:border-amber-200">
                Ver Todos os Alertas
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}