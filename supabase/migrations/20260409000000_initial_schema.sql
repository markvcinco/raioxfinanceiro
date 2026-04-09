-- Migration: create initial schema for Raio-X Financeiro MARK V
-- Tables: diagnosticos, pagamentos
-- View: leads_view

-- =============================================================================
-- DIAGNOSTICOS
-- =============================================================================
CREATE TABLE diagnosticos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  -- Dados do lead
  nome_responsavel text NOT NULL,
  email text NOT NULL,
  telefone text,
  nome_empresa text NOT NULL,
  faturamento_anual text CHECK (
    faturamento_anual IS NULL
    OR faturamento_anual IN ('ate_500k', '500k_2m', '2m_5m', '5m_20m', 'acima_20m')
  ),
  setor text,

  -- Respostas e scores
  respostas jsonb NOT NULL DEFAULT '[]'::jsonb,
  score_geral integer CHECK (score_geral IS NULL OR (score_geral >= 0 AND score_geral <= 100)),
  score_areas jsonb,
  persona text CHECK (
    persona IS NULL
    OR persona IN ('apagando_incendio', 'improviso', 'base_sem_metodo', 'madura')
  ),

  -- Status e lifecycle
  status text NOT NULL DEFAULT 'em_andamento' CHECK (
    status IN ('em_andamento', 'concluido', 'pago', 'relatorio_enviado')
  ),
  pago_em timestamptz,
  relatorio_enviado_em timestamptz
);

-- Index para buscas por email (admin/relatórios)
CREATE INDEX idx_diagnosticos_email ON diagnosticos (email);

-- Index para filtrar por status
CREATE INDEX idx_diagnosticos_status ON diagnosticos (status);

-- Trigger para updated_at automático
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_diagnosticos_updated_at
  BEFORE UPDATE ON diagnosticos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- PAGAMENTOS
-- =============================================================================
CREATE TABLE pagamentos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),

  diagnostico_id uuid NOT NULL REFERENCES diagnosticos(id) ON DELETE CASCADE,
  asaas_payment_id text UNIQUE,
  asaas_customer_id text,

  valor numeric(10, 2) NOT NULL,
  status text NOT NULL DEFAULT 'pendente' CHECK (
    status IN ('pendente', 'confirmado', 'recebido', 'vencido', 'cancelado', 'estornado')
  ),
  metodo text CHECK (
    metodo IS NULL
    OR metodo IN ('pix', 'credit_card', 'boleto')
  ),
  pago_em timestamptz,
  raw_webhook jsonb
);

-- Index para buscar pagamentos por diagnóstico
CREATE INDEX idx_pagamentos_diagnostico_id ON pagamentos (diagnostico_id);

-- Index para buscar por asaas_payment_id (webhook lookups)
CREATE INDEX idx_pagamentos_asaas_payment_id ON pagamentos (asaas_payment_id);

-- =============================================================================
-- LEADS VIEW (denormalizada para admin)
-- =============================================================================
CREATE VIEW leads_view AS
SELECT
  d.id AS diagnostico_id,
  d.created_at,
  d.nome_responsavel,
  d.email,
  d.telefone,
  d.nome_empresa,
  d.faturamento_anual,
  d.setor,
  d.score_geral,
  d.persona,
  d.status AS diagnostico_status,
  p.id AS pagamento_id,
  p.asaas_payment_id,
  p.valor,
  p.status AS pagamento_status,
  p.metodo,
  p.pago_em
FROM diagnosticos d
LEFT JOIN pagamentos p ON p.diagnostico_id = d.id;

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================
ALTER TABLE diagnosticos ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagamentos ENABLE ROW LEVEL SECURITY;

-- Deny all by default. Access only via service_role (bypasses RLS).
-- No user-facing policies in v1 — all operations go through API routes
-- using the admin client (service_role key).
