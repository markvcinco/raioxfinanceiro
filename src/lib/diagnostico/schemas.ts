import { z } from "zod";

export const leadCapturaSchema = z.object({
  nome_responsavel: z
    .string()
    .min(2, "Nome precisa ter pelo menos 2 caracteres")
    .max(120, "Nome muito longo"),
  email: z.string().email("E-mail inválido"),
  telefone: z
    .string()
    .min(10, "Telefone precisa ter pelo menos 10 dígitos")
    .max(20, "Telefone muito longo")
    .regex(/^[\d\s()+-]+$/, "Telefone inválido"),
  nome_empresa: z
    .string()
    .min(2, "Nome da empresa precisa ter pelo menos 2 caracteres")
    .max(200, "Nome muito longo"),
  faturamento_anual: z.enum(
    ["ate_500k", "500k_2m", "2m_5m", "5m_20m", "acima_20m"],
    { message: "Selecione uma faixa de faturamento" }
  ),
  setor: z
    .string()
    .min(2, "Setor precisa ter pelo menos 2 caracteres")
    .max(100, "Setor muito longo"),
});

export type LeadCapturaInput = z.infer<typeof leadCapturaSchema>;

export const respostaSchema = z.object({
  diagnostico_id: z.string().uuid("ID de diagnóstico inválido"),
  pergunta_id: z.string().min(1),
  alternativa_id: z.string().min(1),
  pontos: z.number().int().min(0).max(10),
});

export type RespostaInput = z.infer<typeof respostaSchema>;
