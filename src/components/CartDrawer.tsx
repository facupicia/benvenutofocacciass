import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/overlays";
import { Button } from "@/components/ui/inputs";
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { CheckoutForm } from './CheckoutForm';

interface CartDrawerProps {
  trigger?: React.ReactNode;
}

export function CartDrawer({ trigger }: CartDrawerProps) {
  const [showCheckout, setShowCheckout] = useState(false);
  const { items, getTotalItems, getTotalPrice, updateQuantity, removeFromCart } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const defaultTrigger = (
    <button className="relative w-12 h-12 rounded-full bg-terracota/90 backdrop-blur-sm flex items-center justify-center shadow-lg active:scale-95 transition-transform">
      <ShoppingBag className="w-5 h-5 text-crema" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-carbon rounded-full text-crema text-xs font-bold flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </button>
  );

  if (totalItems === 0 && !trigger) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          {defaultTrigger}
        </SheetTrigger>
        <SheetContent className="bg-crema border-l border-terracota/20 w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="font-display text-2xl text-carbon">Tu Pedido</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
            <div className="w-20 h-20 rounded-full bg-terracota/10 flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-terracota/50" />
            </div>
            <p className="text-carbon/60 text-center">
              Tu carrito está vacío<br />
              <span className="text-sm">Agrega algunas focaccias deliciosas</span>
            </p>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger || defaultTrigger}
      </SheetTrigger>
      <SheetContent className="bg-white border-l border-terracota/20 w-full sm:max-w-md flex flex-col">
        {!showCheckout ? (
          <>
            <SheetHeader>
              <SheetTitle className="text-2xl text-carbon">
                Tu Pedido ({totalItems})
              </SheetTitle>
            </SheetHeader>
            
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4 pl-4 pr-4">
              {items.map((item) => (
                <div 
                  key={item.focaccia.id}
                  className="flex gap-3 p-3 bg-white rounded-xl border border-terracota/10"
                >
                  {/* Image */}
                  <div 
                    className="w-20 h-20 rounded-lg bg-cover bg-center flex-shrink-0"
                    style={{ backgroundImage: `url(${item.focaccia.image})` }}
                  />
                  
                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-carbon font-medium truncate">
                      {item.focaccia.name}
                    </h4>
                    <p className="text-terracota font-semibold">
                      ${item.focaccia.price.toLocaleString('es-AR')}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.focaccia.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full bg-crema border border-terracota/20 flex items-center justify-center active:scale-95"
                        >
                          <Minus className="w-3 h-3 text-carbon" />
                        </button>
                        <span className="text-carbon font-medium w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.focaccia.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-terracota flex items-center justify-center active:scale-95"
                        >
                          <Plus className="w-3 h-3 text-crema" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.focaccia.id)}
                        className="p-1.5 text-carbon/40 hover:text-carbon transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-black/10 pt-4 space-y-4 pl-4 pr-4">
              <div className="flex justify-between items-center">
                <span className="text-carbon/70">Subtotal</span>
                <span className="text-xl text-carbon">
                  ${totalPrice.toLocaleString('es-AR')}
                </span>
              </div>
              
              <Button
                onClick={() => setShowCheckout(true)}
                className="w-full bg-crema hover:bg-crema/90 text-black font-medium h-12 rounded-xl"
              >
                Continuar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </>
        ) : (
          <CheckoutForm onBack={() => setShowCheckout(false)} />
        )}
      </SheetContent>
    </Sheet>
  );
}
