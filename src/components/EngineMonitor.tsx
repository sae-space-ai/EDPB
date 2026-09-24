import React, { useState, useEffect } from 'react';
import { engine, EngineState, Task, Event, Metric, LogEntry, ComponentHealth } from '../utils/engine';

export const EngineMonitor: React.FC = () => {
  const [state, setState] = useState<EngineState>(engine.getState());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [health, setHealth] = useState<Record<string, ComponentHealth>>({});
  const [isRunning, setIsRunning] = useState(true);
  const [testResult, setTestResult] = useState<any>(null);
  const [isTestRunning, setIsTestRunning] = useState(false);

  // Actualizar estado cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setState(engine.getState());
      setTasks(engine.getTasks());
      setEvents(engine.getEvents());
      setMetrics(engine.getMetrics());
      setLogs(engine.getLogs());
      setHealth(engine.getHealth());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    engine.start();
    setIsRunning(true);
  };

  const handleStop = () => {
    engine.stop();
    setIsRunning(false);
  };

  const handlePause = () => {
    engine.pause();
  };

  const handleResume = () => {
    engine.resume();
  };

  const handleCreateTask = async (type: string, payload: any) => {
    await engine.createTask(type as any, payload, 'medium');
  };

  const handleRunFullTest = async () => {
    setIsTestRunning(true);
    setTestResult(null);
    
    try {
      const result = await engine.runFullTest();
      setTestResult(result);
    } catch (error) {
      console.error('Error en test completo:', error);
    } finally {
      setIsTestRunning(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-50';
      case 'degraded': return 'text-yellow-600 bg-yellow-50';
      case 'down': return 'text-red-600 bg-red-50';
      case 'running': return 'text-blue-600 bg-blue-50';
      case 'stopped': return 'text-gray-600 bg-gray-50';
      case 'paused': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'failed': return 'text-red-600 bg-red-50';
      case 'running': return 'text-blue-600 bg-blue-50';
      case 'pending': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getLogColor = (level: string) => {
    switch (level) {
      case 'error': return 'text-red-600 bg-red-50';
      case 'warn': return 'text-yellow-600 bg-yellow-50';
      case 'info': return 'text-blue-600 bg-blue-50';
      case 'debug': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">⚙️ Motor Operativo EDPB</h1>
        <p className="text-blue-200 text-lg">Sistema de orquestación y ejecución en tiempo real</p>
        <div className="mt-4 flex items-center gap-4 flex-wrap">
          <span className="bg-white/10 px-4 py-2 rounded-full text-sm">
            Estado: <span className="font-bold">{state.status.toUpperCase()}</span>
          </span>
          <span className="bg-white/10 px-4 py-2 rounded-full text-sm">
            Uptime: {formatUptime(state.uptime)}
          </span>
          <span className="bg-white/10 px-4 py-2 rounded-full text-sm">
            Tareas: {state.tasksProcessed}
          </span>
          <span className="bg-white/10 px-4 py-2 rounded-full text-sm">
            Eventos: {state.eventsGenerated}
          </span>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Panel de Control</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span>▶️</span> Iniciar
          </button>
          <button
            onClick={handleStop}
            disabled={!isRunning}
            className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 py-3 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span>⏹️</span> Detener
          </button>
          <button
            onClick={handlePause}
            disabled={state.status !== 'running'}
            className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-4 py-3 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span>⏸️</span> Pausar
          </button>
          <button
            onClick={handleResume}
            disabled={state.status !== 'paused'}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span>▶️</span> Reanudar
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={handleRunFullTest}
            disabled={isTestRunning || !isRunning}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isTestRunning ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Ejecutando Test Completo...
              </>
            ) : (
              <>
                <span>🧪</span> Ejecutar Test Completo del Ecosistema
              </>
            )}
          </button>
        </div>

        {testResult && (
          <div className={`mt-4 p-4 rounded-lg border-2 ${
            testResult.status === 'PASSED' ? 'bg-green-50 border-green-300' :
            testResult.status === 'PARTIAL' ? 'bg-yellow-50 border-yellow-300' :
            'bg-red-50 border-red-300'
          }`}>
            <h3 className="font-bold text-gray-800 mb-2">
              {testResult.status === 'PASSED' ? '✅' : testResult.status === 'PARTIAL' ? '⚠️' : '❌'}
              {' '}Resultado del Test: {testResult.status}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div>
                <div className="text-gray-600">Test ID</div>
                <div className="font-mono text-xs">{testResult.test_id}</div>
              </div>
              <div>
                <div className="text-gray-600">Componentes</div>
                <div className="font-bold">{Object.values(testResult.components).reduce((a: number, b: any) => a + b, 0)}</div>
              </div>
              <div>
                <div className="text-gray-600">Tareas</div>
                <div className="font-bold">{testResult.tasks.length}</div>
              </div>
              <div>
                <div className="text-gray-600">Tasa de Éxito</div>
                <div className="font-bold">{testResult.success_rate.toFixed(1)}%</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <button
            onClick={() => handleCreateTask('evidence', { article: 'Art. 9' })}
            className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-2"
          >
            <span>📜</span> Generar Evidencia Art. 9
          </button>
          <button
            onClick={() => handleCreateTask('scan', { target: 'self-test.local', tool: 'strix' })}
            className="bg-red-50 hover:bg-red-100 text-red-700 px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-2"
          >
            <span>🛡️</span> Escanear con Strix
          </button>
          <button
            onClick={() => handleCreateTask('dispatch', { agent: 'ai_governance', task: 'test' })}
            className="bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-2"
          >
            <span>🤖</span> Despachar AI Governance
          </button>
          <button
            onClick={() => handleCreateTask('search', { query: 'language model' })}
            className="bg-green-50 hover:bg-green-100 text-green-700 px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-2"
          >
            <span>🔍</span> Buscar en Gigafactorías
          </button>
          <button
            onClick={() => handleCreateTask('generate', { model: 'qwen3', prompt: 'test' })}
            className="bg-amber-50 hover:bg-amber-100 text-amber-700 px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-2"
          >
            <span>🧠</span> Generar con Qwen3
          </button>
          <button
            onClick={() => handleCreateTask('analyze', { data: 'texto de prueba', type: 'text' })}
            className="bg-cyan-50 hover:bg-cyan-100 text-cyan-700 px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-2"
          >
            <span>📊</span> Analizar Texto
          </button>
        </div>
      </div>

      {/* Component Health */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Salud de Componentes ({Object.keys(health).length})</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
          {Object.entries(health).map(([name, component]) => (
            <div key={name} className={`p-3 rounded-lg border ${getStatusColor(component.status)}`}>
              <div className="font-medium text-sm truncate">{name}</div>
              <div className="text-xs mt-1">
                <span className="font-bold">{component.status}</span>
              </div>
              <div className="text-xs text-gray-600 mt-1">
                ✓ {component.successCount} | ✗ {component.errorCount}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tasks */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Tareas ({tasks.length})</h2>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {tasks.slice(-20).reverse().map(task => (
            <div key={task.id} className={`p-3 rounded-lg border ${getTaskStatusColor(task.status)}`}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-sm">{task.type}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    ID: {task.id.substring(0, 8)}... | Hash: {task.hash.substring(0, 12)}...
                  </div>
                  {task.duration && (
                    <div className="text-xs text-gray-600 mt-1">
                      Duración: {task.duration}ms
                    </div>
                  )}
                  {task.error && (
                    <div className="text-xs text-red-600 mt-1">
                      Error: {task.error}
                    </div>
                  )}
                </div>
                <div className="text-xs font-bold">{task.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Events */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Eventos ({events.length})</h2>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {events.slice(-20).reverse().map(event => (
            <div key={event.id} className="p-3 rounded-lg border border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-sm">{event.type}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                <div className="text-xs font-mono text-gray-500">
                  {event.hash.substring(0, 12)}...
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Logs ({logs.length})</h2>
        <div className="space-y-2 max-h-96 overflow-y-auto font-mono text-xs">
          {logs.slice(-30).reverse().map(log => (
            <div key={log.id} className={`p-2 rounded ${getLogColor(log.level)}`}>
              <div className="flex items-start gap-2">
                <span className="font-bold">{log.level.toUpperCase()}</span>
                <span className="text-gray-600">{new Date(log.timestamp).toLocaleTimeString()}</span>
                <span className="flex-1">{log.message}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Métricas ({metrics.length})</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {metrics.slice(-9).map((metric, idx) => (
            <div key={idx} className="p-3 rounded-lg border border-gray-200 bg-gray-50">
              <div className="text-xs text-gray-600">{metric.name}</div>
              <div className="text-2xl font-bold text-gray-800">{metric.value}</div>
              <div className="text-xs text-gray-500">{metric.unit}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EngineMonitor;
