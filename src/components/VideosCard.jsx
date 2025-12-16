import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, ExternalLink, Copy } from 'lucide-react';
import FavoriteButton from './FavoriteButton';

const VideosCard = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const videoTools = [
    {
      name: "Luma Labs AI",
      url: "https://lumalabs.ai/",
      description: "Puedes pasar videos horizontales a verticales (reframe)",
      category: "Reframe"
    },
    {
      name: "LTX Studio",
      url: "https://app.ltx.studio/",
      description: "Último modelo de videos generativo LTX-2 - 20 segundos",
      category: "Generativo"
    },
    {
      name: "Krea AI",
      url: "https://www.krea.ai/",
      description: "",
      category: "IA Video"
    },
    {
      name: "Hailuo AI Video",
      url: "https://hailuoai.video",
      description: "",
      category: "IA Video"
    }
  ];

  const handleCopy = (e, url, index) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7 }}
      viewport={{ once: false, margin: "-50px" }}
      className="relative col-span-1"
    >
      <div className="relative h-full glass-dark p-4 rounded-2xl border border-white/10 hover:border-orange-500/30 transition-all duration-300 group">
        {/* Efecto de brillo de fondo */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl" />

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Video className="text-orange-400" size={24} />
            </motion.div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              VIDEOS
            </h3>
          </div>
        </div>

        {/* Contador */}
        <div className="text-xs text-gray-400 mb-3">
          {videoTools.length} herramientas disponibles
        </div>

        {/* Lista scrollable */}
        <div className="relative max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
          <div className="space-y-1">
            <AnimatePresence mode="popLayout">
              {videoTools.map((tool, index) => (
                <motion.a
                  key={index}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.2 }}
                  className="group/item relative block cursor-pointer"
                >
                  <div className="flex flex-col py-2 px-2 rounded-md hover:bg-white/5 transition-all duration-200 gap-1">
                    {/* Título y botones */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-gray-200 truncate">
                          {tool.name}
                        </h4>
                      </div>
                      
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {/* Botón de favoritos */}
                        <FavoriteButton
                          toolId={`videos-${index}`}
                          toolName={tool.name}
                          toolUrl={tool.url}
                          toolDesc={tool.description}
                          category="Videos"
                        />
                        
                        {/* Botones que aparecen al hover */}
                        <div className="flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                          {/* Botón copiar URL */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => handleCopy(e, tool.url, index)}
                            className="p-1.5 rounded-md bg-orange-500/10 hover:bg-orange-500/20 transition-all duration-200"
                            title="Copiar URL"
                          >
                            {copiedIndex === index ? (
                              <span className="text-[10px] text-green-400">✓</span>
                            ) : (
                              <Copy size={12} className="text-orange-400" />
                            )}
                          </motion.button>
                          
                          {/* Botón abrir URL */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              window.open(tool.url, '_blank');
                            }}
                            className="p-1.5 rounded-md bg-red-500/10 hover:bg-red-500/20 transition-all duration-200"
                            title="Abrir sitio web"
                          >
                            <ExternalLink size={12} className="text-red-400" />
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Descripción */}
                    {tool.description && (
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {tool.description}
                      </p>
                    )}

                    {/* Categoría */}
                    {tool.category && (
                      <span className="inline-block self-start px-2 py-0.5 text-[10px] bg-orange-500/20 text-orange-400 rounded-full">
                        {tool.category}
                      </span>
                    )}
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Efecto de brillo animado */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-orange-500/5 to-transparent transform -skew-y-12 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VideosCard;
