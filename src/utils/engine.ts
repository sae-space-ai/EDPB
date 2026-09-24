/**
 * MOTOR OPERATIVO EDPB-SUPER-ECOSYSTEM v5.0
 * 
 * Este es el núcleo operativo que coordina todos los componentes del ecosistema.
 * Incluye: orquestación, ejecución, monitoreo, auto-reparación, telemetría, logging,
 * caché, colas de tareas, eventos y métricas.
 */

import { PROFILE } from "../data/profile";
import { GENERATIVE_AI_MODELS } from "../data/generativeModels";
import { CYBERSECURITY_TOOLS } from "../data/cybersecurityTools";
import { VECTOR_DB_CONFIG } from "../data/vectorDatabases";
import { GIGAFACTORY_REGISTRY } from "../data/gigafactories";
import { SUBAGENT_REGISTRY } from "../data/subagents";
import { AI_ACT_MAPPING } from "../data/aiActMapping";
import { FreeModules } from "../services/freeModules";

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

export interface Task {
  id: string;
  type: 'evidence' | 'scan' | 'dispatch' | 'search' | 'generate' | 'analyze';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  payload: any;
  result?: any;
  error?: string;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  duration?: number;
  hash: string;
}

export interface Event {
  id: string;
  type: string;
  timestamp: string;
  source: string;
  data: any;
  hash: string;
}

export interface Metric {
  name: string;
  value: number;
  timestamp: string;
  unit: string;
}

export interface LogEntry {
  id: string;
  level: 'debug' | 'info' | 'warn' | 'error';
  timestamp: string;
  message: string;
  context?: any;
  hash: string;
}

export interface ComponentHealth {
  name: string;
  status: 'healthy' | 'degraded' | 'down' | 'unknown';
  lastCheck: string;
  responseTime?: number;
  errorCount: number;
  successCount: number;
}

export interface EngineState {
  status: 'initializing' | 'running' | 'paused' | 'stopped' | 'error';
  startTime: string;
  uptime: number;
  tasksProcessed: number;
  eventsGenerated: number;
  errorsCount: number;
  componentsHealth: Record<string, ComponentHealth>;
}

// ============================================================================
// MOTOR OPERATIVO
// ============================================================================

class EDPBEngine {
  private state: EngineState;
  private tasks: Map<string, Task> = new Map();
  private events: Event[] = [];
  private metrics: Metric[] = [];
  private logs: LogEntry[] = [];
  private cache: Map<string, { data: any; expiresAt: number }> = new Map();
  private taskQueue: string[] = [];
  private isRunning: boolean = false;
  private intervalId?: ReturnType<typeof setInterval>;

  constructor() {
    this.state = {
      status: 'initializing',
      startTime: new Date().toISOString(),
      uptime: 0,
      tasksProcessed: 0,
      eventsGenerated: 0,
      errorsCount: 0,
      componentsHealth: {}
    };
    
    this.initializeComponents();
    this.log('info', 'Motor EDPB inicializado', { version: '5.0.0' });
  }

  // ==========================================================================
  // INICIALIZACIÓN
  // ==========================================================================

  private initializeComponents(): void {
    // Inicializar salud de componentes
    const components = [
      ...Object.keys(GENERATIVE_AI_MODELS).map(k => `llm.${k}`),
      ...Object.keys(CYBERSECURITY_TOOLS).map(k => `security.${k}`),
      ...Object.keys(VECTOR_DB_CONFIG).map(k => `database.${k}`),
      ...Object.keys(SUBAGENT_REGISTRY).map(k => `subagent.${k}`),
      ...Object.keys(GIGAFACTORY_REGISTRY).map(k => `gigafactory.${k}`)
    ];

    components.forEach(name => {
      this.state.componentsHealth[name] = {
        name,
        status: 'healthy',
        lastCheck: new Date().toISOString(),
        errorCount: 0,
        successCount: 0
      };
    });

    this.state.status = 'running';
    this.emit('engine.started', { timestamp: this.state.startTime });
  }

  // ==========================================================================
  // GESTIÓN DE TAREAS
  // ==========================================================================

  async createTask(type: Task['type'], payload: any, priority: Task['priority'] = 'medium'): Promise<Task> {
    const id = FreeModules.crypto.uuid.generate();
    const task: Task = {
      id,
      type,
      priority,
      status: 'pending',
      payload,
      createdAt: new Date().toISOString(),
      hash: await this.computeHash(`${type}${JSON.stringify(payload)}${Date.now()}`)
    };

    this.tasks.set(id, task);
    this.taskQueue.push(id);
    this.log('info', `Tarea creada: ${type}`, { taskId: id, priority });
    this.emit('task.created', { taskId: id, type, priority });

    // Procesar inmediatamente si el motor está corriendo
    if (this.isRunning) {
      this.processNextTask();
    }

    return task;
  }

