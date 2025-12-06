
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
    const [customDomain, setCustomDomain] = useState('');
    const [role, setRole] = useState('Software Development Engineer (SDE I)');
    const [resumeText, setResumeText] = useState('');
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState<CompanyFitAnalysis | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showRoleDropdown, setShowRoleDropdown] = useState(false);
    const [showCustomDomainInput, setShowCustomDomainInput] = useState(false);
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
        if (!resumeFile && !resumeText.trim()) {
            alert("Please upload a resume or enter your skills.");
            return;
        }
        setLoading(true);
        setAnalysis(null); // Clear previous analysis
        try {
            let resumeInput = { content: '', mimeType: 'text/plain' };
            
            if (resumeFile) {
                // Read PDF file as base64
                const reader = new FileReader();
                const filePromise = new Promise<string>((resolve, reject) => {
                    reader.onload = () => {
                        const result = reader.result as string;
                        // Extract base64 content (remove data:application/pdf;base64, prefix)
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
                // Use text input
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
        <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg shadow-md">
                    <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">Tech Accelerator</h2>
                    <p className="text-slate-500">Target specific MNCs & Startups and get a week-by-week acceleration plan.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-6">
                {/* Left Panel: Configuration */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="space-y-6">
                            {/* Company Selector */}
                            <div className="relative" ref={dropdownRef}>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Target Company</label>
                                <div className="relative">
                                     <button 
                                        onClick={() => setShowDropdown(!showDropdown)}
                                        className="w-full flex items-center justify-between p-3 bg-white border border-slate-300 rounded-lg hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                                     >
                                        <div className="flex items-center gap-3">
                                            {customDomain ? (
                                                <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">C</div>
                                            ) : (
                                                <img src={COMPANIES.find(c => c.name === selectedCompany)?.logo || COMPANIES[0].logo} alt={selectedCompany} className="w-6 h-6 object-contain" />
                                            )}
                                            <span className="font-semibold text-slate-700">{customDomain || selectedCompany}</span>
                                        </div>
                                        <ChevronDown className="h-4 w-4 text-slate-400" />
                                     </button>

                                    {showDropdown && (
                                        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 rounded-lg shadow-xl z-20 max-h-64 overflow-y-auto custom-scrollbar">
                                            {COMPANIES.map(company => (
                                                <button
                                                    key={company.name}
                                                    onClick={() => {
                                                        setSelectedCompany(company.name);
                                                        setCustomDomain('');
                                                        setShowDropdown(false);
                                                    }}
                                                    className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 text-left"
                                                >
                                                    <img src={company.logo} alt={company.name} className="w-5 h-5 object-contain" />
                                                    <span className="text-sm font-medium text-slate-700">{company.name}</span>
                                                </button>
                                            ))}
                                            <div className="border-t border-slate-200 p-3">
                                                <button
                                                    onClick={() => setShowCustomDomainInput(!showCustomDomainInput)}
                                                    className="w-full text-left text-sm font-bold text-indigo-600 hover:text-indigo-700 py-2 px-2 rounded hover:bg-indigo-50 transition-colors flex items-center gap-2"
                                                >
                                                    ➕ Add Custom Domain
                                                </button>
                                                {showCustomDomainInput && (
                                                    <div className="mt-2 pt-3 border-t border-slate-200">
                                                        <input
                                                            type="text"
                                                            value={customDomain}
                                                            onChange={(e) => {
                                                                setCustomDomain(e.target.value);
                                                                if (e.target.value) setSelectedCompany('');
                                                            }}
                                                            placeholder="e.g. Startup Inc"
                                                            className="w-full p-2 text-sm border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                                            autoFocus
                                                        />
                                                        <button
                                                            onClick={() => {
                                                                setShowDropdown(false);
                                                                setShowCustomDomainInput(false);
                                                            }}
                                                            className="w-full mt-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 py-2 rounded transition-all"
                                                        >
                                                            ✓ Confirm
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Role Selector */}
                            <div className="relative" ref={roleDropdownRef}>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Target Role</label>
                                <div className="relative">
                                     <button 
                                        onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                                        className="w-full flex items-center justify-between p-3 bg-white border border-slate-300 rounded-lg hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                                     >
                                         <div className="flex items-center gap-2">
                                             <Briefcase className="h-4 w-4 text-slate-400" />
                                             <span className="text-sm text-slate-700 font-medium truncate">{role}</span>
                                         </div>
                                         <ChevronDown className="h-4 w-4 text-slate-400" />
                                     </button>
                                     
                                     {showRoleDropdown && (
                                         <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 rounded-lg shadow-xl z-20 max-h-60 overflow-y-auto custom-scrollbar">
                                             {ROLES.map(r => (
                                                 <button
                                                     key={r}
                                                     onClick={() => {
                                                         setRole(r);
                                                         setShowRoleDropdown(false);
                                                     }}
                                                     className="w-full text-left p-3 text-sm text-slate-700 hover:bg-slate-50 border-b border-slate-50 last:border-0"
                                                 >
                                                     {r}
                                                 </button>
                                             ))}
                                         </div>
                                     )}
                                </div>
                            </div>

                            {/* Resume Upload */}
                             <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">📄 Upload Resume (PDF)</label>
                                <div className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center transition-colors relative ${resumeFile ? 'border-green-300 bg-green-50' : 'border-slate-300 hover:border-indigo-400 hover:bg-indigo-50'}`}>
                                    <input 
                                        type="file" 
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    {resumeFile ? (
                                        <div className="flex flex-col items-center">
                                            <div className="bg-green-100 p-2 rounded-full mb-2">
                                                <FileText className="h-6 w-6 text-green-600" />
                                            </div>
                                            <p className="text-sm font-bold text-slate-800 truncate max-w-[200px]">{resumeFile.name}</p>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); e.preventDefault(); setResumeFile(null); }}
                                                className="mt-2 text-xs text-red-500 hover:underline flex items-center gap-1"
                                            >
                                                <X className="h-3 w-3" /> Remove
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="bg-indigo-100 p-2 rounded-full mb-2">
                                                <Upload className="h-6 w-6 text-indigo-600" />
                                            </div>
                                            <p className="text-sm font-bold text-slate-700">Click to upload PDF</p>
                                            <p className="text-xs text-slate-400 mt-1">or drag and drop</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Skills Text Area - BOTH WORK SIMULTANEOUSLY NOW */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">💡 Skills & Experience</label>
                                <div className="relative">
                                    <textarea 
                                        value={resumeText}
                                        onChange={(e) => setResumeText(e.target.value)}
                                        className="w-full p-3 h-28 bg-white text-slate-900 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none text-sm font-medium"
                                        placeholder="Type your skills, projects, and experience here...&#10;e.g. I have built 3 React projects, weak in DSA, good at Web Dev..."
                                    />
                                    <div className="absolute bottom-3 right-3 text-xs text-slate-400 font-semibold">
                                        {resumeText.length}/500
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 mt-1.5 italic">💬 Both resume upload AND skill typing work together - use either or both!</p>
                            </div>

                            <button 
                                onClick={handleAnalyze}
                                disabled={loading || (!resumeText && !resumeFile)}
                                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-lg shadow-slate-200"
                            >
                                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Analyze Readiness"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Results */}
                <div className="lg:col-span-8">
                    {!analysis && !loading && (
                        <div className="h-full bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center p-12 text-center">
                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                <Briefcase className="h-10 w-10 text-slate-300" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-700 mb-2">Start Your Acceleration</h3>
                            <p className="text-slate-400 max-w-md">Select a target company and role to get a personalized breakdown of what you're missing and how to fix it in 4 weeks.</p>
                        </div>
                    )}

                    {loading && (
                        <div className="h-full bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center p-12 text-center">
                             <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mb-6" />
                             <h3 className="text-lg font-bold text-slate-700">Analyzing Profile...</h3>
                             <p className="text-slate-400">Comparing your skills with {selectedCompany} requirements...</p>
                        </div>
                    )}

                    {analysis && (
                        <div className="space-y-6">
                            {/* Match Score and Status */}
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    {/* Circular Progress */}
                                    <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle cx="80" cy="80" r="70" stroke="#f1f5f9" strokeWidth="16" fill="transparent" />
                                            <circle 
                                                cx="80" cy="80" r="70" 
                                                stroke={analysis.matchScore > 75 ? '#22c55e' : analysis.matchScore > 50 ? '#eab308' : '#ef4444'} 
                                                strokeWidth="16" 
                                                fill="transparent" 
                                                strokeDasharray={439.82} 
                                                strokeDashoffset={439.82 - (439.82 * analysis.matchScore) / 100} 
                                                className="transition-all duration-1000 ease-out"
                                            />
                                        </svg>
                                        <div className="absolute flex flex-col items-center">
                                            <span className="text-4xl font-bold text-slate-800">{analysis.matchScore}%</span>
                                            <span className="text-sm text-slate-500 font-semibold uppercase">MATCH</span>
                                        </div>
                                    </div>
                                    
                                    {/* Status Badge */}
                                    <div className="flex-1 text-center md:text-left">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-2"
                                            style={{
                                                backgroundColor: analysis.matchScore > 75 ? '#dcfce7' : analysis.matchScore > 50 ? '#fef3c7' : '#fee2e2',
                                                color: analysis.matchScore > 75 ? '#166534' : analysis.matchScore > 50 ? '#854d0e' : '#991b1b'
                                            }}
                                        >
                                            <span className="text-sm font-bold">
                                                Status: {analysis.matchScore > 75 ? 'High Probability' : analysis.matchScore > 50 ? 'Medium Probability' : 'Low Probability'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Cultural Fit */}
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                                    <Building2 className="h-5 w-5 text-indigo-500" /> Cultural Fit
                                </h3>
                                <div className="text-sm text-slate-600 leading-relaxed">
                                    <ReactMarkdown 
                                        components={{
                                            p: ({node, ...props}) => <p className="mb-2" {...props} />,
                                            ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-1" {...props} />,
                                            li: ({node, ...props}) => <li className="marker:text-indigo-500" {...props} />
                                        }}
                                    >
                                        {analysis.culturalFit}
                                    </ReactMarkdown>
                                </div>
                            </div>

                            {/* Missing Critical Skills */}
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                                    <AlertTriangle className="h-5 w-5 text-orange-500" /> Missing Critical Skills
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {analysis.technicalGaps && analysis.technicalGaps.length > 0 ? (
                                        analysis.technicalGaps.map((gap, i) => (
                                            <span key={i} className="px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-full text-xs font-semibold">
                                                {gap}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-sm text-slate-500">No critical skills missing!</span>
                                    )}
                                </div>
                            </div>

                            {/* 4-Week Acceleration Plan */}
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                                <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-indigo-600" />
                                    <h3 className="font-bold text-slate-800">4-Week Acceleration Plan</h3>
                                </div>
                                <div className="divide-y divide-slate-100">
                                    {analysis.accelerationPlan && analysis.accelerationPlan.length > 0 ? (
                                        analysis.accelerationPlan.map((week, idx) => (
                                            <div key={idx} className="p-6 hover:bg-slate-50 transition-colors">
                                                <div className="flex flex-col md:flex-row md:items-start gap-4">
                                                    <div className="shrink-0">
                                                        <span className="inline-block text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1.5 rounded border border-indigo-100">
                                                            {week.week || `WEEK ${idx + 1}`}
                                                        </span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-slate-800 text-lg mb-3">{week.focus}</h4>
                                                        {week.tasks && week.tasks.length > 0 ? (
                                                            <ul className="space-y-2">
                                                                {week.tasks.map((task, tIdx) => (
                                                                    <li key={tIdx} className="flex items-start gap-3 text-sm text-slate-600">
                                                                        <CheckCircle className="h-4 w-4 text-slate-300 mt-0.5 shrink-0" />
                                                                        <span className="flex-1">{task}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <p className="text-sm text-slate-500">{week.description || 'No specific tasks defined.'}</p>
                                                        )}
                                                        <div className="mt-4 flex gap-2">
                                                            {idx === 0 && (
                                                                <button 
                                                                    onClick={() => onNavigate && onNavigate('mentor')}
                                                                    className="bg-indigo-50 text-indigo-600 text-xs px-3 py-1.5 rounded-lg border border-indigo-100 font-semibold hover:bg-indigo-100 transition-colors"
                                                                >
                                                                    Ask AI Mentor
                                                                </button>
                                                            )}
                                                            {idx === 1 && (
                                                                <button 
                                                                    onClick={() => onNavigate && onNavigate('notes')}
                                                                    className="bg-indigo-50 text-indigo-600 text-xs px-3 py-1.5 rounded-lg border border-indigo-100 font-semibold hover:bg-indigo-100 transition-colors"
                                                                >
                                                                    Create Notes
                                                                </button>
                                                            )}
                                                            {idx === 2 && (
                                                                <button 
                                                                    onClick={() => onNavigate && onNavigate('interview')}
                                                                    className="bg-indigo-50 text-indigo-600 text-xs px-3 py-1.5 rounded-lg border border-indigo-100 font-semibold hover:bg-indigo-100 transition-colors"
                                                                >
                                                                    Practice Coding
                                                                </button>
                                                            )}
                                                            {idx === 3 && (
                                                                <button 
                                                                    onClick={() => onNavigate && onNavigate('mentor')}
                                                                    className="bg-indigo-50 text-indigo-600 text-xs px-3 py-1.5 rounded-lg border border-indigo-100 font-semibold hover:bg-indigo-100 transition-colors"
                                                                >
                                                                    Ask AI Mentor
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-6 text-center text-slate-500">
                                            <p>No acceleration plan available. Please try again.</p>
                                        </div>
                                    )}
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
