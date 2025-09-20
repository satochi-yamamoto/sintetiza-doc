import * as pdfjsLib from 'pdfjs-dist'
import PdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?worker'
import pdfjsWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import mammoth from 'mammoth'
import { supabaseUtils } from './supabase.js'

// Configurar PDF.js worker (usar asset local empacotado pelo Vite, evitando CDN)
try {
  if (typeof window !== 'undefined' && typeof Worker !== 'undefined') {
    const workerInstance = new PdfWorker()
    // Usar porta de worker real (recomendado nas versões 4/5 do pdfjs)
    pdfjsLib.GlobalWorkerOptions.workerPort = workerInstance
  }
  // Definir também o workerSrc como fallback local (nunca CDN)
  if (pdfjsWorkerUrl) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorkerUrl
  }
} catch (e) {
  console.warn('Falha ao inicializar PDF.js Worker, aplicando fallback para workerSrc local:', e)
  try {
    if (pdfjsWorkerUrl) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorkerUrl
    }
  } catch (e2) {
    console.error('Falha ao definir workerSrc local para PDF.js:', e2)
  }
}

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
        validation,
        extraction: extractionResult
      }
    } catch (error) {
      console.error('Erro ao processar documento:', error)
      throw error
    }
  },
  
  // Upload de arquivo para Supabase Storage
  async uploadFileToSupabase(file, bucket = 'documents', path = '') {
    try {
      const fileName = `${Date.now()}_${file.name}`
      const filePath = path ? `${path}/${fileName}` : fileName
      
      // Upload para Supabase Storage
      const data = await supabaseUtils.uploadFile(bucket, filePath, file)
      
      // Obter URL pública (se o bucket for público)
      const url = supabaseUtils.getPublicUrl(bucket, filePath)
      
      return {
        path: filePath,
        url,
        data
      }
    } catch (error) {
      console.error('Erro no upload para Supabase:', error)
      throw new Error(`Falha no upload: ${error.message}`)
    }
  },
  
  // Processar e fazer upload de documento
  async processAndUploadDocument(file, options = {}) {
    const { bucket = 'documents', path = '' } = options
    
    try {
      // Primeiro processar o documento
      const processed = await this.processDocument(file)
      
      // Em seguida, fazer o upload do arquivo original
      const uploadResult = await this.uploadFileToSupabase(file, bucket, path)
      
      return {
        processed,
        upload: uploadResult
      }
    } catch (error) {
      console.error('Erro ao processar e fazer upload do documento:', error)
      throw error
    }
  },
  
  // Transcrever áudio (placeholder)
  async transcribeAudio(file) {
    // Nota: Esta função é um placeholder. A implementação real dependerá
    // da integração com a API de transcrição (por exemplo, Whisper da OpenAI)
    // e do backend para processar o áudio de forma segura.
    try {
      // Validação básica
      this.validateFile(file, 'audio')
      
      // Placeholder: Retornar um objeto simulando uma transcrição
      return {
        text: 'Transcrição de exemplo. Integração com API de transcrição pendente.',
        metadata: {
          duration: 0,
          language: 'pt-BR',
          confidence: 0
        }
      }
    } catch (error) {
      console.error('Erro na transcrição de áudio:', error)
      throw new Error(`Erro ao transcrever áudio: ${error.message}`)
    }
  }
}

// Utilitários
export function getFileInfo(file) {
  return {
    name: file.name,
    type: file.type,
    size: file.size,
    lastModified: file.lastModified,
    sizeFormatted: formatFileSize(file.size)
  }
}

export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  const kb = bytes / 1024
  if (kb < 1024) return `${kb.toFixed(2)} KB`
  const mb = kb / 1024
  return `${mb.toFixed(2)} MB`
}

export function isFileTypeSupported(file, type = 'documents') {
  const supportedTypes = SUPPORTED_FILE_TYPES[type]
  return !!supportedTypes[file.type]
}

export default fileProcessorService