import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, AlertCircle, CheckCircle, Loader2, Send, Sparkles, Heart, MessageSquare, Calendar, Clock, Award, Download, Eye, EyeOff } from 'lucide-react';

const ParentPortal: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [validations, setValidations] = useState({
    email: false,
    phone: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const validatePhone = (phone: string) => {
    const pattern = /^[\d\s\-\+\(\)]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
    return pattern.test(phone);
  };

  useEffect(() => {
    setValidations({
      email: formData.email === '' ? false : validateEmail(formData.email),
      phone: formData.phone === '' ? false : validatePhone(formData.phone)
    });
  }, [formData.email, formData.phone]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validations.email || !validations.phone) {
      alert('Please fill in all fields correctly');
      return;
    }
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitted(true);
    setLoading(false);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 max-w-6xl mx-auto space-y-8">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Header */}
      <div className="relative text-center space-y-3">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Heart className="h-6 w-6 text-purple-400" />
          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">👨‍👩‍👧 Parent Portal</h2>
          <Heart className="h-6 w-6 text-pink-400" />
        </div>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">Connect with your child's academic journey & track progress in real-time</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 p-6 rounded-2xl shadow-2xl border-2 border-purple-500/30 backdrop-blur-xl hover:border-purple-400 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="h-6 w-6 text-purple-400" />
              <h3 className="font-bold text-purple-300">Next Review</h3>
            </div>
            <p className="text-2xl font-bold text-slate-100">Dec 15</p>
            <p className="text-xs text-slate-400">Parent-Teacher Meeting</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 p-6 rounded-2xl shadow-2xl border-2 border-pink-500/30 backdrop-blur-xl hover:border-pink-400 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <Award className="h-6 w-6 text-pink-400" />
              <h3 className="font-bold text-pink-300">Grade</h3>
            </div>
            <p className="text-2xl font-bold text-slate-100">8.5 / 10</p>
            <p className="text-xs text-slate-400">Current GPA</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 p-6 rounded-2xl shadow-2xl border-2 border-rose-500/30 backdrop-blur-xl hover:border-rose-400 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="h-6 w-6 text-rose-400" />
              <h3 className="font-bold text-rose-300">Attendance</h3>
            </div>
            <p className="text-2xl font-bold text-slate-100">95%</p>
            <p className="text-xs text-slate-400">This Month</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 p-8 rounded-2xl shadow-2xl border-2 border-purple-500/30 backdrop-blur-xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 pointer-events-none"></div>
            
            <div className="relative">
              <h3 className="text-2xl font-bold text-purple-300 mb-6 flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-purple-400" />
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 bg-slate-700/60 text-slate-100 border-2 border-purple-500/50 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 focus:outline-none transition-all placeholder-slate-500 shadow-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className={`w-full px-4 py-3 bg-slate-700/60 text-slate-100 border-2 rounded-xl focus:ring-2 focus:outline-none transition-all placeholder-slate-500 shadow-lg ${
                        formData.email === '' ? 'border-purple-500/50 focus:ring-purple-400 focus:border-purple-400' :
                        validations.email ? 'border-green-500/50 focus:ring-green-400 focus:border-green-400' : 'border-red-500/50 focus:ring-red-400 focus:border-red-400'
                      }`}
                    />
                    {formData.email && (
                      <div className="absolute right-3 top-3">
                        {validations.email ? (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-400" />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Phone</label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className={`w-full px-4 py-3 bg-slate-700/60 text-slate-100 border-2 rounded-xl focus:ring-2 focus:outline-none transition-all placeholder-slate-500 shadow-lg ${
                        formData.phone === '' ? 'border-purple-500/50 focus:ring-purple-400 focus:border-purple-400' :
                        validations.phone ? 'border-green-500/50 focus:ring-green-400 focus:border-green-400' : 'border-red-500/50 focus:ring-red-400 focus:border-red-400'
                      }`}
                    />
                    {formData.phone && (
                      <div className="absolute right-3 top-3">
                        {validations.phone ? (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-400" />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-700/60 text-slate-100 border-2 border-purple-500/50 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 focus:outline-none transition-all placeholder-slate-500 shadow-lg resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 hover:from-purple-600 hover:via-pink-600 hover:to-rose-600 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>

              {submitted && (
                <div className="mt-4 p-4 bg-green-500/10 border-2 border-green-500/50 rounded-xl flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-green-300">Message sent successfully!</p>
                    <p className="text-xs text-green-200">We'll get back to you soon.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 p-8 rounded-2xl shadow-2xl border-2 border-purple-500/30 backdrop-blur-xl">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 pointer-events-none"></div>
        
        <div className="relative">
          <h3 className="text-2xl font-bold text-purple-300 mb-6 flex items-center gap-2">
            <Download className="h-6 w-6 text-purple-400" />
            Downloadable Resources
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Academic Report', icon: '📄', color: 'purple' },
              { title: 'Parent Guidelines', icon: '📋', color: 'pink' },
              { title: 'Fee Structure', icon: '💰', color: 'rose' }
            ].map((resource, idx) => (
              <div key={idx} className={`p-4 bg-slate-700/50 rounded-xl border border-${resource.color}-400/30 hover:border-${resource.color}-400 transition-colors cursor-pointer group`}>
                <div className="text-3xl mb-2">{resource.icon}</div>
                <p className="font-bold text-slate-200 group-hover:text-${resource.color}-300 transition-colors">{resource.title}</p>
                <p className="text-xs text-slate-400">Last updated: Today</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentPortal;
