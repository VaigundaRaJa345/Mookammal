
import React from 'react';
import { useAppContext } from '../AppContext';
import { THEME_CONFIG } from '../constants';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, CreditCard, ChevronRight } from 'lucide-react';

interface CartPageProps {
  onNavigate: (page: string, params?: any) => void;
}

const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const { cart, vertical, updateQuantity, removeFromCart, placeOrder } = useAppContext();
  const theme = THEME_CONFIG[vertical];
  const items = cart[vertical];

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className={`w-24 h-24 rounded-full ${theme.secondary} ${theme.accent} flex items-center justify-center mb-8`}>
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">Your Bag is Empty</h2>
        <p className="text-gray-500 text-center max-w-sm mb-10 leading-relaxed">
          Looks like you haven't added anything to your cart yet. Browse our collections and find something you love.
        </p>
        <button 
          onClick={() => onNavigate('home')}
          className={`px-10 py-4 rounded-2xl ${theme.primary} text-white font-bold shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center`}
        >
          Start Shopping <ChevronRight size={20} className="ml-2" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-black text-gray-900">Your Shopping Bag</h1>
          <button 
            onClick={() => onNavigate('home')}
            className="hidden sm:flex items-center text-sm font-bold text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft size={18} className="mr-2" /> Continue Shopping
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center">
                <div 
                  className="w-24 h-32 sm:w-32 sm:h-40 rounded-2xl overflow-hidden bg-gray-50 cursor-pointer shrink-0"
                  onClick={() => onNavigate('product', { productId: item.id })}
                >
                  <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                </div>
                
                <div className="ml-6 flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 
                        className="font-black text-gray-900 text-lg sm:text-xl hover:text-opacity-70 cursor-pointer"
                        onClick={() => onNavigate('product', { productId: item.id })}
                      >
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-400 font-medium">{item.category}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="flex items-end justify-between mt-6">
                    <div className="flex items-center bg-gray-50 rounded-xl p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg shadow-sm"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg shadow-sm"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className={`text-xl font-black ${theme.accent}`}>₹{(item.price * item.quantity).toLocaleString()}</p>
                      <p className="text-xs text-gray-400">₹{item.price.toLocaleString()} / unit</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 sticky top-24">
              <h2 className="text-2xl font-black text-gray-900 mb-8">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Subtotal ({items.length} items)</span>
                  <span className="text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Shipping</span>
                  <span className={deliveryFee === 0 ? 'text-emerald-500 font-bold' : 'text-gray-900'}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toLocaleString()}`}
                  </span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-[10px] text-emerald-600 bg-emerald-50 p-2 rounded-lg font-bold text-center">
                    Add ₹{501 - subtotal} more for free delivery
                  </p>
                )}
                <div className="h-px bg-gray-100 w-full my-4" />
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className={`text-3xl font-black ${theme.accent}`}>₹{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => {
                    placeOrder();
                    alert("Order placed successfully! (Mock Action)");
                    onNavigate('home');
                  }}
                  className={`w-full py-5 rounded-2xl ${theme.primary} text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center`}
                >
                  <CreditCard size={22} className="mr-3" />
                  Place Order (COD)
                </button>
                <div className="flex items-center justify-center space-x-4 opacity-40">
                  <div className="h-px bg-gray-300 w-12" />
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Secure Payment</span>
                  <div className="h-px bg-gray-300 w-12" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
