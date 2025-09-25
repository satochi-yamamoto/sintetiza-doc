<template>
  <div class="api-docs">
    <!-- Header -->
    <div class="docs-header">
      <div class="header-content">
        <h1 class="page-title">Documentação da API</h1>
        <p class="page-subtitle">
          Integre o Sintetiza Doc em suas aplicações com nossa API RESTful
        </p>
        <div class="api-info">
          <div class="info-item">
            <span class="info-label">Versão:</span>
            <span class="info-value">v1.0</span>
          </div>
          <div class="info-item">
            <span class="info-label">Base URL:</span>
            <span class="info-value">https://api.sintetiza-doc.com/v1</span>
          </div>
          <div class="info-item">
            <span class="info-label">Formato:</span>
            <span class="info-value">JSON</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Quick Start -->
    <div class="quick-start-section">
      <div class="section-container">
        <h2 class="section-title">Início Rápido</h2>
        
        <div class="quick-start-grid">
          <div class="step-card">
            <div class="step-number">1</div>
            <h3 class="step-title">Obtenha sua API Key</h3>
            <p class="step-description">
              Acesse suas configurações de conta e gere uma nova chave de API.
            </p>
            <router-link to="/dashboard/configuracoes" class="step-link">
              Ir para Configurações →
            </router-link>
          </div>
          
          <div class="step-card">
            <div class="step-number">2</div>
            <h3 class="step-title">Faça sua primeira requisição</h3>
            <p class="step-description">
              Use curl ou sua biblioteca HTTP favorita para testar a API.
            </p>
            <button @click="showExample = !showExample" class="step-link">
              Ver Exemplo →
            </button>
          </div>
          
          <div class="step-card">
            <div class="step-number">3</div>
            <h3 class="step-title">Explore os endpoints</h3>
            <p class="step-description">
              Navegue pela documentação completa dos endpoints disponíveis.
            </p>
            <a href="#endpoints" class="step-link">
              Ver Endpoints →
            </a>
          </div>
        </div>
        
        <div v-if="showExample" class="example-code">
          <div class="code-header">
            <h4 class="code-title">Exemplo de Requisição</h4>
            <button @click="copyCode" class="copy-button">
              <ClipboardIcon class="copy-icon" />
              {{ copied ? 'Copiado!' : 'Copiar' }}
            </button>
          </div>
          <pre class="code-block"><code ref="codeRef">curl -X POST https://api.sintetiza-doc.com/v1/documents/summarize \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Seu texto para resumir aqui...",
    "style": "executive",
    "language": "pt"
  }'</code></pre>
        </div>
      </div>
    </div>
    
    <!-- Authentication -->
    <div class="auth-section">
      <div class="section-container">
        <h2 class="section-title">Autenticação</h2>
        
        <div class="auth-content">
          <div class="auth-info">
            <KeyIcon class="auth-icon" />
            <div class="auth-details">
              <h3 class="auth-title">API Key Authentication</h3>
              <p class="auth-description">
                Todas as requisições devem incluir sua chave de API no header Authorization.
              </p>
            </div>
          </div>
          
          <div class="auth-example">
            <h4 class="example-title">Header de Autenticação</h4>
            <div class="code-snippet">
              <code>Authorization: Bearer YOUR_API_KEY</code>
            </div>
          </div>
          
          <div class="auth-security">
            <ShieldIcon class="security-icon" />
            <div class="security-content">
              <h4 class="security-title">Segurança</h4>
              <ul class="security-list">
                <li>Mantenha sua API key segura e nunca a exponha publicamente</li>
                <li>Use HTTPS para todas as requisições</li>
                <li>Regenere sua chave periodicamente</li>
                <li>Monitore o uso através do dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Rate Limits -->
    <div class="limits-section">
      <div class="section-container">
        <h2 class="section-title">Limites de Taxa</h2>
        
        <div class="limits-grid">
          <div class="limit-card">
            <h3 class="limit-plan">Plano Gratuito</h3>
            <div class="limit-details">
              <div class="limit-item">
                <span class="limit-label">Requisições por minuto:</span>
                <span class="limit-value">10</span>
              </div>
              <div class="limit-item">
                <span class="limit-label">Requisições por dia:</span>
                <span class="limit-value">100</span>
              </div>
              <div class="limit-item">
                <span class="limit-label">Tamanho máximo:</span>
                <span class="limit-value">1MB</span>
              </div>
            </div>
          </div>
          
          <div class="limit-card">
            <h3 class="limit-plan">Plano Básico</h3>
            <div class="limit-details">
              <div class="limit-item">
                <span class="limit-label">Requisições por minuto:</span>
                <span class="limit-value">60</span>
              </div>
              <div class="limit-item">
                <span class="limit-label">Requisições por dia:</span>
                <span class="limit-value">1.000</span>
              </div>
              <div class="limit-item">
                <span class="limit-label">Tamanho máximo:</span>
                <span class="limit-value">5MB</span>
              </div>
            </div>
          </div>
          
          <div class="limit-card">
            <h3 class="limit-plan">Plano Profissional</h3>
            <div class="limit-details">
              <div class="limit-item">
                <span class="limit-label">Requisições por minuto:</span>
                <span class="limit-value">300</span>
              </div>
              <div class="limit-item">
                <span class="limit-label">Requisições por dia:</span>
                <span class="limit-value">10.000</span>
              </div>
              <div class="limit-item">
                <span class="limit-label">Tamanho máximo:</span>
                <span class="limit-value">25MB</span>
              </div>
            </div>
          </div>
          
          <div class="limit-card">
            <h3 class="limit-plan">Plano Empresarial</h3>
            <div class="limit-details">
              <div class="limit-item">
                <span class="limit-label">Requisições por minuto:</span>
                <span class="limit-value">1.000</span>
              </div>
              <div class="limit-item">
                <span class="limit-label">Requisições por dia:</span>
                <span class="limit-value">100.000</span>
              </div>
              <div class="limit-item">
                <span class="limit-label">Tamanho máximo:</span>
                <span class="limit-value">100MB</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="rate-limit-headers">
          <h3 class="headers-title">Headers de Rate Limit</h3>
          <p class="headers-description">
            Todas as respostas incluem headers informativos sobre seus limites:
          </p>
          <div class="headers-list">
            <div class="header-item">
              <code class="header-name">X-RateLimit-Limit</code>
              <span class="header-description">Limite total de requisições</span>
            </div>
            <div class="header-item">
              <code class="header-name">X-RateLimit-Remaining</code>
              <span class="header-description">Requisições restantes</span>
            </div>
            <div class="header-item">
              <code class="header-name">X-RateLimit-Reset</code>
              <span class="header-description">Timestamp do reset</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Endpoints -->
    <div id="endpoints" class="endpoints-section">
      <div class="section-container">
        <h2 class="section-title">Endpoints da API</h2>
        
        <!-- Documents Endpoints -->
        <div class="endpoint-group">
          <h3 class="group-title">Documentos</h3>
          
          <!-- Upload Document -->
          <div class="endpoint-card">
            <div class="endpoint-header">
              <div class="endpoint-method post">POST</div>
              <div class="endpoint-path">/documents/upload</div>
            </div>
            <div class="endpoint-content">
              <p class="endpoint-description">
                Faz upload de um documento para processamento.
              </p>
              
              <div class="endpoint-section">
                <h4 class="section-subtitle">Parâmetros</h4>
                <div class="params-table">
                  <div class="param-row">
                    <div class="param-name">file</div>
                    <div class="param-type">multipart/form-data</div>
                    <div class="param-required">Obrigatório</div>
                    <div class="param-description">Arquivo a ser processado (PDF, DOCX, TXT)</div>
                  </div>
                  <div class="param-row">
                    <div class="param-name">metadata</div>
                    <div class="param-type">JSON</div>
                    <div class="param-optional">Opcional</div>
                    <div class="param-description">Metadados adicionais do documento</div>
                  </div>
                </div>
              </div>
              
              <div class="endpoint-section">
                <h4 class="section-subtitle">Resposta</h4>
                <div class="response-example">
                  <pre><code>{
  "id": "doc_123456789",
  "filename": "documento.pdf",
  "size": 1024000,
  "status": "uploaded",
  "created_at": "2024-01-15T10:30:00Z"
}</code></pre>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Get Document -->
          <div class="endpoint-card">
            <div class="endpoint-header">
              <div class="endpoint-method get">GET</div>
              <div class="endpoint-path">/documents/{id}</div>
            </div>
            <div class="endpoint-content">
              <p class="endpoint-description">
                Recupera informações de um documento específico.
              </p>
              
              <div class="endpoint-section">
                <h4 class="section-subtitle">Parâmetros de URL</h4>
                <div class="params-table">
                  <div class="param-row">
                    <div class="param-name">id</div>
                    <div class="param-type">string</div>
                    <div class="param-required">Obrigatório</div>
                    <div class="param-description">ID único do documento</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- List Documents -->
          <div class="endpoint-card">
            <div class="endpoint-header">
              <div class="endpoint-method get">GET</div>
              <div class="endpoint-path">/documents</div>
            </div>
            <div class="endpoint-content">
              <p class="endpoint-description">
                Lista todos os documentos do usuário com paginação.
              </p>
              
              <div class="endpoint-section">
                <h4 class="section-subtitle">Query Parameters</h4>
                <div class="params-table">
                  <div class="param-row">
                    <div class="param-name">page</div>
                    <div class="param-type">integer</div>
                    <div class="param-optional">Opcional</div>
                    <div class="param-description">Número da página (padrão: 1)</div>
                  </div>
                  <div class="param-row">
                    <div class="param-name">limit</div>
                    <div class="param-type">integer</div>
                    <div class="param-optional">Opcional</div>
                    <div class="param-description">Itens por página (padrão: 20, máx: 100)</div>
                  </div>
                  <div class="param-row">
                    <div class="param-name">search</div>
                    <div class="param-type">string</div>
                    <div class="param-optional">Opcional</div>
                    <div class="param-description">Termo de busca no nome do arquivo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Summaries Endpoints -->
        <div class="endpoint-group">
          <h3 class="group-title">Resumos</h3>
          
          <!-- Create Summary -->
          <div class="endpoint-card">
            <div class="endpoint-header">
              <div class="endpoint-method post">POST</div>
              <div class="endpoint-path">/documents/summarize</div>
            </div>
            <div class="endpoint-content">
              <p class="endpoint-description">
                Gera um resumo de texto ou documento.
              </p>
              
              <div class="endpoint-section">
                <h4 class="section-subtitle">Body Parameters</h4>
                <div class="params-table">
                  <div class="param-row">
                    <div class="param-name">text</div>
                    <div class="param-type">string</div>
                    <div class="param-required">Obrigatório*</div>
                    <div class="param-description">Texto a ser resumido</div>
                  </div>
                  <div class="param-row">
                    <div class="param-name">document_id</div>
                    <div class="param-type">string</div>
                    <div class="param-required">Obrigatório*</div>
                    <div class="param-description">ID do documento a ser resumido</div>
                  </div>
                  <div class="param-row">
                    <div class="param-name">style</div>
                    <div class="param-type">enum</div>
                    <div class="param-optional">Opcional</div>
                    <div class="param-description">Estilo do resumo: executive, technical, educational, bullet_points</div>
                  </div>
                  <div class="param-row">
                    <div class="param-name">language</div>
                    <div class="param-type">enum</div>
                    <div class="param-optional">Opcional</div>
                    <div class="param-description">Idioma: pt, en (padrão: pt)</div>
                  </div>
                  <div class="param-row">
                    <div class="param-name">length</div>
                    <div class="param-type">enum</div>
                    <div class="param-optional">Opcional</div>
                    <div class="param-description">Tamanho: short, medium, long (padrão: medium)</div>
                  </div>
                </div>
                <p class="param-note">* Forneça text OU document_id, não ambos</p>
              </div>
              
              <div class="endpoint-section">
                <h4 class="section-subtitle">Exemplo de Requisição</h4>
                <div class="request-example">
                  <pre><code>{
  "text": "Seu texto longo aqui...",
  "style": "executive",
  "language": "pt",
  "length": "medium"
}</code></pre>
                </div>
              </div>
              
              <div class="endpoint-section">
                <h4 class="section-subtitle">Resposta</h4>
                <div class="response-example">
                  <pre><code>{
  "id": "sum_123456789",
  "summary": "Este é o resumo gerado...",
  "style": "executive",
  "language": "pt",
  "word_count": 150,
  "processing_time": 2.5,
  "created_at": "2024-01-15T10:35:00Z"
}</code></pre>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Get Summary -->
          <div class="endpoint-card">
            <div class="endpoint-header">
              <div class="endpoint-method get">GET</div>
              <div class="endpoint-path">/summaries/{id}</div>
            </div>
            <div class="endpoint-content">
              <p class="endpoint-description">
                Recupera um resumo específico.
              </p>
            </div>
          </div>
        </div>
        
        <!-- Translation Endpoints -->
        <div class="endpoint-group">
          <h3 class="group-title">Tradução</h3>
          
          <!-- Translate Text -->
          <div class="endpoint-card">
            <div class="endpoint-header">
              <div class="endpoint-method post">POST</div>
              <div class="endpoint-path">/translate</div>
            </div>
            <div class="endpoint-content">
              <p class="endpoint-description">
                Traduz texto entre português e inglês.
              </p>
              
              <div class="endpoint-section">
                <h4 class="section-subtitle">Body Parameters</h4>
                <div class="params-table">
                  <div class="param-row">
                    <div class="param-name">text</div>
                    <div class="param-type">string</div>
                    <div class="param-required">Obrigatório</div>
                    <div class="param-description">Texto a ser traduzido</div>
                  </div>
                  <div class="param-row">
                    <div class="param-name">from</div>
                    <div class="param-type">enum</div>
                    <div class="param-required">Obrigatório</div>
                    <div class="param-description">Idioma de origem: pt, en</div>
                  </div>
                  <div class="param-row">
                    <div class="param-name">to</div>
                    <div class="param-type">enum</div>
                    <div class="param-required">Obrigatório</div>
                    <div class="param-description">Idioma de destino: pt, en</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Transcription Endpoints -->
        <div class="endpoint-group">
          <h3 class="group-title">Transcrição</h3>
          
          <!-- Transcribe Audio -->
          <div class="endpoint-card">
            <div class="endpoint-header">
              <div class="endpoint-method post">POST</div>
              <div class="endpoint-path">/transcribe</div>
            </div>
            <div class="endpoint-content">
              <p class="endpoint-description">
                Transcreve áudio para texto.
              </p>
              
              <div class="endpoint-section">
                <h4 class="section-subtitle">Parâmetros</h4>
                <div class="params-table">
                  <div class="param-row">
                    <div class="param-name">audio</div>
                    <div class="param-type">multipart/form-data</div>
                    <div class="param-required">Obrigatório</div>
                    <div class="param-description">Arquivo de áudio (MP3, WAV, M4A)</div>
                  </div>
                  <div class="param-row">
                    <div class="param-name">language</div>
                    <div class="param-type">enum</div>
                    <div class="param-optional">Opcional</div>
                    <div class="param-description">Idioma do áudio: pt, en (auto-detectado se omitido)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Error Codes -->
    <div class="errors-section">
      <div class="section-container">
        <h2 class="section-title">Códigos de Erro</h2>
        
        <div class="error-intro">
          <p class="error-description">
            A API usa códigos de status HTTP padrão para indicar sucesso ou falha. 
            Erros incluem detalhes adicionais no corpo da resposta.
          </p>
        </div>
        
        <div class="errors-grid">
          <div class="error-card">
            <div class="error-code">400</div>
            <div class="error-content">
              <h3 class="error-title">Bad Request</h3>
              <p class="error-text">Requisição malformada ou parâmetros inválidos</p>
            </div>
          </div>
          
          <div class="error-card">
            <div class="error-code">401</div>
            <div class="error-content">
              <h3 class="error-title">Unauthorized</h3>
              <p class="error-text">API key inválida ou ausente</p>
            </div>
          </div>
          
          <div class="error-card">
            <div class="error-code">403</div>
            <div class="error-content">
              <h3 class="error-title">Forbidden</h3>
              <p class="error-text">Acesso negado ao recurso</p>
            </div>
          </div>
          
          <div class="error-card">
            <div class="error-code">404</div>
            <div class="error-content">
              <h3 class="error-title">Not Found</h3>
              <p class="error-text">Recurso não encontrado</p>
            </div>
          </div>
          
          <div class="error-card">
            <div class="error-code">429</div>
            <div class="error-content">
              <h3 class="error-title">Too Many Requests</h3>
              <p class="error-text">Limite de taxa excedido</p>
            </div>
          </div>
          
          <div class="error-card">
            <div class="error-code">500</div>
            <div class="error-content">
              <h3 class="error-title">Internal Server Error</h3>
              <p class="error-text">Erro interno do servidor</p>
            </div>
          </div>
        </div>
        
        <div class="error-example">
          <h3 class="example-title">Exemplo de Resposta de Erro</h3>
          <div class="error-response">
            <pre><code>{
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "O parâmetro 'style' deve ser um dos valores: executive, technical, educational, bullet_points",
    "details": {
      "parameter": "style",
      "provided_value": "invalid_style",
      "allowed_values": ["executive", "technical", "educational", "bullet_points"]
    }
  }
}</code></pre>
          </div>
        </div>
      </div>
    </div>
    
    <!-- SDKs -->
    <div class="sdks-section">
      <div class="section-container">
        <h2 class="section-title">SDKs e Bibliotecas</h2>
        
        <div class="sdks-intro">
          <p class="sdks-description">
            Facilitamos a integração com SDKs oficiais para as linguagens mais populares.
          </p>
        </div>
        
        <div class="sdks-grid">
          <div class="sdk-card">
            <div class="sdk-icon">
              <JavaScriptIcon class="language-icon" />
            </div>
            <h3 class="sdk-title">JavaScript/Node.js</h3>
            <p class="sdk-description">SDK oficial para aplicações JavaScript e Node.js</p>
            <div class="sdk-install">
              <code>npm install sintetiza-doc-sdk</code>
            </div>
            <a href="#" class="sdk-link">Ver Documentação →</a>
          </div>
          
          <div class="sdk-card">
            <div class="sdk-icon">
              <PythonIcon class="language-icon" />
            </div>
            <h3 class="sdk-title">Python</h3>
            <p class="sdk-description">SDK oficial para aplicações Python</p>
            <div class="sdk-install">
              <code>pip install sintetiza-doc</code>
            </div>
            <a href="#" class="sdk-link">Ver Documentação →</a>
          </div>
          
          <div class="sdk-card">
            <div class="sdk-icon">
              <PHPIcon class="language-icon" />
            </div>
            <h3 class="sdk-title">PHP</h3>
            <p class="sdk-description">SDK oficial para aplicações PHP</p>
            <div class="sdk-install">
              <code>composer require sintetiza-doc/sdk</code>
            </div>
            <a href="#" class="sdk-link">Ver Documentação →</a>
          </div>
          
          <div class="sdk-card">
            <div class="sdk-icon">
              <CurlIcon class="language-icon" />
            </div>
            <h3 class="sdk-title">cURL</h3>
            <p class="sdk-description">Exemplos usando cURL para testes rápidos</p>
            <div class="sdk-install">
              <code>curl --version</code>
            </div>
            <a href="#" class="sdk-link">Ver Exemplos →</a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Support -->
    <div class="support-section">
      <div class="section-container">
        <h2 class="section-title">Suporte e Recursos</h2>
        
        <div class="support-grid">
          <div class="support-card">
            <ChatIcon class="support-icon" />
            <h3 class="support-title">Suporte Técnico</h3>
            <p class="support-description">
              Nossa equipe está pronta para ajudar com integrações e questões técnicas.
            </p>
            <a href="mailto:api-support@sintetiza-doc.com" class="support-link">
              api-support@sintetiza-doc.com
            </a>
          </div>
          
          <div class="support-card">
            <BookIcon class="support-icon" />
            <h3 class="support-title">Guias e Tutoriais</h3>
            <p class="support-description">
              Acesse guias detalhados e exemplos práticos de implementação.
            </p>
            <a href="#" class="support-link">
              Ver Guias →
            </a>
          </div>
          
          <div class="support-card">
            <UsersIcon class="support-icon" />
            <h3 class="support-title">Comunidade</h3>
            <p class="support-description">
              Participe da nossa comunidade de desenvolvedores no Discord.
            </p>
            <a href="#" class="support-link">
              Entrar no Discord →
            </a>
          </div>
          
          <div class="support-card">
            <BugIcon class="support-icon" />
            <h3 class="support-title">Reportar Bugs</h3>
            <p class="support-description">
              Encontrou um problema? Reporte bugs e solicite melhorias.
            </p>
            <a href="#" class="support-link">
              GitHub Issues →
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Icons (inline components)
const ClipboardIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" /><path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11.586l-3-3a1 1 0 00-1.414 0L9 10.172V7a1 1 0 10-2 0v5a1 1 0 001 1h5a1 1 0 100-2h-2.586z" /></svg>`
}

const KeyIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clip-rule="evenodd" /></svg>`
}

const ShieldIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>`
}

const JavaScriptIcon = {
  template: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>`
}

const PythonIcon = {
  template: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/></svg>`
}

const PHPIcon = {
  template: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .982-.122 1.292-.391.313-.27.47-.628.47-1.08 0-.306-.085-.54-.267-.72-.183-.18-.42-.27-.708-.27-.257-.001-.519.05-.766.133zm12.39-3.139c-.317 0-.573.048-.78.157-.2.112-.373.309-.521.65l-.363 1.774c-.042.205-.054.405-.029.617.024.212.082.412.17.583.09.17.214.31.369.415.158.108.355.162.589.162.541 0 .976-.157 1.296-.477.317-.317.542-.795.675-1.433.024-.118.044-.28.059-.489.016-.208.024-.405.024-.589 0-.541-.125-.94-.375-1.199-.252-.259-.628-.388-1.135-.388zm-5.390.048c-.317 0-.573.048-.78.157-.2.112-.373.309-.521.65l-.363 1.774c-.042.205-.054.405-.029.617.024.212.082.412.17.583.09.17.214.31.369.415.158.108.355.162.589.162.541 0 .976-.157 1.296-.477.317-.317.542-.795.675-1.433.024-.118.044-.28.059-.489.016-.208.024-.405.024-.589 0-.541-.125-.94-.375-1.199-.252-.259-.628-.388-1.135-.388zM24 12c0 6.617-5.383 12-12 12S0 18.617 0 12 5.383 0 12 0s12 5.383 12 12zM8.504 8.395c.736 0 1.319.085 1.739.257.42.17.63.463.63.878 0 .205-.042.405-.126.599-.084.194-.212.375-.384.545-.17.17-.378.317-.623.441-.245.125-.521.216-.828.275l-.41.048c.078.257.162.48.252.671.09.191.186.353.288.486.102.133.213.229.333.288.12.059.252.089.396.089.18 0 .354-.024.522-.072.168-.048.33-.114.486-.198l.228.443c-.18.102-.378.186-.594.252-.216.066-.444.099-.684.099-.24 0-.456-.042-.648-.126-.192-.084-.354-.216-.486-.396-.132-.18-.24-.408-.324-.684-.084-.276-.156-.6-.216-.972h-.396l-.515 2.178H5.608l1.296-5.436c.252-.078.528-.138.828-.18.3-.042.612-.063.936-.063zm7.801.007c.48 0 .877.114 1.188.343.312.229.468.565.468 1.009 0 .252-.024.49-.072.714-.048.224-.126.427-.234.609-.108.182-.246.334-.414.456-.168.122-.378.207-.63.255l-.09.018c.078.257.162.48.252.671.09.191.186.353.288.486.102.133.213.229.333.288.12.059.252.089.396.089.18 0 .354-.024.522-.072.168-.048.33-.114.486-.198l.228.443c-.18.102-.378.186-.594.252-.216.066-.444.099-.684.099-.24 0-.456-.042-.648-.126-.192-.084-.354-.216-.486-.396-.132-.18-.24-.408-.324-.684-.084-.276-.156-.6-.216-.972h-.396l-.515 2.178h-1.08l1.296-5.436c.252-.078.528-.138.828-.18.3-.042.612-.063.936-.063zm7.801.007c.48 0 .877.114 1.188.343.312.229.468.565.468 1.009 0 .252-.024.49-.072.714-.048.224-.126.427-.234.609-.108.182-.246.334-.414.456-.168.122-.378.207-.63.255l-.09.018c.078.257.162.48.252.671.09.191.186.353.288.486.102.133.213.229.333.288.12.059.252.089.396.089.18 0 .354-.024.522-.072.168-.048.33-.114.486-.198l.228.443c-.18.102-.378.186-.594.252-.216.066-.444.099-.684.099-.24 0-.456-.042-.648-.126-.192-.084-.354-.216-.486-.396-.132-.18-.24-.408-.324-.684-.084-.276-.156-.6-.216-.972h-.396l-.515 2.178h-1.08l1.296-5.436c.252-.078.528-.138.828-.18.3-.042.612-.063.936-.063zm-7.801.048h-.944l-.515 2.648h.838c.556 0 .982-.122 1.292-.391.313-.27.47-.628.47-1.08 0-.306-.085-.54-.267-.72-.183-.18-.42-.27-.708-.27-.257-.001-.519.05-.766.133z"/></svg>`
}

