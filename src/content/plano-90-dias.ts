import type { Persona } from "@/types";

export interface AcaoPlano {
  readonly titulo: string;
  readonly descricao: string;
}

export interface FasePlano {
  readonly label: string;
  readonly acoes: readonly AcaoPlano[];
}

export interface PlanoPersona {
  readonly titulo_plano: string;
  readonly fases: readonly [FasePlano, FasePlano, FasePlano];
}

export const PLANO_90_DIAS: Record<Persona, PlanoPersona> = {
  apagando_incendio: {
    titulo_plano: "Plano para sair do modo sobrevivência",
    fases: [
      {
        label: "Dias 1–30: Diagnosticar",
        acoes: [
          {
            titulo: "Fechar uma DRE gerencial mínima",
            descricao:
              "Monte uma DRE gerencial simplificada com no máximo 8 linhas (receita, impostos, custo direto, margem bruta, despesas fixas, despesas variáveis, resultado, caixa). Feche o mês anterior agora, mesmo que com dados aproximados.",
          },
          {
            titulo: "Mapear margem dos 10 maiores clientes",
            descricao:
              "Liste seus 10 maiores clientes por receita e estime, mesmo que grosseiramente, a margem de cada um. Identifique os que provavelmente dão prejuízo.",
          },
          {
            titulo: "Montar fluxo de caixa de 13 semanas",
            descricao:
              "Abra uma planilha de fluxo de caixa de 13 semanas. Preencha com o que já sabe (recebimentos previstos, contas fixas). Atualize toda sexta.",
          },
        ],
      },
      {
        label: "Dias 31–60: Estruturar",
        acoes: [
          {
            titulo: "Separar PJ de PF",
            descricao:
              "Defina pró-labore fixo. Congele retiradas extras por 30 dias e registre separadamente o que \"precisaria\" ter saído.",
          },
          {
            titulo: "Calcular margem de contribuição real",
            descricao:
              "Calcule o custo direto completo do seu principal produto ou serviço (incluindo tempo das pessoas envolvidas). Descubra a margem de contribuição real.",
          },
          {
            titulo: "Escrever política de desconto",
            descricao:
              "Escreva uma política de desconto em uma frase: \"máximo X%, apenas para Y, com aprovação de Z\". Comunique ao time.",
          },
        ],
      },
      {
        label: "Dias 61–90: Consolidar",
        acoes: [
          {
            titulo: "Primeira reunião financeira mensal",
            descricao:
              "Faça sua primeira reunião mensal financeira estruturada. Mesmo sozinho: olhe DRE, fluxo de caixa, margem. Anote 3 decisões.",
          },
          {
            titulo: "Auditar as surpresas dos 60 dias",
            descricao:
              "Compare o realizado dos 60 dias com o que você imaginava e anote as 3 maiores surpresas.",
          },
          {
            titulo: "Forçar análise antes da próxima decisão",
            descricao:
              "Escolha a próxima decisão financeira que teria tomado por instinto e force uma análise de 3 cenários antes. Cronometre quanto tempo levou. Vai ficar mais rápido.",
          },
        ],
      },
    ],
  },
  improviso: {
    titulo_plano: "Plano para sair do improviso",
    fases: [
      {
        label: "Dias 1–30: Diagnosticar",
        acoes: [
          {
            titulo: "Auditar e fechar a DRE no prazo",
            descricao:
              "Audite sua DRE gerencial: ela reflete a realidade? Se não, ajuste até que o resultado bata com o que você vê no banco. Comprometa-se a fechar até o 10º dia útil todo mês.",
          },
          {
            titulo: "Margem dos 3 principais produtos",
            descricao:
              "Calcule a margem de contribuição dos seus 3 principais produtos ou serviços. Se não souber o custo direto completo (com tempo de pessoas), esse é o cálculo que falta.",
          },
          {
            titulo: "Calcular CAC e comparar com ticket",
            descricao:
              "Faça a conta do CAC: some tudo que gastou com vendas e marketing no último trimestre, divida pelo número de clientes novos. Compare com o ticket médio.",
          },
        ],
      },
      {
        label: "Dias 31–60: Estruturar",
        acoes: [
          {
            titulo: "Projetar receita de 90 dias",
            descricao:
              "Crie uma projeção de receita para os próximos 90 dias com base no que é contratual, recorrente e em pipeline. Diferencie o que é previsível do que é esperança.",
          },
          {
            titulo: "Reprecificar um produto pelo método",
            descricao:
              "Reveja o preço de um produto ou serviço usando custo + margem-alvo + valor percebido. Se a margem real estiver abaixo de 40%, investigue antes de vender mais.",
          },
          {
            titulo: "Formalizar política de descontos",
            descricao:
              "Formalize a política de descontos e comunique ao time. Monitore por 30 dias se está sendo cumprida.",
          },
        ],
      },
      {
        label: "Dias 61–90: Consolidar",
        acoes: [
          {
            titulo: "Implantar rito mensal financeiro",
            descricao:
              "Implante rito mensal de gestão financeira: fechamento, análise, decisão, revisão de projeção. Bloqueie na agenda como compromisso inegociável.",
          },
          {
            titulo: "Montar orçamento de 6 meses",
            descricao:
              "Monte um orçamento projetado para os próximos 6 meses (mesmo que simplificado). Compare com o realizado no primeiro mês e analise as variações.",
          },
          {
            titulo: "Encontrar voz externa qualificada",
            descricao:
              "Identifique uma pessoa externa qualificada (consultor, mentor, ex-CFO) pra conversar mensalmente sobre seus números. Agende a primeira conversa.",
          },
        ],
      },
    ],
  },
  base_sem_metodo: {
    titulo_plano: "Plano para instalar o método",
    fases: [
      {
        label: "Dias 1–30: Diagnosticar",
        acoes: [
          {
            titulo: "Cruzar DRE com orçamento",
            descricao:
              "Cruze sua DRE gerencial com o orçamento projetado. Analise as 5 maiores variações (positivas e negativas). Entenda o que causou cada uma.",
          },
          {
            titulo: "Mapear margem por cliente",
            descricao:
              "Mapeie a margem de contribuição por cliente (pelo menos os 10 maiores). Identifique os que estão abaixo da margem-alvo e defina ação (reprecificar, renegociar, desligar).",
          },
          {
            titulo: "Conectar forecast comercial ao caixa",
            descricao:
              "Conecte o forecast de vendas com o fluxo de caixa. O pipeline do CRM deve alimentar a projeção financeira, não viver separado.",
          },
        ],
      },
      {
        label: "Dias 31–60: Estruturar",
        acoes: [
          {
            titulo: "Revisar política de reajuste",
            descricao:
              "Revise sua política de reajuste de preços. Se não tem calendário anual, crie um. Se tem, verifique se a última revisão considerou margem, mix e elasticidade (não só IPCA).",
          },
          {
            titulo: "Modelar simulação de contratação",
            descricao:
              "Monte um modelo de simulação de contratação: custo total (salário + encargos + onboarding) × 6 meses vs. receita incremental esperada. Use antes da próxima contratação.",
          },
          {
            titulo: "Indicador de capacidade vs. ocupação",
            descricao:
              "Implante indicador formal de capacidade vs. ocupação na operação. Não precisa ser complexo: quantas entregas o time faz por mês vs. quantas poderia fazer.",
          },
        ],
      },
      {
        label: "Dias 61–90: Consolidar",
        acoes: [
          {
            titulo: "Revisão formal do orçamento",
            descricao:
              "Faça revisão formal do orçamento (realizado vs. projetado) com análise de variação por linha. Ajuste premissas para o próximo trimestre.",
          },
          {
            titulo: "Auditar consistência do rito mensal",
            descricao:
              "Avalie se seu rito de gestão financeira mensal está rodando com consistência nos últimos 3 meses. Se parou em algum mês, identifique o que fez parar e corrija o processo.",
          },
          {
            titulo: "Decidir sobre conselheiro financeiro",
            descricao:
              "Defina se faz sentido formalizar um conselheiro financeiro externo com cadência fixa. Se a resposta for \"talvez\", provavelmente a resposta é sim.",
          },
        ],
      },
    ],
  },
  madura: {
    titulo_plano: "Plano para alcançar excelência",
    fases: [
      {
        label: "Dias 1–30: Diagnosticar",
        acoes: [
          {
            titulo: "Auditar premissas com olhar externo",
            descricao:
              "Audite suas premissas de orçamento: quando foi a última vez que alguém de fora questionou se as premissas de crescimento, custo e margem ainda fazem sentido? Se faz mais de 6 meses, estão vencidas.",
          },
          {
            titulo: "Precificação por valor percebido",
            descricao:
              "Analise sua precificação por valor percebido, não só por custo. Quanto do seu preço está ancorado no custo e quanto está ancorado no valor que o cliente percebe? Se a resposta for \"mais no custo\", há margem pra capturar.",
          },
          {
            titulo: "Estressar concentração de receita",
            descricao:
              "Revise a concentração de receita: mesmo que esteja abaixo de 30%, simule o cenário de perda dos 2 maiores clientes. O caixa aguenta 6 meses? Se não, é risco mesmo sendo improvável.",
          },
        ],
      },
      {
        label: "Dias 31–60: Estruturar",
        acoes: [
          {
            titulo: "Modelar cenários para 12 meses",
            descricao:
              "Monte um modelo de cenários (otimista, realista, pessimista) para o próximo ano. Inclua variáveis de receita, custo, margem e caixa. Use como base para decisões de investimento.",
          },
          {
            titulo: "Atacar 3 clientes de menor margem",
            descricao:
              "Identifique os 3 clientes com menor margem de contribuição entre seus 20 maiores. Defina ação: reprecificar, redesenhar escopo, ou desligar com plano de transição.",
          },
          {
            titulo: "Formalizar conselho consultivo",
            descricao:
              "Formalize um board advisory ou conselho consultivo com pelo menos 1 pessoa de perfil financeiro. Defina cadência (mensal ou bimestral), pauta mínima e formato.",
          },
        ],
      },
      {
        label: "Dias 61–90: Consolidar",
        acoes: [
          {
            titulo: "Submeter próxima decisão ao conselho",
            descricao:
              "Na próxima decisão estratégica relevante (M&A, novo produto, novo mercado, captação), submeta a análise ao conselheiro antes de decidir. Registre o que mudou após o questionamento.",
          },
          {
            titulo: "Implantar rolling forecast trimestral",
            descricao:
              "Implante revisão trimestral de premissas do orçamento com visão de 12 meses rolling. O orçamento anual estático é v1. O rolling forecast é o próximo nível.",
          },
          {
            titulo: "Construir autonomia de governança",
            descricao:
              "Avalie se sua estrutura de governança está preparada pra funcionar sem você por 30 dias. Se não está, o próximo projeto é construir essa autonomia. Empresa que depende do dono pra decidir é empresa com teto.",
          },
        ],
      },
    ],
  },
};
