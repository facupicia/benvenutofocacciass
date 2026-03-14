"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  {
    src: "/images/focaccia-clasica.jpg",
    alt: "Focaccia Clásica",
    title: "Origen",
    description: "La esencia pura de Italia"
  },
  {
    src: "/images/focaccia-olivas.jpg",
    alt: "Focaccia Mediterránea",
    title: "Mediterránea",
    description: "Sabores del mar"
  },
  {
    src: "/images/focaccia-cebolla.jpg",
    alt: "Focaccia Barese",
    title: "Barese",
    description: "Tradición de Bari"
  },
  {
    src: "/images/focaccia-tomate.jpg",
    alt: "Focaccia Apulia",
    title: "Apulia",
    description: "El sur de Italia"
  },
  {
    src: "/images/focaccia-paprika.jpg",
    alt: "Focaccia 7 Lagos",
    title: "7 Lagos",
    description: "Experiencia gourmet"
  },
  {
    src: "/images/focaccia-romero.jpg",
    alt: "Focaccia al Romero",
    title: "Clásica",
    description: "Con romero fresco"
  }
];

export function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 bg-gradient-to-b from-crema via-white to-crema overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-oliva tracking-widest uppercase text-sm font-semibold mb-4 block">
            Nuestras Creaciones
          </span>
          <h3 className="text-4xl md:text-5xl text-crust font-display font-bold mb-4">
            Galería de Sabores
          </h3>
          <div className="w-24 h-1 bg-oliva mx-auto rounded-full" />
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white shadow-lg hover:bg-oliva hover:text-white transition-all duration-300 z-10"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative w-full max-w-4xl h-[400px] md:h-[500px]">
              {galleryImages.map((image, index) => {
                const offset = index - currentIndex;
                const isActive = index === currentIndex;

                return (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      isVisible ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      transform: `
                        translateX(${offset * 60}%)
                        scale(${isActive ? 1 : 0.8})
                        rotateY(${offset * -15}deg)
                      `,
                      opacity: isActive ? 1 : 0.3,
                      zIndex: isActive ? 10 : 5 - Math.abs(offset),
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-crust/80 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h4 className="text-2xl font-display font-bold mb-1">
                          {image.title}
                        </h4>
                        <p className="text-white/80">{image.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white shadow-lg hover:bg-oliva hover:text-white transition-all duration-300 z-10"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-oliva"
                    : "bg-oliva/30 hover:bg-oliva/50"
                }`}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
