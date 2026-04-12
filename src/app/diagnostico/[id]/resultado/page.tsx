import { notFound } from "next/navigation";
import { buscarDiagnosticoPorId } from "@/lib/supabase/queries";
import { AREAS } from "@/content/areas";
import { FAIXAS } from "@/content/faixas";
import { RadarScoreChart } from "@/components/resultado/radar-chart";
import { Button } from "@/components/ui/button";
import type { AreaId } from "@/content/areas";
import type { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Resultado — Raio-X Financeiro MARK V",
};

const COR_FAIXA: Record<string, string> = {
  vermelho: "text-red-500",
  laranja: "text-orange-500",
  amarelo: "text-yellow-400",
  verde: "text-emerald-500",
};

const BG_FAIXA: Record<string, string> = {
  vermelho: "bg-red-500/10 border-red-500/30",
  laranja: "bg-orange-500/10 border-orange-500/30",
  amarelo: "bg-yellow-400/10 border-yellow-400/30",
  verde: "bg-emerald-500/10 border-emerald-500/30",
};

function getScoreColor(score: number): string {
  if (score <= 25) return "text-red-500";
  if (score <= 50) return "text-orange-500";
  if (score <= 75) return "text-yellow-400";
  return "text-emerald-500";
}

function getBarColor(score: number): string {
  if (score <= 25) return "bg-red-500";
  if (score <= 50) return "bg-orange-500";
  if (score <= 75) return "bg-yellow-400";
  return "bg-emerald-500";
}

export default async function ResultadoPage({ params }: PageProps) {
  const { id } = await params;

  const diagnostico = await buscarDiagnosticoPorId(id);
  if (!diagnostico || diagnostico.status === "em_andamento") {
    notFound();
  }

  const scoreGeral = diagnostico.score_geral ?? 0;
  const scoreAreas = (diagnostico.score_areas ?? {}) as Record<AreaId, number>;
  const persona = diagnostico.persona ?? "apagando_incendio";
  const faixa = FAIXAS.find((f) => f.id === persona);

  return (
    <main className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-sm font-medium text-markv-light tracking-wider uppercase mb-2">
            Raio-X Financeiro
          </p>
          <h1 className="text-2xl font-bold text-foreground mb-1">
            Resultado do diagnóstico
          </h1>
          <p className="text-sm text-muted-foreground">
            {diagnostico.nome_empresa}
          </p>
        </div>

        {/* Score geral */}
        <div className="text-center mb-8">
          <div className={`text-6xl font-bold tabular-nums ${getScoreColor(scoreGeral)}`}>
            {scoreGeral}
          </div>
          <p className="text-sm text-muted-foreground mt-1">de 100 pontos</p>
        </div>

        {/* Persona badge */}
        {faixa && (
          <div className={`rounded-lg border p-4 mb-10 ${BG_FAIXA[faixa.cor] ?? ""}`}>
            <p className={`text-sm font-semibold ${COR_FAIXA[faixa.cor] ?? ""}`}>
              {faixa.nome}
            </p>
            {faixa.mensagem_ancora !== "A PRODUZIR" && (
              <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                {faixa.mensagem_ancora}
              </p>
            )}
          </div>
        )}

        {/* Radar chart */}
        <div className="mb-10">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4 text-center">
            Maturidade por área
          </h2>
          <RadarScoreChart scoresPorArea={scoreAreas} />
        </div>

        {/* Area scores table */}
        <div className="mb-10">
          <div className="space-y-3">
            {AREAS.map((area) => {
              const score = scoreAreas[area.id] ?? 0;
              return (
                <div key={area.id} className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                      {area.nome}
                    </span>
                    <span className={`text-sm font-semibold tabular-nums ${getScoreColor(score)}`}>
                      {score}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${getBarColor(score)}`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Peso: {Math.round(area.peso * 100)}%
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-lg border border-border bg-card p-6 text-center">
          <h3 className="text-base font-semibold text-foreground mb-2">
            Quer o relatório completo com recomendações específicas?
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Receba um PDF de 14 páginas com análise detalhada de cada área,
            plano de ação priorizado e recomendações personalizadas.
          </p>
          <Button asChild size="lg" className="cursor-pointer">
            <Link href={`/checkout/${id}`}>
              Desbloquear relatório por R$ 29,90
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
