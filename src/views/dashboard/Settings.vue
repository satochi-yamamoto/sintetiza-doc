<template>
  <div class="settings">
    <!-- Header -->
    <div class="settings-header">
      <div class="header-content">
        <h1 class="page-title">
          Configurações
        </h1>
        <p class="page-subtitle">
          Gerencie sua conta, preferências e configurações da aplicação
        </p>
      </div>
    </div>
    
    <!-- Settings Navigation -->
    <div class="settings-nav">
      <nav class="nav-tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          :class="{ active: activeTab === tab.id }"
          class="nav-tab"
          @click="activeTab = tab.id"
        >
          <component
            :is="tab.icon"
            class="tab-icon"
          />
          <span>{{ tab.label }}</span>
        </button>
      </nav>
    </div>
    
    <!-- Settings Content -->
    <div class="settings-content">
      <!-- Account Tab -->
      <div
        v-if="activeTab === 'account'"
        class="tab-content"
      >
        <div class="settings-section">
          <h2 class="section-title">
            Informações da Conta
          </h2>
          <p class="section-description">
            Gerencie suas informações pessoais e configurações de conta
          </p>
          
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Nome completo</label>
              <input 
                v-model="accountForm.name" 
                type="text" 
                class="form-input"
                placeholder="Seu nome completo"
              >
            </div>
            
            <div class="form-group">
              <label class="form-label">Email</label>
              <input 
                v-model="accountForm.email" 
                type="email" 
                class="form-input"
                :disabled="true"
              >
              <p class="form-help">
                O email não pode ser alterado
              </p>
            </div>
            
            <div class="form-group">
              <label class="form-label">Telefone</label>
              <input 
                v-model="accountForm.phone" 
                type="tel" 
                class="form-input"
                placeholder="(11) 99999-9999"
              >
            </div>
            
            <div class="form-group">
              <label class="form-label">Empresa</label>
              <input 
                v-model="accountForm.company" 
                type="text" 
                class="form-input"
                placeholder="Nome da empresa (opcional)"
              >
            </div>
          </div>
          
          <div class="form-actions">
            <button
              :disabled="isUpdatingAccount"
              class="btn-primary"
              @click="updateAccount"
            >
              <LoadingSpinner
                v-if="isUpdatingAccount"
                :show="true"
                size="sm"
              />
              <span v-else>Salvar alterações</span>
            </button>
          </div>
        </div>
        
        <div class="settings-section">
          <h2 class="section-title">
            Alterar Senha
          </h2>
          <p class="section-description">
            Mantenha sua conta segura com uma senha forte
          </p>
          
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Senha atual</label>
              <input 
                v-model="passwordForm.currentPassword" 
                type="password" 
                class="form-input"
                placeholder="Digite sua senha atual"
              >
            </div>
            
            <div class="form-group">
              <label class="form-label">Nova senha</label>
              <input 
                v-model="passwordForm.newPassword" 
                type="password" 
                class="form-input"
                placeholder="Digite a nova senha"
              >
            </div>
            
            <div class="form-group">
              <label class="form-label">Confirmar nova senha</label>
              <input 
                v-model="passwordForm.confirmPassword" 
                type="password" 
                class="form-input"
                placeholder="Confirme a nova senha"
              >
            </div>
          </div>
          
          <div class="form-actions">
            <button
              :disabled="isUpdatingPassword"
              class="btn-primary"
              @click="updatePassword"
            >
              <LoadingSpinner
                v-if="isUpdatingPassword"
                :show="true"
                size="sm"
              />
              <span v-else>Alterar senha</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Preferences Tab -->
      <div
        v-if="activeTab === 'preferences'"
        class="tab-content"
      >
        <div class="settings-section">
          <h2 class="section-title">
            Preferências Gerais
          </h2>
          <p class="section-description">
            Configure suas preferências de uso da aplicação
          </p>
          
          <div class="preference-group">
            <div class="preference-item">
              <div class="preference-info">
                <h3 class="preference-title">
                  Idioma padrão
                </h3>
                <p class="preference-description">
                  Idioma usado para gerar resumos
                </p>
              </div>
              <select
                v-model="preferences.defaultLanguage"
                class="preference-select"
              >
                <option value="pt">
                  Português
                </option>
                <option value="en">
                  Inglês
                </option>
              </select>
            </div>
            
            <div class="preference-item">
              <div class="preference-info">
                <h3 class="preference-title">
                  Estilo de resumo padrão
                </h3>
                <p class="preference-description">
                  Estilo aplicado automaticamente aos novos resumos
                </p>
              </div>
              <select
                v-model="preferences.defaultStyle"
                class="preference-select"
              >
                <option value="standard">
                  Padrão
                </option>
                <option value="executive">
                  Executivo
                </option>
                <option value="technical">
                  Técnico
                </option>
                <option value="educational">
                  Educacional
                </option>
              </select>
            </div>
            
            <div class="preference-item">
              <div class="preference-info">
                <h3 class="preference-title">
                  Tamanho de resumo padrão
                </h3>
                <p class="preference-description">
                  Extensão padrão dos resumos gerados
                </p>
              </div>
              <select
                v-model="preferences.defaultSize"
                class="preference-select"
              >
                <option value="short">
                  Curto
                </option>
                <option value="medium">
                  Médio
                </option>
                <option value="long">
                  Longo
                </option>
              </select>
            </div>
            
            <div class="preference-item">
              <div class="preference-info">
                <h3 class="preference-title">
                  Tema da interface
                </h3>
                <p class="preference-description">
                  Aparência da aplicação
                </p>
              </div>
              <select
                v-model="preferences.theme"
                class="preference-select"
              >
                <option value="light">
                  Claro
                </option>
                <option value="dark">
                  Escuro
                </option>
                <option value="system">
                  Sistema
                </option>
              </select>
            </div>
          </div>
          
          <div class="form-actions">
            <button
              :disabled="isUpdatingPreferences"
              class="btn-primary"
              @click="updatePreferences"
            >
              <LoadingSpinner
                v-if="isUpdatingPreferences"
                :show="true"
                size="sm"
              />
              <span v-else>Salvar preferências</span>
            </button>
          </div>
        </div>
        
        <div class="settings-section">
          <h2 class="section-title">
            Configurações de Upload
          </h2>
          <p class="section-description">
            Configure como os arquivos são processados
          </p>
          
          <div class="preference-group">
            <div class="preference-item">
              <div class="preference-info">
                <h3 class="preference-title">
                  Processamento automático
                </h3>
                <p class="preference-description">
                  Gerar resumo automaticamente após upload
                </p>
              </div>
              <label class="toggle-switch">
                <input 
                  v-model="preferences.autoProcess" 
                  type="checkbox" 
                  class="toggle-input"
                >
                <span class="toggle-slider" />
              </label>
            </div>
            
            <div class="preference-item">
              <div class="preference-info">
                <h3 class="preference-title">
                  Manter arquivos originais
                </h3>
                <p class="preference-description">
                  Armazenar cópia dos documentos enviados
                </p>
              </div>
              <label class="toggle-switch">
                <input 
                  v-model="preferences.keepOriginals" 
                  type="checkbox" 
                  class="toggle-input"
                >
                <span class="toggle-slider" />
              </label>
            </div>
            
            <div class="preference-item">
              <div class="preference-info">
                <h3 class="preference-title">
                  Tamanho máximo de arquivo
                </h3>
                <p class="preference-description">
                  Limite para upload de documentos
                </p>
              </div>
              <select
                v-model="preferences.maxFileSize"
                class="preference-select"
              >
                <option value="5">
                  5 MB
                </option>
                <option value="10">
                  10 MB
                </option>
                <option value="25">
                  25 MB
                </option>
                <option value="50">
                  50 MB
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Notifications Tab -->
      <div
        v-if="activeTab === 'notifications'"
        class="tab-content"
      >
        <div class="settings-section">
          <h2 class="section-title">
            Notificações por Email
          </h2>
          <p class="section-description">
            Configure quando e como receber notificações
          </p>
          
          <div class="preference-group">
            <div class="preference-item">
              <div class="preference-info">
                <h3 class="preference-title">
                  Resumos concluídos
                </h3>
                <p class="preference-description">
                  Receber email quando um resumo for gerado
                </p>
              </div>
              <label class="toggle-switch">
                <input 
                  v-model="notifications.summaryCompleted" 
                  type="checkbox" 
                  class="toggle-input"
                >
                <span class="toggle-slider" />
              </label>
            </div>
            
            <div class="preference-item">
              <div class="preference-info">
                <h3 class="preference-title">
                  Limite de plano atingido
                </h3>
                <p class="preference-description">
                  Avisar quando atingir o limite do plano
                </p>
              </div>
              <label class="toggle-switch">
                <input 
                  v-model="notifications.planLimitReached" 
                  type="checkbox" 
                  class="toggle-input"
                >
                <span class="toggle-slider" />
              </label>
            </div>
            
            <div class="preference-item">
              <div class="preference-info">
                <h3 class="preference-title">
                  Novidades e atualizações
                </h3>
                <p class="preference-description">
                  Receber informações sobre novas funcionalidades
                </p>
              </div>
              <label class="toggle-switch">
                <input 
                  v-model="notifications.productUpdates" 
                  type="checkbox" 
                  class="toggle-input"
                >
                <span class="toggle-slider" />
              </label>
            </div>
            
            <div class="preference-item">
              <div class="preference-info">
                <h3 class="preference-title">
                  Newsletter semanal
                </h3>
                <p class="preference-description">
                  Dicas e melhores práticas de uso
                </p>
              </div>
              <label class="toggle-switch">
                <input 
                  v-model="notifications.newsletter" 
                  type="checkbox" 
                  class="toggle-input"
                >
                <span class="toggle-slider" />
              </label>
            </div>
          </div>
          
          <div class="form-actions">
            <button
              :disabled="isUpdatingNotifications"
              class="btn-primary"
              @click="updateNotifications"
            >
              <LoadingSpinner
                v-if="isUpdatingNotifications"
                :show="true"
                size="sm"
              />
              <span v-else>Salvar configurações</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Subscription Tab -->
      <div
        v-if="activeTab === 'subscription'"
        class="tab-content"
      >
        <div class="settings-section">
          <h2 class="section-title">
            Plano Atual
          </h2>
          <p class="section-description">
            Gerencie sua assinatura e faturamento
          </p>
          
          <div class="current-plan">
            <div class="plan-info">
              <div
                class="plan-badge"
                :class="getPlanBadgeClass(currentPlan?.name)"
              >
                {{ getPlanLabel(currentPlan?.name) }}
              </div>
              <h3 class="plan-name">
                {{ getPlanLabel(currentPlan?.name) }}
              </h3>
              <p class="plan-price">
                {{ formatPrice(currentPlan?.price) }}
                <span class="plan-period">{{ currentPlan?.interval === 'month' ? '/mês' : '/ano' }}</span>
              </p>
            </div>
            
            <div class="plan-usage">
              <div class="usage-item">
                <span class="usage-label">Documentos processados</span>
                <div class="usage-bar">
                  <div
                    class="usage-progress"
                    :style="{ width: getUsagePercentage('documents') + '%' }"
                  />
                </div>
                <span class="usage-text">{{ usage.documents }} / {{ currentPlan?.limits?.documents || '∞' }}</span>
              </div>
              
              <div class="usage-item">
                <span class="usage-label">Resumos gerados</span>
                <div class="usage-bar">
                  <div
                    class="usage-progress"
                    :style="{ width: getUsagePercentage('summaries') + '%' }"
                  />
                </div>
                <span class="usage-text">{{ usage.summaries }} / {{ currentPlan?.limits?.summaries || '∞' }}</span>
              </div>
              
              <div class="usage-item">
                <span class="usage-label">Armazenamento</span>
                <div class="usage-bar">
                  <div
                    class="usage-progress"
                    :style="{ width: getUsagePercentage('storage') + '%' }"
                  />
                </div>
                <span class="usage-text">{{ formatStorage(usage.storage) }} / {{ formatStorage(currentPlan?.limits?.storage) }}</span>
              </div>
            </div>
            
            <div class="plan-actions">
              <button
                v-if="currentPlan?.name !== 'enterprise'"
                class="btn-primary"
                @click="upgradePlan"
              >
                Fazer upgrade
              </button>
              <button
                class="btn-secondary"
                @click="manageBilling"
              >
                Gerenciar faturamento
              </button>
            </div>
          </div>
        </div>
        
        <div
          v-if="currentPlan?.name !== 'free'"
          class="settings-section"
        >
          <h2 class="section-title">
            Histórico de Faturamento
          </h2>
          <p class="section-description">
            Visualize suas faturas e histórico de pagamentos
          </p>
          
          <div class="billing-history">
            <div
              v-if="billingHistory.length > 0"
              class="history-list"
            >
              <div
                v-for="invoice in billingHistory"
                :key="invoice.id"
                class="history-item"
              >
                <div class="invoice-info">
                  <span class="invoice-date">{{ formatDate(invoice.created) }}</span>
                  <span class="invoice-amount">{{ formatPrice(invoice.amount_paid / 100) }}</span>
                  <span
                    class="invoice-status"
                    :class="getInvoiceStatusClass(invoice.status)"
                  >
                    {{ getInvoiceStatusLabel(invoice.status) }}
                  </span>
                </div>
                <button
                  class="download-btn"
                  @click="downloadInvoice(invoice)"
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div
              v-else
              class="empty-history"
            >
              <p>Nenhuma fatura encontrada</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Security Tab -->
      <div
        v-if="activeTab === 'security'"
        class="tab-content"
      >
        <div class="settings-section">
          <h2 class="section-title">
            Segurança da Conta
          </h2>
          <p class="section-description">
            Configure opções de segurança e privacidade
          </p>
          
          <div class="security-options">
            <div class="security-item">
              <div class="security-info">
                <h3 class="security-title">
                  Autenticação de dois fatores
                </h3>
                <p class="security-description">
                  Adicione uma camada extra de segurança
                </p>
              </div>
              <div class="security-action">
                <button
                  v-if="!twoFactorEnabled"
                  class="btn-primary"
                  @click="enableTwoFactor"
                >
                  Ativar 2FA
                </button>
                <button
                  v-else
                  class="btn-secondary"
                  @click="disableTwoFactor"
                >
                  Desativar 2FA
                </button>
              </div>
            </div>
            
            <div class="security-item">
              <div class="security-info">
                <h3 class="security-title">
                  Sessões ativas
                </h3>
                <p class="security-description">
                  Gerencie dispositivos conectados à sua conta
                </p>
              </div>
              <div class="security-action">
                <button
                  class="btn-secondary"
                  @click="viewActiveSessions"
                >
                  Ver sessões
                </button>
              </div>
            </div>
            
            <div class="security-item">
              <div class="security-info">
                <h3 class="security-title">
                  Log de atividades
                </h3>
                <p class="security-description">
                  Histórico de ações realizadas na conta
                </p>
              </div>
              <div class="security-action">
                <button
                  class="btn-secondary"
                  @click="viewActivityLog"
                >
                  Ver atividades
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="settings-section danger-zone">
          <h2 class="section-title">
            Zona de Perigo
          </h2>
          <p class="section-description">
            Ações irreversíveis que afetam permanentemente sua conta
          </p>
          
          <div class="danger-actions">
            <div class="danger-item">
              <div class="danger-info">
                <h3 class="danger-title">
                  Excluir todos os dados
                </h3>
                <p class="danger-description">
                  Remove permanentemente todos os documentos e resumos
                </p>
              </div>
              <button
                class="btn-danger"
                @click="deleteAllData"
              >
                Excluir dados
              </button>
            </div>
            
            <div class="danger-item">
              <div class="danger-info">
                <h3 class="danger-title">
                  Excluir conta
                </h3>
                <p class="danger-description">
                  Remove permanentemente sua conta e todos os dados
                </p>
              </div>
              <button
                class="btn-danger"
                @click="deleteAccount"
              >
                Excluir conta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

