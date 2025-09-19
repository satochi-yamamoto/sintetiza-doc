<template>
  <div class="pricing">
    <!-- Header -->
    <div class="pricing-header">
      <div class="header-content">
        <h1 class="page-title">Escolha seu plano</h1>
        <p class="page-subtitle">
          Encontre o plano perfeito para suas necessidades de resumo de documentos
        </p>
        
        <!-- Billing Toggle -->
        <div class="billing-toggle">
          <span :class="{ active: !isAnnual }" class="toggle-label">Mensal</span>
          <label class="toggle-switch">
            <input v-model="isAnnual" type="checkbox" class="toggle-input">
            <span class="toggle-slider"></span>
          </label>
          <span :class="{ active: isAnnual }" class="toggle-label">
            Anual
            <span class="discount-badge">-20%</span>
          </span>
        </div>
      </div>
    </div>
    
    <!-- Plans Grid -->
    <div class="plans-grid">
      <div 
        v-for="plan in plans" 
        :key="plan.id"
        :class="{
          'plan-popular': plan.popular,
          'plan-current': currentPlan === plan.id,
          'disabled': plan.disabled
        }"
        class="plan-card"
      >
        <!-- Popular Badge -->
        <div v-if="plan.popular" class="popular-badge">
          Mais popular
        </div>

        <!-- Coming Soon Badge -->
        <div v-if="plan.disabled" class="coming-soon-badge">
          Em breve
        </div>
        
        <!-- Plan Header -->
        <div class="plan-header">
          <div class="plan-icon">
            <component :is="plan.icon" />
          </div>
          <h3 class="plan-name">{{ plan.name }}</h3>
          <p class="plan-description">{{ plan.description }}</p>
        </div>
        
        <!-- Plan Price -->
        <div class="plan-price">
          <div class="price-main">
            <span class="currency">R$</span>
            <span class="amount">{{ getPlanPrice(plan) }}</span>
            <span class="period">{{ isAnnual ? '/ano' : '/mês' }}</span>
          </div>
          <div v-if="isAnnual && plan.id !== 'free'" class="price-savings">
            Economize R$ {{ getAnnualSavings(plan) }} por ano
          </div>
        </div>
        
        <!-- Plan Features -->
        <div class="plan-features">
          <h4 class="features-title">O que está incluído:</h4>
          <ul class="features-list">
            <li v-for="feature in plan.features" :key="feature" class="feature-item">
              <CheckIcon class="feature-icon" />
              <span>{{ feature }}</span>
            </li>
          </ul>
        </div>
        
        <!-- Plan Limits -->
        <div class="plan-limits">
          <div class="limit-item">
            <DocumentIcon class="limit-icon" />
            <span>{{ plan.limits.documents }} documentos/mês</span>
          </div>
          <div class="limit-item">
            <ClipboardIcon class="limit-icon" />
            <span>{{ plan.limits.summaries }} resumos/mês</span>
          </div>
          <div class="limit-item">
            <CloudIcon class="limit-icon" />
            <span>{{ formatStorage(plan.limits.storage) }} de armazenamento</span>
          </div>
        </div>
        
        <!-- Plan Action -->
        <div class="plan-action">
          <button 
            v-if="currentPlan === plan.id"
            disabled
            class="btn-current"
          >
            Plano atual
          </button>
          <button 
            v-else-if="plan.id === 'free'"
            @click="selectFreePlan"
            class="btn-secondary"
          >
            Começar grátis
          </button>
          <button
            v-else-if="plan.disabled"
            disabled
            class="btn-disabled"
          >
            Em breve
          </button>
          <button
            v-else
            @click="selectPlan(plan.id)"
            :disabled="isProcessing"
            class="btn-primary"
          >
            <LoadingSpinner v-if="isProcessing" :show="true" size="sm" />
            <span v-else>{{ getActionLabel(plan.id) }}</span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- FAQ Section -->
    <div class="faq-section">
      <div class="faq-header">
        <h2 class="faq-title">Perguntas frequentes</h2>
        <p class="faq-subtitle">
          Tire suas dúvidas sobre nossos planos e funcionalidades
        </p>
      </div>
      
      <div class="faq-list">
        <div 
          v-for="(faq, index) in faqs" 
          :key="index"
          class="faq-item"
        >
          <button 
            @click="toggleFaq(index)"
            :class="{ active: activeFaq === index }"
            class="faq-question"
          >
            <span>{{ faq.question }}</span>
            <ChevronDownIcon class="faq-icon" />
          </button>
          <div 
            v-if="activeFaq === index"
            class="faq-answer"
          >
            <p>{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Enterprise CTA -->
    <div class="enterprise-cta">
      <div class="cta-content">
        <div class="cta-info">
          <h3 class="cta-title">Precisa de mais?</h3>
          <p class="cta-description">
            Para empresas com necessidades específicas, oferecemos soluções personalizadas
            com recursos avançados, suporte dedicado e integrações customizadas.
          </p>
        </div>
        <div class="cta-action">
          <button @click="contactSales" class="btn-enterprise">
            Falar com vendas
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '@clerk/vue'
import { stripeService } from '@/services/stripe'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

// Icons (inline components)
const CheckIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>`
}

const DocumentIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" /></svg>`
}

const ClipboardIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" /><path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" /></svg>`
}

const CloudIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" /></svg>`
}

const ChevronDownIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>`
}

const StarIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>`
}

const RocketIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011-11 6.98 6.98 0 01-1.605 3.553zm-6.479 6.556c-.75.13-1.47.337-2.137.628-.67.292-1.29.66-1.82 1.1a7.968 7.968 0 00-1.85 2.313 1 1 0 001.48 1.34c.305-.337.65-.653 1.032-.936a15.88 15.88 0 012.395-1.445zm5.584 5.584c-.292.67-.66 1.29-1.1 1.82a7.968 7.968 0 01-2.313 1.85 1 1 0 01-1.34-1.48c.337-.305.653-.65.936-1.032a15.88 15.88 0 011.445-2.395z" clip-rule="evenodd" /></svg>`
}

const BuildingIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd" /></svg>`
}

// Composables
const { isSignedIn, user } = useAuth()
const toast = useToast()
const router = useRouter()

// Refs
const isAnnual = ref(false)
const isProcessing = ref(false)
const currentPlan = ref('free')
const activeFaq = ref(null)

// Plans configuration
const plans = [
  {
    id: 'free',
    name: 'Gratuito',
    description: 'Perfeito para começar',
    icon: StarIcon,
    monthlyPrice: 0,
    annualPrice: 0,
    popular: false,
    features: [
      'Upload de documentos PDF, DOCX, TXT',
      'Resumos básicos com IA',
      'Exportação em texto simples',
      'Suporte por email'
    ],
    limits: {
      documents: 5,
      summaries: 5,
      storage: 50 * 1024 * 1024 // 50MB
    }
  },
  {
    id: 'basic',
    name: 'Básico',
    description: 'Para uso pessoal regular',
    icon: RocketIcon,
    monthlyPrice: 1990, // R$ 19.90
    annualPrice: 19104, // R$ 191.04 (20% desconto)
    popular: true,
    features: [
      'Tudo do plano Gratuito',
      'Múltiplos estilos de resumo',
      'Processamento de áudio',
      'Exportação em Word e PDF',
      'Tradução português-inglês',
      'Suporte prioritário'
    ],
    limits: {
      documents: 50,
      summaries: 50,
      storage: 500 * 1024 * 1024 // 500MB
    }
  },
  {
    id: 'professional',
    name: 'Profissional',
    description: 'Para profissionais e pequenas equipes',
    icon: BuildingIcon,
    monthlyPrice: 4990, // R$ 49.90
    annualPrice: 47904, // R$ 479.04 (20% desconto)
    popular: false,
    disabled: true,
    features: [
      'Tudo do plano Básico',
      'Resumos técnicos avançados',
      'Integração com Notion e Trello',
      'Exportação para Excel',
      'API para integrações',
      'Análise de sentimento',
      'Suporte por chat'
    ],
    limits: {
      documents: 200,
      summaries: 200,
      storage: 2 * 1024 * 1024 * 1024 // 2GB
    }
  }
]

// FAQs
const faqs = [
  {
    question: 'Posso cancelar minha assinatura a qualquer momento?',
    answer: 'Sim, você pode cancelar sua assinatura a qualquer momento. O cancelamento será efetivo no final do período de faturamento atual e você manterá acesso a todos os recursos até lá.'
  },
  {
    question: 'Como funciona o período de teste gratuito?',
    answer: 'Todos os planos pagos incluem 7 dias de teste gratuito. Durante este período, você tem acesso completo a todos os recursos do plano escolhido. Você pode cancelar antes do fim do período sem ser cobrado.'
  },
  {
    question: 'Posso fazer upgrade ou downgrade do meu plano?',
    answer: 'Sim, você pode alterar seu plano a qualquer momento. Upgrades são aplicados imediatamente, enquanto downgrades entram em vigor no próximo ciclo de faturamento.'
  },
  {
    question: 'Os dados dos meus documentos ficam seguros?',
    answer: 'Absolutamente. Utilizamos criptografia de ponta a ponta e seguimos as melhores práticas de segurança. Seus documentos são processados de forma segura e nunca compartilhados com terceiros.'
  },
  {
    question: 'Quais formatos de arquivo são suportados?',
    answer: 'Suportamos PDF, DOCX, TXT e arquivos de áudio (MP3, WAV, M4A). Estamos constantemente adicionando suporte para novos formatos baseado no feedback dos usuários.'
  },
  {
    question: 'Como funciona o processamento de áudio?',
    answer: 'Nosso sistema transcreve automaticamente arquivos de áudio para texto e depois gera resumos. É perfeito para reuniões, palestras e entrevistas.'
  },
  {
    question: 'Posso usar a API em todos os planos?',
    answer: 'A API está disponível apenas nos planos Profissional e Empresarial. Ela permite integrar nossos recursos de resumo diretamente em suas aplicações.'
  },
  {
    question: 'Como funciona o suporte técnico?',
    answer: 'Oferecemos suporte por email para todos os planos, suporte prioritário para o plano Básico, chat para o Profissional e suporte dedicado 24/7 para o Empresarial.'
  }
]

