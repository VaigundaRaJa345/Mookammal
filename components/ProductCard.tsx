
import React from 'react';
import { Product } from '../types';
import { useAppContext } from '../AppContext';
import { THEME_CONFIG } from '../constants';
import { ShoppingCart, Star, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onNavigate: (page: string, params: any) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate }) => {
  const { vertical, addToCart } = useAppContext();
  const theme = THEME_CONFIG[vertical];

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-transparent">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className={`px-2 py-1 rounded-full text-[10px] font-bold text-white uppercase ${theme.primary}`}>New</span>
          )}
          {product.oldPrice && (
            <span className="px-2 py-1 rounded-full text-[10px] font-bold text-white uppercase bg-rose-500">
              {Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
            </span>
          )}
        </div>

        {/* Action Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('product', { productId: product.id });
            }}
            className="w-12 h-12 rounded-full bg-white text-gray-900 flex items-center justify-center shadow-lg hover:bg-gray-50 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
          >
            <Eye size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.category}</span>
          <div className="flex items-center text-amber-500 text-xs font-bold">
            <Star size={12} fill="currentColor" className="mr-1" />
            {product.rating}
          </div>
        </div>
        
        <h3 
          onClick={() => onNavigate('product', { productId: product.id })}
          className="font-bold text-gray-900 mb-2 truncate group-hover:text-opacity-70 transition-colors cursor-pointer"
        >
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className={`text-lg font-black ${theme.accent}`}>₹{product.price.toLocaleString()}</span>
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through">₹{product.oldPrice.toLocaleString()}</span>
            )}
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className={`w-10 h-10 rounded-xl ${theme.secondary} ${theme.accent} flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-sm`}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
