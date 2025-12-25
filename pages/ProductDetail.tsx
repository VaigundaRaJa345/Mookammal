
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../AppContext';
import { THEME_CONFIG } from '../constants';
import { Star, Truck, ShieldCheck, ArrowLeft, Plus, Minus, Share2, Heart, ShoppingBag, Sparkles, Loader2 } from 'lucide-react';

interface ProductDetailProps {
  productId: string;
  onNavigate: (page: string, params?: any) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId, onNavigate }) => {
  const { products, vertical, addToCart, getAIResponse } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [aiPerspective, setAiPerspective] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const theme = THEME_CONFIG[vertical];
  
  const product = products.find(p => p.id === productId);

  useEffect(() => {
    if (product && !aiPerspective) {
      const fetchPerspective = async () => {
        setIsLoadingAi(true);
        const prompt = vertical === 'TEXTILES' 
          ? `Provide professional fashion styling tips for this item: ${product.name}. Description: ${product.description}`
          : `Provide unique cooking tips or recipe ideas for this item: ${product.name}. Description: ${product.description}`;
        const resp = await getAIResponse(prompt);
        setAiPerspective(resp);
        setIsLoadingAi(false);
      };
      fetchPerspective();
    }
  }, [product, vertical, getAIResponse]);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <button onClick={() => onNavigate('home')} className={`px-6 py-2 rounded-lg ${theme.primary} text-white`}>Go Home</button>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center text-gray-500 hover:text-gray-900 font-medium mb-8 group"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to browsing
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-50 border border-gray-100 shadow-xl">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 cursor-pointer hover:border-gray-300 transition-colors">
                  <img src={product.image} className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" alt="thumbnail" />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col h-full">
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <span className={`px-4 py-1 rounded-full ${theme.secondary} ${theme.accent} text-xs font-black uppercase tracking-widest`}>
                  {product.category}
                </span>
                <span className="text-gray-300">|</span>
                <div className="flex items-center text-amber-500 font-bold">
                  <Star size={16} fill="currentColor" className="mr-1" />
                  {product.rating} <span className="text-gray-400 font-medium ml-1">({product.reviews} reviews)</span>
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight">{product.name}</h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">{product.description}</p>

              {/* AI Section */}
              <div className={`p-6 rounded-3xl mb-8 border-2 border-dashed ${theme.border} bg-gray-50/50`}>
                <div className="flex items-center mb-4">
                  <Sparkles className={`mr-2 ${theme.accent}`} size={20} />
                  <h4 className="font-black text-sm uppercase tracking-widest text-gray-800">
                    {vertical === 'TEXTILES' ? 'AI Stylist Recommendation' : 'AI Chef Tips'}
                  </h4>
                </div>
                {isLoadingAi ? (
                  <div className="flex items-center space-x-2 py-4">
                    <Loader2 size={18} className="animate-spin text-gray-400" />
                    <span className="text-xs font-bold text-gray-400">Consulting AI experts...</span>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 italic leading-relaxed">"{aiPerspective}"</p>
                )}
              </div>

              <div className="flex items-baseline space-x-4 mb-10">
                <span className={`text-5xl font-black ${theme.accent}`}>₹{product.price.toLocaleString()}</span>
                {product.oldPrice && (
                  <span className="text-2xl text-gray-300 line-through font-medium">₹{product.oldPrice.toLocaleString()}</span>
                )}
              </div>

              {/* Purchase Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <div className="flex items-center bg-gray-100 rounded-2xl p-1 shrink-0">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-xl transition-all"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="w-14 text-center font-bold text-xl">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-xl transition-all"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                
                <button 
                  onClick={() => addToCart({ ...product })}
                  className={`flex-grow h-14 rounded-2xl ${theme.primary} text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center`}
                >
                  <ShoppingBag size={24} className="mr-3" />
                  Add to Shopping Bag
                </button>

                <button className="w-14 h-14 rounded-2xl bg-white border border-gray-200 text-gray-400 hover:text-rose-500 hover:border-rose-100 hover:bg-rose-50 flex items-center justify-center transition-all shrink-0">
                  <Heart size={24} />
                </button>
              </div>

              {/* Service Features */}
              <div className="grid grid-cols-2 gap-4 py-8 border-t border-gray-100">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-xl ${theme.secondary} ${theme.accent}`}>
                    <Truck size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">Free Delivery</h5>
                    <p className="text-xs text-gray-500">Orders above ₹500</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-xl ${theme.secondary} ${theme.accent}`}>
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">Safe & Secure</h5>
                    <p className="text-xs text-gray-500">COD Available</p>
                  </div>
                </div>
              </div>
            </div>

            <button className="flex items-center text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors">
              <Share2 size={16} className="mr-2" /> Share Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
