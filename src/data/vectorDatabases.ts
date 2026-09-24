export interface VectorDB {
  name: string;
  type: string;
  strengths: string[];
  qps_dense?: number;
  filtered_qps?: number;
  qps?: number;
  build_time_s?: number;
  best_for: string;
  source: string;
}

export const VECTOR_DB_CONFIG: Record<string, VectorDB> = {
  "pgvector": {
    name: "pgvector",
    type: "PostgreSQL extension",
    strengths: ["WAL + PITR", "row-level security", "SQL hybrid", "point-in-time recovery"],
    qps_dense: 257,
    filtered_qps: 4832,
    build_time_s: 88,
    best_for: "teams already on Postgres, compliance-heavy workloads",
    source: "AIMultiple 2026 benchmark"
  },
  "milvus": {
    name: "Milvus",
    type: "distributed",
    strengths: ["IVF-HNSW hybrid", "highest dimensional recall 0.971", "732 filtered QPS"],
    qps: 5063,
    best_for: "billion-scale, high-dimensional",
    source: "arXiv 2608.12812"
  },
  "qdrant": {
    name: "Qdrant",
    type: "Rust-based",
    strengths: ["fastest P50 4.55ms", "highest QPS 216", "filtering"],
    qps: 216,
    best_for: "self-hosted production, filtering",
    source: "arXiv 2608.12812"
  }
};

export const VECTOR_DB_ICONS: Record<string, string> = {
  "pgvector": "🐘",
  "milvus": "🌊",
  "qdrant": "⚡"
};

export const VECTOR_DB_COLORS: Record<string, string> = {
  "pgvector": "from-blue-600 to-indigo-700",
  "milvus": "from-cyan-500 to-blue-600",
  "qdrant": "from-orange-500 to-red-600"
};
