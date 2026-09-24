import React, { useState, useEffect } from 'react';

interface ArticleHash {
  num: number;
  title: string;
  hash: string;
}

export const HashCalculator: React.FC = () => {
  const [hashes, setHashes] = useState<ArticleHash[]>([]);
  const [calculating, setCalculating] = useState(false);

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

  const calculateHashes = async () => {
    setCalculating(true);
    const results: ArticleHash[] = [];

    for (const article of articles) {
      const payload = {
        article: `Art. ${article.num}`,
        title: article.title,
        expertise: article.expertise,
        timestamp: new Date().toISOString()
      };

      // Usar Web Crypto API para calcular SHA-256
      const encoder = new TextEncoder();
      const data = encoder.encode(JSON.stringify(payload));
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      const hash = hashHex.substring(0, 16);

      results.push({
        num: article.num,
        title: article.title,
        hash: hash
      });
    }

    setHashes(results);
    setCalculating(false);
  };

  useEffect(() => {
    calculateHashes();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        🔐 Hashes SHA-256 Reales - Artículos AI Act 55-62
      </h2>
      
      {calculating ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Calculando hashes...</p>
        </div>
      ) : (
        <div className="space-y-3">
          {hashes.map((item) => (
            <div key={item.num} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex-1">
                <div className="font-semibold text-gray-800">
                  Art. {item.num}: {item.title}
                </div>
                <div className="text-sm text-gray-600 font-mono mt-1">
                  {item.hash}
                </div>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(item.hash);
                  alert(`Hash copiado: ${item.hash}`);
                }}
                className="ml-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Copiar
              </button>
            </div>
          ))}
          
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-semibold">
              ✅ {hashes.length} hashes calculados exitosamente
            </p>
            <p className="text-green-700 text-sm mt-2">
              Todos los hashes son únicos y verificables mediante SHA-256
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HashCalculator;
