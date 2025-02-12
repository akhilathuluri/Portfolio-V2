import { useState, useEffect } from 'react';
import { SketchText } from '@/components/ui/sketch-text';
import { SketchButton } from '@/components/ui/sketch-button';
import { supabase } from '@/lib/supabase';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  project_url: string;
}

interface ProjectFormProps {
  onSuccess: () => void;
  editingProject: Project | null;
  onCancel: () => void;
}

export function ProjectForm({ onSuccess, editingProject, onCancel }: ProjectFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingProject) {
      setTitle(editingProject.title);
      setDescription(editingProject.description);
      setImageUrl(editingProject.image_url || '');
      setProjectUrl(editingProject.project_url || '');
    }
  }, [editingProject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update({ 
            title, 
            description, 
            image_url: imageUrl,
            project_url: projectUrl 
          })
          .eq('id', editingProject.id);

        if (!error) {
          onSuccess();
          onCancel();
        }
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([{ 
            title, 
            description, 
            image_url: imageUrl,
            project_url: projectUrl 
          }]);
        
        if (!error) {
          setTitle('');
          setDescription('');
          setImageUrl('');
          setProjectUrl('');
          onSuccess();
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <SketchText as="h2" className="text-2xl mb-6">
        {editingProject ? 'Edit Project' : 'Add New Project'}
      </SketchText>
      
      <div>
        <SketchText as="label" className="block mb-2">Project Title</SketchText>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border-2 border-black dark:border-gray-300 rounded-lg bg-transparent"
          required
        />
      </div>
      
      <div>
        <SketchText as="label" className="block mb-2">Description</SketchText>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border-2 border-black dark:border-gray-300 rounded-lg bg-transparent"
          rows={4}
          required
        />
      </div>
      
      <div>
        <SketchText as="label" className="block mb-2">Image URL</SketchText>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-2 border-2 border-black dark:border-gray-300 rounded-lg bg-transparent"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <SketchText as="label" className="block mb-2">Project URL</SketchText>
        <input
          type="url"
          value={projectUrl}
          onChange={(e) => setProjectUrl(e.target.value)}
          className="w-full p-2 border-2 border-black dark:border-gray-300 rounded-lg bg-transparent"
          placeholder="https://example.com"
        />
      </div>
      
      <div className="flex space-x-4">
        <SketchButton 
          type="submit" 
          disabled={loading}
          className={loading ? 'opacity-50 cursor-not-allowed' : ''}
        >
          {loading ? 'Saving...' : editingProject ? 'Update Project' : 'Add Project'}
        </SketchButton>
        {editingProject && (
          <SketchButton type="button" variant="outline" onClick={onCancel}>
            Cancel
          </SketchButton>
        )}
      </div>
    </form>
  );
}