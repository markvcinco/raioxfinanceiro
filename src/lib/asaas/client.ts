import type {
  AsaasCustomerRequest,
  AsaasCustomer,
  AsaasCustomerList,
  AsaasPaymentRequest,
  AsaasPayment,
  AsaasPixQrCode,
  AsaasError,
} from "./types";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

function getBaseUrl(): string {
  const env = process.env.NEXT_PUBLIC_ASAAS_ENV ?? "sandbox";
  return env === "production"
    ? "https://www.asaas.com/api/v3"
    : "https://sandbox.asaas.com/api/v3";
}

function getApiKey(): string {
  const key = process.env.ASAAS_API_KEY;
  if (!key) throw new Error("ASAAS_API_KEY não configurada");
  return key;
}

// ---------------------------------------------------------------------------
// Fetch wrapper
// ---------------------------------------------------------------------------

class AsaasApiError extends Error {
  constructor(
    public status: number,
    public errors: AsaasError["errors"],
  ) {
    const msg = errors.map((e) => `${e.code}: ${e.description}`).join("; ");
    super(`Asaas API error (${status}): ${msg}`);
    this.name = "AsaasApiError";
  }
}

async function asaasFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${getBaseUrl()}${path}`;
  const apiKey = getApiKey();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    console.log(`[asaas] ${options.method ?? "GET"} ${path}`);

    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        access_token: apiKey,
        ...options.headers,
      },
    });

    const body = await res.json();

    if (!res.ok) {
      const asaasErr = body as AsaasError;
      console.error(`[asaas] Error ${res.status}:`, JSON.stringify(asaasErr));
      throw new AsaasApiError(res.status, asaasErr.errors ?? []);
    }

    console.log(`[asaas] ${res.status} OK`);
    return body as T;
  } catch (err) {
    if (err instanceof AsaasApiError) throw err;
    if ((err as Error).name === "AbortError") {
      throw new Error(`[asaas] Timeout ao chamar ${path}`);
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

// ---------------------------------------------------------------------------
// Client
// ---------------------------------------------------------------------------

export function createAsaasClient() {
  return {
    /**
     * Cria um novo cliente no Asaas.
     * POST /customers
     */
    async criarCliente(dados: AsaasCustomerRequest): Promise<AsaasCustomer> {
      return asaasFetch<AsaasCustomer>("/customers", {
        method: "POST",
        body: JSON.stringify(dados),
      });
    },

    /**
     * Busca cliente por CPF/CNPJ para evitar duplicatas.
     * GET /customers?cpfCnpj=...
     */
    async buscarClientePorCpfCnpj(
      cpfCnpj: string,
    ): Promise<AsaasCustomer | null> {
      const result = await asaasFetch<AsaasCustomerList>(
        `/customers?cpfCnpj=${encodeURIComponent(cpfCnpj)}`,
      );
      return result.data.length > 0 ? result.data[0] : null;
    },

    /**
     * Cria uma nova cobrança.
     * POST /payments
     */
    async criarCobranca(dados: AsaasPaymentRequest): Promise<AsaasPayment> {
      return asaasFetch<AsaasPayment>("/payments", {
        method: "POST",
        body: JSON.stringify(dados),
      });
    },

    /**
     * Busca uma cobrança pelo ID.
     * GET /payments/{id}
     */
    async buscarCobranca(id: string): Promise<AsaasPayment> {
      return asaasFetch<AsaasPayment>(`/payments/${encodeURIComponent(id)}`);
    },

    /**
     * Gera QR Code PIX para uma cobrança.
     * GET /payments/{id}/pixQrCode
     */
    async gerarQRCodePix(paymentId: string): Promise<AsaasPixQrCode> {
      return asaasFetch<AsaasPixQrCode>(
        `/payments/${encodeURIComponent(paymentId)}/pixQrCode`,
      );
    },
  };
}

export { AsaasApiError };
