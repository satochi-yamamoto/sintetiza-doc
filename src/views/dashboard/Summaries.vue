<template>
  <div class="summaries">
    <!-- Header -->
    <div class="summaries-header">
      <div class="header-content">
        <div class="header-left">
          <h1 class="page-title">Meus Resumos</h1>
          <p class="page-subtitle">
            Visualize, gerencie e exporte todos os seus resumos
          </p>
        </div>
        
        <div class="header-right">
          <router-link to="/dashboard/documentos" class="new-summary-btn">
            <svg class="new-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            <span>Novo Resumo</span>
          </router-link>
        </div>
      </div>
    </div>
    
    <!-- Filters and Search -->
    <div class="filters-section">
      <div class="search-bar">
        <div class="search-input-wrapper">
          <svg class="search-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Buscar resumos..."
            class="search-input"
          >
        </div>
      </div>
      
      <div class="filter-controls">
        <select v-model="selectedStyle" class="filter-select">
          <option value="">Todos os estilos</option>
          <option value="standard">Padrão</option>
          <option value="executive">Executivo</option>
          <option value="technical">Técnico</option>
          <option value="educational">Educacional</option>
        </select>
        
        <select v-model="selectedLanguage" class="filter-select">
          <option value="">Todos os idiomas</option>
          <option value="pt">Português</option>
          <option value="en">Inglês</option>
        </select>
        
        <select v-model="sortBy" class="filter-select">
          <option value="created_at">Data de criação</option>
          <option value="title">Título</option>
          <option value="updated_at">Última modificação</option>
        </select>
        
        <button @click="toggleSortOrder" class="sort-btn" :class="{ 'desc': sortOrder === 'desc' }">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
        
        <div class="view-toggle">
          <button 
            @click="viewMode = 'grid'" 
            :class="{ active: viewMode === 'grid' }"
            class="view-btn"
          >
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" fill="currentColor" />
            </svg>
          </button>
          <button 
            @click="viewMode = 'list'" 
            :class="{ active: viewMode === 'list' }"
            class="view-btn"
          >
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Summaries List/Grid -->
    <div class="summaries-content">
      <LoadingSpinner v-if="isLoading" :show="true" message="Carregando resumos..." />
      
      <div v-else-if="filteredSummaries.length > 0" :class="viewMode === 'grid' ? 'summaries-grid' : 'summaries-list'">
        <div 
          v-for="summary in filteredSummaries" 
          :key="summary.id"
          :class="viewMode === 'grid' ? 'summary-card' : 'summary-row'"
          @click="viewSummary(summary)"
        >
          <!-- Summary Icon -->
          <div class="summary-icon" :class="getStyleClass(summary.style)">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          
          <!-- Summary Info -->
          <div class="summary-info">
            <h3 class="summary-title" :title="summary.title">{{ summary.title || 'Resumo sem título' }}</h3>
            <div class="summary-meta">
              <span class="summary-style">{{ getStyleLabel(summary.style) }}</span>
              <span class="summary-language">{{ getLanguageLabel(summary.language) }}</span>
              <span class="summary-date">{{ formatDate(summary.created_at) }}</span>
              <span v-if="summary.document?.name" class="document-name">
                {{ summary.document.name }}
              </span>
            </div>
            <p v-if="viewMode === 'grid'" class="summary-preview">
              {{ truncateText(summary.content, 120) }}
            </p>
          </div>
          
          <!-- Summary Actions -->
          <div class="summary-actions" @click.stop>
            <button 
              @click="exportSummary(summary)" 
              class="action-btn export"
              title="Exportar"
            >
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            
            <button 
              @click="shareSummary(summary)" 
              class="action-btn share"
              title="Compartilhar"
            >
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
            </button>
            
            <button 
              @click="duplicateSummary(summary)" 
              class="action-btn duplicate"
              title="Duplicar"
            >
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
              </svg>
            </button>
            
            <button 
              @click="deleteSummary(summary)" 
              class="action-btn delete"
              title="Excluir"
            >
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clip-rule="evenodd" />
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-else class="empty-state">
        <div class="empty-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <h3 class="empty-title">
          {{ searchQuery ? 'Nenhum resumo encontrado' : 'Nenhum resumo ainda' }}
        </h3>
        <p class="empty-description">
          {{ searchQuery 
            ? 'Tente ajustar os filtros ou termos de busca.' 
            : 'Comece gerando seu primeiro resumo a partir de um documento.' 
          }}
        </p>
        <router-link v-if="!searchQuery" to="/dashboard/documentos" class="empty-action">
          Gerar primeiro resumo
        </router-link>
      </div>
    </div>
    
    <!-- Export Modal -->
    <ExportModal 
      v-if="showExportModal" 
      :summary="selectedSummary"
      @close="closeExportModal"
    />
    
    <!-- Summary Viewer Modal -->
    <div v-if="showViewerModal" class="modal-overlay" @click="closeViewerModal">
      <div class="modal-content large" @click.stop>
        <div class="modal-header">
          <div class="modal-title-section">
            <h3 class="modal-title">{{ selectedSummary?.title || 'Resumo' }}</h3>
            <div class="summary-badges">
              <span class="badge style" :class="getStyleClass(selectedSummary?.style)">
                {{ getStyleLabel(selectedSummary?.style) }}
              </span>
              <span class="badge language">
                {{ getLanguageLabel(selectedSummary?.language) }}
              </span>
            </div>
          </div>
          <button @click="closeViewerModal" class="modal-close">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="summary-content">
            <div class="content-text" v-html="formatContent(selectedSummary?.content)"></div>
          </div>
          
          <div class="modal-actions">
            <button @click="exportSummary(selectedSummary)" class="action-button export">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              Exportar
            </button>
            
            <button @click="shareSummary(selectedSummary)" class="action-button share">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              Compartilhar
            </button>
          </div>
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
import { useRouter } from 'vue-router'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ExportModal from '@/components/ExportModal.vue'

