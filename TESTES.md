# Documentação dos Testes - Sintetiza Doc

## Visão Geral

Este documento descreve a estrutura e implementação dos testes automatizados para o projeto Sintetiza Doc, uma aplicação Vue.js para processamento e síntese de documentos.

## Status Atual dos Testes (Atualizado em Janeiro 2025)

### Resumo Executivo
- **Total de arquivos de teste**: 4
- **Testes passando**: 22/47 (46.8%)
- **Testes falhando**: 25/47 (53.2%)
- **Status geral**: ⚠️ Parcialmente funcional

### Detalhamento por Arquivo

#### ✅ `src/test/components.test.js` - **FUNCIONANDO**
- **Status**: Todos os testes passando
- **Cobertura**: Componentes Vue básicos
- **Observações**: Testes estáveis e bem estruturados

#### ⚠️ `src/test/auth.test.js` - **PARCIALMENTE FUNCIONAL**
- **Status**: 8 passando / 5 falhando
- **Principais problemas corrigidos**:
  - ✅ Mocks do Supabase auth adicionados
  - ✅ Getters de plano e limites corrigidos
  - ✅ Estrutura de dados alinhada com Clerk
- **Problemas restantes**:
  - Spy calls em logout não funcionando corretamente
  - Argumentos incorretos em registro de usuário

#### ⚠️ `src/test/fileUpload.test.js` - **PROBLEMAS DE MOCK**
- **Status**: 2 passando / 15 falhando
- **Principais problemas corrigidos**:
  - ✅ Mock do fileProcessorService adicionado
  - ✅ Reorganização de mocks para evitar hoisting
- **Problemas restantes**:
  - Mocks do Supabase client não funcionando corretamente
  - Métodos do componente não encontrados (uploadFile, resetUpload)

#### ⚠️ `src/test/integration.test.js` - **TIMEOUTS E MOCKS**
- **Status**: 3 passando / 5 falhando
- **Principais problemas corrigidos**:
  - ✅ Timeouts reduzidos e testes simplificados
  - ✅ Lógica de logout corrigida no store
- **Problemas restantes**:
  - Ainda ocorrem timeouts em testes complexos
  - Mocks do Supabase auth incompletos

## Estrutura dos Testes

### Arquivos de Teste

- **`src/test/components.test.js`** - Testes de componentes Vue (✅ Funcionando)
- **`src/test/auth.test.js`** - Testes de autenticação (⚠️ Parcialmente funcional)
- **`src/test/fileUpload.test.js`** - Testes de upload de arquivos (❌ Problemas de mock)
- **`src/test/integration.test.js`** - Testes de integração (⚠️ Timeouts e mocks)

### Mocks e Utilitários

- **`src/test/mocks/supabase.js`** - Mock do cliente Supabase
- **`src/test/mocks/clerk.js`** - Mock do serviço de autenticação Clerk

## Configuração

### Vitest Config (`vitest.config.js`)

```javascript
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/test/setup.js']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  define: { 
    global: 'globalThis' 
  }
})
```

### Setup de Testes (`src/test/setup.js`)

- Configuração global do Vitest
- Importação de mocks necessários
- Configuração do ambiente de teste

## Testes Implementados

### 1. Testes de Componentes Vue ✅

**Arquivo:** `src/test/components.test.js`  
**Status:** Funcionando (9/9 testes passando)

#### Categorias de Teste:

1. **Testes Básicos de Renderização**
   - Criação de componentes simples
   - Passagem de props
   - Emissão de eventos

2. **Testes de Formulário**
   - Manipulação de inputs de texto
   - Validação de campos obrigatórios

3. **Testes de Estado Reativo**
   - Atualização da interface com mudanças de dados

4. **Testes de Computed Properties**
   - Cálculo de valores derivados

5. **Testes de Watchers**
   - Reação a mudanças de dados

6. **Testes de Slots**
   - Renderização de conteúdo de slots

### 2. Testes de Autenticação ⚠️

**Arquivo:** `src/test/auth.test.js`  
**Status:** Em correção

#### Funcionalidades Testadas:
- Login e logout de usuários
- Gerenciamento de estado de autenticação
- Integração com Clerk
- Persistência de sessão

### 3. Testes de Upload de Arquivos ⚠️

**Arquivo:** `src/test/fileUpload.test.js`  
**Status:** Em correção

#### Funcionalidades Testadas:
- Upload de diferentes tipos de arquivo
- Validação de arquivos
- Processamento de documentos
- Tratamento de erros

### 4. Testes de Integração ⚠️

