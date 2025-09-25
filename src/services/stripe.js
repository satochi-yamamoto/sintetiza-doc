import { loadStripe } from '@stripe/stripe-js'
import { supabaseData } from './supabase.js'

// Inicializar Stripe com chave apropriada para o ambiente e protocolo
const env = import.meta.env
const isHttps = typeof window !== 'undefined' && window.location?.protocol === 'https:'
const isLocalhost = typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location?.hostname)
// Suporte a variáveis separadas de live/test, com fallback para VITE_STRIPE_PUBLISHABLE_KEY
const liveKey = env.VITE_STRIPE_PUBLISHABLE_KEY_LIVE || env.VITE_STRIPE_PUBLISHABLE_KEY || ''
const testKey = env.VITE_STRIPE_PUBLISHABLE_KEY_TEST || env.VITE_STRIPE_TEST_KEY || ''
let publishableKey = env.MODE === 'production' ? liveKey : (testKey || liveKey)

// Evita usar chave live em contexto não-HTTPS fora do localhost
if (!isHttps && !isLocalhost && publishableKey?.startsWith('pk_live_')) {
  console.warn('[stripe] Chave live detectada fora de HTTPS. Desabilitando Stripe ou usando chave de teste, se disponível.')
  publishableKey = testKey || ''
}

const stripePromise = publishableKey ? loadStripe(publishableKey) : Promise.resolve(null)

// Configuração dos planos
export const SUBSCRIPTION_PLANS = {
  free: {
    id: 'free',
    name: 'Gratuito',
    price: 0,
    currency: 'BRL',
    interval: 'month',
    features: [
      '5 resumos por mês',
      'Formatos básicos (PDF, TXT)',
      'Resumo padrão',
      'Suporte por email'
    ],
    limits: {
      summariesPerMonth: 5,
      maxFileSize: 5 * 1024 * 1024, // 5MB
      supportedFormats: ['pdf', 'txt'],
      aiProviders: ['openai'],
      exportFormats: ['txt', 'pdf']
    }
  },
  
  basic: {
    id: 'basic',
    name: 'Básico',
    price: 29.90,
    currency: 'BRL',
    interval: 'month',
    stripeProductId: 'prod_basic', // Configurar no Stripe
    stripePriceId: 'price_basic',   // Configurar no Stripe
    features: [
      'Até 50 documentos por mês',
      'Todos os formatos (PDF, DOCX, TXT)',
      'Múltiplos estilos de resumo',
      'Tradução português/inglês',
      'Exportação Word e Excel',
      'Suporte prioritário'
    ],
    limits: {
      summariesPerMonth: 50,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      supportedFormats: ['pdf', 'docx', 'txt'],
      aiProviders: ['openai', 'anthropic'],
      exportFormats: ['txt', 'pdf', 'docx', 'xlsx']
    }
  },
  
  professional: {
    id: 'professional',
    name: 'Profissional',
    price: 79.90,
    currency: 'BRL',
    interval: 'month',
    stripeProductId: 'prod_professional',
    stripePriceId: 'price_professional',
    features: [
      'Documentos ilimitados',
      'Processamento de áudio',
      'Integrações completas (Drive, OneDrive)',
      'Todos os formatos de exportação',
      'API de integração',
      'Prioridade no processamento',
      'Suporte premium'
    ],
    limits: {
      summariesPerMonth: -1, // Ilimitado
      maxFileSize: 50 * 1024 * 1024, // 50MB
      supportedFormats: ['pdf', 'docx', 'txt', 'mp3', 'wav'],
      aiProviders: ['openai', 'anthropic'],
      exportFormats: ['txt', 'pdf', 'docx', 'xlsx', 'notion', 'trello', 'email'],
      hasApiAccess: true,
      hasCloudIntegrations: true
    }
  },
  
  enterprise: {
    id: 'enterprise',
    name: 'Empresarial',
    price: null, // Sob consulta
    currency: 'BRL',
    interval: 'month',
    features: [
      'Tudo do plano Profissional',
      'API dedicada',
      'Suporte 24/7',
      'Personalizações corporativas',
      'SLA garantido',
      'Treinamento da equipe',
      'Integração customizada'
    ],
    limits: {
      summariesPerMonth: -1,
      maxFileSize: 100 * 1024 * 1024, // 100MB
      supportedFormats: ['pdf', 'docx', 'txt', 'mp3', 'wav', 'mp4'],
      aiProviders: ['openai', 'anthropic', 'custom'],
      exportFormats: 'all',
      hasApiAccess: true,
      hasCloudIntegrations: true,
      hasDedicatedSupport: true,
      hasCustomIntegrations: true
    }
  }
}

