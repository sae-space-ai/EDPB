/**
 * Módulos Gratuitos para Agentes
 * Colección de herramientas y APIs gratuitas para mejorar la eficacia de los agentes
 */

// ============================================
// MÓDULOS DE PROCESAMIENTO DE TEXTO
// ============================================

export const TextProcessingModules = {
  // Tokenización
  tokenizer: {
    name: 'Tokenizer',
    description: 'Divide texto en tokens',
    free: true,
    async tokenize(text: string): Promise<string[]> {
      return text.split(/\s+/).filter(token => token.length > 0);
    }
  },

  // Limpieza de texto
  textCleaner: {
    name: 'Text Cleaner',
    description: 'Limpia y normaliza texto',
    free: true,
    clean(text: string): string {
      return text
        .replace(/\s+/g, ' ')
        .replace(/[^\w\s.,!?;:]/g, '')
        .trim();
    }
  },

  // Extracción de palabras clave
  keywordExtractor: {
    name: 'Keyword Extractor',
    description: 'Extrae palabras clave del texto',
    free: true,
    extract(text: string, topN: number = 10): string[] {
      const words = text.toLowerCase().split(/\s+/);
      const stopWords = new Set(['el', 'la', 'los', 'las', 'un', 'una', 'de', 'del', 'en', 'y', 'o', 'a', 'que', 'por', 'con', 'para', 'es', 'son']);
      
      const wordFreq: Record<string, number> = {};
      words.forEach(word => {
        const cleanWord = word.replace(/[^\w]/g, '');
        if (cleanWord.length > 3 && !stopWords.has(cleanWord)) {
          wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1;
        }
      });

      return Object.entries(wordFreq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, topN)
        .map(([word]) => word);
    }
  }
};

// ============================================
// MÓDULOS DE ANÁLISIS DE DATOS
// ============================================

export const DataAnalysisModules = {
  // Estadísticas básicas
  statistics: {
    name: 'Statistics',
    description: 'Cálculos estadísticos básicos',
    free: true,
    
    mean(numbers: number[]): number {
      return numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
    },
    
    median(numbers: number[]): number {
      const sorted = [...numbers].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    },
    
    stdDev(numbers: number[]): number {
      const mean = this.mean(numbers);
      const squaredDiffs = numbers.map(n => Math.pow(n - mean, 2));
      return Math.sqrt(this.mean(squaredDiffs));
    },
    
    percentile(numbers: number[], p: number): number {
      const sorted = [...numbers].sort((a, b) => a - b);
      const index = (p / 100) * (sorted.length - 1);
      const lower = Math.floor(index);
      const upper = Math.ceil(index);
      const weight = index - lower;
      return sorted[lower] * (1 - weight) + sorted[upper] * weight;
    }
  },

  // Agrupación de datos
  clustering: {
    name: 'Clustering',
    description: 'Algoritmos de agrupamiento simples',
    free: true,
    
    kMeans(data: number[][], k: number, maxIterations: number = 100): number[][] {
      // Inicializar centroides aleatoriamente
      const centroids = data.slice(0, k);
      let clusters: number[][] = [];

      for (let iter = 0; iter < maxIterations; iter++) {
        // Asignar puntos a clusters
        clusters = Array.from({ length: k }, () => []);
        
        data.forEach((point, idx) => {
          let minDist = Infinity;
          let closestCentroid = 0;
          
          centroids.forEach((centroid, cIdx) => {
            const dist = Math.sqrt(
              point.reduce((sum, val, i) => sum + Math.pow(val - centroid[i], 2), 0)
            );
            if (dist < minDist) {
              minDist = dist;
              closestCentroid = cIdx;
            }
          });
          
          clusters[closestCentroid].push(idx);
        });

        // Actualizar centroides
        const newCentroids = centroids.map((centroid, cIdx) => {
          if (clusters[cIdx].length === 0) return centroid;
          
          const clusterPoints = clusters[cIdx].map(idx => data[idx]);
          return clusterPoints[0].map((_, dim) => 
            clusterPoints.reduce((sum, point) => sum + point[dim], 0) / clusterPoints.length
          );
        });

        // Verificar convergencia
        const converged = centroids.every((centroid, i) =>
          centroid.every((val, j) => Math.abs(val - newCentroids[i][j]) < 0.001)
        );

        if (converged) break;
        centroids.splice(0, k, ...newCentroids);
      }

      return clusters;
    }
  }
};

// ============================================
// MÓDULOS DE CRIPTOGRAFÍA
// ============================================

