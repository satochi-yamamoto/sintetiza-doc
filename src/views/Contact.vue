<template>
  <div class="contact">
    <!-- Header -->
    <div class="contact-header">
      <div class="header-content">
        <h1 class="page-title">Entre em contato</h1>
        <p class="page-subtitle">
          Estamos aqui para ajudar. Entre em contato conosco através dos canais abaixo
          ou envie uma mensagem diretamente.
        </p>
      </div>
    </div>
    
    <!-- Contact Options -->
    <div class="contact-options">
      <div class="options-grid">
        <div class="option-card">
          <div class="option-icon">
            <ChatIcon />
          </div>
          <h3 class="option-title">Suporte Técnico</h3>
          <p class="option-description">
            Precisa de ajuda com a plataforma? Nossa equipe de suporte está pronta para ajudar.
          </p>
          <div class="option-actions">
            <button @click="openChat" class="btn-primary">
              Iniciar chat
            </button>
            <a href="mailto:suporte@sintetiza-doc.com" class="btn-secondary">
              Enviar email
            </a>
          </div>
          <div class="option-info">
            <span class="info-item">
              <ClockIcon class="info-icon" />
              Seg-Sex: 9h às 18h
            </span>
          </div>
        </div>
        
        <div class="option-card">
          <div class="option-icon">
            <BriefcaseIcon />
          </div>
          <h3 class="option-title">Vendas</h3>
          <p class="option-description">
            Interessado em planos empresariais ou tem dúvidas sobre preços?
          </p>
          <div class="option-actions">
            <button @click="scheduleMeeting" class="btn-primary">
              Agendar reunião
            </button>
            <a href="mailto:vendas@sintetiza-doc.com" class="btn-secondary">
              Falar com vendas
            </a>
          </div>
          <div class="option-info">
            <span class="info-item">
              <PhoneIcon class="info-icon" />
              +55 (11) 9999-9999
            </span>
          </div>
        </div>
        
        <div class="option-card">
          <div class="option-icon">
            <CodeIcon />
          </div>
          <h3 class="option-title">Parcerias & API</h3>
          <p class="option-description">
            Quer integrar nossa API ou discutir parcerias estratégicas?
          </p>
          <div class="option-actions">
            <a href="/docs/api" class="btn-primary">
              Ver documentação
            </a>
            <a href="mailto:parcerias@sintetiza-doc.com" class="btn-secondary">
              Contato comercial
            </a>
          </div>
          <div class="option-info">
            <span class="info-item">
              <DocumentIcon class="info-icon" />
              API REST disponível
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Contact Form -->
    <div class="contact-form-section">
      <div class="form-container">
        <div class="form-header">
          <h2 class="form-title">Envie uma mensagem</h2>
          <p class="form-subtitle">
            Preencha o formulário abaixo e entraremos em contato em até 24 horas.
          </p>
        </div>
        
        <form @submit.prevent="submitForm" class="contact-form">
          <div class="form-grid">
            <div class="form-group">
              <label for="name" class="form-label">Nome completo *</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="form-input"
                :class="{ 'form-error': errors.name }"
                placeholder="Seu nome completo"
              >
              <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
            </div>
            
            <div class="form-group">
              <label for="email" class="form-label">Email *</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="form-input"
                :class="{ 'form-error': errors.email }"
                placeholder="seu@email.com"
              >
              <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </div>
          </div>
          
          <div class="form-grid">
            <div class="form-group">
              <label for="company" class="form-label">Empresa</label>
              <input
                id="company"
                v-model="form.company"
                type="text"
                class="form-input"
                placeholder="Nome da sua empresa (opcional)"
              >
            </div>
            
            <div class="form-group">
              <label for="subject" class="form-label">Assunto *</label>
              <select
                id="subject"
                v-model="form.subject"
                required
                class="form-select"
                :class="{ 'form-error': errors.subject }"
              >
                <option value="">Selecione um assunto</option>
                <option value="support">Suporte técnico</option>
                <option value="sales">Vendas e preços</option>
                <option value="partnership">Parcerias</option>
                <option value="api">API e integrações</option>
                <option value="billing">Faturamento</option>
                <option value="feedback">Feedback e sugestões</option>
                <option value="other">Outros</option>
              </select>
              <span v-if="errors.subject" class="error-message">{{ errors.subject }}</span>
            </div>
          </div>
          
          <div class="form-group">
            <label for="message" class="form-label">Mensagem *</label>
            <textarea
              id="message"
              v-model="form.message"
              required
              rows="6"
              class="form-textarea"
              :class="{ 'form-error': errors.message }"
              placeholder="Descreva sua dúvida, problema ou solicitação em detalhes..."
            ></textarea>
            <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
            <div class="character-count">
              {{ form.message.length }}/1000 caracteres
            </div>
          </div>
          
          <div class="form-group">
            <label class="checkbox-label">
              <input
                v-model="form.newsletter"
                type="checkbox"
                class="checkbox-input"
              >
              <span class="checkbox-custom"></span>
              <span class="checkbox-text">
                Quero receber novidades e dicas sobre resumo de documentos por email
              </span>
            </label>
          </div>
          
          <div class="form-actions">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="btn-submit"
            >
              <LoadingSpinner v-if="isSubmitting" :show="true" size="sm" />
              <span v-else>Enviar mensagem</span>
            </button>
          </div>
        </form>
      </div>
      
      <!-- Success Message -->
      <div v-if="showSuccess" class="success-message">
        <div class="success-content">
          <CheckCircleIcon class="success-icon" />
          <h3 class="success-title">Mensagem enviada com sucesso!</h3>
          <p class="success-text">
            Recebemos sua mensagem e entraremos em contato em até 24 horas.
            Obrigado por entrar em contato conosco!
          </p>
          <button @click="resetForm" class="btn-secondary">
            Enviar nova mensagem
          </button>
        </div>
      </div>
    </div>
    
    <!-- FAQ Section -->
    <div class="faq-section">
      <div class="faq-header">
        <h2 class="faq-title">Perguntas frequentes</h2>
        <p class="faq-subtitle">
          Encontre respostas rápidas para as dúvidas mais comuns
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
    
    <!-- Office Info -->
    <div class="office-info">
      <div class="office-content">
        <div class="office-details">
          <h3 class="office-title">Nosso escritório</h3>
          <div class="office-address">
            <MapPinIcon class="address-icon" />
            <div class="address-text">
              <p>Av. Paulista, 1000 - Sala 1001</p>
              <p>Bela Vista, São Paulo - SP</p>
              <p>CEP: 01310-100</p>
            </div>
          </div>
          <div class="office-hours">
            <ClockIcon class="hours-icon" />
            <div class="hours-text">
              <p><strong>Segunda a Sexta:</strong> 9h às 18h</p>
              <p><strong>Sábado:</strong> 9h às 12h</p>
              <p><strong>Domingo:</strong> Fechado</p>
            </div>
          </div>
        </div>
        
        <div class="office-map">
          <!-- Placeholder for map integration -->
          <div class="map-placeholder">
            <MapPinIcon class="map-icon" />
            <p class="map-text">Mapa interativo em breve</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useToast } from 'vue-toastification'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