// Sessão Supabase
const session = ref(null)
const uid = ref(null)

const appStore = useAppStore()
const toast = useToast()
const router = useRouter()

// Refs
const isLoading = ref(false)
const showExportModal = ref(false)
const showViewerModal = ref(false)
const selectedSummary = ref(null)

// Filtros
const searchQuery = ref('')
const selectedStyle = ref('')
const selectedLanguage = ref('')
const sortBy = ref('created_at')
const sortOrder = ref('desc')
const viewMode = ref('grid')

// Dados
const summaries = ref([])

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

// Computed
const filteredSummaries = computed(() => {
  let filtered = [...summaries.value]
  
  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(summary => 
      summary.title?.toLowerCase().includes(query) ||
      summary.content?.toLowerCase().includes(query) ||
      summary.document?.name?.toLowerCase().includes(query)
    )
  }
  
  // Style filter
  if (selectedStyle.value) {
    filtered = filtered.filter(summary => summary.style === selectedStyle.value)
  }
  
  // Language filter
  if (selectedLanguage.value) {
    filtered = filtered.filter(summary => summary.language === selectedLanguage.value)
  }
  
  // Sort
  filtered.sort((a, b) => {
    let aValue = a[sortBy.value]
    let bValue = b[sortBy.value]
    
    if (sortBy.value === 'title') {
      aValue = (aValue || '').toLowerCase()
      bValue = (bValue || '').toLowerCase()
    }
    
    if (sortOrder.value === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })
  
  return filtered
})

// Métodos
const loadSummaries = async () => {
  try {
    isLoading.value = true
    const userId = uid.value
    if (!userId) return

    const { data, error } = await supabase
      .from('summaries')
      .select('id, title, content, style, language, created_at, document:documents(name)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error

    summaries.value = data || []
  } catch (error) {
    console.error('Erro ao carregar resumos:', error)
    toast.error('Erro ao carregar resumos')
  } finally {
    isLoading.value = false
  }
}

// Watchers
watch(uid, async (newUid) => {
  if (newUid) {
    await loadSummaries()
  }
})

// Lifecycle
onMounted(async () => {
  await ensureSupabaseSession()
  if (uid.value) {
    await loadSummaries()
  }
})
</script>
const viewSummary = (summary) => {
  selectedSummary.value = summary
  showViewerModal.value = true
}

const exportSummary = (summary) => {
  selectedSummary.value = summary
  showExportModal.value = true
}

const shareSummary = async (summary) => {
  try {
    // Create shareable link or copy to clipboard
    const shareUrl = `${window.location.origin}/dashboard/resumos/${summary.id}`
    
    if (navigator.share) {
      await navigator.share({
        title: summary.title || 'Resumo',
        text: truncateText(summary.content, 200),
        url: shareUrl
      })
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareUrl)
      toast.success('Link copiado para a área de transferência')
    }
    
  } catch (error) {
    console.error('Erro ao compartilhar:', error)
    toast.error('Erro ao compartilhar resumo')
  }
}

