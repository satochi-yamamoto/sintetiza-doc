import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'

// Configuração das APIs
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Para uso no frontend
})

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true
})

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
    try {
      const prompt = SUMMARY_PROMPTS[type] || SUMMARY_PROMPTS.standard
      
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
      console.error('Erro na API OpenAI:', error)
      throw new Error(`Erro ao gerar resumo com OpenAI: ${error.message}`)
    }
  },
  
  // Gerar resumo usando Claude
  async generateSummaryClaude(text, type = 'standard', options = {}) {
    try {
      const prompt = SUMMARY_PROMPTS[type] || SUMMARY_PROMPTS.standard
      
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
      console.error('Erro na API Claude:', error)
      throw new Error(`Erro ao gerar resumo com Claude: ${error.message}`)
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
        console.error('Falha em ambos os provedores de IA:', fallbackError)
        throw new Error('Serviços de IA indisponíveis. Tente novamente mais tarde.')
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
      console.error('Erro na análise de reunião:', error)
      throw error
    }
  },
  
  // Traduzir texto
  async translateText(text, targetLanguage = 'en', sourceLanguage = 'pt') {
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
      throw new Error(`Erro ao traduzir texto: ${error.message}`)
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