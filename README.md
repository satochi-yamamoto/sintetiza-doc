# SintetizaDoc 📄✨

> Plataforma inteligente de síntese e análise de documentos com IA

[![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## 🚀 Sobre o Projeto

O **SintetizaDoc** é uma plataforma moderna e inteligente que utiliza inteligência artificial para transformar documentos extensos em resumos concisos e informativos. Nossa solução oferece múltiplos estilos de síntese, suporte a diversos formatos de arquivo e integração com as principais ferramentas de produtividade.

### ✨ Principais Funcionalidades

- 📄 **Upload Multi-formato**: Suporte para PDF, DOCX, TXT, RTF, ODT
- 🎯 **Síntese Inteligente**: 5 estilos diferentes de resumo (Executivo, Técnico, Educacional, Tópicos, Narrativo)
- 🎙️ **Transcrição de Áudio**: Converta reuniões e palestras em texto e resumos
- 🌐 **Tradução Bidirecional**: Português ↔ Inglês com IA
- 📤 **Exportação Versátil**: Word, Excel, PowerPoint, PDF, Notion, Trello, Email
- 🔗 **Integrações**: Google Drive, OneDrive, Notion, Trello
- 🔐 **Autenticação Segura**: Login social (Google, Apple, GitHub) via Clerk
- 💳 **Planos Flexíveis**: Freemium com upgrades via Stripe
- 📊 **Dashboard Analítico**: Métricas de uso e histórico completo
- 🌙 **Modo Escuro**: Interface adaptável com tema claro/escuro
- 📱 **Design Responsivo**: Experiência otimizada em todos os dispositivos

## 🛠️ Stack Tecnológica

### Frontend
- **Vue.js 3** - Framework progressivo
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utilitário
- **Pinia** - Gerenciamento de estado
- **Vue Router** - Roteamento SPA
- **Headless UI** - Componentes acessíveis

### Backend & Serviços
- **Supabase** - Backend-as-a-Service (PostgreSQL, Auth, Storage)
- **Clerk** - Autenticação e gerenciamento de usuários com validação avançada
- **Stripe** - Processamento de pagamentos
- **OpenAI/Claude** - Modelos de IA para síntese
- **Google Cloud** - APIs de tradução e speech-to-text

### Integrações
- **Google Drive API** - Importação/exportação de arquivos
- **Microsoft Graph** - Integração com OneDrive
- **Notion API** - Exportação para Notion
- **Trello API** - Criação de cards
- **Resend/SendGrid** - Envio de emails

### Segurança e Validação
- **HaveIBeenPwned API** - Verificação de senhas comprometidas
- **Clerk Security Features** - Rate limiting, detecção de fraude, captcha
- **Supabase RLS** - Row Level Security para proteção de dados

## 📋 Pré-requisitos

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 ou **yarn** >= 1.22.0
- **Git** para controle de versão

## 🚀 Instalação e Configuração

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/sintetiza-doc.git
cd sintetiza-doc
```

### 2. Instale as Dependências

```bash
npm install
# ou
yarn install
```

### 3. Configure as Variáveis de Ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:

```env
# Supabase
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase

# Clerk
VITE_CLERK_PUBLISHABLE_KEY=sua_chave_publica_do_clerk

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=sua_chave_publica_do_stripe

# OpenAI
OPENAI_API_KEY=sua_chave_da_openai

# Outras configurações...
```

### 4. Configure o Banco de Dados

```bash
# Execute as migrações do Supabase
npx supabase db reset
```

### 5. Inicie o Servidor de Desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

Acesse `http://localhost:5173` no seu navegador.

## 📁 Estrutura do Projeto

```
sintetiza-doc/
├── public/                 # Arquivos estáticos
├── src/
│   ├── components/         # Componentes Vue reutilizáveis
│   │   ├── icons/         # Ícones SVG
│   │   └── ui/            # Componentes de interface
│   ├── views/             # Páginas da aplicação
│   │   ├── auth/          # Páginas de autenticação
│   │   └── dashboard/     # Páginas do dashboard
│   ├── stores/            # Stores Pinia
│   ├── services/          # Serviços e APIs
│   ├── utils/             # Utilitários e helpers
│   ├── router/            # Configuração de rotas
│   └── styles/            # Estilos globais
├── supabase/              # Configurações do Supabase
│   ├── migrations/        # Migrações do banco
│   └── functions/         # Edge Functions
├── docs/                  # Documentação
└── tests/                 # Testes automatizados
```

## 🎯 Funcionalidades Detalhadas

### 📄 Processamento de Documentos

- **Formatos Suportados**: PDF, DOCX, TXT, RTF, ODT
- **Tamanho Máximo**: Até 100MB (plano Enterprise)
- **Processamento**: Extração de texto com OCR quando necessário
- **Validação**: Verificação de integridade e formato

### 🤖 Estilos de Síntese

1. **Executivo** - Resumo focado em decisões e resultados
2. **Técnico** - Detalhes metodológicos e especificações
3. **Educacional** - Formato didático para aprendizado
4. **Tópicos** - Lista estruturada de pontos principais
5. **Narrativo** - Resumo em formato de história

### 🎙️ Transcrição de Áudio

- **Formatos**: MP3, WAV, M4A, OGG
- **Duração**: Até 4 horas (plano Enterprise)
- **Idiomas**: Português e Inglês
- **Recursos**: Identificação de falantes, timestamps

### 🌐 Tradução

- **Direções**: Português → Inglês e Inglês → Português
- **Contexto**: Preservação do contexto técnico/acadêmico
- **Qualidade**: IA treinada para documentos profissionais

### 📤 Exportação

- **Microsoft Office**: Word (.docx), Excel (.xlsx), PowerPoint (.pptx)
- **Documentos**: PDF com formatação
- **Produtividade**: Notion, Trello cards
- **Comunicação**: Email formatado
- **Nuvem**: Google Drive, OneDrive

## 💳 Planos e Preços

### 🆓 Gratuito
- 5 documentos por mês
- Até 10MB por arquivo
- Estilos básicos de resumo
- Exportação em PDF

### 💼 Básico - R$ 29/mês
- 50 documentos por mês
- Até 25MB por arquivo
- Todos os estilos de resumo
- Transcrição de áudio (30min/mês)
- Todas as exportações

### 🚀 Profissional - R$ 79/mês
- 200 documentos por mês
- Até 50MB por arquivo
- Transcrição de áudio (2h/mês)
- Tradução bidirecional
- Integrações com nuvem
- Suporte prioritário

### 🏢 Empresarial - R$ 199/mês
- Documentos ilimitados
- Até 100MB por arquivo
- Transcrição de áudio (4h/mês)
- API personalizada
- Relatórios avançados
- Suporte dedicado

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build

# Qualidade de Código
npm run lint         # ESLint
npm run lint:fix     # Corrige problemas do ESLint
npm run format       # Prettier

# Testes
npm run test         # Executa testes
npm run test:watch   # Testes em modo watch
npm run test:coverage # Cobertura de testes

# Banco de Dados
npm run db:reset     # Reset do banco Supabase
npm run db:migrate   # Executa migrações
npm run db:seed      # Popula dados de teste

# Deploy
npm run deploy       # Deploy para produção
```

## 🧪 Testes

O projeto utiliza **Vitest** para testes unitários e **Playwright** para testes E2E:

```bash
# Testes unitários
npm run test

# Testes E2E
npm run test:e2e

# Cobertura
npm run test:coverage
```

### Testes de Autenticação

O sistema de autenticação foi extensivamente testado incluindo:
- ✅ Fluxo completo de cadastro com validação de dados
- ✅ Detecção e tratamento de senhas comprometidas
- ✅ Validação de formulários e campos obrigatórios
- ✅ Redirecionamento correto após cadastro bem-sucedido
- ✅ Tratamento de diferentes tipos de erro (422, 429, 401, 403, 500)
- ✅ Confirmação de email e ativação de conta
- ✅ Mensagens de erro traduzidas e específicas para cada cenário

## 📚 Documentação da API

A documentação completa da API está disponível em:
- **Desenvolvimento**: `http://localhost:5173/api-docs`
- **Produção**: `https://sintetizadoc.com/api-docs`

## 🎯 Aprendizados e Melhores Práticas

Durante o desenvolvimento do SintetizaDoc, identificamos e implementamos várias melhores práticas importantes:

### 🔐 Autenticação e Segurança
- **Tratamento Granular de Erros**: Implementação de sistema específico para diferentes tipos de erro de autenticação
- **Validação de Senhas**: Integração com APIs de verificação de senhas comprometidas para maior segurança
- **Experiência do Usuário**: Mensagens de erro traduzidas e contextualizadas para melhor UX
- **Fallback de Sistemas**: Preparação para múltiplos provedores de autenticação

### 🧪 Testes e Qualidade
- **Testes E2E Abrangentes**: Cobertura completa dos fluxos críticos de autenticação
- **Validação de Cenários Reais**: Testes com dados reais incluindo senhas comprometidas
- **Monitoramento de Console**: Análise detalhada de logs para identificação de problemas

### 🏗️ Arquitetura e Código
- **Separação de Responsabilidades**: Stores dedicados para diferentes domínios (auth, app)
- **Tratamento de Estados**: Gestão adequada de loading, error e success states
- **Modularização**: Código organizado em módulos reutilizáveis e testáveis

### 📊 Monitoramento e Observabilidade
- **Logs Estruturados**: Implementação de logging detalhado para debugging
- **Métricas de Performance**: Acompanhamento de tempos de resposta e taxa de sucesso
- **Alertas Proativos**: Detecção precoce de problemas através de monitoramento

---

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### 📝 Padrões de Commit

Utilizamos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adiciona nova funcionalidade
fix: corrige um bug
docs: atualiza documentação
style: mudanças de formatação
refactor: refatoração de código
test: adiciona ou modifica testes
chore: tarefas de manutenção
```

## 🔒 Segurança

- **Autenticação Robusta**: JWT tokens via Clerk com tratamento avançado de erros
- **Validação de Senhas**: Detecção automática de senhas comprometidas (HaveIBeenPwned)
- **Tratamento de Erros**: Sistema inteligente de identificação e tradução de erros de autenticação
- **Autorização**: RLS (Row Level Security) no Supabase
- **Criptografia**: Dados sensíveis criptografados
- **HTTPS**: Comunicação segura obrigatória
- **Sanitização**: Validação rigorosa de inputs
- **Rate Limiting**: Proteção contra abuso e ataques de força bruta
- **Confirmação de Email**: Verificação obrigatória de email para ativação de conta

## 📊 Monitoramento

- **Performance**: Web Vitals e métricas customizadas
- **Erros**: Sentry para tracking de erros
- **Analytics**: Plausible para análise de uso
- **Logs**: Estruturados e centralizados

## 🌍 Internacionalização

Suporte para múltiplos idiomas:
- 🇧🇷 Português (Brasil)
- 🇺🇸 Inglês (Estados Unidos)
- 🇪🇸 Espanhol (em breve)

## 📱 PWA (Progressive Web App)

- **Offline**: Funcionalidades básicas offline
- **Instalável**: Pode ser instalado como app
- **Push Notifications**: Notificações de processamento
- **Background Sync**: Sincronização em segundo plano

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify

```bash
# Build
npm run build

# Deploy manual ou conectar repositório
```

### Docker

```bash
# Build da imagem
docker build -t sintetiza-doc .

# Executar container
docker run -p 3000:3000 sintetiza-doc
```

## 📞 Suporte

- **Email**: suporte@sintetizadoc.com
- **Discord**: [Comunidade SintetizaDoc](https://discord.gg/sintetizadoc)
- **Documentação**: [docs.sintetizadoc.com](https://docs.sintetizadoc.com)
- **Status**: [status.sintetizadoc.com](https://status.sintetizadoc.com)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- [Vue.js](https://vuejs.org/) - Framework incrível
- [Supabase](https://supabase.com/) - Backend poderoso
- [Tailwind CSS](https://tailwindcss.com/) - CSS utilitário
- [OpenAI](https://openai.com/) - Modelos de IA
- [Clerk](https://clerk.com/) - Autenticação simples
- [Stripe](https://stripe.com/) - Pagamentos seguros

---

<div align="center">
  <p>Feito com ❤️ pela equipe SintetizaDoc</p>
  <p>
    <a href="https://sintetizadoc.com">Website</a> •
    <a href="https://docs.sintetizadoc.com">Documentação</a> •
    <a href="https://github.com/sintetizadoc/sintetiza-doc/issues">Reportar Bug</a> •
    <a href="https://github.com/sintetizadoc/sintetiza-doc/discussions">Discussões</a>
  </p>
</div>