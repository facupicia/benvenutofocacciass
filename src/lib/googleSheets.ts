/**
 * Google Sheets integration via Google Apps Script Web App.
 * Sends order data to the spreadsheet as a new row.
 */

interface SheetOrderItem {
  product: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface SheetOrderPayload {
  customerName: string;
  items: SheetOrderItem[];
  paymentMethod: string;
  notes: string;
}

const GOOGLE_SHEETS_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;

/**
 * Submit order data to Google Sheets via Apps Script.
 * This is "fire and forget" — failures are silently logged
 * so the WhatsApp flow is never blocked.
 */
export async function submitOrderToSheet(payload: SheetOrderPayload): Promise<boolean> {
  if (!GOOGLE_SHEETS_URL) {
    console.warn('[Google Sheets] URL not configured, skipping spreadsheet sync.');
    return false;
  }

  try {
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors', // Apps Script deployed as web app requires no-cors from browser
      headers: {
        'Content-Type': 'text/plain', // no-cors only allows text/plain
      },
      body: JSON.stringify(payload),
    });

    // With no-cors we get an opaque response, so we can't check status.
    // We consider it successful if no exception was thrown.
    console.log('[Google Sheets] Order sent to spreadsheet.');
    return true;
  } catch (error) {
    console.error('[Google Sheets] Failed to send order:', error);
    return false;
  }
}

/**
 * Build the payload from cart state for the Google Sheet.
 */
export function buildSheetPayload(
  customerName: string,
  items: { name: string; quantity: number; price: number }[],
  paymentMethod: string,
  notes: string
): SheetOrderPayload {
  return {
    customerName,
    items: items.map((item) => ({
      product: item.name,
      quantity: item.quantity,
      unitPrice: item.price,
      total: item.price * item.quantity,
    })),
    paymentMethod: paymentMethod === 'transferencia' ? 'Transferencia' : 'Efectivo',
    notes,
  };
}
