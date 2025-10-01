"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from 'lucide-react';

export function SystemStatus() {
  return (
    <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm mt-6">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100/50">
        <CardTitle className="flex items-center gap-3 text-lg font-bold text-gray-800">
          <CheckCircle2 className="w-5 h-5 text-blue-600" />
          Status do Sistema
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">Sincronização</span>
          <Badge className="bg-green-100 text-green-800 border-0">Ativa</Badge>
        </div>
        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">Armazenamento</span>
          <Badge className="bg-blue-100 text-blue-800 border-0">3.3GB/5GB</Badge>
        </div>
        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">Última Backup</span>
          <Badge variant="outline" className="border-amber-300 text-amber-700">Hoje 14:30</Badge>
        </div>
      </CardContent>
    </Card>
  );
}