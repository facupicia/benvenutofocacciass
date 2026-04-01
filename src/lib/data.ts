import type { Focaccia } from '@/types';

const PRODUCTS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRme5cZlG_OMPewhoRYKKlVRE8Kcg2p0kIikP6I2ividJmHNpTZtm2gH4aRqK3CfSX8X1q8z2siIn-v/pub?gid=0&single=true&output=csv';



export const PICKUP_POINTS = [
  { id: 'casilda-center', name: 'Casilda - Centro', address: 'San Martín 1234, Casilda' },
];

export const WHATSAPP_NUMBER = '5493464566794';

/**
 * Parse a CSV line respecting quoted fields (handles commas inside quotes)
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

/**
 * Fetch products from the published Google Sheets CSV (cached in memory)
 */
let cachedProducts: Focaccia[] | null = null;

export async function fetchProducts(): Promise<Focaccia[]> {
  if (cachedProducts) return cachedProducts;

  try {
    const response = await fetch(PRODUCTS_CSV_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const csv = await response.text();
    const lines = csv.split(/\r?\n/).filter((l) => l.trim().length > 0);

    if (lines.length < 2) throw new Error('CSV has no data rows');

    // Skip header row (line 0), parse data rows
    const products: Focaccia[] = lines.slice(1).map((line) => {
      const cols = parseCSVLine(line);
      // Columns: ID, Name, Price, Stock, Ingredients, Image, Video, Description
      const rawImage = cols[5] || '';
      const rawVideo = cols[6] || '';
      // Filter out placeholder values like [URL] that aren't actual URLs
      const isValidUrl = (val: string) => val && val !== '[URL]' && !val.startsWith('[');
      return {
        id: parseInt(cols[0], 10),
        name: cols[1] || '',
        price: parseFloat(cols[2]) || 0,
        stock: parseInt(cols[3], 10) || 0,
        ingredients: cols[4] ? cols[4].split(',').map((s) => s.trim()) : [],
        image: isValidUrl(rawImage) ? rawImage : '/images/placeholder.jpg',
        video: isValidUrl(rawVideo) ? rawVideo : undefined,
        description: cols[7] || '',
      };
    });

    cachedProducts = products.filter((p) => p.id && p.name);
    return cachedProducts;
  } catch (err) {
    console.warn('Failed to fetch products from Google Sheets:', err);
    return [];
  }
}
