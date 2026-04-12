import { NextRequest, NextResponse } from "next/server";
import { buscarPagamentoPorAsaasId } from "@/lib/supabase/queries";

export async function GET(request: NextRequest) {
  const paymentId = request.nextUrl.searchParams.get("payment");

  if (!paymentId) {
    return NextResponse.json({ error: "Missing payment ID" }, { status: 400 });
  }

  const pagamento = await buscarPagamentoPorAsaasId(paymentId);

  if (!pagamento) {
    return NextResponse.json({ status: "not_found" }, { status: 404 });
  }

  return NextResponse.json({
    status: pagamento.status,
    diagnostico_id: pagamento.diagnostico_id,
  });
}
