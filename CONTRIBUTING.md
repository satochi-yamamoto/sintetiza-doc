# Guia de Contribuição - SintetizaDoc 🤝

Obrigado por considerar contribuir com o SintetizaDoc! Este documento fornece diretrizes para contribuições efetivas e colaborativas.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Padrões de Desenvolvimento](#padrões-de-desenvolvimento)
- [Processo de Pull Request](#processo-de-pull-request)
- [Reportando Bugs](#reportando-bugs)
- [Sugerindo Melhorias](#sugerindo-melhorias)

## 📜 Código de Conduta

Este projeto adere ao [Contributor Covenant](https://www.contributor-covenant.org/). Ao participar, você concorda em manter um ambiente respeitoso e inclusivo.

### Comportamentos Esperados:
- ✅ Usar linguagem acolhedora e inclusiva
- ✅ Respeitar diferentes pontos de vista e experiências
- ✅ Aceitar críticas construtivas graciosamente
- ✅ Focar no que é melhor para a comunidade

### Comportamentos Inaceitáveis:
- ❌ Linguagem ou imagens sexualizadas
- ❌ Trolling, comentários insultuosos ou ataques pessoais
- ❌ Assédio público ou privado
- ❌ Publicar informações privadas de terceiros

## 🚀 Como Contribuir

### Tipos de Contribuição

1. **🐛 Correção de Bugs**
   - Identifique e corrija problemas existentes
   - Adicione testes para prevenir regressões

2. **✨ Novas Funcionalidades**
   - Implemente recursos solicitados na roadmap
   - Proponha e desenvolva melhorias

3. **📚 Documentação**
   - Melhore a documentação existente
   - Adicione exemplos e tutoriais

4. **🧪 Testes**
   - Aumente a cobertura de testes
   - Melhore a qualidade dos testes existentes

5. **🎨 UI/UX**
   - Melhore a interface do usuário
   - Otimize a experiência do usuário

## 🛠️ Configuração do Ambiente

### Pré-requisitos

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 ou **yarn** >= 1.22.0
- **Git** >= 2.30.0

### Configuração Inicial

1. **Fork o repositório**
   ```bash
   # Clique em "Fork" no GitHub
   ```

2. **Clone seu fork**
   ```bash
   git clone https://github.com/SEU_USERNAME/sintetiza-doc.git
   cd sintetiza-doc
   ```

3. **Adicione o repositório original como upstream**
   ```bash
   git remote add upstream https://github.com/sintetizadoc/sintetiza-doc.git
   ```

4. **Instale as dependências**
   ```bash
   npm install
   ```

5. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas credenciais
   ```

6. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

### Estrutura de Branches

- `main` - Branch principal (produção)
- `develop` - Branch de desenvolvimento
- `feature/nome-da-feature` - Novas funcionalidades
- `fix/nome-do-bug` - Correções de bugs
- `docs/nome-da-doc` - Atualizações de documentação

## 📏 Padrões de Desenvolvimento

### Convenções de Código

1. **JavaScript/Vue.js**
   ```javascript
   // Use camelCase para variáveis e funções
   const userName = 'João';
   
   // Use PascalCase para componentes
   const UserProfile = defineComponent({...});
   
   // Use kebab-case para nomes de arquivos
   // user-profile.vue, api-service.js
   ```

2. **CSS/Tailwind**
   ```css
   /* Use classes utilitárias do Tailwind quando possível */
   .btn-primary {
     @apply bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors;
   }
   ```

3. **Commits Semânticos**
   ```bash
   # Formato: tipo(escopo): descrição
   
   feat(auth): adiciona login com Google
   fix(upload): corrige validação de arquivo
   docs(readme): atualiza instruções de instalação
   style(header): ajusta espaçamento do menu
   refactor(api): simplifica chamadas HTTP
   test(upload): adiciona testes de validação
   chore(deps): atualiza dependências
   ```

### Estrutura de Arquivos

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes de interface básicos
│   └── icons/          # Ícones SVG
├── views/              # Páginas da aplicação
├── stores/             # Gerenciamento de estado (Pinia)
├── services/           # Serviços e APIs
├── utils/              # Utilitários e helpers
├── router/             # Configuração de rotas
└── styles/             # Estilos globais
```

### Padrões de Qualidade

1. **ESLint**: Siga as regras configuradas
   ```bash
   npm run lint
   npm run lint:fix
   ```

2. **Prettier**: Formatação automática
   ```bash
   npm run format
   ```

3. **Testes**: Mantenha cobertura > 80%
   ```bash
   npm run test
   npm run test:coverage
   ```

## 🔄 Processo de Pull Request

### Antes de Submeter

1. **Sincronize com upstream**
   ```bash
   git fetch upstream
   git checkout develop
   git merge upstream/develop
   ```

2. **Crie uma branch específica**
   ```bash
   git checkout -b feature/minha-nova-feature
   ```

3. **Faça suas alterações**
   - Siga os padrões de código
   - Adicione testes quando necessário
   - Atualize documentação se aplicável

4. **Execute os testes**
   ```bash
   npm run test
   npm run lint
   npm run build
   ```

### Submetendo o PR

1. **Commit suas alterações**
   ```bash
   git add .
   git commit -m "feat(feature): adiciona nova funcionalidade"
   ```

2. **Push para seu fork**
   ```bash
   git push origin feature/minha-nova-feature
   ```

3. **Abra um Pull Request**
   - Use o template fornecido
   - Descreva claramente as mudanças
   - Referencie issues relacionadas
   - Adicione screenshots se aplicável

### Template de PR

```markdown
## 📝 Descrição
Breve descrição das mudanças realizadas.

## 🔗 Issue Relacionada
Fixes #123

## 🧪 Tipo de Mudança
- [ ] Bug fix (mudança que corrige um problema)
- [ ] Nova feature (mudança que adiciona funcionalidade)
- [ ] Breaking change (mudança que quebra compatibilidade)
- [ ] Documentação

## ✅ Checklist
- [ ] Meu código segue os padrões do projeto
- [ ] Realizei auto-revisão do código
- [ ] Comentei código complexo quando necessário
- [ ] Atualizei a documentação
- [ ] Adicionei testes que provam que minha correção/feature funciona
- [ ] Testes novos e existentes passam localmente

## 📸 Screenshots (se aplicável)
Adicione screenshots das mudanças visuais.

## 🧪 Como Testar
Descreva os passos para testar as mudanças.
```

## 🐛 Reportando Bugs

### Antes de Reportar

1. **Verifique se já existe uma issue**
2. **Teste na versão mais recente**
3. **Reproduza o bug consistentemente**

### Template de Bug Report

```markdown
## 🐛 Descrição do Bug
Descrição clara e concisa do problema.

## 🔄 Passos para Reproduzir
1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

## ✅ Comportamento Esperado
Descrição do que deveria acontecer.

## 📸 Screenshots
Adicione screenshots se aplicável.

## 🖥️ Ambiente
- OS: [ex: Windows 10]
- Browser: [ex: Chrome 91]
- Versão: [ex: 1.2.3]

## 📋 Contexto Adicional
Qualquer informação adicional relevante.
```

## 💡 Sugerindo Melhorias

### Template de Feature Request

```markdown
## 🚀 Resumo da Feature
Descrição clara da funcionalidade desejada.

## 🎯 Problema que Resolve
Explique o problema que esta feature resolveria.

## 💭 Solução Proposta
Descrição detalhada da solução.

## 🔄 Alternativas Consideradas
Outras soluções que você considerou.

## 📋 Contexto Adicional
Informações adicionais, mockups, etc.
```

## 🏷️ Labels e Prioridades

### Labels de Tipo
- `bug` - Correção de problemas
- `enhancement` - Melhorias
- `feature` - Novas funcionalidades
- `documentation` - Documentação
- `question` - Dúvidas

### Labels de Prioridade
- `priority: high` - Alta prioridade
- `priority: medium` - Média prioridade
- `priority: low` - Baixa prioridade

### Labels de Status
- `status: needs-review` - Precisa de revisão
- `status: in-progress` - Em desenvolvimento
- `status: blocked` - Bloqueado
- `status: ready` - Pronto para merge

## 🎯 Roadmap de Contribuições

### Prioridades Atuais

1. **🔐 Autenticação e Segurança**
   - Implementar 2FA
   - Melhorar validações de segurança

2. **🤖 IA e Processamento**
   - Otimizar algoritmos de síntese
   - Adicionar novos modelos de IA

3. **📱 Mobile e PWA**
   - Melhorar responsividade
   - Implementar funcionalidades offline

4. **🔗 Integrações**
   - Adicionar mais serviços de nuvem
   - Melhorar APIs existentes

### Como Escolher uma Tarefa

1. **Iniciantes**: Procure issues com label `good first issue`
2. **Intermediários**: Issues com `help wanted`
3. **Avançados**: Features complexas na roadmap

## 📞 Suporte

### Canais de Comunicação

- **GitHub Issues**: Para bugs e features
- **Discord**: [Comunidade SintetizaDoc](https://discord.gg/sintetizadoc)
- **Email**: dev@sintetizadoc.com

### Horários de Resposta

- **Issues**: 24-48 horas
- **Pull Requests**: 2-5 dias úteis
- **Discord**: Tempo real (horário comercial)

## 🙏 Reconhecimento

Todos os contribuidores são reconhecidos em:
- README.md do projeto
- Página de créditos no site
- Release notes

### Hall da Fama

Os principais contribuidores ganham:
- Badge especial no Discord
- Menção em posts nas redes sociais
- Acesso antecipado a novas features

---

## 📚 Recursos Úteis

- [Documentação do Vue.js](https://vuejs.org/guide/)
- [Guia do Tailwind CSS](https://tailwindcss.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)

---

**Obrigado por contribuir com o SintetizaDoc! 🚀**

Sua contribuição ajuda a tornar a síntese de documentos mais acessível e eficiente para todos.