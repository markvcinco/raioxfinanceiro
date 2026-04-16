import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-sm font-medium text-markv-light tracking-wider uppercase mb-4">
          404
        </p>
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Página não encontrada
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Button asChild className="cursor-pointer">
          <Link href="/">Voltar ao início</Link>
        </Button>
      </div>
    </main>
  );
}
