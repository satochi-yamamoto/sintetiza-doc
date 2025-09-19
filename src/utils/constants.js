// Application constants

/**
 * API Configuration
 */
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000 // 1 second
}

/**
 * Supabase Configuration
 */
export const SUPABASE_CONFIG = {
  URL: import.meta.env.VITE_SUPABASE_URL,
  ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  BUCKET_NAME: 'documents',
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt']
}

/**
 * Clerk Configuration
 */
export const CLERK_CONFIG = {
  PUBLISHABLE_KEY: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  SIGN_IN_URL: '/sign-in',
  SIGN_UP_URL: '/sign-up',
  AFTER_SIGN_IN_URL: '/dashboard',
  AFTER_SIGN_UP_URL: '/dashboard'
}

/**
 * Stripe Configuration
 */
export const STRIPE_CONFIG = {
  PUBLISHABLE_KEY: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
  WEBHOOK_SECRET: import.meta.env.VITE_STRIPE_WEBHOOK_SECRET
}

/**
 * OpenAI Configuration
 */
export const OPENAI_CONFIG = {
  API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
  MODEL: 'gpt-4-turbo-preview',
  MAX_TOKENS: 4000,
  TEMPERATURE: 0.7
}

/**
 * File Upload Configuration
 */
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: {
    DOCUMENTS: ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt'],
    AUDIO: ['mp3', 'wav', 'm4a', 'aac', 'ogg'],
    IMAGES: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
  },
  CHUNK_SIZE: 1024 * 1024, // 1MB chunks for large files
  SUPPORTED_FORMATS: [
    'pdf', 'doc', 'docx', 'txt', 'rtf', 'odt',
    'mp3', 'wav', 'm4a', 'aac', 'ogg'
  ]
}

/**
 * Summary Types and Styles
 */
export const SUMMARY_TYPES = {
  EXECUTIVE: {
    id: 'executive',
    name: 'Executivo',
    description: 'Resumo focado em pontos-chave para tomada de decisão',
    icon: 'briefcase',
    maxLength: 500
  },
  TECHNICAL: {
    id: 'technical',
    name: 'Técnico',
    description: 'Resumo detalhado com aspectos técnicos e metodológicos',
    icon: 'cog',
    maxLength: 1000
  },
  EDUCATIONAL: {
    id: 'educational',
    name: 'Educacional',
    description: 'Resumo didático para fins de aprendizado',
    icon: 'graduation-cap',
    maxLength: 800
  },
  BULLET_POINTS: {
    id: 'bullet_points',
    name: 'Tópicos',
    description: 'Resumo em formato de lista com pontos principais',
    icon: 'list',
    maxLength: 600
  },
  NARRATIVE: {
    id: 'narrative',
    name: 'Narrativo',
    description: 'Resumo em formato de texto corrido e fluido',
    icon: 'file-text',
    maxLength: 1200
  }
}

/**
 * Export Formats
 */
export const EXPORT_FORMATS = {
  WORD: {
    id: 'word',
    name: 'Microsoft Word',
    extension: 'docx',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    icon: 'file-word'
  },
  PDF: {
    id: 'pdf',
    name: 'PDF',
    extension: 'pdf',
    mimeType: 'application/pdf',
    icon: 'file-pdf'
  },
  EXCEL: {
    id: 'excel',
    name: 'Microsoft Excel',
    extension: 'xlsx',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    icon: 'file-excel'
  },
  POWERPOINT: {
    id: 'powerpoint',
    name: 'Microsoft PowerPoint',
    extension: 'pptx',
    mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    icon: 'file-powerpoint'
  },
  NOTION: {
    id: 'notion',
    name: 'Notion',
    extension: 'md',
    mimeType: 'text/markdown',
    icon: 'notion'
  },
  TRELLO: {
    id: 'trello',
    name: 'Trello',
    extension: 'json',
    mimeType: 'application/json',
    icon: 'trello'
  },
  EMAIL: {
    id: 'email',
    name: 'Email',
    extension: 'html',
    mimeType: 'text/html',
    icon: 'mail'
  },
  MARKDOWN: {
    id: 'markdown',
    name: 'Markdown',
    extension: 'md',
    mimeType: 'text/markdown',
    icon: 'markdown'
  }
}

