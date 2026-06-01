-- Create career_roadmaps table
CREATE TABLE public.career_roadmaps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  current_role TEXT NOT NULL,
  target_role TEXT NOT NULL,
  roadmap_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.career_roadmaps ENABLE ROW LEVEL SECURITY;

-- Setup RLS Policies
CREATE POLICY "Users can view their own roadmaps" 
  ON public.career_roadmaps FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own roadmaps" 
  ON public.career_roadmaps FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own roadmaps" 
  ON public.career_roadmaps FOR DELETE 
  USING (auth.uid() = user_id);
