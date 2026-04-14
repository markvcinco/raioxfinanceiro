# Raio-X Financeiro MARK V - roda o build

Diagnóstico da maturidade financeira para PMEs brasileiras.

## Stack

- Next.js 14+ (App Router) / TypeScript / Tailwind CSS
- Supabase (banco + auth) / Asaas (pagamentos) / Resend (e-mail)
- shadcn/ui / Inter font / Deploy via Vercel

## Como rodar localmente

```bash
# 1. Clone o repositório
git clone https://github.com/markvcinco/raioxfinanceiro.git
cd raioxfinanceiro

# 2. Instale as dependências
pnpm install

# 3. Configure as variáveis de ambiente
cp .env.local.example .env.local
# Preencha as variáveis no .env.local

# 4. Rode o servidor de desenvolvimento
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000).
