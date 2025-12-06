import React, { useState, useRef, useEffect } from 'react';
import { generateProjectIdeas } from '../services/geminiServices';
import { ProjectIdea } from '../types';
import { Loader2, Lightbulb, Layers, GitBranch, ArrowRight, ChevronDown, Building2, Code, Zap } from 'lucide-react';

const INTERESTS_LIST = [
    'Healthcare', 'FinTech', 'EdTech', 'E-commerce', 
    'Sustainability', 'Smart Cities', 'Agriculture', 
    'Social Media', 'Cybersecurity', 'Gaming'
];

// Top Tech Companies and their famous projects
const TOP_COMPANIES_PROJECTS = {
    'Web Development': [
        { company: '🔍 Google', color: 'from-red-500 to-orange-500', projects: [
            { name: 'Gmail Clone', tech: ['React', 'Node.js', 'MongoDB'], tools: ['Redux', 'Socket.io'] },
            { name: 'YouTube Lite', tech: ['React', 'Firebase', 'FFmpeg'], tools: ['Streaming', 'CDN'] },
            { name: 'Drive-like Storage', tech: ['React', 'Express', 'AWS S3'], tools: ['File Upload', 'Cloud'] }
        ]},
        { company: '☁️ Microsoft', color: 'from-blue-500 to-cyan-500', projects: [
            { name: 'Office Collaboration App', tech: ['React', 'Azure', 'TypeScript'], tools: ['Real-time Collab', 'WebSocket'] },
            { name: 'OneDrive Clone', tech: ['Node.js', 'PostgreSQL', 'Azure'], tools: ['File Sync', 'Versioning'] }
        ]},
        { company: '📦 Amazon', color: 'from-orange-400 to-amber-600', projects: [
            { name: 'E-commerce Platform', tech: ['React', 'Node.js', 'DynamoDB'], tools: ['Payment', 'Search'] },
            { name: 'Product Recommendation Engine', tech: ['Node.js', 'ML', 'Redis'], tools: ['Analytics', 'Cache'] }
        ]}
    ],
    'Machine Learning / AI': [
        { company: '🤖 Google', color: 'from-red-500 to-orange-500', projects: [
            { name: 'Image Recognition', tech: ['Python', 'TensorFlow', 'CNN'], tools: ['OpenCV', 'Keras'] },
            { name: 'NLP Chatbot', tech: ['Python', 'PyTorch', 'BERT'], tools: ['Hugging Face', 'NLTK'] },
            { name: 'Recommendation System', tech: ['Python', 'Scikit-learn', 'Pandas'], tools: ['Collaborative Filter'] }
        ]},
        { company: '🧠 Meta', color: 'from-blue-600 to-indigo-600', projects: [
            { name: 'Face Detection Model', tech: ['PyTorch', 'Computer Vision'], tools: ['OpenCV', 'ONNX'] }
        ]},
        { company: '⚡ Tesla', color: 'from-red-600 to-pink-600', projects: [
            { name: 'Object Detection for Autonomous Vehicles', tech: ['Python', 'TensorFlow', 'YOLO'], tools: ['ROS', 'LIDAR'] }
        ]}
    ],
    'Blockchain': [
        { company: '₿ Binance', color: 'from-yellow-400 to-yellow-600', projects: [
            { name: 'DEX (Decentralized Exchange)', tech: ['Solidity', 'Web3.js', 'React'], tools: ['Ethereum', 'Smart Contracts'] },
            { name: 'Token Launch Platform', tech: ['Solidity', 'Python', 'Node.js'], tools: ['Contract Audit'] }
        ]},
        { company: '🔐 Ethereum', color: 'from-indigo-500 to-purple-600', projects: [
            { name: 'NFT Marketplace', tech: ['Solidity', 'React', 'IPFS'], tools: ['MetaMask', 'Web3'] }
        ]}
    ],
    'IoT & Embedded': [
        { company: '🏢 Cisco', color: 'from-blue-600 to-blue-800', projects: [
            { name: 'Smart Home System', tech: ['Arduino', 'Python', 'MQTT'], tools: ['IoT Protocol', 'Cloud'] },
            { name: 'Industrial Monitoring', tech: ['C++', 'Raspberry Pi', 'Real-time OS'], tools: ['Sensors', 'Analytics'] }
        ]},
        { company: '🚀 SpaceX', color: 'from-slate-700 to-black', projects: [
            { name: 'Telemetry Dashboard', tech: ['Python', 'Real-time Systems'], tools: ['Data Streaming'] }
        ]}
    ],
    'Cybersecurity': [
        { company: '🔒 Google', color: 'from-red-500 to-orange-500', projects: [
            { name: 'Intrusion Detection System', tech: ['Python', 'ML', 'Network'], tools: ['Snort', 'Tcpdump'] },
            { name: 'Vulnerability Scanner', tech: ['Python', 'Node.js', 'Security'], tools: ['OWASP', 'Burp'] }
        ]},
        { company: '🛡️ Microsoft', color: 'from-blue-500 to-cyan-500', projects: [
            { name: 'Password Manager', tech: ['React', 'Encryption', 'Azure'], tools: ['Cryptography'] }
        ]}
    ],
    'Cloud Computing': [
        { company: '☁️ AWS', color: 'from-orange-500 to-red-600', projects: [
            { name: 'Cloud-based CRM', tech: ['Node.js', 'DynamoDB', 'Lambda'], tools: ['Serverless', 'API'] },
            { name: 'Auto-scaling Chat App', tech: ['Node.js', 'ElastiCache', 'RDS'], tools: ['Load Balancer'] }
        ]},
        { company: '☁️ Google Cloud', color: 'from-red-500 to-orange-500', projects: [
            { name: 'Data Analytics Pipeline', tech: ['Python', 'BigQuery', 'Dataflow'], tools: ['ETL', 'Visualization'] }
        ]}
    ]
};

