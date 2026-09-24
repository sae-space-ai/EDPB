import React, { useState } from 'react';
import { FREE_PROVIDERS, PROVIDER_COLORS } from '../data/providers';
import { SUBAGENT_REGISTRY } from '../data/subagents';

export const Providers: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const totalRPM = Object.values(FREE_PROVIDERS).reduce((acc, p) => acc + p.rpm, 0);
  const totalRPD = Object.values(FREE_PROVIDERS).reduce((acc, p) => acc + p.rpd, 0);

  const agentsUsingProvider = (providerName: string) => {
    return Object.entries(SUBAGENT_REGISTRY)
      .filter(([_, agent]) => agent.provider_preferred === providerName)
      .map(([name]) => name);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-violet-900 via-purple-900 to-fuchsia-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative">
          <h1 className="text-3xl font-bold mb-2">🔌 Free LLM Providers</h1>
          <p className="text-purple-200">7 providers with free tier access — Zero cost inference infrastructure</p>
          <div className="mt-4 flex items-center gap-4 flex-wrap">
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">{Object.keys(FREE_PROVIDERS).length} providers</span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">{totalRPM} total RPM</span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">{totalRPD.toLocaleString()} total RPD</span>
          </div>
        </div>
      </div>

      {/* Capacity Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-purple-600">{totalRPM}</div>
          <div className="text-sm text-gray-500 mt-1">Requests per Minute (total)</div>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-indigo-600">{totalRPD.toLocaleString()}</div>
          <div className="text-sm text-gray-500 mt-1">Requests per Day (total)</div>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-blue-600">7</div>
          <div className="text-sm text-gray-500 mt-1">Redundant Providers</div>
        </div>
      </div>

      {/* Provider Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {Object.entries(FREE_PROVIDERS).map(([name, provider]) => {
          const agents = agentsUsingProvider(name);
          return (
            <div
              key={name}
              onClick={() => setSelectedProvider(selectedProvider === name ? null : name)}
              className={`bg-white rounded-xl shadow-md border-2 overflow-hidden cursor-pointer transition-all hover:shadow-xl ${
                selectedProvider === name ? 'border-purple-500 shadow-xl' : 'border-gray-100 hover:border-purple-200'
              }`}
            >
              <div className={`bg-gradient-to-r ${PROVIDER_COLORS[name]} p-5 text-white`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg capitalize">{name}</h3>
                  <span className="bg-white/20 text-xs px-2 py-1 rounded-full">FREE</span>
                </div>
                <p className="text-sm opacity-90 mt-1 font-mono truncate">{provider.model}</p>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">RPM</span>
                  <span className="font-bold text-gray-800">{provider.rpm}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">RPD</span>
                  <span className="font-bold text-gray-800">{provider.rpd.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Context</span>
                  <span className="font-bold text-gray-800">{provider.context}</span>
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <div className="text-xs text-gray-500 mb-1">Base URL</div>
                  <div className="text-xs font-mono text-gray-600 truncate">{provider.base}</div>
                </div>
                {agents.length > 0 && (
                  <div className="pt-2 border-t border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">Preferred by sub-agents</div>
                    <div className="flex flex-wrap gap-1">
                      {agents.map(a => (
                        <span key={a} className="bg-purple-50 text-purple-600 text-xs px-2 py-0.5 rounded-full">
                          {a.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="pt-2 border-t border-gray-100">
                  <div className="text-xs text-gray-500 mb-1">Env Variable</div>
                  <code className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded font-mono">{provider.key_env}</code>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Architecture Note */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span>🏗️</span> Redundancy Architecture
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Each sub-agent is assigned a preferred provider for optimal performance, but the architect hub can
          fallback to any available provider. This ensures <strong>zero downtime</strong> and <strong>cost-free</strong> inference
          across all 8 specialized sub-agents. The system supports graceful degradation with automatic
          provider rotation when rate limits are reached.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">✓ Zero Cost</span>
          <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">✓ High Availability</span>
          <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">✓ Auto-Failover</span>
          <span className="bg-amber-100 text-amber-700 text-xs px-3 py-1 rounded-full">✓ Rate Limit Aware</span>
        </div>
      </div>
    </div>
  );
};
