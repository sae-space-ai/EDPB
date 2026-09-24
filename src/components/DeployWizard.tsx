import React, { useState } from 'react';

interface Step {
  id: number;
  title: string;
  description: string;
  command?: string;
  note?: string;
  completed: boolean;
}

export const DeployWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      title: 'Instalar Vercel CLI',
      description: 'Instala la herramienta de línea de comandos de Vercel',
      command: 'npm install -g vercel@latest',
      note: 'Solo necesitas ejecutar esto una vez',
      completed: false
    },
    {
      id: 2,
      title: 'Iniciar sesión en Vercel',
      description: 'Autentícate con tu cuenta de Vercel',
      command: 'vercel login',
      note: 'Se abrirá tu navegador para autenticarte',
      completed: false
    },
    {
      id: 3,
      title: 'Desplegar en producción',
      description: 'Despliega tu proyecto en Vercel',
      command: 'vercel --prod',
      note: 'Sigue las instrucciones interactivas. Usa los valores por defecto.',
      completed: false
    },
    {
      id: 4,
      title: 'Verificar despliegue',
      description: 'Abre tu URL de producción y verifica que funciona',
      command: 'vercel ls --prod',
      note: 'Copia la URL que aparece y ábrela en tu navegador',
      completed: false
    },
    {
      id: 5,
      title: 'Crear repositorio en GitHub',
      description: 'Crea un repositorio público en GitHub',
      command: 'gh repo create edpb-fullstack-operativo --public --description "EDPB Super Ecosystem v5.0 - MVP"',
      note: 'O créalo manualmente en https://github.com/new',
      completed: false
    },
    {
      id: 6,
      title: 'Subir código a GitHub',
      description: 'Sube tu código al repositorio',
      command: 'git init && git add . && git commit -m "MVP v5.0" && git branch -M main && git remote add origin https://github.com/TU_USUARIO/edpb-fullstack-operativo.git && git push -u origin main',
      note: 'Reemplaza TU_USUARIO con tu usuario de GitHub',
      completed: false
    },
    {
      id: 7,
      title: 'Verificar endpoints',
      description: 'Prueba que los endpoints funcionan',
      command: 'curl https://TU_URL.vercel.app/',
      note: 'Reemplaza TU_URL con tu URL de Vercel',
      completed: false
    }
  ]);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const markAsCompleted = (stepId: number) => {
    setSteps(steps.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    ));
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const completedCount = steps.filter(s => s.completed).length;
  const progress = (completedCount / steps.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-900 via-emerald-900 to-teal-900 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">🚀 Asistente de Despliegue</h1>
        <p className="text-green-200 text-lg">Guía interactiva paso a paso para desplegar tu proyecto</p>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>Progreso</span>
            <span>{completedCount}/{steps.length} pasos completados</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div 
              className="bg-green-400 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Quick Deploy Option */}
      <div className="bg-white rounded-2xl shadow-lg border-2 border-green-200 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>⚡</span> Opción Rápida (Recomendada)
        </h2>
        <p className="text-gray-600 mb-4">
          Si ya tienes Vercel CLI instalado, ejecuta estos 2 comandos:
        </p>
        <div className="space-y-3">
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <code className="text-green-400 text-sm">vercel login</code>
              <button
                onClick={() => copyToClipboard('vercel login', 999)}
                className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded"
              >
                {copiedIndex === 999 ? '✓ Copiado' : 'Copiar'}
              </button>
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <code className="text-green-400 text-sm">vercel --prod</code>
              <button
                onClick={() => copyToClipboard('vercel --prod', 998)}
                className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded"
              >
                {copiedIndex === 998 ? '✓ Copiado' : 'Copiar'}
              </button>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          ¡Eso es todo! En 2-3 minutos tendrás tu URL de producción.
        </p>
      </div>

      {/* Step by Step Guide */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>📋</span> Guía Paso a Paso
        </h2>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={`border-2 rounded-lg p-4 transition-all ${
                step.completed 
                  ? 'border-green-300 bg-green-50' 
                  : index === currentStep 
                  ? 'border-blue-300 bg-blue-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  step.completed 
                    ? 'bg-green-500 text-white' 
                    : index === currentStep 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {step.completed ? '✓' : step.id}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                  
                  {step.command && (
                    <div className="bg-gray-900 rounded-lg p-3 mb-3">
                      <div className="flex items-center justify-between">
                        <code className="text-green-400 text-sm break-all">{step.command}</code>
                        <button
                          onClick={() => copyToClipboard(step.command!, index)}
                          className="flex-shrink-0 ml-2 text-xs bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded"
                        >
                          {copiedIndex === index ? '✓ Copiado' : 'Copiar'}
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {step.note && (
                    <p className="text-xs text-gray-500 italic mb-3">{step.note}</p>
                  )}
                  
                  {!step.completed && index === currentStep && (
                    <button
                      onClick={() => markAsCompleted(step.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    >
                      ✓ Marcar como completado
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alternative: UI Method */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🖱️</span> Alternativa: Sin Terminal
        </h2>
        <p className="text-gray-600 mb-4">
          Si prefieres no usar la terminal, puedes desplegar directamente desde la web:
        </p>
        <ol className="space-y-3 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
            <span>Ve a <a href="https://vercel.com/new" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">https://vercel.com/new</a></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
            <span>Haz clic en "Add New..." → "Project"</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
            <span>Sube los archivos del proyecto (drag & drop) o conecta tu repositorio de GitHub</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
            <span>Configura: Framework Preset = Vite, Build Command = npm run build, Output Directory = dist</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">5</span>
            <span>Haz clic en "Deploy" y espera 2-3 minutos</span>
          </li>
        </ol>
      </div>

      {/* Verification */}
      {completedCount === steps.length && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-300 p-6">
          <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
            <span>🎉</span> ¡Despliegue Completado!
          </h2>
          <p className="text-gray-700 mb-4">
            Tu proyecto está ahora en producción. Verifica los siguientes puntos:
          </p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Tu URL de Vercel responde correctamente</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>El frontend carga sin errores</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Las 24 pestañas funcionan</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>El icono EU AI está visible</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>La declaración MVP es visible</span>
            </li>
          </ul>
          <div className="mt-4 p-4 bg-white rounded-lg border border-green-200">
            <p className="text-sm text-gray-700">
              <strong>Próximo paso:</strong> Envía el formulario EDPB SPE 2025-2030 vía fast-track 
              y adjunta tu URL de producción como evidencia.
            </p>
          </div>
        </div>
      )}

      {/* Help */}
      <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span>💡</span> ¿Necesitas ayuda?
        </h3>
        <div className="text-sm text-gray-700 space-y-2">
          <p>
            <strong>Error común:</strong> "vercel: command not found"
          </p>
          <p className="ml-4">
            <strong>Solución:</strong> Ejecuta <code className="bg-white px-2 py-0.5 rounded text-xs">npm install -g vercel@latest</code>
          </p>
          <p>
            <strong>Error común:</strong> "Error: Login required"
          </p>
          <p className="ml-4">
            <strong>Solución:</strong> Ejecuta <code className="bg-white px-2 py-0.5 rounded text-xs">vercel login</code>
          </p>
          <p>
            <strong>Error común:</strong> "Error: Build failed"
          </p>
          <p className="ml-4">
            <strong>Solución:</strong> Verifica que <code className="bg-white px-2 py-0.5 rounded text-xs">npm run build</code> funciona localmente
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeployWizard;
