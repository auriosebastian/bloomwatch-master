"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layers, ZoomIn, ZoomOut, Maximize2, Filter, Navigation } from "lucide-react";

export function MapContainerCard({ children, zoomLevel, onZoomIn, onZoomOut, onToggleFullscreen }: any) {
  return (
    <Card className="shadow-2xl border-0 h-full flex flex-col">
      <CardHeader className="bg-gradient-to-r from-emerald-50/80 to-blue-50/80 border-b">
        <CardTitle className="flex items-center justify-between text-xl">
          <span className="flex items-center gap-3"><div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center"><Layers className="w-4 h-4 text-emerald-600" /></div>Visualização do Território</span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={onZoomOut}><ZoomOut className="w-4 h-4" /></Button>
            <Badge variant="outline" className="px-3 py-1 bg-white/80">Zoom: {zoomLevel}x</Badge>
            <Button size="sm" variant="outline" onClick={onZoomIn}><ZoomIn className="w-4 h-4" /></Button>
            <Button size="sm" variant="outline" onClick={onToggleFullscreen}><Maximize2 className="w-4 h-4" /></Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 relative">
        {children}
        {/* Legenda e outros overlays do mapa podem ser movidos para cá */}
        <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl z-[1000]">
          <h4 className="font-bold text-sm mb-3 flex items-center gap-2"><Filter className="w-4 h-4" />Legenda do Mapa</h4>
          {/* ... conteúdo da legenda ... */}
        </div>
        <div className="absolute top-6 right-6 z-[1000]">
          <Button size="sm" variant="outline" className="bg-white/90"><Navigation className="w-4 h-4" /></Button>
        </div>
      </CardContent>
    </Card>
  );
}