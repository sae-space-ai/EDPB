import React, { useState } from 'react';
import { PROFILE } from '../data/profile';

export const Expertise: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'technical' | 'legal' | 'keywords'>('technical');

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">🎯 Expertise & Competencies</h1>
        <p className="text-emerald-200">Multidisciplinary profile covering technical, legal, and regulatory domains</p>
        <div className="mt-4 flex items-center gap-4 flex-wrap">
          <span className="bg-white/10 px-4 py-2 rounded-full text-sm">{PROFILE.expertise.technical.length} Technical areas</span>
          <span className="bg-white/10 px-4 py-2 rounded-full text-sm">{PROFILE.expertise.legal.length} Legal areas</span>
          <span className="bg-white/10 px-4 py-2 rounded-full text-sm">{PROFILE.keywords.length} Keywords</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-2 flex gap-2">
        {(['technical', 'legal', 'keywords'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-3 rounded-lg font-medium text-sm transition-all ${
              activeTab === tab
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab === 'technical' ? '🔧 Technical' : tab === 'legal' ? '⚖️ Legal' : '🔑 Keywords'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        {activeTab === 'technical' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PROFILE.expertise.technical.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-emerald-50 transition-colors">
                <span className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'legal' && (
          <div className="space-y-4">
            {PROFILE.expertise.legal.map((item, i) => (
              <div key={i} className="p-4 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors border-l-4 border-blue-500">
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'keywords' && (
          <div className="flex flex-wrap gap-2">
            {PROFILE.keywords.map((kw, i) => (
              <span
                key={i}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:shadow-md transition-all"
              >
                {kw}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Self Assessment */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span>📋</span> Self-Assessment
        </h2>
        <p className="text-gray-600 leading-relaxed italic border-l-4 border-gray-300 pl-4">
          "{PROFILE.self_assessment}"
        </p>
      </div>

      {/* Honour Declaration */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🏛️</span> Honour Declaration
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(PROFILE.honour_declaration).map(([key, value]) => (
            <div key={key} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-sm text-gray-700">
                {key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </span>
              <span className="ml-auto text-green-600 font-bold text-sm">{value ? 'YES' : 'NO'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
