<template>
  <div class="forgot-password-page">
    <div class="forgot-password-container">
      <!-- Header -->
      <div class="forgot-password-header">
        <router-link to="/" class="logo-link">
          <div class="logo">
            <svg class="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
            </svg>
            <span class="logo-text">SintetizaDoc</span>
          </div>
        </router-link>
        
        <div class="icon-container">
          <svg class="forgot-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L9 7V9C9 10.1 9.9 11 11 11V22H13V11C14.1 11 15 10.1 15 9Z" fill="currentColor"/>
          </svg>
        </div>
        
        <h1 class="forgot-password-title">Esqueceu sua senha?</h1>
        <p class="forgot-password-subtitle">
          Não se preocupe! Digite seu email e enviaremos um link para redefinir sua senha.
        </p>
      </div>
      
      <!-- Success State -->
      <div v-if="emailSent" class="success-state">
        <div class="success-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        
        <h2 class="success-title">Email enviado!</h2>
        <p class="success-message">
          Enviamos um link de recuperação para <strong>{{ form.email }}</strong>.
          Verifique sua caixa de entrada e spam.
        </p>
        
        <div class="success-actions">
          <button 
            @click="resendEmail" 
            :disabled="isLoading || resendCooldown > 0"
            class="resend-btn"
          >
            <LoadingSpinner 
              v-if="isLoading" 
              size="sm" 
              variant="primary" 
              class="mr-2"
            />
            {{ resendCooldown > 0 ? `Reenviar em ${resendCooldown}s` : 'Reenviar email' }}
          </button>
          
          <router-link to="/login" class="back-login-btn">
            Voltar ao login
          </router-link>
        </div>
      </div>
      
      <!-- Form State -->
      <form v-else @submit.prevent="handleForgotPassword" class="forgot-password-form">
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="form-input"
            :class="{ 'input-error': errors.email }"
            placeholder="Digite seu email cadastrado"
            required
            autocomplete="email"
            :disabled="isLoading"
          />
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>
        
        <button 
          type="submit" 
          :disabled="isLoading || !form.email"
          class="forgot-password-btn"
        >
          <LoadingSpinner 
            v-if="isLoading" 
            size="sm" 
            variant="white" 
            class="mr-2"
          />
          {{ isLoading ? 'Enviando...' : 'Enviar link de recuperação' }}
        </button>
      </form>
      
      <!-- Footer -->
      <div class="forgot-password-footer">
        <p class="footer-text">
          Lembrou da senha?
          <router-link to="/login" class="login-link">
            Voltar ao login
          </router-link>
        </p>
        
        <p class="footer-text">
          Não tem uma conta?
          <router-link to="/register" class="register-link">
            Cadastre-se gratuitamente
          </router-link>
        </p>
        
        <div class="footer-links">
          <router-link to="/privacy" class="footer-link">Privacidade</router-link>
          <span class="footer-separator">•</span>
          <router-link to="/terms" class="footer-link">Termos</router-link>
          <span class="footer-separator">•</span>
          <router-link to="/help" class="footer-link">Ajuda</router-link>
        </div>
      </div>
    </div>
    
    <!-- Background -->
    <div class="forgot-password-background">
      <div class="bg-pattern"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'
import { useToast } from 'vue-toastification'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

// Composables
const router = useRouter()
const authStore = useAuthStore()
const appStore = useAppStore()
const toast = useToast()

// Refs
const isLoading = ref(false)
const emailSent = ref(false)
const resendCooldown = ref(0)
let cooldownInterval = null

// Form data
const form = reactive({
  email: ''
})

// Errors
const errors = reactive({
  email: ''
})

// Methods
const validateForm = () => {
  errors.email = ''
  
  let isValid = true
  
  if (!form.email) {
    errors.email = 'Email é obrigatório'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Email inválido'
    isValid = false
  }
  
  return isValid
}

const handleForgotPassword = async () => {
  if (!validateForm()) return
  
  try {
    isLoading.value = true
    appStore.setLoading(true)
    
    await authStore.resetPassword(form.email.trim())
    
    emailSent.value = true
    startResendCooldown()
    
    toast.success('Email de recuperação enviado com sucesso!')
    
  } catch (error) {
    console.error('Erro ao enviar email de recuperação:', error)
    
    if (error.message.includes('User not found')) {
      errors.email = 'Email não encontrado'
      toast.error('Email não encontrado em nossa base de dados')
    } else if (error.message.includes('Email rate limit exceeded')) {
      toast.error('Muitas tentativas. Tente novamente em alguns minutos.')
    } else {
      toast.error('Erro ao enviar email. Tente novamente.')
    }
  } finally {
    isLoading.value = false
    appStore.setLoading(false)
  }
}

