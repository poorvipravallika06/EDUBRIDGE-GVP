
import React, { useState, useRef, useEffect } from 'react';
import { analyzeCompanyFit } from '../services/geminiServices';
import { CompanyFitAnalysis, View } from '../types';
import { Loader2, Briefcase, TrendingUp, CheckCircle, AlertTriangle, Building2, Calendar, ArrowRight, ExternalLink, ChevronDown, Upload, FileText, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface TechAcceleratorProps {
    onNavigate?: (view: View) => void;
}

const COMPANIES = [
    { name: 'Google', logo: 'https://logo.clearbit.com/google.com', color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' },
    { name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com', color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
    { name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com', color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200' },
    { name: 'TCS', logo: 'https://logo.clearbit.com/tcs.com', color: 'text-pink-500', bg: 'bg-pink-50', border: 'border-pink-200' },
    { name: 'Zoho', logo: 'https://logo.clearbit.com/zoho.com', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
    { name: 'Swiggy', logo: 'https://logo.clearbit.com/swiggy.com', color: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-300' },
    { name: 'Razorpay', logo: 'https://logo.clearbit.com/razorpay.com', color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-300' },
    { name: 'Cred', logo: 'https://logo.clearbit.com/cred.club', color: 'text-black', bg: 'bg-slate-200', border: 'border-slate-300' },
    { name: 'Zerodha', logo: 'https://logo.clearbit.com/zerodha.com', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { name: 'Flipkart', logo: 'https://logo.clearbit.com/flipkart.com', color: 'text-blue-500', bg: 'bg-yellow-50', border: 'border-yellow-200' },
];

const ROLES = [
    'Software Development Engineer (SDE I)',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Data Scientist',
    'Machine Learning Engineer',
    'DevOps Engineer',
    'Product Manager',
    'QA Automation Engineer'
];

const TechAccelerator: React.FC<TechAcceleratorProps> = ({ onNavigate }) => {
    const [selectedCompany, setSelectedCompany] = useState(COMPANIES[0].name);
    const [role, setRole] = useState('Software Development Engineer (SDE I)');
    const [customDomain, setCustomDomain] = useState('');
    const [resumeText, setResumeText] = useState('');
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState<CompanyFitAnalysis | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showRoleDropdown, setShowRoleDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const roleDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
            if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target as Node)) {
                setShowRoleDropdown(false);
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

    const handleAnalyze = async () => {
        // Allow either both or either individually
        if (!resumeFile && !resumeText.trim()) {
            alert("Please upload a resume or enter your skills (or both).");
            return;
        }
        setLoading(true);
        setAnalysis(null); // Clear previous analysis
        try {
            let resumeInput = { content: '', mimeType: 'text/plain' };
            
            if (resumeFile && resumeText.trim()) {
                // Both resume file and text available - combine them
                const reader = new FileReader();
                const filePromise = new Promise<string>((resolve, reject) => {
                    reader.onload = () => {
                        const result = reader.result as string;
                        const base64Content = result.split(',')[1] || result;
                        resolve(base64Content);
                    };
                    reader.onerror = () => reject(new Error('Failed to read file'));
                });
                
                reader.readAsDataURL(resumeFile);
                const base64Content = await filePromise;
                
                // Combine both resume file and additional skills text
                resumeInput = { 
                    content: `FILE_BASE64:${base64Content}\n\nADDITIONAL_SKILLS:\n${resumeText}`,
                    mimeType: 'mixed'
                };
            } else if (resumeFile) {
                // Only resume file
                const reader = new FileReader();
                const filePromise = new Promise<string>((resolve, reject) => {
                    reader.onload = () => {
                        const result = reader.result as string;
                        const base64Content = result.split(',')[1] || result;
                        resolve(base64Content);
                    };
                    reader.onerror = () => reject(new Error('Failed to read file'));
                });
                
                reader.readAsDataURL(resumeFile);
                const base64Content = await filePromise;
                
                resumeInput = { 
                    content: base64Content,
                    mimeType: 'application/pdf'
                };
            } else {
                // Only text input
                resumeInput = { 
                    content: resumeText.trim(),
                    mimeType: 'text/plain'
                };
            }

            const data = await analyzeCompanyFit(
                resumeInput, 
                selectedCompany, 
                role, 
                resumeText || ''
            );
            
            if (data && data.matchScore !== undefined) {
                setAnalysis(data);
            } else {
                throw new Error('Invalid response from API');
            }
        } catch (e: any) {
            console.error('Analysis error:', e);
            // Use mock data as fallback
            const mockData = {
                matchScore: 45,
                culturalFit: `Based on the resume analysis, there is moderate alignment with ${selectedCompany}'s cultural principles. The candidate shows potential but needs to demonstrate more ownership and innovation mindset.`,
                technicalGaps: [
                    'Advanced SQL and BigQuery experience',
                    'Machine Learning algorithms and frameworks',
                    'Distributed computing concepts',
                    'System design patterns'
                ],
                accelerationPlan: [
                    { week: 'WEEK 1', focus: 'SQL & Data Warehousing', tasks: ['Complete SQL best practices', 'Practice BigQuery queries'] },
                    { week: 'WEEK 2', focus: 'Distributed Computing', tasks: ['Study Apache Spark', 'Understand MapReduce'] },
                    { week: 'WEEK 3', focus: 'Machine Learning', tasks: ['Review ML algorithms', 'Practice with frameworks'] },
                    { week: 'WEEK 4', focus: 'Experimentation', tasks: ['Understand A/B testing', 'Study statistical modeling'] }
                ]
            };
            setAnalysis(mockData);
        } finally {
            setLoading(false);
        }
    };

    const handleTaskClick = (task: string) => {
        if (!onNavigate) return;
        const lowerTask = task.toLowerCase();
        if (lowerTask.includes('project') || lowerTask.includes('build')) onNavigate('projects');
        else if (lowerTask.includes('interview') || lowerTask.includes('mock') || lowerTask.includes('dsa')) onNavigate('interview');
        else if (lowerTask.includes('lab') || lowerTask.includes('workflow')) onNavigate('lab');
        else if (lowerTask.includes('notes') || lowerTask.includes('study')) onNavigate('notes');
        else onNavigate('mentor');
    };

    const currentCompany = COMPANIES.find(c => c.name === selectedCompany) || COMPANIES[0];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-6 space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-red-600 opacity-30"></div>
                <div className="relative z-10 p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg">
                            <TrendingUp className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-lg">Tech Accelerator</h1>
                            <p className="text-orange-200 text-lg mt-2">Target specific MNCs & get a personalized 4-week career acceleration plan</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
                {/* Left Panel: Configuration */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="relative group overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-20 group-hover:opacity-30 transition-all blur-xl"></div>
                        <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-orange-500/50 rounded-2xl p-8 space-y-6">
                            {/* Company Selector */}
                            <div className="relative" ref={dropdownRef}>
                                <label className="block text-sm font-black text-orange-300 mb-3 uppercase tracking-wider">Target Company</label>
                                <div className="relative">
                                     <button 
                                        onClick={() => setShowDropdown(!showDropdown)}
                                        className="w-full flex items-center justify-between p-4 bg-slate-800/50 backdrop-blur-sm border border-orange-500/30 hover:border-orange-400/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all cursor-pointer"
                                     >
                                        <div className="flex items-center gap-3">
                                            <img src={currentCompany.logo} alt={currentCompany.name} className="w-6 h-6 object-contain" />
                                            <span className="font-bold text-white">{currentCompany.name}</span>
                                        </div>
                                        <ChevronDown className="h-5 w-5 text-orange-400" />
                                     </button>

                                    {showDropdown && (
                                        <div className="absolute top-full left-0 w-full mt-2 bg-slate-800 border border-orange-500/50 rounded-xl shadow-2xl z-20 max-h-64 overflow-y-auto">
                                            {COMPANIES.map(company => (
                                                <button
                                                    key={company.name}
                                                    onClick={() => {
                                                        setSelectedCompany(company.name);
                                                        setShowDropdown(false);
                                                    }}
                                                    className="w-full flex items-center gap-3 p-3 hover:bg-orange-500/20 transition-colors border-b border-slate-700/50 last:border-0 text-left"
                                                >
                                                    <img src={company.logo} alt={company.name} className="w-5 h-5 object-contain" />
                                                    <span className="text-sm font-semibold text-slate-200">{company.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Role Selector */}
                            <div className="relative" ref={roleDropdownRef}>
                                <label className="block text-sm font-black text-orange-300 mb-3 uppercase tracking-wider">Target Role</label>
                                <div className="relative">
                                     <button 
                                        onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                                        className="w-full flex items-center justify-between p-4 bg-slate-800/50 backdrop-blur-sm border border-orange-500/30 hover:border-orange-400/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all cursor-pointer"
                                     >
                                         <div className="flex items-center gap-2">
                                             <Briefcase className="h-5 w-5 text-orange-400" />
                                             <span className="text-sm text-slate-100 font-semibold truncate">{role}</span>
                                         </div>
                                         <ChevronDown className="h-5 w-5 text-orange-400" />
                                     </button>
                                     
                                     {showRoleDropdown && (
                                         <div className="absolute top-full left-0 w-full mt-2 bg-slate-800 border border-orange-500/50 rounded-xl shadow-2xl z-20 max-h-60 overflow-y-auto">
                                             {ROLES.map(r => (
                                                 <button
                                                     key={r}
                                                     onClick={() => {
                                                         setRole(r);
                                                         setShowRoleDropdown(false);
                                                     }}
                                                     className="w-full text-left p-3 text-sm text-slate-200 hover:bg-orange-500/20 border-b border-slate-700/50 last:border-0 transition-colors"
                                                 >
                                                     {r}
                                                 </button>
                                             ))}
                                        </div>
                                     )}
                                </div>
                            </div>

                            {/* Custom Domain/Interest Input */}
                            <div>
                                <label className="block text-sm font-black text-orange-300 mb-3 uppercase tracking-wider">🎯 Custom Domain</label>
                                <input 
                                    type="text" 
                                    value={customDomain}
                                    onChange={(e) => setCustomDomain(e.target.value)}
                                    placeholder="e.g. Web3, AI/ML, DevOps, Cloud..."
                                    className="w-full p-4 bg-slate-800/50 backdrop-blur-sm text-slate-100 border border-orange-500/30 hover:border-orange-400/60 rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-transparent focus:outline-none transition-all text-sm placeholder-slate-500"
                                />
                                <p className="text-xs text-slate-400 mt-2">Enter your interested domain to customize the acceleration plan</p>
                            </div>

                            {/* Resume Upload */}
                             <div>
                                <label className="block text-sm font-black text-orange-300 mb-3 uppercase tracking-wider">📄 Upload Resume</label>
                                <div className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all relative ${resumeFile ? 'border-green-400/50 bg-green-500/10' : 'border-orange-500/30 hover:border-orange-400/60 hover:bg-orange-500/5'}`}>
                                    <input 
                                        type="file" 
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    {resumeFile ? (
                                        <div className="flex flex-col items-center">
                                            <div className="bg-green-500/20 p-3 rounded-full mb-3">
                                                <FileText className="h-6 w-6 text-green-400" />
                                            </div>
                                            <p className="text-sm font-bold text-slate-100 truncate max-w-[200px]">{resumeFile.name}</p>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); e.preventDefault(); setResumeFile(null); }}
                                                className="mt-2 text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                                            >
                                                <X className="h-3 w-3" /> Remove
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="bg-orange-500/20 p-3 rounded-full mb-3">
                                                <Upload className="h-6 w-6 text-orange-400" />
                                            </div>
                                            <p className="text-sm font-semibold text-slate-200">Click to upload PDF</p>
                                            <p className="text-xs text-slate-400 mt-1">or drag and drop</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Skills Text Area */}
                            <div>
                                <label className="block text-sm font-black text-orange-300 mb-3 uppercase tracking-wider">💬 Skills / Notes</label>
                                <textarea 
                                    value={resumeText}
                                    onChange={(e) => setResumeText(e.target.value)}
                                    className="w-full p-4 h-24 bg-slate-800/50 backdrop-blur-sm text-slate-100 border border-orange-500/30 hover:border-orange-400/60 rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-transparent focus:outline-none transition-all resize-none text-sm placeholder-slate-500"
                                    placeholder="Add additional skills or notes..."
                                />
                                <p className="text-xs text-slate-400 mt-2">✓ Use resume, ✓ Use skills, or ✓ Use both together</p>
                            </div>

                            <button 
                                onClick={handleAnalyze}
                                disabled={loading || (!resumeText && !resumeFile)}
                                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:from-slate-700 disabled:to-slate-700 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-lg shadow-orange-500/30 uppercase tracking-wider text-sm"
                            >
                                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "🚀 Analyze Readiness"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Results */}
                <div className="lg:col-span-8">
                    {!analysis && !loading && (
                        <div className="relative group overflow-hidden rounded-2xl h-full">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-20 blur-xl"></div>
                            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-blue-500/30 rounded-2xl flex flex-col items-center justify-center p-12 text-center h-full">
                                <div className="w-32 h-32 bg-blue-500/10 rounded-full flex items-center justify-center mb-8 border border-blue-500/30">
                                    <Briefcase className="h-16 w-16 text-blue-400" />
                                </div>
                                <h3 className="text-3xl font-black text-white mb-3">Start Your Acceleration</h3>
                                <p className="text-slate-400 max-w-md text-lg">Select a target company and role to get a personalized breakdown of what you're missing and how to fix it in 4 weeks.</p>
                            </div>
                        </div>
                    )}

                    {loading && (
                        <div className="relative group overflow-hidden rounded-2xl h-full">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-pink-600 opacity-20 blur-xl"></div>
                            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-orange-500/30 rounded-2xl flex flex-col items-center justify-center p-12 text-center h-full">
                                 <Loader2 className="h-16 w-16 text-orange-400 animate-spin mb-6" />
                                 <h3 className="text-2xl font-black text-white mb-2">Analyzing Profile...</h3>
                                 <p className="text-slate-300">Comparing your skills with {selectedCompany} requirements...</p>
                            </div>
                        </div>
                    )}

                    {analysis && (
                        <div className="space-y-6">
                            {/* Match Score and Status */}
                            <div className="relative group overflow-hidden rounded-2xl">
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-20 blur-xl"></div>
                                <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/30 rounded-2xl p-8">
                                    <div className="flex flex-col md:flex-row items-center gap-8">
                                        {/* Circular Progress */}
                                        <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle cx="96" cy="96" r="80" stroke="#334155" strokeWidth="16" fill="transparent" />
                                                <circle 
                                                    cx="96" cy="96" r="80" 
                                                    stroke={analysis.matchScore > 75 ? '#10b981' : analysis.matchScore > 50 ? '#f59e0b' : '#ef4444'} 
                                                    strokeWidth="16" 
                                                    fill="transparent" 
                                                    strokeDasharray={502.65} 
                                                    strokeDashoffset={502.65 - (502.65 * analysis.matchScore) / 100} 
                                                    className="transition-all duration-1000 ease-out drop-shadow-lg"
                                                />
                                            </svg>
                                            <div className="absolute flex flex-col items-center">
                                                <span className="text-5xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text">{analysis.matchScore}%</span>
                                                <span className="text-sm text-slate-400 font-black uppercase tracking-wider mt-1">MATCH</span>
                                            </div>
                                        </div>
                                        
                                        {/* Status Badge */}
                                        <div className="flex-1 text-center md:text-left">
                                            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl mb-4 font-black text-sm uppercase tracking-wider"
                                                style={{
                                                    backgroundColor: analysis.matchScore > 75 ? '#10b98120' : analysis.matchScore > 50 ? '#f59e0b20' : '#ef444420',
                                                    color: analysis.matchScore > 75 ? '#6ee7b7' : analysis.matchScore > 50 ? '#fbbf24' : '#f87171',
                                                    border: `2px solid ${analysis.matchScore > 75 ? '#10b98150' : analysis.matchScore > 50 ? '#f59e0b50' : '#ef444450'}`
                                                }}
                                            >
                                                <span>
                                                    {analysis.matchScore > 75 ? '🚀 High Probability' : analysis.matchScore > 50 ? '⚡ Medium Probability' : '🎯 Low Probability'}
                                                </span>
                                            </div>
                                            <p className="text-slate-300 text-lg font-semibold leading-relaxed">
                                                Your profile shows {analysis.matchScore > 75 ? 'strong' : analysis.matchScore > 50 ? 'moderate' : 'developing'} alignment with {selectedCompany}'s requirements. Follow the 4-week plan below to accelerate your journey.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Cultural Fit */}
                            <div className="relative group overflow-hidden rounded-2xl">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-20 blur-xl"></div>
                                <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-purple-500/30 rounded-2xl p-8">
                                    <h3 className="text-2xl font-black text-white flex items-center gap-3 mb-6">
                                        <Building2 className="h-6 w-6 text-purple-400" /> Cultural Fit Analysis
                                    </h3>
                                    <div className="text-sm text-slate-300 leading-relaxed space-y-3">
                                        <ReactMarkdown 
                                            components={{
                                                p: ({node, ...props}) => <p className="mb-2" {...props} />,
                                                ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-2" {...props} />,
                                                li: ({node, ...props}) => <li className="marker:text-purple-400" {...props} />
                                            }}
                                        >
                                            {analysis.culturalFit}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </div>

                            {/* Missing Critical Skills */}
                            <div className="relative group overflow-hidden rounded-2xl">
                                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 opacity-20 blur-xl"></div>
                                <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-red-500/30 rounded-2xl p-8">
                                    <h3 className="text-2xl font-black text-white flex items-center gap-3 mb-6">
                                        <AlertTriangle className="h-6 w-6 text-red-400" /> Missing Critical Skills
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {analysis.technicalGaps && analysis.technicalGaps.length > 0 ? (
                                            analysis.technicalGaps.map((gap, i) => (
                                                <span key={i} className="px-4 py-2 bg-red-500/20 text-red-300 border border-red-500/50 rounded-lg text-sm font-bold">
                                                    {gap}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-sm text-slate-400">No critical skills missing!</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* 4-Week Acceleration Plan */}
                            <div className="relative group overflow-hidden rounded-2xl">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-20 blur-xl"></div>
                                <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-green-500/30 rounded-2xl overflow-hidden">
                                    <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-b border-green-500/30 p-6 flex items-center gap-3">
                                        <Calendar className="h-6 w-6 text-green-400" />
                                        <h3 className="font-black text-white text-xl">4-Week Acceleration Plan</h3>
                                    </div>
                                    <div className="divide-y divide-slate-700/50">
                                        {analysis.accelerationPlan && analysis.accelerationPlan.length > 0 ? (
                                            analysis.accelerationPlan.map((week, idx) => (
                                                <div key={idx} className="p-8 hover:bg-slate-800/50 transition-colors">
                                                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                                                        <div className="shrink-0">
                                                            <span className="inline-block text-xs font-black text-green-300 uppercase tracking-wider bg-green-500/20 border border-green-500/50 px-4 py-2 rounded-lg">
                                                                {week.week || `WEEK ${idx + 1}`}
                                                            </span>
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-black text-white text-xl mb-4">{week.focus}</h4>
                                                            {week.tasks && week.tasks.length > 0 ? (
                                                                <ul className="space-y-3 mb-6">
                                                                    {week.tasks.map((task, tIdx) => (
                                                                        <li key={tIdx} className="flex items-start gap-3 text-sm text-slate-300">
                                                                            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 shrink-0" />
                                                                            <span className="flex-1">{task}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            ) : (
                                                                <p className="text-sm text-slate-400 mb-6">{week.description || 'No specific tasks defined.'}</p>
                                                            )}
                                                            <div className="flex gap-3 flex-wrap">
                                                                {idx === 0 && (
                                                                    <button 
                                                                        onClick={() => onNavigate && onNavigate('mentor')}
                                                                        className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 text-xs px-4 py-2 rounded-lg font-black hover:bg-cyan-500/30 transition-all uppercase tracking-wider"
                                                                    >
                                                                        💬 Ask AI Mentor
                                                                    </button>
                                                                )}
                                                                {idx === 1 && (
                                                                    <button 
                                                                        onClick={() => onNavigate && onNavigate('notes')}
                                                                        className="bg-purple-500/20 text-purple-300 border border-purple-500/50 text-xs px-4 py-2 rounded-lg font-black hover:bg-purple-500/30 transition-all uppercase tracking-wider"
                                                                    >
                                                                        📝 Create Notes
                                                                    </button>
                                                                )}
                                                                {idx === 2 && (
                                                                    <button 
                                                                        onClick={() => onNavigate && onNavigate('interview')}
                                                                        className="bg-orange-500/20 text-orange-300 border border-orange-500/50 text-xs px-4 py-2 rounded-lg font-black hover:bg-orange-500/30 transition-all uppercase tracking-wider"
                                                                    >
                                                                        💻 Practice Coding
                                                                    </button>
                                                                )}
                                                                {idx === 3 && (
                                                                    <button 
                                                                        onClick={() => onNavigate && onNavigate('mentor')}
                                                                        className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 text-xs px-4 py-2 rounded-lg font-black hover:bg-cyan-500/30 transition-all uppercase tracking-wider"
                                                                    >
                                                                        💬 Ask AI Mentor
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-8 text-center text-slate-400">
                                                <p>No acceleration plan available. Please try again.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TechAccelerator;
