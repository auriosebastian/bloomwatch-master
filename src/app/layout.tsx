"use client";
import { Inter } from 'next/font/google';
import './globals.css';
import { Leaf, MapPin, AlertTriangle, CloudRain, Settings, Home as HomeIcon } from 'lucide-react';
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
    { href: "/climate", icon: CloudRain, label: "Dados Climáticos" },
    { href: "/settings", icon: Settings, label: "Configurações" },
  ];

  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gradient-to-br from-emerald-50 to-blue-50`}>
        <DataProvider>
          <div className="min-h-screen relative">

            {/* ===== NAVBAR FLUTUANTE ===== */}
            <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
  <header className="rounded-2xl bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl transition-all duration-300">
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center space-x-3 group">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                        <Leaf className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-blue-700 bg-clip-text text-transparent">Mimea Afrika</h1>
                        <p className="text-xs text-gray-600 -mt-1">NASA Space Apps Challenge 2025</p>
                      </div>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-1 bg-white/30 p-1 rounded-full border border-white/30">
                      {navigationItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                          <Button
                            key={item.href}
                            variant={isActive ? "secondary" : "ghost"}
                            className={`transition-all duration-300 rounded-full h-9 px-4 ${isActive ? 'shadow-md' : ''}`}
                            asChild
                          >
                            <Link href={item.href} className="flex items-center gap-2">
                              <item.icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-gray-600'}`} />
                              <span className={isActive ? 'font-semibold' : 'font-normal'}>{item.label}</span>
                            </Link>
                          </Button>
                        );
                      })}
                    </nav>
                  </div>
                </div>
              </header>
            </div>

            {/* ===== CONTEÚDO PRINCIPAL ===== */}
            <main className="h-full w-full relative z-0">
              {children}
            </main>

          </div>
        </DataProvider>
      </body>
    </html>
  );
}
