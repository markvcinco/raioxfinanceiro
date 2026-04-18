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
  title: "Raio-X Financeiro — Diagnóstico da Maturidade Financeira | MARK V",
  description:
    "Descubra o nível de maturidade financeira da sua empresa em menos de 5 minutos. 20 perguntas, score imediato, relatório completo em PDF. Desenvolvido pela MARK V.",
  openGraph: {
    title: "Raio-X Financeiro — Diagnóstico Financeiro para PMEs",
    description:
      "20 perguntas. Score imediato. Relatório completo em PDF por R$ 29,90. Descubra onde sua gestão financeira está travando.",
    type: "website",
    locale: "pt_BR",
    siteName: "Raio-X Financeiro MARK V",
  },
};

const PASSOS = [
  {
    num: "01",
    titulo: "Responda 20 perguntas",
    desc: "Sobre a gestão financeira, precificação, vendas, operação e governança da sua empresa. Leva menos de 5 minutos.",
  },
  {
    num: "02",
    titulo: "Veja seu score na hora",
    desc: "Score geral de 0 a 100, classificação por faixa de maturidade e radar comparativo das 5 áreas — gratuito.",
  },
  {
    num: "03",
    titulo: "Baixe o relatório completo",
    desc: "PDF de 14 páginas com análise detalhada de cada área, top 3 prioridades e plano de ação para 90 dias. R$ 29,90.",
  },
] as const;

const RELATORIO_ITEMS = [
  {
    titulo: "Score geral e classificação",
    detalhe:
      "Score de 0 a 100, faixa de maturidade (crítico, frágil, em construção, maduro) e interpretação do que isso significa para o seu negócio.",
  },
  {
    titulo: "Análise individual das 5 áreas",
    detalhe:
      "Cada área avaliada com score próprio, copy exclusiva para a sua faixa e o custo real de ignorar o problema.",
  },
  {
    titulo: "3 pontos de maior fragilidade",
    detalhe:
      "Os 3 gaps prioritários identificados no diagnóstico — onde sua gestão financeira está mais exposta hoje.",
  },
  {
    titulo: "Plano de ação para 90 dias",
    detalhe:
      "Passos concretos, priorizados e sequenciados para os próximos 3 meses. Ritmo de PME, não de corporação.",
  },
  {
    titulo: "Radar visual comparativo",
    detalhe:
      "Visualização gráfica das 5 áreas para identificar desequilíbrios de imediato.",
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
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-4 pt-24 pb-20 text-center">
        <div className="flex items-center gap-2 mb-8">
          <div className="h-6 w-1 rounded-full bg-markv" />
          <span className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
            MARK V
          </span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl max-w-3xl mb-6 leading-[1.05]">
          Sua empresa tem gestão financeira
          <br />
          <span className="text-markv-light">ou só paga as contas?</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
          Descubra o nível de maturidade financeira do seu negócio em menos de
          5 minutos. 20 perguntas, score imediato, diagnóstico completo.
        </p>

        <Button asChild size="lg" className="px-8 text-base font-semibold cursor-pointer group">
          <Link href="/diagnostico">
            Fazer meu diagnóstico
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>

        <p className="text-xs text-muted-foreground mt-4">
          Gratuito até o resultado. Relatório completo por R$ 29,90.
        </p>
      </section>

      <Separator />

      {/* Prova social */}
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

      {/* Como funciona */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-12">
            Como funciona
          </h2>

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

      {/* 5 áreas */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-4">
            O que você vai descobrir
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-12 max-w-lg mx-auto leading-relaxed">
            O diagnóstico avalia 5 áreas da maturidade financeira da sua empresa,
            cada uma com peso específico no score final.
          </p>

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

      {/* O que está no relatório */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-center mb-4">
            O que está no relatório
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-10">
            14 páginas de análise personalizada. Passe o mouse em cada item para ver detalhes.
          </p>

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

      {/* Preço */}
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

      {/* FAQ */}
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

      {/* CTA final */}
      <section className="py-20 px-4 text-center">
        <div className="mx-auto max-w-lg">
          <h2 className="text-2xl font-bold mb-4">
            Pronto para descobrir?
          </h2>
          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            5 minutos. 20 perguntas. Nenhuma informação sensível.
            <br />
            Você sai sabendo exatamente onde a gestão financeira da sua empresa
            está e o que fazer a respeito.
          </p>
          <Button asChild size="lg" className="px-8 cursor-pointer font-semibold group">
            <Link href="/diagnostico">
              Fazer meu diagnóstico agora
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </section>

      <Separator />

      {/* Footer */}
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
