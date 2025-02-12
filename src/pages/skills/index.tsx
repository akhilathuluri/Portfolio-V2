import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SketchContainer } from '@/components/ui/sketch-container';
import { SketchText } from '@/components/ui/sketch-text';
import { supabase } from '@/lib/supabase';
import type { Skill } from '@/types/content';

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
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
};

export function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      const { data } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: true });
      
      if (data) {
        setSkills(data);
        const uniqueCategories = Array.from(new Set(data.map(skill => skill.category)));
        setCategories(uniqueCategories);
      }
      setLoading(false);
    }
    fetchSkills();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <SketchText className="text-xl animate-pulse">Loading my expertise...</SketchText>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <SketchContainer className="max-w-4xl mx-auto">
        <SketchText as="h1" className="text-4xl mb-12 text-center">
          Skills & Expertise
        </SketchText>

        <motion.div 
          className="space-y-12"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {categories.map((category) => (
            <motion.div key={category} variants={item} className="space-y-6">
              <SketchText as="h2" className="text-2xl font-bold capitalize">
                {category}
              </SketchText>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills
                  .filter(skill => skill.category === category)
                  .map((skill) => (
                    <motion.div 
                      key={skill.id}
                      className="p-4 border-2 border-black dark:border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      <SketchText as="h3" className="text-lg font-medium">
                        {skill.name}
                      </SketchText>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </SketchContainer>
    </div>
  );
}