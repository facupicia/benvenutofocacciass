import type { Focaccia } from '@/types';

export const focaccias: Focaccia[] = [
  {
    id: 1,
    name: "Origen",
    price: 2500,
    stock: 10,
    ingredients: ["Harina 000", "Agua", "Aceite de oliva", "Sal marina"],
    image: "/images/focaccia-romero.jpg",
    description: "Focaccia originaria, solo aceite de oliva. La esencia de Italia en su forma más pura.",
    video: "https://v16-vod.capcutvod.com/61f0029afb7ecb8169b764a20e8dfb1d/69b6b407/video/tos/alisg/tos-alisg-ve-8fe9aq-sg/oIASWSzWQhMt4BcLmEnGo9khQ4FfIXyYAEwB9P/?a=3006&bti=cHJ3bzFmc3dmZEBvY15taF4rcm1gYA%3D%3D&ch=0&cr=0&dr=0&lr=all&cd=0%7C0%7C0%7C0&cv=1&br=2070&bt=1035&cs=0&ds=3&ft=GNvlXInz7ThkavhPXq8Zmo&mime_type=video_mp4&qs=0&rc=Zzc5PGhlOGU8ZGhkM2k7aUBpM2lnNDg6ZmxzbDMzOGVkNEBgXmIzM2BjXzExYzQ0NmMvYSNwZGUvcjRfbC1gLS1kYi1zcw%3D%3D&vvpl=1&l=202603101548248A1C72FD6EE8724EAF42&btag=e000b0000"
  },
  {
    id: 2,
    name: "Mediterránea",
    price: 2800,
    stock: 8,
    ingredients: ["Harina 000", "Agua", "Cebolla", "Tomate", "Romero", "Oliva", "Aceite de oliva"],
    image: "/images/focaccia-olivas.jpg",
    description: "Focaccia con cebolla, tomate, romero y oliva. Sabores del Mediterráneo en cada bocado."
  },
  {
    id: 3,
    name: "Barese",
    price: 3000,
    stock: 6,
    ingredients: ["Harina 000", "Agua", "Papa tipo española", "Romero", "Oliva", "Aceite de oliva"],
    image: "/images/focaccia-cebolla.jpg",
    description: "Focaccia con papa tipo española, romero y oliva. Receta tradicional de Bari."
  },
  {
    id: 4,
    name: "Apulia",
    price: 2700,
    stock: 9,
    ingredients: ["Harina 000", "Agua", "Aceitunas verdes", "Aceitunas negras", "Romero", "Oliva"],
    image: "/images/focaccia-tomate.jpg",
    description: "Focaccia con aceitunas verdes y negras, romero y oliva. El sabor del sur de Italia."
  },
  {
    id: 5,
    name: "7 Lagos",
    price: 3200,
    stock: 5,
    ingredients: ["Harina 000", "Agua", "Hongos de pino", "Champiñones", "Portobello", "Cebolla caramelizada"],
    image: "/images/focaccia-paprika.jpg",
    description: "Hongos de pino, champiñones, portobello y cebolla caramelizada. Una experiencia gourmet."
  }
];

export const PICKUP_POINTS = [
  { id: 'casilda-center', name: 'Casilda - Centro', address: 'San Martín 1234, Casilda' },
];

export const WHATSAPP_NUMBER = '5493464566794';