/**
 * Subscription Plans
 */
export const SUBSCRIPTION_PLANS = {
  FREE: {
    id: 'free',
    name: 'Gratuito',
    price: 0,
    currency: 'BRL',
    interval: 'month',
    features: {
      documentsPerMonth: 5,
      maxFileSize: 5, // MB
      summaryTypes: ['executive', 'bullet_points'],
      exportFormats: ['pdf', 'word'],
      audioTranscription: false,
      translation: false,
      apiAccess: false,
      priority: 'low',
      support: 'community'
    },
    limits: {
      documents: 5,
      storage: 100, // MB
      apiCalls: 0
    }
  },
  BASIC: {
    id: 'basic',
    name: 'Básico',
    price: 29.90,
    currency: 'BRL',
    interval: 'month',
    stripeId: 'price_basic_monthly',
    stripePaymentLink: 'https://buy.stripe.com/7sY6oI00rgDp2cQ4lfes002',
    features: {
      documentsPerMonth: 50,
      maxFileSize: 10, // MB
      summaryTypes: ['executive', 'technical', 'educational', 'bullet_points'],
      exportFormats: ['pdf', 'word', 'excel', 'markdown'],
      audioTranscription: true,
      translation: false,
      apiAccess: false,
      priority: 'normal',
      support: 'email'
    },
    limits: {
      documents: 50,
      storage: 1000, // MB (1GB)
      apiCalls: 0
    }
  },
  PROFESSIONAL: {
    id: 'professional',
    name: 'Profissional',
    price: 79.90,
    currency: 'BRL',
    interval: 'month',
    stripeId: 'price_professional_monthly',
    stripePaymentLink: 'https://buy.stripe.com/6oUbJ2aF586TbNq8Bves001',
    popular: true,
    features: {
      documentsPerMonth: 200,
      maxFileSize: 25, // MB
      summaryTypes: ['executive', 'technical', 'educational', 'bullet_points', 'narrative'],
      exportFormats: ['pdf', 'word', 'excel', 'powerpoint', 'notion', 'trello', 'email', 'markdown'],
      audioTranscription: true,
      translation: true,
      apiAccess: true,
      priority: 'high',
      support: 'priority'
    },
    limits: {
      documents: 200,
      storage: 5000, // MB (5GB)
      apiCalls: 1000
    }
  },
  ENTERPRISE: {
    id: 'enterprise',
    name: 'Empresarial',
    price: 199.90,
    currency: 'BRL',
    interval: 'month',
    stripeId: 'price_enterprise_monthly',
    features: {
      documentsPerMonth: -1, // Unlimited
      maxFileSize: 100, // MB
      summaryTypes: ['executive', 'technical', 'educational', 'bullet_points', 'narrative'],
      exportFormats: ['pdf', 'word', 'excel', 'powerpoint', 'notion', 'trello', 'email', 'markdown'],
      audioTranscription: true,
      translation: true,
      apiAccess: true,
      priority: 'highest',
      support: 'dedicated',
      customIntegrations: true,
      whiteLabel: true,
      sso: true
    },
    limits: {
      documents: -1, // Unlimited
      storage: 50000, // MB (50GB)
      apiCalls: 10000
    }
  }
}

/**
 * Document Categories
 */
