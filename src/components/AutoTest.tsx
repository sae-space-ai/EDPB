import React, { useState } from 'react';
import { runAutonomousTest, type AutoTestResult } from '../utils/autoTest';

export const AutoTest: React.FC = () => {
  const [testResult, setTestResult] = useState<AutoTestResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunTest = async () => {
    setIsRunning(true);
    // Simular ejecución asíncrona
    await new Promise(resolve => setTimeout(resolve, 1500));
    const result = runAutonomousTest();
    setTestResult(result);
    setIsRunning(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-cyan-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative">
          <h1 className="text-3xl font-bold mb-2">🧪 Auto-Test Autónomo</h1>
          <p className="text-emerald-200 text-lg">8 Fases de Verificación del Sistema</p>
          <div className="mt-4 flex items-center gap-4 flex-wrap">
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">8 fases</span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">Self-Test Mode</span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">No Human Intervention</span>
          </div>
        </div>
      </div>

      {/* Run Test Button */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span>⚡</span> Ejecutar Auto-Test
            </h2>
            <p className="text-sm text-gray-500 mt-1">Ejecuta las 8 fases de verificación del sistema completo</p>
          </div>
          <button
            onClick={handleRunTest}
            disabled={isRunning}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Ejecutando...
              </>
            ) : (
              <>
                <span>🚀</span> Ejecutar Test Completo
              </>
            )}
          </button>
        </div>
      </div>

      {/* Test Results */}
      {testResult && (
        <>
          {/* Summary Card */}
          <div className={`rounded-2xl shadow-lg border-2 p-6 ${
            testResult.summary.final_status === 'PASSED' 
              ? 'bg-green-50 border-green-300' 
              : testResult.summary.final_status === 'PARTIAL'
              ? 'bg-yellow-50 border-yellow-300'
              : 'bg-red-50 border-red-300'
          }`}>
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {testResult.summary.final_status === 'PASSED' ? '✅' : testResult.summary.final_status === 'PARTIAL' ? '⚠️' : '❌'}
                  {' '}Resultado: {testResult.summary.final_status}
                </h3>
                <p className="text-sm text-gray-600 mt-1">Test ID: {testResult.test_id}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-800">{testResult.summary.success_rate}%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="text-2xl font-bold text-blue-600">{testResult.summary.total_phases}</div>
                <div className="text-xs text-gray-500">Total Fases</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="text-2xl font-bold text-green-600">{testResult.summary.successful_phases}</div>
                <div className="text-xs text-gray-500">Exitosas</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="text-2xl font-bold text-red-600">{testResult.summary.failed_phases}</div>
                <div className="text-xs text-gray-500">Fallidas</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="text-2xl font-bold text-purple-600">{testResult.summary.elapsed_seconds}s</div>
                <div className="text-xs text-gray-500">Tiempo</div>
              </div>
            </div>
          </div>

          {/* Phases Detail */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>📋</span> Detalle de Fases
            </h3>
            <div className="space-y-3">
              {testResult.phases.map((phase, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-lg ${
                          phase.status === 'success' ? 'text-green-600' :
                          phase.status === 'warning' ? 'text-yellow-600' :
                          phase.status === 'error' ? 'text-red-600' :
                          'text-gray-400'
                        }`}>
                          {phase.status === 'success' ? '✅' : phase.status === 'warning' ? '⚠️' : phase.status === 'error' ? '❌' : '⏳'}
                        </span>
                        <span className="font-bold text-gray-800">{phase.name}</span>
                        <span className="text-sm text-gray-600">— {phase.description}</span>
                      </div>
                      {phase.result && (
                        <div className="mt-2 text-xs bg-gray-50 rounded p-2 font-mono overflow-x-auto">
                          <pre className="text-gray-700">{JSON.stringify(phase.result, null, 2)}</pre>
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 whitespace-nowrap">
                      {phase.timestamp && new Date(phase.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Phases Overview */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>📊</span> Fases del Auto-Test
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { phase: 'FASE 1', desc: 'Auto-diagnóstico', icon: '🔍' },
            { phase: 'FASE 2', desc: 'Verificación componentes', icon: '✓' },
            { phase: 'FASE 3', desc: 'Prueba evidencias SHA-256', icon: '🔐' },
            { phase: 'FASE 4', desc: 'Prueba sub-agentes', icon: '🤖' },
            { phase: 'FASE 5', desc: 'Prueba ciberseguridad', icon: '🛡️' },
            { phase: 'FASE 6', desc: 'Prueba gigafactorías', icon: '🏭' },
            { phase: 'FASE 7', desc: 'Validación declaración', icon: '📜' },
            { phase: 'FASE 8', desc: 'Verificación integridad', icon: '🔗' },
          ].map(({ phase, desc, icon }) => (
            <div key={phase} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
              <div className="text-2xl mb-2">{icon}</div>
              <div className="font-bold text-sm text-gray-800">{phase}</div>
              <div className="text-xs text-gray-600 mt-1">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Note */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 p-6">
        <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span>🏗️</span> Arquitectura del Auto-Test
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          El sistema ejecuta <strong>8 fases de verificación autónoma</strong> sin intervención humana. 
          Cada fase genera evidencias con <strong>hash SHA-256</strong> para garantizar trazabilidad y auditabilidad. 
          El log completo se firma criptográficamente para verificar la integridad del proceso. 
          Modo <strong>SELF-TEST AUTÓNOMO</strong> diseñado para ejecución continua en entornos serverless.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full">✓ Autónomo</span>
          <span className="bg-teal-100 text-teal-700 text-xs px-3 py-1 rounded-full">✓ Trazable</span>
          <span className="bg-cyan-100 text-cyan-700 text-xs px-3 py-1 rounded-full">✓ Auditable</span>
          <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">✓ Serverless</span>
        </div>
      </div>
    </div>
  );
};
