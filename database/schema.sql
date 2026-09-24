-- =============================================================================
-- EDPB-SUPER-ECOSYSTEM v4.0 - Database Schema
-- PostgreSQL 17 + pgvector 0.8.x
-- =============================================================================

-- Habilitar extensión pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- =============================================================================
-- TABLA: evidences
-- Almacena evidencias AI Act con trazabilidad
-- =============================================================================

CREATE TABLE IF NOT EXISTS evidences (
    id SERIAL PRIMARY KEY,
    article VARCHAR(10) NOT NULL,
    evidence_hash VARCHAR(16) NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    human_oversight BOOLEAN NOT NULL DEFAULT TRUE,
    traceability BOOLEAN NOT NULL DEFAULT TRUE,
    auditability BOOLEAN NOT NULL DEFAULT TRUE,
    candidate VARCHAR(255) NOT NULL,
    instance_id VARCHAR(12) NOT NULL,
    context JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Índices para búsqueda rápida
    CONSTRAINT unique_evidence UNIQUE (article, evidence_hash)
);

CREATE INDEX IF NOT EXISTS idx_evidences_article ON evidences(article);
CREATE INDEX IF NOT EXISTS idx_evidences_timestamp ON evidences(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_evidences_hash ON evidences(evidence_hash);

-- =============================================================================
-- TABLA: subagents
-- Registro de sub-agentes y sus estados
-- =============================================================================

CREATE TABLE IF NOT EXISTS subagents (
    id SERIAL PRIMARY KEY,
    agent_name VARCHAR(50) NOT NULL UNIQUE,
    status VARCHAR(20) NOT NULL DEFAULT 'ready',
    provider VARCHAR(50) NOT NULL,
    last_dispatch TIMESTAMPTZ,
    total_dispatches INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subagents_name ON subagents(agent_name);
CREATE INDEX IF NOT EXISTS idx_subagents_status ON subagents(status);

-- Insertar sub-agentes iniciales
INSERT INTO subagents (agent_name, status, provider) VALUES
    ('ai_governance', 'ready', 'qwen3'),
    ('ai_act_compliance', 'ready', 'glm_52'),
    ('risk_assessment', 'ready', 'qwen3'),
    ('regulatory_monitor', 'ready', 'glm_52'),
    ('privacy_tech', 'ready', 'qwen3'),
    ('cloud_security', 'ready', 'deepseek_v4'),
    ('training_designer', 'ready', 'gemma_4'),
    ('evidence_engine', 'ready', 'phi_4_mini')
ON CONFLICT (agent_name) DO NOTHING;

-- =============================================================================
-- TABLA: scans
-- Registro de escaneos de ciberseguridad
-- =============================================================================

CREATE TABLE IF NOT EXISTS scans (
    id SERIAL PRIMARY KEY,
    tool VARCHAR(50) NOT NULL,
    target VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL,
    scan_hash VARCHAR(16) NOT NULL,
    authorized BOOLEAN NOT NULL DEFAULT FALSE,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    details JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_scans_tool ON scans(tool);
CREATE INDEX IF NOT EXISTS idx_scans_target ON scans(target);
CREATE INDEX IF NOT EXISTS idx_scans_timestamp ON scans(timestamp DESC);

-- =============================================================================
-- TABLA: logs
-- Log de ejecución con trazabilidad
-- =============================================================================

CREATE TABLE IF NOT EXISTS logs (
    id SERIAL PRIMARY KEY,
    log_id VARCHAR(8) NOT NULL,
    component VARCHAR(50) NOT NULL,
    action VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL,
    detail TEXT,
    log_hash VARCHAR(16) NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    data JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_logs_component ON logs(component);
CREATE INDEX IF NOT EXISTS idx_logs_action ON logs(action);
CREATE INDEX IF NOT EXISTS idx_logs_status ON logs(status);
CREATE INDEX IF NOT EXISTS idx_logs_timestamp ON logs(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_logs_hash ON logs(log_hash);

-- =============================================================================
-- TABLA: telemetry
-- Métricas de telemetría del ecosistema
-- =============================================================================

CREATE TABLE IF NOT EXISTS telemetry (
    id SERIAL PRIMARY KEY,
    metric_name VARCHAR(50) NOT NULL UNIQUE,
    metric_value INTEGER NOT NULL DEFAULT 0,
    last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insertar métricas iniciales
INSERT INTO telemetry (metric_name, metric_value) VALUES
    ('requests_total', 0),
    ('requests_success', 0),
    ('requests_error', 0),
    ('evidence_generated', 0),
    ('subagents_dispatched', 0),
    ('scans_simulated', 0),
    ('gigafactory_queries', 0),
    ('auto_repairs', 0)
ON CONFLICT (metric_name) DO NOTHING;

-- =============================================================================
-- TABLA: gigafactories
-- Registro de gigafactorías y su estado
-- =============================================================================

CREATE TABLE IF NOT EXISTS gigafactories (
    id SERIAL PRIMARY KEY,
    factory_name VARCHAR(50) NOT NULL UNIQUE,
    status VARCHAR(20) NOT NULL DEFAULT 'reachable',
    agents_count INTEGER,
    auth_required BOOLEAN NOT NULL DEFAULT FALSE,
    last_query TIMESTAMPTZ,
    total_queries INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gigafactories_name ON gigafactories(factory_name);
CREATE INDEX IF NOT EXISTS idx_gigafactories_status ON gigafactories(status);

-- Insertar gigafactorías iniciales
INSERT INTO gigafactories (factory_name, status, agents_count, auth_required) VALUES
    ('nexus_agi', 'reachable', 133, FALSE),
    ('ai_agent_marketplace', 'reachable', 10000, TRUE),
    ('peli_agent_factory', 'reachable', 100, FALSE),
    ('beacon_mcp', 'reachable', 3800, FALSE),
    ('a2astore', 'reachable', 80, FALSE)
ON CONFLICT (factory_name) DO NOTHING;

-- =============================================================================
-- FUNCIÓN: update_telemetry
-- Actualiza métricas de telemetría
-- =============================================================================

CREATE OR REPLACE FUNCTION update_telemetry(p_metric_name VARCHAR, p_increment INTEGER DEFAULT 1)
RETURNS VOID AS $$
BEGIN
    UPDATE telemetry
    SET metric_value = metric_value + p_increment,
        last_updated = NOW()
    WHERE metric_name = p_metric_name;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- FUNCIÓN: reset_telemetry
-- Resetea todas las métricas de telemetría
-- =============================================================================

CREATE OR REPLACE FUNCTION reset_telemetry()
RETURNS VOID AS $$
BEGIN
    UPDATE telemetry
    SET metric_value = 0,
        last_updated = NOW();
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- VISTA: recent_logs
-- Vista de logs recientes (últimas 100 entradas)
-- =============================================================================

CREATE OR REPLACE VIEW recent_logs AS
SELECT *
FROM logs
ORDER BY timestamp DESC
LIMIT 100;

-- =============================================================================
-- VISTA: ecosystem_health
-- Vista de salud del ecosistema
-- =============================================================================

CREATE OR REPLACE VIEW ecosystem_health AS
SELECT
    (SELECT COUNT(*) FROM subagents WHERE status = 'ready') as ready_agents,
    (SELECT COUNT(*) FROM subagents WHERE status != 'ready') as problematic_agents,
    (SELECT COUNT(*) FROM gigafactories WHERE status = 'reachable') as reachable_factories,
    (SELECT COUNT(*) FROM gigafactories WHERE status != 'reachable') as unreachable_factories,
    (SELECT metric_value FROM telemetry WHERE metric_name = 'requests_total') as total_requests,
    (SELECT metric_value FROM telemetry WHERE metric_name = 'requests_error') as total_errors,
    (SELECT metric_value FROM telemetry WHERE metric_name = 'evidence_generated') as total_evidence,
    (SELECT MAX(timestamp) FROM logs) as last_activity;

-- =============================================================================
-- PERMISOS Y SEGURIDAD
-- =============================================================================

-- Crear rol para la aplicación (si no existe)
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'edpb_app') THEN
        CREATE ROLE edpb_app WITH LOGIN PASSWORD 'change_this_password';
    END IF;
END
$$;

-- Grant permissions
GRANT CONNECT ON DATABASE postgres TO edpb_app;
GRANT USAGE ON SCHEMA public TO edpb_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO edpb_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO edpb_app;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO edpb_app;

-- =============================================================================
-- COMENTARIOS
-- =============================================================================

COMMENT ON TABLE evidences IS 'Evidencias AI Act con trazabilidad SHA-256';
COMMENT ON TABLE subagents IS 'Registro de sub-agentes EDPB';
COMMENT ON TABLE scans IS 'Escaneos de ciberseguridad';
COMMENT ON TABLE logs IS 'Log de ejecución con trazabilidad';
COMMENT ON TABLE telemetry IS 'Métricas de telemetría del ecosistema';
COMMENT ON TABLE gigafactories IS 'Registro de gigafactorías públicas';

COMMENT ON DATABASE postgres IS 'EDPB-SUPER-ECOSYSTEM v4.0 - Base de datos principal';

-- =============================================================================
-- FIN DEL SCHEMA
-- =============================================================================
