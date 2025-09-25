<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Crie sua conta
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Ou
          <router-link to="/sign-in" class="font-medium text-indigo-600 hover:text-indigo-500">
            entre na sua conta existente
          </router-link>
        </p>
      </div>

      <!-- LGPD Consent Component -->
      <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <LGPDConsent
          @update:privacy-consent="handlePrivacyConsent"
          @update:marketing-consent="handleMarketingConsent"
        />
      </div>

      <div class="mt-8">
        <form class="space-y-6 bg-white p-6 rounded-lg shadow" @submit.prevent="onSubmit">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input id="email" type="email" v-model="email" required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
            <input id="password" type="password" v-model="password" minlength="6" required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
          </div>

          <div>
            <label for="confirm" class="block text-sm font-medium text-gray-700">Confirmar Senha</label>
            <input id="confirm" type="password" v-model="confirm" minlength="6" required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
          </div>

          <div v-if="error" class="rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200">{{ error }}</div>
          <div v-if="info" class="rounded-md bg-blue-50 p-3 text-sm text-blue-700 border border-blue-200">{{ info }}</div>

          <button type="submit"
                  :disabled="!privacyConsentGiven || loading"
                  :class="[
                    'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white',
                    privacyConsentGiven ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-400 cursor-not-allowed',
                    loading ? 'opacity-70' : ''
                  ]">
            <span v-if="!loading">Criar conta</span>
            <span v-else>Processando...</span>
          </button>
        </form>

        <div v-if="!privacyConsentGiven" class="bg-yellow-50 border border-yellow-200 rounded-md p-4 mt-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-yellow-700">
                Para continuar com o cadastro, você deve aceitar nossa Política de Privacidade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import supabase from '@/services/supabase'
import LGPDConsent from '@/components/LGPDConsent.vue'

export default {
  name: 'SignUpPage',
  components: {
    LGPDConsent
  },
  setup() {
    const router = useRouter()
    const toast = useToast()

    const email = ref('')
    const password = ref('')
    const confirm = ref('')
    const loading = ref(false)
    const error = ref('')
    const info = ref('')

    const privacyConsentGiven = ref(false)
    const marketingConsentGiven = ref(false)

    const handlePrivacyConsent = (value) => {
      privacyConsentGiven.value = value
    }

    const handleMarketingConsent = (value) => {
      marketingConsentGiven.value = value
    }

    const onSubmit = async () => {
      error.value = ''
      info.value = ''

      if (!privacyConsentGiven.value) return
      if (password.value !== confirm.value) {
        error.value = 'As senhas não coincidem'
        return
      }
      if (password.value.length < 6) {
        error.value = 'A senha deve ter pelo menos 6 caracteres'
        return
      }

      loading.value = true
      try {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.value,
          password: password.value,
          options: {
            data: {
              marketing_consent: marketingConsentGiven.value === true,
              privacy_consent_at: new Date().toISOString()
            }
          }
        })
        if (signUpError) throw signUpError

        if (!data?.session) {
          info.value = 'Cadastro realizado! Verifique seu e-mail para confirmar a conta.'
        } else {
          toast.success('Conta criada com sucesso!')
          await router.push('/dashboard')
        }
      } catch (err) {
        console.debug('Erro no cadastro:', err)
        error.value = err?.message || 'Falha ao criar conta.'
      } finally {
        loading.value = false
      }
    }

    return {
      email,
      password,
      confirm,
      loading,
      error,
      info,
      privacyConsentGiven,
      marketingConsentGiven,
      handlePrivacyConsent,
      handleMarketingConsent,
      onSubmit
    }
  }
}
</script>