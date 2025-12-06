import React, { useState } from 'react';
import { Copy, Check, Loader2, FileText, Code, BookOpen, Sparkles, Download, Upload, RotateCcw, Share2, Zap, Palette } from 'lucide-react';

interface ConversionResult {
  markdown: string;
  html: string;
  json: string;
}

const Notes: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'markdown' | 'html' | 'json'>('markdown');
  const [inputFormat, setInputFormat] = useState<'plain' | 'markdown' | 'html'>('plain');

  const convertNotes = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    
    // Simulate conversion
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const markdown = `# ${input.split('\n')[0] || 'Untitled'}\n\n${input}`;
    const html = `<h1>${input.split('\n')[0] || 'Untitled'}</h1>\n<p>${input.replace(/\n/g, '</p>\n<p>')}</p>`;
    const json = JSON.stringify({
      title: input.split('\n')[0] || 'Untitled',
      content: input.split('\n'),
      timestamp: new Date().toISOString()
    }, null, 2);

    setResult({ markdown, html, json });
    setLoading(false);
  };

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    setCopied(format);
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadContent = (content: string, filename: string) => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
    setActiveTab('markdown');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 max-w-7xl mx-auto space-y-8">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Header */}
      <div className="relative text-center space-y-3">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-6 w-6 text-cyan-400" />
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">📝 Notes Converter</h2>
          <Sparkles className="h-6 w-6 text-blue-400" />
        </div>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">Convert your notes between Markdown, HTML, and JSON formats instantly</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 p-8 rounded-2xl shadow-2xl border-2 border-cyan-500/30 backdrop-blur-xl h-96 flex flex-col">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-blue-500/5 pointer-events-none"></div>
          
          <div className="relative flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                <FileText className="h-5 w-5 text-cyan-400" />
                Input Notes
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setInputFormat(inputFormat === 'plain' ? 'markdown' : 'plain')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    inputFormat === 'markdown' 
                      ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400' 
                      : 'bg-slate-700/50 text-slate-400 border border-slate-600'
                  }`}
                >
                  {inputFormat === 'plain' ? '📄 Plain' : '✨ Markdown'}
                </button>
              </div>
            </div>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type or paste your notes here... (Markdown syntax supported)"
              className="flex-1 px-4 py-3 bg-slate-700/60 text-slate-100 border-2 border-cyan-500/50 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 focus:outline-none transition-all placeholder-slate-500 shadow-lg resize-none"
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={convertNotes}
                disabled={!input.trim() || loading}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4" />
                    Converting...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" />
                    Convert
                  </>
                )}
              </button>

              {input && (
                <button
                  onClick={handleClear}
                  className="px-4 py-2 bg-slate-700/60 hover:bg-slate-700 text-slate-300 font-bold rounded-lg transition-all flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 p-8 rounded-2xl shadow-2xl border-2 border-blue-500/30 backdrop-blur-xl h-96 flex flex-col">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none"></div>
          
          <div className="relative flex flex-col h-full">
            <h3 className="text-lg font-bold text-blue-300 mb-4 flex items-center gap-2">
              <Code className="h-5 w-5 text-blue-400" />
              Output
            </h3>

            {result ? (
              <>
                {/* Format Tabs */}
                <div className="flex gap-2 mb-4">
                  {(['markdown', 'html', 'json'] as const).map((format) => (
                    <button
                      key={format}
                      onClick={() => setActiveTab(format)}
                      className={`px-3 py-2 rounded-lg text-sm font-bold transition-all ${
                        activeTab === format
                          ? 'bg-blue-500/30 text-blue-300 border border-blue-400'
                          : 'bg-slate-700/50 text-slate-400 border border-slate-600 hover:border-slate-500'
                      }`}
                    >
                      {format === 'markdown' && '📋 MD'}
                      {format === 'html' && '<> HTML'}
                      {format === 'json' && '{ } JSON'}
                    </button>
                  ))}
                </div>

                {/* Output Display */}
                <pre className="flex-1 overflow-auto px-4 py-3 bg-slate-700/60 text-slate-100 border-2 border-blue-500/50 rounded-xl text-xs font-mono mb-4 bg-slate-900">
                  {activeTab === 'markdown' && result.markdown}
                  {activeTab === 'html' && result.html}
                  {activeTab === 'json' && result.json}
                </pre>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(
                      activeTab === 'markdown' ? result.markdown :
                      activeTab === 'html' ? result.html : result.json,
                      activeTab
                    )}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg"
                  >
                    {copied === activeTab ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => downloadContent(
                      activeTab === 'markdown' ? result.markdown :
                      activeTab === 'html' ? result.html : result.json,
                      `notes.${activeTab === 'markdown' ? 'md' : activeTab === 'html' ? 'html' : 'json'}`
                    )}
                    className="px-4 py-2 bg-slate-700/60 hover:bg-slate-700 text-slate-300 font-bold rounded-lg transition-all flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 text-center">
                <BookOpen className="h-12 w-12 text-slate-600 mb-3" />
                <p className="text-slate-400 text-sm">Your converted notes will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 p-8 rounded-2xl shadow-2xl border-2 border-purple-500/30 backdrop-blur-xl">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 pointer-events-none"></div>
        
        <div className="relative">
          <h3 className="text-2xl font-bold text-purple-300 mb-6 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-400" />
            Supported Features
          </h3>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Markdown', desc: 'Full markdown syntax support', icon: '📋' },
              { title: 'HTML', desc: 'Convert to semantic HTML5', icon: '💻' },
              { title: 'JSON', desc: 'Structured data format', icon: '📊' },
              { title: 'Share', desc: 'Easy sharing & collaboration', icon: '🔗' }
            ].map((feature, idx) => (
              <div key={idx} className="p-4 bg-slate-700/50 rounded-xl border border-purple-400/30 hover:border-purple-400 transition-colors text-center">
                <div className="text-3xl mb-2">{feature.icon}</div>
                <p className="font-bold text-slate-200">{feature.title}</p>
                <p className="text-xs text-slate-400 mt-1">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
