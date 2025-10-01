"use client";
import { Inter } from 'next/font/google';
import './globals.css';
import { Leaf, MapPin, AlertTriangle, BarChart3, Settings, Home as HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { DataProvider } from '@/context/DataContext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navigationItems = [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/map", icon: MapPin, label: "Mapa" },
    { href: "/alerts", icon: AlertTriangle, label: "Alertas" },
    { href: "/climate", icon: BarChart3, label: "Dados Climáticos" },
    { href: "/settings", icon: Settings, label: "Configurações" },
  ];

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <DataProvider>
          <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex flex-col">
            <header className="bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm sticky top-0 z-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <Link href="/" className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Leaf className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                        Mime Afrika
                      </h1>
                      <p className="text-xs text-gray-500 -mt-1">NASA Space Apps Challenge 2025</p>
                    </div>
                  </Link>
                  <nav className="hidden md:flex items-center space-x-1">
                    {navigationItems.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        // ===== ESTA É A ESTRUTURA CORRETA E DEFINITIVA =====
                        <Button
                          key={item.href}
                          variant={isActive ? "default" : "ghost"}
                          className={`transition-all duration-200 ${
                            isActive ? 'shadow-lg scale-105' : 'hover:scale-105'
                          }`}
                        //  asChild // Diz ao Button para usar o seu filho como o elemento principal
                        >
                          <Link href={item.href} className="flex items-center gap-2"> {/* A classe flex vai aqui */}
                            <item.icon className="w-4 h-4" />
                            {item.label}
                          </Link>
                        </Button>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </header>

            <main className="flex-1">
              {children}
            </main>

            <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-auto">
              <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Mime Afrika • NASA Space Apps Challenge 2025
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Monitoramento ambiental
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </DataProvider>
      </body>
    </html>
  );
}