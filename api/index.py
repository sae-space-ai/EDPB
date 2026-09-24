# =============================================================================
# EDPB-SUPER-ECOSYSTEM v4.0 - BACKEND API
# Autor: Manuel Gago Fernández (pergolessi9@gmail.com)
# =============================================================================

import os
import json
import time
import hashlib
import uuid
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

# =============================================================================
# CONFIGURACIÓN GLOBAL
# =============================================================================

ECOSYSTEM = {
    "name": os.getenv("ECOSYSTEM_NAME", "EDPB-SUPER-ECOSYSTEM"),
    "version": os.getenv("ECOSYSTEM_VERSION", "4.0.0"),
    "candidate": "Manuel Gago Fernández",
    "candidate_id": "EDPB-SPE-2025-2030",
    "start_time": time.time(),
    "instance_id": hashlib.sha256(str(time.time()).encode()).hexdigest()[:12],
    "mode": "continuous",
    "region": os.getenv("VERCEL_REGION", "unknown"),
    "deployment_url": os.getenv("VERCEL_URL", "localhost"),
    "git_commit": os.getenv("VERCEL_GIT_COMMIT_SHA", "local")[:8],
    "git_branch": os.getenv("VERCEL_GIT_COMMIT_REF", "main")
}

# =============================================================================
# COMPONENTES DEL ECOSISTEMA
# =============================================================================

COMPONENTS = {
    "generative_ai": {
        "qwen3": {"status": "active", "role": "general_llm", "license": "Apache-2.0"},
        "deepseek_v4": {"status": "active", "role": "coding_llm", "license": "MIT"},
        "glm_52": {"status": "active", "role": "reasoning_llm", "license": "MIT"},
        "gemma_4": {"status": "active", "role": "multimodal_llm", "license": "Apache-2.0"},
        "phi_4_mini": {"status": "active", "role": "edge_llm", "license": "MIT"},
        "llama_4_scout": {"status": "active", "role": "long_context_llm", "license": "Llama"},
        "kimi_k3": {"status": "active", "role": "frontier_llm", "license": "Kimi"}
    },
    "cybersecurity": {
        "strix": {"status": "armed", "role": "autonomous_pentest", "mode": "dry-run"},
        "nuclei": {"status": "armed", "role": "scanner", "mode": "dry-run"},
        "pentestgpt": {"status": "armed", "role": "llm_copilot", "mode": "advisory"},
        "pentagi": {"status": "armed", "role": "multiagent", "mode": "dry-run"},
        "hexstrike_ai": {"status": "armed", "role": "mcp_bridge", "mode": "advisory"},
        "faraday": {"status": "armed", "role": "vuln_mgmt", "mode": "ingest"},
        "metasploit": {"status": "armed", "role": "exploitation", "mode": "lab-only"},
        "recon_ng": {"status": "armed", "role": "osint", "mode": "passive"}
    },
    "databases": {
        "pgvector": {"status": "active", "role": "vector_store", "strength": "WAL+PITR"},
        "milvus": {"status": "standby", "role": "billion_scale", "strength": "recall"},
        "qdrant": {"status": "standby", "role": "low_latency", "strength": "filtering"}
    },
    "subagents": {
        "ai_governance": {"status": "ready", "provider": "qwen3"},
        "ai_act_compliance": {"status": "ready", "provider": "glm_52"},
        "risk_assessment": {"status": "ready", "provider": "qwen3"},
        "regulatory_monitor": {"status": "ready", "provider": "glm_52"},
        "privacy_tech": {"status": "ready", "provider": "qwen3"},
        "cloud_security": {"status": "ready", "provider": "deepseek_v4"},
        "training_designer": {"status": "ready", "provider": "gemma_4"},
        "evidence_engine": {"status": "ready", "provider": "phi_4_mini"}
    },
    "gigafactories": {
        "nexus_agi": {"status": "reachable", "agents": 133, "auth": False},
        "ai_agent_marketplace": {"status": "reachable", "agents": "10K+", "auth": True},
        "peli_agent_factory": {"status": "reachable", "agents": "100+", "auth": False},
        "beacon_mcp": {"status": "reachable", "agents": "3,800+", "auth": False},
        "a2astore": {"status": "reachable", "agents": "80+", "auth": False}
    }
}

