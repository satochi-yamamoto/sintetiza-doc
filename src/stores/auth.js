import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/services/supabase'
import { clerkClient } from '@/services/clerk'
import { useToast } from 'vue-toastification'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const toast = useToast()
  
  // State
  const user = ref(null)
  const session = ref(null)
  const loading = ref(false)
  const initialized = ref(false)
  
  // Getters
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const userPlan = computed(() => user.value?.subscription?.plan || 'free')
  const userLimits = computed(() => {
    const plans = {
      free: { documents: 5, summaries: 5 },
      basic: { documents: 50, summaries: 50 },
      professional: { documents: -1, summaries: -1 }, // ilimitado
      enterprise: { documents: -1, summaries: -1 }
    }
    return plans[userPlan.value] || plans.free
  })
  
  // Actions
  async function initialize() {
    if (initialized.value) return
    
    try {
      loading.value = true
      
      // Verificar sessão do Supabase
      const { data: { session: supabaseSession } } = await supabase.auth.getSession()
      
      if (supabaseSession) {
        session.value = supabaseSession
        await loadUserProfile(supabaseSession.user.id)
      }
      
      // Listener para mudanças de autenticação
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          await handleSignIn(session)
        } else if (event === 'SIGNED_OUT') {
          await handleSignOut()
        }
      })
      
    } catch (error) {
      console.error('Erro ao inicializar autenticação:', error)
    } finally {
      loading.value = false
      initialized.value = true
    }
  }
  
  async function signIn(email, password) {
    try {
      loading.value = true
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) throw error
      
      toast.success('Login realizado com sucesso!')
      return data
      
    } catch (error) {
      console.error('Erro no login:', error)
      toast.error(error.message || 'Erro ao fazer login')
      throw error
    } finally {
      loading.value = false
    }
  }
  
  async function signUp(email, password, userData = {}) {
    try {
      loading.value = true
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      })
      
      if (error) throw error
      
      toast.success('Cadastro realizado! Verifique seu email.')
      return data
      
    } catch (error) {
      console.error('Erro no cadastro:', error)
      toast.error(error.message || 'Erro ao fazer cadastro')
      throw error
    } finally {
      loading.value = false
    }
  }
  
  async function signInWithProvider(provider) {
    try {
      loading.value = true
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      })
      
      if (error) throw error
      
      return data
      
    } catch (error) {
      console.error(`Erro no login com ${provider}:`, error)
      toast.error(`Erro ao fazer login com ${provider}`)
      throw error
    } finally {
      loading.value = false
    }
  }
  
  async function signOut() {
    try {
      loading.value = true
      
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      toast.success('Logout realizado com sucesso!')
      
    } catch (error) {
      console.error('Erro no logout:', error)
      toast.error('Erro ao fazer logout')
    } finally {
      loading.value = false
    }
  }
  
  async function resetPassword(email) {
    try {
      loading.value = true
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })
      
      if (error) throw error
      
      toast.success('Email de recuperação enviado!')
      
    } catch (error) {
      console.error('Erro ao recuperar senha:', error)
      toast.error('Erro ao enviar email de recuperação')
      throw error
    } finally {
      loading.value = false
    }
  }
  
  async function updatePassword(newPassword) {
    try {
      loading.value = true
      
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })
      
      if (error) throw error
      
      toast.success('Senha atualizada com sucesso!')
      
    } catch (error) {
      console.error('Erro ao atualizar senha:', error)
      toast.error('Erro ao atualizar senha')
      throw error
    } finally {
      loading.value = false
    }
  }
  
  async function updateProfile(updates) {
    try {
      loading.value = true
      
      // Atualizar no Supabase Auth
      const { error: authError } = await supabase.auth.updateUser({
        data: updates
      })
      
      if (authError) throw authError
      
      // Atualizar no banco de dados
      const { error: dbError } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.value.id)
      
      if (dbError) throw dbError
      
      // Atualizar estado local
      user.value = { ...user.value, ...updates }
      
      toast.success('Perfil atualizado com sucesso!')
      
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
      toast.error('Erro ao atualizar perfil')
      throw error
    } finally {
      loading.value = false
    }
  }
  
  async function loadUserProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          subscription:subscriptions(*)
        `)
        .eq('id', userId)
        .single()
      
      if (error) throw error
      
      user.value = data
      
    } catch (error) {
      console.error('Erro ao carregar perfil:', error)
    }
  }
  
  async function handleSignIn(session) {
    try {
      this.session = session
      await loadUserProfile(session.user.id)
      
      // Redirecionar para dashboard ou página solicitada
      const redirect = router.currentRoute.value.query.redirect || '/dashboard'
      router.push(redirect)
      
    } catch (error) {
      console.error('Erro ao processar login:', error)
    }
  }
  
  async function handleSignOut() {
    user.value = null
    session.value = null
    router.push('/')
  }
  
  return {
    // State
    user,
    session,
    loading,
    initialized,
    
    // Getters
    isAuthenticated,
    isAdmin,
    userPlan,
    userLimits,
    
    // Actions
    initialize,
    signIn,
    signUp,
    signInWithProvider,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    loadUserProfile
  }
})