// Validation utilities for forms and data

/**
 * Validation rules for different field types
 */
export const validationRules = {
  required: (value) => {
    if (value === null || value === undefined) return false
    if (typeof value === 'string') return value.trim().length > 0
    if (Array.isArray(value)) return value.length > 0
    return true
  },
  
  email: (value) => {
    if (!value) return true // Optional field
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  },
  
  minLength: (min) => (value) => {
    if (!value) return true // Optional field
    return value.length >= min
  },
  
  maxLength: (max) => (value) => {
    if (!value) return true // Optional field
    return value.length <= max
  },
  
  minValue: (min) => (value) => {
    if (value === null || value === undefined || value === '') return true
    return Number(value) >= min
  },
  
  maxValue: (max) => (value) => {
    if (value === null || value === undefined || value === '') return true
    return Number(value) <= max
  },
  
  pattern: (regex) => (value) => {
    if (!value) return true // Optional field
    return regex.test(value)
  },
  
  url: (value) => {
    if (!value) return true // Optional field
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  },
  
  phone: (value) => {
    if (!value) return true // Optional field
    const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/
    return phoneRegex.test(value.replace(/\D/g, ''))
  },
  
  cpf: (value) => {
    if (!value) return true // Optional field
    
    const cleanCPF = value.replace(/\D/g, '')
    
    if (cleanCPF.length !== 11) return false
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false
    
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i)
    }
    
    let remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cleanCPF.charAt(9))) return false
    
    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i)
    }
    
    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    
    return remainder === parseInt(cleanCPF.charAt(10))
  },
  
  cnpj: (value) => {
    if (!value) return true // Optional field
    
    const cleanCNPJ = value.replace(/\D/g, '')
    
    if (cleanCNPJ.length !== 14) return false
    if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false
    
    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    
    let sum = 0
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cleanCNPJ.charAt(i)) * weights1[i]
    }
    
    let remainder = sum % 11
    const digit1 = remainder < 2 ? 0 : 11 - remainder
    
    if (digit1 !== parseInt(cleanCNPJ.charAt(12))) return false
    
    sum = 0
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cleanCNPJ.charAt(i)) * weights2[i]
    }
    
    remainder = sum % 11
    const digit2 = remainder < 2 ? 0 : 11 - remainder
    
    return digit2 === parseInt(cleanCNPJ.charAt(13))
  },
  
  password: (value) => {
    if (!value) return true // Optional field
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
    return passwordRegex.test(value)
  },
  
  confirmPassword: (originalPassword) => (value) => {
    if (!value && !originalPassword) return true
    return value === originalPassword
  },
  
  fileSize: (maxSizeInMB) => (file) => {
    if (!file) return true // Optional field
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024
    return file.size <= maxSizeInBytes
  },
  
  fileType: (allowedTypes) => (file) => {
    if (!file) return true // Optional field
    const fileExtension = file.name.split('.').pop().toLowerCase()
    return allowedTypes.includes(fileExtension)
  },
  
  numeric: (value) => {
    if (!value) return true // Optional field
    return !isNaN(value) && !isNaN(parseFloat(value))
  },
  
  integer: (value) => {
    if (!value) return true // Optional field
    return Number.isInteger(Number(value))
  },
  
  positive: (value) => {
    if (!value) return true // Optional field
    return Number(value) > 0
  },
  
  date: (value) => {
    if (!value) return true // Optional field
    const date = new Date(value)
    return !isNaN(date.getTime())
  },
  
  futureDate: (value) => {
    if (!value) return true // Optional field
    const date = new Date(value)
    const now = new Date()
    return date > now
  },
  
  pastDate: (value) => {
    if (!value) return true // Optional field
    const date = new Date(value)
    const now = new Date()
    return date < now
  }
}

/**
 * Error messages for validation rules
 */
export const validationMessages = {
  required: 'Este campo é obrigatório',
  email: 'Digite um email válido',
  minLength: (min) => `Deve ter pelo menos ${min} caracteres`,
  maxLength: (max) => `Deve ter no máximo ${max} caracteres`,
  minValue: (min) => `Valor mínimo é ${min}`,
  maxValue: (max) => `Valor máximo é ${max}`,
  pattern: 'Formato inválido',
  url: 'Digite uma URL válida',
  phone: 'Digite um telefone válido',
  cpf: 'Digite um CPF válido',
  cnpj: 'Digite um CNPJ válido',
  password: 'Senha deve ter pelo menos 8 caracteres, 1 maiúscula, 1 minúscula e 1 número',
  confirmPassword: 'Senhas não coincidem',
  fileSize: (maxSize) => `Arquivo deve ter no máximo ${maxSize}MB`,
  fileType: (types) => `Tipos permitidos: ${types.join(', ')}`,
  numeric: 'Digite apenas números',
  integer: 'Digite um número inteiro',
  positive: 'Digite um número positivo',
  date: 'Digite uma data válida',
  futureDate: 'Data deve ser futura',
  pastDate: 'Data deve ser passada'
}

/**
 * Validate a single field
 * @param {any} value - Value to validate
 * @param {Array} rules - Array of validation rules
 * @returns {Object} Validation result
 */
