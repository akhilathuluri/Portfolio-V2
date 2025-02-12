import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { SketchText } from '@/components/ui/sketch-text';
import { SketchButton } from '@/components/ui/sketch-button';
import { LinkForm } from './link-form';
import type { Link } from '@/types/content';

export function LinksManager() {
  const [links, setLinks] = useState<Link[]>([]);
  const [editingLink, setEditingLink] = useState<Link | null>(null);

  useEffect(() => {
    fetchLinks();
  }, []);

  async function fetchLinks() {
    const { data } = await supabase
      .from('links')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setLinks(data);
  }

  async function handleDelete(id: string) {
    const { error } = await supabase
      .from('links')
      .delete()
      .eq('id', id);
    
    if (!error) {
      fetchLinks();
    }
  }

  return (
    <div className="space-y-8">
      <LinkForm 
        onSuccess={fetchLinks}
        editingLink={editingLink}
        onCancel={() => setEditingLink(null)}
      />

      <div className="space-y-4">
        {links.map((link) => (
          <div key={link.id} className="border-2 border-black dark:border-gray-300 rounded-lg p-4">
            <SketchText as="h3" className="text-xl mb-2">{link.title}</SketchText>
            <SketchText as="p" className="mb-2">{link.description}</SketchText>
            <SketchText as="p" className="mb-4 text-blue-600 dark:text-blue-400">{link.url}</SketchText>
            <div className="flex space-x-4">
              <SketchButton 
                variant="outline"
                onClick={() => setEditingLink(link)}
              >
                Edit
              </SketchButton>
              <SketchButton 
                variant="outline"
                onClick={() => handleDelete(link.id)}
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