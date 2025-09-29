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

const clampSampleRate = (rawValue, fallback) => {
  if (rawValue === undefined || rawValue === null || rawValue === '') {
    return fallback
  }
  const value = typeof rawValue === 'number' ? rawValue : Number(rawValue)
  if (!Number.isFinite(value)) {
    return fallback
  }
  return Math.max(0, Math.min(1, value))
}

const readSampleRate = (envKey, fallback) => {
  const envValue = import.meta.env ? import.meta.env[envKey] : undefined
  return clampSampleRate(envValue, fallback)
}

const shouldSkipSentryCapture = (meta = {}) => {
  const text = [
    meta.message,
    meta.filename,
    meta.targetSrc,
    meta.url
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  if (!text) {
    return false
  }

  const mentionsSentry = text.includes('sentry.io') || text.includes('/envelope') || text.includes('ingest.')
  const mentionsRateLimit = text.includes('429') || text.includes('rate limit')
  const mentionsFailedResource = text.includes('failed to load resource')
  return mentionsRateLimit && (mentionsSentry || mentionsFailedResource)
}
const i18n = createI18n({
  locale: 'pt-BR',
  fallbackLocale: 'en',
  messages
})

// ConfiguraÃ§Ã£o do Toast
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

const sentryDsn = import.meta.env.VITE_SENTRY_DSN

const tracesSampleRate = readSampleRate('VITE_SENTRY_TRACES_SAMPLE_RATE', import.meta.env.DEV ? 0.05 : 0.1)
const replaysSessionSampleRate = readSampleRate('VITE_SENTRY_REPLAYS_SESSION_SAMPLE_RATE', import.meta.env.DEV ? 0.02 : 0.01)
const replaysOnErrorSampleRate = readSampleRate('VITE_SENTRY_REPLAYS_ERROR_SAMPLE_RATE', 0.2)

const tracePropagationTargets = ['localhost', /^http:\/\/localhost:3012/]
if (import.meta.env.VITE_API_BASE_URL) {
  tracePropagationTargets.push(import.meta.env.VITE_API_BASE_URL)
}

if (sentryDsn) {
  const integrations = [
    Sentry.browserTracingIntegration({ router }),
    Sentry.captureConsoleIntegration({ levels: ['error'] })
  ]

  if (replaysSessionSampleRate > 0 || replaysOnErrorSampleRate > 0) {
    integrations.splice(1, 0, Sentry.replayIntegration({
      sessionSampleRate: replaysSessionSampleRate,
      errorSampleRate: replaysOnErrorSampleRate
    }))
  }

  Sentry.init({
    app,
    dsn: sentryDsn,
    sendDefaultPii: true,
    integrations,
    tracesSampleRate,
    tracePropagationTargets,
    replaysSessionSampleRate,
    replaysOnErrorSampleRate,
    environment: import.meta.env.MODE,
    beforeSend(event, hint) {
      try {
        const message = event?.message || event?.exception?.values?.[0]?.value || hint?.originalException?.message
        if (shouldSkipSentryCapture({
          message,
          filename: hint?.originalException?.filename,
          targetSrc: hint?.originalException?.target?.src || hint?.originalException?.target?.currentSrc
        })) {
          return null
        }

        const msg = event?.exception?.values?.[0]?.value || hint?.originalException?.message || ''
        if (typeof msg === 'string' && msg.includes('Sentry dev test error')) {
          // Ignora eventos de teste explicitamente marcados
          return null
        }

        // Garante que o erro estǭ devidamente formatado
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
} else if (import.meta.env.DEV) {
  console.info('[sentry] DSN não configurado; telemetria local desativada.')
}
// Gatilho temporÃ¡rio de erro para validar Sentry em desenvolvimento
const DEV_TEST_ENABLED = import.meta.env.VITE_SENTRY_DEV_TEST === 'true'
if (import.meta.env.DEV && DEV_TEST_ENABLED && import.meta.env.VITE_SENTRY_DSN) {
  const FLAG_KEY = '__SENTRY_DEV_TRIGGERED__'
  if (!window[FLAG_KEY]) {
    window[FLAG_KEY] = true
    // Aguarda a aplicaÃ§Ã£o estabilizar antes de disparar
    setTimeout(() => {
      const explicitErr = new Error('Sentry dev test error: explicit capture (safe to ignore)')
      Sentry.captureException(prepareSentryError(explicitErr))
      // NÃ£o lanÃ§ar exceÃ§Ãµes nÃ£o tratadas; mantemos apenas captura explÃ­cita
    }, 1500)
  }
}

// Handler global de erros nÃ£o capturados
window.addEventListener('error', (event) => {
  const error = event.error || event.message
  const messageText = typeof error === 'string' ? error : error?.message || event.message
  const targetSrc = event?.target?.currentSrc || event?.target?.src || ''
  const meta = {
    message: messageText,
    filename: event.filename,
    targetSrc
  }

  safeConsoleError('Erro global capturado:', error, {
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno
  })
  
  if (
    sentryDsn &&
    !String(event.message || '').includes('Sentry dev test error') &&
    !shouldSkipSentryCapture(meta)
  ) {
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
  const messageText = typeof error === 'string' ? error : error?.message
  safeConsoleError('Promise rejeitada capturada:', error)
  
  if (
    sentryDsn &&
    !String(error).includes('Sentry dev test error') &&
    !shouldSkipSentryCapture({ message: messageText })
  ) {
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