const CurlIcon = {
  template: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM9.5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5zm7 0c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5zM12 17.5c-2.33 0-4.24-1.62-4.24-3.5 0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .552.896 1 2.24 1s2.24-.448 2.24-1c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 1.88-1.91 3.5-4.24 3.5z"/></svg>`
}

const ChatIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" /><path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" /></svg>`
}

const BookIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" /></svg>`
}

const UsersIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>`
}

const BugIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" /></svg>`
}

// Data
const showExample = ref(false)
const copied = ref(false)
const codeRef = ref(null)

// Methods
const copyCode = async () => {
  if (codeRef.value) {
    try {
      await navigator.clipboard.writeText(codeRef.value.textContent)
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    } catch (err) {
      console.error('Erro ao copiar código:', err)
    }
  }
}
</script>

<style scoped>
.api-docs {
  @apply min-h-screen bg-gray-50 dark:bg-gray-900;
}

.docs-header {
  @apply bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16;
}

.header-content {
  @apply max-w-6xl mx-auto px-4 text-center;
}

.page-title {
  @apply text-4xl md:text-5xl font-bold mb-4;
}

.page-subtitle {
  @apply text-xl text-primary-100 mb-8;
}

.api-info {
  @apply flex flex-wrap justify-center gap-8 text-sm;
}

