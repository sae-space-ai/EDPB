import React from 'react';

export const SystemStatus: React.FC = () => {
  const status = {
    frontend: { status: 'complete', percentage: 100, color: 'green' },
    backend: { status: 'missing', percentage: 0, color: 'red' },
    database: { status: 'missing', percentage: 0, color: 'red' },
    apis: { status: 'partial', percentage: 50, color: 'yellow' },
    integration: { status: 'missing', percentage: 0, color: 'red' },
    testing: { status: 'partial', percentage: 50, color: 'yellow' },
    documentation: { status: 'complete', percentage: 80, color: 'green' }
  };

  const missingItems = [
    {
      category: 'Backend en Vercel',
      priority: 'CRÍTICA',
      time: '4-6 horas',
      items: [
        'API endpoints reales (Python/Node.js)',
        'Base de datos PostgreSQL + pgvector',
        'Integración con APIs de LLMs',
        'Sistema de autenticación',
        'Rate limiting',
        'Logs persistentes'
      ]
    },
    {
      category: 'Base de Datos',
      priority: 'CRÍTICA',
      time: '1-2 horas',
      items: [
        'Instancia PostgreSQL 17',
        'Extensión pgvector 0.8.x',
        'Tablas: evidences, subagents, scans, logs',
        'WAL + PITR configurado',
        'Row-level security'
      ]
    },
    {
      category: 'APIs de LLMs',
      priority: 'IMPORTANTE',
      time: '30-60 min',
      items: [
        'Gemini API key',
        'Groq API key',
        'HuggingFace token',
        'NVIDIA API key',
        'DeepSeek API key',
        'Mistral API key',
        'Cerebras API key'
      ]
    },
    {
      category: 'Integración Frontend-Backend',
      priority: 'CRÍTICA',
      time: '2-3 horas',
      items: [
        'Modificar TestRunner.tsx para fetch() real',
        'Modificar EcosystemV4.tsx para API real',
        'Modificar RealTest.tsx para pruebas reales',
        'Manejo de errores y timeouts',
        'Retry logic',
        'Circuit breakers'
      ]
    },
    {
      category: 'Variables de Entorno',
      priority: 'IMPORTANTE',
      time: '15 min',
      items: [
        'Archivo .env con todas las API keys',
        'DATABASE_URL configurada',
        'Variables de Vercel configuradas'
      ]
    },
    {
      category: 'Testing Real',
      priority: 'IMPORTANTE',
      time: '2-3 horas',
      items: [
        'Ejecutar 100 pruebas contra backend real',
        'Verificar hashes SHA-256',
        'Validar trazabilidad',
        'Medir tiempos de respuesta',
        'Identificar cuellos de botella'
      ]
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRÍTICA': return 'bg-red-100 text-red-700 border-red-300';
      case 'IMPORTANTE': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'OPCIONAL': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-green-500';
      case 'partial': return 'bg-yellow-500';
      case 'missing': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 via-orange-900 to-yellow-900 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">🔍 Estado del Sistema</h1>
        <p className="text-red-200 text-lg">Diagnóstico completo de lo que falta para ser operativo</p>
        <div className="mt-4 bg-yellow-500/20 border border-yellow-400/50 rounded-lg p-4">
          <p className="text-yellow-100 text-sm">
            <strong>⚠️ ESTADO ACTUAL:</strong> Frontend 100% funcional, pero falta Backend + Base de Datos + Integración para ser completamente operativo.
          </p>
        </div>
      </div>

      {/* Status Overview */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Progreso por Componente</h2>
        <div className="space-y-4">
          {Object.entries(status).map(([key, value]) => (
            <div key={key}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-700 capitalize">{key}</span>
                <span className="text-sm text-gray-500">{value.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${getStatusColor(value.status)}`}
                  style={{ width: `${value.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Missing Items */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Lo que Falta para ser Operativo</h2>
        <div className="space-y-4">
          {missingItems.map((item, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-lg">{item.category}</h3>
                  <p className="text-sm text-gray-500 mt-1">Tiempo estimado: {item.time}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full border ${getPriorityColor(item.priority)}`}>
                  {item.priority}
                </span>
              </div>
              <ul className="space-y-2">
                {item.items.map((subItem, subIdx) => (
                  <li key={subIdx} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-red-500 mt-0.5">❌</span>
                    <span>{subItem}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Action Plan */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span>📋</span> Plan de Acción Recomendado
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <div className="text-2xl mb-2">📅</div>
            <h4 className="font-bold text-gray-800 mb-2">Día 1: Backend</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Crear estructura (1h)</li>
              <li>• Implementar endpoints (3h)</li>
              <li>• Configurar DB (1h)</li>
              <li>• Deploy Vercel (1h)</li>
            </ul>
            <div className="mt-2 text-xs text-blue-600 font-medium">Total: 6 horas</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <div className="text-2xl mb-2">🔗</div>
            <h4 className="font-bold text-gray-800 mb-2">Día 2: Integración</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Obtener API keys (30min)</li>
              <li>• Configurar .env (30min)</li>
              <li>• Modificar frontend (2h)</li>
              <li>• Probar integración (1h)</li>
            </ul>
            <div className="mt-2 text-xs text-blue-600 font-medium">Total: 4 horas</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <div className="text-2xl mb-2">🧪</div>
            <h4 className="font-bold text-gray-800 mb-2">Día 3: Testing</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Ejecutar 100 pruebas (1h)</li>
              <li>• Verificar resultados (1h)</li>
              <li>• Configurar monitoreo (1h)</li>
              <li>• Documentar (1h)</li>
            </ul>
            <div className="mt-2 text-xs text-blue-600 font-medium">Total: 4 horas</div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
          <div className="text-sm text-gray-700">
            <strong>Tiempo Total Estimado:</strong> 10-16 horas de trabajo
          </div>
          <div className="text-sm text-gray-700 mt-1">
            <strong>Coste:</strong> €0 (todas las herramientas son gratuitas)
          </div>
        </div>
      </div>

      {/* Quick Start */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🚀 Inicio Rápido</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
            <div>
              <h4 className="font-bold text-gray-800">Desplegar Backend en Vercel</h4>
              <p className="text-sm text-gray-600">Sigue la guía en <code className="bg-gray-100 px-2 py-0.5 rounded">DEPLOY_GUIDE.md</code></p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
            <div>
              <h4 className="font-bold text-gray-800">Configurar Base de Datos</h4>
              <p className="text-sm text-gray-600">Crea cuenta en Supabase o Neon (gratis)</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
            <div>
              <h4 className="font-bold text-gray-800">Obtener API Keys</h4>
              <p className="text-sm text-gray-600">Registra en Gemini, Groq, HuggingFace, etc.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
            <div>
              <h4 className="font-bold text-gray-800">Integrar Frontend con Backend</h4>
              <p className="text-sm text-gray-600">Modifica TestRunner.tsx para usar fetch() real</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
            <div>
              <h4 className="font-bold text-gray-800">Ejecutar 100 Pruebas Reales</h4>
              <p className="text-sm text-gray-600">Usa la pestaña "🧪 Test 100" para ejecutar pruebas contra tu backend</p>
            </div>
          </div>
        </div>
      </div>

      {/* Documentation */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span>📚</span> Documentación Disponible
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white rounded-lg p-3 border border-green-100">
            <div className="font-medium text-gray-800">📖 DIAGNOSTICO_COMPLETO.md</div>
            <div className="text-xs text-gray-600 mt-1">Análisis detallado de lo que falta</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-green-100">
            <div className="font-medium text-gray-800">🚀 DEPLOY_GUIDE.md</div>
            <div className="text-xs text-gray-600 mt-1">Guía paso a paso para desplegar</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-green-100">
            <div className="font-medium text-gray-800">🧪 GUIA_PRUEBAS_REALES.md</div>
            <div className="text-xs text-gray-600 mt-1">Cómo ejecutar pruebas reales</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-green-100">
            <div className="font-medium text-gray-800">🆓 APIS_GRATIS.md</div>
            <div className="text-xs text-gray-600 mt-1">Lista de APIs y módulos gratuitos</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
