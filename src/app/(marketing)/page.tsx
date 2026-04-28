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
import { AREAS } from "@/content/areas";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SplineBackground } from "@/components/immersive/spline-background";

export const metadata: Metadata = {
  title: "Raio-X Compass | Diagnóstico financeiro para PMEs",
  description:
    "Descubra onde o dinheiro escapa na sua PME em menos de 5 minutos. Score financeiro gratuito e relatório completo Compass.",
};

const SCORE_PREVIEW_AREAS = [
  { nome: "Gestão Financeira & Caixa", score: 38, critico: true },
  { nome: "Precificação & Receita", score: 41, critico: true },
  { nome: "Vendas & Previsibilidade", score: 52, critico: false },
  { nome: "Operação & Margem", score: 47, critico: false },
  { nome: "Governança & Decisão", score: 36, critico: true },
] as const;

const SINTOMAS = [
  "O faturamento cresceu, mas o lucro continua sumindo.",
  "Você vende bastante e ainda assim sente o caixa apertar.",
  "O preço parece certo, mas a margem nunca fecha como deveria.",
  "Toda decisão financeira depende de planilhas soltas e sensação.",
  "A equipe trabalha muito, mas você não sabe onde a operação vaza dinheiro.",
  "Você só descobre o problema quando ele já virou urgência.",
] as const;

const PASSOS = [
  {
    num: 1,
    titulo: "Responda o diagnóstico",
    desc: "20 perguntas objetivas sobre como sua empresa gere caixa, preço, vendas, margem e decisão.",
  },
  {
    num: 2,
    titulo: "Receba o Score Compass",
    desc: "O resultado mostra sua maturidade financeira de 0 a 100 e aponta as áreas mais frágeis.",
  },
  {
    num: 3,
    titulo: "Decida o próximo passo",
    desc: "Você vê o diagnóstico gratuito e escolhe se quer o relatório completo em PDF.",
  },
] as const;

const PILARES_COMPASS = [
  {
    rotulo: "RAIO-X",
    titulo: "Diagnóstico da maturidade",
    desc: "Mostra onde a gestão financeira está forte, frágil ou operando no improviso.",
    ativo: true,
  },
  {
    rotulo: "PLANO",
    titulo: "Prioridades de 90 dias",
    desc: "Transforma o diagnóstico em uma sequência clara de decisão e execução.",
    ativo: false,
  },
  {
    rotulo: "GESTÃO",
    titulo: "Rotina financeira",
    desc: "Organiza indicadores, reuniões e controles para a empresa parar de apagar incêndio.",
    ativo: false,
  },
  {
    rotulo: "CONSELHO",
    titulo: "Decisão com método",
    desc: "Eleva a conversa de financeiro operacional para direção estratégica.",
    ativo: false,
  },
] as const;

const GRATUITO_ITEMS = [
  "Score Compass imediato de 0 a 100.",
  "Classificação do nível de maturidade financeira.",
  "Radar das 5 áreas avaliadas.",
  "Identificação da maior fragilidade do negócio.",
  "Nenhum dado financeiro sensível solicitado.",
] as const;

const RELATORIO_ITEMS = [
  {
    titulo: "Leitura executiva do Score Compass",
    detalhe:
      "Uma interpretação direta do nível atual da empresa e do que esse score indica sobre caixa, margem e decisão.",
  },
  {
    titulo: "Diagnóstico por área",
    detalhe:
      "Análise separada das 5 áreas avaliadas, com pesos diferentes conforme o impacto no resultado final.",
  },
  {
    titulo: "Fragilidades prioritárias",
    detalhe:
      "O que deve ser atacado primeiro para reduzir vazamentos financeiros e melhorar previsibilidade.",
  },
  {
    titulo: "Riscos de continuar como está",
    detalhe:
      "Tradução das respostas em riscos práticos para margem, caixa, preço, equipe e tomada de decisão.",
  },
  {
    titulo: "Plano de ação inicial",
    detalhe:
      "Recomendações objetivas para os próximos 30 a 90 dias, sem depender de implantação complexa.",
  },
] as const;

