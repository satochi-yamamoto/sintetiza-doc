<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Gerenciar Usuários</h1>
            <p class="text-gray-600 mt-2">Visualize e gerencie todos os usuários da plataforma</p>
          </div>
          <button
            @click="showCreateModal = true"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            Adicionar Usuário
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
            <input
              v-model="filters.search"
              type="text"
              placeholder="Nome ou email..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              v-model="filters.status"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
              <option value="suspended">Suspenso</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Plano</label>
            <select
              v-model="filters.plan"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos</option>
              <option value="free">Gratuito</option>
              <option value="basic">Básico</option>
              <option value="professional">Profissional</option>
              <option value="enterprise">Empresarial</option>
            </select>
          </div>
          <div class="flex items-end">
            <button
              @click="clearFilters"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      </div>

      <!-- Users Table -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuário
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plano
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documentos
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cadastro
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <img
                      :src="user.avatar || '/api/placeholder/40/40'"
                      :alt="user.name"
                      class="w-10 h-10 rounded-full"
                    >
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                      <div class="text-sm text-gray-500">{{ user.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="getPlanBadgeClass(user.plan)"
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  >
                    {{ getPlanLabel(user.plan) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="getStatusBadgeClass(user.status)"
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  >
                    {{ getStatusLabel(user.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ user.documentsCount }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(user.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button
                      @click="editUser(user)"
                      class="text-blue-600 hover:text-blue-900"
                    >
                      Editar
                    </button>
                    <button
                      @click="toggleUserStatus(user)"
                      :class="user.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'"
                    >
                      {{ user.status === 'active' ? 'Suspender' : 'Ativar' }}
                    </button>
                    <button
                      @click="deleteUser(user)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div class="flex items-center justify-between">
            <div class="flex-1 flex justify-between sm:hidden">
              <button
                :disabled="currentPage === 1"
                @click="currentPage--"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                :disabled="currentPage === totalPages"
                @click="currentPage++"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Próximo
              </button>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Mostrando
                  <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
                  até
                  <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, totalUsers) }}</span>
                  de
                  <span class="font-medium">{{ totalUsers }}</span>
                  resultados
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    :disabled="currentPage === 1"
                    @click="currentPage--"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Anterior
                  </button>
                  <button
                    v-for="page in visiblePages"
                    :key="page"
                    @click="currentPage = page"
                    :class="page === currentPage ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'"
                    class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    {{ page }}
                  </button>
                  <button
                    :disabled="currentPage === totalPages"
                    @click="currentPage++"
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Próximo
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit User Modal -->
    <div v-if="showCreateModal || showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ showCreateModal ? 'Adicionar Usuário' : 'Editar Usuário' }}
          </h3>
          <form @submit.prevent="saveUser">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input
                  v-model="userForm.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  v-model="userForm.email"
                  type="email"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Plano</label>
                <select
                  v-model="userForm.plan"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="free">Gratuito</option>
                  <option value="basic">Básico</option>
                  <option value="professional">Profissional</option>
                  <option value="enterprise">Empresarial</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  v-model="userForm.status"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                  <option value="suspended">Suspenso</option>
                </select>
              </div>
            </div>
            <div class="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
              >
                {{ showCreateModal ? 'Criar' : 'Salvar' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminUsers',
  data() {
    return {
      users: [
        {
          id: 1,
          name: 'Maria Santos',
          email: 'maria.santos@email.com',
          avatar: null,
          plan: 'professional',
          status: 'active',
          documentsCount: 45,
          createdAt: new Date('2023-10-15')
        },
        {
          id: 2,
          name: 'João Silva',
          email: 'joao.silva@email.com',
          avatar: null,
          plan: 'basic',
          status: 'active',
          documentsCount: 23,
          createdAt: new Date('2023-11-02')
        },
        {
          id: 3,
          name: 'Ana Costa',
          email: 'ana.costa@email.com',
          avatar: null,
          plan: 'free',
          status: 'inactive',
          documentsCount: 8,
          createdAt: new Date('2023-11-20')
        },
        {
          id: 4,
          name: 'Pedro Oliveira',
          email: 'pedro.oliveira@email.com',
          avatar: null,
          plan: 'enterprise',
          status: 'active',
          documentsCount: 156,
          createdAt: new Date('2023-09-08')
        },
        {
          id: 5,
          name: 'Carla Mendes',
          email: 'carla.mendes@email.com',
          avatar: null,
          plan: 'professional',
          status: 'suspended',
          documentsCount: 67,
          createdAt: new Date('2023-10-30')
        }
      ],
      filters: {
        search: '',
        status: '',
        plan: ''
      },
      currentPage: 1,
      itemsPerPage: 10,
      showCreateModal: false,
      showEditModal: false,
      userForm: {
        name: '',
        email: '',
        plan: 'free',
        status: 'active'
      },
      editingUser: null
    }
  },
  computed: {
    filteredUsers() {
      let filtered = this.users

      if (this.filters.search) {
        const search = this.filters.search.toLowerCase()
        filtered = filtered.filter(user =>
          user.name.toLowerCase().includes(search) ||
          user.email.toLowerCase().includes(search)
        )
      }

      if (this.filters.status) {
        filtered = filtered.filter(user => user.status === this.filters.status)
      }

      if (this.filters.plan) {
        filtered = filtered.filter(user => user.plan === this.filters.plan)
      }

      return filtered
    },
    totalUsers() {
      return this.filteredUsers.length
    },
    totalPages() {
      return Math.ceil(this.totalUsers / this.itemsPerPage)
    },
    visiblePages() {
      const pages = []
      const start = Math.max(1, this.currentPage - 2)
      const end = Math.min(this.totalPages, this.currentPage + 2)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      return pages
    }
  },
  methods: {
    getPlanLabel(plan) {
      const labels = {
        free: 'Gratuito',
        basic: 'Básico',
        professional: 'Profissional',
        enterprise: 'Empresarial'
      }
      return labels[plan] || plan
    },
    getPlanBadgeClass(plan) {
      const classes = {
        free: 'bg-gray-100 text-gray-800',
        basic: 'bg-blue-100 text-blue-800',
        professional: 'bg-purple-100 text-purple-800',
        enterprise: 'bg-yellow-100 text-yellow-800'
      }
      return classes[plan] || 'bg-gray-100 text-gray-800'
    },
    getStatusLabel(status) {
      const labels = {
        active: 'Ativo',
        inactive: 'Inativo',
        suspended: 'Suspenso'
      }
      return labels[status] || status
    },
    getStatusBadgeClass(status) {
      const classes = {
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-gray-100 text-gray-800',
        suspended: 'bg-red-100 text-red-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    },
    formatDate(date) {
      return new Intl.DateTimeFormat('pt-BR').format(date)
    },
    clearFilters() {
      this.filters = {
        search: '',
        status: '',
        plan: ''
      }
    },
    editUser(user) {
      this.editingUser = user
      this.userForm = { ...user }
      this.showEditModal = true
    },
    toggleUserStatus(user) {
      user.status = user.status === 'active' ? 'suspended' : 'active'
      // Implementar chamada para API
    },
    deleteUser(user) {
      if (confirm(`Tem certeza que deseja excluir o usuário ${user.name}?`)) {
        const index = this.users.findIndex(u => u.id === user.id)
        if (index > -1) {
          this.users.splice(index, 1)
        }
        // Implementar chamada para API
      }
    },
    saveUser() {
      if (this.showCreateModal) {
        // Criar novo usuário
        const newUser = {
          ...this.userForm,
          id: Date.now(),
          documentsCount: 0,
          createdAt: new Date()
        }
        this.users.push(newUser)
      } else {
        // Editar usuário existente
        Object.assign(this.editingUser, this.userForm)
      }
      
      this.closeModal()
      // Implementar chamada para API
    },
    closeModal() {
      this.showCreateModal = false
      this.showEditModal = false
      this.editingUser = null
      this.userForm = {
        name: '',
        email: '',
        plan: 'free',
        status: 'active'
      }
    }
  }
}
</script>