<template>
  <header class="app-header">
    <div class="header-container">
      <!-- Logo e Navegação Principal -->
      <div class="header-left">
        <!-- Logo -->
        <router-link to="/" class="logo-link">
          <div class="logo">
            <svg class="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
            </svg>
            <span class="logo-text">SintetizaDoc</span>
          </div>
        </router-link>

        <!-- Navegação Desktop -->
        <nav class="desktop-nav">
          <router-link 
            v-for="item in navigationItems" 
            :key="item.path"
            :to="item.path"
            class="nav-link"
            :class="{ 'active': isActiveRoute(item.path) }"
          >
            {{ item.label }}
          </router-link>
        </nav>
      </div>

      <!-- Ações do Header -->
      <div class="header-right">
        <!-- Seletor de Idioma -->
        <div class="language-selector">
          <button 
            @click="toggleLanguageMenu"
            class="language-btn"
            :class="{ 'active': showLanguageMenu }"
          >
            <span class="flag-icon">{{ currentLanguageFlag }}</span>
            <span class="language-code">{{ appStore.currentLanguage.toUpperCase() }}</span>
            <svg class="chevron-icon" :class="{ 'rotate': showLanguageMenu }" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          
          <div v-if="showLanguageMenu" class="language-menu">
            <button 
              v-for="lang in availableLanguages"
              :key="lang.code"
              @click="changeLanguage(lang.code)"
              class="language-option"
              :class="{ 'active': appStore.currentLanguage === lang.code }"
            >
              <span class="flag-icon">{{ lang.flag }}</span>
              <span class="language-name">{{ lang.name }}</span>
            </button>
          </div>
        </div>

        <!-- Tema Toggle -->
        <button 
          @click="appStore.toggleTheme()"
          class="theme-toggle"
          :title="appStore.isDarkMode ? 'Modo Claro' : 'Modo Escuro'"
        >
          <svg v-if="appStore.isDarkMode" class="theme-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
          </svg>
          <svg v-else class="theme-icon" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </button>

        <!-- Autenticação (Supabase) -->
        <!-- Bloco quando autenticado -->
        <template v-if="isSignedIn">
          <!-- Dashboard Link -->
          <router-link
            to="/dashboard"
            class="dashboard-link"
            title="Ir para Dashboard"
          >
            <svg class="dashboard-icon" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            <span class="dashboard-text">Dashboard</span>
          </router-link>

          <!-- Notificações -->
          <div class="notifications">
            <button
              @click="toggleNotifications"
              class="notifications-btn"
              :class="{ 'has-unread': hasUnreadNotifications }"
            >
              <svg class="notification-icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2C7.79086 2 6 3.79086 6 6V8C6 9.10457 5.10457 10 4 10H3C2.44772 10 2 10.4477 2 11C2 11.5523 2.44772 12 3 12H17C17.5523 12 18 11.5523 18 11C18 10.4477 17.5523 10 17 10H16C14.8954 10 14 9.10457 14 8V6C14 3.79086 12.2091 2 10 2Z" />
                <path d="M8.5 14C8.5 15.3807 9.11929 16 10.5 16C11.8807 16 12.5 15.3807 12.5 14H8.5Z" />
              </svg>
              <span v-if="unreadCount > 0" class="notification-badge">{{ unreadCount }}</span>
            </button>

            <div v-if="showNotifications" class="notifications-dropdown">
              <div class="notifications-header">
                <h3>Notificações</h3>
                <button @click="markAllAsRead" class="mark-all-read">Marcar todas como lidas</button>
              </div>

              <div class="notifications-list">
                <div
                  v-for="notification in notifications"
                  :key="notification.id"
                  class="notification-item"
                  :class="{ 'unread': !notification.read }"
                  @click="markAsRead(notification.id)"
                >
                  <div class="notification-content">
                    <h4>{{ notification.title }}</h4>
                    <p>{{ notification.message }}</p>
                    <span class="notification-time">{{ formatTime(notification.created_at) }}</span>
                  </div>
                </div>

                <div v-if="notifications.length === 0" class="no-notifications">
                  <p>Nenhuma notificação</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Menu de Usuário -->
          <div class="user-menu">
            <button @click="showUserMenu = !showUserMenu" class="user-menu-btn">
              <div v-if="userAvatarUrl" class="w-8 h-8 rounded-full overflow-hidden">
                <img :src="userAvatarUrl" alt="Avatar" class="user-avatar" />
              </div>
              <div v-else class="user-avatar-placeholder">
                {{ userInitials }}
              </div>
            </button>

            <div v-if="showUserMenu" class="user-dropdown">
              <div class="user-info">
                <div class="user-name">{{ currentUserEmail }}</div>
                <div class="user-plan">{{ appStore.currentPlanLabel || 'Plano padrão' }}</div>
              </div>
              <div class="menu-divider"></div>
              <router-link to="/perfil" class="menu-item" @click="showUserMenu = false">
                <svg class="menu-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2C6.686 2 4 4.686 4 8s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zM2 18a8 8 0 0116 0H2z" />
                </svg>
                <span>Perfil</span>
              </router-link>
              <button class="menu-item logout" @click="logout">
                <svg class="menu-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 4a2 2 0 012-2h6a2 2 0 012 2v3a1 1 0 11-2 0V4H5v12h6v-3a1 1 0 112 0v3a2 2 0 01-2 2H5a2 2 0 01-2-2V4z" />
                  <path d="M12 10a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1z" />
                </svg>
                <span>Sair</span>
              </button>
            </div>
          </div>
        </template>

        <!-- Bloco quando NÃO autenticado -->
        <template v-else>
          <div class="auth-buttons">
            <router-link to="/sign-in" class="btn-secondary">
              Entrar
            </router-link>
            <router-link to="/sign-up" class="btn-primary">
              Cadastrar
            </router-link>
          </div>
        </template>

        <!-- Menu Mobile -->
        <button 
          @click="toggleMobileMenu"
          class="mobile-menu-btn"
        >
          <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Menu Mobile Dropdown -->
    <div v-if="showMobileMenu" class="mobile-menu">
      <nav class="mobile-nav">
        <router-link 
          v-for="item in navigationItems" 
          :key="item.path"
          :to="item.path"
          class="mobile-nav-link"
          @click="closeMobileMenu"
        >
          {{ item.label }}
        </router-link>
      </nav>
      
      <!-- Autenticação Mobile: mostrar botões quando não logado -->
      <template v-if="!isSignedIn">
        <div class="mobile-auth">
          <router-link to="/sign-in" class="mobile-auth-link" @click="closeMobileMenu">
            Entrar
          </router-link>
          <router-link to="/sign-up" class="mobile-auth-link primary" @click="closeMobileMenu">
            Cadastrar
          </router-link>
        </div>
      </template>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '../../services/supabase.js'
