import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, svix-id, svix-timestamp, svix-signature',
}

interface ClerkUser {
  id: string
  email_addresses: Array<{
    email_address: string
    id: string
  }>
  first_name: string | null
  last_name: string | null
  image_url: string | null
  phone_numbers: Array<{
    phone_number: string
    id: string
  }>
  created_at: number
  updated_at: number
  last_sign_in_at: number | null
  email_addresses_verified: boolean
  phone_numbers_verified: boolean
}

interface WebhookEvent {
  type: string
  data: ClerkUser
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Verificar se é uma requisição POST
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { 
        status: 405, 
        headers: corsHeaders 
      })
    }

    // Inicializar cliente Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Obter dados do webhook
    const payload: WebhookEvent = await req.json()
    
    console.log('Webhook recebido:', payload.type)

    // Processar diferentes tipos de eventos
    switch (payload.type) {
      case 'user.created':
        await handleUserCreated(supabase, payload.data)
        break
      
      case 'user.updated':
        await handleUserUpdated(supabase, payload.data)
        break
      
      case 'user.deleted':
        await handleUserDeleted(supabase, payload.data.id)
        break
      
      default:
        console.log('Tipo de evento não tratado:', payload.type)
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Erro no webhook:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})

async function handleUserCreated(supabase: any, userData: ClerkUser) {
  console.log('Criando usuário:', userData.id)
  
  const user = {
    id: userData.id,
    clerk_id: userData.id,
    email: userData.email_addresses[0]?.email_address || null,
    first_name: userData.first_name,
    last_name: userData.last_name,
    image_url: userData.image_url,
    phone: userData.phone_numbers[0]?.phone_number || null,
    created_at: new Date(userData.created_at).toISOString(),
    updated_at: new Date(userData.updated_at).toISOString(),
    last_sign_in_at: userData.last_sign_in_at ? new Date(userData.last_sign_in_at).toISOString() : null,
    email_verified: userData.email_addresses_verified || false,
    phone_verified: userData.phone_numbers_verified || false,
    is_active: true,
    metadata: {}
  }

  const { error: userError } = await supabase
    .from('users')
    .insert([user])

  if (userError) {
    console.error('Erro ao criar usuário:', userError)
    throw userError
  }

  // Criar assinatura gratuita padrão
  const subscription = {
    user_id: userData.id,
    plan_id: 'free',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }

  const { error: subscriptionError } = await supabase
    .from('subscriptions')
    .insert([subscription])

  if (subscriptionError) {
    console.error('Erro ao criar assinatura:', subscriptionError)
    throw subscriptionError
  }

  console.log('Usuário criado com sucesso:', userData.id)
}

async function handleUserUpdated(supabase: any, userData: ClerkUser) {
  console.log('Atualizando usuário:', userData.id)
  
  const updates = {
    email: userData.email_addresses[0]?.email_address || null,
    first_name: userData.first_name,
    last_name: userData.last_name,
    image_url: userData.image_url,
    phone: userData.phone_numbers[0]?.phone_number || null,
    updated_at: new Date(userData.updated_at).toISOString(),
    last_sign_in_at: userData.last_sign_in_at ? new Date(userData.last_sign_in_at).toISOString() : null,
    email_verified: userData.email_addresses_verified || false,
    phone_verified: userData.phone_numbers_verified || false
  }

  const { error } = await supabase
    .from('users')
    .update(updates)
    .eq('clerk_id', userData.id)

  if (error) {
    console.error('Erro ao atualizar usuário:', error)
    throw error
  }

  console.log('Usuário atualizado com sucesso:', userData.id)
}

async function handleUserDeleted(supabase: any, userId: string) {
  console.log('Deletando usuário:', userId)
  
  // Marcar como inativo ao invés de deletar (soft delete)
  const { error } = await supabase
    .from('users')
    .update({ 
      is_active: false,
      updated_at: new Date().toISOString()
    })
    .eq('clerk_id', userId)

  if (error) {
    console.error('Erro ao desativar usuário:', error)
    throw error
  }

  console.log('Usuário desativado com sucesso:', userId)
}