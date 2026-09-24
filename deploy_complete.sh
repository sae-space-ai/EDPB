#!/bin/bash

# =============================================================================
# EDPB-SUPER-ECOSYSTEM v4.0 - Script de Despliegue Completo
# Automatiza: Backend + Base de Datos + Frontend + Tests
# =============================================================================

set -e

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

print_header() {
    echo ""
    echo "======================================================================"
    echo -e "${PURPLE}$1${NC}"
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
# MENÚ PRINCIPAL
# =============================================================================

print_header "EDPB-SUPER-ECOSYSTEM v4.0 - DESPLIEGUE COMPLETO"

echo ""
echo "Selecciona una opción:"
echo ""
echo "1) Despliegue completo (Backend + DB + Frontend)"
echo "2) Solo Backend"
echo "3) Solo Base de Datos"
echo "4) Solo Frontend"
echo "5) Ejecutar Tests"
echo "6) Verificar Estado"
echo "7) Salir"
echo ""

read -p "Opción (1-7): " option

case $option in
    1)
        # =============================================================================
        # DESPLIEGUE COMPLETO
        # =============================================================================
        
        print_header "FASE 1: BACKEND (4-6 horas)"
        
        # Instalar dependencias del backend
        print_info "Instalando dependencias del backend..."
        cd api
        pip3 install -r requirements.txt
        cd ..
        print_success "Dependencias del backend instaladas"
        
        # Ejecutar tests del backend
        print_info "Ejecutando tests del backend..."
        python3 -m pytest tests/test_backend.py -v
        print_success "Tests del backend pasando"
        
        # Desplegar backend en Vercel
        print_info "Desplegando backend en Vercel..."
        if ! command -v vercel &> /dev/null; then
            print_warning "Vercel CLI no está instalado. Instalando..."
            npm install -g vercel
        fi
        
        read -p "¿Ya estás logueado en Vercel? (s/n): " logged_in
        if [ "$logged_in" != "s" ]; then
            vercel login
        fi
        
        vercel --prod
        print_success "Backend desplegado en Vercel"
        
        # =============================================================================
        
        print_header "FASE 2: BASE DE DATOS (1-2 horas)"
        
        # Configurar base de datos
        print_info "Configurando base de datos..."
        
        echo ""
        echo "Opciones de base de datos:"
        echo "1) Supabase (Recomendado - Gratis 500MB)"
        echo "2) Neon (Gratis 3GB)"
        echo "3) PostgreSQL local"
        echo ""
        
        read -p "Selecciona una opción (1-3): " db_option
        
        case $db_option in
            1)
                print_info "Configurando Supabase..."
                echo "Ve a https://supabase.com y crea un proyecto"
                read -p "¿Ya tienes la URL de conexión? (s/n): " has_url
                if [ "$has_url" = "s" ]; then
                    read -p "Introduce la URL de conexión: " db_url
                    if [[ "$OSTYPE" == "darwin"* ]]; then
                        sed -i '' "s|DATABASE_URL=.*|DATABASE_URL=$db_url|" .env
                    else
                        sed -i "s|DATABASE_URL=.*|DATABASE_URL=$db_url|" .env
                    fi
                    print_success "DATABASE_URL actualizada"
                fi
                ;;
            2)
                print_info "Configurando Neon..."
                echo "Ve a https://neon.tech y crea un proyecto"
                read -p "¿Ya tienes la URL de conexión? (s/n): " has_url
                if [ "$has_url" = "s" ]; then
                    read -p "Introduce la URL de conexión: " db_url
                    if [[ "$OSTYPE" == "darwin"* ]]; then
                        sed -i '' "s|DATABASE_URL=.*|DATABASE_URL=$db_url|" .env
                    else
                        sed -i "s|DATABASE_URL=.*|DATABASE_URL=$db_url|" .env
                    fi
                    print_success "DATABASE_URL actualizada"
                fi
                ;;
            3)
                print_info "Configurando PostgreSQL local..."
                read -p "Nombre de la base de datos (default: edpb_ecosystem): " db_name
                db_name=${db_name:-edpb_ecosystem}
                createdb $db_name 2>/dev/null || print_warning "La base de datos ya existe"
                db_url="postgresql://localhost:5432/$db_name"
                if [[ "$OSTYPE" == "darwin"* ]]; then
                    sed -i '' "s|DATABASE_URL=.*|DATABASE_URL=$db_url|" .env
                else
                    sed -i "s|DATABASE_URL=.*|DATABASE_URL=$db_url|" .env
                fi
                print_success "Base de datos creada"
                ;;
        esac
        
        # Inicializar esquema
        read -p "¿Quieres inicializar el esquema de la base de datos? (s/n): " init_db
        if [ "$init_db" = "s" ]; then
            source .env
            psql "$DATABASE_URL" -f database/schema.sql
            print_success "Esquema inicializado"
        fi
        
        # =============================================================================
        
        print_header "FASE 3: INTEGRACIÓN (2-3 horas)"
        
        # Configurar variables de entorno
        print_info "Configurando variables de entorno..."
        
        if [ ! -f .env ]; then
            cp .env.example .env
            print_warning "Archivo .env creado. Por favor edita .env y añade tus API keys"
        else
            print_info "Archivo .env ya existe"
        fi
        
        # Verificar API keys
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
        
        # =============================================================================
        
        print_header "FASE 4: TESTING (2-3 horas)"
        
        # Ejecutar tests
        print_info "Ejecutando tests..."
        ./run_tests.sh
        print_success "Tests completados"
        
        # =============================================================================
        
        print_header "FASE 5: FRONTEND"
        
        # Construir frontend
        print_info "Construyendo frontend..."
        npm run build
        print_success "Frontend construido"
        
        # Desplegar frontend
        print_info "Desplegando frontend en Vercel..."
        vercel --prod
        print_success "Frontend desplegado"
        
        # =============================================================================
        
        print_header "RESUMEN FINAL"
        
        echo ""
        echo -e "${GREEN}✓ DESPLIEGUE COMPLETADO EXITOSAMENTE${NC}"
        echo ""
        echo "URL del proyecto: https://tu-proyecto.vercel.app"
        echo ""
        echo "Próximos pasos:"
        echo "1. Abre la URL en tu navegador"
        echo "2. Navega a la pestaña '🔍 Status'"
        echo "3. Verifica que todo esté operativo"
        echo "4. Ejecuta las 100 pruebas reales"
        echo "5. Exporta los resultados"
        echo ""
        echo "Documentación:"
        echo "  - IMPLEMENTACION_COMPLETA.md"
        echo "  - GUIA_PRUEBAS_REALES.md"
        echo "  - DIAGNOSTICO_COMPLETO.md"
        echo ""
        echo "======================================================================"
        ;;
    
    2)
        # Solo Backend
        print_header "DESPLIEGUE SOLO BACKEND"
        cd api
        pip3 install -r requirements.txt
        python3 -m pytest ../tests/test_backend.py -v
        vercel --prod
        print_success "Backend desplegado"
        ;;
    
    3)
        # Solo Base de Datos
        print_header "CONFIGURACIÓN SOLO BASE DE DATOS"
        source .env
        psql "$DATABASE_URL" -f database/schema.sql
        print_success "Base de datos configurada"
        ;;
    
    4)
        # Solo Frontend
        print_header "DESPLIEGUE SOLO FRONTEND"
        npm install
        npm run build
        vercel --prod
        print_success "Frontend desplegado"
        ;;
    
    5)
        # Ejecutar Tests
        print_header "EJECUTANDO TESTS"
        ./run_tests.sh
        ;;
    
    6)
        # Verificar Estado
        print_header "VERIFICANDO ESTADO DEL SISTEMA"
        
        echo ""
        echo "Frontend:"
        if [ -d "dist" ]; then
            print_success "Frontend construido"
        else
            print_error "Frontend no construido"
        fi
        
        echo ""
        echo "Backend:"
        if [ -f "api/index.py" ]; then
            print_success "Backend implementado"
        else
            print_error "Backend no implementado"
        fi
        
        echo ""
        echo "Base de Datos:"
        if [ -f ".env" ]; then
            source .env
            if [ -n "$DATABASE_URL" ]; then
                print_success "DATABASE_URL configurada"
            else
                print_error "DATABASE_URL no configurada"
            fi
        else
            print_error ".env no existe"
        fi
        
        echo ""
        echo "API Keys:"
        source .env 2>/dev/null || true
        [ -n "$VITE_GEMINI_API_KEY" ] && print_success "Gemini API key" || print_warning "Gemini API key faltante"
        [ -n "$VITE_GROQ_API_KEY" ] && print_success "Groq API key" || print_warning "Groq API key faltante"
        
        echo ""
        echo "======================================================================"
        ;;
    
    7)
        print_info "Saliendo..."
        exit 0
        ;;
    
    *)
        print_error "Opción no válida"
        exit 1
        ;;
esac
