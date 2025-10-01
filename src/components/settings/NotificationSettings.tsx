"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Mail, Smartphone, AlertTriangle, AlertCircle, FileText, Zap, Thermometer, Droplets } from 'lucide-react';

// Tipos para as props
type NotificationState = {
  emailAlerts: boolean; pushNotifications: boolean; criticalAlerts: boolean; weeklyReports: boolean;
  systemUpdates: boolean; vegetationAlerts: boolean; temperatureAlerts: boolean; moistureAlerts: boolean;
};
interface NotificationSettingsProps {
  notifications: NotificationState;
  onNotificationChange: (key: keyof NotificationState) => void;
}

const notificationItems = [
  { key: 'emailAlerts', label: '📧 Alertas por Email', description: 'Notificações importantes', icon: Mail },
  { key: 'pushNotifications', label: '📱 Notificações Push', description: 'Alertas em tempo real', icon: Smartphone },
  { key: 'criticalAlerts', label: '🚨 Alertas Críticos', description: 'Sempre notificar riscos', icon: AlertTriangle },
  { key: 'vegetationAlerts', label: '🌿 Alertas Vegetação', description: 'Mudanças no NDVI', icon: AlertCircle },
  { key: 'weeklyReports', label: '📊 Relatórios Semanais', description: 'Resumo automático', icon: FileText },
  { key: 'systemUpdates', label: '⚡ Atualizações', description: 'Novas funcionalidades', icon: Zap },
  { key: 'temperatureAlerts', label: '🌡️ Alertas Temperatura', description: 'Temperaturas extremas', icon: Thermometer },
  { key: 'moistureAlerts', label: '💧 Alertas Umidade', description: 'Níveis de umidade', icon: Droplets },
];

export function NotificationSettings({ notifications, onNotificationChange }: NotificationSettingsProps) {
  return (
    <Card id="notifications" className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-100/50">
        <CardTitle className="flex items-center gap-3 text-xl text-gray-800">
          <Bell className="w-6 h-6 text-emerald-600" />
          Configurações de Notificação
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">Gerencie como você deseja receber alertas e atualizações.</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {notificationItems.map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 border border-emerald-100 rounded-xl bg-gradient-to-r from-white to-emerald-50/50 hover:shadow-md transition-all">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg flex items-center justify-center"><item.icon className="w-5 h-5 text-emerald-600" /></div>
                <div>
                  <Label htmlFor={item.key} className="text-sm font-semibold cursor-pointer">{item.label}</Label>
                  <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                </div>
              </div>
              <Switch id={item.key} checked={notifications[item.key as keyof NotificationState]} onCheckedChange={() => onNotificationChange(item.key as keyof NotificationState)} className="data-[state=checked]:bg-emerald-600" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}