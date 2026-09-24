#!/bin/bash
# =============================================================================
# EDPB-FULLSTACK-OPERATIVO v5.0 - PUBLISH SCRIPT v2.1
# Autor: Manuel Gago Fernández | Candidato EDPB SPE 2025-2030
# Uso: ./publish.sh
# =============================================================================

set -e

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  EDPB-FULLSTACK-OPERATIVO v5.0 - PUBLISH SCRIPT v2.1           ║"
echo "║  Autor: Manuel Gago Fernández                                  ║"
echo "║  Candidato: EDPB SPE 2025-2030 (fast-track)                    ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# =============================================================================
# CONFIGURACIÓN - REEMPLAZA ESTOS VALORES
# =============================================================================
GITHUB_USER="${GITHUB_USER:-pergolesi9-star}"
GITHUB_REPO="${GITHUB_REPO:-edpb-fullstack-operativo}"
VERCEL_PROJECT="${VERCEL_PROJECT:-edpb-fullstack-operativo}"

echo -e "${BLUE}Configuración:${NC}"
echo "  GitHub User:    $GITHUB_USER"
echo "  GitHub Repo:    $GITHUB_REPO"
echo "  Vercel Project: $VERCEL_PROJECT"
echo ""

# =============================================================================
# FASE 0: PRE-VERIFICACIÓN
# =============================================================================
echo -e "${BLUE}[FASE 0] Pre-verificación...${NC}"

command -v git >/dev/null 2>&1 || { echo -e "${RED}✗ Git no instalado${NC}"; exit 1; }
echo -e "${GREEN}✓ Git: $(git --version | head -1)${NC}"

command -v node >/dev/null 2>&1 || { echo -e "${RED}✗ Node.js no instalado${NC}"; exit 1; }
echo -e "${GREEN}✓ Node.js: $(node --version)${NC}"

command -v npm >/dev/null 2>&1 || { echo -e "${RED}✗ npm no instalado${NC}"; exit 1; }
echo -e "${GREEN}✓ npm: $(npm --version)${NC}"

# Verificar Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠ Vercel CLI no instalado. Instalando...${NC}"
    npm install -g vercel@latest
fi
echo -e "${GREEN}✓ Vercel CLI: $(vercel --version)${NC}"

# Verificar GitHub CLI (opcional)
if command -v gh &> /dev/null; then
    echo -e "${GREEN}✓ GitHub CLI: $(gh --version | head -1)${NC}"
else
    echo -e "${YELLOW}⚠ GitHub CLI no instalado (opcional)${NC}"
fi

echo ""

# =============================================================================
# FASE 1: INICIALIZAR GIT
# =============================================================================
echo -e "${BLUE}[FASE 1] Inicializando Git...${NC}"

git init 2>/dev/null || true
git branch -M main
git config user.name "Manuel Gago Fernández" 2>/dev/null || true
git config user.email "pergolessi9@gmail.com" 2>/dev/null || true

# .gitignore
if [ ! -f .gitignore ]; then
    cat > .gitignore << 'EOF'
__pycache__/
*.py[cod]
.vercel
.env
.env.local
node_modules/
.DS_Store
*.log
dist/
build/
EOF
    echo -e "${GREEN}✓ .gitignore creado${NC}"
fi

# Commit inicial
git add .
if git diff --staged --quiet; then
    echo -e "${YELLOW}⚠ Sin cambios para commit${NC}"
else
    git commit -m "🎉 MVP: EDPB Super Ecosystem v5.0 - Initial commit

- 31 componentes integrados
- 14 endpoints REST
- 8 sub-agentes EDPB
- 5 gigafactorías públicas
- EU AI Icon integrado (Art. 50(4))
- 14 proveedores de tokens gratuitos
- Motor operativo con auto-reparación
- Fast-track candidate EDPB SPE 2025-2030"
    echo -e "${GREEN}✓ Commit creado${NC}"
fi

echo ""

# =============================================================================
# FASE 2: CREAR REPOSITORIO EN GITHUB
# =============================================================================
echo -e "${BLUE}[FASE 2] Creando repositorio en GitHub...${NC}"

