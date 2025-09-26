<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Entre na sua conta
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Ou
          <router-link
            to="/sign-up"
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            crie uma nova conta
          </router-link>
        </p>
      </div>

      <div class="mt-8 bg-white p-6 rounded-lg shadow border border-gray-200">
        <form
          class="space-y-6"
          @submit.prevent="onSubmit"
        >
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700"
            >E-mail</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              autocomplete="email"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="voce@exemplo.com"
            >
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >Senha</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              autocomplete="current-password"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="••••••••"
            >
          </div>

          <div class="flex items-center justify-between">
            <div class="text-sm">
              <router-link
                to="/sign-up"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Não tem conta? Cadastre-se
              </router-link>
            </div>
            <button
              type="submit"
              :disabled="loading"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <svg
                v-if="loading"
                class="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Entrar
            </button>
          </div>
        </form>

        <p
          v-if="error"
          class="mt-4 text-sm text-red-600"
        >
          {{ error }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import supabase from '@/services/supabase'

const router = useRouter()
const toast = useToast()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const onSubmit = async () => {
  error.value = ''
  loading.value = true
  try {
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })
    if (signInError) throw new Error(signInError.message || 'Erro no login')

    // Se tudo ok, redireciona para dashboard
    toast.success('Login realizado com sucesso!')
    await router.push('/dashboard')
  } catch (err) {
    console.debug('Erro no login:', {
      message: err?.message,
      stack: err?.stack,
      name: err?.name,
      code: err?.code
    })
    error.value = err?.message || 'Falha ao entrar. Verifique suas credenciais.'
  } finally {
    loading.value = false
  }
}
</script>