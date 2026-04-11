import type { AreaId } from "./areas";

export interface Alternativa {
  readonly id: string;
  readonly texto: string;
  readonly pontos: 0 | 3 | 7 | 10;
}

export interface Pergunta {
  readonly id: string;
  readonly numero: number;
  readonly area_id: AreaId;
  readonly enunciado: string;
  readonly alternativas: readonly [Alternativa, Alternativa, Alternativa, Alternativa];
  readonly tags_produto: readonly string[];
}

export const PERGUNTAS: readonly Pergunta[] = [
  // =========================================================================
  // ÁREA 1 — Gestão Financeira & Caixa (peso 30%)
  // =========================================================================
  {
    id: "p1",
    numero: 1,
    area_id: "gestao_financeira",
    enunciado:
      "Em qual dia útil do mês você consegue olhar a DRE gerencial fechada do mês anterior — não a contábil do contador, mas a que você usa pra decidir?",
    alternativas: [
      { id: "p1_a", texto: "Não tenho DRE gerencial, só a do contador (que chega tarde)", pontos: 0 },
      { id: "p1_b", texto: "Tenho, mas só fica pronta depois do dia 20", pontos: 3 },
      { id: "p1_c", texto: "Tenho, fica pronta entre o dia 10 e o dia 20", pontos: 7 },
      { id: "p1_d", texto: "Tenho, fechada até o 5º dia útil, com análise de variação", pontos: 10 },
    ],
    tags_produto: ["compass", "controladoria_gerencial"],
  },
  {
    id: "p2",
    numero: 2,
    area_id: "gestao_financeira",
    enunciado:
      "Se eu te perguntar agora qual será seu saldo de caixa daqui a 60 dias, você consegue responder com precisão?",
    alternativas: [
      { id: "p2_a", texto: "Não, eu olho o saldo do banco quando preciso", pontos: 0 },
      { id: "p2_b", texto: "Tenho uma noção, mas é mais sentimento que projeção", pontos: 3 },
      { id: "p2_c", texto: "Tenho uma planilha de fluxo de caixa que atualizo às vezes", pontos: 7 },
      { id: "p2_d", texto: "Tenho fluxo de caixa projetado e revisado semanalmente", pontos: 10 },
    ],
    tags_produto: ["compass", "planejamento_orcamentario"],
  },
  {
    id: "p3",
    numero: 3,
    area_id: "gestao_financeira",
    enunciado:
      "Como funciona a relação entre seu dinheiro pessoal e o da empresa?",
    alternativas: [
      { id: "p3_a", texto: "Tiro do caixa o que preciso, sem regra fixa", pontos: 0 },
      { id: "p3_b", texto: "Tenho um pró-labore, mas faço retiradas extras quando aperta", pontos: 3 },
      { id: "p3_c", texto: "Pró-labore fixo e raramente misturo", pontos: 7 },
      { id: "p3_d", texto: "Pró-labore + distribuição de lucros formalizada com base no resultado", pontos: 10 },
    ],
    tags_produto: ["conselho_consultivo", "compass"],
  },
  {
    id: "p4",
    numero: 4,
    area_id: "gestao_financeira",
    enunciado:
      "Quais indicadores financeiros você acompanha mensalmente pra tomar decisão?",
    alternativas: [
      { id: "p4_a", texto: "Olho só o saldo do banco", pontos: 0 },
      { id: "p4_b", texto: "Faturamento e algumas despesas grandes", pontos: 3 },
      { id: "p4_c", texto: "Faturamento, custo, margem bruta e resultado", pontos: 7 },
      { id: "p4_d", texto: "Tenho painel mensal: receita, margem de contribuição, EBITDA, caixa projetado, variação vs. orçado", pontos: 10 },
    ],
    tags_produto: ["compass", "planejamento_orcamentario"],
  },

  // =========================================================================
  // ÁREA 2 — Precificação & Receita (peso 25%)
  // =========================================================================
  {
    id: "p5",
    numero: 5,
    area_id: "precificacao_receita",
    enunciado:
      "Como você definiu o preço do seu principal produto/serviço?",
    alternativas: [
      { id: "p5_a", texto: "Olhei o concorrente e cobrei parecido", pontos: 0 },
      { id: "p5_b", texto: "Calculei custo + uma margem que pareceu razoável", pontos: 3 },
      { id: "p5_c", texto: "Custo + margem, mas considerei valor percebido e ICP", pontos: 7 },
      { id: "p5_d", texto: "Tenho metodologia formal: custo, valor percebido, posicionamento, elasticidade", pontos: 10 },
    ],
    tags_produto: ["mentoria_precificacao", "compass"],
  },
  {
    id: "p6",
    numero: 6,
    area_id: "precificacao_receita",
    enunciado:
      "Você sabe a margem de contribuição real (em %) do seu principal produto/serviço?",
    alternativas: [
      { id: "p6_a", texto: "Não sei o que é margem de contribuição", pontos: 0 },
      { id: "p6_b", texto: "Sei o conceito, mas não calculei pro meu negócio", pontos: 3 },
      { id: "p6_c", texto: "Sei aproximadamente, mas não tenho número exato", pontos: 7 },
      { id: "p6_d", texto: "Sei com precisão e revisito periodicamente", pontos: 10 },
    ],
    tags_produto: ["mentoria_precificacao", "compass"],
  },
  {
    id: "p7",
    numero: 7,
    area_id: "precificacao_receita",
    enunciado:
      "Como funcionam os descontos na sua empresa?",
    alternativas: [
      { id: "p7_a", texto: "Cada vendedor (ou eu) decide na hora pra fechar", pontos: 0 },
      { id: "p7_b", texto: "Existe um teto, mas é flexível", pontos: 3 },
      { id: "p7_c", texto: "Existe regra clara de até quanto e em que situação", pontos: 7 },
      { id: "p7_d", texto: "Desconto é exceção formal, com aprovação e registro do impacto na margem", pontos: 10 },
    ],
    tags_produto: ["compass", "conselho_consultivo"],
  },
  {
    id: "p8",
    numero: 8,
    area_id: "precificacao_receita",
    enunciado:
      "Quando foi a última vez que você reajustou seus preços de forma estruturada?",
    alternativas: [
      { id: "p8_a", texto: "Nunca reajustei ou faz mais de 2 anos", pontos: 0 },
      { id: "p8_b", texto: "Reajustei no último ano, mas foi pelo IPCA, sem análise", pontos: 3 },
      { id: "p8_c", texto: "Reajustei com base em custos e margem, mas sem método formal", pontos: 7 },
      { id: "p8_d", texto: "Tenho política anual de reajuste com análise de margem, mix e elasticidade", pontos: 10 },
    ],
    tags_produto: ["mentoria_precificacao", "compass"],
  },

  // =========================================================================
  // ÁREA 3 — Vendas & Previsibilidade (peso 15%)
  // =========================================================================
  {
    id: "p9",
    numero: 9,
    area_id: "vendas_previsibilidade",
    enunciado:
      "Você consegue projetar com confiança a receita dos próximos 90 dias?",
    alternativas: [
      { id: "p9_a", texto: "Não — depende do que entrar no mês", pontos: 0 },
      { id: "p9_b", texto: "Tenho uma estimativa baseada em média histórica", pontos: 3 },
      { id: "p9_c", texto: "Projeto com base em pipeline + recorrência, com margem de erro razoável", pontos: 7 },
      { id: "p9_d", texto: "Projeto com base em funil estruturado, taxas de conversão e contratos firmados", pontos: 10 },
    ],
    tags_produto: ["compass", "planejamento_orcamentario"],
  },
  {
    id: "p10",
    numero: 10,
    area_id: "vendas_previsibilidade",
    enunciado:
      "Qual % da sua receita vem dos seus 5 maiores clientes?",
    alternativas: [
      { id: "p10_a", texto: "Mais de 70%", pontos: 0 },
      { id: "p10_b", texto: "Entre 50% e 70%", pontos: 3 },
      { id: "p10_c", texto: "Entre 30% e 50%", pontos: 7 },
      { id: "p10_d", texto: "Menos de 30%", pontos: 10 },
    ],
    tags_produto: ["conselho_consultivo", "planejamento_estrategico"],
  },
  {
    id: "p11",
    numero: 11,
    area_id: "vendas_previsibilidade",
    enunciado:
      "Quanto da sua receita vem de canais previsíveis (recorrência, contrato, funil ativo) vs. indicação/sorte?",
    alternativas: [
      { id: "p11_a", texto: "Praticamente tudo é indicação ou cliente que aparece", pontos: 0 },
      { id: "p11_b", texto: "Metade vem de canal previsível, metade é orgânico", pontos: 3 },
      { id: "p11_c", texto: "A maioria vem de canal previsível, mas ainda dependo de indicação", pontos: 7 },
      { id: "p11_d", texto: "Quase toda receita vem de canal mensurável e previsível", pontos: 10 },
    ],
    tags_produto: ["compass", "planejamento_estrategico"],
  },
  {
    id: "p12",
    numero: 12,
    area_id: "vendas_previsibilidade",
    enunciado:
      "Você sabe quanto custa, em reais, conquistar um cliente novo?",
    alternativas: [
      { id: "p12_a", texto: "Não faço ideia", pontos: 0 },
      { id: "p12_b", texto: "Tenho uma noção grosseira", pontos: 3 },
      { id: "p12_c", texto: "Sei aproximadamente e comparo com o ticket", pontos: 7 },
      { id: "p12_d", texto: "Sei com precisão e acompanho CAC vs. LTV mensalmente", pontos: 10 },
    ],
    tags_produto: ["compass", "mentoria_precificacao"],
  },

  // =========================================================================
  // ÁREA 4 — Operação & Margem (peso 15%)
  // =========================================================================
  {
    id: "p13",
    numero: 13,
    area_id: "operacao_margem",
    enunciado:
      "Você sabe quanto custa, em reais, entregar uma unidade do seu serviço/produto — incluindo o tempo das pessoas envolvidas?",
    alternativas: [
      { id: "p13_a", texto: "Não faço ideia", pontos: 0 },
      { id: "p13_b", texto: "Tenho uma estimativa, mas sem incluir mão de obra direta", pontos: 3 },
      { id: "p13_c", texto: "Sei, incluindo custo direto de pessoas", pontos: 7 },
      { id: "p13_d", texto: "Sei com precisão, incluindo custo indireto rateado", pontos: 10 },
    ],
    tags_produto: ["controladoria_gerencial", "compass"],
  },
  {
    id: "p14",
    numero: 14,
    area_id: "operacao_margem",
    enunciado:
      "Você consegue dizer hoje quais dos seus clientes dão mais lucro e quais dão prejuízo?",
    alternativas: [
      { id: "p14_a", texto: "Não tenho essa visão", pontos: 0 },
      { id: "p14_b", texto: "Tenho noção pelos comentários do time, mas sem número", pontos: 3 },
      { id: "p14_c", texto: "Sei aproximadamente, com base em ticket vs. esforço", pontos: 7 },
      { id: "p14_d", texto: "Tenho margem por cliente calculada e revisada periodicamente", pontos: 10 },
    ],
    tags_produto: ["controladoria_gerencial", "conselho_consultivo"],
  },
  {
    id: "p15",
    numero: 15,
    area_id: "operacao_margem",
    enunciado:
      "Você sabe qual é a capacidade máxima de atendimento da sua operação atual e quanto dela está ocupada?",
    alternativas: [
      { id: "p15_a", texto: "Não, vou contratando quando aperta", pontos: 0 },
      { id: "p15_b", texto: "Tenho noção, mas não é número", pontos: 3 },
      { id: "p15_c", texto: "Sei a capacidade e a ocupação atual de forma aproximada", pontos: 7 },
      { id: "p15_d", texto: "Tenho indicador formal de capacidade vs. ocupação por operador", pontos: 10 },
    ],
    tags_produto: ["compass", "planejamento_orcamentario"],
  },
  {
    id: "p16",
    numero: 16,
    area_id: "operacao_margem",
    enunciado:
      "Quando você precisa decidir contratar alguém, quanto tempo leva pra simular o impacto da contratação no caixa e na margem?",
    alternativas: [
      { id: "p16_a", texto: "Não simulo — contrato e vejo no que dá", pontos: 0 },
      { id: "p16_b", texto: "Levo dias, junto com o contador, e ainda fico inseguro", pontos: 3 },
      { id: "p16_c", texto: "Tenho uma planilha que me ajuda, mas é manual", pontos: 7 },
      { id: "p16_d", texto: "Simulo em minutos, com modelo de cenários e impacto em caixa, DRE e margem", pontos: 10 },
    ],
    tags_produto: ["compass", "planejamento_orcamentario"],
  },

  // =========================================================================
  // ÁREA 5 — Governança & Decisão (peso 15%)
  // =========================================================================
  {
    id: "p17",
    numero: 17,
    area_id: "governanca_decisao",
    enunciado:
      "Com que frequência você (e seu time) sentam pra olhar os números do negócio de forma estruturada?",
    alternativas: [
      { id: "p17_a", texto: "Praticamente nunca", pontos: 0 },
      { id: "p17_b", texto: "Quando aperta o caixa ou estoura algo", pontos: 3 },
      { id: "p17_c", texto: "Mensalmente, mas informalmente", pontos: 7 },
      { id: "p17_d", texto: "Tenho rito mensal formal: fechamento → análise → decisão → revisão de orçamento", pontos: 10 },
    ],
    tags_produto: ["compass", "mentoria_compass"],
  },
  {
    id: "p18",
    numero: 18,
    area_id: "governanca_decisao",
    enunciado:
      "Quando você precisa tomar uma decisão financeira ou estratégica grande, quem te questiona antes?",
    alternativas: [
      { id: "p18_a", texto: "Decido sozinho", pontos: 0 },
      { id: "p18_b", texto: "Converso com sócio ou alguém do time, mas ninguém com olhar técnico de fora", pontos: 3 },
      { id: "p18_c", texto: "Tenho mentor ou consultor pontual, mas sem regularidade", pontos: 7 },
      { id: "p18_d", texto: "Tenho conselheiro/conselho consultivo que me questiona com cadência fixa", pontos: 10 },
    ],
    tags_produto: ["conselho_consultivo_financeiro"],
  },
  {
    id: "p19",
    numero: 19,
    area_id: "governanca_decisao",
    enunciado:
      "Você tem um orçamento anual com premissas claras e revisado mensalmente vs. o realizado?",
    alternativas: [
      { id: "p19_a", texto: "Não tenho orçamento", pontos: 0 },
      { id: "p19_b", texto: "Faço no início do ano e nunca mais olho", pontos: 3 },
      { id: "p19_c", texto: "Tenho e olho às vezes, mas não há revisão estruturada", pontos: 7 },
      { id: "p19_d", texto: "Tenho orçamento vivo, com revisão mensal, análise de variação e ajuste de premissas", pontos: 10 },
    ],
    tags_produto: ["planejamento_orcamentario", "compass"],
  },
  {
    id: "p20",
    numero: 20,
    area_id: "governanca_decisao",
    enunciado:
      "Pensa nas suas 3 últimas decisões grandes (contratação, investimento, novo produto, corte). Quantas tiveram análise financeira formal antes?",
    alternativas: [
      { id: "p20_a", texto: "Nenhuma — decidi pelo instinto", pontos: 0 },
      { id: "p20_b", texto: "Uma", pontos: 3 },
      { id: "p20_c", texto: "Duas", pontos: 7 },
      { id: "p20_d", texto: "Todas as três", pontos: 10 },
    ],
    tags_produto: ["conselho_consultivo", "compass"],
  },
] as const;
