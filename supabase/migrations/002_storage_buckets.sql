-- Migração: Configuração de Storage Buckets
-- Criado em: 2024-01-20

-- Criar bucket para documentos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'documents',
    'documents',
    false,
    10485760, -- 10MB
    ARRAY[
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
        'text/plain',
        'text/rtf',
        'application/vnd.oasis.opendocument.text'
    ]
) ON CONFLICT (id) DO NOTHING;

-- Criar bucket para avatars/imagens de perfil
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'avatars',
    'avatars',
    true,
    2097152, -- 2MB
    ARRAY[
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif'
    ]
) ON CONFLICT (id) DO NOTHING;

-- Criar bucket para exports (arquivos gerados)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'exports',
    'exports',
    false,
    5242880, -- 5MB
    ARRAY[
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain'
    ]
) ON CONFLICT (id) DO NOTHING;

-- Políticas de acesso para bucket documents
CREATE POLICY "Users can upload own documents" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'documents' AND
        (auth.uid()::text = (storage.foldername(name))[1] OR 
         auth.uid() IN (SELECT id FROM public.users WHERE clerk_id = (storage.foldername(name))[1]))
    );

CREATE POLICY "Users can view own documents" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'documents' AND
        (auth.uid()::text = (storage.foldername(name))[1] OR 
         auth.uid() IN (SELECT id FROM public.users WHERE clerk_id = (storage.foldername(name))[1]))
    );

CREATE POLICY "Users can update own documents" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'documents' AND
        (auth.uid()::text = (storage.foldername(name))[1] OR 
         auth.uid() IN (SELECT id FROM public.users WHERE clerk_id = (storage.foldername(name))[1]))
    );

CREATE POLICY "Users can delete own documents" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'documents' AND
        (auth.uid()::text = (storage.foldername(name))[1] OR 
         auth.uid() IN (SELECT id FROM public.users WHERE clerk_id = (storage.foldername(name))[1]))
    );

-- Políticas de acesso para bucket avatars
CREATE POLICY "Anyone can view avatars" ON storage.objects
    FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload own avatar" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'avatars' AND
        (auth.uid()::text = (storage.foldername(name))[1] OR 
         auth.uid() IN (SELECT id FROM public.users WHERE clerk_id = (storage.foldername(name))[1]))
    );

CREATE POLICY "Users can update own avatar" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'avatars' AND
        (auth.uid()::text = (storage.foldername(name))[1] OR 
         auth.uid() IN (SELECT id FROM public.users WHERE clerk_id = (storage.foldername(name))[1]))
    );

CREATE POLICY "Users can delete own avatar" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'avatars' AND
        (auth.uid()::text = (storage.foldername(name))[1] OR 
         auth.uid() IN (SELECT id FROM public.users WHERE clerk_id = (storage.foldername(name))[1]))
    );

-- Políticas de acesso para bucket exports
CREATE POLICY "Users can manage own exports" ON storage.objects
    FOR ALL USING (
        bucket_id = 'exports' AND
        (auth.uid()::text = (storage.foldername(name))[1] OR 
         auth.uid() IN (SELECT id FROM public.users WHERE clerk_id = (storage.foldername(name))[1]))
    );

-- Comentários removidos devido a restrições de permissão no ambiente de produção