import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'
import { safeConsoleError, createStandardError } from '@/utils/errorHandler'

// Este arquivo deve ser refatorado para fazer chamadas para uma API backend
// que gerencia as chaves de forma segura

// Configuração controlada para uso de IA no navegador
const isBrowser = typeof window !== 'undefined'
const browserAIEnabled = import.meta.env.DEV || import.meta.env.VITE_ENABLE_BROWSER_AI === 'true'

if (isBrowser && !browserAIEnabled && (import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.VITE_ANTHROPIC_API_KEY)) {
  console.warn('[ai] Chaves de IA detectadas, mas o uso direto no navegador está desabilitado. Configure um backend seguro ou defina VITE_ENABLE_BROWSER_AI=true apenas em ambientes de teste.')
}

// TEMPORÁRIO: Configuração das APIs (MOVER PARA BACKEND)
const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY
const anthropicApiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

const openai = openaiApiKey && browserAIEnabled ? new OpenAI({
  apiKey: openaiApiKey,
  dangerouslyAllowBrowser: true
}) : null

const anthropic = anthropicApiKey && browserAIEnabled ? new Anthropic({
  apiKey: anthropicApiKey,
  dangerouslyAllowBrowser: true
}) : null

if (!browserAIEnabled) {
  if (openaiApiKey && !openai) {
    console.warn('[ai] Uso do OpenAI direto no navegador bloqueado. Utilize o backend para proteger a chave.')
  }
  if (anthropicApiKey && !anthropic) {
    console.warn('[ai] Uso do Anthropic direto no navegador bloqueado. Utilize o backend para proteger a chave.')
  }
}

// Prompts para diferentes tipos de resumo
const SUMMARY_PROMPTS = {
  standard: {
    system: "Você é um assistente especializado em criar resumos objetivos e concisos. Analise o texto fornecido e crie um resumo claro e direto.",
    user: (text) => `Por favor, crie um resumo objetivo do seguinte texto:\n\n${text}\n\nResumo:`
  },
  
  executive: {
    system: "Você é um consultor executivo especializado em análise de documentos. Crie resumos focados em insights estratégicos, decisões importantes e impactos no negócio.",
    user: (text) => `Analise o seguinte documento e crie um resumo executivo focado em:\n- Pontos principais\n- Decisões tomadas\n- Impactos no negócio\n- Próximos passos\n\nTexto:\n${text}\n\nResumo Executivo:`
  },
  
  technical: {
    system: "Você é um especialista técnico. Crie resumos detalhados mantendo terminologia técnica, especificações e detalhes importantes para profissionais da área.",
    user: (text) => `Crie um resumo técnico detalhado do seguinte documento, preservando:\n- Terminologia técnica\n- Especificações importantes\n- Detalhes de implementação\n- Considerações técnicas\n\nTexto:\n${text}\n\nResumo Técnico:`
  },
  
  educational: {
    system: "Você é um educador experiente. Crie resumos didáticos que expliquem conceitos de forma clara e acessível, ideal para aprendizado.",
    user: (text) => `Transforme o seguinte texto em um resumo educacional que:\n- Explique conceitos de forma simples\n- Use linguagem acessível\n- Destaque pontos de aprendizado\n- Inclua contexto quando necessário\n\nTexto:\n${text}\n\nResumo Educacional:`
  }
}

