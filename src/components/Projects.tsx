import React from 'react';
import { PROFILE } from '../data/profile';

export const Projects: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-cyan-900 to-blue-900 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">🚀 Projects & Portfolio</h1>
        <p className="text-cyan-200">Open-source projects demonstrating expertise in AI governance, compliance, and emergency management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PROFILE.projects.map((project, i) => (
          <a
            key={i}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-xl hover:border-blue-200 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {project.name.charAt(0)}
                </span>
                <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{project.name}</h3>
              </div>
              <span className="text-gray-400 group-hover:text-blue-500 transition-colors text-xl">↗</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{project.description}</p>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-md font-mono">
                {project.url.replace('https://github.com/', '')}
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Project Categories */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>📊</span> Project Domains
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
            <h4 className="font-bold text-blue-800 mb-2">🤖 AI Governance</h4>
            <p className="text-sm text-gray-600">EU AI Supervisor, SME Control, SAE Compliance Engine</p>
            <div className="mt-2 text-xs text-blue-600 font-medium">3 projects</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100">
            <h4 className="font-bold text-orange-800 mb-2">🔥 Emergency Management</h4>
            <p className="text-sm text-gray-600">FIREcycle AI, Platform, Command Center</p>
            <div className="mt-2 text-xs text-orange-600 font-medium">3 projects</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
            <h4 className="font-bold text-green-800 mb-2">📜 Compliance</h4>
            <p className="text-sm text-gray-600">Evidence-based regulatory compliance tools</p>
            <div className="mt-2 text-xs text-green-600 font-medium">Traceability & Auditability</div>
          </div>
        </div>
      </div>
    </div>
  );
};
