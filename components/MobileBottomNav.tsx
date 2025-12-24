
import React from 'react';
import { useAppContext } from '../AppContext';
import { Home, Grid, ShoppingCart, User, RefreshCw } from 'lucide-react';
import { THEME_CONFIG } from '../constants';

interface MobileBottomNavProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onNavigate, currentPage }) => {
  const { vertical, setVertical, cart } = useAppContext();
  const theme = THEME_CONFIG[vertical];
  const cartCount = cart[vertical].reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        <button 
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${currentPage === 'home' ? theme.accent : 'text-gray-400'}`}
        >
          <Home size={22} />
          <span className="text-[10px] font-medium">Home</span>
        </button>

        <button 
          onClick={() => onNavigate('category')}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${currentPage === 'category' ? theme.accent : 'text-gray-400'}`}
        >
          <Grid size={22} />
          <span className="text-[10px] font-medium">Browse</span>
        </button>

        <div className="relative -top-6">
          <button 
            onClick={() => setVertical(vertical === 'TEXTILES' ? 'SUPERMARKET' : 'TEXTILES')}
            className={`w-14 h-14 rounded-full shadow-lg ${theme.primary} flex items-center justify-center text-white border-4 border-white transform transition-transform active:scale-90`}
          >
            <RefreshCw size={24} />
          </button>
        </div>

        <button 
          onClick={() => onNavigate('cart')}
          className={`relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${currentPage === 'cart' ? theme.accent : 'text-gray-400'}`}
        >
          <ShoppingCart size={22} />
          {cartCount > 0 && (
            <span className={`absolute top-1 right-3 flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white ${theme.primary} rounded-full border border-white`}>
              {cartCount}
            </span>
          )}
          <span className="text-[10px] font-medium">Cart</span>
        </button>

        <button 
          onClick={() => onNavigate('auth')}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${currentPage === 'auth' ? theme.accent : 'text-gray-400'}`}
        >
          <User size={22} />
          <span className="text-[10px] font-medium">Profile</span>
        </button>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
