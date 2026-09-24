#!/bin/bash

# =============================================================================
# EDPB-SUPER-ECOSYSTEM v4.0 - Script de Setup
# Automatiza la configuración inicial del proyecto
# =============================================================================

set -e

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funciones de utilidad
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

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# =============================================================================
# PASO 1: Verificar dependencias
# =============================================================================

print_header "PASO 1: Verificando dependencias..."

# Verificar Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js no está instalado"
    echo "Por favor instala Node.js desde https://nodejs.org/"
    exit 1
fi
print_success "Node.js $(node --version)"

# Verificar npm
if ! command -v npm &> /dev/null; then
    print_error "npm no está instalado"
    exit 1
fi
print_success "npm $(npm --version)"

# Verificar Python
if ! command -v python3 &> /dev/null; then
    print_error "Python 3 no está instalado"
    echo "Por favor instala Python 3 desde https://www.python.org/"
    exit 1
fi
print_success "Python $(python3 --version)"

# Verificar pip
if ! command -v pip3 &> /dev/null; then
    print_error "pip3 no está instalado"
    exit 1
fi
print_success "pip3 $(pip3 --version)"

# Verificar Git
if ! command -v git &> /dev/null; then
    print_error "Git no está instalado"
    exit 1
fi
print_success "git $(git --version)"

# Verificar Vercel CLI (opcional)
if command -v vercel &> /dev/null; then
    print_success "Vercel CLI $(vercel --version)"
else
    print_warning "Vercel CLI no está instalado (opcional para deploy)"
fi

# =============================================================================
# PASO 2: Instalar dependencias del frontend
# =============================================================================

print_header "PASO 2: Instalando dependencias del frontend..."

npm install
print_success "Dependencias del frontend instaladas"

# =============================================================================
# PASO 3: Instalar dependencias del backend
# =============================================================================

print_header "PASO 3: Instalando dependencias del backend..."

cd api
pip3 install -r requirements.txt
print_success "Dependencias del backend instaladas"
cd ..

# =============================================================================
# PASO 4: Configurar variables de entorno
# =============================================================================

print_header "PASO 4: Configurando variables de entorno..."

if [ ! -f .env ]; then
    cp .env.example .env
    print_success "Archivo .env creado desde .env.example"
    print_warning "Por favor edita .env y añade tus API keys"
else
    print_info "Archivo .env ya existe"
fi

# =============================================================================
# PASO 5: Configurar base de datos
# =============================================================================

print_header "PASO 5: Configurando base de datos..."

echo ""
echo "Opciones de base de datos:"
echo "1) Supabase (Recomendado - Gratis 500MB)"
echo "2) Neon (Gratis 3GB)"
echo "3) PostgreSQL local"
echo "4) Saltar configuración de base de datos"
echo ""

read -p "Selecciona una opción (1-4): " db_option

case $db_option in
    1)
        print_info "Configurando Supabase..."
        echo ""
        echo "Pasos:"
        echo "1. Ve a https://supabase.com y crea una cuenta"
        echo "2. Crea un nuevo proyecto"
        echo "3. Copia la URL de conexión"
        echo "4. Actualiza DATABASE_URL en .env"
        echo ""
        read -p "¿Ya tienes la URL de conexión? (s/n): " has_url
        if [ "$has_url" = "s" ]; then
            read -p "Introduce la URL de conexión: " db_url
            # Actualizar .env con la URL
            if [[ "$OSTYPE" == "darwin"* ]]; then
                sed -i '' "s|DATABASE_URL=.*|DATABASE_URL=$db_url|" .env
            else
                sed -i "s|DATABASE_URL=.*|DATABASE_URL=$db_url|" .env
            fi
            print_success "DATABASE_URL actualizada en .env"
        fi
        ;;
    2)
        print_info "Configurando Neon..."
        echo ""
        echo "Pasos:"
        echo "1. Ve a https://neon.tech y crea una cuenta"
        echo "2. Crea un nuevo proyecto"
        echo "3. Copia la URL de conexión"
        echo "4. Actualiza DATABASE_URL en .env"
        echo ""
        read -p "¿Ya tienes la URL de conexión? (s/n): " has_url
        if [ "$has_url" = "s" ]; then
            read -p "Introduce la URL de conexión: " db_url
            if [[ "$OSTYPE" == "darwin"* ]]; then
                sed -i '' "s|DATABASE_URL=.*|DATABASE_URL=$db_url|" .env
            else
                sed -i "s|DATABASE_URL=.*|DATABASE_URL=$db_url|" .env
            fi
            print_success "DATABASE_URL actualizada en .env"
        fi
        ;;
    3)
        print_info "Configurando PostgreSQL local..."
        if ! command -v psql &> /dev/null; then
            print_error "PostgreSQL no está instalado"
            echo "Por favor instala PostgreSQL desde https://www.postgresql.org/"
        else
            print_success "PostgreSQL está instalado"
            read -p "¿Quieres crear la base de datos ahora? (s/n): " create_db
            if [ "$create_db" = "s" ]; then
                read -p "Nombre de la base de datos (default: edpb_ecosystem): " db_name
                db_name=${db_name:-edpb_ecosystem}
                read -p "Usuario de PostgreSQL (default: postgres): " db_user
                db_user=${db_user:-postgres}
                
                createdb -U $db_user $db_name 2>/dev/null || print_warning "La base de datos ya existe o no se pudo crear"
                print_success "Base de datos '$db_name' creada"
                
                # Actualizar DATABASE_URL
                db_url="postgresql://$db_user@localhost:5432/$db_name"
                if [[ "$OSTYPE" == "darwin"* ]]; then
                    sed -i '' "s|DATABASE_URL=.*|DATABASE_URL=$db_url|" .env
                else
                    sed -i "s|DATABASE_URL=.*|DATABASE_URL=$db_url|" .env
                fi
                print_success "DATABASE_URL actualizada en .env"
            fi
        fi
        ;;
    4)
        print_warning "Configuración de base de datos omitida"
        ;;
    *)
        print_error "Opción no válida"
        ;;
