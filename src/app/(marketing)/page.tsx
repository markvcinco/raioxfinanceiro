import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AREAS } from "@/content/areas";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Raio-X Compass: onde o dinheiro escapa na sua PME",
  description:
    "Score de maturidade financeira de 0 a 100. 20 perguntas, menos de 5 minutos, resultado imediato. Diagnóstico completo das 5 áreas críticas. Desenvolvido pela MARK V.",
  openGraph: {
    title: "Raio-X Compass | Diagnóstico Financeiro para PMEs",
    description:
      "Seu faturamento cresceu. O lucro não acompanhou. O Raio-X Compass mostra onde o dinheiro escapa. Score imediato, relatório completo em PDF.",
    type: "website",
    locale: "pt_BR",
    siteName: "Raio-X Financeiro Compass | MARK V",
  },
};

// ─── Block 2 data ────────────────────────────────────────────────────────────
const SCORE_PREVIEW_AREAS: Array<{
  nome: string;
  score: number;
  critico: boolean;
}> = [
  { nome: "Gestão Financeira & Caixa", score: 52, critico: false },
  { nome: "Precificação & Receita", score: 28, critico: true },
  { nome: "Vendas & Previsibilidade", score: 45, critico: false },
  { nome: "Operação & Margem", score: 60, critico: false },
  { nome: "Governança & Decisão", score: 32, critico: false },
];

// ─── Block 3 data ────────────────────────────────────────────────────────────
const SINTOMAS = [
  "Meu faturamento aumentou, mas no fim do mês não sobra o que deveria",
  "Fico sem saber se estou cobrando pouco ou perdendo margem em algum lugar",
  "Decido no feeling porque não tenho os números na mão quando preciso",
  "Já tentei consultoria. Recebi um relatório bonito. Nada mudou na prática",
  "A empresa me consome. Era pra ser liberdade, virou obrigação",
  "Se meu sócio resolver sair amanhã, a divisão vira um problema sério",
] as const;

// ─── Block 4 data ────────────────────────────────────────────────────────────
const PASSOS = [
  {
    num: "01",
    titulo: "Responda 20 perguntas",
    desc: "Sobre como você gere o negócio, não sobre seus números. Gestão, precificação, vendas, operação e governança. Leva menos de 5 minutos.",
  },
  {
    num: "02",
    titulo: "Veja seu Score Compass",
    desc: "Score de 0 a 100, classificação na faixa de maturidade e radar das 5 áreas. Resultado imediato, gratuito, sem cadastro.",
  },
  {
    num: "03",
    titulo: "Baixe o relatório completo",
    desc: "PDF de 14 páginas com análise detalhada de cada área, top 3 prioridades e plano de ação para 90 dias.",
  },
] as const;

// ─── Block 5 data ────────────────────────────────────────────────────────────
const PILARES_COMPASS = [
  {
    rotulo: "Raio-X",
    ativo: true,
    titulo: "Mapeamento dos vazamentos",
    desc: "A maioria dos consultores olha o faturamento. Nós olhamos onde o dinheiro escapa. Precificação errada, custo escondido, margem que parece boa e não é.",
  },
  {
    rotulo: "Rota",
    ativo: false,
    titulo: "Três cenários, uma escolha",
    desc: "Conservador, realista, otimista. O empresário para de reagir ao mês e começa a tomar decisão com dado.",
  },
  {
    rotulo: "Checkpoint",
    ativo: false,
    titulo: "Recalcula todo mês",
    desc: "O plano não fica na gaveta. Funciona como GPS: corrige a rota quando você desvia.",
  },
  {
    rotulo: "Blindagem",
    ativo: false,
    titulo: "Protege o que foi construído",
    desc: "Acordo de sócios, governança, riscos mapeados. Lucro sem proteção é temporário.",
  },
] as const;

// ─── Block 7 data ────────────────────────────────────────────────────────────
const GRATUITO_ITEMS = [
  "Score Compass de 0 a 100",
  "Classificação na faixa de maturidade (crítico, frágil, em construção ou maduro)",
  "Radar visual das 5 áreas avaliadas",
  "Maior vulnerabilidade identificada no diagnóstico",
] as const;

