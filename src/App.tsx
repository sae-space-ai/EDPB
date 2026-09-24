import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { AIActMapper } from './components/AIActMapper';
import { Expertise } from './components/Expertise';
import { EvidenceEngine } from './components/EvidenceEngine';
import { SubAgents } from './components/SubAgents';
import { Providers } from './components/Providers';
import { Projects } from './components/Projects';
import { Publications } from './components/Publications';
import { Training } from './components/Training';
import { GigafactorySearcher } from './components/GigafactorySearcher';

type Tab = 'dashboard' | 'ai-act' | 'subagents' | 'providers' | 'expertise' | 'evidence' | 'gigafactory' | 'projects' | 'publications' | 'training';

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
  { id: 'ai-act', label: 'AI Act', icon: '🗺️' },
  { id: 'subagents', label: 'Sub-Agents', icon: '🤖' },
  { id: 'providers', label: 'Providers', icon: '🔌' },
  { id: 'gigafactory', label: 'Gigafactory', icon: '🏭' },
  { id: 'expertise', label: 'Expertise', icon: '🎯' },
  { id: 'evidence', label: 'Evidence', icon: '🔬' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
  { id: 'publications', label: 'Publications', icon: '📚' },
  { id: 'training', label: 'Training', icon: '🎓' },
];

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'ai-act': return <AIActMapper />;
      case 'subagents': return <SubAgents />;
      case 'providers': return <Providers />;
      case 'gigafactory': return <GigafactorySearcher />;
      case 'expertise': return <Expertise />;
      case 'evidence': return <EvidenceEngine />;
      case 'projects': return <Projects />;
      case 'publications': return <Publications />;
      case 'training': return <Training />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-slate-800 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xs">EU</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800 leading-tight">EDPB-ARCHITECT-2025</h1>
                <p className="text-xs text-gray-500 hidden sm:block">v2.0 · Arquitecto Algorítmico · Manuel Gago Fernández</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-0.5">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-1">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-gray-200 bg-white shadow-lg">
            <div className="px-4 py-3 space-y-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-3 ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">EDPB-ARCHITECT-2025 v2.0</h3>
              <p className="text-sm text-gray-500">
                Autonomous Algorithmic Architect + Orchestrator of 8 Specialized Sub-Agents.
                Evidence-based compliance and AI governance for the EDPB Support Pool of Experts 2025-2030.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Candidate</h3>
              <p className="text-sm text-gray-600">Manuel Gago Fernández</p>
              <p className="text-sm text-gray-500">pergolessi9@gmail.com</p>
              <p className="text-sm text-gray-500">+34 641 118 025</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Architecture</h3>
              <p className="text-sm text-gray-500">
                Hub-and-Spoke Pattern<br />
                8 Sub-Agents + 7 LLM Providers<br />
                SAE Evidence Engine · SHA-256 Hashing<br />
                Human Oversight · Traceability · Auditability
              </p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              © 2025 EDPB-ARCHITECT-2025 v2.0 · Algorithmic Architect · Human Oversight · Traceability · Auditability · Evidence-Based Compliance
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
