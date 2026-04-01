"use client";

import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/overlays";
import { Menu } from 'lucide-react';

interface HeaderProps {
  onNavigate: (view: 'landing' | 'menu') => void;
  currentView?: 'landing' | 'menu';
}

// Definimos la configuración de navegación fuera del componente para no recrearla en cada render
const NAV_ITEMS = [
  { label: 'Menú', view: 'menu' as const },
  { label: 'Nosotros', view: 'landing' as const, sectionId: 'nosotros' },
  { label: 'Contacto', view: 'landing' as const, sectionId: 'contacto' },
];

export function Header({ onNavigate, currentView }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (view: 'landing' | 'menu', sectionId?: string) => {
    setIsOpen(false); // Cerramos el Sheet automáticamente al navegar
    onNavigate(view);

    if (sectionId) {
      // Pequeño delay para asegurar que la vista 'landing' se haya montado antes de scrollear
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 z-50 p-4 pt-6 pointer-events-none">
      <div className="flex items-center justify-between pointer-events-auto">

        {/* Logo Section */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNavigation('landing')}
        >
          <div className="w-11 h-11 rounded-full bg-oliva flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
            <img
              src="/images/logo.png"
              alt="Benvenuto Logo"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl text-white font-semibold drop-shadow-md leading-none tracking-wide">
              Benvenuto
            </h1>
            <span className="text-white/80 text-xs mt-1 font-medium drop-shadow-sm">
              Focaccias artesanales
            </span>
          </div>
        </div>

        {/* Navigation Actions */}
        {currentView !== 'menu' && (
          <div className="flex items-center gap-4">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className="w-11 h-11 rounded-full bg-oliva flex items-center justify-center hover:brightness-110 active:scale-95 transition-all shadow-lg"
                  aria-label="Abrir menú"
                >
                  <Menu className="w-5 h-5 text-crema" />
                </button>
              </SheetTrigger>

              <SheetContent side="right" className="bg-crema border-l border-oliva/20 w-[300px] sm:w-[400px]">
                <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>

                <nav className="flex flex-col gap-6 mt-16 px-2">
                  {NAV_ITEMS.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleNavigation(item.view, item.sectionId)}
                      className="text-2xl text-crust text-left hover:text-oliva hover:translate-x-2 transition-all font-semibold"
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        )}

      </div>
    </div>
  );
}