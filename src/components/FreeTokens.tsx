import React, { useState, useEffect } from 'react';

interface FreeToken {
  id: string;
  name: string;
  provider: string;
  type: 'llm' | 'search' | 'embedding' | 'vision' | 'audio';
  endpoint: string;
  limits: {
    rpm: number;
    rpd: number;
    context?: string;
  };
  auth: 'none' | 'api_key' | 'oauth';
  status: 'active' | 'testing' | 'error' | 'unavailable';
  lastTest?: string;
  latency?: number;
  model?: string;
}

const FREE_TOKENS_DATABASE: FreeToken[] = [
  // LLMs Gratuitos
  {
    id: 'hf-mistral',
    name: 'Mistral 7B Instruct',
    provider: 'HuggingFace',
    type: 'llm',
    endpoint: 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3',
    limits: { rpm: 30, rpd: 1000, context: '32K' },
    auth: 'none',
    status: 'active',
    model: 'mistralai/Mistral-7B-Instruct-v0.3'
  },
  {
    id: 'hf-llama3',
    name: 'Llama 3 8B Instruct',
    provider: 'HuggingFace',
    type: 'llm',
    endpoint: 'https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct',
    limits: { rpm: 30, rpd: 1000, context: '8K' },
    auth: 'none',
    status: 'active',
    model: 'meta-llama/Meta-Llama-3-8B-Instruct'
  },
  {
    id: 'hf-qwen2',
    name: 'Qwen2 7B Instruct',
    provider: 'HuggingFace',
    type: 'llm',
    endpoint: 'https://api-inference.huggingface.co/models/Qwen/Qwen2-7B-Instruct',
    limits: { rpm: 30, rpd: 1000, context: '32K' },
    auth: 'none',
    status: 'active',
    model: 'Qwen/Qwen2-7B-Instruct'
  },
  {
    id: 'hf-gemma2',
    name: 'Gemma 2 9B',
    provider: 'HuggingFace',
    type: 'llm',
    endpoint: 'https://api-inference.huggingface.co/models/google/gemma-2-9b-it',
    limits: { rpm: 30, rpd: 1000, context: '8K' },
    auth: 'none',
    status: 'active',
    model: 'google/gemma-2-9b-it'
  },
  {
    id: 'hf-phi3',
    name: 'Phi-3 Mini 4K',
    provider: 'HuggingFace',
    type: 'llm',
    endpoint: 'https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct',
    limits: { rpm: 30, rpd: 1000, context: '4K' },
    auth: 'none',
    status: 'active',
    model: 'microsoft/Phi-3-mini-4k-instruct'
  },
  // Embeddings Gratuitos
  {
    id: 'hf-embed',
    name: 'All-MiniLM-L6-v2',
    provider: 'HuggingFace',
    type: 'embedding',
    endpoint: 'https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2',
    limits: { rpm: 30, rpd: 1000 },
    auth: 'none',
    status: 'active',
    model: 'sentence-transformers/all-MiniLM-L6-v2'
  },
  // Vision Gratuitos
  {
    id: 'hf-vision',
    name: 'ViT Base Patch16',
    provider: 'HuggingFace',
    type: 'vision',
    endpoint: 'https://api-inference.huggingface.co/models/google/vit-base-patch16-224',
    limits: { rpm: 30, rpd: 1000 },
    auth: 'none',
    status: 'active',
    model: 'google/vit-base-patch16-224'
  },
  // Audio Gratuitos
  {
    id: 'hf-whisper',
    name: 'Whisper Tiny',
    provider: 'HuggingFace',
    type: 'audio',
    endpoint: 'https://api-inference.huggingface.co/models/openai/whisper-tiny',
    limits: { rpm: 30, rpd: 1000 },
    auth: 'none',
    status: 'active',
    model: 'openai/whisper-tiny'
  },
  // Búsqueda Gratuita
  {
    id: 'ddg-search',
    name: 'DuckDuckGo Instant',
    provider: 'DuckDuckGo',
    type: 'search',
    endpoint: 'https://api.duckduckgo.com/',
    limits: { rpm: 60, rpd: 10000 },
    auth: 'none',
    status: 'active'
  },
  {
    id: 'wikipedia',
    name: 'Wikipedia API',
    provider: 'Wikimedia',
    type: 'search',
    endpoint: 'https://en.wikipedia.org/w/api.php',
    limits: { rpm: 200, rpd: 50000 },
    auth: 'none',
    status: 'active'
  }
];

