export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'danger' | 'critical';
  region: string;
  alert_type: string;
  is_active: boolean;
  created_date: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export const Alert = {
  async list(sort: string = "-created_date", limit: number = 10): Promise<Alert[]> {
    // Mock data baseado no site real
    return [
      {
        id: '1',
        title: 'Degradação da Vegetação em Savana',
        description: 'Índice de vegetação (NDVI) continua a cair, indicando degradação da savana e risco de desertificação.',
        severity: 'critical',
        region: 'Cunene, Angola',
        alert_type: 'baixa_vegetacao',
        is_active: true,
        created_date: '2024-12-26'
      },
      {
        id: '2',
        title: 'Possível Floração de Algas no Delta',
        description: 'Condições favoráveis detectadas para a floração de algas no Delta do Okavango. Risco para qualidade da água.',
        severity: 'warning',
        region: 'Delta do Okavango',
        alert_type: 'floracao_algas',
        is_active: true,
        created_date: '2024-12-26'
      },
      // ... mais alertas mockados
    ];
  }
};