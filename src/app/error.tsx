"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-sm font-medium text-red-500 tracking-wider uppercase mb-4">
          Erro
        </p>
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Algo deu errado
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Ocorreu um erro inesperado. Tente novamente ou volte ao início.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button onClick={() => reset()} variant="outline" className="cursor-pointer">
            Tentar novamente
          </Button>
          <Button asChild className="cursor-pointer">
            <a href="/">Voltar ao início</a>
          </Button>
        </div>
      </div>
    </main>
  );
}