.info-item {
  @apply flex items-center space-x-2;
}

.info-label {
  @apply text-primary-200;
}

.info-value {
  @apply font-mono bg-primary-700 px-3 py-1 rounded;
}

.section-container {
  @apply max-w-6xl mx-auto px-4;
}

.section-title {
  @apply text-3xl font-bold text-gray-900 dark:text-white mb-8;
}

/* Quick Start */
.quick-start-section {
  @apply py-16;
}

.quick-start-grid {
  @apply grid grid-cols-1 md:grid-cols-3 gap-8 mb-8;
}

.step-card {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center;
}

.step-number {
  @apply w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4;
}

.step-title {
  @apply text-xl font-semibold text-gray-900 dark:text-white mb-3;
}

.step-description {
  @apply text-gray-600 dark:text-gray-300 mb-4;
}

.step-link {
  @apply text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200 font-medium transition-colors duration-200;
}

.example-code {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden;
}

.code-header {
  @apply flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600;
}

.code-title {
  @apply text-lg font-semibold text-gray-900 dark:text-white;
}

.copy-button {
  @apply flex items-center space-x-2 px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors duration-200;
}

.copy-icon {
  @apply w-4 h-4;
}

.code-block {
  @apply p-4 bg-gray-900 text-gray-100 overflow-x-auto;
}

