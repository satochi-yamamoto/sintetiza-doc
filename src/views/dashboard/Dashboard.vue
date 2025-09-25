<template>
  <div class="dashboard">
    <!-- Header -->
    <div class="dashboard-header">
      <div class="header-content">
        <div class="header-left">
          <h1 class="dashboard-title">
            Olá, {{ getUserName || 'Usuário' }}! 👋
          </h1>
          <p class="dashboard-subtitle">
            Bem-vindo ao seu painel de controle
          </p>
        </div>
        
        <div class="header-right">
          <div class="plan-badge" :class="planBadgeClass">
            <svg class="plan-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
            </svg>
            <span>{{ currentPlan }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon documents">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ stats.totalDocuments }}</div>
          <div class="stat-label">Documentos</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon summaries">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ stats.totalSummaries }}</div>
          <div class="stat-label">Resumos</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon usage">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ stats.monthlyUsage }}</div>
          <div class="stat-label">Uso Mensal</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon storage">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="6" rx="2" stroke="currentColor" stroke-width="2" />
            <rect x="3" y="14" width="18" height="6" rx="2" stroke="currentColor" stroke-width="2" />
            <circle cx="7" cy="7" r="1" fill="currentColor" />
            <circle cx="7" cy="17" r="1" fill="currentColor" />
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ formatStorage(stats.storageUsed) }}</div>
          <div class="stat-label">Armazenamento</div>
        </div>
      </div>
    </div>
    
    <!-- Quick Actions -->
    <div class="quick-actions">
      <h2 class="section-title">Ações Rápidas</h2>
      
      <div class="actions-grid">
        <button @click="showUploadModal = true" class="action-card upload">
          <div class="action-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7 10l5-5 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 5v10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="action-content">
            <h3 class="action-title">Upload de Documento</h3>
            <p class="action-description">Envie PDF, DOCX ou TXT</p>
          </div>
        </button>
        
        <router-link to="/dashboard/documentos" class="action-card documents">
          <div class="action-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="action-content">
            <h3 class="action-title">Meus Documentos</h3>
            <p class="action-description">Gerencie seus arquivos</p>
          </div>
        </router-link>
        
        <router-link to="/dashboard/resumos" class="action-card summaries">
          <div class="action-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <div class="action-content">
            <h3 class="action-title">Meus Resumos</h3>
            <p class="action-description">Visualize e exporte</p>
          </div>
        </router-link>
        
        <router-link to="/dashboard/cobranca" class="action-card billing">
          <div class="action-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="action-content">
            <h3 class="action-title">Upgrade de Plano</h3>
            <p class="action-description">Mais recursos disponíveis</p>
          </div>
        </router-link>
      </div>
    </div>
    
    <!-- Recent Activity -->
    <div class="recent-activity">
      <div class="section-header">
        <h2 class="section-title">Atividade Recente</h2>
        <router-link to="/dashboard/documentos" class="view-all-link">
          Ver todos
        </router-link>
      </div>
      
      <div class="activity-list" v-if="recentActivity.length > 0">
        <div 
          v-for="activity in recentActivity" 
          :key="activity.id"
          class="activity-item"
        >
          <div class="activity-icon" :class="activity.type">
            <svg v-if="activity.type === 'upload'" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
            <svg v-else-if="activity.type === 'summary'" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <svg v-else viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          
          <div class="activity-content">
            <div class="activity-title">{{ activity.title }}</div>
            <div class="activity-description">{{ activity.description }}</div>
          </div>
          
          <div class="activity-time">
            {{ formatTime(activity.createdAt) }}
          </div>
        </div>
      </div>
      
      <div v-else class="empty-activity">
        <div class="empty-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <h3 class="empty-title">Nenhuma atividade ainda</h3>
        <p class="empty-description">
          Comece fazendo upload de um documento para ver sua atividade aqui.
        </p>
        <button @click="showUploadModal = true" class="empty-action">
          Fazer primeiro upload
        </button>
      </div>
    </div>
    
    <!-- Upload Modal -->
    <div v-if="showUploadModal" class="modal-overlay" @click="closeUploadModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">Upload de Documento</h3>
          <button @click="closeUploadModal" class="modal-close">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div class="modal-body">
          <FileUpload @upload-complete="handleUploadComplete" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'

import { useAppStore } from '@/stores/app'
import { supabase } from '@/services/supabase'
import { useToast } from 'vue-toastification'
import FileUpload from '@/components/FileUpload.vue'

// Estado de sessão Supabase
const session = ref(null)
const uid = ref(null)

