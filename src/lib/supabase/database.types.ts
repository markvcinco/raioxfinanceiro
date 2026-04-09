export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      diagnosticos: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          nome_responsavel: string;
          email: string;
          telefone: string | null;
          nome_empresa: string;
          faturamento_anual: string | null;
          setor: string | null;
          respostas: Json;
          score_geral: number | null;
          score_areas: Json | null;
          persona: string | null;
          status: string;
          pago_em: string | null;
          relatorio_enviado_em: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          nome_responsavel: string;
          email: string;
          telefone?: string | null;
          nome_empresa: string;
          faturamento_anual?: string | null;
          setor?: string | null;
          respostas?: Json;
          score_geral?: number | null;
          score_areas?: Json | null;
          persona?: string | null;
          status?: string;
          pago_em?: string | null;
          relatorio_enviado_em?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          nome_responsavel?: string;
          email?: string;
          telefone?: string | null;
          nome_empresa?: string;
          faturamento_anual?: string | null;
          setor?: string | null;
          respostas?: Json;
          score_geral?: number | null;
          score_areas?: Json | null;
          persona?: string | null;
          status?: string;
          pago_em?: string | null;
          relatorio_enviado_em?: string | null;
        };
        Relationships: [];
      };
      pagamentos: {
        Row: {
          id: string;
          created_at: string;
          diagnostico_id: string;
          asaas_payment_id: string | null;
          asaas_customer_id: string | null;
          valor: number;
          status: string;
          metodo: string | null;
          pago_em: string | null;
          raw_webhook: Json | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          diagnostico_id: string;
          asaas_payment_id?: string | null;
          asaas_customer_id?: string | null;
          valor: number;
          status?: string;
          metodo?: string | null;
          pago_em?: string | null;
          raw_webhook?: Json | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          diagnostico_id?: string;
          asaas_payment_id?: string | null;
          asaas_customer_id?: string | null;
          valor?: number;
          status?: string;
          metodo?: string | null;
          pago_em?: string | null;
          raw_webhook?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "pagamentos_diagnostico_id_fkey";
            columns: ["diagnostico_id"];
            isOneToOne: false;
            referencedRelation: "diagnosticos";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "pagamentos_diagnostico_id_fkey";
            columns: ["diagnostico_id"];
            isOneToOne: false;
            referencedRelation: "leads_view";
            referencedColumns: ["diagnostico_id"];
          },
        ];
      };
    };
    Views: {
      leads_view: {
        Row: {
          diagnostico_id: string | null;
          created_at: string | null;
          nome_responsavel: string | null;
          email: string | null;
          telefone: string | null;
          nome_empresa: string | null;
          faturamento_anual: string | null;
          setor: string | null;
          score_geral: number | null;
          persona: string | null;
          diagnostico_status: string | null;
          pagamento_id: string | null;
          asaas_payment_id: string | null;
          valor: number | null;
          pagamento_status: string | null;
          metodo: string | null;
          pago_em: string | null;
        };
        Relationships: [];
      };
    };
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
