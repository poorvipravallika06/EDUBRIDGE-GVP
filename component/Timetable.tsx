
import React, { useState, useEffect, useRef } from 'react';
import { generateTimetable } from '../services/geminiServices';
import { Calendar, Clock, Loader2, Save } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const Timetable: React.FC = () => {
  const [subjects, setSubjects] = useState('java, python, html, css');
  const [hours, setHours] = useState('3');
  const [schedule, setSchedule] = useState('');
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-generate schedule when subjects or hours change
  useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Only generate if subjects are provided
    if (!subjects.trim()) {
      setSchedule('');
      return;
    }

    // Debounce: Wait 1 second after user stops typing
    timeoutRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const result = await generateTimetable(subjects, hours);
        setSchedule(result);
      } catch (e) {
        console.error('Error generating timetable:', e);
        setSchedule('Error generating schedule. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 1000);

    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [subjects, hours]);

  const handleGenerate = async () => {
    if (!subjects.trim()) {
      alert("Please enter at least one subject.");
      return;
    }
    setLoading(true);
    try {
      const result = await generateTimetable(subjects, hours);
      setSchedule(result);
    } catch (e) {
      alert("Error generating timetable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 space-y-8 animate-in fade-in duration-500">
      {/* Header with Gradient */}
      <div className="flex items-center gap-4 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-xl p-6 rounded-2xl border border-purple-500/30 shadow-2xl">
        <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
          <Calendar className="h-7 w-7 text-white" />
        </div>
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Smart Timetable</h2>
          <p className="text-slate-300 text-sm">AI-optimized study schedule based on your subjects and free time.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Input Panel - Left Side */}
        <div className="md:col-span-1 space-y-4 bg-gradient-to-br from-slate-800/50 via-indigo-900/30 to-slate-800/50 backdrop-blur-xl p-6 rounded-2xl border border-indigo-500/30 shadow-2xl h-fit">
          {/* Subjects Input */}
          <div className="space-y-2">
            <label className="block text-sm font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">📚 Current Subjects</label>
            <textarea 
              value={subjects}
              onChange={(e) => setSubjects(e.target.value)}
              placeholder="e.g. Data Structures, React, Calculus, Digital Logic"
              className="w-full p-4 bg-slate-900/50 text-slate-100 border border-indigo-400/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none h-32 resize-none placeholder-slate-500 transition-all"
            />
          </div>

          {/* Hours Input */}
          <div className="space-y-2">
            <label className="block text-sm font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">⏰ Daily Study Hours</label>
            <div className="flex items-center gap-3 bg-slate-900/50 border border-cyan-400/30 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-cyan-500 transition-all">
              <Clock className="h-5 w-5 text-cyan-400" />
              <input 
                type="number" 
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="flex-1 bg-transparent text-slate-100 outline-none text-lg font-semibold placeholder-slate-500"
              />
            </div>
          </div>

          {/* Generate Button */}
          <button 
            onClick={handleGenerate}
            disabled={loading || !subjects}
            className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 duration-200"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "✨ Generate Schedule"}
          </button>

          {/* Color Legend */}
          <div className="mt-6 pt-4 border-t border-slate-700/50 space-y-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Study Time Distribution</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500"></div>
                <span className="text-xs text-slate-300">Primary Subject</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                <span className="text-xs text-slate-300">Secondary Subject</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                <span className="text-xs text-slate-300">Revision Time</span>
              </div>
            </div>
          </div>
        </div>

        {/* Output Panel - Right Side */}
        <div className="md:col-span-2 bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-purple-500/30 shadow-2xl min-h-[600px] overflow-auto relative">
          {/* Animated Background */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

          <div className="relative z-10 flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">Your Personalized Plan</h3>
            {schedule && (
              <button className="text-sm flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white px-4 py-2 rounded-lg font-semibold transition-all hover:shadow-lg">
                <Save className="h-4 w-4" /> Save Plan
              </button>
            )}
          </div>
          
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 py-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-lg opacity-50"></div>
                <Loader2 className="h-12 w-12 animate-spin text-purple-400 relative" />
              </div>
              <p className="text-sm mt-6 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent font-semibold">Generating your personalized schedule...</p>
            </div>
          ) : !schedule ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 py-12">
              <Calendar className="h-16 w-16 mb-4 text-slate-600" />
              <p className="text-base text-slate-300">Enter subjects to generate your weekly plan.</p>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none space-y-4">
              <ReactMarkdown
                components={{
                  h2: ({node, ...props}) => (
                    <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent mt-8 mb-4 pb-3 border-b border-purple-500/30" {...props} />
                  ),
                  h3: ({node, ...props}) => (
                    <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mt-6 mb-3 flex items-center gap-2" {...props} />
                  ),
                  ul: ({node, ...props}) => <ul className="space-y-3 my-4 list-none" {...props} />,
                  li: ({node, ...props}) => (
                    <li className="flex items-start gap-3 text-slate-200 text-sm leading-relaxed p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-purple-500/50 transition-all" {...props}>
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 shrink-0"></span>
                      <span className="flex-1">{props.children}</span>
                    </li>
                  ),
                  p: ({node, ...props}) => <p className="text-slate-300 mb-3 text-sm leading-relaxed" {...props} />,
                  strong: ({node, ...props}) => <strong className="text-slate-100 font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent" {...props} />
                }}
              >
                {schedule}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timetable;