export const DOCUMENT_CATEGORIES = {
  BUSINESS: {
    id: 'business',
    name: 'Negócios',
    icon: 'briefcase',
    color: 'blue'
  },
  ACADEMIC: {
    id: 'academic',
    name: 'Acadêmico',
    icon: 'graduation-cap',
    color: 'green'
  },
  LEGAL: {
    id: 'legal',
    name: 'Jurídico',
    icon: 'scale',
    color: 'purple'
  },
  TECHNICAL: {
    id: 'technical',
    name: 'Técnico',
    icon: 'cog',
    color: 'orange'
  },
  MEDICAL: {
    id: 'medical',
    name: 'Médico',
    icon: 'heart',
    color: 'red'
  },
  FINANCIAL: {
    id: 'financial',
    name: 'Financeiro',
    icon: 'dollar-sign',
    color: 'yellow'
  },
  PERSONAL: {
    id: 'personal',
    name: 'Pessoal',
    icon: 'user',
    color: 'gray'
  },
  OTHER: {
    id: 'other',
    name: 'Outros',
    icon: 'folder',
    color: 'indigo'
  }
}

/**
 * Processing Status
 */
export const PROCESSING_STATUS = {
  PENDING: {
    id: 'pending',
    name: 'Pendente',
    color: 'yellow',
    icon: 'clock'
  },
  PROCESSING: {
    id: 'processing',
    name: 'Processando',
    color: 'blue',
    icon: 'loader'
  },
  COMPLETED: {
    id: 'completed',
    name: 'Concluído',
    color: 'green',
    icon: 'check-circle'
  },
  FAILED: {
    id: 'failed',
    name: 'Falhou',
    color: 'red',
    icon: 'x-circle'
  },
  CANCELLED: {
    id: 'cancelled',
    name: 'Cancelado',
    color: 'gray',
    icon: 'x'
  }
}

/**
 * Languages
 */
export const LANGUAGES = {
  PT_BR: {
    id: 'pt-BR',
    name: 'Português (Brasil)',
    flag: '🇧🇷',
    code: 'pt'
  },
  EN_US: {
    id: 'en-US',
    name: 'English (US)',
    flag: '🇺🇸',
    code: 'en'
  },
  ES_ES: {
    id: 'es-ES',
    name: 'Español',
    flag: '🇪🇸',
    code: 'es'
  },
  FR_FR: {
    id: 'fr-FR',
    name: 'Français',
    flag: '🇫🇷',
    code: 'fr'
  },
  DE_DE: {
    id: 'de-DE',
    name: 'Deutsch',
    flag: '🇩🇪',
    code: 'de'
  },
  IT_IT: {
    id: 'it-IT',
    name: 'Italiano',
    flag: '🇮🇹',
    code: 'it'
  }
}

/**
 * Notification Types
 */
export const NOTIFICATION_TYPES = {
  SUCCESS: {
    id: 'success',
    name: 'Sucesso',
    color: 'green',
    icon: 'check-circle'
  },
  ERROR: {
    id: 'error',
    name: 'Erro',
    color: 'red',
    icon: 'x-circle'
  },
  WARNING: {
    id: 'warning',
    name: 'Aviso',
    color: 'yellow',
    icon: 'alert-triangle'
  },
  INFO: {
    id: 'info',
    name: 'Informação',
    color: 'blue',
    icon: 'info'
  }
}

/**
 * Theme Configuration
 */
export const THEME_CONFIG = {
  LIGHT: {
    id: 'light',
    name: 'Claro',
    icon: 'sun'
  },
  DARK: {
    id: 'dark',
    name: 'Escuro',
    icon: 'moon'
  },
  SYSTEM: {
    id: 'system',
    name: 'Sistema',
    icon: 'monitor'
  }
}

/**
 * Date Formats
 */
export const DATE_FORMATS = {
  SHORT: 'dd/MM/yyyy',
  MEDIUM: 'dd/MM/yyyy HH:mm',
  LONG: 'dd \de MMMM \de yyyy',
  FULL: 'EEEE, dd \de MMMM \de yyyy HH:mm',
  ISO: 'yyyy-MM-dd',
  TIME: 'HH:mm',
  DATETIME: 'yyyy-MM-dd HH:mm:ss'
}

