// Local: src/components/analysis/tabs/ClimateTab/WeatherForecast.tsx
import React from 'react';
import type { WeatherForecast as WeatherForecastType } from '../../types'; // ← type-only import

interface WeatherForecastProps {
  forecast: WeatherForecastType[];
}

const WeatherForecast = ({ forecast }: WeatherForecastProps) => {
  const conditionIcons: Record<string, string> = {
    clear: '☀️',
    cloudy: '☁️',
    rain: '🌧️',
    storm: '⛈️',
    fog: '🌫️',
    'partly-cloudy': '⛅'
  };

  const getWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) return 'Hoje';
    
    return date.toLocaleDateString('pt-BR', { weekday: 'short' });
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
      <h3 className="font-semibold text-slate-800 mb-6">Previsão 7 Dias</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {forecast.map((day, index) => (
          <div key={index} className="text-center bg-slate-50 rounded-lg p-3">
            <div className="font-medium text-slate-700 text-sm mb-2">
              {getWeekday(day.date)}
            </div>
            
            <div className="text-2xl mb-2">
              {conditionIcons[day.condition] || '🌤️'}
            </div>
            
            <div className="flex justify-center gap-1 mb-2">
              <span className="text-red-500 font-bold">{day.highTemp}°</span>
              <span className="text-blue-500">{day.lowTemp}°</span>
            </div>
            
            <div className="flex items-center justify-center gap-1 text-xs text-slate-600">
              <span>💧</span>
              <span>{day.precipitationChance}%</span>
            </div>
            
            <div className="text-xs text-slate-500 mt-1">
              {day.humidity}% umid
            </div>
          </div>
        ))}
      </div>

      {/* Gráfico de temperatura simplificado */}
      <div className="mt-6 bg-slate-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-slate-700">Tendência de Temperatura</span>
          <span className="text-xs text-slate-500">Máx/Mín</span>
        </div>
        
        <div className="flex items-end justify-between h-20 px-2">
          {forecast.map((day, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="w-3 bg-red-200 rounded-t"
                style={{ height: `${(day.highTemp / 40) * 100}%` }}
              />
              <div 
                className="w-3 bg-blue-200 rounded-b mt-1"
                style={{ height: `${(day.lowTemp / 40) * 100}%` }}
              />
              <div className="text-xs text-slate-500 mt-1">
                {getWeekday(day.date)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherForecast;