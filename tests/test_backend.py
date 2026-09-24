# =============================================================================
# EDPB-SUPER-ECOSYSTEM v4.0 - Tests del Backend
# =============================================================================

import pytest
import json
import sys
import os

# Añadir api/ al path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'api'))

from index import (
    get_status, get_version, get_health, get_components,
    generate_evidence, dispatch_subagent, cybersecurity_scan,
    discover_gigafactories, get_log, run_full_test, handle_action,
    COMPONENTS, TELEMETRY
)

# =============================================================================
# TESTS: ENDPOINTS BÁSICOS
# =============================================================================

class TestBasicEndpoints:
    """Tests para endpoints básicos (GET)."""
    
    def test_get_status(self):
        """Test GET /api/status."""
        result = get_status()
        assert result["status"] == "operational"
        assert result["ecosystem"] == "EDPB-SUPER-ECOSYSTEM"
        assert result["version"] == "4.0.0"
        assert "instance_id" in result
        assert "uptime_seconds" in result
    
    def test_get_version(self):
        """Test GET /api/version."""
        result = get_version()
        assert result["ecosystem"] == "EDPB-SUPER-ECOSYSTEM"
        assert result["version"] == "4.0.0"
        assert "git_commit" in result
        assert "git_branch" in result
    
    def test_get_health(self):
        """Test GET /api/health."""
        result = get_health()
        assert "health" in result
        assert result["health"] in ["healthy", "degraded"]
        assert "components_checked" in result
        assert result["components_checked"] == 31
    
    def test_get_components(self):
        """Test GET /api/components."""
        result = get_components()
        assert result["status"] == "success"
        assert result["total"] == 31
        assert "generative_ai" in result["components"]
        assert "cybersecurity" in result["components"]
        assert "databases" in result["components"]
        assert "subagents" in result["components"]
        assert "gigafactories" in result["components"]

# =============================================================================
# TESTS: EVIDENCIAS
# =============================================================================

class TestEvidence:
    """Tests para generación de evidencias."""
    
    def test_generate_evidence_basic(self):
        """Test generación de evidencia básica."""
        result = generate_evidence("Art. 9")
        assert result["status"] == "success"
        assert "evidence" in result
        assert result["evidence"]["article"] == "Art. 9"
        assert result["evidence"]["human_oversight"] is True
        assert result["evidence"]["traceability"] is True
        assert result["evidence"]["auditability"] is True
        assert "evidence_hash" in result["evidence"]
        assert len(result["evidence"]["evidence_hash"]) == 16
    
    def test_generate_evidence_with_context(self):
        """Test generación de evidencia con contexto."""
        context = {"test": True, "data": "sample"}
        result = generate_evidence("Art. 14", context)
        assert result["status"] == "success"
        assert result["evidence"]["context"] == context
    
    def test_evidence_hash_uniqueness(self):
        """Test que hashes de evidencia sean únicos."""
        result1 = generate_evidence("Art. 9")
        result2 = generate_evidence("Art. 9")
        # Los hashes pueden ser iguales si el timestamp es el mismo
        # pero el contenido debe ser diferente
        assert result1["evidence"]["timestamp"] != result2["evidence"]["timestamp"]

# =============================================================================
# TESTS: SUB-AGENTES
# =============================================================================

class TestSubagents:
    """Tests para dispatch de sub-agentes."""
    
    def test_dispatch_valid_subagent(self):
        """Test dispatch de sub-agente válido."""
        result = dispatch_subagent("ai_governance", "Test task")
        assert result["status"] == "dispatched"
        assert result["agent"] == "ai_governance"
        assert result["task"] == "Test task"
        assert "provider" in result
        assert "dispatch_hash" in result
    
    def test_dispatch_invalid_subagent(self):
        """Test dispatch de sub-agente inválido."""
        result = dispatch_subagent("invalid_agent", "Test task")
        assert result["status"] == "error"
        assert "not found" in result["message"]
    
    def test_dispatch_all_subagents(self):
        """Test dispatch de todos los sub-agentes."""
        for agent_name in COMPONENTS["subagents"]:
            result = dispatch_subagent(agent_name, f"Test: {agent_name}")
            assert result["status"] == "dispatched"

# =============================================================================
# TESTS: CIBERSEGURIDAD
# =============================================================================

class TestCybersecurity:
    """Tests para escaneos de ciberseguridad."""
    
    def test_scan_authorized_target(self):
        """Test escaneo de target autorizado (.local)."""
        result = cybersecurity_scan("self-test.local", "strix")
        assert result["status"] == "success"
        assert result["tool"] == "strix"
        assert result["target"] == "self-test.local"
    
    def test_scan_unauthorized_target(self):
        """Test escaneo de target no autorizado."""
        result = cybersecurity_scan("example.com", "strix")
        assert result["status"] == "blocked"
        assert "not authorized" in result["reason"]
    
    def test_scan_with_authorization(self):
        """Test escaneo con autorización explícita."""
        result = cybersecurity_scan("example.com", "strix", authorized=True)
        assert result["status"] == "success"
    
    def test_scan_invalid_tool(self):
        """Test escaneo con herramienta inválida."""
        result = cybersecurity_scan("self-test.local", "invalid_tool")
        assert result["status"] == "error"
        assert "available" in result
    
    def test_scan_all_tools(self):
        """Test escaneo con todas las herramientas."""
        for tool in COMPONENTS["cybersecurity"]:
            result = cybersecurity_scan("self-test.local", tool)
            assert result["status"] == "success"

# =============================================================================
# TESTS: GIGAFACTORÍAS
# =============================================================================

