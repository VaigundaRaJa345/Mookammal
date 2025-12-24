
import { Product } from './types';

export const TEXTILES_STRUCTURE = {
  'Men\'s Wear': ['Shirts', 'Trousers', 'Ethic', 'Formal', 'Casual'],
  'Women\'s Wear': ['Sarees', 'Kurthis', 'Leggings', 'Western', 'Dresses'],
  'Kids': ['Boys', 'Girls', 'Newborn', 'Toys'],
  'On Trend': ['Celebrity Choice', 'Festival Special', 'Seasonal', 'Limited Edition'],
  'Home Textiles': ['Bedsheets', 'Curtains', 'Towels', 'Cushions']
};

export const SUPERMARKET_STRUCTURE = {
  'Groceries': ['Dals & Pulses', 'Rice & Grains', 'Atta & Flours', 'Oils & Ghee', 'Spices'],
  'Fruits & Veg': ['Organic', 'Regular', 'Exotic', 'Cut & Sprouts'],
  'Personal Care': ['Soaps', 'Shampoos', 'Oral Care', 'Skincare', 'Deodorants'],
  'Household': ['Cleaning Essentials', 'Pooja Items', 'Kitchenware', 'Storage'],
  'Beverages': ['Tea & Coffee', 'Juices', 'Health Drinks', 'Soft Drinks'],
  'Snacks': ['Biscuits', 'Namkeen', 'Chocolates', 'Dry Fruits']
};

export const TEXTILES_CATEGORIES = Object.keys(TEXTILES_STRUCTURE);
export const SUPERMARKET_CATEGORIES = Object.keys(SUPERMARKET_STRUCTURE);

export const MOCK_PRODUCTS: Product[] = [
  // Textiles
  {
    id: 't1',
    name: 'Kancheepuram Silk Saree',
    description: 'Authentic hand-woven silk saree with gold zari border.',
    price: 12500,
    oldPrice: 15000,
    category: 'Women\'s Wear',
    subCategory: 'Sarees',
    vertical: 'TEXTILES',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600',
    stock: 5,
    rating: 4.8,
    reviews: 124,
    isNew: true
  },
  {
    id: 't2',
    name: 'Men\'s Silk Dhoti Set',
    description: 'Premium pure silk dhoti and shirt set for special occasions.',
    price: 3500,
    category: 'Men\'s Wear',
    subCategory: 'Ethic',
    vertical: 'TEXTILES',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=600',
    stock: 12,
    rating: 4.5,
    reviews: 86
  },
  {
    id: 't3',
    name: 'Designer Party Kurti',
    description: 'Trendy cotton kurti with modern print.',
    price: 1200,
    oldPrice: 1800,
    category: 'Women\'s Wear',
    subCategory: 'Kurthis',
    vertical: 'TEXTILES',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600',
    stock: 20,
    rating: 4.6,
    reviews: 55,
    isNew: true
  },
  // Supermarket
  {
    id: 's1',
    name: 'Premium Basmati Rice',
    description: 'Long grain aromatic basmati rice (5kg pack).',
    price: 850,
    oldPrice: 950,
    category: 'Groceries',
    subCategory: 'Rice & Grains',
    vertical: 'SUPERMARKET',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600',
    stock: 50,
    rating: 4.6,
    reviews: 210
  },
  {
    id: 's2',
    name: 'Organic Cold Pressed Oil',
    description: 'Healthy cold-pressed groundnut oil (1L).',
    price: 240,
    category: 'Groceries',
    subCategory: 'Oils & Ghee',
    vertical: 'SUPERMARKET',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600',
    stock: 35,
    rating: 4.9,
    reviews: 155,
    isNew: true
  }
];

export const THEME_CONFIG = {
  TEXTILES: {
    primary: 'bg-blue-900',
    primaryHover: 'hover:bg-blue-800',
    secondary: 'bg-amber-500',
    text: 'text-blue-900',
    accent: 'text-amber-600',
    border: 'border-blue-100',
    gradient: 'from-blue-900 to-indigo-900',
    name: 'Mookkammal Textiles',
    slogan: 'Timeless Elegance in Every Thread'
  },
  SUPERMARKET: {
    primary: 'bg-emerald-600',
    primaryHover: 'hover:bg-emerald-500',
    secondary: 'bg-green-100',
    text: 'text-emerald-900',
    accent: 'text-emerald-600',
    border: 'border-emerald-100',
    gradient: 'from-emerald-600 to-green-500',
    name: 'Mookkammal Super Market',
    slogan: 'Freshness Delivered to Your Doorstep'
  }
};
