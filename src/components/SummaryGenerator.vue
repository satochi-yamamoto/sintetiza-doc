<template>
  <div class="summary-generator">
    <!-- Cabeçalho -->
    <div class="generator-header">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">
        Gerador de Resumos
      </h2>
      <p class="text-gray-600 mb-6">
        Configure as opções e gere resumos inteligentes dos seus documentos
      </p>
    </div>

    <!-- Configurações -->
    <div class="generator-config bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">
        Configurações do Resumo
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Estilo do Resumo -->
        <div class="config-group">
          <label class="block text-sm font-medium text-gray-700 mb-3">
            Estilo do Resumo
          </label>
          <div class="space-y-3">
            <div 
              v-for="style in summaryStyles" 
              :key="style.id"
              class="style-option"
              :class="{ 'selected': selectedStyle === style.id }"
              @click="selectedStyle = style.id"
            >
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    :id="style.id"
                    v-model="selectedStyle"
                    :value="style.id"
                    type="radio"
                    class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                  />
                </div>
                <div class="ml-3">
                  <label :for="style.id" class="font-medium text-gray-900 cursor-pointer">
                    {{ style.name }}
                  </label>
                  <p class="text-sm text-gray-500">
                    {{ style.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tipo de Análise -->
        <div class="config-group">
          <label class="block text-sm font-medium text-gray-700 mb-3">
            Tipo de Análise
          </label>
          <div class="space-y-3">
            <div 
              v-for="analysis in analysisTypes" 
              :key="analysis.id"
              class="analysis-option"
              :class="{ 'selected': selectedAnalysis === analysis.id }"
              @click="selectedAnalysis = analysis.id"
            >
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    :id="analysis.id"
                    v-model="selectedAnalysis"
                    :value="analysis.id"
                    type="radio"
                    class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                  />
                </div>
                <div class="ml-3">
                  <label :for="analysis.id" class="font-medium text-gray-900 cursor-pointer">
                    {{ analysis.name }}
                  </label>
                  <p class="text-sm text-gray-500">
                    {{ analysis.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Idioma -->
        <div class="config-group">
          <label for="language" class="block text-sm font-medium text-gray-700 mb-2">
            Idioma do Resumo
          </label>
          <select
            id="language"
            v-model="selectedLanguage"
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
          >
            <option value="pt-BR">Português (Brasil)</option>
            <option value="en-US">English (US)</option>
            <option value="auto">Detectar automaticamente</option>
          </select>
        </div>

        <!-- Tamanho do Resumo -->
        <div class="config-group">
          <label for="length" class="block text-sm font-medium text-gray-700 mb-2">
            Tamanho do Resumo
          </label>
          <select
            id="length"
            v-model="selectedLength"
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
          >
            <option value="short">Curto (bullet points)</option>
            <option value="medium">Médio (1-2 parágrafos)</option>
            <option value="long">Longo (executivo detalhado)</option>
          </select>
        </div>
      </div>

      <!-- Opções Avançadas -->
      <div class="mt-6">
        <button
          @click="showAdvanced = !showAdvanced"
          class="flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          <svg 
            class="w-4 h-4 mr-1 transform transition-transform duration-200"
            :class="{ 'rotate-90': showAdvanced }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          Opções Avançadas
        </button>
        
        <div v-if="showAdvanced" class="mt-4 p-4 bg-gray-50 rounded-lg">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Foco Específico -->
            <div>
              <label for="focus" class="block text-sm font-medium text-gray-700 mb-2">
                Foco Específico (opcional)
              </label>
              <input
                id="focus"
                v-model="specificFocus"
                type="text"
                placeholder="Ex: decisões, custos, cronograma..."
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
            
            <!-- Palavras-chave -->
            <div>
              <label for="keywords" class="block text-sm font-medium text-gray-700 mb-2">
                Palavras-chave (opcional)
              </label>
              <input
                id="keywords"
                v-model="keywords"
                type="text"
                placeholder="Separadas por vírgula"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
          </div>
          
          <!-- Incluir Seções -->
          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Incluir Seções
            </label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
              <label v-for="section in availableSections" :key="section.id" class="flex items-center">
                <input
                  v-model="includedSections"
                  :value="section.id"
                  type="checkbox"
                  class="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                />
                <span class="ml-2 text-sm text-gray-700">{{ section.name }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Documentos Selecionados -->
    <div v-if="selectedDocuments.length > 0" class="selected-documents bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">
        Documentos Selecionados ({{ selectedDocuments.length }})
      </h3>
      
      <div class="space-y-3">
        <div 
          v-for="doc in selectedDocuments" 
          :key="doc.id"
          class="document-item flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <div class="flex items-center">
            <div class="file-icon mr-3">
              <component :is="getDocumentIcon(doc.type)" class="w-6 h-6 text-gray-400" />
            </div>
            <div>
              <p class="font-medium text-gray-900">{{ doc.name }}</p>
              <p class="text-sm text-gray-500">
                {{ formatFileSize(doc.size) }} • {{ formatDate(doc.created_at) }}
              </p>
            </div>
          </div>
          
          <button
            @click="removeDocument(doc.id)"
            class="text-gray-400 hover:text-red-500 transition-colors duration-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Botões de Ação -->
    <div class="generator-actions">
      <button
        @click="generateSummary"
        :disabled="!canGenerate || isGenerating"
        class="btn-primary"
      >
        <svg v-if="isGenerating" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ isGenerating ? 'Gerando Resumo...' : 'Gerar Resumo' }}
      </button>
      
      <button
        v-if="selectedDocuments.length > 0"
        @click="clearDocuments"
        :disabled="isGenerating"
        class="btn-secondary ml-3"
      >
        Limpar Seleção
      </button>
    </div>

    <!-- Preview do Resumo -->
    <div v-if="generatedSummary" class="summary-preview bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900">
          Resumo Gerado
        </h3>
        
        <div class="flex space-x-2">
          <button
            @click="copySummary"
            class="btn-icon"
            title="Copiar resumo"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          
          <button
            @click="exportSummary"
            class="btn-icon"
            title="Exportar resumo"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div class="summary-content prose max-w-none">
        <div v-html="formattedSummary"></div>
      </div>
      
      <!-- Metadados do Resumo -->
      <div class="summary-metadata mt-6 pt-4 border-t border-gray-200">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
          <div>
            <span class="font-medium">Estilo:</span> {{ getCurrentStyleName() }}
          </div>
          <div>
            <span class="font-medium">Idioma:</span> {{ selectedLanguage === 'auto' ? 'Detectado' : getLanguageName(selectedLanguage) }}
          </div>
          <div>
            <span class="font-medium">Palavras:</span> {{ summaryWordCount }}
          </div>
          <div>
            <span class="font-medium">Gerado em:</span> {{ formatDate(generatedAt) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { aiService } from '../services/ai.js'
import { useAuth } from '@clerk/vue'
import { stripeService } from '../services/stripe.js'
import { DocumentIcon, PdfIcon, WordIcon, AudioIcon } from './icons/FileIcons.vue'

// Props
const props = defineProps({
  documents: {
    type: Array,
    default: () => []
  },
  autoSelect: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['summary-generated', 'export-requested'])

// Composables
const toast = useToast()
const { isSignedIn, user } = useAuth()

// Refs
const selectedDocuments = ref([])
const selectedStyle = ref('standard')
const selectedAnalysis = ref('general')
const selectedLanguage = ref('pt-BR')
const selectedLength = ref('medium')
const specificFocus = ref('')
const keywords = ref('')
const includedSections = ref(['topics', 'insights', 'decisions'])
const showAdvanced = ref(false)
const isGenerating = ref(false)
const generatedSummary = ref(null)
const generatedAt = ref(null)

// Data
const summaryStyles = [
  {
    id: 'standard',
    name: 'Padrão',
    description: 'Resumo equilibrado com tópicos principais e insights'
  },
  {
    id: 'executive',
    name: 'Executivo',
    description: 'Foco em decisões, resultados e próximos passos'
  },
  {
    id: 'technical',
    name: 'Técnico',
    description: 'Detalhes técnicos, especificações e implementação'
  },
  {
    id: 'educational',
    name: 'Educacional',
    description: 'Explicativo e didático, ideal para aprendizado'
  }
]

const analysisTypes = [
  {
    id: 'general',
    name: 'Geral',
    description: 'Análise completa do conteúdo'
  },
  {
    id: 'meeting',
    name: 'Reunião',
    description: 'Foco em decisões, tarefas e próximos passos'
  },
  {
    id: 'document',
    name: 'Documento',
    description: 'Estrutura e conteúdo principal'
  },
  {
    id: 'research',
    name: 'Pesquisa',
    description: 'Metodologia, resultados e conclusões'
  }
]

const availableSections = [
  { id: 'topics', name: 'Tópicos Principais' },
  { id: 'insights', name: 'Insights' },
  { id: 'decisions', name: 'Decisões' },
  { id: 'tasks', name: 'Tarefas' },
  { id: 'timeline', name: 'Cronograma' },
  { id: 'participants', name: 'Participantes' },
  { id: 'resources', name: 'Recursos' },
  { id: 'risks', name: 'Riscos' }
]

// Computed
const canGenerate = computed(() => {
  return selectedDocuments.value.length > 0 && !isGenerating.value
})

const formattedSummary = computed(() => {
  if (!generatedSummary.value) return ''
  
  // Converter markdown para HTML básico
  return generatedSummary.value.content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mt-6 mb-3">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
    .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/^/, '<p class="mb-4">')
    .replace(/$/, '</p>')
})

const summaryWordCount = computed(() => {
  if (!generatedSummary.value) return 0
  return generatedSummary.value.content.split(/\s+/).length
})

// Methods
const addDocument = (document) => {
  if (!selectedDocuments.value.find(doc => doc.id === document.id)) {
    selectedDocuments.value.push(document)
  }
}

const removeDocument = (documentId) => {
  const index = selectedDocuments.value.findIndex(doc => doc.id === documentId)
  if (index > -1) {
    selectedDocuments.value.splice(index, 1)
  }
}

const clearDocuments = () => {
  selectedDocuments.value = []
}

const generateSummary = async () => {
  if (!canGenerate.value) return
  
  try {
    isGenerating.value = true
    
    // Verificar limites do plano
    const currentPlan = await stripeService.getCurrentPlan(user.value?.id)
    
    // Preparar configurações
    const config = {
      style: selectedStyle.value,
      analysisType: selectedAnalysis.value,
      language: selectedLanguage.value,
      length: selectedLength.value,
      focus: specificFocus.value,
      keywords: keywords.value ? keywords.value.split(',').map(k => k.trim()) : [],
      sections: includedSections.value
    }
    
    // Preparar conteúdo dos documentos
    const documentsContent = selectedDocuments.value.map(doc =>
      doc.extracted_text || doc.content || ''
    ).join('\n\n--- DOCUMENTO ---\n\n')

    if (!documentsContent.trim()) {
      throw new Error('Nenhum conteúdo de texto encontrado nos documentos selecionados')
    }

    // Gerar resumo
    const result = await aiService.generateSummary(
      documentsContent,
      config.style,
      {
        provider: 'openai',
        maxTokens: config.length === 'short' ? 500 : config.length === 'long' ? 2000 : 1000,
        temperature: 0.7,
        customPrompt: config.focus ? {
          system: `Você é um assistente especializado em criar resumos. Foque especificamente em: ${config.focus}`,
          user: (text) => `Analise o seguinte texto com foco em "${config.focus}" e crie um resumo ${config.style}:\n\n${text}\n\nResumo:`
        } : undefined
      }
    )
    
    generatedSummary.value = result
    generatedAt.value = new Date()
    
    // Emitir evento
    emit('summary-generated', {
      summary: result,
      documents: selectedDocuments.value,
      config
    })
    
    toast.success('Resumo gerado com sucesso!')
    
  } catch (error) {
    console.error('Erro ao gerar resumo:', error)
    toast.error(`Erro ao gerar resumo: ${error.message}`)
  } finally {
    isGenerating.value = false
  }
}

const copySummary = async () => {
  if (!generatedSummary.value) return
  
  try {
    await navigator.clipboard.writeText(generatedSummary.value.content)
    toast.success('Resumo copiado para a área de transferência!')
  } catch (error) {
    toast.error('Erro ao copiar resumo')
  }
}

const exportSummary = () => {
  if (!generatedSummary.value) return
  
  emit('export-requested', {
    summary: generatedSummary.value,
    documents: selectedDocuments.value,
    config: {
      style: selectedStyle.value,
      language: selectedLanguage.value,
      length: selectedLength.value
    }
  })
}

const getDocumentIcon = (type) => {
  if (type?.includes('pdf')) return PdfIcon
  if (type?.includes('word')) return WordIcon
  if (type?.startsWith('audio/')) return AudioIcon
  return DocumentIcon
}

const getCurrentStyleName = () => {
  const style = summaryStyles.find(s => s.id === selectedStyle.value)
  return style?.name || 'Padrão'
}

const getLanguageName = (code) => {
  const languages = {
    'pt-BR': 'Português',
    'en-US': 'English'
  }
  return languages[code] || code
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleString('pt-BR')
}

// Watchers
watch(() => props.documents, (newDocs) => {
  if (props.autoSelect && newDocs.length > 0) {
    selectedDocuments.value = [...newDocs]
  }
}, { immediate: true })

// Lifecycle
onMounted(() => {
  // Configurações iniciais baseadas no usuário
  if (user.value?.publicMetadata?.preferences?.language) {
    selectedLanguage.value = user.value.publicMetadata.preferences.language
  }
})

// Expose methods for parent components
defineExpose({
  addDocument,
  removeDocument,
  clearDocuments,
  generateSummary
})
</script>

<style scoped>
.summary-generator {
  @apply max-w-4xl mx-auto;
}

.style-option,
.analysis-option {
  @apply p-3 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 hover:border-primary-300 hover:bg-primary-50;
}

.style-option.selected,
.analysis-option.selected {
  @apply border-primary-500 bg-primary-50;
}

.btn-primary {
  @apply bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center;
}

.btn-secondary {
  @apply bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200;
}

.btn-icon {
  @apply p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200;
}

.summary-content {
  @apply bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto;
}

.prose {
  @apply text-gray-800 leading-relaxed;
}

.prose h1,
.prose h2,
.prose h3 {
  @apply text-gray-900;
}

.prose li {
  @apply list-disc;
}
</style>