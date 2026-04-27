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
  // ÁREA 2 — Precificação & Receita
  // =========================================================================
  precificacao_receita: {
    faixa_critico: {
      score_significa:
        "Seu preço foi definido sem cálculo. Você olhou o concorrente, colocou um número que pareceu razoável, e seguiu. Não sabe a margem de contribuição real, não tem política de desconto formalizada, e provavelmente não reajustou com base em análise nos últimos dois anos. Isso significa que toda unidade vendida pode estar gerando menos lucro do que você imagina. Ou pior: pode estar gerando prejuízo disfarçado de faturamento.",
      por_tras_disso:
        "Precificação é a área que mais dono de PME empurra pra baixo do tapete. É desconfortável porque mexer no preço dá medo de perder cliente. Então o preço se torna uma decisão emocional, não técnica. O dono sabe que deveria cobrar mais, mas não tem número que sustente a conversa. Sem margem calculada, sem metodologia, sem política, o preço vira refém do mercado e do vendedor com pressa de fechar.",
      custo_ignorar:
        "Preço errado não quebra a empresa de uma vez. Ele sangra devagar. Você fatura mais, contrata mais, entrega mais, e no fim do mês sobra menos do que deveria. A empresa cresce em receita e encolhe em margem. Empresas nessa faixa costumam descobrir o estrago quando tentam fazer valuation e percebem que o EBITDA não justifica o tamanho da operação.",
    },
    faixa_fragil: {
      score_significa:
        "Você tem alguma noção de custo e margem, mas a precificação ainda é mais improviso do que método. Talvez tenha feito conta de custo + margem uma vez, mas não revisita. Talvez tenha uma ideia da margem bruta, mas não da margem de contribuição real. Os descontos acontecem sem regra fixa, e o reajuste de preços é reativo (quando o custo sobe demais), não estruturado.",
      por_tras_disso:
        "A maioria das empresas nessa faixa fez o básico uma vez e parou. O preço foi calculado num momento, e desde então o negócio mudou (custos subiram, mix mudou, equipe cresceu), mas o preço ficou parado. Falta o hábito de revisitar. E como ninguém reclamou do preço (o cliente nunca reclama quando está pagando pouco), parece que está tudo bem. Não está.",
      custo_ignorar:
        "Cada mês sem revisar preço com método é margem evaporando. Empresas nessa faixa geralmente descobrem que estão deixando entre 5% e 15% de margem na mesa quando finalmente fazem o cálculo direito. Em faturamento de R$ 5M, isso é R$ 250 mil a R$ 750 mil por ano que não virou lucro. E não volta.",
    },
    faixa_construcao: {
      score_significa:
        "Você tem uma base técnica de precificação. Calcula custos, considera margem, e provavelmente já fez pelo menos um reajuste estruturado. O problema é que ainda falta integração: o preço não conversa com o valor percebido pelo cliente, a política de descontos existe mas não é respeitada sempre, e o reajuste não tem calendário fixo. Você sabe o básico, mas não tem método recorrente.",
      por_tras_disso:
        "Empresas nessa faixa quase sempre têm um dono ou gestor que já leu sobre precificação, talvez tenha feito um curso, e aplicou parcialmente. O conhecimento existe, a disciplina não. A precificação virou uma decisão pontual (momento de lançar produto, momento de crise) em vez de um processo contínuo. E o time comercial, sem regra rígida, continua dando desconto na base do \"preciso fechar esse mês\".",
      custo_ignorar:
        "Aqui o custo é de incoerência. Você tem clientes pagando preços diferentes pelo mesmo serviço, vendedores negociando margens diferentes sem saber, e um mix de produtos onde uns subsidiam outros sem ninguém perceber. A empresa parece saudável no faturamento e confusa na DRE. Organizar isso libera margem sem precisar vender mais.",
    },
    faixa_maduro: {
      score_significa:
        "Você tem metodologia de precificação, conhece sua margem de contribuição com precisão, tem política de descontos formal e reajusta com calendário e análise. Isso coloca você numa minoria absoluta entre PMEs. O próximo nível é sofisticar: precificação por valor (não só custo), segmentação de preço por perfil de cliente, e revisão de elasticidade. É onde a precificação deixa de ser defensiva (\"cobrir custos\") e vira ofensiva (\"capturar valor\").",
      por_tras_disso:
        "Empresas nessa faixa geralmente passaram por algum momento que forçou a profissionalização: um consultor que ajudou, uma crise de margem que obrigou, ou um dono que veio de mercado financeiro. O método foi implantado por necessidade e ficou. O risco agora é acomodação. O preço está \"bom\", então ninguém mexe. Mas o mercado muda, os custos mudam, o valor percebido muda. Preço bom hoje pode ser preço medíocre em 18 meses.",
      custo_ignorar:
        "Empresas maduras em precificação perdem dinheiro por não evoluir, não por errar. A diferença entre cobrar pelo custo e cobrar pelo valor pode ser de 20% a 40% no ticket médio. Isso exige olhar externo que questione suas premissas de preço com dados, não com opinião. É exatamente o tipo de conversa que um conselheiro financeiro provoca numa cadência regular.",
    },
  },

  // =========================================================================
  // ÁREA 3 — Vendas & Previsibilidade
  // =========================================================================
  vendas_previsibilidade: {
    faixa_critico: {
      score_significa:
        "Você não consegue projetar a receita do próximo trimestre. Sua empresa vive de indicação, de cliente que aparece, e de esforço do momento. Não há funil estruturado, não há taxa de conversão conhecida, e a concentração de receita é perigosamente alta em poucos clientes. Se dois ou três decidirem sair, o impacto no caixa é imediato e grave.",
      por_tras_disso:
        "A empresa cresceu por competência técnica, não por processo comercial. O dono vende bem porque conhece o produto e tem rede de contato. Mas a venda é artesanal: cada negócio é diferente, cada cliente é tratado na mão, e não existe um processo replicável. Funciona enquanto o dono aguenta. Não escala.",
      custo_ignorar:
        "Sem previsibilidade de receita, toda decisão de investimento (contratar, comprar equipamento, abrir filial) é um palpite. Você não sabe se o caixa vai aguentar porque não sabe quanto vai entrar. Empresas nessa faixa travam no crescimento porque o dono tem medo de investir sem garantia. E com razão: sem visibilidade, o risco é real.",
    },
    faixa_fragil: {
      score_significa:
        "Você tem alguma noção de onde vem a receita, mas a previsibilidade ainda é baixa. Talvez tenha uma estimativa baseada em média histórica, talvez saiba mais ou menos o CAC. A concentração de receita é preocupante e os canais de aquisição misturam previsíveis com sorte. Você não está no escuro total, mas também não enxerga o suficiente pra planejar com confiança.",
      por_tras_disso:
        "A maioria das empresas nessa faixa tem um CRM que ninguém preenche direito, um funil que existe na teoria mas não na prática, e um orçamento de marketing que vai pra onde parece dar resultado, sem medir de verdade. O processo comercial existe como intenção, não como disciplina. O time sabe que deveria anotar, medir, projetar, mas no dia a dia a prioridade é fechar o mês.",
      custo_ignorar:
        "Você toma decisões de custo (contratar vendedor, investir em tráfego) sem saber o retorno real. Cada real investido em aquisição é aposta, não decisão informada. Com o tempo, a empresa gasta mais pra crescer menos, e ninguém sabe identificar onde está o vazamento.",
    },
    faixa_construcao: {
      score_significa:
        "Você projeta receita com alguma base, acompanha o funil, e tem diversificação razoável de clientes e canais. O CAC é pelo menos estimado. Falta ainda a integração disso com o planejamento financeiro. Você sabe quanto vai entrar (mais ou menos), mas não conecta isso com caixa, margem e capacidade de entrega. Vendas e finanças vivem em mundos separados.",
      por_tras_disso:
        "O time comercial tem processo, mas ele não conversa com o financeiro. O forecast existe no CRM, mas não alimenta o fluxo de caixa. O orçamento de marketing tem ROI estimado, mas ninguém cruza com a margem de contribuição por canal. Os dados existem em silos. Ninguém juntou tudo numa visão única de \"quanto entra, quanto custa, quanto sobra\".",
      custo_ignorar:
        "A empresa vende bem mas não sabe se está vendendo certo. Pode estar priorizando clientes de ticket alto com margem baixa, ou investindo pesado em canais que trazem volume mas não trazem lucro. Sem cruzar vendas com finanças, você otimiza receita quando deveria estar otimizando margem.",
    },
    faixa_maduro: {
      score_significa:
        "Você tem funil estruturado, taxas de conversão conhecidas, projeção de receita confiável, diversificação saudável e CAC vs. LTV acompanhado. Sua área comercial funciona como motor previsível. O próximo nível é sofisticar a conexão entre vendas e finanças: projeção de caixa integrada com pipeline, margem de contribuição por canal de aquisição, e simulação de cenários de receita.",
      por_tras_disso:
        "Empresas com maturidade comercial alta geralmente investiram em CRM, treinamento e processo cedo. O desafio agora é que o time comercial virou uma máquina eficiente que ninguém questiona. \"Está funcionando\" vira argumento pra não mexer. Mas o mercado muda, os canais saturam, e o que funcionou nos últimos 2 anos pode não funcionar nos próximos 2. Quem questiona isso de fora?",
      custo_ignorar:
        "Quando a previsibilidade de receita é boa, o risco se desloca pra margem. Você sabe quanto vai entrar, mas sabe quanto vai sobrar? A conexão entre forecast comercial e planejamento financeiro é o que transforma crescimento em geração de caixa. Sem isso, receita sobe e caixa não acompanha.",
    },
  },

  // =========================================================================
  // ÁREA 4 — Operação & Margem
  // =========================================================================
  operacao_margem: {
    faixa_critico: {
      score_significa:
        "Você não sabe quanto custa entregar o que vende. Não tem visão de margem por cliente, não conhece a capacidade real da sua operação, e contrata por pressão, não por planejamento. A operação funciona na base do esforço individual. Quando alguém sai, o processo sai junto. Quando a demanda cresce, você apaga incêndio em vez de escalar.",
      por_tras_disso:
        "A operação foi se montando conforme a empresa cresceu. Ninguém parou pra desenhar processo porque não tinha tempo. Cada pessoa criou seu jeito de trabalhar, e com o tempo esses jeitos viraram \"o processo\". O problema é que processo informal não gera dado, e sem dado não tem margem calculada. Você sabe que entrega, mas não sabe a que custo.",
      custo_ignorar:
        "Empresas sem visão de custo operacional quase sempre têm clientes que dão prejuízo sem ninguém saber. O time dedica 40% do esforço pra 10% da receita, e ninguém percebe porque não existe métrica de margem por cliente. Cortar esses clientes (ou reprecificar) pode ser o maior ganho de margem que a empresa vai ter no ano.",
    },
    faixa_fragil: {
      score_significa:
        "Você tem alguma noção dos custos, mas ela é parcial. Talvez saiba o custo direto de materiais ou ferramentas, mas não inclui mão de obra. Talvez tenha noção de quais clientes dão mais trabalho, mas sem número pra provar. A capacidade da operação é gerida no sentimento, e as contratações acontecem quando alguém reclama de sobrecarga.",
      por_tras_disso:
        "Medir custo operacional real (incluindo tempo de pessoas) exige uma camada de controle que a maioria das PMEs não tem. Não por falta de vontade, mas porque ninguém ensinou como fazer de forma simples. O resultado é que os custos são geridos por macro (folha total, custo geral) e não por micro (custo por entrega, custo por cliente, custo por hora alocada).",
      custo_ignorar:
        "Você contrata mais do que precisa ou menos do que deveria, porque não sabe onde está o gargalo de verdade. A margem bruta parece saudável, mas a margem de contribuição real (que inclui custo de entrega) é menor do que parece. Empresas nessa faixa descobrem isso quando fazem o cálculo pela primeira vez e percebem que metade dos clientes entrega margem abaixo do mínimo.",
    },
    faixa_construcao: {
      score_significa:
        "Você conhece seus custos diretos, tem alguma visão de margem por produto ou cliente, e a capacidade operacional é pelo menos estimada. Falta refinar: incluir custos indiretos rateados, ter margem por cliente atualizada periodicamente, e conectar a capacidade operacional com o orçamento financeiro. Os dados existem, mas não estão integrados com o financeiro.",
      por_tras_disso:
        "O gestor de operação sabe onde o sapato aperta, mas não traduz isso em número financeiro. E o financeiro (quando existe) não entra na operação pra entender o custo real. As duas áreas vivem separadas. Quem junta as duas consegue tomar decisões de alocação, contratação e corte com uma precisão que muda o jogo.",
      custo_ignorar:
        "Sem integração entre operação e finanças, decisões de capacidade são tomadas pelo feeling. Você contrata quando o time reclama e demite quando o caixa aperta. Nenhuma das duas decisões é informada por dado. O resultado é oscilação: meses com time ocioso, meses com time esgotado, e margem que varia sem explicação aparente.",
    },
    faixa_maduro: {
      score_significa:
        "Sua operação é mensurada, sua margem por cliente é conhecida, você simula impactos financeiros antes de contratar, e a capacidade é gerida por indicador. Isso é raro em PME. O próximo nível é usar esses dados pra decisão estratégica: quais clientes priorizar, quais serviços descontinuar, onde investir pra ganhar escala com margem.",
      por_tras_disso:
        "Empresas com operação madura geralmente passaram por algum gargalo que forçou a profissionalização. Agora o desafio é usar os dados que já existem pra tomar decisões mais agressivas. Os dados estão lá, mas muitas vezes ninguém está fazendo as perguntas certas pra eles. Um olhar externo, com experiência em controladoria, consegue extrair mais do que o time interno.",
      custo_ignorar:
        "Operação madura com decisão conservadora é dinheiro parado. Você tem os dados pra saber que pode crescer 30% sem contratar, ou que pode cortar 2 clientes e ganhar margem. Mas sem alguém de fora provocando, essas decisões ficam na gaveta. O custo é oportunidade perdida, não erro cometido.",
    },
  },

  // =========================================================================
  // ÁREA 5 — Governança & Decisão
  // =========================================================================
  governanca_decisao: {
    faixa_critico: {
      score_significa:
        "Não existe ritual de gestão financeira na sua empresa. As decisões são tomadas quando o problema aparece, não antes. Você decide sozinho, sem olhar externo qualificado, e não tem orçamento anual. Cada mês é uma surpresa. As três últimas decisões grandes da empresa foram por instinto, sem análise financeira formal.",
      por_tras_disso:
        "PMEs nascem com o dono decidindo tudo, e isso funciona nos primeiros anos. O problema é que o hábito permanece mesmo quando a empresa cresce. O dono continua sendo a única fonte de decisão, sem rito, sem dado, sem questionamento externo. Não é ego, é inércia. Montar um processo de governança financeira nunca é urgente, então nunca é prioridade.",
      custo_ignorar:
        "Decisão por instinto é uma roleta. Acerta muitas vezes, mas quando erra, erra grande. E como não tem registro nem análise pós, o erro se repete. Empresas nessa faixa tomam as mesmas decisões ruins em ciclo: contratam na euforia, cortam no pânico, investem sem projeção, e se surpreendem com o resultado. O custo acumulado ao longo de 5 anos é brutal.",
    },
    faixa_fragil: {
      score_significa:
        "Você tem algum rito de gestão, mas ele é informal e inconsistente. Talvez olhe os números mensalmente, mas sem estrutura. Talvez converse com alguém antes de decidir, mas sem cadência fixa e sem olhar técnico financeiro. O orçamento, se existe, foi feito uma vez e abandonado. Há consciência de que a governança precisa melhorar, mas falta método.",
      por_tras_disso:
        "A consciência veio, a disciplina não. O dono sabe que deveria ter rito mensal, orçamento vivo, e alguém questionando suas premissas. Já tentou: fez uma reunião de resultados num mês, fez orçamento no início do ano. Mas sem processo formalizado, a rotina atropela e o rito morre. A intenção existe, a execução não.",
      custo_ignorar:
        "Governança frágil produz decisões inconsistentes. Um mês você corta custo, no outro gasta sem critério. Um mês olha o número, no outro ignora. O time percebe a inconsistência e perde confiança no processo. Com o tempo, ninguém leva a sério quando o dono fala \"vamos organizar\", porque já ouviu isso antes.",
    },
    faixa_construcao: {
      score_significa:
        "Você tem rito de gestão com alguma cadência, olha indicadores além do saldo bancário, e ocasionalmente busca visão externa antes de decidir. O orçamento existe mas não é revisado com disciplina. Suas decisões grandes têm algum embasamento financeiro, mas não todas. O sistema está montado; falta rodar com consistência.",
      por_tras_disso:
        "A estrutura de governança foi montada (reunião mensal, indicadores, orçamento), mas ela depende do dono lembrar de fazer. Quando o mês é tranquilo, roda. Quando o mês é turbulento, é a primeira coisa que cai. Falta um agente externo que cobre a cadência. Um conselheiro, um mentor com agenda fixa. Alguém que faça a reunião acontecer mesmo quando o dono quer pular.",
      custo_ignorar:
        "Governança inconsistente é quase pior que nenhuma. Porque quando funciona, gera confiança (\"estamos no controle\"). Quando para, gera ponto cego (\"tudo bem, mês passado olhamos\"). Os gaps aparecem exatamente nos meses em que o rito foi pulado, e esses costumam ser os meses em que algo ruim estava se formando sem ninguém perceber.",
    },
    faixa_maduro: {
      score_significa:
        "Você tem rito mensal formal, orçamento vivo revisado contra o realizado, indicadores financeiros integrados, e busca olhar externo com alguma regularidade. Suas decisões são majoritariamente embasadas em análise. Está acima de 90% das PMEs do Brasil em governança financeira. O próximo passo é formalizar a voz externa: sair do \"converso com alguém de vez em quando\" pra \"tenho conselheiro financeiro com cadência fixa questionando minhas premissas todo mês\".",
      por_tras_disso:
        "Empresas nessa faixa têm um dono disciplinado que construiu a governança ao longo dos anos. O risco agora é o echo chamber. Você toma decisões boas, baseadas em dados, mas sempre do mesmo ponto de vista. Ninguém questiona se os dados certos estão sendo olhados, se as premissas do orçamento ainda fazem sentido, ou se existe um cenário que você não considerou. Essa é a função de um conselho consultivo.",
      custo_ignorar:
        "O dono que decide bem sozinho é o dono que eventualmente toma a decisão errada mais cara da história da empresa. Porque ninguém estava lá pra perguntar \"você considerou X?\". Empresas maduras que não têm conselho consultivo não quebram por erro, quebram por concentração. Toda a inteligência estratégica está numa pessoa. Isso é risco, não virtude.",
    },
  },
} as const;
