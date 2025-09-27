export const dynamic = 'force-dynamic';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, 
  MapPin, 
  AlertTriangle, 
  Eye, 
  BarChart3, 
  ArrowRight, 
  Sun,
  Thermometer,
  Droplets,
  TrendingUp
} from 'lucide-react';

export default function Home() {
  // Dados mockados baseados no site real
  const regionData = [
    {
      name: "Costa da Namíbia",
      vegetation: "Veg. Desértica",
      points: 2,
      ndvi: 0.14,
      temperature: 30,
      moisture: 6,
      risk: "critico"
    },
    {
      name: "Cunene, Angola", 
      vegetation: "Savana",
      points: 2,
      ndvi: 0.43,
      temperature: 34,
      moisture: 19,
      risk: "alto"
    },
    {
      name: "Costa da Namíbia - Sul",
      vegetation: "Veg. Desértica", 
      points: 1,
      ndvi: 0.18,
      temperature: 38,
      moisture: 6,
      risk: "critico"
    },
    {
      name: "Delta do Okavango",
      vegetation: "Floresta",
      points: 1, 
      ndvi: 0.78,
      temperature: 25,
      moisture: 82,
      risk: "baixo"
    },
    {
      name: "Cunene - Oshakati",
      vegetation: "Agricultura",
      points: 1,
      ndvi: 0.52,
      temperature: 26, 
      moisture: 45,
      risk: "medio"
    },
    {
      name: "Cunene - Ruacana",
      vegetation: "Savana",
      points: 1,
      ndvi: 0.28,
      temperature: 35,
      moisture: 12,
      risk: "alto"
    }
  ];

  const recentAlerts = [
    {
      title: "Degradação da Vegetação em Savana",
      description: "Índice de vegetação (NDVI) continua a cair, indicando degradação da savana e risco de desertificação.",
      region: "Cunene, Angola", 
      time: "Há 1 dia",
      type: "Baixa Vegetação",
      severity: "critical"
    },
    {
      title: "Possível Floração de Algas no Delta",
      description: "Condições favoráveis detectadas para a floração de algas no Delta do Okavango. Risco para qualidade da água.",
      region: "Delta do Okavango",
      time: "Há 1 dia", 
      type: "Floração de Algas",
      severity: "warning"
    },
    {
      title: "Aviso de Temperatura Extrema na Costa",
      description: "Temperaturas persistentes acima de 30°C estão a colocar stress na vegetação costeira.",
      region: "Costa da Namíbia",
      time: "Há 1 dia",
      type: "Temperatura Extrema", 
      severity: "danger"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-blue-600 to-amber-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/30 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                  <Sun className="w-4 h-4" />
                  <span>Monitoramento em Tempo Real</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  Observação da Terra
                  <span className="block bg-gradient-to-r from-amber-200 to-yellow-300 bg-clip-text text-transparent">
                    África Austral
                  </span>
                </h1>
                <p className="text-xl text-blue-100 max-w-xl">
                  Monitoramento fenológico avançado da vegetação nas regiões da Costa da Namíbia e Cunene, Angola, 
                  utilizando dados satelitais e inteligência artificial.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold">
                  <MapPin className="w-5 h-5 mr-2" />
                  Explorar Mapa
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Ver Alertas
                </Button>
              </div>
            </div>

            <div className="relative">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Status Atual</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-amber-200">10</div>
                      <div className="text-sm text-blue-200">Alertas Ativos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-200">0.34</div>
                      <div className="text-sm text-blue-200">NDVI Médio</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-200">11</div>
                      <div className="text-sm text-blue-200">Áreas de Risco</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-200">7</div>
                      <div className="text-sm text-blue-200">Pred. Floração</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-emerald-600">16</div>
                <div className="text-sm font-medium text-gray-900">Regiões Monitoradas</div>
                <div className="text-xs text-gray-500 mt-1">Áreas ativas</div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-amber-600">10</div>
                <div className="text-sm font-medium text-gray-900">Alertas Ativos</div>
                <div className="text-xs text-gray-500 mt-1">Requerem atenção</div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-red-600">29.0°C</div>
                <div className="text-sm font-medium text-gray-900">Temperatura Média</div>
                <div className="text-xs text-gray-500 mt-1">Última semana</div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-600">31.3%</div>
                <div className="text-sm font-medium text-gray-900">Umidade do Solo</div>
                <div className="text-xs text-gray-500 mt-1">Condição atual</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Coluna Esquerda - Gráfico e Regiões */}
            <div className="lg:col-span-2 space-y-8">
              {/* Gráfico NDVI */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                    Tendências NDVI - Últimas 2 Semanas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Gráfico interativo será implementado</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
                    <div className="text-center">
                      <div className="text-lg font-bold text-emerald-600">0.287</div>
                      <div className="text-xs text-gray-500">NDVI Atual</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600">26.4°C</div>
                      <div className="text-xs text-gray-500">Temperatura</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">36.1%</div>
                      <div className="text-xs text-gray-500">Umidade</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Status por Região */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                    Status por Região
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {regionData.map((region, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:shadow-md transition-all">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-lg flex items-center justify-center text-white font-bold">
                            {region.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{region.name}</h3>
                            <p className="text-sm text-gray-600">{region.vegetation} • {region.points} pontos</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">NDVI: {region.ndvi}</div>
                          <div className="text-sm text-gray-600">{region.temperature}°C • {region.moisture}%</div>
                          <Badge className={`
                            mt-1 text-xs
                            ${region.risk === 'baixo' ? 'bg-green-100 text-green-800' : ''}
                            ${region.risk === 'medio' ? 'bg-yellow-100 text-yellow-800' : ''}
                            ${region.risk === 'alto' ? 'bg-orange-100 text-orange-800' : ''}
                            ${region.risk === 'critico' ? 'bg-red-100 text-red-800' : ''}
                          `}>
                            {region.risk}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Coluna Direita - Alertas Recentes */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-amber-600" />
                    Alertas Recentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAlerts.map((alert, index) => (
                      <div key={index} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                          <Badge className={`
                            text-xs
                            ${alert.severity === 'critical' ? 'bg-red-100 text-red-800' : ''}
                            ${alert.severity === 'warning' ? 'bg-amber-100 text-amber-800' : ''}
                            ${alert.severity === 'danger' ? 'bg-orange-100 text-orange-800' : ''}
                          `}>
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{alert.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{alert.region}</span>
                          <span>{alert.time}</span>
                        </div>
                        <div className="mt-2">
                          <Badge variant="outline" className="text-xs">
                            {alert.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Explore Dados Ambientais Detalhados
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Acesse visualizações interativas, relatórios detalhados e alertas ambientais 
            para regiões específicas da África Austral.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold">
              <Eye className="w-5 h-5 mr-2" />
              Visualizar Mapa Interativo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <BarChart3 className="w-5 h-5 mr-2" />
              Dados Climáticos
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}