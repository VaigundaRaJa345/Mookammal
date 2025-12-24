
import React from 'react';
import { useAppContext } from '../AppContext';
import { THEME_CONFIG } from '../constants';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Package } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { vertical } = useAppContext();
  const theme = THEME_CONFIG[vertical];

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-xl ${theme.primary} flex items-center justify-center text-white shadow-xl`}>
                <Package size={28} />
              </div>
              <div>
                <h3 className="font-brand text-2xl font-bold tracking-tight">Mookkammal</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black">Group of Companies</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Providing quality textiles and essential groceries to our community since 1985. Our legacy is built on trust, quality, and exceptional service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-white bg-opacity-5 hover:bg-opacity-10 flex items-center justify-center transition-all text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white bg-opacity-5 hover:bg-opacity-10 flex items-center justify-center transition-all text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white bg-opacity-5 hover:bg-opacity-10 flex items-center justify-center transition-all text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-black uppercase tracking-widest text-white">The Shop</h4>
            <nav className="flex flex-col space-y-4">
              <button onClick={() => onNavigate('home')} className="text-gray-400 hover:text-white text-left transition-colors text-sm font-medium">Home</button>
              <button onClick={() => onNavigate('category')} className="text-gray-400 hover:text-white text-left transition-colors text-sm font-medium">Textiles Department</button>
              <button onClick={() => onNavigate('category')} className="text-gray-400 hover:text-white text-left transition-colors text-sm font-medium">Super Market</button>
              <button onClick={() => onNavigate('auth')} className="text-gray-400 hover:text-white text-left transition-colors text-sm font-medium">My Account</button>
              <button onClick={() => onNavigate('cart')} className="text-gray-400 hover:text-white text-left transition-colors text-sm font-medium">Shopping Bag</button>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h4 className="text-lg font-black uppercase tracking-widest text-white">Customer Care</h4>
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Track Order</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Returns & Refunds</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Help Center</a>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-black uppercase tracking-widest text-white">Find Us</h4>
            <div className="space-y-4 text-sm font-medium">
              <div className="flex items-start space-x-3 text-gray-400">
                <MapPin className={`shrink-0 ${theme.accent}`} size={20} />
                <span>123 Heritage Road, Retail Hub,<br />Tamil Nadu, India - 600001</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className={`shrink-0 ${theme.accent}`} size={20} />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className={`shrink-0 ${theme.accent}`} size={20} />
                <span>care@mookkammal.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white border-opacity-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
            © 2024 Mookkammal Group. All Rights Reserved.
          </p>
          <div className="flex space-x-6 opacity-20 grayscale">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="visa" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="mastercard" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/UPI-Logo.png" alt="upi" className="h-4" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
