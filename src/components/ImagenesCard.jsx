import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, ExternalLink, Copy } from 'lucide-react';
import FavoriteButton from './FavoriteButton';

const ImagenesCard = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [show3DTools, setShow3DTools] = useState(false);

  const imageTools = [
    {
      name: "3D",
      url: "#",
      description: "Herramientas de modelado y renderizado 3D",
      category: "3D",
      has3DTools: true
    },
    {
      name: "Adobe Firefly",
      url: "https://firefly.adobe.com/",
      description: "IA generativa de Adobe para imágenes",
      category: "IA Generativa"
    },
    {
      name: "Flowith",
      url: "https://flowith.io/blank",
      description: "Crea imágenes en un flujo (varias por una idea)",
      category: "Flujo Creativo"
    },
    {
      name: "GenTube",
      url: "https://www.gentube.app/",
      description: "Crea imágenes profesionales",
      category: "Profesional"
    },
    {
      name: "Higgsfield AI",
      url: "https://higgsfield.ai/app/angles?utm_source=chatgpt.com",
      description: "",
      category: "IA Imágenes"
    }
  ];

  const tools3D = [
    { name: "Hyper3D AI", url: "https://hyper3d.ai/" },
    { name: "PlayCanvas Engine", url: "https://github.com/playcanvas/engine.git" },
    { name: "Hitem3D AI", url: "https://www.hitem3d.ai/" },
    { name: "3D Logo Lab", url: "https://www.3dlogolab.io/" }
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
      <div className="relative h-full glass-dark p-4 rounded-2xl border border-white/10 hover:border-emerald-500/30 transition-all duration-300 group">
        {/* Efecto de brillo de fondo */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl" />

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
              <Image className="text-emerald-400" size={24} />
            </motion.div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              IMÁGENES
            </h3>
          </div>
        </div>

        {/* Contador */}
        <div className="text-xs text-gray-400 mb-3">
          {imageTools.length} herramientas disponibles
        </div>

        {/* Lista scrollable */}
        <div className="relative max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
          <div className="space-y-1">
            <AnimatePresence mode="popLayout">
              {imageTools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.2 }}
                  className="group/item relative"
                >
                  {tool.has3DTools ? (
                    // Renderizado especial para 3D con desplegable
                    <div className="flex flex-col py-2 px-2 rounded-md hover:bg-white/5 transition-all duration-200 gap-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <button
                            onClick={() => setShow3DTools(!show3DTools)}
                            className="text-xs font-semibold text-gray-200 hover:text-emerald-400 transition-colors flex items-center gap-1"
                          >
                            {show3DTools ? '▼' : '▶'} {tool.name}
                          </button>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <FavoriteButton
                            toolId={`imagenes-${index}`}
                            toolName={tool.name}
                            toolUrl={tool.url}
                            toolDesc={tool.description}
                            category="Imágenes"
                          />
                        </div>
                      </div>

                      {tool.description && (
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {tool.description}
                        </p>
                      )}

                      <span className="inline-block self-start px-2 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-400 rounded-full">
                        {tool.category}
                      </span>

                      {/* Desplegable de herramientas 3D */}
                      <AnimatePresence>
                        {show3DTools && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden mt-2"
                          >
                            <div className="p-2 bg-black/30 rounded space-y-1">
                              {tools3D.map((tool3d, idx) => (
                                <a
                                  key={idx}
                                  href={tool3d.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block text-xs text-teal-400 hover:text-teal-300 transition-colors"
                                >
                                  • {tool3d.name}
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    // Renderizado normal para otros items
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block cursor-pointer"
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
                          toolId={`imagenes-${index}`}
                          toolName={tool.name}
                          toolUrl={tool.url}
                          toolDesc={tool.description}
                          category="Imágenes"
                        />
                        
                        {/* Botones que aparecen al hover */}
                        <div className="flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                          {/* Botón copiar URL */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => handleCopy(e, tool.url, index)}
                            className="p-1.5 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 transition-all duration-200"
                            title="Copiar URL"
                          >
                            {copiedIndex === index ? (
                              <span className="text-[10px] text-green-400">✓</span>
                            ) : (
                              <Copy size={12} className="text-emerald-400" />
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
                            className="p-1.5 rounded-md bg-teal-500/10 hover:bg-teal-500/20 transition-all duration-200"
                            title="Abrir sitio web"
                          >
                            <ExternalLink size={12} className="text-teal-400" />
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
                      <span className="inline-block self-start px-2 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-400 rounded-full">
                        {tool.category}
                      </span>
                    )}
                  </div>
                    </a>
                  )}
                </motion.div>
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
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-emerald-500/5 to-transparent transform -skew-y-12 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ImagenesCard;
