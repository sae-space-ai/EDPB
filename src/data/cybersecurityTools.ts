export interface CybersecurityTool {
  name: string;
  type: string;
  description: string;
  license?: string;
  strengths: string[];
  source: string;
}

export const CYBERSECURITY_TOOLS: Record<string, CybersecurityTool> = {
  "strix": {
    name: "Strix",
    type: "autonomous_pentest",
    description: "AI agents validate every finding with working PoC, Docker-based",
    license: "Apache 2.0",
    strengths: ["PoC validation", "multi-agent by phase", "CI/CD ready"],
    source: "Contabo 2026"
  },
  "nuclei": {
    name: "Nuclei",
    type: "scalable_scanner",
    description: "YAML-template scanner, AI-assisted template generation",
    strengths: ["community templates", "new CVE within days", "AI draft templates"],
    source: "Contabo 2026"
  },
  "pentestgpt": {
    name: "PentestGPT",
    type: "llm_copilot",
    description: "LLM co-pilot for human testers, task tree maintenance",
    strengths: ["guided manual testing", "command generation", "output parsing"],
    license: "MIT",
    source: "GitHub GreyDGL"
  },
  "pentagi": {
    name: "PentAGI",
    type: "autonomous_multiagent",
    description: "Docker sandbox, 20+ tools orchestrated autonomously",
    strengths: ["research/dev/infra agents", "smart memory", "Go-based"],
    source: "Zenn 2026"
  },
  "hexstrike_ai": {
    name: "HexStrike AI",
    type: "mcp_bridge",
    description: "MCP server connecting LLMs to 150+ security tools",
    strengths: ["model-agnostic", "real-time strategy adaptation"],
    source: "Zenn 2026"
  },
  "faraday": {
    name: "Faraday",
    type: "vulnerability_management",
    description: "Ingests 80+ tools, deduplicates findings, team collaboration",
    license: "GPL-3.0",
    strengths: ["shared workspace", "PostgreSQL backend", "red-team focused"],
    source: "Contabo 2026"
  },
  "metasploit": {
    name: "Metasploit Framework",
    type: "exploitation",
    description: "Industry-standard exploit development",
    strengths: ["validated exploits", "proof of exploitability"],
    source: "Contabo 2026"
  },
  "recon_ng": {
    name: "Recon-ng",
    type: "osint_recon",
    description: "Modular Python reconnaissance framework",
    strengths: ["subdomain enum", "tech fingerprinting", "OSINT"],
    source: "Contabo 2026"
  }
};

export const TOOL_ICONS: Record<string, string> = {
  "strix": "🎯",
  "nuclei": "⚛️",
  "pentestgpt": "🤖",
  "pentagi": "🔬",
  "hexstrike_ai": "⚡",
  "faraday": "🛡️",
  "metasploit": "💥",
  "recon_ng": "🔍"
};

export const TOOL_COLORS: Record<string, string> = {
  "strix": "from-red-500 to-rose-600",
  "nuclei": "from-orange-500 to-amber-600",
  "pentestgpt": "from-blue-500 to-indigo-600",
  "pentagi": "from-purple-500 to-violet-600",
  "hexstrike_ai": "from-yellow-500 to-orange-600",
  "faraday": "from-green-500 to-emerald-600",
  "metasploit": "from-slate-700 to-gray-900",
  "recon_ng": "from-cyan-500 to-teal-600"
};

export const TOOL_TYPE_LABELS: Record<string, string> = {
  "autonomous_pentest": "Autonomous Pentest",
  "scalable_scanner": "Scalable Scanner",
  "llm_copilot": "LLM Co-pilot",
  "autonomous_multiagent": "Autonomous Multi-Agent",
  "mcp_bridge": "MCP Bridge",
  "vulnerability_management": "Vulnerability Management",
  "exploitation": "Exploitation Framework",
  "osint_recon": "OSINT Reconnaissance"
};
