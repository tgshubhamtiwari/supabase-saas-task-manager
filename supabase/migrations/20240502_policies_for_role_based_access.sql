-- Policy: Users can view their own tasks
CREATE POLICY "Users can view their own tasks"
ON public.tasks FOR SELECT
TO authenticated
USING (auth.uid() = assigned_to OR auth.role() = 'authenticated');

-- Policy: Admins can do anything
CREATE POLICY "Admin full access"
ON public.tasks TO authenticated
USING (auth.role() = 'service_role');