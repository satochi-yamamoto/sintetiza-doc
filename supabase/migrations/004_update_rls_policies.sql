-- Atualiza politicas RLS para aceitar claims de provedores externos
BEGIN;

CREATE OR REPLACE FUNCTION public.app_user_matches(user_row_id uuid, user_row_clerk_id text)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT
    (
      user_row_id IS NOT NULL
      AND (
        (auth.uid() IS NOT NULL AND user_row_id = auth.uid())
        OR (
          auth.jwt()->>'provider_id' IS NOT NULL
          AND user_row_id::text = auth.jwt()->>'provider_id'
        )
        OR (
          auth.jwt()->>'sub' IS NOT NULL
          AND user_row_id::text = auth.jwt()->>'sub'
        )
      )
    )
    OR (
      user_row_clerk_id IS NOT NULL
      AND (
        (auth.uid() IS NOT NULL AND auth.uid()::text = user_row_clerk_id)
        OR (
          auth.jwt()->>'provider_id' IS NOT NULL
          AND auth.jwt()->>'provider_id' = user_row_clerk_id
        )
        OR (
          auth.jwt()->>'sub' IS NOT NULL
          AND auth.jwt()->>'sub' = user_row_clerk_id
        )
      )
    );
$$;

DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Users can view own subscription" ON public.subscriptions;
DROP POLICY IF EXISTS "Users can manage own documents" ON public.documents;
DROP POLICY IF EXISTS "Users can manage own summaries" ON public.summaries;
DROP POLICY IF EXISTS "Users can view own usage" ON public.monthly_usage;

CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT
  USING (public.app_user_matches(id, clerk_id));

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE
  USING (public.app_user_matches(id, clerk_id))
  WITH CHECK (public.app_user_matches(id, clerk_id));

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT
  WITH CHECK (public.app_user_matches(id, clerk_id));

CREATE POLICY "Users can view own subscription" ON public.subscriptions
  FOR SELECT
  USING (
    public.app_user_matches(user_id, NULL)
    OR EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = user_id
        AND public.app_user_matches(u.id, u.clerk_id)
    )
  );

CREATE POLICY "Users can manage own documents" ON public.documents
  FOR ALL
  USING (
    public.app_user_matches(user_id, NULL)
    OR EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = user_id
        AND public.app_user_matches(u.id, u.clerk_id)
    )
  )
  WITH CHECK (
    public.app_user_matches(user_id, NULL)
    OR EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = user_id
        AND public.app_user_matches(u.id, u.clerk_id)
    )
  );

CREATE POLICY "Users can manage own summaries" ON public.summaries
  FOR ALL
  USING (
    public.app_user_matches(user_id, NULL)
    OR EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = user_id
        AND public.app_user_matches(u.id, u.clerk_id)
    )
  )
  WITH CHECK (
    public.app_user_matches(user_id, NULL)
    OR EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = user_id
        AND public.app_user_matches(u.id, u.clerk_id)
    )
  );

CREATE POLICY "Users can view own usage" ON public.monthly_usage
  FOR SELECT
  USING (
    public.app_user_matches(user_id, NULL)
    OR EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = user_id
        AND public.app_user_matches(u.id, u.clerk_id)
    )
  );

COMMIT;
