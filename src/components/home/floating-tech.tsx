import { motion } from 'framer-motion';
import { Laptop } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function FloatingTech() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 left-8 z-10 cursor-pointer"
      onClick={() => navigate('/tech-stack')}
    >
      <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow">
        <motion.div
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <Laptop className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </motion.div>
      </div>
    </motion.div>
  );
}