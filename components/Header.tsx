
import React, { useState } from 'react';
import { useAppContext } from '../AppContext';
import { THEME_CONFIG } from '../constants';
import { ShoppingBag, User, Search, Menu, X, ShoppingCart, ChevronDown, Package } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string, params?: any) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const { vertical, setVertical, cart, user } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const theme = THEME_CONFIG[vertical];
  const cartCount = cart[vertical].reduce((acc, item) => acc + item.quantity, 0);

  const toggleVertical = () => {
    setVertical(vertical === 'TEXTILES' ? 'SUPERMARKET' : 'TEXTILES');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className={`w-10 h-10 rounded-lg ${theme.primary} flex items-center justify-center text-white mr-3 shadow-md`}>
              <Package size={24} />
            </div>
            <div className="hidden sm:block">
              <h1 className={`font-brand text-xl font-bold ${theme.text} leading-tight`}>
                {vertical === 'TEXTILES' ? 'Mookkammal' : 'Mookkammal'}
              </h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">
                {vertical === 'TEXTILES' ? 'Textiles' : 'Super Market'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => onNavigate('home')} className={`text-sm font-semibold ${currentPage === 'home' ? theme.accent : 'text-gray-600 hover:text-gray-900'}`}>Home</button>
            <div className="relative group">
              <button className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900">
                Shop <ChevronDown size={16} className="ml-1" />
              </button>
              <div className="absolute top-full -left-4 w-48 bg-white shadow-xl rounded-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform group-hover:translate-y-1">
                <button onClick={() => onNavigate('category', { category: 'New Arrivals' })} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">New Arrivals</button>
                <button onClick={() => onNavigate('category', { category: 'Trending' })} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Trending</button>
                <button onClick={() => onNavigate('category', { category: 'Deals' })} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Today's Deals</button>
              </div>
            </div>
            <button onClick={() => onNavigate('category')} className="text-sm font-semibold text-gray-600 hover:text-gray-900">Collections</button>
          </nav>

          {/* Actions & Vertical Switcher */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Business Toggle */}
            <div 
              onClick={toggleVertical}
              className={`relative flex items-center w-32 sm:w-40 h-10 rounded-full cursor-pointer p-1 transition-all duration-300 ${vertical === 'TEXTILES' ? 'bg-blue-900' : 'bg-emerald-600'}`}
            >
              <div 
                className={`absolute w-[48%] h-8 bg-white rounded-full shadow-md transition-transform duration-300 transform ${vertical === 'TEXTILES' ? 'translate-x-0' : 'translate-x-[104%]'}`}
              />
              <span className={`z-10 w-1/2 text-[10px] font-bold text-center transition-colors ${vertical === 'TEXTILES' ? 'text-blue-900' : 'text-white'}`}>TEXTILES</span>
              <span className={`z-10 w-1/2 text-[10px] font-bold text-center transition-colors ${vertical === 'SUPERMARKET' ? 'text-emerald-900' : 'text-white'}`}>SUPER</span>
            </div>

            <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-3 py-1.5 focus-within:ring-2 focus-within:ring-opacity-50 transition-all border border-transparent focus-within:bg-white focus-within:border-gray-200">
              <Search size={18} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none focus:outline-none text-sm ml-2 w-24 lg:w-40"
              />
            </div>

            <button 
              onClick={() => onNavigate('cart')}
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className={`absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white ${theme.primary} rounded-full border-2 border-white`}>
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => user?.role === 'ADMIN' ? onNavigate('admin') : onNavigate('auth')}
              className="hidden sm:flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <User size={22} />
            </button>

            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 py-6 px-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-4">
            <button onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }} className="text-lg font-semibold text-gray-800 text-left">Home</button>
            <button onClick={() => { onNavigate('category'); setIsMobileMenuOpen(false); }} className="text-lg font-semibold text-gray-800 text-left">Shop Collections</button>
            <button onClick={() => { onNavigate('auth'); setIsMobileMenuOpen(false); }} className="text-lg font-semibold text-gray-800 text-left">My Account</button>
            <div className="h-px bg-gray-100 w-full" />
            <div className="flex items-center space-x-2 py-2">
              <div className={`p-2 rounded-lg ${theme.secondary} ${theme.accent}`}>
                <Package size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900">{theme.name}</span>
                <span className="text-xs text-gray-500">Currently browsing</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
