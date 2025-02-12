/*
  # Storage setup for link icons
  
  1. Changes:
    - Create storage bucket for icons if not exists
    - Set up storage policies for authenticated uploads and public reads
    
  2. Security:
    - Authenticated users can upload icons
    - Public read access for icons
*/

-- Create a new storage bucket for link icons if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('icons', 'icons', true)
ON CONFLICT (id) DO NOTHING;

-- Safely create policies by dropping existing ones first
DO $$
BEGIN
    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Allow authenticated users to upload icons" ON storage.objects;
    DROP POLICY IF EXISTS "Allow public to view icons" ON storage.objects;
    
    -- Create new policies
    CREATE POLICY "Allow authenticated users to upload icons"
    ON storage.objects FOR INSERT TO authenticated 
    WITH CHECK (bucket_id = 'icons');

    CREATE POLICY "Allow public to view icons"
    ON storage.objects FOR SELECT TO public 
    USING (bucket_id = 'icons');
END $$;