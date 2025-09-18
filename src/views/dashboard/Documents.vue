<template>
  <div class="documents">
    <!-- Header -->
    <div class="documents-header">
      <div class="header-content">
        <div class="header-left">
          <h1 class="page-title">Meus Documentos</h1>
          <p class="page-subtitle">
            Gerencie todos os seus arquivos e documentos
          </p>
        </div>
        
        <div class="header-right">
          <button @click="showUploadModal = true" class="upload-btn">
            <svg class="upload-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
            <span>Upload</span>
          </button>
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
            placeholder="Buscar documentos..."
            class="search-input"
          >
        </div>
      </div>
      
      <div class="filter-controls">
        <select v-model="selectedType" class="filter-select">
          <option value="">Todos os tipos</option>
          <option value="pdf">PDF</option>
          <option value="docx">Word</option>
          <option value="txt">Texto</option>
          <option value="audio">Áudio</option>
        </select>
        
        <select v-model="sortBy" class="filter-select">
          <option value="created_at">Data de criação</option>
          <option value="name">Nome</option>
          <option value="file_size">Tamanho</option>
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
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
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
    
    <!-- Documents List/Grid -->
    <div class="documents-content">
      <LoadingSpinner v-if="isLoading" :show="true" message="Carregando documentos..." />
      
      <div v-else-if="filteredDocuments.length > 0" :class="viewMode === 'grid' ? 'documents-grid' : 'documents-list'">
        <div 
          v-for="document in filteredDocuments" 
          :key="document.id"
          :class="viewMode === 'grid' ? 'document-card' : 'document-row'"
          @click="selectDocument(document)"
        >
          <!-- Document Icon -->
          <div class="document-icon" :class="getFileTypeClass(document.file_type)">
            <component :is="getFileIcon(document.file_type)" />
          </div>
          
          <!-- Document Info -->
          <div class="document-info">
            <h3 class="document-name" :title="document.name">{{ document.name }}</h3>
            <div class="document-meta">
              <span class="document-size">{{ formatFileSize(document.file_size) }}</span>
              <span class="document-date">{{ formatDate(document.created_at) }}</span>
              <span v-if="document.summaries_count > 0" class="summaries-count">
                {{ document.summaries_count }} resumo(s)
              </span>
            </div>
          </div>
          
          <!-- Document Actions -->
          <div class="document-actions" @click.stop>
            <button 
              @click="generateSummary(document)" 
              class="action-btn summary"
              :disabled="isGeneratingSummary === document.id"
              :title="'Gerar resumo'"
            >
              <svg v-if="isGeneratingSummary === document.id" class="animate-spin" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H8a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H12a1 1 0 110-2h4a1 1 0 011 1v4a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
              </svg>
              <svg v-else viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
            
            <button 
              @click="downloadDocument(document)" 
              class="action-btn download"
              title="Download"
            >
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            
            <button 
              @click="deleteDocument(document)" 
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
            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3 class="empty-title">
          {{ searchQuery ? 'Nenhum documento encontrado' : 'Nenhum documento ainda' }}
        </h3>
        <p class="empty-description">
          {{ searchQuery 
            ? 'Tente ajustar os filtros ou termos de busca.' 
            : 'Comece fazendo upload do seu primeiro documento.' 
          }}
        </p>
        <button v-if="!searchQuery" @click="showUploadModal = true" class="empty-action">
          Fazer upload
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
    
    <!-- Summary Generator Modal -->
    <div v-if="showSummaryModal" class="modal-overlay" @click="closeSummaryModal">
      <div class="modal-content large" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">Gerar Resumo</h3>
          <button @click="closeSummaryModal" class="modal-close">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div class="modal-body">
          <SummaryGenerator 
            :selected-documents="selectedDocumentForSummary ? [selectedDocumentForSummary] : []"
            @summary-generated="handleSummaryGenerated"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'
import { supabase } from '@/services/supabase'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import FileUpload from '@/components/FileUpload.vue'
import SummaryGenerator from '@/components/SummaryGenerator.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { 
  DocumentIcon, 
  PdfIcon, 
  WordIcon, 
  AudioIcon 
} from '@/components/icons/FileIcons.vue'

// Composables
const authStore = useAuthStore()
const appStore = useAppStore()
const toast = useToast()
const router = useRouter()

// Refs
const isLoading = ref(false)
const showUploadModal = ref(false)
const showSummaryModal = ref(false)
const selectedDocumentForSummary = ref(null)
const isGeneratingSummary = ref(null)

// Filters
const searchQuery = ref('')
const selectedType = ref('')
const sortBy = ref('created_at')
const sortOrder = ref('desc')
const viewMode = ref('grid')

// Data
const documents = ref([])

// Computed
const filteredDocuments = computed(() => {
  let filtered = [...documents.value]
  
  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(doc => 
      doc.name.toLowerCase().includes(query) ||
      doc.file_type.toLowerCase().includes(query)
    )
  }
  
  // Type filter
  if (selectedType.value) {
    filtered = filtered.filter(doc => doc.file_type === selectedType.value)
  }
  
  // Sort
  filtered.sort((a, b) => {
    let aValue = a[sortBy.value]
    let bValue = b[sortBy.value]
    
    if (sortBy.value === 'name') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }
    
    if (sortOrder.value === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })
  
  return filtered
})

