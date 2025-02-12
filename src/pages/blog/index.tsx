import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SketchContainer } from '@/components/ui/sketch-container';
import { SketchText } from '@/components/ui/sketch-text';
import { SketchCard } from '@/components/ui/sketch-card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { supabase } from '@/lib/supabase';
import type { BlogPost } from '@/types/content';

export function BlogPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  const handlePostClick = (postId: string) => {
    navigate(`/blog/${postId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <SketchText className="text-xl animate-pulse">Loading My Blog Posts...</SketchText>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <SketchText as="h1" className="text-4xl mb-12 text-center">Blog</SketchText>
      <div className="max-w-4xl mx-auto space-y-8">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SketchCard 
              className="cursor-pointer transition-all hover:scale-[1.02]"
              onClick={() => handlePostClick(post.id)}
            >
              <div className="flex flex-col md:flex-row gap-6">
                {post.image_url && (
                  <div className="md:w-1/3">
                    <img 
                      src={post.image_url} 
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                <div className={post.image_url ? 'md:w-2/3' : 'w-full'}>
                  <SketchText as="h2" className="text-2xl mb-4">{post.title}</SketchText>
                  <div className="prose dark:prose-invert line-clamp-3 mb-4">
                    <div dangerouslySetInnerHTML={{ 
                      __html: post.content.replace(/<[^>]*>/g, '').slice(0, 200) + '...'
                    }} />
                  </div>
                  <div className="flex justify-between items-center">
                    <SketchText className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(post.created_at!).toLocaleDateString()}
                    </SketchText>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePostClick(post.id);
                      }}
                      className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            </SketchCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}