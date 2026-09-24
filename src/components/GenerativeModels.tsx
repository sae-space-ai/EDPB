import React, { useState } from 'react';
import { GENERATIVE_AI_MODELS, MODEL_ICONS, MODEL_COLORS } from '../data/generativeModels';

export const GenerativeModels: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-violet-900 to-indigo-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative">
          <h1 className="text-3xl font-bold mb-2">🧠 Generative AI Models</h1>
          <p className="text-purple-200 text-lg">7 State-of-the-Art Models (2026 Benchmarks)</p>
          <div className="mt-4 flex items-center gap-4 flex-wrap">
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">{Object.keys(GENERATIVE_AI_MODELS).length} models</span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">Apache 2.0 / MIT Licensed</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-purple-600">7</div>
          <div className="text-sm text-gray-500 mt-1">Total Models</div>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-blue-600">2.8T</div>
          <div className="text-sm text-gray-500 mt-1">Largest (Kimi K3)</div>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-emerald-600">5</div>
          <div className="text-sm text-gray-500 mt-1">Low Risk Models</div>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-amber-600">10M</div>
          <div className="text-sm text-gray-500 mt-1">Max Context (Llama 4)</div>
        </div>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {Object.entries(GENERATIVE_AI_MODELS).map(([key, model]) => (
          <div
            key={key}
            onClick={() => setSelectedModel(selectedModel === key ? null : key)}
            className={`bg-white rounded-xl shadow-md border-2 overflow-hidden cursor-pointer transition-all hover:shadow-xl ${
              selectedModel === key ? 'border-purple-500 shadow-xl' : 'border-gray-100 hover:border-purple-200'
            }`}
          >
            <div className={`bg-gradient-to-r ${MODEL_COLORS[key]} p-5 text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{MODEL_ICONS[key]}</span>
                  <div>
                    <h3 className="font-bold text-lg">{model.name}</h3>
                    <p className="text-xs opacity-90">{model.params} parameters</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${model.risk === 'low' ? 'bg-green-400/30' : 'bg-amber-400/30'}`}>
                  {model.risk.toUpperCase()} RISK
                </span>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <div className="text-xs text-gray-500 mb-1">License</div>
                <div className="text-sm font-medium text-gray-800">{model.license}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Strength</div>
                <div className="text-sm text-gray-700">{model.strength}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Commercial Use</div>
                <div className="text-sm">
                  {typeof model.commercial === 'boolean' ? (
                    <span className={model.commercial ? 'text-green-600' : 'text-red-600'}>
                      {model.commercial ? '✓ Yes' : '✗ No'}
                    </span>
                  ) : (
                    <span className="text-amber-600">{model.commercial}</span>
                  )}
                </div>
              </div>
              {model.ollama_cmd && (
                <div>
                  <div className="text-xs text-gray-500 mb-1">Ollama Command</div>
                  <code className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded block truncate">{model.ollama_cmd}</code>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Architecture Note */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200 p-6">
        <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span>🏗️</span> LLM Router Strategy
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          The SuperAlgorithm uses intelligent routing: <strong>Qwen3</strong> for general tasks, 
          <strong> DeepSeek-V4</strong> for coding, <strong>GLM-5.2</strong> for reasoning. 
          All models are open-source with permissive licenses (Apache 2.0 / MIT), enabling 
          self-hosting and full control over data privacy.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">✓ Open Source</span>
          <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">✓ Self-Hostable</span>
          <span className="bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full">✓ Commercial Use</span>
          <span className="bg-amber-100 text-amber-700 text-xs px-3 py-1 rounded-full">✓ Data Privacy</span>
        </div>
      </div>
    </div>
  );
};
