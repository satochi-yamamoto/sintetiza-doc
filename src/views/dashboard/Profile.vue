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
import { supabase } from '@/services/supabase'
import { stripeService } from '@/services/stripe.js'

export default {
  name: 'Profile',
  setup() {
    // Sessão e UID do Supabase
    const session = ref(null)
    const uid = ref(null)

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

    const ensureSupabaseSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) throw error
        session.value = data.session
        uid.value = data.session?.user?.id || null
      } catch (e) {
        console.debug('Erro ao obter sessão do Supabase:', e)
      }
    }

    const loadUserProfile = async () => {
      try {
        isLoading.value = true
        
        await ensureSupabaseSession()
        if (!uid.value) {
          console.debug('Nenhuma sessão ativa encontrada.')
          return
        }
        
        // Carregar dados do usuário do Supabase Auth
        const { data: userData } = await supabase.auth.getUser()
        const authUser = userData?.user || session.value?.user
        
        const fullName = (authUser?.user_metadata?.name)
          || [authUser?.user_metadata?.first_name, authUser?.user_metadata?.last_name].filter(Boolean).join(' ')
          || ''
        const email = authUser?.email || ''
        const avatarUrl = authUser?.user_metadata?.avatar_url || null
        
        userProfile.name = fullName
        userProfile.email = email
        userProfile.avatar = avatarUrl
        
        Object.assign(profileForm, {
          name: userProfile.name,
          email: userProfile.email,
          phone: userProfile.phone,
          company: userProfile.company,
          position: userProfile.position,
          timezone: userProfile.timezone
        })
        
        // Carregar dados adicionais do Supabase (tabela users)
        let { data: profile, error: selectError } = await supabase
          .from('users')
          .select('email, phone, metadata')
          .eq('id', uid.value)
          .single()
        
        // Se não existir, criar registro inicial vinculado ao auth.uid()
        if (selectError && selectError.code === 'PGRST116') {
          const { error: upsertError } = await supabase
            .from('users')
            .upsert({ id: uid.value, email })
          if (upsertError) {
            console.debug('Erro ao criar perfil inicial:', upsertError)
          } else {
            const { data: created } = await supabase
              .from('users')
              .select('email, phone, metadata')
              .eq('id', uid.value)
              .single()
            profile = created
          }
        }
        
        if (profile) {
          userProfile.phone = profile.phone || ''
          const meta = profile.metadata || {}
          userProfile.company = meta.company || ''
          userProfile.position = meta.position || ''
          userProfile.timezone = meta.timezone || 'America/Sao_Paulo'

          // Atualizar formulário
          profileForm.phone = userProfile.phone
          profileForm.company = userProfile.company
          profileForm.position = userProfile.position
          profileForm.timezone = userProfile.timezone
          
          // Carregar preferências
          if (meta.preferences) {
            Object.assign(preferences, meta.preferences)
          }
        }

        // Plano atual via Stripe
        const plan = await stripeService.getCurrentPlan(uid.value)
        userProfile.plan = plan?.name || 'Gratuito'
        
      } catch (error) {
        console.debug('Erro ao carregar perfil:', error)
      } finally {
        isLoading.value = false
      }
    }

    const saveProfile = async () => {
      try {
        isUpdating.value = true
        
        await ensureSupabaseSession()
        if (!uid.value) return
        
        // Atualizar dados no Supabase Auth (nome e e-mail)
        const { error: authError } = await supabase.auth.updateUser({
          email: profileForm.email,
          data: { name: profileForm.name.trim() }
        })
        if (authError) {
          console.debug('Não foi possível atualizar dados de autenticação:', authError.message)
          toast.info('Falha ao atualizar dados de autenticação. Continue e salve novamente mais tarde.')
        }
        
        // Manter/mesclar metadata existente
        const { data: existing } = await supabase
          .from('users')
          .select('metadata')
          .eq('id', uid.value)
          .single()
        const existingMeta = existing?.metadata || {}
        
        const newMeta = {
          ...existingMeta,
          company: profileForm.company,
          position: profileForm.position,
          timezone: profileForm.timezone,
          preferences: { ...preferences }
        }
        
        // Atualizar dados no Supabase (tabela users)
        const { error } = await supabase
          .from('users')
          .upsert({
            id: uid.value,
            email: profileForm.email,
            phone: profileForm.phone,
            metadata: newMeta
          }, { onConflict: 'id' })
        
        if (error) throw error
        
        // Atualizar dados locais
        Object.assign(userProfile, profileForm)
        editMode.value = false
        
        console.log('Perfil atualizado com sucesso!')
        toast.success('Perfil atualizado com sucesso')
        
      } catch (error) {
        console.debug('Erro ao salvar perfil:', error)
        toast.error('Erro ao salvar perfil')
      } finally {
        isUpdating.value = false
      }
    }

    const uploadAvatar = async () => {
      try {
        // TODO: Implementar upload de avatar via Supabase Storage
        console.log('Upload de avatar')
      } catch (error) {
        console.debug('Erro ao fazer upload do avatar:', error)
        toast.error('Erro ao fazer upload do avatar')
      }
    }

    const changePassword = () => {
      // Redirecionar para seção de segurança (alteração de senha) nas Configurações
      window.location.href = '/dashboard/configuracoes#security'
    }

    const setupTwoFactor = () => {
      // Redirecionar para seção de 2FA nas Configurações
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