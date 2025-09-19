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
        <SignUp
          :appearance="{
            elements: {
              formButtonPrimary: `bg-indigo-600 hover:bg-indigo-700 text-sm normal-case ${!privacyConsentGiven ? 'opacity-50 cursor-not-allowed' : ''}`,
              card: 'shadow-lg',
              headerTitle: 'text-2xl font-bold text-gray-900',
              headerSubtitle: 'text-gray-600',
              socialButtonsBlockButton: 'border border-gray-300 hover:bg-gray-50',
              formFieldInput: 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
              footerActionLink: 'text-indigo-600 hover:text-indigo-500'
            }
          }"
          :routing="'path'"
          :path="'/sign-up'"
          :sign-in-url="'/sign-in'"
          :initial-values="{
            email_address: '',
            password: ''
          }"
          v-if="privacyConsentGiven"
        />
        <div v-else class="bg-yellow-50 border border-yellow-200 rounded-md p-4">
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
import { SignUp } from '@clerk/vue'
import LGPDConsent from '@/components/LGPDConsent.vue'

export default {
  name: 'SignUpPage',
  components: {
    SignUp,
    LGPDConsent
  },
  setup() {
    const privacyConsentGiven = ref(false)
    const marketingConsentGiven = ref(false)

    const handlePrivacyConsent = (value) => {
      privacyConsentGiven.value = value
    }

    const handleMarketingConsent = (value) => {
      marketingConsentGiven.value = value
    }

    return {
      privacyConsentGiven,
      marketingConsentGiven,
      handlePrivacyConsent,
      handleMarketingConsent
    }
  }
}
</script>