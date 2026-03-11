import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Focaccia, OrderDetails } from '@/types';

interface CartState {
  items: CartItem[];
  orderDetails: OrderDetails | null;
  addToCart: (focaccia: Focaccia) => void;
  removeFromCart: (focacciaId: number) => void;
  updateQuantity: (focacciaId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  setOrderDetails: (details: OrderDetails) => void;
  generateWhatsAppMessage: () => string;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      orderDetails: null,

      addToCart: (focaccia: Focaccia) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.focaccia.id === focaccia.id
          );
          
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.focaccia.id === focaccia.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          
          return {
            items: [...state.items, { focaccia, quantity: 1 }],
          };
        });
      },

      removeFromCart: (focacciaId: number) => {
        set((state) => ({
          items: state.items.filter((item) => item.focaccia.id !== focacciaId),
        }));
      },

      updateQuantity: (focacciaId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(focacciaId);
          return;
        }
        
        set((state) => ({
          items: state.items.map((item) =>
            item.focaccia.id === focacciaId
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [], orderDetails: null });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.focaccia.price * item.quantity,
          0
        );
      },

      setOrderDetails: (details: OrderDetails) => {
        set({ orderDetails: details });
      },

      generateWhatsAppMessage: () => {
        const { items, orderDetails } = get();
        
        if (!orderDetails || items.length === 0) {
          return '';
        }

        const itemsList = items
          .map((item) => `• ${item.quantity}x ${item.focaccia.name} - $${(item.focaccia.price * item.quantity).toLocaleString('es-AR')}`)
          .join('\n');

        const total = get().getTotalPrice();
        
        const deliveryText = orderDetails.deliveryMethod === 'takeaway' 
          ? 'Take-away' 
          : 'Punto de Retiro';

        return `¡Hola! Quiero hacer un pedido de focaccias:

${itemsList}

*Total: $${total.toLocaleString('es-AR')}*

*Datos de entrega:*
Nombre: ${orderDetails.name}
Método: ${deliveryText}
Horario: ${orderDetails.pickupTime}
${orderDetails.notes ? `Notas: ${orderDetails.notes}` : ''}`;
      },
    }),
    {
      name: 'benvenuto-cart',
    }
  )
);
