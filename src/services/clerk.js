import Clerk from '@clerk/clerk-js'
import { CLERK_CONFIG } from '@/utils/constants'

// Inicializar Clerk
const clerk = new Clerk(CLERK_CONFIG.PUBLISHABLE_KEY)

/**
 * Serviço de autenticação com Clerk
 */
export class ClerkService {
  constructor() {
    this.clerk = clerk
    this.initialized = false
  }

  /**
   * Inicializar Clerk
   */
  async initialize() {
    if (this.initialized) return

    try {
      await this.clerk.load()
      this.initialized = true
      console.log('Clerk inicializado com sucesso')
    } catch (error) {
      console.error('Erro ao inicializar Clerk:', error)
      throw error
    }
  }

  /**
   * Verificar se o usuário está autenticado
   */
  isAuthenticated() {
    return !!this.clerk.user
  }

  /**
   * Obter usuário atual
   */
  getCurrentUser() {
    return this.clerk.user
  }

  /**
   * Obter sessão atual
   */
  getCurrentSession() {
    return this.clerk.session
  }

  /**
   * Fazer login com email e senha
   */
  async signIn(email, password) {
    try {
      const result = await this.clerk.client.signIn.create({
        identifier: email,
        password
      })

      if (result.status === 'complete') {
        await this.clerk.setActive({ session: result.createdSessionId })
        return result
      }

      return result
    } catch (error) {
      console.error('Erro no login:', error)
      throw error
    }
  }

  /**
   * Fazer cadastro com email e senha
   */
  async signUp(userData) {
    try {
      console.log('Clerk signUp - Dados enviados:', {
        email: userData.email,
        // Removendo firstName e lastName temporariamente devido ao erro 422
        // firstName: userData.firstName,
        // lastName: userData.lastName,
        passwordLength: userData.password?.length || 0
      })

      // Removendo firstName e lastName temporariamente
      const signUpData = {
        emailAddress: userData.email,
        password: userData.password
      }

      const result = await this.clerk.client.signUp.create(signUpData)
      
      console.log('Clerk signUp - Resultado:', {
        id: result.id,
        status: result.status,
        emailAddress: result.emailAddress
      })

      return result
    } catch (error) {
      console.error('Erro no cadastro:', error)
      console.error('Clerk signUp - Detalhes do erro:', {
        message: error.message,
        status: error.status,
        code: error.code,
        errors: error.errors,
        longMessage: error.longMessage
      })

      // Log detalhado dos erros
      if (error.errors && Array.isArray(error.errors)) {
        console.error('Clerk signUp - Erros específicos:', error.errors)
        error.errors.forEach((err, index) => {
          console.error(`Erro ${index + 1}:`, {
            code: err.code,
            message: err.message,
            longMessage: err.longMessage,
            meta: err.meta,
            param: err.param
          })
        })
      }

      throw error
    }
  }

  /**
   * Verificar código de email
   */
  async verifyEmailCode(code) {
    try {
      const result = await this.clerk.client.signUp.attemptEmailAddressVerification({
        code
      })

      if (result.status === 'complete') {
        await this.clerk.setActive({ session: result.createdSessionId })
      }

      return result
    } catch (error) {
      console.error('Erro na verificação:', error)
      throw error
    }
  }

  /**
   * Login com provedor OAuth
   */
  async signInWithOAuth(provider) {
    try {
      const result = await this.clerk.client.signIn.authenticateWithRedirect({
        strategy: `oauth_${provider}`,
        redirectUrl: CLERK_CONFIG.AFTER_SIGN_IN_URL,
        redirectUrlComplete: CLERK_CONFIG.AFTER_SIGN_IN_URL
      })

      return result
    } catch (error) {
      console.error(`Erro no login com ${provider}:`, error)
      throw error
    }
  }

  /**
   * Cadastro com provedor OAuth
   */
  async signUpWithOAuth(provider) {
    try {
      const result = await this.clerk.client.signUp.authenticateWithRedirect({
        strategy: `oauth_${provider}`,
        redirectUrl: CLERK_CONFIG.AFTER_SIGN_UP_URL,
        redirectUrlComplete: CLERK_CONFIG.AFTER_SIGN_UP_URL
      })

      return result
    } catch (error) {
      console.error(`Erro no cadastro com ${provider}:`, error)
      throw error
    }
  }

  /**
   * Fazer logout
   */
  async signOut() {
    try {
      await this.clerk.signOut()
      console.log('Logout realizado com sucesso')
    } catch (error) {
      console.error('Erro no logout:', error)
      throw error
    }
  }

  /**
   * Recuperar senha
   */
  async resetPassword(email) {
    try {
      const result = await this.clerk.client.signIn.create({
        identifier: email
      })

      await result.prepareFirstFactor({
        strategy: 'reset_password_email_code'
      })

      return result
    } catch (error) {
      console.error('Erro ao recuperar senha:', error)
      throw error
    }
  }

  /**
   * Confirmar reset de senha
   */
  async confirmPasswordReset(code, newPassword) {
    try {
      const result = await this.clerk.client.signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password: newPassword
      })

      if (result.status === 'complete') {
        await this.clerk.setActive({ session: result.createdSessionId })
      }

      return result
    } catch (error) {
      console.error('Erro ao confirmar reset de senha:', error)
      throw error
    }
  }

  /**
   * Atualizar perfil do usuário
   */
  async updateProfile(data) {
    try {
      const user = this.clerk.user
      if (!user) throw new Error('Usuário não autenticado')

      const result = await user.update(data)
      return result
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
      throw error
    }
  }

  /**
   * Obter token JWT
   */
  async getToken() {
    try {
      const session = this.clerk.session
      if (!session) return null

      return await session.getToken()
    } catch (error) {
      console.error('Erro ao obter token:', error)
      return null
    }
  }

  /**
   * Listener para mudanças de autenticação
   */
  onAuthChange(callback) {
    return this.clerk.addListener(callback)
  }

  /**
   * Remover listener
   */
  removeAuthListener(listener) {
    this.clerk.removeListener(listener)
  }
}

// Instância singleton
export const clerkService = new ClerkService()

// Export default para compatibilidade
export default clerkService