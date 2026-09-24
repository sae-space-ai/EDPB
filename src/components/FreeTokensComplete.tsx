import React, { useState } from 'react';

interface TokenSource {
  id: number;
  name: string;
  provider: string;
  tokens: string;
  models: string;
  url: string;
  auth: string;
  priority: number;
  category: 'primary' | 'secondary' | 'compute';
  notes: string;
}

const TOKEN_SOURCES: TokenSource[] = [
  {
    id: 1,
    name: '阿里云百炼 (Alibaba Bailian)',
    provider: 'Alibaba Cloud',
    tokens: '70M+ tokens gratis',
    models: '70+ modelos (Qwen, DeepSeek, Kimi, GLM)',
    url: 'https://bailian.console.aliyun.com/',
    auth: 'API Key tras verificación de identidad',
    priority: 1,
    category: 'primary',
    notes: '1M tokens por modelo, 90 días de validez. Mayor cuota gratuita disponible.'
  },
  {
    id: 2,
    name: 'Google AI Studio',
    provider: 'Google',
    tokens: '250K tokens/min',
    models: 'Gemini 3, Gemma 3',
    url: 'https://aistudio.google.com/app/apikey',
    auth: 'API Key gratuita',
    priority: 2,
    category: 'primary',
    notes: 'Sin límite diario claro, alta velocidad. Ideal para prototipado rápido.'
  },
  {
    id: 3,
    name: 'OpenRouter',
    provider: 'OpenRouter',
    tokens: '20+ modelos free',
    models: 'Múltiples proveedores',
    url: 'https://openrouter.ai/keys',
    auth: 'API Key gratuita',
    priority: 3,
    category: 'secondary',
    notes: '20 req/min. Acceso unificado a múltiples modelos.'
  },
  {
    id: 4,
    name: 'Groq',
    provider: 'Groq',
    tokens: '14,400 req/day',
    models: 'Llama 4, Qwen 3',
    url: 'https://console.groq.com/keys',
    auth: 'API Key gratuita',
    priority: 4,
    category: 'secondary',
    notes: '30 req/min. Velocidad extrema con LPU.'
  },
  {
    id: 5,
    name: 'NVIDIA NIM',
    provider: 'NVIDIA',
    tokens: '40 req/min',
    models: 'LLaMA, Mistral, etc.',
    url: 'https://build.nvidia.com/',
    auth: 'Verificación móvil requerida',
    priority: 5,
    category: 'secondary',
    notes: 'Requiere verificación de identidad móvil.'
  },
  {
    id: 6,
    name: 'Mistral',
    provider: 'Mistral AI',
    tokens: '1B tokens/month',
    models: 'Mistral Large, Medium, Small',
    url: 'https://console.mistral.ai/',
    auth: 'Autorización de datos requerida',
    priority: 6,
    category: 'secondary',
    notes: 'Modelos europeos, cumplimiento GDPR nativo.'
  },
  {
    id: 7,
    name: 'GitHub Models',
    provider: 'GitHub/Microsoft',
    tokens: '40+ modelos',
    models: 'GPT-5, Claude, DeepSeek-R1',
    url: 'https://github.com/marketplace/models',
    auth: 'Cuenta GitHub',
    priority: 7,
    category: 'secondary',
    notes: 'Integración nativa con GitHub Copilot.'
  },
  {
    id: 8,
    name: 'Cloudflare Workers AI',
    provider: 'Cloudflare',
    tokens: '10,000 neurons/day',
    models: '60+ modelos',
    url: 'https://developers.cloudflare.com/workers-ai/',
    auth: 'Cuenta Cloudflare',
    priority: 8,
    category: 'secondary',
    notes: 'Edge computing, baja latencia global.'
  },
  {
    id: 9,
    name: 'Cerebras',
    provider: 'Cerebras',
    tokens: 'Ultra rápido',
    models: 'Llama 3.3 70B, Qwen 3',
    url: 'https://cloud.cerebras.ai/',
    auth: 'API Key',
    priority: 9,
    category: 'secondary',
    notes: 'Wafer-Scale Engine, velocidad sin precedentes.'
  },
  {
    id: 10,
    name: 'Cohere',
    provider: 'Cohere',
    tokens: '1,000 calls/month',
    models: 'Command R+, Command R',
    url: 'https://dashboard.cohere.com/',
    auth: 'API Key',
    priority: 10,
    category: 'secondary',
    notes: 'Especializado en RAG y embeddings.'
  },
  {
    id: 11,
    name: 'Google Colab',
    provider: 'Google',
    tokens: 'Sin límite tokens',
    models: 'GPU T4 gratis',
    url: 'https://colab.research.google.com/',
    auth: 'Cuenta Google',
    priority: 11,
    category: 'compute',
    notes: 'GPU T4 gratuita. Ideal para fine-tuning local.'
  },
  {
    id: 12,
    name: 'Kaggle',
    provider: 'Kaggle/Google',
    tokens: 'Sin límite tokens',
    models: '30 GPU horas/semana',
    url: 'https://www.kaggle.com/',
    auth: 'Cuenta Kaggle',
    priority: 12,
    category: 'compute',
    notes: 'P100 y T4 gratuitas. Notebooks colaborativos.'
  },
  {
    id: 13,
    name: 'Modal',
    provider: 'Modal',
    tokens: '$30/mes gratis',
    models: '~8h H100',
    url: 'https://modal.com/',
    auth: 'Cuenta Modal',
    priority: 13,
    category: 'compute',
    notes: 'H100 GPU de última generación. Serverless.'
  },
  {
    id: 14,
    name: 'NVIDIA DSX Air',
    provider: 'NVIDIA',
    tokens: '10,000 horas cómputo',
    models: '1 año gratis',
    url: 'https://www.nvidia.com/en-us/data-center/products/dsx/',
    auth: 'Solicitud empresarial',
    priority: 14,
    category: 'compute',
    notes: 'Programa para startups y investigadores.'
  }
];

