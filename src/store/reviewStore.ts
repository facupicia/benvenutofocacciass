import { create } from 'zustand';
import type { Review } from '@/types';

interface ReviewState {
  reviews: Review[];
  isLoading: boolean;
  loadReviews: () => Promise<void>;
  addReview: (review: { rating: number; description: string }) => Promise<void>;
  getAverageRating: () => number;
}

// Sample seed reviews so the section isn't empty
const SEED_REVIEWS: Review[] = [
  {
    id: '1',
    rating: 5,
    description: 'La mejor focaccia que probé. La masa es increíble, se nota la fermentación larga.',
    date: '2026-03-15T10:00:00Z',
  },
  {
    id: '2',
    rating: 5,
    description: 'Pedí la Mediterránea y estaba espectacular. Los ingredientes fresquísimos.',
    date: '2026-03-10T14:30:00Z',
  },
  {
    id: '3',
    rating: 4,
    description: 'Muy rica la Barese, la papa le da un toque único. Voy a repetir seguro.',
    date: '2026-02-28T09:00:00Z',
  },
];

export const useReviewStore = create<ReviewState>()((set, get) => ({
  reviews: [],
  isLoading: false,

  loadReviews: async () => {
    set({ isLoading: true });
    try {
      // Use seed reviews (could be replaced with a Google Sheets fetch in the future)
      set({ reviews: SEED_REVIEWS });
    } catch (err) {
      console.error('Failed to load reviews:', err);
    } finally {
      set({ isLoading: false });
    }
  },

  addReview: async (review) => {
    const newReview: Review = {
      id: crypto.randomUUID(),
      rating: review.rating,
      description: review.description || '',
      date: new Date().toISOString(),
    };
    set((state) => ({
      reviews: [newReview, ...state.reviews],
    }));
  },

  getAverageRating: () => {
    const { reviews } = get();
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((total, r) => total + r.rating, 0);
    return Number((sum / reviews.length).toFixed(1));
  },
}));
