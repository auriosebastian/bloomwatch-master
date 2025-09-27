/*/
//  src/components/home/Header.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Leaf } from 'lucide-react';

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/map", label: "Mapa" },
  { href: "/alerts", label: "Alertas" },
  { href: "/climate", label: "Dados Climáticos" },
  // Descomente a linha abaixo quando a página de configurações estiver pronta
  // { href: "/settings", label: "Configurações" },
];

export default function Header() {
  const pathname = usePathname();

  return (
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
                BloomWatch
              </h1>
              <p className="text-xs text-gray-500 -mt-1">NASA Space Apps Challenge 2025</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant={pathname === link.href ? 'default' : 'ghost'}
                className={pathname === link.href ? 'shadow-lg' : ''}
                asChild
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
} /*/