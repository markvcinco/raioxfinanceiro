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
      </div>

      <div style="background: #18181B; border: 1px solid #27272A; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
        <div style="margin-bottom: 12px;">
          <span style="font-size: 32px; font-weight: 700; color: #FAFAFA;">R$ 497</span>
          <span style="font-size: 13px; color: #71717A; margin-left: 6px;">sessão única</span>
        </div>
        <p style="font-size: 11px; color: #71717A;">
          Para gestores que identificaram gaps neste diagnóstico e querem corrigir com método, não com improviso.
        </p>
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
