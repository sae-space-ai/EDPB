import React, { useState } from 'react';
import { CYBERSECURITY_TOOLS, TOOL_ICONS, TOOL_COLORS, TOOL_TYPE_LABELS } from '../data/cybersecurityTools';
import { cybersecurityScan } from '../utils/superAlgorithm';

export const CybersecurityTools: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [scanTarget, setScanTarget] = useState('');
  const [scanResult, setScanResult] = useState<ReturnType<typeof cybersecurityScan> | null>(null);

  const handleScan = (tool: string) => {
    const target = scanTarget || 'example.com';
    const result = cybersecurityScan(target, tool);
    setScanResult(result);
    setSelectedTool(tool);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative">
          <h1 className="text-3xl font-bold mb-2">🛡️ Cybersecurity Arsenal</h1>
          <p className="text-blue-200 text-lg">8 Tools — MEGAAGENTE CIBERSEGURIDAD IMPLACABLE</p>
          <div className="mt-4 flex items-center gap-4 flex-wrap">
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">{Object.keys(CYBERSECURITY_TOOLS).length} tools</span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">Autonomous + Manual</span>
          </div>
        </div>
      </div>

      {/* Scan Interface */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🎯</span> Security Scan Interface
        </h2>
        <div className="flex gap-3 flex-wrap">
          <input
            value={scanTarget}
            onChange={(e) => setScanTarget(e.target.value)}
            placeholder="Target domain (e.g., example.com)"
            className="flex-1 min-w-[250px] px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">Select a tool below to initiate scan</p>
      </div>

      {/* Scan Result */}
      {scanResult && scanResult.status === 'success' && 'tool' in scanResult && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">
            <span>✅</span> Scan Initiated — {scanResult.tool}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm"><span className="font-medium text-gray-600">Target:</span> <span className="text-gray-800 font-mono">{scanResult.target}</span></div>
              <div className="text-sm"><span className="font-medium text-gray-600">Tool Type:</span> <span className="text-gray-800">{TOOL_TYPE_LABELS[scanResult.type] || scanResult.type}</span></div>
              <div className="text-sm"><span className="font-medium text-gray-600">Timestamp:</span> <span className="text-gray-800 font-mono text-xs">{scanResult.timestamp}</span></div>
            </div>
            <div className="space-y-2">
              <div className="text-sm"><span className="font-medium text-gray-600">Evidence Hash:</span> <span className="text-gray-800 font-mono text-xs">{scanResult.evidence_hash}</span></div>
              <div className="text-sm">
                <span className="font-medium text-gray-600">Strengths:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {scanResult.strengths.map((s: string) => (
                    <span key={s} className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {Object.entries(CYBERSECURITY_TOOLS).map(([key, tool]) => (
          <div
            key={key}
            onClick={() => handleScan(key)}
            className={`bg-white rounded-xl shadow-md border-2 overflow-hidden cursor-pointer transition-all hover:shadow-xl ${
              selectedTool === key ? 'border-blue-500 shadow-xl' : 'border-gray-100 hover:border-blue-200'
            }`}
          >
            <div className={`bg-gradient-to-r ${TOOL_COLORS[key]} p-5 text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{TOOL_ICONS[key]}</span>
                  <div>
                    <h3 className="font-bold text-lg">{tool.name}</h3>
                    <p className="text-xs opacity-90">{TOOL_TYPE_LABELS[tool.type]}</p>
                  </div>
                </div>
                {tool.license && (
                  <span className="bg-white/20 text-xs px-2 py-1 rounded-full">{tool.license}</span>
                )}
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <div className="text-xs text-gray-500 mb-1">Description</div>
                <div className="text-sm text-gray-700">{tool.description}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Key Strengths</div>
                <div className="flex flex-wrap gap-1">
                  {tool.strengths.map(s => (
                    <span key={s} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
              <div className="pt-2 border-t border-gray-100">
                <div className="text-xs text-gray-500">Source: {tool.source}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Architecture Note */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
        <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span>⚔️</span> Implacable Cybersecurity Strategy
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          The MEGAAGENTE combines <strong>autonomous tools</strong> (Strix, PentAGI) with <strong>LLM co-pilots</strong> (PentestGPT) 
          and <strong>scalable scanners</strong> (Nuclei). All findings are validated with working PoCs and tracked in 
          <strong> Faraday</strong> for team collaboration. The system uses <strong>HexStrike AI</strong> as an MCP bridge 
          to connect LLMs with 150+ security tools in real-time.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">✓ Autonomous</span>
          <span className="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full">✓ PoC Validation</span>
          <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">✓ CI/CD Ready</span>
          <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">✓ Team Collaboration</span>
        </div>
      </div>
    </div>
  );
};