const LUCAS_CREDENCIAIS = [
  "Especialista em finanças, controladoria e valuation para PMEs.",
  "Mais de 700 projetos de estruturação financeira.",
  "Atuação com empresas de R$ 1M a R$ 20M de faturamento.",
] as const;

const LUCAS_CLIENTES = [
  "Varejo",
  "Serviços",
  "Indústria",
  "Educação",
  "Saúde",
  "Tecnologia",
] as const;

const CASOS = [
  {
    contexto: "Preço e margem",
    caso: "Empresa com vendas crescentes descobriu que parte dos produtos campeões carregava margem negativa depois dos custos indiretos.",
  },
  {
    contexto: "Caixa",
    caso: "Operação saudável no papel passou a prever aperto de caixa com antecedência ao separar resultado, prazo e capital de giro.",
  },
  {
    contexto: "Decisão",
    caso: "Sócios que decidiam por urgência criaram uma rotina de indicadores e reduziram discussões improdutivas sobre prioridade.",
  },
] as const;

const ANCORAS = [
  "Uma decisão errada de preço pode custar mais que o relatório em um único pedido.",
  "Uma hora de consultoria costuma custar mais que o diagnóstico completo.",
  "O maior custo é continuar sem saber onde o dinheiro escapa todo mês.",
] as const;

