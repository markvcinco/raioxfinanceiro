# Deploy na Vercel

## Pré-requisitos

- Conta na [Vercel](https://vercel.com)
- Projeto Supabase em produção (com migrations aplicadas)
- Conta Asaas em produção
- Conta Resend com domínio verificado
- (Opcional) Conta PostHog e Sentry

## 1. Conectar repositório

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Importe o repositório `markvcinco/raioxfinanceiro`
3. Framework preset: **Next.js** (auto-detectado)
4. Root directory: `.` (raiz)
5. Não altere build commands (usa os defaults do Next.js)

## 2. Configurar variáveis de ambiente

Na Vercel, vá em **Settings → Environment Variables** e adicione todas as variáveis listadas em `ENV_SETUP.md`.

**Importante:**
- `NEXT_PUBLIC_ASAAS_ENV` deve ser `production`
- `NEXT_PUBLIC_APP_URL` deve ser a URL final (ex: `https://raioxfinanceiro.com.br`)
- `ADMIN_PASSWORD` deve ser uma senha forte
- `PDF_INTERNAL_TOKEN` deve ser um token aleatório forte

## 3. Configurar Supabase produção

1. Crie um projeto no Supabase (região `South America (São Paulo)`)
2. Aplique as migrations: `npx supabase db push --linked`
3. Crie o bucket `relatorios` no Storage (privado)
4. Copie as chaves de API para as variáveis de ambiente da Vercel

## 4. Configurar webhook Asaas

1. No Asaas, vá em **Integrações → Webhooks**
2. Adicione um novo webhook:
   - **URL:** `https://SEU_DOMINIO/api/webhooks/asaas`
   - **Token de autenticação:** o mesmo valor de `ASAAS_WEBHOOK_SECRET`
   - **Eventos:** `PAYMENT_CONFIRMED`, `PAYMENT_RECEIVED`, `PAYMENT_OVERDUE`
3. Salve e teste com um pagamento de teste

## 5. Deploy

```bash
# Push para main (ou a branch configurada)
git push origin main

# Ou via Vercel CLI
npx vercel --prod
```

## 6. Verificar

Após o deploy:

1. Acesse a URL e verifique a landing page
2. Faça um diagnóstico completo de teste
3. Faça um pagamento de teste (R$ 29,90)
4. Verifique se o PDF foi gerado e o e-mail enviado
5. Acesse `/admin/pagamentos` com a senha configurada
6. Verifique os logs na Vercel para erros

## Domínio customizado

1. Vercel → Settings → Domains → Add
2. Configure os DNS records conforme instruções da Vercel
3. Atualize `NEXT_PUBLIC_APP_URL` com o domínio final
4. Atualize a URL do webhook no Asaas

## Região

O `vercel.json` está configurado para `gru1` (São Paulo). Isso garante menor latência para usuários brasileiros e proximidade com o Supabase (se na mesma região).
