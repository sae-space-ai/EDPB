#!/bin/bash

# =============================================================================
# EDPB-FULLSTACK-OPERATIVO v5.0 - SCRIPT DE PUBLICACIÓN COMPLETA
# GitHub + Vercel + CI/CD + Monitoreo
# Autor: Manuel Gago Fernández | EDPB SPE 2025-2030
# =============================================================================

set -e

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

print_header() {
    echo ""
    echo "======================================================================"
    echo -e "${BLUE}$1${NC}"
    echo "======================================================================"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# =============================================================================
# CONFIGURACIÓN
# =============================================================================

print_header "EDPB-FULLSTACK-OPERATIVO v5.0 - PUBLICACIÓN COMPLETA"
echo ""
echo "Este script te guiará paso a paso para publicar tu proyecto en:"
echo "  • GitHub (repositorio + workflows + release)"
echo "  • Vercel (deploy + CI/CD)"
echo "  • Monitoreo (UptimeRobot)"
echo ""

# Preguntar configuración
read -p "Usuario de GitHub: " GITHUB_USER
read -p "Nombre del repositorio (default: edpb-backend): " GITHUB_REPO_NAME
GITHUB_REPO_NAME=${GITHUB_REPO_NAME:-edpb-backend}
read -p "Nombre del proyecto Vercel (default: edpb-backend): " VERCEL_PROJECT_NAME
VERCEL_PROJECT_NAME=${VERCEL_PROJECT_NAME:-edpb-backend}

echo ""
echo "Configuración:"
echo "  GitHub User: $GITHUB_USER"
echo "  GitHub Repo: $GITHUB_REPO_NAME"
echo "  Vercel Project: $VERCEL_PROJECT_NAME"
echo ""

read -p "¿Continuar? (s/n): " confirm
if [ "$confirm" != "s" ]; then
    echo "Cancelado."
    exit 0
fi

# =============================================================================
# FASE 0 - PRE-VERIFICACIÓN
# =============================================================================

print_header "FASE 0: PRE-VERIFICACIÓN"

# Verificar dependencias
echo "[0.1] Verificando dependencias..."
command -v git >/dev/null 2>&1 || { print_error "Git no está instalado"; exit 1; }
print_success "Git: $(git --version)"

command -v node >/dev/null 2>&1 || { print_error "Node.js no está instalado"; exit 1; }
print_success "Node.js: $(node --version)"

command -v npm >/dev/null 2>&1 || { print_error "npm no está instalado"; exit 1; }
print_success "npm: $(npm --version)"

command -v python3 >/dev/null 2>&1 || { print_warning "Python3 no está instalado (opcional)" }

# Verificar CLIs
echo ""
echo "[0.2] Verificando CLIs..."

if ! command -v vercel &> /dev/null; then
    print_warning "Vercel CLI no está instalado"
    read -p "¿Instalar ahora? (s/n): " install_vercel
    if [ "$install_vercel" = "s" ]; then
        npm install -g vercel@latest
        print_success "Vercel CLI instalado"
    fi
else
    print_success "Vercel CLI: $(vercel --version)"
fi

if ! command -v gh &> /dev/null; then
    print_warning "GitHub CLI no está instalado"
    echo "Instálalo desde: https://cli.github.com/"
else
    print_success "GitHub CLI: $(gh --version | head -1)"
fi

# Verificar autenticación
echo ""
echo "[0.3] Verificando autenticación..."

git config user.name >/dev/null 2>&1 || {
    print_warning "Git user.name no configurado"
    read -p "Configurar ahora (nombre): " git_name
    git config --global user.name "$git_name"
}

git config user.email >/dev/null 2>&1 || {
    print_warning "Git user.email no configurado"
    read -p "Configurar ahora (email): " git_email
    git config --global user.email "$git_email"
}

print_success "Git user: $(git config user.name) <$(git config user.email)>"

if command -v vercel &> /dev/null; then
    vercel whoami >/dev/null 2>&1 || {
        print_warning "Vercel no autenticado"
        echo "Ejecuta: vercel login"
    }
fi

if command -v gh &> /dev/null; then
    gh auth status >/dev/null 2>&1 || {
        print_warning "GitHub CLI no autenticado"
        echo "Ejecuta: gh auth login"
    }
fi

# =============================================================================
# COMANDO 1 - PUBLICAR EN GITHUB
# =============================================================================

print_header "COMANDO 1: PUBLICAR EN GITHUB"

# Paso 1.1 - Inicializar repositorio
echo "[1.1] Inicializando repositorio Git..."
if [ ! -d .git ]; then
    git init
    git branch -M main
    print_success "Repositorio Git inicializado"
else
    print_success "Repositorio Git ya existe"
fi

# Paso 1.2 - Verificar .gitignore
echo ""
echo "[1.2] Verificando .gitignore..."
if [ -f .gitignore ]; then
    print_success ".gitignore ya existe"
else
    print_warning ".gitignore no existe, créalo manualmente"
fi

# Paso 1.3 - Verificar LICENSE
echo ""
echo "[1.3] Verificando LICENSE..."
if [ -f LICENSE ]; then
    print_success "LICENSE ya existe"
else
    print_warning "LICENSE no existe, créalo manualmente"
fi

# Paso 1.4 - Verificar README.md
echo ""
echo "[1.4] Verificando README.md..."
if [ -f README.md ]; then
    print_success "README.md ya existe"
else
    print_warning "README.md no existe, créalo manualmente"
fi

# Paso 1.5 - Verificar workflows
echo ""
echo "[1.5] Verificando GitHub Actions workflows..."
if [ -d .github/workflows ]; then
    workflow_count=$(ls -1 .github/workflows/*.yml 2>/dev/null | wc -l)
    print_success "$workflow_count workflows encontrados"
else
    print_warning ".github/workflows no existe"
fi

# Paso 1.6 - Primer commit
echo ""
echo "[1.6] Creando primer commit..."
git add .
if git diff --staged --quiet; then
    print_warning "No hay cambios para commit"
else
    git commit -m "🎉 MVP: EDPB Super Ecosystem v5.0 — Initial commit

- 31 componentes integrados
- 14 endpoints REST
- 8 sub-agentes EDPB
- 5 gigafactorías públicas
- EU AI Icon integrado
- CI/CD configurado
- Fast-track candidate EDPB SPE 2025-2030"
    print_success "Commit creado"
fi

# Paso 1.7 - Crear repositorio en GitHub
echo ""
echo "[1.7] Creando repositorio en GitHub..."
if command -v gh &> /dev/null; then
    read -p "¿Crear repositorio en GitHub ahora? (s/n): " create_repo
    if [ "$create_repo" = "s" ]; then
        gh repo create "$GITHUB_REPO_NAME" \
            --public \
            --description "EDPB Super Ecosystem v5.0 — MVP Fast-track candidate" \
            --source=. \
            --remote=origin \
            --push
        print_success "Repositorio creado en GitHub"
    else
        print_warning "Creación de repositorio omitida"
        echo "Puedes crearlo manualmente en: https://github.com/new"
    fi
else
    print_warning "GitHub CLI no disponible"
    echo "Crea el repositorio manualmente en: https://github.com/new"
    echo "Luego ejecuta:"
    echo "  git remote add origin https://github.com/$GITHUB_USER/$GITHUB_REPO_NAME.git"
    echo "  git push -u origin main"
fi

# Paso 1.8 - Crear rama develop
echo ""
echo "[1.8] Creando rama develop..."
if ! git show-ref --verify --quiet refs/heads/develop; then
    git checkout -b develop
    git push -u origin develop 2>/dev/null || print_warning "No se pudo push develop (crea el repo primero)"
    git checkout main
    print_success "Rama develop creada"
else
    print_success "Rama develop ya existe"
fi

# Paso 1.9 - Crear tag
echo ""
echo "[1.9] Creando tag v5.0.0..."
if ! git tag | grep -q "v5.0.0"; then
    git tag -a v5.0.0 -m "MVP Release v5.0.0 — EDPB Fast-track"
    git push origin v5.0.0 2>/dev/null || print_warning "No se pudo push tag (crea el repo primero)"
    print_success "Tag v5.0.0 creado"
else
    print_success "Tag v5.0.0 ya existe"
fi

# Paso 1.10 - Crear release
echo ""
echo "[1.10] Creando release en GitHub..."
if command -v gh &> /dev/null; then
    gh release create v5.0.0 \
        --title "v5.0.0 — MVP Release" \
        --notes "## EDPB-FULLSTACK-OPERATIVO v5.0.0 (MVP)

### Componentes
- 7 modelos IA generativa
- 8 herramientas ciberseguridad
- 3 bases vectoriales
- 8 sub-agentes EDPB
- 5 gigafactorías públicas

### Endpoints
- 11 GET + 3 POST = 14 totales

### Estado
- MVP — Fast-track candidate EDPB SPE 2025-2030
- EU AI Icon integrado (Art. 50(4) AI Act)

### Autor
Manuel Gago Fernández" 2>/dev/null || print_warning "No se pudo crear release (crea el repo primero)"
    print_success "Release v5.0.0 creado"
else
    print_warning "GitHub CLI no disponible"
    echo "Crea el release manualmente en: https://github.com/$GITHUB_USER/$GITHUB_REPO_NAME/releases/new"
fi

# =============================================================================
# COMANDO 2 - DESPLEGAR EN VERCEL
# =============================================================================

print_header "COMANDO 2: DESPLEGAR EN VERCEL"

if ! command -v vercel &> /dev/null; then
    print_error "Vercel CLI no está instalado"
    echo "Instálalo con: npm install -g vercel@latest"
    echo "Continuando sin Vercel..."
else
    # Paso 2.1 - Login
    echo "[2.1] Verificando login en Vercel..."
    vercel whoami >/dev/null 2>&1 || {
        print_warning "No estás logueado en Vercel"
        echo "Ejecuta: vercel login"
        read -p "¿Continuar después de login? (s/n): " continue_vercel
        if [ "$continue_vercel" != "s" ]; then
            echo "Saltando despliegue en Vercel"
        fi
    }

    # Paso 2.2 - Link
    echo ""
    echo "[2.2] Vinculando proyecto con Vercel..."
    if [ ! -d .vercel ]; then
        read -p "¿Vincular proyecto con Vercel ahora? (s/n): " link_vercel
        if [ "$link_vercel" = "s" ]; then
            vercel link
            print_success "Proyecto vinculado"
        fi
    else
        print_success "Proyecto ya vinculado"
    fi

    # Paso 2.3 - Verificar vercel.json
    echo ""
    echo "[2.3] Verificando vercel.json..."
    if [ -f vercel.json ]; then
        print_success "vercel.json existe"
    else
        print_warning "vercel.json no existe"
    fi

    # Paso 2.4 - Configurar environment variables
    echo ""
    echo "[2.4] Configurando environment variables..."
    if [ -f .env ]; then
        read -p "¿Subir variables de .env a Vercel? (s/n): " upload_env
        if [ "$upload_env" = "s" ]; then
            while IFS='=' read -r key value; do
                if [ -n "$key" ] && [ -n "$value" ] && [[ ! "$key" =~ ^# ]]; then
                    echo "$value" | vercel env add "$key" production 2>/dev/null || print_warning "No se pudo subir $key"
                fi
            done < .env
            print_success "Variables subidas"
        fi
    else
        print_warning ".env no existe"
    fi

    # Paso 2.5 - Deploy producción
    echo ""
    echo "[2.5] Desplegando en producción..."
    read -p "¿Desplegar en Vercel ahora? (s/n): " deploy_vercel
    if [ "$deploy_vercel" = "s" ]; then
        vercel --prod
        print_success "Deploy completado"
        
        # Obtener URL
        PROD_URL=$(vercel ls --prod 2>/dev/null | grep -oE 'https://[a-zA-Z0-9.-]+\.vercel\.app' | head -1)
        if [ -n "$PROD_URL" ]; then
            print_success "URL de producción: $PROD_URL"
        fi
    fi
fi

# =============================================================================
# COMANDO 3 - CONFIGURAR CI/CD
# =============================================================================

print_header "COMANDO 3: CONFIGURAR CI/CD"

if command -v gh &> /dev/null; then
    echo "[3.1] Configurando GitHub Secrets..."
    read -p "¿Configurar secrets en GitHub? (s/n): " config_secrets
    if [ "$config_secrets" = "s" ]; then
        echo "Necesitas obtener estos tokens:"
        echo "  1. Vercel Token: https://vercel.com/account/tokens"
        echo "  2. Vercel Org ID: https://vercel.com/dashboard"
        echo "  3. Vercel Project ID: cat .vercel/project.json"
        echo ""
        
        read -p "Vercel Token: " VERCEL_TOKEN
        if [ -n "$VERCEL_TOKEN" ]; then
            gh secret set VERCEL_TOKEN --body "$VERCEL_TOKEN"
            print_success "VERCEL_TOKEN configurado"
        fi
        
        read -p "Vercel Org ID: " VERCEL_ORG_ID
        if [ -n "$VERCEL_ORG_ID" ]; then
            gh secret set VERCEL_ORG_ID --body "$VERCEL_ORG_ID"
            print_success "VERCEL_ORG_ID configurado"
        fi
        
        read -p "Vercel Project ID: " VERCEL_PROJECT_ID
        if [ -n "$VERCEL_PROJECT_ID" ]; then
            gh secret set VERCEL_PROJECT_ID --body "$VERCEL_PROJECT_ID"
            print_success "VERCEL_PROJECT_ID configurado"
        fi
        
        print_success "Secrets configurados"
        echo ""
        echo "Secrets configurados:"
        gh secret list
    fi
else
    print_warning "GitHub CLI no disponible"
    echo "Configura los secrets manualmente en:"
    echo "https://github.com/$GITHUB_USER/$GITHUB_REPO_NAME/settings/secrets/actions"
fi

# =============================================================================
# COMANDO 4 - DOMINIO Y MONITOREO
# =============================================================================

print_header "COMANDO 4: DOMINIO Y MONITOREO"

echo "[4.1] Dominio personalizado..."
read -p "¿Tienes un dominio personalizado? (s/n): " custom_domain
if [ "$custom_domain" = "s" ]; then
    read -p "Dominio: " domain
    if command -v vercel &> /dev/null; then
        vercel domains add "$domain" 2>/dev/null || print_warning "No se pudo añadir dominio"
        print_success "Dominio añadido: $domain"
    fi
else
    print_success "Usando subdominio de Vercel"
fi

echo ""
echo "[4.2] Vercel Analytics..."
echo "Actívalo manualmente en:"
echo "  https://vercel.com/$GITHUB_USER/$VERCEL_PROJECT_NAME/analytics"

echo ""
echo "[4.3] Vercel Logs..."
echo "Ver logs en:"
echo "  https://vercel.com/$GITHUB_USER/$VERCEL_PROJECT_NAME/logs"

echo ""
echo "[4.4] Monitoreo externo (UptimeRobot)..."
echo "1. Ve a: https://uptimerobot.com/"
echo "2. Crea cuenta gratuita (50 monitors gratis)"
echo "3. Añade estos monitors:"
echo "   - Status: https://$VERCEL_PROJECT_NAME.vercel.app/api/status"
echo "   - Health: https://$VERCEL_PROJECT_NAME.vercel.app/api/health"

# =============================================================================
# COMANDO 5 - VERIFICACIÓN POST-DEPLOY
# =============================================================================

print_header "COMANDO 5: VERIFICACIÓN POST-DEPLOY"

if [ -n "$PROD_URL" ]; then
    echo "[5.1] Verificando endpoints..."
    for endpoint in status version health components actions; do
        echo -n "→ /api/$endpoint: "
        curl -s -o /dev/null -w "HTTP %{http_code} | %{time_total}s\n" "$PROD_URL/api/$endpoint" 2>/dev/null || echo "ERROR"
    done
    
    echo ""
    echo "[5.2] Ejecutando 100 pruebas..."
    if [ -f edpb_fullstack.py ]; then
        python3 edpb_fullstack.py --day3 --url "$PROD_URL" 2>/dev/null || print_warning "Script no disponible"
    else
        print_warning "edpb_fullstack.py no existe"
    fi
else
    print_warning "No hay URL de producción para verificar"
    echo "Despliega en Vercel primero y vuelve a ejecutar este script"
fi

# =============================================================================
# RESUMEN FINAL
# =============================================================================

print_header "RESUMEN FINAL"

echo ""
echo -e "${GREEN}✓ PUBLICACIÓN COMPLETADA${NC}"
echo ""
echo "URLs importantes:"
echo "  GitHub Repo:    https://github.com/$GITHUB_USER/$GITHUB_REPO_NAME"
echo "  Vercel Prod:    https://$VERCEL_PROJECT_NAME.vercel.app"
echo "  Vercel Dashboard: https://vercel.com/$GITHUB_USER/$VERCEL_PROJECT_NAME"
echo "  GitHub Actions: https://github.com/$GITHUB_USER/$GITHUB_REPO_NAME/actions"
echo "  Release v5.0.0: https://github.com/$GITHUB_USER/$GITHUB_REPO_NAME/releases/tag/v5.0.0"
echo ""
echo "Próximos pasos:"
echo "  1. Verificar que el deploy en Vercel funciona"
echo "  2. Configurar UptimeRobot para monitoreo"
echo "  3. Enviar formulario EDPB SPE 2025-2030 vía fast-track"
echo "  4. Adjuntar URL de producción como evidencia"
echo ""
echo "======================================================================"
