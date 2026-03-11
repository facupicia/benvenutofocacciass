import { useState } from 'react';
import type { Focaccia } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { Plus, Minus, Check } from 'lucide-react';

interface ProductCardProps {
  focaccia: Focaccia;
}

export function ProductCard({ focaccia }: ProductCardProps) {
  const [showAdded, setShowAdded] = useState(false);
  const { addToCart, items, updateQuantity } = useCartStore();
  
  const cartItem = items.find(item => item.focaccia.id === focaccia.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    addToCart(focaccia);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 1500);
  };

  const handleIncrease = () => {
    addToCart(focaccia);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      updateQuantity(focaccia.id, quantity - 1);
    }
  };

  return (
    <div className="relative h-screen w-full flex-shrink-0 snap-start overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${focaccia.image})` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 pb-24">
        {/* Product Info */}
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold text-white drop-shadow-lg">
            {focaccia.name}
          </h2>
          
          <p className="text-white/90 text-sm leading-relaxed max-w-md drop-shadow-md">
            {focaccia.description}
          </p>

          {/* Ingredients */}
          <div className="flex flex-wrap gap-1.5">
            {focaccia.ingredients.slice(0, 4).map((ingredient, idx) => (
              <span 
                key={idx}
                className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white"
              >
                {ingredient}
              </span>
            ))}
          </div>

          {/* Price and Add Button */}
          <div className="flex items-center justify-between pt-4 pb-8">
            <div className="flex items-baseline gap-1">
              <span className="text-white/70 text-sm">$</span>
              <span className="text-4xl font-bold text-white">
                {focaccia.price.toLocaleString('es-AR')}
              </span>
            </div>

            {/* Quantity Controls */}
            {quantity > 0 ? (
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-full p-1.5">
                <button
                  onClick={handleDecrease}
                  className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center active:scale-95 transition-transform"
                >
                  <Minus className="w-5 h-5 text-carbon" />
                </button>
                <span className="text-white font-semibold text-lg min-w-[24px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrease}
                  className="w-10 h-10 rounded-full bg-terracota flex items-center justify-center active:scale-95 transition-transform"
                >
                  <Plus className="w-5 h-5 text-crema" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAdd}
                className="relative w-14 h-14 rounded-full bg-terracota flex items-center justify-center active:scale-95 transition-all shadow-lg hover:bg-terracota/90"
              >
                {showAdded ? (
                  <Check className="w-6 h-6 text-crema" />
                ) : (
                  <Plus className="w-7 h-7 text-crema" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stock Badge */}
      {focaccia.stock <= 3 && (
        <div className="absolute top-20 left-4 px-3 py-1.5 bg-carbon/90 rounded-full">
          <span className="text-crema text-xs font-medium">
            ¡Solo {focaccia.stock} disponibles!
          </span>
        </div>
      )}
    </div>
  );
}
