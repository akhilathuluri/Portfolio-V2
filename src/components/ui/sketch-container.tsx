import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SketchContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function SketchContainer({ 
  children, 
  className,
  ...props 
}: SketchContainerProps) {
  return (
    <motion.div
      className={cn(
        'relative p-6 bg-white dark:bg-gray-800',
        'border-2 border-black dark:border-gray-300 rounded-lg',
        'before:absolute before:-inset-1 before:border-2 before:border-black dark:before:border-gray-300',
        'before:rounded-lg before:-z-10 before:transform before:rotate-1',
        'after:absolute after:-inset-2 after:border-2 after:border-black dark:after:border-gray-300',
        'after:rounded-lg after:-z-20 after:transform after:-rotate-1',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}