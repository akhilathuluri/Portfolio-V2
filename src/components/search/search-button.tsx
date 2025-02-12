import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchButtonProps {
  onClick: () => void;
}

export function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed top-24 right-8 z-10 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
    </motion.button>
  );
}