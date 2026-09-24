# EDPB-FULLSTACK-OPERATIVO v5.0

[![Status](https://img.shields.io/badge/status-MVP-yellow)]()
[![Fast-track](https://img.shields.io/badge/EDPB-SPE%202025--2030-blue)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()
[![Vercel](https://img.shields.io/badge/deploy-Vercel-black)]()

Superalgoritmo de ecosistema completo con 31 componentes integrados:
7 modelos IA, 8 herramientas de ciberseguridad, 3 bases vectoriales,
8 sub-agentes EDPB y 5 gigafactorías públicas.

## 🎯 Candidato

**Manuel Gago Fernández** — Candidato EDPB Support Pool of Experts 2025-2030
(Vía fast-track, formulario 2022-2026)

## 📦 Componentes (31 totales)

| Categoría | Cantidad | Componentes |
|-----------|----------|-------------|
| IA generativa | 7 | Qwen3, DeepSeek-V4, GLM-5.2, Gemma 4, Phi-4-mini, Llama 4, Kimi K3 |
| Ciberseguridad | 8 | Strix, Nuclei, PentestGPT, PentAGI, HexStrike, Faraday, Metasploit, Recon-ng |
| Bases vectoriales | 3 | pgvector (active), Milvus, Qdrant |
| Sub-agentes EDPB | 8 | Gobernanza, AI Act, Riesgos, Regulación, Privacidad, Cloud, Formación, Evidencias |
| Gigafactorías | 5 | Nexus-AGI (133+), Marketplace (10K+), Peli (100+), Beacon (3,800+), A2A (80+) |

## 🚀 Despliegue rápido

### Local

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

### Vercel

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Desplegar
vercel --prod
```

### Script automático

```bash
# Ejecutar script de publicación completa
chmod +x publish.sh
./publish.sh
```

## 🇪🇺 EU AI Icon

Integra los 4 iconos oficiales de la UE (AI Act Art. 50(4)):
- AI (blanco/negro)
- AI (negro/blanco)
- AI (blanco 50% transparencia)
- AI (negro 50% transparencia)

## 🆓 Tokens Gratis Integrados

- Alibaba Bailian (7000万 tokens — 70+ modelos)
- Google AI Studio (Gemini 3)
- OpenRouter (20+ modelos free)
- Groq (14400 req/day)
- NVIDIA NIM (40 req/min)
- Mistral (1B tokens/month)
- +8 proveedores adicionales

## 📊 Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/status` | Estado completo del ecosistema |
| GET | `/api/version` | Versión, commit, región |
| GET | `/api/health` | Health check auto-reparación |
| GET | `/api/components` | 31 componentes |
| GET | `/api/actions` | Acciones disponibles |
| GET | `/api/log` | Log completo |
| GET | `/api/evidence?article=X` | Evidencia AI Act |
| GET | `/api/subagent?agent=X&task=Y` | Despacho sub-agente |
| GET | `/api/scan?target=X&tool=Y` | Scan ciberseguridad |
| GET | `/api/factories` | Gigafactorías |
| POST | `/api` | 13 acciones vía JSON |
| POST | `/api/test` | Test completo |

## 📄 Documentación

- [RESUMEN_EJECUTIVO.md](RESUMEN_EJECUTIVO.md)
- [DIAGNOSTICO_COMPLETO.md](DIAGNOSTICO_COMPLETO.md)
- [DEPLOY_GUIDE.md](DEPLOY_GUIDE.md)
- [MOTOR_OPERATIVO.md](MOTOR_OPERATIVO.md)
- [MVP_DECLARACION.md](MVP_DECLARACION.md)

## 📜 Licencia

MIT — Ver [LICENSE](LICENSE)

## 👤 Autor

**Manuel Gago Fernández**
Email: pergolessi9@gmail.com
GitHub: [@pergolesi9-star](https://github.com/pergolesi9-star)

## 🎯 Estado

**MVP — Fast-track candidate EDPB SPE 2025-2030**

---

© 2025 EDPB-FULLSTACK-OPERATIVO v5.0
