import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/services/supabase'
import { clerkService } from '@/services/clerk'
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
      
      // Inicializar Clerk
      await clerkService.initialize()
      
      // Verificar se há usuário autenticado no Clerk
      const clerkUser = clerkService.getCurrentUser()
      if (clerkUser) {
        await handleClerkUser(clerkUser)
      }
      
      // Configurar listener para mudanças de autenticação no Clerk
      clerkService.onAuthChange(async (clerkUser) => {
        if (clerkUser) {
          await handleClerkUser(clerkUser)
        } else {
          await handleSignOut()
        }
      })
      
      // Manter compatibilidade com Supabase Auth
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
      
      // Tentar login com Clerk primeiro
      const clerkResult = await clerkService.signIn(email, password)
      
      if (clerkResult.status === 'complete') {
        toast.success('Login realizado com sucesso!')
        return clerkResult
      }
      
      // Fallback para Supabase se Clerk falhar
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
      
      console.log('Iniciando cadastro:', { email, userData })
      
      // Tentar cadastro com Clerk primeiro (sem firstName e lastName)
      const clerkResult = await clerkService.signUp({
        email,
        password
      })
      
      console.log('Resultado do Clerk:', clerkResult)
      
      if (clerkResult.status === 'complete') {
        toast.success('Cadastro realizado com sucesso!')
        return clerkResult
      } else if (clerkResult.status === 'missing_requirements') {
        toast.info('Verifique seu email para completar o cadastro')
        // Redirecionar para página de confirmação de email
        router.push('/email-confirmation')
        return clerkResult
      }
      
      // Fallback para Supabase se Clerk falhar
      console.log('Tentando fallback para Supabase')
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      })
      
      if (error) throw error
      
      toast.success('Cadastro realizado! Verifique seu email.')
      // Redirecionar para página de confirmação de email também no Supabase
      router.push('/email-confirmation')
      return data
      
    } catch (error) {
      console.error('Erro no cadastro:', error)
      console.error('Detalhes do erro:', {
        message: error.message,
        status: error.status,
        code: error.code,
        errors: error.errors,
        stack: error.stack
      })
      
      // Tratamento específico para diferentes tipos de erro
      if (error.status === 422 || error.code === 422) {
        console.error('Erro 422 - Dados inválidos:', error)
        if (error.errors && error.errors.length > 0) {
          const errorMessages = error.errors.map(err => {
            // Traduzir mensagens comuns do Clerk
            if (err.code === 'form_identifier_exists') {
              return 'Este email já está cadastrado'
            }
            if (err.code === 'form_password_pwned') {
              return 'Esta senha é muito comum. Escolha uma senha mais segura'
            }
            if (err.code === 'form_password_length_too_short') {
              return 'A senha deve ter pelo menos 8 caracteres'
            }
            if (err.code === 'form_password_validation') {
              return 'A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número'
            }
            if (err.code === 'form_param_format_invalid') {
              return 'Formato de email inválido'
            }
            return err.message || err.long_message
          }).join(', ')
          toast.error(`${errorMessages}`)
        } else {
          toast.error('Dados de cadastro inválidos. Verifique as informações e tente novamente.')
        }
      } else if (error.status === 429) {
        toast.error('Muitas tentativas. Aguarde alguns minutos antes de tentar novamente.')
      } else if (error.status === 401) {
        toast.error('Erro de autenticação. Verifique suas credenciais.')
      } else if (error.status === 403) {
        toast.error('Acesso negado. Verifique se o cadastro está habilitado.')
      } else if (error.status === 500) {
        toast.error('Erro interno do servidor. Tente novamente em alguns minutos.')
      } else if (error.message?.includes('captcha')) {
        toast.error('Erro de verificação de segurança. Tente novamente.')
      } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
        toast.error('Erro de conexão. Verifique sua internet e tente novamente.')
      } else {
        toast.error(error.message || 'Erro inesperado ao fazer cadastro. Tente novamente.')
      }
      
      throw error
    } finally {
      loading.value = false
    }
  }
  
  async function signInWithProvider(provider) {
    try {
      loading.value = true
      
      // Tentar login OAuth com Clerk primeiro
      try {
        const clerkResult = await clerkService.signInWithOAuth(provider)
        return clerkResult
      } catch (clerkError) {
        console.warn('Clerk OAuth falhou, tentando Supabase:', clerkError)
      }
      
      // Fallback para Supabase
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
      
      // Fazer logout do Clerk se estiver autenticado
      if (clerkService.isAuthenticated()) {
        await clerkService.signOut()
      }
      
      // Fazer logout do Supabase
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
      // Verificar se o userId é válido
      if (!userId) {
        console.error('ID do usuário inválido:', userId)
        return
      }

      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          subscription:subscriptions(*)
        `)
        .eq('clerk_id', userId)
        .single()
      
      if (error) {
        console.error('Erro ao carregar perfil:', error)
        return
      }
      
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
  
  async function handleClerkUser(clerkUser) {
    try {
      // Verificar se o usuário do Clerk é válido
      if (!clerkUser || !clerkUser.id) {
        console.error('Usuário do Clerk inválido:', clerkUser)
        return
      }

      // Sincronizar usuário do Clerk com Supabase
      const userData = {
        id: clerkUser.id,
        clerk_id: clerkUser.id,
        email: clerkUser.primaryEmailAddress?.emailAddress,
        first_name: clerkUser.firstName,
        last_name: clerkUser.lastName,
        image_url: clerkUser.imageUrl,
        created_at: clerkUser.createdAt ? new Date(clerkUser.createdAt).toISOString() : new Date().toISOString(),
        updated_at: clerkUser.updatedAt ? new Date(clerkUser.updatedAt).toISOString() : new Date().toISOString(),
        is_active: true,
        metadata: {}
      }
      
      // Verificar se usuário já existe no Supabase
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('clerk_id', clerkUser.id)
        .single()
      
      if (!existingUser) {
        // Criar usuário no Supabase
        const { error } = await supabase
          .from('users')
          .insert([userData])
        
        if (error) {
          console.error('Erro ao criar usuário no Supabase:', error)
        } else {
          console.log('Usuário criado com sucesso no Supabase:', clerkUser.id)
        }
      } else {
        // Atualizar usuário existente
        const updateData = {
          email: userData.email,
          first_name: userData.first_name,
          last_name: userData.last_name,
          image_url: userData.image_url,
          updated_at: userData.updated_at
        }
        
        const { error } = await supabase
          .from('users')
          .update(updateData)
          .eq('clerk_id', clerkUser.id)
        
        if (error) {
          console.error('Erro ao atualizar usuário no Supabase:', error)
        } else {
          console.log('Usuário atualizado com sucesso no Supabase:', clerkUser.id)
        }
      }
      
      // Carregar perfil completo
      await loadUserProfile(clerkUser.id)
      
      // Redirecionar para dashboard
      const redirect = router.currentRoute.value.query.redirect || '/dashboard'
      router.push(redirect)
      
    } catch (error) {
      console.error('Erro ao processar usuário do Clerk:', error)
    }
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