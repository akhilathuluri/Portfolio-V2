import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { SketchText } from '@/components/ui/sketch-text';
import { SketchButton } from '@/components/ui/sketch-button';
import { SkillForm } from './skill-form';
import type { Skill } from '@/types/content';

export function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  async function fetchSkills() {
    const { data } = await supabase
      .from('skills')
      .select('*')
      .order('category', { ascending: true });
    
    if (data) setSkills(data);
  }

  async function handleDelete(id: string) {
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id);
    
    if (!error) {
      fetchSkills();
    }
  }

  return (
    <div className="space-y-8">
      <SkillForm 
        onSuccess={fetchSkills}
        editingSkill={editingSkill}
        onCancel={() => setEditingSkill(null)}
      />

      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.id} className="border-2 border-black dark:border-gray-300 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <SketchText as="h3" className="text-xl">{skill.name}</SketchText>
              <SketchText as="span" className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                {skill.category}
              </SketchText>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
              <div 
                className="bg-blue-600 dark:bg-blue-400 h-2.5 rounded-full" 
                style={{ width: `${skill.proficiency}%` }}
              />
            </div>
            <div className="flex space-x-4">
              <SketchButton 
                variant="outline"
                onClick={() => setEditingSkill(skill)}
              >
                Edit
              </SketchButton>
              <SketchButton 
                variant="outline"
                onClick={() => handleDelete(skill.id)}
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