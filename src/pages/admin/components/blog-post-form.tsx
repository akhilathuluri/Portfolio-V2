import { useState, useEffect } from 'react';
import { SketchText } from '@/components/ui/sketch-text';
import { SketchButton } from '@/components/ui/sketch-button';
import { supabase } from '@/lib/supabase';
import type { BlogPost } from '@/types/content';

interface BlogPostFormProps {
  onSuccess: () => void;
  editingPost: BlogPost | null;
  onCancel: () => void;
}

export function BlogPostForm({ onSuccess, editingPost, onCancel }: BlogPostFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setContent(editingPost.content || '');
      setImageUrl(editingPost.image_url || '');
    }
  }, [editingPost]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert plain text to HTML with support for headings and lists
    const formattedContent = content
      .split('\n')
      .map(line => {
        if (line.startsWith('# ')) {
          return `<h1 class="text-3xl font-bold my-4">${line.slice(2)}</h1>`;
        } else if (line.startsWith('## ')) {
          return `<h2 class="text-2xl font-bold my-3">${line.slice(3)}</h2>`;
        } else if (line.startsWith('### ')) {
          return `<h3 class="text-xl font-bold my-2">${line.slice(4)}</h3>`;
        } else if (line.startsWith('- ')) {
          return `<li class="ml-4">${line.slice(2)}</li>`;
        } else if (line.match(/^\d+\. /)) {
          return `<li class="ml-4">${line.replace(/^\d+\. /, '')}</li>`;
        } else if (line === '') {
          return '</ul><br />';
        } else {
          return `<p class="my-2">${line}</p>`;
        }
      })
      .join('\n')
      .replace(/<\/ul><br \/><li/g, '<li')
      .replace(/<\/p><li/g, '<ul><li')
      .replace(/<\/li><p/g, '</li></ul><p');
    
    if (editingPost) {
      const { error } = await supabase
        .from('blog_posts')
        .update({ title, content: formattedContent, image_url: imageUrl })
        .eq('id', editingPost.id);

      if (!error) {
        onSuccess();
        onCancel();
      }
    } else {
      const { error } = await supabase
        .from('blog_posts')
        .insert([{ title, content: formattedContent, image_url: imageUrl }]);
      
      if (!error) {
        setTitle('');
        setContent('');
        setImageUrl('');
        onSuccess();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <SketchText as="h2" className="text-2xl mb-6">
        {editingPost ? 'Edit Blog Post' : 'Add New Blog Post'}
      </SketchText>
      
      <div>
        <SketchText as="label" className="block mb-2">Title</SketchText>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border-2 border-black dark:border-gray-300 rounded-lg bg-transparent"
          required
        />
      </div>
      
      <div>
        <SketchText as="label" className="block mb-2">Content</SketchText>
        <SketchText as="p" className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Use markdown-style formatting:
          <br />- # for H1
          <br />- ## for H2
          <br />- ### for H3
          <br />- - for unordered lists
          <br />- 1. for ordered lists
        </SketchText>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border-2 border-black dark:border-gray-300 rounded-lg bg-transparent font-mono"
          rows={12}
          required
        />
      </div>
      
      <div>
        <SketchText as="label" className="block mb-2">Featured Image URL</SketchText>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-2 border-2 border-black dark:border-gray-300 rounded-lg bg-transparent"
        />
      </div>
      
      <div className="flex space-x-4">
        <SketchButton type="submit">
          {editingPost ? 'Update Post' : 'Add Post'}
        </SketchButton>
        {editingPost && (
          <SketchButton type="button" variant="outline" onClick={onCancel}>
            Cancel
          </SketchButton>
        )}
      </div>
    </form>
  );
}