import { useAppStore } from '@/stores/app'
import { supabase } from '@/services/supabase'
import { stripeService } from '@/services/stripe'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

// Sessão Supabase
const session = ref(null)
const uid = ref(null)

const appStore = useAppStore()
const toast = useToast()
const router = useRouter()

// Refs
const activeTab = ref('account')
const isUpdatingAccount = ref(false)
const isUpdatingPassword = ref(false)
const isUpdatingPreferences = ref(false)
const isUpdatingNotifications = ref(false)
const twoFactorEnabled = ref(false)
const currentPlan = ref(null)
const usage = ref({
  documents: 0,
  summaries: 0,
  storage: 0
})
const billingHistory = ref([])

// Forms
const accountForm = reactive({
  name: '',
  email: '',
  phone: '',
  company: ''
})

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const preferences = reactive({
  defaultLanguage: 'pt',
  defaultStyle: 'standard',
  defaultSize: 'medium',
  theme: 'system',
  autoProcess: false,
  keepOriginals: true,
  maxFileSize: 10
})

// Garantir sessão Supabase
const ensureSupabaseSession = async () => {
  try {
    const { data } = await supabase.auth.getSession()
    session.value = data?.session || null
    uid.value = session.value?.user?.id || null
    return !!uid.value
  } catch (_) {
    return false
  }
}

