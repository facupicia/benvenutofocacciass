export interface Focaccia {
  id: number;
  name: string;
  price: number;
  stock: number;
  ingredients: string[];
  image: string;
  description: string;
}

export interface CartItem {
  focaccia: Focaccia;
  quantity: number;
}

export interface OrderDetails {
  name: string;
  deliveryMethod: 'takeaway' | 'pickup';
  pickupTime: string;
  notes?: string;
}
