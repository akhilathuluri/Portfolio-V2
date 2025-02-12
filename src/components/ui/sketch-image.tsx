import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SketchImageProps {
  src: string;
  alt: string;
  className?: string;
  isCircle?: boolean;
}

export function SketchImage({ src, alt, className, isCircle = false }: SketchImageProps) {
  return (
    <div className={cn('relative inline-block', className)}>
      <motion.div
        className={cn(
          'absolute inset-0 border-2 border-black dark:border-gray-300',
          isCircle ? 'rounded-full' : 'rounded-lg',
          'transform rotate-1'
        )}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.img
        src={src}
        alt={alt}
        className={cn(
          'relative border-2 border-black dark:border-gray-300',
          isCircle ? 'rounded-full' : 'rounded-lg',
          'object-cover'
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
    </div>
  );
}