"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, MapPin, Clock, Leaf, Bell, Eye } from "lucide-react";
import { format, parseISO } from "date-fns";

export function AlertDetails({ selectedAlert }: any) {
  return (
    <Card className="shadow-2xl border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-red-50/80 to-orange-50/80 border-b py-3"><CardTitle className="text-lg flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-red-600" />Detalhes do Alerta</CardTitle></CardHeader>
      <CardContent className="p-4">
        {selectedAlert ? (
          <div className="space-y-4">
            <div><h3 className="font-bold text-lg">{selectedAlert.title}</h3><p className="text-sm text-gray-600 mt-1">{selectedAlert.description}</p></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-red-50 p-3 rounded-lg"><div className="flex items-center gap-2 text-sm mb-1"><MapPin size={16}/>Localização</div><div className="font-semibold text-red-700">{selectedAlert.region}</div></div>
              <div className="bg-orange-50 p-3 rounded-lg"><div className="flex items-center gap-2 text-sm mb-1"><Clock size={16}/>Data</div><div className="font-semibold text-orange-700">{format(parseISO(selectedAlert.date), "dd/MM/yyyy")}</div></div>
            </div>
            {selectedAlert.ndvi_value && <div className="bg-green-50 p-3 rounded-lg"><div className="flex items-center gap-2 text-sm mb-1"><Leaf size={16}/>NDVI Atual</div><div className="font-bold text-2xl text-green-700">{selectedAlert.ndvi_value.toFixed(3)}</div></div>}
            <div className="flex gap-2"><Button className="flex-1 bg-red-600 hover:bg-red-700"><Bell className="w-4 h-4 mr-2"/>Notificar Equipe</Button><Button variant="outline" className="border-red-200"><Eye className="w-4 h-4 mr-2"/>Investigar</Button></div>
          </div>
        ) : <div className="text-center text-gray-500 py-8"><AlertTriangle className="w-12 h-12 mx-auto text-gray-300 mb-4" /><p>Selecione um alerta para ver os detalhes.</p></div>}
      </CardContent>
    </Card>
  );
}