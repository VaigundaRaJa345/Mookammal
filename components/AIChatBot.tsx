
import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../AppContext';
import { THEME_CONFIG } from '../constants';
import { MessageSquare, X, Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';

const AIChatBot: React.FC = () => {
  const { vertical, getAIResponse } = useAppContext();
  const theme = THEME_CONFIG[vertical];
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: `Namaste! I'm your Mookkammal Assistant. How can I help you in our ${vertical.toLowerCase()} department today?` }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await getAIResponse(userMsg);
    setMessages(prev => [...prev, { role: 'bot', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-[100]">
      {isOpen ? (
        <div className="bg-white w-[90vw] md:w-96 h-[500px] rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className={`${theme.primary} p-4 text-white flex justify-between items-center shadow-md`}>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Sparkles size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Mookkammal AI</h4>
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-[10px] text-white/70 font-bold uppercase">Online Help</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm font-medium shadow-sm ${
                  msg.role === 'user' 
                  ? `${theme.primary} text-white rounded-tr-none` 
                  : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 flex items-center space-x-2">
                  <Loader2 size={16} className="animate-spin text-gray-400" />
                  <span className="text-xs text-gray-400 font-bold">AI is thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="relative flex items-center">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask anything..."
                className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-4 pr-12 outline-none focus:ring-2 focus:ring-opacity-20 transition-all font-medium text-sm"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className={`absolute right-2 p-2 rounded-xl transition-all ${isLoading ? 'text-gray-300' : `${theme.accent} hover:bg-gray-100`}`}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className={`w-14 h-14 md:w-16 md:h-16 rounded-full ${theme.primary} text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all animate-bounce`}
          style={{ animationDuration: '3s' }}
        >
          <Sparkles size={28} />
        </button>
      )}
    </div>
  );
};

export default AIChatBot;
