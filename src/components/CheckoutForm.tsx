"use client";

import { Button, Input, Label } from "@/components/ui/inputs"
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { PICKUP_POINTS, WHATSAPP_NUMBER } from '@/lib/data';
;
;
;
;
import { ArrowLeft, Clock, MapPin, User, MessageSquare, Phone } from 'lucide-react';
import { SheetHeader, SheetTitle } from "@/components/ui/overlays";

interface CheckoutFormProps {
  onBack: () => void;
}

export function CheckoutForm({ onBack }: CheckoutFormProps) {
  const [name, setName] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'takeaway' | 'pickup'>('takeaway');
  const [pickupTime, setPickupTime] = useState('');
  const [pickupPoint, setPickupPoint] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { getTotalPrice, generateWhatsAppMessage, clearCart } = useCartStore();
  const totalPrice = getTotalPrice();

  const timeSlots = [
    '16:00 - 17:00',
    '17:00 - 18:00',
    '18:00 - 19:00',
    '19:00 - 20:00',
  ];

  const handleSubmit = () => {
    if (!name || !pickupTime) return;
    if (deliveryMethod === 'pickup' && !pickupPoint) return;

    setIsSubmitting(true);

    const orderDetails = {
      name,
      deliveryMethod,
      pickupTime,
      notes: notes || undefined,
    };

    useCartStore.getState().setOrderDetails(orderDetails);

    const message = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Clear cart and open WhatsApp
    clearCart();
    window.open(whatsappUrl, '_blank');

    setIsSubmitting(false);
  };

  const isValid = name && pickupTime && (deliveryMethod === 'takeaway' || pickupPoint);

  return (
    <>
      <SheetHeader className="flex-row items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-crema/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-carbon" />
        </button>
        <SheetTitle className="text-2xl text-carbon">
          Finalizar Pedido
        </SheetTitle>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto space-y-6 pl-4 pr-4">
        {/* Total */}
        <div className="p-4 bg-terracota/10 rounded-xl">
          <div className="flex justify-between items-center">
            <span className="text-carbon/70">Total a pagar</span>
            <span className="text-2xl text-carbon font-semibold">
              ${totalPrice.toLocaleString('es-AR')}
            </span>
          </div>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label className="text-carbon flex items-center gap-2">
            <User className="w-4 h-4 text-terracota" />
            Tu nombre
          </Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="¿Cómo te llamamos?"
            className="bg-white border-terracota/20 text-carbon placeholder:text-carbon/40"
          />
        </div>

        {/* Delivery Method */}
        <div className="space-y-3">
          <Label className="text-carbon flex items-center gap-2">
            <MapPin className="w-4 h-4 text-terracota" />
            Método de entrega
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setDeliveryMethod('takeaway')}
              className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                deliveryMethod === 'takeaway'
                  ? 'border-oliva bg-oliva/10'
                  : 'bg-white border-terracota/20 hover:border-terracota/40'
              }`}
            >
              <span className="text-sm font-medium text-carbon">Take-away</span>
              <span className="text-xs text-carbon/60 mt-1">Retiro en puerta</span>
            </button>
            <button
              type="button"
              onClick={() => setDeliveryMethod('pickup')}
              className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                deliveryMethod === 'pickup'
                  ? 'border-oliva bg-oliva/10'
                  : 'bg-white border-terracota/20 hover:border-terracota/40'
              }`}
            >
              <span className="text-sm font-medium text-carbon">Punto de retiro</span>
              <span className="text-xs text-carbon/60 mt-1">Elegir ubicación</span>
            </button>
          </div>
        </div>

        {/* Pickup Points */}
        {deliveryMethod === 'pickup' && (
          <div className="space-y-3">
            <Label className="text-carbon flex items-center gap-2">
              <MapPin className="w-4 h-4 text-terracota" />
              Selecciona un punto
            </Label>
            <div className="space-y-2">
              {PICKUP_POINTS.map((point) => (
                <button
                  key={point.id}
                  type="button"
                  onClick={() => setPickupPoint(point.id)}
                  className={`flex flex-col p-3 w-full text-left border-2 rounded-xl cursor-pointer transition-all ${
                    pickupPoint === point.id
                      ? 'border-oliva bg-oliva/10'
                      : 'bg-white border-terracota/20 hover:border-terracota/40'
                  }`}
                >
                  <span className="text-sm font-medium text-carbon">{point.name}</span>
                  <span className="text-xs text-carbon/60">{point.address}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Time Slot */}
        <div className="space-y-3">
          <Label className="text-carbon flex items-center gap-2">
            <Clock className="w-4 h-4 text-terracota" />
            Horario de retiro
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setPickupTime(time)}
                className={`p-2.5 text-sm rounded-lg border transition-all ${pickupTime === time
                  ? 'border-oliva bg-oliva/10'
                  : 'bg-white border-terracota/20 hover:border-terracota/40'
                  }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label className="text-carbon flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-terracota" />
            Notas adicionales (opcional)
          </Label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="¿Alguna indicación especial?"
            className="w-full p-3 bg-white border border-terracota/20 rounded-xl text-carbon placeholder:text-carbon/40 resize-none h-20 focus:outline-none focus:ring-2 focus:ring-terracota/30"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4 pb-14 pl-10 pr-10">
        <Button
          onClick={handleSubmit}
          disabled={!isValid || isSubmitting}
          className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-medium h-11 rounded-xl text-sm"
        >
          <Phone className="w-4 h-4 mr-1.5" />
          Enviar pedido por WhatsApp
        </Button>
        <p className="text-center text-xs text-carbon/50 mt-2">
          Te redirigiremos a WhatsApp para confirmar tu pedido
        </p>
      </div>
    </>
  );
}
