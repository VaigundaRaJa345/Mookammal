
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { BusinessVertical, Product, CartItem, User, Order } from './types';
import { MOCK_PRODUCTS } from './constants';

interface AppContextType {
  vertical: BusinessVertical;
  setVertical: (v: BusinessVertical) => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: { TEXTILES: CartItem[]; SUPERMARKET: CartItem[] };
  addToCart: (p: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  user: User | null;
  setUser: (u: User | null) => void;
  orders: Order[];
  placeOrder: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vertical, setVerticalState] = useState<BusinessVertical>(() => {
    return (localStorage.getItem('mookkammal_vertical') as BusinessVertical) || 'TEXTILES';
  });
  
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('mookkammal_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [cart, setCart] = useState<{ TEXTILES: CartItem[]; SUPERMARKET: CartItem[] }>(() => {
    const saved = localStorage.getItem('mookkammal_cart');
    return saved ? JSON.parse(saved) : { TEXTILES: [], SUPERMARKET: [] };
  });

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    localStorage.setItem('mookkammal_vertical', vertical);
  }, [vertical]);

  useEffect(() => {
    localStorage.setItem('mookkammal_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('mookkammal_user', JSON.stringify(user));
  }, [user]);

  const setVertical = (v: BusinessVertical) => setVerticalState(v);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const v = product.vertical;
      const existing = prev[v].find(item => item.id === product.id);
      if (existing) {
        return {
          ...prev,
          [v]: prev[v].map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        };
      }
      return {
        ...prev,
        [v]: [...prev[v], { ...product, quantity: 1 }]
      };
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => ({
      ...prev,
      [vertical]: prev[vertical].filter(item => item.id !== id)
    }));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty < 1) return;
    setCart(prev => ({
      ...prev,
      [vertical]: prev[vertical].map(item => item.id === id ? { ...item, quantity: qty } : item)
    }));
  };

  const placeOrder = () => {
    const currentItems = cart[vertical];
    if (currentItems.length === 0) return;

    const newOrder: Order = {
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      date: new Date().toISOString(),
      status: 'PENDING',
      total: currentItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      vertical,
      items: [...currentItems]
    };

    setOrders(prev => [newOrder, ...prev]);
    setCart(prev => ({ ...prev, [vertical]: [] }));
  };

  return (
    <AppContext.Provider value={{
      vertical, setVertical, products, setProducts, cart, addToCart, removeFromCart, updateQuantity, user, setUser, orders, placeOrder
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