/**
 * Pagination Configuration
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
  MAX_VISIBLE_PAGES: 5
}

/**
 * Search Configuration
 */
export const SEARCH_CONFIG = {
  MIN_QUERY_LENGTH: 2,
  DEBOUNCE_DELAY: 300,
  MAX_RESULTS: 50,
  HIGHLIGHT_CLASS: 'search-highlight'
}

/**
 * Cache Configuration
 */
export const CACHE_CONFIG = {
  DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes
  USER_TTL: 15 * 60 * 1000, // 15 minutes
  DOCUMENTS_TTL: 10 * 60 * 1000, // 10 minutes
  SETTINGS_TTL: 30 * 60 * 1000, // 30 minutes
  MAX_CACHE_SIZE: 100 // Maximum number of cached items
}

/**
 * Error Codes
 */
export const ERROR_CODES = {
  // Authentication errors
  AUTH_REQUIRED: 'AUTH_REQUIRED',
  AUTH_INVALID: 'AUTH_INVALID',
  AUTH_EXPIRED: 'AUTH_EXPIRED',
  
  // Authorization errors
  FORBIDDEN: 'FORBIDDEN',
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
  
  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',
  
  // File errors
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  FILE_TYPE_NOT_SUPPORTED: 'FILE_TYPE_NOT_SUPPORTED',
  FILE_UPLOAD_FAILED: 'FILE_UPLOAD_FAILED',
  FILE_NOT_FOUND: 'FILE_NOT_FOUND',
  
  // Processing errors
  PROCESSING_FAILED: 'PROCESSING_FAILED',
  PROCESSING_TIMEOUT: 'PROCESSING_TIMEOUT',
  PROCESSING_CANCELLED: 'PROCESSING_CANCELLED',
  
  // Subscription errors
  SUBSCRIPTION_REQUIRED: 'SUBSCRIPTION_REQUIRED',
  SUBSCRIPTION_EXPIRED: 'SUBSCRIPTION_EXPIRED',
  SUBSCRIPTION_LIMIT_EXCEEDED: 'SUBSCRIPTION_LIMIT_EXCEEDED',
  
  // API errors
  API_ERROR: 'API_ERROR',
  API_TIMEOUT: 'API_TIMEOUT',
  API_RATE_LIMIT: 'API_RATE_LIMIT',
  
  // Network errors
  NETWORK_ERROR: 'NETWORK_ERROR',
  CONNECTION_FAILED: 'CONNECTION_FAILED',
  
  // Server errors
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  
  // Generic errors
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  OPERATION_FAILED: 'OPERATION_FAILED'
}

/**
 * Success Messages
 */
