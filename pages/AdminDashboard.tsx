import React, { useState, useMemo, useEffect } from 'react';
import { useAppContext } from '../AppContext';
import { THEME_CONFIG, TEXTILES_STRUCTURE, SUPERMARKET_STRUCTURE, TEXTILES_CATEGORIES, SUPERMARKET_CATEGORIES } from '../constants';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, Plus, 
  TrendingUp, AlertCircle, Edit, Trash2, Search, Filter,
  LogOut, Settings, BarChart3, X, Eye, ChevronRight, Layers
} from 'lucide-react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, Cell, PieChart, Pie
} from 'recharts';
import { Product, BusinessVertical } from '../types';

const AdminDashboard: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, user, setUser, vertical, orders } = useAppContext();
  const [activeTab, setActiveTab] = useState('overview');
  const [inventoryView, setInventoryView] = useState<BusinessVertical>('TEXTILES');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const theme = THEME_CONFIG[vertical];

  // Stats logic
  const stats = useMemo(() => {
    const totalSales = orders.reduce((acc, order) => acc + order.total, 0);
    const pendingOrders = orders.filter(o => o.status === 'PENDING').length;
    const stockAlerts = products.filter(p => p.stock < 10).length;
    
    return [
      { label: 'Total Revenue', value: `₹${totalSales.toLocaleString()}`, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
      { label: 'Pending Orders', value: pendingOrders.toString(), icon: ShoppingCart, color: 'text-amber-600', bg: 'bg-amber-50' },
      { label: 'Total Inventory', value: products.length.toString(), icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
      { label: 'Low Stock Items', value: stockAlerts.toString(), icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
    ];
  }, [orders, products]);

  const salesData = useMemo(() => [
    { name: 'Mon', sales: 4200 },
    { name: 'Tue', sales: 3800 },
    { name: 'Wed', sales: 5200 },
    { name: 'Thu', sales: 4800 },
    { name: 'Fri', sales: 6100 },
    { name: 'Sat', sales: 7500 },
    { name: 'Sun', sales: 8200 },
  ], []);

  // Filtered products for the table
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => p.vertical === inventoryView)
      .filter(p => categoryFilter === 'All' || p.category === categoryFilter)
      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [products, inventoryView, categoryFilter, searchTerm]);

  const handleLogout = () => {
    setUser(null);
    window.location.reload();
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  // Product Form Modal Component
  const ProductForm = () => {
    const defaultVertical = editingProduct?.vertical || inventoryView;
    // Fix: Explicitly type structure as Record<string, string[]> to ensure indexing works correctly and avoids 'never' types.
    const structure: Record<string, string[]> = defaultVertical === 'TEXTILES' ? TEXTILES_STRUCTURE : SUPERMARKET_STRUCTURE;
    const categories = Object.keys(structure);
    
    const [form, setForm] = useState({
      name: editingProduct?.name || '',
      description: editingProduct?.description || '',
      price: editingProduct?.price || 0,
      oldPrice: editingProduct?.oldPrice || 0,
      vertical: defaultVertical,
      category: editingProduct?.category || categories[0],
      // Fix: Removed 'as keyof typeof structure' since structure is now explicitly typed as a Record.
      subCategory: editingProduct?.subCategory || structure[categories[0]][0],
      stock: editingProduct?.stock || 0,
      image: editingProduct?.image || 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?auto=format&fit=crop&q=80&w=800'
    });

    // Fix: Removed 'as keyof typeof structure' to resolve property 'map' does not exist on type 'never' errors on usage.
    const currentSubCategories = structure[form.category] || [];

    const handleVerticalChange = (v: BusinessVertical) => {
      // Fix: Explicitly type newStructure as Record<string, string[]> for safe dynamic indexing.
      const newStructure: Record<string, string[]> = v === 'TEXTILES' ? TEXTILES_STRUCTURE : SUPERMARKET_STRUCTURE;
      const newCats = Object.keys(newStructure);
      const newCat = newCats[0];
      const newSub = newStructure[newCat][0];
      setForm({ ...form, vertical: v, category: newCat, subCategory: newSub });
    };

    const handleCategoryChange = (c: string) => {
      // Fix: Use explicit indexing on structure which is now a Record.
      const newSub = structure[c][0];
      setForm({ ...form, category: c, subCategory: newSub });
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (editingProduct) {
        updateProduct(editingProduct.id, form);
      } else {
        addProduct(form);
      }
      setShowModal(false);
    };

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
          <div className={`p-8 ${form.vertical === 'TEXTILES' ? 'bg-blue-900' : 'bg-emerald-600'} text-white flex justify-between items-center`}>
            <div>
              <h3 className="text-2xl font-black">{editingProduct ? 'Update Product' : 'Add New Inventory'}</h3>
              <p className="text-white/70 text-sm mt-1">{form.vertical === 'TEXTILES' ? 'Textiles' : 'Super Market'} Department</p>
            </div>
            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vertical Selection */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Business Vertical</label>
                <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100">
                  <button 
                    type="button" 
                    onClick={() => handleVerticalChange('TEXTILES')}
                    className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${form.vertical === 'TEXTILES' ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-400'}`}
                  >
                    Textiles
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleVerticalChange('SUPERMARKET')}
                    className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${form.vertical === 'SUPERMARKET' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-400'}`}
                  >
                    Super Market
                  </button>
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Product Name</label>
                <input 
                  type="text" required value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-4 outline-none font-bold focus:border-gray-300"
                  placeholder="Enter product title..."
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Main Category</label>
                <select 
                  value={form.category}
                  onChange={e => handleCategoryChange(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-4 outline-none font-bold focus:border-gray-300"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Sub-Category */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Sub-Category</label>
                <select 
                  value={form.subCategory}
                  onChange={e => setForm({...form, subCategory: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-4 outline-none font-bold focus:border-gray-300"
                >
                  {currentSubCategories.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Price & Stock */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Sale Price (₹)</label>
                <input 
                  type="number" required value={form.price}
                  onChange={e => setForm({...form, price: parseInt(e.target.value)})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-4 outline-none font-bold focus:border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Stock Level</label>
                <input 
                  type="number" required value={form.stock}
                  onChange={e => setForm({...form, stock: parseInt(e.target.value)})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-4 outline-none font-bold focus:border-gray-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Product Description</label>
              <textarea 
                required value={form.description}
                onChange={e => setForm({...form, description: e.target.value})}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-4 outline-none font-bold h-24 resize-none focus:border-gray-300"
                placeholder="Write a brief description..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Image URL</label>
              <div className="flex gap-4">
                <input 
                  type="text" required value={form.image}
                  onChange={e => setForm({...form, image: e.target.value})}
                  className="flex-grow bg-gray-50 border border-gray-100 rounded-2xl py-3 px-4 outline-none font-bold focus:border-gray-300"
                />
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-gray-50 shrink-0">
                  <img src={form.image} alt="preview" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className={`w-full py-5 rounded-2xl ${form.vertical === 'TEXTILES' ? 'bg-blue-900' : 'bg-emerald-600'} text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center`}
            >
              <Plus size={20} className="mr-2" />
              {editingProduct ? 'Save Changes' : 'Publish Product'}
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">
      {showModal && <ProductForm />}
      
      {/* Admin Sidebar */}
      <aside className="w-full md:w-72 bg-white border-r border-gray-200 p-8 flex flex-col sticky top-0 h-screen overflow-y-auto">
        <div className="flex items-center space-x-3 mb-12">
          <div className={`w-12 h-12 rounded-2xl ${theme.primary} flex items-center justify-center text-white shadow-lg`}>
            <LayoutDashboard size={24} />
          </div>
          <div>
            <span className="font-brand text-2xl font-bold text-gray-900 tracking-tight">Mookkammal</span>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Admin Control</p>
          </div>
        </div>

        <nav className="space-y-2 flex-grow">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'products', label: 'Inventory', icon: Package },
            { id: 'orders', label: 'Orders', icon: ShoppingCart },
            { id: 'users', label: 'Customers', icon: Users },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-5 py-4 rounded-2xl text-sm font-bold transition-all ${
                activeTab === item.id 
                ? `${theme.primary} text-white shadow-xl shadow-gray-200` 
                : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <item.icon size={20} className="mr-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex items-center p-4 mb-6 bg-gray-50 rounded-2xl border border-gray-100">
            <img src={user?.avatar} alt="admin" className="w-12 h-12 rounded-xl mr-4 border-2 border-white shadow-sm" />
            <div className="overflow-hidden">
              <p className="text-sm font-black text-gray-900 truncate">{user?.name}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">General Manager</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-5 py-4 rounded-2xl text-sm font-bold text-rose-500 hover:bg-rose-50 transition-all"
          >
            <LogOut size={20} className="mr-4" />
            Logout Portal
          </button>
        </div>
      </aside>

      {/* Main Dashboard Content */}
      <main className="flex-grow p-4 md:p-12 lg:p-16">
        {activeTab === 'overview' && (
          <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-4xl font-black text-gray-900 mb-2">Business Analytics</h2>
                <p className="text-gray-400 font-medium text-lg">Real-time performance metrics across all departments.</p>
              </div>
              <button 
                onClick={openAddModal}
                className={`px-8 py-4 rounded-2xl ${theme.primary} text-white font-bold flex items-center shadow-2xl hover:scale-105 transition-all`}>
                <Plus size={20} className="mr-2" /> New Entry
              </button>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                  <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                    <stat.icon size={28} />
                  </div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                  <h4 className="text-4xl font-black text-gray-900">{stat.value}</h4>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl font-black text-gray-900">Revenue Growth</h3>
                  <div className="flex gap-2">
                    <span className="flex items-center text-emerald-500 font-bold text-sm bg-emerald-50 px-3 py-1 rounded-full">+12.5% this month</span>
                  </div>
                </div>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={vertical === 'TEXTILES' ? '#1e3a8a' : '#059669'} stopOpacity={0.15}/>
                          <stop offset="95%" stopColor={vertical === 'TEXTILES' ? '#1e3a8a' : '#059669'} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fontWeight: 700, fill: '#94a3b8' }} dy={15} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fontWeight: 700, fill: '#94a3b8' }} />
                      <Tooltip contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '15px' }} />
                      <Area type="monotone" dataKey="sales" stroke={vertical === 'TEXTILES' ? '#1e3a8a' : '#059669'} strokeWidth={5} fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                <h3 className="text-2xl font-black text-gray-900 mb-8">Stock Distribution</h3>
                <div className="h-[280px] w-full flex items-center justify-center">
                   <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Textiles', value: products.filter(p => p.vertical === 'TEXTILES').length, color: '#1e3a8a' },
                          { name: 'Supermarket', value: products.filter(p => p.vertical === 'SUPERMARKET').length, color: '#059669' }
                        ]}
                        innerRadius={80}
                        outerRadius={100}
                        paddingAngle={10}
                        dataKey="value"
                      >
                        <Cell fill="#1e3a8a" />
                        <Cell fill="#059669" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4 mt-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-blue-900 mr-3" />
                      <span className="font-bold text-gray-700">Textiles</span>
                    </div>
                    <span className="font-black text-gray-900">{products.filter(p => p.vertical === 'TEXTILES').length} SKUs</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-emerald-600 mr-3" />
                      <span className="font-bold text-gray-700">Supermarket</span>
                    </div>
                    <span className="font-black text-gray-900">{products.filter(p => p.vertical === 'SUPERMARKET').length} SKUs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h2 className="text-4xl font-black text-gray-900 mb-2">Inventory Management</h2>
                <p className="text-gray-400 font-medium">Manage your products by department and category.</p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setInventoryView(inventoryView === 'TEXTILES' ? 'SUPERMARKET' : 'TEXTILES')}
                  className={`px-6 py-4 rounded-2xl font-bold flex items-center shadow-lg transition-all ${
                    inventoryView === 'TEXTILES' ? 'bg-blue-50 text-blue-900 border border-blue-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                  }`}
                >
                  <Layers size={20} className="mr-3" />
                  Viewing: {inventoryView === 'TEXTILES' ? 'Textiles' : 'Super Market'}
                </button>
                <button 
                  onClick={openAddModal}
                  className={`px-8 py-4 rounded-2xl ${inventoryView === 'TEXTILES' ? 'bg-blue-900' : 'bg-emerald-600'} text-white font-bold flex items-center shadow-xl hover:scale-105 transition-all`}>
                  <Plus size={20} className="mr-2" /> Add SKU
                </button>
              </div>
            </div>

            <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row items-center gap-6 bg-gray-50/50">
                <div className="relative flex-grow w-full">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search by SKU name, category or ID..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-16 pr-6 outline-none font-bold focus:border-gray-300 shadow-sm"
                  />
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                   <select 
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="flex-grow md:flex-none bg-white border border-gray-200 rounded-2xl px-6 py-4 outline-none font-bold text-gray-700 shadow-sm"
                  >
                    <option value="All">All Categories</option>
                    {(inventoryView === 'TEXTILES' ? TEXTILES_CATEGORIES : SUPERMARKET_CATEGORIES).map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 text-gray-400 text-[11px] font-black uppercase tracking-[0.2em] border-b border-gray-100">
                      <th className="px-10 py-6">Product & Hierarchy</th>
                      <th className="px-10 py-6">Stock Status</th>
                      <th className="px-10 py-6">Pricing</th>
                      <th className="px-10 py-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredProducts.map(product => (
                      <tr key={product.id} className="hover:bg-gray-50/80 transition-all group">
                        <td className="px-10 py-6">
                          <div className="flex items-center">
                            <div className="w-16 h-20 rounded-2xl overflow-hidden mr-6 shadow-sm border border-gray-100">
                              <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt={product.name} />
                            </div>
                            <div>
                              <p className="font-black text-gray-900 text-lg">{product.name}</p>
                              <div className="flex items-center text-sm font-bold text-gray-400 mt-1">
                                <span>{product.category}</span>
                                <ChevronRight size={14} className="mx-1" />
                                <span className="text-gray-500">{product.subCategory}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <div className="flex flex-col">
                            <span className={`text-lg font-black ${product.stock < 10 ? 'text-rose-600' : 'text-gray-900'}`}>
                              {product.stock} Units
                            </span>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${product.stock < 10 ? 'text-rose-400' : 'text-emerald-500'}`}>
                              {product.stock < 10 ? 'Low Stock Alert' : 'Healthy Inventory'}
                            </span>
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <div className="flex flex-col">
                             <p className="text-xl font-black text-gray-900">₹{product.price.toLocaleString()}</p>
                             {product.oldPrice && <p className="text-xs text-gray-400 line-through">MRP ₹{product.oldPrice.toLocaleString()}</p>}
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <div className="flex items-center justify-center space-x-3 opacity-40 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => openEditModal(product)}
                              className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-blue-900 rounded-xl hover:bg-blue-900 hover:text-white transition-all shadow-sm"
                            >
                              <Edit size={18} />
                            </button>
                            <button 
                              onClick={() => { if(window.confirm('Are you sure you want to delete this product?')) deleteProduct(product.id) }}
                              className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="p-8 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
                <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Tracking {filteredProducts.length} Inventory Items</p>
                <div className="flex gap-2">
                   <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-400 cursor-not-allowed">Previous</button>
                   <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-900 shadow-sm">Next Page</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;