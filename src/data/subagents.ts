export interface SubAgent {
  description: string;
  tools: string[];
  system: string;
  expertise: string[];
  provider_preferred: string;
}

export const SUBAGENT_REGISTRY: Record<string, SubAgent> = {
  "ai_governance": {
    description: "AI governance, human oversight, auditability, trustworthy AI",
    tools: ["google_search", "url_context"],
    system: "Eres especialista en gobernanza de IA, supervisión humana y auditabilidad. Basas tus respuestas en el AI Act y marcos de IA confiable.",
    expertise: ["AI Governance", "Human Oversight", "Auditability"],
    provider_preferred: "gemini"
  },
  "ai_act_compliance": {
    description: "EU AI Act compliance, evidence generation, traceability",
    tools: ["sae_engine", "hash_sha256"],
    system: "Eres experto en cumplimiento del AI Act. Generas evidencias trazables con hash SHA-256 y supervisión humana.",
    expertise: ["AI Compliance", "Evidence-Based Compliance", "Traceability"],
    provider_preferred: "nvidia"
  },
  "risk_assessment": {
    description: "DPIA, risk management, re-identification attacks, inference attacks",
    tools: ["dpia_generator", "risk_matrix"],
    system: "Eres especialista en evaluación de riesgos, DPIA y ataques de re-identificación. Aplicas metodologías estructuradas.",
    expertise: ["Risk Management", "DPIA", "Re-identification"],
    provider_preferred: "openrouter"
  },
  "regulatory_monitor": {
    description: "EU policy monitoring, legislative analysis, AI Act, ePrivacy, eIDAS",
    tools: ["google_search", "url_context"],
    system: "Eres analista regulatorio especializado en legislación UE: AI Act, ePrivacy, eIDAS, DSA, DMA, NIS2.",
    expertise: ["Policy Monitoring", "Regulatory Analysis", "Technology-related Law"],
    provider_preferred: "gemini"
  },
  "privacy_tech": {
    description: "Anonymisation, PETs, ePrivacy, tracking, cookies, RTB",
    tools: ["cryptography_lib", "forensic_analysis"],
    system: "Eres especialista en tecnologías de privacidad: anonimización, PETs, tracking, fingerprinting, RTB.",
    expertise: ["Anonymisation", "PETs", "ePrivacy"],
    provider_preferred: "groq"
  },
  "cloud_security": {
    description: "Cloud Act, FISA, cloud architectures, eIDAS, PKI, zero trust",
    tools: ["eidas_validator", "pki_checker"],
    system: "Eres experto en seguridad cloud, Cloud Act, FISA, eIDAS, PKI y arquitecturas zero trust.",
    expertise: ["Cloud Security", "eIDAS", "PKI"],
    provider_preferred: "deepseek"
  },
  "training_designer": {
    description: "Training module design, exercises, knowledge transfer",
    tools: ["gemini_generate", "content_structurer"],
    system: "Eres diseñador de formación especializado en IA, gobernanza y cumplimiento. Creas módulos estructurados con ejercicios prácticos.",
    expertise: ["Training", "Knowledge Transfer", "Exercises"],
    provider_preferred: "mistral"
  },
  "evidence_engine": {
    description: "Evidence generation, traceability, auditability, SHA-256",
    tools: ["hash_sha256", "json_ld"],
    system: "Eres el motor de evidencias. Generas registros trazables, auditables y verificables con hash criptográfico.",
    expertise: ["Evidence", "Traceability", "Auditability"],
    provider_preferred: "cerebras"
  }
};

export const SUBAGENT_ICONS: Record<string, string> = {
  "ai_governance": "🏛️",
  "ai_act_compliance": "📋",
  "risk_assessment": "⚠️",
  "regulatory_monitor": "📡",
  "privacy_tech": "🔒",
  "cloud_security": "☁️",
  "training_designer": "🎓",
  "evidence_engine": "🔬"
};

export const SUBAGENT_COLORS: Record<string, string> = {
  "ai_governance": "from-blue-500 to-indigo-600",
  "ai_act_compliance": "from-emerald-500 to-teal-600",
  "risk_assessment": "from-amber-500 to-orange-600",
  "regulatory_monitor": "from-purple-500 to-violet-600",
  "privacy_tech": "from-rose-500 to-pink-600",
  "cloud_security": "from-cyan-500 to-sky-600",
  "training_designer": "from-violet-500 to-purple-600",
  "evidence_engine": "from-green-500 to-emerald-600"
};
