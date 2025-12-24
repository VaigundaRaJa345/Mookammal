
import React, { useState } from 'react';
import { useAppContext } from '../AppContext';
import { THEME_CONFIG } from '../constants';
import { Mail, Lock, User, ArrowRight, ShieldCheck, Github, Smartphone } from 'lucide-react';

interface AuthPageProps {
  onNavigate: (page: string) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onNavigate }) => {
  const { vertical, setUser } = useAppContext();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const theme = THEME_CONFIG[vertical];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    const mockUser = {
      id: 'u1',
      name: formData.name || 'John Doe',
      email: formData.email,
      role: formData.email.includes('admin') ? 'ADMIN' as const : 'USER' as const,
      avatar: `https://ui-avatars.com/api/?name=${formData.name || 'John'}`
    };
    setUser(mockUser);
    onNavigate(mockUser.role === 'ADMIN' ? 'admin' : 'home');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-20">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Left Side: Illustration & Branding */}
        <div className={`hidden lg:flex flex-col justify-center p-20 bg-gradient-to-br ${theme.gradient} text-white relative overflow-hidden`}>
          <div className="relative z-10">
            <h1 className="font-brand text-6xl font-bold mb-8 leading-tight">
              {isLogin ? 'Welcome Back!' : 'Start Your Journey'}
            </h1>
            <p className="text-xl text-white text-opacity-80 mb-12 max-w-sm leading-relaxed">
              Experience the best of Mookkammal's heritage and quality at your fingertips.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4 bg-white bg-opacity-10 backdrop-blur-md p-4 rounded-2xl border border-white border-opacity-20">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-900">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Secure Authentication</h4>
                  <p className="text-xs text-white text-opacity-60">Your data is always encrypted.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute top-[-10%] right-[-10%] w-[80%] aspect-square bg-white bg-opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-20%] left-[-20%] w-[60%] aspect-square bg-white bg-opacity-5 rounded-full blur-3xl"></div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 sm:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-12">
              <h2 className="text-3xl font-black text-gray-900 mb-2">
                {isLogin ? 'Sign In' : 'Create Account'}
              </h2>
              <p className="text-gray-500 font-medium">
                {isLogin ? 'Enter your details to access your account' : 'Fill in the information to get started'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                    <input 
                      type="text" 
                      required 
                      className="w-full bg-gray-50 border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-opacity-20 transition-all outline-none border-2 focus:border-gray-300"
                      placeholder="e.g. Rahul Kumar"
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                  <input 
                    type="email" 
                    required 
                    className="w-full bg-gray-50 border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-opacity-20 transition-all outline-none border-2 focus:border-gray-300"
                    placeholder="name@example.com"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Password</label>
                  {isLogin && <button type="button" className="text-xs font-bold text-gray-400 hover:text-gray-900">Forgot?</button>}
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                  <input 
                    type="password" 
                    required 
                    className="w-full bg-gray-50 border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-opacity-20 transition-all outline-none border-2 focus:border-gray-300"
                    placeholder="••••••••"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              <button 
                type="submit"
                className={`w-full py-5 rounded-2xl ${theme.primary} text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center group`}
              >
                {isLogin ? 'Sign In Now' : 'Create My Account'}
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-10 pt-10 border-t border-gray-100">
              <p className="text-center text-gray-500 font-medium mb-8">Or continue with</p>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-all font-bold text-sm">
                  <Smartphone className="mr-2 text-gray-900" size={18} /> Phone
                </button>
                <button className="flex items-center justify-center p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-all font-bold text-sm">
                  <Github className="mr-2 text-gray-900" size={18} /> GitHub
                </button>
              </div>
            </div>

            <p className="mt-10 text-center text-gray-500 font-medium">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className={`ml-2 font-black ${theme.accent} hover:underline`}
              >
                {isLogin ? 'Create one' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
