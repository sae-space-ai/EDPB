#!/usr/bin/env python3
# =============================================================================
# EDPB-FULLSTACK-OPERATIVO v5.0 — TEST RUNNER REAL
# Ejecuta las 100 pruebas contra tu backend desplegado en Vercel
# Autor: Manuel Gago Fernández | Candidato EDPB SPE 2025-2030
# =============================================================================
# USO:
#   python3 run_100_tests.py --url https://tu-proyecto.vercel.app
#
# REQUISITOS:
#   pip install requests
# =============================================================================

import os
import sys
import json
import time
import hashlib
import argparse
import requests
from datetime import datetime, timezone

# =============================================================================
# CONFIGURACIÓN
# =============================================================================

BATCHES = {
    "A": {"name": "Conectividad", "count": 10},
    "B": {"name": "Evidencias AI Act", "count": 20},
    "C": {"name": "Sub-agentes", "count": 16},
    "D": {"name": "Ciberseguridad", "count": 16},
    "E": {"name": "LLM", "count": 14},
    "F": {"name": "Gigafactorías", "count": 10},
    "G": {"name": "Log y telemetría", "count": 8},
    "H": {"name": "Test completo", "count": 6},
}

ARTICLES = ["Art.5", "Art.6", "Art.9", "Art.10", "Art.11", "Art.12", "Art.13",
            "Art.14", "Art.15", "Art.16", "Art.17", "Art.18", "Art.19", "Art.20",
            "Art.21", "Art.22", "Art.23", "Art.24", "Art.25", "Art.26"]

SUBAGENTS = ["ai_governance", "ai_act_compliance", "risk_assessment",
             "regulatory_monitor", "privacy_tech", "cloud_security",
             "training_designer", "evidence_engine"]

CYBER_TOOLS = ["strix", "nuclei", "pentestgpt", "pentagi",
               "hexstrike_ai", "faraday", "metasploit", "recon_ng"]

LLM_MODELS = ["qwen3", "deepseek_v4", "glm_52", "gemma_4",
              "phi_4_mini", "llama_4_scout", "kimi_k3"]

FACTORIES = ["nexus_agi", "ai_agent_marketplace", "peli_agent_factory",
             "beacon_mcp", "a2astore"]

# =============================================================================
# UTILIDADES
# =============================================================================

def compute_hash(data):
    """SHA-256 primeros 16 chars hex."""
    return hashlib.sha256(str(data).encode("utf-8")).hexdigest()[:16]

def now_iso():
    return datetime.now(timezone.utc).isoformat()

# =============================================================================
# EJECUTOR DE PRUEBAS
# =============================================================================

