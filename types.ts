
export type BusinessVertical = 'TEXTILES' | 'SUPERMARKET';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: string;
  vertical: BusinessVertical;
  image: string;
  stock: number;
  rating: number;
  reviews: number;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  avatar?: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  total: number;
  vertical: BusinessVertical;
  items: CartItem[];
}