// Métodos auxiliares
const loadUsage = async () => {
  const userId = uid.value
  if (!userId) return
  const [{ count: documentsCount }, { count: summariesCount }, { data: docs }] = await Promise.all([
    supabase.from('documents').select('*', { count: 'exact', head: true }).eq('user_id', userId),
    supabase.from('summaries').select('*', { count: 'exact', head: true }).eq('user_id', userId),
    supabase.from('documents').select('file_size').eq('user_id', userId)
  ])
  const storage = docs?.reduce((sum, d) => sum + (d.file_size || 0), 0) || 0
  usage.value = {
    documents: documentsCount || 0,
    summaries: summariesCount || 0,
    storage
  }
}

const loadAccount = async () => {
  const u = session.value?.user
  if (!u) return
  const meta = u.user_metadata || {}
  accountForm.name = meta.fullName || meta.full_name || `${meta.firstName || ''} ${meta.lastName || ''}`.trim()
  accountForm.email = u.email || ''
}

const loadPlan = async () => {
  const userId = uid.value
  if (!userId) return
  try {
    const info = await stripeService.getSubscriptionInfo(userId)
    currentPlan.value = info?.plan || 'Gratuito'
    billingHistory.value = info?.invoices || []
  } catch (e) {
    currentPlan.value = session.value?.user?.user_metadata?.plan || 'Gratuito'
  }
}