// Computed
const getPlanPrice = (plan) => {
  if (plan.id === 'free') return '0'
  
  const price = isAnnual.value ? plan.annualPrice : plan.monthlyPrice
  return (price / 100).toFixed(2).replace('.', ',')
}

const getAnnualSavings = (plan) => {
  const monthlyCost = plan.monthlyPrice * 12
  const savings = monthlyCost - plan.annualPrice
  return (savings / 100).toFixed(2).replace('.', ',')
}

const getActionLabel = (planId) => {
  if (!isSignedIn.value) {
    return 'Começar teste grátis'
  }
  
  const planHierarchy = ['free', 'basic', 'professional', 'enterprise']
  const currentIndex = planHierarchy.indexOf(currentPlan.value)
  const targetIndex = planHierarchy.indexOf(planId)
  
  if (targetIndex > currentIndex) {
    return 'Fazer upgrade'
  } else {
    return 'Selecionar plano'
  }
}

// Methods
const loadCurrentPlan = async () => {
  if (!isSignedIn.value) return
  
  try {
    const planInfo = await stripeService.getCurrentPlan()
    currentPlan.value = planInfo.name || 'free'
  } catch (error) {
    console.error('Erro ao carregar plano atual:', error)
  }
}

const selectFreePlan = () => {
  if (!isSignedIn.value) {
    router.push('/auth/register')
    return
  }
  
  toast.info('Você já está no plano gratuito')
}

const selectPlan = async (planId) => {
  if (!isSignedIn.value) {
    // Store selected plan and redirect to register
    localStorage.setItem('selectedPlan', planId)
    router.push('/auth/register')
    return
  }
  
  try {
    isProcessing.value = true
    
    const interval = isAnnual.value ? 'year' : 'month'
    const checkoutUrl = await stripeService.createCheckoutSession(planId, interval)
    
    // Redirect to Stripe Checkout
    window.location.href = checkoutUrl
    
  } catch (error) {
    console.error('Erro ao processar plano:', error)
    toast.error('Erro ao processar seleção do plano')
  } finally {
    isProcessing.value = false
  }
}

const contactSales = () => {
  // Open contact form or redirect to sales page
  window.open('mailto:vendas@sintetiza-doc.com?subject=Consulta sobre plano empresarial', '_blank')
}

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index
}

const formatStorage = (bytes) => {
  if (bytes === 'unlimited') return 'Ilimitado'
  
  const mb = bytes / (1024 * 1024)
  const gb = bytes / (1024 * 1024 * 1024)
  
  if (gb >= 1) {
    return `${gb.toFixed(0)} GB`
  } else {
    return `${mb.toFixed(0)} MB`
  }
}

// Lifecycle
onMounted(() => {
  loadCurrentPlan()
  
  // Check if user came from registration with selected plan
  const selectedPlan = localStorage.getItem('selectedPlan')
  if (selectedPlan && isSignedIn.value) {
    localStorage.removeItem('selectedPlan')
    selectPlan(selectedPlan)
  }
})
</script>

<style scoped>
.pricing {
  @apply min-h-screen bg-gray-50 dark:bg-gray-900 py-12;
}

.pricing-header {
  @apply text-center mb-16;
}

.header-content {
  @apply max-w-3xl mx-auto px-4 space-y-6;
}

.page-title {
  @apply text-4xl md:text-5xl font-bold text-gray-900 dark:text-white;
}

.page-subtitle {
  @apply text-xl text-gray-600 dark:text-gray-300;
}

.billing-toggle {
  @apply flex items-center justify-center space-x-4;
}

.toggle-label {
  @apply text-gray-600 dark:text-gray-300 font-medium transition-colors duration-200;
}

.toggle-label.active {
  @apply text-gray-900 dark:text-white;
}

.discount-badge {
  @apply ml-2 px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-medium rounded-full;
}

.toggle-switch {
  @apply relative inline-flex items-center cursor-pointer;
}

.toggle-input {
  @apply sr-only;
}

.toggle-slider {
  @apply w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full relative transition-colors duration-200;
}

.toggle-slider::before {
  @apply content-[''] absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200;
}

