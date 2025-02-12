import { motion } from 'framer-motion';
import { SketchContainer } from '@/components/ui/sketch-container';
import { SketchText } from '@/components/ui/sketch-text';
import { LogIn as ReactLogo, Database, Package, Layers, Palette, Code2, Wind, Workflow, Laptop, Server, Mail, Layout } from 'lucide-react';

interface TechItem {
  category: string;
  icon: React.ComponentType<any>;
  items: {
    name: string;
    description: string;
  }[];
}

const techStack: TechItem[] = [
  {
    category: 'Frontend Framework',
    icon: ReactLogo,
    items: [
      {
        name: 'React 18',
        description: 'Modern UI library for building interactive user interfaces'
      },
      {
        name: 'TypeScript',
        description: 'Type-safe JavaScript for better development experience'
      },
      {
        name: 'Vite',
        description: 'Next generation frontend tooling for faster development'
      }
    ]
  },
  {
    category: 'Styling & UI',
    icon: Palette,
    items: [
      {
        name: 'Tailwind CSS',
        description: 'Utility-first CSS framework for rapid UI development'
      },
      {
        name: 'Framer Motion',
        description: 'Production-ready animation library for React'
      },
      {
        name: 'Lucide Icons',
        description: 'Beautiful and consistent icon set'
      }
    ]
  },
  {
    category: 'Backend & Database',
    icon: Database,
    items: [
      {
        name: 'Supabase',
        description: 'Open source Firebase alternative with PostgreSQL'
      },
      {
        name: 'PostgreSQL',
        description: 'Advanced open-source relational database'
      }
    ]
  },
  {
    category: 'Authentication',
    icon: Layers,
    items: [
      {
        name: 'Supabase Auth',
        description: 'Built-in authentication with multiple providers'
      }
    ]
  },
  {
    category: 'State Management',
    icon: Workflow,
    items: [
      {
        name: 'React Context',
        description: 'Built-in state management for theme and authentication'
      },
      {
        name: 'React Hooks',
        description: 'Custom hooks for business logic and state management'
      }
    ]
  },
  {
    category: 'Development Tools',
    icon: Code2,
    items: [
      {
        name: 'ESLint',
        description: 'JavaScript and TypeScript linting'
      },
      {
        name: 'TypeScript Config',
        description: 'Strict type checking and path aliases'
      }
    ]
  },
  {
    category: 'Routing',
    icon: Layout,
    items: [
      {
        name: 'React Router',
        description: 'Client-side routing with dynamic routes'
      }
    ]
  },
  {
    category: 'APIs & Services',
    icon: Server,
    items: [
      {
        name: 'Supabase Storage',
        description: 'File storage for project assets'
      },
      {
        name: 'Web3Forms',
        description: 'Form handling and email service'
      }
    ]
  },
  {
    category: 'Performance',
    icon: Wind,
    items: [
      {
        name: 'Vite Build Optimization',
        description: 'Code splitting and asset optimization'
      },
      {
        name: 'React.lazy()',
        description: 'Component lazy loading for better initial load time'
      }
    ]
  }
];

export function TechStackPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <SketchText as="h1" className="text-4xl mb-12 text-center">
        Portfolio Tech Stack
      </SketchText>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {techStack.map((category, index) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <SketchContainer className="h-full">
              <div className="flex items-center gap-4 mb-6">
                <category.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <SketchText as="h2" className="text-2xl">
                  {category.category}
                </SketchText>
              </div>
              
              <div className="space-y-4">
                {category.items.map((item) => (
                  <motion.div
                    key={item.name}
                    className="p-4 border-2 border-black dark:border-gray-300 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <SketchText as="h3" className="text-lg font-bold mb-2">
                      {item.name}
                    </SketchText>
                    <SketchText className="text-gray-600 dark:text-gray-400">
                      {item.description}
                    </SketchText>
                  </motion.div>
                ))}
              </div>
            </SketchContainer>
          </motion.div>
        ))}
      </div>
    </div>
  );
}