const appStore = useAppStore()
const toast = useToast()

// Refs
const showUploadModal = ref(false)
const isLoading = ref(false)

// Dados
const stats = reactive({
  totalDocuments: 0,
  totalSummaries: 0,
  monthlyUsage: 0,
  storageUsed: 0
})

const recentActivity = ref([])

// Garantir sessão do Supabase (sem Clerk)
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

// Computed
const currentPlan = computed(() => {
  // Tenta obter do user_metadata ou fallback do store
  return (
    session.value?.user?.user_metadata?.plan || appStore?.plan || 'Gratuito'
  )
})

const planBadgeClass = computed(() => {
  const plan = (currentPlan.value || 'Gratuito').toLowerCase()
  return {
    'plan-free': plan === 'gratuito' || plan === 'free',
    'plan-basic': plan === 'básico' || plan === 'basic',
    'plan-pro': plan === 'profissional' || plan === 'professional',
    'plan-enterprise': plan === 'empresarial' || plan === 'enterprise'
  }
})

const getUserName = computed(() => {
  const u = session.value?.user
  if (!u) return null
  const meta = u.user_metadata || {}
  const firstName = meta.firstName || meta.first_name
  const lastName = meta.lastName || meta.last_name
  const fullName = meta.fullName || meta.full_name
  const emailName = (u.email || '').split('@')[0]

  if (firstName) return lastName ? `${firstName} ${lastName}` : firstName
  if (fullName) return fullName
  if (emailName) return emailName
  return null
})

// Métodos
const loadDashboardData = async () => {
  try {
    isLoading.value = true
    appStore.setLoading(true)

    // Garante sessão e UID
    const ready = await ensureSupabaseSession()
    if (!ready) {
      console.log('Sessão do Supabase não pronta, abortando carregamento do dashboard')
      return
    }

    // Carregar estatísticas e atividade
    await Promise.all([
      loadStats(),
      loadRecentActivity()
    ])
  } catch (error) {
    console.error('Erro ao carregar dados do dashboard:', error)
    toast.error('Erro ao carregar dados do dashboard')
  } finally {
    isLoading.value = false
    appStore.setLoading(false)
  }
}

const loadStats = async () => {
  try {
    const userId = uid.value
    if (!userId) return

    const { count: documentsCount } = await supabase
      .from('documents')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)

    const { count: summariesCount } = await supabase
      .from('summaries')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)

    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const { count: monthlyCount } = await supabase
      .from('summaries')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('created_at', startOfMonth.toISOString())

    const { data: documents } = await supabase
      .from('documents')
      .select('file_size')
      .eq('user_id', userId)

    const totalStorage = documents?.reduce((sum, doc) => sum + (doc.file_size || 0), 0) || 0

    stats.totalDocuments = documentsCount || 0
    stats.totalSummaries = summariesCount || 0
    stats.monthlyUsage = monthlyCount || 0
    stats.storageUsed = totalStorage
  } catch (error) {
    console.error('Erro ao carregar estatísticas:', error)
  }
}

const loadRecentActivity = async () => {
  try {
    const userId = uid.value
    if (!userId) return

    const { data: documents } = await supabase
      .from('documents')
      .select('id, name, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(3)

    const { data: summaries } = await supabase
      .from('summaries')
      .select('id, title, created_at, document:documents(name)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(3)

    const activities = []
    documents?.forEach(doc => {
      activities.push({
        id: `doc-${doc.id}`,
        type: 'upload',
        title: 'Documento enviado',
        description: doc.name,
        createdAt: doc.created_at
      })
    })
    summaries?.forEach(summary => {
      activities.push({
        id: `summary-${summary.id}`,
        type: 'summary',
        title: 'Resumo gerado',
        description: summary.title || summary.document?.name || 'Documento',
        createdAt: summary.created_at
      })
    })

    recentActivity.value = activities
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
  } catch (error) {
    console.error('Erro ao carregar atividade recente:', error)
  }
}

// Formatação
const formatStorage = (bytes) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInHours = (now - date) / (1000 * 60 * 60)
  if (diffInHours < 1) return 'Agora há pouco'
  if (diffInHours < 24) return `${Math.floor(diffInHours)}h atrás`
  if (diffInHours < 48) return 'Ontem'
  return date.toLocaleDateString('pt-BR')
}

const closeUploadModal = () => {
  showUploadModal.value = false
}

const handleUploadComplete = () => {
  closeUploadModal()
  loadDashboardData()
  toast.success('Upload concluído com sucesso!')
}

// Watchers (usando UID do Supabase)
watch(uid, async (newUid) => {
  if (newUid) {
    await loadDashboardData()
  }
})

// Lifecycle
onMounted(async () => {
  await ensureSupabaseSession()
  if (uid.value) {
    await loadDashboardData()
  }
})
</script>

<style scoped>
.dashboard {
  @apply p-6 space-y-8;
}

.dashboard-header {
  @apply bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm;
}

.header-content {
  @apply flex items-center justify-between;
}

.header-left {
  @apply space-y-1;
}

.dashboard-title {
  @apply text-2xl font-bold text-gray-900 dark:text-white;
}

.dashboard-subtitle {
  @apply text-gray-600 dark:text-gray-300;
}

.header-right {
  @apply flex items-center space-x-4;
}

.plan-badge {
  @apply flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium;
}

.plan-free {
  @apply bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200;
}

.plan-basic {
  @apply bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200;
}

.plan-pro {
  @apply bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200;
}

.plan-enterprise {
  @apply bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200;
}

.plan-icon {
  @apply w-4 h-4;
}

.stats-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6;
}

