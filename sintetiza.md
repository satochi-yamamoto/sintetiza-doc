Você é um desenvolvedor experiente de SaaS. Preciso que você gere uma aplicação web **MVP enxuta**, escalável e fácil de manter, com as seguintes características:

---

## 1️⃣ Funcionalidade principal
- Upload de arquivos: PDF, DOCX e TXT.
- Extração automática do conteúdo dos arquivos.
- Geração de **resumos inteligentes** usando IA:
  - **Resumo padrão**: curto, objetivo.
  - **Tipos de resumo (para planos pagos/fase 2)**: executivo, técnico e bullet points.
- Exportação dos resumos em **TXT, PDF ou Markdown**.
- Histórico de resumos do usuário, salvo no banco.
- Parametrização do tipo de resumo para o MCP `summarizer`.

---

## 2️⃣ Stack de Infraestrutura
- **Frontend**:  Vue.js, hospedado na **Vercel**, responsivo e moderno.
- **Backend**: Supabase (Postgres + Storage + Edge Functions) para gerenciamento de usuários, arquivos e históricos.
- **Autenticação**: Clerk, suportando login via Google, Apple, GitHub e e-mail/senha.
- **Cobrança / planos**: Stripe, com suporte a cartão, boleto e PIX. Suporte a Free Tier e planos pagos com limites diferentes de uso.

---

## 3️⃣ Integrações com IA
- API principal: OpenAI (GPT-4o-mini).  
- API de backup/redundância: Anthropic Claude ou Mistral.  
- Fallback automático caso a API principal falhe.

---

## 4️⃣ MCPs recomendados
- `file-explorer`: upload e leitura de documentos.  
- `pdf-parser`: extração de texto estruturado de PDFs.  
- `docx-reader`: leitura de documentos Word.  
- `summarizer`: geração de resumos segmentados por tipo.  
- `storage-supabase`: integração direta com Supabase Storage.  
- `auth-clerk`: gerenciamento de login e permissões de usuários.  
- `billing-stripe`: controle de assinaturas, limites de uso e cobrança.  
- `logs-observability`: monitoramento de erros e performance.  
- `translation` (opcional): resumo multilíngue para expansão futura.

---

## 5️⃣ Formulário de contato
- Por padrão, o formulário **salva no banco (Supabase)**.
- Notificações automáticas via email (SendGrid, Resend ou outro serviço de SMTP) para o administrador.

---

## 6️⃣ Requisitos de Negócio / MVP
- Free Tier: limite de uploads e resumos por mês.  
- Plano pago: maior limite, tipos de resumo avançados e prioridade de processamento.  
- Painel administrativo interno para monitorar uso, métricas e assinaturas (Stripe + Supabase).  
- Fluxo simples: Upload → Geração de Resumo → Exportação → Histórico.

---

## 7️⃣ Objetivo do MVP
  - Upload de arquivo.  
  - Resumo padrão gerado.  
  - Histórico do usuário.  
  - Exportação simples.  
- Permitir **expansão futura**:
  - Múltiplos tipos de resumo (executivo, técnico, bullet points).  
  - Integração com Google Drive / Notion.  
  - Tradução multilíngue.  
  - Painel avançado de administração e analytics.

---

## 8️⃣ Regras gerais
- Código modular, documentado e testável.  
- Utilizar MCPs para separar responsabilidades e facilitar manutenção.  
- Preparar o projeto para escalabilidade e futura internacionalização.  
