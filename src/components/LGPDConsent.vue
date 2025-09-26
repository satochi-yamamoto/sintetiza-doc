<template>
  <div class="lgpd-consent">
    <div class="mb-4">
      <label class="flex items-start space-x-2 text-sm">
        <input
          v-model="privacyConsent"
          type="checkbox"
          class="mt-1 w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
          required
          @change="updatePrivacyConsent($event.target.checked)"
        >
        <span class="text-gray-700">
          <span v-if="locale === 'pt-BR'">
            Eu concordo com a
            <button
              type="button"
              class="text-indigo-600 hover:text-indigo-500 underline font-medium"
              @click="openPrivacyPolicy"
            >
              Política de Privacidade
            </button>
            e autorizo o processamento de meus dados pessoais conforme descrito.
          </span>
          <span v-else>
            I agree to the
            <button
              type="button"
              class="text-indigo-600 hover:text-indigo-500 underline font-medium"
              @click="openPrivacyPolicy"
            >
              Privacy Policy
            </button>
            and authorize the processing of my personal data as described.
          </span>
        </span>
      </label>
    </div>

    <div class="mb-4">
      <label class="flex items-start space-x-2 text-sm">
        <input
          v-model="marketingConsent"
          type="checkbox"
          class="mt-1 w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
          @change="updateMarketingConsent($event.target.checked)"
        >
        <span class="text-gray-700">
          <span v-if="locale === 'pt-BR'">
            Desejo receber comunicações de marketing e ofertas especiais (opcional).
          </span>
          <span v-else>
            I want to receive marketing communications and special offers (optional).
          </span>
        </span>
      </label>
    </div>

    <!-- Privacy Policy Modal -->
    <div
      v-if="showPrivacyModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      @click="closePrivacyPolicy"
    >
      <div
        class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white"
        @click.stop
      >
        <div class="mt-3">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">
              {{ locale === 'pt-BR' ? 'Política de Privacidade' : 'Privacy Policy' }}
            </h3>
            <button
              class="text-gray-400 hover:text-gray-600"
              @click="closePrivacyPolicy"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="max-h-96 overflow-y-auto text-sm text-gray-700">
            <div v-if="locale === 'pt-BR'">
              <h4 class="font-semibold mb-2">
                1. Coleta de Dados
              </h4>
              <p class="mb-4">
                Coletamos dados pessoais necessários para fornecer nossos serviços de resumo de documentos,
                incluindo nome, email e documentos enviados.
              </p>

              <h4 class="font-semibold mb-2">
                2. Uso dos Dados
              </h4>
              <p class="mb-4">
                Utilizamos seus dados para processar documentos, gerar resumos usando IA,
                gerenciar sua conta e melhorar nossos serviços.
              </p>

              <h4 class="font-semibold mb-2">
                3. Compartilhamento
              </h4>
              <p class="mb-4">
                Não vendemos ou alugamos seus dados pessoais. Podemos compartilhar dados
                com prestadores de serviços terceirizados necessários para nossa operação.
              </p>

              <h4 class="font-semibold mb-2">
                4. Seus Direitos (LGPD)
              </h4>
              <p class="mb-4">
                Você tem direito a acessar, corrigir, excluir, portar seus dados e revogar
                consentimentos. Entre em contato conosco através do email privacy@sintetizadoc.com.
              </p>

              <h4 class="font-semibold mb-2">
                5. Segurança
              </h4>
              <p class="mb-4">
                Implementamos medidas técnicas e organizacionais para proteger seus dados
                contra acesso não autorizado, alteração ou destruição.
              </p>
            </div>
            <div v-else>
              <h4 class="font-semibold mb-2">
                1. Data Collection
              </h4>
              <p class="mb-4">
                We collect personal data necessary to provide our document summarization services,
                including name, email, and uploaded documents.
              </p>

              <h4 class="font-semibold mb-2">
                2. Data Usage
              </h4>
              <p class="mb-4">
                We use your data to process documents, generate AI summaries,
                manage your account, and improve our services.
              </p>

              <h4 class="font-semibold mb-2">
                3. Data Sharing
              </h4>
              <p class="mb-4">
                We do not sell or rent your personal data. We may share data
                with third-party service providers necessary for our operations.
              </p>

              <h4 class="font-semibold mb-2">
                4. Your Rights (LGPD/GDPR)
              </h4>
              <p class="mb-4">
                You have the right to access, correct, delete, port your data, and revoke
                consents. Contact us at privacy@sintetizadoc.com.
              </p>

              <h4 class="font-semibold mb-2">
                5. Security
              </h4>
              <p class="mb-4">
                We implement technical and organizational measures to protect your data
                against unauthorized access, alteration, or destruction.
              </p>
            </div>
          </div>
          <div class="flex justify-end mt-4">
            <button
              class="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              @click="closePrivacyPolicy"
            >
              {{ locale === 'pt-BR' ? 'Fechar' : 'Close' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, inject } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'LGPDConsent',
  emits: ['update:privacy-consent', 'update:marketing-consent'],
  setup(props, { emit }) {
    const { locale } = useI18n()
    const privacyConsent = ref(false)
    const marketingConsent = ref(false)
    const showPrivacyModal = ref(false)

    const openPrivacyPolicy = () => {
      showPrivacyModal.value = true
    }

    const closePrivacyPolicy = () => {
      showPrivacyModal.value = false
    }

    // Watch for changes and emit to parent
    const updatePrivacyConsent = (value) => {
      privacyConsent.value = value
      emit('update:privacy-consent', value)
    }

    const updateMarketingConsent = (value) => {
      marketingConsent.value = value
      emit('update:marketing-consent', value)
    }

    return {
      locale,
      privacyConsent,
      marketingConsent,
      showPrivacyModal,
      openPrivacyPolicy,
      closePrivacyPolicy,
      updatePrivacyConsent,
      updateMarketingConsent
    }
  }
}
</script>

<style scoped>
.lgpd-consent {
  margin-bottom: 1rem;
}
</style>