class TestRunner:
    def __init__(self, base_url, timeout=10):
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout
        self.results = []
        self.test_id = compute_hash(time.time())
        self.start_time = time.time()

    def _request(self, method, path, json_body=None):
        """Ejecuta una petición HTTP real y mide latencia."""
        url = f"{self.base_url}{path}"
        start = time.time()
        try:
            if method == "GET":
                resp = requests.get(url, timeout=self.timeout)
            else:
                resp = requests.post(url, json=json_body or {}, timeout=self.timeout)
            latency_ms = round((time.time() - start) * 1000)
            
            try:
                body = resp.json()
            except Exception:
                body = {"_raw": resp.text[:200]}
            
            # Determinar status
            if resp.status_code != 200:
                status = "failed"
            elif isinstance(body, dict) and body.get("status") == "blocked":
                status = "blocked"
            elif isinstance(body, dict) and body.get("status") == "error":
                status = "failed"
            else:
                status = "success"
            
            return {
                "http": resp.status_code,
                "latency_ms": latency_ms,
                "status": status,
                "body": body
            }
        except requests.exceptions.Timeout:
            return {"http": 0, "latency_ms": self.timeout * 1000, "status": "timeout", "body": {}}
        except requests.exceptions.ConnectionError as e:
            return {"http": 0, "latency_ms": 0, "status": "connection_error", "body": {"error": str(e)[:200]}}
        except Exception as e:
            return {"http": 0, "latency_ms": 0, "status": "error", "body": {"error": str(e)[:200]}}

    def _add(self, batch, method, path, result, note=""):
        entry = {
            "id": len(self.results) + 1,
            "batch": batch,
            "method": method,
            "path": path,
            "http": result["http"],
            "latency_ms": result["latency_ms"],
            "status": result["status"],
            "hash": compute_hash(f"{batch}{method}{path}{result['status']}{time.time()}"),
            "timestamp": now_iso(),
            "note": note
        }
        self.results.append(entry)
        return entry

    # ─── BATCH A: Conectividad (10 tests) ───
    def batch_a(self):
        print("\n━━━ Batch A: Conectividad (10 tests) ━━━")
        for _ in range(3):
            r = self._request("GET", "/api/status")
            self._add("A", "GET", "/api/status", r, f"ecosystem={r['body'].get('ecosystem', 'N/A')}")
        for _ in range(2):
            r = self._request("GET", "/api/version")
            self._add("A", "GET", "/api/version", r, f"version={r['body'].get('version', 'N/A')}")
        for _ in range(2):
            r = self._request("GET", "/api/health")
            self._add("A", "GET", "/api/health", r, f"health={r['body'].get('health', 'N/A')}")
        for _ in range(3):
            r = self._request("GET", "/api/components")
            self._add("A", "GET", "/api/components", r, f"total={r['body'].get('total', 'N/A')}")

    # ─── BATCH B: Evidencias AI Act (20 tests) ───
    def batch_b(self):
        print("\n━━━ Batch B: Evidencias AI Act (20 tests) ━━━")
        for article in ARTICLES:
            r = self._request("GET", f"/api/evidence?article={article}")
            ev = r["body"].get("evidence", {})
            self._add("B", "GET", f"/api/evidence?article={article}", r,
                     f"hash={ev.get('evidence_hash', 'N/A')[:12]}")

    # ─── BATCH C: Sub-agentes (16 tests) ───
    def batch_c(self):
        print("\n━━━ Batch C: Sub-agentes (16 tests) ━━━")
        for agent in SUBAGENTS:
            for _ in range(2):
                r = self._request("GET", f"/api/subagent?agent={agent}&task=test")
                self._add("C", "GET", f"/api/subagent?agent={agent}", r,
                         f"status={r['body'].get('status', 'N/A')}")

    # ─── BATCH D: Ciberseguridad (16 tests) ───
    def batch_d(self):
        print("\n━━━ Batch D: Ciberseguridad (16 tests) ━━━")
        # 8 tests con target .local (deben dar success)
        for tool in CYBER_TOOLS:
            r = self._request("GET", f"/api/scan?target=self-test.local&tool={tool}")
            self._add("D", "GET", f"/api/scan?target=self-test.local&tool={tool}", r,
                     f"tool={tool}")
        # 8 tests con target externo (deben dar blocked)
        for tool in CYBER_TOOLS:
            r = self._request("GET", f"/api/scan?target=example.com&tool={tool}")
            self._add("D", "GET", f"/api/scan?target=example.com&tool={tool}", r,
                     f"tool={tool}, expected=blocked")

    # ─── BATCH E: LLM (14 tests) ───
    def batch_e(self):
        print("\n━━━ Batch E: LLM (14 tests) ━━━")
        for model in LLM_MODELS:
            for _ in range(2):
                r = self._request("POST", "/api", {
                    "action": "generate_llm",
                    "model": model,
                    "prompt": "test"
                })
                self._add("E", "POST", f"/api (model={model})", r,
                         f"model={model}")

    # ─── BATCH F: Gigafactorías (10 tests) ───
    def batch_f(self):
        print("\n━━━ Batch F: Gigafactorías (10 tests) ━━━")
        for _ in range(5):
            r = self._request("GET", "/api/factories")
            self._add("F", "GET", "/api/factories", r,
                     f"reachable={r['body'].get('reachable', 'N/A')}")
        for factory in FACTORIES:
            r = self._request("GET", f"/api/factories?factory_key={factory}")
            self._add("F", "GET", f"/api/factories?factory_key={factory}", r,
                     f"factory={factory}")

    # ─── BATCH G: Log y telemetría (8 tests) ───
    def batch_g(self):
        print("\n━━━ Batch G: Log y telemetría (8 tests) ━━━")
        for _ in range(3):
            r = self._request("GET", "/api/log")
            self._add("G", "GET", "/api/log", r,
                     f"entries={r['body'].get('total_entries', 'N/A')}")
        for _ in range(2):
            r = self._request("POST", "/api", {"action": "reset_telemetry"})
            self._add("G", "POST", "/api (reset_telemetry)", r)
        for _ in range(3):
            r = self._request("GET", "/api/status")
            self._add("G", "GET", "/api/status", r, "post-reset")

    # ─── BATCH H: Test completo (6 tests) ───
    def batch_h(self):
        print("\n━━━ Batch H: Test completo (6 tests) ━━━")
        for i in range(6):
            r = self._request("POST", "/api/test")
            self._add("H", "POST", "/api/test", r,
                     f"test_id={r['body'].get('test_id', 'N/A')[:12]}")

    # ─── EJECUCIÓN COMPLETA ───
    def run_all(self):
        self.batch_a()
        self.batch_b()
        self.batch_c()
        self.batch_d()
        self.batch_e()
        self.batch_f()
        self.batch_g()
        self.batch_h()
        return self.get_summary()

    def get_summary(self):
        total = len(self.results)
        success = sum(1 for r in self.results if r["status"] == "success")
        blocked = sum(1 for r in self.results if r["status"] == "blocked")
        failed = sum(1 for r in self.results if r["status"] == "failed")
        errors = sum(1 for r in self.results if r["status"] in ["error", "timeout", "connection_error"])
        latencies = [r["latency_ms"] for r in self.results if r["latency_ms"] > 0]
        avg_latency = round(sum(latencies) / len(latencies), 1) if latencies else 0
        duration = round(time.time() - self.start_time, 2)

        # 5 checks de verificación
        checks = {
            "min_success_rate_90pct": (success / total * 100) >= 90 if total > 0 else False,
            "no_unexpected_errors": errors == 0,
            "blocked_matches_expected": blocked == 8,
            "avg_latency_under_2s": avg_latency < 2000,
            "total_tests_100": total == 100
        }
        passed_checks = sum(1 for v in checks.values() if v)

        return {
            "test_run_id": self.test_id,
            "base_url": self.base_url,
            "executed_at": now_iso(),
            "duration_seconds": duration,
            "summary": {
                "total": total,
                "success": success,
                "blocked": blocked,
                "failed": failed,
                "errors": errors,
                "success_rate": round(success / total * 100, 2) if total > 0 else 0,
                "avg_latency_ms": avg_latency
            },
            "verification": {
                "checks": checks,
                "passed": passed_checks
            },
            "results": self.results
        }

