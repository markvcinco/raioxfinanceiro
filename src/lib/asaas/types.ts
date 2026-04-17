import { z } from "zod";

// ---------------------------------------------------------------------------
// Asaas API — Request types
// ---------------------------------------------------------------------------

export interface AsaasCustomerRequest {
  name: string;
  email?: string;
  phone?: string;
  cpfCnpj: string;
  company?: string;
  externalReference?: string;
}

export interface AsaasPaymentRequest {
  customer: string;
  billingType: "PIX" | "CREDIT_CARD" | "BOLETO" | "UNDEFINED";
  value: number;
  dueDate: string; // YYYY-MM-DD
  description?: string;
  externalReference?: string;
  callbackSuccessUrl?: string;
}

// ---------------------------------------------------------------------------
// Asaas API — Response types
// ---------------------------------------------------------------------------

export interface AsaasCustomer {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  cpfCnpj: string;
  company: string | null;
  externalReference: string | null;
  dateCreated: string;
}

export interface AsaasPayment {
  id: string;
  customer: string;
  billingType: string;
  value: number;
  netValue: number;
  status: string;
  dueDate: string;
  confirmedDate: string | null;
  paymentDate: string | null;
  description: string | null;
  externalReference: string | null;
  invoiceUrl: string;
  bankSlipUrl: string | null;
  transactionReceiptUrl: string | null;
  dateCreated: string;
}

export interface AsaasPixQrCode {
  encodedImage: string; // base64
  payload: string; // copia-e-cola
  expirationDate: string;
}

export interface AsaasCustomerList {
  totalCount: number;
  data: AsaasCustomer[];
}

// ---------------------------------------------------------------------------
// Asaas API — Error
// ---------------------------------------------------------------------------

export interface AsaasError {
  errors: Array<{
    code: string;
    description: string;
  }>;
}

// ---------------------------------------------------------------------------
// Webhook — Zod schemas for validation
// ---------------------------------------------------------------------------

const asaasWebhookPaymentSchema = z.object({
  id: z.string(),
  customer: z.string(),
  billingType: z.string(),
  value: z.number(),
  netValue: z.number().optional(),
  status: z.string(),
  dueDate: z.string(),
  confirmedDate: z.string().nullable().optional(),
  paymentDate: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  externalReference: z.string().nullable().optional(),
  invoiceUrl: z.string().optional(),
  bankSlipUrl: z.string().nullable().optional(),
  dateCreated: z.string().optional(),
});

export const asaasWebhookEventSchema = z.object({
  event: z.string(),
  payment: asaasWebhookPaymentSchema,
});

export type AsaasWebhookEvent = z.infer<typeof asaasWebhookEventSchema>;

// Asaas payment status values
export type AsaasPaymentStatus =
  | "PENDING"
  | "RECEIVED"
  | "CONFIRMED"
  | "OVERDUE"
  | "REFUNDED"
  | "RECEIVED_IN_CASH"
  | "REFUND_REQUESTED"
  | "REFUND_IN_PROGRESS"
  | "CHARGEBACK_REQUESTED"
  | "CHARGEBACK_DISPUTE"
  | "AWAITING_CHARGEBACK_REVERSAL"
  | "DUNNING_REQUESTED"
  | "DUNNING_RECEIVED"
  | "AWAITING_RISK_ANALYSIS";

// Webhook event types we care about
export const WEBHOOK_PAYMENT_EVENTS = [
  "PAYMENT_CONFIRMED",
  "PAYMENT_RECEIVED",
  "PAYMENT_OVERDUE",
  "PAYMENT_REFUNDED",
  "PAYMENT_DELETED",
] as const;
