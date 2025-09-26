<template>
  <div
    v-if="isOpen"
    class="export-modal-overlay"
    @click="closeModal"
  >
    <div
      class="export-modal"
      @click.stop
    >
      <!-- Header -->
      <div class="modal-header">
        <h2 class="text-xl font-semibold text-gray-900">
          Exportar Resumo
        </h2>
        <button
          class="close-btn"
          @click="closeModal"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="modal-content">
        <!-- Formatos de Exportação -->
        <div class="export-formats">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            Escolha o formato de exportação
          </h3>
          
          <div class="formats-grid">
            <div 
              v-for="format in exportFormats" 
              :key="format.id"
              class="format-option"
              :class="{ 
                'selected': selectedFormat === format.id,
                'disabled': !format.available
              }"
              @click="selectFormat(format)"
            >
              <div class="format-icon">
                <component
                  :is="format.icon"
                  class="w-8 h-8"
                />
              </div>
              
              <div class="format-info">
                <h4 class="font-medium text-gray-900">
                  {{ format.name }}
                </h4>
                <p class="text-sm text-gray-500">
                  {{ format.description }}
                </p>
                
                <div
                  v-if="!format.available"
                  class="format-badge"
                >
                  <span class="badge-pro">PRO</span>
                </div>
              </div>
              
              <div class="format-check">
                <div
                  v-if="selectedFormat === format.id"
                  class="check-icon"
                >
                  <svg
                    class="w-5 h-5 text-primary-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Configurações Específicas -->
        <div
          v-if="selectedFormat"
          class="export-config mt-6"
        >
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            Configurações de Exportação
          </h3>
          
          <!-- Configurações Gerais -->
          <div class="config-section">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Nome do Arquivo -->
              <div>
                <label
                  for="filename"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nome do Arquivo
                </label>
                <input
                  id="filename"
                  v-model="exportConfig.filename"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="resumo-documento"
                >
              </div>
              
              <!-- Incluir Metadados -->
              <div class="flex items-center">
                <input
                  id="include-metadata"
                  v-model="exportConfig.includeMetadata"
                  type="checkbox"
                  class="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                >
                <label
                  for="include-metadata"
                  class="ml-2 text-sm text-gray-700"
                >
                  Incluir metadados (data, autor, configurações)
                </label>
              </div>
            </div>
          </div>

          <!-- Configurações Específicas por Formato -->
          <div
            v-if="formatSpecificConfig"
            class="format-specific-config mt-4"
          >
            <!-- Word/PDF -->
            <div
              v-if="['word', 'pdf'].includes(selectedFormat)"
              class="space-y-4"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Template
                  </label>
                  <select
                    v-model="exportConfig.template"
                    class="form-select"
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
                    <option value="minimal">
                      Minimalista
                    </option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Orientação
                  </label>
                  <select
                    v-model="exportConfig.orientation"
                    class="form-select"
                  >
                    <option value="portrait">
                      Retrato
                    </option>
                    <option value="landscape">
                      Paisagem
                    </option>
                  </select>
                </div>
              </div>
              
              <div class="flex items-center space-x-4">
                <label class="flex items-center">
                  <input
                    v-model="exportConfig.includeTableOfContents"
                    type="checkbox"
                    class="form-checkbox"
                  >
                  <span class="ml-2 text-sm text-gray-700">Incluir índice</span>
                </label>
                
                <label class="flex items-center">
                  <input
                    v-model="exportConfig.includePageNumbers"
                    type="checkbox"
                    class="form-checkbox"
                  >
                  <span class="ml-2 text-sm text-gray-700">Numeração de páginas</span>
                </label>
              </div>
            </div>

            <!-- Excel -->
            <div
              v-if="selectedFormat === 'excel'"
              class="space-y-4"
            >
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Estrutura da Planilha
                </label>
                <select
                  v-model="exportConfig.excelStructure"
                  class="form-select"
                >
                  <option value="single-sheet">
                    Planilha única
                  </option>
                  <option value="multi-sheet">
                    Múltiplas planilhas por seção
                  </option>
                  <option value="summary-details">
                    Resumo + Detalhes
                  </option>
                </select>
              </div>
              
              <div class="flex items-center space-x-4">
                <label class="flex items-center">
                  <input
                    v-model="exportConfig.includeCharts"
                    type="checkbox"
                    class="form-checkbox"
                  >
                  <span class="ml-2 text-sm text-gray-700">Incluir gráficos</span>
                </label>
                
                <label class="flex items-center">
                  <input
                    v-model="exportConfig.autoFilter"
                    type="checkbox"
                    class="form-checkbox"
                  >
                  <span class="ml-2 text-sm text-gray-700">Auto-filtro</span>
                </label>
              </div>
            </div>

            <!-- Email -->
            <div
              v-if="selectedFormat === 'email'"
              class="space-y-4"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    for="email-to"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Para (emails)
                  </label>
                  <input
                    id="email-to"
                    v-model="exportConfig.emailTo"
                    type="text"
                    placeholder="email1@exemplo.com, email2@exemplo.com"
                    class="form-input"
                  >
                </div>
                
                <div>
                  <label
                    for="email-subject"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Assunto
                  </label>
                  <input
                    id="email-subject"
                    v-model="exportConfig.emailSubject"
                    type="text"
                    placeholder="Resumo do documento"
                    class="form-input"
                  >
                </div>
              </div>
              
              <div>
                <label
                  for="email-message"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  Mensagem adicional (opcional)
                </label>
                <textarea
                  id="email-message"
                  v-model="exportConfig.emailMessage"
                  rows="3"
                  placeholder="Mensagem que acompanhará o resumo..."
                  class="form-textarea"
                />
              </div>
            </div>

            <!-- Notion -->
            <div
              v-if="selectedFormat === 'notion'"
              class="space-y-4"
            >
              <div>
                <label
                  for="notion-page"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  Página de Destino
                </label>
                <select
                  v-model="exportConfig.notionPageId"
                  class="form-select"
                >
                  <option value="">
                    Selecione uma página...
                  </option>
                  <option
                    v-for="page in notionPages"
                    :key="page.id"
                    :value="page.id"
                  >
                    {{ page.title }}
                  </option>
                </select>
              </div>
              
              <div class="flex items-center space-x-4">
                <label class="flex items-center">
                  <input
                    v-model="exportConfig.createNewPage"
                    type="checkbox"
                    class="form-checkbox"
                  >
                  <span class="ml-2 text-sm text-gray-700">Criar nova página</span>
                </label>
                
                <label class="flex items-center">
                  <input
                    v-model="exportConfig.notionTemplate"
                    type="checkbox"
                    class="form-checkbox"
                  >
                  <span class="ml-2 text-sm text-gray-700">Usar template padrão</span>
                </label>
              </div>
            </div>

            <!-- Trello -->
            <div
              v-if="selectedFormat === 'trello'"
              class="space-y-4"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Board
                  </label>
                  <select
                    v-model="exportConfig.trelloBoardId"
                    class="form-select"
                  >
                    <option value="">
                      Selecione um board...
                    </option>
                    <option
                      v-for="board in trelloBoards"
                      :key="board.id"
                      :value="board.id"
                    >
                      {{ board.name }}
                    </option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Lista
                  </label>
                  <select
                    v-model="exportConfig.trelloListId"
                    class="form-select"
                  >
                    <option value="">
                      Selecione uma lista...
                    </option>
                    <option
                      v-for="list in trelloLists"
                      :key="list.id"
                      :value="list.id"
                    >
                      {{ list.name }}
                    </option>
                  </select>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Estrutura dos Cards
                </label>
                <select
                  v-model="exportConfig.trelloStructure"
                  class="form-select"
                >
                  <option value="single-card">
                    Card único com resumo completo
                  </option>
                  <option value="section-cards">
                    Cards por seção
                  </option>
                  <option value="task-cards">
                    Cards por tarefa identificada
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Preview -->
        <div
          v-if="showPreview"
          class="export-preview mt-6"
        >
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            Preview da Exportação
          </h3>
          
          <div class="preview-content">
            <div class="preview-header">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">
                  {{ getPreviewTitle() }}
                </span>
                <span class="text-xs text-gray-500">
                  {{ getPreviewSize() }}
                </span>
              </div>
            </div>
            
            <div class="preview-body">
              <div class="text-sm text-gray-600">
                {{ getPreviewDescription() }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="modal-footer">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <input
              id="show-preview"
              v-model="showPreview"
              type="checkbox"
              class="form-checkbox"
            >
            <label
              for="show-preview"
              class="text-sm text-gray-700"
            >
              Mostrar preview
            </label>
          </div>
          
          <div class="flex space-x-3">
            <button
              class="btn-secondary"
              @click="closeModal"
            >
              Cancelar
            </button>
            
            <button 
              :disabled="!canExport || isExporting"
              class="btn-primary"
              @click="exportSummary"
            >
              <svg
                v-if="isExporting"
                class="animate-spin -ml-1 mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {{ isExporting ? 'Exportando...' : 'Exportar' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { exportService } from '../services/exportService.js'
import { stripeService } from '../services/stripe.js'
import { supabase } from '@/services/supabase'

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  summary: {
    type: Object,
    required: true
  },
  documents: {
    type: Array,
    default: () => []
  },
  config: {
    type: Object,
    default: () => ({})
  }
})