const duplicateSummary = async (summary) => {
  try {
    const { data, error } = await supabase
      .from('summaries')
      .insert({
        user_id: user.value?.id,
        document_id: summary.document_id,
        title: `${summary.title} (Cópia)`,
        content: summary.content,
        style: summary.style,
        language: summary.language,
        analysis_type: summary.analysis_type,
        size: summary.size
      })
      .select()
    
    if (error) throw error
    
    // Add to local list
    summaries.value.unshift(data[0])
    
    toast.success('Resumo duplicado com sucesso')
    
  } catch (error) {
    console.error('Erro ao duplicar resumo:', error)
    toast.error('Erro ao duplicar resumo')
  }
}

const deleteSummary = async (summary) => {
  if (!confirm(`Tem certeza que deseja excluir "${summary.title || 'este resumo'}"?`)) {
    return
  }
  
  try {
    const { error } = await supabase
      .from('summaries')
      .delete()
      .eq('id', summary.id)
    
    if (error) throw error
    
    // Remove from local list
    summaries.value = summaries.value.filter(s => s.id !== summary.id)
    
    toast.success('Resumo excluído com sucesso')
    
  } catch (error) {
    console.error('Erro ao excluir resumo:', error)
    toast.error('Erro ao excluir resumo')
  }
}

const getStyleClass = (style) => {
  return {
    'style-standard': style === 'standard',
    'style-executive': style === 'executive',
    'style-technical': style === 'technical',
    'style-educational': style === 'educational'
  }
}

const getStyleLabel = (style) => {
  const labels = {
    standard: 'Padrão',
    executive: 'Executivo',
    technical: 'Técnico',
    educational: 'Educacional'
  }
  return labels[style] || 'Padrão'
}

const getLanguageLabel = (language) => {
  const labels = {
    pt: 'Português',
    en: 'Inglês'
  }
  return labels[language] || 'Português'
}

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const truncateText = (text, maxLength) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

const formatContent = (content) => {
  if (!content) return ''
  
  // Convert line breaks to HTML
  return content
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>')
}

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

const closeExportModal = () => {
  showExportModal.value = false
  selectedSummary.value = null
}

const closeViewerModal = () => {
  showViewerModal.value = false
  selectedSummary.value = null
}

// Lifecycle
onMounted(() => {
  loadSummaries()
})

// Watch for auth changes
watch(() => user?.value, (newUser) => {
  if (newUser) {
    loadSummaries()
  } else {
    summaries.value = []
  }
})
</script>

<style scoped>
.summaries {
  @apply p-6 space-y-6;
}

.summaries-header {
  @apply bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm;
}

.header-content {
  @apply flex items-center justify-between;
}

.header-left {
  @apply space-y-1;
}

.page-title {
  @apply text-2xl font-bold text-gray-900 dark:text-white;
}

.page-subtitle {
  @apply text-gray-600 dark:text-gray-300;
}

.header-right {
  @apply flex items-center space-x-4;
}

.new-summary-btn {
  @apply flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200;
}

.new-icon {
  @apply w-5 h-5;
}

.filters-section {
  @apply bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm;
}

.search-bar {
  @apply mb-4;
}

.search-input-wrapper {
  @apply relative max-w-md;
}

.search-icon {
  @apply absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400;
}

.search-input {
  @apply w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent;
}

.filter-controls {
  @apply flex items-center space-x-4;
}

.filter-select {
  @apply px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent;
}

.sort-btn {
  @apply p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200;
}

.sort-btn.desc {
  @apply transform rotate-180;
}

.sort-btn svg {
  @apply w-5 h-5;
}

