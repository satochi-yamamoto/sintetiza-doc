import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  // State
  const isLoading = ref(false)
  const isSidebarOpen = ref(false)
  const theme = ref('light')
  const language = ref('pt-BR')
  const notifications = ref([])
  const modals = ref({
    uploadDocument: false,
    exportSummary: false,
    deleteConfirmation: false,
    userSettings: false
  })
  
  // Configurações da aplicação
  const config = ref({
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedFileTypes: ['pdf', 'docx', 'txt', 'mp3', 'wav', 'm4a'],
    supportedLanguages: ['pt-BR', 'en'],
    summaryTypes: [
      { id: 'standard', name: 'Padrão', description: 'Resumo objetivo e conciso' },
      { id: 'executive', name: 'Executivo', description: 'Resumo para tomada de decisões' },
      { id: 'technical', name: 'Técnico', description: 'Resumo detalhado e técnico' },
      { id: 'educational', name: 'Educacional', description: 'Resumo didático e explicativo' }
    ],
    exportFormats: [
      { id: 'txt', name: 'Texto (.txt)', icon: 'DocumentTextIcon' },
      { id: 'pdf', name: 'PDF (.pdf)', icon: 'DocumentIcon' },
      { id: 'docx', name: 'Word (.docx)', icon: 'DocumentIcon' },
      { id: 'xlsx', name: 'Excel (.xlsx)', icon: 'TableCellsIcon' },
      { id: 'md', name: 'Markdown (.md)', icon: 'CodeBracketIcon' }
    ]
  })
  
  // Getters
  const isDarkMode = computed(() => theme.value === 'dark')
  const currentLanguage = computed(() => language.value)
  const unreadNotifications = computed(() => 
    notifications.value.filter(n => !n.read).length
  )
  
  // Actions
  function setLoading(loading) {
    isLoading.value = loading
  }
  
  function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value
  }
  
  function setSidebarOpen(open) {
    isSidebarOpen.value = open
  }
  
  function setTheme(newTheme) {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    
    // Aplicar tema no documento
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
  
  function setLanguage(newLanguage) {
    language.value = newLanguage
    localStorage.setItem('language', newLanguage)
  }
  
  function openModal(modalName) {
    if (modals.value.hasOwnProperty(modalName)) {
      modals.value[modalName] = true
    }
  }
  
  function closeModal(modalName) {
    if (modals.value.hasOwnProperty(modalName)) {
      modals.value[modalName] = false
    }
  }
  
  function closeAllModals() {
    Object.keys(modals.value).forEach(key => {
      modals.value[key] = false
    })
  }
  
  function addNotification(notification) {
    const id = Date.now().toString()
    notifications.value.unshift({
      id,
      read: false,
      createdAt: new Date(),
      ...notification
    })
    
    // Auto-remover notificações após 5 segundos (se não for persistente)
    if (!notification.persistent) {
      setTimeout(() => {
        removeNotification(id)
      }, 5000)
    }
  }
  
  function removeNotification(id) {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }
  
  function markNotificationAsRead(id) {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
      notification.read = true
    }
  }
  
  function markAllNotificationsAsRead() {
    notifications.value.forEach(n => {
      n.read = true
    })
  }
  
  function clearNotifications() {
    notifications.value = []
  }
  
  // Utilitários
  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes'
    
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
  
  function isFileTypeAllowed(fileName) {
    const extension = fileName.split('.').pop().toLowerCase()
    return config.value.allowedFileTypes.includes(extension)
  }
  
  function isFileSizeAllowed(fileSize) {
    return fileSize <= config.value.maxFileSize
  }
  
  function getSummaryTypeById(id) {
    return config.value.summaryTypes.find(type => type.id === id)
  }
  
  function getExportFormatById(id) {
    return config.value.exportFormats.find(format => format.id === id)
  }
  
  // Inicialização
  function initialize() {
    // Carregar configurações do localStorage
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    }
    
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
    
    // Detectar preferência de tema do sistema
    if (!savedTheme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
    
    // Listener para mudanças de tema do sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    })
  }
  
  return {
    // State
    isLoading,
    isSidebarOpen,
    theme,
    language,
    notifications,
    modals,
    config,
    
    // Getters
    isDarkMode,
    currentLanguage,
    unreadNotifications,
    
    // Actions
    setLoading,
    toggleSidebar,
    setSidebarOpen,
    setTheme,
    setLanguage,
    openModal,
    closeModal,
    closeAllModals,
    addNotification,
    removeNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearNotifications,
    
    // Utilities
    formatFileSize,
    isFileTypeAllowed,
    isFileSizeAllowed,
    getSummaryTypeById,
    getExportFormatById,
    initialize
  }
})