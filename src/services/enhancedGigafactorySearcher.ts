/**
 * Buscador de Gigafactorías Mejorado
 * Usa APIs gratuitas reales para descubrir agentes
 */

import axios from 'axios';
import { apiClient } from './freeApis';

// Configuración de Gigafactorías con endpoints reales
export const GIGAFACTORIES = {
  // APIs Públicas Gratuitas
  huggingface: {
    name: 'HuggingFace Models',
    url: 'https://huggingface.co/api/models',
    type: 'model_registry',
    free: true,
    auth: false,
    description: 'Registro de modelos de IA open-source'
  },
  
  github: {
    name: 'GitHub Repositories',
    url: 'https://api.github.com/search/repositories',
    type: 'code_registry',
    free: true,
    auth: false,
    description: 'Repositorios de código con agentes de IA'
  },

  producthunt: {
    name: 'Product Hunt AI',
    url: 'https://www.producthunt.com/frontend/graphql',
    type: 'product_registry',
    free: true,
    auth: false,
    description: 'Productos de IA lanzados recientemente'
  },

  // APIs de Modelos Gratuitos
  ollama: {
    name: 'Ollama Registry',
    url: 'https://ollama.com/library',
    type: 'model_registry',
    free: true,
    auth: false,
    description: 'Modelos locales para ejecutar en tu máquina'
  },

  replicate: {
    name: 'Replicate Models',
    url: 'https://replicate.com/api/models',
    type: 'model_registry',
    free: true,
    auth: false,
    description: 'Modelos de IA ejecutables en la nube'
  },

  // APIs de Agentes
  langchain: {
    name: 'LangChain Hub',
    url: 'https://github.com/langchain-ai/langchain',
    type: 'agent_registry',
    free: true,
    auth: false,
    description: 'Templates y agentes de LangChain'
  },

  autogen: {
    name: 'AutoGen Agents',
    url: 'https://github.com/microsoft/autogen',
    type: 'agent_registry',
    free: true,
    auth: false,
    description: 'Agentes multi-agente de Microsoft'
  },

  crewai: {
    name: 'CrewAI Agents',
    url: 'https://github.com/joaomdmoura/crewAI',
    type: 'agent_registry',
    free: true,
    auth: false,
    description: 'Framework de agentes colaborativos'
  }
};

/**
 * Interfaz para resultados de búsqueda
 */
export interface SearchAgentResult {
  id: string;
  name: string;
  description: string;
  url: string;
  source: string;
  category: string;
  stars?: number;
  downloads?: number;
  tags: string[];
  free: boolean;
}

/**
 * Buscador de Gigafactorías Mejorado
 */
export class EnhancedGigafactorySearcher {
  private cache: Map<string, { results: SearchAgentResult[]; timestamp: number }> = new Map();
  private cacheTtl = 10 * 60 * 1000; // 10 minutos

