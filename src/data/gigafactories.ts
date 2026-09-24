export interface Gigafactory {
  name: string;
  type: string;
  discovery_endpoint: string;
  format: string;
  auth_required: boolean;
  auth_env?: string;
  agents_count: string | number;
  fields?: string[];
  source: string;
  agent_traffic?: string;
  registration_methods?: string[];
  cli_command?: string;
  description?: string;
  install_command?: string;
}

export const GIGAFACTORY_REGISTRY: Record<string, Gigafactory> = {
  "nexus_agi": {
    name: "Nexus-AGI Directory",
    type: "public_directory",
    discovery_endpoint: "https://nexus-agi.com/.well-known/seeds-public.json",
    format: "json_array",
    auth_required: false,
    agents_count: 133,
    fields: ["id", "name", "endpoint", "auth", "capabilities", "rate_limits", "pricing", "docs", "status", "reputation", "provider"],
    source: "GitHub nexus-agi-directory",
    agent_traffic: "98% agents, 2% humans"
  },
  "ai_agent_marketplace": {
    name: "AI Agent Marketplace",
    type: "public_registry",
    discovery_endpoint: "https://www.deepnlp.org/api/ai_agent_marketplace/registry",
    format: "rest_api",
    auth_required: true,
    auth_env: "AI_AGENT_MARKETPLACE_ACCESS_KEY",
    agents_count: "10K+",
    registration_methods: ["website", "curl", "cli", "python", "nodejs"],
    cli_command: "agtm upload --github {repo}",
    source: "GitHub AI-Agent-Hub/ai-agent-marketplace"
  },
  "peli_agent_factory": {
    name: "Peli's Agent Factory",
    type: "workflow_repository",
    discovery_endpoint: "https://github.com/github/gh-aw",
    format: "github_repo",
    auth_required: false,
    agents_count: "100+",
    description: "Automated agentic workflows in Markdown, compiled to GitHub Actions",
    source: "GitHub Next / Microsoft Research"
  },
  "beacon_mcp": {
    name: "Beacon MCP",
    type: "mcp_search_engine",
    discovery_endpoint: "https://registry-ruby.vercel.app",
    format: "mcp_server",
    auth_required: false,
    agents_count: "3,800+",
    install_command: "npx -y beacon-mcp",
    description: "Search engine for open-source AI agents, as MCP server",
    source: "Beacon MCP Registry"
  },
  "a2astore": {
    name: "A2AStore",
    type: "a2a_registry",
    discovery_endpoint: "https://a2astore.co",
    format: "a2a_protocol",
    auth_required: false,
    agents_count: "80+",
    description: "Live registry for A2A protocol agents",
    source: "A2A Protocol Store"
  }
};

export const FACTORY_ICONS: Record<string, string> = {
  "nexus_agi": "🌐",
  "ai_agent_marketplace": "🏪",
  "peli_agent_factory": "⚙️",
  "beacon_mcp": "🔍",
  "a2astore": "🔗"
};

export const FACTORY_COLORS: Record<string, string> = {
  "nexus_agi": "from-blue-500 to-cyan-600",
  "ai_agent_marketplace": "from-purple-500 to-violet-600",
  "peli_agent_factory": "from-emerald-500 to-teal-600",
  "beacon_mcp": "from-amber-500 to-orange-600",
  "a2astore": "from-rose-500 to-pink-600"
};

export const FACTORY_TYPE_LABELS: Record<string, string> = {
  "public_directory": "Public Directory",
  "public_registry": "Public Registry",
  "workflow_repository": "Workflow Repository",
  "mcp_search_engine": "MCP Search Engine",
  "a2a_registry": "A2A Protocol Registry"
};
