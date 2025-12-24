
import React, { useState } from 'react';
import { useAppContext } from '../AppContext';
import { THEME_CONFIG, MOCK_PRODUCTS } from '../constants';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, Plus, 
  TrendingUp, AlertCircle, Edit, Trash2, Search, Filter,
  LogOut, Settings, BarChart3, ChevronRight, Star
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, Cell, PieChart, Pie
} from 'recharts';

const AdminDashboard: React.FC = () => {
  const { products, setProducts, user, setUser, vertical } = useAppContext();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const theme = THEME_CONFIG[vertical];

  // Mock Stats Data
  const stats = [
    { label: 'Total Sales', value: '₹1,24,500', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Pending Orders', value: '18', icon: ShoppingCart, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Active Users', value: '1,240', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Stock Alerts', value: '4', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  const salesData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 2000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 1890 },
    { name: 'Sat', sales: 2390 },
    { name: 'Sun', sales: 3490 },
  ];

  const categoryData = [
    { name: 'Textiles', value: 65, color: '#1e3a8a' },
    { name: 'Supermarket', value: 35, color: '#059669' },
  ];

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
        <div className="flex items-center space-x-3 mb-12">
          <div className={`w-10 h-10 rounded-xl ${theme.primary} flex items-center justify-center text-white`}>
            <LayoutDashboard size={20} />
          </div>
          <span className="font-brand text-xl font-bold text-gray-900 tracking-tight">Admin Portal</span>
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
              className={`w-full flex items-center px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                activeTab === item.id 
                ? `${theme.primary} text-white shadow-lg shadow-gray-200` 
                : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <item.icon size={18} className="mr-3" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-100">
          <div className="flex items-center p-3 mb-4 bg-gray-50 rounded-2xl">
            <img src={user?.avatar} alt="admin" className="w-10 h-10 rounded-xl mr-3 border-2 border-white shadow-sm" />
            <div className="overflow-hidden">
              <p className="text-sm font-black text-gray-900 truncate">{user?.name}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Super Admin</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 rounded-2xl text-sm font-bold text-rose-500 hover:bg-rose-50 transition-all"
          >
            <LogOut size={18} className="mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-10 lg:p-14">
        {activeTab === 'overview' && (
          <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black text-gray-900 mb-1">Store Performance</h2>
                <p className="text-gray-400 font-medium">Real-time analytical overview of Mookkammal's business.</p>
              </div>
              <button className={`px-6 py-3 rounded-2xl ${theme.primary} text-white font-bold flex items-center shadow-lg hover:shadow-xl transition-all`}>
                <Plus size={18} className="mr-2" /> New Report
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6`}>
                    <stat.icon size={24} />
                  </div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <h4 className="text-3xl font-black text-gray-900">{stat.value}</h4>
                  <div className="mt-4 flex items-center text-emerald-500 font-bold text-[10px] uppercase">
                    <TrendingUp size={12} className="mr-1" /> 12% vs last month
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-8">Weekly Revenue</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={vertical === 'TEXTILES' ? '#1e3a8a' : '#059669'} stopOpacity={0.1}/>
                          <stop offset="95%" stopColor={vertical === 'TEXTILES' ? '#1e3a8a' : '#059669'} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#94A3B8' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#94A3B8' }} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Area type="monotone" dataKey="sales" stroke={vertical === 'TEXTILES' ? '#1e3a8a' : '#059669'} strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center">
                <h3 className="text-xl font-bold text-gray-900 mb-8 w-full text-left">Business Mix</h3>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-auto space-y-4 w-full">
                  {categoryData.map((cat, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: cat.color }} />
                        <span className="text-sm font-bold text-gray-600">{cat.name}</span>
                      </div>
                      <span className="text-sm font-black text-gray-900">{cat.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
              <div>
                <h2 className="text-3xl font-black text-gray-900 mb-1">Inventory Management</h2>
                <p className="text-gray-400 font-medium">Add, update, or remove stock across departments.</p>
              </div>
              <button className={`px-6 py-3 rounded-2xl ${theme.primary} text-white font-bold flex items-center shadow-lg`}>
                <Plus size={18} className="mr-2" /> Add New Product
              </button>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row items-center gap-4">
                <div className="relative flex-grow w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search by product name, SKU..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-12 pr-4 outline-none font-medium"
                  />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button className="flex items-center justify-center p-3 rounded-xl border border-gray-100 text-gray-400 hover:text-gray-900">
                    <Filter size={18} />
                  </button>
                  <select className="bg-gray-50 border-none rounded-xl px-4 py-3 outline-none text-sm font-bold text-gray-600 cursor-pointer">
                    <option>All Departments</option>
                    <option>Textiles</option>
                    <option>Supermarket</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest border-b border-gray-100">
                      <th className="px-8 py-4">Product Details</th>
                      <th className="px-8 py-4">Department</th>
                      <th className="px-8 py-4">Inventory</th>
                      <th className="px-8 py-4">Price</th>
                      <th className="px-8 py-4">Rating</th>
                      <th className="px-8 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredProducts.map(product => (
                      <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-8 py-5">
                          <div className="flex items-center">
                            <img src={product.image} className="w-12 h-16 rounded-xl object-cover mr-4 shadow-sm" alt="" />
                            <div>
                              <p className="font-black text-gray-900">{product.name}</p>
                              <p className="text-xs text-gray-400">{product.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                            product.vertical === 'TEXTILES' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'
                          }`}>
                            {product.vertical}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center">
                            <span className={`w-2 h-2 rounded-full mr-2 ${product.stock > 10 ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`} />
                            <span className="font-bold text-gray-600">{product.stock} in stock</span>
                          </div>
                        </td>
                        <td className="px-8 py-5 font-black text-gray-900">₹{product.price.toLocaleString()}</td>
                        <td className="px-8 py-5">
                          <div className="flex items-center text-amber-500 font-bold">
                            {/* Fixed: Added 'Star' to imports */}
                            <Star size={14} fill="currentColor" className="mr-1" />
                            {product.rating}
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center justify-center space-x-2">
                            <button className="p-2 text-gray-300 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                              <Edit size={18} />
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-2 text-gray-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
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
              
              <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-gray-50">
                <p className="text-sm font-bold text-gray-400">Showing {filteredProducts.length} items</p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-bold disabled:opacity-50">Prev</button>
                  <button className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-bold">Next</button>
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
