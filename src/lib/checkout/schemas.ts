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

export const cartaoSchema = z.object({
  diagnostico_id: z.string().uuid("ID de diagnóstico inválido"),
  cpf_cnpj: z
    .string()
    .min(11, "CPF/CNPJ inválido")
    .max(18, "CPF/CNPJ inválido")
    .regex(/^[\d.\-/]+$/, "CPF/CNPJ inválido"),
  nome_titular: z.string().min(2, "Nome inválido"),
  numero_cartao: z
    .string()
    .min(13, "Número do cartão inválido")
    .max(19, "Número do cartão inválido")
    .regex(/^[\d\s]+$/, "Número do cartão inválido"),
  mes_validade: z
    .string()
    .regex(/^\d{2}$/, "Mês inválido")
    .refine((v) => parseInt(v) >= 1 && parseInt(v) <= 12, "Mês inválido"),
  ano_validade: z
    .string()
    .regex(/^\d{4}$/, "Ano inválido"),
  cvv: z
    .string()
    .min(3, "CVV inválido")
    .max(4, "CVV inválido")
    .regex(/^\d+$/, "CVV inválido"),
  cep: z
    .string()
    .min(8, "CEP inválido")
    .max(9, "CEP inválido")
    .regex(/^[\d\-]+$/, "CEP inválido"),
  numero_endereco: z.string().min(1, "Número obrigatório"),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type CartaoInput = z.infer<typeof cartaoSchema>;