.code-block code {
  @apply font-mono text-sm;
}

/* Authentication */
.auth-section {
  @apply py-16 bg-white dark:bg-gray-800;
}

.auth-content {
  @apply space-y-8;
}

.auth-info {
  @apply flex items-start space-x-4;
}

.auth-icon {
  @apply w-8 h-8 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1;
}

.auth-details {
  @apply flex-1;
}

.auth-title {
  @apply text-xl font-semibold text-gray-900 dark:text-white mb-2;
}

.auth-description {
  @apply text-gray-600 dark:text-gray-300;
}

.auth-example {
  @apply bg-gray-50 dark:bg-gray-700 rounded-lg p-6;
}

.example-title {
  @apply text-lg font-semibold text-gray-900 dark:text-white mb-3;
}

.code-snippet {
  @apply bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm;
}

.auth-security {
  @apply flex items-start space-x-4;
}

.security-icon {
  @apply w-8 h-8 text-green-600 dark:text-green-400 flex-shrink-0 mt-1;
}

.security-content {
  @apply flex-1;
}

.security-title {
  @apply text-lg font-semibold text-gray-900 dark:text-white mb-3;
}

.security-list {
  @apply space-y-2;
}

.security-list li {
  @apply text-gray-600 dark:text-gray-300 relative pl-4;
}

