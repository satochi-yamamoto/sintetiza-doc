<template>
  <footer class="app-footer">
    <div class="footer-container">
      <!-- Seção Principal -->
      <div class="footer-main">
        <!-- Logo e Descrição -->
        <div class="footer-brand">
          <div class="footer-logo">
            <svg class="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
            </svg>
            <span class="logo-text">SintetizaDoc</span>
          </div>
          
          <p class="footer-description">
            Transforme documentos longos em resumos inteligentes e objetivos. 
            Economize tempo e otimize sua produtividade com IA avançada.
          </p>
          
          <!-- Redes Sociais -->
          <div class="social-links">
            <a href="#" class="social-link" aria-label="Twitter">
              <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            
            <a href="#" class="social-link" aria-label="LinkedIn">
              <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            
            <a href="#" class="social-link" aria-label="GitHub">
              <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            
            <a href="#" class="social-link" aria-label="YouTube">
              <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Links de Navegação -->
        <div class="footer-links">
          <!-- Produto -->
          <div class="link-group">
            <h3 class="link-group-title">Produto</h3>
            <ul class="link-list">
              <li><router-link to="/features" class="footer-link">Funcionalidades</router-link></li>
              <li><router-link to="/pricing" class="footer-link">Preços</router-link></li>
              <li><router-link to="/integrations" class="footer-link">Integrações</router-link></li>
              <li><router-link to="/api" class="footer-link">API</router-link></li>
              <li><router-link to="/changelog" class="footer-link">Novidades</router-link></li>
            </ul>
          </div>
          
          <!-- Empresa -->
          <div class="link-group">
            <h3 class="link-group-title">Empresa</h3>
            <ul class="link-list">
              <li><router-link to="/about" class="footer-link">Sobre Nós</router-link></li>
              <li><router-link to="/blog" class="footer-link">Blog</router-link></li>
              <li><router-link to="/careers" class="footer-link">Carreiras</router-link></li>
              <li><router-link to="/press" class="footer-link">Imprensa</router-link></li>
              <li><router-link to="/contact" class="footer-link">Contato</router-link></li>
            </ul>
          </div>
          
          <!-- Recursos -->
          <div class="link-group">
            <h3 class="link-group-title">Recursos</h3>
            <ul class="link-list">
              <li><router-link to="/help" class="footer-link">Central de Ajuda</router-link></li>
              <li><router-link to="/docs" class="footer-link">Documentação</router-link></li>
              <li><router-link to="/tutorials" class="footer-link">Tutoriais</router-link></li>
              <li><router-link to="/community" class="footer-link">Comunidade</router-link></li>
              <li><router-link to="/status" class="footer-link">Status</router-link></li>
            </ul>
          </div>
          
          <!-- Legal -->
          <div class="link-group">
            <h3 class="link-group-title">Legal</h3>
            <ul class="link-list">
              <li><router-link to="/privacy" class="footer-link">Privacidade</router-link></li>
              <li><router-link to="/terms" class="footer-link">Termos de Uso</router-link></li>
              <li><router-link to="/cookies" class="footer-link">Cookies</router-link></li>
              <li><router-link to="/security" class="footer-link">Segurança</router-link></li>
              <li><router-link to="/compliance" class="footer-link">Compliance</router-link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- Newsletter -->
      <div class="newsletter-section">
        <div class="newsletter-content">
          <h3 class="newsletter-title">Fique por dentro das novidades</h3>
          <p class="newsletter-description">
            Receba dicas, atualizações e conteúdo exclusivo sobre produtividade e IA.
          </p>
        </div>
        
        <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
          <div class="newsletter-input-group">
            <input
              v-model="newsletterEmail"
              type="email"
              placeholder="Seu melhor email"
              class="newsletter-input"
              required
            />
            <button 
              type="submit" 
              class="newsletter-btn"
              :disabled="isSubscribing"
            >
              <svg v-if="isSubscribing" class="animate-spin newsletter-icon" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-else>Inscrever</span>
            </button>
          </div>
          
          <p class="newsletter-disclaimer">
            Ao se inscrever, você concorda com nossa 
            <router-link to="/privacy" class="disclaimer-link">Política de Privacidade</router-link>.
          </p>
        </form>
      </div>
      
      <!-- Rodapé Inferior -->
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <!-- Copyright -->
          <div class="copyright">
            <p>&copy; {{ currentYear }} SintetizaDoc. Todos os direitos reservados.</p>
          </div>
          
          <!-- Informações Adicionais -->
          <div class="footer-info">
            <div class="info-item">
              <svg class="info-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              <span>São Paulo, Brasil</span>
            </div>
            
            <div class="info-item">
              <svg class="info-icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <a href="mailto:contato@sintetizadoc.com" class="info-link">
                contato@sintetizadoc.com
              </a>
            </div>
            
            <div class="info-item">
              <svg class="info-icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <a href="tel:+5511999999999" class="info-link">
                +55 (11) 99999-9999
              </a>
            </div>
          </div>
          
          <!-- Selos e Certificações -->
          <div class="certifications">
            <div class="cert-item" title="SSL Seguro">
              <svg class="cert-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
              <span class="cert-text">SSL</span>
            </div>
            
            <div class="cert-item" title="LGPD Compliance">
              <svg class="cert-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span class="cert-text">LGPD</span>
            </div>
            
            <div class="cert-item" title="ISO 27001">
              <svg class="cert-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span class="cert-text">ISO</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'