// Icons (inline components)
const ChatIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" /></svg>`
}

const BriefcaseIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm4-1a1 1 0 00-1 1v1h2V6a1 1 0 00-1-1zM4 8v6h12V8H4z" clip-rule="evenodd" /></svg>`
}

const CodeIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>`
}

const ClockIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" /></svg>`
}

const PhoneIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>`
}

const DocumentIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" /></svg>`
}

const CheckCircleIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>`
}

const ChevronDownIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>`
}

const MapPinIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" /></svg>`
}

// Composables
const toast = useToast()

// Refs
const isSubmitting = ref(false)
const showSuccess = ref(false)
const activeFaq = ref(null)

// Form data
const form = reactive({
  name: '',
  email: '',
  company: '',
  subject: '',
  message: '',
  newsletter: false
})

const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// FAQs
const faqs = [
  {
    question: 'Como posso cancelar minha assinatura?',
    answer: 'Você pode cancelar sua assinatura a qualquer momento através das configurações da sua conta ou entrando em contato conosco. O cancelamento será efetivo no final do período de faturamento atual.'
  },
  {
    question: 'Vocês oferecem reembolso?',
    answer: 'Sim, oferecemos reembolso total dentro de 30 dias da primeira compra, sem perguntas. Para assinaturas recorrentes, o reembolso é proporcional ao tempo não utilizado.'
  },
  {
    question: 'Como funciona o suporte técnico?',
    answer: 'Oferecemos suporte por email para todos os usuários, com tempo de resposta de até 24 horas. Usuários de planos pagos têm acesso a suporte prioritário via chat.'
  },
  {
    question: 'Posso integrar a API em minha aplicação?',
    answer: 'Sim, nossa API REST está disponível para planos Profissional e Empresarial. Consulte nossa documentação técnica ou entre em contato para mais detalhes sobre integrações.'
  },
  {
    question: 'Vocês oferecem treinamento para equipes?',
    answer: 'Sim, oferecemos sessões de treinamento personalizadas para equipes do plano Empresarial. Entre em contato com nossa equipe de vendas para agendar uma demonstração.'
  },
  {
    question: 'Como garantem a segurança dos meus documentos?',
    answer: 'Utilizamos criptografia de ponta a ponta, armazenamento seguro na nuvem e seguimos as melhores práticas de segurança. Seus documentos são processados de forma segura e nunca compartilhados.'
  }
]

