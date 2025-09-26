<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">
          Dashboard Administrativo
        </h1>
        <p class="text-gray-600 mt-2">
          Visão geral do sistema e métricas principais
        </p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  class="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">
                Total de Usuários
              </p>
              <p class="text-2xl font-semibold text-gray-900">
                {{ stats.totalUsers }}
              </p>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center text-sm">
              <span class="text-green-600 font-medium">+12%</span>
              <span class="text-gray-500 ml-1">vs mês anterior</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  class="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">
                Documentos Processados
              </p>
              <p class="text-2xl font-semibold text-gray-900">
                {{ stats.documentsProcessed }}
              </p>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center text-sm">
              <span class="text-green-600 font-medium">+8%</span>
              <span class="text-gray-500 ml-1">vs mês anterior</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg
                  class="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">
                Receita Mensal
              </p>
              <p class="text-2xl font-semibold text-gray-900">
                R$ {{ stats.monthlyRevenue.toLocaleString() }}
              </p>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center text-sm">
              <span class="text-green-600 font-medium">+15%</span>
              <span class="text-gray-500 ml-1">vs mês anterior</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg
                  class="w-5 h-5 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">
                Usuários Ativos
              </p>
              <p class="text-2xl font-semibold text-gray-900">
                {{ stats.activeUsers }}
              </p>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center text-sm">
              <span class="text-green-600 font-medium">+5%</span>
              <span class="text-gray-500 ml-1">vs mês anterior</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Usage Chart -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Uso da Plataforma
          </h3>
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p class="text-gray-500">
              Gráfico de uso (implementar com Chart.js)
            </p>
          </div>
        </div>

        <!-- Revenue Chart -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Receita por Mês
          </h3>
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p class="text-gray-500">
              Gráfico de receita (implementar com Chart.js)
            </p>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Recent Users -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900">
                Usuários Recentes
              </h3>
              <router-link
                to="/admin/usuarios"
                class="text-blue-600 hover:text-blue-700 font-medium"
              >
                Ver Todos
              </router-link>
            </div>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div
                v-for="user in recentUsers"
                :key="user.id"
                class="flex items-center space-x-4"
              >
                <img
                  :src="user.avatar || '/api/placeholder/40/40'"
                  :alt="user.name"
                  class="w-10 h-10 rounded-full"
                >
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">
                    {{ user.name }}
                  </p>
                  <p class="text-sm text-gray-500 truncate">
                    {{ user.email }}
                  </p>
                </div>
                <div class="text-sm text-gray-500">
                  {{ formatDate(user.createdAt) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- System Status -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">
              Status do Sistema
            </h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-3 h-3 bg-green-400 rounded-full mr-3" />
                  <span class="text-sm font-medium text-gray-900">API Principal</span>
                </div>
                <span class="text-sm text-green-600">Operacional</span>
              </div>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-3 h-3 bg-green-400 rounded-full mr-3" />
                  <span class="text-sm font-medium text-gray-900">Banco de Dados</span>
                </div>
                <span class="text-sm text-green-600">Operacional</span>
              </div>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-3 h-3 bg-yellow-400 rounded-full mr-3" />
                  <span class="text-sm font-medium text-gray-900">Processamento IA</span>
                </div>
                <span class="text-sm text-yellow-600">Degradado</span>
              </div>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-3 h-3 bg-green-400 rounded-full mr-3" />
                  <span class="text-sm font-medium text-gray-900">Armazenamento</span>
                </div>
                <span class="text-sm text-green-600">Operacional</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  data() {
    return {
      stats: {
        totalUsers: 1247,
        documentsProcessed: 8934,
        monthlyRevenue: 45890,
        activeUsers: 892
      },
      recentUsers: [
        {
          id: 1,
          name: 'Maria Santos',
          email: 'maria.santos@email.com',
          avatar: null,
          createdAt: new Date('2023-12-15')
        },
        {
          id: 2,
          name: 'João Silva',
          email: 'joao.silva@email.com',
          avatar: null,
          createdAt: new Date('2023-12-14')
        },
        {
          id: 3,
          name: 'Ana Costa',
          email: 'ana.costa@email.com',
          avatar: null,
          createdAt: new Date('2023-12-13')
        },
        {
          id: 4,
          name: 'Pedro Oliveira',
          email: 'pedro.oliveira@email.com',
          avatar: null,
          createdAt: new Date('2023-12-12')
        }
      ]
    }
  },
  mounted() {
    // Carregar dados do dashboard
    this.loadDashboardData()
  },
  methods: {
    formatDate(date) {
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit'
      }).format(date)
    }
  },
  methods: {
    async loadDashboardData() {
      try {
        // Implementar carregamento de dados reais
        console.log('Carregando dados do dashboard admin')
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      }
    }
  }
}
</script>