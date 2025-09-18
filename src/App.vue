<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Loading global -->
    <div v-if="isLoading" class="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
      <div class="text-center">
        <div class="loading-spinner mx-auto mb-4"></div>
        <p class="text-gray-600">{{ $t('common.loading') }}</p>
      </div>
    </div>

    <!-- Aplicação principal -->
    <div v-else>
      <!-- Header/Navigation -->
      <AppHeader v-if="showHeader" />
      
      <!-- Conteúdo principal -->
      <main :class="{ 'pt-16': showHeader }">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
      
      <!-- Footer -->
      <AppFooter v-if="showFooter" />
    </div>

    <!-- Modais globais -->
    <GlobalModals />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import GlobalModals from '@/components/modals/GlobalModals.vue'

const route = useRoute()
const authStore = useAuthStore()
const appStore = useAppStore()

// Computed properties
const isLoading = computed(() => appStore.isLoading)
const showHeader = computed(() => {
  const hideHeaderRoutes = ['login', 'register', 'forgot-password']
  return !hideHeaderRoutes.includes(route.name)
})
const showFooter = computed(() => {
  const hideFooterRoutes = ['dashboard', 'admin']
  return !hideFooterRoutes.some(routeName => route.name?.startsWith(routeName))
})

// Lifecycle
onMounted(async () => {
  try {
    appStore.setLoading(true)
    
    // Inicializar autenticação
    await authStore.initialize()
    
    // Outras inicializações globais
    await initializeApp()
    
  } catch (error) {
    console.error('Erro ao inicializar aplicação:', error)
  } finally {
    appStore.setLoading(false)
  }
})

// Funções
async function initializeApp() {
  // Configurações globais da aplicação
  // Verificar conectividade
  // Carregar configurações do usuário
  // etc.
}
</script>

<style scoped>
/* Estilos específicos do componente App */
</style>