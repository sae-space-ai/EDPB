import { PROFILE } from "../data/profile";
import { GENERATIVE_AI_MODELS } from "../data/generativeModels";
import { CYBERSECURITY_TOOLS } from "../data/cybersecurityTools";
import { VECTOR_DB_CONFIG } from "../data/vectorDatabases";
import { GIGAFACTORY_REGISTRY } from "../data/gigafactories";
import { SUBAGENT_REGISTRY } from "../data/subagents";

function computeHash(inputString: string): string {
  let h = 0;
  for (let i = 0; i < inputString.length; i++) {
    const char = inputString.charCodeAt(i);
    h = ((h << 5) - h) + char;
    h = h & h;
  }
  return Math.abs(h).toString(16).padStart(8, '0').slice(0, 16);
}

export interface CybersecurityScan {
  status: string;
  tool: string;
  type: string;
  target: string;
  description: string;
  strengths: string[];
  timestamp: string;
  evidence_hash: string;
}

export interface Evidence {
  timestamp: string;
  article: string;
  human_oversight: boolean;
  traceability: boolean;
  auditability: boolean;
  candidate: string;
  context: Record<string, unknown>;
  evidence_hash: string;
}

export function cybersecurityScan(target: string, tool: string = "strix"): CybersecurityScan | { status: string; available: string[] } {
  const toolConfig = CYBERSECURITY_TOOLS[tool];
  if (!toolConfig) {
    return { status: "error", available: Object.keys(CYBERSECURITY_TOOLS) };
  }
  return {
    status: "success",
    tool: toolConfig.name,
    type: toolConfig.type,
    target,
    description: toolConfig.description,
    strengths: toolConfig.strengths,
    timestamp: new Date().toISOString(),
    evidence_hash: computeHash(target + tool)
  };
}

export function generateEvidence(article: string, context: Record<string, unknown> = {}): { status: string; evidence: Evidence } {
  const payload: Omit<Evidence, "evidence_hash"> = {
    timestamp: new Date().toISOString(),
    article,
    human_oversight: true,
    traceability: true,
    auditability: true,
    candidate: PROFILE.name,
    context
  };
  const evidence_hash = computeHash(JSON.stringify(payload));
  return { status: "success", evidence: { ...payload, evidence_hash } };
}

export function dispatchSubagent(agentName: string, description: string): { status: string; agent?: string; task?: string; provider?: string; tools?: string[]; timestamp?: string; available?: string[] } {
  const agent = SUBAGENT_REGISTRY[agentName];
  if (!agent) {
    return { status: "error", available: Object.keys(SUBAGENT_REGISTRY) };
  }
  return {
    status: "dispatched",
    agent: agentName,
    task: description,
    provider: agent.provider_preferred,
    tools: agent.tools,
    timestamp: new Date().toISOString()
  };
}

export function listGenerativeModels() {
  return { status: "success", models: GENERATIVE_AI_MODELS };
}

export function listCybersecurityTools() {
  return { status: "success", tools: CYBERSECURITY_TOOLS };
}

export function listVectorDatabases() {
  return { status: "success", databases: VECTOR_DB_CONFIG };
}

export function getSuperAlgorithmStatus() {
  return {
    agent: "SUPERALGORITMO-INTEGRAL",
    version: "3.0.0",
    role: "Arquitecto Algorítmico + Orquestador + Ciberseguridad Implacable",
    candidate: PROFILE.name,
    candidate_id: "EDPB-SPE-2025-2030",
    generative_models: Object.keys(GENERATIVE_AI_MODELS).length,
    cybersecurity_tools: Object.keys(CYBERSECURITY_TOOLS).length,
    vector_dbs: Object.keys(VECTOR_DB_CONFIG).length,
    subagents: Object.keys(SUBAGENT_REGISTRY).length,
    gigafactories: Object.keys(GIGAFACTORY_REGISTRY).length,
    architecture_pattern: "Microsoft Agent Framework (data-flow workflow)",
    database: "PostgreSQL 17 + pgvector 0.8.x (WAL + PITR)",
    security_agent: "MEGAAGENTE CIBERSEGURIDAD (implacable)",
    status: "ready"
  };
}