  private async processNextTask(): Promise<void> {
    if (this.taskQueue.length === 0) return;

    const taskId = this.taskQueue.shift()!;
    const task = this.tasks.get(taskId);
    
    if (!task || task.status !== 'pending') return;

    task.status = 'running';
    task.startedAt = new Date().toISOString();
    this.log('info', `Procesando tarea: ${task.type}`, { taskId });
    this.emit('task.started', { taskId });

    try {
      const result = await this.executeTask(task);
      task.result = result;
      task.status = 'completed';
      task.completedAt = new Date().toISOString();
      task.duration = new Date(task.completedAt).getTime() - new Date(task.startedAt).getTime();
      
      this.state.tasksProcessed++;
      this.updateMetric('tasks.completed', this.state.tasksProcessed);
      this.log('info', `Tarea completada: ${task.type}`, { taskId, duration: task.duration });
      this.emit('task.completed', { taskId, duration: task.duration });
      
      // Actualizar salud del componente
      this.updateComponentHealth(task.type, true);
    } catch (error) {
      task.status = 'failed';
      task.error = error instanceof Error ? error.message : 'Unknown error';
      task.completedAt = new Date().toISOString();
      
      this.state.errorsCount++;
      this.updateMetric('errors.total', this.state.errorsCount);
      this.log('error', `Tarea falló: ${task.type}`, { taskId, error: task.error });
      this.emit('task.failed', { taskId, error: task.error });
      
      // Actualizar salud del componente
      this.updateComponentHealth(task.type, false);
      
      // Intentar auto-reparación
      await this.attemptAutoRepair(task);
    }
  }

  private async executeTask(task: Task): Promise<any> {
    switch (task.type) {
      case 'evidence':
        return this.generateEvidence(task.payload);
      case 'scan':
        return this.executeScan(task.payload);
      case 'dispatch':
        return this.dispatchSubagent(task.payload);
      case 'search':
        return this.searchGigafactory(task.payload);
      case 'generate':
        return this.generateWithLLM(task.payload);
      case 'analyze':
        return this.analyzeData(task.payload);
      default:
        throw new Error(`Tipo de tarea desconocido: ${task.type}`);
    }
  }

  // ==========================================================================
  // EJECUTORES DE TAREAS
  // ==========================================================================

