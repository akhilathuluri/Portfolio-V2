import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { SketchText } from '@/components/ui/sketch-text';
import { SketchButton } from '@/components/ui/sketch-button';
import { ProjectForm } from './project-form';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
}

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setProjects(data);
  }

  async function handleDelete(id: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (!error) {
      fetchProjects();
    }
  }

  return (
    <div className="space-y-8">
      <ProjectForm 
        onSuccess={fetchProjects}
        editingProject={editingProject}
        onCancel={() => setEditingProject(null)}
      />

      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="border-2 border-black dark:border-gray-300 rounded-lg p-4">
            <SketchText as="h3" className="text-xl mb-2">{project.title}</SketchText>
            <SketchText as="p" className="mb-4">{project.description}</SketchText>
            <div className="flex space-x-4">
              <SketchButton 
                variant="outline"
                onClick={() => setEditingProject(project)}
              >
                Edit
              </SketchButton>
              <SketchButton 
                variant="outline"
                onClick={() => handleDelete(project.id)}
              >
                Delete
              </SketchButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}