// Emits
const emit = defineEmits(['close', 'export-complete'])

// Composables
const toast = useToast()

// Sessão Supabase
const session = ref(null)
const uid = ref(null)

// Refs
const selectedFormat = ref('')
const exportConfig = ref({
  filename: '',
  includeMetadata: true,
  template: 'standard',
  orientation: 'portrait',
  includeTableOfContents: false,
  includePageNumbers: true,
  excelStructure: 'single-sheet',
  includeCharts: false,
  autoFilter: true,
  emailTo: '',
  emailSubject: '',
  emailMessage: '',
  notionPageId: '',
  createNewPage: false,
  notionTemplate: true,
  trelloBoardId: '',
  trelloListId: '',
  trelloStructure: 'single-card'
})
const showPreview = ref(false)
const isExporting = ref(false)
const notionPages = ref([])
const trelloBoards = ref([])
const trelloLists = ref([])

// Data
const exportFormats = [
  {
    id: 'word',
    name: 'Microsoft Word',
    description: 'Documento .docx formatado',
    icon: 'WordIcon',
    available: true
  },
  {
    id: 'pdf',
    name: 'PDF',
    description: 'Documento PDF para impressão',
    icon: 'PdfIcon',
    available: true
  },
  {
    id: 'excel',
    name: 'Microsoft Excel',
    description: 'Planilha .xlsx estruturada',
    icon: 'ExcelIcon',
    available: true
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Página no Notion workspace',
    icon: 'NotionIcon',
    available: false // Requer plano PRO
  },
  {
    id: 'trello',
    name: 'Trello',
    description: 'Cards no board do Trello',
    icon: 'TrelloIcon',
    available: false // Requer plano PRO
  },
  {
    id: 'email',
    name: 'Email',
    description: 'Enviar por email formatado',
    icon: 'EmailIcon',
    available: true
  }
]

