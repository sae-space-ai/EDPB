# 🧪 Guía de Pruebas Reales - EDPB-SUPER-ECOSYSTEM v4.0

## 📋 Estado Actual

✅ **Test Runner Implementado** - Componente funcional con 100 pruebas  
✅ **Hashes SHA-256 Reales** - Usando Web Crypto API del navegador  
✅ **Tiempos de Red Realistas** - Simulación de 100-500ms por request  
✅ **Exportación JSON** - Resultados exportables y verificables  
⚠️ **Pendiente: Despliegue en Vercel** - Necesario para pruebas HTTP reales

---

## 🎯 Qué se ha Implementado

### Test Runner Local (Simulado)
El componente `TestRunner.tsx` ejecuta las 100 pruebas localmente:

- **8 Batches de pruebas:**
  - **A (10 tests):** Conectividad básica (`/api/status`, `/api/version`, `/api/health`, `/api/components`)
  - **B (20 tests):** Generación de evidencias AI Act (Art. 5-26)
  - **C (16 tests):** Dispatch de 8 sub-agentes × 2 veces
  - **D (16 tests):** Escaneos de seguridad (8 herramientas × 2 targets)
  - **E (14 tests):** LLM dispatch (7 modelos × 2 veces)
  - **F (10 tests):** Descubrimiento de gigafactorías
  - **G (8 tests):** Logs y telemetría
  - **H (6 tests):** Full ecosystem test

- **Características:**
  - ✅ Hashes SHA-256 reales (Web Crypto API)
  - ✅ Tiempos de red simulados (100-500ms)
  - ✅ Barra de progreso en tiempo real
  - ✅ Tabla de resultados detallada
  - ✅ Resumen con estadísticas
  - ✅ Exportación JSON
  - ✅ Test Run ID único

---

## 🚀 Cómo Ejecutar Pruebas REALES

### Paso 1: Desplegar en Vercel

Sigue la guía en `DEPLOY_GUIDE.md`:

```bash
# Opción 1: Script automático
chmod +x deploy.sh
./deploy.sh

# Opción 2: Manual
npm install
npm run build
vercel --prod
```

### Paso 2: Verificar URL

```bash
# Reemplaza con tu URL real
curl https://tu-proyecto.vercel.app/api/status

# Deberías ver algo como:
# {"ecosystem":"EDPB-SUPER-ECOSYSTEM","version":"4.0.0",...}
```

### Paso 3: Modificar TestRunner para HTTP Real

Edita `src/components/TestRunner.tsx` y reemplaza la simulación con fetch real:

```typescript
// ANTES (Simulación):
const delay = simulateNetworkDelay();
await new Promise(resolve => setTimeout(resolve, delay));

// DESPUÉS (HTTP Real):
const response = await fetch('https://tu-proyecto.vercel.app/api/status');
const data = await response.json();
const delay = performance.now() - startTime;
```

### Paso 4: Ejecutar las 100 Pruebas

1. Abre la aplicación en tu navegador
2. Navega a la pestaña **"🧪 Test Runner"**
3. Haz click en **"🚀 Ejecutar 100 Pruebas"**
4. Espera a que se completen todas las pruebas
5. Exporta los resultados en JSON

---

## 📊 Estructura de las 100 Pruebas

### Batch A: Conectividad Básica (10 tests)
| # | Endpoint | Método | Descripción |
|---|----------|--------|-------------|
| A1-A3 | `/api/status` | GET | Estado del ecosistema |
| A4-A5 | `/api/version` | GET | Versión y git commit |
| A6-A7 | `/api/health` | GET | Health check |
| A8-A10 | `/api/components` | GET | Lista de 31 componentes |

### Batch B: Evidencias AI Act (20 tests)
| # | Endpoint | Método | Descripción |
|---|----------|--------|-------------|
| B1-B20 | `/api/evidence?article=Art.{N}` | GET | Generar evidencia para artículos 5-26 |

**Artículos:** 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26

### Batch C: Sub-Agentes (16 tests)
| # | Endpoint | Método | Descripción |
|---|----------|--------|-------------|
| C1-C16 | `/api/subagent?agent={name}&task=test` | GET | Dispatch de 8 agentes × 2 veces |

**Agentes:** ai_governance, ai_act_compliance, risk_assessment, regulatory_monitor, privacy_tech, cloud_security, training_designer, evidence_engine

### Batch D: Seguridad (16 tests)
| # | Endpoint | Método | Descripción |
|---|----------|--------|-------------|
| D1-D8 | `/api/scan?target=self-test.local&tool={name}` | GET | Escaneo permitido (.local) |
| D9-D16 | `/api/scan?target=example.com&tool=strix` | GET | Escaneo bloqueado (no autorizado) |

**Herramientas:** strix, nuclei, pentestgpt, pentagi, hexstrike_ai, faraday, metasploit, recon_ng

### Batch E: LLMs (14 tests)
| # | Endpoint | Método | Descripción |
|---|----------|--------|-------------|
| E1-E14 | `POST /api` con `{"action":"generate_llm","model":"{name}"}` | POST | Generación con 7 modelos × 2 veces |

**Modelos:** qwen3, deepseek_v4, glm_52, gemma_4, phi_4_mini, llama_4_scout, kimi_k3

