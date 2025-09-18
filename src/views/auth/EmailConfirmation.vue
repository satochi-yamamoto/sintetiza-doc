<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
      <!-- Logo -->
      <div class="text-center mb-8">
        <router-link to="/" class="inline-flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <span class="text-xl font-bold text-gray-900">SintetizaDoc</span>
        </router-link>
      </div>

      <!-- Conteúdo principal -->
      <div class="text-center">
        <!-- Ícone de email -->
        <div class="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
          <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
        </div>

        <h1 class="text-2xl font-bold text-gray-900 mb-4">
          Confirme seu email
        </h1>
        
        <p class="text-gray-600 mb-6">
          Enviamos um link de confirmação para o seu email. 
          Clique no link para ativar sua conta e começar a usar o SintetizaDoc.
        </p>

        <!-- Status da verificação -->
        <div v-if="verificationStatus === 'pending'" class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            <span class="text-yellow-800 text-sm font-medium">
              Aguardando confirmação do email
            </span>
          </div>
        </div>

        <div v-if="verificationStatus === 'success'" class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span class="text-green-800 text-sm font-medium">
              Email confirmado com sucesso!
            </span>
          </div>
        </div>

        <div v-if="verificationStatus === 'error'" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
            <span class="text-red-800 text-sm font-medium">
              Erro na confirmação do email
            </span>
          </div>
          <p class="text-red-700 text-sm mt-2">{{ errorMessage }}</p>
        </div>

        <!-- Ações -->
        <div class="space-y-4">
          <button 
            v-if="verificationStatus === 'success'"
            @click="goToDashboard"
            class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
          >
            Ir para o Dashboard
          </button>

          <button 
            v-if="verificationStatus === 'pending' || verificationStatus === 'error'"
            @click="resendEmail"
            :disabled="isResending"
            class="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isResending">Reenviando...</span>
            <span v-else>Reenviar email de confirmação</span>
          </button>

          <div class="text-center">
            <router-link 
              to="/login" 
              class="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Voltar para o login
            </router-link>
          </div>
        </div>
      </div>

      <!-- Informações adicionais -->
      <div class="mt-8 pt-6 border-t border-gray-200">
        <div class="text-center text-sm text-gray-500">
          <p class="mb-2">Não recebeu o email?</p>
          <ul class="space-y-1 text-xs">
            <li>• Verifique sua caixa de spam</li>
            <li>• Aguarde alguns minutos</li>
            <li>• Certifique-se de que o email está correto</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'EmailConfirmation',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const authStore = useAuthStore()
    
    const verificationStatus = ref('pending') // 'pending', 'success', 'error'
    const errorMessage = ref('')
    const isResending = ref(false)

    const checkVerificationStatus = async () => {
      try {
        // Verificar se o usuário está autenticado
        if (authStore.isAuthenticated) {
          verificationStatus.value = 'success'
          
          // Redirecionar para o dashboard após 2 segundos
          setTimeout(() => {
            router.push('/dashboard')
          }, 2000)
        } else {
          // Usuário ainda não está autenticado
          verificationStatus.value = 'pending'
        }
      } catch (error) {
        console.error('Erro ao verificar status:', error)
        verificationStatus.value = 'error'
        errorMessage.value = 'Erro ao verificar o status da confirmação'
      }
    }

    const resendEmail = async () => {
      try {
        isResending.value = true
        
        // Aqui você implementaria a lógica para reenviar o email
        // usando o Clerk ou seu serviço de email
        console.log('Reenviando email de confirmação...')
        
        // Simula o reenvio
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        alert('Email de confirmação reenviado! Verifique sua caixa de entrada.')
      } catch (error) {
        console.error('Erro ao reenviar email:', error)
        alert('Erro ao reenviar email. Tente novamente.')
      } finally {
        isResending.value = false
      }
    }

    const goToDashboard = () => {
      router.push('/dashboard')
    }

    onMounted(() => {
      checkVerificationStatus()
      
      // Verifica o status periodicamente
      const interval = setInterval(checkVerificationStatus, 5000)
      
      // Limpa o interval quando o componente for desmontado
      return () => clearInterval(interval)
    })

    return {
      verificationStatus,
      errorMessage,
      isResending,
      resendEmail,
      goToDashboard
    }
  }
}
</script>