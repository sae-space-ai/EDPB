// Script temporal para calcular hashes SHA-256 reales de los artículos 55-62
import { createHash } from 'crypto';

function computeHash(inputString) {
  return createHash('sha256')
    .update(inputString)
    .digest('hex')
    .substring(0, 16);
}

const articles = [
  { num: 55, title: "GPAI penalties", expertise: ["Regulatory Analysis", "AI Governance", "AI Compliance"] },
  { num: 56, title: "Innovation support", expertise: ["AI Governance", "Fintech", "Training exercises"] },
  { num: 57, title: "SME support", expertise: ["AI Compliance", "Fintech", "Evidence-Based Compliance"] },
  { num: 58, title: "Sandboxes for SMEs", expertise: ["AI Governance", "AI Compliance", "Risk Management"] },
  { num: 59, title: "Testing in real world", expertise: ["AI Risk Management", "Human Oversight", "AI Auditing"] },
  { num: 60, title: "Informed consent", expertise: ["Data Protection", "Human Oversight", "Trustworthy AI"] },
  { num: 61, title: "Supervision", expertise: ["AI Supervision", "Policy Monitoring", "Regulatory Analysis"] },
  { num: 62, title: "Market surveillance", expertise: ["Regulatory Analysis", "Policy Monitoring", "AI Auditing"] }
];

console.log('Hashes SHA-256 reales para artículos 55-62:\n');

articles.forEach(article => {
  const payload = {
    article: `Art. ${article.num}`,
    title: article.title,
    expertise: article.expertise,
    timestamp: new Date().toISOString()
  };
  
  const hash = computeHash(JSON.stringify(payload));
  console.log(`Art. ${article.num} (${article.title}): ${hash}`);
});
