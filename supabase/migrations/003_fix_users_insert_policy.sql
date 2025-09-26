-- Adicionar política RLS para INSERT na tabela users
-- Permite que usuários autenticados criem seu próprio registro

CREATE POLICY "Users can insert own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id OR auth.uid()::text = clerk_id);