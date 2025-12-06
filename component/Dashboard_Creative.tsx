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
  Facebook,
  Zap,
  Target,
  Flame,
  Rocket,
  Star,
  Sparkles,
  Trophy,
  Lightbulb,
  Brain,
  Gauge,
  Grid3x3,
  CirclePlay,
  ExternalLink
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-6 space-y-6 overflow-hidden">
      {/* CREATIVE HERO SECTION - 3D EFFECT */}
      <div className="relative overflow-hidden rounded-3xl shadow-2xl h-auto">
        {/* Animated Background with Multiple Gradient Layers */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950"></div>
        
        {/* Animated Blob Effects */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative z-10 p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Left Section - Welcome */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="h-8 w-8 text-cyan-400 animate-bounce" />
                <span className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Welcome Back to EduBridge</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white drop-shadow-xl mb-3 leading-tight">
                Hey, <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">{user.name}</span>
              </h1>
              <p className="text-lg text-slate-300 mb-6 max-w-xl">
                Your learning journey is accelerating. Today's focus: master one skill, achieve one milestone, inspire one person.
              </p>
              <div className="flex gap-3">
                <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-105 flex items-center gap-2">
                  <Rocket className="h-5 w-5" />
                  Start Learning
                </button>
                <button className="px-6 py-3 bg-white/10 backdrop-blur-md text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/20">
                  View Goals
                </button>
              </div>
            </div>
            
            {/* Right Section - Live Clock & Date */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-full max-w-xs">
                {/* Glowing Clock Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur-2xl opacity-40"></div>
                
                <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-cyan-500/50 backdrop-blur-xl rounded-2xl p-6 text-center">
                  <div className="text-5xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text drop-shadow-lg mb-2">
                    {formatTime(currentTime)}
                  </div>
                  <div className="text-sm text-slate-400 font-semibold uppercase tracking-wider mb-3">
                    {formatDateOnly(currentTime)}
                  </div>
                  <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PERFORMANCE GAUGE SECTION - UNIQUE CIRCULAR LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Gauge 1 - Achievement Score */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-all"></div>
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-yellow-500/50 rounded-2xl p-6 hover:border-yellow-400 transition-all cursor-pointer transform hover:scale-105">
            <div className="flex justify-between items-start mb-4">
              <Trophy className="h-6 w-6 text-yellow-400" />
              <span className="text-xs font-bold text-yellow-400 bg-yellow-500/20 px-3 py-1 rounded-full">+12%</span>
            </div>
            <div className="mb-4">
              <div className="text-5xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">92</div>
              <p className="text-sm text-slate-400 font-semibold mt-2">Achievement Score</p>
            </div>
            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
        </div>

        {/* Gauge 2 - Learning Velocity */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-all"></div>
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/50 rounded-2xl p-6 hover:border-cyan-400 transition-all cursor-pointer transform hover:scale-105">
            <div className="flex justify-between items-start mb-4">
              <Zap className="h-6 w-6 text-cyan-400" />
              <span className="text-xs font-bold text-cyan-400 bg-cyan-500/20 px-3 py-1 rounded-full">+8%</span>
            </div>
            <div className="mb-4">
              <div className="text-5xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">85</div>
              <p className="text-sm text-slate-400 font-semibold mt-2">Learning Velocity</p>
            </div>
            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>

        {/* Gauge 3 - Focus Score */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-all"></div>
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-purple-500/50 rounded-2xl p-6 hover:border-purple-400 transition-all cursor-pointer transform hover:scale-105">
            <div className="flex justify-between items-start mb-4">
              <Brain className="h-6 w-6 text-purple-400" />
              <span className="text-xs font-bold text-purple-400 bg-purple-500/20 px-3 py-1 rounded-full">+5%</span>
            </div>
            <div className="mb-4">
              <div className="text-5xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">78</div>
              <p className="text-sm text-slate-400 font-semibold mt-2">Focus Score</p>
            </div>
            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
        </div>

        {/* Gauge 4 - Streak Days */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-all"></div>
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-red-500/50 rounded-2xl p-6 hover:border-red-400 transition-all cursor-pointer transform hover:scale-105">
            <div className="flex justify-between items-start mb-4">
              <Flame className="h-6 w-6 text-red-400" />
              <span className="text-xs font-bold text-red-400 bg-red-500/20 px-3 py-1 rounded-full">🔥 Active</span>
            </div>
            <div className="mb-4">
              <div className="text-5xl font-black text-transparent bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text">47</div>
              <p className="text-sm text-slate-400 font-semibold mt-2">Streak Days</p>
            </div>
            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-400 to-rose-500 rounded-full" style={{ width: '95%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* PROGRESS WAVE SECTION - UNIQUE WAVY VISUALIZATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Heatmap */}
        <div className="lg:col-span-2">
          <div className="relative group overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-20 group-hover:opacity-30 transition-all"></div>
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-black text-white mb-1">Weekly Activity Heatmap</h3>
                  <p className="text-sm text-slate-400">Your learning intensity across the week</p>
                </div>
                <div className="p-3 bg-cyan-500/20 rounded-xl">
                  <Activity className="h-6 w-6 text-cyan-400" />
                </div>
              </div>

              {/* Heatmap Grid */}
              <div className="space-y-2">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, idx) => {
                  const intensity = [75, 82, 68, 90, 85, 45, 30][idx];
                  return (
                    <div key={day} className="flex items-center gap-4">
                      <span className="text-xs font-bold text-slate-400 w-20">{day}</span>
                      <div className="flex-1 h-10 bg-slate-800 rounded-lg overflow-hidden relative">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-500 flex items-center justify-end pr-3"
                          style={{ width: `${intensity}%` }}
                        >
                          <span className="text-xs font-bold text-white">{intensity}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-700">
                <div className="text-center">
                  <div className="text-3xl font-black text-cyan-400">96h</div>
                  <p className="text-xs text-slate-400 mt-1">Total Learning</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-purple-400">14h</div>
                  <p className="text-xs text-slate-400 mt-1">Avg Daily</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-pink-400">7/7</div>
                  <p className="text-xs text-slate-400 mt-1">Days Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Sidebar */}
        <div className="space-y-4">
          {/* Cards Learned */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all"></div>
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-blue-500/50 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 font-semibold">Cards Learned</p>
                  <p className="text-4xl font-black text-cyan-400 mt-2">248</p>
                </div>
                <BookOpen className="h-10 w-10 text-blue-400 opacity-50" />
              </div>
              <div className="mt-4 pt-4 border-t border-slate-700 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-xs text-green-400 font-bold">+18 today</span>
              </div>
            </div>
          </div>

          {/* Time Investment */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all"></div>
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-purple-500/50 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 font-semibold">Time Investment</p>
                  <p className="text-4xl font-black text-purple-400 mt-2">96h</p>
                </div>
                <Clock className="h-10 w-10 text-purple-400 opacity-50" />
              </div>
              <div className="mt-4 pt-4 border-t border-slate-700 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-xs text-green-400 font-bold">+14h this week</span>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all"></div>
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-yellow-500/50 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 font-semibold">Achievements</p>
                  <p className="text-4xl font-black text-yellow-400 mt-2">18</p>
                </div>
                <Award className="h-10 w-10 text-yellow-400 opacity-50" />
              </div>
              <div className="mt-4 pt-4 border-t border-slate-700 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-xs text-green-400 font-bold">+3 this month</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED SECTION - PREMIUM FEATURES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tech Accelerator - Gradient Premium */}
        <div className="group relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-pink-500 to-red-600 opacity-40 group-hover:opacity-60 transition-all blur-xl"></div>
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-orange-500/50 rounded-2xl p-8 cursor-pointer">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Rocket className="h-6 w-6 text-orange-400" />
                  <span className="text-xs font-black text-orange-400 bg-orange-500/20 px-3 py-1 rounded-full">PREMIUM</span>
                </div>
                <h3 className="text-3xl font-black text-white mb-2">Tech Accelerator</h3>
                <p className="text-slate-400 text-sm max-w-xs">Company-fit analysis + career pathways personalized for you</p>
              </div>
              <Star className="h-8 w-8 text-yellow-400" />
            </div>
            <button
              onClick={() => onNavigate('tech-accelerator')}
              className="mt-6 w-full py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-orange-500/50 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Zap className="h-5 w-5" />
              Unlock Now
            </button>
          </div>
        </div>

        {/* AI Mentor Chat - Interactive */}
        <div className="group relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 opacity-40 group-hover:opacity-60 transition-all blur-xl"></div>
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/50 rounded-2xl p-8 cursor-pointer">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-6 w-6 text-cyan-400" />
                  <span className="text-xs font-black text-cyan-400 bg-cyan-500/20 px-3 py-1 rounded-full">AI-POWERED</span>
                </div>
                <h3 className="text-3xl font-black text-white mb-2">AI Mentor Chat</h3>
                <p className="text-slate-400 text-sm max-w-xs">24/7 AI-powered mentoring with instant doubt resolution</p>
              </div>
              <CirclePlay className="h-8 w-8 text-cyan-400 animate-pulse" />
            </div>
            <button
              onClick={() => onNavigate('mentor')}
              className="mt-6 w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <CirclePlay className="h-5 w-5" />
              Start Chat
            </button>
          </div>
        </div>
      </div>

      {/* ADVANCED ANALYTICS - COMPARISON CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Radar Chart */}
        <div className="relative group overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-20 group-hover:opacity-30 transition-all blur-xl"></div>
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-black text-white">Skill Proficiency</h3>
                <p className="text-sm text-slate-400 mt-1">Radar visualization of your skills</p>
              </div>
              <Target className="h-6 w-6 text-purple-400" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={riskData}>
                <PolarGrid stroke="#475569" />
                <PolarAngleAxis dataKey="subject" stroke="#cbd5e1" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#475569" tick={{ fontSize: 10 }} />
                <Radar 
                  name="Your Skills" 
                  dataKey="A" 
                  stroke="#d946ef" 
                  fill="#d946ef" 
                  fillOpacity={0.4} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Growth Trend Chart */}
        <div className="relative group overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 opacity-20 group-hover:opacity-30 transition-all blur-xl"></div>
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-black text-white">Overall Growth Trend</h3>
                <p className="text-sm text-slate-400 mt-1">5-month progression analysis</p>
              </div>
              <TrendingUp className="h-6 w-6 text-green-400" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={peerComparisonData}>
                <defs>
                  <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '2px solid #10b981',
                    borderRadius: '8px'
                  }} 
                  formatter={(value) => [`${value}%`, 'Score']}
                  labelStyle={{ color: '#10b981' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorGrowth)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* INTEGRITY MONITOR + QUICK ACTIONS - UNIQUE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Integrity Monitor */}
        <div className="lg:col-span-2 relative group overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-yellow-600 opacity-20 group-hover:opacity-30 transition-all blur-xl"></div>
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-500/20 rounded-xl">
                  <AlertTriangle className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">Integrity Monitor</h3>
                  <p className="text-sm text-slate-400 mt-1">Academic honesty & exam integrity tracking</p>
                </div>
              </div>
              <div className="text-4xl font-black text-green-400">✓</div>
            </div>

            <div className="space-y-4">
              {/* Plagiarism Check */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 hover:border-green-500/50 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="font-semibold text-white">Plagiarism Check</span>
                  </div>
                  <span className="text-xs font-bold text-green-400 bg-green-500/20 px-3 py-1 rounded-full">Clean</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 w-full rounded-full"></div>
                </div>
              </div>

              {/* Tab Switching */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 hover:border-yellow-500/50 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-400" />
                    <span className="font-semibold text-white">Tab Switching</span>
                  </div>
                  <span className="text-xs font-bold text-yellow-400 bg-yellow-500/20 px-3 py-1 rounded-full">2 Warnings</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500" style={{ width: '40%' }}></div>
                </div>
              </div>

              {/* Exam Behavior */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 hover:border-cyan-500/50 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-400" />
                    <span className="font-semibold text-white">Exam Behavior</span>
                  </div>
                  <span className="text-xs font-bold text-cyan-400 bg-cyan-500/20 px-3 py-1 rounded-full">Normal</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-full rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="space-y-4">
          {/* Upcoming Tasks */}
          <div className="relative group overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-20 group-hover:opacity-30 transition-all blur-xl"></div>
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl p-6">
              <h4 className="text-lg font-black text-white mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <button className="w-full py-2 px-4 bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-500/50 text-cyan-400 font-bold rounded-lg transition-all text-sm flex items-center justify-between group">
                  View Assignments
                  <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full py-2 px-4 bg-purple-500/20 hover:bg-purple-500/40 border border-purple-500/50 text-purple-400 font-bold rounded-lg transition-all text-sm flex items-center justify-between group">
                  Download Materials
                  <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full py-2 px-4 bg-pink-500/20 hover:bg-pink-500/40 border border-pink-500/50 text-pink-400 font-bold rounded-lg transition-all text-sm flex items-center justify-between group">
                  Schedule Session
                  <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Motivation Card */}
          <div className="relative group overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-600 opacity-20 group-hover:opacity-30 transition-all blur-xl"></div>
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl p-6">
              <Lightbulb className="h-8 w-8 text-yellow-400 mb-3" />
              <p className="text-sm text-slate-300 font-semibold leading-relaxed">
                "Every expert was once a beginner. Keep pushing! Your 47-day streak is inspiring! 🚀"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CALL-TO-ACTION BANNER - ULTIMATE GRADIENT */}
      <div className="relative group overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 opacity-50 group-hover:opacity-70 transition-all blur-xl"></div>
        <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-2 border-purple-500/50 rounded-2xl p-12 text-center">
          <Sparkles className="h-12 w-12 text-yellow-400 mx-auto mb-4 animate-bounce" />
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-lg">
            You're on a <span className="text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text">47-Day Streak!</span>
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            You're in the top 5% of learners. Keep this momentum going and unlock legendary status by reaching 100 days of consistent learning.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105 flex items-center gap-2">
              <Flame className="h-6 w-6" />
              Continue Learning
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/30">
              View Leaderboard
            </button>
          </div>
        </div>
      </div>

      {/* COMMUNITY & STATS FOOTER SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Platform Stats */}
        <div className="relative group overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-20 group-hover:opacity-30 transition-all blur-xl"></div>
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl p-6">
            <Users className="h-6 w-6 text-blue-400 mb-3" />
            <div className="text-4xl font-black text-cyan-400 mb-2">100K+</div>
            <p className="text-sm text-slate-400 font-semibold">Active Students Worldwide</p>
            <div className="mt-4 pt-4 border-t border-slate-700 text-xs text-slate-400">
              Growing daily across India's top colleges
            </div>
          </div>
        </div>

        {/* Partnership Stats */}
        <div className="relative group overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-20 group-hover:opacity-30 transition-all blur-xl"></div>
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl p-6">
            <Target className="h-6 w-6 text-purple-400 mb-3" />
            <div className="text-4xl font-black text-pink-400 mb-2">500+</div>
            <p className="text-sm text-slate-400 font-semibold">College Partnerships</p>
            <div className="mt-4 pt-4 border-t border-slate-700 text-xs text-slate-400">
              Integrated with academic institutions
            </div>
          </div>
        </div>

        {/* MNC Partnerships */}
        <div className="relative group overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-orange-600 opacity-20 group-hover:opacity-30 transition-all blur-xl"></div>
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl p-6">
            <Trophy className="h-6 w-6 text-yellow-400 mb-3" />
            <div className="text-4xl font-black text-orange-400 mb-2">50+</div>
            <p className="text-sm text-slate-400 font-semibold">MNC Hiring Partners</p>
            <div className="mt-4 pt-4 border-t border-slate-700 text-xs text-slate-400">
              Direct placement opportunities
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
