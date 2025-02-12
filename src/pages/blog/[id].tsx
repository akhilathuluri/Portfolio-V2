import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SketchContainer } from '@/components/ui/sketch-container';
import { SketchText } from '@/components/ui/sketch-text';
import { SketchButton } from '@/components/ui/sketch-button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BlogContent } from '@/components/blog/blog-content';
import { supabase } from '@/lib/supabase';
import { ArrowLeft } from 'lucide-react';
import type { BlogPost } from '@/types/content';

export function BlogPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (!id) return;
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();
      
      if (data) {
        setPost(data);
      }
      setLoading(false);
    }
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12">
        <SketchContainer className="max-w-4xl mx-auto text-center">
          <SketchText as="h1" className="text-2xl mb-4">Post not found</SketchText>
          <SketchButton onClick={() => navigate('/blog')}>
            Back to Blog
          </SketchButton>
        </SketchContainer>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <SketchContainer className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </button>
        
        <SketchText as="h1" className="text-4xl mb-6">{post.title}</SketchText>
        
        {post.image_url && (
          <img 
            src={post.image_url} 
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
        )}
        
        <div className="prose dark:prose-invert max-w-none">
          <BlogContent content={post.content} />
        </div>
        
        <div className="mt-8 text-sm text-gray-600 dark:text-gray-400">
          Published on {new Date(post.created_at!).toLocaleDateString()}
        </div>
      </SketchContainer>
    </div>
  );
}