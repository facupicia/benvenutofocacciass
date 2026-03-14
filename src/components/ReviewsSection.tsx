"use client";

import { useEffect, useState, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useReviewStore } from '@/store/reviewStore';

export function ReviewsSection() {
  const { reviews, isLoading, loadReviews, getAverageRating } = useReviewStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  // Show max 5 reviews at a time, cycle through all
  const displayReviews = reviews.slice(0, Math.min(reviews.length, 20));
  const maxVisible = Math.min(displayReviews.length, 5);

  // Auto-rotate reviews
  useEffect(() => {
    if (displayReviews.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % displayReviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [displayReviews.length, isPaused]);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + displayReviews.length) % displayReviews.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % displayReviews.length);
  };

  // Get visible reviews window (up to 5 centered around activeIndex)
  const getVisibleReviews = () => {
    if (displayReviews.length <= maxVisible) return displayReviews;
    const result = [];
    for (let i = 0; i < maxVisible; i++) {
      const idx = (activeIndex + i) % displayReviews.length;
      result.push(displayReviews[idx]);
    }
    return result;
  };

  if (isLoading) {
    return (
      <section className="py-24 px-4 bg-white/50">
        <div className="max-w-5xl mx-auto text-center">
          <div className="w-8 h-8 border-2 border-oliva border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  if (displayReviews.length === 0) return null;

  const avgRating = getAverageRating();
  const visibleReviews = getVisibleReviews();

  return (
    <section className="py-24 px-4 bg-crust/5 overflow-hidden" id="reviews">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h3 className="text-4xl text-oliva font-bold mb-4">Lo que dicen nuestros clientes</h3>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(avgRating)
                      ? 'fill-oliva text-oliva'
                      : 'text-oliva/30'
                  }`}
                />
              ))}
            </div>
            <span className="text-crust/70 text-lg font-medium">{avgRating}</span>
            <span className="text-crust/50 text-sm">({reviews.length} reseña{reviews.length !== 1 ? 's' : ''})</span>
          </div>
        </div>

        {/* Reviews Carousel - Mobile: single card / Desktop: grid */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Mobile: Single card view */}
          <div className="md:hidden">
            <ReviewCard review={displayReviews[activeIndex]} />

            {/* Navigation */}
            {displayReviews.length > 1 && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={goPrev}
                  className="w-10 h-10 rounded-full bg-oliva/10 flex items-center justify-center hover:bg-oliva/20 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-oliva" />
                </button>
                <div className="flex gap-1.5">
                  {displayReviews.slice(0, Math.min(displayReviews.length, 8)).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === activeIndex ? 'bg-oliva w-6' : 'bg-oliva/30'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={goNext}
                  className="w-10 h-10 rounded-full bg-oliva/10 flex items-center justify-center hover:bg-oliva/20 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-oliva" />
                </button>
              </div>
            )}
          </div>

          {/* Desktop: Grid of visible reviews */}
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-3 gap-6">
            {visibleReviews.slice(0, 3).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {/* Desktop navigation arrows */}
          {displayReviews.length > 3 && (
            <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -left-4 -right-4 justify-between pointer-events-none">
              <button
                onClick={goPrev}
                className="pointer-events-auto w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-oliva/10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-oliva" />
              </button>
              <button
                onClick={goNext}
                className="pointer-events-auto w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-oliva/10 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-oliva" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: { id: string; rating: number; description: string; date: string } }) {
  const formattedDate = new Date(review.date).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-oliva/10 relative">
      <Quote className="w-8 h-8 text-oliva/15 absolute top-4 right-4" />

      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= review.rating ? 'fill-oliva text-oliva' : 'text-oliva/20'
            }`}
          />
        ))}
      </div>

      {/* Description */}
      {review.description && (
        <p className="text-crust/80 text-sm leading-relaxed mb-4 line-clamp-4">
          "{review.description}"
        </p>
      )}

      {/* Date */}
      <p className="text-crust/40 text-xs">{formattedDate}</p>
    </div>
  );
}
