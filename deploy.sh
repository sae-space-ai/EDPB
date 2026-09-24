#!/bin/bash

# =============================================================================
# EDPB-SUPER-ECOSYSTEM v4.0 — AUTO DEPLOY SCRIPT
# Autor: Manuel Gago Fernández (pergolessi9@gmail.com)
# =============================================================================

set -e

echo "======================================================================"
echo "EDPB-SUPER-ECOSYSTEM v4.0 — AUTO DEPLOY"
echo "======================================================================"
echo "Fecha: $(date -u +"%Y-%m-%dT%H:%M:%S+00:00")"
echo "Candidato: Manuel Gago Fernández"
echo "======================================================================"

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir pasos
print_step() {
    echo ""
    echo "======================================================================"
    echo -e "${GREEN}[PASO $1]${NC} $2"
    echo "======================================================================"
}

# Función para imprimir errores
print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Función para imprimir éxito
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Función para imprimir warning
print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# =============================================================================
# PASO 1: Verificar dependencias
# =============================================================================
print_step 1 "Verificando dependencias..."

if ! command -v node &> /dev/null; then
    print_error "Node.js no está instalado"
    echo "Por favor instala Node.js desde https://nodejs.org/"
    exit 1
fi
print_success "Node.js $(node --version)"

if ! command -v npm &> /dev/null; then
    print_error "npm no está instalado"
    exit 1
fi
print_success "npm $(npm --version)"

if ! command -v git &> /dev/null; then
    print_error "Git no está instalado"
    exit 1
fi
print_success "git $(git --version)"

# =============================================================================
# PASO 2: Instalar dependencias
# =============================================================================
print_step 2 "Instalando dependencias..."

npm install
print_success "Dependencias instaladas"

# =============================================================================
# PASO 3: Construir el proyecto
# =============================================================================
print_step 3 "Construyendo el proyecto..."

npm run build
print_success "Proyecto construido exitosamente"

# =============================================================================
# PASO 4: Verificar Git
# =============================================================================
print_step 4 "Verificando Git..."

if [ ! -d ".git" ]; then
    print_warning "Git no está inicializado. Inicializando..."
    git init
    git branch -M main
    print_success "Git inicializado"
else
    print_success "Git ya está inicializado"
fi

# =============================================================================
# PASO 5: Verificar Vercel CLI
# =============================================================================
print_step 5 "Verificando Vercel CLI..."

if ! command -v vercel &> /dev/null; then
    print_warning "Vercel CLI no está instalado. Instalando..."
    npm install -g vercel
    print_success "Vercel CLI instalado"
else
    print_success "Vercel CLI $(vercel --version)"
fi

# =============================================================================
# PASO 6: Preguntar por configuración
# =============================================================================
print_step 6 "Configuración de despliegue"

read -p "¿Quieres hacer push a GitHub? (s/n): " PUSH_GITHUB
read -p "¿Quieres desplegar en Vercel? (s/n): " DEPLOY_VERCEL

if [ "$PUSH_GITHUB" = "s" ] || [ "$PUSH_GITHUB" = "S" ]; then
    read -p "URL del repositorio GitHub (ej: https://github.com/usuario/repo.git): " GITHUB_URL
    
    print_step 7 "Configurando Git remote..."
    
    if git remote get-url origin &> /dev/null; then
        git remote set-url origin "$GITHUB_URL"
        print_success "Remote actualizado: $GITHUB_URL"
    else
        git remote add origin "$GITHUB_URL"
        print_success "Remote añadido: $GITHUB_URL"
    fi
    
    print_step 8 "Haciendo push a GitHub..."
    
    git add .
    git commit -m "EDPB-SUPER-ECOSYSTEM v4.0 - Auto deploy" || print_warning "Nothing to commit"
    git push -u origin main
    
    print_success "Push a GitHub completado"
fi

if [ "$DEPLOY_VERCEL" = "s" ] || [ "$DEPLOY_VERCEL" = "S" ]; then
    print_step 9 "Desplegando en Vercel..."
    
    vercel --prod --yes
    
    print_success "Deploy a Vercel completado"
fi

# =============================================================================
# RESUMEN FINAL
# =============================================================================
echo ""
echo "======================================================================"
echo -e "${GREEN}[RESUMEN FINAL]${NC}"
echo "======================================================================"
echo "  ✓ Dependencias verificadas"
echo "  ✓ Proyecto construido"
echo "  ✓ Git configurado"

if [ "$PUSH_GITHUB" = "s" ] || [ "$PUSH_GITHUB" = "S" ]; then
    echo "  ✓ Push a GitHub completado"
else
    echo "  - Push a GitHub: omitido"
fi

if [ "$DEPLOY_VERCEL" = "s" ] || [ "$DEPLOY_VERCEL" = "S" ]; then
    echo "  ✓ Deploy a Vercel completado"
else
    echo "  - Deploy a Vercel: omitido"
fi

echo ""
echo "======================================================================"
echo -e "${GREEN}¡DESPLIEGUE COMPLETADO!${NC}"
echo "======================================================================"
echo ""
echo "Próximos pasos:"
echo "  1. Abre la URL de Vercel (si desplegaste)"
echo "  2. Navega a la pestaña 'Ecosystem v4.0'"
echo "  3. Click en 'Start Engine' para activar el motor"
echo "  4. Click en 'Run Full Test' para verificar los 31 componentes"
echo "  5. Observa la telemetría en tiempo real"
echo ""
echo "======================================================================"
