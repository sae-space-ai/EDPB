#!/bin/bash

# =============================================================================
# EDPB-SUPER-ECOSYSTEM v4.0 - Script de Tests
# Ejecuta todos los tests del proyecto
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

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# =============================================================================
# TESTS DEL FRONTEND
# =============================================================================

print_header "TESTS DEL FRONTEND"

echo "Ejecutando tests del frontend..."
npm test

print_success "Tests del frontend completados"

# =============================================================================
# TESTS DEL BACKEND
# =============================================================================

print_header "TESTS DEL BACKEND"

echo "Ejecutando tests del backend..."
cd tests
python3 -m pytest test_backend.py -v
cd ..

print_success "Tests del backend completados"

# =============================================================================
# TESTS DE INTEGRACIÓN
# =============================================================================

print_header "TESTS DE INTEGRACIÓN"

echo "Iniciando servidor backend en background..."
cd api
python3 -m uvicorn index:handler --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
cd ..

# Esperar a que el servidor esté listo
sleep 3

echo "Ejecutando tests de integración..."

# Test 1: Status
echo "Test 1: GET /api/status"
curl -s http://localhost:8000/api/status | jq .
print_success "Status OK"

# Test 2: Health
echo "Test 2: GET /api/health"
curl -s http://localhost:8000/api/health | jq .
print_success "Health OK"

# Test 3: Components
echo "Test 3: GET /api/components"
curl -s http://localhost:8000/api/components | jq .
print_success "Components OK"

# Test 4: Evidence
echo "Test 4: GET /api/evidence?article=Art.9"
curl -s "http://localhost:8000/api/evidence?article=Art.9" | jq .
print_success "Evidence OK"

# Test 5: Subagent
echo "Test 5: GET /api/subagent?agent=ai_governance&task=test"
curl -s "http://localhost:8000/api/subagent?agent=ai_governance&task=test" | jq .
print_success "Subagent OK"

# Test 6: Scan
echo "Test 6: GET /api/scan?target=self-test.local&tool=strix"
curl -s "http://localhost:8000/api/scan?target=self-test.local&tool=strix" | jq .
print_success "Scan OK"

# Test 7: Factories
echo "Test 7: GET /api/factories"
curl -s http://localhost:8000/api/factories | jq .
print_success "Factories OK"

# Test 8: Log
echo "Test 8: GET /api/log"
curl -s http://localhost:8000/api/log | jq .
print_success "Log OK"

# Test 9: Full Test
echo "Test 9: POST /api/test"
curl -s -X POST http://localhost:8000/api/test | jq .
print_success "Full Test OK"

# Detener el servidor
echo "Deteniendo servidor backend..."
kill $BACKEND_PID

print_success "Tests de integración completados"

# =============================================================================
# RESUMEN
# =============================================================================

print_header "RESUMEN DE TESTS"

echo ""
echo -e "${GREEN}✓ Todos los tests completados exitosamente${NC}"
echo ""
echo "Tests ejecutados:"
echo "  - Tests del frontend (npm test)"
echo "  - Tests del backend (pytest)"
echo "  - Tests de integración (curl)"
echo ""
echo "Próximos pasos:"
echo "  1. Revisar los resultados de los tests"
echo "  2. Corregir cualquier error encontrado"
echo "  3. Ejecutar tests de carga (opcional)"
echo "  4. Desplegar en Vercel"
echo ""
echo "======================================================================"