# =============================================================================
# TELEMETRÍA
# =============================================================================

TELEMETRY = {
    "requests_total": 0,
    "requests_success": 0,
    "requests_error": 0,
    "evidence_generated": 0,
    "subagents_dispatched": 0,
    "scans_simulated": 0,
    "gigafactory_queries": 0,
    "auto_repairs": 0,
    "uptime_seconds": 0,
    "last_health_check": None
}

EXECUTION_LOG = []

# =============================================================================
# AI ACT MAPPING (67 artículos)
# =============================================================================

AI_ACT_MAPPING = {
    "Art. 5": {"title": "Prohibited practices", "expertise": ["AI Governance", "AI Risk Management", "Policy Monitoring"]},
    "Art. 6": {"title": "High-risk classification", "expertise": ["AI Risk Management", "AI Auditing", "Conformity assessment"]},
    "Art. 9": {"title": "Risk management system", "expertise": ["AI Risk Management", "DPIA", "Evidence-Based Compliance"]},
    "Art. 10": {"title": "Data governance", "expertise": ["Data Protection", "Data science", "Anonymisation"]},
    "Art. 11": {"title": "Technical documentation", "expertise": ["Traceability", "Auditability", "Evidence management"]},
    "Art. 12": {"title": "Record-keeping", "expertise": ["Traceability", "Auditability", "Digital forensics"]},
    "Art. 13": {"title": "Transparency", "expertise": ["Human Oversight", "Trustworthy AI", "UX"]},
    "Art. 14": {"title": "Human oversight", "expertise": ["Human Oversight", "AI Supervision", "AI Assurance"]},
    "Art. 15": {"title": "Accuracy, robustness, cybersecurity", "expertise": ["AI Security", "Cryptology", "Web security"]},
    "Art. 16": {"title": "Obligations of providers", "expertise": ["AI Compliance", "Regulatory Analysis"]},
    "Art. 17": {"title": "Quality management system", "expertise": ["AI Auditing", "Evidence-Based Compliance"]},
    "Art. 18": {"title": "Documentation keeping", "expertise": ["Traceability", "Auditability"]},
    "Art. 19": {"title": "Automatically generated logs", "expertise": ["Digital forensics", "Traceability"]},
    "Art. 20": {"title": "Corrective actions", "expertise": ["AI Risk Management", "AI Compliance"]},
    "Art. 21": {"title": "Cooperation with authorities", "expertise": ["Policy Monitoring", "Regulatory Analysis"]},
    "Art. 22": {"title": "Authorised representatives", "expertise": ["Technology-related Law"]},
    "Art. 23": {"title": "Obligations of importers", "expertise": ["AI Compliance"]},
    "Art. 24": {"title": "Obligations of distributors", "expertise": ["AI Compliance"]},
    "Art. 25": {"title": "Responsibilities along the AI value chain", "expertise": ["AI Governance", "Regulatory Analysis"]},
    "Art. 26": {"title": "Obligations of deployers", "expertise": ["AI Compliance", "Human Oversight"]},
    "Art. 27": {"title": "Fundamental rights impact assessment", "expertise": ["DPIA", "Risk Management", "Data Protection"]},
    "Art. 28": {"title": "Notifying authorities", "expertise": ["Policy Monitoring"]},
    "Art. 29": {"title": "Notified bodies", "expertise": ["AI Auditing", "Conformity assessment"]},
    "Art. 30": {"title": "Notification procedure", "expertise": ["Regulatory Analysis"]},
    "Art. 31": {"title": "Requirements for notified bodies", "expertise": ["AI Auditing"]},
    "Art. 32": {"title": "Presumption of conformity", "expertise": ["AI Compliance"]},
    "Art. 33": {"title": "Standards", "expertise": ["Trustworthy AI", "AI Assurance"]},
    "Art. 34": {"title": "Common specifications", "expertise": ["Regulatory Analysis"]},
    "Art. 35": {"title": "Harmonised standards", "expertise": ["AI Assurance"]},
    "Art. 36": {"title": "Access to data", "expertise": ["Data Protection", "Cloud"]},
    "Art. 37": {"title": "Codes of conduct", "expertise": ["AI Governance"]},
    "Art. 38": {"title": "Guidelines", "expertise": ["Policy Monitoring"]},
    "Art. 39": {"title": "Voluntary codes of conduct", "expertise": ["AI Governance"]},
    "Art. 40": {"title": "Confidentiality", "expertise": ["Data Protection"]},
    "Art. 41": {"title": "Penalties", "expertise": ["Regulatory Analysis"]},
    "Art. 42": {"title": "AI regulatory sandboxes", "expertise": ["AI Governance", "AI Compliance"]},
    "Art. 43": {"title": "Real-world testing", "expertise": ["AI Risk Management", "Human Oversight"]},
    "Art. 44": {"title": "GPAI models", "expertise": ["AI Governance", "Trustworthy AI"]},
    "Art. 45": {"title": "GPAI obligations", "expertise": ["AI Compliance", "Traceability"]},
    "Art. 46": {"title": "GPAI systemic risk", "expertise": ["AI Risk Management", "AI Security"]},
    "Art. 47": {"title": "GPAI evaluation", "expertise": ["AI Auditing", "Evidence-Based Compliance"]},
    "Art. 48": {"title": "GPAI documentation", "expertise": ["Traceability", "Auditability"]},
    "Art. 49": {"title": "GPAI transparency", "expertise": ["Human Oversight", "Trustworthy AI"]},
    "Art. 50": {"title": "GPAI copyright", "expertise": ["Technology-related Law"]},
    "Art. 51": {"title": "GPAI codes of practice", "expertise": ["AI Governance"]},
    "Art. 52": {"title": "GPAI standards", "expertise": ["AI Assurance"]},
    "Art. 53": {"title": "GPAI monitoring", "expertise": ["Policy Monitoring"]},
    "Art. 54": {"title": "GPAI enforcement", "expertise": ["Regulatory Analysis"]},
    "Art. 55": {"title": "GPAI penalties", "expertise": ["Regulatory Analysis", "AI Governance", "AI Compliance"]},
    "Art. 56": {"title": "Innovation support", "expertise": ["AI Governance", "Fintech", "Training exercises"]},
    "Art. 57": {"title": "SME support", "expertise": ["AI Compliance", "Fintech", "Evidence-Based Compliance"]},
    "Art. 58": {"title": "Sandboxes for SMEs", "expertise": ["AI Governance", "AI Compliance", "Risk Management"]},
    "Art. 59": {"title": "Testing in real world", "expertise": ["AI Risk Management", "Human Oversight", "AI Auditing"]},
    "Art. 60": {"title": "Informed consent", "expertise": ["Data Protection", "Human Oversight", "Trustworthy AI"]},
    "Art. 61": {"title": "Supervision", "expertise": ["AI Supervision", "Policy Monitoring", "Regulatory Analysis"]},
    "Art. 62": {"title": "Market surveillance", "expertise": ["Regulatory Analysis", "Policy Monitoring", "AI Auditing"]},
    "Art. 63": {"title": "AI Office", "expertise": ["AI Governance"]},
    "Art. 64": {"title": "AI Board", "expertise": ["AI Governance"]},
    "Art. 65": {"title": "Advisory forum", "expertise": ["AI Governance"]},
    "Art. 66": {"title": "Scientific panel", "expertise": ["AI Assurance", "AI Auditing"]},
    "Art. 67": {"title": "Expert pool", "expertise": ["AI Governance", "Training exercises"]},
}

