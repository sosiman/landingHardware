import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import FavoriteButton from './FavoriteButton';

const AutomatizacionModernaCard = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const tools = [
    { name: "Krea AI", url: "https://www.krea.ai/", desc: "" },
    { name: "N8N Workflows - Zie619", url: "https://github.com/Zie619/n8n-workflows.git", desc: "Cientos de flujos en n8n" },
    { name: "Vellum AI", url: "https://app.vellum.ai/", desc: "Agentes" },
    { name: "Miro", url: "https://miro.com/es/", desc: "Flujos de ideas" },
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
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 blur-xl" />

        <h3 className="relative z-10 text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent mb-1">
          Automatización Moderna
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
                      toolId={`automatizacion-moderna-tool-${index}`}
                      toolName={tool.name}
                      toolUrl={tool.url}
                      toolDesc={tool.desc}
                      category="Automatización Moderna"
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

export default AutomatizacionModernaCard;
