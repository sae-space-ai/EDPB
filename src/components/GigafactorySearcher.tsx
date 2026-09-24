import React, { useState } from 'react';
import { GIGAFACTORY_REGISTRY, FACTORY_ICONS, FACTORY_COLORS, FACTORY_TYPE_LABELS } from '../data/gigafactories';
import { discoverGigafactories, generateGigafactoryEvidence, getGigafactoryStatus } from '../utils/gigafactoryAgent';

export const GigafactorySearcher: React.FC = () => {
  const status = getGigafactoryStatus();
  const [selectedFactory, setSelectedFactory] = useState<string | null>(null);
  const [discoveryResult, setDiscoveryResult] = useState<ReturnType<typeof discoverGigafactories> | null>(null);
  const [evidence, setEvidence] = useState<ReturnType<typeof generateGigafactoryEvidence> | null>(null);

  const handleDiscover = (factoryKey?: string) => {
    const result = discoverGigafactories(factoryKey);
    setDiscoveryResult(result);
    setSelectedFactory(factoryKey || null);
  };

  const handleGenerateEvidence = (source: string) => {
    const ev = generateGigafactoryEvidence(source, "discovery", { factory: source, timestamp: Date.now() });
    setEvidence(ev);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-blue-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
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
              <p className="text-blue-300/70 text-sm mt-1">Meta-Buscador + Integrador de Factorías Públicas</p>
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

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-blue-600">{status.factories_registered}</div>
          <div className="text-sm text-gray-500 mt-1">Factorías Registradas</div>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-indigo-600">{status.total_agents_discoverable}+</div>
          <div className="text-sm text-gray-500 mt-1">Agentes Descubribles</div>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-purple-600">5</div>
          <div className="text-sm text-gray-500 mt-1">Protocolos Soportados</div>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-emerald-600">7</div>
          <div className="text-sm text-gray-500 mt-1">Acciones Disponibles</div>
        </div>
      </div>

      {/* Discover All Button */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span>🔍</span> Discovery Engine
            </h2>
            <p className="text-sm text-gray-500 mt-1">Descubre agentes y APIs en todas las factorías públicas registradas</p>
          </div>
          <button
            onClick={() => handleDiscover()}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
          >
            <span>🌐</span> Discover All Factories
          </button>
        </div>
      </div>

      {/* Discovery Result */}
      {discoveryResult && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
            <span>✅</span> Discovery Complete — {Object.keys(discoveryResult.factories).length} factories queried
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {Object.entries(discoveryResult.factories).map(([key, factory]) => {
              const f = factory as Record<string, unknown>;
              return (
                <div key={key} className="bg-white rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{FACTORY_ICONS[key]}</span>
                    <span className="font-bold text-sm text-gray-800">{String(f.name)}</span>
                  </div>
                  <div className="text-xs text-gray-500 mb-2">{FACTORY_TYPE_LABELS[String(f.type)] || String(f.type)}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">{String(f.status)}</span>
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">{String(f.agents_count)} agents</span>
                  </div>
                  <div className="text-xs text-gray-600 truncate mb-2">{String(f.endpoint)}</div>
                  {f.note ? <p className="text-xs text-gray-500 italic">{String(f.note)}</p> : null}
                  <button
                    onClick={() => handleGenerateEvidence(key)}
                    className="mt-2 text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    🔬 Generate Evidence
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Evidence Output */}
      {evidence && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">
            <span>🔐</span> Evidence Generated — {evidence.evidence.source}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm"><span className="font-medium text-gray-600">Source:</span> <span className="text-gray-800">{evidence.evidence.source}</span></div>
              <div className="text-sm"><span className="font-medium text-gray-600">Action:</span> <span className="text-gray-800">{evidence.evidence.action}</span></div>
              <div className="text-sm"><span className="font-medium text-gray-600">Timestamp:</span> <span className="text-gray-800 font-mono text-xs">{evidence.evidence.timestamp}</span></div>
            </div>
            <div className="space-y-2">
              <div className="text-sm"><span className="font-medium text-gray-600">Data Hash:</span> <span className="text-gray-800 font-mono text-xs">{evidence.evidence.data_hash}</span></div>
              <div className="text-sm"><span className="font-medium text-gray-600">Evidence Hash:</span> <span className="text-gray-800 font-mono text-xs">{evidence.evidence.evidence_hash}</span></div>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">✓ Human Oversight</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">✓ Traceability</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">✓ Auditability</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Factory Registry */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🏭</span> Gigafactory Registry ({status.factories_registered})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Object.entries(GIGAFACTORY_REGISTRY).map(([key, factory]) => (
            <div
              key={key}
              className={`rounded-xl shadow-md border-2 overflow-hidden cursor-pointer transition-all hover:shadow-xl ${
                selectedFactory === key ? 'border-blue-500 shadow-xl' : 'border-gray-100 hover:border-blue-200'
              }`}
              onClick={() => handleDiscover(key)}
            >
              <div className={`bg-gradient-to-r ${FACTORY_COLORS[key]} p-4 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{FACTORY_ICONS[key]}</span>
                    <div>
                      <h3 className="font-bold text-sm">{factory.name}</h3>
                      <p className="text-xs opacity-90">{FACTORY_TYPE_LABELS[factory.type]}</p>
                    </div>
                  </div>
                  <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                    {String(factory.agents_count)} agents
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="text-xs text-gray-500 truncate">
                  <span className="font-medium">Endpoint:</span> {factory.discovery_endpoint}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${factory.auth_required ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                    {factory.auth_required ? '🔒 Auth Required' : '🔓 Public'}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{factory.format}</span>
                </div>
                {factory.description && (
                  <p className="text-xs text-gray-600 line-clamp-2">{factory.description}</p>
                )}
                {factory.install_command && (
                  <code className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded block truncate">{factory.install_command}</code>
                )}
                {factory.cli_command && (
                  <code className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded block truncate">{factory.cli_command}</code>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agent Actions */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>⚡</span> Available Actions (7)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { action: 'discover_gigafactories', desc: 'Discover agents in public factories' },
            { action: 'integrate_agents', desc: 'Normalize and integrate discovered agents' },
            { action: 'register_in_marketplace', desc: 'Register agent in AI Marketplace' },
            { action: 'list_factories', desc: 'List all registered factories' },
            { action: 'generate_evidence', desc: 'Generate SHA-256 evidence record' },
            { action: 'validate_declaration', desc: 'Validate honour declaration' },
            { action: 'cv_summary', desc: 'Generate CV Europass summary' },
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