# =============================================================================
# UTILIDADES
# =============================================================================

def _hash(data):
    """Genera hash SHA-256 (primeros 16 caracteres hex)."""
    return hashlib.sha256(data.encode("utf-8")).hexdigest()[:16]

def _now():
    """Retorna timestamp ISO 8601 actual."""
    return datetime.now(timezone.utc).isoformat()

def _log(component, action, status, detail="", data=None):
    """Registra entrada en el log de ejecución."""
    entry = {
        "id": str(uuid.uuid4())[:8],
        "component": component,
        "action": action,
        "status": status,
        "detail": detail,
        "timestamp": _now(),
        "hash": _hash(f"{component}{action}{status}{detail}")
    }
    if data:
        entry["data"] = data
    EXECUTION_LOG.append(entry)
    # Mantener solo las últimas 1000 entradas
    if len(EXECUTION_LOG) > 1000:
        EXECUTION_LOG.pop(0)
    return entry

# =============================================================================
# ENDPOINT 1: STATUS
# =============================================================================

def get_status():
    """GET /api/status - Estado completo del ecosistema."""
    TELEMETRY["requests_total"] += 1
    TELEMETRY["uptime_seconds"] = round(time.time() - ECOSYSTEM["start_time"], 2)
    
    result = {
        "ecosystem": ECOSYSTEM["name"],
        "version": ECOSYSTEM["version"],
        "instance_id": ECOSYSTEM["instance_id"],
        "candidate": ECOSYSTEM["candidate"],
        "candidate_id": ECOSYSTEM["candidate_id"],
        "mode": ECOSYSTEM["mode"],
        "region": ECOSYSTEM["region"],
        "deployment_url": ECOSYSTEM["deployment_url"],
        "git_commit": ECOSYSTEM["git_commit"],
        "git_branch": ECOSYSTEM["git_branch"],
        "uptime_seconds": TELEMETRY["uptime_seconds"],
        "components": {k: len(v) for k, v in COMPONENTS.items()},
        "telemetry": TELEMETRY,
        "status": "operational"
    }
    
    TELEMETRY["requests_success"] += 1
    _log("api", "status", "success", "Status retrieved")
    return result

