import { Button } from "@/components/ui/button";
import { AREAS } from "@/content/areas";
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
  "Score geral e classificação da maturidade financeira",
  "Análise individual das 5 áreas com diagnóstico por faixa",
  "Os 3 pontos de maior fragilidade da sua gestão",
  "Plano de ação personalizado para os próximos 90 dias",
  "Radar visual comparativo entre as áreas",
] as const;

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

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl max-w-3xl mb-6">
          Sua empresa tem gestão financeira
          <br />
          <span className="text-markv-light">ou só paga as contas?</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
          Descubra o nível de maturidade financeira do seu negócio em menos de
          5 minutos. 20 perguntas, score imediato, diagnóstico completo.
        </p>

        <Button asChild size="lg" className="px-8 text-base font-semibold cursor-pointer">
          <Link href="/diagnostico">Fazer meu diagnóstico</Link>
        </Button>

        <p className="text-xs text-muted-foreground mt-4">
          Gratuito até o resultado. Relatório completo por R$ 29,90.
        </p>
      </section>

      {/* Prova social */}
      <section className="border-t border-border py-12 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Desenvolvido por{" "}
            <span className="text-foreground font-medium">Lucas Minucci</span>,
            especialista em finanças, controladoria e conselho consultivo para
            PMEs. Mais de 10 anos ajudando empresas a tomar decisões financeiras
            com método.
          </p>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-12">
            Como funciona
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {PASSOS.map((passo) => (
              <div key={passo.num} className="rounded-lg border border-border bg-card p-6">
                <span className="text-xs font-semibold text-markv-light tracking-wider">
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

      {/* 5 áreas */}
      <section className="py-20 px-4 border-t border-border">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-4">
            O que você vai descobrir
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-12 max-w-lg mx-auto">
            O diagnóstico avalia 5 áreas da maturidade financeira da sua empresa,
            cada uma com peso específico no score final.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AREAS.map((area) => (
              <div
                key={area.id}
                className="rounded-lg border border-border bg-card p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">{area.icone}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {area.nome}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      Peso: {Math.round(area.peso * 100)}%
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {area.eixo}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O que está no relatório */}
      <section className="py-20 px-4 border-t border-border">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-center mb-4">
            O que está no relatório
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-10">
            14 páginas de análise personalizada para a sua empresa.
          </p>

          <div className="space-y-4">
            {RELATORIO_ITEMS.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-markv-light mt-0.5 shrink-0"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <p className="text-sm text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preço */}
      <section className="py-20 px-4 border-t border-border">
        <div className="mx-auto max-w-md text-center">
          <div className="rounded-xl border border-markv/50 bg-card p-8">
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
            <p className="text-xs text-muted-foreground mt-4">
              O diagnóstico e o score são gratuitos.
              <br />
              Você só paga se quiser o relatório completo em PDF.
            </p>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 px-4 border-t border-border text-center">
        <div className="mx-auto max-w-lg">
          <h2 className="text-2xl font-bold mb-4">
            Pronto para descobrir?
          </h2>
          <p className="text-sm text-muted-foreground mb-8">
            5 minutos. 20 perguntas. Nenhuma informação sensível.
            <br />
            Você sai sabendo exatamente onde a gestão financeira da sua empresa
            está e o que fazer a respeito.
          </p>
          <Button asChild size="lg" className="px-8 cursor-pointer font-semibold">
            <Link href="/diagnostico">Fazer meu diagnóstico agora</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
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
