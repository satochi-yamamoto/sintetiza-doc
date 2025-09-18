<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              Transforme documentos longos em 
              <span class="hero-highlight">resumos inteligentes</span>
            </h1>
            
            <p class="hero-description">
              Economize tempo e otimize sua produtividade com nossa IA avançada. 
              Processe PDFs, Word, áudio de reuniões e muito mais em segundos.
            </p>
            
            <div class="hero-actions">
              <router-link 
                to="/register" 
                class="btn btn-primary btn-lg"
              >
                Começar Gratuitamente
              </router-link>
              
              <button 
                @click="scrollToDemo" 
                class="btn btn-outline btn-lg"
              >
                <svg class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                </svg>
                Ver Demonstração
              </button>
            </div>
            
            <div class="hero-stats">
              <div class="stat-item">
                <span class="stat-number">10k+</span>
                <span class="stat-label">Documentos processados</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">95%</span>
                <span class="stat-label">Precisão dos resumos</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">5min</span>
                <span class="stat-label">Tempo médio economizado</span>
              </div>
            </div>
          </div>
          
          <div class="hero-visual">
            <div class="demo-container">
              <div class="demo-upload">
                <div class="upload-area">
                  <svg class="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7,10 12,15 17,10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <p>Arraste seus documentos aqui</p>
                </div>
              </div>
              
              <div class="demo-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12,5 19,12 12,19" />
                </svg>
              </div>
              
              <div class="demo-result">
                <div class="result-card">
                  <h4>Resumo Executivo</h4>
                  <div class="result-content">
                    <div class="result-line"></div>
                    <div class="result-line short"></div>
                    <div class="result-line"></div>
                    <div class="result-line medium"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Funcionalidades Poderosas</h2>
          <p class="section-description">
            Tudo que você precisa para transformar informação em conhecimento
          </p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
            </div>
            <h3 class="feature-title">Múltiplos Formatos</h3>
            <p class="feature-description">
              Suporte completo para PDF, Word, TXT e áudio de reuniões com transcrição automática.
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 12l2 2 4-4" />
                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
                <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
                <path d="M3 12c0 5.5 4.5 10 10 10s10-4.5 10-10" />
              </svg>
            </div>
            <h3 class="feature-title">IA Avançada</h3>
            <p class="feature-description">
              Algoritmos de última geração para extrair insights, decisões e pendências automaticamente.
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27,6.96 12,12.01 20.73,6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <h3 class="feature-title">Estilos Personalizados</h3>
            <p class="feature-description">
              Resumos técnicos, executivos ou educacionais adaptados ao seu público-alvo.
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 class="feature-title">Colaboração</h3>
            <p class="feature-description">
              Compartilhe resumos com sua equipe e exporte para Word, Excel, Notion e Trello.
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21,15 16,10 5,21" />
              </svg>
            </div>
            <h3 class="feature-title">Tradução Automática</h3>
            <p class="feature-description">
              Tradução bidirecional entre português e inglês mantendo o contexto original.
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 class="feature-title">Segurança Total</h3>
            <p class="feature-description">
              Seus documentos são protegidos com criptografia de ponta e compliance LGPD.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Demo Section -->
    <section ref="demoSection" class="demo-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Veja Como Funciona</h2>
          <p class="section-description">
            Em apenas 3 passos simples, transforme qualquer documento em um resumo profissional
          </p>
        </div>
        
        <div class="demo-steps">
          <div class="step-item">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3 class="step-title">Upload do Documento</h3>
              <p class="step-description">
                Faça upload do seu PDF, Word ou áudio de reunião. Suportamos arquivos de até 100MB.
              </p>
            </div>
            <div class="step-visual">
              <div class="upload-demo">
                <svg class="demo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17,8 12,3 7,8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
            </div>
          </div>
          
          <div class="step-item">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3 class="step-title">Configuração do Resumo</h3>
              <p class="step-description">
                Escolha o estilo (técnico, executivo ou educacional) e defina o tamanho desejado.
              </p>
            </div>
            <div class="step-visual">
              <div class="config-demo">
                <svg class="demo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div class="step-item">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3 class="step-title">Resumo Pronto</h3>
              <p class="step-description">
                Receba seu resumo estruturado com tópicos, insights e decisões identificadas automaticamente.
              </p>
            </div>
            <div class="step-visual">
              <div class="result-demo">
                <svg class="demo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="9,11 12,14 22,4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Pricing Section -->
    <section class="pricing-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Planos Para Todos os Tamanhos</h2>
          <p class="section-description">
            Escolha o plano ideal para suas necessidades
          </p>
        </div>
        
        <div class="pricing-grid">
          <div class="pricing-card">
            <div class="pricing-header">
              <h3 class="pricing-title">Gratuito</h3>
              <div class="pricing-price">
                <span class="price-currency">R$</span>
                <span class="price-amount">0</span>
                <span class="price-period">/mês</span>
              </div>
            </div>
            
            <ul class="pricing-features">
              <li class="feature-item">
                <svg class="feature-check" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                5 resumos por mês
              </li>
              <li class="feature-item">
                <svg class="feature-check" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Formatos básicos (PDF, TXT)
              </li>
              <li class="feature-item">
                <svg class="feature-check" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Resumos padrão
              </li>
            </ul>
            
            <router-link to="/register" class="pricing-btn btn-outline">
              Começar Grátis
            </router-link>
          </div>
          
          <div class="pricing-card featured">
            <div class="pricing-badge">Mais Popular</div>
            <div class="pricing-header">
              <h3 class="pricing-title">Profissional</h3>
              <div class="pricing-price">
                <span class="price-currency">R$</span>
                <span class="price-amount">79</span>
                <span class="price-period">/mês</span>
              </div>
            </div>
            
            <ul class="pricing-features">
              <li class="feature-item">
                <svg class="feature-check" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Documentos ilimitados
              </li>
              <li class="feature-item">
                <svg class="feature-check" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Todos os formatos + áudio
              </li>
              <li class="feature-item">
                <svg class="feature-check" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Integrações completas
              </li>
              <li class="feature-item">
                <svg class="feature-check" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Prioridade no processamento
              </li>
            </ul>
            
            <router-link to="/register" class="pricing-btn btn-primary">
              Começar Teste Grátis
            </router-link>
          </div>
          
          <div class="pricing-card">
            <div class="pricing-header">
              <h3 class="pricing-title">Empresarial</h3>
              <div class="pricing-price">
                <span class="price-custom">Sob consulta</span>
              </div>
            </div>
            
            <ul class="pricing-features">
              <li class="feature-item">
                <svg class="feature-check" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                API dedicada
              </li>
              <li class="feature-item">
                <svg class="feature-check" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Suporte premium 24/7
              </li>
              <li class="feature-item">
                <svg class="feature-check" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Personalizações corporativas
              </li>
              <li class="feature-item">
                <svg class="feature-check" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                SLA garantido
              </li>
            </ul>
            
            <router-link to="/contact" class="pricing-btn btn-outline">
              Falar com Vendas
            </router-link>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">
            Pronto para economizar horas de trabalho?
          </h2>
          <p class="cta-description">
            Junte-se a milhares de profissionais que já transformaram sua produtividade
          </p>
          <div class="cta-actions">
            <router-link to="/register" class="btn btn-primary btn-lg">
              Começar Gratuitamente
            </router-link>
            <router-link to="/contact" class="btn btn-outline btn-lg">
              Falar com Especialista
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Refs
const demoSection = ref(null)