// Composables
const toast = useToast()

// Refs
const newsletterEmail = ref('')
const isSubscribing = ref(false)

// Computed
const currentYear = computed(() => {
  return new Date().getFullYear()
})

// Methods
const subscribeNewsletter = async () => {
  if (!newsletterEmail.value) {
    toast.error('Por favor, insira um email válido')
    return
  }
  
  try {
    isSubscribing.value = true
    
    // Simular chamada da API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Aqui você faria a chamada real para a API de newsletter
    // await newsletterService.subscribe(newsletterEmail.value)
    
    toast.success('Inscrição realizada com sucesso! Verifique seu email.')
    newsletterEmail.value = ''
    
  } catch (error) {
    console.error('Erro na inscrição:', error)
    toast.error('Erro ao realizar inscrição. Tente novamente.')
  } finally {
    isSubscribing.value = false
  }
}
</script>

<style scoped>
.app-footer {
  @apply bg-gray-900 text-gray-300;
}

.footer-container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12;
}

.footer-main {
  @apply grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12;
}

.footer-brand {
  @apply lg:col-span-2;
}

.footer-logo {
  @apply flex items-center space-x-2 mb-4;
}

.logo-icon {
  @apply w-8 h-8 text-primary-400;
}

.logo-text {
  @apply text-xl font-bold text-white;
}

.footer-description {
  @apply text-gray-400 mb-6 max-w-md;
}

.social-links {
  @apply flex space-x-4;
}

.social-link {
  @apply text-gray-400 hover:text-primary-400 transition-colors duration-200;
}

.social-icon {
  @apply w-5 h-5;
}

.footer-links {
  @apply lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8;
}

.link-group-title {
  @apply text-white font-semibold mb-4;
}

.link-list {
  @apply space-y-3;
}

.footer-link {
  @apply text-gray-400 hover:text-primary-400 transition-colors duration-200 text-decoration-none;
}

.newsletter-section {
  @apply bg-gray-800 rounded-lg p-8 mb-12;
}

.newsletter-content {
  @apply text-center mb-6;
}

.newsletter-title {
  @apply text-2xl font-bold text-white mb-2;
}

.newsletter-description {
  @apply text-gray-400 max-w-2xl mx-auto;
}

.newsletter-form {
  @apply max-w-md mx-auto;
}

.newsletter-input-group {
  @apply flex mb-3;
}

.newsletter-input {
  @apply flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500;
}

.newsletter-btn {
  @apply px-6 py-3 bg-primary-600 text-white font-medium rounded-r-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center;
}

.newsletter-icon {
  @apply w-4 h-4;
}

.newsletter-disclaimer {
  @apply text-xs text-gray-500 text-center;
}

.disclaimer-link {
  @apply text-primary-400 hover:text-primary-300 text-decoration-none;
}

.footer-bottom {
  @apply border-t border-gray-800 pt-8;
}

.footer-bottom-content {
  @apply flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0;
}

.copyright {
  @apply text-gray-500 text-sm;
}

.footer-info {
  @apply flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6;
}

.info-item {
  @apply flex items-center space-x-2 text-sm text-gray-400;
}

.info-icon {
  @apply w-4 h-4;
}

.info-link {
  @apply hover:text-primary-400 transition-colors duration-200 text-decoration-none;
}

.certifications {
  @apply flex items-center space-x-4;
}

.cert-item {
  @apply flex items-center space-x-1 text-xs text-gray-500;
}

.cert-icon {
  @apply w-4 h-4;
}

.cert-text {
  @apply font-medium;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .footer-main {
    @apply grid-cols-1 gap-6;
  }
  
  .footer-links {
    @apply grid-cols-2 gap-6;
  }
  
  .newsletter-input-group {
    @apply flex-col;
  }
  
  .newsletter-input {
    @apply rounded-md mb-3;
  }
  
  .newsletter-btn {
    @apply rounded-md;
  }
  
  .footer-bottom-content {
    @apply text-center;
  }
  
  .footer-info {
    @apply flex-col space-y-2;
  }
  
  .certifications {
    @apply justify-center;
  }
}
</style>