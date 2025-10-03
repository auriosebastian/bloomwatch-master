"use client";

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
  Satellite,
  Shield,
  Globe,
  Target,
  Clock,
  Users,
  TrendingUp,
  CloudRain,
  Thermometer
} from 'lucide-react';
import Link from "next/link";

export default function Home() {
  // Dados para as features principais
  const mainFeatures = [
    {
      icon: Satellite,
      title: "Monitoramento por Satélite",
      description: "Dados em tempo real da NASA e ESA para acompanhamento preciso da vegetação",
      color: "from-emerald-500 to-blue-500"
    },
    {
      icon: Shield,
      title: "Sistema de Alertas",
      description: "Notificações inteligentes para eventos ambientais críticos",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Globe,
      title: "Cobertura Regional",
      description: "Foco na África Austral com dados específicos para cada ecossistema",
      color: "from-cyan-500 to-emerald-500"
    }
  ];

  // Estatísticas impactantes
  const stats = [
    { value: "16", label: "Regiões Monitoradas", icon: Target },
    { value: "24/7", label: "Monitoramento Contínuo", icon: Clock },
    { value: "98%", label: "Precisão dos Dados", icon: TrendingUp },
    { value: "500+", label: "Alertas Processados", icon: Users }
  ];

  // Áreas de monitoramento
  const monitoredAreas = [
    {
      name: "Costa da Namíbia",
      type: "Zona Costeira",
      status: "Ativo",
      risk: "Moderado",
      lastUpdate: "2 horas atrás",
      coordinates: "22.9576° S, 14.5053° E"
    },
    {
      name: "Cunene, Angola", 
      type: "Savana",
      status: "Ativo", 
      risk: "Alto",
      lastUpdate: "1 hora atrás",
      coordinates: "16.3167° S, 15.8167° E"
    },
    {
      name: "Delta do Okavango",
      type: "Zona Úmida",
      status: "Ativo",
      risk: "Baixo", 
      lastUpdate: "3 horas atrás",
      coordinates: "18.7573° S, 22.0589° E"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Completamente Reformulada */}
      <section className="relative bg-gradient-to-br from-emerald-500 via-blue-500 to-cyan-600 text-white overflow-hidden">
        {/* Efeitos de fundo sofisticados */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-400/20 via-blue-500/10 to-cyan-600/5"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-300/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32">
          <div className="text-center space-y-8">
            {/* Badge de Destaque */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <Leaf className="w-5 h-5" />
              <span className="text-sm font-medium">NASA Space Apps Challenge 2025</span>
            </div>

            {/* Título Principal */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                Mimea
                <span className="bg-gradient-to-r from-emerald-200 to-cyan-200 bg-clip-text text-transparent">
                   Afrika
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Monitoramento inteligente da vegetação na <span className="font-semibold text-white">África Austral</span> 
                utilizando dados de satélite em tempo real
              </p>
            </div>

            {/* Call-to-Action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link href="/map">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-50 font-semibold px-8 py-3 text-base shadow-2xl hover:shadow-3xl transition-all duration-300">
                  <MapPin className="w-5 h-5 mr-3" />
                  Explorar Mapa Interativo
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/alerts">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 text-base backdrop-blur-sm">
                  <AlertTriangle className="w-5 h-5 mr-3" />
                  Ver Alertas Ativos
                </Button>
              </Link>
            </div>

            {/* Mini Estatísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-blue-100 opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Recursos Principais */}
      <section className="py-20 px-4 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Tecnologia Avançada para o <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Monitoramento Ambiental</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Integramos dados de múltiplas fontes satelitais para fornecer a visão mais completa da saúde da vegetação na região
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group bg-white">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Áreas Monitoradas */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Foco na <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">África Austral</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Monitoramento especializado nas regiões mais críticas para a conservação e agricultura
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Mapa Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="aspect-video bg-gradient-to-br from-emerald-100 to-blue-100 rounded-2xl relative overflow-hidden">
                  {/* Pontos no mapa simulados */}
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589330273594-fade1ee91649?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
                  
                  {monitoredAreas.map((area, index) => (
                    <div
                      key={index}
                      className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-lg ${
                        area.risk === 'Alto' ? 'bg-red-500' :
                        area.risk === 'Moderado' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{
                        left: `${30 + index * 25}%`,
                        top: `${40 + (index % 2) * 20}%`
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                        {area.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Lista de Áreas */}
            <div className="space-y-6">
              {monitoredAreas.map((area, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-gray-900 text-lg">{area.name}</h3>
                          <Badge className={`
                            ${area.risk === 'Alto' ? 'bg-red-100 text-red-800' : ''}
                            ${area.risk === 'Moderado' ? 'bg-yellow-100 text-yellow-800' : ''}
                            ${area.risk === 'Baixo' ? 'bg-green-100 text-green-800' : ''}
                          `}>
                            {area.risk}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{area.type} • {area.coordinates}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {area.lastUpdate}
                          </span>
                          <span className={`flex items-center gap-1 ${
                            area.status === 'Ativo' ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${
                              area.status === 'Ativo' ? 'bg-green-500' : 'bg-gray-400'
                            }`}></div>
                            {area.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Dados em Tempo Real */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Dados em <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">Tempo Real</span>
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Acesso imediato às informações mais recentes da NASA e agências espaciais parceiras
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Thermometer className="w-12 h-12 text-cyan-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Temperatura da Superfície</h3>
                <p className="text-blue-200">Monitoramento contínuo de variações térmicas</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <CloudRain className="w-12 h-12 text-emerald-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Índice de Vegetação</h3>
                <p className="text-blue-200">Análise NDVI para saúde da vegetação</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Análise Histórica</h3>
                <p className="text-blue-200">Tendências e padrões sazonais</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call-to-Action Final */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Pronto para explorar o monitoramento ambiental?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Acesse dados satelitais em tempo real, configure alertas personalizados e tome decisões baseadas em informações precisas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/map">
              <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold px-8 py-3 text-base shadow-xl hover:shadow-2xl transition-all duration-300">
                <Eye className="w-5 h-5 mr-3" />
                Começar a Explorar
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/climate">
              <Button size="lg" variant="outline" className="border-2 border-gray-300 text-gray-700 hover:border-emerald-500 hover:text-emerald-600 font-semibold px-8 py-3 text-base transition-all duration-300">
                <BarChart3 className="w-5 h-5 mr-3" />
                Ver Dados Detalhados
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}