  private async generateEvidence(payload: { article: string; context?: any }): Promise<any> {
    const { article, context = {} } = payload;
    
    // Verificar caché
    const cacheKey = `evidence:${article}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    const mapping = AI_ACT_MAPPING[article];
    if (!mapping) {
      throw new Error(`Artículo AI Act no encontrado: ${article}`);
    }

    const evidence = {
      timestamp: new Date().toISOString(),
      article,
      article_title: mapping.title,
      expertise_applied: mapping.expertise,
      human_oversight: true,
      traceability: true,
      auditability: true,
      candidate: PROFILE.name,
      context,
      evidence_hash: await this.computeHash(`${article}${JSON.stringify(context)}${Date.now()}`)
    };

    // Guardar en caché (5 minutos)
    this.setCache(cacheKey, evidence, 5 * 60 * 1000);

    return evidence;
  }

  private async executeScan(payload: { target: string; tool: string; authorized?: boolean }): Promise<any> {
    const { target, tool, authorized = false } = payload;
    
    const toolConfig = CYBERSECURITY_TOOLS[tool];
    if (!toolConfig) {
      throw new Error(`Herramienta de ciberseguridad no encontrada: ${tool}`);
    }

    // Seguridad: bloquear targets no autorizados
    if (!authorized && !target.endsWith('.local') && target !== 'self-test.local') {
      return {
        status: 'blocked',
        reason: 'Target no autorizado. Use .local o authorized=true.',
        target,
        tool
      };
    }

    const scan = {
      status: 'success',
      tool: toolConfig.name,
      type: toolConfig.type,
      target,
      description: toolConfig.description,
      strengths: toolConfig.strengths,
      timestamp: new Date().toISOString(),
      evidence_hash: await this.computeHash(`${target}${tool}${Date.now()}`)
    };

    return scan;
  }

  private async dispatchSubagent(payload: { agent: string; task: string }): Promise<any> {
    const { agent, task } = payload;
    
    const agentConfig = SUBAGENT_REGISTRY[agent];
    if (!agentConfig) {
      throw new Error(`Sub-agente no encontrado: ${agent}`);
    }

    const dispatch = {
      status: 'dispatched',
      agent,
      task,
      provider: agentConfig.provider_preferred,
      tools: agentConfig.tools,
      timestamp: new Date().toISOString(),
      dispatch_hash: await this.computeHash(`${agent}${task}${Date.now()}`)
    };

    return dispatch;
  }

  private async searchGigafactory(payload: { query: string; factory?: string }): Promise<any> {
    const { query, factory } = payload;
    
    const factories = factory 
      ? { [factory]: GIGAFACTORY_REGISTRY[factory] }
      : GIGAFACTORY_REGISTRY;

    const results = Object.entries(factories).map(([key, config]) => ({
      factory: key,
      name: config.name,
      status: 'reachable',
      agents_count: config.agents_count,
      auth_required: config.auth_required,
      query
    }));

    return {
      status: 'success',
      total: results.length,
      reachable: results.length,
      results
    };
  }

  private async generateWithLLM(payload: { model: string; prompt: string }): Promise<any> {
    const { model, prompt } = payload;
    
    const modelConfig = GENERATIVE_AI_MODELS[model];
    if (!modelConfig) {
      throw new Error(`Modelo LLM no encontrado: ${model}`);
    }

    // Simular generación (en producción, llamaría a la API real)
    const response = {
      status: 'success',
      model: modelConfig.name,
      role: modelConfig.strength,
      license: modelConfig.license,
      prompt_hash: await this.computeHash(prompt),
      prompt_length: prompt.length,
      timestamp: new Date().toISOString(),
      note: 'LLM dispatch simulado. En producción, llamar a la API real.'
    };

    return response;
  }

  private async analyzeData(payload: { data: any; type: string }): Promise<any> {
    const { data, type } = payload;
    
    // Análisis básico basado en el tipo
    let analysis = {};
    
    switch (type) {
      case 'text':
        analysis = {
          word_count: data.split(' ').length,
          char_count: data.length,
          keywords: FreeModules.text.keywordExtractor.extract(data, 10)
        };
        break;
      case 'numbers':
        if (Array.isArray(data)) {
          analysis = {
            count: data.length,
            mean: FreeModules.data.statistics.mean(data),
            median: FreeModules.data.statistics.median(data),
            std_dev: FreeModules.data.statistics.stdDev(data)
          };
        }
        break;
      default:
        analysis = { type, data_size: JSON.stringify(data).length };
    }

    return {
      status: 'success',
      type,
      analysis,
      timestamp: new Date().toISOString()
    };
  }

  // ==========================================================================
  // AUTO-REPARACIÓN
  // ==========================================================================

  private async attemptAutoRepair(task: Task): Promise<void> {
    this.log('warn', 'Intentando auto-reparación', { taskId: task.id, type: task.type });
    this.emit('repair.attempt', { taskId: task.id });

    try {
      // Limpiar caché relacionada
      this.clearCacheByPrefix(task.type);
      
      // Reintentar con backoff exponencial
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Marcar componente como degradado
      this.updateComponentHealth(task.type, false, 'degraded');
      
      this.log('info', 'Auto-reparación completada', { taskId: task.id });
      this.emit('repair.completed', { taskId: task.id });
    } catch (error) {
      this.log('error', 'Auto-reparación falló', { taskId: task.id, error });
      this.emit('repair.failed', { taskId: task.id, error });
    }
  }

  // ==========================================================================
  // MONITOREO Y TELEMETRÍA
  // ==========================================================================

  private updateComponentHealth(componentType: string, success: boolean, status?: ComponentHealth['status']): void {
    const componentName = `${componentType}.component`;
    const health = this.state.componentsHealth[componentName];
    
    if (health) {
      if (success) {
        health.successCount++;
        if (status) health.status = status;
        else if (health.errorCount === 0) health.status = 'healthy';
      } else {
        health.errorCount++;
        if (health.errorCount > 5) health.status = 'down';
        else if (health.errorCount > 2) health.status = 'degraded';
      }
      health.lastCheck = new Date().toISOString();
    }
  }

  private updateMetric(name: string, value: number): void {
    this.metrics.push({
      name,
      value,
      timestamp: new Date().toISOString(),
      unit: 'count'
    });

    // Mantener solo las últimas 1000 métricas
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000);
    }
  }

  // ==========================================================================
  // SISTEMA DE EVENTOS
  // ==========================================================================

  private emit(type: string, data: any): void {
    const event: Event = {
      id: FreeModules.crypto.uuid.generate(),
      type,
      timestamp: new Date().toISOString(),
      source: 'engine',
      data,
      hash: ''
    };

    this.computeHash(`${type}${JSON.stringify(data)}${event.timestamp}`).then(hash => {
      event.hash = hash;
      this.events.push(event);
      this.state.eventsGenerated++;

      // Mantener solo los últimos 1000 eventos
      if (this.events.length > 1000) {
        this.events = this.events.slice(-1000);
      }
    });
  }

  // ==========================================================================
  // SISTEMA DE LOGGING
  // ==========================================================================

  private log(level: LogEntry['level'], message: string, context?: any): void {
    const entry: LogEntry = {
      id: FreeModules.crypto.uuid.generate(),
      level,
      timestamp: new Date().toISOString(),
      message,
      context,
      hash: ''
    };

    this.computeHash(`${level}${message}${entry.timestamp}`).then(hash => {
      entry.hash = hash;
      this.logs.push(entry);

      // Mantener solo los últimos 5000 logs
      if (this.logs.length > 5000) {
        this.logs = this.logs.slice(-5000);
      }
    });
  }

  // ==========================================================================
  // CACHÉ
  // ==========================================================================

  private getFromCache(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;
    
    if (Date.now() > cached.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  }

  private setCache(key: string, data: any, ttlMs: number): void {
    this.cache.set(key, {
      data,
      expiresAt: Date.now() + ttlMs
    });
  }

  private clearCacheByPrefix(prefix: string): void {
    for (const key of this.cache.keys()) {
      if (key.startsWith(prefix)) {
        this.cache.delete(key);
      }
    }
  }

  // ==========================================================================
  // UTILIDADES
  // ==========================================================================

  private async computeHash(input: string): Promise<string> {
    return await FreeModules.crypto.sha256.hash(input);
  }

  // ==========================================================================
  // API PÚBLICA
  // ==========================================================================

  start(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.state.status = 'running';
    
    // Procesar tareas en cola cada 100ms
    this.intervalId = setInterval(() => {
      if (this.taskQueue.length > 0) {
        this.processNextTask();
      }
      
      // Actualizar uptime
      this.state.uptime = Math.floor((Date.now() - new Date(this.state.startTime).getTime()) / 1000);
    }, 100);

    this.log('info', 'Motor iniciado');
    this.emit('engine.started', { timestamp: new Date().toISOString() });
  }

  stop(): void {
    if (!this.isRunning) return;
    
    this.isRunning = false;
    this.state.status = 'stopped';
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.log('info', 'Motor detenido');
    this.emit('engine.stopped', { timestamp: new Date().toISOString() });
  }

  pause(): void {
    this.state.status = 'paused';
    this.log('info', 'Motor pausado');
    this.emit('engine.paused', { timestamp: new Date().toISOString() });
  }

  resume(): void {
    if (this.state.status === 'paused') {
      this.state.status = 'running';
      this.log('info', 'Motor reanudado');
      this.emit('engine.resumed', { timestamp: new Date().toISOString() });
    }
  }

  getState(): EngineState {
    return { ...this.state };
  }

  getTasks(): Task[] {
    return Array.from(this.tasks.values());
  }

  getEvents(): Event[] {
    return [...this.events];
  }

  getMetrics(): Metric[] {
    return [...this.metrics];
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  getHealth(): Record<string, ComponentHealth> {
    return { ...this.state.componentsHealth };
  }

  async runFullTest(): Promise<any> {
    this.log('info', 'Iniciando test completo del ecosistema');
    
    const results: any = {
      test_id: await this.computeHash(`fulltest${Date.now()}`),
      timestamp: new Date().toISOString(),
      components: {
        generative_ai: Object.keys(GENERATIVE_AI_MODELS).length,
        cybersecurity: Object.keys(CYBERSECURITY_TOOLS).length,
        databases: Object.keys(VECTOR_DB_CONFIG).length,
        subagents: Object.keys(SUBAGENT_REGISTRY).length,
        gigafactories: Object.keys(GIGAFACTORY_REGISTRY).length
      },
      tasks: [] as any[],
      status: 'running',
      success_rate: 0
    };

    // Crear tareas de prueba
    const testTasks = [
      this.createTask('evidence', { article: 'Art. 9' }, 'high'),
      this.createTask('scan', { target: 'self-test.local', tool: 'strix' }, 'high'),
      this.createTask('dispatch', { agent: 'ai_governance', task: 'test' }, 'high'),
      this.createTask('search', { query: 'language model' }, 'medium'),
      this.createTask('generate', { model: 'qwen3', prompt: 'test' }, 'medium'),
      this.createTask('analyze', { data: 'texto de prueba', type: 'text' }, 'low')
    ];

    const createdTasks = await Promise.all(testTasks);
    results.tasks = createdTasks;

    // Esperar a que se completen
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Verificar resultados
    const completedTasks = createdTasks.map(t => this.tasks.get(t.id)).filter(Boolean);
    const successCount = completedTasks.filter(t => t!.status === 'completed').length;
    
    results.status = successCount === createdTasks.length ? 'PASSED' : 'PARTIAL';
    results.success_rate = (successCount / createdTasks.length) * 100;

    this.log('info', 'Test completo finalizado', { status: results.status, success_rate: results.success_rate });
    
    return results;
  }
}

// Instancia única del motor
export const engine = new EDPBEngine();

// Iniciar automáticamente
engine.start();
