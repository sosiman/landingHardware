import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const FavoriteButton = ({ toolId, toolName, toolUrl, toolDesc, category }) => {
  const { user, isFavorite, addFavorite, removeFavorite } = useAuth();
  const [isAnimating, setIsAnimating] = useState(false);
  const isFav = isFavorite(toolId);

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      alert('Debes iniciar sesión para agregar favoritos');
      return;
    }

    setIsAnimating(true);
    
    try {
      if (isFav) {
        await removeFavorite(toolId);
      } else {
        await addFavorite(toolId, toolName, toolUrl, toolDesc, category);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleToggleFavorite}
      disabled={isAnimating}
      className={`p-1 rounded-md transition-all duration-200 flex-shrink-0 ${
        isFav 
          ? 'bg-yellow-500/20 hover:bg-yellow-500/30' 
          : 'bg-white/5 hover:bg-white/10'
      } disabled:opacity-50`}
      title={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      <motion.div
        animate={isAnimating ? { rotate: 360 } : {}}
        transition={{ duration: 0.3 }}
      >
        <Star
          size={12}
          className={`transition-all duration-200 ${
            isFav 
              ? 'text-yellow-400 fill-yellow-400' 
              : 'text-gray-400 hover:text-yellow-400'
          }`}
        />
      </motion.div>
    </motion.button>
  );
};

export default FavoriteButton;
