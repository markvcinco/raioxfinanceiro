import { describe, it, expect } from "vitest";
import { calcularScore } from "../calcular-score";
import type { Resposta } from "../calcular-score";
import { PERGUNTAS } from "@/content/perguntas";

function respostasComPontos(pontos: number): Resposta[] {
  return PERGUNTAS.map((p) => ({
    pergunta_id: p.id,
    alternativa_id: `${p.id}_x`,
    pontos,
  }));
}

describe("calcularScore", () => {
  it("todas respostas 0 → score 0, persona apagando_incendio", () => {
    const result = calcularScore(respostasComPontos(0));

    expect(result.scoreGeral).toBe(0);
    expect(result.persona).toBe("apagando_incendio");
    expect(result.scoresPorArea.gestao_financeira).toBe(0);
    expect(result.scoresPorArea.precificacao_receita).toBe(0);
    expect(result.scoresPorArea.vendas_previsibilidade).toBe(0);
    expect(result.scoresPorArea.operacao_margem).toBe(0);
    expect(result.scoresPorArea.governanca_decisao).toBe(0);
  });

  it("todas respostas 10 → score 100, persona madura", () => {
    const result = calcularScore(respostasComPontos(10));

    expect(result.scoreGeral).toBe(100);
    expect(result.persona).toBe("madura");
    expect(result.scoresPorArea.gestao_financeira).toBe(100);
    expect(result.scoresPorArea.precificacao_receita).toBe(100);
  });

  it("mix realista → calcula ponderação correta", () => {
    // Área 1 (peso 30%): p1=3, p2=7, p3=3, p4=7 → média 5.0 → score 50
    // Área 2 (peso 25%): p5=0, p6=3, p7=7, p8=10 → média 5.0 → score 50
    // Área 3 (peso 15%): p9=10, p10=10, p11=10, p12=10 → média 10.0 → score 100
    // Área 4 (peso 15%): p13=0, p14=0, p15=0, p16=0 → média 0.0 → score 0
    // Área 5 (peso 15%): p17=7, p18=3, p19=7, p20=3 → média 5.0 → score 50
    //
    // Score geral = 50*0.30 + 50*0.25 + 100*0.15 + 0*0.15 + 50*0.15
    //             = 15 + 12.5 + 15 + 0 + 7.5 = 50
    const respostas: Resposta[] = [
      { pergunta_id: "p1", alternativa_id: "p1_b", pontos: 3 },
      { pergunta_id: "p2", alternativa_id: "p2_c", pontos: 7 },
      { pergunta_id: "p3", alternativa_id: "p3_b", pontos: 3 },
      { pergunta_id: "p4", alternativa_id: "p4_c", pontos: 7 },
      { pergunta_id: "p5", alternativa_id: "p5_a", pontos: 0 },
      { pergunta_id: "p6", alternativa_id: "p6_b", pontos: 3 },
      { pergunta_id: "p7", alternativa_id: "p7_c", pontos: 7 },
      { pergunta_id: "p8", alternativa_id: "p8_d", pontos: 10 },
      { pergunta_id: "p9", alternativa_id: "p9_d", pontos: 10 },
      { pergunta_id: "p10", alternativa_id: "p10_d", pontos: 10 },
      { pergunta_id: "p11", alternativa_id: "p11_d", pontos: 10 },
      { pergunta_id: "p12", alternativa_id: "p12_d", pontos: 10 },
      { pergunta_id: "p13", alternativa_id: "p13_a", pontos: 0 },
      { pergunta_id: "p14", alternativa_id: "p14_a", pontos: 0 },
      { pergunta_id: "p15", alternativa_id: "p15_a", pontos: 0 },
      { pergunta_id: "p16", alternativa_id: "p16_a", pontos: 0 },
      { pergunta_id: "p17", alternativa_id: "p17_c", pontos: 7 },
      { pergunta_id: "p18", alternativa_id: "p18_b", pontos: 3 },
      { pergunta_id: "p19", alternativa_id: "p19_c", pontos: 7 },
      { pergunta_id: "p20", alternativa_id: "p20_b", pontos: 3 },
    ];

    const result = calcularScore(respostas);

    expect(result.scoreGeral).toBe(50);
    expect(result.persona).toBe("improviso");
    expect(result.scoresPorArea.gestao_financeira).toBe(50);
    expect(result.scoresPorArea.precificacao_receita).toBe(50);
    expect(result.scoresPorArea.vendas_previsibilidade).toBe(100);
    expect(result.scoresPorArea.operacao_margem).toBe(0);
    expect(result.scoresPorArea.governanca_decisao).toBe(50);
  });

  it("respostas faltando → perguntas sem resposta contam como 0", () => {
    // Só responde as 4 da Área 1, todas com 10
    // Área 1: 10*4/4*10 = 100. Áreas 2-5: 0.
    // Score geral = 100*0.30 + 0*0.25 + 0*0.15 + 0*0.15 + 0*0.15 = 30
    const respostas: Resposta[] = [
      { pergunta_id: "p1", alternativa_id: "p1_d", pontos: 10 },
      { pergunta_id: "p2", alternativa_id: "p2_d", pontos: 10 },
      { pergunta_id: "p3", alternativa_id: "p3_d", pontos: 10 },
      { pergunta_id: "p4", alternativa_id: "p4_d", pontos: 10 },
    ];

    const result = calcularScore(respostas);

    expect(result.scoreGeral).toBe(30);
    expect(result.persona).toBe("improviso");
    expect(result.scoresPorArea.gestao_financeira).toBe(100);
    expect(result.scoresPorArea.precificacao_receita).toBe(0);
  });

  it("pontos inválidos → clamp entre 0 e 10", () => {
    const respostas: Resposta[] = PERGUNTAS.map((p) => ({
      pergunta_id: p.id,
      alternativa_id: `${p.id}_x`,
      pontos: 999, // valor inválido, deve ser clamped a 10
    }));

    const result = calcularScore(respostas);

    expect(result.scoreGeral).toBe(100);
    expect(result.persona).toBe("madura");
  });

  it("pontos negativos → clamp a 0", () => {
    const respostas: Resposta[] = PERGUNTAS.map((p) => ({
      pergunta_id: p.id,
      alternativa_id: `${p.id}_x`,
      pontos: -5,
    }));

    const result = calcularScore(respostas);

    expect(result.scoreGeral).toBe(0);
    expect(result.persona).toBe("apagando_incendio");
  });

  it("array vazio → score 0, apagando_incendio", () => {
    const result = calcularScore([]);

    expect(result.scoreGeral).toBe(0);
    expect(result.persona).toBe("apagando_incendio");
  });

  it("todas respostas 3 → score 30, improviso", () => {
    // Cada área: média = 3, × 10 = 30
    // Score geral = 30*0.30 + 30*0.25 + 30*0.15 + 30*0.15 + 30*0.15 = 30
    const result = calcularScore(respostasComPontos(3));

    expect(result.scoreGeral).toBe(30);
    expect(result.persona).toBe("improviso");
  });

  it("limites exatos das faixas", () => {
    // 25 = apagando_incendio
    // Pontos por pergunta para score 25: cada área score = 25
    // média × 10 = 25 → média = 2.5 pontos por pergunta
    // Não é possível com 0/3/7/10, mas com pontos arbitrários...
    // Vamos usar cálculo direto: todas as áreas = 25 → geral = 25
    const respostas25: Resposta[] = PERGUNTAS.map((p, i) => ({
      pergunta_id: p.id,
      alternativa_id: `${p.id}_x`,
      // Alternando 0 e 5 para dar média ~2.5 → score 25
      // 4 perguntas por área: 0, 3, 3, 4 impossível com escala...
      // Usamos pontos puros: 0+3+3+4=10/4=2.5 → 25
      pontos: [0, 3, 3, 4][i % 4],
    }));
    const r25 = calcularScore(respostas25);
    expect(r25.scoreGeral).toBe(25);
    expect(r25.persona).toBe("apagando_incendio");

    // 26 = improviso
    // Cada área: média 2.6 × 10 = 26. Somas: 0+3+3+4.4 = 10.4/4=2.6
    const respostas26: Resposta[] = PERGUNTAS.map((p, i) => ({
      pergunta_id: p.id,
      alternativa_id: `${p.id}_x`,
      pontos: [0, 3, 3, 4.4][i % 4],
    }));
    const r26 = calcularScore(respostas26);
    expect(r26.scoreGeral).toBe(26);
    expect(r26.persona).toBe("improviso");
  });
});
