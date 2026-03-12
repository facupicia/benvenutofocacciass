import { useState } from 'react';
import { Star, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/overlays';
import { useReviewStore } from '@/store/reviewStore';

interface ReviewModalProps {
  children?: React.ReactNode;
  triggerClassName?: string;
}

export function ReviewModal({ children, triggerClassName }: ReviewModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const addReview = useReviewStore((state) => state.addReview);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setTimeout(() => {
        setRating(0);
        setHoverRating(0);
        setDescription('');
        setSubmitted(false);
      }, 300);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    setIsSubmitting(true);
    try {
      await addReview({
        rating,
        description: description.trim(),
      });
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => handleOpenChange(false), 2000);
    } catch (err) {
      console.error('Failed to submit review:', err);
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger className={triggerClassName} asChild={!!children}>
        {children || (
          <button className="flex items-center gap-2 px-4 py-2 bg-oliva text-crema font-medium rounded-full hover:bg-oliva/90 transition-colors shadow-md">
            <Star className="w-4 h-4 fill-current" />
            <span>Dejar Reseña</span>
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-crema border-none p-0 overflow-hidden" showCloseButton={false}>
        {submitted ? (
          <div className="p-8 text-center flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-oliva/20 rounded-full flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-oliva fill-oliva" />
            </div>
            <h3 className="text-2xl font-bold text-crust mb-2">¡Gracias!</h3>
            <p className="text-crust/80">Tu reseña nos ayuda a seguir mejorando.</p>
          </div>
        ) : (
          <div className="p-6">
            <DialogHeader className="mb-6 flex flex-row items-center justify-between pb-4 border-b border-oliva/20">
              <DialogTitle className="text-2xl font-bold text-crust">Tu Opinión</DialogTitle>
              <DialogClose className="rounded-full p-2 hover:bg-oliva/10 text-crust/50 hover:text-crust transition-colors">
                <X className="w-5 h-5" />
                <span className="sr-only">Cerrar</span>
              </DialogClose>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Star Rating */}
              <div className="flex flex-col items-center">
                <label className="text-sm font-medium text-crust/70 mb-3">¿Qué te pareció?</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= (hoverRating || rating)
                            ? 'fill-oliva text-oliva'
                            : 'text-oliva/30'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label htmlFor="review-description" className="text-sm font-medium text-crust/70">
                  Cuéntanos más (opcional)
                </label>
                <textarea
                  id="review-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="¿Qué fue lo que más te gustó?"
                  maxLength={300}
                  className="w-full h-28 px-4 py-3 bg-white/50 border border-oliva/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-oliva/50 focus:border-oliva/50 resize-none text-crust placeholder:text-crust/40 transition-shadow"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={rating === 0 || isSubmitting}
                className="w-full py-4 bg-oliva text-crema font-bold uppercase tracking-wider rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-oliva/90 hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 relative overflow-hidden"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-crema border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Enviar Reseña'
                )}
              </button>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