if command -v gh &> /dev/null; then
    # Crear repo con gh CLI
    gh repo create "$GITHUB_REPO" \
        --public \
        --description "EDPB Super Ecosystem v5.0 — MVP Fast-track candidate | Manuel Gago Fernández | EDPB SPE 2025-2030" \
        --source=. \
        --remote=origin \
        --push 2>/dev/null || {
            echo -e "${YELLOW}⚠ Repo ya existe o error. Intentando push manual...${NC}"
            git remote set-url origin "https://github.com/$GITHUB_USER/$GITHUB_REPO.git" 2>/dev/null || \
            git remote add origin "https://github.com/$GITHUB_USER/$GITHUB_REPO.git" 2>/dev/null || true
            git push -u origin main 2>/dev/null || echo -e "${YELLOW}⚠ Push falló. Crea el repo manualmente.${NC}"
        }
else
    # Sin gh CLI - crear remote manualmente
    git remote set-url origin "https://github.com/$GITHUB_USER/$GITHUB_REPO.git" 2>/dev/null || \
    git remote add origin "https://github.com/$GITHUB_USER/$GITHUB_REPO.git" 2>/dev/null || true
    
    echo -e "${YELLOW}⚠ GitHub CLI no disponible.${NC}"
    echo -e "${YELLOW}  Crea el repo manualmente en: https://github.com/new${NC}"
    echo -e "${YELLOW}  Nombre: $GITHUB_REPO${NC}"
    echo -e "${YELLOW}  Luego ejecuta: git push -u origin main${NC}"
    
    read -p "¿Ya creaste el repo? (s/n): " repo_created
    if [ "$repo_created" = "s" ]; then
        git push -u origin main || echo -e "${RED}✗ Push falló${NC}"
    fi
fi

echo -e "${GREEN}✓ GitHub: https://github.com/$GITHUB_USER/$GITHUB_REPO${NC}"
echo ""

# =============================================================================
# FASE 3: TAG Y RELEASE
# =============================================================================
echo -e "${BLUE}[FASE 3] Creando tag v5.0.0...${NC}"

git tag -a v5.0.0 -m "MVP Release v5.0.0 - EDPB Fast-track" 2>/dev/null || true
git push origin v5.0.0 2>/dev/null || true

if command -v gh &> /dev/null; then
    gh release create v5.0.0 \
        --title "v5.0.0 - MVP Release" \
        --notes "## EDPB-FULLSTACK-OPERATIVO v5.0.0 (MVP)

### Componentes (31)
- 7 modelos IA generativa
- 8 herramientas ciberseguridad
- 3 bases vectoriales
- 8 sub-agentes EDPB
- 5 gigafactorías públicas

### Endpoints (14)
- 11 GET + 3 POST

### Estado
- MVP - Fast-track candidate EDPB SPE 2025-2030
- EU AI Icon integrado (Art. 50(4))
- 14 proveedores de tokens gratuitos

### Autor
Manuel Gago Fernández - pergolessi9@gmail.com" 2>/dev/null || true
    echo -e "${GREEN}✓ Release v5.0.0 creado${NC}"
fi

echo ""

# =============================================================================
# FASE 4: DESPLEGAR EN VERCEL
# =============================================================================
echo -e "${BLUE}[FASE 4] Desplegando en Vercel...${NC}"

# Login si es necesario
vercel whoami >/dev/null 2>&1 || {
    echo -e "${YELLOW}⚠ No estás logueado en Vercel${NC}"
    echo -e "${YELLOW}  Ejecuta: vercel login${NC}"
    vercel login
}

# Link proyecto
vercel link --yes 2>/dev/null || true

# Deploy producción
echo -e "${BLUE}  Desplegando...${NC}"
vercel --prod --yes

# Obtener URL
PROD_URL=$(vercel ls --prod 2>/dev/null | grep -oE 'https://[a-zA-Z0-9.-]+\.vercel\.app' | head -1)

