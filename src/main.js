import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'
import router from './router'
import './style.css'
import * as Sentry from '@sentry/vue'
import { createSentryPiniaPlugin } from '@sentry/vue'
import { prepareSentryError, safeConsoleError } from '@/utils/errorHandler'

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

// Inicialização do Sentry (mantém logs ativos; captura apenas error/warn no console)
Sentry.init({
  app,
  dsn: import.meta.env.VITE_SENTRY_DSN,
  sendDefaultPii: true,
  integrations: [
    Sentry.browserTracingIntegration({ router }),
    Sentry.replayIntegration(),
    // Captura logs de console para Sentry sem enviar debug/info
    // Mantém console local inalterado
    Sentry.captureConsoleIntegration({ levels: ['error', 'warn'] })
  ],
  // Performance
  tracesSampleRate: import.meta.env.DEV ? 1.0 : 0.2,
  tracePropagationTargets: ['localhost', /^http:\/\/localhost:3012/, import.meta.env.VITE_API_BASE_URL].filter(Boolean),
  // Session Replay
  replaysSessionSampleRate: import.meta.env.DEV ? 1.0 : 0.1,
  replaysOnErrorSampleRate: 1.0,
  environment: import.meta.env.MODE,
  beforeSend(event, hint) {
    try {
      const msg = event?.exception?.values?.[0]?.value || hint?.originalException?.message || ''
      if (typeof msg === 'string' && msg.includes('Sentry dev test error')) {
        // Ignora eventos de teste explicitamente marcados
        return null
      }
      
      // Garante que o erro está devidamente formatado
      if (hint?.originalException) {
        const safeError = prepareSentryError(hint.originalException)
        if (event.exception?.values?.[0]) {
          event.exception.values[0].value = safeError.message
        }
      }
    } catch (error) {
      safeConsoleError('Erro no beforeSend do Sentry:', error)
    }
    return event
  }
})

// Gatilho temporário de erro para validar Sentry em desenvolvimento
const DEV_TEST_ENABLED = import.meta.env.VITE_SENTRY_DEV_TEST === 'true'
if (import.meta.env.DEV && DEV_TEST_ENABLED && import.meta.env.VITE_SENTRY_DSN) {
  const FLAG_KEY = '__SENTRY_DEV_TRIGGERED__'
  if (!window[FLAG_KEY]) {
    window[FLAG_KEY] = true
    // Aguarda a aplicação estabilizar antes de disparar
    setTimeout(() => {
      const explicitErr = new Error('Sentry dev test error: explicit capture (safe to ignore)')
      Sentry.captureException(prepareSentryError(explicitErr))
      // Não lançar exceções não tratadas; mantemos apenas captura explícita
    }, 1500)
  }
}

// Handler global de erros não capturados
window.addEventListener('error', (event) => {
  const error = event.error || event.message
  safeConsoleError('Erro global capturado:', error, {
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno
  })
  
  // Envia para o Sentry apenas se não for um erro de teste
  if (!event.message?.includes('Sentry dev test error')) {
    Sentry.captureException(prepareSentryError(error, {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    }))
  }
})

// Handler global de promises rejeitadas
window.addEventListener('unhandledrejection', (event) => {
  const error = event.reason
  safeConsoleError('Promise rejeitada capturada:', error)
  
  // Envia para o Sentry apenas se não for um erro de teste
  if (!String(error).includes('Sentry dev test error')) {
    Sentry.captureException(prepareSentryError(error, {
      type: 'unhandledrejection'
    }))
  }
})

// Pinia com plugin do Sentry
const pinia = createPinia()
pinia.use(createSentryPiniaPlugin())

app.use(pinia)
app.use(router)
app.use(i18n)
app.use(Toast, toastOptions)

app.mount('#app')