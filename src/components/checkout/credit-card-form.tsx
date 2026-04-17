"use client";

import { useActionState } from "react";
import { pagarComCartaoAction, type CheckoutFormState } from "@/lib/checkout/actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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

  return (
    <form action={action} onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="diagnostico_id" value={diagnosticoId} />
      <input type="hidden" name="mes_validade" value="" />
      <input type="hidden" name="ano_validade" value="" />

      <div className="space-y-1.5">
        <Label htmlFor="cpf_cnpj_card">CPF ou CNPJ do titular</Label>
        <Input
          id="cpf_cnpj_card"
          name="cpf_cnpj"
          type="text"
          inputMode="numeric"
          defaultValue={cpfCnpj}
          placeholder="000.000.000-00 ou 00.000.000/0001-00"
          required
        />
        <FieldError errors={state.errors?.cpf_cnpj} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="numero_cartao">Número do cartão</Label>
        <Input
          id="numero_cartao"
          name="numero_cartao"
          type="text"
          inputMode="numeric"
          placeholder="0000 0000 0000 0000"
          maxLength={19}
          required
          onChange={handleCardNumberInput}
        />
        <FieldError errors={state.errors?.numero_cartao} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="nome_titular">Nome impresso no cartão</Label>
        <Input
          id="nome_titular"
          name="nome_titular"
          type="text"
          placeholder="NOME SOBRENOME"
          required
          style={{ textTransform: "uppercase" }}
        />
        <FieldError errors={state.errors?.nome_titular} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="expiry_display">Validade</Label>
          <Input
            id="expiry_display"
            name="expiry_display"
            type="text"
            inputMode="numeric"
            placeholder="MM/AAAA"
            maxLength={7}
            required
            onChange={handleExpiryInput}
            onBlur={handleExpiryBlur}
          />
          <FieldError errors={state.errors?.mes_validade ?? state.errors?.ano_validade} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            name="cvv"
            type="text"
            inputMode="numeric"
            placeholder="123"
            maxLength={4}
            required
          />
          <FieldError errors={state.errors?.cvv} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="cep">CEP de cobrança</Label>
          <Input
            id="cep"
            name="cep"
            type="text"
            inputMode="numeric"
            placeholder="00000-000"
            maxLength={9}
            required
          />
          <FieldError errors={state.errors?.cep} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="numero_endereco">Número</Label>
          <Input
            id="numero_endereco"
            name="numero_endereco"
            type="text"
            placeholder="123"
            required
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