.toggle-input:checked + .toggle-slider {
  @apply bg-primary-600;
}

.toggle-input:checked + .toggle-slider::before {
  @apply transform translate-x-6;
}

.plans-grid {
  @apply max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-20;
}

.plan-card {
  @apply relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 transition-all duration-300 hover:shadow-xl;
}

.plan-popular {
  @apply ring-2 ring-primary-500 scale-105;
}

.plan-current {
  @apply ring-2 ring-green-500;
}

.popular-badge {
  @apply absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium;
}

.coming-soon-badge {
  @apply absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white px-4 py-2 rounded-full text-sm font-medium;
}

.plan-card.disabled {
  @apply opacity-60;
}

.btn-disabled {
  @apply w-full px-6 py-3 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded-lg cursor-not-allowed font-medium;
}

.plan-header {
  @apply text-center space-y-4 mb-8;
}

.plan-icon {
  @apply w-12 h-12 mx-auto text-primary-600 dark:text-primary-400;
}

.plan-name {
  @apply text-2xl font-bold text-gray-900 dark:text-white;
}

.plan-description {
  @apply text-gray-600 dark:text-gray-300;
}

.plan-price {
  @apply text-center mb-8;
}

.price-main {
  @apply flex items-baseline justify-center space-x-1;
}

.currency {
  @apply text-lg font-medium text-gray-600 dark:text-gray-300;
}

.amount {
  @apply text-4xl font-bold text-gray-900 dark:text-white;
}

.period {
  @apply text-lg font-medium text-gray-600 dark:text-gray-300;
}

.price-savings {
  @apply text-sm text-green-600 dark:text-green-400 mt-2;
}

.plan-features {
  @apply mb-8;
}

.features-title {
  @apply text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-4;
}

.features-list {
  @apply space-y-3;
}

.feature-item {
  @apply flex items-start space-x-3;
}

.feature-icon {
  @apply w-5 h-5 text-green-500 flex-shrink-0 mt-0.5;
}

.plan-limits {
  @apply space-y-3 mb-8 pt-6 border-t border-gray-200 dark:border-gray-700;
}

.limit-item {
  @apply flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300;
}

.limit-icon {
  @apply w-4 h-4 text-gray-400;
}

.plan-action {
  @apply mt-auto;
}

.btn-primary {
  @apply w-full flex items-center justify-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium;
}

.btn-secondary {
  @apply w-full px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 font-medium;
}

.btn-current {
  @apply w-full px-6 py-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-lg cursor-not-allowed font-medium;
}

.btn-enterprise {
  @apply px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 font-medium;
}

.faq-section {
  @apply max-w-4xl mx-auto px-4 mb-20;
}

.faq-header {
  @apply text-center mb-12;
}

.faq-title {
  @apply text-3xl font-bold text-gray-900 dark:text-white mb-4;
}

.faq-subtitle {
  @apply text-lg text-gray-600 dark:text-gray-300;
}

.faq-list {
  @apply space-y-4;
}

.faq-item {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden;
}

.faq-question {
  @apply w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200;
}

.faq-question.active {
  @apply bg-gray-50 dark:bg-gray-700;
}

.faq-question span {
  @apply font-medium text-gray-900 dark:text-white;
}

.faq-icon {
  @apply w-5 h-5 text-gray-400 transition-transform duration-200;
}

.faq-question.active .faq-icon {
  @apply transform rotate-180;
}

.faq-answer {
  @apply px-6 pb-6 text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700;
}

.enterprise-cta {
  @apply max-w-4xl mx-auto px-4;
}

.cta-content {
  @apply bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white;
}

.cta-info {
  @apply mb-8;
}

.cta-title {
  @apply text-3xl font-bold mb-4;
}

.cta-description {
  @apply text-lg opacity-90 max-w-2xl mx-auto;
}

.cta-action {
  @apply flex justify-center;
}

/* Responsive */
@media (max-width: 768px) {
  .pricing {
    @apply py-8;
  }
  
  .pricing-header {
    @apply mb-12;
  }
  
  .page-title {
    @apply text-3xl;
  }
  
  .page-subtitle {
    @apply text-lg;
  }
  
  .plans-grid {
    @apply grid-cols-1 gap-6 mb-16;
  }
  
  .plan-card {
    @apply p-6;
  }
  
  .plan-popular {
    @apply scale-100;
  }
  
  .billing-toggle {
    @apply space-x-3;
  }
  
  .toggle-label {
    @apply text-sm;
  }
  
  .faq-section {
    @apply mb-16;
  }
  
  .faq-title {
    @apply text-2xl;
  }
  
  .cta-content {
    @apply p-6;
  }
  
  .cta-title {
    @apply text-2xl;
  }
  
  .cta-description {
    @apply text-base;
  }
}

/* Animation for FAQ */
.faq-answer {
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>