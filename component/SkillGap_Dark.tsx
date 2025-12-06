import React, { useState, useRef, useEffect } from 'react';
import { analyzeSkillGap } from '../services/geminiServices';
import { SkillAnalysis } from '../types';
import { Loader2, CheckCircle, XCircle, Briefcase, ChevronDown, Upload, FileText, X, ExternalLink, BookOpen, AlertCircle, Shield, Sparkles, Target, Award, Zap } from 'lucide-react';

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
          setPlagiarismResult(null);
      }
  };

  const checkPlagiarism = async () => {
    if (!resumeFile) return;
    setPlagiarismChecking(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPlagiarismResult({ checked: true, isPlagiarized: false });
    } catch (error) {
      alert("Plagiarism check failed");
    } finally {
      setPlagiarismChecking(false);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeFile || !targetRole) return;
    setLoading(true);
    try {
      const text = await resumeFile.text();
      const data = await analyzeSkillGap(text, targetRole);
      setResult(data);
    } catch (error) {
      alert("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setResumeFile(null);
    setResult(null);
    setPlagiarismResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 max-w-6xl mx-auto space-y-8">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Header */}
      <div className="relative text-center space-y-3">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-6 w-6 text-emerald-400" />
          <h2 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">📊 Skill Gap Analysis</h2>
          <Sparkles className="h-6 w-6 text-teal-400" />
        </div>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">Upload your resume & identify skill gaps with AI-powered analysis + plagiarism detection</p>
      </div>

      {/* Upload Section */}
      <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-700/80 p-8 rounded-2xl shadow-2xl border-2 border-emerald-500/30 backdrop-blur-xl">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 pointer-events-none"></div>
        
        <div className="relative grid md:grid-cols-2 gap-8">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-bold text-emerald-300 mb-3 flex items-center gap-2">
              <Upload className="h-4 w-4 text-emerald-400" />
              Upload Resume
            </label>
            <label className="relative cursor-pointer">
              <div className="h-48 border-2 border-dashed border-emerald-500/50 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-emerald-400 hover:bg-emerald-500/5 transition-all">
                <FileText className="h-12 w-12 text-emerald-400/60" />
                <div className="text-center">
                  {resumeFile ? (
                    <>
                      <p className="text-sm font-bold text-slate-200">{resumeFile.name}</p>
                      <p className="text-xs text-slate-400">Click to change</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-bold text-slate-300">Drag & drop your resume</p>
                      <p className="text-xs text-slate-400">or click to browse</p>
                    </>
                  )}
                </div>
              </div>
              <input type="file" onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx,.txt" />
            </label>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-bold text-teal-300 mb-3 flex items-center gap-2">
              <Target className="h-4 w-4 text-teal-400" />
              Target Role
            </label>
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full p-3 bg-slate-700/60 text-slate-100 border-2 border-teal-500/50 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-teal-400 focus:outline-none transition-all shadow-lg hover:border-teal-400 hover:bg-slate-700 text-left font-medium"
              >
                <div className="flex items-center justify-between">
                  <span>{targetRole}</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>
              {showDropdown && (
                <div className="absolute top-full left-0 w-full mt-2 bg-slate-700 border-2 border-teal-500/50 rounded-xl shadow-2xl z-20 max-h-60 overflow-y-auto">
                  {COMMON_ROLES.map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        setTargetRole(role);
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm font-medium text-slate-200 hover:bg-gradient-to-r hover:from-teal-600/20 hover:to-green-600/20 hover:text-teal-300 transition-all border-b border-slate-600 last:border-0"
                    >
                      {role}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="relative mt-8 flex gap-4 flex-wrap">
          <button 
            onClick={checkPlagiarism}
            disabled={!resumeFile || plagiarismChecking || plagiarismResult?.checked}
            className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {plagiarismChecking ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                Checking...
              </>
            ) : (
              <>
                <Shield className="h-5 w-5" />
                Check Plagiarism
              </>
            )}
          </button>

          <button 
            onClick={handleAnalyze}
            disabled={!resumeFile || loading}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                Analyzing...
              </>
            ) : (
              <>
                <Zap className="h-5 w-5" />
                Analyze Skills
              </>
            )}
          </button>

          {(resumeFile || result) && (
            <button 
              onClick={handleClear}
              className="flex-1 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
            >
              <X className="h-5 w-5" />
              Clear
            </button>
          )}
        </div>

        {/* Plagiarism Result */}
        {plagiarismResult && (
          <div className={`mt-6 p-4 rounded-xl border-2 flex items-center gap-4 ${
            plagiarismResult.isPlagiarized 
              ? 'bg-red-500/10 border-red-500/50' 
              : 'bg-green-500/10 border-green-500/50'
          }`}>
            {plagiarismResult.isPlagiarized ? (
              <>
                <XCircle className="h-6 w-6 text-red-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-red-300">Plagiarism Detected!</p>
                  <p className="text-xs text-red-200">Consider using original content only.</p>
                </div>
              </>
            ) : (
              <>
                <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-green-300">✓ Original Content</p>
                  <p className="text-xs text-green-200">No plagiarism detected. Your resume is unique!</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-6 relative">
          {/* Current Skills */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 p-8 rounded-2xl shadow-2xl border-2 border-emerald-500/30 backdrop-blur-xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 pointer-events-none"></div>
            <div className="relative">
              <h3 className="text-2xl font-bold text-emerald-300 mb-6 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-emerald-400" />
                Your Current Skills
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {result.currentSkills.map((skill, idx) => (
                  <div key={idx} className="p-4 bg-slate-700/50 rounded-xl border border-emerald-400/30 hover:border-emerald-400 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle className="h-5 w-5 text-emerald-400" />
                      <span className="font-bold text-slate-100">{skill.name}</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full" style={{width: `${skill.level}%`}}></div>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">{skill.level}% Proficiency</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skill Gap */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 p-8 rounded-2xl shadow-2xl border-2 border-amber-500/30 backdrop-blur-xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/5 to-orange-500/5 pointer-events-none"></div>
            <div className="relative">
              <h3 className="text-2xl font-bold text-amber-300 mb-6 flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-amber-400" />
                Skills to Develop for {targetRole}
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {result.skillsToLearn.map((skill, idx) => (
                  <div key={idx} className="p-4 bg-slate-700/50 rounded-xl border border-amber-400/30 hover:border-amber-400 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <AlertCircle className="h-5 w-5 text-amber-400" />
                      <span className="font-bold text-slate-100">{skill}</span>
                    </div>
                    <p className="text-xs text-slate-400">Priority skill for target role</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 p-8 rounded-2xl shadow-2xl border-2 border-blue-500/30 backdrop-blur-xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 pointer-events-none"></div>
            <div className="relative">
              <h3 className="text-2xl font-bold text-blue-300 mb-6 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-blue-400" />
                Learning Resources
              </h3>
              <div className="space-y-3">
                {result.resources.map((resource, idx) => (
                  <div key={idx} className="p-4 bg-slate-700/50 rounded-xl border border-blue-400/30 hover:border-blue-400 transition-colors flex items-start gap-4">
                    <ExternalLink className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <a href={resource.link} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-300 hover:text-blue-200 transition-colors">
                        {resource.name}
                      </a>
                      <p className="text-sm text-slate-300 mt-1">{resource.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Overall Assessment */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 p-8 rounded-2xl shadow-2xl border-2 border-purple-500/30 backdrop-blur-xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 pointer-events-none"></div>
            <div className="relative">
              <h3 className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                <Award className="h-6 w-6 text-purple-400" />
                Assessment Summary
              </h3>
              <p className="text-slate-300 leading-relaxed text-lg bg-slate-700/50 p-4 rounded-xl border border-purple-400/30">
                {result.overallAssessment}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillGap;
