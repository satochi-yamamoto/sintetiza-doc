import { loadStripe } from '@stripe/stripe-js'
import { supabaseData } from './supabase.js'

// Inicializar Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

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
      console.error('Erro ao criar checkout:', error)
      throw error
    }
  },
  
  // Redirecionar para checkout
  async redirectToCheckout(planId, userId) {
    try {
      const plan = SUBSCRIPTION_PLANS[planId]
      if (!plan || !plan.stripePriceId) {
        throw new Error('Plano inválido ou não disponível para compra')
      }
      
      const stripe = await this.getStripe()
      const successUrl = `${window.location.origin}/dashboard/billing/success`
      const cancelUrl = `${window.location.origin}/dashboard/billing/cancel`
      
      const sessionId = await this.createCheckoutSession(
        plan.stripePriceId,
        userId,
        successUrl,
        cancelUrl
      )
      
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
      const { data, error } = await supabaseData.selectOne(
        'user_subscriptions',
        { user_id: userId }
      )
      
      if (error) {
        console.error('Erro ao buscar assinatura:', error)
        return null
      }
      
      return data
    } catch (error) {
      console.error('Erro ao obter informações da assinatura:', error)
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
      console.error('Erro ao verificar limites:', error)
      return { allowed: false, reason: 'Erro interno' }
    }
  },
  
  // Verificar se formato é suportado pelo plano
  isFormatSupported(planId, format) {
    const plan = SUBSCRIPTION_PLANS[planId]
    if (!plan) return false
    
    return plan.limits.supportedFormats.includes(format)
  },
  
  // Verificar se provedor de IA é suportado
  isAIProviderSupported(planId, provider) {
    const plan = SUBSCRIPTION_PLANS[planId]
    if (!plan) return false
    
    return plan.limits.aiProviders.includes(provider)
  },
  
  // Verificar se formato de exportação é suportado
  isExportFormatSupported(planId, format) {
    const plan = SUBSCRIPTION_PLANS[planId]
    if (!plan) return false
    
    if (plan.limits.exportFormats === 'all') return true
    return plan.limits.exportFormats.includes(format)
  },
  
  // Obter uso atual do usuário
  async getCurrentUsage(userId) {
    try {
      const startOfMonth = new Date()
      startOfMonth.setDate(1)
      startOfMonth.setHours(0, 0, 0, 0)
      
      // Resumos criados este mês
      const { data: summaries } = await supabaseData.select(
        'summaries',
        {
          select: 'id, created_at',
          eq: { user_id: userId },
          gte: { created_at: startOfMonth.toISOString() }
        }
      )
      
      // Documentos processados este mês
      const { data: documents } = await supabaseData.select(
        'documents',
        {
          select: 'id, file_size',
          eq: { user_id: userId },
          gte: { created_at: startOfMonth.toISOString() }
        }
      )
      
      const totalFileSize = documents?.reduce((sum, doc) => sum + (doc.file_size || 0), 0) || 0
      
      return {
        summariesThisMonth: summaries?.length || 0,
        documentsThisMonth: documents?.length || 0,
        totalFileSizeThisMonth: totalFileSize,
        period: {
          start: startOfMonth,
          end: new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0)
        }
      }
    } catch (error) {
      console.error('Erro ao obter uso atual:', error)
      return {
        summariesThisMonth: 0,
        documentsThisMonth: 0,
        totalFileSizeThisMonth: 0
      }
    }
  },
  
  // Formatar preço
  formatPrice(price, currency = 'BRL') {
    if (price === null || price === undefined) {
      return 'Sob consulta'
    }
    
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency
    }).format(price)
  },
  
  // Obter próxima data de cobrança
  getNextBillingDate(subscription) {
    if (!subscription || !subscription.current_period_end) {
      return null
    }
    
    return new Date(subscription.current_period_end)
  },
  
  // Verificar se assinatura está ativa
  isSubscriptionActive(subscription) {
    if (!subscription) return false
    
    const validStatuses = ['active', 'trialing']
    return validStatuses.includes(subscription.status)
  },
  
  // Obter plano atual do usuário
  async getCurrentPlan(userId) {
    try {
      const subscription = await this.getSubscriptionInfo(userId)
      
      if (!subscription || !this.isSubscriptionActive(subscription)) {
        return SUBSCRIPTION_PLANS.free
      }
      
      return SUBSCRIPTION_PLANS[subscription.plan_id] || SUBSCRIPTION_PLANS.free
    } catch (error) {
      console.error('Erro ao obter plano atual:', error)
      return SUBSCRIPTION_PLANS.free
    }
  }
}

export default stripeService