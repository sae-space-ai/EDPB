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
import { GenerativeModels } from './components/GenerativeModels';
import { CybersecurityTools } from './components/CybersecurityTools';
import { VectorDatabases } from './components/VectorDatabases';
import { AutoTest } from './components/AutoTest';
import { EcosystemV4 } from './components/EcosystemV4';
import { RealTest } from './components/RealTest';
import EnhancedGigafactorySearcherComponent from './components/EnhancedGigafactorySearcher';
import TestRunner from './components/TestRunner';
import SystemStatus from './components/SystemStatus';

type Tab = 'status' | 'dashboard' | 'ai-act' | 'subagents' | 'providers' | 'generative' | 'cybersecurity' | 'vectordb' | 'gigafactory' | 'enhanced-search' | 'expertise' | 'evidence' | 'autotest' | 'realtest' | 'testrunner' | 'ecosystem' | 'projects' | 'publications' | 'training';

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'status', label: 'Status', icon: '🔍' },
  { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
  { id: 'testrunner', label: 'Test 100', icon: '🧪' },
  { id: 'realtest', label: 'Real Test', icon: '🔥' },
  { id: 'ecosystem', label: 'Ecosystem', icon: '🌐' },
  { id: 'enhanced-search', label: 'Search', icon: '🔍' },
  { id: 'ai-act', label: 'AI Act', icon: '🗺️' },
  { id: 'subagents', label: 'Agents', icon: '🤖' },
  { id: 'generative', label: 'LLMs', icon: '🧠' },
  { id: 'cybersecurity', label: 'Security', icon: '🛡️' },
  { id: 'gigafactory', label: 'Factory', icon: '🏭' },
  { id: 'providers', label: 'Providers', icon: '🔌' },
  { id: 'vectordb', label: 'VectorDB', icon: '🗄️' },
  { id: 'expertise', label: 'Expertise', icon: '🎯' },
  { id: 'evidence', label: 'Evidence', icon: '🔬' },
  { id: 'autotest', label: 'AutoTest', icon: '⚡' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
  { id: 'publications', label: 'Papers', icon: '📚' },
  { id: 'training', label: 'Training', icon: '🎓' },
];

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'status': return <SystemStatus />;
      case 'dashboard': return <Dashboard />;
      case 'ecosystem': return <EcosystemV4 />;
      case 'ai-act': return <AIActMapper />;
      case 'subagents': return <SubAgents />;
      case 'providers': return <Providers />;
      case 'generative': return <GenerativeModels />;
      case 'cybersecurity': return <CybersecurityTools />;
      case 'vectordb': return <VectorDatabases />;
      case 'gigafactory': return <GigafactorySearcher />;
      case 'enhanced-search': return <EnhancedGigafactorySearcherComponent />;
      case 'expertise': return <Expertise />;
      case 'evidence': return <EvidenceEngine />;
      case 'autotest': return <AutoTest />;
      case 'realtest': return <RealTest />;
      case 'testrunner': return <TestRunner />;
      case 'projects': return <Projects />;
      case 'publications': return <Publications />;
      case 'training': return <Training />;
      default: return <SystemStatus />;
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
              <h3 className="font-bold text-gray-800 mb-2">SUPERALGORITMO-INTEGRAL v3.0</h3>
              <p className="text-sm text-gray-500">
                Mega-Agente de Ciberseguridad Implacable + Arquitecto Algorítmico.
                7 modelos IA generativa, 8 herramientas ciberseguridad, 3 bases vectoriales.
                EDPB Support Pool of Experts 2025-2030.
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
                Hub-and-Spoke + Microsoft Agent Framework<br />
                PostgreSQL 17 + pgvector (WAL + PITR)<br />
                Qwen3 + DeepSeek-V4 + GLM-5.2<br />
                Strix + Nuclei + PentestGPT + Faraday
              </p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              © 2025 SUPERALGORITMO-INTEGRAL v3.0 · MEGAAGENTE CIBERSEGURIDAD IMPLACABLE · Human Oversight · Traceability · Auditability · Evidence-Based Compliance
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
