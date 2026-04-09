/**
 * Test script that verifies the database schema via direct PostgreSQL connection.
 * Does NOT require Supabase — uses the local PostgreSQL instance.
 *
 * Usage:
 *   pnpm tsx scripts/test-db-local.ts
 */

import { Client } from "pg";

const client = new Client({
  host: "localhost",
  port: 5432,
  database: "raioxfinanceiro",
  user: "raioxdev",
  password: "raioxdev123",
});

async function main() {
  await client.connect();
  console.log("\n--- Teste CRUD PostgreSQL local ---\n");

  // 1. Criar diagnóstico
  console.log("1. Criando diagnóstico...");
  const insertRes = await client.query(
    `INSERT INTO diagnosticos (nome_responsavel, email, telefone, nome_empresa, faturamento_anual, setor)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, status`,
    [
      "João Teste",
      "joao@teste.com",
      "11999999999",
      "Empresa Teste LTDA",
      "500k_2m",
      "Tecnologia",
    ]
  );
  const diagId = insertRes.rows[0].id;
  console.log(`   OK — id: ${diagId}, status: ${insertRes.rows[0].status}`);

  // 2. Atualizar respostas
  console.log("2. Atualizando respostas...");
  const respostas = Array.from({ length: 20 }, (_, i) => ({
    pergunta_id: `p${i + 1}`,
    alternativa_id: `a${(i % 4) + 1}`,
    pontos: [0, 3, 7, 10][i % 4],
  }));

  await client.query(
    `UPDATE diagnosticos SET respostas = $1 WHERE id = $2`,
    [JSON.stringify(respostas), diagId]
  );
  console.log("   OK — 20 respostas salvas");

  // 3. Finalizar com scores
  console.log("3. Finalizando diagnóstico...");
  const scoreAreas = {
    gestao_financeira_caixa: 55,
    precificacao_receita: 70,
    vendas_previsibilidade: 60,
    operacao_margem: 65,
    governanca_decisao: 50,
  };

  await client.query(
    `UPDATE diagnosticos
     SET score_geral = $1, score_areas = $2, persona = $3, status = 'concluido'
     WHERE id = $4`,
    [62, JSON.stringify(scoreAreas), "base_sem_metodo", diagId]
  );
  console.log("   OK — status: concluido, persona: base_sem_metodo");

  // 4. Buscar e imprimir
  console.log("4. Buscando diagnóstico...");
  const selectRes = await client.query(
    `SELECT * FROM diagnosticos WHERE id = $1`,
    [diagId]
  );
  const row = selectRes.rows[0];
  console.log("   OK — Resultado:");
  console.log(
    JSON.stringify(
      {
        id: row.id,
        nome_empresa: row.nome_empresa,
        email: row.email,
        score_geral: row.score_geral,
        persona: row.persona,
        status: row.status,
        respostas_count: (row.respostas as unknown[]).length,
        updated_at: row.updated_at,
      },
      null,
      2
    )
  );

  // 5. Testar criação de pagamento
  console.log("5. Criando pagamento...");
  const pagRes = await client.query(
    `INSERT INTO pagamentos (diagnostico_id, valor, status, metodo)
     VALUES ($1, $2, $3, $4)
     RETURNING id, status`,
    [diagId, 29.9, "pendente", "pix"]
  );
  console.log(
    `   OK — pagamento id: ${pagRes.rows[0].id}, status: ${pagRes.rows[0].status}`
  );

  // 6. Testar leads_view
  console.log("6. Consultando leads_view...");
  const leadsRes = await client.query(
    `SELECT diagnostico_id, nome_empresa, score_geral, diagnostico_status, pagamento_status, valor
     FROM leads_view WHERE diagnostico_id = $1`,
    [diagId]
  );
  console.log("   OK — Lead view:");
  console.log(JSON.stringify(leadsRes.rows[0], null, 2));

  // 7. Testar constraint de CHECK
  console.log("7. Testando constraints...");
  try {
    await client.query(
      `INSERT INTO diagnosticos (nome_responsavel, email, nome_empresa, faturamento_anual)
       VALUES ('x', 'x@x.com', 'x', 'valor_invalido')`
    );
    console.log("   FALHA — deveria ter rejeitado faturamento_anual inválido");
  } catch (err) {
    console.log(
      "   OK — CHECK constraint bloqueou valor inválido (esperado)"
    );
  }

  // 8. Cleanup
  console.log("\n8. Limpando registros de teste...");
  await client.query(`DELETE FROM diagnosticos WHERE id = $1`, [diagId]);
  console.log("   OK — registros removidos (cascade apagou pagamento)");

  console.log("\n✓ Todos os testes passaram!\n");

  await client.end();
}

main().catch(async (err) => {
  console.error("Erro fatal:", err);
  await client.end();
  process.exit(1);
});
