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


Para integrarlo con sheets hay q usar el script de google apps script.
```bash
/**
 * Google Apps Script - Benvenuto Focaccias
 * Recibe pedidos de la app web y los agrega a la planilla.
 */

// Nombre de la hoja (pestaña) donde están los pedidos
const SHEET_NAME = "Pedidos Benvenuto"; // ← Cambiá esto si tu pestaña tiene otro nombre

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return ContentService.createTextOutput(
        JSON.stringify({ status: "error", message: "Hoja no encontrada: " + SHEET_NAME })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const today = new Date();
    const dateStr = Utilities.formatDate(today, "America/Argentina/Buenos_Aires", "dd/MM/yyyy");

    // Encontrar la primera fila vacía en columna A (ignorar fórmulas en otras columnas)
    var lastRow = sheet.getLastRow();
    var colAValues = sheet.getRange("A1:A" + lastRow).getValues();
    var insertRow = lastRow + 1; // default: después de todo
    for (var i = colAValues.length - 1; i >= 0; i--) {
      if (colAValues[i][0] !== "" && colAValues[i][0] !== null) {
        insertRow = i + 2; // +1 por indice 0, +1 para la fila siguiente
        break;
      }
    }

    const items = data.items || [];

    items.forEach(function(item) {
      var unitPriceStr = formatArgPrice(item.unitPrice);
      var totalStr = formatArgPrice(item.total);
      
      sheet.getRange(insertRow, 1, 1, 11).setValues([[
        dateStr,                    // Fecha
        data.customerName || "",    // Nombre del cliente
        "",                         // Teléfono (vacío)
        item.product || "",         // Producto
        item.quantity || 1,         // Cantidad
        unitPriceStr,               // Precio unitario
        totalStr,                   // Total
        data.paymentMethod || "",   // Forma de pago
        "Recibido",                 // Estado del pedido
        "",                         // Fecha entrega
        data.notes || ""            // Notas
      ]]);
      insertRow++;
    });

    return ContentService.createTextOutput(
      JSON.stringify({ status: "ok", rowsAdded: items.length })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Formatea un número como precio argentino: 9.000,00
 */
function formatArgPrice(num) {
  if (!num && num !== 0) return "0,00";
  var parts = Number(num).toFixed(2).split(".");
  var intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return intPart + "," + parts[1];
}

// Test GET para verificar que el script está funcionando
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok", message: "Benvenuto Focaccias API activa 🍞" })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

permitir el acceso a cualquier persona que tenga el enlace y implemetar la api en el proyecto.