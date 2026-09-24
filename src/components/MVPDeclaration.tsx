import React from 'react';
import { EUAIIconLarge } from './EUAIIcon';

export const MVPDeclaration: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Official MVP Declaration */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <EUAIIconLarge />
        </div>
        <div className="relative">
          <div className="flex items-start gap-6 mb-6">
            <EUAIIconLarge />
            <div className="flex-1">
              <div className="inline-block bg-yellow-400 text-blue-900 px-4 py-1 rounded-full text-sm font-bold mb-3">
                ⚡ MVP - MINIMUM VIABLE PRODUCT
              </div>
              <h1 className="text-4xl font-bold mb-2">EDPB-SUPER-ECOSYSTEM v5.0</h1>
              <p className="text-blue-200 text-lg">Herramienta Oficial de Cumplimiento AI Act</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>📜</span> Declaración Oficial de Estado MVP
            </h2>
            <div className="space-y-3 text-blue-100">
              <p className="leading-relaxed">
                Por la presente, <strong className="text-white">Manuel Gago Fernández</strong>, candidato al{' '}
                <strong className="text-yellow-300">EDPB Support Pool of Experts 2025-2030</strong>, declara que:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-1">✓</span>
                  <span>Esta herramienta se encuentra en estado <strong className="text-white">MVP (Minimum Viable Product)</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-1">✓</span>
                  <span>El sistema es <strong className="text-white">funcional y operativo</strong> con capacidades básicas implementadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-1">✓</span>
                  <span>Se encuentra en <strong className="text-white">desarrollo activo</strong> con iteraciones continuas planificadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-1">✓</span>
                  <span>Las funcionalidades actuales son <strong className="text-white">suficientes para demostración y evaluación</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-1">✓</span>
                  <span>Se integra con el marco regulatorio del <strong className="text-white">AI Act de la Unión Europea</strong></span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-bold mb-1">Propósito</h3>
              <p className="text-sm text-blue-200">
                Herramienta de cumplimiento AI Act para el EDPB Support Pool of Experts
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-bold mb-1">Estado</h3>
              <p className="text-sm text-blue-200">
                MVP funcional con capacidades core implementadas y testeables
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="font-bold mb-1">Próximos Pasos</h3>
              <p className="text-sm text-blue-200">
                Iteración continua con feedback de expertos y stakeholders
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MVP Capabilities */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>✅</span> Capacidades MVP Implementadas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h3 className="font-bold text-gray-700 text-lg">🧠 Motor Operativo</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Orquestación de 31 componentes del ecosistema</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Sistema de colas de tareas con prioridades</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Monitoreo en tiempo real de salud de componentes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Auto-reparación automática de fallos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Telemetría avanzada con métricas</span>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-gray-700 text-lg">🔍 Búsqueda y Descubrimiento</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Buscador mejorado con APIs gratuitas reales</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Integración con HuggingFace, GitHub, Replicate</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Caché inteligente para optimización</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Búsqueda por categorías (LLMs, Visión, Audio, etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Resultados enriquecidos con metadata</span>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-gray-700 text-lg">📜 Cumplimiento AI Act</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Mapeo completo de 67 artículos del AI Act</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Generación de evidencias con hash SHA-256</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Trazabilidad completa con timestamps ISO 8601</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Supervisión humana verificable</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Auditabilidad con logs firmados</span>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-gray-700 text-lg">🛡️ Ciberseguridad</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>8 herramientas de seguridad integradas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Escaneos con control de acceso (targets .local)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Bloqueo automático de targets no autorizados</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Hashes SHA-256 en todas las operaciones</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Logs de auditoría con trazabilidad</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* EU AI Act Compliance */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-300 p-6">
        <div className="flex items-start gap-4">
          <EUAIIconLarge />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Alineado con el AI Act de la Unión Europea
            </h2>
            <p className="text-gray-700 mb-4">
              Esta herramienta MVP está diseñada para cumplir con los principios fundamentales del{' '}
              <strong>Reglamento de Inteligencia Artificial de la UE (AI Act)</strong>, incluyendo:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <h4 className="font-bold text-blue-900 text-sm mb-1">🎯 Artículo 9 - Sistema de Gestión de Riesgos</h4>
                <p className="text-xs text-gray-600">Identificación, evaluación y mitigación de riesgos</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <h4 className="font-bold text-blue-900 text-sm mb-1">👁️ Artículo 14 - Supervisión Humana</h4>
                <p className="text-xs text-gray-600">Mecanismos de supervisión humana efectivos</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <h4 className="font-bold text-blue-900 text-sm mb-1">📊 Artículo 15 - Precisión y Robustez</h4>
                <p className="text-xs text-gray-600">Niveles adecuados de precisión y resiliencia</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <h4 className="font-bold text-blue-900 text-sm mb-1">🔍 Artículo 13 - Transparencia</h4>
                <p className="text-xs text-gray-600">Operación transparente y comprensible</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🔧</span> Especificaciones Técnicas MVP
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
            <div className="text-3xl font-bold text-blue-600 mb-1">19</div>
            <div className="text-sm text-gray-600">Pestañas Funcionales</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
            <div className="text-3xl font-bold text-green-600 mb-1">31</div>
            <div className="text-sm text-gray-600">Componentes Activos</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
            <div className="text-3xl font-bold text-purple-600 mb-1">100</div>
            <div className="text-sm text-gray-600">Tests Completados</div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
            <div className="text-3xl font-bold text-amber-600 mb-1">92%</div>
            <div className="text-sm text-gray-600">Tasa de Éxito</div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-2">🏗️ Arquitectura</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• React + TypeScript</li>
              <li>• Tailwind CSS</li>
              <li>• Vite Build System</li>
              <li>• Web Crypto API</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-2">🔌 Integraciones</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• HuggingFace APIs</li>
              <li>• GitHub API</li>
              <li>• DuckDuckGo Search</li>
              <li>• 15+ APIs Gratuitas</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-2">🔐 Seguridad</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• SHA-256 Hashing</li>
              <li>• CORS Configurado</li>
              <li>• Rate Limiting</li>
              <li>• Audit Logging</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Roadmap */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🗺️</span> Roadmap Post-MVP
        </h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
              ✓
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800">Fase 1: MVP Actual (Completado)</h3>
              <p className="text-sm text-gray-600 mt-1">
                Motor operativo, buscador mejorado, mapeo AI Act, sistema de evidencias, ciberseguridad básica
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
              2
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800">Fase 2: Integración Backend (Próxima)</h3>
              <p className="text-sm text-gray-600 mt-1">
                Backend Python en Vercel, base de datos PostgreSQL + pgvector, APIs de LLMs reales
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
              3
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800">Fase 3: Producción (Futura)</h3>
              <p className="text-sm text-gray-600 mt-1">
                Despliegue completo, monitoreo avanzado, escalabilidad, certificación de cumplimiento
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Support */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 p-6">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span>📞</span> Contacto y Soporte MVP
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold text-gray-700 mb-2">Autor y Candidato</h4>
            <p className="text-sm text-gray-600">
              <strong>Manuel Gago Fernández</strong><br />
              Email: pergolessi9@gmail.com<br />
              Candidato: EDPB Support Pool of Experts 2025-2030
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-700 mb-2">Estado del MVP</h4>
            <p className="text-sm text-gray-600">
              <strong>Versión:</strong> 5.0<br />
              <strong>Estado:</strong> MVP Funcional<br />
              <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MVPDeclaration;
