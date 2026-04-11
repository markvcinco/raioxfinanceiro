"use client";

import { useActionState } from "react";
import { criarDiagnosticoAction, type FormState } from "@/lib/diagnostico/actions";
import { Button } from "@/components/ui/button";

const FAIXAS_FATURAMENTO = [
  { value: "ate_500k", label: "Até R$ 500 mil/ano" },
  { value: "500k_2m", label: "R$ 500 mil a R$ 2 milhões" },
  { value: "2m_5m", label: "R$ 2 milhões a R$ 5 milhões" },
  { value: "5m_20m", label: "R$ 5 milhões a R$ 20 milhões" },
  { value: "acima_20m", label: "Acima de R$ 20 milhões" },
] as const;

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p className="mt-1 text-sm text-destructive">{errors[0]}</p>
  );
}

export function FormCaptura() {
  const [state, action, isPending] = useActionState<FormState, FormData>(
    criarDiagnosticoAction,
    {}
  );

  return (
    <form action={action} className="space-y-5">
      <div>
        <label htmlFor="nome_responsavel" className="block text-sm font-medium text-foreground mb-1.5">
          Seu nome
        </label>
        <input
          id="nome_responsavel"
          name="nome_responsavel"
          type="text"
          required
          autoComplete="name"
          placeholder="Nome completo"
          className="w-full rounded-md border border-border bg-muted px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <FieldError errors={state.errors?.nome_responsavel} />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
          E-mail corporativo
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="voce@empresa.com.br"
          className="w-full rounded-md border border-border bg-muted px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <FieldError errors={state.errors?.email} />
      </div>

      <div>
        <label htmlFor="telefone" className="block text-sm font-medium text-foreground mb-1.5">
          Telefone / WhatsApp
        </label>
        <input
          id="telefone"
          name="telefone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="(11) 99999-9999"
          className="w-full rounded-md border border-border bg-muted px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <FieldError errors={state.errors?.telefone} />
      </div>

      <div>
        <label htmlFor="nome_empresa" className="block text-sm font-medium text-foreground mb-1.5">
          Nome da empresa
        </label>
        <input
          id="nome_empresa"
          name="nome_empresa"
          type="text"
          required
          autoComplete="organization"
          placeholder="Empresa Ltda."
          className="w-full rounded-md border border-border bg-muted px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <FieldError errors={state.errors?.nome_empresa} />
      </div>

      <div>
        <label htmlFor="faturamento_anual" className="block text-sm font-medium text-foreground mb-1.5">
          Faturamento anual
        </label>
        <select
          id="faturamento_anual"
          name="faturamento_anual"
          required
          className="w-full rounded-md border border-border bg-muted px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">Selecione a faixa</option>
          {FAIXAS_FATURAMENTO.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
        <FieldError errors={state.errors?.faturamento_anual} />
      </div>

      <div>
        <label htmlFor="setor" className="block text-sm font-medium text-foreground mb-1.5">
          Setor de atuação
        </label>
        <input
          id="setor"
          name="setor"
          type="text"
          required
          placeholder="Ex: Tecnologia, Varejo, Serviços..."
          className="w-full rounded-md border border-border bg-muted px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <FieldError errors={state.errors?.setor} />
      </div>

      {state.message && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="w-full cursor-pointer"
      >
        {isPending ? "Iniciando diagnóstico..." : "Iniciar diagnóstico gratuito"}
      </Button>
    </form>
  );
}
