// Local: src/components/analysis/tabs/MultispectralTab/index.tsx
"use client";

import React, { useState } from 'react';
import { AnalysisData, SatelliteImage, SpectralIndex, IndexCalculation, LandCoverClass, ImageComparison as ImageComparisonType } from '../../types'; // ← Renomear o tipo
import ImageViewer from './ImageViewer';
import ImageComparison from './ImageComparison'; // ← Componente
import IndexCalculator from './IndexCalculator';
import LandCoverAnalysis from './LandCoverAnalysis';

interface MultispectralTabProps {
  analysisData: AnalysisData;
}

export default function MultispectralTab({ analysisData }: MultispectralTabProps) {
  // Dados padrão para demonstração - COM TIPOS CORRETOS
  const defaultMultispectralData = {
    availableImages: [
      {
        id: 'landsat-1',
        date: '2024-05-15',
        sensor: 'Landsat-8' as const,
        resolution: '30m',
        cloudCover: 5,
        url: '#',
        thumbnail: '#',
        bands: {
          'B2': '#', 'B3': '#', 'B4': '#', 'B5': '#', 'B6': '#', 'B7': '#'
        }
      },
      {
        id: 'sentinel-1',
        date: '2024-05-20',
        sensor: 'Sentinel-2' as const,
        resolution: '10m',
        cloudCover: 12,
        url: '#',
        thumbnail: '#',
        bands: {
          'B2': '#', 'B3': '#', 'B4': '#', 'B5': '#', 'B6': '#', 'B7': '#', 'B8': '#', 'B8A': '#', 'B11': '#', 'B12': '#'
        }
      },
      {
        id: 'landsat-2',
        date: '2024-06-01',
        sensor: 'Landsat-9' as const,
        resolution: '30m',
        cloudCover: 2,
        url: '#',
        thumbnail: '#',
        bands: {
          'B2': '#', 'B3': '#', 'B4': '#', 'B5': '#', 'B6': '#', 'B7': '#'
        }
      }
    ] as SatelliteImage[],
    selectedImage: null,
    availableIndices: [
      {
        id: 'ndvi',
        name: 'NDVI - Índice de Vegetação',
        formula: '(NIR - RED) / (NIR + RED)',
        description: 'Mede a saúde e densidade da vegetação',
        range: { min: -1, max: 1 },
        interpretation: {
          low: 'Solo exposto ou água',
          medium: 'Vegetação esparsa',
          high: 'Vegetação densa e saudável'
        }
      },
      {
        id: 'ndwi',
        name: 'NDWI - Índice de Água',
        formula: '(GREEN - NIR) / (GREEN + NIR)',
        description: 'Detecta corpos d\'água e umidade',
        range: { min: -1, max: 1 },
        interpretation: {
          low: 'Áreas secas',
          medium: 'Umidade moderada',
          high: 'Corpos d\'água'
        }
      },
      {
        id: 'nbr',
        name: 'NBR - Índice de Queimada',
        formula: '(NIR - SWIR2) / (NIR + SWIR2)',
        description: 'Detecta áreas queimadas e severidade',
        range: { min: -1, max: 1 },
        interpretation: {
          low: 'Áreas severamente queimadas',
          medium: 'Áreas moderadamente queimadas',
          high: 'Vegetação não queimada'
        }
      },
      {
        id: 'ndbi',
        name: 'NDBI - Índice de Área Construída',
        formula: '(SWIR1 - NIR) / (SWIR1 + NIR)',
        description: 'Identifica áreas urbanas e construídas',
        range: { min: -1, max: 1 },
        interpretation: {
          low: 'Áreas naturais',
          medium: 'Áreas mistas',
          high: 'Áreas urbanas'
        }
      }
    ] as SpectralIndex[],
    selectedIndices: ['ndvi', 'ndwi'],
    indexCalculations: [
      {
        index: 'ndvi',
        value: 0.72,
        date: '2024-06-01',
        area: 1200,
        confidence: 92
      },
      {
        index: 'ndwi',
        value: 0.45,
        date: '2024-06-01',
        area: 1200,
        confidence: 88
      },
      {
        index: 'nbr',
        value: 0.68,
        date: '2024-05-15',
        area: 1200,
        confidence: 85
      }
    ] as IndexCalculation[],
    landCover: [
      { id: 'forest', name: 'Floresta Densa', color: '#16a34a', area: 650, percentage: 54.2, trend: 'stable' as const },
      { id: 'savanna', name: 'Savana', color: '#ca8a04', area: 320, percentage: 26.7, trend: 'decreasing' as const },
      { id: 'water', name: 'Corpos d\'Água', color: '#2563eb', area: 85, percentage: 7.1, trend: 'stable' as const },
      { id: 'urban', name: 'Área Urbana', color: '#6b7280', area: 45, percentage: 3.8, trend: 'increasing' as const },
      { id: 'bare', name: 'Solo Exposto', color: '#92400e', area: 100, percentage: 8.3, trend: 'increasing' as const }
    ] as LandCoverClass[],
    comparisons: [
      {
        before: {
          id: 'landsat-1',
          date: '2024-01-15',
          sensor: 'Landsat-8' as const,
          resolution: '30m',
          cloudCover: 8,
          url: '#',
          thumbnail: '#',
          bands: {
            'B2': '#', 'B3': '#', 'B4': '#', 'B5': '#', 'B6': '#', 'B7': '#'
          }
        },
        after: {
          id: 'landsat-2',
          date: '2024-06-01',
          sensor: 'Landsat-9' as const,
          resolution: '30m',
          cloudCover: 2,
          url: '#',
          thumbnail: '#',
          bands: {
            'B2': '#', 'B3': '#', 'B4': '#', 'B5': '#', 'B6': '#', 'B7': '#'
          }
        },
        changes: [
          {
            type: 'deforestation' as const,
            area: 12.5,
            confidence: 87,
            coordinates: [{ lat: -10.73, lng: 14.91 }]
          },
          {
            type: 'vegetation_growth' as const,
            area: 8.2,
            confidence: 78,
            coordinates: [{ lat: -10.74, lng: 14.92 }]
          }
        ]
      }
    ] as ImageComparisonType[],
    currentCalculation: {
      index: 'ndvi',
      result: 0.72,
      area: 1200
    }
  };

  const multispectralData = analysisData.multispectral || defaultMultispectralData;
  const [selectedImage, setSelectedImage] = useState<SatelliteImage | null>(multispectralData.availableImages[0]);
  const [selectedIndices, setSelectedIndices] = useState<string[]>(multispectralData.selectedIndices);

  const handleImageChange = (image: SatelliteImage) => {
    setSelectedImage(image);
  };

  const handleCalculateIndex = (indexId: string) => {
    // Simulação de cálculo - na implementação real, isso chamaria uma API
    console.log(`Calculando índice: ${indexId}`);
  };

  return (
    <div className="space-y-6">
      {/* Visualizador de Imagens */}
      <ImageViewer 
        image={selectedImage}
        onImageChange={handleImageChange}
        availableImages={multispectralData.availableImages}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Comparação de Imagens */}
        <div className="lg:col-span-1">
          <ImageComparison comparisons={multispectralData.comparisons} />
        </div>

        {/* Calculadora de Índices */}
        <div className="lg:col-span-1">
          <IndexCalculator 
            availableIndices={multispectralData.availableIndices}
            selectedIndices={selectedIndices}
            onIndicesChange={setSelectedIndices}
            calculations={multispectralData.indexCalculations}
            currentCalculation={multispectralData.currentCalculation}
            onCalculate={handleCalculateIndex}
          />
        </div>
      </div>

      {/* Análise de Cobertura do Solo */}
      <LandCoverAnalysis landCover={multispectralData.landCover} />

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm text-center">
          <div className="text-2xl font-bold text-emerald-600">
            {multispectralData.availableImages.length}
          </div>
          <div className="text-xs text-slate-500">Imagens Disponíveis</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm text-center">
          <div className="text-2xl font-bold text-blue-600">
            {multispectralData.availableIndices.length}
          </div>
          <div className="text-xs text-slate-500">Índices Espectrais</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm text-center">
          <div className="text-2xl font-bold text-purple-600">
            {multispectralData.indexCalculations.length}
          </div>
          <div className="text-xs text-slate-500">Cálculos Realizados</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm text-center">
          <div className="text-2xl font-bold text-orange-600">
            {multispectralData.comparisons.reduce((acc, comp) => acc + comp.changes.length, 0)}
          </div>
          <div className="text-xs text-slate-500">Mudanças Detectadas</div>
        </div>
      </div>
    </div>
  );
}