// ─── Block 8 data ────────────────────────────────────────────────────────────
const RELATORIO_ITEMS = [
  {
    titulo: "Score geral e classificação por faixa",
    detalhe:
      "Score de 0 a 100, faixa de maturidade e o que ela significa na prática do seu negócio. Não é um número solto.",
  },
  {
    titulo: "Análise individual das 5 áreas",
    detalhe:
      "Cada área com score próprio, diagnóstico para a sua faixa específica e o custo concreto de deixar o problema onde está.",
  },
  {
    titulo: "Top 3 fragilidades do seu diagnóstico",
    detalhe:
      "Os gaps que mais expõem o caixa hoje. Priorizados por impacto real, não por urgência aparente.",
  },
  {
    titulo: "Plano de ação para 90 dias",
    detalhe:
      "Passos sequenciados para os próximos 3 meses. Ritmo de PME, não de palestra de consultor.",
  },
  {
    titulo: "Radar visual comparativo",
    detalhe:
      "As 5 áreas em um gráfico só. Onde você está forte, onde está exposto, onde o dinheiro sangra silencioso.",
  },
] as const;

const FAQ = [
  {
    q: "Preciso informar dados financeiros da minha empresa?",
    a: "Não. As perguntas são sobre como a gestão financeira é conduzida — processos, periodicidade, ferramentas — não sobre números da empresa. Nenhum dado confidencial é solicitado.",
  },
  {
    q: "Quanto tempo leva o diagnóstico?",
    a: "Entre 4 e 6 minutos. São 20 perguntas de múltipla escolha, sem texto livre.",
  },
  {
    q: "O que vem no relatório de R$ 29,90?",
    a: "PDF de 14 páginas com: score geral, análise detalhada das 5 áreas avaliadas, top 3 prioridades do seu diagnóstico, plano de ação para 90 dias e radar visual comparativo.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "Pagamento único via PIX ou cartão de crédito. Sem assinatura, sem mensalidade. Processado pela Asaas com criptografia de ponta a ponta.",
  },
  {
    q: "O score é confiável para uma empresa pequena?",
    a: "Sim. O modelo foi calibrado especificamente para PMEs brasileiras com faturamento até R$ 20 milhões. As áreas e pesos refletem a realidade operacional desse perfil, não o de uma multinacional.",
  },
  {
    q: "Quem desenvolveu o diagnóstico?",
    a: "Lucas Minucci, fundador da MARK V. Mais de 10 anos em finanças, controladoria e conselho consultivo financeiro para PMEs. O modelo reflete o framework aplicado em consultorias da MARK V.",
  },
] as const;

