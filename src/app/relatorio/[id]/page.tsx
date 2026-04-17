import { notFound } from "next/navigation";
import {
  buscarDiagnosticoPorId,
  buscarPagamentoPorDiagnosticoId,
} from "@/lib/supabase/queries";
import { gerarUrlAssinada } from "@/lib/supabase/storage";
import { Button } from "@/components/ui/button";
import { AutoRefresh } from "@/components/relatorio/auto-refresh";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Relatório — Raio-X Financeiro MARK V",
};

export const dynamic = "force-dynamic";

export default async function RelatorioPage({ params }: PageProps) {
  const { id } = await params;

  const diagnostico = await buscarDiagnosticoPorId(id);
  if (!diagnostico) {
    notFound();
  }

  const pagamento = await buscarPagamentoPorDiagnosticoId(id);

  // State 1: Not paid yet
  if (!pagamento || pagamento.status === "pendente") {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <p className="text-sm font-medium text-markv-light tracking-wider uppercase mb-2">
            Raio-X Financeiro
          </p>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Pagamento pendente
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            O relatório completo estará disponível após a confirmação do pagamento.
          </p>
          <Button asChild className="cursor-pointer">
            <Link href={`/checkout/${id}`}>Ir para o checkout</Link>
          </Button>
        </div>
      </main>
    );
  }

  // State 2: Paid, PDF not yet generated — poll every 5s until ready
  if (diagnostico.status === "pago") {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-12">
        <AutoRefresh intervalMs={5000} />
        <div className="w-full max-w-md text-center">
          <p className="text-sm font-medium text-markv-light tracking-wider uppercase mb-2">
            Raio-X Financeiro
          </p>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Pagamento confirmado
          </h1>
          <div className="rounded-lg border border-border bg-card p-6 mb-6">
            <div className="inline-block w-8 h-8 border-2 border-markv-light border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-sm text-muted-foreground">
              Estamos preparando seu relatório. Isso pode levar alguns instantes.
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Você também receberá o relatório por e-mail em{" "}
            <span className="text-foreground">{diagnostico.email}</span>
          </p>
        </div>
      </main>
    );
  }

  // State 3: PDF ready (relatorio_enviado)
  let pdfUrl: string | null = null;
  try {
    pdfUrl = await gerarUrlAssinada(id);
  } catch {
    // PDF may not be in storage yet — show fallback
  }

  return (
    <main className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-markv-light tracking-wider uppercase mb-2">
            Raio-X Financeiro
          </p>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Seu relatório está pronto
          </h1>
          <p className="text-sm text-muted-foreground">
            {diagnostico.nome_empresa}
          </p>
        </div>

        {/* PDF Download Card */}
        <div className="rounded-lg border border-border bg-card p-6 mb-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-markv-dark/30 border border-markv-dark mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-markv-light">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Relatório completo da maturidade financeira da{" "}
            <span className="text-foreground font-medium">
              {diagnostico.nome_empresa}
            </span>
          </p>
          {pdfUrl ? (
            <Button asChild size="lg" className="w-full cursor-pointer">
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                Baixar relatório em PDF
              </a>
            </Button>
          ) : (
            <Button size="lg" className="w-full" disabled>
              PDF indisponível — tente novamente em instantes
            </Button>
          )}
          <p className="text-xs text-muted-foreground mt-3">
            O relatório também foi enviado para{" "}
            <span className="text-foreground">{diagnostico.email}</span>
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-8">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Próximo passo
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Upsell: Sessão Estratégica */}
        <div className="rounded-lg border border-markv-dark bg-card p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-markv-light" />
            <p className="text-xs font-medium text-markv-light uppercase tracking-wider">
              Recomendado
            </p>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Sessão Estratégica com Lucas Minucci
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            1 hora de consultoria individual para transformar o diagnóstico em
            um plano de ação concreto. Análise das suas respostas, priorização
            dos gaps e recomendações específicas para o seu negócio.
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#14B866" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Revisão detalhada do seu Raio-X com um especialista
            </li>
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#14B866" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Plano de ação priorizado para os próximos 90 dias
            </li>
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#14B866" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Indicadores financeiros que sua empresa deveria acompanhar
            </li>
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#14B866" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Gravação da sessão para consulta futura
            </li>
          </ul>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold text-foreground">R$ 497</span>
            <span className="text-sm text-muted-foreground">sessão única</span>
          </div>
          <Button asChild size="lg" variant="outline" className="w-full cursor-pointer border-markv-dark hover:bg-markv-dark/20 hover:text-markv-light">
            <a
              href="https://markv.com.br/sessao-estrategica"
              target="_blank"
              rel="noopener noreferrer"
            >
              Agendar sessão estratégica
            </a>
          </Button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          Dúvidas? Entre em contato pelo{" "}
          <a
            href="mailto:contato@markv.com.br"
            className="text-foreground underline underline-offset-2"
          >
            contato@markv.com.br
          </a>
        </p>
      </div>
    </main>
  );
}
