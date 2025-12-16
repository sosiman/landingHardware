import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ExternalLink, Zap } from 'lucide-react';
import FavoriteButton from './FavoriteButton';
import { useAuth } from '../context/AuthContext';

const TopEliteCard = () => {
  const { user, eliteTools, removeFromElite } = useAuth();
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [removingId, setRemovingId] = useState(null);

  const topEliteTools = [
    { name: "Emergent.sh", url: "https://app.emergent.sh/chat", desc: "Plataforma avanzada de chat con IA" },
    { name: "Miro", url: "https://miro.com/es/", desc: "Diseño en un workflow - pizarra colaborativa infinita" },
    { name: "myneutron.ai", url: "https://myneutron.ai/dashboard", desc: "Base de datos donde puedes guardar cualquier tipo de documento y conectarla por MCP a Claude" },
    { name: "Bhindi.io", url: "https://bhindi.io", desc: "Conecta un agente con cualquier aplicación del mercado: N8N, AWS, AZURE, SQL" },
    { name: "Cluelyai.com", url: "https://cluelyai.com", desc: "Ventana invisible para reuniones Zoom y exámenes" },
    { name: "Gofile.io", url: "https://gofile.io", desc: "Comparte archivos grandes muy rápidamente con solo un link" },
    { name: "SciSpace AI Detector", url: "https://scispace.com/ai-detector", desc: "Detector de IA" },
    { name: "Google AI Studio", url: "https://aistudio.google.com/", desc: "Vibe coding - plataforma para crear cualquier cosa e integrar modelos de IA de Google como no banana y veo 3" },
    { name: "Scribehow.com", url: "https://scribehow.com", desc: "Visualiza todos los pasos que realizaste en tu PC y los ordena con capturas perfectas" },
    { name: "SVG Grabber", url: "https://svg-grabber.com/", desc: "Extensión de Chrome para descargar todos los SVG de cualquier página, animación o icono" },
    { name: "Director.ai", url: "https://www.director.ai/", desc: "Plataforma web que automatiza lo que le pidas" },
    { name: "DeepAgent Desktop", url: "https://deepagent-desktop.abacus.ai/", desc: "Como Claude Desktop con acceso a conexión MCP e interfaz como Visual Studio" },
    { name: "CTO.new", url: "https://cto.new/", desc: "Agente de código avanzado" },
    { name: "Hopp.app", url: "https://gethopp.app/", desc: "Puedes compartir tu ventana y trabajar en la ventana de otra persona (para visual y desarrollo)" },
    { name: "Stitch by Google", url: "https://stitch.withgoogle.com/", desc: "Crea webs o apps" },
    { name: "GenSpark AI", url: "https://www.genspark.ai/", desc: "Múltiples herramientas y modo agente" },
    { name: "Rocket.new", url: "https://www.rocket.new/", desc: "Think it, type it - con muchas conexiones y puede importar Figma (React, Next.js, HTML)" },
    { name: "QuizMate.io", url: "https://www.quizmate.io/", desc: "Respuestas rápidas en ventanas para quizzes" },
    { name: "Okara.ai", url: "https://okara.ai/chat", desc: "De las últimas plataformas de IA" },
    { name: "Unicorn Studio", url: "https://www.unicorn.studio/dashboard", desc: "Librería avanzada con animaciones nuevas" },
    { name: "Replit", url: "https://replit.com/~", desc: "Full Stack con integraciones en tu app o web, base de datos, etc. FREE DEPLOY" },
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

  const handleRemoveElite = async (toolId) => {
    setRemovingId(toolId);
    try {
      await removeFromElite(toolId);
    } catch (error) {
      console.error('Error removing from elite:', error);
    } finally {
      setTimeout(() => setRemovingId(null), 300);
    }
  };

  // Combinar herramientas predeterminadas con las del usuario
  const allEliteTools = [...eliteTools, ...topEliteTools];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: false, margin: "-50px" }}
      className="relative"
    >
      <div className="relative glass-dark p-6 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 group">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl" />

        <h3 className="relative z-10 text-lg font-bold mb-1">
          <span className="bg-gradient-to-r from-blue-300 via-blue-200 to-blue-400 bg-clip-text text-transparent" style={{ textShadow: '0 0 20px rgba(100,150,255,0.6)' }}>
            ⭐
          </span>
          <span className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300 bg-clip-text text-transparent" style={{ textShadow: '0 0 20px rgba(200,200,200,0.3), 0 0 40px rgba(150,150,150,0.2)' }}>
            {' '}TOP Elite Tools
          </span>
        </h3>
        <p className="relative z-10 text-xs text-gray-400 mb-3">
          {allEliteTools.length} herramientas elite
          {user && eliteTools.length > 0 && (
            <span className="ml-2 text-blue-400">({eliteTools.length} tuyas)</span>
          )}
        </p>

        <div className="relative z-10 max-h-[280px] overflow-y-auto custom-scrollbar">
          <div className="space-y-1.5">
            {/* Herramientas del usuario primero */}
            {eliteTools.map((tool, index) => (
              <motion.div
                key={`user-${tool.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ delay: index * 0.01 }}
                className="group/item"
              >
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between gap-2 p-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/5 hover:border-white/10 transition-all cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      <Zap size={10} className="text-blue-400 flex-shrink-0" fill="currentColor" />
                      <p className="text-xs font-semibold text-purple-300 truncate">
                        {tool.name}
                      </p>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">
                      {tool.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-0.5 flex-shrink-0">
                    <div className="opacity-0 group-hover/item:opacity-100">
                      <FavoriteButton 
                        toolId={tool.id} 
                        toolName={tool.name} 
                        toolUrl={tool.url} 
                        toolDesc={tool.description} 
                        category={tool.category} 
                      />
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveElite(tool.id);
                      }}
                      disabled={removingId === tool.id}
                      className="p-1 rounded-md bg-red-500/10 hover:bg-red-500/20 transition-all opacity-0 group-hover/item:opacity-100 disabled:opacity-50"
                    >
                      {removingId === tool.id ? (
                        <div className="w-3 h-3 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin"></div>
                      ) : (
                        <Zap size={10} className="text-red-400" />
                      )}
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCopy(tool.url, `user-${index}`);
                      }}
                      className="p-1 rounded-md bg-white/10 hover:bg-white/20 transition-all opacity-0 group-hover/item:opacity-100"
                    >
                      <AnimatePresence mode="wait">
                        {copiedIndex === `user-${index}` ? (
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
            
            {/* Herramientas predeterminadas */}
            {topEliteTools.map((tool, index) => (
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
                    <p className="text-xs font-semibold text-purple-300 truncate">
                      {tool.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">
                      {tool.desc}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-0.5 flex-shrink-0">
                    <FavoriteButton toolId={`top-elite-${index}`} toolName={tool.name} toolUrl={tool.url} toolDesc={tool.desc} category="TOP Elite" />
                    
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

export default TopEliteCard;