### Batch F: Gigafactorías (10 tests)
| # | Endpoint | Método | Descripción |
|---|----------|--------|-------------|
| F1-F5 | `/api/factories` | GET | Lista todas las factorías |
| F6-F10 | `/api/factories?factory_key={name}` | GET | Detalle de cada factoría |

**Factorías:** nexus_agi, ai_agent_marketplace, peli_agent_factory, beacon_mcp, a2astore

### Batch G: Logs y Telemetría (8 tests)
| # | Endpoint | Método | Descripción |
|---|----------|--------|-------------|
| G1-G3 | `/api/log` | GET | Obtener logs |
| G4-G5 | `POST /api` con `{"action":"reset_telemetry"}` | POST | Resetear telemetría |
| G6-G8 | `/api/status` | GET | Verificar reset |

### Batch H: Full Test (6 tests)
| # | Endpoint | Método | Descripción |
|---|----------|--------|-------------|
| H1-H6 | `POST /api/test` | POST | Test completo del ecosistema |

---

## 🔐 Verificación de Hashes SHA-256

Cada prueba genera un hash SHA-256 real usando la Web Crypto API del navegador:

```typescript
async function computeSHA256(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 16);
}
```

**Verificación manual:**
```bash
# En terminal (macOS/Linux):
echo -n "Art.9" | shasum -a 256 | cut -c1-16

# En Python:
import hashlib
hashlib.sha256(b"Art.9").hexdigest()[:16]
```

---

## 📤 Formato de Exportación JSON

```json
{
  "test_run_id": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
  "base_url": "https://tu-proyecto.vercel.app",
  "executed_at": "2026-01-15T10:30:00.000Z",
  "results": [
    {
      "id": 1,
      "batch": "A",
      "command": "GET /api/status",
      "http": 200,
      "time_ms": 234,
      "status": "success",
      "note": "ecosystem=EDPB-SUPER-ECOSYSTEM",
      "hash": "a1b2c3d4e5f6g7h8"
    }
    // ... 99 resultados más
  ],
  "summary": {
    "total": 100,
    "success": 92,
    "failed": 0,
    "blocked": 8,
    "timeout": 0,
    "avg_response_time": 287,
    "success_rate": 92
  }
}
```

---

## 🎯 Métricas Esperadas

### Escenario Ideal (Backend Funcional)
- **Tasa de éxito:** 92-100%
- **8 tests bloqueados:** D9-D16 (esperado, target no autorizado)
- **Tiempo promedio:** 200-500ms
- **Total tests:** 100

### Escenario con Errores
- **Timeouts:** Si el backend no responde en 5s
- **Connection errors:** Si la URL es incorrecta
- **HTTP 500:** Si hay errores en el backend

---

## 🔧 Troubleshooting

### Error: "Failed to fetch"
**Causa:** URL incorrecta o backend no desplegado  
**Solución:** Verifica que `https://tu-proyecto.vercel.app/api/status` responde

### Error: "CORS policy"
**Causa:** Backend no permite requests desde el navegador  
**Solución:** Añade headers CORS en el backend:
```python
self.send_header("Access-Control-Allow-Origin", "*")
self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
```

### Error: "404 Not Found"
**Causa:** Endpoint no existe  
**Solución:** Verifica que el backend tiene todos los endpoints implementados

### Error: "500 Internal Server Error"
**Causa:** Error en el backend  
**Solución:** Revisa los logs en Vercel Dashboard

---

## 📊 Ejemplo de Resultados Reales

### Tabla de Resultados
| # | Batch | Comando | HTTP | Tiempo | Estado | Hash |
|---|-------|---------|------|--------|--------|------|
| 1 | A | GET /api/status | 200 | 234ms | success | a1b2c3d4e5f6... |
| 2 | A | GET /api/status | 200 | 198ms | success | b2c3d4e5f6g7... |
| ... | ... | ... | ... | ... | ... | ... |
| 100 | H | POST /api/test | 200 | 1892ms | success | z9y8x7w6v5u4... |

### Resumen
| Métrica | Valor |
|---------|-------|
| Total tests | 100 |
| Éxito | 92 |
| Fallido | 0 |
| Bloqueado | 8 |
| Timeout | 0 |
| Tiempo promedio | 287ms |
| Tasa de éxito | 92% |

---

## ✅ Checklist para Pruebas Reales

- [ ] Proyecto desplegado en Vercel
- [ ] URL verificada con `curl`
- [ ] TestRunner modificado para usar `fetch()` real
- [ ] CORS habilitado en el backend
- [ ] 100 pruebas ejecutadas
- [ ] Resultados exportados en JSON
- [ ] Hashes SHA-256 verificados
- [ ] Resumen generado
- [ ] Documentación actualizada con resultados reales

---

## 🎉 Conclusión

El **Test Runner** está completamente implementado y listo para ejecutar las 100 pruebas. Una vez desplegado el backend en Vercel, solo necesitas:

1. Modificar las URLs en `TestRunner.tsx`
2. Ejecutar las pruebas
3. Exportar los resultados
4. Verificar los hashes SHA-256

**El sistema está diseñado para ser 100% transparente y verificable.**

---

**© 2025 EDPB-SUPER-ECOSYSTEM v4.0**  
**Autor:** Manuel Gago Fernández  
**Candidato:** EDPB Support Pool of Experts 2025-2030  

**Test Runner con Hashes SHA-256 Reales**  
**100 Pruebas · Web Crypto API · Exportación JSON · 100% Transparente**
