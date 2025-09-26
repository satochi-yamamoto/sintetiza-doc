import { createClient } from '@supabase/supabase-js'
import { createStandardError } from '@/utils/errorHandler'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

const createMissingConfigError = () => {
  return createStandardError('Supabase não configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY para habilitar autenticação e persistência.', 'SUPABASE_CONFIG_MISSING')
}

const createAsyncMissingResponse = async () => ({ data: null, error: createMissingConfigError() })

function createQueryBuilderStub() {
  const builder = {
    select: () => builder,
    insert: () => builder,
    update: () => builder,
    upsert: () => builder,
    delete: () => builder,
    eq: () => builder,
    neq: () => builder,
    gt: () => builder,
    gte: () => builder,
    lt: () => builder,
    lte: () => builder,
    like: () => builder,
    ilike: () => builder,
    in: () => builder,
    contains: () => builder,
    order: () => builder,
    range: () => builder,
    limit: () => builder,
    maybeSingle: createAsyncMissingResponse,
    single: createAsyncMissingResponse,
    then: (resolve, reject) => createAsyncMissingResponse().then(resolve, reject)
  }
  return builder
}

function createStorageStub() {
  const asyncError = async () => ({ data: null, error: createMissingConfigError() })
  return {
    upload: asyncError,
    download: asyncError,
    remove: asyncError,
    list: asyncError,
    createSignedUrl: async () => ({ data: { signedUrl: '' }, error: createMissingConfigError() }),
    getPublicUrl: () => ({ data: { publicUrl: '' }, error: createMissingConfigError() })
  }
}

function createSupabaseFallbackClient() {
  return {
    auth: {
      getSession: async () => ({ data: { session: null }, error: createMissingConfigError() }),
      getUser: async () => ({ data: null, error: createMissingConfigError() }),
      updateUser: async () => ({ data: null, error: createMissingConfigError() }),
      signOut: async () => ({ error: createMissingConfigError() }),
      signInWithIdToken: async () => ({ data: null, error: createMissingConfigError() })
    },
    from: () => createQueryBuilderStub(),
    storage: {
      from: () => createStorageStub()
    },
    channel() {
      const channelStub = {
        on() { return channelStub },
        subscribe() { return channelStub },
        unsubscribe() {}
      }
      return channelStub
    },
    removeChannel() {},
    rpc: createAsyncMissingResponse
  }
}

if (!isSupabaseConfigured) {
  console.warn('[supabase] Variáveis de ambiente não configuradas. Funcionalidades dependentes do Supabase serão desativadas.')
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      },
      realtime: {
        params: {
          eventsPerSecond: 10
        }
      }
    })
  : createSupabaseFallbackClient()

let cachedSession = null

export async function getSupabaseSession({ forceRefresh = false } = {}) {
  if (!isSupabaseConfigured) {
    return null
  }

  if (!forceRefresh && cachedSession) {
    return cachedSession
  }

  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      throw error
    }

    cachedSession = data?.session ?? null
    return cachedSession
  } catch (error) {
    console.warn('[supabase] Falha ao obter sessao atual:', error)
    cachedSession = null
    return null
  }
}

export async function ensureAppUserProfile({ session: providedSession } = {}) {
  if (!isSupabaseConfigured) {
    return {
      id: null,
      session: null,
      created: false,
      reason: 'config-missing'
    }
  }

  try {
    const session = providedSession ?? (await getSupabaseSession())
    if (!session?.user?.id) {
      return {
        id: null,
        session,
        created: false,
        reason: 'missing-session'
      }
    }

    const authUser = session.user
    const supabaseUid = authUser.id
    const email = authUser.email || authUser.user_metadata?.email || null
    const clerkId = authUser.user_metadata?.provider_id || authUser.user_metadata?.clerk_id || null

    try {
      const { data: existing, error: selectError } = await supabase
        .from('users')
        .select('id')
        .eq('id', supabaseUid)
        .maybeSingle()

      if (!selectError && existing?.id) {
        return {
          id: existing.id,
          session,
          created: false
        }
      }
    } catch (selectUnexpected) {
      console.warn('[supabase] Falha ao consultar tabela users:', selectUnexpected)
    }

    if (!email) {
      return {
        id: null,
        session,
        created: false,
        reason: 'missing-email'
      }
    }

    const payload = {
      id: supabaseUid,
      email,
      ...(clerkId ? { clerk_id: clerkId } : {})
    }

    const { data: upserted, error: upsertError } = await supabase
      .from('users')
      .upsert(payload, { onConflict: 'id' })
      .select('id')
      .single()

    if (upsertError) {
      console.warn('[supabase] Erro ao criar/atualizar registro em users:', upsertError)
      return {
        id: null,
        session,
        created: false,
        reason: 'upsert-failed',
        error: upsertError
      }
    }

    return {
      id: upserted?.id || supabaseUid,
      session,
      created: true
    }
  } catch (error) {
    console.warn('[supabase] ensureAppUserProfile falhou:', error)
    return {
      id: null,
      session: providedSession ?? null,
      created: false,
      reason: 'unexpected-error',
      error
    }
  }
}