// Methods
const scrollToDemo = () => {
  if (demoSection.value) {
    demoSection.value.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}
</script>

<style scoped>
/* Hero Section */
.hero-section {
  @apply bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 py-20 lg:py-32;
}

.hero-container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

.hero-content {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-12 items-center;
}

.hero-title {
  @apply text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight;
}

.hero-highlight {
  @apply text-primary-600 dark:text-primary-400;
}

.hero-description {
  @apply text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed;
}

.hero-actions {
  @apply flex flex-col sm:flex-row gap-4 mb-12;
}

.hero-stats {
  @apply grid grid-cols-3 gap-8;
}

.stat-item {
  @apply text-center;
}

.stat-number {
  @apply block text-2xl font-bold text-primary-600 dark:text-primary-400;
}

.stat-label {
  @apply text-sm text-gray-600 dark:text-gray-400;
}

.hero-visual {
  @apply flex justify-center;
}

.demo-container {
  @apply flex items-center space-x-8 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl;
}

.demo-upload {
  @apply flex-shrink-0;
}

.upload-area {
  @apply w-32 h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center text-gray-500 dark:text-gray-400;
}

.upload-icon {
  @apply w-8 h-8 mb-2;
}

.demo-arrow {
  @apply flex-shrink-0 text-primary-600 dark:text-primary-400;
}

.demo-arrow svg {
  @apply w-8 h-8;
}

.demo-result {
  @apply flex-shrink-0;
}

.result-card {
  @apply bg-gray-50 dark:bg-gray-700 rounded-lg p-4 w-40;
}

.result-card h4 {
  @apply text-sm font-semibold text-gray-900 dark:text-white mb-3;
}

.result-content {
  @apply space-y-2;
}

.result-line {
  @apply h-2 bg-gray-300 dark:bg-gray-600 rounded;
}

.result-line.short {
  @apply w-3/4;
}

.result-line.medium {
  @apply w-5/6;
}

/* Features Section */
.features-section {
  @apply py-20 bg-white dark:bg-gray-900;
}

.features-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8;
}