const FAQ = [
  {
    q: "Preciso informar faturamento, saldo ou extrato?",
    a: "Não. O diagnóstico usa perguntas sobre práticas de gestão, não dados financeiros sensíveis.",
  },
  {
    q: "O resultado gratuito já aparece na hora?",
    a: "Sim. Ao terminar as 20 perguntas, você vê o Score Compass e a classificação geral.",
  },
  {
    q: "Quando eu pago?",
    a: "Só depois de ver o resultado gratuito, caso queira baixar o relatório completo em PDF.",
  },
  {
    q: "Serve para qualquer empresa?",
    a: "Foi desenhado para PMEs que já faturam, têm operação ativa e precisam melhorar lucro, caixa e previsibilidade.",
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
    <main className="relative min-h-screen bg-background overflow-hidden">
      <SplineBackground
        className="fixed inset-0 pointer-events-none"
        overlayClassName="fixed inset-0 bg-black/50 z-[1] pointer-events-none"
      />

      <div className="relative z-10">

      {/* ── Block 1: Hero ─────────────────────────────────────────────────── */}
      <section className="px-4 pt-24 pb-20">
        <div className="flex flex-col items-center justify-center text-center">
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
        </div>
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

      {/* ── Block 9: Autoridade ───────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-10">
            Quem desenvolveu o Raio-X Compass
          </h2>

          <div className="grid gap-8 md:grid-cols-[180px_1fr] md:items-start">
            <div className="flex flex-col items-center md:items-start gap-3">
              <div className="relative h-56 w-44 overflow-hidden rounded-lg border border-border">
                <Image
                  src="/lucas-minucci.jpg"
                  alt="Lucas Minucci"
                  fill
                  className="object-cover object-top"
                  sizes="176px"
                />
              </div>
              <div className="text-center md:text-left">
                <p className="text-sm font-semibold text-foreground">
                  Lucas Minucci
                </p>
                <p className="text-xs text-muted-foreground">
                  Fundador, MARK V
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-foreground leading-relaxed mb-5">
                Lucas Minucci é especialista em finanças, controladoria e
                valuation para PMEs. Mais de 700 projetos estruturando a gestão
                financeira de empresas com faturamento entre R$ 1M e R$ 20M.
              </p>

              <ul className="space-y-2 mb-5">
                {LUCAS_CREDENCIAIS.map((cred) => (
                  <li
                    key={cred}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-markv/20 border border-markv/40">
                      <Check
                        className="h-2.5 w-2.5 text-markv-light"
                        strokeWidth={3}
                      />
                    </div>
                    {cred}
                  </li>
                ))}
              </ul>

              <p className="text-xs text-muted-foreground leading-relaxed border-l-2 border-markv/40 pl-3 mb-6">
                O Raio-X Compass foi construído a partir do mesmo framework que
                a MARK V aplica nas consultorias. Não é um questionário
                genérico. É o diagnóstico que a gente faria antes de qualquer
                engajamento.
              </p>

              <div className="flex flex-wrap gap-2">
                {LUCAS_CLIENTES.map((cliente) => (
                  <span
                    key={cliente}
                    className="text-xs text-muted-foreground border border-border rounded px-2.5 py-1"
                  >
                    {cliente}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* ── Block 10: Prova de processo ───────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-3">
              O método funciona antes de virar produto.
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              O Raio-X Compass é a sistematização de um framework aplicado em
              consultorias reais. Estes são casos que aconteceram antes do
              software existir.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {CASOS.map((caso) => (
              <div
                key={caso.contexto}
                className="rounded-lg border border-border bg-card p-5"
              >
                <p className="text-[10px] font-semibold text-markv-light uppercase tracking-wider mb-3">
                  {caso.contexto}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {caso.caso}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-8 max-w-md mx-auto">
            Casos reais da consultoria MARK V. Detalhes alterados para
            preservar o anonimato dos clientes.
          </p>
        </div>
      </section>

      <Separator />

      {/* ── Block 11: Oferta e preço ──────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-3 leading-tight">
              Menos que uma hora de consultoria. Menos que uma decisão errada
              por mês.
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              O custo do relatório fica claro quando você compara com o que
              está deixando passar todo mês.
            </p>
          </div>

          {/* Anchor list */}
          <ul className="space-y-2 mb-10 max-w-lg mx-auto">
            {ANCORAS.map((ancora, i) => (
              <li
                key={ancora}
                className={
                  i === ANCORAS.length - 1
                    ? "flex items-start gap-3 rounded-md border border-markv/40 bg-markv/5 p-3"
                    : "flex items-start gap-3 rounded-md border border-border bg-card p-3"
                }
              >
                <span
                  className={
                    i === ANCORAS.length - 1
                      ? "text-[11px] font-bold text-markv-light tabular-nums mt-0.5"
                      : "text-[11px] font-bold text-muted-foreground tabular-nums mt-0.5"
                  }
                >
                  0{i + 1}
                </span>
                <p
                  className={
                    i === ANCORAS.length - 1
                      ? "text-sm text-foreground leading-relaxed"
                      : "text-sm text-muted-foreground leading-relaxed"
                  }
                >
                  {ancora}
                </p>
              </li>
            ))}
          </ul>

          {/* Pricing card */}
          <div className="mx-auto max-w-md rounded-xl border border-markv/50 bg-card p-8 text-center">
            <p className="text-xs font-semibold text-markv-light tracking-wider uppercase mb-4">
              Relatório completo Compass
            </p>
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="text-4xl font-bold text-foreground tabular-nums">
                R$ 29,90
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Pagamento único. Sem assinatura. Sem mensalidade.
            </p>

            <Button
              asChild
              size="lg"
              className="w-full cursor-pointer font-semibold"
            >
              <Link href="/diagnostico">Começar diagnóstico gratuito</Link>
            </Button>

            <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
              Diagnóstico e score gratuitos. Você só paga se quiser o relatório
              completo em PDF.
            </p>
          </div>
        </div>
      </section>

      <Separator />

      {/* ── Block 12: FAQ ─────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-center mb-3">
            Perguntas que o Ricardo faz antes de clicar
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-10">
            As objeções mais comuns. Respondidas direto, sem rodeio.
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

      {/* ── Block 12: CTA final ───────────────────────────────────────────── */}
      <section className="py-20 px-4 text-center">
        <div className="mx-auto max-w-lg">
          <h2 className="text-2xl font-bold mb-4 leading-tight">
            5 minutos. Score na hora. Você sai sabendo onde está.
          </h2>
          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            Nenhum dado financeiro solicitado. Só 20 perguntas sobre como você
            gere o negócio hoje.
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
      </div>
    </main>
  );
}
