
import React, { createContext, useContext, useState, useEffect } from 'react';
import { BusinessVertical, Product, CartItem, User, Order } from './types';
import { MOCK_PRODUCTS } from './constants';
import { GoogleGenAI } from "@google/genai";

interface AppContextType {
  vertical: BusinessVertical;
  setVertical: (v: BusinessVertical) => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  addProduct: (p: Omit<Product, 'id' | 'rating' | 'reviews'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  cart: { TEXTILES: CartItem[]; SUPERMARKET: CartItem[] };
  addToCart: (p: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  user: User | null;
  setUser: (u: User | null) => void;
  orders: Order[];
  placeOrder: () => void;
  getAIResponse: (prompt: string, modelType?: 'flash' | 'pro') => Promise<string>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vertical, setVerticalState] = useState<BusinessVertical>(() => {
    return (localStorage.getItem('mookkammal_vertical') as BusinessVertical) || 'TEXTILES';
  });
  
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('mookkammal_products');
    return saved ? JSON.parse(saved) : MOCK_PRODUCTS;
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('mookkammal_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [cart, setCart] = useState<{ TEXTILES: CartItem[]; SUPERMARKET: CartItem[] }>(() => {
    const saved = localStorage.getItem('mookkammal_cart');
    return saved ? JSON.parse(saved) : { TEXTILES: [], SUPERMARKET: [] };
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('mookkammal_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('mookkammal_vertical', vertical);
  }, [vertical]);

  useEffect(() => {
    localStorage.setItem('mookkammal_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('mookkammal_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('mookkammal_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('mookkammal_orders', JSON.stringify(orders));
  }, [orders]);

  const setVertical = (v: BusinessVertical) => setVerticalState(v);

  const getAIResponse = async (prompt: string, modelType: 'flash' | 'pro' = 'flash'): Promise<string> => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const modelName = modelType === 'pro' ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
      
      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          systemInstruction: `You are the AI Assistant for Mookkammal Group. 
          We have two verticals: Mookkammal Textiles (Heritage, Sarees, Dhotis, Fashion) and Mookkammal Super Market (Quality Groceries, Fresh Produce).
          The current vertical being browsed is ${vertical}.
          Be polite, professional, and helpful. Use product details from the catalog if relevant.
          Keep responses concise but insightful.`
        }
      });
      return response.text || "I'm sorry, I couldn't process that request.";
    } catch (error) {
      console.error("AI Error:", error);
      return "I'm having trouble connecting to my brain right now. Please try again later!";
    }
  };

  const addProduct = (p: Omit<Product, 'id' | 'rating' | 'reviews'>) => {
    const newProduct: Product = {
      ...p,
      id: `p-${Date.now()}`,
      rating: 5.0,
      reviews: 0
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

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
      vertical, setVertical, products, setProducts, addProduct, updateProduct, deleteProduct, cart, addToCart, removeFromCart, updateQuantity, user, setUser, orders, placeOrder, getAIResponse
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
