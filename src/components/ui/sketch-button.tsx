import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SketchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export function SketchButton({ 
  children, 
  className, 
  variant = 'primary',
  ...props 
}: SketchButtonProps) {
  const baseStyles = 'font-sketch px-6 py-3 rounded-lg border-2 transition-transform hover:scale-105 active:scale-95';
  const variants = {
    primary: 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white',
    secondary: 'bg-blue-500 text-white border-blue-500 dark:border-blue-400',
    outline: 'bg-transparent border-black dark:border-white text-black dark:text-white',
  };

  return (
    <motion.button
      className={cn(baseStyles, variants[variant], className)}
      whileHover={{ rotate: -1 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}