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
    faixa_critico: {
      score_significa: "Sua precificação e sua dinâmica de receita não estão sustentando a operação com segurança. Você pode estar vendendo, mas sem clareza sobre margem real por oferta.",
      por_tras_disso: "Normalmente isso acontece quando preço nasce da pressão comercial, sem modelo de custo, sem política de desconto e sem revisão periódica por canal e perfil de cliente.",
      custo_ignorar: "Sem corrigir isso, a empresa cresce faturamento enquanto destrói rentabilidade. O efeito aparece em caixa pressionado, esforço alto e retorno baixo ao longo dos trimestres.",
    },
    faixa_fragil: {
      score_significa: "Você tem alguma estrutura de preço e receita, mas ainda com lacunas de método e disciplina. Parte das decisões depende de exceções e negociação caso a caso.",
      por_tras_disso: "Em geral falta um critério único para margem mínima, limites de desconto e acompanhamento por tipo de cliente. Isso cria variação grande no resultado mensal.",
      custo_ignorar: "O risco é consolidar uma operação comercial que parece saudável no topo do funil, mas entrega resultado inconsistente no caixa e reduz capacidade de investimento.",
    },
    faixa_construcao: {
      score_significa: "Sua empresa já tem base de precificação e acompanhamento de receita, com sinais de maturidade acima da média. Ainda há espaço para integração fina entre comercial e finanças.",
      por_tras_disso: "Nessa fase, o principal gargalo costuma ser governança de decisões excepcionais e análise contínua de margem por produto, pacote, canal e carteira.",
      custo_ignorar: "Sem consolidar esse método, você mantém boa performance, mas deixa captura de margem na mesa e adia ganhos relevantes de previsibilidade para escalar com segurança.",
    },
    faixa_maduro: {
      score_significa: "Você opera com precificação e gestão de receita maduras, com boa leitura de valor, margem e posicionamento. Isso coloca a empresa em patamar competitivo forte.",
      por_tras_disso: "Esse nível normalmente vem de disciplina em dados, revisão periódica de tese comercial e alinhamento entre metas de crescimento e qualidade de receita.",
      custo_ignorar: "O custo de não evoluir agora é de oportunidade. Você preserva o resultado atual, mas pode perder eficiência estratégica e velocidade de captura de valor em novos ciclos.",
    },
  },

  // =========================================================================
  // ÁREA 3 — Vendas & Previsibilidade (A PRODUZIR)
  // =========================================================================
  vendas_previsibilidade: {
    faixa_critico: {
      score_significa: "Seu processo de vendas ainda não gera previsibilidade confiável. O resultado depende de esforço pontual e variação alta entre meses.",
      por_tras_disso: "Geralmente faltam critérios objetivos de pipeline, cadência comercial e forecast com hipóteses claras. Sem isso, decisão vira reação.",
      custo_ignorar: "A empresa fica exposta a ciclos de estresse: meses fortes seguidos de buracos de receita, prejudicando caixa, time e planejamento operacional.",
    },
    faixa_fragil: {
      score_significa: "Você já acompanha parte do funil e da conversão, mas sem estabilidade suficiente para antecipar resultado com confiança executiva.",
      por_tras_disso: "A origem costuma estar em dados incompletos de CRM, rituais irregulares de revisão e ausência de metas por etapa do funil.",
      custo_ignorar: "Sem ajuste, o crescimento continua possível, porém com baixa previsibilidade. Isso encarece aquisição e reduz qualidade da tomada de decisão.",
    },
    faixa_construcao: {
      score_significa: "Seu modelo comercial mostra base consistente de previsibilidade e controle de pipeline. Há maturidade operacional em construção.",
      por_tras_disso: "Neste estágio, o avanço depende de melhorar precisão do forecast, separar cenários e conectar metas comerciais à capacidade de entrega.",
      custo_ignorar: "Se parar aqui, você mantém estabilidade, mas limita potencial de escala e corre risco de desalinhamento entre venda, operação e margem.",
    },
    faixa_maduro: {
      score_significa: "Sua operação de vendas é previsível, estruturada e orientada por dados. O negócio consegue planejar crescimento com maior segurança.",
      por_tras_disso: "Isso costuma refletir processo comercial padronizado, indicadores confiáveis e liderança com disciplina de execução e revisão contínua.",
      custo_ignorar: "O próximo salto vem de sofisticação estratégica. Sem evoluir, o sistema permanece bom, mas deixa ganhos de eficiência e expansão em aberto.",
    },
  },

  // =========================================================================
  // ÁREA 4 — Operação & Margem (A PRODUZIR)
  // =========================================================================
  operacao_margem: {
    faixa_critico: {
      score_significa: "Sua operação ainda consome recursos sem controle adequado de eficiência e margem. O esforço do time não se converte totalmente em resultado.",
      por_tras_disso: "Normalmente faltam padrões de processo, leitura clara de custos por atividade e rotina de eliminação de retrabalho e desperdício.",
      custo_ignorar: "O risco é crescer com estrutura pesada e margem comprimida, comprometendo caixa e reduzindo capacidade de reinvestimento no próprio negócio.",
    },
    faixa_fragil: {
      score_significa: "Há sinais de organização operacional, mas com variação relevante de produtividade e margem entre períodos ou frentes.",
      por_tras_disso: "Frequentemente isso vem de processos parcialmente documentados, indicadores pouco acionáveis e baixa integração entre operação e finanças.",
      custo_ignorar: "Sem consolidação, a empresa mantém desempenho irregular e perde oportunidades de ganho rápido de eficiência com impacto direto no lucro.",
    },
    faixa_construcao: {
      score_significa: "Sua operação já apresenta padrões e controle que sustentam margem com mais consistência. A base para escalar está formada.",
      por_tras_disso: "Nesta fase, o avanço vem de refinamento: medir melhor gargalos, padronizar exceções e reforçar gestão por indicadores críticos de margem.",
      custo_ignorar: "O custo de não avançar é de produtividade. Você preserva resultado atual, mas reduz velocidade de evolução e proteção contra oscilações.",
    },
    faixa_maduro: {
      score_significa: "Você tem operação madura e orientada a eficiência, com controle consistente de margem e disciplina de execução.",
      por_tras_disso: "Esse nível costuma resultar de liderança operacional forte, governança de processos e integração contínua entre dados de custo e decisão.",
      custo_ignorar: "A oportunidade agora está em otimização avançada. Sem isso, o sistema segue sólido, mas abre espaço para concorrentes mais eficientes.",
    },
  },

  // =========================================================================
  // ÁREA 5 — Governança & Decisão (A PRODUZIR)
  // =========================================================================
  governanca_decisao: {
    faixa_critico: {
      score_significa: "A governança de decisão ainda é centralizada e reativa. A empresa depende de poucas pessoas para resolver temas críticos.",
      por_tras_disso: "Isso ocorre quando faltam ritos executivos, critérios formais de prioridade e registro de decisões com responsáveis e prazos.",
      custo_ignorar: "Sem governança, o negócio perde velocidade e qualidade de execução. O custo aparece em retrabalho, conflitos e decisões tardias.",
    },
    faixa_fragil: {
      score_significa: "Você já tem elementos de governança, mas ainda sem consistência para sustentar decisões estratégicas de forma previsível.",
      por_tras_disso: "Geralmente existem reuniões e indicadores, porém sem cadência rigorosa, accountability clara e revisão estruturada de desvios.",
      custo_ignorar: "O risco é manter a empresa funcionando com atrito oculto. A operação anda, mas com perda de foco e baixa tração em prioridades.",
    },
    faixa_construcao: {
      score_significa: "Sua governança evoluiu e já permite decisões mais qualificadas, com melhor coordenação entre áreas e prioridades.",
      por_tras_disso: "Neste estágio, o próximo nível depende de fortalecer qualidade da discussão estratégica, contestação de premissas e aprendizado por ciclo.",
      custo_ignorar: "Sem esse avanço, a empresa estabiliza em um bom patamar, mas limita profundidade das decisões e potencial de crescimento composto.",
    },
    faixa_maduro: {
      score_significa: "Sua empresa opera com governança madura, decisões rastreáveis e boa disciplina executiva. Há clareza de prioridades e responsabilidade.",
      por_tras_disso: "Esse resultado costuma vir de liderança com método, rituais consistentes e cultura de decisão baseada em dados e contexto.",
      custo_ignorar: "O próximo ganho é de excelência estratégica. Se não evoluir, você protege o padrão atual, mas deixa valor de longo prazo sem capturar.",
    },
  },
} as const;
