
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
  const [plagiarismResult, setPlagiarismResult] = useState<{ checked: boolean; isPlagiarized: boolean } | null>(null);
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
          // Reset plagiarism check when new file is uploaded
          setPlagiarismResult(null);
      }
  };

  const checkPlagiarism = async () => {
    if (!resumeFile) return;
    setPlagiarismChecking(true);
    
    try {
      // Simulate plagiarism checking
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock plagiarism detection (in real scenario, this would call an API)
      // For now, we'll simulate that most resumes are not plagiarized
      const isPlagiarized = Math.random() < 0.1; // 10% chance of plagiarism
      setPlagiarismResult({ checked: true, isPlagiarized });
      
      if (isPlagiarized) {
        alert('⚠️ Plagiarism detected in your resume. Please review and provide original content.');
      }
    } catch (e) {
      console.error("Plagiarism check error:", e);
      alert("Plagiarism check failed. Please try again.");
    } finally {
      setPlagiarismChecking(false);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeFile) return;
    
    // Check plagiarism first if not already checked
    if (!plagiarismResult?.checked) {
      alert("Please check for plagiarism first");
      return;
    }
    
    // Prevent analysis if plagiarism is detected
    if (plagiarismResult.isPlagiarized) {
      alert("Cannot analyze resume with plagiarism detected. Please provide an original resume.");
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 space-y-8 animate-in fade-in duration-500">
      {/* Header with Gradient */}
      <div className="flex items-center gap-4 bg-gradient-to-r from-purple-600/20 via-indigo-600/20 to-violet-600/20 backdrop-blur-xl p-6 rounded-2xl border border-purple-500/30 shadow-2xl">
        <div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg">
          <Briefcase className="h-7 w-7 text-white" />
        </div>
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">🎯 Skill-Gap Predictor</h2>
          <p className="text-slate-300 text-sm">Compare your skills with top MNC hiring trends. Resume must pass plagiarism check.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        <div className="space-y-6 bg-gradient-to-br from-slate-800/50 via-purple-900/30 to-slate-800/50 backdrop-blur-xl p-8 rounded-2xl border border-purple-500/30 shadow-2xl h-fit">
          <div>
            <label className="block text-sm font-bold bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent mb-2">Target Role</label>
            <div className="relative" ref={dropdownRef}>
              <Briefcase className="absolute left-3 top-3 h-5 w-5 text-purple-400 z-10" />
              <input 
                type="text" 
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                className="pl-10 w-full p-3 bg-slate-900/50 text-slate-100 border border-purple-400/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all pr-10 placeholder-slate-500"
                placeholder="e.g. Data Scientist"
              />
              <button onClick={() => setShowDropdown(!showDropdown)} className="absolute right-2 top-3 text-purple-400">
                  <ChevronDown className="h-5 w-5" />
              </button>
              {showDropdown && (
                  <div className="absolute top-full left-0 w-full mt-1 bg-slate-900 border border-purple-500/50 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto backdrop-blur-xl">
                      {COMMON_ROLES.map((role) => (
                          <button key={role} onClick={() => { setTargetRole(role); setShowDropdown(false); }}
                              className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-purple-600/30 hover:text-purple-200 transition-colors border-b border-slate-800/50 last:border-b-0">
                              {role}
                          </button>
                      ))}
                  </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent mb-2">Upload Resume (PDF)</label>
            <div className={`border border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all relative ${resumeFile ? 'border-indigo-400/50 bg-indigo-500/10' : 'border-slate-600/50 hover:border-purple-500/50 hover:bg-purple-500/5'}`}>
                <input 
                    type="file" 
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {resumeFile ? (
                    <div className="flex flex-col items-center z-10">
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-full mb-3 shadow-lg">
                            <FileText className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-sm font-bold text-slate-200">{resumeFile.name}</p>
                        <button onClick={(e) => { e.stopPropagation(); e.preventDefault(); setResumeFile(null); }}
                            className="mt-2 text-xs text-red-400 hover:text-red-300 hover:underline flex items-center gap-1 transition-colors">
                            <X className="h-3 w-3" /> Remove
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="bg-gradient-to-br from-slate-700 to-slate-600 p-3 rounded-full mb-3 shadow-lg">
                            <Upload className="h-8 w-8 text-slate-300" />
                        </div>
                        <p className="text-sm font-bold text-slate-200">Click to Upload Resume</p>
                        <p className="text-xs text-slate-400 mt-1">PDF format only</p>
                    </>
                )}
            </div>
          </div>

          {/* Plagiarism Check Section */}
          <div className="bg-gradient-to-br from-slate-800/50 to-orange-900/20 p-4 rounded-lg border border-orange-500/30 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-bold text-slate-200 flex items-center gap-2">
                <Shield className="h-5 w-5 text-orange-400" />
                Plagiarism Check
              </label>
              {plagiarismResult?.checked && (
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  plagiarismResult.isPlagiarized 
                    ? 'bg-red-500/20 text-red-300 border border-red-500/50' 
                    : 'bg-green-500/20 text-green-300 border border-green-500/50'
                }`}>
                  {plagiarismResult.isPlagiarized ? '❌ Plagiarism Detected' : '✅ No Plagiarism'}
                </span>
              )}
            </div>
            
            <button 
              onClick={checkPlagiarism}
              disabled={plagiarismChecking || !resumeFile}
              className={`w-full py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                plagiarismChecking 
                  ? 'bg-orange-600/50 text-orange-200 opacity-75' 
                  : plagiarismResult?.checked
                  ? 'bg-slate-700/50 text-slate-300 cursor-default'
                  : 'bg-gradient-to-r from-orange-600 to-orange-700 text-white hover:from-orange-500 hover:to-orange-600 shadow-lg hover:shadow-2xl'
              }`}
            >
              {plagiarismChecking ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4" />
                  Checking...
                </>
              ) : plagiarismResult?.checked ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Check Complete
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4" />
                  Check Plagiarism
                </>
              )}
            </button>
          </div>

          <button 
            onClick={handleAnalyze}
            disabled={loading || !resumeFile || !plagiarismResult?.checked || plagiarismResult?.isPlagiarized}
            className={`w-full py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all font-bold ${
              !plagiarismResult?.checked || plagiarismResult?.isPlagiarized
                ? 'bg-slate-700/50 text-slate-400 cursor-not-allowed'
                : loading
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white opacity-75'
                : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 text-white hover:from-purple-500 hover:via-indigo-500 hover:to-violet-500 shadow-lg hover:shadow-2xl transform hover:scale-105'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                Analyzing...
              </>
            ) : (
              <>
                <CheckCircle className="h-5 w-5" />
                Analyze Gap
              </>
            )}
          </button>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-indigo-500/30 shadow-2xl min-h-[600px] overflow-auto relative">
          {/* Animated Background */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

          <div className="relative z-10 flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-300 via-indigo-300 to-violet-300 bg-clip-text text-transparent">Your Personalized Plan</h3>
            {result && (
              <button className="text-sm flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white px-4 py-2 rounded-lg font-semibold transition-all hover:shadow-lg">
                <Save className="h-4 w-4" /> Save Plan
              </button>
            )}
          </div>
          
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 py-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur-lg opacity-50"></div>
                <Loader2 className="h-12 w-12 animate-spin text-purple-400 relative" />
              </div>
              <p className="text-sm mt-6 bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent font-semibold">AI is analyzing your resume...</p>
              <p className="text-xs text-slate-400 mt-1">Identifying missing skills & finding courses</p>
            </div>
          ) : !result ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 py-12">
              <div className="p-4 bg-gradient-to-br from-slate-700 to-slate-600 rounded-full mb-4">
                <Briefcase className="h-10 w-10 text-slate-300" />
              </div>
              <p className="text-base text-slate-300">Results will appear here after analysis</p>
              <p className="text-xs text-slate-400 mt-1">Complete plagiarism check first</p>
            </div>
          ) : (
            <div className="space-y-6 animate-in slide-in-from-bottom-4">
              <div className="flex items-center justify-between pb-6 border-b border-purple-500/30">
                <div>
                    <h3 className="text-sm text-slate-400 uppercase font-bold tracking-wider mb-2">Match Score</h3>
                    <div className={`text-5xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${result.matchScore > 75 ? 'from-green-400 to-emerald-400' : result.matchScore > 50 ? 'from-yellow-400 to-orange-400' : 'from-red-400 to-pink-400'}`}>
                        {result.matchScore}%
                    </div>
                </div>
                <div className="text-right max-w-[200px] bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                    <p className="text-sm text-slate-200 font-medium italic">"{result.roleFit}"</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-100 flex items-center gap-2 mb-4 text-lg">
                  <XCircle className="h-5 w-5 text-red-400" /> Missing Skills & Courses
                </h4>
                <div className="grid gap-3">
                  {result.missingSkills.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/30 rounded-lg hover:border-red-500/50 transition-all shadow-lg hover:shadow-2xl">
                        <span className="text-sm font-bold text-red-300">{item.skill}</span>
                        <a 
                            href={item.courseLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs flex items-center gap-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-2 rounded-lg border border-indigo-400/30 transition-all font-bold shadow-lg"
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
                <h4 className="font-bold text-slate-100 flex items-center gap-2 mb-4 text-lg">
                  <CheckCircle className="h-5 w-5 text-green-400" /> Recommendations
                </h4>
                <ul className="space-y-3">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-200 text-sm leading-relaxed p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-green-500/50 transition-all hover:shadow-lg">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 shrink-0"></span>
                      <span className="flex-1">{rec}</span>
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
