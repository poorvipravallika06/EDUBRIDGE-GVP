
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BarChart2, 
  BookOpen, 
  MessageSquare, 
  Briefcase, 
  Zap,
  Menu,
  X,
  Calendar,
  Beaker,
  Users,
  FileText,
  Mail,
  Speaker,
  LogOut,
  TrendingUp,
  GraduationCap,
  ChevronRight,
  Sparkles,
  Settings,
  HelpCircle,
  Moon,
  Sun,
  Bell
} from 'lucide-react';
import { View, User } from './types';
import Dashboard from './component/Dashboard';
import SkillGap from './component/SkillGap';
import Projects from './component/Projects';
import Mentor from './component/Mentor';
import Interview from './component/Interview';
import Trends from './component/Trends';
import Timetable from './component/Timetable';
import VirtualLab from './component/VirtualLab';
import PeerMatch from './component/PeerMatch';
import Notes from './component/Notes';
import ParentPortal from './component/ParentPortal';
import Auth from './component/Auth';
import TechAccelerator from './component/TechAccelerator';
import Scholar from './component/Scholar';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [blindMode, setBlindMode] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  // Persistence Logic: Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('eduBridgeUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setCurrentView('dashboard'); // Ensure dashboard on mount if user exists
      } catch (e) {
        console.error("Failed to parse user from storage");
        localStorage.removeItem('eduBridgeUser');
      }
    }
  }, []);

  // Ensure dashboard view when user logs in
  useEffect(() => {
    if (user) {
      setCurrentView('dashboard');
    }
  }, [user]);

  // Screen Reader Logic for Blind Support
  useEffect(() => {
    if (blindMode && user) {
      const msg = new SpeechSynthesisUtterance(`Navigated to ${currentView.replace('-', ' ')}`);
      window.speechSynthesis.speak(msg);
    }
  }, [currentView, blindMode, user]);

  const toggleBlindMode = () => {
    const newState = !blindMode;
    setBlindMode(newState);
    const msg = new SpeechSynthesisUtterance(newState ? "Audio Guide Enabled" : "Audio Guide Disabled");
    window.speechSynthesis.speak(msg);
  };

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    setCurrentView('dashboard'); // Ensure dashboard view after login
    localStorage.setItem('eduBridgeUser', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('dashboard');
    localStorage.removeItem('eduBridgeUser');
  };

  const NavItem = ({ view, icon: Icon, label, highlight = false }: { view: View; icon: any; label: string; highlight?: boolean }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setIsSidebarOpen(false);
      }}
      className={`
        w-full group relative flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
        ${currentView === view 
          ? darkMode 
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30' 
            : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
          : highlight 
            ? darkMode 
              ? 'bg-amber-900/30 text-amber-300 border border-amber-700/50 hover:bg-amber-900/50' 
              : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
            : darkMode
              ? 'text-slate-300 hover:bg-slate-800 hover:text-slate-100'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }
      `}
    >
      <Icon className="h-4 w-4 flex-shrink-0" />
      <span>{label}</span>
      {currentView === view && !darkMode && <ChevronRight className="h-4 w-4 ml-auto" />}
      {highlight && <Sparkles className="h-3.5 w-3.5 ml-auto animate-pulse" />}
    </button>
  );

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className={`flex h-screen text-slate-900 font-sans overflow-hidden transition-colors duration-300 ${
      darkMode ? 'bg-slate-950' : 'bg-slate-50'
    }`}>
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`
        fixed lg:hidden inset-y-0 left-0 z-50 w-64 transform transition-all duration-200 ease-in-out flex flex-col border-r
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        ${darkMode 
          ? 'bg-slate-900 border-slate-800' 
          : 'bg-white border-slate-200'
        }
      `}>
        {/* Sidebar Header */}
        <div className={`
          px-6 py-5 border-b flex items-center gap-2 shrink-0 group
          ${darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-100 bg-white'}
        `}>
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              EduBridge
            </p>
            <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Learn • Grow • Excel</p>
          </div>
          <button 
            className={`lg:hidden p-1 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
            }`}
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
          {/* Learning Hub */}
          <div>
            <div className={`text-xs font-bold uppercase tracking-wider mb-3 px-4 ${
              darkMode ? 'text-slate-500' : 'text-slate-400'
            }`}>
              📚 Learning Hub
            </div>
            <div className="space-y-1">
              <NavItem view="dashboard" icon={LayoutDashboard} label="Dashboard" />
              <NavItem view="tech-accelerator" icon={TrendingUp} label="Tech Accelerator" />
              <NavItem view="scholar" icon={GraduationCap} label="IIT/NIT Scholar" highlight={true} />
              <NavItem view="timetable" icon={Calendar} label="Smart Timetable" />
              <NavItem view="mentor" icon={MessageSquare} label="AI Mentor Chat" />
              <NavItem view="lab" icon={Beaker} label="Industry Lab Guide" />
              <NavItem view="notes" icon={FileText} label="Notes Converter" />
            </div>
          </div>

          {/* Career & Network */}
          <div>
            <div className={`text-xs font-bold uppercase tracking-wider mb-3 px-4 ${
              darkMode ? 'text-slate-500' : 'text-slate-400'
            }`}>
              🚀 Career & Network
            </div>
            <div className="space-y-1">
              <NavItem view="skill-gap" icon={BarChart2} label="Skill Gap Analyzer" />
              <NavItem view="projects" icon={BookOpen} label="Project Generator" />
              <NavItem view="interview" icon={Briefcase} label="Mock Interview" />
              <NavItem view="peers" icon={Users} label="Peer Match" />
              <NavItem view="trends" icon={Zap} label="MNC Trends" />
              <NavItem view="parents" icon={Mail} label="Parent Portal" />
            </div>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className={`
          p-4 border-t space-y-3 shrink-0
          ${darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-100 bg-slate-50'}
        `}>
          {/* Audio Guide Toggle */}
          <button 
            onClick={toggleBlindMode}
            className={`
              w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold 
              transition-all duration-200 border
              ${blindMode 
                ? darkMode
                  ? 'bg-amber-900/30 border-amber-700 text-amber-300'
                  : 'bg-amber-100 border-amber-200 text-amber-800'
                : darkMode
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-200 border-slate-300 text-slate-700 hover:bg-slate-300'
              }
            `}
          >
            <Speaker className="h-4 w-4" /> 
            {blindMode ? "Audio Guide ON" : "Audio Guide"}
          </button>

          {/* Theme Toggle & Logout */}
          <div className="flex gap-2">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`
                flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium
                transition-all duration-200 border
                ${darkMode
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-200 border-slate-300 text-slate-700 hover:bg-slate-300'
                }
              `}
            >
              {darkMode ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
            <button 
              onClick={handleLogout}
              className={`
                flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium
                transition-all duration-200 border
                ${darkMode
                  ? 'bg-red-900/20 border-red-700/30 text-red-400 hover:bg-red-900/30'
                  : 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'
                }
              `}
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Desktop Sidebar - Always Visible on Large Screens */}
      <aside className={`
        hidden lg:flex flex-col w-64 border-r shrink-0
        ${darkMode 
          ? 'bg-slate-900 border-slate-800' 
          : 'bg-white border-slate-200'
        }
      `}>
        {/* Sidebar Header */}
        <div className={`
          px-6 py-5 border-b flex items-center gap-2 shrink-0 group
          ${darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-100 bg-white'}
        `}>
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              EduBridge
            </p>
            <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Learn • Grow • Excel</p>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
          {/* Learning Hub */}
          <div>
            <div className={`text-xs font-bold uppercase tracking-wider mb-3 px-4 ${
              darkMode ? 'text-slate-500' : 'text-slate-400'
            }`}>
              📚 Learning Hub
            </div>
            <div className="space-y-1">
              <NavItem view="dashboard" icon={LayoutDashboard} label="Dashboard" />
              <NavItem view="tech-accelerator" icon={TrendingUp} label="Tech Accelerator" />
              <NavItem view="scholar" icon={GraduationCap} label="IIT/NIT Scholar" highlight={true} />
              <NavItem view="timetable" icon={Calendar} label="Smart Timetable" />
              <NavItem view="mentor" icon={MessageSquare} label="AI Mentor Chat" />
              <NavItem view="lab" icon={Beaker} label="Industry Lab Guide" />
              <NavItem view="notes" icon={FileText} label="Notes Converter" />
            </div>
          </div>

          {/* Career & Network */}
          <div>
            <div className={`text-xs font-bold uppercase tracking-wider mb-3 px-4 ${
              darkMode ? 'text-slate-500' : 'text-slate-400'
            }`}>
              🚀 Career & Network
            </div>
            <div className="space-y-1">
              <NavItem view="skill-gap" icon={BarChart2} label="Skill Gap Analyzer" />
              <NavItem view="projects" icon={BookOpen} label="Project Generator" />
              <NavItem view="interview" icon={Briefcase} label="Mock Interview" />
              <NavItem view="peers" icon={Users} label="Peer Match" />
              <NavItem view="trends" icon={Zap} label="MNC Trends" />
              <NavItem view="parents" icon={Mail} label="Parent Portal" />
            </div>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className={`
          p-4 border-t space-y-3 shrink-0
          ${darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-100 bg-slate-50'}
        `}>
          {/* Audio Guide Toggle */}
          <button 
            onClick={toggleBlindMode}
            className={`
              w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold 
              transition-all duration-200 border
              ${blindMode 
                ? darkMode
                  ? 'bg-amber-900/30 border-amber-700 text-amber-300'
                  : 'bg-amber-100 border-amber-200 text-amber-800'
                : darkMode
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-200 border-slate-300 text-slate-700 hover:bg-slate-300'
              }
            `}
          >
            <Speaker className="h-4 w-4" /> 
            {blindMode ? "Audio Guide ON" : "Audio Guide"}
          </button>

          {/* Theme Toggle & Logout */}
          <div className="flex gap-2">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`
                flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium
                transition-all duration-200 border
                ${darkMode
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-200 border-slate-300 text-slate-700 hover:bg-slate-300'
                }
              `}
            >
              {darkMode ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
            <button 
              onClick={handleLogout}
              className={`
                flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium
                transition-all duration-200 border
                ${darkMode
                  ? 'bg-red-900/20 border-red-700/30 text-red-400 hover:bg-red-900/30'
                  : 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'
                }
              `}
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className={`
          h-16 flex items-center justify-between px-4 lg:px-6 shrink-0 border-b transition-all
          ${darkMode 
            ? 'bg-slate-900 border-slate-800' 
            : 'bg-white border-slate-200'
          }
        `}>
          <div className="flex items-center gap-4 flex-1">
            <button 
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
              }`}
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            
            <div className={`hidden lg:flex items-center gap-2 text-sm ${
              darkMode ? 'text-slate-500' : 'text-slate-400'
            }`}>
              <span className="text-slate-400">/</span>
              <span className={`font-semibold capitalize ${
                darkMode ? 'text-slate-200' : 'text-slate-700'
              }`}>
                {currentView.replace('-', ' ')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 rounded-lg transition-all relative ${
                  darkMode 
                    ? 'hover:bg-slate-800 text-slate-400' 
                    : 'hover:bg-slate-100 text-slate-600'
                }`}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </button>
            </div>

            {/* User Profile */}
            <div className={`flex items-center gap-3 pl-4 pr-2 rounded-lg ${
              darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'
            } transition-colors`}>
              <div className="hidden sm:block">
                <p className={`text-sm font-semibold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                  {user.name}
                </p>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {user.college}
                </p>
              </div>
              <div className={`
                w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white
                bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0
              `}>
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className={`flex-1 overflow-auto transition-colors ${
          darkMode ? 'bg-slate-950' : 'bg-slate-50'
        }`}>
          <div className="p-4 lg:p-8">
            {currentView === 'dashboard' && <Dashboard onNavigate={setCurrentView} user={user} />}
            {currentView === 'tech-accelerator' && <TechAccelerator onNavigate={setCurrentView} />}
            {currentView === 'scholar' && <Scholar />}
            {currentView === 'skill-gap' && <SkillGap />}
            {currentView === 'mentor' && <Mentor />}
            {currentView === 'projects' && <Projects />}
            {currentView === 'interview' && <Interview />}
            {currentView === 'trends' && <Trends />}
            {currentView === 'timetable' && <Timetable />}
            {currentView === 'lab' && <VirtualLab />}
            {currentView === 'peers' && <PeerMatch />}
            {currentView === 'notes' && <Notes />}
            {currentView === 'parents' && <ParentPortal />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
