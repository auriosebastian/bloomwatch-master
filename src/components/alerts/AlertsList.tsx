"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, MapPin, Calendar, Eye, AlertTriangle } from "lucide-react";
import { format, parseISO } from "date-fns";

// ... (Definições de constantes como severityColors, etc., podem ser movidas para um arquivo utils)

export function AlertsList({ isLoading, filteredAlerts, selectedAlert, setSelectedAlert, severityColors, severityIcons, typeIcons, statusIcons }: any) {
  if (isLoading) {
    return (
      <Card className="shadow-2xl border-0"><CardContent className="p-8">Carregando alertas...</CardContent></Card>
    );
  }

  if (filteredAlerts.length === 0) {
    return (
      <Card className="shadow-2xl border-0"><CardContent className="p-8 text-center text-gray-500"><AlertTriangle className="w-12 h-12 mx-auto text-gray-300 mb-4" /><p>Nenhum alerta encontrado.</p></CardContent></Card>
    );
  }

  return (
    <Card className="shadow-2xl border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-red-50/80 to-orange-50/80 border-b">
        <CardTitle className="flex items-center justify-between text-xl">
            <span className="flex items-center gap-3"><div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center"><Bell className="w-4 h-4 text-red-600" /></div>Alertas Ativos ({filteredAlerts.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">
          {filteredAlerts.map((alert: any) => (
            <div key={alert.id} className={`p-4 border-b last:border-0 cursor-pointer ${selectedAlert?.id === alert.id ? 'bg-red-50 border-l-4 border-red-500' : 'hover:bg-gray-50'}`} onClick={() => setSelectedAlert(alert)}>
                <div className="flex items-center gap-2 mb-1"><span className="text-lg">{typeIcons[alert.type]}</span><h3 className="font-semibold">{alert.title}</h3><Badge className={`${severityColors[alert.severity]} border-0 text-xs`}>{severityIcons[alert.severity]} {alert.severity}</Badge></div>
                <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500"><span className="flex items-center gap-1"><MapPin size={12}/>{alert.region}</span><span className="flex items-center gap-1"><Calendar size={12}/>{format(parseISO(alert.date), "dd/MM/yyyy")}</span><span className="flex items-center gap-1">{statusIcons[alert.status]} {alert.status}</span></div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}