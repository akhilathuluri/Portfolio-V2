-- Create a new storage bucket for link icons
INSERT INTO storage.buckets (id, name)
VALUES ('icons', 'icons')
ON CONFLICT DO NOTHING;

-- Set up storage policy to allow authenticated users to upload
CREATE POLICY "Allow authenticated users to upload icons"
ON storage.objects FOR INSERT TO authenticated WITH CHECK (
  bucket_id = 'icons'
);

-- Allow public read access to icons
CREATE POLICY "Allow public to view icons"
ON storage.objects FOR SELECT TO public USING (
  bucket_id = 'icons'
);