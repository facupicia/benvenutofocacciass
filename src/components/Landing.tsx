"use client";

import { Header } from './Header';
import { ReviewsSection } from './ReviewsSection';

interface LandingProps {
  onNavigate: (view: 'landing' | 'menu') => void;
}

export function Landing({ onNavigate }: LandingProps) {
  return (
    <div className="min-h-screen bg-crema text-crust font-sans">
      <Header onNavigate={onNavigate} />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-crust">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1549926640-d667232ffdd3?auto=format&fit=crop&q=80&w=2670)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-crust via-transparent to-crust/50 z-10" />

        <div className="relative z-20 text-center px-4 pt-16 mt-8 max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-oliva tracking-widest uppercase text-sm font-semibold mb-4 drop-shadow-md">
            Lista la Focaccia
          </span>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-crema font-bold mb-6 drop-shadow-xl text-balance">
            Auténtico Sabor Italiano en cada bocado
          </h2>
          <p className="text-crema/90 text-lg md:text-xl mb-10 max-w-2xl text-balance">
            Fermentación natural de 48 horas. Ingredientes seleccionados a mano.
            La verdadera focaccia ahora en tu mesa.
          </p>
          <button
            onClick={() => onNavigate('menu')}
            className="group relative px-8 py-4 bg-oliva hover:bg-oliva/90 text-crema font-bold uppercase tracking-wider rounded-none overflow-hidden transition-all shadow-[8px_8px_0_0_#FBEEDE] hover:shadow-[12px_12px_0_0_#FBEEDE] active:shadow-[4px_4px_0_0_#FBEEDE] active:translate-x-[4px] active:translate-y-[4px]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Ver Menú
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </div>
      </section>

      {/* Nosotros Section */}
      <section id="nosotros" className="py-24 px-4 bg-crema relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-oliva/10 rounded-2xl transform rotate-3" />
              <img
                src="/images/focaccia-clasica.jpg"
                alt="Proceso artesanal"
                className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-6 -right-6 bg-crust text-crema p-6 rounded-xl shadow-xl">
                <p className="text-3xl font-display font-bold">48h</p>
                <p className="text-sm text-crema/70">Fermentación</p>
              </div>
            </div>

            <div>
              <span className="text-oliva tracking-widest uppercase text-sm font-semibold mb-4 block">
                Nuestra Historia
              </span>
              <h3 className="text-4xl md:text-5xl text-crust font-display font-bold mb-6">
                Tradición en cada masa
              </h3>
              <div className="w-20 h-1 bg-oliva mb-6 rounded-full" />
              <p className="text-crust/80 text-lg leading-relaxed mb-6">
                En Benvenuto, creemos en la pausa y en saborear el momento.
                Nuestras focaccias son el resultado de años de tradición
                familiar, masa madre cultivada con cariño y un proceso lento que
                garantiza su inconfundible textura crujiente por fuera y una
                miga aireada por dentro.
              </p>
              <p className="text-crust/80 text-lg leading-relaxed">
                Cada pieza es horneada artesanalmente, siguiendo las recetas
                tradicionales de la región de Apulia, Italia. Sin apuros, sin
                atajos. Solo tiempo, dedicación y los mejores ingredientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Contacto Section */}
      <section id="contacto" className="py-24 px-4 bg-crust text-crema">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-oliva tracking-widest uppercase text-sm font-semibold mb-4 block">
            Contacto
          </span>
          <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Hacé tu pedido
          </h3>
          <div className="w-24 h-1 bg-oliva mx-auto mb-8 rounded-full" />
          <p className="text-crema/80 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            ¿Tenés preguntas o querés hacer un pedido especial? Escribinos por
            WhatsApp o seguinos en Instagram para ver las novedades.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/5493464566794"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition-all flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Escribinos por WhatsApp
            </a>

            <a
              href="https://www.instagram.com/benvenutofocaccias"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-crema/50 text-crema hover:bg-crema hover:text-crust font-bold rounded-full transition-all flex items-center gap-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Seguinos en Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-crust border-t border-crema/10 text-crema text-center">
        <p className="text-sm text-crema/60">
          © {new Date().getFullYear()} Benvenuto Focaccias. Hecho con amor en
          Casilda, Argentina.
        </p>
      </footer>
    </div>
  );
}
