import React, { useState, useRef, useEffect } from 'react';
import { generateProjectIdeas } from '../services/geminiServices';
import { ProjectIdea } from '../types';
import { Loader2, Lightbulb, Layers, GitBranch, ArrowRight, ChevronDown, Building2, Code } from 'lucide-react';

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
      
      // Enhance with company and techstack information
      const enhancedData = data.map(idea => ({
        ...idea,
        company: company,
        techStack: [...techStack, ...idea.techStack].slice(0, 6) // Merge tech stacks
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">🚀 AI Project Generator</h2>
        <p className="text-slate-600 text-lg">Get unique, plagiarism-free project ideas from top tech companies with architecture & roadmaps</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-indigo-200 backdrop-blur-sm">
        <div className="grid md:grid-cols-4 gap-4 items-end">
          {/* Company Selector */}
          <div className="relative" ref={companyDropdownRef}>
            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-purple-600" />
              Top Company
            </label>
            <div className="relative">
                <button 
                    onClick={() => setShowCompanyDropdown(!showCompanyDropdown)}
                    className="w-full p-3 bg-white text-slate-900 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all shadow-sm hover:border-purple-300 text-left font-medium"
                >
                    <div className="flex items-center justify-between">
                        <span>{company}</span>
                        <ChevronDown className="h-4 w-4" />
                    </div>
                </button>
                {showCompanyDropdown && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-2xl z-20 max-h-60 overflow-y-auto">
                        {TOP_TECH_COMPANIES.map((comp) => (
                            <button
                                key={comp.name}
                                onClick={() => {
                                    setCompany(comp.name);
                                    setShowCompanyDropdown(false);
                                }}
                                className="w-full text-left px-4 py-3 text-sm font-medium text-slate-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-700 transition-all border-b border-slate-50 last:border-0"
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
            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
              <Code className="h-4 w-4 text-indigo-600" />
              Domain
            </label>
            <div className="relative">
                <button 
                    onClick={() => setShowDomainDropdown(!showDomainDropdown)}
                    className="w-full p-3 bg-white text-slate-900 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all shadow-sm hover:border-indigo-300 text-left font-medium"
                >
                    <div className="flex items-center justify-between">
                        <span>{domain}</span>
                        <ChevronDown className="h-4 w-4" />
                    </div>
                </button>
                {showDomainDropdown && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-2xl z-20 max-h-60 overflow-y-auto">
                        {availableDomains.length > 0 ? (
                            availableDomains.map((domain) => (
                                <button
                                    key={domain}
                                    onClick={() => {
                                        setDomain(domain);
                                        setShowDomainDropdown(false);
                                    }}
                                    className="w-full text-left px-4 py-3 text-sm font-medium text-slate-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700 transition-all border-b border-slate-50 last:border-0"
                                >
                                    {domain}
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-sm text-slate-500">No domains available</div>
                        )}
                    </div>
                )}
            </div>
          </div>

          {/* Interest Selector */}
          <div className="md:col-span-1 relative" ref={interestDropdownRef}>
            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-purple-600" />
              Specific Interests
            </label>
            <div className="relative">
                <input 
                type="text" 
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                onFocus={() => setShowInterestDropdown(true)}
                placeholder="e.g. Healthcare, Finance..."
                className="w-full p-3 bg-white text-slate-900 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none pr-10 transition-all shadow-sm hover:border-purple-300 font-medium"
                />
                <button 
                    onClick={() => setShowInterestDropdown(!showInterestDropdown)}
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-purple-600 transition-colors"
                >
                    <ChevronDown className="h-5 w-5" />
                </button>
            </div>
            
            {showInterestDropdown && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-2xl z-20 max-h-60 overflow-y-auto">
                    {INTERESTS_LIST.map((item) => (
                        <button
                            key={item}
                            onClick={() => {
                                setInterests(item);
                                setShowInterestDropdown(false);
                            }}
                            className="w-full text-left px-4 py-3 text-sm font-medium text-slate-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-purple-700 transition-all border-b border-slate-50 last:border-0"
                        >
                            {item}
                        </button>
                    ))}
                    <div className="p-3 text-xs text-slate-400 border-t-2 border-slate-100 italic text-center bg-slate-50">
                        Type for custom interests
                    </div>
                </div>
            )}
          </div>

          {/* Generate Button */}
          <button 
            onClick={handleGenerate}
            disabled={loading || !interests}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3.5 px-8 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
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
        <div className="mt-6 pt-6 border-t-2 border-slate-100">
          <p className="text-xs text-slate-500 mb-2 font-semibold">📍 {company} works on:</p>
          <div className="flex flex-wrap gap-2">
            {availableDomains.map(domain => (
              <span key={domain} className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-bold rounded-full border border-purple-300">
                {domain}
              </span>
            ))}
          </div>
        </div>
      </div>

      {ideas.length === 0 && !loading && (
        <div className="text-center py-16">
          <div className="inline-block p-6 bg-white rounded-2xl shadow-lg border-2 border-slate-200">
            <Lightbulb className="h-16 w-16 text-indigo-400 mx-auto mb-4" />
            <p className="text-slate-600 font-medium">Select your domain and interests, then click "Generate Ideas" to get started!</p>
          </div>
        </div>
      )}

      {loading && (
        <div className="text-center py-16">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Generating amazing project ideas for you...</p>
        </div>
      )}

      {ideas.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 overflow-hidden flex flex-col hover:shadow-2xl hover:border-indigo-300 transition-all transform hover:scale-105 group"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors flex-1 pr-2">
                    {idea.title}
                  </h3>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full shrink-0 ${
                    idea.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 border-2 border-green-200' :
                    idea.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-200' :
                    'bg-purple-100 text-purple-700 border-2 border-purple-200'
                  }`}>
                    {idea.difficulty}
                  </span>
                </div>
                <p className="text-slate-600 text-sm mb-5 flex-1 leading-relaxed">{idea.description}</p>
                
                <div className="space-y-5">
                  <div>
                    <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Layers className="h-4 w-4" /> Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {idea.techStack.map((tech, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-xs font-medium rounded-lg border border-indigo-200 hover:border-indigo-300 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <GitBranch className="h-4 w-4" /> Implementation Roadmap
                    </h4>
                    <ul className="space-y-2">
                      {idea.roadmap.slice(0, 4).map((step, i) => (
                        <li key={i} className="text-xs text-slate-700 flex items-start gap-2 bg-slate-50 p-2 rounded-lg hover:bg-indigo-50 transition-colors">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold mt-0.5">
                            {i + 1}
                          </span>
                          <span className="flex-1">{step}</span>
                        </li>
                      ))}
                      {idea.roadmap.length > 4 && (
                        <li className="text-xs text-indigo-600 font-medium text-center pt-1">
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