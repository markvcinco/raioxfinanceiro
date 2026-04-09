/**
 * Test script for database operations via Supabase client.
 *
 * Usage:
 *   pnpm tsx scripts/test-db.ts
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 * to be set (either in .env.local or as env vars).
 *
 * For local-only testing without Supabase, use:
 *   pnpm tsx scripts/test-db-local.ts
 */

import { createClient } from "@supabase/supabase-js";
import type { Database } from "../src/lib/supabase/database.types";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.log(
    "⚠  NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não configurados."
  );
  console.log("   Para testar localmente sem Supabase, rode:");
  console.log("   pnpm tsx scripts/test-db-local.ts");
  process.exit(0);
}

const supabase = createClient<Database>(url, key, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  console.log("\n--- Teste CRUD Supabase ---\n");

  // 1. Criar diagnóstico
  console.log("1. Criando diagnóstico...");
  const { data: diag, error: errInsert } = await supabase
    .from("diagnosticos")
    .insert({
      nome_responsavel: "João Teste",
      email: "joao@teste.com",
      telefone: "11999999999",
      nome_empresa: "Empresa Teste LTDA",
      faturamento_anual: "500k_2m",
      setor: "Tecnologia",
    })
    .select()
    .single();

  if (errInsert) {
    console.error("   ERRO:", errInsert.message);
    process.exit(1);
  }
  console.log("   OK — id:", diag.id);

  // 2. Atualizar respostas
  console.log("2. Atualizando respostas...");
  const respostas = Array.from({ length: 20 }, (_, i) => ({
    pergunta_id: `p${i + 1}`,
    alternativa_id: `a${(i % 4) + 1}`,
    pontos: [0, 3, 7, 10][i % 4],
  }));

  const { error: errUpdate } = await supabase
    .from("diagnosticos")
    .update({ respostas })
    .eq("id", diag.id);

  if (errUpdate) {
    console.error("   ERRO:", errUpdate.message);
    process.exit(1);
  }
  console.log("   OK — 20 respostas salvas");

  // 3. Finalizar com scores
  console.log("3. Finalizando diagnóstico...");
  const { error: errFinal } = await supabase
    .from("diagnosticos")
    .update({
      score_geral: 62,
      score_areas: {
        gestao_financeira_caixa: 55,
        precificacao_receita: 70,
        vendas_previsibilidade: 60,
        operacao_margem: 65,
        governanca_decisao: 50,
      },
      persona: "base_sem_metodo",
      status: "concluido",
    })
    .eq("id", diag.id);

  if (errFinal) {
    console.error("   ERRO:", errFinal.message);
    process.exit(1);
  }
  console.log("   OK — status: concluido, persona: base_sem_metodo");

  // 4. Buscar e imprimir
  console.log("4. Buscando diagnóstico...");
  const { data: found, error: errFind } = await supabase
    .from("diagnosticos")
    .select()
    .eq("id", diag.id)
    .single();

  if (errFind) {
    console.error("   ERRO:", errFind.message);
    process.exit(1);
  }

  console.log("   OK — Resultado:");
  console.log(JSON.stringify(found, null, 2));

  // 5. Cleanup
  console.log("\n5. Limpando registro de teste...");
  await supabase.from("diagnosticos").delete().eq("id", diag.id);
  console.log("   OK — registro removido");

  console.log("\n✓ Todos os testes passaram!\n");
}

main().catch((err) => {
  console.error("Erro fatal:", err);
  process.exit(1);
});
