import React from 'react';
import { getSuperAlgorithmStatus } from '../utils/superAlgorithm';
import { SUBAGENT_REGISTRY, SUBAGENT_ICONS, SUBAGENT_COLORS } from '../data/subagents';
import { GENERATIVE_AI_MODELS, MODEL_COLORS, MODEL_ICONS } from '../data/generativeModels';
import { CYBERSECURITY_TOOLS, TOOL_COLORS, TOOL_ICONS } from '../data/cybersecurityTools';
import { VECTOR_DB_CONFIG, VECTOR_DB_COLORS, VECTOR_DB_ICONS } from '../data/vectorDatabases';

export const Dashboard: React.FC = () => {
  const status = getSuperAlgorithmStatus();

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
              <p className="text-blue-300/70 text-sm mt-1">{status.candidate_id} · {status.candidate}</p>
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
        <StatCard icon="🧠" label="AI Models" value={status.generative_models} color="from-purple-500 to-violet-600" />
        <StatCard icon="🛡️" label="Security Tools" value={status.cybersecurity_tools} color="from-red-500 to-rose-600" />
        <StatCard icon="🗄️" label="Vector DBs" value={status.vector_dbs} color="from-blue-500 to-cyan-600" />
        <StatCard icon="🤖" label="Sub-Agents" value={status.subagents} color="from-emerald-500 to-teal-600" />
        <StatCard icon="🏭" label="Gigafactories" value={status.gigafactories} color="from-amber-500 to-orange-600" />
        <StatCard icon="🔐" label="Architecture" value={3} color="from-indigo-500 to-blue-600" />
      </div>

      {/* Architecture Diagram */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🏗️</span> 3-Layer Architecture
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-2">🔍 Discovery Layer</h3>
            <p className="text-sm text-gray-600 mb-2">Gigafactory endpoints + .well-known</p>
            <div className="text-xs text-blue-600 font-medium">{status.gigafactories} public registries</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-2">🗄️ Integration Layer</h3>
            <p className="text-sm text-gray-600 mb-2">pgvector for embedding storage</p>
            <div className="text-xs text-purple-600 font-medium">PostgreSQL 17 + WAL + PITR</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
            <h3 className="font-bold text-green-800 mb-2">⚡ Execution Layer</h3>
            <p className="text-sm text-gray-600 mb-2">8 sub-agents + 8 security tools</p>
            <div className="text-xs text-green-600 font-medium">MEGAAGENTE CIBERSEGURIDAD</div>
          </div>
        </div>
      </div>

      {/* Generative AI Models */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🧠</span> Generative AI Models ({status.generative_models})
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Object.entries(GENERATIVE_AI_MODELS).map(([name, model]) => (
            <div key={name} className={`bg-gradient-to-br ${MODEL_COLORS[name]} rounded-xl p-3 text-white shadow-md`}>
              <div className="text-2xl mb-1">{MODEL_ICONS[name]}</div>
              <div className="font-bold text-sm">{model.name}</div>
              <div className="text-xs opacity-90 mt-1">{model.params}</div>
              <div className="text-xs opacity-80 mt-1">{model.license}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Cybersecurity Tools */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🛡️</span> Cybersecurity Arsenal ({status.cybersecurity_tools})
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Object.entries(CYBERSECURITY_TOOLS).map(([name, tool]) => (
            <div key={name} className={`bg-gradient-to-br ${TOOL_COLORS[name]} rounded-xl p-3 text-white shadow-md`}>
              <div className="text-2xl mb-1">{TOOL_ICONS[name]}</div>
              <div className="font-bold text-sm">{tool.name}</div>
              <div className="text-xs opacity-90 mt-1 line-clamp-2">{tool.type.replace(/_/g, ' ')}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Vector Databases */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🗄️</span> Vector Database Infrastructure ({status.vector_dbs})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(VECTOR_DB_CONFIG).map(([name, db]) => (
            <div key={name} className={`bg-gradient-to-br ${VECTOR_DB_COLORS[name]} rounded-xl p-4 text-white shadow-md`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{VECTOR_DB_ICONS[name]}</span>
                <div>
                  <div className="font-bold text-lg">{db.name}</div>
                  <div className="text-xs opacity-90">{db.type}</div>
                </div>
              </div>
              <div className="text-xs opacity-80 mt-2">{db.best_for}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sub-Agents */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🤖</span> EDPB Sub-Agents ({status.subagents})
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(SUBAGENT_REGISTRY).map(([name, agent]) => (
            <div key={name} className={`bg-gradient-to-br ${SUBAGENT_COLORS[name]} rounded-xl p-3 text-white shadow-md`}>
              <div className="text-xl mb-1">{SUBAGENT_ICONS[name]}</div>
              <div className="font-bold text-xs truncate">{name.replace(/_/g, ' ')}</div>
              <div className="text-[10px] opacity-80 mt-1 line-clamp-2">{agent.description}</div>
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
            <InfoRow label="Candidate ID" value={status.candidate_id} />
            <InfoRow label="Agent" value={status.agent} />
            <InfoRow label="Version" value={`v${status.version}`} />
          </div>
          <div className="space-y-3">
            <InfoRow label="Role" value={status.role} />
            <InfoRow label="Architecture" value={status.architecture_pattern} />
            <InfoRow label="Database" value={status.database} />
            <InfoRow label="Security" value={status.security_agent} />
          </div>
        </div>
      </div>

      {/* Agent Actions */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>⚡</span> Agent Capabilities (9 actions)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { action: 'discover_gigafactories', desc: 'Discover agents in public factories' },
            { action: 'cybersecurity_scan', desc: 'Execute security scan with tool' },
            { action: 'generate_evidence', desc: 'AI Act evidence w/ SHA-256 hash' },
            { action: 'dispatch_subagent', desc: 'Invoke specialized sub-agent' },
            { action: 'validate_declaration', desc: 'Honour declaration check' },
            { action: 'list_generative_models', desc: '7 AI models' },
            { action: 'list_cybersecurity_tools', desc: '8 security tools' },
            { action: 'list_vector_dbs', desc: '3 vector databases' },
            { action: 'get_architecture', desc: 'System architecture details' },
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
    <span className="text-sm font-medium text-gray-500 min-w-[120px]">{label}:</span>
    <span className="text-sm text-gray-800">{value}</span>
  </div>
);
