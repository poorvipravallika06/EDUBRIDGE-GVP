import React, { useState, useRef, useEffect } from 'react';
import { generateProjectIdeas } from '../services/geminiServices';
import { ProjectIdea } from '../types';
import { Loader2, Lightbulb, Layers, GitBranch, ArrowRight, ChevronDown, Building2, Code, Sparkles, Star, Clock, TrendingUp, Zap } from 'lucide-react';

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

  const CustomSelect = ({ 
    label, 
    icon: Icon, 
    value, 
    onChange, 
    options, 
    isOpen, 
    setIsOpen,
    dropdownRef,
    color = 'indigo'
  }: any) => (
    <div className="relative" ref={dropdownRef}>
      <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 text-${color}-600 dark:text-${color}-400 flex items-center gap-2`}>
        <Icon className="h-4 w-4" />
        {label}
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full px-4 py-2.5 rounded-lg border-2 transition-all duration-200 flex items-center justify-between
          font-medium text-sm
          bg-white dark:bg-slate-800
          border-slate-200 dark:border-slate-700
          hover:border-${color}-300 dark:hover:border-${color}-600
          focus:outline-none focus:ring-2 focus:ring-${color}-500 focus:ring-offset-0 dark:focus:ring-offset-slate-900
          ${isOpen ? `border-${color}-400 dark:border-${color}-500` : ''}
          text-slate-900 dark:text-slate-100
        `}
      >
        <span>{value}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`
          absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 
          border-2 border-${color}-200 dark:border-${color}-700
          rounded-lg shadow-xl z-30 max-h-48 overflow-y-auto
        `}>
          {options.map((option: string) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`
                w-full text-left px-4 py-2.5 text-sm font-medium border-b border-slate-100 dark:border-slate-700 last:border-0
                transition-colors duration-150
                hover:bg-${color}-50 dark:hover:bg-${color}-900/20
                text-slate-900 dark:text-slate-100
                ${value === option ? `bg-${color}-100 dark:bg-${color}-900/30 text-${color}-700 dark:text-${color}-300` : ''}
              `}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 px-4 lg:px-8 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-6 w-6 text-white animate-pulse" />
            <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full backdrop-blur-sm border border-white/30">
              AI-Powered Ideas
            </span>
            <Sparkles className="h-6 w-6 text-white animate-pulse" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-white text-center mb-3">
            Generate Project Ideas
          </h1>
          <p className="text-lg text-indigo-100 text-center max-w-2xl mx-auto">
            Get unique, production-ready project ideas from top tech companies with complete architecture, tech stack, and implementation roadmaps
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
        {/* Filters Section */}
        <div className="mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 lg:p-8 transition-all">
            <div className="grid lg:grid-cols-4 gap-4 items-end mb-6">
              <CustomSelect
                label="Company"
                icon={Building2}
                value={company}
                onChange={setCompany}
                options={TOP_TECH_COMPANIES.map(c => c.name)}
                isOpen={showCompanyDropdown}
                setIsOpen={setShowCompanyDropdown}
                dropdownRef={companyDropdownRef}
                color="blue"
              />

              <CustomSelect
                label="Domain"
                icon={Code}
                value={domain}
                onChange={setDomain}
                options={availableDomains}
                isOpen={showDomainDropdown}
                setIsOpen={setShowDomainDropdown}
                dropdownRef={domainDropdownRef}
                color="purple"
              />

              <div className="lg:col-span-1 relative" ref={interestDropdownRef}>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-pink-600 dark:text-pink-400 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Interests
                </label>
                <input
                  type="text"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  onFocus={() => setShowInterestDropdown(true)}
                  placeholder="Type or select..."
                  className={`
                    w-full px-4 py-2.5 rounded-lg border-2 transition-all duration-200 font-medium text-sm
                    bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100
                    border-slate-200 dark:border-slate-600
                    hover:border-pink-300 dark:hover:border-pink-600
                    focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-0 dark:focus:ring-offset-slate-800
                    placeholder-slate-400 dark:placeholder-slate-500
                  `}
                />
                
                {showInterestDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border-2 border-pink-200 dark:border-pink-700 rounded-lg shadow-xl z-30 max-h-48 overflow-y-auto">
                    {INTERESTS_LIST.map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setInterests(item);
                          setShowInterestDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm font-medium border-b border-slate-100 dark:border-slate-700 last:border-0 hover:bg-pink-50 dark:hover:bg-pink-900/20 text-slate-900 dark:text-slate-100 transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading || !interests}
                className={`
                  col-span-full lg:col-span-1 px-6 py-2.5 rounded-lg font-bold text-white
                  transition-all duration-200 transform
                  flex items-center justify-center gap-2
                  ${loading || !interests
                    ? 'bg-slate-300 dark:bg-slate-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg active:scale-95'
                  }
                `}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" />
                    Generate Ideas
                  </>
                )}
              </button>
            </div>

            {/* Company Domains Info */}
            {availableDomains.length > 0 && (
              <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-3">
                  📍 {company} specializes in:
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableDomains.map(d => (
                    <span key={d} className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-full border border-indigo-200 dark:border-indigo-700">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Empty State */}
        {ideas.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Ready to Generate Ideas?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-md">
                Select a company, domain, and your interests, then click "Generate Ideas" to create personalized project recommendations.
              </p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 border-4 border-indigo-200 dark:border-indigo-900 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400 font-medium">
              Generating amazing project ideas...
            </p>
          </div>
        )}

        {/* Results Grid */}
        {ideas.length > 0 && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {ideas.length} Projects Generated
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Pick one and start building
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ideas.map((idea, idx) => (
                <div
                  key={idx}
                  className="
                    bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl
                    border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600
                    overflow-hidden transition-all duration-300 transform hover:scale-105 hover:-translate-y-1
                    flex flex-col group
                  "
                >
                  {/* Color Top Bar */}
                  <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                  <div className="p-6 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex-1">
                        {idea.title}
                      </h3>
                      <span className={`
                        px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap
                        ${idea.difficulty === 'Beginner' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : idea.difficulty === 'Intermediate'
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                        }
                      `}>
                        {idea.difficulty}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed flex-1">
                      {idea.description}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 mb-5 pb-5 border-b border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>4-8 weeks</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3.5 w-3.5" />
                        <span>Portfolio</span>
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-2">
                        <Layers className="h-3.5 w-3.5" />
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {idea.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-md hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Roadmap Preview */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-2">
                        <GitBranch className="h-3.5 w-3.5" />
                        Implementation Steps
                      </h4>
                      <div className="space-y-2">
                        {idea.roadmap.slice(0, 3).map((step, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                              {i + 1}
                            </div>
                            <span className="text-xs text-slate-700 dark:text-slate-300">{step}</span>
                          </div>
                        ))}
                        {idea.roadmap.length > 3 && (
                          <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold pt-1">
                            +{idea.roadmap.length - 3} more steps
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-700 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors">
                    <button className="w-full flex items-center justify-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                      View Full Details
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
