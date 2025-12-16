import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Trash2, ExternalLink, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import FavoriteButton from './FavoriteButton';

const FavoritesCard = () => {
  const { user, favorites, removeFavorite, addToElite, removeFromElite, isElite } = useAuth();
  const [deletingId, setDeletingId] = useState(null);
  const [promotingId, setPromotingId] = useState(null);

  const handleRemove = async (toolId) => {
    setDeletingId(toolId);
    try {
      await removeFavorite(toolId);
    } catch (error) {
      console.error('Error removing favorite:', error);
    } finally {
      setTimeout(() => setDeletingId(null), 300);
    }
  };

  const handleEliteToggle = async (fav) => {
    setPromotingId(fav.id);
    try {
      if (isElite(fav.id)) {
        await removeFromElite(fav.id);
      } else {
        await addToElite(fav.id, fav.name, fav.url, fav.description, fav.category);
      }
    } catch (error) {
      console.error('Error toggling elite status:', error);
    } finally {
      setTimeout(() => setPromotingId(null), 300);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: false, margin: "-50px" }}
      className="relative col-span-1"
    >
      <div className="relative h-full glass-dark p-4 rounded-2xl border border-white/10 hover:border-yellow-500/30 transition-all duration-300 group">
        {/* Efecto de brillo de fondo */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl" />

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ 
                rotate: [0, -10, 10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-2xl"
            >
              ⭐
            </motion.div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Mis Favoritos
            </h3>
          </div>
        </div>

        {/* Contador de favoritos */}
        <div className="text-xs text-gray-400 mb-2">
          {favorites.length} {favorites.length === 1 ? 'herramienta favorita' : 'herramientas favoritas'}
        </div>

        {/* Lista scrollable */}
        <div className="relative max-h-[600px] overflow-y-auto pr-1 custom-scrollbar">
          {!user ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Star className="text-yellow-500/50 mb-3" size={48} />
              <p className="text-gray-400 text-sm mb-2">
                Inicia sesión para guardar tus herramientas favoritas
              </p>
            </div>
          ) : favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Star className="text-yellow-500/50 mb-3" size={48} />
              <p className="text-gray-400 text-sm mb-2">
                Aún no tienes favoritos
              </p>
              <p className="text-gray-500 text-xs">
                Haz clic en la estrella ⭐ de cualquier herramienta para agregarla
              </p>
            </div>
          ) : (
            <div className="space-y-0.5">
              <AnimatePresence mode="popLayout">
                {favorites.map((fav, index) => (
                  <motion.div
                    key={fav.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    className="group/item relative"
                  >
                    <div className="flex items-start justify-between py-2 px-2 rounded-md hover:bg-white/5 transition-all duration-200 gap-2">
                      {/* Contenido */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 mb-1">
                          <a
                            href={fav.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-gray-300 hover:text-yellow-400 transition-colors duration-200 truncate flex items-center gap-1"
                          >
                            {fav.name}
                            <ExternalLink size={10} className="flex-shrink-0" />
                          </a>
                        </div>
                        {fav.description && (
                          <p className="text-xs text-gray-500 truncate mb-1">
                            {fav.description}
                          </p>
                        )}
                        <span className="inline-block px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-400 rounded-full">
                          {fav.category}
                        </span>
                      </div>

                      {/* Botones de acción */}
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {/* Botón de favorito (estrella) */}
                        <div className="opacity-0 group-hover/item:opacity-100">
                          <FavoriteButton 
                            toolId={fav.id} 
                            toolName={fav.name} 
                            toolUrl={fav.url} 
                            toolDesc={fav.description} 
                            category={fav.category} 
                          />
                        </div>

                        {/* Botón de promover a Elite */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEliteToggle(fav)}
                          disabled={promotingId === fav.id}
                          className={`p-1.5 rounded-md transition-all duration-200 opacity-0 group-hover/item:opacity-100 disabled:opacity-50 ${
                            isElite(fav.id)
                              ? 'bg-blue-500/20 hover:bg-blue-500/30'
                              : 'bg-white/10 hover:bg-white/20'
                          }`}
                        >
                          {promotingId === fav.id ? (
                            <div className="w-3 h-3 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
                          ) : (
                            <Zap 
                              size={12} 
                              className={isElite(fav.id) ? 'text-blue-400' : 'text-white/60'}
                              fill={isElite(fav.id) ? 'currentColor' : 'none'}
                            />
                          )}
                        </motion.button>

                        {/* Botón de eliminar */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleRemove(fav.id)}
                          disabled={deletingId === fav.id}
                          className="p-1.5 rounded-md bg-red-500/10 hover:bg-red-500/20 transition-all duration-200 opacity-0 group-hover/item:opacity-100 disabled:opacity-50"
                        >
                          {deletingId === fav.id ? (
                            <div className="w-3 h-3 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin"></div>
                          ) : (
                            <Trash2 size={12} className="text-red-400" />
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Indicador de scroll */}
        {favorites.length > 5 && (
          <div className="absolute bottom-3 right-3 text-xs text-gray-500 opacity-60">
            ↓
          </div>
        )}

        {/* Efecto de brillo animado */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-yellow-500/5 to-transparent transform -skew-y-12 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FavoritesCard;
