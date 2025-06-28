
-- Add RLS policy to allow anyone to submit contact forms
CREATE POLICY "Anyone can submit contact form" 
  ON public.contacts 
  FOR INSERT 
  WITH CHECK (true);

-- Add RLS policy for admins to view all contacts (optional - for future admin functionality)
-- Note: This assumes you'll have user roles implemented later
-- CREATE POLICY "Admins can view all contacts" 
--   ON public.contacts 
--   FOR SELECT 
--   USING (public.has_role(auth.uid(), 'admin'));
