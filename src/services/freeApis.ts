/**
 * Servicio de APIs Gratuitas para Agentes
 * Integra múltiples APIs gratuitas para mejorar la eficacia de los agentes
 */

import axios from 'axios';

// Configuración de APIs Gratuitas
export const FREE_APIS = {
  // LLMs Gratuitos
  gemini: {
    url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
    key: import.meta.env.VITE_GEMINI_API_KEY || '',
    model: 'gemini-pro',
    maxTokens: 2048
  },
  
  groq: {
    url: 'https://api.groq.com/openai/v1/chat/completions',
    key: import.meta.env.VITE_GROQ_API_KEY || '',
    model: 'llama-3.1-70b-versatile',
    maxTokens: 2048
  },

  // Búsqueda Web
  duckduckgo: {
    url: 'https://api.duckduckgo.com/',
    format: 'json'
  },

  // HuggingFace (Modelos gratuitos)
  huggingface: {
    url: 'https://api-inference.huggingface.co/models/',
    models: {
      textGeneration: 'mistralai/Mistral-7B-Instruct-v0.2',
      textClassification: 'distilbert-base-uncased-finetuned-sst-2-english',
      summarization: 'facebook/bart-large-cnn',
      translation: 'Helsinki-NLP/opus-mt-en-es'
    }
  },

  // APIs de Gigafactorías
  gigafactories: {
    nexusAgi: 'https://agi.nexus.dev/api/agents',
    agentMarketplace: 'https://agentmarketplace.io/api/v1/agents',
    peliFactory: 'https://peli.ai/api/factory/agents',
    beaconMcp: 'https://mcp.beacon.ai/api/search',
    a2aStore: 'https://a2a.store/api/agents'
  },

  // APIs de Seguridad
  security: {
    vulnDb: 'https://www.cvedetails.com/json-feed/',
    nvd: 'https://services.nvd.nist.gov/rest/json/cves/2.0',
    exploitDb: 'https://www.exploit-db.com/search'
  },

  // APIs de Bases de Datos Vectoriales
  vectorDb: {
    pineconeFree: 'https://controller.pinecone.io/',
    qdrantCloud: 'https://cloud.qdrant.io/api',
    weaviate: 'https://api.weaviate.cloud/v1'
  }
};

/**
 * Cliente HTTP optimizado para llamadas a APIs
 */
class ApiClient {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private cacheTtl = 5 * 60 * 1000; // 5 minutos

  async get(url: string, params?: any, useCache = true): Promise<any> {
    const cacheKey = `${url}:${JSON.stringify(params)}`;
    
    // Verificar caché
    if (useCache) {
      const cached = this.cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < this.cacheTtl) {
        return cached.data;
      }
    }

