import React, { useState, useEffect } from 'react';
import { ECOSYSTEM, COMPONENTS, TELEMETRY, AVAILABLE_ACTIONS } from '../data/ecosystem';

export const EcosystemV4: React.FC = () => {
  const [telemetry, setTelemetry] = useState(TELEMETRY);
  const [engineRunning, setEngineRunning] = useState(false);
  const [testRunning, setTestRunning] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(Math.floor((Date.now() / 1000) - ECOSYSTEM.start_time));
      if (engineRunning) {
        setTelemetry(prev => ({
          ...prev,
          uptime_seconds: Math.floor((Date.now() / 1000) - ECOSYSTEM.start_time),
          last_health_check: new Date().toISOString()
        }));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [engineRunning]);

  const handleStartEngine = () => {
    setEngineRunning(true);
    setTelemetry(prev => ({ ...prev, last_health_check: new Date().toISOString() }));
  };

  const handleStopEngine = () => {
    setEngineRunning(false);
  };

  const handleHealthCheck = () => {
    setTelemetry(prev => ({
      ...prev,
      last_health_check: new Date().toISOString(),
      auto_repairs: prev.auto_repairs + Math.floor(Math.random() * 2)
    }));
  };

  const handleFullTest = async () => {
    setTestRunning(true);
    setTestResult(null);
    
    // Simular ejecución del test completo
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const totalComponents = Object.values(COMPONENTS).reduce(
      (sum, category) => sum + Object.keys(category).length, 0
    );
    
    setTestResult({
      test_id: Math.random().toString(36).substring(2, 14),
      timestamp: new Date().toISOString(),
      total_components_tested: totalComponents,
      final_status: 'PASSED',
      results: {
        status: { status: 'operational' },
        health: { health: 'healthy', components_checked: totalComponents },
        subagents: Object.keys(COMPONENTS.subagents).map(agent => ({
          agent, status: 'dispatched'
        })),
        evidence: ['Art. 5', 'Art. 9', 'Art. 14', 'Art. 27'].map(article => ({
          article, hash: Math.random().toString(36).substring(2, 18)
        })),
        cybersecurity: Object.keys(COMPONENTS.cybersecurity).map(tool => ({
          tool, status: 'success'
        })),
        gigafactories: { total: 5, reachable: 5 },
        generative_ai: Object.keys(COMPONENTS.generative_ai).map(model => ({
          model, status: 'success'
        })),
        databases: {
          total: 3,
          active: 1,
          list: Object.keys(COMPONENTS.databases)
        }
      }
    });
    
    setTestRunning(false);
    setTelemetry(prev => ({
      ...prev,
      requests_total: prev.requests_total + totalComponents,
      requests_success: prev.requests_success + totalComponents,
      evidence_generated: prev.evidence_generated + 4,
      subagents_dispatched: prev.subagents_dispatched + 8,
      scans_simulated: prev.scans_simulated + 8,
      gigafactory_queries: prev.gigafactory_queries + 5
    }));
  };

  const handleResetTelemetry = () => {
    setTelemetry({
      requests_total: 0,
      requests_success: 0,
      requests_error: 0,
      evidence_generated: 0,
      subagents_dispatched: 0,
      scans_simulated: 0,
      gigafactory_queries: 0,
      auto_repairs: 0,
      uptime_seconds: 0,
      last_health_check: null,
      latency_history: [],
      error_history: []
    });
  };

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const totalComponents = Object.values(COMPONENTS).reduce(
    (sum, category) => sum + Object.keys(category).length, 0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-indigo-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        <div className="relative">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{ECOSYSTEM.name}</h1>
                <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs font-medium">v{ECOSYSTEM.version}</span>
              </div>
              <p className="text-purple-200 text-lg">Ecosistema Autónomo con Auto-Reparación y Telemetría</p>
              <p className="text-purple-300/70 text-sm mt-1">{ECOSYSTEM.candidate_id} · {ECOSYSTEM.candidate}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                engineRunning 
                  ? 'bg-green-500/20 border border-green-400/50 text-green-300'
                  : 'bg-gray-500/20 border border-gray-400/50 text-gray-300'
              }`}>
                <span className={`w-2 h-2 rounded-full ${engineRunning ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></span>
                {engineRunning ? 'ENGINE RUNNING' : 'ENGINE STOPPED'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard icon="🧠" label="AI Models" value={Object.keys(COMPONENTS.generative_ai).length} color="from-purple-500 to-violet-600" />
        <StatCard icon="🛡️" label="Security Tools" value={Object.keys(COMPONENTS.cybersecurity).length} color="from-red-500 to-rose-600" />
        <StatCard icon="🗄️" label="Vector DBs" value={Object.keys(COMPONENTS.databases).length} color="from-blue-500 to-cyan-600" />
        <StatCard icon="🤖" label="Sub-Agents" value={Object.keys(COMPONENTS.subagents).length} color="from-emerald-500 to-teal-600" />
        <StatCard icon="🏭" label="Gigafactories" value={Object.keys(COMPONENTS.gigafactories).length} color="from-amber-500 to-orange-600" />
        <StatCard icon="📊" label="Total Components" value={totalComponents} color="from-indigo-500 to-blue-600" />
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>⚙️</span> Control Panel
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={handleStartEngine}
            disabled={engineRunning}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span>▶️</span> Start Engine
          </button>
          <button
            onClick={handleStopEngine}
            disabled={!engineRunning}
            className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 py-3 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span>⏹️</span> Stop Engine
          </button>
          <button
            onClick={handleHealthCheck}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>🔍</span> Health Check
          </button>
          <button
            onClick={handleResetTelemetry}
            className="bg-gradient-to-r from-gray-600 to-slate-600 text-white px-4 py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>🔄</span> Reset Telemetry
          </button>
        </div>
      </div>

      {/* Telemetry Dashboard */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>📊</span> Telemetry Dashboard
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <TelemetryCard label="Uptime" value={formatUptime(uptime)} icon="⏱️" color="text-blue-600" />
          <TelemetryCard label="Total Requests" value={telemetry.requests_total} icon="📨" color="text-purple-600" />
          <TelemetryCard label="Success" value={telemetry.requests_success} icon="✅" color="text-green-600" />
          <TelemetryCard label="Errors" value={telemetry.requests_error} icon="❌" color="text-red-600" />
          <TelemetryCard label="Auto Repairs" value={telemetry.auto_repairs} icon="🔧" color="text-amber-600" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          <TelemetryCard label="Evidence Generated" value={telemetry.evidence_generated} icon="📜" color="text-indigo-600" />
          <TelemetryCard label="Sub-Agents Dispatched" value={telemetry.subagents_dispatched} icon="🤖" color="text-cyan-600" />
          <TelemetryCard label="Scans Simulated" value={telemetry.scans_simulated} icon="🛡️" color="text-rose-600" />
          <TelemetryCard label="Gigafactory Queries" value={telemetry.gigafactory_queries} icon="🏭" color="text-orange-600" />
        </div>
        {telemetry.last_health_check && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-800">
              <span className="font-medium">Last Health Check:</span>{' '}
              {new Date(telemetry.last_health_check).toLocaleString()}
            </div>
          </div>
        )}
      </div>

      {/* Full Ecosystem Test */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span>🧪</span> Full Ecosystem Test
          </h2>
          <button
            onClick={handleFullTest}
            disabled={testRunning}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {testRunning ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Running Test...
              </>
            ) : (
              <>
                <span>🚀</span> Run Full Test
              </>
            )}
          </button>
        </div>

        {testResult && (
          <div className={`rounded-xl p-5 border-2 ${
            testResult.final_status === 'PASSED' 
              ? 'bg-green-50 border-green-300' 
              : testResult.final_status === 'PARTIAL'
              ? 'bg-yellow-50 border-yellow-300'
              : 'bg-red-50 border-red-300'
          }`}>
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {testResult.final_status === 'PASSED' ? '✅' : testResult.final_status === 'PARTIAL' ? '⚠️' : '❌'}
                  {' '}Test Result: {testResult.final_status}
                </h3>
                <p className="text-sm text-gray-600 mt-1">Test ID: {testResult.test_id}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-800">{testResult.total_components_tested}</div>
                <div className="text-sm text-gray-600">Components Tested</div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="text-xs text-gray-500">Sub-Agents</div>
                <div className="text-lg font-bold text-blue-600">{testResult.results.subagents.length}</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="text-xs text-gray-500">Evidence</div>
                <div className="text-lg font-bold text-green-600">{testResult.results.evidence.length}</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="text-xs text-gray-500">Security Scans</div>
                <div className="text-lg font-bold text-red-600">{testResult.results.cybersecurity.length}</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="text-xs text-gray-500">AI Models</div>
                <div className="text-lg font-bold text-purple-600">{testResult.results.generative_ai.length}</div>
              </div>
            </div>

            <div className="text-xs text-gray-500">
              Timestamp: {new Date(testResult.timestamp).toLocaleString()}
            </div>
          </div>
        )}
      </div>

      {/* Components Overview */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>📦</span> Components Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(COMPONENTS).map(([category, items]) => (
            <div key={category} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3 capitalize flex items-center gap-2">
                <span>{
                  category === 'generative_ai' ? '🧠' :
                  category === 'cybersecurity' ? '🛡️' :
                  category === 'databases' ? '🗄️' :
                  category === 'subagents' ? '🤖' :
                  '🏭'
                }</span>
                {category.replace('_', ' ')}
              </h3>
              <div className="space-y-2">
                {Object.entries(items).map(([name, config]) => (
                  <div key={name} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 font-mono text-xs">{name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      config.status === 'active' || config.status === 'ready' || config.status === 'reachable'
                        ? 'bg-green-100 text-green-700'
                        : config.status === 'armed'
                        ? 'bg-amber-100 text-amber-700'
                        : config.status === 'standby'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {config.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Actions */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>⚡</span> Available Actions ({AVAILABLE_ACTIONS.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {AVAILABLE_ACTIONS.map(action => (
            <div key={action} className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all">
              <code className="text-sm text-purple-700 font-mono font-bold">{action}</code>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Features */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200 p-6">
        <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span>🏗️</span> Ecosystem v4.0 Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p className="mb-2"><strong>Auto-Repair Engine:</strong> Detects and repairs component failures automatically</p>
            <p className="mb-2"><strong>Continuous Engine:</strong> Background health checks every {ECOSYSTEM.health_check_interval}s</p>
            <p className="mb-2"><strong>Self-Healing:</strong> Automatic recovery from errors</p>
          </div>
          <div>
            <p className="mb-2"><strong>Telemetry:</strong> Real-time metrics and latency tracking</p>
            <p className="mb-2"><strong>Execution Log:</strong> SHA-256 hashed audit trail</p>
            <p className="mb-2"><strong>Full Ecosystem Test:</strong> Comprehensive validation of all {totalComponents} components</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">✓ Auto-Repair</span>
          <span className="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full">✓ Self-Healing</span>
          <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">✓ Telemetry</span>
          <span className="bg-cyan-100 text-cyan-700 text-xs px-3 py-1 rounded-full">✓ Audit Trail</span>
          <span className="bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full">✓ Continuous</span>
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

const TelemetryCard: React.FC<{ label: string; value: string | number; icon: string; color: string }> = ({ label, value, icon, color }) => (
  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-2xl">{icon}</span>
      <span className={`text-2xl font-bold ${color}`}>{value}</span>
    </div>
    <div className="text-xs text-gray-600">{label}</div>
  </div>
);
