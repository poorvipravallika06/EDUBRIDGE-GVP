import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, MessageCircle, Sparkles, FileText, BookOpen, Lightbulb, Brain, Zap, ThumbsUp, Copy, Check, RotateCcw } from 'lucide-react';
import { getChatResponse } from '../services/geminiServices';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const Mentor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: '👋 Hello! I\'m your AI Mentor. I\'m here to help you with any questions about programming, web development, data science, or any other tech topic. What would you like to learn today?',
      timestamp: new Date()
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await getChatResponse(input);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyMessage = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        type: 'ai',
        content: '👋 Hello! I\'m your AI Mentor. I\'m here to help you with any questions about programming, web development, data science, or any other tech topic. What would you like to learn today?',
        timestamp: new Date()
      }
    ]);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 max-w-5xl mx-auto flex flex-col space-y-6">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Header */}
      <div className="relative text-center space-y-3">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-6 w-6 text-blue-400" />
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">🤖 AI Mentor</h2>
          <Sparkles className="h-6 w-6 text-cyan-400" />
        </div>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">Your personal AI-powered learning companion. Ask anything and get instant, detailed explanations!</p>
      </div>

      {/* Chat Area */}
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-2xl shadow-2xl border-2 border-blue-500/30 backdrop-blur-xl overflow-hidden flex-1 flex flex-col h-96">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 pointer-events-none"></div>

        {/* Messages */}
        <div className="relative flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-lg transition-all hover:shadow-xl ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-br-none'
                    : 'bg-slate-700/80 text-slate-100 border border-blue-500/30 rounded-bl-none'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <div className="flex items-center gap-2 mt-2">
                  <p className={`text-xs opacity-70`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {message.type === 'ai' && (
                    <button
                      onClick={() => handleCopyMessage(message.content, message.id)}
                      className="p-1 hover:bg-blue-600/20 rounded transition-all"
                      title="Copy message"
                    >
                      {copied === message.id ? (
                        <Check className="h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4 opacity-60 hover:opacity-100" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-700/80 text-slate-100 border border-blue-500/30 px-4 py-3 rounded-2xl rounded-bl-none shadow-lg">
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin h-4 w-4 text-cyan-400" />
                  <p className="text-sm text-slate-300">Thinking...</p>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="relative bg-gradient-to-r from-slate-800 to-slate-700 p-4 border-t border-blue-500/30">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything... (Type and press Enter)"
              className="flex-1 px-4 py-3 bg-slate-700/60 text-slate-100 border-2 border-blue-500/50 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition-all placeholder-slate-500 shadow-lg"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 p-6 rounded-2xl shadow-2xl border-2 border-cyan-500/30 backdrop-blur-xl">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none"></div>
        
        <div className="relative">
          <h3 className="text-lg font-bold text-cyan-300 mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-cyan-400" />
            Quick Tips
          </h3>
          
          <div className="grid md:grid-cols-4 gap-3">
            {[
              { icon: '🔧', title: 'Coding Help', desc: 'Debug & learn programming' },
              { icon: '📚', title: 'Concepts', desc: 'Explain complex topics' },
              { icon: '🎯', title: 'Interview Prep', desc: 'Ace your interviews' },
              { icon: '💡', title: 'Ideas', desc: 'Get project ideas' }
            ].map((tip, idx) => (
              <button
                key={idx}
                onClick={() => setInput(tip.title)}
                className="p-3 bg-slate-700/50 rounded-xl border border-cyan-400/30 hover:border-cyan-400 transition-all text-left group hover:bg-slate-700"
              >
                <p className="text-2xl mb-1">{tip.icon}</p>
                <p className="text-sm font-bold text-slate-200 group-hover:text-cyan-300">{tip.title}</p>
                <p className="text-xs text-slate-400 group-hover:text-slate-300">{tip.desc}</p>
              </button>
            ))}
          </div>

          <button
            onClick={handleClearChat}
            className="mt-4 px-4 py-2 bg-slate-700/60 hover:bg-slate-700 text-slate-300 font-bold rounded-lg transition-all flex items-center gap-2 w-full justify-center"
          >
            <RotateCcw className="h-4 w-4" />
            Clear Chat History
          </button>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 p-6 rounded-2xl shadow-2xl border-2 border-purple-500/30 backdrop-blur-xl">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 pointer-events-none"></div>
        
        <div className="relative">
          <h3 className="text-lg font-bold text-purple-300 mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-400" />
            How to Get Better Answers
          </h3>
          
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex gap-2">
              <span className="text-purple-400">→</span>
              <span>Be specific about what you want to learn</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-400">→</span>
              <span>Provide context about your current level</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-400">→</span>
              <span>Ask follow-up questions to dive deeper</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-400">→</span>
              <span>Copy answers to your notes for later reference</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Mentor;
