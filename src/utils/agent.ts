import { PROFILE } from "../data/profile";
import { AI_ACT_MAPPING } from "../data/aiActMapping";

function hash(data: string): string {
  let h = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    h = ((h << 5) - h) + char;
    h = h & h;
  }
  return Math.abs(h).toString(16).padStart(8, '0').slice(0, 16);
}

export interface Evidence {
  timestamp: string;
  article: string;
  article_title: string;
  expertise_applied: string[];
  human_oversight: boolean;
  traceability: boolean;
  auditability: boolean;
  source: string;
  candidate: string;
  context: Record<string, unknown>;
  evidence_hash: string;
}

export function generateEvidence(article: string, context: Record<string, unknown> = {}): { status: string; evidence: Evidence } {
  const mapping = AI_ACT_MAPPING[article] || { title: "General", expertise: ["AI Governance"] };
  const payload: Omit<Evidence, "evidence_hash"> = {
    timestamp: new Date().toISOString(),
    article,
    article_title: mapping.title,
    expertise_applied: mapping.expertise,
    human_oversight: true,
    traceability: true,
    auditability: true,
    source: "SAE Compliance & Evidence Engine",
    candidate: PROFILE.name,
    context,
  };
  const evidence_hash = hash(JSON.stringify(payload));
  return { status: "success", evidence: { ...payload, evidence_hash } };
}

export function analyzeRegulation(text: string): { status: string; keywords_found: string[]; relevance_score: number; expertise_match: string[]; candidate: string } {
  const keywords = ["AI Act", "ePrivacy", "eIDAS", "GDPR", "DSA", "DMA", "NIS2", "Cloud Act", "FISA", "LED", "BCR", "PETs", "PbD", "Blockchain"];
  const found = keywords.filter(k => text.toLowerCase().includes(k.toLowerCase()));
  const score = Math.round((found.length / Math.max(keywords.length, 1)) * 10000) / 10000;
  return {
    status: "success",
    keywords_found: found,
    relevance_score: score,
    expertise_match: ["AI Governance", "Policy Monitoring", "Technology-related Law"],
    candidate: PROFILE.name,
  };
}

export function mapExpertiseToTask(task: string): { status: string; task: string; matched_expertise: string[]; candidate: string } {
  const mapping: Record<string, string[]> = {
    "AI Act": ["AI Governance", "AI Risk Management", "AI Auditing"],
    "anonymisation": ["Anonymisation techniques", "Re-identification attacks"],
    "cloud": ["Cloud architectures", "Cloud security", "Cloud Act"],
    "ePrivacy": ["Behavioural advertising", "Digital tracking", "Cookies"],
    "eIDAS": ["Digital identity", "Trust services", "Biometrics"],
    "DPIA": ["Risk management", "Data breaches", "Fundamental rights"],
    "training": ["Exercises / training", "Knowledge transfer"],
    "GPAI": ["AI Governance", "AI Risk Management", "Traceability"],
    "cybersecurity": ["AI Security", "Cryptology", "Web security"],
  };
  const matched = mapping[task] || ["General AI expertise"];
  return { status: "success", task, matched_expertise: matched, candidate: PROFILE.name };
}

export function validateHonourDeclaration(): { status: string; valid: boolean; checks: Record<string, boolean> } {
  const checks = PROFILE.honour_declaration;
  return { status: "success", valid: Object.values(checks).every(Boolean), checks };
}

export function generateTrainingModule(topic: string): { status: string; module: Record<string, unknown> } {
  return {
    status: "success",
    module: {
      title: `Training module: ${topic}`,
      author: PROFILE.name,
      duration_hours: 4,
      objectives: [
        `Understand ${topic} in the context of the EU AI Act`,
        "Apply evidence-based compliance",
        "Identify risks and human oversight requirements",
        "Map regulatory requirements to technical controls",
      ],
      methodology: "Theory + case studies + practical exercises",
      deliverables: ["Slides", "Checklist", "Evidence template", "Assessment quiz"],
      keywords: PROFILE.keywords.slice(0, 10),
    },
  };
}

export function getAgentStatus() {
  return {
    agent: "EDPB-SPE-EXPERT-2025",
    version: "1.0.0",
    candidate: PROFILE.name,
    email: PROFILE.email,
    expertise_fields: PROFILE.expertise.technical.length + PROFILE.expertise.legal.length,
    keywords: PROFILE.keywords.length,
    projects: PROFILE.projects.length,
    publications: PROFILE.publications.length,
    status: "ready",
  };
}