export const FreeTokens: React.FC = () => {
  const [tokens, setTokens] = useState<FreeToken[]>(FREE_TOKENS_DATABASE);
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, { success: boolean; latency?: number; error?: string }>>({});
  const [filter, setFilter] = useState<string>('all');

  const testToken = async (token: FreeToken) => {
    setTestingId(token.id);
    const startTime = performance.now();
    
    try {
      let response: Response;
      
      if (token.type === 'llm') {
        response = await fetch(token.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            inputs: 'Hello, respond with "OK" if you are working.',
            parameters: { max_new_tokens: 10 }
          })
        });
      } else if (token.type === 'search') {
        const url = token.id === 'ddg-search' 
          ? `${token.endpoint}?q=test&format=json`
          : `${token.endpoint}?action=query&list=search&srsearch=test&format=json&origin=*`;
        response = await fetch(url);
      } else {
        response = await fetch(token.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ inputs: 'test' })
        });
      }
      
      const latency = Math.round(performance.now() - startTime);
      
      if (response.ok) {
        setTestResults(prev => ({
          ...prev,
          [token.id]: { success: true, latency }
        }));
        setTokens(prev => prev.map(t => 
          t.id === token.id 
            ? { ...t, status: 'active', lastTest: new Date().toISOString(), latency }
            : t
        ));
      } else {
        const errorText = await response.text();
        setTestResults(prev => ({
          ...prev,
          [token.id]: { success: false, latency, error: `HTTP ${response.status}` }
        }));
        setTokens(prev => prev.map(t => 
          t.id === token.id 
            ? { ...t, status: 'error', lastTest: new Date().toISOString() }
            : t
        ));
      }
    } catch (error) {
      const latency = Math.round(performance.now() - startTime);
      setTestResults(prev => ({
        ...prev,
        [token.id]: { success: false, latency, error: (error as Error).message }
      }));
      setTokens(prev => prev.map(t => 
        t.id === token.id 
          ? { ...t, status: 'error', lastTest: new Date().toISOString() }
          : t
      ));
    } finally {
      setTestingId(null);
    }
  };

  const testAllTokens = async () => {
    for (const token of tokens) {
      await testToken(token);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  const filteredTokens = filter === 'all' 
    ? tokens 
    : tokens.filter(t => t.type === filter);

  const activeCount = tokens.filter(t => t.status === 'active').length;
  const errorCount = tokens.filter(t => t.status === 'error').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-900 via-emerald-900 to-teal-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative">
          <h1 className="text-3xl font-bold mb-2">🆓 Tokens & APIs Gratuitas</h1>
          <p className="text-green-200 text-lg">APIs reales sin coste para ejecutar la herramienta</p>
          <div className="mt-4 flex items-center gap-4 flex-wrap">
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">
              {tokens.length} tokens disponibles
            </span>
            <span className="bg-green-500/20 px-4 py-2 rounded-full text-sm border border-green-400/50">
              {activeCount} activos
            </span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">
              100% gratis · Sin tarjeta de crédito
            </span>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Probar Tokens</h2>
            <p className="text-sm text-gray-500 mt-1">Verifica que las APIs funcionan correctamente</p>
          </div>
          <button
            onClick={testAllTokens}
            disabled={testingId !== null}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {testingId ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Probando...
              </>
            ) : (
              <>
                <span>🧪</span> Probar Todas las APIs
              </>
            )}
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {['all', 'llm', 'search', 'embedding', 'vision', 'audio'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === type
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type === 'all' ? '🌐 Todas' : 
               type === 'llm' ? '🧠 LLMs' :
               type === 'search' ? '🔍 Búsqueda' :
               type === 'embedding' ? '📊 Embeddings' :
               type === 'vision' ? '👁️ Visión' :
               '🎵 Audio'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-green-600">{activeCount}</div>
          <div className="text-sm text-gray-500 mt-1">APIs Activas</div>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-red-600">{errorCount}</div>
          <div className="text-sm text-gray-500 mt-1">Con Errores</div>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-blue-600">€0</div>
          <div className="text-sm text-gray-500 mt-1">Coste Total</div>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-purple-600">
            {tokens.filter(t => t.latency).length > 0 
              ? Math.round(tokens.filter(t => t.latency).reduce((sum, t) => sum + (t.latency || 0), 0) / tokens.filter(t => t.latency).length)
              : 0}ms
          </div>
          <div className="text-sm text-gray-500 mt-1">Latencia Media</div>
        </div>
      </div>

      {/* Tokens Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTokens.map(token => {
          const testResult = testResults[token.id];
          const isTesting = testingId === token.id;
          
          return (
            <div
              key={token.id}
              className={`bg-white rounded-xl shadow-md border-2 overflow-hidden transition-all ${
                token.status === 'active' ? 'border-green-200' :
                token.status === 'error' ? 'border-red-200' :
                'border-gray-200'
              }`}
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-800">{token.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        token.status === 'active' ? 'bg-green-100 text-green-700' :
                        token.status === 'error' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {token.status === 'active' ? '✓ Activo' : 
                         token.status === 'error' ? '✗ Error' : 
                         token.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{token.provider}</p>
                  </div>
                  <span className="text-2xl">
                    {token.type === 'llm' ? '🧠' :
                     token.type === 'search' ? '🔍' :
                     token.type === 'embedding' ? '📊' :
                     token.type === 'vision' ? '👁️' :
                     '🎵'}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tipo:</span>
                    <span className="font-medium text-gray-800 capitalize">{token.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Límites:</span>
                    <span className="font-medium text-gray-800">
                      {token.limits.rpm} RPM · {token.limits.rpd.toLocaleString()} RPD
                    </span>
                  </div>
                  {token.limits.context && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Contexto:</span>
                      <span className="font-medium text-gray-800">{token.limits.context}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Auth:</span>
                    <span className="font-medium text-gray-800">
                      {token.auth === 'none' ? '🔓 Sin autenticación' : 
                       token.auth === 'api_key' ? '🔑 API Key' : '🔐 OAuth'}
                    </span>
                  </div>
                  {token.latency && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Latencia:</span>
                      <span className="font-medium text-green-600">{token.latency}ms</span>
                    </div>
                  )}
                </div>

                {testResult && (
                  <div className={`mt-3 p-2 rounded-lg text-xs ${
                    testResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {testResult.success 
                      ? `✓ API responde correctamente (${testResult.latency}ms)`
                      : `✗ Error: ${testResult.error || 'Desconocido'}`}
                  </div>
                )}

                <button
                  onClick={() => testToken(token)}
                  disabled={isTesting}
                  className="mt-3 w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isTesting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Probando...
                    </>
                  ) : (
                    <>🧪 Probar API</>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span>💡</span> Sobre los Tokens Gratuitos
        </h3>
        <div className="text-sm text-gray-700 space-y-2">
          <p>✅ <strong>Sin coste:</strong> Todas las APIs listadas son 100% gratuitas</p>
          <p>✅ <strong>Sin tarjeta:</strong> No se requiere método de pago</p>
          <p>✅ <strong>Funcionan ya:</strong> HuggingFace permite uso sin API key para modelos públicos</p>
          <p>✅ <strong>Testeables:</strong> Haz clic en "Probar API" para verificar en tiempo real</p>
          <p>✅ <strong>Integrables:</strong> Se pueden conectar directamente al Motor Operativo</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">✓ 100% Gratis</span>
          <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">✓ Sin Registro</span>
          <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">✓ Tiempo Real</span>
          <span className="bg-amber-100 text-amber-700 text-xs px-3 py-1 rounded-full">✓ Verificable</span>
        </div>
      </div>
    </div>
  );
};

export default FreeTokens;