const resendEmail = async () => {
  if (resendCooldown.value > 0) return
  
  try {
    isLoading.value = true
    
    await authStore.resetPassword(form.email.trim())
    
    startResendCooldown()
    toast.success('Email reenviado com sucesso!')
    
  } catch (error) {
    console.error('Erro ao reenviar email:', error)
    toast.error('Erro ao reenviar email. Tente novamente.')
  } finally {
    isLoading.value = false
  }
}

const startResendCooldown = () => {
  resendCooldown.value = 60 // 60 seconds cooldown
  
  cooldownInterval = setInterval(() => {
    resendCooldown.value--
    
    if (resendCooldown.value <= 0) {
      clearInterval(cooldownInterval)
      cooldownInterval = null
    }
  }, 1000)
}

// Lifecycle
onMounted(() => {
  // Pre-fill email from query params if available
  const email = router.currentRoute.value.query.email
  if (email) {
    form.email = email
  }
})

onUnmounted(() => {
  if (cooldownInterval) {
    clearInterval(cooldownInterval)
  }
})
</script>

<style scoped>
.forgot-password-page {
  @apply min-h-screen flex items-center justify-center relative;
}

.forgot-password-container {
  @apply w-full max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl relative z-10;
}

.forgot-password-header {
  @apply text-center mb-8;
}

.logo-link {
  @apply inline-block mb-6;
}

.logo {
  @apply flex items-center justify-center space-x-2;
}

.logo-icon {
  @apply w-8 h-8 text-primary-600 dark:text-primary-400;
}

.logo-text {
  @apply text-xl font-bold text-gray-900 dark:text-white;
}

.icon-container {
  @apply flex justify-center mb-6;
}

.forgot-icon {
  @apply w-16 h-16 text-primary-600 dark:text-primary-400;
}

.forgot-password-title {
  @apply text-2xl font-bold text-gray-900 dark:text-white mb-2;
}

.forgot-password-subtitle {
  @apply text-gray-600 dark:text-gray-300 leading-relaxed;
}

.success-state {
  @apply text-center space-y-6;
}

.success-icon {
  @apply flex justify-center;
}

.success-icon svg {
  @apply w-16 h-16 text-green-500;
}

.success-title {
  @apply text-xl font-bold text-gray-900 dark:text-white;
}

.success-message {
  @apply text-gray-600 dark:text-gray-300 leading-relaxed;
}

.success-actions {
  @apply space-y-3;
}

.resend-btn {
  @apply w-full flex items-center justify-center px-4 py-2 border border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400 bg-white dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed;
}

.back-login-btn {
  @apply block w-full text-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white font-medium transition-colors duration-200;
}

.forgot-password-form {
  @apply space-y-6;
}

.form-group {
  @apply space-y-2;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 dark:text-gray-300;
}

.form-input {
  @apply w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed;
}

.input-error {
  @apply border-red-500 focus:ring-red-500 focus:border-red-500;
}

.error-message {
  @apply text-sm text-red-600 dark:text-red-400;
}

.forgot-password-btn {
  @apply w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200;
}

.forgot-password-footer {
  @apply mt-8 text-center space-y-4;
}

.footer-text {
  @apply text-sm text-gray-600 dark:text-gray-400;
}

.login-link,
.register-link {
  @apply text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 font-medium;
}

.footer-links {
  @apply flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400;
}

.footer-link {
  @apply hover:text-gray-700 dark:hover:text-gray-300;
}

.footer-separator {
  @apply text-gray-300 dark:text-gray-600;
}

.forgot-password-background {
  @apply absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800;
}

.bg-pattern {
  @apply absolute inset-0 opacity-10;
  background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0);
  background-size: 20px 20px;
}

/* Responsive */
@media (max-width: 640px) {
  .forgot-password-container {
    @apply mx-4 p-6;
  }
  
  .forgot-password-title {
    @apply text-xl;
  }
  
  .forgot-password-subtitle {
    @apply text-sm;
  }
  
  .forgot-icon {
    @apply w-12 h-12;
  }
}

/* Dark mode adjustments */
.dark .bg-pattern {
  background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0);
}

/* Animation for success state */
.success-state {
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>