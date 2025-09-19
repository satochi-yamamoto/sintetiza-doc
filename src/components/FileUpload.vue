<template>
  <div class="file-upload-container">
    <!-- Área de Upload -->
    <div 
      class="upload-area"
      :class="{
        'drag-over': isDragOver,
        'uploading': isUploading,
        'error': hasError
      }"
      @drop="handleDrop"
      @dragover.prevent="handleDragOver"
      @dragleave="handleDragLeave"
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        :accept="acceptedTypes"
        :multiple="allowMultiple"
        @change="handleFileSelect"
        class="hidden"
      />
      
      <!-- Conteúdo da área de upload -->
      <div class="upload-content">
        <div v-if="!isUploading" class="upload-icon">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
        </div>
        
        <div v-else class="upload-spinner">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
        
        <div class="upload-text">
          <p v-if="!isUploading" class="text-lg font-medium text-gray-700">
            {{ isDragOver ? 'Solte os arquivos aqui' : 'Arraste arquivos ou clique para selecionar' }}
          </p>
          <p v-else class="text-lg font-medium text-primary-600">
            Processando arquivo{{ files.length > 1 ? 's' : '' }}...
          </p>
          
          <p class="text-sm text-gray-500 mt-2">
            {{ supportedFormatsText }}
          </p>
          
          <p v-if="maxFileSize" class="text-xs text-gray-400 mt-1">
            Tamanho máximo: {{ formatFileSize(maxFileSize) }}
          </p>
        </div>
      </div>
    </div>
    
    <!-- Lista de arquivos selecionados -->
    <div v-if="files.length > 0" class="files-list mt-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">
        Arquivos Selecionados ({{ files.length }})
      </h3>
      
      <div class="space-y-3">
        <div 
          v-for="(file, index) in files" 
          :key="index"
          class="file-item"
          :class="{
            'processing': file.status === 'processing',
            'completed': file.status === 'completed',
            'error': file.status === 'error'
          }"
        >
          <div class="file-info">
            <div class="file-icon">
              <component :is="getFileIcon(file.type)" class="w-8 h-8" />
            </div>
            
            <div class="file-details">
              <p class="file-name">{{ file.name }}</p>
              <p class="file-meta">
                {{ formatFileSize(file.size) }} • {{ getFileTypeLabel(file.type) }}
              </p>
              
              <!-- Progresso -->
              <div v-if="file.status === 'processing'" class="progress-bar mt-2">
                <div class="progress-fill" :style="{ width: file.progress + '%' }"></div>
              </div>
              
              <!-- Resultado -->
              <div v-if="file.result" class="file-result mt-2">
                <p class="text-sm text-gray-600">
                  <span class="font-medium">Texto extraído:</span> 
                  {{ file.result.wordCount }} palavras
                </p>
              </div>
              
              <!-- Erro -->
              <div v-if="file.error" class="file-error mt-2">
                <p class="text-sm text-red-600">
                  <span class="font-medium">Erro:</span> {{ file.error }}
                </p>
              </div>
            </div>
          </div>
          
          <div class="file-actions">
            <!-- Status -->
            <div class="file-status">
              <div v-if="file.status === 'processing'" class="status-processing">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
              </div>
              
              <div v-else-if="file.status === 'completed'" class="status-completed">
                <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
              </div>
              
              <div v-else-if="file.status === 'error'" class="status-error">
                <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>
            
            <!-- Remover arquivo -->
            <button 
              @click="removeFile(index)"
              class="remove-btn"
              :disabled="file.status === 'processing'"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Botões de ação -->
    <div v-if="files.length > 0" class="actions mt-6">
      <button 
        @click="processFiles"
        :disabled="isUploading || !hasValidFiles"
        class="btn-primary"
      >
        <svg v-if="isUploading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ isUploading ? 'Processando...' : 'Processar Arquivos' }}
      </button>
      
      <button 
        @click="clearFiles"
        :disabled="isUploading"
        class="btn-secondary ml-3"
      >
        Limpar Tudo
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useToast } from 'vue-toastification'
import { fileProcessorService } from '../services/fileProcessor.js'
import { useAuth, useUser } from '@clerk/vue'
import { stripeService } from '../services/stripe.js'
import { setSupabaseAccessToken } from '../services/supabase.js'

// Props
const props = defineProps({
  allowMultiple: {
    type: Boolean,
    default: true
  },
  fileType: {
    type: String,
    default: 'documents', // 'documents' ou 'audio'
    validator: value => ['documents', 'audio'].includes(value)
  },
  maxFileSize: {
    type: Number,
    default: null
  }
})

