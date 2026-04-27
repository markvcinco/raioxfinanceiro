import type { Metadata } from "next";
import { FormCaptura } from "@/components/diagnostico/form-captura";
import { SplineBackground } from "@/components/immersive/spline-background";

export const metadata: Metadata = {
  title: "Diagnóstico — Raio-X Financeiro MARK V",
  description:
    "Responda 20 perguntas e descubra o nível de maturidade financeira da sua empresa.",
};

export default function DiagnosticoPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-hero-bg overflow-hidden">
      <SplineBackground />
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8">
          <p className="text-sm font-medium text-markv-light tracking-wider uppercase mb-2">
            Raio-X Financeiro
          </p>
          <h1 className="text-2xl font-bold text-foreground">
            Antes de começar, precisamos de alguns dados
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Seus dados são usados exclusivamente para gerar o diagnóstico.
            Nenhuma informação será compartilhada.
          </p>
        </div>

        <FormCaptura />
      </div>
    </main>
  );
}