export const FreeTokensComplete: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'primary' | 'secondary' | 'compute'>('all');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredSources = filter === 'all' 
    ? TOKEN_SOURCES 
    : TOKEN_SOURCES.filter(s => s.category === filter);

  const primaryCount = TOKEN_SOURCES.filter(s => s.category === 'primary').length;
  const secondaryCount = TOKEN_SOURCES.filter(s => s.category === 'secondary').length;
  const computeCount = TOKEN_SOURCES.filter(s => s.category === 'compute').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative">
          <h1 className="text-3xl font-bold mb-2">🆓 14 Fuentes de Tokens Gratuitos</h1>
          <p className="text-blue-200 text-lg">Proveedores autorizados para EDPB-FULLSTACK-OPERATIVO v5.0</p>
          <div className="mt-4 flex items-center gap-4 flex-wrap">
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">{TOKEN_SOURCES.length} proveedores</span>
            <span className="bg-green-500/20 px-4 py-2 rounded-full text-sm border border-green-400/50">100% gratis</span>
            <span className="bg-yellow-500/20 px-4 py-2 rounded-full text-sm border border-yellow-400/50">MVP Fast-track</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-blue-600">{primaryCount}</div>
          <div className="text-sm text-gray-500 mt-1">Primarios</div>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-purple-600">{secondaryCount}</div>
          <div className="text-sm text-gray-500 mt-1">Secundarios</div>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-green-600">{computeCount}</div>
          <div className="text-sm text-gray-500 mt-1">Compute</div>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-amber-600">€0</div>
          <div className="text-sm text-gray-500 mt-1">Coste Total</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🌐 Todas ({TOKEN_SOURCES.length})
          </button>
          <button
            onClick={() => setFilter('primary')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'primary' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ⭐ Primarios ({primaryCount})
          </button>
          <button
            onClick={() => setFilter('secondary')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'secondary' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🔌 Secundarios ({secondaryCount})
          </button>
          <button
            onClick={() => setFilter('compute')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'compute' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            💻 Compute ({computeCount})
          </button>
        </div>
      </div>

      {/* Token Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSources.map(source => (
          <div
            key={source.id}
            className={`bg-white rounded-xl shadow-md border-2 overflow-hidden transition-all ${
              expandedId === source.id ? 'border-blue-500 shadow-xl' : 'border-gray-100 hover:border-blue-200'
            }`}
          >
            <div 
              className="p-5 cursor-pointer"
              onClick={() => setExpandedId(expandedId === source.id ? null : source.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-bold">
                      #{source.priority}
                    </span>
                    <h3 className="font-bold text-gray-800">{source.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{source.provider}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  source.category === 'primary' ? 'bg-green-100 text-green-700' :
                  source.category === 'secondary' ? 'bg-purple-100 text-purple-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {source.category === 'primary' ? '⭐ Primario' :
                   source.category === 'secondary' ? '🔌 Secundario' :
                   '💻 Compute'}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tokens:</span>
                  <span className="font-medium text-gray-800">{source.tokens}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Modelos:</span>
                  <span className="font-medium text-gray-800 text-right max-w-[200px] truncate">{source.models}</span>
                </div>
              </div>

              {expandedId === source.id && (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">URL de registro:</div>
                    <a 
                      href={source.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm break-all"
                    >
                      {source.url}
                    </a>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Autenticación:</div>
                    <div className="text-sm text-gray-700">{source.auth}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Notas:</div>
                    <div className="text-sm text-gray-700 bg-blue-50 p-2 rounded">{source.notes}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Configuration */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>⚙️</span> Configuración en .env
        </h2>
        <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
          <pre>{`# Prioridad de uso (fallback automático)
ALIBABA_BAILIAN_API_KEY=<tu-key>      # 1º - Mayor cuota (70M tokens)
GROQ_API_KEY=<tu-key>                # 2º - Mayor velocidad
OPENROUTER_API_KEY=<tu-key>          # 3º - Mayor variedad
GEMINI_API_KEY=<tu-key>              # 4º - Google AI Studio
NVIDIA_API_KEY=<tu-key>              # 5º - NVIDIA NIM
MISTRAL_API_KEY=<tu-key>             # 6º - Modelos europeos
DEEPSEEK_API_KEY=<tu-key>            # 7º - DeepSeek
DATABASE_URL=<tu-postgres-url>       # Base de datos`}</pre>
        </div>
      </div>

      {/* Info */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span>💡</span> Estrategia de Fallback Automático
        </h3>
        <div className="text-sm text-gray-700 space-y-2">
          <p><strong>1º Alibaba Bailian:</strong> Mayor cuota gratuita (70M+ tokens). Prioridad máxima.</p>
          <p><strong>2º Groq:</strong> Mayor velocidad con LPU. Ideal para respuestas en tiempo real.</p>
          <p><strong>3º OpenRouter:</strong> Mayor variedad de modelos. Fallback universal.</p>
          <p><strong>4º Google AI Studio:</strong> Gemini 3 con alta velocidad.</p>
          <p><strong>5º-14º:</strong> Resto de proveedores en orden de prioridad.</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">✓ 100% Gratis</span>
          <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">✓ Fallback Automático</span>
          <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">✓ 14 Proveedores</span>
          <span className="bg-amber-100 text-amber-700 text-xs px-3 py-1 rounded-full">✓ MVP Fast-track</span>
        </div>
      </div>
    </div>
  );
};

export default FreeTokensComplete;
