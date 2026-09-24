import React, { useState } from 'react';
import { analyzeRegulation, mapExpertiseToTask } from '../utils/agent';

export const EvidenceEngine: React.FC = () => {
  const [regulationText, setRegulationText] = useState('');
  const [taskInput, setTaskInput] = useState('');
  const [regResult, setRegResult] = useState<ReturnType<typeof analyzeRegulation> | null>(null);
  const [taskResult, setTaskResult] = useState<ReturnType<typeof mapExpertiseToTask> | null>(null);

  const handleAnalyze = () => {
    if (regulationText.trim()) {
      setRegResult(analyzeRegulation(regulationText));
    }
  };

  const handleMapTask = () => {
    if (taskInput.trim()) {
      setTaskResult(mapExpertiseToTask(taskInput));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-900 to-orange-900 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">🔬 Evidence Engine</h1>
        <p className="text-amber-200">SAE Compliance & Evidence Engine — Interactive analysis tools</p>
      </div>

      {/* Regulation Analyzer */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>📝</span> Regulation Text Analyzer
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Paste regulatory text to identify relevant frameworks and expertise matches.
        </p>
        <textarea
          value={regulationText}
          onChange={(e) => setRegulationText(e.target.value)}
          placeholder="Paste text mentioning AI Act, GDPR, ePrivacy, eIDAS, DSA, DMA, NIS2, Cloud Act, FISA, etc..."
          className="w-full h-32 px-4 py-3 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none text-sm"
        />
        <button
          onClick={handleAnalyze}
          className="mt-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
        >
          🔍 Analyze Regulation
        </button>

        {regResult && (
          <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-amber-800 mb-2">Keywords Found ({regResult.keywords_found.length})</h4>
                <div className="flex flex-wrap gap-1">
                  {regResult.keywords_found.length > 0 ? (
                    regResult.keywords_found.map(k => (
                      <span key={k} className="bg-amber-200 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">{k}</span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">No keywords detected</span>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-amber-800 mb-2">Relevance Score</h4>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-amber-400 to-orange-500 h-3 rounded-full transition-all"
                      style={{ width: `${regResult.relevance_score * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-amber-700">{(regResult.relevance_score * 100).toFixed(1)}%</span>
                </div>
                <h4 className="font-semibold text-amber-800 mb-2 mt-3">Expertise Match</h4>
                <div className="flex flex-wrap gap-1">
                  {regResult.expertise_match.map(e => (
                    <span key={e} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">{e}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Task Mapper */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🎯</span> Expertise-to-Task Mapper
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Map a task or domain to relevant expertise areas.
        </p>
        <div className="flex gap-3 flex-wrap">
          <input
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="e.g., AI Act, anonymisation, cloud, ePrivacy, eIDAS, DPIA, training, GPAI, cybersecurity"
            className="flex-1 min-w-[200px] px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
          />
          <button
            onClick={handleMapTask}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
          >
            🗺️ Map Expertise
          </button>
        </div>

        {taskResult && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Matched Expertise for "{taskResult.task}"</h4>
            <div className="flex flex-wrap gap-2">
              {taskResult.matched_expertise.map(e => (
                <span key={e} className="bg-blue-200 text-blue-800 text-sm px-3 py-1.5 rounded-full font-medium">{e}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Tasks */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Quick Tasks</h2>
        <div className="flex flex-wrap gap-2">
          {['AI Act', 'anonymisation', 'cloud', 'ePrivacy', 'eIDAS', 'DPIA', 'training', 'GPAI', 'cybersecurity'].map(task => (
            <button
              key={task}
              onClick={() => { setTaskInput(task); setTaskResult(mapExpertiseToTask(task)); }}
              className="bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 px-3 py-2 rounded-lg text-sm font-medium transition-all"
            >
              {task}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
