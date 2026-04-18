export interface Area {
  readonly id: AreaId;
  readonly numero: number;
  readonly nome: string;
  readonly eixo: string;
  readonly peso: number;
}

export type AreaId =
  | "gestao_financeira"
  | "precificacao_receita"
  | "vendas_previsibilidade"
  | "operacao_margem"
  | "governanca_decisao";

export const AREAS: readonly Area[] = [
  {
    id: "gestao_financeira",
    numero: 1,
    nome: "Gestão Financeira & Caixa",
    eixo: "Você enxerga o resultado real do negócio em tempo de decisão?",
    peso: 0.3,
  },
  {
    id: "precificacao_receita",
    numero: 2,
    nome: "Precificação & Receita",
    eixo: "Seu preço é decisão técnica ou chute confortável?",
    peso: 0.25,
  },
  {
    id: "vendas_previsibilidade",
    numero: 3,
    nome: "Vendas & Previsibilidade",
    eixo: "Você projeta receita dos próximos 90 dias com confiança?",
    peso: 0.15,
  },
  {
    id: "operacao_margem",
    numero: 4,
    nome: "Operação & Margem",
    eixo: "Você sabe a margem real por cliente, produto e operador?",
    peso: 0.15,
  },
  {
    id: "governanca_decisao",
    numero: 5,
    nome: "Governança & Decisão",
    eixo: "Suas decisões são baseadas em dado ou em sentimento?",
    peso: 0.15,
  },
] as const;
