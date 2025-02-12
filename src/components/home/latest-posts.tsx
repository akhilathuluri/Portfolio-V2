import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SketchContainer } from '@/components/ui/sketch-container';
import { SketchText } from '@/components/ui/sketch-text';
import { SketchButton } from '@/components/ui/sketch-button';
import { supabase } from '@/lib/supabase';
import { ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/types/content';

export function LatestPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLatestPosts() {
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (data) setPosts(data);
    }
    fetchLatestPosts();
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <SketchText as="h2" className="text-3xl">Latest Blog Posts</SketchText>
          <SketchButton 
            variant="outline" 
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2"
          >
            View All <ArrowRight className="w-4 h-4" />
          </SketchButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="cursor-pointer group"
              onClick={() => navigate(`/blog/${post.id}`)}
            >
              <div className="h-full flex flex-col">
                {post.image_url && (
                  <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <SketchText as="h3" className="text-xl mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </SketchText>
                <div className="prose dark:prose-invert line-clamp-3 text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                  <div dangerouslySetInnerHTML={{ 
                    __html: post.content.replace(/<[^>]*>/g, '').slice(0, 150) + '...'
                  }} />
                </div>
                <SketchText className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(post.created_at!).toLocaleDateString()}
                </SketchText>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}