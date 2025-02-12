import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { SketchText } from '@/components/ui/sketch-text';
import { SketchButton } from '@/components/ui/sketch-button';
import { BlogPostForm } from './blog-post-form';
import type { BlogPost } from '@/types/content';

export function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setPosts(data);
  }

  async function handleDelete(id: string) {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);
    
    if (!error) {
      fetchPosts();
    }
  }

  return (
    <div className="space-y-8">
      <BlogPostForm 
        onSuccess={fetchPosts}
        editingPost={editingPost}
        onCancel={() => setEditingPost(null)}
      />

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border-2 border-black dark:border-gray-300 rounded-lg p-4">
            <SketchText as="h3" className="text-xl mb-2">{post.title}</SketchText>
            <SketchText as="p" className="mb-4">{post.content}</SketchText>
            <div className="flex space-x-4">
              <SketchButton 
                variant="outline"
                onClick={() => setEditingPost(post)}
              >
                Edit
              </SketchButton>
              <SketchButton 
                variant="outline"
                onClick={() => handleDelete(post.id)}
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