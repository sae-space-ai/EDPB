import React from 'react';
import { getAgentStatus } from '../utils/agent';
import { SUBAGENT_REGISTRY, SUBAGENT_ICONS, SUBAGENT_COLORS } from '../data/subagents';
import { FREE_PROVIDERS, PROVIDER_COLORS } from '../data/providers';

export const Dashboard: React.FC = () => {
  const status = getAgentStatus();

  return (
    <div className="space-y-6">
      {/* Agent Status Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        <div className="relative">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{status.agent}</h1>
                <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs font-medium">v{status.version}</span>
              </div>
              <p className="text-blue-200 text-lg">{status.role}</p>
              <p className="text-blue-300/70 text-sm mt-1">EDPB Support Pool of Experts 2025-2030</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/50 text-green-300 px-4 py-2 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                {status.status.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard icon="🤖" label="Sub-Agents" value={status.subagents} color="from-blue-500 to-indigo-600" />
        <StatCard icon="🔌" label="LLM Providers" value={status.total_free_apis} color="from-purple-500 to-violet-600" />
        <StatCard icon="🧠" label="Expertise" value={status.expertise_fields} color="from-emerald-500 to-teal-600" />
        <StatCard icon="🔑" label="Keywords" value={status.keywords} color="from-amber-500 to-orange-600" />
        <StatCard icon="🚀" label="Projects" value={status.projects} color="from-cyan-500 to-sky-600" />
        <StatCard icon="📚" label="Publications" value={status.publications} color="from-rose-500 to-pink-600" />
      </div>

      {/* Architecture Diagram */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🏗️</span> Hub-and-Spoke Architecture
        </h2>
        <div className="relative">
          {/* Central Hub */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-slate-800 to-blue-900 text-white rounded-2xl p-4 shadow-xl text-center min-w-[200px]">
              <div className="text-2xl mb-1">🧠</div>
              <div className="font-bold text-sm">ARCHITECT HUB</div>
              <div className="text-xs text-blue-200">EDPB-ARCHITECT-2025</div>
              <div className="text-xs text-blue-300/60 mt-1">Orquestador Central</div>
            </div>
          </div>
          {/* Sub-agents grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(SUBAGENT_REGISTRY).map(([name, agent]) => (
              <div key={name} className={`bg-gradient-to-br ${SUBAGENT_COLORS[name]} rounded-xl p-3 text-white shadow-md`}>
                <div className="text-xl mb-1">{SUBAGENT_ICONS[name]}</div>
                <div className="font-bold text-xs truncate">{name.replace(/_/g, ' ')}</div>
                <div className="text-[10px] opacity-80 mt-1 line-clamp-2">{agent.description}</div>
                <div className="mt-2 text-[10px] bg-white/20 rounded px-1.5 py-0.5 inline-block">
                  → {agent.provider_preferred}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Provider Overview */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🔌</span> Free LLM Providers ({status.total_free_apis})
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Object.entries(FREE_PROVIDERS).map(([name, provider]) => (
            <div key={name} className={`bg-gradient-to-br ${PROVIDER_COLORS[name]} rounded-xl p-3 text-white`}>
              <div className="font-bold text-sm capitalize">{name}</div>
              <div className="text-[10px] opacity-90 truncate mt-1">{provider.model}</div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">{provider.rpm} RPM</span>
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">{provider.context}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Candidate Info */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>👤</span> Candidate Profile
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <InfoRow label="Name" value={status.candidate} />
            <InfoRow label="Email" value={status.email} />
            <InfoRow label="Agent" value={status.agent} />
            <InfoRow label="Version" value={`v${status.version}`} />
          </div>
          <div className="space-y-3">
            <InfoRow label="Role" value={status.role} />
            <InfoRow label="AI Act Articles" value={`${status.ai_act_articles_mapped} mapped`} />
            <InfoRow label="Declaration" value="✓ Honour Declaration Valid" />
            <InfoRow label="Selection" value="✓ Criteria Fulfilled" />
          </div>
        </div>
      </div>

      {/* Agent Actions */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>⚡</span> Agent Capabilities (10 actions)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { action: 'task', desc: 'Dispatch sub-agent' },
            { action: 'generate_evidence', desc: 'AI Act evidence w/ hash' },
            { action: 'analyze_regulation', desc: 'Regulatory text analysis' },
            { action: 'map_expertise', desc: 'Task → expertise mapping' },
            { action: 'validate_declaration', desc: 'Honour declaration check' },
            { action: 'cv_summary', desc: 'CV Europass summary' },
            { action: 'training_module', desc: 'Training content generator' },
            { action: 'ai_act_articles', desc: '67 articles mapped' },
            { action: 'list_subagents', desc: '8 specialized agents' },
            { action: 'list_providers', desc: '7 free LLM providers' },
          ].map(({ action, desc }) => (
            <div key={action} className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all">
              <code className="text-sm text-blue-700 font-mono font-bold">{action}</code>
              <p className="text-xs text-gray-500 mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: string; label: string; value: number; color: string }> = ({ icon, label, value, color }) => (
  <div className={`bg-gradient-to-br ${color} rounded-xl p-4 text-white shadow-lg`}>
    <div className="text-2xl mb-1">{icon}</div>
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-xs opacity-90">{label}</div>
  </div>
);

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-start gap-2">
    <span className="text-sm font-medium text-gray-500 min-w-[110px]">{label}:</span>
    <span className="text-sm text-gray-800">{value}</span>
  </div>
);
