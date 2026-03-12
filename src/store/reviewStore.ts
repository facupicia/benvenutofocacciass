import { create } from 'zustand';
import type { Review } from '@/types';
import { fetchReviews, insertReview } from '@/lib/data';

interface ReviewState {
  reviews: Review[];
  isLoading: boolean;
  loadReviews: () => Promise<void>;
  addReview: (review: { rating: number; description: string }) => Promise<void>;
  getAverageRating: () => number;
}

export const useReviewStore = create<ReviewState>()((set, get) => ({
  reviews: [],
  isLoading: false,

  loadReviews: async () => {
    set({ isLoading: true });
    try {
      const data = await fetchReviews(20);
      const reviews: Review[] = data.map((r: Record<string, unknown>) => ({
        id: r.id as string,
        rating: r.rating as number,
        description: (r.description as string) || '',
        date: r.created_at as string,
      }));
      set({ reviews });
    } catch (err) {
      console.error('Failed to load reviews:', err);
    } finally {
      set({ isLoading: false });
    }
  },

  addReview: async (review) => {
    const data = await insertReview(review);
    const newReview: Review = {
      id: data.id,
      rating: data.rating,
      description: data.description || '',
      date: data.created_at,
    };
    set((state) => ({
      reviews: [newReview, ...state.reviews],
    }));
  },

  getAverageRating: () => {
    const { reviews } = get();
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return Number((sum / reviews.length).toFixed(1));
  },
}));
