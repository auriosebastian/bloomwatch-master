"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Map, Bell, Globe, Database, Users } from 'lucide-react';

const navItems = [
  { id: 'notifications', icon: Bell, label: 'Notificações', badge: '8' },
  { id: 'preferences', icon: Globe, label: 'Preferências', badge: '' },
  { id: 'data', icon: Database, label: 'Gerenciamento', badge: 'New' },
  { id: 'app-info', icon: Users, label: 'Nossa Equipe', badge: '' },
];

export function QuickNav() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm sticky top-24">
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50 border-b border-emerald-100/50">
        <CardTitle className="flex items-center gap-3 text-lg font-bold text-gray-800">
          <Map className="w-5 h-5 text-emerald-600" />
          Navegação Rápida
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        {navItems.map((item) => (
          <Button key={item.id} variant="ghost" className="w-full justify-start hover:bg-gradient-to-r hover:from-emerald-50 hover:to-blue-50 hover:text-emerald-700 transition-all duration-300 text-left h-12 px-3 rounded-lg group" onClick={() => scrollToSection(item.id)}>
            <div className="flex items-center gap-3 w-full">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-lg flex items-center justify-center group-hover:from-emerald-200 group-hover:to-blue-200 transition-colors">
                <item.icon className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="flex-1 font-medium">{item.label}</span>
              {item.badge && <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-xs border-0">{item.badge}</Badge>}
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}