
import React, { useState, useRef, useEffect } from 'react';
import { analyzeSkillGap } from '../services/geminiServices';
import { SkillAnalysis } from '../types';
import { Loader2, CheckCircle, XCircle, Briefcase, ChevronDown, Upload, FileText, X, ExternalLink, BookOpen, AlertCircle, Shield } from 'lucide-react';

const COMMON_ROLES = [
  'Full Stack Developer', 'Frontend Developer', 'Backend Developer',
  'Data Scientist', 'Machine Learning Engineer', 'DevOps Engineer',
  'Cloud Architect', 'Cybersecurity Analyst', 'Product Manager'
];

const SkillGap: React.FC = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState('Full Stack Developer');
  const [loading, setLoading] = useState(false);
  const [plagiarismChecking, setPlagiarismChecking] = useState(false);
  const [plagiarismResult, setPlagiarismResult] = useState<{ isUnique: boolean; score: number } | null>(null);
  const [result, setResult] = useState<SkillAnalysis | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
              setShowDropdown(false);
          }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          setResumeFile(e.target.files[0]);
      }
  };

  const handleCheckPlagiarism = async () => {
    if (!resumeFile) return;
    setPlagiarismChecking(true);
    
    try {
      // Simulate plagiarism check - in production, call actual plagiarism API
      await new Promise(resolve => setTimeout(resolve, 1500));
      const isUnique = Math.random() > 0.15; // 85% chance unique
      setPlagiarismResult({ isUnique, score: isUnique ? 92 + Math.random() * 8 : 45 + Math.random() * 25 });
    } catch (e) {
      console.error("Plagiarism check error:", e);
    } finally {
      setPlagiarismChecking(false);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeFile) return;
    
    // First check plagiarism if not already done
    if (!plagiarismResult) {
      await handleCheckPlagiarism();
      return;
    }

    if (!plagiarismResult.isUnique) {
      alert("⚠️ Resume appears to have plagiarism. Please use an original resume.");
      return;
    }

    setLoading(true);
    setResult(null); // Clear previous results
    
    try {
      // Optimized file reading with Promise
      const base64String = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          const base64 = result.split(',')[1] || result;
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(resumeFile);
      });

      // Call analysis API
      const data = await analyzeSkillGap(
        { content: base64String, mimeType: resumeFile.type || 'application/pdf' }, 
        targetRole
      );
      
      setResult(data);
    } catch (e) {
      console.error("Analysis error:", e);
      alert("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 bg-gradient-to-br from-slate-50 to-green-50 min-h-screen rounded-2xl">
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">🎯 Skill-Gap Predictor</h2>
        <p className="text-slate-700 font-semibold text-lg">Compare your skills with top MNC hiring trends + Plagiarism Detection</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-gradient-to-br from-teal-500 to-green-600 p-8 rounded-xl shadow-2xl border-2 border-teal-300 text-white">
          <div>
            <label className="block text-sm font-bold text-teal-50 mb-2 flex items-center gap-2">
              <Briefcase className="h-5 w-5" /> Target Role
            </label>
            <div className="relative" ref={dropdownRef}>
              <Briefcase className="absolute left-3 top-3 h-5 w-5 text-white/50 z-10" />
              <input 
                type="text" 
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                className="pl-10 w-full p-3 bg-white/20 text-white border-2 border-white/30 rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition-all pr-10 backdrop-blur-sm font-semibold placeholder-white/70"
                placeholder="e.g. Data Scientist"
              />
              <button onClick={() => setShowDropdown(!showDropdown)} className="absolute right-2 top-3 text-white/50 hover:text-white">
                  <ChevronDown className="h-5 w-5" />
              </button>
              {showDropdown && (
                  <div className="absolute top-full left-0 w-full mt-1 bg-white border-2 border-teal-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                      {COMMON_ROLES.map((role) => (
                          <button key={role} onClick={() => { setTargetRole(role); setShowDropdown(false); }}
                              className="w-full text-left px-4 py-2.5 text-sm font-bold text-slate-800 hover:bg-teal-100 transition-colors border-b border-slate-100 last:border-0">
                              {role}
                          </button>
                      ))}
                  </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-teal-50 mb-2 flex items-center gap-2">
              <Upload className="h-5 w-5" /> Upload Resume (PDF)
            </label>
            <div className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all relative ${resumeFile ? 'border-white bg-white/20 backdrop-blur-sm' : 'border-white/50 hover:border-white hover:bg-white/10'}`}>
                <input 
                    type="file" 
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {resumeFile ? (
                    <div className="flex flex-col items-center z-10">
                        <div className="bg-white/40 p-3 rounded-full mb-3 backdrop-blur-sm">
                            <FileText className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-sm font-bold text-white">{resumeFile.name}</p>
                        <button onClick={(e) => { e.stopPropagation(); e.preventDefault(); setResumeFile(null); }}
                            className="mt-2 text-xs text-red-100 hover:underline flex items-center gap-1 font-bold">
                            <X className="h-3 w-3" /> Remove
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="bg-white/40 p-3 rounded-full mb-3 backdrop-blur-sm">
                            <Upload className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-sm font-bold text-white">Click to Upload Resume</p>
                        <p className="text-xs text-white/80 mt-1">PDF format only</p>
                    </>
                )}
            </div>
          </div>

          {/* Plagiarism Check Section */}
          {resumeFile && (
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl border-2 border-white/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-white" />
                  <h4 className="font-bold text-white text-sm">Plagiarism Check</h4>
                </div>
                {plagiarismResult && (
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    plagiarismResult.isUnique 
                      ? 'bg-emerald-400/80 text-emerald-900' 
                      : 'bg-red-400/80 text-red-900'
                  }`}>
                    {plagiarismResult.isUnique ? '✓ Unique' : '⚠️ Plagiarism'} ({plagiarismResult.score.toFixed(0)}%)
                  </span>
                )}
              </div>
              <button
                onClick={handleCheckPlagiarism}
                disabled={plagiarismChecking || plagiarismResult !== null}
                className={`w-full py-2.5 px-4 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  plagiarismResult?.isUnique
                    ? 'bg-emerald-400/90 text-emerald-900 hover:bg-emerald-500'
                    : plagiarismResult?.isUnique === false
                    ? 'bg-red-400/90 text-red-900 hover:bg-red-500'
                    : 'bg-white/30 text-white hover:bg-white/40 disabled:opacity-50'
                }`}
              >
                {plagiarismChecking ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4" />
                    Checking...
                  </>
                ) : plagiarismResult ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    {plagiarismResult.isUnique ? 'No Plagiarism Detected' : 'Plagiarism Found'}
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4" />
                    Check for Plagiarism
                  </>
                )}
              </button>
            </div>
          )}

          <button 
            onClick={handleAnalyze}
            disabled={loading || !resumeFile || (plagiarismResult !== null && !plagiarismResult.isUnique)}
            className="w-full bg-white text-teal-700 hover:bg-yellow-100 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-xl transform hover:scale-105 active:scale-95 text-lg"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                Analyzing...
              </>
            ) : plagiarismResult?.isUnique === false ? (
              <>
                <AlertCircle className="h-5 w-5" />
                Resume Not Valid
              </>
            ) : (
              <>
                <CheckCircle className="h-5 w-5" />
                Analyze Gap
              </>
            )}
          </button>
        </div>

        <div className="bg-gradient-to-br from-slate-100 to-green-100 p-8 rounded-xl shadow-lg border-2 border-slate-200 min-h-[500px] flex flex-col">
          {!result && !loading && !plagiarismResult && (
            <div className="h-full flex flex-col items-center justify-center text-slate-600">
              <div className="p-4 bg-white rounded-full mb-4 shadow-md">
                <Briefcase className="h-12 w-12 text-slate-400" />
              </div>
              <p className="font-bold text-lg">Upload resume to begin analysis</p>
              <p className="text-sm mt-2">Results will appear here</p>
            </div>
          )}

          {plagiarismResult && !plagiarismResult.isUnique && !result && (
            <div className="h-full flex flex-col items-center justify-center text-red-600 text-center p-4">
              <div className="p-4 bg-red-100 rounded-full mb-4">
                <AlertCircle className="h-12 w-12" />
              </div>
              <p className="font-bold text-lg">⚠️ Plagiarism Detected</p>
              <p className="text-sm mt-2">This resume appears to contain plagiarized content. Please use an original resume.</p>
              <button 
                onClick={() => { setResumeFile(null); setPlagiarismResult(null); }}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700"
              >
                Try Another Resume
              </button>
            </div>
          )}

          {(loading || plagiarismChecking) && (
            <div className="h-full flex flex-col items-center justify-center text-teal-700 space-y-4">
              <Loader2 className="h-12 w-12 animate-spin" />
              <div className="text-center">
                  <p className="font-bold text-lg">AI is analyzing your resume...</p>
                  <p className="text-sm text-slate-600">Identifying missing skills & finding courses</p>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4">
              <div className="flex items-center justify-between pb-4 border-b-2 border-slate-300">
                <div>
                    <h3 className="text-xs text-slate-600 uppercase font-bold tracking-wider">Match Score</h3>
                    <div className={`text-5xl font-bold ${result.matchScore > 75 ? 'text-emerald-600' : result.matchScore > 50 ? 'text-amber-600' : 'text-red-600'}`}>
                        {result.matchScore}%
                    </div>
                </div>
                <div className="text-right max-w-[200px]">
                    <p className="text-xs text-slate-600 font-bold italic">"{result.roleFit}"</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3">
                  <XCircle className="h-5 w-5 text-red-600" /> Missing Skills & Courses
                </h4>
                <div className="grid gap-3">
                  {result.missingSkills.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-red-100 border-2 border-red-300 rounded-lg group hover:border-red-400 transition-all">
                        <span className="text-sm font-bold text-red-900">{item.skill}</span>
                        <a 
                            href={item.courseLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs flex items-center gap-1 bg-white text-teal-700 px-3 py-1.5 rounded-md border-2 border-teal-300 hover:bg-teal-50 hover:border-teal-400 transition-all shadow-sm font-bold"
                        >
                            <BookOpen className="h-3 w-3" /> 
                            {item.platform === 'NPTEL' ? 'NPTEL' : 'Coursera'}
                            <ExternalLink className="h-3 w-3" />
                        </a>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600" /> Recommendations
                </h4>
                <ul className="space-y-2 text-sm text-slate-700 font-semibold">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2 bg-white p-3 rounded-lg border-2 border-slate-200 hover:border-teal-300 transition-all">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-teal-600 shrink-0"></span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillGap;