.feature-card {
  @apply text-center p-8 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300;
}

.feature-icon {
  @apply w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto mb-4;
}

.feature-title {
  @apply text-xl font-semibold text-gray-900 dark:text-white mb-3;
}

.feature-description {
  @apply text-gray-600 dark:text-gray-300 leading-relaxed;
}

/* Demo Section */
.demo-section {
  @apply py-20 bg-gray-50 dark:bg-gray-800;
}

.demo-steps {
  @apply space-y-12;
}

.step-item {
  @apply flex flex-col lg:flex-row items-center gap-8;
}

.step-item:nth-child(even) {
  @apply lg:flex-row-reverse;
}

.step-number {
  @apply w-16 h-16 bg-primary-600 text-white text-2xl font-bold rounded-full flex items-center justify-center flex-shrink-0;
}

.step-content {
  @apply flex-1 text-center lg:text-left;
}

.step-item:nth-child(even) .step-content {
  @apply lg:text-right;
}

.step-title {
  @apply text-2xl font-bold text-gray-900 dark:text-white mb-4;
}

.step-description {
  @apply text-lg text-gray-600 dark:text-gray-300 leading-relaxed;
}

.step-visual {
  @apply flex-shrink-0;
}

.upload-demo,
.config-demo,
.result-demo {
  @apply w-32 h-32 bg-white dark:bg-gray-700 rounded-2xl flex items-center justify-center shadow-lg;
}

.demo-icon {
  @apply w-16 h-16 text-primary-600 dark:text-primary-400;
}

/* Pricing Section */
.pricing-section {
  @apply py-20 bg-white dark:bg-gray-900;
}

.pricing-grid {
  @apply grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto;
}

.pricing-card {
  @apply bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 relative;
}

.pricing-card.featured {
  @apply border-primary-500 shadow-2xl scale-105;
}

.pricing-badge {
  @apply absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium;
}

.pricing-header {
  @apply text-center mb-8;
}

.pricing-title {
  @apply text-2xl font-bold text-gray-900 dark:text-white mb-4;
}

.pricing-price {
  @apply flex items-baseline justify-center;
}

.price-currency {
  @apply text-2xl font-medium text-gray-500 dark:text-gray-400;
}

.price-amount {
  @apply text-5xl font-bold text-gray-900 dark:text-white;
}

.price-period {
  @apply text-xl font-medium text-gray-500 dark:text-gray-400;
}

.price-custom {
  @apply text-2xl font-bold text-gray-900 dark:text-white;
}

.pricing-features {
  @apply space-y-4 mb-8;
}

.feature-item {
  @apply flex items-center;
}

.feature-check {
  @apply w-5 h-5 text-green-500 mr-3 flex-shrink-0;
}

.pricing-btn {
  @apply w-full text-center py-3 px-6 rounded-lg font-medium transition-colors duration-200;
}

/* CTA Section */
.cta-section {
  @apply py-20 bg-primary-600 dark:bg-primary-700;
}

.cta-content {
  @apply text-center max-w-4xl mx-auto;
}

.cta-title {
  @apply text-3xl lg:text-5xl font-bold text-white mb-6;
}

.cta-description {
  @apply text-xl text-primary-100 mb-8;
}

.cta-actions {
  @apply flex flex-col sm:flex-row gap-4 justify-center;
}

/* Common Styles */
.container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

.section-header {
  @apply text-center mb-16;
}

.section-title {
  @apply text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4;
}

.section-description {
  @apply text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto;
}

.btn {
  @apply inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2;
}

.btn-primary {
  @apply bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500;
}

.btn-outline {
  @apply border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-primary-500;
}

.btn-lg {
  @apply px-8 py-4 text-lg;
}

.btn-icon {
  @apply w-5 h-5 mr-2;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    @apply text-3xl;
  }
  
  .hero-description {
    @apply text-lg;
  }
  
  .hero-stats {
    @apply grid-cols-1 gap-4;
  }
  
  .demo-container {
    @apply flex-col space-x-0 space-y-6;
  }
  
  .demo-arrow {
    @apply transform rotate-90;
  }
  
  .step-item {
    @apply text-center;
  }
  
  .step-content {
    @apply text-center;
  }
  
  .pricing-card.featured {
    @apply scale-100;
  }
}
</style>