// Prompts para análise de reuniões
const MEETING_ANALYSIS_PROMPTS = {
  decisions: {
    system: "Você é especialista em análise de reuniões. Identifique e extraia todas as decisões tomadas durante a reunião.",
    user: (text) => `Analise a seguinte transcrição de reunião e identifique:\n\n1. DECISÕES TOMADAS:\n- Liste todas as decisões específicas\n- Indique quem tomou cada decisão\n- Contexto de cada decisão\n\n2. RESPONSÁVEIS:\n- Quem ficou responsável por cada ação\n\nTranscrição:\n${text}\n\nAnálise de Decisões:`
  },
  
  tasks: {
    system: "Você é especialista em gestão de projetos. Extraia todas as tarefas e pendências identificadas na reunião.",
    user: (text) => `Analise a transcrição e extraia:\n\n1. TAREFAS IDENTIFICADAS:\n- Lista de todas as tarefas mencionadas\n- Responsável por cada tarefa\n- Prazo (se mencionado)\n\n2. PENDÊNCIAS:\n- Itens que ficaram pendentes\n- Próximos passos\n\nTranscrição:\n${text}\n\nTarefas e Pendências:`
  },
  
  insights: {
    system: "Você é um analista de negócios. Identifique insights, oportunidades e pontos importantes discutidos na reunião.",
    user: (text) => `Analise a reunião e identifique:\n\n1. INSIGHTS PRINCIPAIS:\n- Descobertas importantes\n- Oportunidades identificadas\n\n2. PONTOS DE ATENÇÃO:\n- Riscos mencionados\n- Desafios identificados\n\n3. TEMAS RECORRENTES:\n- Assuntos que apareceram múltiplas vezes\n\nTranscrição:\n${text}\n\nInsights e Análise:`
  }
}

