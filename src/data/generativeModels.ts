export interface GenerativeModel {
  name: string;
  license: string;
  params: string;
  strength: string;
  ollama_cmd?: string;
  commercial: boolean | string;
  risk: string;
}

export const GENERATIVE_AI_MODELS: Record<string, GenerativeModel> = {
  "qwen3": {
    name: "Qwen3",
    license: "Apache 2.0",
    params: "8B-235B",
    strength: "general purpose, multilingual, tool use",
    ollama_cmd: "ollama run qwen3:8b",
    commercial: true,
    risk: "low"
  },
  "deepseek_v4": {
    name: "DeepSeek-V4",
    license: "MIT",
    params: "1.6T",
    strength: "high-end coding and reasoning",
    commercial: true,
    risk: "low"
  },
  "glm_52": {
    name: "GLM-5.2",
    license: "MIT",
    params: "753B",
    strength: "frontier reasoning, Chinese/English",
    commercial: true,
    risk: "low"
  },
  "gemma_4": {
    name: "Gemma 4",
    license: "Apache 2.0",
    params: "27B",
    strength: "multimodal, 140+ languages",
    ollama_cmd: "ollama run gemma3:27b",
    commercial: true,
    risk: "low"
  },
  "phi_4_mini": {
    name: "Phi-4-mini",
    license: "MIT",
    params: "14B",
    strength: "weak hardware, efficient",
    commercial: true,
    risk: "low"
  },
  "llama_4_scout": {
    name: "Llama 4 Scout",
    license: "Llama Community",
    params: "17B",
    strength: "10M token context",
    commercial: "yes with restrictions",
    risk: "medium"
  },
  "kimi_k3": {
    name: "Kimi K3",
    license: "Kimi K3 License",
    params: "2.8T",
    strength: "88.3 Terminal-Bench 2.1",
    commercial: "yes with conditions",
    risk: "medium"
  }
};

export const MODEL_ICONS: Record<string, string> = {
  "qwen3": "🌟",
  "deepseek_v4": "🔍",
  "glm_52": "🧠",
  "gemma_4": "💎",
  "phi_4_mini": "⚡",
  "llama_4_scout": "🦙",
  "kimi_k3": "🚀"
};

export const MODEL_COLORS: Record<string, string> = {
  "qwen3": "from-blue-500 to-cyan-600",
  "deepseek_v4": "from-purple-500 to-violet-600",
  "glm_52": "from-emerald-500 to-teal-600",
  "gemma_4": "from-amber-500 to-orange-600",
  "phi_4_mini": "from-rose-500 to-pink-600",
  "llama_4_scout": "from-indigo-500 to-blue-600",
  "kimi_k3": "from-slate-700 to-gray-900"
};
