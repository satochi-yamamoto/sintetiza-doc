<template>
  <div class="settings">
    <!-- Header -->
    <div class="settings-header">
      <div class="header-content">
        <h1 class="page-title">Configurações</h1>
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
          @click="activeTab = tab.id"
          :class="{ active: activeTab === tab.id }"
          class="nav-tab"
        >
          <component :is="tab.icon" class="tab-icon" />
          <span>{{ tab.label }}</span>
        </button>
      </nav>
    </div>
    
    <!-- Settings Content -->
    <div class="settings-content">
      <!-- Account Tab -->
      <div v-if="activeTab === 'account'" class="tab-content">
        <div class="settings-section">
          <h2 class="section-title">Informações da Conta</h2>
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
              <p class="form-help">O email não pode ser alterado</p>
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
            <button @click="updateAccount" :disabled="isUpdatingAccount" class="btn-primary">
              <LoadingSpinner v-if="isUpdatingAccount" :show="true" size="sm" />
              <span v-else>Salvar alterações</span>
            </button>
          </div>
        </div>
        
        <div class="settings-section">
          <h2 class="section-title">Alterar Senha</h2>
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
            <button @click="updatePassword" :disabled="isUpdatingPassword" class="btn-primary">
              <LoadingSpinner v-if="isUpdatingPassword" :show="true" size="sm" />
              <span v-else>Alterar senha</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Preferences Tab -->
      <div v-if="activeTab === 'preferences'" class="tab-content">
        <div class="settings-section">
          <h2 class="section-title">Preferências Gerais</h2>
          <p class="section-description">
            Configure suas preferências de uso da aplicação
          </p>
          
          <div class="preference-group">
            <div class="preference-item">
              <div class="preference-info">
                <h3 class="preference-title">Idioma padrão</h3>
                <p class="preference-description">Idioma usado para gerar resumos</p>
              </div>
              <select v-model="preferences.defaultLanguage" class="preference-select">
                <option value="pt">Português</option>
                <option value="en">Inglês</option>
              </select>
            </div>
            
            <div class="preference-item">
              <div class="preference-info">
                <h3 class="preference-title">Estilo de resumo padrão</h3>
                <p class="preference-description">Estilo aplicado automaticamente aos novos resumos</p>
              </div>
              <select v-model="preferences.defaultStyle" class="preference-select">
                <option value="standard">Padrão</option>
                <option value="executive">Executivo</option>
                <option value="technical">Técnico</option>
                <option value="educational">Educacional</option>
              </select>
            </div>
            
            <div class="preference-item">
              <div class="preference-info">
                <h3 class="preference-title">Tamanho de resumo padrão</h3>
                <p class="preference-description">Extensão padrão dos resumos gerados</p>
              </div>
              <select v-model="preferences.defaultSize" class="preference-select">
                <option value="short">Curto</option>
                <option value="medium">Médio</option>
                <option value="long">Longo</option>
              </select>
            </div>
            
            <div class="preference-item">
              <div class="preference-info">
                <h3 class="preference-title">Tema da interface</h3>
                <p class="preference-description">Aparência da aplicação</p>
              </div>
              <select v-model="preferences.theme" class="preference-select">
                <option value="light">Claro</option>
                <option value="dark">Escuro</option>
                <option value="system">Sistema</option>
              </select>
            </div>
          </div>
          
          <div class="form-actions">
            <button @click="updatePreferences" :disabled="isUpdatingPreferences" class="btn-primary">
              <LoadingSpinner v-if="isUpdatingPreferences" :show="true" size="sm" />
              <span v-else>Salvar preferências</span>
            </button>
          </div>
        </div>
        
        <div class="settings-section">
          <h2 class="section-title">Configurações de Upload</h2>
          <p class="section-description">
            Configure como os arquivos são processados
          </p>
          
          <div class="preference-group">
            <div class="preference-item">
              <div class="preference-info">
                <h3 class="preference-title">Processamento automático</h3>
                <p class="preference-description">Gerar resumo automaticamente após upload</p>
              </div>
              <label class="toggle-switch">
                <input 
                  v-model="preferences.autoProcess" 
                  type="checkbox" 
                  class="toggle-input"
                >
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="preference-item">
              <div class="preference-info">
                <h3 class="preference-title">Manter arquivos originais</h3>
                <p class="preference-description">Armazenar cópia dos documentos enviados</p>
              </div>
              <label class="toggle-switch">
                <input 
                  v-model="preferences.keepOriginals" 
                  type="checkbox" 
                  class="toggle-input"
                >
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="preference-item">
              <div class="preference-info">
                <h3 class="preference-title">Tamanho máximo de arquivo</h3>
                <p class="preference-description">Limite para upload de documentos</p>
              </div>
              <select v-model="preferences.maxFileSize" class="preference-select">
                <option value="5">5 MB</option>
                <option value="10">10 MB</option>
                <option value="25">25 MB</option>
                <option value="50">50 MB</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Notifications Tab -->
      <div v-if="activeTab === 'notifications'" class="tab-content">
        <div class="settings-section">
          <h2 class="section-title">Notificações por Email</h2>
          <p class="section-description">
            Configure quando e como receber notificações
          </p>
          
          <div class="preference-group">
            <div class="preference-item">
              <div class="preference-info">
                <h3 class="preference-title">Resumos concluídos</h3>
                <p class="preference-description">Receber email quando um resumo for gerado</p>
              </div>
              <label class="toggle-switch">
                <input 
                  v-model="notifications.summaryCompleted" 
                  type="checkbox" 
                  class="toggle-input"
                >
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="preference-item">
              <div class="preference-info">
                <h3 class="preference-title">Limite de plano atingido</h3>
                <p class="preference-description">Avisar quando atingir o limite do plano</p>
              </div>
              <label class="toggle-switch">
                <input 
                  v-model="notifications.planLimitReached" 
                  type="checkbox" 
                  class="toggle-input"
                >
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="preference-item">
              <div class="preference-info">
                <h3 class="preference-title">Novidades e atualizações</h3>
                <p class="preference-description">Receber informações sobre novas funcionalidades</p>
              </div>
              <label class="toggle-switch">
                <input 
                  v-model="notifications.productUpdates" 
                  type="checkbox" 
                  class="toggle-input"
                >
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="preference-item">
              <div class="preference-info">
                <h3 class="preference-title">Newsletter semanal</h3>
                <p class="preference-description">Dicas e melhores práticas de uso</p>
              </div>
              <label class="toggle-switch">
                <input 
                  v-model="notifications.newsletter" 
                  type="checkbox" 
                  class="toggle-input"
                >
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
          
          <div class="form-actions">
            <button @click="updateNotifications" :disabled="isUpdatingNotifications" class="btn-primary">
              <LoadingSpinner v-if="isUpdatingNotifications" :show="true" size="sm" />
              <span v-else>Salvar configurações</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Subscription Tab -->
      <div v-if="activeTab === 'subscription'" class="tab-content">
        <div class="settings-section">
          <h2 class="section-title">Plano Atual</h2>
          <p class="section-description">
            Gerencie sua assinatura e faturamento
          </p>
          
          <div class="current-plan">
            <div class="plan-info">
              <div class="plan-badge" :class="getPlanBadgeClass(currentPlan?.name)">
                {{ getPlanLabel(currentPlan?.name) }}
              </div>
              <h3 class="plan-name">{{ getPlanLabel(currentPlan?.name) }}</h3>
              <p class="plan-price">
                {{ formatPrice(currentPlan?.price) }}
                <span class="plan-period">{{ currentPlan?.interval === 'month' ? '/mês' : '/ano' }}</span>
              </p>
            </div>
            
            <div class="plan-usage">
              <div class="usage-item">
                <span class="usage-label">Documentos processados</span>
                <div class="usage-bar">
                  <div class="usage-progress" :style="{ width: getUsagePercentage('documents') + '%' }"></div>
                </div>
                <span class="usage-text">{{ usage.documents }} / {{ currentPlan?.limits?.documents || '∞' }}</span>
              </div>
              
              <div class="usage-item">
                <span class="usage-label">Resumos gerados</span>
                <div class="usage-bar">
                  <div class="usage-progress" :style="{ width: getUsagePercentage('summaries') + '%' }"></div>
                </div>
                <span class="usage-text">{{ usage.summaries }} / {{ currentPlan?.limits?.summaries || '∞' }}</span>
              </div>
              
              <div class="usage-item">
                <span class="usage-label">Armazenamento</span>
                <div class="usage-bar">
                  <div class="usage-progress" :style="{ width: getUsagePercentage('storage') + '%' }"></div>
                </div>
                <span class="usage-text">{{ formatStorage(usage.storage) }} / {{ formatStorage(currentPlan?.limits?.storage) }}</span>
              </div>
            </div>
            
            <div class="plan-actions">
              <button v-if="currentPlan?.name !== 'enterprise'" @click="upgradePlan" class="btn-primary">
                Fazer upgrade
              </button>
              <button @click="manageBilling" class="btn-secondary">
                Gerenciar faturamento
              </button>
            </div>
          </div>
        </div>
        
        <div v-if="currentPlan?.name !== 'free'" class="settings-section">
          <h2 class="section-title">Histórico de Faturamento</h2>
          <p class="section-description">
            Visualize suas faturas e histórico de pagamentos
          </p>
          
          <div class="billing-history">
            <div v-if="billingHistory.length > 0" class="history-list">
              <div v-for="invoice in billingHistory" :key="invoice.id" class="history-item">
                <div class="invoice-info">
                  <span class="invoice-date">{{ formatDate(invoice.created) }}</span>
                  <span class="invoice-amount">{{ formatPrice(invoice.amount_paid / 100) }}</span>
                  <span class="invoice-status" :class="getInvoiceStatusClass(invoice.status)">
                    {{ getInvoiceStatusLabel(invoice.status) }}
                  </span>
                </div>
                <button @click="downloadInvoice(invoice)" class="download-btn">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            <div v-else class="empty-history">
              <p>Nenhuma fatura encontrada</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Security Tab -->
      <div v-if="activeTab === 'security'" class="tab-content">
        <div class="settings-section">
          <h2 class="section-title">Segurança da Conta</h2>
          <p class="section-description">
            Configure opções de segurança e privacidade
          </p>
          
          <div class="security-options">
            <div class="security-item">
              <div class="security-info">
                <h3 class="security-title">Autenticação de dois fatores</h3>
                <p class="security-description">Adicione uma camada extra de segurança</p>
              </div>
              <div class="security-action">
                <button v-if="!twoFactorEnabled" @click="enableTwoFactor" class="btn-primary">
                  Ativar 2FA
                </button>
                <button v-else @click="disableTwoFactor" class="btn-secondary">
                  Desativar 2FA
                </button>
              </div>
            </div>
            
            <div class="security-item">
              <div class="security-info">
                <h3 class="security-title">Sessões ativas</h3>
                <p class="security-description">Gerencie dispositivos conectados à sua conta</p>
              </div>
              <div class="security-action">
                <button @click="viewActiveSessions" class="btn-secondary">
                  Ver sessões
                </button>
              </div>
            </div>
            
            <div class="security-item">
              <div class="security-info">
                <h3 class="security-title">Log de atividades</h3>
                <p class="security-description">Histórico de ações realizadas na conta</p>
              </div>
              <div class="security-action">
                <button @click="viewActivityLog" class="btn-secondary">
                  Ver atividades
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="settings-section danger-zone">
          <h2 class="section-title">Zona de Perigo</h2>
          <p class="section-description">
            Ações irreversíveis que afetam permanentemente sua conta
          </p>
          
          <div class="danger-actions">
            <div class="danger-item">
              <div class="danger-info">
                <h3 class="danger-title">Excluir todos os dados</h3>
                <p class="danger-description">Remove permanentemente todos os documentos e resumos</p>
              </div>
              <button @click="deleteAllData" class="btn-danger">
                Excluir dados
              </button>
            </div>
            
            <div class="danger-item">
              <div class="danger-info">
                <h3 class="danger-title">Excluir conta</h3>
                <p class="danger-description">Remove permanentemente sua conta e todos os dados</p>
              </div>
              <button @click="deleteAccount" class="btn-danger">
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
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'
import { supabase } from '@/services/supabase'
import { stripeService } from '@/services/stripe'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