const Projects: React.FC = () => {
  const [domain, setDomain] = useState('Web Development');
  const [interests, setInterests] = useState('');
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<ProjectIdea[]>([]);
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

  const handleGenerate = async () => {
    if (!interests) return;
    setLoading(true);
    try {
      const data = await generateProjectIdeas(interests, domain);
      setIdeas(data);
    } catch (e) {
      alert("Failed to generate ideas.");
    } finally {
      setLoading(false);
    }
  };

  const companyProjects = TOP_COMPANIES_PROJECTS[domain as keyof typeof TOP_COMPANIES_PROJECTS] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-slate-50 p-6 max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">🎯 AI Project Generator</h2>
        <p className="text-slate-700 text-lg font-semibold">Generate unique projects inspired by top tech companies with complete architecture</p>
      </div>

      <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-8 rounded-2xl shadow-xl border-2 border-purple-200">
        <div className="grid md:grid-cols-3 gap-6 items-end">
          <div>
            <label className="block text-sm font-bold text-purple-900 mb-2 flex items-center gap-2">
              <Layers className="h-5 w-5 text-purple-700" />
              Select Domain
            </label>
            <select 
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full p-3 bg-white text-slate-900 border-2 border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all shadow-sm font-bold hover:border-purple-400"
            >
              <option>Web Development</option>
              <option>Machine Learning / AI</option>
              <option>Blockchain</option>
              <option>IoT & Embedded</option>
              <option>Cybersecurity</option>
              <option>Cloud Computing</option>
            </select>
          </div>
          <div className="md:col-span-1 relative" ref={dropdownRef}>
            <label className="block text-sm font-bold text-purple-900 mb-2 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-pink-700" />
              Select Interests
            </label>
            <div className="relative">
                <input 
                type="text" 
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                placeholder="e.g. Healthcare, FinTech..."
                className="w-full p-3 bg-white text-slate-900 border-2 border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none pr-10 transition-all shadow-sm font-bold hover:border-purple-400"
                />
                <button 
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="absolute right-3 top-3.5 text-purple-400 hover:text-purple-700 transition-colors"
                >
                    <ChevronDown className="h-5 w-5" />
                </button>
            </div>
            
            {showDropdown && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white border-2 border-purple-200 rounded-xl shadow-2xl z-20 max-h-60 overflow-y-auto">
                    {INTERESTS_LIST.map((item) => (
                        <button
                            key={item}
                            onClick={() => {
                                setInterests(item);
                                setShowDropdown(false);
                            }}
                            className="w-full text-left px-4 py-3 text-sm font-bold text-slate-800 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 hover:text-purple-900 transition-all border-b border-slate-100 last:border-0"
                        >
                            {item}
                        </button>
                    ))}
                    <div className="p-3 text-xs text-slate-500 border-t-2 border-slate-100 italic text-center bg-slate-50 font-bold">
                        Type for custom interests
                    </div>
                </div>
            )}
          </div>
          <button 
            onClick={handleGenerate}
            disabled={loading || !interests}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3.5 px-8 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 text-lg"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                Generating...
              </>
            ) : (
              <>
                Generate <Zap className="h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Top Companies Projects Section */}
      {!loading && companyProjects.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Building2 className="h-6 w-6 text-purple-600" />
            💼 Top Companies Projects in {domain}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {companyProjects.map((company, compIdx) => (
              <div key={compIdx} className={`bg-gradient-to-br ${company.color} p-5 rounded-xl shadow-lg border-2 border-white text-white`}>
                <h4 className="text-lg font-bold mb-4">{company.company}</h4>
                {company.projects.map((proj, projIdx) => (
                  <div key={projIdx} className="bg-black/20 rounded-lg p-3 mb-2 last:mb-0 backdrop-blur-sm">
                    <p className="font-bold text-sm mb-1">{proj.name}</p>
                    <div className="flex gap-1 flex-wrap mb-2">
                      {proj.tech.map((t, tIdx) => (
                        <span key={tIdx} className="text-xs bg-white/30 px-2 py-1 rounded font-semibold">
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-white/90">Tools: {proj.tools.join(', ')}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {ideas.length === 0 && !loading && (
        <div className="text-center py-16">
          <div className="inline-block p-8 bg-white rounded-2xl shadow-lg border-2 border-purple-200">
            <Lightbulb className="h-16 w-16 text-purple-400 mx-auto mb-4 animate-pulse" />
            <p className="text-slate-600 font-bold text-lg">Select domain & interests to generate AI-powered project ideas!</p>
          </div>
        </div>
      )}

      {loading && (
        <div className="text-center py-16">
          <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-slate-600 font-bold text-lg">Generating amazing project ideas...</p>
        </div>
      )}

      {ideas.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Code className="h-6 w-6 text-pink-600" />
            🎓 Your AI-Generated Projects
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 overflow-hidden flex flex-col hover:shadow-2xl hover:border-pink-300 transition-all transform hover:scale-105 group"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="h-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-purple-600 transition-colors flex-1 pr-2">
                      {idea.title}
                    </h3>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full shrink-0 ${
                      idea.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 border-2 border-green-300' :
                      idea.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300' :
                      'bg-red-100 text-red-700 border-2 border-red-300'
                    }`}>
                      {idea.difficulty}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm mb-5 flex-1 leading-relaxed">{idea.description}</p>
                  
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Layers className="h-4 w-4" /> Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {idea.techStack.map((tech, i) => (
                          <span 
                            key={i} 
                            className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-bold rounded-lg border-2 border-purple-300 hover:border-purple-400 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <GitBranch className="h-4 w-4" /> Implementation Roadmap
                      </h4>
                      <ul className="space-y-2">
                        {idea.roadmap.slice(0, 4).map((step, i) => (
                          <li key={i} className="text-xs text-slate-700 flex items-start gap-2 bg-gradient-to-r from-purple-50 to-pink-50 p-2 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-all border border-purple-200">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center text-[10px] font-bold mt-0.5">
                              {i + 1}
                            </span>
                            <span className="flex-1 font-semibold">{step}</span>
                          </li>
                        ))}
                        {idea.roadmap.length > 4 && (
                          <li className="text-xs text-purple-600 font-bold text-center pt-1">
                            +{idea.roadmap.length - 4} more steps
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;