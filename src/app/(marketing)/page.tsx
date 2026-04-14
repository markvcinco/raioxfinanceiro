import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="flex max-w-2xl flex-col items-center gap-8 text-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-1.5 rounded-full bg-markv" />
          <span className="text-lg font-semibold tracking-widest text-muted-foreground">
            MARK V
          </span>
        </div>

        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          Raio-X Financeiro
        </h1>

        <p className="max-w-md text-lg text-muted-foreground">
          Diagnóstico da maturidade financeira da sua empresa
        </p>

        <Button asChild size="lg" className="mt-4 px-8 text-base font-semibold">
          <Link href="/diagnostico">Começar diagnóstico</Link>
        </Button>
      </div>
    </div>
  );
}
