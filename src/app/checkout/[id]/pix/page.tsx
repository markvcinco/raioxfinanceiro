import { notFound, redirect } from "next/navigation";
import {
  buscarDiagnosticoPorId,
  buscarPagamentoPorDiagnosticoId,
} from "@/lib/supabase/queries";
import { createAsaasClient } from "@/lib/asaas/client";
import { PixAguardando } from "@/components/checkout/pix-aguardando";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ payment?: string }>;
}

export const maxDuration = 60;

export const metadata: Metadata = {
  title: "Pagamento PIX — Raio-X Financeiro MARK V",
};

export default async function PixPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { payment: paymentIdParam } = await searchParams;

  const diagnostico = await buscarDiagnosticoPorId(id);
  if (!diagnostico) {
    notFound();
  }

  if (diagnostico.status === "pago" || diagnostico.status === "relatorio_enviado") {
    redirect(`/relatorio/${id}`);
  }

  // Find the payment record
  const pagamento = await buscarPagamentoPorDiagnosticoId(id);
  if (!pagamento || !pagamento.asaas_payment_id) {
    redirect(`/checkout/${id}`);
  }

  if (pagamento.status === "confirmado") {
    redirect(`/relatorio/${id}`);
  }

  const asaasPaymentId = paymentIdParam ?? pagamento.asaas_payment_id;

  // Fetch PIX QR code from Asaas
  let qrCode;
  try {
    const asaas = createAsaasClient();
    qrCode = await asaas.gerarQRCodePix(asaasPaymentId);
  } catch {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <h1 className="text-xl font-bold text-foreground mb-4">
            Erro ao gerar QR Code
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Não foi possível gerar o QR Code PIX. Tente novamente.
          </p>
          <Link
            href={`/checkout/${id}`}
            className="text-sm text-markv-light hover:underline"
          >
            Voltar ao checkout
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-markv-light tracking-wider uppercase mb-2">
            Raio-X Financeiro
          </p>
          <h1 className="text-2xl font-bold text-foreground mb-1">
            Pague com PIX
          </h1>
          <p className="text-sm text-muted-foreground">
            Escaneie o QR Code ou copie o código abaixo
          </p>
        </div>

        <PixAguardando
          diagnosticoId={id}
          asaasPaymentId={asaasPaymentId}
          qrCodeBase64={qrCode.encodedImage}
          pixCopiaECola={qrCode.payload}
          expirationDate={qrCode.expirationDate}
        />

        <div className="mt-8 text-center">
          <Link
            href={`/checkout/${id}`}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Escolher outro método de pagamento
          </Link>
        </div>
      </div>
    </main>
  );
}