.security-list li::before {
  content: '•';
  @apply absolute left-0 text-green-600 dark:text-green-400;
}

/* Rate Limits */
.limits-section {
  @apply py-16;
}

.limits-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12;
}

.limit-card {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6;
}

.limit-plan {
  @apply text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-200 dark:border-gray-700;
}

.limit-details {
  @apply space-y-3;
}

.limit-item {
  @apply flex justify-between items-center;
}

.limit-label {
  @apply text-gray-600 dark:text-gray-300 text-sm;
}

.limit-value {
  @apply font-semibold text-gray-900 dark:text-white;
}

.rate-limit-headers {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6;
}

.headers-title {
  @apply text-xl font-semibold text-gray-900 dark:text-white mb-3;
}

.headers-description {
  @apply text-gray-600 dark:text-gray-300 mb-4;
}

.headers-list {
  @apply space-y-3;
}

.header-item {
  @apply flex items-center justify-between;
}

.header-name {
  @apply font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded;
}

.header-description {
  @apply text-gray-600 dark:text-gray-300 text-sm;
}

/* Endpoints */
.endpoints-section {
  @apply py-16 bg-white dark:bg-gray-800;
}

.endpoint-group {
  @apply mb-12 last:mb-0;
}

.group-title {
  @apply text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700;
}

