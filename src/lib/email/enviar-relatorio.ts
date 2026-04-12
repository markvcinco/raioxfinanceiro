/**
 * Envia o relatório PDF por e-mail para o responsável.
 *
 * TODO: Integrar com Resend quando tivermos a API key.
 * Por enquanto, apenas loga a intenção.
 */
export async function enviarRelatorioPorEmail(
  diagnosticoId: string,
  email: string
): Promise<void> {
  console.log(
    `[email] Enviar relatório do diagnóstico ${diagnosticoId} para ${email}`
  );
  console.log(
    `[email] TODO: Integrar Resend — template do e-mail, assunto, etc.`
  );
}
