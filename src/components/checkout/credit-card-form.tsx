"use client";

import { useActionState } from "react";
import { pagarComCartaoAction, type CheckoutFormState } from "@/lib/checkout/actions";
import { Button } from "@/components/ui/button";

interface CreditCardFormProps {
  diagnosticoId: string;
  cpfCnpj: string;
  onVoltar: () => void;
}

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="mt-1 text-xs text-destructive">{errors[0]}</p>;
}

function formatCardNumber(value: string): string {
  return value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 6);
  if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
  return digits;
}

export function CreditCardForm({ diagnosticoId, cpfCnpj, onVoltar }: CreditCardFormProps) {
  const [state, action, isPending] = useActionState<CheckoutFormState, FormData>(
    pagarComCartaoAction,
    {}
  );

  function handleCardNumberInput(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatCardNumber(e.target.value);
    e.target.value = formatted;
  }

  function handleExpiryInput(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatExpiry(e.target.value);
    e.target.value = formatted;
  }

  function handleExpiryBlur(e: React.FocusEvent<HTMLInputElement>) {
    const parts = e.target.value.split("/");
    if (parts.length === 2) {
      const month = parts[0].padStart(2, "0");
      const year = parts[1].length === 2 ? "20" + parts[1] : parts[1];
      e.target.value = month + "/" + year.slice(0, 4);
    }
  }

  // Extract MM and YYYY from expiry field before submit
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    const expiryInput = form.querySelector<HTMLInputElement>('[name="expiry_display"]');
    if (expiryInput) {
      const parts = expiryInput.value.split("/");
      const mesInput = form.querySelector<HTMLInputElement>('[name="mes_validade"]');
      const anoInput = form.querySelector<HTMLInputElement>('[name="ano_validade"]');
      if (mesInput && anoInput && parts.length === 2) {
        mesInput.value = parts[0].padStart(2, "0");
        const year = parts[1].length === 2 ? "20" + parts[1] : parts[1];
        anoInput.value = year;
      }
    }
  }

  const inputClass =
    "w-full rounded-md border border-border bg-muted px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <form action={action} onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="diagnostico_id" value={diagnosticoId} />
      <input type="hidden" name="cpf_cnpj" value={cpfCnpj} />
      <input type="hidden" name="mes_validade" value="" />
      <input type="hidden" name="ano_validade" value="" />

      {/* Card number */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Número do cartão
        </label>
        <input
          name="numero_cartao"
          type="text"
          inputMode="numeric"
          placeholder="0000 0000 0000 0000"
          maxLength={19}
          required
          className={inputClass}
          onChange={handleCardNumberInput}
        />
        <FieldError errors={state.errors?.numero_cartao} />
      </div>

      {/* Holder name */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Nome impresso no cartão
        </label>
        <input
          name="nome_titular"
          type="text"
          placeholder="NOME SOBRENOME"
          required
          className={inputClass}
          style={{ textTransform: "uppercase" }}
        />
        <FieldError errors={state.errors?.nome_titular} />
      </div>

      {/* Expiry + CVV */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Validade
          </label>
          <input
            name="expiry_display"
            type="text"
            inputMode="numeric"
            placeholder="MM/AAAA"
            maxLength={7}
            required
            className={inputClass}
            onChange={handleExpiryInput}
            onBlur={handleExpiryBlur}
          />
          <FieldError errors={state.errors?.mes_validade ?? state.errors?.ano_validade} />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            CVV
          </label>
          <input
            name="cvv"
            type="text"
            inputMode="numeric"
            placeholder="123"
            maxLength={4}
            required
            className={inputClass}
          />
          <FieldError errors={state.errors?.cvv} />
        </div>
      </div>

      {/* CEP + Number */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            CEP de cobrança
          </label>
          <input
            name="cep"
            type="text"
            inputMode="numeric"
            placeholder="00000-000"
            maxLength={9}
            required
            className={inputClass}
          />
          <FieldError errors={state.errors?.cep} />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Número
          </label>
          <input
            name="numero_endereco"
            type="text"
            placeholder="123"
            required
            className={inputClass}
          />
          <FieldError errors={state.errors?.numero_endereco} />
        </div>
      </div>

      {state.message && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}

      <Button type="submit" size="lg" disabled={isPending} className="w-full">
        {isPending ? "Processando pagamento..." : "Pagar R$ 29,90"}
      </Button>

      <button
        type="button"
        onClick={onVoltar}
        className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Voltar
      </button>
    </form>
  );
}
