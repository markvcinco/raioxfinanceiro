import type { Database } from "@/lib/supabase/database.types";

// Row types (o que vem do banco)
export type Diagnostico =
  Database["public"]["Tables"]["diagnosticos"]["Row"];
export type DiagnosticoInsert =
  Database["public"]["Tables"]["diagnosticos"]["Insert"];
export type DiagnosticoUpdate =
  Database["public"]["Tables"]["diagnosticos"]["Update"];

export type Pagamento = Database["public"]["Tables"]["pagamentos"]["Row"];
export type PagamentoInsert =
  Database["public"]["Tables"]["pagamentos"]["Insert"];
export type PagamentoUpdate =
  Database["public"]["Tables"]["pagamentos"]["Update"];

export type LeadView = Database["public"]["Views"]["leads_view"]["Row"];

// Domain types
export type FaturamentoAnual =
  | "ate_500k"
  | "500k_2m"
  | "2m_5m"
  | "5m_20m"
  | "acima_20m";

export type Persona =
  | "apagando_incendio"
  | "improviso"
  | "base_sem_metodo"
  | "madura";

export type DiagnosticoStatus =
  | "em_andamento"
  | "concluido"
  | "pago"
  | "relatorio_enviado";

export type PagamentoStatus =
  | "pendente"
  | "confirmado"
  | "recebido"
  | "vencido"
  | "cancelado"
  | "estornado";

export type MetodoPagamento = "pix" | "credit_card" | "boleto";

export interface Resposta {
  pergunta_id: string;
  alternativa_id: string;
  pontos: number;
}

export type ScoreAreas = Record<
  | "gestao_financeira"
  | "precificacao_receita"
  | "vendas_previsibilidade"
  | "operacao_margem"
  | "governanca_decisao",
  number
>;
