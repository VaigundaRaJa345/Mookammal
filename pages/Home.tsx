
import React from 'react';
import { useAppContext } from '../AppContext';
import { THEME_CONFIG, TEXTILES_CATEGORIES, SUPERMARKET_CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';
import { ChevronRight, ArrowRight, Zap, ShieldCheck, Truck, Star } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string, params?: any) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { vertical, products } = useAppContext();
  const theme = THEME_CONFIG[vertical];
  const categories = vertical === 'TEXTILES' ? TEXTILES_CATEGORIES : SUPERMARKET_CATEGORIES;
  
  const filteredProducts = products.filter(p => p.vertical === vertical).slice(0, 4);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className={`relative h-[500px] overflow-hidden bg-gradient-to-br ${theme.gradient}`}>
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center relative z-10 text-white">
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <span className="inline-block px-4 py-1 rounded-full bg-white bg-opacity-20 backdrop-blur-md text-xs font-bold tracking-widest uppercase mb-4">
              Legacy of Trust since 1985
            </span>
            <h1 className={`font-brand text-5xl md:text-7xl font-bold mb-4 leading-tight`}>
              {vertical === 'TEXTILES' ? 'Traditional Silk & Modern Style' : 'Quality Groceries & Daily Essentials'}
            </h1>
            <p className="text-lg md:text-xl text-white text-opacity-80 mb-8 max-w-lg">
              {theme.slogan}. Discover the finest collections curated just for you.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => onNavigate('category')}
                className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold hover:bg-opacity-90 transition-all transform hover:-translate-y-1 shadow-lg"
              >
                Explore Shop
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white border-opacity-30 rounded-2xl font-bold hover:bg-white hover:bg-opacity-10 transition-all">
                About Us
              </button>
            </div>
          </div>
        </div>

        {/* Abstract shapes */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white bg-opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-white bg-opacity-5 rounded-full blur-3xl"></div>
      </section>

      {/* Categories Bar */}
      <section className="py-12 bg-gray-50 border-b border-gray-100 overflow-x-auto scrollbar-hide">
        <div className="max-w-7xl mx-auto px-4 flex space-x-4 min-w-max">
          {categories.map((cat, idx) => (
            <button 
              key={idx}
              onClick={() => onNavigate('category', { category: cat })}
              className={`px-6 py-3 rounded-2xl bg-white border border-gray-200 text-sm font-bold shadow-sm hover:shadow-md transition-all flex items-center group`}
            >
              {cat}
              <ChevronRight size={14} className="ml-2 text-gray-300 group-hover:text-gray-500 transition-colors" />
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-2">Featured Products</h2>
            <p className="text-gray-500">Handpicked items for your specific needs</p>
          </div>
          <button 
            onClick={() => onNavigate('category')}
            className={`flex items-center text-sm font-bold ${theme.accent} hover:underline`}
          >
            View All Collections <ArrowRight size={18} className="ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
          ))}
        </div>
      </section>

      {/* Features Banner */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex items-center space-x-6 p-6 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100">
            <div className={`w-16 h-16 rounded-2xl ${theme.secondary} ${theme.accent} flex items-center justify-center shrink-0`}>
              <ShieldCheck size={32} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Guaranteed Quality</h4>
              <p className="text-sm text-gray-500">Authentic materials & fresh stock always.</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 p-6 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100">
            <div className={`w-16 h-16 rounded-2xl ${theme.secondary} ${theme.accent} flex items-center justify-center shrink-0`}>
              <Truck size={32} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Swift Delivery</h4>
              <p className="text-sm text-gray-500">Fast doorstep delivery within 24 hours.</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 p-6 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100">
            <div className={`w-16 h-16 rounded-2xl ${theme.secondary} ${theme.accent} flex items-center justify-center shrink-0`}>
              <Star size={32} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Loyalty Rewards</h4>
              <p className="text-sm text-gray-500">Earn points on every purchase you make.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Promotion Banner */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className={`relative rounded-[3rem] overflow-hidden bg-gradient-to-r ${theme.gradient} p-12 md:p-20 text-white`}>
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Join our Mookkammal Family!</h2>
            <p className="text-lg text-white text-opacity-80 mb-10">
              Get exclusive early access to our seasonal sales and member-only discounts. Subscribe to our newsletter today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-6 py-4 rounded-2xl bg-white bg-opacity-20 border border-white border-opacity-30 placeholder-white placeholder-opacity-60 focus:outline-none focus:bg-opacity-30 transition-all"
              />
              <button className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold hover:shadow-2xl transition-all shrink-0">
                Sign Me Up
              </button>
            </div>
          </div>
          
          <div className="absolute right-[-10%] bottom-[-20%] w-[50%] aspect-square bg-white bg-opacity-5 rounded-full blur-3xl hidden lg:block"></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
