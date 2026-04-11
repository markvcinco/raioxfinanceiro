import type { AreaId } from "./areas";

export interface CopyFaixa {
  readonly score_significa: string;
  readonly por_tras_disso: string;
  readonly custo_ignorar: string;
}

export interface CopyArea {
  readonly faixa_critico: CopyFaixa;
  readonly faixa_fragil: CopyFaixa;
  readonly faixa_construcao: CopyFaixa;
  readonly faixa_maduro: CopyFaixa;
}

const PLACEHOLDER: CopyFaixa = {
  score_significa: "A PRODUZIR",
  por_tras_disso: "A PRODUZIR",
  custo_ignorar: "A PRODUZIR",
};

export const COPY_AREAS: Record<AreaId, CopyArea> = {
  // =========================================================================
  // ÁREA 1 — Gestão Financeira & Caixa
  // =========================================================================
  gestao_financeira: {
    faixa_critico: {
      score_significa:
        "Sua empresa opera no escuro do ponto de vista financeiro. Você não tem DRE gerencial confiável, não sabe quanto vai ter de caixa daqui a 60 dias, e não tem indicadores rodando além do saldo do banco. Toda decisão grande que você tomou nos últimos 12 meses (contratação, investimento, preço, corte) foi por instinto. Pode ter dado certo. Mas isso é sorte misturada com trabalho duro, não gestão.",
      por_tras_disso:
        "Quase nunca é falta de capacidade, é falta de prioridade. Empresas nessa faixa geralmente cresceram rápido demais pra parar e organizar a parte financeira. O dono virou o gargalo de tudo: vende, entrega, contrata, paga, decide. Como o caixa ainda paga as contas no fim do mês, a sensação é de que dá pra resolver depois. O problema é que esse \"depois\" costuma chegar na forma de uma surpresa ruim.",
      custo_ignorar:
        "O custo de operar sem visibilidade não aparece como prejuízo no fim do mês. Aparece como decisão errada que custou caro seis meses depois. Uma contratação que não cabia no caixa. Um desconto que comeu a margem. Um produto novo que parecia bom e estava drenando dinheiro. Empresas nessa faixa quase nunca quebram por falta de receita. Quebram por falta de visibilidade pra perceber a tempo.",
    },
    faixa_fragil: {
      score_significa:
        "Você tem alguma visibilidade financeira, mas ela é parcial e desorganizada. Talvez exista uma DRE, mas ela chega tarde. Talvez exista uma planilha de fluxo de caixa, mas ela não é atualizada com disciplina. Talvez você acompanhe alguns números, mas eles não conversam entre si. Sua gestão financeira existe como pedaços soltos, não como sistema. E sistema solto não sustenta crescimento.",
      por_tras_disso:
        "Empresas nessa faixa quase sempre já tentaram organizar o financeiro pelo menos uma vez. Contrataram um contador melhor, compraram um sistema, fizeram uma planilha que dessa vez ia funcionar, colocaram alguém pra cuidar. Sem método e sem rito, qualquer ferramenta vira só mais uma aba aberta. O problema raramente é a ferramenta. É a ausência de um processo financeiro que transforma número em decisão repetidamente, todo mês, sem depender de motivação.",
      custo_ignorar:
        "O custo aqui é mais sutil. Você acha que está no controle, e não está. Tem alguns números, então toma decisões achando que elas são informadas, mas essas decisões estão sendo alimentadas por dados parciais ou desatualizados. É a pior posição possível: a confiança é alta, a base é fraca. Empresas nessa faixa costumam descobrir o tamanho do buraco só quando precisam de capital de giro, ou quando fazem um valuation pra captar, ou quando vendem a empresa e percebem que valeria muito mais se tivessem cuidado disso antes.",
    },
    faixa_construcao: {
      score_significa:
        "Você tem o básico da gestão financeira rodando. DRE gerencial existe, fluxo de caixa é atualizado com alguma cadência, você acompanha indicadores além do saldo bancário, e há separação minimamente clara entre PJ e PF. Isso já coloca sua empresa acima da maioria das PMEs do Brasil. O que falta agora não é mais implantar, é integrar. Os pedaços existem, só que ainda não formam um sistema único de gestão. Você olha número por curiosidade, não por método.",
      por_tras_disso:
        "Essa é a fase mais frustrante da maturidade financeira de uma PME. Você sabe que dá pra mais, só não sabe onde está travando. Quase sempre o que está faltando é rito. O momento fixo do mês em que os números são olhados de forma estruturada, com perguntas certas, gerando decisões registradas. Sem rito, mesmo a melhor controladoria do mundo vira só relatório bonito que ninguém usa. Empresas nessa faixa têm o \"o quê\". Falta o \"quando\", o \"como\" e o \"com quem\".",
      custo_ignorar:
        "O risco nessa faixa não é quebrar. É ficar travado no mesmo nível por anos. Sua empresa cresce, a gestão não acompanha. Você passa a faturar mais, mas trabalha mais pra ganhar a mesma proporção. A margem não melhora. As decisões não ficam mais rápidas. E você continua sendo o gargalo de todas as decisões financeiras, porque não construiu um sistema que decida sem você. Empresas que ficam paradas aqui costumam travar no mesmo faturamento por três a cinco anos antes de fazer alguma coisa a respeito.",
    },
    faixa_maduro: {
      score_significa:
        "Você está acima da média do mercado em gestão financeira. Tem DRE gerencial fechada rápido, fluxo de caixa projetado, indicadores integrados, separação formal entre PJ e PF, e provavelmente já usa esses números pra decidir. Isso é raro em PME brasileira. Mais de 80% das empresas do seu porte não chegam nesse nível. Estar acima da média não significa estar pronto pro próximo nível. O salto de gestão financeira boa pra decisão estratégica de alto impacto não é mais técnico. É de olhar externo.",
      por_tras_disso:
        "Empresas nessa faixa quase sempre têm um dono ou CFO que entende de número, que se importa, e que construiu disciplina ao longo dos anos. Isso é o que trouxe você até aqui. A partir desse ponto, o seu próprio domínio sobre o negócio vira o teto. Você conhece tão bem que para de questionar. Suas premissas viram verdades. Os ângulos cegos crescem porque ninguém de fora está olhando. O próximo nível não é mais ferramenta nem mais relatório. É alguém qualificado questionando suas premissas regularmente.",
      custo_ignorar:
        "O custo aqui é o mais invisível de todos. Você toma decisões boas quando poderia estar tomando decisões ótimas. A diferença entre uma decisão de 7 e uma de 9 não aparece no fim do mês. Aparece em três anos, comparando onde você chegou com onde poderia ter chegado. Empresas nessa faixa raramente quebram. Quase todas deixam dinheiro na mesa por falta de um sparring técnico que questione premissas, force cenários alternativos, e tire o dono do isolamento da decisão. É o que separa empresa madura de empresa excepcional.",
    },
  },

  // =========================================================================
  // ÁREA 2 — Precificação & Receita (A PRODUZIR)
  // =========================================================================
  precificacao_receita: {
    faixa_critico: { ...PLACEHOLDER },
    faixa_fragil: { ...PLACEHOLDER },
    faixa_construcao: { ...PLACEHOLDER },
    faixa_maduro: { ...PLACEHOLDER },
  },

  // =========================================================================
  // ÁREA 3 — Vendas & Previsibilidade (A PRODUZIR)
  // =========================================================================
  vendas_previsibilidade: {
    faixa_critico: { ...PLACEHOLDER },
    faixa_fragil: { ...PLACEHOLDER },
    faixa_construcao: { ...PLACEHOLDER },
    faixa_maduro: { ...PLACEHOLDER },
  },

  // =========================================================================
  // ÁREA 4 — Operação & Margem (A PRODUZIR)
  // =========================================================================
  operacao_margem: {
    faixa_critico: { ...PLACEHOLDER },
    faixa_fragil: { ...PLACEHOLDER },
    faixa_construcao: { ...PLACEHOLDER },
    faixa_maduro: { ...PLACEHOLDER },
  },

  // =========================================================================
  // ÁREA 5 — Governança & Decisão (A PRODUZIR)
  // =========================================================================
  governanca_decisao: {
    faixa_critico: { ...PLACEHOLDER },
    faixa_fragil: { ...PLACEHOLDER },
    faixa_construcao: { ...PLACEHOLDER },
    faixa_maduro: { ...PLACEHOLDER },
  },
} as const;
