import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, FileText, Layout, Command } from 'lucide-react';
import { SketchText } from '@/components/ui/sketch-text';
import { supabase } from '@/lib/supabase';
import type { BlogPost } from '@/types/content';

interface SearchResult {
  type: 'page' | 'blog';
  title: string;
  url: string;
  description?: string;
}

const STATIC_PAGES = [
  { title: 'Home', url: '/', description: 'Welcome to my creative portfolio' },
  { title: 'About', url: '/about', description: 'Learn more about me and my journey' },
  { title: 'Projects', url: '/projects', description: 'Explore my featured projects' },
  { title: 'Blog', url: '/blog', description: 'Read my latest articles and thoughts' },
  { title: 'Skills', url: '/skills', description: 'Check out my technical expertise' },
  { title: 'Tech Stack', url: '/tech-stack', description: 'Technologies I work with' },
  { title: 'Contact', url: '/contact', description: 'Get in touch with me' },
];

export function SearchDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const searchAll = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    // Search static pages
    const pageResults = STATIC_PAGES.filter(page =>
      page.title.toLowerCase().includes(query.toLowerCase()) ||
      page.description?.toLowerCase().includes(query.toLowerCase())
    ).map(page => ({
      type: 'page' as const,
      title: page.title,
      url: page.url,
      description: page.description
    }));

    // Search blog posts
    const { data: blogPosts } = await supabase
      .from('blog_posts')
      .select('title, id, content')
      .textSearch('title', query, {
        type: 'plain',
        config: 'english'
      })
      .limit(5);

    const blogResults = (blogPosts || []).map((post: BlogPost) => ({
      type: 'blog' as const,
      title: post.title,
      url: `/blog/${post.id}`,
      description: post.content.replace(/<[^>]*>/g, '').slice(0, 100) + '...'
    }));

    setResults([...pageResults, ...blogResults]);
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    searchAll(searchQuery);
  }, [searchQuery, searchAll]);

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === ' ') {
        e.preventDefault();
        if (!isOpen) onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % results.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (results[selectedIndex]) {
          navigate(results[selectedIndex].url);
          onClose();
        }
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 text-center">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-xl"
        >
          <div className="relative">
            <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search pages and blog posts..."
                className="w-full px-4 py-2 text-lg bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                autoFocus
              />
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 rounded">
                  <Command className="w-3 h-3 inline mr-1" />
                  Space
                </kbd>
                <button onClick={onClose}>
                  <X className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
                </button>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto bg-white dark:bg-gray-800">
              <AnimatePresence>
                {results.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-4"
                  >
                    {results.map((result, index) => (
                      <div
                        key={result.url}
                        className={`px-4 py-3 cursor-pointer flex items-start gap-4 ${
                          selectedIndex === index
                            ? 'bg-blue-50 dark:bg-blue-900/20'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }`}
                        onClick={() => {
                          navigate(result.url);
                          onClose();
                        }}
                      >
                        {result.type === 'page' ? (
                          <Layout className="w-5 h-5 mt-1 text-blue-500" />
                        ) : (
                          <FileText className="w-5 h-5 mt-1 text-green-500" />
                        )}
                        <div>
                          <SketchText className="font-medium text-gray-900 dark:text-white">
                            {result.title}
                          </SketchText>
                          {result.description && (
                            <SketchText className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                              {result.description}
                            </SketchText>
                          )}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                ) : searchQuery ? (
                  <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                    No results found for "{searchQuery}"
                  </div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}