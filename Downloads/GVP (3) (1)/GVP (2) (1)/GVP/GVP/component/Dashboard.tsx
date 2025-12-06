
import React, { useState, useEffect } from 'react';
import { User, View } from '../types';
import { 
  TrendingUp, 
  TrendingDown,
  ArrowRight, 
  Users, 
  Activity, 
  Award, 
  BookOpen,
  BarChart3,
  AlertCircle,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Linkedin,
  Instagram,
  Twitter,
  Facebook
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, AreaChart, Area } from 'recharts';

interface DashboardProps {
  onNavigate: (view: View) => void;
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, user }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    return date.toLocaleString('en-US', options);
  };

  // Sample data for charts
  const engagementData = [
    { day: 'Mon', engagement: 75, average: 70 },
    { day: 'Tue', engagement: 82, average: 75 },
    { day: 'Wed', engagement: 68, average: 72 },
    { day: 'Thu', engagement: 90, average: 80 },
    { day: 'Fri', engagement: 85, average: 78 }
  ];

  const riskData = [
    { subject: 'Attendance', A: 85, fullMark: 100 },
    { subject: 'Grades', A: 78, fullMark: 100 },
    { subject: 'Engagement', A: 82, fullMark: 100 },
    { subject: 'Assignments', A: 88, fullMark: 100 },
    { subject: 'Lab Work', A: 92, fullMark: 100 }
  ];

  const peerComparisonData = [
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 70 },
    { month: 'Mar', score: 75 },
    { month: 'Apr', score: 80 },
    { month: 'May', score: 85 }
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true 
    });
  };

  const formatDateOnly = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div className="space-y-6 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 min-h-screen p-1">
      {/* Welcome Section - Enhanced Gradient */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl p-8 shadow-lg border border-blue-400 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">Welcome back, {user.name}!</h1>
            <p className="text-blue-100 mt-2 text-lg">
              Here's your personalized dashboard for {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.
            </p>
          </div>
          <div className="text-right bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <div className="text-3xl font-bold text-white drop-shadow-lg">{formatTime(currentTime)}</div>
            <div className="text-sm text-blue-100 mt-1">{formatDateOnly(currentTime)}</div>
          </div>
        </div>
      </div>

      {/* Tech Accelerator Card */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-4 right-4">
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">Premium Feature</span>
        </div>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-2">Tech Accelerator</h3>
          <p className="text-orange-100 mb-4 max-w-2xl">
            Unlock company-specific fit analysis and boost your career.
          </p>
          <button
            onClick={() => onNavigate('tech-accelerator')}
            className="bg-white text-orange-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-orange-50 transition-colors flex items-center gap-2"
          >
            Upgrade to Premium <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Key Metrics Cards - Enhanced with Multiple Colors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance Card - Blue */}
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-6 shadow-lg border-2 border-blue-300 text-white hover:shadow-2xl transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/30 backdrop-blur-sm rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-200" />
          </div>
          <h3 className="text-4xl font-bold text-white mb-1">92%</h3>
          <p className="text-blue-100 font-medium">Attendance</p>
        </div>

        {/* Attention Span Card - Green */}
        <div className="bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl p-6 shadow-lg border-2 border-green-300 text-white hover:shadow-2xl transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/30 backdrop-blur-sm rounded-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-200" />
          </div>
          <h3 className="text-4xl font-bold text-white mb-1">85%</h3>
          <p className="text-green-100 font-medium">Attention Span</p>
        </div>

        {/* Placement Score Card - Purple */}
        <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl p-6 shadow-lg border-2 border-purple-300 text-white hover:shadow-2xl transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/30 backdrop-blur-sm rounded-lg">
              <Award className="h-6 w-6 text-white" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-200" />
          </div>
          <h3 className="text-4xl font-bold text-white mb-1">78%</h3>
          <p className="text-purple-100 font-medium">Placement Score</p>
        </div>

        {/* Pending Labs Card - Orange/Red */}
        <div className="bg-gradient-to-br from-orange-400 to-red-600 rounded-xl p-6 shadow-lg border-2 border-orange-300 text-white hover:shadow-2xl transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/30 backdrop-blur-sm rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <TrendingDown className="h-5 w-5 text-red-200" />
          </div>
          <h3 className="text-4xl font-bold text-white mb-1">2</h3>
          <p className="text-orange-100 font-medium">Pending Labs</p>
        </div>
      </div>

      {/* Charts Section - Enhanced with Colors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Classroom Engagement Chart - Teal */}
        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 shadow-lg border-2 border-teal-300 hover:shadow-2xl transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-teal-800">📊 Classroom Engagement</h3>
            <button className="text-sm text-teal-600 hover:text-teal-700 font-bold flex items-center gap-1 bg-teal-100 px-3 py-1.5 rounded-lg hover:bg-teal-200 transition-colors">
              Weekly Report <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#a0d5d5" />
              <XAxis dataKey="day" stroke="#0d9488" />
              <YAxis stroke="#0d9488" domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#f0fdfa', 
                  border: '2px solid #14b8a6',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="engagement" fill="#14b8a6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="average" fill="#a0d5d5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Analysis Chart - Rose */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-6 shadow-lg border-2 border-rose-300 hover:shadow-2xl transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-rose-800">⚠️ Risk Analysis</h3>
            <button className="text-sm text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 bg-rose-100 px-3 py-1.5 rounded-lg hover:bg-rose-200 transition-colors">
              View Details <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={riskData}>
              <PolarGrid stroke="#f0d7d7" />
              <PolarAngleAxis dataKey="subject" stroke="#be123c" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#be123c" tick={{ fontSize: 10 }} />
              <Radar 
                name="Performance" 
                dataKey="A" 
                stroke="#f43f5e" 
                fill="#f43f5e" 
                fillOpacity={0.6} 
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section - Integrity Monitor and Peer Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Integrity Monitor - Amber/Yellow */}
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 shadow-lg border-2 border-amber-300 hover:shadow-2xl transition-all">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-amber-800">🛡️ Integrity Monitor</h3>
            <button className="text-sm text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1 bg-amber-100 px-3 py-1.5 rounded-lg hover:bg-amber-200 transition-colors">
              View Report <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          
          {/* Plagiarism Check */}
          <div className="mb-6 bg-white/60 p-4 rounded-lg backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-amber-700">✅ Plagiarism Check</span>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-bold text-green-600">Passed</span>
              </div>
            </div>
            <div className="w-full bg-amber-200 rounded-full h-3 overflow-hidden">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-full rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>

          {/* Tab Switching */}
          <div className="bg-white/60 p-4 rounded-lg backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-amber-700">⚠️ Tab Switching</span>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-bold text-yellow-600">2 Warnings</span>
              </div>
            </div>
            <div className="w-full bg-yellow-200 rounded-full h-3 overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>
        </div>

        {/* Peer Comparison - Indigo */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 shadow-lg border-2 border-indigo-300 hover:shadow-2xl transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-indigo-800">👥 Peer Comparison</h3>
            <select className="text-sm border-2 border-indigo-300 rounded-lg px-3 py-1.5 text-indigo-700 bg-white/70 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-medium">
              <option>Last 6 Months</option>
              <option>Last 3 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={peerComparisonData}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#c7d2fe" />
              <XAxis dataKey="month" stroke="#4338ca" />
              <YAxis stroke="#4338ca" domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#f0f4ff', 
                  border: '2px solid #4f46e5',
                  borderRadius: '8px'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#4f46e5" 
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorScore)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Empowering Banner - Vibrant Gradient */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-xl p-8 text-white shadow-2xl border-2 border-purple-400">
        <h2 className="text-4xl font-bold text-center mb-8 drop-shadow-lg">🚀 Empowering India's Future Engineers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
            <div className="text-5xl font-bold text-yellow-300 mb-2">100k+</div>
            <div className="text-sm text-purple-100 uppercase tracking-wide font-semibold">Active Students</div>
          </div>
          <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
            <div className="text-5xl font-bold text-pink-300 mb-2">500+</div>
            <div className="text-sm text-purple-100 uppercase tracking-wide font-semibold">Partner Colleges</div>
          </div>
          <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
            <div className="text-5xl font-bold text-cyan-300 mb-2">50+</div>
            <div className="text-sm text-purple-100 uppercase tracking-wide font-semibold">MNC Hiring Partners</div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 text-purple-100 text-sm bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg inline-block mx-auto">
          <MapPin className="h-4 w-4" />
          <span className="font-medium">Used widely across Delhi, Mumbai, Bangalore, Hyderabad, Chennai & Vizag</span>
        </div>
      </div>

      {/* Footer - Enhanced */}
      <footer className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 border-t-4 border-gradient-to-r from-purple-500 to-pink-500 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company */}
            <div>
              <h4 className="font-bold text-white mb-4 text-lg">Company</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><a href="#" className="hover:text-purple-400 transition-colors font-medium">About Us</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors font-medium">Careers</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors font-medium">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors font-medium">Contact</a></li>
              </ul>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-bold text-white mb-4 text-lg">Features</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><a href="#" className="hover:text-pink-400 transition-colors font-medium">Tech Accelerator</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors font-medium">Skill Gap</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors font-medium">MNC Trends</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors font-medium">Virtual Lab</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold text-white mb-4 text-lg">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><a href="#" className="hover:text-blue-400 transition-colors font-medium">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors font-medium">Success Stories</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors font-medium">Project Ideas</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors font-medium">Help Center</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="font-bold text-white mb-4 text-lg">Connect</h4>
              <div className="flex gap-3 mb-4">
                <a href="#" className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-colors shadow-lg">
                  <Linkedin className="h-5 w-5 text-white" />
                </a>
                <a href="#" className="p-2 bg-gradient-to-br from-pink-600 to-pink-700 rounded-lg hover:from-pink-700 hover:to-pink-800 transition-colors shadow-lg">
                  <Instagram className="h-5 w-5 text-white" />
                </a>
                <a href="#" className="p-2 bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-lg hover:from-cyan-700 hover:to-cyan-800 transition-colors shadow-lg">
                  <Twitter className="h-5 w-5 text-white" />
                </a>
                <a href="#" className="p-2 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-colors shadow-lg">
                  <Facebook className="h-5 w-5 text-white" />
                </a>
              </div>
              <div className="text-sm text-slate-300">
                <p className="font-bold text-white mb-1">📞 Toll Free: 1800-120-456-456</p>
                <p>Mon-Sat (9 AM - 9 PM)</p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-slate-600 pt-8 text-center text-sm text-slate-400">
            <p>© 2025 EduBridge Learning Solutions Pvt Ltd. All rights reserved. | Designed with ❤️ for India's Engineers</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
