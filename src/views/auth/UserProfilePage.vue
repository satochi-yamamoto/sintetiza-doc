<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h1 class="text-2xl font-bold text-gray-900 mb-6">Meu Perfil</h1>

          <!-- Dados básicos do usuário -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" :value="user?.email" disabled
                     class="mt-1 block w-full rounded-md border-gray-200 bg-gray-50 shadow-sm"/>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Nome</label>
              <input type="text" v-model="profile.full_name"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
            </div>
          </div>

          <div class="mt-6">
            <label class="block text-sm font-medium text-gray-700">Bio</label>
            <textarea v-model="profile.bio" rows="4"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
          </div>

          <div class="mt-6 flex justify-end">
            <button @click="saveProfile" :disabled="saving"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white"
                    :class="saving ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'">
              <span v-if="!saving">Salvar</span>
              <span v-else>Salvando...</span>
            </button>
          </div>

          <div v-if="error" class="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200">{{ error }}</div>
          <div v-if="info" class="mt-2 rounded-md bg-blue-50 p-3 text-sm text-blue-700 border border-blue-200">{{ info }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import supabase from '@/services/supabase'

export default {
  name: 'UserProfilePage',
  setup() {
    const toast = useToast()
    const user = ref(null)
    const profile = ref({ full_name: '', bio: '' })
    const saving = ref(false)
    const error = ref('')
    const info = ref('')

    const load = async () => {
      error.value = ''
      try {
        const { data: sessionData } = await supabase.auth.getSession()
        user.value = sessionData?.session?.user || null
        if (!user.value?.id) {
          error.value = 'Sessão inválida. Faça login novamente.'
          return
        }
        const { data, error: qErr } = await supabase
          .from('profiles')
          .select('full_name, bio')
          .eq('id', user.value.id)
          .single()
        if (qErr && qErr.code !== 'PGRST116') throw qErr
        profile.value = data || { full_name: '', bio: '' }
      } catch (err) {
        console.error('Erro ao carregar perfil:', err)
        error.value = err?.message || 'Falha ao carregar perfil.'
      }
    }

    const saveProfile = async () => {
      error.value = ''
      info.value = ''
      try {
        saving.value = true
        const { error: upErr } = await supabase
          .from('profiles')
          .upsert({
            id: user.value.id,
            full_name: profile.value.full_name || '',
            bio: profile.value.bio || '',
            updated_at: new Date().toISOString()
          })
        if (upErr) throw upErr
        toast.success('Perfil atualizado com sucesso')
        info.value = 'Suas informações foram salvas.'
      } catch (err) {
        console.error('Erro ao salvar perfil:', err)
        error.value = err?.message || 'Falha ao salvar perfil.'
      } finally {
        saving.value = false
      }
    }

    onMounted(load)

    return {
      user,
      profile,
      saving,
      error,
      info,
      saveProfile
    }
  }
}
</script>