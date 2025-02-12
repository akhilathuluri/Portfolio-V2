import { SketchText } from '@/components/ui/sketch-text';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto py-6 border-t-2 border-black dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-2">
          <SketchText className="text-center flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> by Athuluri Akhil
          </SketchText>
          <SketchText className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} All rights reserved
          </SketchText>
        </div>
      </div>
    </footer>
  );
}