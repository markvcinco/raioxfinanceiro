import { wrapPage } from "./shared";

export function renderPausaEstrategica(nomeEmpresa: string): string {
  const content = `
  <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; max-width: 140mm;">
    <div style="margin-bottom: 40px;">
      <div style="width: 40px; height: 2px; background: #14B866; margin-bottom: 24px;"></div>
      <h2 style="font-size: 22px; font-weight: 700; color: #FAFAFA; margin-bottom: 16px; line-height: 1.3;">
        Uma pausa antes de continuar.
      </h2>
    </div>

    <div style="font-size: 11px; line-height: 1.8; color: #D4D4D8;">
      <p style="margin-bottom: 16px;">
        Até aqui, você viu o panorama geral da sua maturidade financeira e a análise das
        3 primeiras áreas. Se algum dos pontos acendeu um sinal de alerta, isso é esperado.
        A maioria dos gestores que chega até aqui percebe que o problema não é falta de
        esforço &mdash; é falta de método.
      </p>

      <p style="margin-bottom: 16px;">
        A boa notícia: todos os gaps que este diagnóstico revela são corrigíveis. Mas
        corrigir sozinho é lento, caro e cheio de pontos cegos.
      </p>

      <p style="margin-bottom: 16px;">
        Se você quer transformar este diagnóstico em ação concreta, considere a
        <strong style="color: #FAFAFA;">Sessão Estratégica de 1 hora</strong> com a MARK V.
        Nela, analisamos suas respostas em detalhe, priorizamos os gaps e saímos com um
        plano de ação para os próximos 90 dias.
      </p>

      <p style="color: #71717A; font-style: italic;">
        Mais sobre isso na página 13.
      </p>
    </div>

    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #27272A;">
      <p style="font-size: 11px; color: #A1A1AA;">
        Agora, vamos às duas áreas restantes.
      </p>
    </div>
  </div>`;

  return wrapPage(content, 8, nomeEmpresa);
}
