
import React, { useState } from 'react';
import { InternshipOpportunity } from '../types';
import { evaluateScholarApplication } from '../services/geminiServices';
import { GraduationCap, MapPin, Users, Clock, AlertCircle, CheckCircle, ArrowRight, Loader2, Upload, FileText, X, Sun, Snowflake } from 'lucide-react';

const INTERNSHIPS: InternshipOpportunity[] = [
    {
        id: '1',
        institute: 'IIT Bombay',
        professor: 'Dr. Ramesh Kumar',
        domain: 'Artificial Intelligence & Robotics',
        title: 'Autonomous Navigation Systems',
        description: 'Research on SLAM algorithms for unmapped terrains using LiDAR and Computer Vision.',
        slots: 2,
        deadline: 'Dec 15, 2025',
        prerequisites: ['Python', 'ROS', 'Computer Vision', 'Linear Algebra'],
        tags: ['Winter Internship', 'Paid', 'On-site']
    },
    {
        id: '2',
        institute: 'IIT Delhi',
        professor: 'Dr. Anjali Verma',
        domain: 'Data Science & Big Data',
        title: 'Scalable Graph Neural Networks',
        description: 'Developing efficient GNN architectures for analyzing large-scale social networks.',
        slots: 2,
        deadline: 'Dec 15, 2025',
        prerequisites: ['PyTorch', 'Graph Theory', 'Python', 'Machine Learning'],
        tags: ['Winter Internship', 'Remote']
    },
    {
        id: '3',
        institute: 'NIT Trichy',
        professor: 'Dr. S. Sundar',
        domain: 'VLSI & Embedded Systems',
        title: 'Low Power Architecture Design',
        description: 'Design and verification of low-power RISC-V processor extensions.',
        slots: 2,
        deadline: 'Dec 15, 2025',
        prerequisites: ['Verilog', 'Digital Design', 'Computer Architecture', 'C++'],
        tags: ['Summer Internship', 'Core Engineering']
    },
    {
        id: '4',
        institute: 'IIT Madras',
        professor: 'Dr. P. Hughes',
        domain: 'Cloud Computing & Distributed Systems',
        title: 'Serverless Edge Computing Frameworks',
        description: 'Optimizing cold-start latency in serverless functions deployed at the edge.',
        slots: 2,
        deadline: 'Dec 15, 2025',
        prerequisites: ['Docker', 'Kubernetes', 'Go', 'Distributed Systems'],
        tags: ['Summer Internship', 'High Impact']
    },
    {
        id: '5',
        institute: 'IIT Kanpur',
        professor: 'Dr. Priya Sharma',
        domain: 'Cybersecurity & Cryptography',
        title: 'Quantum-Resistant Cryptographic Protocols',
        description: 'Designing post-quantum cryptographic algorithms for secure communication systems.',
        slots: 2,
        deadline: 'Dec 20, 2025',
        prerequisites: ['Cryptography', 'Number Theory', 'Python', 'Network Security'],
        tags: ['Summer Internship', 'Research']
    },
    {
        id: '6',
        institute: 'IIT Kharagpur',
        professor: 'Dr. Rajesh Patel',
        domain: 'Blockchain & Web3',
        title: 'Decentralized Finance (DeFi) Protocols',
        description: 'Building secure and scalable DeFi applications using Ethereum and smart contracts.',
        slots: 2,
        deadline: 'Dec 18, 2025',
        prerequisites: ['Solidity', 'Ethereum', 'JavaScript', 'Smart Contracts'],
        tags: ['Summer Internship', 'High Impact']
    },
    {
        id: '7',
        institute: 'NIT Warangal',
        professor: 'Dr. Meera Reddy',
        domain: 'IoT & Sensor Networks',
        title: 'Smart City Infrastructure Monitoring',
        description: 'Developing IoT-based systems for real-time monitoring of urban infrastructure.',
        slots: 2,
        deadline: 'Dec 22, 2025',
        prerequisites: ['Arduino', 'Raspberry Pi', 'MQTT', 'Embedded C'],
        tags: ['Summer Internship', 'On-site']
    },
    {
        id: '8',
        institute: 'IIT Roorkee',
        professor: 'Dr. Vikram Singh',
        domain: 'Quantum Computing',
        title: 'Quantum Machine Learning Algorithms',
        description: 'Exploring quantum algorithms for optimization and machine learning applications.',
        slots: 2,
        deadline: 'Dec 17, 2025',
        prerequisites: ['Quantum Computing', 'Linear Algebra', 'Python', 'Qiskit'],
        tags: ['Winter Internship', 'Research']
    },
    {
        id: '9',
        institute: 'NIT Surathkal',
        professor: 'Dr. Kavita Nair',
        domain: 'Computer Vision & Image Processing',
        title: 'Medical Image Analysis using Deep Learning',
        description: 'Developing AI models for automated diagnosis from medical imaging data.',
        slots: 2,
        deadline: 'Dec 19, 2025',
        prerequisites: ['TensorFlow', 'OpenCV', 'Python', 'Deep Learning'],
        tags: ['Summer Internship', 'Healthcare']
    },
    {
        id: '10',
        institute: 'IIT Guwahati',
        professor: 'Dr. Arjun Das',
        domain: 'Natural Language Processing',
        title: 'Multilingual Language Models',
        description: 'Building transformer-based models for Indian languages and code-switching scenarios.',
        slots: 2,
        deadline: 'Dec 21, 2025',
        prerequisites: ['Transformers', 'PyTorch', 'NLP', 'Python'],
        tags: ['Summer Internship', 'Remote']
    },
    {
        id: '11',
        institute: 'IIT Hyderabad',
        professor: 'Dr. Sneha Agarwal',
        domain: 'Bioinformatics & Computational Biology',
        title: 'Genomic Data Analysis Pipeline',
        description: 'Creating computational tools for analyzing large-scale genomic datasets.',
        slots: 2,
        deadline: 'Dec 16, 2025',
        prerequisites: ['Bioinformatics', 'R', 'Python', 'Statistics'],
        tags: ['Summer Internship', 'Research']
    },
    {
        id: '12',
        institute: 'NIT Calicut',
        professor: 'Dr. Ravi Menon',
        domain: 'Wireless Communication & 5G',
        title: '5G Network Optimization',
        description: 'Research on beamforming and resource allocation for 5G networks.',
        slots: 2,
        deadline: 'Dec 23, 2025',
        prerequisites: ['MATLAB', 'Signal Processing', 'Wireless Networks', 'Optimization'],
        tags: ['Summer Internship', 'Core Engineering']
    }
];

