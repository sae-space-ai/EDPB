import React, { useState } from 'react';
import gigafactorySearcher, { SearchAgentResult } from '../services/enhancedGigafactorySearcher';

export const EnhancedGigafactorySearcherComponent: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchAgentResult[]>([]);
  const [sources, setSources] = useState<{ name: string; count: number; status: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = [
    { id: 'llm', name: 'LLMs', icon: '🧠' },
    { id: 'vision', name: 'Visión', icon: '👁️' },
    { id: 'audio', name: 'Audio', icon: '🎵' },
    { id: 'agent', name: 'Agentes', icon: '🤖' },
    { id: 'security', name: 'Seguridad', icon: '🛡️' },
    { id: 'nlp', name: 'NLP', icon: '💬' }
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const searchResults = await gigafactorySearcher.searchAll(query);
      setResults(searchResults.results);
      setSources(searchResults.sources);
    } catch (error) {
      console.error('Error en búsqueda:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySearch = async (category: string) => {
    setSelectedCategory(category);
    setLoading(true);
    try {
      const categoryResults = await gigafactorySearcher.searchByCategory(category);
      setResults(categoryResults);
      setSources([{ name: 'Categoría', count: categoryResults.length, status: 'success' }]);
    } catch (error) {
      console.error('Error en búsqueda por categoría:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">🔍 Buscador de Gigafactorías Mejorado</h1>
        <p className="text-purple-200 text-lg">Búsqueda en APIs gratuitas reales: HuggingFace, GitHub, Replicate</p>
        <div className="mt-4 flex items-center gap-4 flex-wrap">
          <span className="bg-white/10 px-4 py-2 rounded-full text-sm">3 Fuentes</span>
          <span className="bg-white/10 px-4 py-2 rounded-full text-sm">APIs Gratuitas</span>
          <span className="bg-white/10 px-4 py-2 rounded-full text-sm">Caché Inteligente</span>
        </div>
      </div>

      {/* Search Box */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Buscar Agentes</h2>
        <div className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Buscar agentes de IA (ej: language model, agent, security...)"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
          />
          <button
            onClick={handleSearch}
            disabled={loading || !query.trim()}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Buscando...
              </>
            ) : (
              <>
                <span>🔍</span> Buscar
              </>
            )}
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Buscar por Categoría</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySearch(cat.id)}
              disabled={loading}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedCategory === cat.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <div className="font-medium text-gray-800">{cat.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Sources Status */}
      {sources.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h3 className="font-bold text-blue-800 mb-3">Fuentes Consultadas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {sources.map((source, idx) => (
              <div key={idx} className="bg-white rounded-lg p-3 border border-blue-100">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800">{source.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    source.status === 'success' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {source.status === 'success' ? '✓' : '✗'}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mt-1">{source.count} resultados</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Resultados ({results.length})
          </h2>
          <div className="space-y-4">
            {results.map((result, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-gray-800">{result.name}</h3>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        {result.source}
                      </span>
                      {result.free && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          GRATIS
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{result.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      {result.stars !== undefined && (
                        <span>⭐ {result.stars.toLocaleString()} stars</span>
                      )}
                      {result.downloads !== undefined && (
                        <span>📥 {result.downloads.toLocaleString()} downloads</span>
                      )}
                      <span>📁 {result.category}</span>
                    </div>
                    {result.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {result.tags.slice(0, 5).map((tag, tagIdx) => (
                          <span key={tagIdx} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 text-sm"
                  >
                    <span>🔗</span> Ver
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {results.length === 0 && !loading && sources.length === 0 && (
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Busca Agentes de IA</h3>
          <p className="text-gray-600">
            Usa el buscador o selecciona una categoría para descubrir agentes en HuggingFace, GitHub y Replicate
          </p>
        </div>
      )}

      {/* Features */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6">
        <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span>✨</span> Características del Buscador Mejorado
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p className="mb-2"><strong>APIs Gratuitas Reales:</strong> HuggingFace, GitHub, Replicate</p>
            <p className="mb-2"><strong>Caché Inteligente:</strong> Resultados cacheados por 10 minutos</p>
            <p className="mb-2"><strong>Búsqueda Unificada:</strong> Busca en todas las fuentes simultáneamente</p>
          </div>
          <div>
            <p className="mb-2"><strong>Categorías:</strong> LLMs, Visión, Audio, Agentes, Seguridad, NLP</p>
            <p className="mb-2"><strong>Resultados Enriquecidos:</strong> Stars, downloads, tags</p>
            <p className="mb-2"><strong>Enlaces Directos:</strong> Acceso rápido a cada agente</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">✓ APIs Gratuitas</span>
          <span className="bg-pink-100 text-pink-700 text-xs px-3 py-1 rounded-full">✓ Caché Inteligente</span>
          <span className="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full">✓ Búsqueda Unificada</span>
          <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">✓ Resultados Enriquecidos</span>
        </div>
      </div>
    </div>
  );
};

export default EnhancedGigafactorySearcherComponent;
