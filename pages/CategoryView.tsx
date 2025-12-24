
import React, { useState, useMemo, useEffect } from 'react';
import { useAppContext } from '../AppContext';
import { THEME_CONFIG, TEXTILES_STRUCTURE, SUPERMARKET_STRUCTURE, TEXTILES_CATEGORIES, SUPERMARKET_CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';
import { Search, ChevronDown, Filter } from 'lucide-react';

interface CategoryViewProps {
  category: string | null;
  onNavigate: (page: string, params?: any) => void;
}

const CategoryView: React.FC<CategoryViewProps> = ({ category, onNavigate }) => {
  const { vertical, products } = useAppContext();
  const [activeCategory, setActiveCategory] = useState<string>(category || 'All');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const theme = THEME_CONFIG[vertical];
  const categories = ['All', ...(vertical === 'TEXTILES' ? TEXTILES_CATEGORIES : SUPERMARKET_CATEGORIES)];
  
  const subCategories = useMemo(() => {
    if (activeCategory === 'All') return [];
    const structure = vertical === 'TEXTILES' ? TEXTILES_STRUCTURE : SUPERMARKET_STRUCTURE;
    return ['All', ...(structure[activeCategory as keyof typeof structure] || [])];
  }, [activeCategory, vertical]);

  // Reset sub-category when main category changes
  useEffect(() => {
    setActiveSubCategory('All');
  }, [activeCategory]);

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => p.vertical === vertical) // STRICT DEPARTMENT ISOLATION
      .filter(p => activeCategory === 'All' || p.category === activeCategory)
      .filter(p => activeSubCategory === 'All' || p.subCategory === activeSubCategory)
      .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [products, vertical, activeCategory, activeSubCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
             <div className={`w-2 h-10 rounded-full ${theme.primary}`}></div>
             <h1 className="text-4xl font-black text-gray-900">{vertical === 'TEXTILES' ? 'Textiles' : 'Super Market'} Catalog</h1>
          </div>
          
          {/* Main Categories */}
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all border whitespace-nowrap ${
                  activeCategory === cat 
                  ? `${theme.primary} text-white shadow-lg border-transparent` 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sub Categories Tabs */}
          {subCategories.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide animate-in slide-in-from-left-4 duration-300">
              {subCategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setActiveSubCategory(sub)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
                    activeSubCategory === sub 
                    ? `bg-gray-900 text-white shadow-md border-transparent` 
                    : 'bg-white text-gray-500 hover:bg-gray-50 border-gray-100'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-[2.5rem] p-5 mb-10 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder={`Search in ${activeCategory}...`} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-14 pr-6 focus:ring-2 focus:ring-opacity-20 transition-all outline-none font-medium"
            />
          </div>
          
          <div className="relative w-full sm:w-56">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 pr-12 text-sm font-bold text-gray-700 outline-none cursor-pointer"
            >
              <option value="newest">Latest Items</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Best Rating</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
          </div>
        </div>

        {/* Results */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <div className={`w-24 h-24 rounded-full ${theme.secondary} flex items-center justify-center mx-auto mb-6 opacity-30`}>
              <Filter size={40} className={theme.accent} />
            </div>
            <h3 className="text-2xl font-black text-gray-900">No items match your filters</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search keywords.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryView;
