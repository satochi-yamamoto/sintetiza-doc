<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <SystemStatus
        :is-public-status="true"
        :auto-refresh="true"
      />
    </div>
  </div>
</template>

<script>
import SystemStatus from '@/components/SystemStatus.vue'

export default {
  name: 'StatusPage',
  components: {
    SystemStatus
  },
  mounted() {
    document.title = 'Status do Sistema - SintetizaDoc'
  }
}
</script>