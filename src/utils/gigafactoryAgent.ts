import { GIGAFACTORY_REGISTRY } from "../data/gigafactories";
import { PROFILE } from "../data/profile";

function computeHash(inputString: string): string {
  let h = 0;
  for (let i = 0; i < inputString.length; i++) {
    const char = inputString.charCodeAt(i);
    h = ((h << 5) - h) + char;
    h = h & h;
  }
  return Math.abs(h).toString(16).padStart(8, '0').slice(0, 16);
}

export interface DiscoveredAgent {
  id: string;
  name: string;
  endpoint: string;
  capabilities: string[];
  auth_type: string;
  free_tier: boolean;
  status: string;
  provider: string;
  source: string;
}

export interface Evidence {
  timestamp: string;
  source: string;
  action: string;
  candidate: string;
  data_hash: string;
  human_oversight: boolean;
  traceability: boolean;
  auditability: boolean;
  evidence_hash: string;
}

export function listFactories(): { status: string; total_factories: number; factories: Record<string, { name: string; type: string; agents_count: string | number; auth_required: boolean }> } {
  const factories: Record<string, { name: string; type: string; agents_count: string | number; auth_required: boolean }> = {};
  for (const [k, v] of Object.entries(GIGAFACTORY_REGISTRY)) {
    factories[k] = {
      name: v.name,
      type: v.type,
      agents_count: v.agents_count,
      auth_required: v.auth_required
    };
  }
  return { status: "success", total_factories: Object.keys(factories).length, factories };
}

export function discoverGigafactories(factoryKey?: string): { status: string; factories: Record<string, unknown> } {
  const factories: Record<string, unknown> = {};
  const keys = factoryKey ? [factoryKey] : Object.keys(GIGAFACTORY_REGISTRY);

  for (const key of keys) {
    const config = GIGAFACTORY_REGISTRY[key];
    if (!config) {
      factories[key] = { status: "error", message: `Unknown factory: ${key}` };
      continue;
    }

    if (config.type === "public_directory") {
      factories[key] = {
        status: "available",
        name: config.name,
        type: "public_directory",
        endpoint: config.discovery_endpoint,
        agents_count: config.agents_count,
        format: config.format,
        fields: config.fields,
        note: "Direct JSON discovery via .well-known endpoint"
      };
    } else if (config.type === "public_registry") {
      factories[key] = {
        status: "available",
        name: config.name,
        type: "public_registry",
        endpoint: config.discovery_endpoint,
        agents_count: config.agents_count,
        auth_required: config.auth_required,
        registration_methods: config.registration_methods,
        cli_command: config.cli_command,
        note: "Registration required. Use CLI or curl."
      };
    } else if (config.type === "workflow_repository") {
      factories[key] = {
        status: "available",
        name: config.name,
        type: "workflow_repository",
        endpoint: config.discovery_endpoint,
        agents_count: config.agents_count,
        description: config.description,
        note: "Open-source workflows. Clone repository."
      };
    } else if (config.type === "mcp_search_engine") {
      factories[key] = {
        status: "available",
        name: config.name,
        type: "mcp_search_engine",
        endpoint: config.discovery_endpoint,
        agents_count: config.agents_count,
        install_command: config.install_command,
        description: config.description,
        note: "MCP server. Install via npx."
      };
    } else if (config.type === "a2a_registry") {
      factories[key] = {
        status: "available",
        name: config.name,
        type: "a2a_registry",
        endpoint: config.discovery_endpoint,
        agents_count: config.agents_count,
        description: config.description,
        note: "A2A protocol registry. Public submissions."
      };
    }
  }

  return { status: "success", factories };
}

export function integrateAgents(agents: Array<Record<string, unknown>>): { status: string; integrated_count: number; agents: DiscoveredAgent[] } {
  const integrated: DiscoveredAgent[] = [];
  for (const agent of agents) {
    const normalized: DiscoveredAgent = {
      id: String(agent.id || agent.name || "unknown"),
      name: String(agent.name || ""),
      endpoint: String(agent.endpoint || ""),
      capabilities: Array.isArray(agent.capabilities) ? agent.capabilities.map(String) : [],
      auth_type: String((agent.auth as Record<string, unknown>)?.type || "none"),
      free_tier: Boolean((agent.pricing as Record<string, unknown>)?.free_tier || false),
      status: String(agent.status || "unknown"),
      provider: String((agent.provider as Record<string, unknown>)?.name || ""),
      source: "gigafactory_discovery"
    };
    integrated.push(normalized);
  }
  return { status: "success", integrated_count: integrated.length, agents: integrated };
}

export function generateGigafactoryEvidence(source: string, action: string, data: Record<string, unknown> = {}): { status: string; evidence: Evidence } {
  const data_hash = computeHash(JSON.stringify(data));
  const payload: Omit<Evidence, "evidence_hash"> = {
    timestamp: new Date().toISOString(),
    source,
    action,
    candidate: PROFILE.name,
    data_hash,
    human_oversight: true,
    traceability: true,
    auditability: true
  };
  const evidence_hash = computeHash(JSON.stringify(payload));
  return { status: "success", evidence: { ...payload, evidence_hash } };
}

export function getGigafactoryStatus() {
  const totalAgents = Object.values(GIGAFACTORY_REGISTRY).reduce((acc, v) => {
    const count = typeof v.agents_count === 'number' ? v.agents_count : 0;
    return acc + count;
  }, 0);

  return {
    agent: "GIGAFACTORY-SEARCHER",
    version: "1.0.0",
    role: "Buscador e Integrador de Gigafactorías de Uso Público",
    candidate: PROFILE.name,
    factories_registered: Object.keys(GIGAFACTORY_REGISTRY).length,
    factory_keys: Object.keys(GIGAFACTORY_REGISTRY),
    total_agents_discoverable: totalAgents,
    status: "ready"
  };
}