.endpoint-card {
  @apply bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 mb-6 overflow-hidden;
}

.endpoint-header {
  @apply flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600;
}

.endpoint-method {
  @apply px-3 py-1 rounded text-sm font-semibold text-white;
}

.endpoint-method.get {
  @apply bg-green-600;
}

.endpoint-method.post {
  @apply bg-blue-600;
}

.endpoint-method.put {
  @apply bg-yellow-600;
}

.endpoint-method.delete {
  @apply bg-red-600;
}

.endpoint-path {
  @apply font-mono text-lg text-gray-900 dark:text-white;
}

.endpoint-content {
  @apply p-6;
}

.endpoint-description {
  @apply text-gray-600 dark:text-gray-300 mb-6;
}

.endpoint-section {
  @apply mb-6 last:mb-0;
}

.section-subtitle {
  @apply text-lg font-semibold text-gray-900 dark:text-white mb-4;
}

.params-table {
  @apply space-y-3;
}

.param-row {
  @apply grid grid-cols-1 md:grid-cols-4 gap-3 p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600;
}

.param-name {
  @apply font-mono text-sm font-semibold text-gray-900 dark:text-white;
}

.param-type {
  @apply text-sm text-gray-600 dark:text-gray-300 font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded;
}

.param-required {
  @apply text-sm font-semibold text-red-600 dark:text-red-400;
}

