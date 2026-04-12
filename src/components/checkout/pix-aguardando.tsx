"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface PixAguardandoProps {
  diagnosticoId: string;
  asaasPaymentId: string;
  qrCodeBase64: string;
  pixCopiaECola: string;
  expirationDate: string;
}

export function PixAguardando({
  diagnosticoId,
  asaasPaymentId,
  qrCodeBase64,
  pixCopiaECola,
  expirationDate,
}: PixAguardandoProps) {
  const router = useRouter();
  const [copiado, setCopiado] = useState(false);
  const [tempoRestante, setTempoRestante] = useState("");
  const [expirado, setExpirado] = useState(false);

  // Timer countdown
  useEffect(() => {
    const expDate = new Date(expirationDate);

    function atualizar() {
      const agora = new Date();
      const diff = expDate.getTime() - agora.getTime();

      if (diff <= 0) {
        setExpirado(true);
        setTempoRestante("Expirado");
        return;
      }

      const minutos = Math.floor(diff / 60_000);
      const segundos = Math.floor((diff % 60_000) / 1_000);
      setTempoRestante(
        `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`
      );
    }

    atualizar();
    const interval = setInterval(atualizar, 1_000);
    return () => clearInterval(interval);
  }, [expirationDate]);

  // Polling for payment confirmation
  const checkStatus = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/checkout/status?payment=${encodeURIComponent(asaasPaymentId)}`
      );
      if (!res.ok) return;
      const data = await res.json();
      if (data.status === "confirmado") {
        router.push(`/relatorio/${diagnosticoId}`);
      }
    } catch {
      // silently retry on next interval
    }
  }, [asaasPaymentId, diagnosticoId, router]);

  useEffect(() => {
    if (expirado) return;
    const interval = setInterval(checkStatus, 5_000);
    return () => clearInterval(interval);
  }, [checkStatus, expirado]);

  async function handleCopiar() {
    try {
      await navigator.clipboard.writeText(pixCopiaECola);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 3_000);
    } catch {
      // fallback: select text
    }
  }

  return (
    <div className="text-center">
      {/* QR Code */}
      <div className="inline-block rounded-xl bg-white p-4 mb-6">
        <img
          src={`data:image/png;base64,${qrCodeBase64}`}
          alt="QR Code PIX"
          width={240}
          height={240}
          className="block"
        />
      </div>

      {/* Timer */}
      <div className="mb-6">
        {expirado ? (
          <p className="text-sm text-destructive font-medium">
            QR Code expirado. Volte ao checkout para gerar um novo.
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Expira em{" "}
            <span className="font-mono font-medium text-foreground">
              {tempoRestante}
            </span>
          </p>
        )}
      </div>

      {/* Copia e cola */}
      <div className="mb-6">
        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
          PIX copia e cola
        </p>
        <div className="relative">
          <input
            type="text"
            readOnly
            value={pixCopiaECola}
            className="w-full rounded-md border border-border bg-muted px-3 py-2.5 text-xs text-muted-foreground font-mono pr-20 focus:outline-none"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleCopiar}
            className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer text-xs"
          >
            {copiado ? "Copiado" : "Copiar"}
          </Button>
        </div>
      </div>

      {/* Status */}
      {!expirado && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span className="inline-block w-2 h-2 rounded-full bg-markv-light animate-pulse" />
          Aguardando pagamento...
        </div>
      )}
    </div>
  );
}
