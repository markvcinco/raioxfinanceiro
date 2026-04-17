"use client";

import { useActionState } from "react";
import { criarDiagnosticoAction, type FormState } from "@/lib/diagnostico/actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const FAIXAS_FATURAMENTO = [
  { value: "ate_500k", label: "Até R$ 500 mil/ano" },
  { value: "500k_2m", label: "R$ 500 mil a R$ 2 milhões" },
  { value: "2m_5m", label: "R$ 2 milhões a R$ 5 milhões" },
  { value: "5m_20m", label: "R$ 5 milhões a R$ 20 milhões" },
  { value: "acima_20m", label: "Acima de R$ 20 milhões" },
] as const;

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="mt-1.5 text-xs text-destructive">{errors[0]}</p>;
}

export function FormCaptura() {
  const [state, action, isPending] = useActionState<FormState, FormData>(
    criarDiagnosticoAction,
    {}
  );

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="nome_responsavel">Seu nome</Label>
        <Input
          id="nome_responsavel"
          name="nome_responsavel"
          type="text"
          required
          autoComplete="name"
          placeholder="Nome completo"
        />
        <FieldError errors={state.errors?.nome_responsavel} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">E-mail corporativo</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="voce@empresa.com.br"
        />
        <FieldError errors={state.errors?.email} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="telefone">Telefone / WhatsApp</Label>
        <Input
          id="telefone"
          name="telefone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="(11) 99999-9999"
        />
        <FieldError errors={state.errors?.telefone} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="nome_empresa">Nome da empresa</Label>
        <Input
          id="nome_empresa"
          name="nome_empresa"
          type="text"
          required
          autoComplete="organization"
          placeholder="Empresa Ltda."
        />
        <FieldError errors={state.errors?.nome_empresa} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="faturamento_anual">Faturamento anual</Label>
        <Select name="faturamento_anual" required>
          <SelectTrigger id="faturamento_anual">
            <SelectValue placeholder="Selecione a faixa" />
          </SelectTrigger>
          <SelectContent>
            {FAIXAS_FATURAMENTO.map((f) => (
              <SelectItem key={f.value} value={f.value}>
                {f.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError errors={state.errors?.faturamento_anual} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="setor">Setor de atuação</Label>
        <Input
          id="setor"
          name="setor"
          type="text"
          required
          placeholder="Ex: Tecnologia, Varejo, Serviços..."
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
        className="w-full cursor-pointer mt-2"
      >
        {isPending ? "Iniciando diagnóstico..." : "Iniciar diagnóstico gratuito"}
      </Button>
    </form>
  );
}
