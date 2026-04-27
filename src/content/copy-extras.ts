/**
 * Copy extras: variações de teste A/B para o Hero, opções de SEO e
 * variações para criativos de Meta Ads.
 *
 * Não afeta a renderização da landing principal por padrão. Os módulos
 * que quiserem rodar teste A/B devem importar HERO_VARIATIONS e escolher
 * heroA (racional) ou heroB (provocativa).
 */

// ─── Hero A/B variations ─────────────────────────────────────────────────────

export type HeroVariation = {
  readonly headline: string;
  readonly subheadline: string;
  readonly cta: string;
};

export const HERO_VARIATIONS: Readonly<Record<"heroA" | "heroB", HeroVariation>> = {
  // Ângulo racional: foco no dado e na promessa concreta.
  heroA: {
    headline: "Em 5 minutos, descubra por que seu lucro não acompanha o faturamento.",
    subheadline:
      "O Raio-X Compass avalia 5 áreas críticas da gestão financeira da sua empresa. Score de 0 a 100 e diagnóstico personalizado, sem cadastro.",
    cta: "Fazer meu diagnóstico",
  },

  // Ângulo provocativo: bate na dor do Ricardo direto, sem rodeio.
  heroB: {
    headline: "Você fatura bem. No fim do mês não sobra nada. De novo.",
    subheadline:
      "Não é falta de esforço. É falta de bússola. O Raio-X Compass mostra exatamente onde o dinheiro está escapando.",
    cta: "Quero parar de pilotar no escuro",
  },
};

// ─── SEO meta tags ───────────────────────────────────────────────────────────

/**
 * Meta titles para teste em SEO. Limite de 60 caracteres respeitado em
 * todas as opções para garantir que o Google não corte na SERP.
 */
export const META_TITLES = [
  "Raio-X Compass: descubra onde o dinheiro escapa na PME",
  "Diagnóstico Financeiro Compass | Score em 5 minutos",
  "Raio-X Compass | MARK V: maturidade financeira da PME",
] as const;

/**
 * Meta descriptions para teste em SEO. Limite de 155 caracteres respeitado
 * em todas as opções.
 */
export const META_DESCRIPTIONS = [
  "Score de maturidade financeira de 0 a 100. 20 perguntas, menos de 5 minutos. Descubra onde o dinheiro escapa na sua PME. Relatório completo Compass.",
  "Seu faturamento cresceu, mas o lucro não acompanhou? Faça o Raio-X Compass: 20 perguntas, score imediato e plano de ação para 90 dias.",
  "Diagnóstico financeiro para PMEs brasileiras. 5 áreas avaliadas, score de 0 a 100, relatório completo em PDF. Desenvolvido pela MARK V.",
] as const;

// ─── CTA alternatives ────────────────────────────────────────────────────────

/**
 * Variações de texto para botões de CTA. Cobrem desde o tom mais neutro
 * (diagnóstico gratuito) até o mais provocativo (pilotar no escuro).
 */
export const CTA_ALTERNATIVES = [
  "Quero ver meu Score Compass",
  "Começar diagnóstico gratuito",
  "Fazer meu Raio-X agora",
  "Descobrir onde o dinheiro escapa",
  "Quero parar de pilotar no escuro",
] as const;

// ─── Meta Ads ────────────────────────────────────────────────────────────────

export type MetaAdAngle = "custo_inacao" | "espelho_dor";

export type MetaAd = {
  readonly angle: MetaAdAngle;
  readonly primaryText: string;
  readonly headline: string;
  readonly cta: string;
};

/**
 * Variações para criativos de Meta Ads. Duas no ângulo de custo da inação
 * e uma no ângulo do espelho da dor (sua empresa cresce, seu lucro não).
 */
export const META_ADS: ReadonlyArray<MetaAd> = [
  {
    angle: "custo_inacao",
    primaryText:
      "Faturamento subiu, margem caiu. Estoque inflou, caixa esvaziou. O Raio-X Compass mostra onde o dinheiro está escapando agora. 20 perguntas, score em 5 minutos. Gratuito até o resultado.",
    headline: "Quanto sua empresa perde por mês sem um plano financeiro?",
    cta: "Saiba Mais",
  },
  {
    angle: "custo_inacao",
    primaryText:
      "Toda decisão errada de precificação custa entre 5 e 15 pontos percentuais de margem por ano. Você sabe se está cobrando certo? O Raio-X Compass identifica os vazamentos em 5 minutos.",
    headline: "Sua margem pode estar vazando há mais tempo do que você imagina.",
    cta: "Fazer Diagnóstico",
  },
  {
    angle: "espelho_dor",
    primaryText:
      "Sua empresa cresce. Seu lucro não. O problema não é falta de esforço, é falta de bússola. Faça o Raio-X Compass e descubra onde o dinheiro escapa antes do próximo trimestre fechar.",
    headline: "Trabalhar mais não vai resolver. Faltam dados, não esforço.",
    cta: "Quero o Raio-X",
  },
];