// Nota: Em @supabase/supabase-js v2 não existe mais supabase.auth.setAuth.
// Para autenticar com provedores externos via OIDC, use signInWithIdToken.
// Este helper foi mantido apenas por compatibilidade e agora não faz nada.
export function setSupabaseAccessToken() {
  console.warn('[supabase] setSupabaseAccessToken não é suportado no supabase-js v2. Use ensureSupabaseAuth().')
}

// Funções utilitárias para o Supabase
export const supabaseUtils = {
  // Upload de arquivo
  async uploadFile(bucket, path, file, options = {}) {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: '3600',
          upsert: false,
          ...options
        })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Erro no upload:', error)
      throw error
    }
  },
  
  // Download de arquivo
  async downloadFile(bucket, path) {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .download(path)
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Erro no download:', error)
      throw error
    }
  },
  
  // Obter URL pública do arquivo
  getPublicUrl(bucket, path) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)
    
    return data.publicUrl
  },
  
  // Deletar arquivo
  async deleteFile(bucket, paths) {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .remove(Array.isArray(paths) ? paths : [paths])
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Erro ao deletar arquivo:', error)
      throw error
    }
  },
  
  // Listar arquivos
  async listFiles(bucket, path = '', options = {}) {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .list(path, {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' },
          ...options
        })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Erro ao listar arquivos:', error)
      throw error
    }
  },
  
  // Criar URL assinada (para arquivos privados)
  async createSignedUrl(bucket, path, expiresIn = 3600) {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrl(path, expiresIn)
      
      if (error) throw error
      return data.signedUrl
    } catch (error) {
      console.error('Erro ao criar URL assinada:', error)
      throw error
    }
  }
}

// Funções para trabalhar com dados
export const supabaseData = {
  // Inserir dados
  async insert(table, data) {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert(data)
        .select()
      
      if (error) throw error
      return result
    } catch (error) {
      console.error(`Erro ao inserir em ${table}:`, {
        message: error.message,
        stack: error.stack,
        name: error.name,
        code: error.code,
        table: table,
        dataKeys: data ? Object.keys(data) : null
      })
      throw error
    }
  },
  
  // Atualizar dados
  async update(table, data, filters) {
    try {
      let query = supabase.from(table).update(data)
      
      // Aplicar filtros
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value)
      })
      
      const { data: result, error } = await query.select()
      
      if (error) throw error
      return result
    } catch (error) {
      console.error(`Erro ao atualizar ${table}:`, {
        message: error.message,
        stack: error.stack,
        name: error.name,
        code: error.code,
        table: table,
        dataKeys: data ? Object.keys(data) : null,
        filterKeys: filters ? Object.keys(filters) : null
      })
      throw error
    }
  },
  
  // Deletar dados
  async delete(table, filters) {
    try {
      let query = supabase.from(table).delete()
      
      // Aplicar filtros
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value)
      })
      
      const { data, error } = await query
      
      if (error) throw error
      return data
    } catch (error) {
      console.error(`Erro ao deletar de ${table}:`, {
        message: error.message,
        stack: error.stack,
        name: error.name,
        code: error.code,
        table: table,
        filterKeys: filters ? Object.keys(filters) : null
      })
      throw error
    }
  },
  
  // Buscar dados
  async select(table, columns = '*', filters = {}, options = {}) {
    try {
      if (import.meta?.env?.DEV) {
        console.debug('[supabaseData.select] chamada', {
          table,
          columnsType: typeof columns,
          columns,
          filters,
          options
        })
      }
  
      // Normalização: permitir objeto de consulta no parâmetro "columns"
      let selectStr = columns
      let eqMap = filters || {}
      let gteMap = {}
      let lteMap = {}
      let inMap = {}
      let orderByOpt = options?.orderBy
      let limitOpt = options?.limit
      let offsetOpt = options?.offset
  
      if (columns && typeof columns === 'object' && !Array.isArray(columns)) {
        selectStr = columns.select || '*'
        eqMap = columns.eq || {}
        gteMap = columns.gte || {}
        lteMap = columns.lte || {}
        inMap = columns.in || {}
        orderByOpt = columns.orderBy ?? orderByOpt
        limitOpt = columns.limit ?? limitOpt
        offsetOpt = columns.offset ?? offsetOpt
      }
  
      let query = supabase.from(table).select(selectStr)
      
      // Aplicar filtros de igualdade/IN
      Object.entries(eqMap).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          query = query.in(key, value)
        } else {
          query = query.eq(key, value)
        }
      })
  
      // Aplicar filtros IN explícitos
      Object.entries(inMap).forEach(([key, value]) => {
        query = query.in(key, value)
      })
      
      // Aplicar operadores de comparação
      Object.entries(gteMap).forEach(([key, value]) => {
        query = query.gte(key, value)
      })
      Object.entries(lteMap).forEach(([key, value]) => {
        query = query.lte(key, value)
      })
      
      // Aplicar opções
      if (orderByOpt) {
        query = query.order(orderByOpt.column, { 
          ascending: orderByOpt.ascending !== false 
        })
      }
      
      if (limitOpt) {
        query = query.limit(limitOpt)
      }
      
      if (offsetOpt) {
        query = query.range(offsetOpt, offsetOpt + (limitOpt || 10) - 1)
      }
      
      const { data, error } = await query
      
      if (error) throw error
      return data
    } catch (error) {
      console.error(`Erro ao buscar de ${table}:`, error)
      throw error
    }
  },
  
  // Buscar um único registro
  async selectOne(table, columns = '*', filters = {}) {
    try {
      if (import.meta?.env?.DEV) {
        console.debug('[supabaseData.selectOne] chamada', {
          table,
          columnsType: typeof columns,
          columns,
          filters
        })
      }
      const data = await this.select(table, columns, filters, { limit: 1 })
      return data?.[0] || null
    } catch (error) {
      console.error(`Erro ao buscar registro único de ${table}:`, error)
      throw error
    }
  }
}