// Computed
const canExport = computed(() => {
  return selectedFormat.value && exportConfig.value.filename && !isExporting.value
})

const formatSpecificConfig = computed(() => {
  return selectedFormat.value && ['word', 'pdf', 'excel', 'email', 'notion', 'trello'].includes(selectedFormat.value)
})

// Garantir sessão Supabase
const ensureSupabaseSession = async () => {
  try {
    const { data } = await supabase.auth.getSession()
    session.value = data?.session || null
    uid.value = session.value?.user?.id || null
    return !!uid.value
  } catch (e) {
    console.error('Erro ao obter sessão do Supabase:', {
      message: e.message,
      stack: e.stack,
      name: e.name,
      code: e.code
    })
    return false
  }
}

// Methods
const closeModal = () => {
  emit('close')
}

const selectFormat = async (format) => {
  // Garantir sessão antes de verificações
  if (!uid.value) {
    await ensureSupabaseSession()
  }

  if (!format.available) {
    // Verificar se o usuário tem plano adequado para o formato
    const currentPlan = await stripeService.getCurrentPlan(uid.value)
    if (!stripeService.isExportFormatSupported(currentPlan.id, format.id)) {
      toast.warning('Este formato requer um plano PRO ou superior')
      return
    }
  }
  
  selectedFormat.value = format.id
  
  // Carregar dados específicos do formato
  if (format.id === 'notion') {
    await loadNotionPages()
  } else if (format.id === 'trello') {
    await loadTrelloBoards()
  }
}

const loadNotionPages = async () => {
  try {
    // Implementar carregamento das páginas do Notion
    // notionPages.value = await notionService.getPages()
  } catch (error) {
    console.error('Erro ao carregar páginas do Notion:', error)
  }
}

const loadTrelloBoards = async () => {
  try {
    // Implementar carregamento dos boards do Trello
    // trelloBoards.value = await trelloService.getBoards()
  } catch (error) {
    console.error('Erro ao carregar boards do Trello:', error)
  }
}

const exportSummary = async () => {
  if (!canExport.value) return
  
  try {
    isExporting.value = true
    
    const exportData = {
      summary: props.summary,
      documents: props.documents,
      config: {
        ...props.config,
        ...exportConfig.value,
        format: selectedFormat.value
      }
    }
    
    let result
    
    switch (selectedFormat.value) {
      case 'word':
        result = await exportService.exportToWord(exportData)
        break
      case 'pdf':
        result = await exportService.exportToPDF(exportData)
        break
      case 'excel':
        result = await exportService.exportToExcel(exportData)
        break
      case 'notion':
        result = await exportService.exportToNotion(exportData)
        break
      case 'trello':
        result = await exportService.exportToTrello(exportData)
        break
      case 'email':
        result = await exportService.exportToEmail(exportData)
        break
      default:
        throw new Error('Formato de exportação não suportado')
    }
    
    emit('export-complete', {
      format: selectedFormat.value,
      result,
      config: exportConfig.value
    })
    
    toast.success(`Resumo exportado com sucesso para ${selectedFormat.value.toUpperCase()}!`)
    closeModal()
    
  } catch (error) {
    console.error('Erro na exportação:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code,
      exportType: exportType.value
    })
    toast.error(`Erro ao exportar: ${error.message}`)
  } finally {
    isExporting.value = false
  }
}

