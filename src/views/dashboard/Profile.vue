<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Perfil do Usuário</h1>
        <p class="text-gray-600 mt-2">Gerencie suas informações pessoais e preferências</p>
      </div>

      <!-- Profile Picture and Basic Info -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div class="p-6">
          <div class="flex items-center space-x-6">
            <div class="relative">
              <img
                :src="userProfile.avatar || '/api/placeholder/120/120'"
                :alt="userProfile.name"
                class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              >
              <button class="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </button>
            </div>
            <div class="flex-1">
              <h2 class="text-2xl font-bold text-gray-900">{{ userProfile.name }}</h2>
              <p class="text-gray-600">{{ userProfile.email }}</p>
              <div class="flex items-center mt-2">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Conta Verificada
                </span>
                <span class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Plano {{ userProfile.plan }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Personal Information -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Informações Pessoais</h3>
            <button
              @click="editMode = !editMode"
              class="text-blue-600 hover:text-blue-700 font-medium"
            >
              {{ editMode ? 'Cancelar' : 'Editar' }}
            </button>
          </div>

          <form @submit.prevent="saveProfile" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  v-model="profileForm.name"
                  :disabled="!editMode"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  v-model="profileForm.email"
                  :disabled="!editMode"
                  type="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  v-model="profileForm.phone"
                  :disabled="!editMode"
                  type="tel"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Empresa
                </label>
                <input
                  v-model="profileForm.company"
                  :disabled="!editMode"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Cargo
                </label>
                <input
                  v-model="profileForm.position"
                  :disabled="!editMode"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Fuso Horário
                </label>
                <select
                  v-model="profileForm.timezone"
                  :disabled="!editMode"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                >
                  <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                  <option value="America/New_York">Nova York (GMT-5)</option>
                  <option value="Europe/London">Londres (GMT+0)</option>
                  <option value="Asia/Tokyo">Tóquio (GMT+9)</option>
                </select>
              </div>
            </div>

            <div v-if="editMode" class="flex justify-end space-x-4">
              <button
                type="button"
                @click="editMode = false"
                class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Preferences -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Preferências</h3>
          
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Notificações por Email</h4>
                <p class="text-sm text-gray-500">Receba atualizações sobre seus documentos e resumos</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  v-model="preferences.emailNotifications"
                  type="checkbox"
                  class="sr-only peer"
                >
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Modo Escuro</h4>
                <p class="text-sm text-gray-500">Ativar tema escuro na interface</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  v-model="preferences.darkMode"
                  type="checkbox"
                  class="sr-only peer"
                >
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Auto-save</h4>
                <p class="text-sm text-gray-500">Salvar automaticamente rascunhos de resumos</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  v-model="preferences.autoSave"
                  type="checkbox"
                  class="sr-only peer"
                >
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Idioma Padrão
              </label>
              <select
                v-model="preferences.defaultLanguage"
                class="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (US)</option>
                <option value="es-ES">Español</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Security -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Segurança</h3>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Alterar Senha</h4>
                <p class="text-sm text-gray-500">Última alteração há 3 meses</p>
              </div>
              <button class="text-blue-600 hover:text-blue-700 font-medium">
                Alterar
              </button>
            </div>

            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Autenticação de Dois Fatores</h4>
                <p class="text-sm text-gray-500">Adicione uma camada extra de segurança</p>
              </div>
              <button class="text-blue-600 hover:text-blue-700 font-medium">
                Configurar
              </button>
            </div>

            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Sessões Ativas</h4>
                <p class="text-sm text-gray-500">Gerencie dispositivos conectados</p>
              </div>
              <button class="text-blue-600 hover:text-blue-700 font-medium">
                Ver Todas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useAuth } from '@clerk/vue'
import { supabase } from '@/services/supabase'
// Clerk service não é mais necessário - usar useAuth diretamente

