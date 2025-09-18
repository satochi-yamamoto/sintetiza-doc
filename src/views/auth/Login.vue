<template>
  <div class="login-page">
    <div class="login-container">
      <!-- Header -->
      <div class="login-header">
        <router-link to="/" class="logo-link">
          <div class="logo">
            <svg class="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
            </svg>
            <span class="logo-text">SintetizaDoc</span>
          </div>
        </router-link>
        
        <h1 class="login-title">Bem-vindo de volta</h1>
        <p class="login-subtitle">
          Entre na sua conta para continuar transformando documentos em resumos inteligentes
        </p>
      </div>
      
      <!-- Social Login -->
      <div class="social-login">
        <button 
          @click="loginWithGoogle" 
          :disabled="isLoading"
          class="social-btn google-btn"
        >
          <svg class="social-icon" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continuar com Google
        </button>
        
        <button 
          @click="loginWithApple" 
          :disabled="isLoading"
          class="social-btn apple-btn"
        >
          <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          Continuar com Apple
        </button>
        
        <button 
          @click="loginWithGitHub" 
          :disabled="isLoading"
          class="social-btn github-btn"
        >
          <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          Continuar com GitHub
        </button>
      </div>
      
      <!-- Divider -->
      <div class="divider">
        <span class="divider-text">ou</span>
      </div>
      
      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="form-input"
            :class="{ 'input-error': errors.email }"
            placeholder="seu@email.com"
            required
            autocomplete="email"
          />
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>
        
        <div class="form-group">
          <label for="password" class="form-label">Senha</label>
          <div class="password-input">
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              class="form-input"
              :class="{ 'input-error': errors.password }"
              placeholder="Sua senha"
              required
              autocomplete="current-password"
            />
            <button
              type="button"
              @click="togglePassword"
              class="password-toggle"
            >
              <svg v-if="showPassword" class="toggle-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
              <svg v-else class="toggle-icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>
        
        <div class="form-options">
          <label class="checkbox-label">
            <input 
              v-model="form.rememberMe" 
              type="checkbox" 
              class="checkbox-input"
            />
            <span class="checkbox-text">Lembrar de mim</span>
          </label>
          
          <router-link to="/forgot-password" class="forgot-link">
            Esqueceu a senha?
          </router-link>
        </div>
        
        <button 
          type="submit" 
          :disabled="isLoading"
          class="login-btn"
        >
          <LoadingSpinner 
            v-if="isLoading" 
            size="sm" 
            variant="white" 
            class="mr-2"
          />
          {{ isLoading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>
      
      <!-- Footer -->
      <div class="login-footer">
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
    <div class="login-background">
      <div class="bg-pattern"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
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
const showPassword = ref(false)

// Form data
const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})

// Errors
const errors = reactive({
  email: '',
  password: ''
})

// Methods
const validateForm = () => {
  errors.email = ''
  errors.password = ''
  
  let isValid = true
  
  if (!form.email) {
    errors.email = 'Email é obrigatório'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Email inválido'
    isValid = false
  }
  
  if (!form.password) {
    errors.password = 'Senha é obrigatória'
    isValid = false
  } else if (form.password.length < 6) {
    errors.password = 'Senha deve ter pelo menos 6 caracteres'
    isValid = false
  }
  
  return isValid
}

const handleLogin = async () => {
  if (!validateForm()) return
  
  try {
    isLoading.value = true
    appStore.setLoading(true)
    
    await authStore.signIn(form.email, form.password)
    
    // Redirecionar para dashboard ou página anterior
    const redirectTo = router.currentRoute.value.query.redirect || '/dashboard'
    router.push(redirectTo)
    
  } catch (error) {
    console.error('Erro no login:', error)
    
    if (error.message.includes('Invalid login credentials')) {
      toast.error('Email ou senha incorretos')
    } else if (error.message.includes('Email not confirmed')) {
      toast.error('Por favor, confirme seu email antes de fazer login')
    } else {
      toast.error('Erro ao fazer login. Tente novamente.')
    }
  } finally {
    isLoading.value = false
    appStore.setLoading(false)
  }
}

