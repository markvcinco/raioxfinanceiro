# Configuração de Variáveis de Ambiente

Copie `.env.local.example` para `.env.local` e preencha cada variável conforme abaixo.

## Supabase

| Variável | Onde obter |
|----------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API → anon/public |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API → service_role (nunca expor no client) |

## Asaas (Pagamento)

| Variável | Onde obter |
|----------|-----------|
| `ASAAS_API_KEY` | Asaas → Minha conta → Integrações → Gerar chave de API |
| `ASAAS_WEBHOOK_SECRET` | Você define. Cadastre no Asaas → Integrações → Webhooks, campo "Token de autenticação" |
| `NEXT_PUBLIC_ASAAS_ENV` | `sandbox` para testes, `production` para produção |

**Sandbox:** Use `sandbox.asaas.com` para testes. A API key de sandbox começa com `$aact_hmlg_`.

**Produção:** Use `www.asaas.com`. Gere uma nova API key no ambiente de produção.

## PDF Generation

| Variável | Onde obter |
|----------|-----------|
| `PDF_INTERNAL_TOKEN` | Você define. String aleatória forte (ex: `openssl rand -hex 32`). Protege o endpoint `/api/pdf/gerar` |
| `CHROMIUM_PATH` | Opcional. Na Vercel, `@sparticuz/chromium` detecta automaticamente |

## E-mail (Resend)

| Variável | Onde obter |
|----------|-----------|
| `RESEND_API_KEY` | Resend → API Keys → Create |
| `EMAIL_FROM` | Opcional. Formato: `Nome <email@dominio.com>`. Requer domínio verificado no Resend |

**Setup do domínio:** Resend → Domains → Add Domain → configure DNS (MX, SPF, DKIM).

## Analytics (PostHog)

| Variável | Onde obter |
|----------|-----------|
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog → Project Settings → Project API Key |
| `NEXT_PUBLIC_POSTHOG_HOST` | Geralmente `https://us.i.posthog.com` ou `https://eu.i.posthog.com` |

PostHog é opcional. Se as variáveis não estiverem configuradas, analytics simplesmente não dispara.

## Error Tracking (Sentry)

| Variável | Onde obter |
|----------|-----------|
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry → Project Settings → Client Keys (DSN) |

Sentry é opcional. Se o DSN não estiver configurado, error tracking não inicializa.

## Admin

| Variável | Descrição |
|----------|-----------|
| `ADMIN_PASSWORD` | Senha para acessar `/admin/*`. Usa HTTP Basic Auth (user qualquer, senha = esta variável) |

## App

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_APP_URL` | URL base da aplicação. `http://localhost:3000` em dev, URL da Vercel em produção |