esac

# =============================================================================
# PASO 6: Inicializar esquema de base de datos
# =============================================================================

if [ "$db_option" != "4" ]; then
    print_header "PASO 6: Inicializando esquema de base de datos..."
    
    read -p "¿Quieres ejecutar el script SQL ahora? (s/n): " run_sql
    if [ "$run_sql" = "s" ]; then
        source .env
        if [ -n "$DATABASE_URL" ]; then
            psql "$DATABASE_URL" -f database/schema.sql
            print_success "Esquema de base de datos inicializado"
        else
            print_error "DATABASE_URL no está configurada en .env"
        fi
    else
        print_warning "Inicialización de base de datos omitida"
        print_info "Puedes ejecutarla manualmente con: psql \$DATABASE_URL -f database/schema.sql"
    fi
fi

# =============================================================================
# PASO 7: Configurar Git
# =============================================================================

print_header "PASO 7: Configurando Git..."

if [ ! -d .git ]; then
    git init
    git branch -M main
    print_success "Git inicializado"
else
    print_info "Git ya está inicializado"
fi

# Verificar remote
if git remote get-url origin &> /dev/null; then
    print_info "Remote ya configurado: $(git remote get-url origin)"
else
    read -p "¿Quieres configurar el remote de GitHub ahora? (s/n): " setup_remote
    if [ "$setup_remote" = "s" ]; then
        read -p "URL del repositorio GitHub: " github_url
        git remote add origin "$github_url"
        print_success "Remote configurado: $github_url"
    fi
fi

# =============================================================================
# PASO 8: Verificar API keys
# =============================================================================

print_header "PASO 8: Verificando API keys..."

source .env

check_api_key() {
    local key_name=$1
    local key_value=$2
    
    if [ -n "$key_value" ] && [ "$key_value" != "your_${key_name}_here" ]; then
        print_success "$key_name configurada"
    else
        print_warning "$key_name no configurada"
    fi
}

check_api_key "GEMINI_API_KEY" "$VITE_GEMINI_API_KEY"
check_api_key "GROQ_API_KEY" "$VITE_GROQ_API_KEY"
check_api_key "HUGGINGFACE_TOKEN" "$VITE_HUGGINGFACE_TOKEN"
check_api_key "NVIDIA_API_KEY" "$VITE_NVIDIA_API_KEY"
check_api_key "DEEPSEEK_API_KEY" "$VITE_DEEPSEEK_API_KEY"
check_api_key "MISTRAL_API_KEY" "$VITE_MISTRAL_API_KEY"
check_api_key "CEREBRAS_API_KEY" "$VITE_CEREBRAS_API_KEY"

# =============================================================================
# PASO 9: Construir el proyecto
# =============================================================================

print_header "PASO 9: Construyendo el proyecto..."

npm run build
print_success "Proyecto construido exitosamente"

# =============================================================================
# PASO 10: Resumen final
# =============================================================================

print_header "RESUMEN FINAL"

echo ""
echo -e "${GREEN}✓ Setup completado exitosamente${NC}"
echo ""
echo "Próximos pasos:"
echo ""
echo "1. Editar .env y añadir API keys faltantes"
echo "   nano .env"
echo ""
echo "2. Ejecutar en modo desarrollo"
echo "   npm run dev"
echo ""
echo "3. Ejecutar tests"
echo "   npm test"
echo ""
echo "4. Desplegar en Vercel"
echo "   vercel --prod"
echo ""
echo "5. Ejecutar 100 pruebas reales"
echo "   Abre la aplicación y ve a la pestaña '🧪 Test 100'"
echo ""
echo "Documentación disponible:"
echo "  - README.md"
echo "  - DEPLOY_GUIDE.md"
echo "  - GUIA_PRUEBAS_REALES.md"
echo "  - DIAGNOSTICO_COMPLETO.md"
echo "  - RESUMEN_EJECUTIVO.md"
echo ""
echo "======================================================================"
echo -e "${BLUE}EDPB-SUPER-ECOSYSTEM v4.0 - Setup completado${NC}"
echo "======================================================================"
echo ""
