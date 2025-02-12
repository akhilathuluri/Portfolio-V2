import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SketchContainer } from '@/components/ui/sketch-container';
import { SketchText } from '@/components/ui/sketch-text';
import { SketchButton } from '@/components/ui/sketch-button';
import { supabase } from '@/lib/supabase';
import { ArrowRight, ExternalLink } from 'lucide-react';
import type { Project } from '@/types/content';

export function LatestProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLatestProjects() {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (data) setProjects(data);
    }
    fetchLatestProjects();
  }, []);

  if (projects.length === 0) return null;

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <SketchText as="h2" className="text-3xl">Latest Projects</SketchText>
          <SketchButton 
            variant="outline" 
            onClick={() => navigate('/projects')}
            className="flex items-center gap-2"
          >
            View All <ArrowRight className="w-4 h-4" />
          </SketchButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-lg overflow-hidden border-2 border-black dark:border-gray-700 transform transition-transform duration-300 hover:scale-105 hover:-rotate-1">
                {project.image_url && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <SketchText as="h3" className="text-xl mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </SketchText>
                  <SketchText className="text-gray-600 dark:text-gray-400 mb-4 flex-grow line-clamp-2">
                    {project.description}
                  </SketchText>
                  {project.project_url && (
                    <SketchButton
                      variant="outline"
                      onClick={() => window.open(project.project_url, '_blank', 'noopener,noreferrer')}
                      className="flex items-center justify-center gap-2 w-full mt-auto"
                    >
                      View Project <ExternalLink className="w-4 h-4" />
                    </SketchButton>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}