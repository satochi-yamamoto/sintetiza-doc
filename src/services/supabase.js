import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variáveis de ambiente do Supabase não configuradas')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
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

// Expor helper para definir o token de acesso (ex.: JWT do Clerk)
export function setSupabaseAccessToken(accessToken) {
  supabase.auth.setAuth(accessToken);
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
      console.error(`Erro ao inserir em ${table}:`, error)
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
      console.error(`Erro ao atualizar ${table}:`, error)
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
      console.error(`Erro ao deletar de ${table}:`, error)
      throw error
    }
  },
  
  // Buscar dados
  async select(table, columns = '*', filters = {}, options = {}) {
    try {
      let query = supabase.from(table).select(columns)
      
      // Aplicar filtros
      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          query = query.in(key, value)
        } else {
          query = query.eq(key, value)
        }
      })
      
      // Aplicar opções
      if (options.orderBy) {
        query = query.order(options.orderBy.column, { 
          ascending: options.orderBy.ascending !== false 
        })
      }
      
      if (options.limit) {
        query = query.limit(options.limit)
      }
      
      if (options.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
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

// Centraliza a autenticação Clerk → Supabase sem depender de JWT template
export async function ensureSupabaseAuth(getTokenLike) {
  try {
    const callGetToken = async (opts) => {
      if (!getTokenLike) return null;
      const fn = typeof getTokenLike === 'function' ? getTokenLike : getTokenLike?.value;
      if (!fn) return null;
      return await fn(opts);
    };

    // 1) Abordagem recomendada: usar o session token padrão do Clerk (sem template)
    let token = await callGetToken();

    // Se token vier nulo, tentar usar template do Clerk informado por ENV
    if (!token) {
      const envTemplate = (import.meta?.env?.VITE_CLERK_JWT_TEMPLATE || '').trim();
      if (envTemplate) {
        try {
          token = await callGetToken({ template: envTemplate });
          if (!token) console.debug('[ensureSupabaseAuth] getToken com template de env retornou vazio');
        } catch (eT) {
          console.debug('[ensureSupabaseAuth] falha ao obter token com template de env:', eT);
        }
      } else {
        // Fallback comum quando o projeto define template "supabase" no Clerk
        try {
          token = await callGetToken({ template: 'supabase' });
          if (!token) console.debug('[ensureSupabaseAuth] getToken com template "supabase" retornou vazio');
        } catch (eTS) {
          console.debug('[ensureSupabaseAuth] falha ao obter token com template "supabase":', eTS);
        }
      }
    }

    // Se ainda não houver token, abortar
    if (!token) return false;

    // Tenta aplicar o token diretamente
    try {
      await supabase.auth.setAuth(token);
      return true;
    } catch (e1) {
      // Fallback opcional: tentar signInWithIdToken se explicitamente habilitado por env
      const allowIdToken = (import.meta?.env?.VITE_SUPABASE_ALLOW_IDTOKEN_LOGIN === 'true');
      if (allowIdToken && supabase?.auth?.signInWithIdToken) {
        try {
          await supabase.auth.signInWithIdToken({ provider: 'clerk', token });
          return true;
        } catch (e2) {
          console.error('[ensureSupabaseAuth] signInWithIdToken falhou:', e2);
        }
      }
      console.error('[ensureSupabaseAuth] setAuth falhou e fallback id_token está desabilitado ou indisponível:', e1);
      return false;
    }
  } catch (err) {
    console.error('[ensureSupabaseAuth] erro inesperado:', err);
    return false;
  }
}