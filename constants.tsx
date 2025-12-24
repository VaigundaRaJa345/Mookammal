
import { Product, BusinessVertical } from './types';

export const TEXTILES_CATEGORIES = ['Sarees', 'Men\'s Wear', 'Kids', 'Ethic Wear', 'Fabrics'];
export const SUPERMARKET_CATEGORIES = ['Groceries', 'Fruits & Veg', 'Snacks', 'Beverages', 'Personal Care', 'Household'];

export const MOCK_PRODUCTS: Product[] = [
  // Textiles
  {
    id: 't1',
    name: 'Kancheepuram Silk Saree',
    description: 'Authentic hand-woven silk saree with gold zari border.',
    price: 12500,
    oldPrice: 15000,
    category: 'Sarees',
    vertical: 'TEXTILES',
    image: 'https://picsum.photos/seed/saree/600/800',
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
    vertical: 'TEXTILES',
    image: 'https://picsum.photos/seed/dhoti/600/800',
    stock: 12,
    rating: 4.5,
    reviews: 86
  },
  {
    id: 't3',
    name: 'Embroidered Anarkali',
    description: 'Designer Anarkali suit with heavy embroidery work.',
    price: 4200,
    oldPrice: 5500,
    category: 'Ethic Wear',
    vertical: 'TEXTILES',
    image: 'https://picsum.photos/seed/anarkali/600/800',
    stock: 8,
    rating: 4.7,
    reviews: 45
  },
  // Supermarket
  {
    id: 's1',
    name: 'Premium Basmati Rice',
    description: 'Long grain aromatic basmati rice (5kg pack).',
    price: 850,
    oldPrice: 950,
    category: 'Groceries',
    vertical: 'SUPERMARKET',
    image: 'https://picsum.photos/seed/rice/600/600',
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
    vertical: 'SUPERMARKET',
    image: 'https://picsum.photos/seed/oil/600/600',
    stock: 35,
    rating: 4.9,
    reviews: 155,
    isNew: true
  },
  {
    id: 's3',
    name: 'Assorted Fresh Fruit Basket',
    description: 'Seasonal selection of fresh organic fruits.',
    price: 450,
    category: 'Fruits & Veg',
    vertical: 'SUPERMARKET',
    image: 'https://picsum.photos/seed/fruits/600/600',
    stock: 15,
    rating: 4.4,
    reviews: 98
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