// Icons (inline components)
const UserIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>`
}

const CogIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>`
}

const BellIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></svg>`
}

const CreditCardIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" /></svg>`
}

const ShieldIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>`
}

// Composables
const authStore = useAuthStore()
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

const notifications = reactive({
  summaryCompleted: true,
  planLimitReached: true,
  productUpdates: false,
  newsletter: false
})

// Tabs configuration
const tabs = [
  { id: 'account', label: 'Conta', icon: UserIcon },
  { id: 'preferences', label: 'Preferências', icon: CogIcon },
  { id: 'notifications', label: 'Notificações', icon: BellIcon },
  { id: 'subscription', label: 'Assinatura', icon: CreditCardIcon },
  { id: 'security', label: 'Segurança', icon: ShieldIcon }
]

// Methods
const loadUserData = async () => {
  try {
    const userId = authStore.user?.id
    if (!userId) return
    
    // Load user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (profile) {
      accountForm.name = profile.name || ''
      accountForm.email = authStore.user.email || ''
      accountForm.phone = profile.phone || ''
      accountForm.company = profile.company || ''
      
      // Load preferences
      Object.assign(preferences, profile.preferences || {})
      Object.assign(notifications, profile.notifications || {})
    }
    
    // Load subscription info
    await loadSubscriptionData()
    
  } catch (error) {
    console.error('Erro ao carregar dados do usuário:', error)
  }
}

const loadSubscriptionData = async () => {
  try {
    const planInfo = await stripeService.getCurrentPlan()
    currentPlan.value = planInfo
    
    // Load usage data
    const usageData = await stripeService.getUsage()
    usage.value = usageData
    
    // Load billing history
    if (planInfo.name !== 'free') {
      const history = await stripeService.getBillingHistory()
      billingHistory.value = history
    }
    
  } catch (error) {
    console.error('Erro ao carregar dados de assinatura:', error)
  }
}

const updateAccount = async () => {
  try {
    isUpdatingAccount.value = true
    
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: authStore.user.id,
        name: accountForm.name,
        phone: accountForm.phone,
        company: accountForm.company,
        updated_at: new Date().toISOString()
      })
    
    if (error) throw error
    
    toast.success('Informações atualizadas com sucesso')
    
  } catch (error) {
    console.error('Erro ao atualizar conta:', error)
    toast.error('Erro ao atualizar informações')
  } finally {
    isUpdatingAccount.value = false
  }
}

const updatePassword = async () => {
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    toast.error('As senhas não coincidem')
    return
  }
  
  if (passwordForm.newPassword.length < 6) {
    toast.error('A nova senha deve ter pelo menos 6 caracteres')
    return
  }
  
  try {
    isUpdatingPassword.value = true
    
    const { error } = await supabase.auth.updateUser({
      password: passwordForm.newPassword
    })
    
    if (error) throw error
    
    // Clear form
    passwordForm.currentPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''
    
    toast.success('Senha alterada com sucesso')
    
  } catch (error) {
    console.error('Erro ao alterar senha:', error)
    toast.error('Erro ao alterar senha')
  } finally {
    isUpdatingPassword.value = false
  }
}

const updatePreferences = async () => {
  try {
    isUpdatingPreferences.value = true
    
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: authStore.user.id,
        preferences: preferences,
        updated_at: new Date().toISOString()
      })
    
    if (error) throw error
    
    // Update app theme if changed
    if (preferences.theme !== appStore.theme) {
      appStore.setTheme(preferences.theme)
    }
    
    toast.success('Preferências salvas com sucesso')
    
  } catch (error) {
    console.error('Erro ao salvar preferências:', error)
    toast.error('Erro ao salvar preferências')
  } finally {
    isUpdatingPreferences.value = false
  }
}

const updateNotifications = async () => {
  try {
    isUpdatingNotifications.value = true
    
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: authStore.user.id,
        notifications: notifications,
        updated_at: new Date().toISOString()
      })
    
    if (error) throw error
    
    toast.success('Configurações de notificação salvas')
    
  } catch (error) {
    console.error('Erro ao salvar notificações:', error)
    toast.error('Erro ao salvar configurações')
  } finally {
    isUpdatingNotifications.value = false
  }
}

const upgradePlan = async () => {
  try {
    const checkoutUrl = await stripeService.createCheckoutSession('basic')
    window.location.href = checkoutUrl
  } catch (error) {
    console.error('Erro ao iniciar upgrade:', error)
    toast.error('Erro ao processar upgrade')
  }
}

const manageBilling = async () => {
  try {
    const portalUrl = await stripeService.createCustomerPortalSession()
    window.location.href = portalUrl
  } catch (error) {
    console.error('Erro ao abrir portal:', error)
    toast.error('Erro ao acessar portal de faturamento')
  }
}

const enableTwoFactor = () => {
  // Implement 2FA setup
  toast.info('Funcionalidade em desenvolvimento')
}

const disableTwoFactor = () => {
  // Implement 2FA disable
  toast.info('Funcionalidade em desenvolvimento')
}

const viewActiveSessions = () => {
  // Implement active sessions view
  toast.info('Funcionalidade em desenvolvimento')
}

const viewActivityLog = () => {
  // Implement activity log view
  toast.info('Funcionalidade em desenvolvimento')
}

const deleteAllData = async () => {
  if (!confirm('Tem certeza que deseja excluir TODOS os seus dados? Esta ação não pode ser desfeita.')) {
    return
  }
  
  try {
    // Delete all user data
    await supabase.from('summaries').delete().eq('user_id', authStore.user.id)
    await supabase.from('documents').delete().eq('user_id', authStore.user.id)
    
    toast.success('Todos os dados foram excluídos')
    router.push('/dashboard')
    
  } catch (error) {
    console.error('Erro ao excluir dados:', error)
    toast.error('Erro ao excluir dados')
  }
}

const deleteAccount = async () => {
  if (!confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
    return
  }
  
  const confirmation = prompt('Digite "EXCLUIR" para confirmar:')
  if (confirmation !== 'EXCLUIR') {
    return
  }
  
  try {
    // Delete account and all data
    await deleteAllData()
    await authStore.signOut()
    
    toast.success('Conta excluída com sucesso')
    router.push('/')
    
  } catch (error) {
    console.error('Erro ao excluir conta:', error)
    toast.error('Erro ao excluir conta')
  }
}

const downloadInvoice = async (invoice) => {
  try {
    // Download invoice PDF
    const url = invoice.invoice_pdf
    const link = document.createElement('a')
    link.href = url
    link.download = `fatura-${invoice.number}.pdf`
    link.click()
  } catch (error) {
    console.error('Erro ao baixar fatura:', error)
    toast.error('Erro ao baixar fatura')
  }
}

// Utility functions
const getPlanLabel = (planName) => {
  const labels = {
    free: 'Gratuito',
    basic: 'Básico',
    professional: 'Profissional',
    enterprise: 'Empresarial'
  }
  return labels[planName] || 'Desconhecido'
}

const getPlanBadgeClass = (planName) => {
  return {
    'badge-free': planName === 'free',
    'badge-basic': planName === 'basic',
    'badge-professional': planName === 'professional',
    'badge-enterprise': planName === 'enterprise'
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price / 100)
}

const formatStorage = (bytes) => {
  if (!bytes) return '0 MB'
  const mb = bytes / (1024 * 1024)
  return `${mb.toFixed(1)} MB`
}

const getUsagePercentage = (type) => {
  const current = usage.value[type]
  const limit = currentPlan.value?.limits?.[type]
  
  if (!limit || limit === 'unlimited') return 0
  return Math.min((current / limit) * 100, 100)
}

const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString('pt-BR')
}

const getInvoiceStatusClass = (status) => {
  return {
    'status-paid': status === 'paid',
    'status-pending': status === 'open',
    'status-failed': status === 'uncollectible'
  }
}

const getInvoiceStatusLabel = (status) => {
  const labels = {
    paid: 'Pago',
    open: 'Pendente',
    uncollectible: 'Falhou'
  }
  return labels[status] || status
}

// Lifecycle
onMounted(() => {
  loadUserData()
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
  @apply text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 border-b-2 border-primary-600;
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
  @apply bg-gold-100 text-gold-800 dark:bg-gold-900 dark:text-gold-200;
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
  @apply flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg;
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