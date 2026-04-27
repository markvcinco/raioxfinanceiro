"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { salvarRespostaAction } from "@/lib/diagnostico/actions";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { SplineBackground } from "@/components/immersive/spline-background";
import type { Pergunta } from "@/content/perguntas";
import type { Resposta } from "@/types";

interface PerguntaViewProps {
  diagnosticoId: string;
  pergunta: Pergunta;
  numeroPergunta: number;
  totalPerguntas: number;
  areaNome: string;
  areaNumero: number;
  respostaAtual?: Resposta;
}

export function PerguntaView({
  diagnosticoId,
  pergunta,
  numeroPergunta,
  totalPerguntas,
  areaNome,
  areaNumero,
  respostaAtual,
}: PerguntaViewProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const progresso = (numeroPergunta / totalPerguntas) * 100;

  function handleSelect(alternativaId: string, pontos: number) {
    startTransition(async () => {
      await salvarRespostaAction(
        diagnosticoId,
        pergunta.id,
        alternativaId,
        pontos,
        numeroPergunta
      );
    });
  }

  function handleVoltar() {
    if (numeroPergunta > 1) {
      router.push(`/diagnostico/${diagnosticoId}/${numeroPergunta - 1}`);
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-hero-bg overflow-hidden">
      <SplineBackground className="absolute inset-0" />
      <Progress value={progresso} />

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">

          {/* Meta */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-xs font-medium text-markv-light tracking-wider uppercase">
              Área {areaNumero} — {areaNome}
            </span>
            <span className="text-xs text-muted-foreground tabular-nums">
              {numeroPergunta} <span className="text-zinc-600">/ {totalPerguntas}</span>
            </span>
          </div>

          {/* Question */}
          <h2 className="text-xl font-semibold text-foreground leading-relaxed mb-8">
            {pergunta.enunciado}
          </h2>

          {/* Alternatives */}
          <div className="space-y-2.5" role="radiogroup" aria-label="Selecione uma alternativa">
            {pergunta.alternativas.map((alt, index) => {
              const isSelected = respostaAtual?.alternativa_id === alt.id;
              const letra = String.fromCharCode(65 + index);

              return (
                <button
                  key={alt.id}
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleSelect(alt.id, alt.pontos)}
                  disabled={isPending}
                  className={cn(
                    "group w-full text-left rounded-lg border px-4 py-4",
                    "transition-all duration-150 cursor-pointer",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    "disabled:opacity-60 disabled:cursor-not-allowed",
                    isSelected
                      ? "border-markv-light bg-markv/10"
                      : "border-border bg-card hover:border-zinc-600 hover:bg-zinc-900/60"
                  )}
                >
                  <div className="flex items-start gap-3">
                    {/* Radio indicator */}
                    <div
                      className={cn(
                        "mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-150",
                        isSelected
                          ? "border-markv-light bg-markv-light"
                          : "border-zinc-600 group-hover:border-zinc-400"
                      )}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-black" />}
                    </div>

                    {/* Letter */}
                    <span
                      className={cn(
                        "flex-shrink-0 mt-0.5 text-xs font-semibold w-4",
                        isSelected ? "text-markv-light" : "text-zinc-600 group-hover:text-zinc-400"
                      )}
                    >
                      {letra}
                    </span>

                    {/* Text */}
                    <span
                      className={cn(
                        "text-sm leading-relaxed transition-colors",
                        isSelected
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                      )}
                    >
                      {alt.texto}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer nav */}
          <div className="mt-8 flex items-center justify-between">
            {numeroPergunta > 1 ? (
              <button
                onClick={handleVoltar}
                disabled={isPending}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer disabled:opacity-50"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Voltar
              </button>
            ) : (
              <div />
            )}

            {isPending && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border-2 border-markv-light border-t-transparent animate-spin" />
                <span className="text-xs text-muted-foreground">Salvando...</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