  /**
   * Busca agentes en HuggingFace
   */
  async searchHuggingFace(query: string): Promise<SearchAgentResult[]> {
    const cacheKey = `hf:${query}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTtl) {
      return cached.results;
    }

    try {
      const response = await apiClient.get(GIGAFACTORIES.huggingface.url, {
        search: query,
        limit: 20,
        sort: 'downloads',
        direction: -1
      });

      const results: SearchAgentResult[] = response.map((model: any) => ({
        id: model.id,
        name: model.modelId || model.id,
        description: model.tags?.join(', ') || 'Modelo de IA',
        url: `https://huggingface.co/${model.modelId || model.id}`,
        source: 'HuggingFace',
        category: model.pipeline_tag || 'other',
        downloads: model.downloads || 0,
        tags: model.tags || [],
        free: true
      }));

      this.cache.set(cacheKey, { results, timestamp: Date.now() });
      return results;
    } catch (error) {
      console.error('Error buscando en HuggingFace:', error);
      return [];
    }
  }

  /**
   * Busca agentes en GitHub
   */
  async searchGitHub(query: string): Promise<SearchAgentResult[]> {
    const cacheKey = `gh:${query}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTtl) {
      return cached.results;
    }

    try {
      const response = await apiClient.get(GIGAFACTORIES.github.url, {
        q: `${query} agent AI`,
        sort: 'stars',
        order: 'desc',
        per_page: 20
      });

      const results: SearchAgentResult[] = response.items.map((repo: any) => ({
        id: repo.full_name,
        name: repo.name,
        description: repo.description || 'Repositorio de GitHub',
        url: repo.html_url,
        source: 'GitHub',
        category: 'agent',
        stars: repo.stargazers_count || 0,
        tags: repo.topics || [],
        free: true
      }));

      this.cache.set(cacheKey, { results, timestamp: Date.now() });
      return results;
    } catch (error) {
      console.error('Error buscando en GitHub:', error);
      return [];
    }
  }

  /**
   * Busca agentes en Replicate
   */
  async searchReplicate(query: string): Promise<SearchAgentResult[]> {
    const cacheKey = `rep:${query}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTtl) {
      return cached.results;
    }

    try {
      // Replicate tiene una API pública limitada
      const response = await apiClient.get('https://replicate.com/api/models', {
        query,
        limit: 20
      });

      const results: SearchAgentResult[] = (response.results || []).map((model: any) => ({
        id: model.id || model.url,
        name: model.name || model.url,
        description: model.description || 'Modelo en Replicate',
        url: `https://replicate.com/${model.url || model.id}`,
        source: 'Replicate',
        category: model.category || 'other',
        tags: model.tags || [],
        free: model.is_public || false
      }));

      this.cache.set(cacheKey, { results, timestamp: Date.now() });
      return results;
    } catch (error) {
      console.error('Error buscando en Replicate:', error);
      return [];
    }
  }

  /**
   * Búsqueda unificada en todas las gigafactorías
   */
  async searchAll(query: string): Promise<{
    results: SearchAgentResult[];
    sources: { name: string; count: number; status: string }[];
    total: number;
  }> {
    const sources = [];
    let allResults: SearchAgentResult[] = [];

    // Buscar en HuggingFace
    try {
      const hfResults = await this.searchHuggingFace(query);
      allResults = [...allResults, ...hfResults];
      sources.push({ name: 'HuggingFace', count: hfResults.length, status: 'success' });
    } catch (error) {
      sources.push({ name: 'HuggingFace', count: 0, status: 'error' });
    }

    // Buscar en GitHub
    try {
      const ghResults = await this.searchGitHub(query);
      allResults = [...allResults, ...ghResults];
      sources.push({ name: 'GitHub', count: ghResults.length, status: 'success' });
    } catch (error) {
      sources.push({ name: 'GitHub', count: 0, status: 'error' });
    }

    // Buscar en Replicate
    try {
      const repResults = await this.searchReplicate(query);
      allResults = [...allResults, ...repResults];
      sources.push({ name: 'Replicate', count: repResults.length, status: 'success' });
    } catch (error) {
      sources.push({ name: 'Replicate', count: 0, status: 'error' });
    }

    // Eliminar duplicados por ID
    const uniqueResults = Array.from(
      new Map(allResults.map(item => [item.id, item])).values()
    );

    return {
      results: uniqueResults,
      sources,
      total: uniqueResults.length
    };
  }

  /**
   * Obtiene información detallada de un agente
   */
  async getAgentDetails(source: string, agentId: string): Promise<any> {
    try {
      switch (source) {
        case 'HuggingFace':
          return await apiClient.get(`https://huggingface.co/api/models/${agentId}`);
        case 'GitHub':
          return await apiClient.get(`https://api.github.com/repos/${agentId}`);
        default:
          return null;
      }
    } catch (error) {
      console.error('Error obteniendo detalles:', error);
      return null;
    }
  }

  /**
   * Busca agentes por categoría
   */
  async searchByCategory(category: string): Promise<SearchAgentResult[]> {
    const queries: Record<string, string[]> = {
      'llm': ['language model', 'llm', 'gpt', 'transformer'],
      'vision': ['computer vision', 'image', 'object detection'],
      'audio': ['speech', 'audio', 'music', 'tts'],
      'agent': ['ai agent', 'autonomous agent', 'multi-agent'],
      'security': ['cybersecurity', 'vulnerability', 'penetration testing'],
      'nlp': ['natural language', 'nlp', 'text classification']
    };

    const searchTerms = queries[category] || [category];
    const allResults: SearchAgentResult[] = [];

    for (const term of searchTerms) {
      const results = await this.searchAll(term);
      allResults.push(...results.results);
    }

    // Eliminar duplicados
    return Array.from(
      new Map(allResults.map(item => [item.id, item])).values()
    );
  }
}

export const gigafactorySearcher = new EnhancedGigafactorySearcher();
export default gigafactorySearcher;