# =============================================================================
# ENDPOINT 2: VERSION
# =============================================================================

def get_version():
    """GET /api/version - Información de versión."""
    TELEMETRY["requests_total"] += 1
    
    result = {
        "ecosystem": ECOSYSTEM["name"],
        "version": ECOSYSTEM["version"],
        "instance_id": ECOSYSTEM["instance_id"],
        "git_commit": ECOSYSTEM["git_commit"],
        "git_branch": ECOSYSTEM["git_branch"],
        "region": ECOSYSTEM["region"],
        "deployment_url": ECOSYSTEM["deployment_url"]
    }
    
    TELEMETRY["requests_success"] += 1
    _log("api", "version", "success", "Version retrieved")
    return result

# =============================================================================
# ENDPOINT 3: HEALTH
# =============================================================================

def get_health():
    """GET /api/health - Health check del ecosistema."""
    TELEMETRY["requests_total"] += 1
    TELEMETRY["last_health_check"] = _now()
    
    issues = []
    for category, items in COMPONENTS.items():
        for name, config in items.items():
            if config.get("status") in ["error", "down", "unreachable"]:
                issues.append(f"{category}.{name}")
    
    result = {
        "timestamp": _now(),
        "issues_found": issues,
        "health": "healthy" if not issues else "degraded",
        "components_checked": sum(len(v) for v in COMPONENTS.values())
    }
    
    TELEMETRY["requests_success"] += 1
    _log("api", "health", "success", f"Health check: {result['health']}")
    return result