export const CryptoModules = {
  // Hash SHA-256
  sha256: {
    name: 'SHA-256',
    description: 'Genera hash SHA-256',
    free: true,
    
    async hash(text: string): Promise<string> {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
  },

  // Generador de UUID
  uuid: {
    name: 'UUID Generator',
    description: 'Genera identificadores únicos',
    free: true,
    
    generate(): string {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  },

  // Codificación Base64
  base64: {
    name: 'Base64',
    description: 'Codificación/decodificación Base64',
    free: true,
    
    encode(text: string): string {
      return btoa(unescape(encodeURIComponent(text)));
    },
    
    decode(encoded: string): string {
      return decodeURIComponent(escape(atob(encoded)));
    }
  }
};

// ============================================
// MÓDULOS DE VALIDACIÓN
// ============================================

export const ValidationModules = {
  // Validador de email
  email: {
    name: 'Email Validator',
    description: 'Valida direcciones de email',
    free: true,
    
    validate(email: string): boolean {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  },

  // Validador de URL
  url: {
    name: 'URL Validator',
    description: 'Valida URLs',
    free: true,
    
    validate(url: string): boolean {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    }
  },

  // Validador de JSON
  json: {
    name: 'JSON Validator',
    description: 'Valida y parsea JSON',
    free: true,
    
    validate(jsonString: string): { valid: boolean; data?: any; error?: string } {
      try {
        const data = JSON.parse(jsonString);
        return { valid: true, data };
      } catch (error) {
        return { valid: false, error: (error as Error).message };
      }
    }
  }
};

// ============================================
// MÓDULOS DE FECHAS Y TIEMPO
// ============================================

export const DateTimeModules = {
  // Formateador de fechas
  formatter: {
    name: 'Date Formatter',
    description: 'Formatea fechas',
    free: true,
    
    format(date: Date, locale: string = 'es-ES'): string {
      return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    
    relative(date: Date): string {
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffSecs = Math.floor(diffMs / 1000);
      const diffMins = Math.floor(diffSecs / 60);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffSecs < 60) return 'hace unos segundos';
      if (diffMins < 60) return `hace ${diffMins} minuto${diffMins > 1 ? 's' : ''}`;
      if (diffHours < 24) return `hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
      if (diffDays < 30) return `hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
      return this.format(date);
    }
  },

  // Calculadora de tiempo
  calculator: {
    name: 'Time Calculator',
    description: 'Calcula diferencias de tiempo',
    free: true,
    
    diffInDays(date1: Date, date2: Date): number {
      const diffMs = Math.abs(date2.getTime() - date1.getTime());
      return Math.floor(diffMs / (1000 * 60 * 60 * 24));
    },
    
    diffInHours(date1: Date, date2: Date): number {
      const diffMs = Math.abs(date2.getTime() - date1.getTime());
      return Math.floor(diffMs / (1000 * 60 * 60));
    },
    
    addDays(date: Date, days: number): Date {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }
  }
};

// ============================================
// MÓDULOS DE RED
// ============================================

export const NetworkModules = {
  // Verificador de conectividad
  connectivity: {
    name: 'Connectivity Checker',
    description: 'Verifica conexión a internet',
    free: true,
    
    async isOnline(): Promise<boolean> {
      try {
        const response = await fetch('https://httpbin.org/get', { 
          method: 'GET',
          mode: 'no-cors'
        });
        return true;
      } catch {
        return false;
      }
    }
  },

  // Medidor de latencia
  latency: {
    name: 'Latency Meter',
    description: 'Mide latencia de red',
    free: true,
    
    async measure(url: string = 'https://httpbin.org/get'): Promise<number> {
      const start = performance.now();
      try {
        await fetch(url, { method: 'HEAD', mode: 'no-cors' });
        return performance.now() - start;
      } catch {
        return -1;
      }
    }
  }
};

// ============================================
// MÓDULOS DE ALMACENAMIENTO
// ============================================

export const StorageModules = {
  // LocalStorage con expiración
  localStorage: {
    name: 'Smart LocalStorage',
    description: 'LocalStorage con expiración',
    free: true,
    
    set(key: string, value: any, ttlMs: number = 3600000): void {
      const item = {
        value,
        expiry: Date.now() + ttlMs
      };
      window.localStorage.setItem(key, JSON.stringify(item));
    },
    
    get(key: string): any {
      const itemStr = window.localStorage.getItem(key);
      if (!itemStr) return null;
      
      const item = JSON.parse(itemStr);
      if (Date.now() > item.expiry) {
        window.localStorage.removeItem(key);
        return null;
      }
      
      return item.value;
    },
    
    remove(key: string): void {
      window.localStorage.removeItem(key);
    },
    
    clear(): void {
      window.localStorage.clear();
    }
  },

  // SessionStorage mejorado
  sessionStorage: {
    name: 'Smart SessionStorage',
    description: 'SessionStorage con métodos mejorados',
    free: true,
    
    set(key: string, value: any): void {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    },
    
    get(key: string): any {
      const value = window.sessionStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    },
    
    remove(key: string): void {
      window.sessionStorage.removeItem(key);
    }
  }
};

// ============================================
// EXPORTACIÓN DE TODOS LOS MÓDULOS
// ============================================

export const FreeModules = {
  text: TextProcessingModules,
  data: DataAnalysisModules,
  crypto: CryptoModules,
  validation: ValidationModules,
  datetime: DateTimeModules,
  network: NetworkModules,
  storage: StorageModules
};

export default FreeModules;