import { useAppStore } from '../../stores/app.js'
import { useToast } from 'vue-toastification'

// Composables
const router = useRouter()
const route = useRoute()
const appStore = useAppStore()
const toast = useToast()

// Estado de autenticação (Supabase)
const isSignedIn = ref(false)
const currentUser = ref(null)

// Debug logs para autenticação
console.log('🔍 AppHeader - Estado inicial de autenticação (Supabase):', {
  isSignedIn: isSignedIn.value,
  user: currentUser.value
})

// Atualiza estado a partir da sessão
const refreshSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.debug('Sessão Supabase indisponível (getSession error):', error)
      isSignedIn.value = false
      currentUser.value = null
      return
    }
    if (!data?.session) {
      console.debug('Sessão Supabase ausente (data.session vazio)')
      isSignedIn.value = false
      currentUser.value = null
      return
    }
    isSignedIn.value = true
    currentUser.value = data.session.user
  } catch (e) {
    console.debug('Exceção ao atualizar sessão Supabase:', e)
    isSignedIn.value = false
    currentUser.value = null
  }
}

// Listener de mudanças de auth
const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
  isSignedIn.value = !!session
  currentUser.value = session?.user || null
  console.log('🔄 AppHeader - Mudança no estado de autenticação (Supabase):', {
    isSignedIn: isSignedIn.value,
    user: currentUser.value
  })
})

