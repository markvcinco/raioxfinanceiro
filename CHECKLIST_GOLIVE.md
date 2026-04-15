# Checklist de Go-Live

## Infraestrutura

- [ ] Supabase produção configurado e migrations aplicadas
- [ ] Bucket `relatorios` criado no Supabase Storage (privado)
- [ ] Backup automático do banco habilitado no Supabase

## Pagamento

- [ ] Asaas em modo produção (API key de produção, não sandbox)
- [ ] `NEXT_PUBLIC_ASAAS_ENV=production` configurado na Vercel
- [ ] Webhook Asaas configurado apontando para URL de produção
- [ ] Teste: fazer um pagamento real (R$ 29,90) e validar fluxo completo

## E-mail

- [ ] Resend configurado com API key
- [ ] Domínio verificado no Resend (DNS: MX, SPF, DKIM)
- [ ] Teste: verificar que e-mail chega após pagamento

## Analytics e Monitoramento

- [ ] PostHog configurado e recebendo eventos
- [ ] Sentry configurado e capturando exceções
- [ ] Logs da Vercel acessíveis e sem erros críticos

## Segurança

- [ ] Admin protegido por senha (`ADMIN_PASSWORD` configurado)
- [ ] `PDF_INTERNAL_TOKEN` configurado com valor forte
- [ ] `ASAAS_WEBHOOK_SECRET` configurado e validando requests
- [ ] Variáveis sensíveis NÃO expostas no client (apenas `NEXT_PUBLIC_*`)

## Deploy

- [ ] `NEXT_PUBLIC_APP_URL` configurado com URL final
- [ ] Domínio customizado configurado na Vercel (se aplicável)
- [ ] SSL/TLS ativo (Vercel provisiona automaticamente)
- [ ] Build de produção passando sem erros

## Teste End-to-End

- [ ] Landing page carrega corretamente
- [ ] Formulário de diagnóstico funciona (20 perguntas)
- [ ] Tela de resultado mostra score e radar
- [ ] Checkout PIX funciona (QR code gerado)
- [ ] Webhook processa pagamento e dispara PDF
- [ ] PDF de 14 páginas gerado e salvo no Storage
- [ ] E-mail com link do relatório enviado
- [ ] Página de relatório mostra botão de download
- [ ] Admin mostra pagamentos na tabela
- [ ] 404 customizado funciona
- [ ] Erro genérico mostra página de erro customizada

## Pós Go-Live

- [ ] Monitorar Sentry nas primeiras 24h
- [ ] Verificar taxa de conversão no PostHog
- [ ] Acompanhar logs da Vercel por erros recorrentes