export default {
  name: 'Profile',
  setup() {
    const { isSignedIn, user } = useAuth()
    const editMode = ref(false)
    const isLoading = ref(false)
    const isUpdating = ref(false)
    
    const userProfile = reactive({
      name: '',
      email: '',
      phone: '',
      company: '',
      position: '',
      timezone: 'America/Sao_Paulo',
      plan: 'Gratuito',
      avatar: null
    })
    
    const profileForm = reactive({
      name: '',
      email: '',
      phone: '',
      company: '',
      position: '',
      timezone: 'America/Sao_Paulo'
    })
    
    const preferences = reactive({
      emailNotifications: true,
      darkMode: false,
      autoSave: true,
      defaultLanguage: 'pt-BR'
    })

    const loadUserProfile = async () => {
      try {
        isLoading.value = true
        
        // Carregar dados do usuário do Clerk
        const clerkUser = user.value
        if (clerkUser) {
          userProfile.name = clerkUser.firstName + ' ' + (clerkUser.lastName || '')
          userProfile.email = clerkUser.primaryEmailAddress?.emailAddress || ''
          userProfile.avatar = clerkUser.imageUrl

          // Copiar para o formulário
          Object.assign(profileForm, {
            name: userProfile.name,
            email: userProfile.email,
            phone: userProfile.phone,
            company: userProfile.company,
            position: userProfile.position,
            timezone: userProfile.timezone
          })
        }
        
        // Carregar dados adicionais do Supabase
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('clerk_id', clerkUser.id)
          .single()
        
        if (profile) {
          userProfile.phone = profile.phone || ''
          userProfile.company = profile.company || ''
          userProfile.position = profile.position || ''
          userProfile.timezone = profile.timezone || 'America/Sao_Paulo'

          // Atualizar formulário
          profileForm.phone = userProfile.phone
          profileForm.company = userProfile.company
          profileForm.position = userProfile.position
          profileForm.timezone = userProfile.timezone
          
          // Carregar preferências
          if (profile.preferences) {
            Object.assign(preferences, profile.preferences)
          }
        }
        
      } catch (error) {
        console.error('Erro ao carregar perfil:', error)
      } finally {
        isLoading.value = false
      }
    }

    const saveProfile = async () => {
      try {
        isUpdating.value = true
        
        // Atualizar dados no Clerk via user.update()
        await user.value.update({
          firstName: profileForm.name.split(' ')[0],
          lastName: profileForm.name.split(' ').slice(1).join(' ')
        })
        
        // Atualizar dados no Supabase
        const { error } = await supabase
          .from('users')
          .upsert({
            clerk_id: user.value?.id,
            phone: profileForm.phone,
            company: profileForm.company,
            position: profileForm.position,
            timezone: profileForm.timezone,
            preferences: preferences
          })
        
        if (error) throw error
        
        // Atualizar dados locais
        Object.assign(userProfile, profileForm)
        editMode.value = false
        
        // Mostrar toast de sucesso
        console.log('Perfil atualizado com sucesso!')
        
      } catch (error) {
        console.error('Erro ao salvar perfil:', error)
      } finally {
        isUpdating.value = false
      }
    }

    const uploadAvatar = async () => {
      try {
        // Implementar upload de avatar via Clerk
        console.log('Upload de avatar')
      } catch (error) {
        console.error('Erro ao fazer upload do avatar:', error)
      }
    }

    const changePassword = () => {
      // Redirecionar para página de alteração de senha do Clerk
      window.location.href = '/dashboard/configuracoes#security'
    }

    const setupTwoFactor = () => {
      // Redirecionar para configuração de 2FA do Clerk
      window.location.href = '/dashboard/configuracoes#security'
    }

    const viewActiveSessions = () => {
      // Redirecionar para visualização de sessões ativas
      window.location.href = '/dashboard/configuracoes#sessions'
    }

    onMounted(() => {
      loadUserProfile()
    })

    return {
      editMode,
      isLoading,
      isUpdating,
      userProfile,
      profileForm,
      preferences,
      saveProfile,
      uploadAvatar,
      changePassword,
      setupTwoFactor,
      viewActiveSessions
    }
  }
}
</script>