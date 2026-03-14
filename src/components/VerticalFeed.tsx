"use client";

import { useState, useRef, useEffect } from 'react';
import { focaccias as staticFocaccias, fetchProducts } from '@/lib/data';
import { ProductCard } from './ProductCard';
import { MenuListView } from './MenuListView';
import { CartDrawer } from './CartDrawer';
import { ReviewModal } from './ReviewModal';
import { ChevronUp, ChevronDown, ShoppingBag, LayoutGrid, List, Star } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Header } from './Header';
import type { Focaccia } from '@/types';

interface VerticalFeedProps {
  onNavigate: (view: 'landing' | 'menu') => void;
}

export function VerticalFeed({ onNavigate }: VerticalFeedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'feed' | 'list'>('feed');
  const [products, setProducts] = useState<Focaccia[]>(staticFocaccias);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  // Fetch products from Supabase
  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const scrollToIndex = (index: number) => {
    if (index < 0 || index >= products.length) return;

    const container = containerRef.current;
    if (!container) return;

    const itemHeight = container.clientHeight;
    container.scrollTo({
      top: index * itemHeight,
      behavior: 'smooth'
    });
    setCurrentIndex(index);
  };

  const handlePrev = () => scrollToIndex(currentIndex - 1);
  const handleNext = () => scrollToIndex(currentIndex + 1);

  // Handle scroll snap
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const itemHeight = container.clientHeight;
      const newIndex = Math.round(container.scrollTop / itemHeight);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < products.length) {
        setCurrentIndex(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentIndex]);

  // Touch handling for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Wheel handling
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  return (
    <div className="relative h-screen w-full bg-crust overflow-hidden">
      {/* Header */}
      <Header onNavigate={onNavigate} />
      <div className="absolute top-0 right-0 z-50 p-4 pt-6 flex items-center gap-2">

        {/* View Toggle */}
        <button
          onClick={() => setViewMode(viewMode === 'feed' ? 'list' : 'feed')}
          className="w-10 h-10 rounded-full bg-oliva backdrop-blur-sm flex items-center justify-center active:scale-95 transition-all hover:bg-white/30"
        >
          {viewMode === 'feed' ? (
            <List className="w-5 h-5 text-white" />
          ) : (
            <LayoutGrid className="w-5 h-5 text-white" />
          )}
        </button>
        <CartDrawer />
      </div>

      {viewMode === 'feed' ? (
        <>
          {/* Scroll Container */}
          <div
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
            className="h-full w-full overflow-y-auto snap-y snap-mandatory scrollbar-hide"
            style={{ scrollBehavior: 'smooth' }}
          >
            {products.map((focaccia) => (
              <ProductCard
                key={focaccia.id}
                focaccia={focaccia}
              />
            ))}
          </div>

          {/* Review Button */}
          <div className="absolute right-4 top-24 z-50 flex flex-col gap-2">
            <ReviewModal>
              <button className="w-10 h-10 rounded-full bg-oliva backdrop-blur-sm flex items-center justify-center active:scale-95 transition-all hover:bg-white">
                <Star className="w-5 h-5 text-white fill-white" />
              </button>
            </ReviewModal>
          </div>

          {/* Navigation Indicators */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">

            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                    ? 'bg-oliva w-2 h-6'
                    : 'bg-white/50 hover:bg-white'
                  }`}
              />
            ))}
          </div>

          {/* Scroll Buttons (Desktop) */}
          <div className="hidden md:flex absolute right-4 bottom-24 z-50 flex-col gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center disabled:opacity-30 hover:bg-white/30 transition-colors"
            >
              <ChevronUp className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === products.length - 1}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center disabled:opacity-30 hover:bg-white/30 transition-colors"
            >
              <ChevronDown className="w-5 h-5 text-white" />
            </button>
          </div>
        </>
      ) : (
        <MenuListView focaccias={products} />
      )}

      {/* Cart Summary (when items in cart) */}
      {totalItems > 0 && (
        <div className="absolute bottom-6 left-4 right-4 z-50">
          <CartDrawer
            trigger={
              <div className="bg-oliva backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between shadow-lg cursor-pointer active:scale-[0.98] transition-transform">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-crema/20 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-crema" />
                  </div>
                  <div>
                    <p className="text-crema font-medium">{totalItems} item{totalItems > 1 ? 's' : ''}</p>
                    <p className="text-crema/70 text-sm">En tu pedido</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-crema text-xl font-semibold">
                    ${useCartStore.getState().getTotalPrice().toLocaleString('es-AR')}
                  </p>
                </div>
              </div>
            }
          />
        </div>
      )}

      {/* Product Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40">
        <div className="px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full">
          <span className="text-white/90 text-sm">
            {currentIndex + 1} / {products.length}
          </span>
        </div>
      </div>
    </div>
  );
}