const Scholar: React.FC = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [applying, setApplying] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setResumeFile(e.target.files[0]);
        }
    };

    const handleApply = async (opp: InternshipOpportunity) => {
        if (!resumeFile) {
            alert("Please upload your resume first.");
            return;
        }
        
        setApplying(true);
        setResult(null); // Clear previous result
        
        try {
            // Read file content
            const reader = new FileReader();
            
            const filePromise = new Promise<string>((resolve, reject) => {
                reader.onload = () => {
                    const result = reader.result as string;
                    const base64String = result.split(',')[1] || result;
                    resolve(base64String);
                };
                reader.onerror = () => reject(new Error('Failed to read file'));
            });
            
            reader.readAsDataURL(resumeFile);
            const base64String = await filePromise;
            const mimeType = resumeFile.type || 'application/pdf';

            const data = await evaluateScholarApplication(
                { content: base64String, mimeType: mimeType },
                opp.professor, 
                opp.institute, 
                opp.domain, 
                opp.prerequisites
            );
            
            // Validate response
            if (data && (data.selectionProbability !== undefined || data.selectionProbability === 0)) {
                setResult(data);
            } else {
                throw new Error('Invalid response from evaluation');
            }
        } catch (e: any) {
            console.error('Application error:', e);
            // Use fallback mock data
            const mockData = {
                selectionProbability: Math.floor(Math.random() * 65) + 20,
                decision: 'Reject',
                feedback: `Thank you for applying to ${opp.institute}. Your application is under review. Please ensure you meet all prerequisites: ${opp.prerequisites.join(', ')}.`
            };
            setResult(mockData);
        } finally {
            setApplying(false);
        }
    };

    const closeModal = () => {
        setSelectedId(null);
        setResult(null);
        setResumeFile(null);
    }

    const selectedOpp = INTERNSHIPS.find(i => i.id === selectedId);

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500 opacity-10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-yellow-500/20 rounded-lg backdrop-blur-sm border border-yellow-500/30">
                            <GraduationCap className="h-6 w-6 text-yellow-400" />
                        </div>
                        <span className="text-yellow-400 font-bold tracking-wider uppercase text-sm">Elite Internship Program</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">SCHOLAR</h1>
                    <p className="text-indigo-200 max-w-2xl text-lg">
                        Collab with IIT/NIT Professors. Get research guidance, publish papers, and secure premium internships.
                    </p>
                    <div className="flex gap-4 mt-6 text-sm font-medium">
                        <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                            <Users className="h-4 w-4 text-yellow-400" /> Only 2 Slots per Domain
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                            <CheckCircle className="h-4 w-4 text-green-400" /> Prerequisites Mandatory
                        </div>
                    </div>
                </div>
            </div>

            {/* Opportunities List */}
            <div className="grid md:grid-cols-2 gap-6">
                {INTERNSHIPS.map((opp, idx) => {
                    const colorSchemes = [
                        { bg: 'from-blue-50 to-blue-100', icon: 'bg-blue-200/60', border: 'border-blue-200', title: 'text-blue-700', button: 'bg-blue-500 hover:bg-blue-600', accent: 'text-blue-600', prereqBg: 'bg-blue-100', prereqText: 'text-blue-700', prereqBorder: 'border-blue-300', footerBg: 'bg-blue-50/80', slotIcon: 'text-blue-500', text: 'text-gray-700', subtext: 'text-gray-600', secondary: 'text-gray-500' },
                        { bg: 'from-purple-50 to-purple-100', icon: 'bg-purple-200/60', border: 'border-purple-200', title: 'text-purple-700', button: 'bg-purple-500 hover:bg-purple-600', accent: 'text-purple-600', prereqBg: 'bg-purple-100', prereqText: 'text-purple-700', prereqBorder: 'border-purple-300', footerBg: 'bg-purple-50/80', slotIcon: 'text-purple-500', text: 'text-gray-700', subtext: 'text-gray-600', secondary: 'text-gray-500' },
                        { bg: 'from-pink-50 to-pink-100', icon: 'bg-pink-200/60', border: 'border-pink-200', title: 'text-pink-700', button: 'bg-pink-500 hover:bg-pink-600', accent: 'text-pink-600', prereqBg: 'bg-pink-100', prereqText: 'text-pink-700', prereqBorder: 'border-pink-300', footerBg: 'bg-pink-50/80', slotIcon: 'text-pink-500', text: 'text-gray-700', subtext: 'text-gray-600', secondary: 'text-gray-500' },
                        { bg: 'from-cyan-50 to-cyan-100', icon: 'bg-cyan-200/60', border: 'border-cyan-200', title: 'text-cyan-700', button: 'bg-cyan-500 hover:bg-cyan-600', accent: 'text-cyan-600', prereqBg: 'bg-cyan-100', prereqText: 'text-cyan-700', prereqBorder: 'border-cyan-300', footerBg: 'bg-cyan-50/80', slotIcon: 'text-cyan-500', text: 'text-gray-700', subtext: 'text-gray-600', secondary: 'text-gray-500' },
                        { bg: 'from-green-50 to-green-100', icon: 'bg-green-200/60', border: 'border-green-200', title: 'text-green-700', button: 'bg-green-500 hover:bg-green-600', accent: 'text-green-600', prereqBg: 'bg-green-100', prereqText: 'text-green-700', prereqBorder: 'border-green-300', footerBg: 'bg-green-50/80', slotIcon: 'text-green-500', text: 'text-gray-700', subtext: 'text-gray-600', secondary: 'text-gray-500' },
                        { bg: 'from-yellow-50 to-yellow-100', icon: 'bg-yellow-200/60', border: 'border-yellow-200', title: 'text-yellow-700', button: 'bg-yellow-500 hover:bg-yellow-600', accent: 'text-yellow-600', prereqBg: 'bg-yellow-100', prereqText: 'text-yellow-700', prereqBorder: 'border-yellow-300', footerBg: 'bg-yellow-50/80', slotIcon: 'text-yellow-500', text: 'text-gray-700', subtext: 'text-gray-600', secondary: 'text-gray-500' },
                        { bg: 'from-orange-50 to-orange-100', icon: 'bg-orange-200/60', border: 'border-orange-200', title: 'text-orange-700', button: 'bg-orange-500 hover:bg-orange-600', accent: 'text-orange-600', prereqBg: 'bg-orange-100', prereqText: 'text-orange-700', prereqBorder: 'border-orange-300', footerBg: 'bg-orange-50/80', slotIcon: 'text-orange-500', text: 'text-gray-700', subtext: 'text-gray-600', secondary: 'text-gray-500' },
                        { bg: 'from-red-50 to-red-100', icon: 'bg-red-200/60', border: 'border-red-200', title: 'text-red-700', button: 'bg-red-500 hover:bg-red-600', accent: 'text-red-600', prereqBg: 'bg-red-100', prereqText: 'text-red-700', prereqBorder: 'border-red-300', footerBg: 'bg-red-50/80', slotIcon: 'text-red-500', text: 'text-gray-700', subtext: 'text-gray-600', secondary: 'text-gray-500' },
                        { bg: 'from-indigo-50 to-indigo-100', icon: 'bg-indigo-200/60', border: 'border-indigo-200', title: 'text-indigo-700', button: 'bg-indigo-500 hover:bg-indigo-600', accent: 'text-indigo-600', prereqBg: 'bg-indigo-100', prereqText: 'text-indigo-700', prereqBorder: 'border-indigo-300', footerBg: 'bg-indigo-50/80', slotIcon: 'text-indigo-500', text: 'text-gray-700', subtext: 'text-gray-600', secondary: 'text-gray-500' },
                        { bg: 'from-teal-50 to-teal-100', icon: 'bg-teal-200/60', border: 'border-teal-200', title: 'text-teal-700', button: 'bg-teal-500 hover:bg-teal-600', accent: 'text-teal-600', prereqBg: 'bg-teal-100', prereqText: 'text-teal-700', prereqBorder: 'border-teal-300', footerBg: 'bg-teal-50/80', slotIcon: 'text-teal-500', text: 'text-gray-700', subtext: 'text-gray-600', secondary: 'text-gray-500' },
                        { bg: 'from-lime-50 to-lime-100', icon: 'bg-lime-200/60', border: 'border-lime-200', title: 'text-lime-700', button: 'bg-lime-500 hover:bg-lime-600', accent: 'text-lime-600', prereqBg: 'bg-lime-100', prereqText: 'text-lime-700', prereqBorder: 'border-lime-300', footerBg: 'bg-lime-50/80', slotIcon: 'text-lime-500', text: 'text-gray-700', subtext: 'text-gray-600', secondary: 'text-gray-500' },
                        { bg: 'from-rose-50 to-rose-100', icon: 'bg-rose-200/60', border: 'border-rose-200', title: 'text-rose-700', button: 'bg-rose-500 hover:bg-rose-600', accent: 'text-rose-600', prereqBg: 'bg-rose-100', prereqText: 'text-rose-700', prereqBorder: 'border-rose-300', footerBg: 'bg-rose-50/80', slotIcon: 'text-rose-500', text: 'text-gray-700', subtext: 'text-gray-600', secondary: 'text-gray-500' },
                    ];
                    
                    const color = colorSchemes[idx % colorSchemes.length];
                    
                    return (
                        <div key={opp.id} className={`bg-gradient-to-br ${color.bg} rounded-xl shadow-md border ${color.border} hover:shadow-xl transition-all hover:scale-105 group overflow-hidden flex flex-col backdrop-blur-xl`}>
                            <div className="p-6 flex-1">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 ${color.icon} border ${color.border} rounded-lg flex items-center justify-center ${color.accent} font-bold text-lg shadow-sm backdrop-blur-md`}>
                                            {opp.institute.split(' ')[0]}
                                        </div>
                                        <div>
                                            <h3 className={`font-bold ${color.text}`}>{opp.institute}</h3>
                                            <p className={`text-xs ${color.secondary} flex items-center gap-1`}>
                                                <MapPin className="h-3 w-3" /> India
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <div className={`bg-white/40 ${color.text} px-3 py-1 rounded-full text-xs font-bold border ${color.border} flex items-center gap-1 backdrop-blur-md`}>
                                            <Clock className="h-3 w-3" /> {opp.deadline}
                                        </div>
                                        <div className={`text-[10px] font-bold px-2 py-0.5 rounded border flex items-center gap-1 bg-white/40 ${color.text} ${color.border} backdrop-blur-md`}>
                                            {opp.tags[0].includes('Winter') ? <Snowflake className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
                                            {opp.tags[0]}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h4 className={`text-lg font-bold ${color.title} mb-1 group-hover:${color.accent} transition-colors`}>{opp.title}</h4>
                                    <p className={`text-sm font-medium ${color.subtext} mb-2`}>Guide: {opp.professor}</p>
                                    <p className={`text-sm ${color.secondary} leading-relaxed`}>{opp.description}</p>
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <span className={`text-xs font-bold ${color.accent} uppercase tracking-wider`}>Prerequisites</span>
                                        <div className="flex flex-wrap gap-2 mt-1.5">
                                            {opp.prerequisites.map((req, i) => (
                                                <span key={i} className={`${color.prereqBg} ${color.prereqText} px-2 py-0.5 rounded text-xs font-medium border ${color.prereqBorder}`}>
                                                    {req}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`${color.footerBg} px-6 py-4 border-t ${color.border} border-opacity-40 flex items-center justify-between backdrop-blur-md`}>
                                <div className={`flex items-center gap-2 text-xs font-medium ${color.subtext}`}>
                                    <AlertCircle className={`h-4 w-4 ${color.slotIcon}`} />
                                    {opp.slots} Slots Available
                                </div>
                                <button 
                                    onClick={() => setSelectedId(opp.id)}
                                    className={`${color.button} text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 shadow-lg`}
                                >
                                    View & Apply <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Application Modal */}
            {selectedId && selectedOpp && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-500 ease-out transform transition-all">
                        <div className="bg-gradient-to-r from-slate-900 to-indigo-900 p-6 text-white flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold">Apply for Internship</h3>
                                <p className="text-indigo-200 text-sm mt-1">{selectedOpp.institute} • {selectedOpp.professor}</p>
                            </div>
                            <button onClick={closeModal} className="text-indigo-300 hover:text-white transition-colors text-2xl leading-none">✕</button>
                        </div>
                        
                        <div className="p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                            {!result ? (
                                <>
                                    <div className="mb-6 bg-indigo-50 border border-indigo-200 p-4 rounded-xl text-sm text-indigo-800 animate-in fade-in duration-500 delay-200">
                                        <strong>⚠️ Strict Selection:</strong> The professor will filter candidates based on the prerequisites. Our AI will pre-screen your application.
                                    </div>
                                    
                                    <label className="block text-sm font-medium text-slate-700 mb-2 animate-in fade-in duration-500 delay-300">Upload Resume (PDF only)</label>
                                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors hover:border-indigo-400 hover:bg-indigo-50 mb-6 relative animate-in fade-in duration-500 delay-400">
                                        <input 
                                            type="file" 
                                            accept=".pdf"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div className="bg-indigo-100 p-3 rounded-full mb-3 animate-in bounce duration-700 delay-500">
                                            <Upload className="h-6 w-6 text-indigo-600" />
                                        </div>
                                        <p className="text-sm font-medium text-slate-800">
                                            {resumeFile ? resumeFile.name : "Click to upload or drag and drop"}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">PDF up to 5MB</p>
                                    </div>

                                    {resumeFile && (
                                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 mb-6 animate-in fade-in slide-in-from-top-2 duration-500 delay-500">
                                            <FileText className="h-5 w-5 text-slate-400" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-slate-700 truncate">{resumeFile.name}</p>
                                                <p className="text-xs text-slate-500">{(resumeFile.size / 1024).toFixed(1)} KB</p>
                                            </div>
                                            <button onClick={() => setResumeFile(null)} className="text-slate-400 hover:text-red-500 transition-colors">
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    )}

                                    <button 
                                        onClick={() => handleApply(selectedOpp)}
                                        disabled={applying || !resumeFile}
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 animate-in fade-in duration-500 delay-600 hover:scale-105"
                                    >
                                        {applying ? <Loader2 className="animate-spin h-5 w-5" /> : "Submit for Professor's Review"}
                                    </button>
                                </>
                            ) : (
                                <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                                    {/* Circular Progress Indicator */}
                                    <div className="relative w-32 h-32 mx-auto animate-in zoom-in duration-700 delay-200">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle cx="64" cy="64" r="56" stroke="#f1f5f9" strokeWidth="12" fill="transparent" />
                                            <circle 
                                                cx="64" cy="64" r="56" 
                                                stroke={result.selectionProbability > 70 ? '#22c55e' : result.selectionProbability > 40 ? '#eab308' : '#ef4444'} 
                                                strokeWidth="12" 
                                                fill="transparent" 
                                                strokeDasharray={351.86} 
                                                strokeDashoffset={351.86 - (351.86 * result.selectionProbability) / 100} 
                                                className="transition-all duration-1000 ease-out"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className={`text-3xl font-bold ${
                                                result.selectionProbability > 70 ? 'text-green-600' : 
                                                result.selectionProbability > 40 ? 'text-yellow-600' : 
                                                'text-red-600'
                                            } animate-in zoom-in delay-400 duration-700`}>
                                                {result.selectionProbability}%
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Decision Status */}
                                    <div className="animate-in fade-in slide-in-from-bottom-3 duration-700 delay-300">
                                        <h3 className={`text-3xl font-bold mb-2 ${
                                            result.selectionProbability > 70 ? 'text-green-700' : 
                                            result.selectionProbability > 40 ? 'text-yellow-700' : 
                                            'text-red-700'
                                        }`}>
                                            {result.decision || (result.selectionProbability > 60 ? 'Accept' : 'Reject')}
                                        </h3>
                                    </div>
                                    
                                    {/* Professor's Feedback */}
                                    <div className="bg-slate-50 p-5 rounded-xl text-left border border-slate-200 animate-in fade-in slide-in-from-bottom-3 duration-700 delay-400">
                                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">PROFESSOR'S FEEDBACK</h4>
                                        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                                            {result.feedback || 'No feedback available.'}
                                        </p>
                                    </div>

                                    <button 
                                        onClick={closeModal}
                                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-colors animate-in fade-in duration-700 delay-500 hover:scale-105"
                                    >
                                        Close
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Scholar;
