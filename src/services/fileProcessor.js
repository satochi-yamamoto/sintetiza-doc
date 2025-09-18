import * as pdfjsLib from 'pdfjs-dist'
import mammoth from 'mammoth'
import { supabaseService } from './supabase.js'

// Configurar PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

// Tipos de arquivo suportados
export const SUPPORTED_FILE_TYPES = {
  documents: {
    'application/pdf': { ext: '.pdf', maxSize: 10 * 1024 * 1024 }, // 10MB
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { ext: '.docx', maxSize: 5 * 1024 * 1024 }, // 5MB
    'text/plain': { ext: '.txt', maxSize: 1 * 1024 * 1024 } // 1MB
  },
  audio: {
    'audio/mpeg': { ext: '.mp3', maxSize: 50 * 1024 * 1024 }, // 50MB
    'audio/wav': { ext: '.wav', maxSize: 50 * 1024 * 1024 }, // 50MB
    'audio/mp4': { ext: '.m4a', maxSize: 50 * 1024 * 1024 }, // 50MB
    'audio/webm': { ext: '.webm', maxSize: 50 * 1024 * 1024 } // 50MB
  }
}

// Serviço de processamento de arquivos
export const fileProcessorService = {
  // Validar arquivo
  validateFile(file, type = 'documents') {
    const supportedTypes = SUPPORTED_FILE_TYPES[type]
    
    if (!supportedTypes[file.type]) {
      throw new Error(`Tipo de arquivo não suportado: ${file.type}`)
    }
    
    const config = supportedTypes[file.type]
    if (file.size > config.maxSize) {
      const maxSizeMB = Math.round(config.maxSize / (1024 * 1024))
      throw new Error(`Arquivo muito grande. Tamanho máximo: ${maxSizeMB}MB`)
    }
    
    return {
      isValid: true,
      type: file.type,
      extension: config.ext,
      size: file.size,
      maxSize: config.maxSize
    }
  },
  
  // Extrair texto de PDF
  async extractTextFromPDF(file) {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      
      let fullText = ''
      const metadata = {
        numPages: pdf.numPages,
        title: '',
        author: '',
        subject: '',
        creator: ''
      }
      
      // Extrair metadados
      try {
        const pdfMetadata = await pdf.getMetadata()
        if (pdfMetadata.info) {
          metadata.title = pdfMetadata.info.Title || ''
          metadata.author = pdfMetadata.info.Author || ''
          metadata.subject = pdfMetadata.info.Subject || ''
          metadata.creator = pdfMetadata.info.Creator || ''
        }
      } catch (metaError) {
        console.warn('Erro ao extrair metadados do PDF:', metaError)
      }
      
      // Extrair texto de todas as páginas
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        try {
          const page = await pdf.getPage(pageNum)
          const textContent = await page.getTextContent()
          
          const pageText = textContent.items
            .map(item => item.str)
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim()
          
          if (pageText) {
            fullText += `\n\n--- Página ${pageNum} ---\n${pageText}`
          }
        } catch (pageError) {
          console.warn(`Erro ao processar página ${pageNum}:`, pageError)
        }
      }
      
      return {
        text: fullText.trim(),
        metadata,
        wordCount: fullText.split(/\s+/).length,
        charCount: fullText.length
      }
    } catch (error) {
      console.error('Erro ao extrair texto do PDF:', error)
      throw new Error(`Erro ao processar PDF: ${error.message}`)
    }
  },
  
  // Extrair texto de DOCX
  async extractTextFromDOCX(file) {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const result = await mammoth.extractRawText({ arrayBuffer })
      
      const text = result.value.trim()
      const warnings = result.messages || []
      
      return {
        text,
        metadata: {
          hasWarnings: warnings.length > 0,
          warnings: warnings.map(w => w.message)
        },
        wordCount: text.split(/\s+/).length,
        charCount: text.length
      }
    } catch (error) {
      console.error('Erro ao extrair texto do DOCX:', error)
      throw new Error(`Erro ao processar DOCX: ${error.message}`)
    }
  },
  
  // Extrair texto de TXT
  async extractTextFromTXT(file) {
    try {
      const text = await file.text()
      
      return {
        text: text.trim(),
        metadata: {
          encoding: 'UTF-8'
        },
        wordCount: text.split(/\s+/).length,
        charCount: text.length
      }
    } catch (error) {
      console.error('Erro ao extrair texto do TXT:', error)
      throw new Error(`Erro ao processar TXT: ${error.message}`)
    }
  },
  
  // Processar arquivo de documento
  async processDocument(file) {
    try {
      // Validar arquivo
      const validation = this.validateFile(file, 'documents')
      
      let extractionResult
      
      // Extrair texto baseado no tipo
      switch (file.type) {
        case 'application/pdf':
          extractionResult = await this.extractTextFromPDF(file)
          break
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          extractionResult = await this.extractTextFromDOCX(file)
          break
        case 'text/plain':
          extractionResult = await this.extractTextFromTXT(file)
          break
        default:
          throw new Error(`Tipo de arquivo não suportado: ${file.type}`)
      }
      
      // Verificar se o texto foi extraído com sucesso
      if (!extractionResult.text || extractionResult.text.length < 10) {
        throw new Error('Não foi possível extrair texto suficiente do arquivo')
      }
      
      return {
        ...extractionResult,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        processedAt: new Date().toISOString(),
        validation
      }
    } catch (error) {
      console.error('Erro ao processar documento:', error)
      throw error
    }
  },
  
  // Upload de arquivo para Supabase Storage
  async uploadFile(file, userId, folder = 'documents') {
    try {
      // Gerar nome único para o arquivo
      const timestamp = Date.now()
      const randomId = Math.random().toString(36).substring(2, 15)
      const fileExtension = file.name.split('.').pop()
      const fileName = `${timestamp}_${randomId}.${fileExtension}`
      const filePath = `${folder}/${userId}/${fileName}`
      
      // Upload para Supabase Storage
      const uploadResult = await supabaseService.uploadFile(
        'documents',
        filePath,
        file
      )
      
      if (uploadResult.error) {
        throw new Error(`Erro no upload: ${uploadResult.error.message}`)
      }
      
      // Obter URL pública
      const publicUrl = supabaseService.getPublicUrl('documents', filePath)
      
      return {
        path: filePath,
        publicUrl,
        fileName: file.name,
        originalName: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString()
      }
    } catch (error) {
      console.error('Erro no upload do arquivo:', error)
      throw error
    }
  },
  
  // Processar e fazer upload de documento
  async processAndUploadDocument(file, userId) {
    try {
      // Processar o documento (extrair texto)
      const processingResult = await this.processDocument(file)
      
      // Fazer upload do arquivo original
      const uploadResult = await this.uploadFile(file, userId, 'documents')
      
      return {
        ...processingResult,
        upload: uploadResult,
        status: 'completed'
      }
    } catch (error) {
      console.error('Erro ao processar e fazer upload:', error)
      throw error
    }
  },
  
  // Transcrever áudio (placeholder - implementar com Whisper API)
  async transcribeAudio(file, userId) {
    try {
      // Validar arquivo de áudio
      const validation = this.validateFile(file, 'audio')
      
      // Upload do arquivo de áudio
      const uploadResult = await this.uploadFile(file, userId, 'audio')
      
      // TODO: Implementar transcrição com OpenAI Whisper
      // Por enquanto, retornar placeholder
      const transcription = {
        text: 'Transcrição será implementada com OpenAI Whisper API',
        language: 'pt-BR',
        duration: 0,
        confidence: 0.95,
        segments: []
      }
      
      return {
        transcription,
        upload: uploadResult,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        processedAt: new Date().toISOString(),
        validation,
        status: 'completed'
      }
    } catch (error) {
      console.error('Erro ao transcrever áudio:', error)
      throw error
    }
  },
  
  // Obter informações do arquivo
  getFileInfo(file) {
    return {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: new Date(file.lastModified),
      sizeFormatted: this.formatFileSize(file.size)
    }
  },
  
  // Formatar tamanho do arquivo
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes'
    
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  },
  
  // Verificar se o tipo de arquivo é suportado
  isFileTypeSupported(file, category = 'documents') {
    return SUPPORTED_FILE_TYPES[category] && 
           SUPPORTED_FILE_TYPES[category][file.type] !== undefined
  },
  
  // Obter tipos de arquivo suportados para exibição
  getSupportedFileTypes(category = 'documents') {
    const types = SUPPORTED_FILE_TYPES[category]
    return Object.keys(types).map(mimeType => ({
      mimeType,
      extension: types[mimeType].ext,
      maxSize: types[mimeType].maxSize,
      maxSizeFormatted: this.formatFileSize(types[mimeType].maxSize)
    }))
  }
}

export default fileProcessorService