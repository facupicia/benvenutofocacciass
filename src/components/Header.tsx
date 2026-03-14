"use client";

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/overlays";
import { Menu } from 'lucide-react';

interface HeaderProps {
  onNavigate: (view: 'landing' | 'menu') => void;
  showCart?: boolean;
}

export function Header({ onNavigate }: HeaderProps) {
  const handleNavClick = (view: 'landing' | 'menu') => {
    onNavigate(view);
    // Optionally close the sheet if needed, though typically navigation might handle this
  };

  return (
    <div className="absolute top-0 left-0 right-0 z-50 p-4 pt-6">
      <div className="flex items-center justify-between">
        {/* Logo Section */}
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavClick('landing')}
        >
          <div className="w-10 h-10 rounded-full bg-oliva flex items-center justify-center">
            <span className="text-lg text-crema font-bold">B</span>
          </div>
          <div>
            <h1 className="text-xl text-white font-semibold drop-shadow-lg">
              Benvenuto
            </h1>
            <p className="text-white/70 text-xs">Focaccias artesanales</p>
          </div>
        </div>
        
        {/* Navigation & Actions */}
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <button className="w-10 h-10 rounded-full bg-terracota backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                <Menu className="w-5 h-5 text-white" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-crema border-l border-oliva/20 w-[300px] sm:w-[400px]">
              <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
              <div className="flex flex-col gap-6 mt-12">
                <button 
                  onClick={() => handleNavClick('menu')}
                  className="text-2xl text-crust text-left hover:text-oliva transition-colors font-semibold"
                >
                  Menú
                </button>
                <button 
                  onClick={() => {
                    handleNavClick('landing');
                    setTimeout(() => {
                      document.getElementById('nosotros')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="text-2xl text-crust text-left hover:text-oliva transition-colors font-semibold   "
                >
                  Nosotros
                </button>
                <button 
                  onClick={() => {
                    handleNavClick('landing');
                    setTimeout(() => {
                      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="text-2xl  text-crust text-left hover:text-oliva transition-colors font-semibold"
                >
                  Contacto
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
