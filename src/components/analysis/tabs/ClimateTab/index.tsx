// Local: src/components/analysis/tabs/ClimateTab/index.tsx
"use client";

import React from 'react';
import { AnalysisData, ClimateAnomaly, DroughtForecast } from '../../types';
import CurrentWeather from './CurrentWeather';
import WeatherForecast from './WeatherForecast';
import ClimateAnomalies from './ClimateAnomalies';
import DroughtForecastComponent from './DroughtForecast'; // ← Nome diferente para evitar conflito

interface ClimateTabProps {
  analysisData: AnalysisData;
}

export default function ClimateTab({ analysisData }: ClimateTabProps) {
  // Dados padrão para demonstração - COM TIPOS ESPECÍFICOS
  const defaultClimateData = {
    current: {
      temperature: 28.5,
      feelsLike: 30.2,
      humidity: 45,
      windSpeed: 15,
      windDirection: 'NE',
      precipitation: 0,
      pressure: 1013,
      uvIndex: 8,
      visibility: 10,
      condition: 'clear' as const,
      icon: 'clear',
      lastUpdated: '2024-06-01T14:30:00Z'
    },
    forecast: [
      { 
        date: '2024-06-02', 
        highTemp: 29, 
        lowTemp: 22, 
        condition: 'clear' as const, 
        icon: 'clear', 
        precipitationChance: 10, 
        humidity: 48, 
        windSpeed: 12 
      },
      { 
        date: '2024-06-03', 
        highTemp: 30, 
        lowTemp: 23, 
        condition: 'partly-cloudy' as const, 
        icon: 'partly-cloudy', 
        precipitationChance: 20, 
        humidity: 52, 
        windSpeed: 10 
      },
      { 
        date: '2024-06-04', 
        highTemp: 28, 
        lowTemp: 21, 
        condition: 'rain' as const, 
        icon: 'rain', 
        precipitationChance: 60, 
        humidity: 75, 
        windSpeed: 8 
      },
      { 
        date: '2024-06-05', 
        highTemp: 27, 
        lowTemp: 20, 
        condition: 'rain' as const, 
        icon: 'rain', 
        precipitationChance: 70, 
        humidity: 80, 
        windSpeed: 6 
      },
      { 
        date: '2024-06-06', 
        highTemp: 29, 
        lowTemp: 22, 
        condition: 'cloudy' as const, 
        icon: 'cloudy', 
        precipitationChance: 30, 
        humidity: 65, 
        windSpeed: 10 
      },
      { 
        date: '2024-06-07', 
        highTemp: 31, 
        lowTemp: 24, 
        condition: 'clear' as const, 
        icon: 'clear', 
        precipitationChance: 5, 
        humidity: 45, 
        windSpeed: 14 
      },
      { 
        date: '2024-06-08', 
        highTemp: 32, 
        lowTemp: 25, 
        condition: 'clear' as const, 
        icon: 'clear', 
        precipitationChance: 0, 
        humidity: 40, 
        windSpeed: 16 
      }
    ],
    anomalies: [
      { 
        metric: 'temperature' as const, 
        value: 28.5, 
        normal: 26.2, 
        deviation: 2.3, 
        severity: 'moderate' as const, 
        trend: 'increasing' as const 
      },
      { 
        metric: 'precipitation' as const, 
        value: 0, 
        normal: 12.5, 
        deviation: -12.5, 
        severity: 'high' as const, 
        trend: 'decreasing' as const 
      },
      { 
        metric: 'humidity' as const, 
        value: 45, 
        normal: 58, 
        deviation: -13, 
        severity: 'moderate' as const, 
        trend: 'decreasing' as const 
      }
    ] as ClimateAnomaly[],
    droughtForecast: [
      { 
        period: 'Próximos 7 dias', 
        severity: 'moderate' as const, 
        probability: 65, 
        confidence: 80, 
        affectedArea: 45, 
        recommendations: [
          'Monitorar reservas hídricas',
          'Restringir irrigação não essencial',
          'Alertar agricultores locais'
        ]
      },
      { 
        period: 'Próximos 30 dias', 
        severity: 'severe' as const, 
        probability: 78, 
        confidence: 75, 
        affectedArea: 60, 
        recommendations: [
          'Ativar plano de contingência hídrica',
          'Coordenar com defesa civil',
          'Preparar sistemas de irrigação de emergência'
        ]
      }
    ] as DroughtForecast[],
    historicalComparison: [
      { period: 'Temperatura Média', current: 28.5, average: 26.2, deviation: 2.3, trend: 'above' as const },
      { period: 'Precipitação Acumulada', current: 0, average: 12.5, deviation: -12.5, trend: 'below' as const },
      { period: 'Umidade Relativa', current: 45, average: 58, deviation: -13, trend: 'below' as const }
    ]
  };

  const climateData = analysisData.climate || defaultClimateData;

  return (
    <div className="space-y-6">
      {/* Condições Atuais */}
      <CurrentWeather weather={climateData.current} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Previsão do Tempo */}
        <div className="lg:col-span-1">
          <WeatherForecast forecast={climateData.forecast} />
        </div>

        {/* Anomalias Climáticas */}
        <div className="lg:col-span-1">
          <ClimateAnomalies anomalies={climateData.anomalies} />
        </div>
      </div>

      {/* Previsão de Seca */}
      <DroughtForecastComponent forecasts={climateData.droughtForecast} />

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm text-center">
          <div className="text-2xl font-bold text-red-600">
            {climateData.current.temperature}°C
          </div>
          <div className="text-xs text-slate-500">Temperatura Atual</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm text-center">
          <div className="text-2xl font-bold text-blue-600">
            {climateData.current.humidity}%
          </div>
          <div className="text-xs text-slate-500">Umidade</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm text-center">
          <div className="text-2xl font-bold text-orange-600">
            {climateData.anomalies.length}
          </div>
          <div className="text-xs text-slate-500">Anomalias</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm text-center">
          <div className="text-2xl font-bold text-amber-600">
            {climateData.droughtForecast.filter(f => f.severity !== 'none').length}
          </div>
          <div className="text-xs text-slate-500">Alertas de Seca</div>
        </div>
      </div>
    </div>
  );
}