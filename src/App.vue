<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Loading Global -->
    <div v-if="isLoading" class="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
    </div>

    <!-- Header -->
    <AppHeader v-if="showHeader" />
    
    <!-- Conteúdo Principal -->
    <main :class="{ 'pt-16': showHeader }">
      <router-view />
    </main>
    
    <!-- Footer -->
    <AppFooter v-if="showFooter" />
    
    <!-- Modais Globais -->
    <GlobalModals />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import GlobalModals from '@/components/modals/GlobalModals.vue'

const route = useRoute()
const appStore = useAppStore()

// Computadas
const isLoading = computed(() => appStore.isLoading)

const showHeader = computed(() => {
  const hideHeaderRoutes = ['sign-in', 'sign-up']
  return !hideHeaderRoutes.includes(route.name)
})

const showFooter = computed(() => {
  const hideFooterRoutes = ['dashboard', 'dashboard-documents', 'dashboard-summaries', 'dashboard-settings', 'dashboard-billing', 'dashboard-profile', 'admin-dashboard', 'admin-users', 'admin-analytics', 'sign-in', 'sign-up']
  return !hideFooterRoutes.includes(route.name)
})
</script>

<style scoped>
/* Estilos específicos do componente App */
</style>