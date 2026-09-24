import React from 'react';
import { getAgentStatus } from '../utils/agent';

export const Dashboard: React.FC = () => {
  const status = getAgentStatus();

  return (
    <div className="space-y-6">
      {/* Agent Status Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{status.agent}</h1>
            <p className="text-blue-200 text-lg">Autonomous Expert Agent — EDPB Support Pool of Experts 2025-2030</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/50 text-green-300 px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              {status.status.toUpperCase()}
            </span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">v{status.version}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="🧠" label="Expertise Fields" value={status.expertise_fields} color="from-purple-500 to-indigo-600" />
        <StatCard icon="🔑" label="Keywords" value={status.keywords} color="from-blue-500 to-cyan-600" />
        <StatCard icon="🚀" label="Projects" value={status.projects} color="from-emerald-500 to-teal-600" />
        <StatCard icon="📚" label="Publications" value={status.publications} color="from-orange-500 to-red-600" />
      </div>

      {/* Candidate Info */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">👤</span> Candidate Profile
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <InfoRow label="Name" value={status.candidate} />
            <InfoRow label="Email" value={status.email} />
            <InfoRow label="Agent" value={status.agent} />
            <InfoRow label="Version" value={status.version} />
          </div>
          <div className="space-y-3">
            <InfoRow label="Languages" value="ES (Native) · EN (C1/B2/B2)" />
            <InfoRow label="Pool" value="EDPB SPE 2025-2030" />
            <InfoRow label="Declaration" value="✓ Honour Declaration Valid" />
            <InfoRow label="Selection" value="✓ Criteria Fulfilled" />
          </div>
        </div>
      </div>

      {/* Agent Actions */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">⚡</span> Agent Capabilities
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {['generate_evidence', 'analyze_regulation', 'map_expertise', 'validate_declaration', 'cv_summary', 'training_module', 'ai_act_articles'].map(action => (
            <div key={action} className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-default">
              <code className="text-sm text-blue-700 font-mono">{action}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: string; label: string; value: number; color: string }> = ({ icon, label, value, color }) => (
  <div className={`bg-gradient-to-br ${color} rounded-xl p-5 text-white shadow-lg`}>
    <div className="text-3xl mb-2">{icon}</div>
    <div className="text-3xl font-bold">{value}</div>
    <div className="text-sm opacity-90">{label}</div>
  </div>
);

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-start gap-2">
    <span className="text-sm font-medium text-gray-500 min-w-[100px]">{label}:</span>
    <span className="text-sm text-gray-800">{value}</span>
  </div>
);