.param-optional {
  @apply text-sm font-semibold text-gray-500 dark:text-gray-400;
}

.param-description {
  @apply text-sm text-gray-600 dark:text-gray-300;
}

.param-note {
  @apply text-sm text-gray-500 dark:text-gray-400 italic mt-2;
}

.request-example,
.response-example {
  @apply bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto;
}

.request-example pre,
.response-example pre {
  @apply font-mono text-sm;
}

/* Error Codes */
.errors-section {
  @apply py-16;
}

.error-intro {
  @apply mb-8;
}

.error-description {
  @apply text-gray-600 dark:text-gray-300 text-lg;
}

.errors-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8;
}

.error-card {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex items-start space-x-4;
}

.error-code {
  @apply text-2xl font-bold text-red-600 dark:text-red-400 flex-shrink-0;
}

.error-content {
  @apply flex-1;
}

.error-title {
  @apply text-lg font-semibold text-gray-900 dark:text-white mb-2;
}

.error-text {
  @apply text-gray-600 dark:text-gray-300;
}

.error-example {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6;
}

.error-response {
  @apply bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto;
}

.error-response pre {
  @apply font-mono text-sm;
}

/* SDKs */
.sdks-section {
  @apply py-16 bg-white dark:bg-gray-800;
}

.sdks-intro {
  @apply mb-8 text-center;
}

.sdks-description {
  @apply text-gray-600 dark:text-gray-300 text-lg;
}

.sdks-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6;
}

.sdk-card {
  @apply bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6 text-center hover:shadow-md transition-shadow duration-200;
}

.sdk-icon {
  @apply mb-4;
}

.language-icon {
  @apply w-12 h-12 mx-auto text-primary-600 dark:text-primary-400;
}

.sdk-title {
  @apply text-lg font-semibold text-gray-900 dark:text-white mb-3;
}

.sdk-description {
  @apply text-gray-600 dark:text-gray-300 mb-4;
}

.sdk-install {
  @apply bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm mb-4;
}

.sdk-link {
  @apply text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200 font-medium transition-colors duration-200;
}

/* Support */
.support-section {
  @apply py-16;
}

.support-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6;
}

.support-card {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center hover:shadow-md transition-shadow duration-200;
}

.support-icon {
  @apply w-12 h-12 mx-auto text-primary-600 dark:text-primary-400 mb-4;
}

.support-title {
  @apply text-lg font-semibold text-gray-900 dark:text-white mb-3;
}

.support-description {
  @apply text-gray-600 dark:text-gray-300 mb-4;
}

.support-link {
  @apply text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200 font-medium transition-colors duration-200;
}

/* Responsive */
@media (max-width: 768px) {
  .api-info {
    @apply flex-col space-y-4;
  }
  
  .quick-start-grid {
    @apply grid-cols-1;
  }
  
  .limits-grid {
    @apply grid-cols-1;
  }
  
  .endpoint-header {
    @apply flex-col items-start space-y-2 space-x-0;
  }
  
  .param-row {
    @apply grid-cols-1 gap-2;
  }
  
  .errors-grid {
    @apply grid-cols-1;
  }
  
  .sdks-grid {
    @apply grid-cols-1;
  }
  
  .support-grid {
    @apply grid-cols-1;
  }
}
</style>