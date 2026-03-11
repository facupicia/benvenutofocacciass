
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
          <h3 className="font-display text-4xl text-oliva font-bold mb-8">Nuestra Historia</h3>
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
          <h3 className="font-display text-4xl text-oliva font-bold mb-8">Contacto</h3>
          <p className="text-crust/80 text-lg md:text-xl leading-relaxed mb-8">
            ¿Tienes pregustas o pedidos especiales? ¡Escríbenos!
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
             <a 
               href="mailto:hola@benvenutofocaccias.com"
               className="px-6 py-3 border-2 border-crust text-crust hover:bg-crust hover:text-crema transition-colors font-medium flex items-center gap-2"
             >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
               hola@benvenutofocaccias.com
             </a>
             <a 
               href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer"
               className="px-6 py-3 border-2 border-oliva text-oliva hover:bg-oliva hover:text-crema transition-colors font-medium flex items-center gap-2"
             >
                <svg className="w-4 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.89-4.443 9.893-9.892-.002-5.46-4.444-9.895-9.893-9.895-5.451 0-9.893 4.445-9.896 9.895-.002 2.105.596 4.124 1.704 5.922l-1.124 4.106 4.218-1.144zm5.295-10.454c-.254-.564-.523-.574-.761-.585-.205-.008-.44-.008-.686-.008-.246 0-.646.092-.983.462-.338.369-1.293 1.261-1.293 3.078 0 1.815 1.323 3.568 1.508 3.815.184.246 2.603 3.974 6.307 5.575.882.381 1.571.609 2.11.78.885.281 1.691.241 2.324.146.709-.107 2.184-.893 2.493-1.754.308-.862.308-1.601.215-1.755-.093-.154-.339-.246-.708-.431-.369-.184-2.184-1.077-2.523-1.2-.338-.123-.585-.184-.83.185-.246.369-.954 1.2-1.169 1.446-.215.246-.431.277-.8.092-.369-.184-1.56-.575-2.972-1.844-1.1-1.002-1.845-2.24-2.06-2.609-.215-.369-.023-.569.162-.754.168-.168.369-.431.554-.646.184-.215.246-.369.369-.615.123-.246.062-.462-.03-.646-.092-.185-.83-2.001-1.139-2.738z"/>
                </svg>
               WhatsApp
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
