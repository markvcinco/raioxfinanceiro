# Raio-X Financeiro MARK V — Contexto do Projeto

## O que é este projeto

Este é o código-fonte do **Raio-X Financeiro MARK V**, um software de diagnóstico financeiro self-service que funciona como tripwire de captação de leads para a MARK V (consultoria de finanças, controladoria, precificação e conselho consultivo financeiro para PMEs).

O produto é uma aplicação web onde o usuário:
1. Responde 20 perguntas sobre a maturidade financeira da empresa dele
2. Vê seu score e radar gratuitamente na tela
3. Paga R$ 29,90 para receber o relatório completo em PDF
4. É direcionado a um upsell de R$ 497 (Sessão Estratégica de 1h com Lucas Minucci)

## Quem é o público-alvo

Donos de PME brasileira (faturamento até R$ 20M/ano) que sabem que a gestão financeira deles não está organizada mas não sabem exatamente o tamanho do problema. Linguagem do produto deve ser técnica mas acessível, zero jargão corporativo desnecessário, zero linguagem de coach ou influencer de finanças.

## Posicionamento e tom

O MARK V é uma empresa de especialista sênior em finanças. O software precisa transmitir isso em cada tela. Referências visuais de posicionamento:
- Linear (linear.app) — minimalismo, dark mode, densidade informacional alta
- Vercel — tipografia forte, layout limpo
- Stripe — clareza e profissionalismo

**NÃO queremos:**
- Estética "coach de finanças no Instagram" (gradientes coloridos, emojis em excesso, ilustrações infantis)
- Estética "consultoria corporativa dos anos 2010" (stock photos de aperto de mão, azul corporativo)
- Tom motivacional ("vamos juntos transformar sua empresa!")

## Stack técnico obrigatório

- **Framework:** Next.js 14+ (App Router, não Pages Router)
- **Linguagem:** TypeScript (strict mode)
- **Estilo:** Tailwind CSS
- **Banco de dados + Auth + Storage:** Supabase
- **Deploy:** Vercel
- **Gateway de pagamento:** Asaas (não é Stripe, atenção)
- **Geração de PDF:** HTML template + Playwright (usar `@sparticuz/chromium` para rodar no Vercel serverless)
- **Envio de e-mail:** Resend (a definir depois, deixar abstraído)
- **Analytics:** PostHog (a definir depois, deixar abstraído)
- **Componentes UI:** shadcn/ui como base, customizar a identidade MARK V em cima

## Identidade visual MARK V

A MARK V tem identidade verde escura. A paleta base deve ser:
- **Background principal:** preto ou cinza muito escuro (#0A0A0A ou similar)
- **Cor de destaque:** verde MARK V (tom escuro, saturado mas não neon, algo como #0F5F3F ou similar, a ajustar)
- **Texto primário:** branco (#FAFAFA)
- **Texto secundário:** cinza claro (#A1A1AA)
- **Bordas e divisores:** cinza muito escuro (#27272A)
- **Tipografia:** Inter como fonte principal, pesos 400/500/600/700

## Estrutura de dados do diagnóstico

O diagnóstico tem exatamente 5 áreas, com pesos fixos:

| Área | Peso |
|---|---|
| Gestão Financeira & Caixa | 30% |
| Precificação & Receita | 25% |
| Vendas & Previsibilidade | 15% |
| Operação & Margem | 15% |
| Governança & Decisão | 15% |

Cada área tem 4 perguntas. Total: 20 perguntas.

Cada pergunta tem 4 alternativas valendo **0, 3, 7 ou 10 pontos** (escala não-linear proposital).

**Cálculo do score:**
1. Score de cada área = média das 4 perguntas daquela área, multiplicada por 10 (escala 0-100)
2. Score geral = soma ponderada dos scores das áreas usando os pesos acima (já resulta em 0-100)

**Faixas de score:**
- 0-25: "Empresa apagando incêndio" (crítico, vermelho)
- 26-50: "Empresa funcionando no improviso" (frágil, laranja)
- 51-75: "Empresa com base, sem método" (em construção, amarelo)
- 76-100: "Empresa madura, pronta pra escalar com método" (maduro, verde)

## Estrutura de diretórios esperada

```
src/
├── app/
│   ├── (marketing)/
│   │   └── page.tsx              # Landing page
│   ├── diagnostico/
│   │   ├── page.tsx              # Formulário de perguntas
│   │   └── resultado/
│   │       └── page.tsx          # Tela de resultado (score + radar)
│   ├── pagamento/
│   │   └── page.tsx              # Checkout Asaas
│   ├── relatorio/
│   │   └── [id]/
│   │       └── page.tsx          # Relatório completo (pós-pagamento)
│   ├── api/
│   │   ├── diagnostico/
│   │   │   └── route.ts          # Salvar respostas no Supabase
│   │   ├── pagamento/
│   │   │   ├── route.ts          # Criar cobrança Asaas
│   │   │   └── webhook/
│   │   │       └── route.ts      # Webhook confirmação Asaas
│   │   └── relatorio/
│   │       └── route.ts          # Gerar PDF via Playwright
│   ├── layout.tsx                # Layout raiz
│   └── globals.css               # Estilos globais + Tailwind
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── diagnostico/              # Componentes do formulário
│   ├── resultado/                # Componentes do resultado (radar, score)
│   └── layout/                   # Header, Footer, Container
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Supabase browser client
│   │   └── server.ts             # Supabase server client
│   ├── asaas/
│   │   └── client.ts             # Asaas API client
│   ├── scoring/
│   │   └── calculator.ts         # Lógica de cálculo de score
│   ├── questions/
│   │   └── data.ts               # As 20 perguntas e alternativas
│   └── utils.ts                  # Utilitários gerais (cn, formatters)
├── types/
│   └── index.ts                  # Tipos TypeScript do domínio
└── templates/
    └── relatorio/
        └── template.tsx          # Template HTML do relatório PDF
```

## Variáveis de ambiente necessárias

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Asaas
ASAAS_API_KEY=
ASAAS_WEBHOOK_SECRET=
NEXT_PUBLIC_ASAAS_ENV=sandbox

# Resend (e-mail)
RESEND_API_KEY=

# PostHog (analytics)
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