// Emits
const emit = defineEmits(['files-processed', 'file-error', 'processing-start', 'processing-complete'])

// Composables
const toast = useToast()

// Estados de autenticação do Clerk
const { isLoaded: authLoaded, isSignedIn, userId, getToken } = useAuth()
const { isLoaded: userLoaded, user } = useUser()

// Refs
const fileInput = ref(null)
const files = ref([])
const isDragOver = ref(false)
const isUploading = ref(false)
const hasError = ref(false)

// Computed
const acceptedTypes = computed(() => {
  const types = fileProcessorService.getSupportedFileTypes(props.fileType)
  return types.map(t => t.extension).join(',')
})

const supportedFormatsText = computed(() => {
  const types = fileProcessorService.getSupportedFileTypes(props.fileType)
  const extensions = types.map(t => t.extension.toUpperCase().replace('.', ''))
  return `Formatos suportados: ${extensions.join(', ')}`
})

const hasValidFiles = computed(() => {
  return files.value.some(file => file.status !== 'error')
})

// Methods
const triggerFileInput = () => {
  if (!isUploading.value) {
    fileInput.value?.click()
  }
}

const handleDragOver = (e) => {
  e.preventDefault()
  isDragOver.value = true
}

const handleDragLeave = () => {
  isDragOver.value = false
}

const handleDrop = (e) => {
  e.preventDefault()
  isDragOver.value = false
  
  const droppedFiles = Array.from(e.dataTransfer.files)
  addFiles(droppedFiles)
}

const handleFileSelect = (e) => {
  const selectedFiles = Array.from(e.target.files)
  addFiles(selectedFiles)
  
  // Limpar input
  e.target.value = ''
}

const addFiles = async (newFiles) => {
  try {
    if (!authLoaded.value || !userLoaded.value) {
      toast.info('Carregando sistema de autenticação...')
      return
    }

    if (!isSignedIn.value || !userId?.value || !user?.value?.id) {
      // Removido log temporário de debug
      toast.error('Você precisa estar logado para fazer upload de arquivos')
      return
    }

    // Garantir token do Clerk aplicado ao Supabase
    const token = await getToken({ template: 'supabase' })
    if (!token) {
      // Removido log temporário de aviso
      toast.error('Falha ao obter token de sessão. Tente novamente.')
      return
    }
    setSupabaseAccessToken(token)

    // Removidos logs temporários de debug de autenticação e plano

    const currentPlan = await stripeService.getCurrentPlan(userId.value)
    
    for (const file of newFiles) {
      try {
        // Validar arquivo
        const validation = fileProcessorService.validateFile(file, props.fileType)
        
        // Verificar se o formato é suportado pelo plano
        const fileExtension = file.name.split('.').pop().toLowerCase()
        if (!stripeService.isFormatSupported(currentPlan.id, fileExtension)) {
          throw new Error(`Formato ${fileExtension.toUpperCase()} não suportado no seu plano atual`)
        }

        // Verificar tamanho máximo do plano
        if (file.size > currentPlan.limits.maxFileSize) {
          throw new Error(`Arquivo muito grande para o seu plano. Máximo: ${formatFileSize(currentPlan.limits.maxFileSize)}`)
        }
        
        // Adicionar à lista
        files.value.push({
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'pending',
          progress: 0,
          result: null,
          error: null,
          validation
        })
      } catch (error) {
        // Removido log temporário; manter feedback ao usuário
        toast.error(`Erro no arquivo ${file.name}: ${error.message}`)
      }
    }
  } catch (error) {
    // Removido log temporário; manter feedback ao usuário
    toast.error(`Erro ao adicionar arquivos: ${error.message}`)
  }
}

const removeFile = (index) => {
  if (files.value[index].status !== 'processing') {
    files.value.splice(index, 1)
  }
}

const clearFiles = () => {
  if (!isUploading.value) {
    files.value = []
    hasError.value = false
  }
}

