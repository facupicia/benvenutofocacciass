# Benvenuto Focaccias

Aplicación web para Benvenuto Focaccias - Auténtico Sabor Italiano.

## Tecnologías

- **Next.js 15** con App Router
- **React 19** + TypeScript
- **Tailwind CSS** + shadcn/ui
- **Supabase** para backend
- **Zustand** para estado global

## Scripts

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm run start
```

## Estructura del Proyecto

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css      # Estilos globales
│   ├── layout.tsx       # Layout raíz
│   └── page.tsx         # Página principal
├── components/          # Componentes React
│   ├── ui/             # Componentes shadcn/ui
│   ├── CartDrawer.tsx
│   ├── CheckoutForm.tsx
│   ├── Header.tsx
│   ├── Landing.tsx
│   ├── MenuListView.tsx
│   ├── ProductCard.tsx
│   ├── ReviewModal.tsx
│   ├── ReviewsSection.tsx
│   └── VerticalFeed.tsx
├── hooks/              # Custom hooks
├── lib/                # Utilidades y configuración
│   ├── data.ts         # Datos y funciones de Supabase
│   ├── supabase.ts     # Cliente Supabase
│   └── utils.ts        # Utilidades
├── store/              # Zustand stores
│   ├── cartStore.ts
│   └── reviewStore.ts
└── types/              # TypeScript types
    └── index.ts
```

## Variables de Entorno

Crear un archivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

## Build Estático

El proyecto está configurado para exportar a archivos estáticos:

```bash
npm run build
```

Los archivos se generan en el directorio `dist/`.