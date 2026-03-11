import { useState } from 'react';
import type { Focaccia } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { Plus, Minus, Check } from 'lucide-react';

interface MenuListItemProps {
  focaccia: Focaccia;
}

function MenuListItem({ focaccia }: MenuListItemProps) {
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
    <div className="flex gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-oliva/10 transition-all hover:shadow-md">
      {/* Image */}
      <div
        className="w-24 h-24 rounded-xl bg-cover bg-center flex-shrink-0"
        style={{ backgroundImage: `url(${focaccia.image})` }}
      />

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-crust truncate">{focaccia.name}</h3>
          <p className="text-crust/60 text-xs leading-relaxed line-clamp-2 mt-0.5">
            {focaccia.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-xl font-bold text-crust">
            ${focaccia.price.toLocaleString('es-AR')}
          </span>

          {/* Quantity Controls */}
          {quantity > 0 ? (
            <div className="flex items-center gap-2 bg-oliva/10 rounded-full p-1">
              <button
                onClick={handleDecrease}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center active:scale-95 transition-transform shadow-sm"
              >
                <Minus className="w-4 h-4 text-crust" />
              </button>
              <span className="text-crust font-semibold text-sm min-w-[20px] text-center">
                {quantity}
              </span>
              <button
                onClick={handleIncrease}
                className="w-8 h-8 rounded-full bg-oliva flex items-center justify-center active:scale-95 transition-transform"
              >
                <Plus className="w-4 h-4 text-crema" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className="w-10 h-10 rounded-full bg-oliva flex items-center justify-center active:scale-95 transition-all shadow-sm hover:bg-oliva/90"
            >
              {showAdded ? (
                <Check className="w-5 h-5 text-crema" />
              ) : (
                <Plus className="w-5 h-5 text-crema" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

interface MenuListViewProps {
  focaccias: Focaccia[];
}

export function MenuListView({ focaccias }: MenuListViewProps) {
  return (
    <div className="h-full overflow-y-auto scrollbar-hide pb-32 pt-20 px-4">
      <div className="max-w-lg mx-auto space-y-3">
        {focaccias.map((focaccia) => (
          <MenuListItem key={focaccia.id} focaccia={focaccia} />
        ))}
      </div>
    </div>
  );
}