.view-toggle {
  @apply flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden;
}

.view-btn {
  @apply p-2 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200;
}

.view-btn.active {
  @apply bg-primary-600 text-white;
}

.view-btn svg {
  @apply w-5 h-5;
}

.summaries-content {
  @apply bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm;
}

.summaries-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
}

.summaries-list {
  @apply space-y-4;
}

.summary-card {
  @apply p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-md transition-all duration-200 cursor-pointer;
}

.summary-row {
  @apply flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer;
}

.summary-icon {
  @apply w-12 h-12 rounded-lg flex items-center justify-center;
}

.summary-icon.style-standard {
  @apply bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400;
}

.summary-icon.style-executive {
  @apply bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400;
}

.summary-icon.style-technical {
  @apply bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400;
}

.summary-icon.style-educational {
  @apply bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400;
}

.summary-icon svg {
  @apply w-6 h-6;
}

.summary-info {
  @apply flex-1 min-w-0;
}

.summary-title {
  @apply font-semibold text-gray-900 dark:text-white truncate mb-2;
}

.summary-meta {
  @apply flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 mb-2;
}

.summary-meta > span:not(:last-child)::after {
  @apply content-['•'] ml-2;
}

.summary-style {
  @apply font-medium;
}

.summary-preview {
  @apply text-sm text-gray-600 dark:text-gray-300 line-clamp-3;
}

.summary-actions {
  @apply flex items-center space-x-2;
}

.action-btn {
  @apply p-2 rounded-lg transition-colors duration-200;
}

.action-btn.export {
  @apply text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900;
}

.action-btn.share {
  @apply text-green-600 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900;
}

.action-btn.duplicate {
  @apply text-purple-600 hover:bg-purple-100 dark:text-purple-400 dark:hover:bg-purple-900;
}

.action-btn.delete {
  @apply text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900;
}

.action-btn svg {
  @apply w-5 h-5;
}

.empty-state {
  @apply text-center py-12;
}

.empty-icon {
  @apply flex justify-center mb-4;
}

.empty-icon svg {
  @apply w-16 h-16 text-gray-400 dark:text-gray-500;
}

.empty-title {
  @apply text-xl font-medium text-gray-900 dark:text-white mb-2;
}

.empty-description {
  @apply text-gray-600 dark:text-gray-300 mb-6;
}

.empty-action {
  @apply inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200;
}

.modal-overlay {
  @apply fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4;
}

.modal-content {
  @apply bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden;
}

.modal-content.large {
  @apply max-w-4xl;
}

.modal-header {
  @apply flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700;
}

.modal-title-section {
  @apply flex-1 min-w-0;
}

.modal-title {
  @apply text-lg font-semibold text-gray-900 dark:text-white mb-2;
}

.summary-badges {
  @apply flex items-center space-x-2;
}

.badge {
  @apply px-2 py-1 text-xs font-medium rounded-full;
}

.badge.style {
  @apply bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200;
}

.badge.language {
  @apply bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200;
}

.modal-close {
  @apply p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200;
}

.modal-close svg {
  @apply w-5 h-5;
}

.modal-body {
  @apply p-6 overflow-y-auto;
}

.summary-content {
  @apply mb-6;
}

.content-text {
  @apply prose prose-gray dark:prose-invert max-w-none;
}

.modal-actions {
  @apply flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700;
}

.action-button {
  @apply flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200;
}

.action-button.export {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}

.action-button.share {
  @apply bg-green-600 text-white hover:bg-green-700;
}

.action-button svg {
  @apply w-5 h-5;
}

/* Responsive */
@media (max-width: 768px) {
  .summaries {
    @apply p-4 space-y-4;
  }
  
  .header-content {
    @apply flex-col items-start space-y-4;
  }
  
  .filter-controls {
    @apply flex-wrap gap-2;
  }
  
  .summaries-grid {
    @apply grid-cols-1;
  }
  
  .summary-row {
    @apply flex-col items-start space-y-2 space-x-0;
  }
  
  .summary-actions {
    @apply w-full justify-end;
  }
  
  .modal-actions {
    @apply flex-col space-y-2 space-x-0;
  }
  
  .action-button {
    @apply w-full justify-center;
  }
}
</style>