const getPreviewTitle = () => {
  const format = exportFormats.find(f => f.id === selectedFormat.value)
  return `${exportConfig.value.filename || 'resumo'}.${getFileExtension()}`
}

const getFileExtension = () => {
  const extensions = {
    word: 'docx',
    pdf: 'pdf',
    excel: 'xlsx',
    notion: 'notion',
    trello: 'trello',
    email: 'eml'
  }
  return extensions[selectedFormat.value] || 'txt'
}

const getPreviewSize = () => {
  // Estimativa baseada no conteúdo
  const contentLength = props.summary?.content?.length || 0
  const estimatedSize = Math.max(contentLength * 2, 10000) // Mínimo 10KB
  
  if (estimatedSize < 1024) return `${estimatedSize} B`
  if (estimatedSize < 1024 * 1024) return `${Math.round(estimatedSize / 1024)} KB`
  return `${Math.round(estimatedSize / (1024 * 1024))} MB`
}

const getPreviewDescription = () => {
  const descriptions = {
    word: 'Documento Word formatado com estilos profissionais',
    pdf: 'Documento PDF otimizado para impressão e compartilhamento',
    excel: 'Planilha Excel com dados estruturados e formatação',
    notion: 'Página no Notion com blocos organizados',
    trello: 'Cards no Trello com tarefas e informações',
    email: 'Email formatado pronto para envio'
  }
  return descriptions[selectedFormat.value] || 'Formato de exportação selecionado'
}

// Watchers
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    // Reset form when modal opens
    selectedFormat.value = ''
    exportConfig.value.filename = generateDefaultFilename()
  }
})

watch(() => exportConfig.value.trelloBoardId, async (boardId) => {
  if (boardId) {
    try {
      // Carregar listas do board selecionado
      // trelloLists.value = await trelloService.getLists(boardId)
    } catch (error) {
      console.error('Erro ao carregar listas do Trello:', error)
    }
  }
})

// Helpers
const generateDefaultFilename = () => {
  const date = new Date().toISOString().split('T')[0]
  const docName = props.documents?.[0]?.name?.replace(/\.[^/.]+$/, '') || 'documento'
  return `resumo-${docName}-${date}`
}

// Lifecycle
onMounted(async () => {
  await ensureSupabaseSession()
  exportConfig.value.filename = generateDefaultFilename()
})
</script>

<style scoped>
.export-modal-overlay {
  @apply fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4;
}

.export-modal {
  @apply bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col;
}

.modal-header {
  @apply flex items-center justify-between p-6 border-b border-gray-200;
}

.close-btn {
  @apply text-gray-400 hover:text-gray-600 transition-colors duration-200;
}

.modal-content {
  @apply flex-1 overflow-y-auto p-6;
}

.modal-footer {
  @apply p-6 border-t border-gray-200 bg-gray-50;
}

.formats-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4;
}

.format-option {
  @apply p-4 border-2 border-gray-200 rounded-lg cursor-pointer transition-all duration-200 hover:border-primary-300 hover:bg-primary-50;
}

.format-option.selected {
  @apply border-primary-500 bg-primary-50;
}

.format-option.disabled {
  @apply opacity-60 cursor-not-allowed;
}

.format-icon {
  @apply text-gray-400 mb-3;
}

.format-info {
  @apply flex-1;
}

.format-badge {
  @apply mt-2;
}

.badge-pro {
  @apply inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800;
}

.config-section {
  @apply bg-gray-50 rounded-lg p-4;
}

.format-specific-config {
  @apply bg-blue-50 rounded-lg p-4;
}

.preview-content {
  @apply bg-gray-50 rounded-lg p-4;
}

.preview-header {
  @apply pb-2 border-b border-gray-200 mb-3;
}

.form-select,
.form-input,
.form-textarea {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500;
}

.form-checkbox {
  @apply rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50;
}

.btn-primary {
  @apply bg-primary-600 text-white px-4 py-2 rounded-md font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center;
}

.btn-secondary {
  @apply bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-300 transition-colors duration-200;
}
</style>