-- =============================================
-- Benvenuto Focaccias - Database Setup
-- Run this in your Supabase SQL Editor
-- =============================================

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  stock INTEGER NOT NULL DEFAULT 10,
  ingredients TEXT[] NOT NULL DEFAULT '{}',
  image TEXT NOT NULL,
  video TEXT,
  description TEXT NOT NULL
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products
CREATE POLICY "Public read products" ON products
  FOR SELECT TO anon USING (true);

-- Allow public read access to reviews
CREATE POLICY "Public read reviews" ON reviews
  FOR SELECT TO anon USING (true);

-- Allow public insert on reviews (anyone can leave a review)
CREATE POLICY "Public insert reviews" ON reviews
  FOR INSERT TO anon WITH CHECK (true);

-- =============================================
-- Seed products data
-- =============================================
INSERT INTO products (id, name, price, stock, ingredients, image, video, description)
VALUES
  (1, 'Origen', 2500, 10,
   ARRAY['Harina 000', 'Agua', 'Aceite de oliva', 'Sal marina'],
   '/images/focaccia-romero.jpg',
   'https://v16-vod.capcutvod.com/61f0029afb7ecb8169b764a20e8dfb1d/69b6b407/video/tos/alisg/tos-alisg-ve-8fe9aq-sg/oIASWSzWQhMt4BcLmEnGo9khQ4FfIXyYAEwB9P/?a=3006&bti=cHJ3bzFmc3dmZEBvY15taF4rcm1gYA%3D%3D&ch=0&cr=0&dr=0&lr=all&cd=0%7C0%7C0%7C0&cv=1&br=2070&bt=1035&cs=0&ds=3&ft=GNvlXInz7ThkavhPXq8Zmo&mime_type=video_mp4&qs=0&rc=Zzc5PGhlOGU8ZGhkM2k7aUBpM2lnNDg6ZmxzbDMzOGVkNEBgXmIzM2BjXzExYzQ0NmMvYSNwZGUvcjRfbC1gLS1kYi1zcw%3D%3D&vvpl=1&l=202603101548248A1C72FD6EE8724EAF42&btag=e000b0000',
   'Focaccia originaria, solo aceite de oliva. La esencia de Italia en su forma más pura.'),

  (2, 'Mediterránea', 2800, 8,
   ARRAY['Harina 000', 'Agua', 'Cebolla', 'Tomate', 'Romero', 'Oliva', 'Aceite de oliva'],
   '/images/focaccia-olivas.jpg',
   NULL,
   'Focaccia con cebolla, tomate, romero y oliva. Sabores del Mediterráneo en cada bocado.'),

  (3, 'Barese', 3000, 6,
   ARRAY['Harina 000', 'Agua', 'Papa tipo española', 'Romero', 'Oliva', 'Aceite de oliva'],
   '/images/focaccia-cebolla.jpg',
   NULL,
   'Focaccia con papa tipo española, romero y oliva. Receta tradicional de Bari.'),

  (4, 'Apulia', 2700, 9,
   ARRAY['Harina 000', 'Agua', 'Aceitunas verdes', 'Aceitunas negras', 'Romero', 'Oliva'],
   '/images/focaccia-tomate.jpg',
   NULL,
   'Focaccia con aceitunas verdes y negras, romero y oliva. El sabor del sur de Italia.'),

  (5, '7 Lagos', 3200, 5,
   ARRAY['Harina 000', 'Agua', 'Hongos de pino', 'Champiñones', 'Portobello', 'Cebolla caramelizada'],
   '/images/focaccia-paprika.jpg',
   NULL,
   'Hongos de pino, champiñones, portobello y cebolla caramelizada. Una experiencia gourmet.')
ON CONFLICT (id) DO NOTHING;
