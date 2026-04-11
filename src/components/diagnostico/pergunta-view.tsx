"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { salvarRespostaAction } from "@/lib/diagnostico/actions";
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
    <div className="min-h-screen flex flex-col">
      {/* Progress bar */}
      <div className="w-full h-1 bg-border">
        <div
          className="h-full bg-markv-light transition-all duration-300"
          style={{ width: `${progresso}%` }}
        />
      </div>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          {/* Area + question number */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-markv-light tracking-wider uppercase">
                Área {areaNumero} — {areaNome}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Pergunta {numeroPergunta} de {totalPerguntas}
            </p>
          </div>

          {/* Question text */}
          <h2 className="text-lg font-semibold text-foreground leading-relaxed mb-8">
            {pergunta.enunciado}
          </h2>

          {/* Alternatives */}
          <div className="space-y-3">
            {pergunta.alternativas.map((alt, index) => {
              const isSelected = respostaAtual?.alternativa_id === alt.id;
              const letra = String.fromCharCode(65 + index); // A, B, C, D

              return (
                <button
                  key={alt.id}
                  onClick={() => handleSelect(alt.id, alt.pontos)}
                  disabled={isPending}
                  className={`
                    w-full text-left rounded-lg border px-4 py-3.5
                    transition-all duration-150 cursor-pointer
                    focus:outline-none focus:ring-2 focus:ring-ring
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${
                      isSelected
                        ? "border-markv-light bg-markv/10 text-foreground"
                        : "border-border bg-card text-card-foreground hover:border-muted-foreground/40"
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`
                        flex-shrink-0 w-6 h-6 rounded flex items-center justify-center text-xs font-medium mt-0.5
                        ${
                          isSelected
                            ? "bg-markv-light text-white"
                            : "bg-muted text-muted-foreground"
                        }
                      `}
                    >
                      {letra}
                    </span>
                    <span className="text-sm leading-relaxed">{alt.texto}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            {numeroPergunta > 1 ? (
              <button
                onClick={handleVoltar}
                disabled={isPending}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer disabled:opacity-50"
              >
                Voltar
              </button>
            ) : (
              <div />
            )}

            {isPending && (
              <span className="text-xs text-muted-foreground">
                Salvando...
              </span>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
