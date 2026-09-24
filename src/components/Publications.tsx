import React, { useState } from 'react';
import { PROFILE } from '../data/profile';

export const Publications: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-rose-900 to-pink-900 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">📚 Publications</h1>
        <p className="text-rose-200">Doctrinal works on digital law, AI governance, and the transformation of the State</p>
        <div className="mt-4">
          <span className="bg-white/10 px-4 py-2 rounded-full text-sm">{PROFILE.publications.length} published works</span>
        </div>
      </div>

      <div className="space-y-3">
        {PROFILE.publications.map((pub, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all"
          >
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full p-4 flex items-center gap-4 text-left"
            >
              <span className="w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {i + 1}
              </span>
              <span className="flex-1 text-sm font-medium text-gray-800">{pub}</span>
              <span className={`text-gray-400 transition-transform ${expanded === i ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            {expanded === i && (
              <div className="px-4 pb-4 pt-0 border-t border-gray-100 bg-gray-50">
                <div className="p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs font-medium text-gray-500 uppercase">Author</span>
                      <p className="text-sm text-gray-800">{PROFILE.name}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500 uppercase">Domain</span>
                      <p className="text-sm text-gray-800">
                        {pub.toLowerCase().includes('ia') || pub.toLowerCase().includes('inteligencia') || pub.toLowerCase().includes('algorítmic')
                          ? '🤖 AI & Digital Governance'
                          : pub.toLowerCase().includes('estado') || pub.toLowerCase().includes('juríd')
                          ? '⚖️ Legal Theory & State'
                          : pub.toLowerCase().includes('trabajo') || pub.toLowerCase().includes('empleo')
                          ? '💼 Labour & AI'
                          : '📖 Digital Society'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Publication Themes */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🏷️</span> Thematic Areas
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            'Digital State Theory', 'AI Governance', 'Algorithmic Civilization',
            'Legal Security', 'Digital Identity', 'Evidence & Proof',
            'Labour Transformation', 'Human Decision-Making', 'Musical AI',
            'Power & Technology', 'European Digital Transformation'
          ].map(theme => (
            <span key={theme} className="bg-rose-50 border border-rose-200 text-rose-700 px-3 py-1.5 rounded-full text-sm">
              {theme}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
