import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'
import router from './router'
import './style.css'

// Configuração do i18n
const messages = {
  'pt-BR': {
    nav: {
      home: 'Início',
      features: 'Funcionalidades',
      pricing: 'Preços',
      contact: 'Contato',
      login: 'Entrar',
      signup: 'Cadastrar',
      dashboard: 'Dashboard'
    },
    common: {
      loading: 'Carregando...',
      error: 'Erro',
      success: 'Sucesso',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      save: 'Salvar',
      delete: 'Excluir',
      edit: 'Editar',
      upload: 'Upload',
      download: 'Download',
      export: 'Exportar'
    },
    home: {
      title: 'Resumos Inteligentes com IA',
      subtitle: 'Transforme documentos e reuniões em resumos objetivos e estruturados',
      cta: 'Começar Gratuitamente'
    },
    dashboard: {
      title: 'Dashboard',
      uploadDocument: 'Enviar Documento',
      recentSummaries: 'Resumos Recentes',
      usage: 'Uso do Plano'
    }
  },
  'en': {
    nav: {
      home: 'Home',
      features: 'Features',
      pricing: 'Pricing',
      contact: 'Contact',
      login: 'Login',
      signup: 'Sign Up',
      dashboard: 'Dashboard'
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      upload: 'Upload',
      download: 'Download',
      export: 'Export'
    },
    home: {
      title: 'Intelligent AI Summaries',
      subtitle: 'Transform documents and meetings into objective and structured summaries',
      cta: 'Start Free'
    },
    dashboard: {
      title: 'Dashboard',
      uploadDocument: 'Upload Document',
      recentSummaries: 'Recent Summaries',
      usage: 'Plan Usage'
    }
  }
}

const i18n = createI18n({
  locale: 'pt-BR',
  fallbackLocale: 'en',
  messages
})

// Configuração do Toast
const toastOptions = {
  position: 'top-right',
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(Toast, toastOptions)

app.mount('#app')