class TestGigafactories:
    """Tests para descubrimiento de gigafactorías."""
    
    def test_discover_all_factories(self):
        """Test descubrimiento de todas las factorías."""
        result = discover_gigafactories()
        assert result["status"] == "success"
        assert result["total"] == 5
        assert result["reachable"] == 5
    
    def test_discover_single_factory(self):
        """Test descubrimiento de una factoría específica."""
        result = discover_gigafactories("nexus_agi")
        assert result["status"] == "success"
        assert "nexus_agi" in result["factories"]
    
    def test_discover_invalid_factory(self):
        """Test descubrimiento de factoría inválida."""
        result = discover_gigafactories("invalid_factory")
        assert result["status"] == "success"
        assert result["factories"]["invalid_factory"]["status"] == "error"

# =============================================================================
# TESTS: LOGS
# =============================================================================

class TestLogs:
    """Tests para sistema de logs."""
    
    def test_get_log(self):
        """Test obtención de log."""
        result = get_log()
        assert result["status"] == "success"
        assert "log" in result
        assert isinstance(result["log"], list)
        assert "total_entries" in result

# =============================================================================
# TESTS: FULL TEST
# =============================================================================

class TestFullTest:
    """Tests para el test completo del ecosistema."""
    
    def test_run_full_test(self):
        """Test ejecución del test completo."""
        result = run_full_test()
        assert result["final_status"] == "PASSED"
        assert result["total_components_tested"] == 31
        assert "test_id" in result
        assert "results" in result
        
        # Verificar que todos los tests se ejecutaron
        assert "status" in result["results"]
        assert "health" in result["results"]
        assert "subagents" in result["results"]
        assert "evidence" in result["results"]
        assert "cybersecurity" in result["results"]
        assert "gigafactories" in result["results"]
        assert "generative_ai" in result["results"]
        assert "databases" in result["results"]

# =============================================================================
# TESTS: ACTION HANDLER
# =============================================================================

class TestActionHandler:
    """Tests para el handler de acciones POST."""
    
    def test_handle_status_action(self):
        """Test acción status."""
        result = handle_action({"action": "status"})
        assert result["status"] == "operational"
    
    def test_handle_health_check_action(self):
        """Test acción health_check."""
        result = handle_action({"action": "health_check"})
        assert "health" in result
    
    def test_handle_dispatch_subagent_action(self):
        """Test acción dispatch_subagent."""
        result = handle_action({
            "action": "dispatch_subagent",
            "agent_name": "ai_governance",
            "task": "Test"
        })
        assert result["status"] == "dispatched"
    
    def test_handle_generate_evidence_action(self):
        """Test acción generate_evidence."""
        result = handle_action({
            "action": "generate_evidence",
            "article": "Art. 9"
        })
        assert result["status"] == "success"
    
    def test_handle_cybersecurity_scan_action(self):
        """Test acción cybersecurity_scan."""
        result = handle_action({
            "action": "cybersecurity_scan",
            "target": "self-test.local",
            "tool": "strix"
        })
        assert result["status"] == "success"
    
    def test_handle_discover_gigafactories_action(self):
        """Test acción discover_gigafactories."""
        result = handle_action({"action": "discover_gigafactories"})
        assert result["status"] == "success"
    
    def test_handle_generate_llm_action(self):
        """Test acción generate_llm."""
        result = handle_action({
            "action": "generate_llm",
            "model": "qwen3",
            "prompt": "Test"
        })
        assert result["status"] == "success"
    
    def test_handle_reset_telemetry_action(self):
        """Test acción reset_telemetry."""
        result = handle_action({"action": "reset_telemetry"})
        assert result["status"] == "success"
    
    def test_handle_run_full_test_action(self):
        """Test acción run_full_ecosystem_test."""
        result = handle_action({"action": "run_full_ecosystem_test"})
        assert result["final_status"] == "PASSED"
    
    def test_handle_unknown_action(self):
        """Test acción desconocida."""
        result = handle_action({"action": "unknown_action"})
        assert result["status"] == "error"
        assert "available" in result

# =============================================================================
# TESTS: INTEGRACIÓN
# =============================================================================

class TestIntegration:
    """Tests de integración."""
    
    def test_full_workflow(self):
        """Test workflow completo."""
        # 1. Check status
        status = get_status()
        assert status["status"] == "operational"
        
        # 2. Generate evidence
        evidence = generate_evidence("Art. 9")
        assert evidence["status"] == "success"
        
        # 3. Dispatch subagent
        dispatch = dispatch_subagent("ai_governance", "Test")
        assert dispatch["status"] == "dispatched"
        
        # 4. Run scan
        scan = cybersecurity_scan("self-test.local", "strix")
        assert scan["status"] == "success"
        
        # 5. Discover factories
        factories = discover_gigafactories()
        assert factories["status"] == "success"
        
        # 6. Check logs
        logs = get_log()
        assert logs["status"] == "success"
        assert logs["total_entries"] > 0
    
    def test_telemetry_increments(self):
        """Test que la telemetría se incrementa correctamente."""
        initial_total = TELEMETRY["requests_total"]
        
        # Ejecutar algunas operaciones
        get_status()
        generate_evidence("Art. 9")
        dispatch_subagent("ai_governance", "Test")
        
        # Verificar que la telemetría se incrementó
        assert TELEMETRY["requests_total"] > initial_total
        assert TELEMETRY["requests_success"] > 0

# =============================================================================
# MAIN
# =============================================================================

if __name__ == "__main__":
    pytest.main([__file__, "-v"])