function PesoBadge({ peso }: { peso: number }) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium text-muted-foreground bg-muted/60 border border-border cursor-help tabular-nums">
            {Math.round(peso * 100)}% peso
          </span>
        </TooltipTrigger>
        <TooltipContent side="top">
          Influência no score geral final
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">

      {/* ── Block 1: Hero ─────────────────────────────────────────────────── */}
      <section className="flex flex-col items-center justify-center px-4 pt-24 pb-20 text-center">
        <div className="flex items-center gap-2 mb-8">
          <div className="h-6 w-1 rounded-full bg-markv" />
          <span className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
            MARK V
          </span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl max-w-3xl mb-6 leading-[1.05]">
          Seu faturamento cresceu.
          <br />
          <span className="text-markv-light">O lucro não acompanhou.</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
          O Raio-X Compass identifica onde o dinheiro está escapando.
          20 perguntas, score de 0 a 100, resultado em menos de 5 minutos.
        </p>

        <Button
          asChild
          size="lg"
          className="px-8 text-base font-semibold cursor-pointer group"
        >
          <Link href="/diagnostico">
            Quero ver meu Score Compass
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>

        <p className="text-xs text-muted-foreground mt-4">
          Gratuito até o resultado. Nenhum dado financeiro solicitado.
        </p>
      </section>

      <Separator />

      {/* ── Block 2: Score Preview ────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-markv-light tracking-wider uppercase mb-2">
              Exemplo de resultado
            </p>
            <h2 className="text-2xl font-bold mb-3">
              É isso que você vê ao terminar o diagnóstico
            </h2>
            <p className="text-sm text-muted-foreground">
              Score imediato. Classificação. Radar das 5 áreas. Sem cadastro, sem espera.
            </p>
          </div>

          {/* Mockup card */}
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
            {/* Score header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-[10px] font-semibold text-markv-light tracking-widest uppercase">
                  Score Compass
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-5xl font-bold tabular-nums">43</span>
                  <span className="text-lg text-muted-foreground">/100</span>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-2.5 py-1 rounded-md bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold">
                  Frágil
                </span>
                <p className="text-xs text-muted-foreground mt-2 max-w-[180px] leading-snug">
                  Empresa funcionando no improviso
                </p>
              </div>
            </div>

            <Separator className="mb-5" />

            {/* Area breakdown */}
            <div className="space-y-3 mb-5">
              {SCORE_PREVIEW_AREAS.map((area) => (
                <div key={area.nome}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-muted-foreground">
                        {area.nome}
                      </span>
                      {area.critico && (
                        <span className="text-[9px] font-semibold text-orange-400 uppercase tracking-wide">
                          crítico
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-semibold tabular-nums">
                      {area.score}
                    </span>
                  </div>
                  <div className="h-1 rounded-full bg-muted overflow-hidden">
                    <div
                      className={
                        area.critico
                          ? "h-full rounded-full bg-orange-500"
                          : "h-full rounded-full bg-markv"
                      }
                      style={{ width: `${area.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Separator className="mb-4" />

            {/* Biggest risk */}
            <div className="rounded-md bg-muted/40 border border-border p-3">
              <p className="text-[10px] font-semibold text-markv-light uppercase tracking-wider mb-1">
                Maior fragilidade identificada
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Precificação sem base técnica. Você não sabe o custo real do
                que vende. Sua margem pode estar errada há mais tempo do que
                você imagina.
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-3">
            Resultado ilustrativo. O seu será gerado com base nas suas respostas.
          </p>
        </div>
      </section>

      <Separator />

      {/* ── Block 3: Symptoms ─────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-center mb-10">
            Se uma dessas frases soa familiar, o diagnóstico foi feito pra você.
          </h2>

          <div className="grid gap-3 sm:grid-cols-2">
            {SINTOMAS.map((sintoma) => (
              <div
                key={sintoma}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-markv/60 shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {sintoma}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* ── Block 4: How it works ─────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-3">
            Como funciona
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-12">
            Três passos. Menos de 5 minutos. Resultado na hora.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            {PASSOS.map((passo) => (
              <div
                key={passo.num}
                className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-zinc-700"
              >
                <span className="text-xs font-semibold text-markv-light tracking-wider tabular-nums">
                  PASSO {passo.num}
                </span>
                <h3 className="text-base font-semibold text-foreground mt-2 mb-3">
                  {passo.titulo}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {passo.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* ── Block 5: Método Compass ───────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-3">
              O Raio-X é o primeiro passo da bússola.
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              A maioria dos donos de PME não precisa trabalhar mais. Precisa de
              direção. O Método Compass tem 4 pilares que corrigem o que está
              travando o negócio.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PILARES_COMPASS.map((pilar, i) => (
              <div
                key={pilar.rotulo}
                className={
                  pilar.ativo
                    ? "rounded-lg border border-markv/60 bg-markv/5 p-5"
                    : "rounded-lg border border-border bg-card p-5"
                }
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold text-muted-foreground tabular-nums">
                    0{i + 1}
                  </span>
                  <span
                    className={
                      pilar.ativo
                        ? "text-xs font-bold tracking-wider text-markv-light"
                        : "text-xs font-bold tracking-wider text-foreground"
                    }
                  >
                    {pilar.rotulo}
                  </span>
                  {pilar.ativo && (
                    <span className="text-[9px] font-semibold text-markv-light bg-markv/10 border border-markv/30 px-1.5 py-0.5 rounded-full">
                      você está aqui
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2 leading-tight">
                  {pilar.titulo}
                </h3>
                <p
                  className={
                    pilar.ativo
                      ? "text-xs text-muted-foreground leading-relaxed"
                      : "text-xs text-muted-foreground/70 leading-relaxed"
                  }
                >
                  {pilar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* ── Block 6: 5 áreas avaliadas ────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-3 max-w-2xl mx-auto leading-tight">
              Não olhamos o seu faturamento. Olhamos onde o dinheiro escapa.
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
              O diagnóstico avalia 5 áreas que a maioria dos donos de PME só
              enxerga depois que o estrago está feito.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {AREAS.map((area) => (
              <div
                key={area.id}
                className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-zinc-700 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-markv/80 text-[11px] font-bold text-white tabular-nums">
                    0{area.numero}
                  </div>
                  <PesoBadge peso={area.peso} />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2 leading-tight">
                  {area.nome}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {area.eixo}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* ── Block 7: O que você recebe grátis ─────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-xl">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold text-markv-light tracking-wider uppercase mb-2">
              Sem custo
            </p>
            <h2 className="text-2xl font-bold mb-3">
              O que você vê antes de pagar qualquer coisa
            </h2>
            <p className="text-sm text-muted-foreground">
              Resultado imediato. Sem cadastro. Sem cartão.
            </p>
          </div>

          <div className="rounded-lg border border-markv/30 bg-markv/5 p-6">
            <ul className="space-y-3">
              {GRATUITO_ITEMS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-foreground"
                >
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-markv/20 border border-markv/40">
                    <Check
                      className="h-3 w-3 text-markv-light"
                      strokeWidth={3}
                    />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Separator />

      {/* ── Block 8: O que vem no relatório completo ──────────────────────── */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-3">
              O relatório completo
            </h2>
            <p className="text-sm text-muted-foreground">
              14 páginas. Instrumento de trabalho, não peça de apresentação.
              Passe o cursor em cada item para ver o detalhe.
            </p>
          </div>

          <div className="space-y-2">
            {RELATORIO_ITEMS.map((item, i) => (
              <HoverCard key={i} openDelay={150} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <div className="flex items-start gap-3 p-3 rounded-md border border-transparent hover:border-border hover:bg-card transition-all cursor-help">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-markv/20 border border-markv/40">
                      <Check className="h-3 w-3 text-markv-light" strokeWidth={3} />
                    </div>
                    <p className="text-sm text-foreground">{item.titulo}</p>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent>
                  <p className="text-xs font-semibold text-markv-light uppercase tracking-wider mb-2">
                    {item.titulo}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.detalhe}
                  </p>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* ── Placeholder: Autoridade (to be replaced in Block 9 task) ─────── */}
      <section className="py-14 px-4">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12 shrink-0">
              <AvatarFallback>LM</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-foreground leading-relaxed">
                Desenvolvido por{" "}
                <span className="font-semibold">Lucas Minucci</span>, especialista
                em finanças, controladoria e conselho consultivo para PMEs.
              </p>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Mais de 10 anos ajudando empresas a tomar decisões financeiras
                com método.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* ── Placeholder: Preço (to be replaced in Block 11 task) ─────────── */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-md">
          <div className="rounded-xl border border-markv/50 bg-card p-8 text-center">
            <p className="text-xs font-semibold text-markv-light tracking-wider uppercase mb-4">
              Relatório completo
            </p>
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="text-4xl font-bold text-foreground">R$ 29,90</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Pagamento único. Sem assinatura.
            </p>
            <Button asChild size="lg" className="w-full cursor-pointer font-semibold">
              <Link href="/diagnostico">Começar diagnóstico gratuito</Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
              O diagnóstico e o score são gratuitos.
              <br />
              Você só paga se quiser o relatório completo em PDF.
            </p>
          </div>
        </div>
      </section>

      <Separator />

      {/* ── Placeholder: FAQ (to be replaced in Block 12 task) ───────────── */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-center mb-4">
            Perguntas frequentes
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-10">
            Tudo que você precisa saber antes de começar.
          </p>

          <Accordion type="single" collapsible className="w-full">
            {FAQ.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Separator />

      {/* ── Placeholder: CTA final (to be replaced in Block 12 task) ─────── */}
      <section className="py-20 px-4 text-center">
        <div className="mx-auto max-w-lg">
          <h2 className="text-2xl font-bold mb-4">
            5 minutos. Score imediato. Você sai sabendo onde está.
          </h2>
          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            Nenhum dado financeiro solicitado. Nenhuma informação confidencial.
            <br />
            Só 20 perguntas sobre como você gere o negócio hoje.
          </p>
          <Button
            asChild
            size="lg"
            className="px-8 cursor-pointer font-semibold group"
          >
            <Link href="/diagnostico">
              Quero ver meu Score Compass
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </section>

      <Separator />

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="py-8 px-4">
        <div className="mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-4 w-0.5 rounded-full bg-markv" />
            <span className="font-medium text-foreground">MARK V</span>
            <span>Finanças, Controladoria &amp; Conselho</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="mailto:contato@markv.com.br"
              className="hover:text-foreground transition-colors"
            >
              contato@markv.com.br
            </a>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
