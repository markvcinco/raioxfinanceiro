import { wrapPage } from "./shared";

export function renderUpsellSessao(nomeEmpresa: string): string {
  const checkSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#14B866" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0; margin-top: 2px;"><polyline points="20 6 9 17 4 12"/></svg>`;

  const content = `
  <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <div style="max-width: 420px; text-align: center;">
      <div style="font-size: 10px; font-weight: 600; letter-spacing: 2px; color: #14B866; text-transform: uppercase; margin-bottom: 16px;">
        Próximo passo recomendado
      </div>

      <h2 style="font-size: 24px; font-weight: 700; color: #FAFAFA; margin-bottom: 8px; line-height: 1.3;">
        Sessão Estratégica MARK V
      </h2>

      <p style="font-size: 13px; color: #A1A1AA; margin-bottom: 32px; line-height: 1.6;">
        1 hora de consultoria individual para transformar este diagnóstico em um plano de ação concreto.
      </p>

      <div style="text-align: left; margin-bottom: 32px;">
        <p style="font-size: 11px; font-weight: 600; color: #FAFAFA; margin-bottom: 14px; text-transform: uppercase; letter-spacing: 1px;">
          O que acontece na sessão:
        </p>

        <div style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px;">
          ${checkSvg}
          <p style="font-size: 11px; color: #D4D4D8; line-height: 1.5;">Revisão detalhada das suas respostas e do contexto específico da sua empresa</p>
        </div>
        <div style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px;">
          ${checkSvg}
          <p style="font-size: 11px; color: #D4D4D8; line-height: 1.5;">Identificação dos 2&ndash;3 gaps com maior impacto financeiro imediato</p>
        </div>
        <div style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px;">
          ${checkSvg}
          <p style="font-size: 11px; color: #D4D4D8; line-height: 1.5;">Construção de um plano de ação priorizado para os próximos 90 dias</p>
        </div>
        <div style="display: flex; align-items: flex-start; gap: 10px;">
          ${checkSvg}
          <p style="font-size: 11px; color: #D4D4D8; line-height: 1.5;">Definição dos indicadores que você deveria acompanhar (e como montar)</p>
        </div>
        <p style="font-size: 10px; color: #A1A1AA; margin-top: 10px;">Vagas limitadas: 5 sessões por semana.</p>
      </div>


      <div style="margin-bottom: 24px; text-align: left;">
        <p style="font-size: 11px; font-weight: 600; color: #FAFAFA; margin-bottom: 8px;">Roteiro minuto a minuto</p>
        <table style="width: 100%; border-collapse: collapse; font-size: 10px; color: #D4D4D8;">
          <tr><td style="padding: 6px; border: 1px solid #27272A;">5min</td><td style="padding: 6px; border: 1px solid #27272A;">Apresentação e contexto</td></tr>
          <tr><td style="padding: 6px; border: 1px solid #27272A;">15min</td><td style="padding: 6px; border: 1px solid #27272A;">Revisão do relatório Raio-X</td></tr>
          <tr><td style="padding: 6px; border: 1px solid #27272A;">25min</td><td style="padding: 6px; border: 1px solid #27272A;">Aprofundamento nas áreas críticas</td></tr>
          <tr><td style="padding: 6px; border: 1px solid #27272A;">10min</td><td style="padding: 6px; border: 1px solid #27272A;">Definição de ações prioritárias</td></tr>
          <tr><td style="padding: 6px; border: 1px solid #27272A;">5min</td><td style="padding: 6px; border: 1px solid #27272A;">Próximos passos</td></tr>
        </table>
      </div>
      <div style="background: #111827; border: 1px solid #27272A; border-radius: 10px; padding: 12px; margin-bottom: 16px; text-align: left;">
        <p style="font-size: 10px; color: #D4D4D8; line-height: 1.6;">
          Eu não vou tentar te vender nada na hora. Se ao final da sessão fizer sentido você seguir comigo em algum dos meus produtos, eu te conto o que existe e você decide depois, sem pressão. A sessão é técnica do começo ao fim.
        </p>
      </div>

      <div style="background: #18181B; border: 1px solid #27272A; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
        <div style="margin-bottom: 12px;">
          <span style="font-size: 32px; font-weight: 700; color: #FAFAFA;">R$ 497</span>
          <span style="font-size: 13px; color: #71717A; margin-left: 6px;">sessão única</span>
        </div>
        <p style="font-size: 11px; color: #71717A;">Para gestores que identificaram gaps neste diagnóstico e querem corrigir com método, não com improviso.</p>
        <p style="font-size: 11px; color: #FAFAFA; margin-top: 10px;">O equivalente a 1/4 do que custa uma reunião de conselho no mercado.</p>
      </div>

      <div style="font-size: 11px; color: #A1A1AA;">
        <p>
          <strong style="color: #FAFAFA;">Agende:</strong> contato@markv.com.br
        </p>
      </div>
    </div>
  </div>`;

  return wrapPage(content, 13, nomeEmpresa);
}
