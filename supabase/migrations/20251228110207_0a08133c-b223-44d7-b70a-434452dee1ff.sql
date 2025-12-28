-- Create table for enterprise consultation reservations
CREATE TABLE public.enterprise_reservations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  team_size TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.enterprise_reservations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public form)
CREATE POLICY "Anyone can submit enterprise reservation"
ON public.enterprise_reservations
FOR INSERT
WITH CHECK (true);

-- Create policy to prevent public read access (only admins should see this data)
-- For now, no SELECT policy means only service role can read

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_enterprise_reservations_updated_at
BEFORE UPDATE ON public.enterprise_reservations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();