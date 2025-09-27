export interface VegetationData {
  id: string;
  region: string;
  date: string;
  ndvi_value: number;
  temperature: number;
  soil_moisture: number;
  risk_level: 'baixo' | 'medio' | 'alto' | 'critico';
  vegetation_type: string;
  bloom_prediction?: boolean;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export const VegetationData = {
  async list(sort: string = "-date", limit: number = 50): Promise<VegetationData[]> {
    // Mock data baseado no site real
    return [
      {
        id: '1',
        region: 'Costa da Namíbia',
        date: '2024-12-26',
        ndvi_value: 0.14,
        temperature: 30,
        soil_moisture: 6,
        risk_level: 'critico',
        vegetation_type: 'vegetacao_desertica',
        bloom_prediction: false,
        coordinates: { latitude: -22.9576, longitude: 14.5053 }
      },
      {
        id: '2',
        region: 'Cunene, Angola',
        date: '2024-12-26',
        ndvi_value: 0.43,
        temperature: 34,
        soil_moisture: 19,
        risk_level: 'alto',
        vegetation_type: 'savana',
        bloom_prediction: true,
        coordinates: { latitude: -16.3167, longitude: 15.8167 }
      },
      // ... mais dados mockados
    ];
  }
};