import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import FavoriteButton from './FavoriteButton';

const SocialMediaCard = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const tools = [
    { name: "Blaze.ai", url: "https://blaze.ai", desc: "Constructor de contenido social con IA" },
    { name: "Chatedu.io", url: "https://chatedu.io", desc: "Resumir, visualizar, transcribir y más para vídeos de YouTube" },
    { name: "PlayPhrase.me", url: "https://www.playphrase.me", desc: "Te busca la parte de una película con esa frase" },
    { name: "Vsave.net", url: "https://vsave.net", desc: "Guarda cualquier video que coloques por link" },
    { name: "Liinks.co", url: "https://www.liinks.co/", desc: "Centraliza tu presencia online" },
    { name: "Opencut.app", url: "https://opencut.app", desc: "Editor de video con IA" },
    { name: "FloraFauna AI", url: "https://www.florafauna.ai/", desc: "Workflow de tu contenido" },
    { name: "Opus Clip Pro", url: "https://clip.opus.pro/dashboard", desc: "Lo más potente en edición automática con IA (hace TODO)" },
    { name: "https://www.videoideas.ai/", url: "https://www.videoideas.ai/", desc: "youtube content factory" },
    { name: "https://www.spikes.studio/shorts-video-maker", url: "https://www.spikes.studio/shorts-video-maker", desc: "shorts video maker" },
    { name: "https://videoeffects.com/", url: "https://videoeffects.com/", desc: "crea videos para la plataforma que quieras" },
    { name: "https://shortx.ai/", url: "https://shortx.ai/", desc: "automatiza tu social media" },
    { name: "https://faceless.video/", url: "https://faceless.video/", desc: "" },
    { name: "Printify.com", url: "https://printify.com", desc: "Create and sell custom products" },
    { name: "Apob.ai", url: "https://apob.ai", desc: "Creas tu propio modelo" },
    { name: "Arcads AI", url: "https://app.arcads.ai/", desc: "" },
    { name: "Oak AI", url: "https://act.oak.ai/root", desc: "" },
  ];

  const handleCopy = async (name, index) => {
    try {
      await navigator.clipboard.writeText(name);
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
      className="relative col-span-1 h-full"
    >
      <div className="relative glass-dark p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group overflow-hidden h-full">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 blur-xl" />

        <h3 className="relative z-10 text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent mb-1">
          Social Media Constructor
        </h3>
        <p className="relative z-10 text-xs text-gray-400 mb-4">{tools.length} herramientas</p>

        <div className="relative z-10 max-h-[280px] overflow-y-auto custom-scrollbar">
          <div className="space-y-2">
            {tools.map((tool, index) => (
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
                  className="flex items-start justify-between gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 hover:border-white/10 transition-all cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white hover:text-blue-300 transition-colors break-all">{tool.name}</p>
                    {tool.desc && <p className="text-xs text-gray-400 mt-1">{tool.desc}</p>}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <FavoriteButton
                      toolId={`social-media-tool-${index}`}
                      toolName={tool.name}
                      toolUrl={tool.url}
                      toolDesc={tool.desc}
                      category="Social Media"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleCopy(tool.name, index);
                      }}
                      className="p-1.5 rounded opacity-0 group-hover/item:opacity-100 transition-all bg-white/10 hover:bg-white/20"
                    >
                      <AnimatePresence mode="wait">
                        {copiedIndex === index ? (
                          <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <Check size={14} className="text-green-400" />
                          </motion.div>
                        ) : (
                          <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <Copy size={14} className="text-gray-400" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
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

export default SocialMediaCard;
