
import React, { useState } from 'react';
import { AppProvider, useAppContext } from './AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CategoryView from './pages/CategoryView';
import CartPage from './pages/CartPage';
import AuthPage from './pages/AuthPage';
import AdminDashboard from './pages/AdminDashboard';
import ProductDetail from './pages/ProductDetail';
import MobileBottomNav from './components/MobileBottomNav';

const NavigationRouter: React.FC = () => {
  const { user } = useAppContext();
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const navigateTo = (page: string, params?: any) => {
    setCurrentPage(page);
    if (params?.category) setSelectedCategory(params.category);
    if (params?.productId) setSelectedProductId(params.productId);
    window.scrollTo(0, 0);
  };

  // Simple route rendering
  const renderPage = () => {
    if (user?.role === 'ADMIN' && currentPage === 'admin') return <AdminDashboard />;
    
    switch (currentPage) {
      case 'home': return <Home onNavigate={navigateTo} />;
      case 'category': return <CategoryView category={selectedCategory} onNavigate={navigateTo} />;
      case 'product': return <ProductDetail productId={selectedProductId!} onNavigate={navigateTo} />;
      case 'cart': return <CartPage onNavigate={navigateTo} />;
      case 'auth': return <AuthPage onNavigate={navigateTo} />;
      case 'admin': return <AdminDashboard />;
      default: return <Home onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onNavigate={navigateTo} currentPage={currentPage} />
      <main className="flex-grow pt-16 pb-20 md:pb-0">
        {renderPage()}
      </main>
      <Footer onNavigate={navigateTo} />
      <MobileBottomNav onNavigate={navigateTo} currentPage={currentPage} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <NavigationRouter />
    </AppProvider>
  );
};

export default App;
