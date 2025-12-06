import React, { useState, useRef, useEffect } from 'react';
import { generateProjectIdeas } from '../services/geminiServices';
import { ProjectIdea } from '../types';
import { Loader2, Lightbulb, Layers, GitBranch, ArrowRight, ChevronDown, Building2, Code, Sparkles } from 'lucide-react';

const INTERESTS_LIST = [
    'Healthcare', 'FinTech', 'EdTech', 'E-commerce', 
    'Sustainability', 'Smart Cities', 'Agriculture', 
    'Social Media', 'Cybersecurity', 'Gaming'
];

const TOP_TECH_COMPANIES = [
    { name: 'Google', domains: ['Machine Learning', 'Cloud Infrastructure', 'Web Development', 'Mobile Development'] },
    { name: 'Microsoft', domains: ['Cloud Computing', 'AI/ML', 'Enterprise Software', 'Gaming'] },
    { name: 'Amazon', domains: ['E-commerce', 'Cloud Services', 'Data Analytics', 'AI/ML'] },
    { name: 'Apple', domains: ['Mobile Development', 'UI/UX', 'Hardware Integration', 'Privacy'] },
    { name: 'Meta', domains: ['Web Development', 'AR/VR', 'Social Networks', 'AI/ML'] },
    { name: 'Netflix', domains: ['Streaming Technology', 'Recommendation Systems', 'Big Data', 'DevOps'] },
    { name: 'Uber', domains: ['Real-time Systems', 'Mobile Development', 'Geolocation', 'Analytics'] },
    { name: 'Airbnb', domains: ['Web Development', 'UI/UX', 'Search Algorithms', 'Real-time Data'] },
    { name: 'Tesla', domains: ['Embedded Systems', 'IoT', 'Machine Learning', 'Robotics'] },
    { name: 'SpaceX', domains: ['System Design', 'Real-time Systems', 'Robotics', 'Satellite Tech'] },
];

const TECH_STACKS = {
    'Web Development': ['React', 'Vue', 'Angular', 'Node.js', 'Express', 'Django', 'FastAPI', 'PostgreSQL'],
    'Machine Learning': ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'OpenCV'],
    'Mobile Development': ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Java', 'Xamarin'],
    'Cloud Infrastructure': ['AWS', 'Google Cloud', 'Azure', 'Kubernetes', 'Docker', 'Terraform'],
    'AI/ML': ['Python', 'TensorFlow', 'PyTorch', 'Keras', 'Transformers', 'Hugging Face'],
    'Data Analytics': ['Python', 'R', 'SQL', 'Apache Spark', 'Tableau', 'Power BI'],
    'DevOps': ['Docker', 'Kubernetes', 'CI/CD', 'Jenkins', 'GitLab', 'AWS', 'Terraform'],
};

