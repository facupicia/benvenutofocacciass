
import { Header } from './Header';

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
      <section id="nosotros" className="py-24 px-4 bg-crema">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl text-oliva font-bold mb-8">Nuestra Historia</h3>
          <p className="text-crust/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            En Benvenuto, creemos en la pausa y en saborear el momento.
            Nuestras focaccias son el resultado de años de tradición familiar,
            masa madre cultivada con cariño y un proceso lento que garantiza
            su inconfundible textura crujiente por fuera y una miga aireada por dentro.
          </p>
        </div>
      </section>

      {/* Contacto Section */}
      <section id="contacto" className="py-24 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl text-oliva font-bold mb-8">Contacto</h3>
          <p className="text-crust/80 text-lg md:text-xl leading-relaxed mb-8">
            ¿Tienes pregustas o pedidos especiales? ¡Escríbenos!
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a
              href="https://www.instagram.com/benvenutofocaccias" target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 border-2 border-oliva text-oliva hover:bg-oliva hover:text-crema transition-colors font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-crust text-crema text-center text-sm">
        <p>© {new Date().getFullYear()} Benvenuto Focaccias. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
