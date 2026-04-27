import type { Pergunta } from "./perguntas";

export interface CopyPergunta {
  readonly revela: string;
  readonly por_onde_comecar: string;
}

export const COPY_PERGUNTAS: Record<Pergunta["id"], CopyPergunta> = {
  // ─── ÁREA 1 — Gestão Financeira & Caixa ──────────────────────────────────
  p1: {
    revela:
      "Sem DRE gerencial rápida, você opera com um retrovisor embaçado. Toda decisão financeira dos últimos meses foi tomada sem saber o resultado real do mês anterior.",
    por_onde_comecar:
      "Monte uma DRE gerencial simplificada (8 linhas no máximo) e comprometa-se a fechá-la até o 10º dia útil do próximo mês. Não precisa ser perfeita, precisa existir.",
  },
  p2: {
    revela:
      "Você não sabe se vai ter dinheiro daqui a 60 dias. Isso significa que qualquer compromisso financeiro novo (contratação, investimento, expansão) é aposta.",
    por_onde_comecar:
      "Abra uma planilha de fluxo de caixa de 13 semanas. Preencha com os recebimentos e pagamentos que já conhece, atualize toda sexta-feira.",
  },
  p3: {
    revela:
      "A mistura entre dinheiro pessoal e da empresa esconde o resultado real do negócio. Você pode estar lucrando menos do que pensa, ou retirando mais do que a empresa suporta.",
    por_onde_comecar:
      "Defina um pró-labore fixo e congele retiradas extras por 30 dias. Anote separadamente o que \"precisaria\" ter saído extra. Isso revela o gap entre o que a empresa gera e o que você precisa.",
  },
  p4: {
    revela:
      "Se o único indicador é o saldo do banco, você está gerindo pela consequência, não pela causa. Quando o saldo cai, o problema já aconteceu semanas antes.",
    por_onde_comecar:
      "Escolha 3 indicadores além do saldo bancário (sugestão: faturamento, margem bruta, contas a receber) e olhe toda segunda-feira por 30 dias seguidos.",
  },

  // ─── ÁREA 2 — Precificação & Receita ─────────────────────────────────────
  p5: {
    revela:
      "Preço definido por comparação com concorrente ignora seu custo, sua margem e seu posicionamento. Você está cobrando o preço do outro, não o seu.",
    por_onde_comecar:
      "Calcule o custo direto completo do seu principal produto ou serviço (incluindo tempo de pessoas) e descubra qual é a margem real. Se o número te assustar, bom. Era pra assustar.",
  },
  p6: {
    revela:
      "Sem saber a margem de contribuição, você não consegue dizer se vender mais está te enriquecendo ou te afundando. Receita sem margem é vaidade, não resultado.",
    por_onde_comecar:
      "Pegue seu principal produto, subtraia todos os custos variáveis diretos do preço de venda, e divida pelo preço. Esse percentual é sua margem de contribuição. Anote. Você vai precisar dele.",
  },
  p7: {
    revela:
      "Desconto sem regra é margem evaporando em cada negociação. Se cada vendedor (ou você) decide na hora, não existe preço real, existe preço negociável.",
    por_onde_comecar:
      "Escreva em uma folha: \"desconto máximo de X%, apenas para Y situação, com aprovação de Z\". Cole na parede. Pronto, você tem uma política.",
  },
  p8: {
    revela:
      "Preço congelado há mais de um ano significa que seus custos subiram e sua margem encolheu sem você perceber. Cada mês sem reajuste é margem que some silenciosamente.",
    por_onde_comecar:
      "Faça a conta: quanto seus custos principais subiram nos últimos 12 meses (aluguel, salários, insumos, ferramentas)? Compare com o quanto você reajustou. A diferença é margem perdida.",
  },

  // ─── ÁREA 3 — Vendas & Previsibilidade ───────────────────────────────────
  p9: {
    revela:
      "Sem projeção de receita, toda decisão de gasto é palpite. Você não sabe se pode contratar, investir ou expandir porque não sabe quanto vai entrar.",
    por_onde_comecar:
      "Liste tudo que é contratual ou recorrente pros próximos 90 dias. Some. Esse é seu piso de receita. Tudo acima é variável. Agora você sabe o mínimo garantido.",
  },
  p10: {
    revela:
      "Quando mais de 50% da receita vem de 5 clientes, a perda de qualquer um deles pode tirar a empresa do prumo. Não é crescimento, é dependência.",
    por_onde_comecar:
      "Calcule quanto cada um dos 5 maiores clientes representa. Se algum ultrapassa 20%, monte um plano de contingência caso ele saia amanhã. Depois, priorize diversificação.",
  },
  p11: {
    revela:
      "Receita que vem de indicação e sorte não é previsível. Funciona até parar de funcionar, e quando para, não tem pipeline pra substituir.",
    por_onde_comecar:
      "Identifique qual canal de aquisição (se houver) entrega receita mensal recorrente. Se nenhum entrega, essa é a prioridade antes de qualquer investimento em marketing.",
  },
  p12: {
    revela:
      "Sem saber o CAC, você não sabe se seu investimento em vendas e marketing está dando retorno ou queimando dinheiro. Cada real investido em aquisição é aposta, não decisão.",
    por_onde_comecar:
      "Some tudo que gastou com marketing e vendas no último trimestre. Divida pelo número de clientes novos. Esse é seu CAC. Compare com o ticket médio. Se o CAC for maior que 30% do ticket, tem problema.",
  },

  // ─── ÁREA 4 — Operação & Margem ──────────────────────────────────────────
  p13: {
    revela:
      "Se você não sabe quanto custa entregar uma unidade, não sabe se cada venda gera lucro ou prejuízo. Faturamento alto com custo de entrega alto é ilusão de crescimento.",
    por_onde_comecar:
      "Pegue um cliente ou projeto recente. Liste todas as horas de todas as pessoas envolvidas, multiplique pelo custo-hora de cada uma, some os custos diretos. Divida pelo que cobrou. Esse é o número que você precisa ver.",
  },
  p14: {
    revela:
      "Sua empresa provavelmente tem clientes que geram prejuízo e ninguém sabe. Eles consomem tempo, energia e recursos do time enquanto pagam menos do que custam pra atender.",
    por_onde_comecar:
      "Liste seus 10 maiores clientes por receita. Ao lado, estime (mesmo que grosseiramente) o esforço que cada um exige. Ordene por \"receita ÷ esforço\". Os últimos da lista são candidatos a reprecificação ou desligamento.",
  },
  p15: {
    revela:
      "Sem saber a capacidade real da operação, você contrata quando o time reclama e não quando os dados indicam. Isso gera ociosidade nos meses bons e sobrecarga nos meses ruins.",
    por_onde_comecar:
      "Defina, mesmo que estimado, quantas entregas (projetos, atendimentos, unidades) sua operação atual consegue fazer por mês sem hora extra. Compare com o que está rodando hoje. A diferença é sua folga (ou seu gargalo).",
  },
  p16: {
    revela:
      "Contratar sem simular impacto no caixa é uma das decisões mais caras que um dono de PME toma. O custo não é só o salário: é encargo, treinamento, equipamento, e o tempo até a pessoa gerar receita.",
    por_onde_comecar:
      "Antes da próxima contratação, monte uma conta simples: custo total mensal × 6 meses. Esse é o investimento real. Agora pergunte: o caixa aguenta isso sem receita adicional? Se não, a contratação precisa esperar ou precisa de receita nova primeiro.",
  },

  // ─── ÁREA 5 — Governança & Decisão ───────────────────────────────────────
  p17: {
    revela:
      "Sem rito mensal de gestão, os números existem e ninguém olha. A empresa gera dados que viram arquivo, não decisão. É como ter painel do carro e dirigir de olho fechado.",
    por_onde_comecar:
      "Bloqueie 2 horas fixas no calendário, todo primeiro dia útil do mês. Mesmo que sozinho, sente e olhe: receita, custo, margem, caixa. Anote 3 decisões que você tomaria com base no que viu. Repita no mês seguinte.",
  },
  p18: {
    revela:
      "Decidir sozinho não é independência, é isolamento. O dono que não tem ninguém qualificado questionando suas premissas toma decisões boas quando poderia estar tomando decisões ótimas.",
    por_onde_comecar:
      "Identifique uma pessoa (ex-CFO, consultor financeiro, empresário mais experiente) e proponha uma conversa mensal de 1 hora sobre seus números. Não precisa ser formal, precisa ser recorrente e técnico.",
  },
  p19: {
    revela:
      "Empresa sem orçamento é empresa sem plano financeiro. Empresa com orçamento que ninguém revisita é empresa com plano que vira ficção depois de janeiro.",
    por_onde_comecar:
      "Se não tem orçamento: monte um projetado pra os próximos 6 meses com 5 linhas de receita e 10 de custo. Se já tem: pegue o do ano, coloque o realizado ao lado, e analise as 3 maiores variações. Faça isso todo mês.",
  },
  p20: {
    revela:
      "Se nenhuma das últimas 3 decisões grandes teve análise financeira formal, o padrão da empresa é decidir por instinto. Funciona até o instinto errar, e aí o custo é alto porque ninguém fez a conta antes.",
    por_onde_comecar:
      "Na próxima decisão grande (não precisa ser a mais importante, qualquer uma serve), force-se a escrever 3 cenários (otimista, realista, pessimista) com impacto em caixa. Se possível, peça pra alguém revisar antes de decidir.",
  },
};
