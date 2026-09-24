import React, { useState } from 'react';
import { generateTrainingModule } from '../utils/agent';

export const Training: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState('AI Act');
  const [module, setModule] = useState<ReturnType<typeof generateTrainingModule> | null>(null);

  const topics = [
    'AI Act', 'GPAI Models', 'Human Oversight', 'Risk Management',
    'Data Protection', 'Anonymisation', 'Digital Identity', 'Cybersecurity',
    'Conformity Assessment', 'DPIA', 'Cloud Computing', 'ePrivacy'
  ];

  const handleGenerate = (topic: string) => {
    setSelectedTopic(topic);
    setModule(generateTrainingModule(topic));
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-violet-900 to-purple-900 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">🎓 Training Modules</h1>
        <p className="text-violet-200">Generate structured training content on regulatory and technical topics</p>
      </div>

      {/* Topic Selection */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Select a Topic</h2>
        <div className="flex flex-wrap gap-2">
          {topics.map(topic => (
            <button
              key={topic}
              onClick={() => handleGenerate(topic)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedTopic === topic
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-violet-100 hover:text-violet-700'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Generated Module */}
      {module && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span>📦</span> {String(module.module.title)}
            </h2>
            <span className="bg-violet-100 text-violet-700 text-sm px-3 py-1 rounded-full font-medium">
              {String(module.module.duration_hours)}h
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Objectives */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span>🎯</span> Learning Objectives
              </h3>
              <ul className="space-y-2">
                {(module.module.objectives as string[]).map((obj, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="w-5 h-5 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span>📋</span> Methodology
                </h3>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{String(module.module.methodology)}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span>📦</span> Deliverables
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(module.module.deliverables as string[]).map((d, i) => (
                    <span key={i} className="bg-green-50 border border-green-200 text-green-700 text-xs px-3 py-1 rounded-full">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span>🔑</span> Keywords
                </h3>
                <div className="flex flex-wrap gap-1">
                  {(module.module.keywords as string[]).map((kw, i) => (
                    <span key={i} className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Author */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                M
              </span>
              <div>
                <p className="text-sm font-medium text-gray-800">{String(module.module.author)}</p>
                <p className="text-xs text-gray-500">EDPB Support Pool of Experts 2025-2030</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
