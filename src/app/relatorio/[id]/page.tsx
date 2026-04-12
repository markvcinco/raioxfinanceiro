import { notFound } from "next/navigation";
import {
  buscarDiagnosticoPorId,
  buscarPagamentoPorDiagnosticoId,
} from "@/lib/supabase/queries";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Relatório — Raio-X Financeiro MARK V",
};

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

  // State 2: Paid, PDF not yet generated
  if (diagnostico.status === "pago") {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-12">
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
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <p className="text-sm font-medium text-markv-light tracking-wider uppercase mb-2">
          Raio-X Financeiro
        </p>
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Seu relatório está pronto
        </h1>

        <div className="rounded-lg border border-border bg-card p-6 mb-6">
          <p className="text-sm text-muted-foreground mb-4">
            Relatório completo da maturidade financeira da{" "}
            <span className="text-foreground font-medium">
              {diagnostico.nome_empresa}
            </span>
          </p>
          {/* TODO: Add actual PDF download link (next prompt) */}
          <Button size="lg" className="w-full cursor-pointer" disabled>
            Download PDF (em breve)
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          O relatório também foi enviado para{" "}
          <span className="text-foreground">{diagnostico.email}</span>
        </p>
      </div>
    </main>
  );
}
