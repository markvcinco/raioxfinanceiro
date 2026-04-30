import type { Persona } from "@/types";

export const PLANO_90_DIAS: Record<
  Persona,
  { fase1: [string, string, string]; fase2: [string, string, string]; fase3: [string, string, string] }
> = {
  apagando_incendio: {
    fase1: ["Mapear caixa diário e obrigações críticas", "Congelar custos não essenciais por 30 dias", "Definir rotina de decisão financeira semanal"],
    fase2: ["Implantar DRE gerencial simplificada", "Revisar preços e descontos de maior impacto", "Priorizar clientes e ofertas com melhor margem"],
    fase3: ["Formalizar indicadores mínimos de controle", "Padronizar fluxo de aprovação de gastos", "Consolidar plano trimestral com metas realistas"],
  },
  improviso: {
    fase1: ["Diagnosticar desvios de margem por linha", "Estruturar forecast comercial com cenários", "Definir cadência mensal de fechamento"],
    fase2: ["Padronizar política de descontos e alçadas", "Conectar metas comerciais à capacidade operacional", "Criar painel executivo com indicadores críticos"],
    fase3: ["Consolidar ritos de revisão de performance", "Ajustar carteira para elevar qualidade de receita", "Instituir revisão de riscos e contingências"],
  },
  base_sem_metodo: {
    fase1: ["Integrar dados financeiros e comerciais", "Refinar análise de margem de contribuição", "Definir prioridades estratégicas com critérios"],
    fase2: ["Automatizar relatórios recorrentes", "Escalar governança de decisões por área", "Otimizar eficiência operacional com metas"],
    fase3: ["Consolidar playbook financeiro de gestão", "Expandir planejamento de caixa para 12 meses", "Executar ciclo trimestral de melhoria contínua"],
  },
  madura: {
    fase1: ["Auditar premissas estratégicas do modelo atual", "Mapear ganhos de eficiência de alto impacto", "Estressar cenários de crescimento e risco"],
    fase2: ["Otimizar mix de receita e rentabilidade", "Fortalecer governança de decisão executiva", "Elevar precisão do forecast por unidade"],
    fase3: ["Consolidar agenda de excelência financeira", "Expandir inteligência para decisões de escala", "Implantar rotina de revisão externa periódica"],
  },
};