// Funções para Real-time
export const supabaseRealtime = {
  // Subscrever a mudanças em uma tabela
  subscribe(table, callback, filters = {}) {
    let channel = supabase
      .channel(`public:${table}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: table,
        ...filters
      }, callback)
      .subscribe()
    
    return channel
  },
  
  // Cancelar subscrição
  unsubscribe(channel) {
    supabase.removeChannel(channel)
  }
}

export default supabase

// Centraliza autenticação externa (OIDC) → Supabase sem depender de JWT template
export async function ensureSupabaseAuth(getTokenLike) {
  try {
    // 0) Se já há sessão válida do Supabase, evita trabalho
    try {
      const { data: sessData } = await supabase.auth.getSession()
      if (sessData?.session?.access_token) {
        return true
      }
    } catch (eSession) {
      console.debug('[ensureSupabaseAuth] sessão inexistente ou inválida, tentando autenticar...', eSession)
    }

    const callGetToken = async (opts) => {
      if (!getTokenLike) return null;
      const fn = typeof getTokenLike === 'function' ? getTokenLike : getTokenLike?.value;
      if (!fn) return null;
      return await fn(opts);
    };

    // 1) Obter token do provedor externo (IdP). Em muitos setups, o template "supabase" é o recomendado
    //    para signInWithIdToken. Tentamos na ordem: env template → 'supabase' → default
    let token = null;
    const envTemplate = (
      (import.meta?.env?.VITE_SUPABASE_OIDC_TEMPLATE ||
       import.meta?.env?.VITE_OIDC_JWT_TEMPLATE ||
       import.meta?.env?.VITE_CLERK_JWT_TEMPLATE ||
       '')
    ).trim();
    if (envTemplate) {
      try {
        token = await callGetToken({ template: envTemplate });
      } catch (eT) {
        console.debug('[ensureSupabaseAuth] falha ao obter token com template de env:', eT);
      }
    }
    if (!token) {
      try {
        token = await callGetToken({ template: 'supabase' });
        if (!token) console.debug('[ensureSupabaseAuth] getToken com template "supabase" retornou vazio');
      } catch (eTS) {
        console.debug('[ensureSupabaseAuth] falha ao obter token com template "supabase":', eTS);
      }
    }
    if (!token) {
      try {
        token = await callGetToken(); // último recurso: token padrão da sessão
      } catch (eDefault) {
        console.debug('[ensureSupabaseAuth] falha ao obter token padrão:', eDefault);
      }
    }

    // Se token vier nulo, tentar usar template do Clerk informado por ENV
    if (!token) return false;

    // 2) Fluxo compatível com supabase-js v2: usar signInWithIdToken
    //    Requer habilitar OIDC no Supabase para o provedor configurado
    // Tentativas de provider: ENV → 'oidc'
    const providersToTry = []
    const envProv = (import.meta?.env?.VITE_SUPABASE_OIDC_PROVIDER || '').trim()
    if (envProv) providersToTry.push(envProv)
    providersToTry.push('oidc')
    
    const enableBootstrap = import.meta.env?.VITE_ENABLE_OIDC_BOOTSTRAP === 'true'
    if (!enableBootstrap) {
      console.debug('[ensureSupabaseAuth] OIDC bootstrap desativado por VITE_ENABLE_OIDC_BOOTSTRAP=false; ignorando tentativa de sign-in.')
    } else {
      for (const provider of providersToTry) {
        try {
          const { error } = await supabase.auth.signInWithIdToken({ provider, token })
          if (!error) return true
          console.debug(`[ensureSupabaseAuth] signInWithIdToken erro com provider "${provider}":`, error)
        } catch (e2) {
          console.debug(`[ensureSupabaseAuth] tentativa com provider "${provider}" falhou:`, e2)
        }
      }
    }
    console.warn('[ensureSupabaseAuth] Não foi possível autenticar com nenhum provider (ENV, oidc). Verifique a configuração OIDC no Supabase e o JWT template do seu IdP.')
    return false
  } catch (err) {
    console.warn('[ensureSupabaseAuth] erro inesperado:', err);
    return false;
  }
}