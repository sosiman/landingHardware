import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, ExternalLink, Copy } from 'lucide-react';
import FavoriteButton from './FavoriteButton';

const SQLCard = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const sqlTools = [
    {
      name: "LiamHQ",
      url: "https://liambx.com/",
      description: "ER Diagrams - Para proyectos privados: npx @liam-hq/cli init",
      category: "Diagramas"
    },
    {
      name: "Tembo",
      url: "https://app.tembo.io/",
      description: "Integración con PostgreSQL y base de datos GitHub",
      category: "PostgreSQL"
    },
    {
      name: "GPT Excel",
      url: "https://gptexcel.uk/dashboard",
      description: "EXCEL PRO AI Y BASE DE DATOS - lo más potente",
      category: "Excel + DB"
    },
    {
      name: "DrawDB",
      url: "https://drawdb.app",
      description: "Diagramas para entender SQL DATABASE de forma visual e intuitiva",
      category: "Diagramas"
    },
    {
      name: "Teable",
      url: "https://teable.ai/",
      description: "Construye base de datos y páginas web conectadas a esa base de datos",
      category: "Builder"
    },
    {
      name: "Lindy AI",
      url: "https://www.lindy.ai/build",
      description: "Construye apps con base de datos de forma automática",
      category: "App Builder"
    },
    {
      name: "ChartDB",
      url: "https://chartdb.io/",
      description: "Visualiza tu SQL database en segundos con gráficos interactivos",
      category: "Visualización"
    },
    {
      name: "Database.build",
      url: "https://database.build/",
      description: "Constructor visual de bases de datos con IA - diseña esquemas de forma intuitiva",
      category: "Builder"
    },
    {
      name: "RunSQL",
      url: "https://runsql.com/r/",
      description: "DATA EXAMPLE de RUN SQL instantáneo - prueba queries en vivo",
      category: "Testing"
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
      <div className="relative h-full glass-dark p-4 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 group">
        {/* Efecto de brillo de fondo */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl" />

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
              <Database className="text-blue-400" size={24} />
            </motion.div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
              SQL & Databases
            </h3>
          </div>
        </div>

        {/* Contador */}
        <div className="text-xs text-gray-400 mb-3">
          {sqlTools.length} herramientas disponibles
        </div>

        {/* Lista scrollable */}
        <div className="relative max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
          <div className="space-y-1">
            <AnimatePresence mode="popLayout">
              {sqlTools.map((tool, index) => (
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
                          toolId={`sql-${index}`}
                          toolName={tool.name}
                          toolUrl={tool.url}
                          toolDesc={tool.description}
                          category="SQL & Databases"
                        />
                        
                        {/* Botones que aparecen al hover */}
                        <div className="flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                          {/* Botón copiar URL */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => handleCopy(e, tool.url, index)}
                            className="p-1.5 rounded-md bg-blue-500/10 hover:bg-blue-500/20 transition-all duration-200"
                            title="Copiar URL"
                          >
                            {copiedIndex === index ? (
                              <span className="text-[10px] text-green-400">✓</span>
                            ) : (
                              <Copy size={12} className="text-blue-400" />
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
                            className="p-1.5 rounded-md bg-cyan-500/10 hover:bg-cyan-500/20 transition-all duration-200"
                            title="Abrir sitio web"
                          >
                            <ExternalLink size={12} className="text-cyan-400" />
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Descripción */}
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {tool.description}
                    </p>

                    {/* Categoría */}
                    <span className="inline-block self-start px-2 py-0.5 text-[10px] bg-blue-500/20 text-blue-400 rounded-full">
                      {tool.category}
                    </span>
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
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-blue-500/5 to-transparent transform -skew-y-12 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SQLCard;