# =============================================================================
# REPORTES
# =============================================================================

def print_header(summary):
    print("\n")
    print("╔" + "═" * 78 + "╗")
    print("║  EDPB-FULLSTACK-OPERATIVO v5.0 — EJECUCIÓN AUTÓNOMA                      ║")
    print(f"║  Ejecutado: {summary['executed_at'][:26]:<64} ║")
    print(f"║  Test Run ID: {summary['test_run_id']:<62} ║")
    print("╚" + "═" * 78 + "╝")

def print_summary_table(summary):
    s = summary["summary"]
    v = summary["verification"]
    print(f"""
━━━ RESUMEN ━━━
Total pruebas:     {s['total']}/100
Éxito:             {s['success']}
Bloqueado:         {s['blocked']} (esperado: 8)
Fallido:           {s['failed']}
Errores:           {s['errors']}
Tasa de éxito:     {s['success_rate']}%
Latencia promedio: {s['avg_latency_ms']}ms
Duración total:    {summary['duration_seconds']}s

━━━ VERIFICACIÓN (5 checks) ━━━
✓ success_rate >= 90%:    {'PASS' if v['checks']['min_success_rate_90pct'] else 'FAIL'}
✓ no unexpected errors:   {'PASS' if v['checks']['no_unexpected_errors'] else 'FAIL'}
✓ blocked == 8:           {'PASS' if v['checks']['blocked_matches_expected'] else 'FAIL'}
✓ avg_latency < 2000ms:   {'PASS' if v['checks']['avg_latency_under_2s'] else 'FAIL'}
✓ total == 100:           {'PASS' if v['checks']['total_tests_100'] else 'FAIL'}

Checks pasados: {v['passed']}/5
""")

