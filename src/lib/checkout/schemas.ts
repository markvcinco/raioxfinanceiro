import { z } from "zod";

export const checkoutSchema = z.object({
  diagnostico_id: z.string().uuid("ID de diagnóstico inválido"),
  cpf_cnpj: z
    .string()
    .min(11, "CPF/CNPJ inválido")
    .max(18, "CPF/CNPJ inválido")
    .regex(/^[\d.\-/]+$/, "CPF/CNPJ inválido"),
  metodo: z.enum(["PIX", "CREDIT_CARD"], {
    message: "Método de pagamento inválido",
  }),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
