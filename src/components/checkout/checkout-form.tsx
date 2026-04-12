"use client";

import { useActionState } from "react";
import { iniciarCheckoutAction, type CheckoutFormState } from "@/lib/checkout/actions";
import { Button } from "@/components/ui/button";

interface CheckoutFormProps {
  diagnosticoId: string;
}

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="mt-1 text-sm text-destructive">{errors[0]}</p>;
}

export function CheckoutForm({ diagnosticoId }: CheckoutFormProps) {
  const [state, action, isPending] = useActionState<CheckoutFormState, FormData>(
    iniciarCheckoutAction,
    {}
  );

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="diagnostico_id" value={diagnosticoId} />

      <div>
        <label
          htmlFor="cpf_cnpj"
          className="block text-sm font-medium text-foreground mb-1.5"
        >
          CPF ou CNPJ
        </label>
        <input
          id="cpf_cnpj"
          name="cpf_cnpj"
          type="text"
          required
          placeholder="000.000.000-00 ou 00.000.000/0001-00"
          className="w-full rounded-md border border-border bg-muted px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <FieldError errors={state.errors?.cpf_cnpj} />
      </div>

      {state.message && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}

      <div className="space-y-3">
        <Button
          type="submit"
          name="metodo"
          value="PIX"
          size="lg"
          disabled={isPending}
          className="w-full cursor-pointer"
        >
          {isPending ? "Processando..." : "Pagar com PIX — R$ 29,90"}
        </Button>

        <Button
          type="submit"
          name="metodo"
          value="CREDIT_CARD"
          size="lg"
          variant="outline"
          disabled={isPending}
          className="w-full cursor-pointer"
        >
          {isPending ? "Processando..." : "Pagar com cartão — R$ 29,90"}
        </Button>
      </div>
    </form>
  );
}