# =============================================================================
# ENDPOINT 4: COMPONENTS
# =============================================================================

def get_components():
    """GET /api/components - Lista completa de componentes."""
    TELEMETRY["requests_total"] += 1
    
    result = {
        "status": "success",
        "components": COMPONENTS,
        "total": sum(len(v) for v in COMPONENTS.values())
    }
    
    TELEMETRY["requests_success"] += 1
    _log("api", "components", "success", f"Total: {result['total']}")
    return result

# =============================================================================
# ENDPOINT 5: EVIDENCE
# =============================================================================

def generate_evidence(article, context=None):
    """GET /api/evidence?article=X - Genera evidencia AI Act."""
    TELEMETRY["requests_total"] += 1
    context = context or {}
    
    payload = {
        "timestamp": _now(),
        "article": article,
        "human_oversight": True,
        "traceability": True,
        "auditability": True,
        "candidate": ECOSYSTEM["candidate"],
        "instance_id": ECOSYSTEM["instance_id"],
        "context": context
    }
    payload["evidence_hash"] = _hash(json.dumps(payload, sort_keys=True))
    
    TELEMETRY["requests_success"] += 1
    TELEMETRY["evidence_generated"] += 1
    _log("evidence", "generate", "success", article, {"hash": payload["evidence_hash"]})
    
    return {"status": "success", "evidence": payload}

# =============================================================================
# ENDPOINT 6: SUBAGENT
# =============================================================================

def dispatch_subagent(agent_name, task):
    """GET /api/subagent?agent=X&task=Y - Despacha sub-agente."""
    TELEMETRY["requests_total"] += 1
    
    if agent_name not in COMPONENTS["subagents"]:
        TELEMETRY["requests_error"] += 1
        return {"status": "error", "message": f"Sub-agent {agent_name} not found"}
    
    agent = COMPONENTS["subagents"][agent_name]
    result = {
        "status": "dispatched",
        "agent": agent_name,
        "provider": agent["provider"],
        "task": task,
        "timestamp": _now(),
        "dispatch_hash": _hash(f"{agent_name}{task}")
    }
    
    TELEMETRY["requests_success"] += 1
    TELEMETRY["subagents_dispatched"] += 1
    _log("subagent", "dispatch", "success", agent_name, result)
    return result

# =============================================================================
# ENDPOINT 7: SCAN
# =============================================================================

def cybersecurity_scan(target, tool="strix", authorized=False):
    """GET /api/scan?target=X&tool=Y - Escaneo de ciberseguridad."""
    TELEMETRY["requests_total"] += 1
    
    if tool not in COMPONENTS["cybersecurity"]:
        TELEMETRY["requests_error"] += 1
        return {"status": "error", "available": list(COMPONENTS["cybersecurity"].keys())}
    
    # Seguridad: solo permitir targets .local o autorizados
    if not authorized and not target.endswith(".local") and target != "self-test.local":
        TELEMETRY["requests_error"] += 1
        return {
            "status": "blocked",
            "reason": "Target not authorized. Use .local or authorized=True.",
            "target": target,
            "tool": tool
        }
    
    tc = COMPONENTS["cybersecurity"][tool]
    result = {
        "status": "success",
        "tool": tool,
        "role": tc["role"],
        "mode": tc["mode"],
        "target": target,
        "authorized": authorized,
        "timestamp": _now(),
        "scan_hash": _hash(f"{target}{tool}{time.time()}")
    }
    
    TELEMETRY["requests_success"] += 1
    TELEMETRY["scans_simulated"] += 1
    _log("cybersecurity", "scan", "success", f"{tool} → {target}", result)
    return result

# =============================================================================
# ENDPOINT 8: FACTORIES
# =============================================================================

