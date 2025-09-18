<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Analytics</h1>
            <p class="text-gray-600 mt-2">Análise detalhada de uso e performance da plataforma</p>
          </div>
          <div class="flex space-x-3">
            <select
              v-model="selectedPeriod"
              @change="loadAnalytics"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
              <option value="90d">Últimos 90 dias</option>
              <option value="1y">Último ano</option>
            </select>
            <button
              @click="exportReport"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Exportar Relatório
            </button>
          </div>
        </div>
      </div>

      <!-- Key Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Usuários Ativos</p>
              <p class="text-2xl font-semibold text-gray-900">{{ metrics.activeUsers }}</p>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center text-sm">
              <span :class="metrics.activeUsersChange >= 0 ? 'text-green-600' : 'text-red-600'" class="font-medium">
                {{ metrics.activeUsersChange >= 0 ? '+' : '' }}{{ metrics.activeUsersChange }}%
              </span>
              <span class="text-gray-500 ml-1">vs período anterior</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Documentos Processados</p>
              <p class="text-2xl font-semibold text-gray-900">{{ metrics.documentsProcessed }}</p>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center text-sm">
              <span :class="metrics.documentsChange >= 0 ? 'text-green-600' : 'text-red-600'" class="font-medium">
                {{ metrics.documentsChange >= 0 ? '+' : '' }}{{ metrics.documentsChange }}%
              </span>
              <span class="text-gray-500 ml-1">vs período anterior</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Receita Total</p>
              <p class="text-2xl font-semibold text-gray-900">R$ {{ metrics.totalRevenue.toLocaleString() }}</p>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center text-sm">
              <span :class="metrics.revenueChange >= 0 ? 'text-green-600' : 'text-red-600'" class="font-medium">
                {{ metrics.revenueChange >= 0 ? '+' : '' }}{{ metrics.revenueChange }}%
              </span>
              <span class="text-gray-500 ml-1">vs período anterior</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Taxa de Conversão</p>
              <p class="text-2xl font-semibold text-gray-900">{{ metrics.conversionRate }}%</p>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center text-sm">
              <span :class="metrics.conversionChange >= 0 ? 'text-green-600' : 'text-red-600'" class="font-medium">
                {{ metrics.conversionChange >= 0 ? '+' : '' }}{{ metrics.conversionChange }}%
              </span>
              <span class="text-gray-500 ml-1">vs período anterior</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Row 1 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- User Growth Chart -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Crescimento de Usuários</h3>
            <div class="flex space-x-2">
              <button
                v-for="type in ['daily', 'weekly', 'monthly']"
                :key="type"
                @click="userGrowthType = type"
                :class="userGrowthType === type ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'"
                class="px-3 py-1 text-sm font-medium rounded-md"
              >
                {{ type === 'daily' ? 'Diário' : type === 'weekly' ? 'Semanal' : 'Mensal' }}
              </button>
            </div>
          </div>
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p class="text-gray-500">Gráfico de crescimento de usuários (implementar com Chart.js)</p>
          </div>
        </div>

        <!-- Document Processing Chart -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Processamento de Documentos</h3>
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p class="text-gray-500">Gráfico de processamento de documentos (implementar com Chart.js)</p>
          </div>
        </div>
      </div>

      <!-- Charts Row 2 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Revenue Chart -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Receita por Período</h3>
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p class="text-gray-500">Gráfico de receita (implementar com Chart.js)</p>
          </div>
        </div>

        <!-- Plan Distribution -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Distribuição de Planos</h3>
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p class="text-gray-500">Gráfico de distribuição de planos (implementar com Chart.js)</p>
          </div>
        </div>
      </div>

      <!-- Detailed Tables -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Top Documents -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Documentos Mais Processados</h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div v-for="doc in topDocuments" :key="doc.id" class="flex items-center justify-between">
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">{{ doc.name }}</p>
                  <p class="text-sm text-gray-500">{{ doc.type }}</p>
                </div>
                <div class="text-sm text-gray-900 font-medium">
                  {{ doc.processCount }} processamentos
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- User Activity -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Usuários Mais Ativos</h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div v-for="user in topUsers" :key="user.id" class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <img
                    :src="user.avatar || '/api/placeholder/32/32'"
                    :alt="user.name"
                    class="w-8 h-8 rounded-full"
                  >
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate">{{ user.name }}</p>
                    <p class="text-sm text-gray-500 truncate">{{ user.email }}</p>
                  </div>
                </div>
                <div class="text-sm text-gray-900 font-medium">
                  {{ user.documentsCount }} docs
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Metrics -->
      <div class="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Métricas de Performance</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600">{{ performance.avgProcessingTime }}s</div>
            <div class="text-sm text-gray-500 mt-1">Tempo Médio de Processamento</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600">{{ performance.successRate }}%</div>
            <div class="text-sm text-gray-500 mt-1">Taxa de Sucesso</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-purple-600">{{ performance.avgFileSize }}MB</div>
            <div class="text-sm text-gray-500 mt-1">Tamanho Médio dos Arquivos</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminAnalytics',
  data() {
    return {
      selectedPeriod: '30d',
      userGrowthType: 'daily',
      metrics: {
        activeUsers: 1247,
        activeUsersChange: 12,
        documentsProcessed: 8934,
        documentsChange: 8,
        totalRevenue: 45890,
        revenueChange: 15,
        conversionRate: 3.2,
        conversionChange: 0.5
      },
      topDocuments: [
        {
          id: 1,
          name: 'Relatório Financeiro Q4.pdf',
          type: 'PDF',
          processCount: 156
        },
        {
          id: 2,
          name: 'Manual do Usuário.docx',
          type: 'DOCX',
          processCount: 134
        },
        {
          id: 3,
          name: 'Apresentação Vendas.pptx',
          type: 'PPTX',
          processCount: 98
        },
        {
          id: 4,
          name: 'Contrato de Serviços.pdf',
          type: 'PDF',
          processCount: 87
        },
        {
          id: 5,
          name: 'Especificações Técnicas.txt',
          type: 'TXT',
          processCount: 76
        }
      ],
      topUsers: [
        {
          id: 1,
          name: 'Maria Santos',
          email: 'maria.santos@email.com',
          avatar: null,
          documentsCount: 89
        },
        {
          id: 2,
          name: 'João Silva',
          email: 'joao.silva@email.com',
          avatar: null,
          documentsCount: 67
        },
        {
          id: 3,
          name: 'Ana Costa',
          email: 'ana.costa@email.com',
          avatar: null,
          documentsCount: 54
        },
        {
          id: 4,
          name: 'Pedro Oliveira',
          email: 'pedro.oliveira@email.com',
          avatar: null,
          documentsCount: 43
        },
        {
          id: 5,
          name: 'Carla Mendes',
          email: 'carla.mendes@email.com',
          avatar: null,
          documentsCount: 38
        }
      ],
      performance: {
        avgProcessingTime: 2.4,
        successRate: 98.7,
        avgFileSize: 3.2
      }
    }
  },
  mounted() {
    this.loadAnalytics()
  },
  methods: {
    async loadAnalytics() {
      try {
        // Implementar carregamento de dados de analytics baseado no período selecionado
        console.log('Carregando analytics para período:', this.selectedPeriod)
        
        // Simular carregamento de dados
        // Em produção, fazer chamadas para API
        
      } catch (error) {
        console.error('Erro ao carregar analytics:', error)
      }
    },
    async exportReport() {
      try {
        // Implementar exportação de relatório
        console.log('Exportando relatório para período:', this.selectedPeriod)
        
        // Simular exportação
        alert('Relatório exportado com sucesso!')
        
      } catch (error) {
        console.error('Erro ao exportar relatório:', error)
        alert('Erro ao exportar relatório')
      }
    }
  }
}
</script>