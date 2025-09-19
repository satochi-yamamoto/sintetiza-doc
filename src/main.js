import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { clerkPlugin } from '@clerk/vue'

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
    },
    status: {
      title: 'Status do Sistema',
      api: 'API',
      auth: 'Autenticação',
      aiServices: 'Serviços de IA',
      database: 'Banco de Dados',
      storage: 'Armazenamento',
      payments: 'Pagamentos',
      metrics: 'Métricas do Sistema',
      uptime: 'Disponibilidade',
      avgResponse: 'Tempo Médio',
      documentsProcessed: 'Documentos Processados',
      activeUsers: 'Usuários Ativos',
      recentIncidents: 'Incidentes Recentes',
      duration: 'Duração',
      lastUpdated: 'Última atualização',
      refresh: 'Atualizar',
      refreshing: 'Atualizando',
      operational: 'Operacional',
      degraded: 'Degradado',
      partialOutage: 'Interrupção Parcial',
      majorOutage: 'Interrupção Maior',
      unknown: 'Desconhecido',
      responseTime: 'Tempo de Resposta',
      provider: 'Provedor',
      primary: 'Principal',
      fallback: 'Backup'
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
    },
    status: {
      title: 'System Status',
      api: 'API',
      auth: 'Authentication',
      aiServices: 'AI Services',
      database: 'Database',
      storage: 'Storage',
      payments: 'Payments',
      metrics: 'System Metrics',
      uptime: 'Uptime',
      avgResponse: 'Avg Response',
      documentsProcessed: 'Documents Processed',
      activeUsers: 'Active Users',
      recentIncidents: 'Recent Incidents',
      duration: 'Duration',
      lastUpdated: 'Last updated',
      refresh: 'Refresh',
      refreshing: 'Refreshing',
      operational: 'Operational',
      degraded: 'Degraded',
      partialOutage: 'Partial Outage',
      majorOutage: 'Major Outage',
      unknown: 'Unknown',
      responseTime: 'Response Time',
      provider: 'Provider',
      primary: 'Primary',
      fallback: 'Fallback'
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

// Verificar se a chave do Clerk está configurada
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key')
}

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(Toast, toastOptions)
app.use(clerkPlugin, {
  publishableKey: PUBLISHABLE_KEY,
  afterSignOutUrl: '/',
  signInUrl: '/sign-in',
  signUpUrl: '/sign-up',
  afterSignInUrl: '/dashboard',
  afterSignUpUrl: '/dashboard',
  appearance: {
    variables: {
      colorPrimary: '#4f46e5',
      colorBackground: '#ffffff',
      colorInputBackground: '#ffffff',
      colorInputText: '#1f2937'
    }
  },
  localization: {
    locale: 'pt-BR'
  }
})

app.mount('#app')