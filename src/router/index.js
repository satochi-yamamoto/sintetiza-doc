import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@clerk/vue'
import { watch } from 'vue'

// Importação lazy das views
const Home = () => import('@/views/Home.vue')
const Features = () => import('@/views/Features.vue')
const Pricing = () => import('@/views/Pricing.vue')
const Contact = () => import('@/views/Contact.vue')
// Componentes do Clerk
const SignInPage = () => import('@/views/auth/SignInPage.vue')
const SignUpPage = () => import('@/views/auth/SignUpPage.vue')
const UserProfilePage = () => import('@/views/auth/UserProfilePage.vue')
const Dashboard = () => import('@/views/dashboard/Dashboard.vue')
const Documents = () => import('@/views/dashboard/Documents.vue')
const Summaries = () => import('@/views/dashboard/Summaries.vue')
const Settings = () => import('@/views/dashboard/Settings.vue')
const Billing = () => import('@/views/dashboard/Billing.vue')
const Profile = () => import('@/views/dashboard/Profile.vue')
const AdminDashboard = () => import('@/views/admin/AdminDashboard.vue')
const AdminUsers = () => import('@/views/admin/AdminUsers.vue')
const AdminAnalytics = () => import('@/views/admin/AdminAnalytics.vue')
const NotFound = () => import('@/views/NotFound.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Sintetiza Doc - Resumos Inteligentes com IA',
      description: 'Transforme documentos e reuniões em resumos objetivos e estruturados com inteligência artificial'
    }
  },
  {
    path: '/funcionalidades',
    name: 'features',
    component: Features,
    meta: {
      title: 'Funcionalidades - Sintetiza Doc',
      description: 'Conheça todas as funcionalidades do Sintetiza Doc para geração de resumos inteligentes'
    }
  },
  {
    path: '/precos',
    name: 'pricing',
    component: Pricing,
    meta: {
      title: 'Preços - Sintetiza Doc',
      description: 'Escolha o plano ideal para suas necessidades de resumos inteligentes'
    }
  },
  {
    path: '/contato',
    name: 'contact',
    component: Contact,
    meta: {
      title: 'Contato - Sintetiza Doc',
      description: 'Entre em contato conosco para dúvidas e suporte'
    }
  },
  // Rotas de Autenticação com Clerk
  {
    path: '/sign-in',
    name: 'sign-in',
    component: SignInPage,
    meta: {
      title: 'Entrar - Sintetiza Doc'
    }
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUpPage,
    meta: {
      title: 'Criar Conta - Sintetiza Doc'
    }
  },
  {
    path: '/user-profile',
    name: 'user-profile',
    component: UserProfilePage,
    meta: {
      title: 'Meu Perfil - Sintetiza Doc'
    }
  },
  // Redirecionamentos das rotas antigas
  {
    path: '/login',
    redirect: '/sign-in'
  },
  {
    path: '/cadastro',
    redirect: '/sign-up'
  },
  {
    path: '/register',
    redirect: '/sign-up'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard - Sintetiza Doc',
      requiresAuth: true
    }
  },
  {
    path: '/dashboard/documentos',
    name: 'dashboard-documents',
    component: Documents,
    meta: {
      title: 'Documentos - Sintetiza Doc',
      requiresAuth: true
    }
  },
  {
    path: '/dashboard/resumos',
    name: 'dashboard-summaries',
    component: Summaries,
    meta: {
      title: 'Resumos - Sintetiza Doc',
      requiresAuth: true
    }
  },
  {
    path: '/dashboard/configuracoes',
    name: 'dashboard-settings',
    component: Settings,
    meta: {
      title: 'Configurações - Sintetiza Doc',
      requiresAuth: true
    }
  },
  {
    path: '/dashboard/cobranca',
    name: 'dashboard-billing',
    component: Billing,
    meta: {
      title: 'Cobrança - Sintetiza Doc',
      requiresAuth: true
    }
  },
  {
    path: '/dashboard/perfil',
    name: 'dashboard-profile',
    component: Profile,
    meta: {
      title: 'Perfil - Sintetiza Doc',
      requiresAuth: true
    }
  },
  {
    path: '/admin',
    name: 'admin-dashboard',
    component: AdminDashboard,
    meta: {
      title: 'Admin Dashboard - Sintetiza Doc',
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/admin/usuarios',
    name: 'admin-users',
    component: AdminUsers,
    meta: {
      title: 'Usuários - Admin - Sintetiza Doc',
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/admin/analytics',
    name: 'admin-analytics',
    component: AdminAnalytics,
    meta: {
      title: 'Analytics - Admin - Sintetiza Doc',
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
    meta: {
      title: 'Página não encontrada - Sintetiza Doc'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Guards de navegação
router.beforeEach(async (to, from, next) => {
  // Aguardar carregamento do Clerk
  const { isLoaded, isSignedIn, user } = useAuth()
  
  if (!isLoaded.value) {
    // Aguardar o Clerk carregar
    await new Promise(resolve => {
      const unwatch = watch(isLoaded, (loaded) => {
        if (loaded) {
          unwatch()
          resolve()
        }
      })
    })
  }
  
  // Atualizar título da página
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  // Atualizar meta description
  if (to.meta.description) {
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', to.meta.description)
    }
  }
  
  // Verificar autenticação
  if (to.meta.requiresAuth && !isSignedIn.value) {
    next({ name: 'sign-in', query: { redirect: to.fullPath } })
    return
  }
  
  // Verificar se usuário já está logado (para páginas de guest)
  if (to.meta.requiresGuest && isSignedIn.value) {
    next({ name: 'dashboard' })
    return
  }
  
  // Verificar se é admin (usando Clerk metadata)
  if (to.meta.requiresAdmin) {
    const isAdmin = user.value?.publicMetadata?.role === 'admin'
    if (!isAdmin) {
      next({ name: 'dashboard' })
      return
    }
  }
  
  next()
})

export default router