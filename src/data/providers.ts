export interface LLMProvider {
  base: string;
  model: string;
  key_env: string;
  rpm: number;
  rpd: number;
  context: string;
}

export const FREE_PROVIDERS: Record<string, LLMProvider> = {
  "gemini": {
    base: "https://generativelanguage.googleapis.com/v1beta",
    model: "gemini-3.7-flash",
    key_env: "GEMINI_API_KEY",
    rpm: 15,
    rpd: 1500,
    context: "1M tokens"
  },
  "openrouter": {
    base: "https://openrouter.ai/api/v1",
    model: "nvidia/nemotron-3-ultra-550b-a55b:free",
    key_env: "OPENROUTER_API_KEY",
    rpm: 20,
    rpd: 50,
    context: "1M tokens"
  },
  "nvidia": {
    base: "https://integrate.api.nvidia.com/v1",
    model: "z-ai/glm-5.2",
    key_env: "NVIDIA_API_KEY",
    rpm: 40,
    rpd: 1000,
    context: "1M tokens"
  },
  "groq": {
    base: "https://api.groq.com/openai/v1",
    model: "llama-3.3-70b-versatile",
    key_env: "GROQ_API_KEY",
    rpm: 30,
    rpd: 14400,
    context: "128K tokens"
  },
  "deepseek": {
    base: "https://api.deepseek.com/v1",
    model: "deepseek-v3.2",
    key_env: "DEEPSEEK_API_KEY",
    rpm: 60,
    rpd: 10000,
    context: "128K tokens"
  },
  "mistral": {
    base: "https://api.mistral.ai/v1",
    model: "mistral-small-latest",
    key_env: "MISTRAL_API_KEY",
    rpm: 60,
    rpd: 1000,
    context: "128K tokens"
  },
  "cerebras": {
    base: "https://api.cerebras.ai/v1",
    model: "llama-3.1-8b",
    key_env: "CEREBRAS_API_KEY",
    rpm: 30,
    rpd: 14400,
    context: "128K tokens"
  }
};

export const PROVIDER_ICONS: Record<string, string> = {
  "gemini": "✦",
  "openrouter": "⬡",
  "nvidia": "◈",
  "groq": "⚡",
  "deepseek": "🔍",
  "mistral": "🌊",
  "cerebras": "⊛"
};

export const PROVIDER_COLORS: Record<string, string> = {
  "gemini": "from-blue-500 to-cyan-500",
  "openrouter": "from-violet-500 to-purple-600",
  "nvidia": "from-green-500 to-emerald-600",
  "groq": "from-orange-500 to-red-500",
  "deepseek": "from-indigo-500 to-blue-600",
  "mistral": "from-sky-500 to-blue-500",
  "cerebras": "from-amber-500 to-yellow-500"
};
