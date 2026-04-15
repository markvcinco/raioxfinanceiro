import { Resend } from "resend";

const FROM_EMAIL =
  process.env.EMAIL_FROM ?? "Raio-X Financeiro <noreply@markv.com.br>";

/**
 * Envia o relatório PDF por e-mail para o responsável.
 * Gracefully no-ops if RESEND_API_KEY is not configured.
 */
export async function enviarRelatorioPorEmail(
  diagnosticoId: string,
  email: string,
  pdfUrl?: string
): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.log(
      `[email] RESEND_API_KEY not configured — skipping email to ${email} for ${diagnosticoId}`
    );
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const linkRelatorio =
    pdfUrl ??
    `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/relatorio/${diagnosticoId}`;

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Seu Raio-X Financeiro está pronto",
    html: gerarHtmlEmail(linkRelatorio),
  });

  if (error) {
    console.error(`[email] Failed to send to ${email}:`, error);
    throw new Error(`Email send failed: ${error.message}`);
  }

  console.log(
    `[email] Sent report email to ${email} for diagnostico ${diagnosticoId}`
  );
}

function gerarHtmlEmail(linkRelatorio: string): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin: 0; padding: 0; background-color: #0A0A0A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 560px; margin: 0 auto; padding: 40px 24px;">
    <div style="margin-bottom: 32px;">
      <span style="font-size: 12px; font-weight: 600; letter-spacing: 2px; color: #14B866; text-transform: uppercase;">MARK V</span>
    </div>

    <h1 style="font-size: 22px; font-weight: 700; color: #FAFAFA; margin: 0 0 16px 0; line-height: 1.3;">
      Seu Raio-X Financeiro está pronto
    </h1>

    <p style="font-size: 14px; color: #A1A1AA; line-height: 1.6; margin: 0 0 24px 0;">
      O relatório completo da maturidade financeira da sua empresa já está disponível.
      São 14 páginas com análise detalhada, pontos de atenção e um plano de ação
      personalizado para os próximos 90 dias.
    </p>

    <div style="margin: 32px 0;">
      <a href="${linkRelatorio}"
         style="display: inline-block; background-color: #0F5F3F; color: #FAFAFA; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 32px; border-radius: 6px;">
        Acessar meu relatório
      </a>
    </div>

    <p style="font-size: 13px; color: #71717A; line-height: 1.5; margin: 0 0 8px 0;">
      Se o botão não funcionar, copie e cole este link no navegador:
    </p>
    <p style="font-size: 12px; color: #52525B; word-break: break-all; margin: 0 0 32px 0;">
      ${linkRelatorio}
    </p>

    <div style="border-top: 1px solid #27272A; padding-top: 24px; margin-top: 32px;">
      <p style="font-size: 12px; color: #52525B; margin: 0 0 4px 0;">
        MARK V &mdash; Finanças, Controladoria &amp; Conselho
      </p>
      <p style="font-size: 12px; color: #52525B; margin: 0;">
        contato@markv.com.br
      </p>
    </div>
  </div>
</body>
</html>`;
}
