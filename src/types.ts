export type TshirtColor = 'bege' | 'branca' | 'preta';
export type TshirtSize = 'L' | 'XL';

export interface ProductColor {
  id: TshirtColor;
  name: string;
  nameEn: string;
  hex: string;
  borderHex: string;
  description: string;
  badge: string;
  image: string;
  stockStatus: string;
}

export interface CartItem {
  id: string;
  color: TshirtColor;
  colorName: string;
  size: TshirtSize;
  quantity: number;
  unitPrice: number;
  image: string;
}

export interface OrderForm {
  color: TshirtColor;
  size: TshirtSize;
  quantity: number;
  customerName: string;
  phone: string;
  address: string;
  cityArea: string;
  notes?: string;
}

export interface ConfirmedOrder {
  orderId: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  customerName: string;
  phone: string;
  address: string;
  cityArea: string;
  subtotal: number;
  discount: number;
  total: number;
  whatsappUrl: string;
}