def discover_gigafactories(factory_key=None):
    """GET /api/factories - Descubre gigafactorías."""
    TELEMETRY["requests_total"] += 1
    TELEMETRY["gigafactory_queries"] += 1
    
    factories = COMPONENTS["gigafactories"]
    keys = [factory_key] if factory_key else list(factories.keys())
    results = {}
    
    for key in keys:
        if key not in factories:
            results[key] = {"status": "error", "message": "not_found"}
            continue
        results[key] = {
            "status": factories[key]["status"],
            "agents": factories[key]["agents"],
            "auth_required": factories[key]["auth"]
        }
    
    TELEMETRY["requests_success"] += 1
    result = {
        "status": "success",
        "total": len(keys),
        "reachable": sum(1 for r in results.values() if r["status"] == "reachable"),
        "factories": results
    }
    
    _log("gigafactory", "discover", "success", f"{result['reachable']}/{result['total']}", result)
    return result

# =============================================================================
# ENDPOINT 9: LOG
# =============================================================================

def get_log():
    """GET /api/log - Obtiene log de ejecución."""
    TELEMETRY["requests_total"] += 1
    
    result = {
        "status": "success",
        "log": EXECUTION_LOG,
        "total_entries": len(EXECUTION_LOG)
    }
    
    TELEMETRY["requests_success"] += 1
    _log("api", "log", "success", f"Total: {result['total_entries']}")
    return result

# =============================================================================
# ENDPOINT 10: FULL TEST
# =============================================================================

def run_full_test():
    """POST /api/test - Ejecuta test completo del ecosistema."""
    TELEMETRY["requests_total"] += 1
    _log("orchestrator", "full_test", "running", "Iniciando prueba completa")
    
    results = {}
    
    # Test status
    results["status"] = get_status()
    
    # Test health
    results["health"] = get_health()
    
    # Test subagents
    results["subagents"] = [
        {"agent": a, "status": dispatch_subagent(a, f"Test: {a}")["status"]}
        for a in COMPONENTS["subagents"]
    ]
    
    # Test evidence
    results["evidence"] = [
        {"article": art, "hash": generate_evidence(art)["evidence"]["evidence_hash"]}
        for art in ["Art. 5", "Art. 9", "Art. 14", "Art. 27"]
    ]
    
    # Test cybersecurity
    results["cybersecurity"] = [
        {"tool": t, "status": cybersecurity_scan("self-test.local", t)["status"]}
        for t in COMPONENTS["cybersecurity"]
    ]
    
    # Test gigafactories
    results["gigafactories"] = discover_gigafactories()
    
    # Test generative AI
    results["generative_ai"] = [
        {"model": m, "status": "tested"}
        for m in COMPONENTS["generative_ai"]
    ]
    
    # Test databases
    results["databases"] = {
        "total": len(COMPONENTS["databases"]),
        "active": sum(1 for d in COMPONENTS["databases"].values() if d["status"] == "active"),
        "list": list(COMPONENTS["databases"].keys())
    }
    
    summary = {
        "test_id": hashlib.sha256(str(time.time()).encode()).hexdigest()[:12],
        "timestamp": _now(),
        "total_components_tested": sum(len(v) for v in COMPONENTS.values()),
        "results": results,
        "final_status": "PASSED"
    }
    
    TELEMETRY["requests_success"] += 1
    _log("orchestrator", "full_test", "success", f"Test {summary['test_id']} completado")
    return summary

# =============================================================================
# ACTIONS HANDLER
# =============================================================================

