/*
  # Add project URL to projects table

  1. Changes
    - Add project_url column to projects table
    - Make it nullable since not all projects may have a URL
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'project_url'
  ) THEN
    ALTER TABLE projects ADD COLUMN project_url text;
  END IF;
END $$;