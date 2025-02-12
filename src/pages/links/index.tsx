import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SketchContainer } from '@/components/ui/sketch-container';
import { SketchText } from '@/components/ui/sketch-text';
import { SketchCard } from '@/components/ui/sketch-card';
import { supabase } from '@/lib/supabase';
import * as Icons from 'lucide-react';
import type { Link } from '@/types/content';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function LinksPage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLinks() {
      const { data } = await supabase
        .from('links')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (data) setLinks(data);
      setLoading(false);
    }
    fetchLinks();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <SketchText className="text-xl animate-pulse">Loading amazing connections...</SketchText>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <SketchContainer className="max-w-4xl mx-auto">
        <SketchText as="h1" className="text-4xl mb-8 text-center">
          Connect & Follow
        </SketchText>
        
        <motion.div 
          className="grid gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {links.map((link) => {
            // Only use Lucide icons if the icon field is a valid icon name
            const isLucideIcon = link.icon && !link.icon.includes('/');
            const IconComponent = isLucideIcon ? (Icons[link.icon as keyof typeof Icons] || Icons.Link) : Icons.Link;
            
            return (
              <motion.div key={link.id} variants={item}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transform transition-transform hover:scale-[1.02]"
                >
                  <SketchCard className="flex items-center p-6 space-x-6 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                    <div className="flex-shrink-0">
                      {!isLucideIcon && link.icon ? (
                        <img 
                          src={link.icon} 
                          alt={`${link.title} icon`}
                          className="w-8 h-8 object-cover rounded"
                        />
                      ) : (
                        <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <SketchText as="h2" className="text-2xl mb-2">
                        {link.title}
                      </SketchText>
                      <SketchText className="text-gray-600 dark:text-gray-400">
                        {link.description}
                      </SketchText>
                    </div>
                    <Icons.ArrowUpRight className="w-6 h-6 flex-shrink-0 text-gray-400" />
                  </SketchCard>
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </SketchContainer>
    </div>
  );
}