    try {
      const response = await axios.get(url, { 
        params,
        timeout: 10000,
        headers: {
          'Accept': 'application/json'
        }
      });

      // Guardar en caché
      if (useCache) {
        this.cache.set(cacheKey, {
          data: response.data,
          timestamp: Date.now()
        });
      }

      return response.data;
    } catch (error) {
      console.error(`Error en GET ${url}:`, error);
      throw error;
    }
  }

  async post(url: string, data: any, headers?: any): Promise<any> {
    try {
      const response = await axios.post(url, data, {
        timeout: 15000,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error en POST ${url}:`, error);
      throw error;
    }
  }
}

export const apiClient = new ApiClient();

/**
 * Servicio de LLMs Gratuitos
 */
export class LLMService {
  /**
   * Genera texto usando Gemini API
   */
  static async generateWithGemini(prompt: string, context?: string): Promise<string> {
    if (!FREE_APIS.gemini.key) {
      throw new Error('Gemini API key no configurada');
    }

    const fullPrompt = context 
      ? `Contexto: ${context}\n\nPregunta: ${prompt}`
      : prompt;

    try {
      const response = await apiClient.post(
        FREE_APIS.gemini.url,
        {
          contents: [{
            parts: [{
              text: fullPrompt
            }]
          }]
        },
        {
          'x-goog-api-key': FREE_APIS.gemini.key
        }
      );

      return response.candidates[0]?.content?.parts[0]?.text || '';
    } catch (error) {
      console.error('Error en Gemini:', error);
      throw error;
    }
  }

  /**
   * Genera texto usando Groq API
   */
  static async generateWithGroq(prompt: string, systemPrompt?: string): Promise<string> {
    if (!FREE_APIS.groq.key) {
      throw new Error('Groq API key no configurada');
    }

    const messages = [
      ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
      { role: 'user', content: prompt }
    ];

    try {
      const response = await apiClient.post(
        FREE_APIS.groq.url,
        {
          model: FREE_APIS.groq.model,
          messages,
          max_tokens: FREE_APIS.groq.maxTokens,
          temperature: 0.7
        },
        {
          'Authorization': `Bearer ${FREE_APIS.groq.key}`
        }
      );

      return response.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Error en Groq:', error);
      throw error;
    }
  }

  /**
   * Genera texto usando HuggingFace
   */
  static async generateWithHuggingFace(prompt: string, model?: string): Promise<string> {
    const modelId = model || FREE_APIS.huggingface.models.textGeneration;
    
    try {
      const response = await apiClient.post(
        `${FREE_APIS.huggingface.url}${modelId}`,
        {
          inputs: prompt,
          parameters: {
            max_new_tokens: 500,
            temperature: 0.7,
            return_full_text: false
          }
        }
      );

      return response[0]?.generated_text || '';
    } catch (error) {
      console.error('Error en HuggingFace:', error);
      throw error;
    }
  }
}

/**
 * Servicio de Búsqueda Web
 */
export class SearchService {
  /**
   * Busca información usando DuckDuckGo
   */
  static async search(query: string): Promise<any[]> {
    try {
      const response = await apiClient.get(FREE_APIS.duckduckgo.url, {
        q: query,
        format: FREE_APIS.duckduckgo.format,
        no_html: 1,
        skip_disambig: 1
      });

      const results = [];
      
      // Resultados principales
      if (response.Abstract) {
        results.push({
          title: response.Heading,
          snippet: response.Abstract,
          url: response.AbstractURL
        });
      }

      // Resultados relacionados
      if (response.RelatedTopics) {
        response.RelatedTopics.slice(0, 5).forEach((topic: any) => {
          if (topic.Text && topic.FirstURL) {
            results.push({
              title: topic.Text.split(' - ')[0],
              snippet: topic.Text,
              url: topic.FirstURL
            });
          }
        });
      }

      return results;
    } catch (error) {
      console.error('Error en búsqueda:', error);
      return [];
    }
  }
}

/**
 * Servicio de Seguridad
 */
export class SecurityService {
  /**
   * Busca vulnerabilidades en NVD
   */
  static async searchVulnerabilities(keyword: string): Promise<any[]> {
    try {
      const response = await apiClient.get(FREE_APIS.security.nvd, {
        keywordSearch: keyword,
        resultsPerPage: 10
      });

      return response.vulnerabilities?.map((vuln: any) => ({
        cve: vuln.cve.id,
        description: vuln.cve.descriptions[0]?.value || '',
        severity: vuln.cve.metrics?.cvssMetricV31?.[0]?.cvssData?.baseSeverity || 'UNKNOWN',
        score: vuln.cve.metrics?.cvssMetricV31?.[0]?.cvssData?.baseScore || 0,
        published: vuln.cve.published
      })) || [];
    } catch (error) {
      console.error('Error buscando vulnerabilidades:', error);
      return [];
    }
  }
}

/**
 * Servicio de Análisis de Texto
 */
export class TextAnalysisService {
  /**
   * Clasifica texto usando HuggingFace
   */
  static async classify(text: string): Promise<any> {
    try {
      const response = await apiClient.post(
        `${FREE_APIS.huggingface.url}${FREE_APIS.huggingface.models.textClassification}`,
        {
          inputs: text
        }
      );

      return response[0] || [];
    } catch (error) {
      console.error('Error en clasificación:', error);
      return [];
    }
  }

  /**
   * Resume texto usando HuggingFace
   */
  static async summarize(text: string): Promise<string> {
    try {
      const response = await apiClient.post(
        `${FREE_APIS.huggingface.url}${FREE_APIS.huggingface.models.summarization}`,
        {
          inputs: text,
          parameters: {
            max_length: 150,
            min_length: 50
          }
        }
      );

      return response[0]?.summary_text || '';
    } catch (error) {
      console.error('Error en resumen:', error);
      return '';
    }
  }
}

export default {
  LLMService,
  SearchService,
  SecurityService,
  TextAnalysisService,
  apiClient
};
