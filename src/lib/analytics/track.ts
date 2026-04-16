type EventName =
  | "lp_visited"
  | "diagnostico_iniciado"
  | "pergunta_respondida"
  | "diagnostico_concluido"
  | "resultado_visualizado"
  | "checkout_iniciado"
  | "pagamento_confirmado"
  | "relatorio_baixado";

type EventProperties = Record<string, string | number | boolean | null>;

/**
 * Track an analytics event. Uses PostHog on the client side.
 * Safe to call server-side (no-ops silently).
 */
export function track(event: EventName, properties?: EventProperties): void {
  if (typeof window === "undefined") return;

  try {
    const posthog = (window as unknown as Record<string, unknown>).posthog as
      | { capture?: (event: string, props?: EventProperties) => void }
      | undefined;

    if (posthog?.capture) {
      posthog.capture(event, properties);
    }
  } catch {
    // Analytics should never break the app
  }
}
