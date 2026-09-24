export interface EcosystemComponent {
  status: string;
  role?: string;
  license?: string;
  mode?: string;
  strength?: string;
  provider?: string;
  agents?: number | string;
  auth?: boolean;
}

export interface EcosystemState {
  name: string;
  version: string;
  candidate: string;
  candidate_id: string;
  start_time: number;
  instance_id: string;
  mode: string;
  health_check_interval: number;
  auto_repair: boolean;
  telemetry_enabled: boolean;
  self_healing: boolean;
  region: string;
  deployment_url: string;
  git_commit: string;
  git_branch: string;
}

export interface Telemetry {
  requests_total: number;
  requests_success: number;
  requests_error: number;
  evidence_generated: number;
  subagents_dispatched: number;
  scans_simulated: number;
  gigafactory_queries: number;
  auto_repairs: number;
  uptime_seconds: number;
  last_health_check: string | null;
  latency_history: number[];
  error_history: Array<{ action: string; error: string; ts: string }>;
}

export const ECOSYSTEM: EcosystemState = {
  name: "EDPB-SUPER-ECOSYSTEM",
  version: "4.0.0",
  candidate: "Manuel Gago Fernández",
  candidate_id: "EDPB-SPE-2025-2030",
  start_time: Date.now() / 1000,
  instance_id: Math.random().toString(36).substring(2, 14),
  mode: "continuous",
  health_check_interval: 30,
  auto_repair: true,
  telemetry_enabled: true,
  self_healing: true,
  region: "vercel",
  deployment_url: "localhost",
  git_commit: "local",
  git_branch: "main"
};

export const COMPONENTS: Record<string, Record<string, EcosystemComponent>> = {
  generative_ai: {
    qwen3: { status: "active", role: "general_llm", license: "Apache-2.0" },
    deepseek_v4: { status: "active", role: "coding_llm", license: "MIT" },
    glm_52: { status: "active", role: "reasoning_llm", license: "MIT" },
    gemma_4: { status: "active", role: "multimodal_llm", license: "Apache-2.0" },
    phi_4_mini: { status: "active", role: "edge_llm", license: "MIT" },
    llama_4_scout: { status: "active", role: "long_context_llm", license: "Llama" },
    kimi_k3: { status: "active", role: "frontier_llm", license: "Kimi" }
  },
  cybersecurity: {
    strix: { status: "armed", role: "autonomous_pentest", mode: "dry-run" },
    nuclei: { status: "armed", role: "scanner", mode: "dry-run" },
    pentestgpt: { status: "armed", role: "llm_copilot", mode: "advisory" },
    pentagi: { status: "armed", role: "multiagent", mode: "dry-run" },
    hexstrike_ai: { status: "armed", role: "mcp_bridge", mode: "advisory" },
    faraday: { status: "armed", role: "vuln_mgmt", mode: "ingest" },
    metasploit: { status: "armed", role: "exploitation", mode: "lab-only" },
    recon_ng: { status: "armed", role: "osint", mode: "passive" }
  },
  databases: {
    pgvector: { status: "active", role: "vector_store", strength: "WAL+PITR" },
    milvus: { status: "standby", role: "billion_scale", strength: "recall" },
    qdrant: { status: "standby", role: "low_latency", strength: "filtering" }
  },
  subagents: {
    ai_governance: { status: "ready", provider: "qwen3" },
    ai_act_compliance: { status: "ready", provider: "glm_52" },
    risk_assessment: { status: "ready", provider: "qwen3" },
    regulatory_monitor: { status: "ready", provider: "glm_52" },
    privacy_tech: { status: "ready", provider: "qwen3" },
    cloud_security: { status: "ready", provider: "deepseek_v4" },
    training_designer: { status: "ready", provider: "gemma_4" },
    evidence_engine: { status: "ready", provider: "phi_4_mini" }
  },
  gigafactories: {
    nexus_agi: { status: "reachable", agents: 133, auth: false },
    ai_agent_marketplace: { status: "reachable", agents: "10K+", auth: true },
    peli_agent_factory: { status: "reachable", agents: "100+", auth: false },
    beacon_mcp: { status: "reachable", agents: "3,800+", auth: false },
    a2astore: { status: "reachable", agents: "80+", auth: false }
  }
};

export const TELEMETRY: Telemetry = {
  requests_total: 0,
  requests_success: 0,
  requests_error: 0,
  evidence_generated: 0,
  subagents_dispatched: 0,
  scans_simulated: 0,
  gigafactory_queries: 0,
  auto_repairs: 0,
  uptime_seconds: 0,
  last_health_check: null,
  latency_history: [],
  error_history: []
};

export const AVAILABLE_ACTIONS = [
  "status",
  "start_engine",
  "stop_engine",
  "health_check",
  "repair_component",
  "dispatch_subagent",
  "generate_evidence",
  "cybersecurity_scan",
  "discover_gigafactories",
  "generate_llm",
  "get_log",
  "reset_telemetry",
  "run_full_ecosystem_test"
];