def print_results_table(results):
    print("\n━━━ TABLA DE 100 PRUEBAS ━━━")
    print(f"{'#':>3} | {'B':>1} | {'M':>4} | {'URL':<45} | {'HTTP':>4} | {'ms':>5} | {'Status':<10} | {'Hash':<16}")
    print("-" * 110)
    for r in results:
        path_short = r['path'][:45]
        print(f"{r['id']:>3} | {r['batch']:>1} | {r['method']:>4} | {path_short:<45} | {r['http']:>4} | {r['latency_ms']:>5} | {r['status']:<10} | {r['hash']:<16}")

# =============================================================================
# PRE-VERIFICACIÓN (FASE 0)
# =============================================================================

def pre_verification(base_url):
    print("\n━━━ FASE 0: PRE-VERIFICACIÓN ━━━")
    errors = []

    # 0.1 Verificar URL
    print(f"[0.1] URL: {base_url}")
    if not base_url.startswith("http"):
        errors.append("URL debe empezar con http:// o https://")

    # 0.2 Verificar requests
    try:
        import requests
        print(f"[0.2] requests: OK (v{requests.__version__})")
    except ImportError:
        errors.append("Librería 'requests' no instalada. Ejecuta: pip install requests")

    # 0.3 Verificar conectividad
    print(f"[0.3] Conectividad: probando {base_url}/api/status ...")
    try:
        resp = requests.get(f"{base_url}/api/status", timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            print(f"      ✓ HTTP 200 — ecosystem={data.get('ecosystem', 'N/A')}")
        else:
            errors.append(f"HTTP {resp.status_code} en /api/status")
    except Exception as e:
        errors.append(f"No se pudo conectar a {base_url}: {str(e)[:100]}")

    if errors:
        print("\n⚠ BLOQUEADO — Errores en pre-verificación:")
        for e in errors:
            print(f"  - {e}")
        print("\nNo puedo continuar sin resolver estos errores.")
        return False

    print("✓ Pre-verificación completada\n")
    return True

# =============================================================================
# MAIN
# =============================================================================

def main():
    parser = argparse.ArgumentParser(description="EDPB Test Runner - 100 pruebas reales")
    parser.add_argument("--url", required=True, help="URL del backend (ej: https://tu-proyecto.vercel.app)")
    parser.add_argument("--timeout", type=int, default=10, help="Timeout en segundos (default: 10)")
    parser.add_argument("--output", help="Archivo JSON de salida (opcional)")
    parser.add_argument("--skip-precheck", action="store_true", help="Saltar pre-verificación")
    args = parser.parse_args()

    print("\n" + "=" * 80)
    print("  EDPB-FULLSTACK-OPERATIVO v5.0 — TEST RUNNER REAL")
    print("  100 pruebas con trazabilidad SHA-256")
    print("=" * 80)

    # FASE 0
    if not args.skip_precheck:
        if not pre_verification(args.url):
            sys.exit(1)

    # Ejecutar pruebas
    runner = TestRunner(args.url, args.timeout)
    print("\nEjecutando 100 pruebas reales...")
    summary = runner.run_all()

    # Reportes
    print_header(summary)
    print_summary_table(summary)
    print_results_table(summary["results"])

    # Exportar JSON
    output_file = args.output or f"test-results-{summary['test_run_id']}.json"
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=2, ensure_ascii=False)
    print(f"\n✓ Resultados exportados a: {output_file}")

    # Código de salida
    if summary["summary"]["errors"] > 0:
        print(f"\n⚠ {summary['summary']['errors']} errores detectados")
        sys.exit(2)
    elif summary["verification"]["passed"] < 5:
        print(f"\n⚠ Solo {summary['verification']['passed']}/5 checks pasaron")
        sys.exit(3)
    else:
        print("\n✓ TODAS LAS PRUEBAS PASARON")
        sys.exit(0)

if __name__ == "__main__":
    main()
