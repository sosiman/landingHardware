import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ExternalLink } from 'lucide-react';
import FavoriteButton from './FavoriteButton';

const TopToolsCard = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const topTools = [
    { name: "myneutron.ai", url: "https://myneutron.ai/dashboard", desc: "Base de datos donde puedes guardar cualquier tipo de documento y conectarla por MCP a Claude" },
    { name: "Bhindi.io", url: "https://bhindi.io", desc: "Conecta un agente con cualquier aplicación del mercado: N8N, AWS, AZURE, SQL" },
    { name: "Cluelyai.com", url: "https://cluelyai.com", desc: "Ventana invisible para reuniones Zoom y exámenes" },
    { name: "Gofile.io", url: "https://gofile.io", desc: "Comparte archivos grandes muy rápidamente con solo un link" },
    { name: "SciSpace AI Detector", url: "https://scispace.com/ai-detector", desc: "Detector de IA" },
    { name: "Google AI Studio", url: "https://aistudio.google.com/", desc: "Vibe coding - crea cualquier cosa e integra modelos de IA de Google" },
    { name: "Scribehow.com", url: "https://scribehow.com", desc: "Visualiza todos los pasos que realizaste en tu PC con capturas perfectas" },
    { name: "SVG Grabber", url: "https://svg-grabber.com/", desc: "Extensión de Chrome para descargar SVG de cualquier página" },
    { name: "Director.ai", url: "https://www.director.ai/", desc: "Plataforma web que automatiza lo que le pidas" },
    { name: "DeepAgent Desktop", url: "https://deepagent-desktop.abacus.ai/", desc: "Como Claude Desktop con acceso a MCP e interfaz Visual Studio" },
    { name: "CTO.new", url: "https://cto.new/", desc: "Agente de código avanzado" },
    { name: "Hopp.app", url: "https://gethopp.app/", desc: "Comparte tu ventana y trabaja en la ventana de otra persona" },
    { name: "Stitch by Google", url: "https://stitch.withgoogle.com/", desc: "Crea webs o apps con IA" },
    { name: "GenSpark AI", url: "https://www.genspark.ai/", desc: "Múltiples herramientas y modo agente integrado" },
    { name: "Rocket.new", url: "https://www.rocket.new/", desc: "Think it, type it - importa Figma (React, Next.js, HTML)" },
    { name: "QuizMate.io", url: "https://www.quizmate.io/", desc: "Respuestas rápidas en ventanas para quizzes" },
    { name: "Okara.ai", url: "https://okara.ai/chat", desc: "Una de las últimas plataformas de IA" },
    { name: "Unicorn Studio", url: "https://www.unicorn.studio/dashboard", desc: "Librería avanzada con animaciones nuevas" },
    { name: "Replit", url: "https://replit.com/~", desc: "Full stack con integraciones, base de datos y deploy gratuito" },
  ];

  const handleCopy = async (url, index) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: false, margin: "-50px" }}
      className="relative col-span-1 lg:col-span-2 lg:max-w-[79%]"
    >
      <div className="relative glass-dark p-6 rounded-2xl border border-white/10 hover:border-amber-500/30 transition-all duration-300 group">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500 to-red-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl" />

        <h3 className="relative z-10 text-lg font-bold bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent mb-1">
          🔥 TOP Herramientas
        </h3>
        <p className="relative z-10 text-xs text-gray-400 mb-3">{topTools.length} herramientas destacadas</p>

        <div className="relative z-10 max-h-[280px] overflow-y-auto custom-scrollbar">
          <div className="space-y-1.5">
            {topTools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.01 }}
                viewport={{ once: true }}
                className="group/item"
              >
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between gap-2 p-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/5 hover:border-white/10 transition-all cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-amber-300 truncate">
                      {tool.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                      {tool.desc}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-0.5 flex-shrink-0">
                    <FavoriteButton toolId={tool.name} toolName={tool.name} toolUrl={tool.url} toolDescription={tool.desc} />
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCopy(tool.url, index);
                      }}
                      className="p-1 rounded-md bg-white/10 hover:bg-white/20 transition-all opacity-0 group-hover/item:opacity-100"
                    >
                      <AnimatePresence mode="wait">
                        {copiedIndex === index ? (
                          <Check key="check" size={12} className="text-green-400" />
                        ) : (
                          <Copy key="copy" size={12} className="text-white/60" />
                        )}
                      </AnimatePresence>
                    </motion.button>
                    
                    <ExternalLink size={12} className="text-white/40" />
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TopToolsCard;
