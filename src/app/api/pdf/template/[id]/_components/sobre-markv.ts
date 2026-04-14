import { wrapPage } from "./shared";

export function renderSobreMarkV(nomeEmpresa: string): string {
  const content = `
  <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
    <div style="max-width: 400px;">
      <div style="font-size: 13px; font-weight: 600; letter-spacing: 3px; color: #14B866; text-transform: uppercase; margin-bottom: 24px;">
        MARK V
      </div>

      <h2 style="font-size: 22px; font-weight: 700; color: #FAFAFA; margin-bottom: 8px;">
        Quem somos
      </h2>
      <p style="font-size: 11px; color: #71717A; margin-bottom: 32px;">
        Finanças, Controladoria &amp; Conselho para PMEs
      </p>

      <div style="background: #18181B; border: 1px dashed #27272A; border-radius: 8px; padding: 32px; margin-bottom: 32px;">
        <p style="font-size: 12px; color: #52525B; font-style: italic;">
          A PRODUZIR &mdash; Bio de Lucas Minucci e descrição da MARK V
        </p>
      </div>

      <div style="text-align: center;">
        <p style="font-size: 12px; font-weight: 500; color: #A1A1AA; margin-bottom: 12px;">
          Contato
        </p>
        <p style="font-size: 11px; color: #D4D4D8; margin-bottom: 6px;">
          contato@markv.com.br
        </p>
        <p style="font-size: 11px; color: #71717A; font-style: italic;">
          Redes sociais &mdash; A PRODUZIR
        </p>
      </div>

      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #27272A;">
        <p style="font-size: 9px; color: #52525B;">
          Este relatório é confidencial e de uso exclusivo do destinatário.
        </p>
        <p style="font-size: 9px; color: #52525B; margin-top: 4px;">
          &copy; 2026 MARK V. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </div>`;

  return wrapPage(content, 14, nomeEmpresa);
}