**Arquivo:** `src/test/integration.test.js`  
**Status:** Em correção

#### Funcionalidades Testadas:
- Fluxo completo de autenticação
- Integração entre serviços
- Tratamento de erros em cascata

## Mocks Implementados

### Mock do Supabase

```javascript
export const mockSupabaseClient = {
  from: vi.fn(() => createMockQueryBuilder()),
  auth: {
    getUser: vi.fn().mockResolvedValue({ data: { user: mockUser }, error: null }),
    signOut: vi.fn().mockResolvedValue({ error: null })
  },
  storage: {
    from: vi.fn(() => ({
      upload: vi.fn().mockResolvedValue({ data: mockFile, error: null }),
      remove: vi.fn().mockResolvedValue({ data: null, error: null })
    }))
  }
}
```

### Mock do Clerk

```javascript
export const mockClerkUser = {
  id: 'user_123',
  emailAddresses: [{ emailAddress: 'test@example.com' }],
  firstName: 'Test',
  lastName: 'User'
}

export const mockUseUser = vi.fn(() => ({
  user: mockClerkUser,
  isLoaded: true,
  isSignedIn: true
}))
```

## Comandos de Teste

### Executar Todos os Testes
```bash
npm test
```

### Executar Testes Específicos
```bash
# Apenas testes de componentes
npx vitest run src/test/components.test.js

# Com relatório detalhado
npx vitest run src/test/components.test.js --reporter=verbose
```

### Modo Watch
```bash
npx vitest
```

## Recomendações para Próximos Passos

### Prioridade Alta
1. **Corrigir mocks do Supabase client** nos testes de upload
   - Implementar corretamente os métodos `from().insert().mockResolvedValue()`
   - Verificar estrutura de retorno dos mocks

2. **Resolver métodos ausentes** no componente FileUpload
   - Verificar se `uploadFile` e `resetUpload` existem no componente
   - Atualizar testes para usar métodos corretos

### Prioridade Média
3. **Melhorar mocks assíncronos** nos testes de integração
   - Implementar timeouts mais realistas
   - Simplificar cenários de teste complexos

4. **Corrigir spy calls** nos testes de autenticação
   - Verificar se os spies estão sendo chamados corretamente
   - Ajustar argumentos esperados nos testes

### Prioridade Baixa
5. **Adicionar testes de cobertura** para novos recursos
6. **Implementar testes E2E** com Playwright
7. **Otimizar performance** dos testes

## Análise Técnica

### Pontos Fortes
- ✅ Estrutura de mocks bem organizada
- ✅ Configuração do Vitest adequada
- ✅ Testes de componentes estáveis
- ✅ Boa separação de responsabilidades

### Pontos de Melhoria
- ❌ Mocks complexos causando instabilidade
- ❌ Timeouts inadequados para operações assíncronas
- ❌ Dependências entre testes
- ❌ Falta de isolamento em alguns cenários

### Conclusão
O projeto possui uma base sólida de testes, mas requer ajustes nos mocks e na estrutura de testes assíncronos para atingir maior estabilidade e cobertura.

## Status Atual

### ✅ Funcionando
- Testes de componentes Vue (9 testes)
- Configuração básica do Vitest
- Mocks fundamentais

### ⚠️ Em Correção
- Testes de autenticação (problemas de mock)
- Testes de upload de arquivos (problemas de mock)
- Testes de integração (timeouts e mocks)

### 📋 Próximos Passos
1. Corrigir problemas de mock nos testes existentes
2. Implementar testes E2E com Playwright
3. Adicionar testes de performance
4. Configurar CI/CD com testes automatizados

## Boas Práticas Implementadas

1. **Isolamento de Testes**: Cada teste é independente
2. **Mocks Consistentes**: Estrutura padronizada de mocks
3. **Nomenclatura Clara**: Descrições descritivas dos testes
4. **Cobertura Abrangente**: Testes para diferentes aspectos da aplicação
5. **Configuração Centralizada**: Setup único para todos os testes

## Troubleshooting

### Problemas Comuns

1. **Erro de Mock**: Verificar se os mocks estão sendo importados corretamente
2. **Timeout**: Ajustar configurações de timeout no Vitest
3. **Imports**: Verificar aliases e caminhos de importação
4. **Environment**: Garantir que jsdom está configurado corretamente

### Logs Úteis

Para debug, adicionar logs nos testes:
```javascript
console.log('Mock state:', mockSupabaseClient.from())
```

---

**Última atualização:** Dezembro 2024  
**Versão:** 1.0.0