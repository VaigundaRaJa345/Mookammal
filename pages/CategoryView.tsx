
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../AppContext';
import { THEME_CONFIG, TEXTILES_CATEGORIES, SUPERMARKET_CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal, Search, ChevronDown } from 'lucide-react';

interface CategoryViewProps {
  category: string | null;
  onNavigate: (page: string, params?: any) => void;
}

const CategoryView: React.FC<CategoryViewProps> = ({ category, onNavigate }) => {
  const { vertical, products } = useAppContext();
  const [activeCategory, setActiveCategory] = useState<string>(category || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const theme = THEME_CONFIG[vertical];
  const categories = ['All', ...(vertical === 'TEXTILES' ? TEXTILES_CATEGORIES : SUPERMARKET_CATEGORIES)];

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => p.vertical === vertical)
      .filter(p => activeCategory === 'All' || p.category === activeCategory)
      .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // default newest/relevance
      });
  }, [products, vertical, activeCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Area */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-4">{activeCategory} Collections</h1>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                    activeCategory === cat 
                    ? `${theme.primary} text-white shadow-lg` 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-[2rem] p-4 mb-10 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search in these results..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-opacity-20 transition-all outline-none"
            />
          </div>
          
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <div className="relative w-full sm:w-48">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none bg-gray-50 border border-gray-100 rounded-2xl py-3.5 px-4 pr-10 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-opacity-20 cursor-pointer"
              >
                <option value="newest">Sort: Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Best Rated</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
            <button className="p-3.5 rounded-2xl bg-gray-900 text-white hover:bg-gray-800 transition-colors">
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Results Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
            ))}
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className={`w-24 h-24 rounded-full ${theme.secondary} ${theme.accent} flex items-center justify-center mb-6 opacity-30`}>
              <Search size={48} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No matching products</h3>
            <p className="text-gray-500 max-w-sm">
              We couldn't find what you're looking for. Try adjusting your search or filters.
            </p>
            <button 
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className={`mt-8 px-8 py-3 rounded-2xl font-bold ${theme.primary} text-white`}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryView;