// Serviço do Stripe
export const stripeService = {
  // Obter instância do Stripe
  async getStripe() {
    return await stripePromise
  },
  
  // Criar sessão de checkout
  async createCheckoutSession(priceId, userId, successUrl, cancelUrl) {
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          userId,
          successUrl,
          cancelUrl
        })
      })
      
      if (!response.ok) {
        throw new Error('Erro ao criar sessão de checkout')
      }
      
      const { sessionId } = await response.json()
      return sessionId
    } catch (error) {
      console.error('Erro ao criar sessão de checkout:', error)
      throw error
    }
  },
  
  // Redirecionar para checkout
  async redirectToCheckout(planId, userId) {
    try {
      const plan = SUBSCRIPTION_PLANS[planId]
      if (!plan || !plan.stripePriceId) {
        throw new Error('Plano inválido ou não configurado')
      }
      
      const successUrl = `${window.location.origin}/dashboard/billing?status=success`
      const cancelUrl = `${window.location.origin}/dashboard/billing?status=cancel`
      
      const sessionId = await this.createCheckoutSession(
        plan.stripePriceId,
        userId,
        successUrl,
        cancelUrl
      )
      
      const stripe = await this.getStripe()
      if (!stripe) {
        throw new Error('Stripe indisponível neste ambiente (requer HTTPS para chaves live).')
      }
      
      const { error } = await stripe.redirectToCheckout({ sessionId })
      
      if (error) {
        throw new Error(error.message)
      }
    } catch (error) {
      console.error('Erro no redirecionamento:', error)
      throw error
    }
  },
  
  // Criar portal do cliente
  async createCustomerPortal(userId) {
    try {
      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          returnUrl: `${window.location.origin}/dashboard/billing`
        })
      })
      
      if (!response.ok) {
        throw new Error('Erro ao criar portal do cliente')
      }
      
      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Erro ao abrir portal:', error)
      throw error
    }
  },
  
  // Obter informações da assinatura
  async getSubscriptionInfo(userId) {
    try {
      console.log('🔍 getSubscriptionInfo - Buscando subscription para userId:', userId)
      const subscription = await supabaseData.selectOne(
        'subscriptions',
        '*',
        { user_id: userId }
      )

      console.log('📊 getSubscriptionInfo - Dados retornados:', subscription)
      return subscription
    } catch (error) {
      console.error('❌ getSubscriptionInfo - Erro ao obter informações da assinatura:', error)
      return null
    }
  },
  
  // Verificar limites do plano
  async checkPlanLimits(userId, action) {
    try {
      const subscription = await this.getSubscriptionInfo(userId)
      const planId = subscription?.plan_id || 'free'
      const plan = SUBSCRIPTION_PLANS[planId]
      
      if (!plan) {
        return { allowed: false, reason: 'Plano não encontrado' }
      }
      
      // Verificar limite de resumos por mês
      if (action === 'create_summary') {
        if (plan.limits.summariesPerMonth === -1) {
          return { allowed: true, plan }
        }
        
        // Buscar uso atual do mês
        const startOfMonth = new Date()
        startOfMonth.setDate(1)
        startOfMonth.setHours(0, 0, 0, 0)
        
        const { data: usage } = await supabaseData.select(
          'summaries',
          {
            select: 'id',
            eq: { user_id: userId },
            gte: { created_at: startOfMonth.toISOString() }
          }
        )
        
        const currentUsage = usage?.length || 0
        
        if (currentUsage >= plan.limits.summariesPerMonth) {
          return {
            allowed: false,
            reason: `Limite de ${plan.limits.summariesPerMonth} resumos por mês atingido`,
            currentUsage,
            limit: plan.limits.summariesPerMonth
          }
        }
      }
      
      return { allowed: true, plan }
    } catch (error) {
      console.error('Erro ao verificar limites do plano:', error)
      return { allowed: false, reason: 'Erro interno' }
    }
  }
}

export default stripeService