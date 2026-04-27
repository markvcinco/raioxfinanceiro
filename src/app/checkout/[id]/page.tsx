import { notFound, redirect } from "next/navigation";
import { buscarDiagnosticoPorId } from "@/lib/supabase/queries";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { SplineBackground } from "@/components/immersive/spline-background";
import type { Metadata } from "next";

export const maxDuration = 60;

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Checkout — Raio-X Financeiro MARK V",
};

export default async function CheckoutPage({ params }: PageProps) {
  const { id } = await params;

  const diagnostico = await buscarDiagnosticoPorId(id);
  if (!diagnostico) {
    notFound();
  }

  if (diagnostico.status === "pago" || diagnostico.status === "relatorio_enviado") {
    redirect(`/relatorio/${id}`);
  }

  if (diagnostico.status === "em_andamento") {
    redirect(`/diagnostico/${id}/1`);
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-background overflow-hidden">
      <SplineBackground
        className="fixed inset-0 pointer-events-none"
        overlayClassName="fixed inset-0 bg-black/50 z-[1] pointer-events-none"
      />
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8">
          <p className="text-sm font-medium text-markv-light tracking-wider uppercase mb-2">
            Raio-X Financeiro
          </p>
          <h1 className="text-2xl font-bold text-foreground">
            Relatório Completo
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Desbloqueie a análise detalhada da maturidade financeira da{" "}
            <span className="text-foreground font-medium">
              {diagnostico.nome_empresa}
            </span>
          </p>
        </div>

        {/* Price */}
        <div className="rounded-lg border border-border bg-card p-5 mb-6">
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-sm text-muted-foreground">
              Relatório PDF — 14 páginas
            </span>
            <span className="text-xl font-bold text-foreground">R$ 29,90</span>
          </div>

          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-markv-light mt-0.5">&#10003;</span>
              Análise detalhada das 5 áreas com recomendações específicas
            </li>
            <li className="flex items-start gap-2">
              <span className="text-markv-light mt-0.5">&#10003;</span>
              Plano de ação priorizado por impacto e urgência
            </li>
            <li className="flex items-start gap-2">
              <span className="text-markv-light mt-0.5">&#10003;</span>
              Benchmark contra empresas do mesmo porte
            </li>
            <li className="flex items-start gap-2">
              <span className="text-markv-light mt-0.5">&#10003;</span>
              Indicadores financeiros que você deveria acompanhar
            </li>
          </ul>
        </div>

        <CheckoutForm diagnosticoId={id} />

        <p className="mt-4 text-xs text-center text-muted-foreground">
          Pagamento processado com segurança via Asaas.
          Você receberá o relatório imediatamente após a confirmação.
        </p>
      </div>
    </main>
  );
}
