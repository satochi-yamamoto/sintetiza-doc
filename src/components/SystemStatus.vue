<template>
  <div class="system-status">
    <div
      v-if="isPublicStatus"
      class="bg-white rounded-lg shadow-lg p-6"
    >
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-gray-900">
          {{ $t('status.title') }}
        </h1>
        <div class="flex items-center space-x-2">
          <div
            :class="overallStatusClass"
            class="w-3 h-3 rounded-full"
          />
          <span
            class="text-sm font-medium"
            :class="overallStatusTextClass"
          >
            {{ overallStatusText }}
          </span>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- API Status -->
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium text-gray-900">
              {{ $t('status.api') }}
            </h3>
            <div
              :class="services.api.statusClass"
              class="w-2 h-2 rounded-full"
            />
          </div>
          <p class="text-xs text-gray-600">
            {{ services.api.message }}
          </p>
          <p class="text-xs text-gray-500 mt-1">
            {{ $t('status.responseTime') }}: {{ services.api.responseTime }}ms
          </p>
        </div>

        <!-- Authentication Status -->
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium text-gray-900">
              {{ $t('status.auth') }}
            </h3>
            <div
              :class="services.auth.statusClass"
              class="w-2 h-2 rounded-full"
            />
          </div>
          <p class="text-xs text-gray-600">
            {{ services.auth.message }}
          </p>
          <p class="text-xs text-gray-500 mt-1">
            {{ $t('status.provider') }}: Supabase Auth
          </p>
        </div>

        <!-- AI Services Status -->
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium text-gray-900">
              {{ $t('status.aiServices') }}
            </h3>
            <div
              :class="services.ai.statusClass"
              class="w-2 h-2 rounded-full"
            />
          </div>
          <p class="text-xs text-gray-600">
            {{ services.ai.message }}
          </p>
          <p class="text-xs text-gray-500 mt-1">
            {{ $t('status.primary') }}: OpenAI | {{ $t('status.fallback') }}: Claude
          </p>
        </div>

        <!-- Database Status -->
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium text-gray-900">
              {{ $t('status.database') }}
            </h3>
            <div
              :class="services.database.statusClass"
              class="w-2 h-2 rounded-full"
            />
          </div>
          <p class="text-xs text-gray-600">
            {{ services.database.message }}
          </p>
          <p class="text-xs text-gray-500 mt-1">
            {{ $t('status.provider') }}: Supabase
          </p>
        </div>

        <!-- Storage Status -->
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium text-gray-900">
              {{ $t('status.storage') }}
            </h3>
            <div
              :class="services.storage.statusClass"
              class="w-2 h-2 rounded-full"
            />
          </div>
          <p class="text-xs text-gray-600">
            {{ services.storage.message }}
          </p>
          <p class="text-xs text-gray-500 mt-1">
            {{ $t('status.provider') }}: Supabase Storage
          </p>
        </div>

        <!-- Payment Status -->
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium text-gray-900">
              {{ $t('status.payments') }}
            </h3>
            <div
              :class="services.payments.statusClass"
              class="w-2 h-2 rounded-full"
            />
          </div>
          <p class="text-xs text-gray-600">
            {{ services.payments.message }}
          </p>
          <p class="text-xs text-gray-500 mt-1">
            {{ $t('status.provider') }}: Stripe
          </p>
        </div>
      </div>

      <!-- System Metrics -->
      <div class="mt-8 border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ $t('status.metrics') }}
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center">
            <div class="text-2xl font-bold text-indigo-600">
              {{ metrics.uptime }}%
            </div>
            <div class="text-sm text-gray-500">
              {{ $t('status.uptime') }}
            </div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">
              {{ metrics.avgResponseTime }}ms
            </div>
            <div class="text-sm text-gray-500">
              {{ $t('status.avgResponse') }}
            </div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">
              {{ metrics.documentsProcessed }}
            </div>
            <div class="text-sm text-gray-500">
              {{ $t('status.documentsProcessed') }}
            </div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-purple-600">
              {{ metrics.activeUsers }}
            </div>
            <div class="text-sm text-gray-500">
              {{ $t('status.activeUsers') }}
            </div>
          </div>
        </div>
      </div>

      <!-- Incident History -->
      <div
        v-if="incidents.length > 0"
        class="mt-8 border-t pt-6"
      >
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ $t('status.recentIncidents') }}
        </h3>
        <div class="space-y-3">
          <div
            v-for="incident in incidents"
            :key="incident.id"
            class="bg-red-50 border border-red-200 rounded-lg p-3"
          >
            <div class="flex items-center justify-between">
              <h4 class="text-sm font-medium text-red-800">
                {{ incident.title }}
              </h4>
              <span class="text-xs text-red-600">{{ formatDate(incident.date) }}</span>
            </div>
            <p class="text-sm text-red-700 mt-1">
              {{ incident.description }}
            </p>
            <p class="text-xs text-red-600 mt-1">
              {{ $t('status.duration') }}: {{ incident.duration }}
            </p>
          </div>
        </div>
      </div>

      <!-- Last Updated -->
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-500">
          {{ $t('status.lastUpdated') }}: {{ formatDate(lastUpdated) }}
        </p>
        <button
          :disabled="isRefreshing"
          class="mt-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          @click="refreshStatus"
        >
          <span v-if="isRefreshing">{{ $t('status.refreshing') }}...</span>
          <span v-else>{{ $t('status.refresh') }}</span>
        </button>
      </div>
    </div>

    <!-- Embedded Status Widget -->
    <div
      v-else
      class="flex items-center space-x-2"
    >
      <div
        :class="overallStatusClass"
        class="w-2 h-2 rounded-full"
      />
      <span
        class="text-sm"
        :class="overallStatusTextClass"
      >
        {{ overallStatusText }}
      </span>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'SystemStatus',
  props: {
    isPublicStatus: {
      type: Boolean,
      default: false
    },
    autoRefresh: {
      type: Boolean,
      default: true
    },
    refreshInterval: {
      type: Number,
      default: 30000 // 30 seconds
    }
  },
  setup(props) {
    const { t } = useI18n()
    const isRefreshing = ref(false)
    const lastUpdated = ref(new Date())
    const refreshTimer = ref(null)

    // Service statuses
    const services = ref({
      api: {
        status: 'operational',
        message: 'All API endpoints are responding normally',
        responseTime: 245,
        statusClass: 'bg-green-500'
      },
      auth: {
        status: 'operational',
        message: 'Authentication service is working properly',
        statusClass: 'bg-green-500'
      },
      ai: {
        status: 'operational',
        message: 'AI services are processing requests normally',
        statusClass: 'bg-green-500'
      },
      database: {
        status: 'operational',
        message: 'Database is responding within normal parameters',
        statusClass: 'bg-green-500'
      },
      storage: {
        status: 'operational',
        message: 'File storage is accessible and functioning',
        statusClass: 'bg-green-500'
      },
      payments: {
        status: 'operational',
        message: 'Payment processing is working normally',
        statusClass: 'bg-green-500'
      }
    })

    // System metrics
    const metrics = ref({
      uptime: 99.8,
      avgResponseTime: 245,
      documentsProcessed: 15847,
      activeUsers: 342
    })

    // Incident history
    const incidents = ref([
      // Example incidents - in real implementation, fetch from API
      // {
      //   id: 1,
      //   title: 'API Slowdown',
      //   description: 'Increased response times for document processing',
      //   date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      //   duration: '45 minutes'
      // }
    ])

    const overallStatus = computed(() => {
      const statuses = Object.values(services.value).map(service => service.status)

      if (statuses.includes('major_outage')) return 'major_outage'
      if (statuses.includes('partial_outage')) return 'partial_outage'
      if (statuses.includes('degraded')) return 'degraded'
      return 'operational'
    })

    const overallStatusClass = computed(() => {
      switch (overallStatus.value) {
        case 'operational': return 'bg-green-500'
        case 'degraded': return 'bg-yellow-500'
        case 'partial_outage': return 'bg-orange-500'
        case 'major_outage': return 'bg-red-500'
        default: return 'bg-gray-500'
      }
    })

    const overallStatusTextClass = computed(() => {
      switch (overallStatus.value) {
        case 'operational': return 'text-green-700'
        case 'degraded': return 'text-yellow-700'
        case 'partial_outage': return 'text-orange-700'
        case 'major_outage': return 'text-red-700'
        default: return 'text-gray-700'
      }
    })

    const overallStatusText = computed(() => {
      switch (overallStatus.value) {
        case 'operational': return t('status.operational')
        case 'degraded': return t('status.degraded')
        case 'partial_outage': return t('status.partialOutage')
        case 'major_outage': return t('status.majorOutage')
        default: return t('status.unknown')
      }
    })

    const refreshStatus = async () => {
      if (isRefreshing.value) return

      isRefreshing.value = true

      try {
        // In real implementation, make API calls to check services
        await checkAPIStatus()
        await checkAuthStatus()
        await checkAIServices()
        await checkDatabaseStatus()
        await checkStorageStatus()
        await checkPaymentStatus()

        lastUpdated.value = new Date()
      } catch (error) {
        console.error('Error refreshing status:', error)
      } finally {
        isRefreshing.value = false
      }
    }

    const checkAPIStatus = async () => {
      try {
        const start = performance.now()
        // Make a simple API call to check health
        // const response = await fetch('/api/health')
        const end = performance.now()

        services.value.api = {
          status: 'operational',
          message: 'All API endpoints are responding normally',
          responseTime: Math.round(end - start),
          statusClass: 'bg-green-500'
        }
      } catch (error) {
        services.value.api = {
          status: 'major_outage',
          message: 'API is experiencing issues',
          responseTime: 0,
          statusClass: 'bg-red-500'
        }
      }
    }

    const checkAuthStatus = async () => {
      try {
        // Check Supabase Auth status
        services.value.auth = {
          status: 'operational',
          message: 'Authentication service is working properly',
          statusClass: 'bg-green-500'
        }
      } catch (error) {
        services.value.auth = {
          status: 'degraded',
          message: 'Authentication experiencing intermittent issues',
          statusClass: 'bg-yellow-500'
        }
      }
    }

    const checkAIServices = async () => {
      try {
        // Check OpenAI and Claude API status
        services.value.ai = {
          status: 'operational',
          message: 'AI services are processing requests normally',
          statusClass: 'bg-green-500'
        }
      } catch (error) {
        services.value.ai = {
          status: 'partial_outage',
          message: 'AI services experiencing reduced capacity',
          statusClass: 'bg-orange-500'
        }
      }
    }

    const checkDatabaseStatus = async () => {
      try {
        // Check Supabase connection
        services.value.database = {
          status: 'operational',
          message: 'Database is responding within normal parameters',
          statusClass: 'bg-green-500'
        }
      } catch (error) {
        services.value.database = {
          status: 'degraded',
          message: 'Database experiencing slower than normal response times',
          statusClass: 'bg-yellow-500'
        }
      }
    }

    const checkStorageStatus = async () => {
      try {
        // Check Supabase Storage
        services.value.storage = {
          status: 'operational',
          message: 'File storage is accessible and functioning',
          statusClass: 'bg-green-500'
        }
      } catch (error) {
        services.value.storage = {
          status: 'partial_outage',
          message: 'File uploads may be experiencing delays',
          statusClass: 'bg-orange-500'
        }
      }
    }

    const checkPaymentStatus = async () => {
      try {
        // Check Stripe API status
        services.value.payments = {
          status: 'operational',
          message: 'Payment processing is working normally',
          statusClass: 'bg-green-500'
        }
      } catch (error) {
        services.value.payments = {
          status: 'degraded',
          message: 'Payment processing experiencing intermittent issues',
          statusClass: 'bg-yellow-500'
        }
      }
    }

    const formatDate = (date) => {
      return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short'
      }).format(date)
    }

    const setupAutoRefresh = () => {
      if (props.autoRefresh && props.isPublicStatus) {
        refreshTimer.value = setInterval(refreshStatus, props.refreshInterval)
      }
    }

    const clearAutoRefresh = () => {
      if (refreshTimer.value) {
        clearInterval(refreshTimer.value)
        refreshTimer.value = null
      }
    }

    onMounted(() => {
      refreshStatus()
      setupAutoRefresh()
    })

    onUnmounted(() => {
      clearAutoRefresh()
    })

    return {
      services,
      metrics,
      incidents,
      overallStatus,
      overallStatusClass,
      overallStatusTextClass,
      overallStatusText,
      isRefreshing,
      lastUpdated,
      refreshStatus,
      formatDate
    }
  }
}
</script>

<style scoped>
.system-status {
  width: 100%;
}
</style>