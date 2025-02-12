import { useState, useEffect } from 'react';
import { SketchText } from '@/components/ui/sketch-text';
import { SketchButton } from '@/components/ui/sketch-button';
import { supabase } from '@/lib/supabase';
import type { Skill } from '@/types/content';

interface SkillFormProps {
  onSuccess: () => void;
  editingSkill: Skill | null;
  onCancel: () => void;
}

export function SkillForm({ onSuccess, editingSkill, onCancel }: SkillFormProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [proficiency, setProficiency] = useState(50);

  useEffect(() => {
    if (editingSkill) {
      setName(editingSkill.name);
      setCategory(editingSkill.category);
      setProficiency(editingSkill.proficiency);
    }
  }, [editingSkill]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSkill) {
      const { error } = await supabase
        .from('skills')
        .update({ name, category, proficiency })
        .eq('id', editingSkill.id);

      if (!error) {
        onSuccess();
        onCancel();
      }
    } else {
      const { error } = await supabase
        .from('skills')
        .insert([{ name, category, proficiency }]);
      
      if (!error) {
        setName('');
        setCategory('');
        setProficiency(50);
        onSuccess();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <SketchText as="h2" className="text-2xl mb-6">
        {editingSkill ? 'Edit Skill' : 'Add New Skill'}
      </SketchText>
      
      <div>
        <SketchText as="label" className="block mb-2">Skill Name</SketchText>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border-2 border-black dark:border-gray-300 rounded-lg bg-transparent"
          required
        />
      </div>
      
      <div>
        <SketchText as="label" className="block mb-2">Category</SketchText>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border-2 border-black dark:border-gray-300 rounded-lg bg-transparent"
          placeholder="e.g., Frontend, Backend, Design"
          required
        />
      </div>
      
      <div>
        <SketchText as="label" className="block mb-2">
          Proficiency ({proficiency}%)
        </SketchText>
        <input
          type="range"
          min="0"
          max="100"
          value={proficiency}
          onChange={(e) => setProficiency(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
      
      <div className="flex space-x-4">
        <SketchButton type="submit">
          {editingSkill ? 'Update Skill' : 'Add Skill'}
        </SketchButton>
        {editingSkill && (
          <SketchButton type="button" variant="outline" onClick={onCancel}>
            Cancel
          </SketchButton>
        )}
      </div>
    </form>
  );
}