// Methods
const validateForm = () => {
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
  
  let isValid = true
  
  // Name validation
  if (!form.name.trim()) {
    errors.name = 'Nome é obrigatório'
    isValid = false
  } else if (form.name.trim().length < 2) {
    errors.name = 'Nome deve ter pelo menos 2 caracteres'
    isValid = false
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email.trim()) {
    errors.email = 'Email é obrigatório'
    isValid = false
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Email inválido'
    isValid = false
  }
  
  // Subject validation
  if (!form.subject) {
    errors.subject = 'Assunto é obrigatório'
    isValid = false
  }
  
  // Message validation
  if (!form.message.trim()) {
    errors.message = 'Mensagem é obrigatória'
    isValid = false
  } else if (form.message.trim().length < 10) {
    errors.message = 'Mensagem deve ter pelo menos 10 caracteres'
    isValid = false
  } else if (form.message.length > 1000) {
    errors.message = 'Mensagem deve ter no máximo 1000 caracteres'
    isValid = false
  }
  
  return isValid
}

const submitForm = async () => {
  if (!validateForm()) {
    toast.error('Por favor, corrija os erros no formulário')
    return
  }
  
  try {
    isSubmitting.value = true
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', form)
    
    showSuccess.value = true
    toast.success('Mensagem enviada com sucesso!')
    
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error)
    toast.error('Erro ao enviar mensagem. Tente novamente.')
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  // Reset form
  Object.keys(form).forEach(key => {
    if (typeof form[key] === 'boolean') {
      form[key] = false
    } else {
      form[key] = ''
    }
  })
  
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
  
  showSuccess.value = false
}

const openChat = () => {
  // Integrate with chat service (e.g., Intercom, Zendesk)
  toast.info('Chat em breve! Por enquanto, use o email de suporte.')
}

const scheduleMeeting = () => {
  // Integrate with scheduling service (e.g., Calendly)
  window.open('https://calendly.com/sintetiza-doc/vendas', '_blank')
}

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index
}
</script>

<style scoped>
.contact {
  @apply min-h-screen bg-gray-50 dark:bg-gray-900 py-12;
}

.contact-header {
  @apply text-center mb-16;
}

.header-content {
  @apply max-w-3xl mx-auto px-4;
}

.page-title {
  @apply text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6;
}

.page-subtitle {
  @apply text-xl text-gray-600 dark:text-gray-300;
}

.contact-options {
  @apply max-w-6xl mx-auto px-4 mb-20;
}

.options-grid {
  @apply grid grid-cols-1 md:grid-cols-3 gap-8;
}

.option-card {
  @apply bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center transition-all duration-300 hover:shadow-xl;
}

.option-icon {
  @apply w-16 h-16 mx-auto mb-6 text-primary-600 dark:text-primary-400;
}

.option-title {
  @apply text-2xl font-bold text-gray-900 dark:text-white mb-4;
}

