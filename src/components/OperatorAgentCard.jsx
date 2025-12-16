import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, ExternalLink, Copy } from 'lucide-react';
import FavoriteButton from './FavoriteButton';

const OperatorAgentCard = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const agentTools = [
    {
      name: "Mgx.dev",
      url: "https://mgx.dev/",
      description: "Plataforma de desarrollo de agentes IA",
      category: "Builder"
    },
    {
      name: "ByteBot AI",
      url: "https://www.bytebot.ai/",
      description: "Agente OPERATOR - automatización inteligente",
      category: "Operator"
    },
    {
      name: "BrowserOS",
      url: "https://www.browseros.com/",
      description: "Sistema operativo basado en navegador con agentes IA",
      category: "Browser Agent"
    },
    {
      name: "DrFonts",
      url: "https://drfonts.com/",
      description: "Agente especializado en tipografía y fuentes",
      category: "Design Agent"
    },
    {
      name: "AITMPL Agents",
      url: "https://www.aitmpl.com/agents",
      description: "Agentes y plantillas de agentes para desarrollo",
      category: "Templates"
    },
    {
      name: "Lovart AI",
      url: "https://www.lovart.ai/de",
      description: "Agente de diseño con IA",
      category: "Design Agent"
    },
    {
      name: "Fellou AI",
      url: "https://fellou.ai/",
      description: "Agent browser - navegador con agentes IA integrados",
      category: "Browser Agent"
    },
    {
      name: "Neural Agent",
      url: "https://www.getneuralagent.com/",
      description: "Operator - agente autónomo para automatizar tareas",
      category: "Operator"
    },
    {
      name: "Vercept",
      url: "https://vercept.com/",
      description: "Operator - sistema de agentes inteligentes",
      category: "Operator"
    },
    {
      name: "Tavily",
      url: "https://www.tavily.com/",
      description: "Conecta tu agente a la web con búsqueda optimizada",
      category: "Web Connection"
    },
    {
      name: "Perplexity Comet",
      url: "https://www.perplexity.ai/comet",
      description: "Operator - agente de búsqueda y análisis avanzado",
      category: "Operator"
    },
    {
      name: "Genspark AI",
      url: "https://genspark.ai",
      description: "Plataforma más completa: agentes IA, deep research, código en vivo, imágenes y video",
      category: "Todo en Uno"
    },
    {
      name: "Trae AI",
      url: "https://trae.ai",
      description: "Crea páginas web con distintos modelos de IA y diseña agentes IA gratis",
      category: "Builder"
    },
    {
      name: "ACE General Agents",
      url: "https://generalagents.com/ace/",
      description: "NUEVO OPERATOR - última generación de agentes autónomos",
      category: "Operator"
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
      <div className="relative h-full glass-dark p-4 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 group">
        {/* Efecto de brillo de fondo */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl" />

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
              <Bot className="text-purple-400" size={24} />
            </motion.div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Operator Agents
            </h3>
          </div>
        </div>

        {/* Contador */}
        <div className="text-xs text-gray-400 mb-3">
          {agentTools.length} agentes y operadores
        </div>

        {/* Lista scrollable */}
        <div className="relative max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
          <div className="space-y-1">
            <AnimatePresence mode="popLayout">
              {agentTools.map((tool, index) => (
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
                          toolId={`operator-${index}`}
                          toolName={tool.name}
                          toolUrl={tool.url}
                          toolDesc={tool.description}
                          category="Operator Agents"
                        />
                        
                        {/* Botones que aparecen al hover */}
                        <div className="flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                          {/* Botón copiar URL */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => handleCopy(e, tool.url, index)}
                            className="p-1.5 rounded-md bg-purple-500/10 hover:bg-purple-500/20 transition-all duration-200"
                            title="Copiar URL"
                          >
                            {copiedIndex === index ? (
                              <span className="text-[10px] text-green-400">✓</span>
                            ) : (
                              <Copy size={12} className="text-purple-400" />
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
                            className="p-1.5 rounded-md bg-pink-500/10 hover:bg-pink-500/20 transition-all duration-200"
                            title="Abrir sitio web"
                          >
                            <ExternalLink size={12} className="text-pink-400" />
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Descripción */}
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {tool.description}
                    </p>

                    {/* Categoría */}
                    <span className="inline-block self-start px-2 py-0.5 text-[10px] bg-purple-500/20 text-purple-400 rounded-full">
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
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-purple-500/5 to-transparent transform -skew-y-12 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OperatorAgentCard;
