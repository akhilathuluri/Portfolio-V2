import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SketchContainer } from '@/components/ui/sketch-container';
import { SketchText } from '@/components/ui/sketch-text';
import { SketchImage } from '@/components/ui/sketch-image';
import { SketchButton } from '@/components/ui/sketch-button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { supabase } from '@/lib/supabase';
import { ExternalLink } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  project_url: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setProjects(data);
      }
      setLoading(false);
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <SketchText className="text-xl animate-pulse">Loading My Projects...</SketchText>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <SketchText as="h1" className="text-4xl mb-12 text-center">
        My Creative Projects
      </SketchText>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={item}>
            <SketchContainer className="h-full flex flex-col transform hover:-rotate-1 transition-all duration-300">
              {project.image_url && (
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <SketchImage
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
              )}
              <SketchText as="h2" className="text-2xl mb-3">
                {project.title}
              </SketchText>
              <SketchText as="p" className="text-lg mb-6 flex-grow">
                {project.description}
              </SketchText>
              {project.project_url && (
                <SketchButton
                  onClick={() => window.open(project.project_url, '_blank', 'noopener,noreferrer')}
                  className="flex items-center justify-center gap-2 w-full hover:scale-105 transition-transform"
                >
                  View Project <ExternalLink className="w-4 h-4" />
                </SketchButton>
              )}
            </SketchContainer>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}