// Refs
const showLanguageMenu = ref(false)
const showNotifications = ref(false)
const showMobileMenu = ref(false)
const showUserMenu = ref(false)

// Data
const navigationItems = [
  { path: '/', label: 'Início' },
  { path: '/funcionalidades', label: 'Funcionalidades' },
  { path: '/precos', label: 'Preços' },
  { path: '/contato', label: 'Contato' }
]

const availableLanguages = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
]

// Computed
const currentLanguageFlag = computed(() => {
  const lang = availableLanguages.find(l => l.code === appStore.currentLanguage)
  return lang?.flag || '🇧🇷'
})

const notifications = computed(() => {
  return appStore.notifications || []
})

const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length
})

const hasUnreadNotifications = computed(() => {
  return unreadCount.value > 0
})

const currentUserEmail = computed(() => currentUser.value?.email || '')
const userInitials = computed(() => {
  const email = currentUserEmail.value
  if (!email) return 'U'
  return email.slice(0, 1).toUpperCase()
})
const userAvatarUrl = computed(() => currentUser.value?.user_metadata?.avatar_url || '')

// Methods
const isActiveRoute = (path) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

const toggleLanguageMenu = () => {
  showLanguageMenu.value = !showLanguageMenu.value
  showNotifications.value = false
  showUserMenu.value = false
}

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
  showLanguageMenu.value = false
  showUserMenu.value = false
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

const closeAllMenus = () => {
  showLanguageMenu.value = false
  showNotifications.value = false
  showMobileMenu.value = false
}

const changeLanguage = (langCode) => {
  appStore.setLanguage(langCode)
  showLanguageMenu.value = false
  toast.success(`Idioma alterado para ${availableLanguages.find(l => l.code === langCode)?.name}`)
}

const logout = async () => {
  try {
    await supabase.auth.signOut()
    await refreshSession()
    showUserMenu.value = false
    toast.success('Você saiu da sua conta')
    router.push('/')
  } catch (e) {
    console.debug('❌ Erro ao sair:', e)
    toast.error('Não foi possível sair. Tente novamente.')
  }
}

const markAsRead = (notificationId) => {
  appStore.markNotificationAsRead(notificationId)
}

const markAllAsRead = () => {
  appStore.markAllNotificationsAsRead()
}

const formatTime = (timestamp) => {
  return appStore.formatRelativeTime(timestamp)
}

const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.debug('Sair: supabase.auth.signOut retornou erro:', error)
      toast.error('Não foi possível sair. Tente novamente.')
      return
    }
    toast.success('Você saiu com sucesso')
  } catch (e) {
    console.debug('Exceção ao sair:', e)
    toast.error('Não foi possível sair. Tente novamente.')
  }
}


// Event Listeners
const handleClickOutside = (event) => {
  const target = event.target

  // Fechar menus se clicar fora
  if (!target.closest('.language-selector')) {
    showLanguageMenu.value = false
  }
  if (!target.closest('.notifications')) {
    showNotifications.value = false
  }
  if (!target.closest('.user-menu')) {
    showUserMenu.value = false
  }
}

// Lifecycle
onMounted(async () => {
  document.addEventListener('click', handleClickOutside)
  await refreshSession()
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  // Limpar listener de auth, se existir
  try { authListener?.subscription?.unsubscribe?.() } catch {}
})
</script>

<style scoped>
.app-header {
  @apply bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40;
}

.header-container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16;
}

.header-left {
  @apply flex items-center space-x-8;
}

.logo-link {
  @apply flex items-center space-x-2 no-underline;
}

.logo {
  @apply flex items-center space-x-2;
}

.logo-icon {
  @apply w-8 h-8 text-primary-600;
}

.logo-text {
  @apply text-xl font-bold text-gray-900 dark:text-white;
}

.desktop-nav {
  @apply hidden md:flex items-center space-x-6;
}

.nav-link {
  @apply text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200 no-underline;
}

.nav-link.active {
  @apply text-primary-600 dark:text-primary-400;
}