// Serviço principal de IA
export const aiService = {
  // Gerar resumo usando OpenAI
  async generateSummaryOpenAI(text, type = 'standard', options = {}) {
    // SEGURANÇA: Verificar se a instância OpenAI está disponível
    if (!openai) {
      throw new Error('OpenAI não configurado. Chaves de API devem ser movidas para o backend.')
    }

    try {
      const prompt = options.customPrompt || SUMMARY_PROMPTS[type] || SUMMARY_PROMPTS.standard

      const response = await openai.chat.completions.create({
        model: options.model || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: prompt.system },
          { role: 'user', content: prompt.user(text) }
        ],
        max_tokens: options.maxTokens || 1000,
        temperature: options.temperature || 0.7,
        top_p: options.topP || 1,
        frequency_penalty: options.frequencyPenalty || 0,
        presence_penalty: options.presencePenalty || 0
      })
      
      return {
        content: response.choices[0].message.content,
        usage: response.usage,
        model: response.model,
        provider: 'openai'
      }
    } catch (error) {
      safeConsoleError('Erro na API OpenAI:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
        code: error.code,
        type: type,
        textLength: text?.length
      })
      throw createStandardError(`Erro ao gerar resumo com OpenAI: ${error.message}`, 'OPENAI_API_ERROR', error)
    }
  },
  
  // Gerar resumo usando Claude
  async generateSummaryClaude(text, type = 'standard', options = {}) {
    // SEGURANÇA: Verificar se a instância Anthropic está disponível
    if (!anthropic) {
      throw new Error('Claude/Anthropic não configurado. Chaves de API devem ser movidas para o backend.')
    }

    try {
      const prompt = options.customPrompt || SUMMARY_PROMPTS[type] || SUMMARY_PROMPTS.standard

      const response = await anthropic.messages.create({
        model: options.model || 'claude-3-haiku-20240307',
        max_tokens: options.maxTokens || 1000,
        temperature: options.temperature || 0.7,
        system: prompt.system,
        messages: [
          { role: 'user', content: prompt.user(text) }
        ]
      })
      
      return {
        content: response.content[0].text,
        usage: response.usage,
        model: response.model,
        provider: 'anthropic'
      }
    } catch (error) {
      safeConsoleError('Erro na API Claude:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
        code: error.code,
        type: type,
        textLength: text?.length
      })
      throw createStandardError(`Erro ao gerar resumo com Claude: ${error.message}`, 'CLAUDE_API_ERROR', error)
    }
  },
  
  // Gerar resumo com fallback automático
  async generateSummary(text, type = 'standard', options = {}) {
    const preferredProvider = options.provider || 'openai'
    
    try {
      // Tentar com o provedor preferido
      if (preferredProvider === 'openai') {
        return await this.generateSummaryOpenAI(text, type, options)
      } else {
        return await this.generateSummaryClaude(text, type, options)
      }
    } catch (error) {
      console.warn(`Falha no provedor ${preferredProvider}, tentando fallback...`)
      
      try {
        // Fallback para o outro provedor
        if (preferredProvider === 'openai') {
          return await this.generateSummaryClaude(text, type, options)
        } else {
          return await this.generateSummaryOpenAI(text, type, options)
        }
      } catch (fallbackError) {
        safeConsoleError('Falha em ambos os provedores de IA:', fallbackError)
        throw createStandardError('Serviços de IA indisponíveis. Tente novamente mais tarde.', 'AI_SERVICES_UNAVAILABLE', fallbackError)
      }
    }
  },
  
  // Analisar reunião (decisões, tarefas, insights)
  async analyzeMeeting(transcript, analysisType = 'decisions', options = {}) {
    try {
      const prompt = MEETING_ANALYSIS_PROMPTS[analysisType]
      if (!prompt) {
        throw new Error(`Tipo de análise inválido: ${analysisType}`)
      }
      
      return await this.generateSummary(transcript, 'standard', {
        ...options,
        customPrompt: prompt
      })
    } catch (error) {
      safeConsoleError('Erro na análise de reunião:', error)
      throw error
    }
  },
  
  // Traduzir texto
  async translateText(text, targetLanguage = 'en', sourceLanguage = 'pt') {
    // SEGURANÇA: Verificar se a instância OpenAI está disponível
    if (!openai) {
      throw new Error('OpenAI não configurado para tradução. Chaves de API devem ser movidas para o backend.')
    }

    try {
      const prompt = `Traduza o seguinte texto de ${sourceLanguage} para ${targetLanguage}. Mantenha o tom e o contexto original:\n\n${text}`

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Você é um tradutor profissional especializado em manter o contexto e tom do texto original.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: Math.min(text.length * 2, 4000),
        temperature: 0.3
      })
      
      return {
        translatedText: response.choices[0].message.content,
        sourceLanguage,
        targetLanguage,
        usage: response.usage
      }
    } catch (error) {
      console.error('Erro na tradução:', error)
      throw createStandardError(`Erro ao traduzir texto: ${error.message}`, 'OPENAI_TRANSLATE_ERROR', error)
    }
  },
  
  // Extrair tópicos principais
  async extractTopics(text, maxTopics = 5) {
    try {
      const prompt = `Analise o seguinte texto e extraia os ${maxTopics} tópicos principais. Para cada tópico, forneça:\n1. Nome do tópico\n2. Breve descrição\n3. Relevância (1-10)\n\nTexto:\n${text}\n\nTópicos:`
      
      const response = await this.generateSummary(text, 'standard', {
        customPrompt: {
          system: 'Você é especialista em análise de conteúdo e extração de tópicos.',
          user: () => prompt
        },
        maxTokens: 500
      })
      
      return response
    } catch (error) {
      console.error('Erro na extração de tópicos:', error)
      throw error
    }
  },
  
  // Verificar qualidade do texto
  async checkTextQuality(text) {
    const metrics = {
      length: text.length,
      wordCount: text.split(/\s+/).length,
      sentenceCount: text.split(/[.!?]+/).length,
      paragraphCount: text.split(/\n\s*\n/).length,
      readabilityScore: this.calculateReadabilityScore(text),
      hasStructure: text.includes('\n') || text.includes('.')
    }
    
    // Determinar se o texto é adequado para resumo
    metrics.isGoodForSummary = (
      metrics.wordCount >= 50 && 
      metrics.wordCount <= 10000 &&
      metrics.readabilityScore > 0.3
    )
    
    return metrics
  },
  
  // Calcular score de legibilidade simples
  calculateReadabilityScore(text) {
    const words = text.split(/\s+/).length
    const sentences = text.split(/[.!?]+/).length
    const avgWordsPerSentence = words / sentences
    
    // Score simples baseado na média de palavras por frase
    // Frases muito curtas ou muito longas reduzem o score
    if (avgWordsPerSentence < 5 || avgWordsPerSentence > 25) {
      return 0.3
    } else if (avgWordsPerSentence >= 10 && avgWordsPerSentence <= 20) {
      return 1.0
    } else {
      return 0.7
    }
  }
}

export default aiService