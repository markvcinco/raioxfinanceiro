# Raio-X Financeiro MARK V - roda o build

Diagnóstico de maturidade financeira self-service para PMEs brasileiras. O usuário responde 20 perguntas, vê o score na hora e paga R$ 29,90 para receber um relatório completo em PDF.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Linguagem:** TypeScript (strict)
- **Estilo:** Tailwind CSS v4
- **Banco + Storage:** Supabase
- **Pagamento:** Asaas (PIX + cartão)
- **PDF:** Playwright + @sparticuz/chromium (serverless)
- **E-mail:** Resend
- **Analytics:** PostHog
- **Error tracking:** Sentry
- **Deploy:** Vercel

## Rodar localmente

```bash
# Instalar dependências
pnpm install

# Copiar variáveis de ambiente
cp .env.local.example .env.local
# Preencher as variáveis (ver ENV_SETUP.md)

# Rodar em desenvolvimento
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Testes

```bash
pnpm test          # Rodar uma vez
pnpm test:watch    # Watch mode
```

## Build de produção

```bash
pnpm build
pnpm start
```

## Deploy

Ver [DEPLOY.md](./DEPLOY.md) para instruções completas de deploy na Vercel.

## Estrutura de pastas

```
src/
├── app/
│   ├── (marketing)/page.tsx          # Landing page
│   ├── diagnostico/                  # Formulário de diagnóstico
│   ├── checkout/                     # Checkout e PIX
│   ├── relatorio/[id]/              # Download do relatório
│   ├── admin/                        # Painel admin (protegido)
│   └── api/
│       ├── diagnostico/              # API do diagnóstico
│       ├── pagamento/                # API de pagamento Asaas
│       ├── webhooks/asaas/           # Webhook Asaas
│       ├── pdf/gerar/                # Geração de PDF
│       └── pdf/template/[id]/        # Template HTML do PDF
├── components/
│   ├── ui/                           # shadcn/ui
│   ├── diagnostico/                  # Formulário de perguntas
│   ├── resultado/                    # Radar chart
│   ├── checkout/                     # Checkout e PIX
│   └── providers/                    # PostHog provider
├── content/
│   ├── areas.ts                      # 5 áreas do diagnóstico
│   ├── perguntas.ts                  # 20 perguntas
│   ├── faixas.ts                     # 4 faixas de maturidade
│   ├── copy-areas.ts                 # Copy do PDF por área/faixa
│   └── plano-90-dias.ts             # Plano de ação por persona
├── lib/
│   ├── supabase/                     # Clients e queries
│   ├── asaas/                        # Client da API Asaas
│   ├── diagnostico/                  # Score, copy, prioridades
│   ├── pdf/                          # Radar SVG, template
│   ├── email/                        # Resend integration
│   ├── analytics/                    # PostHog tracking
│   └── scoring/                      # Cálculo de score
└── types/                            # Tipos TypeScript
```

## Documentação

- [ENV_SETUP.md](./ENV_SETUP.md) — Como configurar variáveis de ambiente
- [DEPLOY.md](./DEPLOY.md) — Como fazer deploy na Vercel
- [CHECKLIST_GOLIVE.md](./CHECKLIST_GOLIVE.md) — Checklist para ir ao ar
- [CLAUDE.md](./CLAUDE.md) — Contexto do projeto para desenvolvimento com IA

## Contato

MARK V — Finanças, Controladoria & Conselho
contato@markv.com.br
