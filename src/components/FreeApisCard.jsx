import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FavoriteButton from './FavoriteButton';

const FreeApisCard = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const apis = [
    { 
      name: "https://bytez.com/", 
      url: "https://bytez.com/",
      hasDropdown: true,
      features: [
        "Chatbots multimodelo - El usuario elige el modelo",
        "Generación de imágenes - Flux, Stable Diffusion, etc.",
        "Análisis de datos - Con modelos especializados",
        "Embeddings - Para búsqueda semántica",
        "Transcripción - Audio a texto",
        "Visión por computadora - Análisis de imágenes"
      ]
    },
    { name: "https://huggingface.co/", url: "https://huggingface.co/" },
    { name: "https://console.groq.com/playground", url: "https://console.groq.com/playground" },
    { name: "https://openrouter.ai/models", url: "https://openrouter.ai/models" },
    { name: "Together.ai", url: "https://together.ai" },
    { name: "Pollinations integrate", url: "https://pollinations.ai" },
    { name: "Cloudflare", url: "https://www.cloudflare.com/apps/workers-ai" },
    { name: "Haidra-org/AI-horde", url: "https://horde.koboldai.net/" },
    { name: "https://modelslab.com/", url: "https://modelslab.com/" },
    { name: "https://Publicapis.io", url: "https://Publicapis.io" },
    { name: "https://sudoapp.dev/", url: "https://sudoapp.dev/" },
    { name: "https://pdf.co", url: "https://pdf.co" },
    { name: "https://poe.com/", url: "https://poe.com/" },
    { name: "https://apivault.dev/", url: "https://apivault.dev/" },
    { name: "https://libertai.io/", url: "https://libertai.io/" },
    { name: "https://API.nasa.gov", url: "https://api.nasa.gov/" },
    { name: "https://Magicloops.dev", url: "https://magicloops.dev" },
    { name: "https://www.blinkshot.io/", url: "https://www.blinkshot.io/" },
  ];

  const handleCopy = async (text, index) => {
    const urlOnly = text.split(' : ')[0].split(' (')[0];
    
    try {
      await navigator.clipboard.writeText(urlOnly);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const toggleDropdown = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7 }}
      viewport={{ once: false, margin: "-50px" }}
      className="relative col-span-1"
    >
      <div className="relative h-full glass-dark p-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group">
        {/* Efecto de brillo de fondo */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl" />

        {/* Header más compacto */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-2xl"
            >
              🔗
            </motion.div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
              APIs Gratuitas
            </h3>
          </div>
        </div>

        {/* Contador de recursos */}
        <div className="text-xs text-gray-400 mb-2">
          {apis.length} APIs disponibles
        </div>

        {/* Lista scrollable más compacta */}
        <div className="relative max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
          <div className="space-y-0.5">
            {apis.map((api, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.005, duration: 0.2 }}
                viewport={{ once: true }}
                className="group/item relative"
              >
                <div className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-white/5 transition-all duration-200">
                  {/* Contenedor del enlace y dropdown */}
                  <div className="flex-1 flex items-center gap-1">
                    {/* Botón de desplegable solo para Bytez */}
                    {api.hasDropdown && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleDropdown(index)}
                        className="p-0.5 rounded-md hover:bg-white/10 transition-all duration-200"
                      >
                        <motion.svg
                          animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="w-3 h-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </motion.button>
                    )}
                    
                    {/* Enlace */}
                    <a
                      href={api.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-xs text-gray-300 hover:text-white transition-colors duration-200 truncate pr-2"
                    >
                      <span className="hover:text-yellow-400 transition-colors">
                        {api.name}
                      </span>
                    </a>
                  </div>

                  {/* Botones */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <FavoriteButton
                      toolId={`api-${index}`}
                      toolName={api.name}
                      toolUrl={api.url}
                      toolDesc=""
                      category="Free APIs"
                    />
                    
                    {/* Botón de copiar más pequeño */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleCopy(api.name, index)}
                      className="p-1 rounded-md bg-white/5 hover:bg-white/10 transition-all duration-200 opacity-0 group-hover/item:opacity-100"
                    >
                    <AnimatePresence mode="wait">
                      {copiedIndex === index ? (
                        <motion.svg
                          key="check"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="w-3 h-3 text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </motion.svg>
                      ) : (
                        <motion.svg
                          key="copy"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="w-3 h-3 text-gray-400 hover:text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </motion.svg>
                      )}
                    </AnimatePresence>
                  </motion.button>
                  </div>
                </div>

                {/* Dropdown con características de Bytez */}
                <AnimatePresence>
                  {api.hasDropdown && expandedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-6 mr-2 mt-1 p-2 bg-white/5 rounded-md border border-white/10">
                        <div className="space-y-1">
                          {api.features.map((feature, featureIndex) => (
                            <motion.div
                              key={featureIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: featureIndex * 0.05 }}
                              className="flex items-start gap-2 text-xs text-gray-400"
                            >
                              <span className="text-yellow-400 mt-0.5">•</span>
                              <span>{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Tooltip de copiado */}
                <AnimatePresence>
                  {copiedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute right-0 top-full mt-0.5 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-md backdrop-blur-sm z-10"
                    >
                      ¡Copiado!
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Indicador de scroll más pequeño */}
        <div className="absolute bottom-3 right-3 text-xs text-gray-500 opacity-60">
          ↓
        </div>

        {/* Efecto de brillo animado */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-white/5 to-transparent transform -skew-y-12 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FreeApisCard;