const processFiles = async () => {
  try {
    if (!authLoaded.value || !userLoaded.value) {
      toast.info('Carregando sistema de autenticação...')
      return
    }

    if (!isSignedIn.value || !userId?.value || !user?.value?.id) {
      // Removido log temporário de debug
      toast.error('Você precisa estar logado para processar arquivos')
      return
    }

    // Garantir token do Clerk aplicado ao Supabase
    const token = await getToken({ template: 'supabase' })
    if (!token) {
      // Removido log temporário de aviso
      toast.error('Falha ao obter token de sessão. Tente novamente.')
      return
    }
    setSupabaseAccessToken(token)

    // Removidos logs temporários de debug de autenticação

    isUploading.value = true
    hasError.value = false
    emit('processing-start')

    const results = []
    
    for (let i = 0; i < files.value.length; i++) {
      const fileItem = files.value[i]
      
      if (fileItem.status === 'error') continue
      
      try {
        fileItem.status = 'processing'
        fileItem.progress = 0
        
        // Simular progresso
        const progressInterval = setInterval(() => {
          if (fileItem.progress < 90) {
            fileItem.progress += Math.random() * 20
          }
        }, 200)
        
        let result
        
        if (props.fileType === 'documents') {
          result = await fileProcessorService.processAndUploadDocument(
            fileItem.file,
            user.value.id
          )
        } else {
          result = await fileProcessorService.transcribeAudio(
            fileItem.file,
            user.value.id
          )
        }
        
        clearInterval(progressInterval)
        
        fileItem.progress = 100
        fileItem.status = 'completed'
        fileItem.result = result
        
        results.push({
          file: fileItem,
          result
        })
        
      } catch (error) {
        fileItem.status = 'error'
        fileItem.error = error.message
        hasError.value = true
        
        emit('file-error', {
          file: fileItem,
          error: error.message
        })
        
        toast.error(`Erro ao processar ${fileItem.name}: ${error.message}`)
      }
    }
    
    if (results.length > 0) {
      emit('files-processed', results)
      toast.success(`${results.length} arquivo(s) processado(s) com sucesso!`)
    }
    
  } catch (error) {
    toast.error(`Erro no processamento: ${error.message}`)
    hasError.value = true
  } finally {
    isUploading.value = false
    emit('processing-complete')
  }
}

const formatFileSize = (bytes) => {
  return fileProcessorService.formatFileSize(bytes)
}

const getFileTypeLabel = (mimeType) => {
  const typeMap = {
    'application/pdf': 'PDF',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word',
    'text/plain': 'Texto',
    'audio/mpeg': 'MP3',
    'audio/wav': 'WAV',
    'audio/mp4': 'M4A',
    'audio/webm': 'WebM'
  }
  
  return typeMap[mimeType] || 'Desconhecido'
}

const getFileIcon = (mimeType) => {
  // Retornar componente de ícone baseado no tipo
  if (mimeType.startsWith('audio/')) {
    return 'AudioIcon'
  } else if (mimeType === 'application/pdf') {
    return 'PdfIcon'
  } else if (mimeType.includes('word')) {
    return 'WordIcon'
  } else {
    return 'DocumentIcon'
  }
}

// Watchers
watch(() => files.value.length, (newLength) => {
  if (newLength === 0) {
    hasError.value = false
  }
})
</script>

<style scoped>
.file-upload-container {
  @apply w-full;
}

.upload-area {
  @apply border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer transition-all duration-200 hover:border-primary-400 hover:bg-primary-50;
}

.upload-area.drag-over {
  @apply border-primary-500 bg-primary-100;
}

.upload-area.uploading {
  @apply border-primary-500 bg-primary-50 cursor-not-allowed;
}

.upload-area.error {
  @apply border-red-300 bg-red-50;
}

.upload-content {
  @apply flex flex-col items-center;
}

.files-list {
  @apply bg-gray-50 rounded-lg p-4;
}

.file-item {
  @apply bg-white rounded-lg p-4 border border-gray-200 flex items-center justify-between;
}

.file-item.processing {
  @apply border-primary-200 bg-primary-50;
}

.file-item.completed {
  @apply border-green-200 bg-green-50;
}

.file-item.error {
  @apply border-red-200 bg-red-50;
}

.file-info {
  @apply flex items-center flex-1;
}

.file-icon {
  @apply mr-3 text-gray-400;
}

.file-details {
  @apply flex-1;
}

.file-name {
  @apply font-medium text-gray-900 truncate;
}

.file-meta {
  @apply text-sm text-gray-500;
}

.progress-bar {
  @apply w-full bg-gray-200 rounded-full h-2;
}

.progress-fill {
  @apply bg-primary-600 h-2 rounded-full transition-all duration-300;
}

.file-actions {
  @apply flex items-center space-x-2;
}

.remove-btn {
  @apply p-1 text-gray-400 hover:text-red-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed;
}

.actions {
  @apply flex justify-center;
}

.btn-primary {
  @apply bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center;
}

.btn-secondary {
  @apply bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200;
}
</style>