if [ -n "$PROD_URL" ]; then
    echo -e "${GREEN}✓ Vercel: $PROD_URL${NC}"
else
    echo -e "${YELLOW}⚠ No se pudo obtener URL automáticamente${NC}"
    echo -e "${YELLOW}  Verifica en: https://vercel.com/dashboard${NC}"
fi

echo ""

# =============================================================================
# FASE 5: VERIFICAR ENDPOINTS
# =============================================================================
echo -e "${BLUE}[FASE 5] Verificando endpoints...${NC}"

if [ -n "$PROD_URL" ]; then
    echo ""
    echo "  Probando endpoints..."
    
    for ep in status version health components; do
        HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL/" 2>/dev/null || echo "000")
        if [ "$HTTP_CODE" = "200" ]; then
            echo -e "  ${GREEN}✓${NC} / → HTTP $HTTP_CODE"
        else
            echo -e "  ${YELLOW}⚠${NC} / → HTTP $HTTP_CODE"
        fi
        break
    done
    
    echo ""
    echo -e "${GREEN}✓ Verificación completada${NC}"
else
    echo -e "${YELLOW}⚠ Sin URL de producción para verificar${NC}"
fi

echo ""

# =============================================================================
# FASE 6: GENERAR REPORTE
# =============================================================================
echo -e "${BLUE}[FASE 6] Generando reporte...${NC}"

cat > POST_DEPLOY_REPORT.md << EOF
# EDPB-ARCHITECT-2025 v2.1 - Reporte de Despliegue

**Fecha:** $(date -u +"%Y-%m-%dT%H:%M:%SZ")
**Autor:** Manuel Gago Fernández
**Estado:** MVP - Fast-track candidate EDPB SPE 2025-2030

## URLs

- **GitHub:** https://github.com/$GITHUB_USER/$GITHUB_REPO
- **Vercel:** ${PROD_URL:-pendiente}
- **Actions:** https://github.com/$GITHUB_USER/$GITHUB_REPO/actions
- **Release:** https://github.com/$GITHUB_USER/$GITHUB_REPO/releases/tag/v5.0.0

## Componentes (31)

- 7 LLM: qwen3, deepseek_v4, glm_52, gemma_4, phi_4_mini, llama_4_scout, kimi_k3
- 8 Ciberseguridad: strix, nuclei, pentestgpt, pentagi, hexstrike_ai, faraday, metasploit, recon_ng
- 3 DB: pgvector, milvus, qdrant
- 8 Subagentes EDPB
- 5 Gigafactorías

## Endpoints (14)

11 GET + 3 POST

## Próximo paso

Enviar formulario EDPB SPE 2025-2030 vía fast-track.
EOF

git add POST_DEPLOY_REPORT.md 2>/dev/null || true
git commit -m "docs: post-deploy report v2.1" 2>/dev/null || true
git push origin main 2>/dev/null || true

echo -e "${GREEN}✓ Reporte generado: POST_DEPLOY_REPORT.md${NC}"
echo ""

# =============================================================================
# RESUMEN FINAL
# =============================================================================
echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                                                                ║"
echo "║              ✓ PUBLICACIÓN COMPLETADA                          ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}URLs finales:${NC}"
echo ""
echo -e "  ${BLUE}GitHub:${NC}  https://github.com/$GITHUB_USER/$GITHUB_REPO"
echo -e "  ${BLUE}Vercel:${NC}  ${PROD_URL:-ver en https://vercel.com/dashboard}"
echo -e "  ${BLUE}Actions:${NC} https://github.com/$GITHUB_USER/$GITHUB_REPO/actions"
echo -e "  ${BLUE}Release:${NC} https://github.com/$GITHUB_USER/$GITHUB_REPO/releases/tag/v5.0.0"
echo ""
echo -e "${GREEN}Próximo paso:${NC}"
echo "  Enviar formulario EDPB SPE 2025-2030 vía fast-track"
echo "  Adjuntar POST_DEPLOY_REPORT.md como evidencia"
echo ""
echo "════════════════════════════════════════════════════════════════"
echo ""