.stat-card {
  @apply bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm flex items-center space-x-4;
}

.stat-icon {
  @apply w-12 h-12 rounded-lg flex items-center justify-center;
}

.stat-icon.documents {
  @apply bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400;
}

.stat-icon.summaries {
  @apply bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400;
}

.stat-icon.usage {
  @apply bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400;
}

.stat-icon.storage {
  @apply bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400;
}

.stat-icon svg {
  @apply w-6 h-6;
}

.stat-content {
  @apply flex-1;
}

.stat-number {
  @apply text-2xl font-bold text-gray-900 dark:text-white;
}

.stat-label {
  @apply text-sm text-gray-600 dark:text-gray-300;
}

.quick-actions,
.recent-activity {
  @apply bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm;
}

.section-title {
  @apply text-lg font-semibold text-gray-900 dark:text-white mb-4;
}

.section-header {
  @apply flex items-center justify-between mb-4;
}

.view-all-link {
  @apply text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 text-sm font-medium;
}

.actions-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4;
}

.action-card {
  @apply flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200 cursor-pointer;
}

.action-icon {
  @apply w-10 h-10 rounded-lg flex items-center justify-center;
}

.action-card.upload .action-icon {
  @apply bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400;
}

.action-card.documents .action-icon {
  @apply bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400;
}

.action-card.summaries .action-icon {
  @apply bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400;
}

.action-card.billing .action-icon {
  @apply bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400;
}

.action-icon svg {
  @apply w-5 h-5;
}

.action-content {
  @apply flex-1;
}

.action-title {
  @apply font-medium text-gray-900 dark:text-white;
}

.action-description {
  @apply text-sm text-gray-600 dark:text-gray-300;
}

.activity-list {
  @apply space-y-4;
}

.activity-item {
  @apply flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg;
}

.activity-icon {
  @apply w-8 h-8 rounded-full flex items-center justify-center;
}

.activity-icon.upload {
  @apply bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400;
}

.activity-icon.summary {
  @apply bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400;
}

.activity-icon svg {
  @apply w-4 h-4;
}

.activity-content {
  @apply flex-1;
}

.activity-title {
  @apply font-medium text-gray-900 dark:text-white;
}

.activity-description {
  @apply text-sm text-gray-600 dark:text-gray-300;
}

.activity-time {
  @apply text-xs text-gray-500 dark:text-gray-400;
}

.empty-activity {
  @apply text-center py-12;
}

.empty-icon {
  @apply flex justify-center mb-4;
}

.empty-icon svg {
  @apply w-12 h-12 text-gray-400 dark:text-gray-500;
}

.empty-title {
  @apply text-lg font-medium text-gray-900 dark:text-white mb-2;
}

.empty-description {
  @apply text-gray-600 dark:text-gray-300 mb-4;
}

.empty-action {
  @apply px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200;
}

.modal-overlay {
  @apply fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4;
}

.modal-content {
  @apply bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden;
}

.modal-header {
  @apply flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700;
}

.modal-title {
  @apply text-lg font-semibold text-gray-900 dark:text-white;
}

.modal-close {
  @apply p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200;
}

.modal-close svg {
  @apply w-5 h-5;
}

.modal-body {
  @apply p-6;
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard {
    @apply p-4 space-y-6;
  }
  
  .header-content {
    @apply flex-col items-start space-y-4;
  }
  
  .stats-grid {
    @apply grid-cols-2;
  }
  
  .actions-grid {
    @apply grid-cols-1;
  }
}
</style>