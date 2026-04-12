import { listarPagamentosRecentes } from "@/lib/supabase/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Pagamentos",
};

export const dynamic = "force-dynamic";

const STATUS_BADGE: Record<string, string> = {
  pendente: "bg-yellow-400/10 text-yellow-400 border-yellow-400/30",
  confirmado: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
  recebido: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
  vencido: "bg-red-500/10 text-red-500 border-red-500/30",
  cancelado: "bg-muted text-muted-foreground border-border",
  estornado: "bg-red-500/10 text-red-500 border-red-500/30",
};

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminPagamentosPage() {
  const pagamentos = await listarPagamentosRecentes(50);

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-xl font-bold text-foreground mb-1">Pagamentos</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Últimos 50 pagamentos registrados
        </p>

        {pagamentos.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Nenhum pagamento registrado ainda.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                    Data
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                    Nome
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                    E-mail
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                    Empresa
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                    Valor
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                    Método
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {pagamentos.map((p) => (
                  <tr
                    key={p.pagamento_id}
                    className="border-b border-border last:border-0 hover:bg-muted/50"
                  >
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                      {formatDate(p.pago_em ?? p.created_at)}
                    </td>
                    <td className="px-4 py-3 text-foreground">
                      {p.nome_responsavel}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {p.email}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {p.nome_empresa}
                    </td>
                    <td className="px-4 py-3 text-foreground text-right tabular-nums">
                      R$ {(p.valor ?? 0).toFixed(2).replace(".", ",")}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground uppercase text-xs">
                      {p.metodo ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full border px-2 py-0.5 text-xs font-medium ${
                          STATUS_BADGE[p.pagamento_status ?? ""] ?? STATUS_BADGE.pendente
                        }`}
                      >
                        {p.pagamento_status ?? "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {p.diagnostico_id && (
                        <a
                          href={`/diagnostico/${p.diagnostico_id}/resultado`}
                          className="text-xs text-markv-light hover:underline"
                        >
                          Ver resultado
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
