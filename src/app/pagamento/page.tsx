import { redirect } from "next/navigation";

// Old path — redirect to homepage. Checkout is now at /checkout/[id]
export default function PagamentoPage() {
  redirect("/");
}
