"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Tags, 
  BarChart3, 
  Settings,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useFinance } from '@/context/FinanceContext';

const menuItems = [
  { icon: LayoutDashboard, label: 'Painel Principal', href: '/' },
  { icon: ArrowUpCircle, label: 'Receitas', href: '/receitas' },
  { icon: ArrowDownCircle, label: 'Despesas', href: '/despesas' },
  { icon: Tags, label: 'Categorias', href: '/categorias' },
  { icon: BarChart3, label: 'Relatórios', href: '/relatorios' },
  { icon: Settings, label: 'Configurações', href: '/configuracoes' },
];

export const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { profile } = useFinance();

  const firstName = profile?.name ? profile.name.trim().split(' ')[0] : 'Usuário';

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-30 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-20 gap-4 w-full">
          {/* Left: Brand Logo & Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="xl:hidden text-slate-600 hover:bg-slate-50 rounded-xl shrink-0">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 border-r border-slate-100 flex flex-col bg-white">
                <div className="p-6 border-b border-slate-50">
                  <div className="flex flex-col gap-2">
                    <img 
                      src="/logo-sistema-fluxo.png" 
                      alt="Fluxo Financeiro" 
                      className="h-10 object-contain self-start"
                    />
                    <span className="text-[10px] font-medium text-slate-400 tracking-wider uppercase">
                      Controle financeiro pessoal
                    </span>
                  </div>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                  {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative whitespace-nowrap",
                          isActive 
                            ? "bg-blue-50/60 text-blue-600 font-semibold" 
                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                        )}
                      >
                        <item.icon 
                          size={18} 
                          className={cn(
                            "transition-transform duration-300 group-hover:scale-110 shrink-0",
                            isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                          )} 
                        />
                        <span className="text-sm tracking-wide">{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center gap-2 shrink-0">
              <img 
                src="/logo-sistema-fluxo.png" 
                alt="Fluxo Financeiro" 
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 shrink-0">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium whitespace-nowrap shrink-0",
                    isActive 
                      ? "bg-blue-50 text-blue-600" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <item.icon 
                    size={16} 
                    className={cn(
                      "transition-transform duration-200 shrink-0",
                      isActive ? "text-blue-600" : "text-slate-400"
                    )} 
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: User Greeting */}
          <div className="flex items-center shrink-0">
            <span className="text-sm font-semibold text-slate-700 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 whitespace-nowrap shrink-0">
              Olá, {firstName}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};