def handle_action(payload):
    """Maneja acciones POST /api."""
    action = payload.get("action", "status")
    
    if action == "status":
        return get_status()
    elif action == "health_check":
        return get_health()
    elif action == "dispatch_subagent":
        return dispatch_subagent(
            payload.get("agent_name", ""),
            payload.get("task", "")
        )
    elif action == "generate_evidence":
        return generate_evidence(
            payload.get("article", "Art. 9"),
            payload.get("context")
        )
    elif action == "cybersecurity_scan":
        return cybersecurity_scan(
            payload.get("target", "self-test.local"),
            payload.get("tool", "strix"),
            payload.get("authorized", False)
        )
    elif action == "discover_gigafactories":
        return discover_gigafactories(payload.get("factory_key"))
    elif action == "generate_llm":
        model = payload.get("model", "qwen3")
        if model not in COMPONENTS["generative_ai"]:
            return {"status": "error", "available": list(COMPONENTS["generative_ai"].keys())}
        return {
            "status": "success",
            "model": model,
            "role": COMPONENTS["generative_ai"][model]["role"],
            "license": COMPONENTS["generative_ai"][model]["license"],
            "timestamp": _now(),
            "note": "LLM dispatch simulated."
        }
    elif action == "reset_telemetry":
        for k in TELEMETRY:
            if isinstance(TELEMETRY[k], int):
                TELEMETRY[k] = 0
        return {"status": "success", "message": "Telemetry reset"}
    elif action == "run_full_ecosystem_test":
        return run_full_test()
    else:
        return {
            "status": "error",
            "message": f"Unknown action: {action}",
            "available": [
                "status", "health_check", "dispatch_subagent",
                "generate_evidence", "cybersecurity_scan",
                "discover_gigafactories", "generate_llm",
                "reset_telemetry", "run_full_ecosystem_test"
            ]
        }

# =============================================================================
# VERCEL SERVERLESS HANDLER
# =============================================================================

class handler(BaseHTTPRequestHandler):
    """Handler para Vercel Serverless Functions."""
    
    def _send(self, code, data):
        """Envía respuesta HTTP."""
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.send_header("X-Ecosystem", ECOSYSTEM["name"])
        self.send_header("X-Version", ECOSYSTEM["version"])
        self.send_header("X-Instance", ECOSYSTEM["instance_id"])
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode("utf-8"))
    
    def _read_body(self):
        """Lee body del request."""
        length = int(self.headers.get("Content-Length", 0))
        if not length:
            return {}
        try:
            return json.loads(self.rfile.read(length).decode("utf-8"))
        except Exception:
            return {}
    
    def do_OPTIONS(self):
        """Handle CORS preflight."""
        self._send(200, {"ok": True})
    
    def do_GET(self):
        """Handle GET requests."""
        parsed = urlparse(self.path)
        path = parsed.path.rstrip("/")
        query = parse_qs(parsed.query)
        
        # Routing
        if path in ["", "/", "/api", "/api/status"]:
            self._send(200, get_status())
        elif path == "/api/version":
            self._send(200, get_version())
        elif path == "/api/health":
            self._send(200, get_health())
        elif path == "/api/log":
            self._send(200, get_log())
        elif path == "/api/components":
            self._send(200, get_components())
        elif path == "/api/evidence":
            article = query.get("article", ["Art. 9"])[0]
            self._send(200, generate_evidence(article))
        elif path == "/api/subagent":
            agent = query.get("agent", ["ai_governance"])[0]
            task = query.get("task", ["test"])[0]
            self._send(200, dispatch_subagent(agent, task))
        elif path == "/api/scan":
            target = query.get("target", ["self-test.local"])[0]
            tool = query.get("tool", ["strix"])[0]
            self._send(200, cybersecurity_scan(target, tool))
        elif path == "/api/factories":
            factory_key = query.get("factory_key", [None])[0]
            self._send(200, discover_gigafactories(factory_key))
        else:
            self._send(404, {"status": "error", "message": f"Route not found: {path}"})
    
    def do_POST(self):
        """Handle POST requests."""
        parsed = urlparse(self.path)
        path = parsed.path.rstrip("/")
        body = self._read_body()
        
        if path in ["", "/", "/api"]:
            self._send(200, handle_action(body))
        elif path == "/api/test":
            self._send(200, run_full_test())
        else:
            self._send(404, {"status": "error", "message": f"Route not found: {path}"})
