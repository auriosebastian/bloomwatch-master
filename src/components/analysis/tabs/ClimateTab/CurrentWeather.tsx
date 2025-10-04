// Local: src/components/analysis/tabs/ClimateTab/CurrentWeather.tsx
import React from 'react';
import { WeatherCurrent } from '../../types';
import { Thermometer, Droplets, Wind, Eye, Gauge, Sun } from 'lucide-react';

interface CurrentWeatherProps {
  weather: WeatherCurrent;
}

const CurrentWeather = ({ weather }: CurrentWeatherProps) => {
  const conditionIcons: Record<string, string> = {
    clear: '☀️',
    cloudy: '☁️',
    rain: '🌧️',
    storm: '⛈️',
    fog: '🌫️'
  };

  const conditionLabels: Record<string, string> = {
    clear: 'Céu Limpo',
    cloudy: 'Nublado',
    rain: 'Chuva',
    storm: 'Tempestade',
    fog: 'Neblina'
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-slate-800">Condições Atuais</h3>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{conditionIcons[weather.condition]}</span>
          <span className="text-sm text-slate-600">
            {conditionLabels[weather.condition]}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Temperatura Principal */}
        <div className="col-span-2 lg:col-span-1 bg-slate-50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Thermometer className="w-8 h-8 text-red-500" />
            <div>
              <div className="text-3xl font-bold text-slate-800">
                {weather.temperature}°C
              </div>
              <div className="text-sm text-slate-500">
                Sensação: {weather.feelsLike}°C
              </div>
            </div>
          </div>
        </div>

        {/* Umidade */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-slate-700">Umidade</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {weather.humidity}%
          </div>
        </div>

        {/* Vento */}
        <div className="bg-cyan-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Wind className="w-5 h-5 text-cyan-500" />
            <span className="text-sm font-medium text-slate-700">Vento</span>
          </div>
          <div className="text-lg font-bold text-cyan-600">
            {weather.windSpeed} km/h
          </div>
          <div className="text-xs text-slate-500">{weather.windDirection}</div>
        </div>

        {/* Precipitação */}
        <div className="bg-indigo-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="w-5 h-5 text-indigo-500" />
            <span className="text-sm font-medium text-slate-700">Chuva</span>
          </div>
          <div className="text-lg font-bold text-indigo-600">
            {weather.precipitation} mm
          </div>
        </div>

        {/* Pressão */}
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium text-slate-700">Pressão</span>
          </div>
          <div className="text-lg font-bold text-purple-600">
            {weather.pressure} hPa
          </div>
        </div>

        {/* UV Index */}
        <div className="bg-amber-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sun className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-medium text-slate-700">UV</span>
          </div>
          <div className="text-lg font-bold text-amber-600">
            {weather.uvIndex}
          </div>
          <div className="text-xs text-slate-500">
            {weather.uvIndex <= 2 ? 'Baixo' : 
             weather.uvIndex <= 5 ? 'Moderado' : 
             weather.uvIndex <= 7 ? 'Alto' : 'Extremo'}
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-slate-500 text-center">
        Atualizado: {new Date(weather.lastUpdated).toLocaleString('pt-BR')}
      </div>
    </div>
  );
};

export default CurrentWeather;