import { wrapPage } from "./shared";

export function renderUpsellSessao(nomeEmpresa: string): string {
  const agenda: ReadonlyArray<{ tempo: string; bloco: string }> = [
    { tempo: "5 min", bloco: "Apresentação" },
    { tempo: "15 min", bloco: "Revisão do relatório" },
    { tempo: "25 min", bloco: "Aprofundamento" },
    { tempo: "10 min", bloco: "Ações prioritárias" },
    { tempo: "5 min", bloco: "Próximos passos" },
  ];

  const agendaRows = agenda
    .map(
      (item, idx) => `
        <tr>
          <td style="padding: 10px 14px; font-size: 11px; font-weight: 600; color: #14B866; width: 80px; ${idx > 0 ? "border-top: 1px solid #27272A;" : ""}">
            ${item.tempo}
          </td>
          <td style="padding: 10px 14px; font-size: 11px; color: #D4D4D8; ${idx > 0 ? "border-top: 1px solid #27272A;" : ""}">
            ${item.bloco}
          </td>
        </tr>`
    )
    .join("");

  const content = `
  <div style="padding-top: 25mm;">
    <div style="margin-bottom: 18px;">
      <p style="font-size: 12px; font-weight: 500; letter-spacing: 2px; color: #14B866; text-transform: uppercase; margin-bottom: 6px;">
        Próximo passo recomendado
      </p>
      <h2 style="font-size: 22px; font-weight: 700; color: #FAFAFA; margin-bottom: 6px;">
        Sessão Estratégica MARK V
      </h2>
      <p style="font-size: 12px; color: #A1A1AA; line-height: 1.5;">
        1 hora de consultoria individual com Lucas Minucci para transformar este diagnóstico em um plano de ação concreto.
      </p>
    </div>

    <div style="margin-bottom: 18px;">
      <p style="font-size: 11px; font-weight: 600; color: #FAFAFA; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">
        Como a hora é usada — minuto a minuto
      </p>
      <table style="width: 100%; border-collapse: collapse; background: #18181B; border: 1px solid #27272A; border-radius: 8px; overflow: hidden;">
        <tbody>
          ${agendaRows}
        </tbody>
      </table>
    </div>

    <div style="background: #0F5F3F15; border-left: 3px solid #14B866; border-radius: 4px; padding: 14px 16px; margin-bottom: 18px;">
      <p style="font-size: 10px; font-weight: 600; color: #14B866; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">
        Por que isso não é uma call de vendas disfarçada
      </p>
      <p style="font-size: 11px; color: #D4D4D8; line-height: 1.6;">
        Eu não vou tentar te vender nada na hora. Se ao final da sessão fizer sentido você seguir comigo em algum dos meus produtos, eu te conto o que existe e você decide depois, sem pressão. A sessão é técnica do começo ao fim.
      </p>
    </div>

    <div style="background: #18181B; border: 1px solid #27272A; border-radius: 12px; padding: 18px 20px; margin-bottom: 14px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;">
        <div>
          <div style="margin-bottom: 4px;">
            <span style="font-size: 28px; font-weight: 700; color: #FAFAFA;">R$ 497</span>
            <span style="font-size: 12px; color: #71717A; margin-left: 6px;">sessão única</span>
          </div>
          <p style="font-size: 10px; color: #71717A; line-height: 1.5;">
            O equivalente a 1/4 do que custa uma reunião de conselho no mercado.
          </p>
        </div>
        <div style="text-align: right; flex-shrink: 0;">
          <div style="display: inline-block; background: #EF444415; border: 1px solid #EF444440; border-radius: 999px; padding: 4px 10px;">
            <span style="font-size: 9px; font-weight: 600; color: #EF4444; text-transform: uppercase; letter-spacing: 0.8px;">Vagas limitadas</span>
          </div>
          <p style="font-size: 10px; color: #A1A1AA; margin-top: 6px;">
            5 sessões por semana
          </p>
        </div>
      </div>
    </div>

    <div style="font-size: 11px; color: #A1A1AA; text-align: center;">
      <strong style="color: #FAFAFA;">Agende:</strong> contato@markv.com.br
    </div>
  </div>`;

  return wrapPage(content, 13, nomeEmpresa);
}
