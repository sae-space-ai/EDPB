import React, { useState } from 'react';
import { SUBAGENT_REGISTRY, SUBAGENT_ICONS, SUBAGENT_COLORS } from '../data/subagents';
import { dispatchTask } from '../utils/agent';

export const SubAgents: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [taskDescription, setTaskDescription] = useState('');
  const [dispatchResult, setDispatchResult] = useState<ReturnType<typeof dispatchTask> | null>(null);

  const handleDispatch = (agentName: string) => {
    const desc = taskDescription || `Analyze ${agentName.replace(/_/g, ' ')}`;
    setDispatchResult(dispatchTask(agentName, desc));
    setSelectedAgent(agentName);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">🤖 Sub-Agent Registry</h1>
        <p className="text-blue-200">8 specialized sub-agents in a Hub-and-Spoke architecture</p>
        <div className="mt-4 flex items-center gap-4 flex-wrap">
          <span className="bg-white/10 px-4 py-2 rounded-full text-sm">{Object.keys(SUBAGENT_REGISTRY).length} agents registered</span>
          <span className="bg-white/10 px-4 py-2 rounded-full text-sm">Single Dispatch Pattern</span>
        </div>
      </div>

      {/* Task Dispatcher */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span>🚀</span> Task Dispatcher
        </h2>
        <div className="flex gap-3 flex-wrap">
          <input
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Describe the task for the sub-agent..."
            className="flex-1 min-w-[250px] px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
          />
        </div>
      </div>

      {/* Dispatch Result */}
      {dispatchResult && dispatchResult.status === 'dispatched' && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">
            <span>✅</span> Task Dispatched to {dispatchResult.agent}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm"><span className="font-medium text-gray-600">Task:</span> <span className="text-gray-800">{dispatchResult.task}</span></div>
              <div className="text-sm"><span className="font-medium text-gray-600">Provider:</span> <span className="text-blue-700 font-medium">{dispatchResult.provider_preferred}</span></div>
              <div className="text-sm"><span className="font-medium text-gray-600">Timestamp:</span> <span className="text-gray-800 font-mono text-xs">{dispatchResult.timestamp}</span></div>
            </div>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-medium text-gray-600">Expertise:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {dispatchResult.expertise?.map(e => (
                    <span key={e} className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">{e}</span>
                  ))}
                </div>
              </div>
              <div className="text-sm">
                <span className="font-medium text-gray-600">Tools:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {dispatchResult.tools?.map(t => (
                    <span key={t} className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-mono">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 p-3 bg-white/60 rounded-lg">
            <span className="text-xs font-medium text-gray-500 uppercase">System Instruction</span>
            <p className="text-sm text-gray-700 mt-1 italic">"{dispatchResult.system_instruction}"</p>
          </div>
        </div>
      )}

      {/* Sub-Agent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(SUBAGENT_REGISTRY).map(([name, agent]) => (
          <div
            key={name}
            className={`bg-white rounded-xl shadow-md border-2 overflow-hidden transition-all hover:shadow-xl cursor-pointer ${
              selectedAgent === name ? 'border-blue-500 shadow-xl' : 'border-gray-100 hover:border-blue-200'
            }`}
            onClick={() => handleDispatch(name)}
          >
            <div className={`bg-gradient-to-r ${SUBAGENT_COLORS[name]} p-4 text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{SUBAGENT_ICONS[name]}</span>
                  <div>
                    <h3 className="font-bold text-sm">{name.replace(/_/g, ' ').toUpperCase()}</h3>
                    <p className="text-xs opacity-90">{agent.description}</p>
                  </div>
                </div>
                <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                  → {agent.provider_preferred}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-1 mb-3">
                {agent.expertise.map(e => (
                  <span key={e} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{e}</span>
                ))}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-500">Tools:</span>
                {agent.tools.map(t => (
                  <span key={t} className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-md font-mono">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