const Projects: React.FC = () => {
  const [domain, setDomain] = useState('Web Development');
  const [company, setCompany] = useState('Google');
  const [interests, setInterests] = useState('');
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<ProjectIdea[]>([]);
  const [showDomainDropdown, setShowDomainDropdown] = useState(false);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [showInterestDropdown, setShowInterestDropdown] = useState(false);
  const domainDropdownRef = useRef<HTMLDivElement>(null);
  const companyDropdownRef = useRef<HTMLDivElement>(null);
  const interestDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
        if (domainDropdownRef.current && !domainDropdownRef.current.contains(event.target as Node)) {
            setShowDomainDropdown(false);
        }
        if (companyDropdownRef.current && !companyDropdownRef.current.contains(event.target as Node)) {
            setShowCompanyDropdown(false);
        }
        if (interestDropdownRef.current && !interestDropdownRef.current.contains(event.target as Node)) {
            setShowInterestDropdown(false);
        }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGenerate = async () => {
    if (!interests) return;
    setLoading(true);
    try {
      const selectedCompanyInfo = TOP_TECH_COMPANIES.find(c => c.name === company);
      const techStack = TECH_STACKS[domain as keyof typeof TECH_STACKS] || [];
      
      const data = await generateProjectIdeas(interests, domain);
      
      const enhancedData = data.map(idea => ({
        ...idea,
        company: company,
        techStack: [...techStack, ...idea.techStack].slice(0, 6)
      }));
      
      setIdeas(enhancedData);
    } catch (e) {
      alert("Failed to generate ideas.");
    } finally {
      setLoading(false);
    }
  };

  const selectedCompanyInfo = TOP_TECH_COMPANIES.find(c => c.name === company);
  const availableDomains = selectedCompanyInfo?.domains || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 max-w-7xl mx-auto space-y-8">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative text-center space-y-3">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-6 w-6 text-cyan-400" />
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">🚀 AI Project Generator</h2>
          <Sparkles className="h-6 w-6 text-purple-400" />
        </div>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">Get unique, plagiarism-free project ideas from top tech companies with complete architecture & implementation roadmaps</p>
      </div>

      <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-700/80 p-8 rounded-2xl shadow-2xl border-2 border-cyan-500/30 backdrop-blur-xl">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none"></div>
        
        <div className="relative grid md:grid-cols-4 gap-4 items-end">
          {/* Company Selector */}
          <div className="relative" ref={companyDropdownRef}>
            <label className="block text-sm font-bold text-cyan-300 mb-2 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-cyan-400" />
              Top Company
            </label>
            <div className="relative">
                <button 
                    onClick={() => setShowCompanyDropdown(!showCompanyDropdown)}
                    className="w-full p-3 bg-slate-700/60 text-slate-100 border-2 border-cyan-500/50 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 focus:outline-none transition-all shadow-lg hover:border-cyan-400 hover:bg-slate-700 text-left font-medium"
                >
                    <div className="flex items-center justify-between">
                        <span>{company}</span>
                        <ChevronDown className="h-4 w-4" />
                    </div>
                </button>
                {showCompanyDropdown && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-slate-700 border-2 border-cyan-500/50 rounded-xl shadow-2xl z-20 max-h-60 overflow-y-auto">
                        {TOP_TECH_COMPANIES.map((comp) => (
                            <button
                                key={comp.name}
                                onClick={() => {
                                    setCompany(comp.name);
                                    setShowCompanyDropdown(false);
                                }}
                                className="w-full text-left px-4 py-3 text-sm font-medium text-slate-200 hover:bg-gradient-to-r hover:from-cyan-600/20 hover:to-blue-600/20 hover:text-cyan-300 transition-all border-b border-slate-600 last:border-0"
                            >
                                {comp.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>
          </div>

          {/* Domain Selector */}
          <div className="relative" ref={domainDropdownRef}>
            <label className="block text-sm font-bold text-purple-300 mb-2 flex items-center gap-2">
              <Code className="h-4 w-4 text-purple-400" />
              Domain
            </label>
            <div className="relative">
                <button 
                    onClick={() => setShowDomainDropdown(!showDomainDropdown)}
                    className="w-full p-3 bg-slate-700/60 text-slate-100 border-2 border-purple-500/50 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 focus:outline-none transition-all shadow-lg hover:border-purple-400 hover:bg-slate-700 text-left font-medium"
                >
                    <div className="flex items-center justify-between">
                        <span>{domain}</span>
                        <ChevronDown className="h-4 w-4" />
                    </div>
                </button>
                {showDomainDropdown && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-slate-700 border-2 border-purple-500/50 rounded-xl shadow-2xl z-20 max-h-60 overflow-y-auto">
                        {availableDomains.length > 0 ? (
                            availableDomains.map((domain) => (
                                <button
                                    key={domain}
                                    onClick={() => {
                                        setDomain(domain);
                                        setShowDomainDropdown(false);
                                    }}
                                    className="w-full text-left px-4 py-3 text-sm font-medium text-slate-200 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 hover:text-purple-300 transition-all border-b border-slate-600 last:border-0"
                                >
                                    {domain}
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-sm text-slate-400">No domains available</div>
                        )}
                    </div>
                )}
            </div>
          </div>

          {/* Interest Selector */}
          <div className="md:col-span-1 relative" ref={interestDropdownRef}>
            <label className="block text-sm font-bold text-pink-300 mb-2 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-pink-400" />
              Specific Interests
            </label>
            <div className="relative">
                <input 
                type="text" 
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                onFocus={() => setShowInterestDropdown(true)}
                placeholder="e.g. Healthcare, Finance..."
                className="w-full p-3 bg-slate-700/60 text-slate-100 border-2 border-pink-500/50 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 focus:outline-none pr-10 transition-all shadow-lg hover:border-pink-400 hover:bg-slate-700 font-medium placeholder-slate-400"
                />
                <button 
                    onClick={() => setShowInterestDropdown(!showInterestDropdown)}
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-pink-400 transition-colors"
                >
                    <ChevronDown className="h-5 w-5" />
                </button>
            </div>
            
            {showInterestDropdown && (
                <div className="absolute top-full left-0 w-full mt-2 bg-slate-700 border-2 border-pink-500/50 rounded-xl shadow-2xl z-20 max-h-60 overflow-y-auto">
                    {INTERESTS_LIST.map((item) => (
                        <button
                            key={item}
                            onClick={() => {
                                setInterests(item);
                                setShowInterestDropdown(false);
                            }}
                            className="w-full text-left px-4 py-3 text-sm font-medium text-slate-200 hover:bg-gradient-to-r hover:from-pink-600/20 hover:to-rose-600/20 hover:text-pink-300 transition-all border-b border-slate-600 last:border-0"
                        >
                            {item}
                        </button>
                    ))}
                    <div className="p-3 text-xs text-slate-300 border-t-2 border-slate-600 italic text-center bg-slate-600/50">
                        Type for custom interests
                    </div>
                </div>
            )}
          </div>

          {/* Generate Button */}
          <button 
            onClick={handleGenerate}
            disabled={loading || !interests}
            className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-white font-bold py-3.5 px-8 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                Generating...
              </>
            ) : (
              <>
                Generate Ideas <Lightbulb className="h-5 w-5" />
              </>
            )}
          </button>
        </div>

        {/* Company & Domains Info */}
        <div className="mt-6 pt-6 border-t-2 border-cyan-500/30">
          <p className="text-xs text-slate-300 mb-2 font-semibold">📍 {company} works on:</p>
          <div className="flex flex-wrap gap-2">
            {availableDomains.map(domain => (
              <span key={domain} className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 text-xs font-bold rounded-full border border-cyan-400/50 hover:border-cyan-300 transition-colors">
                {domain}
              </span>
            ))}
          </div>
        </div>
      </div>

      {ideas.length === 0 && !loading && (
        <div className="text-center py-16">
          <div className="inline-block p-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl shadow-lg border-2 border-cyan-500/30">
            <Lightbulb className="h-16 w-16 text-cyan-400 mx-auto mb-4" />
            <p className="text-slate-300 font-medium">Select your domain and interests, then click "Generate Ideas" to get started!</p>
          </div>
        </div>
      )}

      {loading && (
        <div className="text-center py-16">
          <Loader2 className="h-12 w-12 animate-spin text-cyan-400 mx-auto mb-4" />
          <p className="text-slate-300 font-medium">Generating amazing project ideas for you...</p>
        </div>
      )}

      {ideas.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea, idx) => (
            <div 
              key={idx} 
              className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-2xl shadow-lg border-2 border-cyan-500/30 overflow-hidden flex flex-col hover:shadow-2xl hover:border-cyan-400/50 transition-all transform hover:scale-105 group backdrop-blur-sm"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-slate-100 leading-tight group-hover:text-cyan-300 transition-colors flex-1 pr-2">
                    {idea.title}
                  </h3>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full shrink-0 ${
                    idea.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-300 border-2 border-green-500/50' :
                    idea.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300 border-2 border-yellow-500/50' :
                    'bg-purple-500/20 text-purple-300 border-2 border-purple-500/50'
                  }`}>
                    {idea.difficulty}
                  </span>
                </div>
                <p className="text-slate-300 text-sm mb-5 flex-1 leading-relaxed">{idea.description}</p>
                
                <div className="space-y-5">
                  <div>
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Layers className="h-4 w-4" /> Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {idea.techStack.map((tech, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 text-xs font-medium rounded-lg border border-cyan-400/50 hover:border-cyan-300 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <GitBranch className="h-4 w-4" /> Implementation Roadmap
                    </h4>
                    <ul className="space-y-2">
                      {idea.roadmap.slice(0, 4).map((step, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-700/50 p-2 rounded-lg hover:bg-blue-500/10 transition-colors">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-bold mt-0.5">
                            {i + 1}
                          </span>
                          <span className="flex-1">{step}</span>
                        </li>
                      ))}
                      {idea.roadmap.length > 4 && (
                        <li className="text-xs text-cyan-400 font-medium text-center pt-1">
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
      )}
    </div>
  );
};

export default Projects;