const loginWithGoogle = async () => {
  try {
    isLoading.value = true
    appStore.setLoading(true)
    
    await authStore.signInWithProvider('google')
    
    router.push('/dashboard')
    
  } catch (error) {
    console.error('Erro no login com Google:', error)
    toast.error('Erro ao fazer login com Google')
  } finally {
    isLoading.value = false
    appStore.setLoading(false)
  }
}

const loginWithApple = async () => {
  try {
    isLoading.value = true
    appStore.setLoading(true)
    
    await authStore.signInWithProvider('apple')
    
    router.push('/dashboard')
    
  } catch (error) {
    console.error('Erro no login com Apple:', error)
    toast.error('Erro ao fazer login com Apple')
  } finally {
    isLoading.value = false
    appStore.setLoading(false)
  }
}

const loginWithGitHub = async () => {
  try {
    isLoading.value = true
    appStore.setLoading(true)
    
    await authStore.signInWithProvider('github')
    
    router.push('/dashboard')
    
  } catch (error) {
    console.error('Erro no login com GitHub:', error)
    toast.error('Erro ao fazer login com GitHub')
  } finally {
    isLoading.value = false
    appStore.setLoading(false)
  }
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<style scoped>
.login-page {
  @apply min-h-screen flex items-center justify-center relative;
}

.login-container {
  @apply w-full max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl relative z-10;
}

.login-header {
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

.login-title {
  @apply text-2xl font-bold text-gray-900 dark:text-white mb-2;
}

.login-subtitle {
  @apply text-gray-600 dark:text-gray-300 leading-relaxed;
}

.social-login {
  @apply space-y-3 mb-6;
}

.social-btn {
  @apply w-full flex items-center justify-center space-x-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed;
}

.social-icon {
  @apply w-5 h-5 flex-shrink-0;
}

.google-btn:hover {
  @apply border-blue-300;
}

.apple-btn:hover {
  @apply border-gray-400;
}

.github-btn:hover {
  @apply border-gray-400;
}

.divider {
  @apply relative my-6;
}

.divider::before {
  @apply absolute inset-0 flex items-center;
  content: '';
}

.divider::before {
  @apply border-t border-gray-300 dark:border-gray-600;
}

.divider-text {
  @apply relative flex justify-center text-sm;
}

.divider-text span {
  @apply bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400;
}

.login-form {
  @apply space-y-6;
}

.form-group {
  @apply space-y-2;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 dark:text-gray-300;
}

.form-input {
  @apply w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200;
}

.input-error {
  @apply border-red-500 focus:ring-red-500 focus:border-red-500;
}

.error-message {
  @apply text-sm text-red-600 dark:text-red-400;
}

.password-input {
  @apply relative;
}

.password-toggle {
  @apply absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none;
}

.toggle-icon {
  @apply w-5 h-5;
}

.form-options {
  @apply flex items-center justify-between;
}

.checkbox-label {
  @apply flex items-center;
}

.checkbox-input {
  @apply h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded;
}

.checkbox-text {
  @apply ml-2 text-sm text-gray-700 dark:text-gray-300;
}

.forgot-link {
  @apply text-sm text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 font-medium;
}

.login-btn {
  @apply w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200;
}

.login-footer {
  @apply mt-8 text-center space-y-4;
}

.footer-text {
  @apply text-sm text-gray-600 dark:text-gray-400;
}

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

.login-background {
  @apply absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800;
}

.bg-pattern {
  @apply absolute inset-0 opacity-10;
  background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0);
  background-size: 20px 20px;
}

/* Responsive */
@media (max-width: 640px) {
  .login-container {
    @apply mx-4 p-6;
  }
  
  .login-title {
    @apply text-xl;
  }
  
  .login-subtitle {
    @apply text-sm;
  }
}

/* Dark mode adjustments */
.dark .bg-pattern {
  background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0);
}
</style>