"use client";

import { useEffect, useRef, useState } from "react";
import { Leaf, Droplets, Wheat, Timer } from "lucide-react";

const ingredients = [
  {
    icon: Wheat,
    title: "Harina 000",
    description: "Seleccionada de los mejores molinos italianos",
    color: "from-amber-100 to-amber-200"
  },
  {
    icon: Droplets,
    title: "Aceite de Oliva",
    description: "Virgen extra de primera prensa",
    color: "from-green-100 to-green-200"
  },
  {
    icon: Timer,
    title: "48 Horas",
    description: "Fermentación natural lenta",
    color: "from-orange-100 to-orange-200"
  },
  {
    icon: Leaf,
    title: "Hierbas Frescas",
    description: "Romero, tomillo y orégano",
    color: "from-emerald-100 to-emerald-200"
  }
];

export function IngredientsSection() {
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

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 bg-crust relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FBEEDE' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-oliva tracking-widest uppercase text-sm font-semibold mb-4 block">
            Tradición Italiana
          </span>
          <h3 className="text-4xl md:text-5xl text-crema font-display font-bold mb-4">
            Ingredientes de Primera
          </h3>
          <div className="w-24 h-1 bg-oliva mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ingredients.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`group relative bg-gradient-to-br ${item.color} rounded-2xl p-6 transition-all duration-700 hover:scale-105 hover:shadow-2xl ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <div className="absolute inset-0 bg-white rounded-2xl opacity-90" />
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-crust flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-crema" />
                  </div>
                  <h4 className="text-xl font-bold text-crust mb-2">
                    {item.title}
                  </h4>
                  <p className="text-crust/70 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
