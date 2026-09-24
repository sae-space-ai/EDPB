import React, { useState } from 'react';
import { VECTOR_DB_CONFIG, VECTOR_DB_ICONS, VECTOR_DB_COLORS } from '../data/vectorDatabases';

export const VectorDatabases: React.FC = () => {
  const [selectedDB, setSelectedDB] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-cyan-900 to-teal-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative">
          <h1 className="text-3xl font-bold mb-2">🗄️ Vector Database Infrastructure</h1>
          <p className="text-blue-200 text-lg">3 Production-Ready Solutions (2026 Benchmarks)</p>
          <div className="mt-4 flex items-center gap-4 flex-wrap">
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">{Object.keys(VECTOR_DB_CONFIG).length} databases</span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">PostgreSQL + pgvector Primary</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-blue-600">3</div>
          <div className="text-sm text-gray-500 mt-1">Vector DBs</div>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-cyan-600">5K+</div>
          <div className="text-sm text-gray-500 mt-1">Max QPS (Milvus)</div>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-emerald-600">0.971</div>
          <div className="text-sm text-gray-500 mt-1">Best Recall (Milvus)</div>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-amber-600">4.55ms</div>
          <div className="text-sm text-gray-500 mt-1">Fastest P50 (Qdrant)</div>
        </div>
      </div>

      {/* Database Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(VECTOR_DB_CONFIG).map(([key, db]) => (
          <div
            key={key}
            onClick={() => setSelectedDB(selectedDB === key ? null : key)}
            className={`bg-white rounded-xl shadow-md border-2 overflow-hidden cursor-pointer transition-all hover:shadow-xl ${
              selectedDB === key ? 'border-blue-500 shadow-xl' : 'border-gray-100 hover:border-blue-200'
            }`}
          >
            <div className={`bg-gradient-to-r ${VECTOR_DB_COLORS[key]} p-6 text-white`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{VECTOR_DB_ICONS[key]}</span>
                  <div>
                    <h3 className="font-bold text-2xl">{db.name}</h3>
                    <p className="text-xs opacity-90">{db.type}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {db.qps_dense && (
                  <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                    {db.qps_dense} dense QPS
                  </span>
                )}
                {db.filtered_qps && (
                  <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                    {db.filtered_qps} filtered QPS
                  </span>
                )}
                {db.qps && (
                  <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                    {db.qps} QPS
                  </span>
                )}
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <div className="text-xs text-gray-500 mb-2 font-medium uppercase">Key Strengths</div>
                <div className="space-y-1">
                  {db.strengths.map((s, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-blue-500 mt-0.5">✓</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-500 mb-1 font-medium uppercase">Best For</div>
                <div className="text-sm text-gray-700">{db.best_for}</div>
              </div>
              {db.build_time_s && (
                <div className="pt-3 border-t border-gray-100">
                  <div className="text-xs text-gray-500 mb-1 font-medium uppercase">Build Time</div>
                  <div className="text-sm text-gray-700">{db.build_time_s}s</div>
                </div>
              )}
              <div className="pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-500">Source: {db.source}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Architecture Note */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-6">
        <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span>🏗️</span> Primary Database Strategy
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          The SuperAlgorithm uses <strong>PostgreSQL 17 + pgvector 0.8.x</strong> as the primary vector database 
          for its unique combination of <strong>WAL (Write-Ahead Logging)</strong>, <strong>PITR (Point-in-Time Recovery)</strong>, 
          and <strong>row-level security</strong>. This ensures compliance-heavy workloads maintain full audit trails 
          and data sovereignty while leveraging existing SQL infrastructure.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">✓ WAL + PITR</span>
          <span className="bg-cyan-100 text-cyan-700 text-xs px-3 py-1 rounded-full">✓ Row-Level Security</span>
          <span className="bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full">✓ SQL Hybrid</span>
          <span className="bg-amber-100 text-amber-700 text-xs px-3 py-1 rounded-full">✓ Compliance-Ready</span>
        </div>
      </div>
    </div>
  );
};
