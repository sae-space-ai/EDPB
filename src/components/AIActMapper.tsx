import React, { useState } from 'react';
import { AI_ACT_MAPPING } from '../data/aiActMapping';
import { generateEvidence } from '../utils/agent';

export const AIActMapper: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [evidence, setEvidence] = useState<ReturnType<typeof generateEvidence> | null>(null);
  const [filter, setFilter] = useState('');

  const articles = Object.entries(AI_ACT_MAPPING);
  const filtered = articles.filter(([key, val]) =>
    key.toLowerCase().includes(filter.toLowerCase()) ||
    val.title.toLowerCase().includes(filter.toLowerCase()) ||
    val.expertise.some(e => e.toLowerCase().includes(filter.toLowerCase()))
  );

  const handleGenerateEvidence = (article: string) => {
    setSelectedArticle(article);
    setEvidence(generateEvidence(article, { generated_by: "interactive_dashboard" }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">🗺️ AI Act ↔ Expertise Mapping</h1>
        <p className="text-indigo-200">Complete mapping of EU AI Act articles to candidate expertise areas</p>
        <div className="mt-4 flex items-center gap-4">
          <span className="bg-white/10 px-4 py-2 rounded-full text-sm">{articles.length} articles mapped</span>
          <span className="bg-white/10 px-4 py-2 rounded-full text-sm">{Object.values(AI_ACT_MAPPING).reduce((acc, v) => acc + v.expertise.length, 0)} expertise links</span>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
        <input
          type="text"
          placeholder="🔍 Filter by article, title, or expertise..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
        />
      </div>

      {/* Evidence Output */}
      {evidence && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">
            <span>✅</span> Evidence Generated — {evidence.evidence.article}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm"><span className="font-medium text-gray-600">Article:</span> <span className="text-gray-800">{evidence.evidence.article}</span></div>
              <div className="text-sm"><span className="font-medium text-gray-600">Title:</span> <span className="text-gray-800">{evidence.evidence.article_title}</span></div>
              <div className="text-sm"><span className="font-medium text-gray-600">Timestamp:</span> <span className="text-gray-800 font-mono text-xs">{evidence.evidence.timestamp}</span></div>
              <div className="text-sm"><span className="font-medium text-gray-600">Hash:</span> <span className="text-gray-800 font-mono text-xs">{evidence.evidence.evidence_hash}</span></div>
            </div>
            <div className="space-y-2">
              <div className="text-sm"><span className="font-medium text-gray-600">Human Oversight:</span> <span className="text-green-700">✓</span></div>
              <div className="text-sm"><span className="font-medium text-gray-600">Traceability:</span> <span className="text-green-700">✓</span></div>
              <div className="text-sm"><span className="font-medium text-gray-600">Auditability:</span> <span className="text-green-700">✓</span></div>
              <div className="text-sm">
                <span className="font-medium text-gray-600">Expertise:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {evidence.evidence.expertise_applied.map(e => (
                    <span key={e} className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">{e}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map(([key, val]) => (
          <div
            key={key}
            onClick={() => handleGenerateEvidence(key)}
            className={`bg-white rounded-xl p-4 border-2 cursor-pointer transition-all hover:shadow-lg ${
              selectedArticle === key ? 'border-blue-500 shadow-lg bg-blue-50' : 'border-gray-100 hover:border-blue-200'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded-md">{key}</span>
              <span className="text-gray-400 text-xs">→</span>
            </div>
            <h4 className="font-semibold text-gray-800 text-sm mb-2">{val.title}</h4>
            <div className="flex flex-wrap gap-1">
              {val.expertise.map(e => (
                <span key={e} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{e}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