.option-description {
  @apply text-gray-600 dark:text-gray-300 mb-6;
}

.option-actions {
  @apply space-y-3 mb-6;
}

.option-info {
  @apply pt-4 border-t border-gray-200 dark:border-gray-700;
}

.info-item {
  @apply flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400;
}

.info-icon {
  @apply w-4 h-4;
}

.btn-primary {
  @apply w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium;
}

.btn-secondary {
  @apply w-full px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 font-medium;
}

.contact-form-section {
  @apply max-w-4xl mx-auto px-4 mb-20;
}

.form-container {
  @apply bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 md:p-12;
}

.form-header {
  @apply text-center mb-8;
}

.form-title {
  @apply text-3xl font-bold text-gray-900 dark:text-white mb-4;
}

.form-subtitle {
  @apply text-lg text-gray-600 dark:text-gray-300;
}

.contact-form {
  @apply space-y-6;
}

.form-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-6;
}

.form-group {
  @apply space-y-2;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 dark:text-gray-300;
}

.form-input,
.form-select,
.form-textarea {
  @apply w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200;
}

.form-error {
  @apply border-red-500 focus:ring-red-500;
}

.error-message {
  @apply text-sm text-red-600 dark:text-red-400;
}

.character-count {
  @apply text-sm text-gray-500 dark:text-gray-400 text-right;
}

.checkbox-label {
  @apply flex items-start space-x-3 cursor-pointer;
}

.checkbox-input {
  @apply sr-only;
}

.checkbox-custom {
  @apply w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded flex-shrink-0 transition-colors duration-200;
}

.checkbox-input:checked + .checkbox-custom {
  @apply bg-primary-600 border-primary-600;
}

.checkbox-input:checked + .checkbox-custom::after {
  content: '';
  @apply block w-2 h-3 border-white border-r-2 border-b-2 transform rotate-45 translate-x-1;
}

.checkbox-text {
  @apply text-sm text-gray-700 dark:text-gray-300;
}

.form-actions {
  @apply flex justify-center;
}

.btn-submit {
  @apply flex items-center justify-center space-x-2 px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium;
}

.success-message {
  @apply bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center;
}

.success-content {
  @apply space-y-4;
}

.success-icon {
  @apply w-16 h-16 mx-auto text-green-600 dark:text-green-400;
}

.success-title {
  @apply text-2xl font-bold text-green-900 dark:text-green-100;
}

.success-text {
  @apply text-green-700 dark:text-green-300;
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

.office-info {
  @apply max-w-6xl mx-auto px-4;
}

.office-content {
  @apply bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden grid grid-cols-1 lg:grid-cols-2;
}

.office-details {
  @apply p-8 space-y-6;
}

.office-title {
  @apply text-2xl font-bold text-gray-900 dark:text-white mb-6;
}

.office-address,
.office-hours {
  @apply flex items-start space-x-4;
}

.address-icon,
.hours-icon {
  @apply w-6 h-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1;
}

.address-text,
.hours-text {
  @apply text-gray-600 dark:text-gray-300;
}

.office-map {
  @apply bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-8;
}

.map-placeholder {
  @apply text-center space-y-4;
}

.map-icon {
  @apply w-16 h-16 mx-auto text-gray-400;
}

.map-text {
  @apply text-gray-500 dark:text-gray-400;
}

/* Responsive */
@media (max-width: 768px) {
  .contact {
    @apply py-8;
  }
  
  .contact-header {
    @apply mb-12;
  }
  
  .page-title {
    @apply text-3xl;
  }
  
  .page-subtitle {
    @apply text-lg;
  }
  
  .contact-options {
    @apply mb-16;
  }
  
  .options-grid {
    @apply grid-cols-1 gap-6;
  }
  
  .option-card {
    @apply p-6;
  }
  
  .contact-form-section {
    @apply mb-16;
  }
  
  .form-container {
    @apply p-6;
  }
  
  .form-grid {
    @apply grid-cols-1;
  }
  
  .faq-section {
    @apply mb-16;
  }
  
  .faq-title {
    @apply text-2xl;
  }
  
  .office-content {
    @apply grid-cols-1;
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