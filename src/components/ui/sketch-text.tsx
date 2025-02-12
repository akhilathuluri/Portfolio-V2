import { cn } from '@/lib/utils';

interface SketchTextProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function SketchText({ 
  children, 
  className,
  as: Component = 'span'
}: SketchTextProps) {
  return (
    <Component className={cn(
      'font-sketch tracking-wide',
      className
    )}>
      {children}
    </Component>
  );
}