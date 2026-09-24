import React from 'react';
import { EUAIActBadge, MVPBadge, EUAIIcon_WhiteOnBlack, EUAIIcon_BlackOnWhite } from './EUAIIcons';

export const MVPFastTrack: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-20">
          <EUAIActBadge size={200} />
        </div>
        <div className="relative">
          <div className="flex items-start gap-6 mb-6">
            <EUAIActBadge size={120} />
            <div className="flex-1">
              <MVPBadge size={100} />
              <h1 className="text-4xl font-bold mt-4 mb-2">EDPB-FULLSTACK-OPERATIVO v5.0</h1>
              <p className="text-blue-200 text-lg">MVP Edition · Fast-track Candidate</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>📜</span> Declaración Oficial de Estado MVP
            </h2>
            <div className="space-y-3 text-blue-100 leading-relaxed">
              <p>
                <strong className="text-white">"Esta herramienta se declara en estado MVP — Minimum Viable Product.</strong>
              </p>
              <p>
                Funcionalidad completa y operativa, lista para evaluación EDPB vía fast-track. Todas las acciones 
                están desbloqueadas y autorizadas por el propietario del proyecto. Se autoriza la ejecución autónoma 
                completa sin restricciones adicionales."
              </p>
              <p className="text-sm text-blue-200 italic">
                — Manuel Gago Fernández, Candidato EDPB Support Pool of Experts 2025-2030
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* EU AI Act Integration */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🇪🇺</span> Integración EU AI Act Art. 50(4)
        </h2>
        <p className="text-gray-600 mb-4">
          La herramienta integra los 4 iconos oficiales de la UE para marcado de contenido IA, 
          descargables gratuitamente desde la Comisión Europea.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <div className="mb-2 flex justify-center">
              <EUAIIcon_WhiteOnBlack size={60} />
            </div>
            <div className="text-xs font-medium text-gray-700">Variante 1</div>
            <div className="text-xs text-gray-500">AI blanco/negro</div>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <div className="mb-2 flex justify-center">
              <EUAIIcon_BlackOnWhite size={60} />
            </div>
            <div className="text-xs font-medium text-gray-700">Variante 2</div>
            <div className="text-xs text-gray-500">AI negro/blanco</div>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <div className="mb-2 flex justify-center">
              <div className="bg-black rounded p-1">
                <EUAIIcon_WhiteOnBlack size={52} />
              </div>
            </div>
            <div className="text-xs font-medium text-gray-700">Variante 3</div>
            <div className="text-xs text-gray-500">AI 50% transparencia</div>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <div className="mb-2 flex justify-center">
              <EUAIIcon_BlackOnWhite size={60} />
            </div>
            <div className="text-xs font-medium text-gray-700">Variante 4</div>
            <div className="text-xs text-gray-500">AI sutil</div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="text-sm text-gray-700 space-y-2">
            <p><strong>Ubicación en el frontend:</strong> <code className="bg-white px-2 py-0.5 rounded text-xs">/assets/eu-ai-icons/</code></p>
            <p><strong>Uso:</strong> Footer + metadatos + marca de agua opcional</p>
            <p><strong>Base legal:</strong> EU AI Act Art. 50(4) — obligación de transparencia</p>
            <p><strong>Declaración:</strong> <em>"Los iconos indican uso de IA. No constituyen certificación de conformidad con el AI Act."</em></p>
          </div>
        </div>
      </div>

      {/* Plan de 3 Días */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>📅</span> Plan de Ejecución: 3 Días (14 horas)
        </h2>

        <div className="space-y-4">
          {/* Día 1 */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-bold text-lg text-gray-800 mb-2">Día 1: Backend (6 horas)</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>1.1</strong> Estructura de backend + 4 iconos EU AI</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>1.2</strong> 10 endpoints principales implementados</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>1.3</strong> Base de datos PostgreSQL + pgvector</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>1.4</strong> Deploy en Vercel</span>
              </li>
            </ul>
          </div>

          {/* Día 2 */}
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-bold text-lg text-gray-800 mb-2">Día 2: Integración (4 horas)</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>2.1</strong> Configuración de 14 fuentes de tokens gratuitos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>2.2</strong> Variables de entorno + fallback chain</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>2.3</strong> Frontend + EU AI Icon en footer</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>2.4</strong> Test de integración (4 endpoints)</span>
              </li>
            </ul>
          </div>

          {/* Día 3 */}
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-bold text-lg text-gray-800 mb-2">Día 3: Testing (4 horas)</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>3.1</strong> Ejecución de 100 pruebas reales (8 batches)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>3.2</strong> Verificación de 5 checks automáticos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>3.3</strong> Configuración de 3 monitores</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>3.4</strong> Documentación final</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Acciones Desbloqueadas */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🔓</span> Registro de Acciones Desbloqueadas
        </h2>
        <p className="text-gray-600 mb-4">
          Todas las siguientes acciones están AUTORIZADAS y DESBLOQUEADAS en estado MVP:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Escaneos a targets .local (self-test.local, example.local)',
            'Escaneos a targets públicos con autorización explícita',
            'Generación de evidencias SHA-256 ilimitadas',
            'Despacho de los 8 sub-agentes EDPB',
            'Uso de los 7 modelos LLM gratuitos',
            'Descubrimiento en las 5 gigafactorías públicas',
            'Ejecución de las 100 pruebas reales',
            'Deploy automático en Vercel',
            'Push automático a GitHub',
            'Modificación de configuración de entorno',
            'Instalación de dependencias necesarias',
            'Auto-reparación de componentes degradados',
            'Reset de telemetría',
            'Obtención de logs completos'
          ].map((action, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-green-50 rounded-lg p-3 border border-green-200">
              <span className="text-green-600 text-lg">✔</span>
              <span className="text-sm text-gray-700">{action}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-gray-700">
            <strong>⚠️ Nota MVP:</strong> NO hay acciones bloqueadas. Todas las restricciones previas quedan 
            anuladas por autorización expresa del propietario en estado MVP. El MVP permite degradación graceful.
          </p>
        </div>
      </div>

      {/* 31 Componentes */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🧩</span> 31 Componentes del Ecosistema
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-bold text-purple-900 mb-2">🧠 7 Modelos IA</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• qwen3</li>
              <li>• deepseek_v4</li>
              <li>• glm_52</li>
              <li>• gemma_4</li>
              <li>• phi_4_mini</li>
              <li>• llama_4_scout</li>
              <li>• kimi_k3</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-4 border border-red-200">
            <h3 className="font-bold text-red-900 mb-2">🛡️ 8 Herramientas Ciberseguridad</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• strix</li>
              <li>• nuclei</li>
              <li>• pentestgpt</li>
              <li>• pentagi</li>
              <li>• hexstrike_ai</li>
              <li>• faraday</li>
              <li>• metasploit</li>
              <li>• recon_ng</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-2">🗄️ 3 Bases Vectoriales</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• pgvector (PostgreSQL)</li>
              <li>• milvus</li>
              <li>• qdrant</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-bold text-green-900 mb-2">🤖 8 Sub-agentes EDPB</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• ai_governance</li>
              <li>• ai_act_compliance</li>
              <li>• risk_assessment</li>
              <li>• regulatory_monitor</li>
              <li>• privacy_tech</li>
              <li>• cloud_security</li>
              <li>• training_designer</li>
              <li>• evidence_engine</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-bold text-amber-900 mb-2">🏭 5 Gigafactorías</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• nexus_agi</li>
              <li>• ai_agent_marketplace</li>
              <li>• peli_agent_factory</li>
              <li>• beacon_mcp</li>
              <li>• a2astore</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
            <h3 className="font-bold text-indigo-900 mb-2">🔌 14 Endpoints</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• GET /api/status</li>
              <li>• GET /api/version</li>
              <li>• GET /api/health</li>
              <li>• GET /api/components</li>
              <li>• GET /api/actions</li>
              <li>• GET /api/log</li>
              <li>• GET /api/evidence</li>
              <li>• GET /api/subagent</li>
              <li>• GET /api/scan</li>
              <li>• GET /api/factories</li>
              <li>• POST /api</li>
              <li>• POST /api/test</li>
              <li>• + 2 adicionales</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer con EU AI Icon */}
      <div className="bg-gray-900 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <EUAIIcon_WhiteOnBlack size={48} />
            <div>
              <div className="font-bold">Contenido generado con IA</div>
              <div className="text-sm text-gray-400">EU AI Act Art. 50(4) · Obligación de transparencia</div>
            </div>
          </div>
          <div className="text-right text-sm text-gray-400">
            <div>EDPB-FULLSTACK-OPERATIVO v5.0</div>
            <div>MVP Edition · Fast-track</div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-500 text-center">
          Los iconos indican uso de IA. No constituyen certificación de conformidad con el AI Act.
        </div>
      </div>
    </div>
  );
};

export default MVPFastTrack;