export const validateField = (value, rules = []) => {
  const errors = []
  
  for (const rule of rules) {
    let isValid = false
    let message = ''
    
    if (typeof rule === 'string') {
      // Simple rule name
      isValid = validationRules[rule](value)
      message = validationMessages[rule]
    } else if (typeof rule === 'object') {
      // Rule with parameters
      const { name, params, message: customMessage } = rule
      
      if (validationRules[name]) {
        if (params) {
          isValid = validationRules[name](...params)(value)
          message = customMessage || 
            (typeof validationMessages[name] === 'function' 
              ? validationMessages[name](...params)
              : validationMessages[name])
        } else {
          isValid = validationRules[name](value)
          message = customMessage || validationMessages[name]
        }
      }
    } else if (typeof rule === 'function') {
      // Custom validation function
      const result = rule(value)
      isValid = typeof result === 'boolean' ? result : result.isValid
      message = typeof result === 'object' ? result.message : 'Valor inválido'
    }
    
    if (!isValid) {
      errors.push(message)
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate an entire form
 * @param {Object} data - Form data
 * @param {Object} schema - Validation schema
 * @returns {Object} Validation result
 */
export const validateForm = (data, schema) => {
  const errors = {}
  let isValid = true
  
  for (const [fieldName, rules] of Object.entries(schema)) {
    const fieldValue = data[fieldName]
    const fieldValidation = validateField(fieldValue, rules)
    
    if (!fieldValidation.isValid) {
      errors[fieldName] = fieldValidation.errors
      isValid = false
    }
  }
  
  return {
    isValid,
    errors
  }
}

/**
 * Common validation schemas
 */
export const validationSchemas = {
  // User registration form
  userRegistration: {
    name: ['required', { name: 'minLength', params: [2] }],
    email: ['required', 'email'],
    password: ['required', 'password'],
    confirmPassword: ['required'],
    terms: ['required']
  },
  
  // User login form
  userLogin: {
    email: ['required', 'email'],
    password: ['required']
  },
  
  // Profile update form
  profileUpdate: {
    name: ['required', { name: 'minLength', params: [2] }],
    email: ['required', 'email'],
    phone: ['phone'],
    bio: [{ name: 'maxLength', params: [500] }]
  },
  
  // Document upload form
  documentUpload: {
    title: ['required', { name: 'minLength', params: [3] }],
    description: [{ name: 'maxLength', params: [1000] }],
    file: [
      'required',
      { name: 'fileSize', params: [10] },
      { name: 'fileType', params: [['pdf', 'doc', 'docx', 'txt']] }
    ],
    category: ['required']
  },
  
  // Contact form
  contact: {
    name: ['required', { name: 'minLength', params: [2] }],
    email: ['required', 'email'],
    subject: ['required', { name: 'minLength', params: [5] }],
    message: ['required', { name: 'minLength', params: [10] }]
  },
  
  // Newsletter subscription
  newsletter: {
    email: ['required', 'email']
  },
  
  // Password reset
  passwordReset: {
    email: ['required', 'email']
  },
  
  // New password
  newPassword: {
    password: ['required', 'password'],
    confirmPassword: ['required']
  },
  
  // Company information
  companyInfo: {
    name: ['required', { name: 'minLength', params: [2] }],
    cnpj: ['cnpj'],
    email: ['required', 'email'],
    phone: ['required', 'phone'],
    website: ['url'],
    address: ['required']
  },
  
  // Billing information
  billing: {
    fullName: ['required', { name: 'minLength', params: [2] }],
    email: ['required', 'email'],
    document: ['required'],
    address: ['required'],
    city: ['required'],
    state: ['required'],
    zipCode: ['required'],
    country: ['required']
  },
  
  // API key creation
  apiKey: {
    name: ['required', { name: 'minLength', params: [3] }],
    description: [{ name: 'maxLength', params: [200] }],
    permissions: ['required']
  },
  
  // Webhook configuration
  webhook: {
    name: ['required', { name: 'minLength', params: [3] }],
    url: ['required', 'url'],
    events: ['required'],
    secret: [{ name: 'minLength', params: [8] }]
  }
}

/**
 * Sanitize input data
 * @param {any} value - Value to sanitize
 * @param {string} type - Type of sanitization
 * @returns {any} Sanitized value
 */
export const sanitizeInput = (value, type = 'text') => {
  if (value === null || value === undefined) {
    return value
  }
  
  switch (type) {
    case 'text':
      return String(value).trim()
    
    case 'email':
      return String(value).toLowerCase().trim()
    
    case 'phone':
      return String(value).replace(/\D/g, '')
    
    case 'cpf':
      return String(value).replace(/\D/g, '')
    
    case 'cnpj':
      return String(value).replace(/\D/g, '')
    
    case 'number':
      const num = Number(value)
      return isNaN(num) ? 0 : num
    
    case 'integer':
      return parseInt(value) || 0
    
    case 'boolean':
      return Boolean(value)
    
    case 'url':
      let url = String(value).trim()
      if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url
      }
      return url
    
    case 'slug':
      return String(value)
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
    
    default:
      return value
  }
}

/**
 * Sanitize form data
 * @param {Object} data - Form data
 * @param {Object} schema - Sanitization schema
 * @returns {Object} Sanitized data
 */
export const sanitizeForm = (data, schema) => {
  const sanitized = {}
  
  for (const [key, value] of Object.entries(data)) {
    const sanitizationType = schema[key] || 'text'
    sanitized[key] = sanitizeInput(value, sanitizationType)
  }
  
  return sanitized
}

/**
 * Common sanitization schemas
 */
export const sanitizationSchemas = {
  userRegistration: {
    name: 'text',
    email: 'email',
    password: 'text'
  },
  
  profileUpdate: {
    name: 'text',
    email: 'email',
    phone: 'phone',
    bio: 'text',
    website: 'url'
  },
  
  contact: {
    name: 'text',
    email: 'email',
    subject: 'text',
    message: 'text'
  },
  
  companyInfo: {
    name: 'text',
    cnpj: 'cnpj',
    email: 'email',
    phone: 'phone',
    website: 'url',
    address: 'text'
  }
}

export default {
  validationRules,
  validationMessages,
  validateField,
  validateForm,
  validationSchemas,
  sanitizeInput,
  sanitizeForm,
  sanitizationSchemas
}