/*
  # Add Links Table and Enhance Existing Tables

  1. New Tables
    - `links`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `url` (text, not null)
      - `description` (text)
      - `icon` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Changes to Existing Tables
    - Add indexes for better query performance
    - Add updated_at triggers
    - Add not null constraints where appropriate

  3. Security
    - Enable RLS on links table
    - Add policies for public read and authenticated write access
*/

-- Create links table
CREATE TABLE IF NOT EXISTS links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  url text NOT NULL,
  description text,
  icon text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_links_created_at ON links(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);

-- Add updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_links_updated_at
  BEFORE UPDATE ON links
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE links ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Allow public read access on links"
  ON links
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage links"
  ON links
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Add not null constraints where missing
ALTER TABLE projects 
  ALTER COLUMN title SET NOT NULL,
  ALTER COLUMN description SET NOT NULL;

ALTER TABLE blog_posts 
  ALTER COLUMN title SET NOT NULL,
  ALTER COLUMN content SET NOT NULL;

ALTER TABLE skills 
  ALTER COLUMN name SET NOT NULL,
  ALTER COLUMN category SET NOT NULL,
  ALTER COLUMN proficiency SET NOT NULL;