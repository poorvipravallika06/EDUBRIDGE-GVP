
import React, { useState } from 'react';
import { generateParentReport } from '../services/geminiServices';
import { Mail, CheckCircle, Loader2, UserCheck, Sparkles, ShieldCheck, Smartphone, Hash, FileText, Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ParentPortal: React.FC = () => {
    const [report, setReport] = useState('');
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    // Form State
    const [studentId, setStudentId] = useState('');
    const [parentId, setParentId] = useState('');
    const [studentMobile, setStudentMobile] = useState('');
    const [parentMobile, setParentMobile] = useState('');
    const [parentEmail, setParentEmail] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    
    // Validation errors
    const [studentPhoneError, setStudentPhoneError] = useState('');
    const [parentPhoneError, setParentPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');

    // Mock student stats
    const studentStats = "Attendance: 85%, Avg Grade: B+, Projects: 3 Completed, Weakness: Data Structures, Strength: Web Development, Engagement: High in practicals, Low in theory.";

    // Phone validation - exactly 10 digits
    const validatePhoneNumber = (phone: string): boolean => {
        const phoneDigits = phone.replace(/\D/g, '');
        return phoneDigits.length === 10;
    };

    // Email validation
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleStudentMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setStudentMobile(value);
        if (value && !validatePhoneNumber(value)) {
            setStudentPhoneError('Invalid phone number (must be 10 digits)');
        } else {
            setStudentPhoneError('');
        }
    };

    const handleParentMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setParentMobile(value);
        if (value && !validatePhoneNumber(value)) {
            setParentPhoneError('Invalid phone number (must be 10 digits)');
        } else {
            setParentPhoneError('');
        }
    };

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate all fields
        const studentPhoneValid = !studentMobile || validatePhoneNumber(studentMobile);
        const parentPhoneValid = !parentMobile || validatePhoneNumber(parentMobile);
        
        if (!studentPhoneValid) {
            setStudentPhoneError('Invalid phone number (must be 10 digits)');
            return;
        }
        if (!parentPhoneValid) {
            setParentPhoneError('Invalid phone number (must be 10 digits)');
            return;
        }
        
        if(studentId && parentId && studentMobile && parentMobile) {
            setIsVerified(true);
            setStudentPhoneError('');
            setParentPhoneError('');
        } else {
            alert("Please fill all secure fields.");
        }
    };

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const res = await generateParentReport("Rahul", studentStats);
            setReport(res);
        } catch(e) {
            alert('Error generating report');
        } finally {
            setLoading(false);
        }
    }

    const handleSendWithDoc = async () => {
        // Validate email format
        if (!parentEmail.trim()) {
            setEmailError("Please enter a parent email address");
            return;
        }
        if (!validateEmail(parentEmail)) {
            setEmailError("Invalid mail - please enter a valid email (e.g., parent@example.com)");
            return;
        }

        if (!report) {
            alert("Please generate a report first.");
            return;
        }

        setSending(true);
        setEmailError('');

        try {
            // 1. Generate "Word Doc" (HTML Blob with .doc extension)
            const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Student Progress Report</title><style>body{font-family:Arial,sans-serif;padding:20px;line-height:1.6;}h1{color:#4f46e5;}h2{color:#6366f1;margin-top:20px;}</style></head><body>`;
            const footer = "</body></html>";
            const content = `
                <h1>EduBridge Student Progress Report</h1>
                <p><strong>Student ID:</strong> ${studentId || 'N/A'}</p>
                <p><strong>Student Mobile:</strong> ${studentMobile || 'N/A'}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                <p><strong>Sent To:</strong> ${parentEmail}</p>
                <hr/>
                ${report.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/## (.*?)/g, '<h2>$1</h2>').replace(/### (.*?)/g, '<h3>$1</h3>')}
                <br/>
                <hr/>
                <p><em>Generated securely via EduBridge Parent Portal.</em></p>
                <p><em>This is a confidential document. Please do not share.</em></p>
            `;
            
            const sourceHTML = header + content + footer;
            const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
            
            // Download the document
            const fileDownload = document.createElement("a");
            document.body.appendChild(fileDownload);
            fileDownload.href = source;
            fileDownload.download = `Progress_Report_${studentId || 'Student'}_${new Date().toISOString().split('T')[0]}.doc`;
            fileDownload.click();
            document.body.removeChild(fileDownload);

            // 2. Simulate sending email to the provided address
            // In a real application, this would call an email API service
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Show success message with email confirmation
            setSending(false);
            setSent(true);
            
            // Log email details (in production, this would be sent to backend)
            console.log(`Email sent successfully to: ${parentEmail}`);
            console.log(`Report for Student ID: ${studentId}`);
            
            // Reset sent state after 5 seconds
            setTimeout(() => {
                setSent(false);
            }, 5000);
        } catch (error) {
            console.error("Error sending email:", error);
            setEmailError(`Failed to send email to ${parentEmail}. Please try again.`);
            setSending(false);
        }
    }

    if (!isVerified) {
        return (
            <div className="p-6 max-w-lg mx-auto mt-10 animate-in fade-in zoom-in duration-500 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen rounded-2xl">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-2xl shadow-2xl border-2 border-blue-400">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                            <ShieldCheck className="h-10 w-10 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white">Secure Parent Login</h2>
                        <p className="text-blue-100 mt-2 text-lg">Verify identities to access student progress</p>
                    </div>

                    <form onSubmit={handleVerify} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-blue-100 uppercase mb-2">Student ID</label>
                                <div className="relative">
                                    <Hash className="absolute left-3 top-3 h-5 w-5 text-white/50" />
                                    <input 
                                        type="text" required value={studentId} onChange={e => setStudentId(e.target.value)}
                                        className="w-full pl-10 p-3 bg-white/20 border-2 border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white focus:border-white outline-none backdrop-blur-sm transition-all font-semibold" placeholder="STU-XXXX"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-blue-100 uppercase mb-2">Parent ID</label>
                                <div className="relative">
                                    <Hash className="absolute left-3 top-3 h-5 w-5 text-white/50" />
                                    <input 
                                        type="text" required value={parentId} onChange={e => setParentId(e.target.value)}
                                        className="w-full pl-10 p-3 bg-white/20 border-2 border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white focus:border-white outline-none backdrop-blur-sm transition-all font-semibold" placeholder="PAR-XXXX"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                             <label className="block text-xs font-bold text-blue-100 uppercase mb-2">Student Mobile (10 digits)</label>
                             <div className="relative">
                                 <Smartphone className="absolute left-3 top-3 h-5 w-5 text-white/50" />
                                 <input 
                                     type="tel" required value={studentMobile} onChange={handleStudentMobileChange}
                                     className={`w-full pl-10 p-3 bg-white/20 border-2 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:outline-none backdrop-blur-sm transition-all font-semibold ${
                                         studentPhoneError ? 'border-red-300 focus:ring-red-300' : 'border-white/30 focus:ring-white focus:border-white'
                                     }`} placeholder="9876543210"
                                 />
                             </div>
                             {studentPhoneError && (
                                 <p className="text-red-200 text-xs mt-1.5 font-semibold flex items-center gap-1">
                                     ❌ {studentPhoneError}
                                 </p>
                             )}
                        </div>

                        <div>
                             <label className="block text-xs font-bold text-blue-100 uppercase mb-2">Parent Mobile (10 digits)</label>
                             <div className="relative">
                                 <Smartphone className="absolute left-3 top-3 h-5 w-5 text-white/50" />
                                 <input 
                                     type="tel" required value={parentMobile} onChange={handleParentMobileChange}
                                     className={`w-full pl-10 p-3 bg-white/20 border-2 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:outline-none backdrop-blur-sm transition-all font-semibold ${
                                         parentPhoneError ? 'border-red-300 focus:ring-red-300' : 'border-white/30 focus:ring-white focus:border-white'
                                     }`} placeholder="9876543210"
                                 />
                             </div>
                             {parentPhoneError && (
                                 <p className="text-red-200 text-xs mt-1.5 font-semibold flex items-center gap-1">
                                     ❌ {parentPhoneError}
                                 </p>
                             )}
                        </div>

                        <button type="submit" className="w-full bg-white text-indigo-700 font-bold py-3.5 rounded-xl shadow-xl transition-all mt-6 hover:bg-yellow-100 transform hover:scale-105 active:scale-95 text-lg">
                            ✓ Verify & Access Portal
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500 bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 min-h-screen">
             <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                        <UserCheck className="h-7 w-7 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">Parent Dashboard</h2>
                        <div className="flex items-center gap-2 text-sm text-emerald-600 font-bold">
                            <ShieldCheck className="h-4 w-4 animate-pulse" /> Secure Connection Verified
                        </div>
                    </div>
                </div>
                <button onClick={() => setIsVerified(false)} className="text-sm font-bold text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-all">Logout</button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Control Panel */}
                <div className="md:col-span-1 space-y-4">
                    <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-6 rounded-xl shadow-lg border-2 border-indigo-300 text-white">
                        <h3 className="font-bold text-lg mb-3">👤 Student Profile</h3>
                        <div className="text-sm space-y-2.5 mb-4 bg-white/20 p-4 rounded-lg border-2 border-white/30 backdrop-blur-sm">
                            <p><strong>ID:</strong> {studentId}</p>
                            <p><strong>Mobile:</strong> {studentMobile}</p>
                            <p className="pt-2.5 border-t-2 border-white/30 mt-2"><strong>Attendance:</strong> <span className="text-yellow-300 font-bold">85%</span></p>
                        </div>
                        <button 
                            onClick={handleGenerate}
                            disabled={loading}
                            className="w-full bg-white text-indigo-700 hover:bg-yellow-100 py-3 rounded-lg font-bold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 transform hover:scale-105 active:scale-95"
                        >
                             {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <><Sparkles className="h-5 w-5" /> Generate Report</>}
                        </button>
                    </div>
                    
                    {report && (
                         <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-xl shadow-2xl border-2 border-emerald-300 animate-in slide-in-from-left-4 text-white">
                            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                <Mail className="h-5 w-5" />
                                Email Delivery
                            </h3>
                            <div className="mb-4">
                                <label className="block text-xs font-bold text-emerald-100 uppercase mb-2.5">Parent Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-5 w-5 text-white/50" />
                                    <input 
                                        type="email" 
                                        value={parentEmail}
                                        onChange={(e) => {setParentEmail(e.target.value); setEmailError('');}}
                                        placeholder="parent@example.com"
                                        className="w-full pl-10 p-3 border-2 border-white/30 rounded-lg text-slate-900 font-semibold focus:ring-2 focus:ring-white focus:border-white outline-none transition-all bg-white/90 placeholder-slate-500"
                                        disabled={sending || sent}
                                    />
                                </div>
                                {emailError && (
                                    <div className="mt-2 p-3 bg-red-100/90 border-2 border-red-300 rounded-lg">
                                        <p className="text-xs text-red-800 font-bold">❌ {emailError}</p>
                                    </div>
                                )}
                                {sent && !emailError && (
                                    <div className="mt-2 p-3 bg-white/30 border-2 border-white rounded-lg">
                                        <p className="text-xs text-white font-bold flex items-center gap-1.5">
                                            <CheckCircle className="h-4 w-4" />
                                            ✓ Email sent to: <span className="font-bold">{parentEmail}</span>
                                        </p>
                                    </div>
                                )}
                            </div>
                             <button 
                                onClick={handleSendWithDoc}
                                disabled={sending || sent || !parentEmail.trim()}
                                className={`w-full py-3.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-all text-sm shadow-lg transform hover:scale-105 active:scale-95 border-2 ${
                                    sent 
                                    ? 'bg-white text-emerald-700 border-white font-bold' 
                                    : sending
                                    ? 'bg-white/40 text-white opacity-75 cursor-not-allowed border-white/50'
                                    : 'bg-white text-emerald-700 hover:bg-yellow-100 disabled:opacity-50 disabled:cursor-not-allowed border-white'
                                }`}
                            >
                                {sending ? (
                                    <>
                                        <Loader2 className="animate-spin h-5 w-5" /> 
                                        Sending...
                                    </>
                                ) : sent ? (
                                    <>
                                        <CheckCircle className="h-5 w-5" /> 
                                        Email Sent! ✓
                                    </>
                                ) : (
                                    <>
                                        <Mail className="h-5 w-5" /> 
                                        Email Report (.doc)
                                    </>
                                )}
                            </button>
                            <p className="text-[11px] text-white/70 mt-3 text-center leading-tight font-medium">
                                *Report will be sent to the email above as a Word Document attachment.
                            </p>
                         </div>
                    )}
                </div>

                {/* Report Preview */}
                <div className="md:col-span-2">
                    {!report ? (
                        <div className="bg-gradient-to-br from-slate-100 to-blue-100 border-3 border-dashed border-blue-300 rounded-xl h-full flex flex-col items-center justify-center p-8 text-center text-slate-500 min-h-[300px]">
                            <Mail className="h-16 w-16 mb-4 opacity-40" />
                            <p className="font-bold text-lg">Secure report preview area</p>
                            <p className="text-sm mt-2">Generate report to view academic details</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-2xl border-2 border-slate-200 overflow-hidden animate-in zoom-in-95">
                            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-5 text-white flex justify-between items-center">
                                <span className="font-bold text-sm tracking-widest uppercase">📋 Confidential Progress Update</span>
                                <span className="text-purple-100 text-xs font-semibold">{new Date().toLocaleDateString()}</span>
                            </div>
                            <div className="p-8 prose prose-sm prose-indigo max-w-none">
                                <ReactMarkdown
                                    components={{
                                        ul: ({node, ...props}) => <ul className="grid gap-3 my-3 pl-0 list-none" {...props} />,
                                        li: ({node, ...props}) => (
                                            <li className="flex items-start gap-3 bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border-2 border-purple-200 text-slate-700 text-sm leading-relaxed font-medium" {...props}>
                                                <span className="mt-1.5 h-2 w-2 rounded-full bg-purple-600 shrink-0"></span>
                                                <div className="flex-1">{props.children}</div>
                                            </li>
                                        ),
                                        h1: ({node, ...props}) => <h3 className="text-xl font-bold text-purple-900 mt-0 mb-4" {...props} />,
                                        h2: ({node, ...props}) => <h4 className="text-base font-bold text-indigo-900 mt-5 mb-3 flex items-center gap-2" {...props} />,
                                    }}
                                >
                                    {report}
                                </ReactMarkdown>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ParentPortal;