onMounted(async () => {
  const ok = await ensureSupabaseSession()
  if (!ok) return
  await Promise.all([
    loadUsage(),
    loadAccount(),
    loadPlan()
  ])
})
</script>

<style scoped>
.settings {
  @apply p-6 space-y-6;
}

.settings-header {
  @apply bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm;
}

.header-content {
  @apply space-y-1;
}

.page-title {
  @apply text-2xl font-bold text-gray-900 dark:text-white;
}

.page-subtitle {
  @apply text-gray-600 dark:text-gray-300;
}

.settings-nav {
  @apply bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden;
}

.nav-tabs {
  @apply flex overflow-x-auto;
}

.nav-tab {
  @apply flex items-center space-x-2 px-6 py-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 whitespace-nowrap;
}

.nav-tab.active {
  @apply text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20 border-b-2 border-primary-600;
}

.tab-icon {
  @apply w-5 h-5;
}

.settings-content {
  @apply bg-white dark:bg-gray-800 rounded-xl shadow-sm;
}

.tab-content {
  @apply p-6 space-y-8;
}

.settings-section {
  @apply space-y-6;
}

.section-title {
  @apply text-lg font-semibold text-gray-900 dark:text-white;
}

.section-description {
  @apply text-gray-600 dark:text-gray-300;
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

.form-input {
  @apply w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-600 disabled:cursor-not-allowed;
}

.form-help {
  @apply text-sm text-gray-500 dark:text-gray-400;
}

.form-actions {
  @apply flex justify-end;
}

.preference-group {
  @apply space-y-4;
}

.preference-item {
  @apply flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg;
}

.preference-info {
  @apply flex-1;
}

.preference-title {
  @apply font-medium text-gray-900 dark:text-white;
}

.preference-description {
  @apply text-sm text-gray-600 dark:text-gray-300;
}

.preference-select {
  @apply px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent;
}

.toggle-switch {
  @apply relative inline-flex items-center cursor-pointer;
}

.toggle-input {
  @apply sr-only;
}

.toggle-slider {
  @apply w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full relative transition-colors duration-200;
}

.toggle-slider::before {
  @apply content-[''] absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200;
}

.toggle-input:checked + .toggle-slider {
  @apply bg-primary-600;
}

.toggle-input:checked + .toggle-slider::before {
  @apply transform translate-x-5;
}

.current-plan {
  @apply border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-6;
}

.plan-info {
  @apply text-center space-y-2;
}

.plan-badge {
  @apply inline-block px-3 py-1 text-xs font-medium rounded-full;
}

.badge-free {
  @apply bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200;
}

.badge-basic {
  @apply bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200;
}

.badge-professional {
  @apply bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200;
}

.badge-enterprise {
  @apply bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200;
}

.plan-name {
  @apply text-xl font-semibold text-gray-900 dark:text-white;
}

.plan-price {
  @apply text-2xl font-bold text-gray-900 dark:text-white;
}

.plan-period {
  @apply text-sm font-normal text-gray-600 dark:text-gray-300;
}

.plan-usage {
  @apply space-y-4;
}

.usage-item {
  @apply space-y-2;
}

.usage-label {
  @apply text-sm font-medium text-gray-700 dark:text-gray-300;
}

.usage-bar {
  @apply w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2;
}

.usage-progress {
  @apply bg-primary-600 h-2 rounded-full transition-all duration-300;
}

.usage-text {
  @apply text-sm text-gray-600 dark:text-gray-300;
}

.plan-actions {
  @apply flex items-center justify-center space-x-4;
}

.billing-history {
  @apply space-y-4;
}

.history-list {
  @apply space-y-2;
}

.history-item {
  @apply flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg;
}

.invoice-info {
  @apply flex items-center space-x-4;
}

.invoice-date {
  @apply text-sm text-gray-600 dark:text-gray-300;
}

.invoice-amount {
  @apply font-medium text-gray-900 dark:text-white;
}

.invoice-status {
  @apply px-2 py-1 text-xs font-medium rounded-full;
}

.status-paid {
  @apply bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200;
}

.status-pending {
  @apply bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200;
}

.status-failed {
  @apply bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200;
}

.download-btn {
  @apply p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200;
}

.download-btn svg {
  @apply w-5 h-5;
}

.empty-history {
  @apply text-center py-8 text-gray-500 dark:text-gray-400;
}

.security-options {
  @apply space-y-4;
}

.security-item {
  @apply flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg;
}

.security-info {
  @apply flex-1;
}

.security-title {
  @apply font-medium text-gray-900 dark:text-white;
}

.security-description {
  @apply text-sm text-gray-600 dark:text-gray-300;
}

.security-action {
  @apply flex-shrink-0;
}

.danger-zone {
  @apply border-2 border-red-200 dark:border-red-800 rounded-lg p-6;
}

.danger-actions {
  @apply space-y-4;
}

.danger-item {
  @apply flex items-center justify-between p-4 bg-red-50 dark:bg-red-900 dark:bg-opacity-20 border border-red-200 dark:border-red-800 rounded-lg;
}

.danger-info {
  @apply flex-1;
}

.danger-title {
  @apply font-medium text-red-900 dark:text-red-200;
}

.danger-description {
  @apply text-sm text-red-700 dark:text-red-300;
}

/* Buttons */
.btn-primary {
  @apply flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200;
}

.btn-secondary {
  @apply px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200;
}

.btn-danger {
  @apply px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200;
}

/* Responsive */
@media (max-width: 768px) {
  .settings {
    @apply p-4 space-y-4;
  }
  
  .form-grid {
    @apply grid-cols-1;
  }
  
  .preference-item,
  .security-item,
  .danger-item {
    @apply flex-col items-start space-y-3;
  }
  
  .plan-actions {
    @apply flex-col space-y-2 space-x-0;
  }
  
  .invoice-info {
    @apply flex-col items-start space-y-1 space-x-0;
  }
  
  .history-item {
    @apply flex-col items-start space-y-3;
  }
}
</style>