.header-right {
  @apply flex items-center space-x-4;
}

.language-selector {
  @apply relative;
}

.language-btn {
  @apply flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800;
}

.language-btn.active {
  @apply bg-gray-100 dark:bg-gray-800;
}

.flag-icon {
  @apply text-base;
}

.language-code {
  @apply text-xs;
}

.chevron-icon {
  @apply w-4 h-4 transition-transform duration-200;
}

.chevron-icon.rotate {
  @apply transform rotate-180;
}

.language-menu {
  @apply absolute top-full right-0 mt-1 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50;
}

.language-option {
  @apply w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200;
}

.language-option.active {
  @apply bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400;
}

.theme-toggle {
  @apply p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800;
}

.theme-icon {
  @apply w-5 h-5;
}

.notifications {
  @apply relative;
}

.notifications-btn {
  @apply relative p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800;
}

.notifications-btn.has-unread {
  @apply text-primary-600 dark:text-primary-400;
}

.notification-icon {
  @apply w-5 h-5;
}

.notification-badge {
  @apply absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center;
}

.notifications-dropdown {
  @apply absolute top-full right-0 mt-1 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50;
}

.notifications-header {
  @apply flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700;
}

.notifications-header h3 {
  @apply text-lg font-semibold text-gray-900 dark:text-white;
}

.mark-all-read {
  @apply text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300;
}

.notifications-list {
  @apply max-h-80 overflow-y-auto;
}

.notification-item {
  @apply p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer;
}

.notification-item.unread {
  @apply bg-primary-50 dark:bg-primary-900;
}

.notification-content h4 {
  @apply font-medium text-gray-900 dark:text-white;
}

.notification-content p {
  @apply text-sm text-gray-600 dark:text-gray-300 mt-1;
}

.notification-time {
  @apply text-xs text-gray-500 dark:text-gray-400 mt-2;
}

.no-notifications {
  @apply p-8 text-center text-gray-500 dark:text-gray-400;
}

.user-menu {
  @apply relative;
}

.user-menu-btn {
  @apply flex items-center space-x-2 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200;
}

.user-avatar {
  @apply w-8 h-8 rounded-full object-cover;
}

.user-avatar-placeholder {
  @apply w-8 h-8 rounded-full bg-primary-600 text-white text-sm font-medium flex items-center justify-center;
}

.user-dropdown {
  @apply absolute top-full right-0 mt-1 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50;
}

.user-info {
  @apply p-4;
}

.user-name {
  @apply font-medium text-gray-900 dark:text-white;
}

.user-email {
  @apply text-sm text-gray-600 dark:text-gray-300;
}

.user-plan {
  @apply text-xs text-primary-600 dark:text-primary-400 mt-1;
}

.menu-divider {
  @apply border-t border-gray-200 dark:border-gray-700 my-1;
}

.menu-item {
  @apply flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 no-underline;
}

.menu-item.logout {
  @apply text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900;
}

.menu-icon {
  @apply w-4 h-4;
}

.auth-buttons {
  @apply hidden md:flex items-center space-x-3;
}

.btn-secondary {
  @apply px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 no-underline;
}

.btn-primary {
  @apply px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors duration-200 no-underline;
}

.mobile-menu-btn {
  @apply md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200;
}

.menu-icon {
  @apply w-6 h-6;
}

.mobile-menu {
  @apply md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700;
}

.mobile-nav {
  @apply px-4 py-2 space-y-1;
}

.mobile-nav-link {
  @apply block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 no-underline;
}

.mobile-auth {
  @apply px-4 py-4 border-t border-gray-200 dark:border-gray-700 space-y-2;
}

.mobile-auth-link {
  @apply block w-full text-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 no-underline;
}

.mobile-auth-link.primary {
  @apply text-white bg-primary-600 border-primary-600 hover:bg-primary-700;
}


.dashboard-link {
  @apply flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 no-underline;
}

.dashboard-icon {
  @apply w-5 h-5;
}

.dashboard-text {
  @apply hidden sm:inline;
}
</style>