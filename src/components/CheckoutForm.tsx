import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { PICKUP_POINTS, WHATSAPP_NUMBER } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, Clock, MapPin, User, MessageSquare, Phone } from 'lucide-react';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet';

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
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
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
          className="p-2 -ml-2 rounded-full hover:bg-terracota/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-carbon" />
        </button>
        <SheetTitle className="font-display text-2xl text-carbon">
          Finalizar Pedido
        </SheetTitle>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto py-4 space-y-6">
        {/* Total */}
        <div className="p-4 bg-terracota/10 rounded-xl">
          <div className="flex justify-between items-center">
            <span className="text-carbon/70">Total a pagar</span>
            <span className="font-display text-2xl text-carbon font-semibold">
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
          <RadioGroup
            value={deliveryMethod}
            onValueChange={(value) => setDeliveryMethod(value as 'takeaway' | 'pickup')}
            className="grid grid-cols-2 gap-3"
          >
            <div>
              <RadioGroupItem
                value="takeaway"
                id="takeaway"
                className="peer sr-only"
              />
              <Label
                htmlFor="takeaway"
                className="flex flex-col items-center justify-center p-4 bg-white border-2 border-terracota/20 rounded-xl cursor-pointer peer-data-[state=checked]:border-terracota peer-data-[state=checked]:bg-terracota/5 transition-all"
              >
                <span className="text-sm font-medium text-carbon">Take-away</span>
                <span className="text-xs text-carbon/60 mt-1">Retiro en puerta</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value="pickup"
                id="pickup"
                className="peer sr-only"
              />
              <Label
                htmlFor="pickup"
                className="flex flex-col items-center justify-center p-4 bg-white border-2 border-terracota/20 rounded-xl cursor-pointer peer-data-[state=checked]:border-terracota peer-data-[state=checked]:bg-terracota/5 transition-all"
              >
                <span className="text-sm font-medium text-carbon">Punto de retiro</span>
                <span className="text-xs text-carbon/60 mt-1">Elegir ubicación</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Pickup Points */}
        {deliveryMethod === 'pickup' && (
          <div className="space-y-3">
            <Label className="text-carbon flex items-center gap-2">
              <MapPin className="w-4 h-4 text-terracota" />
              Selecciona un punto
            </Label>
            <RadioGroup
              value={pickupPoint}
              onValueChange={setPickupPoint}
              className="space-y-2"
            >
              {PICKUP_POINTS.map((point) => (
                <div key={point.id}>
                  <RadioGroupItem
                    value={point.id}
                    id={point.id}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={point.id}
                    className="flex flex-col p-3 bg-white border-2 border-terracota/20 rounded-xl cursor-pointer peer-data-[state=checked]:border-terracota peer-data-[state=checked]:bg-terracota/5 transition-all"
                  >
                    <span className="text-sm font-medium text-carbon">{point.name}</span>
                    <span className="text-xs text-carbon/60">{point.address}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
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
                className={`p-2.5 text-sm rounded-lg border transition-all ${
                  pickupTime === time
                    ? 'bg-terracota text-crema border-terracota'
                    : 'bg-white text-carbon border-terracota/20 hover:border-terracota/50'
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
      <div className="border-t border-terracota/10 pt-4">
        <Button
          onClick={handleSubmit}
          disabled={!isValid || isSubmitting}
          className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-medium h-14 rounded-xl text-lg"
        >
          <Phone className="w-5 h-5 mr-2" />
          Enviar pedido por WhatsApp
        </Button>
        <p className="text-center text-xs text-carbon/50 mt-2">
          Te redirigiremos a WhatsApp para confirmar tu pedido
        </p>
      </div>
    </>
  );
}
