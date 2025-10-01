"use client";

import { useState } from 'react';
import { SettingsHeader } from '@/components/settings/SettingsHeader';
import { QuickNav } from '@/components/settings/QuickNav';
import { SystemStatus } from '@/components/settings/SystemStatus';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { GeneralPreferences } from '@/components/settings/GeneralPreferences';
import { DataManagement } from '@/components/settings/DataManagement';
import { TeamInfo } from '@/components/settings/TeamInfo';

// Tipos para os estados
type NotificationState = {
  emailAlerts: boolean; pushNotifications: boolean; criticalAlerts: boolean; weeklyReports: boolean;
  systemUpdates: boolean; vegetationAlerts: boolean; temperatureAlerts: boolean; moistureAlerts: boolean;
};
type PreferenceState = {
  language: string; temperatureUnit: string; distanceUnit: string;
  timeFormat: string; theme: string; mapStyle: string; defaultView: string;
};
type DataSettingsState = {
  autoRefresh: boolean; dataRetention: string; exportFormat: string;
  highResolution: boolean; realTimeData: boolean; historicalData: boolean; compression: boolean;
};

export default function SettingsPage() {
  const [notifications, setNotifications] = useState<NotificationState>({
    emailAlerts: true, pushNotifications: false, criticalAlerts: true, weeklyReports: true,
    systemUpdates: false, vegetationAlerts: true, temperatureAlerts: false, moistureAlerts: true
  });
  const [preferences, setPreferences] = useState<PreferenceState>({
    language: 'pt-BR', temperatureUnit: 'celsius', distanceUnit: 'kilometers',
    timeFormat: '24h', theme: 'auto', mapStyle: 'satellite', defaultView: 'overview'
  });
  const [dataSettings, setDataSettings] = useState<DataSettingsState>({
    autoRefresh: true, dataRetention: '30days', exportFormat: 'csv',
    highResolution: false, realTimeData: true, historicalData: false, compression: true
  });
  const [appInfo] = useState({
    version: '2.1.0', team: 'NASA Space Apps 2025 - Grupo Galactus X', lastUpdate: '01/12/2024',
    region: 'África Austral', status: 'stable'
  });

  const handleNotificationChange = (key: keyof NotificationState) => { setNotifications(prev => ({ ...prev, [key]: !prev[key] })); };
  const handlePreferenceChange = (key: keyof PreferenceState, value: string) => { setPreferences(prev => ({ ...prev, [key]: value })); };
  const handleDataSettingChange = (key: keyof DataSettingsState, value: any) => { setDataSettings(prev => ({ ...prev, [key]: value })); };

  const handleSaveSettings = () => {
    console.log('Configurações salvas:', { notifications, preferences, dataSettings });
    alert('Configurações aplicadas com sucesso! (Simulação)');
  };

  const handleResetSettings = () => {
    setNotifications({ emailAlerts: true, pushNotifications: false, criticalAlerts: true, weeklyReports: true, systemUpdates: false, vegetationAlerts: true, temperatureAlerts: false, moistureAlerts: true });
    setPreferences({ language: 'pt-BR', temperatureUnit: 'celsius', distanceUnit: 'kilometers', timeFormat: '24h', theme: 'auto', mapStyle: 'satellite', defaultView: 'overview' });
    setDataSettings({ autoRefresh: true, dataRetention: '30days', exportFormat: 'csv', highResolution: false, realTimeData: true, historicalData: false, compression: true });
    alert('Configurações restauradas para o padrão! (Simulação)');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 to-blue-50">
      <SettingsHeader onSave={handleSaveSettings} onReset={handleResetSettings} />
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-6">
        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          <aside className="lg:col-span-1">
            <QuickNav />
            <SystemStatus />
          </aside>
          <section className="lg:col-span-3 space-y-8">
            <NotificationSettings 
              notifications={notifications} 
              onNotificationChange={handleNotificationChange} 
            />
            <GeneralPreferences 
              preferences={preferences} 
              onPreferenceChange={handlePreferenceChange} 
            />
            <DataManagement 
              dataSettings={dataSettings} 
              onDataSettingChange={handleDataSettingChange} 
            />
            <TeamInfo appInfo={appInfo} />
          </section>
        </div>
      </main>
    </div>
  );
}