// Methods
const loadDocuments = async () => {
  try {
    isLoading.value = true
    
    const userId = authStore.user?.id
    if (!userId) return
    
    const { data, error } = await supabase
      .from('documents')
      .select(`
        *,
        summaries_count:summaries(count)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    // Process summaries count
    documents.value = data.map(doc => ({
      ...doc,
      summaries_count: doc.summaries_count?.[0]?.count || 0
    }))
    
  } catch (error) {
    console.error('Erro ao carregar documentos:', error)
    toast.error('Erro ao carregar documentos')
  } finally {
    isLoading.value = false
  }
}

const selectDocument = (document) => {
  // Navigate to document details or open preview
  router.push(`/documents/${document.id}`)
}

const generateSummary = (document) => {
  selectedDocumentForSummary.value = document
  showSummaryModal.value = true
}

const downloadDocument = async (document) => {
  try {
    // Get download URL from Supabase Storage
    const { data, error } = await supabase.storage
      .from('documents')
      .createSignedUrl(document.file_path, 60) // 1 minute expiry
    
    if (error) throw error
    
    // Create download link
    const link = document.createElement('a')
    link.href = data.signedUrl
    link.download = document.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast.success('Download iniciado')
    
  } catch (error) {
    console.error('Erro ao fazer download:', error)
    toast.error('Erro ao fazer download do documento')
  }
}

const deleteDocument = async (document) => {
  if (!confirm(`Tem certeza que deseja excluir "${document.name}"?`)) {
    return
  }
  
  try {
    // Delete from database
    const { error: dbError } = await supabase
      .from('documents')
      .delete()
      .eq('id', document.id)
    
    if (dbError) throw dbError
    
    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('documents')
      .remove([document.file_path])
    
    if (storageError) {
      console.warn('Erro ao deletar arquivo do storage:', storageError)
    }
    
    // Remove from local list
    documents.value = documents.value.filter(d => d.id !== document.id)
    
    toast.success('Documento excluído com sucesso')
    
  } catch (error) {
    console.error('Erro ao excluir documento:', error)
    toast.error('Erro ao excluir documento')
  }
}

const getFileIcon = (fileType) => {
  switch (fileType) {
    case 'pdf':
      return PdfIcon
    case 'docx':
      return WordIcon
    case 'audio':
      return AudioIcon
    default:
      return DocumentIcon
  }
}

const getFileTypeClass = (fileType) => {
  return {
    'file-pdf': fileType === 'pdf',
    'file-word': fileType === 'docx',
    'file-text': fileType === 'txt',
    'file-audio': fileType === 'audio'
  }
}

const formatFileSize = (bytes) => {
  if (!bytes) return '0 B'
  
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
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

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

const closeUploadModal = () => {
  showUploadModal.value = false
}

const closeSummaryModal = () => {
  showSummaryModal.value = false
  selectedDocumentForSummary.value = null
}

const handleUploadComplete = () => {
  closeUploadModal()
  loadDocuments() // Refresh documents list
  toast.success('Upload concluído com sucesso!')
}

const handleSummaryGenerated = () => {
  closeSummaryModal()
  loadDocuments() // Refresh to update summaries count
  toast.success('Resumo gerado com sucesso!')
}

// Lifecycle
onMounted(() => {
  loadDocuments()
})

// Watch for auth changes
watch(() => authStore.user, (newUser) => {
  if (newUser) {
    loadDocuments()
  } else {
    documents.value = []
  }
})
</script>

<style scoped>
.documents {
  @apply p-6 space-y-6;
}

.documents-header {
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

.upload-btn {
  @apply flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200;
}

.upload-icon {
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

.documents-content {
  @apply bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm;
}

.documents-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6;
}

.documents-list {
  @apply space-y-4;
}

.document-card {
  @apply p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-md transition-all duration-200 cursor-pointer;
}

.document-row {
  @apply flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer;
}

.document-icon {
  @apply w-12 h-12 rounded-lg flex items-center justify-center;
}

.document-icon.file-pdf {
  @apply bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400;
}

.document-icon.file-word {
  @apply bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400;
}

.document-icon.file-text {
  @apply bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400;
}

.document-icon.file-audio {
  @apply bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400;
}

.document-info {
  @apply flex-1 min-w-0;
}

.document-name {
  @apply font-medium text-gray-900 dark:text-white truncate;
}

.document-meta {
  @apply flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 mt-1;
}

.document-meta > span:not(:last-child)::after {
  @apply content-['•'] ml-2;
}

.summaries-count {
  @apply text-primary-600 dark:text-primary-400 font-medium;
}

.document-actions {
  @apply flex items-center space-x-2;
}

.action-btn {
  @apply p-2 rounded-lg transition-colors duration-200;
}

.action-btn.summary {
  @apply text-green-600 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900;
}

.action-btn.download {
  @apply text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900;
}

.action-btn.delete {
  @apply text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900;
}

.action-btn:disabled {
  @apply opacity-50 cursor-not-allowed;
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
  @apply px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200;
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
  @apply p-6 overflow-y-auto;
}

/* Responsive */
@media (max-width: 768px) {
  .documents {
    @apply p-4 space-y-4;
  }
  
  .header-content {
    @apply flex-col items-start space-y-4;
  }
  
  .filter-controls {
    @apply flex-wrap gap-2;
  }
  
  .documents-grid {
    @apply grid-cols-1;
  }
  
  .document-row {
    @apply flex-col items-start space-y-2 space-x-0;
  }
  
  .document-actions {
    @apply w-full justify-end;
  }
}
</style>