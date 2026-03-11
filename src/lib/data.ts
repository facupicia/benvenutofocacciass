import type { Focaccia } from '@/types';

export const focaccias: Focaccia[] = [
  {
    id: 1,
    name: "Romero y Sal Marina",
    price: 2500,
    stock: 10,
    ingredients: ["Harina 000", "Agua", "Romero fresco", "Aceite de terracota extra virgen", "Sal marina"],
    image: "/images/focaccia-romero.jpg",
    description: "Clásica italiana con romero fresco y sal marina gruesa. Crujiente por fuera, esponjosa por dentro."
  },
  {
    id: 2,
    name: "Olivas y Tomillo",
    price: 2800,
    stock: 8,
    ingredients: ["Harina 000", "Agua", "Olivas negras", "Olivas verdes", "Tomillo fresco", "Aceite de terracota"],
    image: "/images/focaccia-olivas.jpg",
    description: "Explosión de sabor mediterráneo con mix de olivas y tomillo aromático."
  },
  {
    id: 3,
    name: "Cebolla Caramelizada",
    price: 3000,
    stock: 6,
    ingredients: ["Harina 000", "Agua", "Cebolla morada", "Miel", "Aceite de terracota", "Romero"],
    image: "/images/focaccia-cebolla.jpg",
    description: "Dulce y salva en perfecta armonía. Cebolla caramelizada lentamente con un toque de miel."
  },
  {
    id: 4,
    name: "Tomate y Albahaca",
    price: 2700,
    stock: 9,
    ingredients: ["Harina 000", "Agua", "Tomates cherry", "Albahaca fresca", "Aceite de terracota", "Ajo"],
    image: "/images/focaccia-tomate.jpg",
    description: "Los sabores clásicos de Italia en cada bocado. Tomates asados y albahaca fragante."
  },
  {
    id: 5,
    name: "Paprika y Queso",
    price: 3200,
    stock: 5,
    ingredients: ["Harina 000", "Agua", "Paprika ahumada", "Queso parmesano", "Queso mozzarella", "Aceite de terracota"],
    image: "/images/focaccia-paprika.jpg",
    description: "Intensa y ahumada con doble queso derretido. Para los amantes del sabor fuerte."
  },
  {
    id: 6,
    name: "Clásica con Hierbas",
    price: 2300,
    stock: 12,
    ingredients: ["Harina 000", "Agua", "Orégano", "Albahaca", "Romero", "Tomillo", "Aceite de terracota"],
    image: "/images/focaccia-clasica.jpg",
    description: "La auténtica focaccia genovesa. Mezcla de hierbas italianas en su forma más pura."
  }
];

export const PICKUP_POINTS = [
  { id: 'casilda-center', name: 'Casilda - Centro', address: 'San Martín 1234, Casilda' },
  { id: 'casilda-norte', name: 'Casilda - Zona Norte', address: 'Bv. Ovidio Lagos 567, Casilda' },
  { id: 'rosario-centro', name: 'Rosario - Centro', address: 'Córdoba 890, Rosario' },
];

export const WHATSAPP_NUMBER = '5493412345678';
