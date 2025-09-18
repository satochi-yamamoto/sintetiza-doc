-- Migração inicial: Estrutura de usuários e assinaturas
-- Criado em: 2024-01-20

-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA extensions;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    clerk_id TEXT UNIQUE,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    image_url TEXT,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_sign_in_at TIMESTAMP WITH TIME ZONE,
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Tabela de assinaturas
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    stripe_customer_id TEXT UNIQUE,
    stripe_subscription_id TEXT UNIQUE,
    plan_id TEXT NOT NULL DEFAULT 'free',
    status TEXT NOT NULL DEFAULT 'active',
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    canceled_at TIMESTAMP WITH TIME ZONE,
    trial_start TIMESTAMP WITH TIME ZONE,
    trial_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb,
    
    CONSTRAINT valid_plan_id CHECK (plan_id IN ('free', 'basic', 'professional', 'enterprise')),
    CONSTRAINT valid_status CHECK (status IN ('active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'trialing', 'unpaid'))
);

-- Tabela de documentos
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    original_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    file_type TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'uploaded',
    processing_started_at TIMESTAMP WITH TIME ZONE,
    processing_completed_at TIMESTAMP WITH TIME ZONE,
    error_message TEXT,
    extracted_text TEXT,
    page_count INTEGER,
    word_count INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb,
    
    CONSTRAINT valid_status CHECK (status IN ('uploaded', 'processing', 'completed', 'failed', 'deleted'))
);

-- Tabela de resumos
CREATE TABLE IF NOT EXISTS public.summaries (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    document_id UUID NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL DEFAULT 'standard',
    language TEXT NOT NULL DEFAULT 'pt-BR',
    content TEXT NOT NULL,
    word_count INTEGER,
    tokens_used INTEGER,
    ai_model TEXT,
    processing_time_ms INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb,
    
    CONSTRAINT valid_type CHECK (type IN ('standard', 'executive', 'technical', 'bullet_points', 'detailed')),
    CONSTRAINT valid_language CHECK (language IN ('pt-BR', 'en-US', 'es-ES'))
);

-- Tabela de uso mensal (para controle de limites)
CREATE TABLE IF NOT EXISTS public.monthly_usage (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    year INTEGER NOT NULL,
    month INTEGER NOT NULL,
    summaries_count INTEGER DEFAULT 0,
    documents_processed INTEGER DEFAULT 0,
    tokens_used INTEGER DEFAULT 0,
    storage_used_bytes BIGINT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, year, month),
    CONSTRAINT valid_month CHECK (month >= 1 AND month <= 12),
    CONSTRAINT valid_year CHECK (year >= 2024)
);

-- Tabela de contatos (formulário de contato)
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new',
    replied_at TIMESTAMP WITH TIME ZONE,
    replied_by UUID REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb,
    
    CONSTRAINT valid_status CHECK (status IN ('new', 'in_progress', 'replied', 'closed'))
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON public.users(clerk_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer_id ON public.subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON public.documents(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_status ON public.documents(status);
CREATE INDEX IF NOT EXISTS idx_summaries_document_id ON public.summaries(document_id);
CREATE INDEX IF NOT EXISTS idx_summaries_user_id ON public.summaries(user_id);
CREATE INDEX IF NOT EXISTS idx_monthly_usage_user_date ON public.monthly_usage(user_id, year, month);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON public.contacts(status);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON public.documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_summaries_updated_at BEFORE UPDATE ON public.summaries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_monthly_usage_updated_at BEFORE UPDATE ON public.monthly_usage FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON public.contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Função para incrementar uso mensal
CREATE OR REPLACE FUNCTION increment_monthly_usage(
    p_user_id UUID,
    p_summaries_count INTEGER DEFAULT 0,
    p_documents_processed INTEGER DEFAULT 0,
    p_tokens_used INTEGER DEFAULT 0,
    p_storage_used_bytes BIGINT DEFAULT 0
)
RETURNS VOID AS $$
DECLARE
    current_year INTEGER := EXTRACT(YEAR FROM NOW());
    current_month INTEGER := EXTRACT(MONTH FROM NOW());
BEGIN
    INSERT INTO public.monthly_usage (
        user_id, year, month, summaries_count, documents_processed, tokens_used, storage_used_bytes
    )
    VALUES (
        p_user_id, current_year, current_month, p_summaries_count, p_documents_processed, p_tokens_used, p_storage_used_bytes
    )
    ON CONFLICT (user_id, year, month)
    DO UPDATE SET
        summaries_count = monthly_usage.summaries_count + p_summaries_count,
        documents_processed = monthly_usage.documents_processed + p_documents_processed,
        tokens_used = monthly_usage.tokens_used + p_tokens_used,
        storage_used_bytes = monthly_usage.storage_used_bytes + p_storage_used_bytes,
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- RLS (Row Level Security) - Habilitar
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monthly_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para users
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid()::text = clerk_id OR auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid()::text = clerk_id OR auth.uid() = id);

-- Políticas RLS para subscriptions
CREATE POLICY "Users can view own subscription" ON public.subscriptions
    FOR SELECT USING (user_id = auth.uid() OR user_id IN (
        SELECT id FROM public.users WHERE clerk_id = auth.uid()::text
    ));

-- Políticas RLS para documents
CREATE POLICY "Users can manage own documents" ON public.documents
    FOR ALL USING (user_id = auth.uid() OR user_id IN (
        SELECT id FROM public.users WHERE clerk_id = auth.uid()::text
    ));

-- Políticas RLS para summaries
CREATE POLICY "Users can manage own summaries" ON public.summaries
    FOR ALL USING (user_id = auth.uid() OR user_id IN (
        SELECT id FROM public.users WHERE clerk_id = auth.uid()::text
    ));

-- Políticas RLS para monthly_usage
CREATE POLICY "Users can view own usage" ON public.monthly_usage
    FOR SELECT USING (user_id = auth.uid() OR user_id IN (
        SELECT id FROM public.users WHERE clerk_id = auth.uid()::text
    ));

-- Políticas RLS para contacts (público para inserção)
CREATE POLICY "Anyone can insert contacts" ON public.contacts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Only admins can view contacts" ON public.contacts
    FOR SELECT USING (false); -- Será configurado posteriormente com roles de admin

-- Comentários nas tabelas
COMMENT ON TABLE public.users IS 'Tabela de usuários sincronizada com Clerk';
COMMENT ON TABLE public.subscriptions IS 'Tabela de assinaturas integrada com Stripe';
COMMENT ON TABLE public.documents IS 'Tabela de documentos enviados pelos usuários';
COMMENT ON TABLE public.summaries IS 'Tabela de resumos gerados pela IA';
COMMENT ON TABLE public.monthly_usage IS 'Tabela de controle de uso mensal por usuário';
COMMENT ON TABLE public.contacts IS 'Tabela de mensagens do formulário de contato';