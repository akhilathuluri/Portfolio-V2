import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SketchCardProps {
  children: React.ReactNode;
  className?: string;
}

export function SketchCard({ children, className }: SketchCardProps) {
  return (
    <motion.div
      className={cn(
        'bg-white dark:bg-gray-800 p-6 rounded-lg',
        'border-2 border-black dark:border-gray-300',
        'transform rotate-[0.5deg]',
        'hover:rotate-0 transition-transform',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      {children}
    </motion.div>
  );
}