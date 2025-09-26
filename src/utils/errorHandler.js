/**
 * Utilitários para tratamento seguro de erros
 * Previne o problema [object Object] em logs e sistemas de monitoramento
 */

/**
 * Serializa um erro de forma segura para string
 * @param {any} error - O erro a ser serializado
 * @param {string} fallbackMessage - Mensagem padrão se não conseguir extrair informação do erro
 * @returns {string} - String representando o erro
 */
export function safeErrorToString(error, fallbackMessage = 'Erro desconhecido') {
  if (!error) {
    return fallbackMessage
  }

  // Se já é uma string, retorna diretamente
  if (typeof error === 'string') {
    return error
  }

  // Se é um objeto Error padrão
  if (error instanceof Error) {
    return error.message || error.toString() || fallbackMessage
  }

  // Se é um objeto com propriedade message
  if (error && typeof error === 'object' && error.message) {
    return String(error.message)
  }

  // Se é um objeto com propriedade error
  if (error && typeof error === 'object' && error.error) {
    return safeErrorToString(error.error, fallbackMessage)
  }

  // Se é um objeto com propriedade data (comum em respostas de API)
  if (error && typeof error === 'object' && error.data) {
    return safeErrorToString(error.data, fallbackMessage)
  }

  // Tenta converter para string de forma segura
  try {
    const stringified = String(error)
    if (stringified && stringified !== '[object Object]') {
      return stringified
    }
  } catch (_) {
    // Ignora erros de conversão
  }

  // Tenta JSON.stringify como último recurso
  try {
    const jsonString = JSON.stringify(error)
    if (jsonString && jsonString !== '{}') {
      return jsonString
    }
  } catch (_) {
    // Ignora erros de serialização JSON
  }

  return fallbackMessage
}

/**
 * Extrai informações detalhadas de um erro para logging
 * @param {any} error - O erro a ser analisado
 * @returns {object} - Objeto com informações estruturadas do erro
 */
export function extractErrorInfo(error) {
  const info = {
    message: safeErrorToString(error),
    type: typeof error,
    name: null,
    stack: null,
    code: null,
    status: null,
    details: null
  }

  if (error instanceof Error) {
    info.name = error.name
    info.stack = error.stack
    info.code = error.code
  }

  if (error && typeof error === 'object') {
    info.code = error.code || error.statusCode || error.status
    info.status = error.status || error.statusCode
    info.details = error.details || error.data
  }

  return info
}

/**
 * Cria um erro padronizado para a aplicação
 * @param {string} message - Mensagem do erro
 * @param {string} code - Código do erro
 * @param {any} originalError - Erro original (opcional)
 * @returns {Error} - Erro padronizado
 */
export function createAppError(message, code = 'UNKNOWN_ERROR', originalError = null) {
  const error = new Error(message)
  error.code = code

  if (originalError) {
    error.originalError = originalError
    error.originalMessage = safeErrorToString(originalError)

    // Preserva stack trace se disponível
    if (originalError instanceof Error && originalError.stack) {
      error.stack = originalError.stack
    }
  }

  return error
}

/**
 * Cria um erro padronizado com metadados seguros
 * @param {string} message
 * @param {string} code
 * @param {any} originalError
 * @param {object} context
 * @returns {Error}
 */
export function createStandardError(message, code = 'UNKNOWN_ERROR', originalError = null, context = null) {
  const error = createAppError(message, code, originalError)

  if (context && typeof context === 'object') {
    error.context = { ...context }
  }

  return error
}

/**
 * Wrapper para console.error que garante serialização segura
 * @param {string} prefix - Prefixo da mensagem
 * @param {any} error - Erro a ser logado
 * @param {object} context - Contexto adicional (opcional)
 */
export function safeConsoleError(prefix, error, context = {}) {
  const errorInfo = extractErrorInfo(error)
  
  console.error(prefix, {
    message: errorInfo.message,
    name: errorInfo.name,
    code: errorInfo.code,
    status: errorInfo.status,
    stack: errorInfo.stack,
    context
  })
}

/**
 * Wrapper para console.warn que garante serialização segura
 * @param {string} prefix - Prefixo da mensagem
 * @param {any} error - Erro/aviso a ser logado
 * @param {object} context - Contexto adicional (opcional)
 */
export function safeConsoleWarn(prefix, error, context = {}) {
  const errorInfo = extractErrorInfo(error)
  
  console.warn(prefix, {
    message: errorInfo.message,
    name: errorInfo.name,
    code: errorInfo.code,
    status: errorInfo.status,
    stack: errorInfo.stack,
    context
  })
}

/**
 * Wrapper para toast.error que garante serialização segura
 * @param {any} error - Erro a ser exibido
 * @param {string} fallbackMessage - Mensagem padrão
 * @returns {string} - Mensagem formatada para exibição
 */
export function safeToastError(error, fallbackMessage = 'Ocorreu um erro inesperado') {
  return safeErrorToString(error, fallbackMessage)
}

/**
 * Interceptador para Sentry que garante serialização segura
 * @param {any} error - Erro a ser enviado ao Sentry
 * @param {object} context - Contexto adicional
 * @returns {Error} - Erro formatado para o Sentry
 */
export function prepareSentryError(error, context = {}) {
  // Se já é um Error válido, retorna diretamente
  if (error instanceof Error) {
    return error
  }

  // Cria um novo Error com informações seguras
  const message = safeErrorToString(error, 'Erro não identificado')
  const sentryError = new Error(message)
  
  // Adiciona contexto adicional
  if (context && Object.keys(context).length > 0) {
    sentryError.context = context
  }
  
  // Preserva informações originais se disponível
  if (error && typeof error === 'object') {
    sentryError.originalError = {
      type: typeof error,
      code: error.code,
      status: error.status || error.statusCode,
      name: error.name
    }
  }
  
  return sentryError
}