export const SUCCESS_MESSAGES = {
  DOCUMENT_UPLOADED: 'Documento enviado com sucesso!',
  SUMMARY_GENERATED: 'Resumo gerado com sucesso!',
  DOCUMENT_EXPORTED: 'Documento exportado com sucesso!',
  PROFILE_UPDATED: 'Perfil atualizado com sucesso!',
  SETTINGS_SAVED: 'Configurações salvas com sucesso!',
  SUBSCRIPTION_UPDATED: 'Assinatura atualizada com sucesso!',
  EMAIL_SENT: 'Email enviado com sucesso!',
  PASSWORD_CHANGED: 'Senha alterada com sucesso!',
  ACCOUNT_CREATED: 'Conta criada com sucesso!',
  LOGIN_SUCCESS: 'Login realizado com sucesso!',
  LOGOUT_SUCCESS: 'Logout realizado com sucesso!'
}

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
  [ERROR_CODES.AUTH_REQUIRED]: 'Autenticação necessária',
  [ERROR_CODES.AUTH_INVALID]: 'Credenciais inválidas',
  [ERROR_CODES.AUTH_EXPIRED]: 'Sessão expirada',
  [ERROR_CODES.FORBIDDEN]: 'Acesso negado',
  [ERROR_CODES.INSUFFICIENT_PERMISSIONS]: 'Permissões insuficientes',
  [ERROR_CODES.VALIDATION_ERROR]: 'Erro de validação',
  [ERROR_CODES.INVALID_INPUT]: 'Dados inválidos',
  [ERROR_CODES.MISSING_REQUIRED_FIELD]: 'Campo obrigatório não preenchido',
  [ERROR_CODES.FILE_TOO_LARGE]: 'Arquivo muito grande',
  [ERROR_CODES.FILE_TYPE_NOT_SUPPORTED]: 'Tipo de arquivo não suportado',
  [ERROR_CODES.FILE_UPLOAD_FAILED]: 'Falha no upload do arquivo',
  [ERROR_CODES.FILE_NOT_FOUND]: 'Arquivo não encontrado',
  [ERROR_CODES.PROCESSING_FAILED]: 'Falha no processamento',
  [ERROR_CODES.PROCESSING_TIMEOUT]: 'Timeout no processamento',
  [ERROR_CODES.PROCESSING_CANCELLED]: 'Processamento cancelado',
  [ERROR_CODES.SUBSCRIPTION_REQUIRED]: 'Assinatura necessária',
  [ERROR_CODES.SUBSCRIPTION_EXPIRED]: 'Assinatura expirada',
  [ERROR_CODES.SUBSCRIPTION_LIMIT_EXCEEDED]: 'Limite da assinatura excedido',
  [ERROR_CODES.API_ERROR]: 'Erro na API',
  [ERROR_CODES.API_TIMEOUT]: 'Timeout na API',
  [ERROR_CODES.API_RATE_LIMIT]: 'Limite de requisições excedido',
  [ERROR_CODES.NETWORK_ERROR]: 'Erro de rede',
  [ERROR_CODES.CONNECTION_FAILED]: 'Falha na conexão',
  [ERROR_CODES.INTERNAL_SERVER_ERROR]: 'Erro interno do servidor',
  [ERROR_CODES.SERVICE_UNAVAILABLE]: 'Serviço indisponível',
  [ERROR_CODES.UNKNOWN_ERROR]: 'Erro desconhecido',
  [ERROR_CODES.OPERATION_FAILED]: 'Operação falhou'
}

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'sintetiza_user_preferences',
  THEME: 'sintetiza_theme',
  LANGUAGE: 'sintetiza_language',
  RECENT_DOCUMENTS: 'sintetiza_recent_documents',
  DRAFT_DOCUMENTS: 'sintetiza_draft_documents',
  SEARCH_HISTORY: 'sintetiza_search_history',
  ONBOARDING_COMPLETED: 'sintetiza_onboarding_completed',
  LAST_SYNC: 'sintetiza_last_sync'
}

/**
 * Routes
 */
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  DOCUMENTS: '/documents',
  SUMMARIES: '/summaries',
  SETTINGS: '/settings',
  PRICING: '/pricing',
  ABOUT: '/about',
  CONTACT: '/contact',
  HELP: '/help',
  BLOG: '/blog',
  STATUS: '/status',
  API_DOCS: '/api-docs',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password'
  }
}

export default {
  API_CONFIG,
  SUPABASE_CONFIG,
  CLERK_CONFIG,
  STRIPE_CONFIG,
  OPENAI_CONFIG,
  FILE_UPLOAD,
  SUMMARY_TYPES,
  EXPORT_FORMATS,
  SUBSCRIPTION_PLANS,
  DOCUMENT_CATEGORIES,
  PROCESSING_STATUS,
  LANGUAGES,
  NOTIFICATION_TYPES,
  THEME_CONFIG,
  DATE_FORMATS,
  PAGINATION,
  SEARCH_CONFIG,
  CACHE_CONFIG,
  ERROR_CODES,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  STORAGE_KEYS,
  ROUTES
}