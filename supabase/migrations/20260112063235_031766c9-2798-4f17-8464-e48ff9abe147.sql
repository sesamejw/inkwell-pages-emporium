-- Create lore_characters table for character entries
CREATE TABLE public.lore_characters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  article TEXT,
  image_url TEXT,
  era TEXT,
  affiliation TEXT,
  role TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.lore_characters ENABLE ROW LEVEL SECURITY;

-- Public can view all characters
CREATE POLICY "Anyone can view characters"
ON public.lore_characters
FOR SELECT
USING (true);

-- Only admins can insert characters
CREATE POLICY "Admins can insert characters"
ON public.lore_characters
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update characters
CREATE POLICY "Admins can update characters"
ON public.lore_characters
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete characters
CREATE POLICY "Admins can delete characters"
ON public.lore_characters
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create index for faster queries
CREATE INDEX idx_lore_characters_era ON public.lore_characters(era);
CREATE INDEX idx_lore_characters_role ON public.lore_characters(role);
CREATE INDEX idx_lore_characters_order ON public.lore_characters(order_index);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_lore_characters_updated_at
BEFORE UPDATE ON public.lore_characters
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();