import { wrapPage } from "./shared";

export function renderCartaAbertura(nomeEmpresa: string): string {
  const content = `
  <div style="padding-top: 25mm; max-width: 140mm;">
    <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 24px; color: #FAFAFA;">
      Prezado(a) gestor(a),
    </h2>

    <div style="font-size: 11px; line-height: 1.8; color: #D4D4D8;">
      <p style="margin-bottom: 16px;">
        Você acaba de dar um passo que a maioria dos donos de empresa adia por anos: olhar
        para a maturidade financeira do seu negócio com honestidade.
      </p>

      <p style="margin-bottom: 16px;">
        Este relatório não é um diagnóstico genérico. Cada resposta que você deu gerou uma
        análise específica para a realidade da sua empresa. Nas próximas páginas, você vai
        encontrar:
      </p>

      <ul style="margin-bottom: 16px; padding-left: 20px;">
        <li style="margin-bottom: 8px;">Seu score geral e a classificação da maturidade financeira</li>
        <li style="margin-bottom: 8px;">Análise individual de cada uma das 5 áreas avaliadas</li>
        <li style="margin-bottom: 8px;">Os 3 pontos que mais merecem atenção imediata</li>
        <li style="margin-bottom: 8px;">Um plano de 90 dias personalizado para o seu nível de maturidade</li>
      </ul>

      <p style="margin-bottom: 16px;">
        Uma nota importante: este diagnóstico mede maturidade de gestão financeira, não
        sucesso do negócio. Empresas muito lucrativas podem ter score baixo. Isso não
        significa que estão quebrando &mdash; significa que estão crescendo <em>apesar</em>
        da gestão, não <em>por causa</em> dela. E isso tem um custo que aparece com o tempo.
      </p>

      <p style="margin-bottom: 32px;">
        Use este relatório como ponto de partida, não como veredito. O que importa não é o
        número em si, mas o que você faz com ele.
      </p>

      <p>Boa leitura.</p>

      <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #27272A;">
        <p style="font-size: 12px; font-weight: 600; color: #14B866; margin-bottom: 4px;">MARK V</p>
        <p style="font-size: 10px; color: #71717A;">Finanças, Controladoria &amp; Conselho</p>
      </div>
    </div>
  </div>`;

  return wrapPage(content, 2, nomeEmpresa);
}
