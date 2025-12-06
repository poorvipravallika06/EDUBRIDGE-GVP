
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
    <div className="space-y-6 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 min-h-screen p-4">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 rounded-xl p-6 text-white shadow-xl border border-cyan-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
            <p className="text-cyan-100 mt-2">
              Here's your personalized dashboard for {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{formatTime(currentTime)}</div>
            <div className="text-sm text-cyan-100 mt-1">{formatDateOnly(currentTime)}</div>
          </div>
        </div>
      </div>

      {/* Tech Accelerator Card */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 rounded-xl p-8 text-white shadow-2xl relative overflow-hidden transform hover:scale-105 transition-transform">
        <div className="absolute top-4 right-4">
          <span className="bg-white/30 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold animate-pulse">⭐ Premium</span>
        </div>
        <div className="relative z-10">
          <h3 className="text-3xl font-bold mb-3">🚀 Tech Accelerator</h3>
          <p className="text-orange-50 mb-4 max-w-2xl text-lg">
            Unlock company-specific fit analysis and turbocharge your career to the next level.
          </p>
          <button
            onClick={() => onNavigate('tech-accelerator')}
            className="bg-white text-orange-600 px-8 py-3 rounded-lg font-bold hover:bg-orange-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 flex items-center gap-2"
          >
            Upgrade Now <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Attendance Card */}
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-6 text-white shadow-lg border-2 border-blue-300 transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/30 rounded-lg backdrop-blur-sm">
              <Users className="h-6 w-6" />
            </div>
            <TrendingUp className="h-5 w-5 text-yellow-300 animate-bounce" />
          </div>
          <h3 className="text-4xl font-bold mb-1">92%</h3>
          <p className="text-blue-100 font-semibold">Attendance</p>
        </div>

        {/* Attention Span Card */}
        <div className="bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl p-6 text-white shadow-lg border-2 border-emerald-300 transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/30 rounded-lg backdrop-blur-sm">
              <Activity className="h-6 w-6" />
            </div>
            <TrendingUp className="h-5 w-5 text-yellow-300 animate-bounce" />
          </div>
          <h3 className="text-4xl font-bold mb-1">85%</h3>
          <p className="text-emerald-100 font-semibold">Attention Span</p>
        </div>

        {/* Placement Score Card */}
        <div className="bg-gradient-to-br from-purple-400 to-pink-600 rounded-xl p-6 text-white shadow-lg border-2 border-purple-300 transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/30 rounded-lg backdrop-blur-sm">
              <Award className="h-6 w-6" />
            </div>
            <TrendingUp className="h-5 w-5 text-yellow-300 animate-bounce" />
          </div>
          <h3 className="text-4xl font-bold mb-1">78%</h3>
          <p className="text-purple-100 font-semibold">Placement Score</p>
        </div>

        {/* Pending Labs Card */}
        <div className="bg-gradient-to-br from-orange-400 to-red-600 rounded-xl p-6 text-white shadow-lg border-2 border-orange-300 transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/30 rounded-lg backdrop-blur-sm">
              <BookOpen className="h-6 w-6" />
            </div>
            <TrendingDown className="h-5 w-5 text-yellow-300" />
          </div>
          <h3 className="text-4xl font-bold mb-1">2</h3>
          <p className="text-orange-100 font-semibold">Pending Labs</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Classroom Engagement Chart */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-100 rounded-xl p-6 shadow-lg border-2 border-indigo-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-indigo-900">📊 Classroom Engagement</h3>
            <button className="text-sm text-indigo-700 hover:text-indigo-900 font-bold flex items-center gap-1 bg-white px-3 py-1 rounded-lg hover:bg-indigo-100">
              Weekly Report <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#c7d2fe" />
              <XAxis dataKey="day" stroke="#4f46e5" />
              <YAxis stroke="#4f46e5" domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '2px solid #4f46e5',
                  borderRadius: '12px'
                }} 
              />
              <Bar dataKey="engagement" fill="#6366f1" radius={[12, 12, 0, 0]} />
              <Bar dataKey="average" fill="#a5b4fc" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Analysis Chart */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-100 rounded-xl p-6 shadow-lg border-2 border-rose-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-rose-900">⚡ Risk Analysis</h3>
            <button className="text-sm text-rose-700 hover:text-rose-900 font-bold flex items-center gap-1 bg-white px-3 py-1 rounded-lg hover:bg-rose-100">
              View Details <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={riskData}>
              <PolarGrid stroke="#fbcfe8" />
              <PolarAngleAxis dataKey="subject" stroke="#be185d" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#be185d" tick={{ fontSize: 10 }} />
              <Radar 
                name="Performance" 
                dataKey="A" 
                stroke="#e91e63" 
                fill="#e91e63" 
                fillOpacity={0.6} 
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section - Integrity Monitor and Peer Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Integrity Monitor */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 shadow-lg border-2 border-green-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-green-900">🛡️ Integrity Monitor</h3>
            <button className="text-sm text-green-700 hover:text-green-900 font-bold flex items-center gap-1 bg-white px-3 py-1 rounded-lg hover:bg-green-100">
              View Report <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          
          {/* Plagiarism Check */}
          <div className="mb-6 bg-white/60 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-green-900">Plagiarism Check</span>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 animate-pulse" />
                <span className="text-sm font-bold text-green-700">✓ Passed</span>
              </div>
            </div>
            <div className="w-full bg-green-200 rounded-full h-4 overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-full rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>

          {/* Tab Switching */}
          <div className="bg-white/60 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-green-900">Tab Switching</span>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600 animate-pulse" />
                <span className="text-sm font-bold text-yellow-700">⚠️ 2 Warnings</span>
              </div>
            </div>
            <div className="w-full bg-yellow-200 rounded-full h-4 overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-600 h-full rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>
        </div>

        {/* Peer Comparison */}
        <div className="bg-gradient-to-br from-violet-50 to-purple-100 rounded-xl p-6 shadow-lg border-2 border-violet-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-violet-900">📈 Peer Comparison</h3>
            <select className="text-sm border-2 border-violet-300 rounded-lg px-3 py-1.5 text-violet-900 bg-white font-bold focus:ring-2 focus:ring-violet-500 focus:outline-none">
              <option>Last 6 Months</option>
              <option>Last 3 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={peerComparisonData}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd6fe" />
              <XAxis dataKey="month" stroke="#6d28d9" />
              <YAxis stroke="#6d28d9" domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '2px solid #a855f7',
                  borderRadius: '12px'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#a855f7" 
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorScore)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Empowering Banner - At the end */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-xl p-8 text-white shadow-lg">
        <h2 className="text-4xl font-bold text-center mb-8">Empowering India's Future Engineers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-orange-400 mb-2">100k+</div>
            <div className="text-sm text-blue-100 uppercase tracking-wide">Active Students</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-orange-400 mb-2">500+</div>
            <div className="text-sm text-blue-100 uppercase tracking-wide">Partner Colleges</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-orange-400 mb-2">50+</div>
            <div className="text-sm text-blue-100 uppercase tracking-wide">MNC Hiring Partners</div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 text-blue-100 text-sm">
          <MapPin className="h-4 w-4" />
          <span>Used widely across Delhi, Mumbai, Bangalore, Hyderabad, Chennai & Vizag</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company */}
            <div>
              <h4 className="font-semibold text-slate-800 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-semibold text-slate-800 mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Tech Accelerator</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Skill Gap</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">MNC Trends</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Virtual Lab</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-slate-800 mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Project Ideas</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Help Center</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="font-semibold text-slate-800 mb-4">Connect</h4>
              <div className="flex gap-3 mb-4">
                <a href="#" className="p-2 bg-slate-100 rounded-lg hover:bg-indigo-100 transition-colors">
                  <Linkedin className="h-5 w-5 text-slate-600 hover:text-indigo-600" />
                </a>
                <a href="#" className="p-2 bg-slate-100 rounded-lg hover:bg-indigo-100 transition-colors">
                  <Instagram className="h-5 w-5 text-slate-600 hover:text-indigo-600" />
                </a>
                <a href="#" className="p-2 bg-slate-100 rounded-lg hover:bg-indigo-100 transition-colors">
                  <Twitter className="h-5 w-5 text-slate-600 hover:text-indigo-600" />
                </a>
                <a href="#" className="p-2 bg-slate-100 rounded-lg hover:bg-indigo-100 transition-colors">
                  <Facebook className="h-5 w-5 text-slate-600 hover:text-indigo-600" />
                </a>
              </div>
              <div className="text-sm text-slate-600">
                <p className="font-semibold mb-1">Toll Free: 1800-120-456-456</p>
                <p>Mon-Sat (9 AM - 9 PM)</p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-slate-200 pt-8 text-center text-sm text-slate-600">
            <p>© 2025 EduBridge Learning Solutions Pvt Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
