import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const CopilotCLIWindow = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install -g @github/copilot");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: false, margin: "-50px" }}
      className="relative"
    >
      <div className="relative glass-dark rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group overflow-hidden">
        {/* Header */}
        <div className="bg-black/50 border-b border-white/10 px-4 py-2 flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xs font-mono text-white font-bold">Copilot CLI</span>
        </div>

        {/* Contenido */}
        <div className="p-3 space-y-3 text-xs">
          {/* Instalación */}
          <div>
            <div className="group/cmd bg-black/40 rounded-lg p-2 border border-white/5 font-mono text-green-400 flex items-center justify-between gap-2 hover:border-white/10 transition-all">
              <span>npm install -g @github/copilot</span>
              <button
                onClick={handleCopy}
                className="opacity-0 group-hover/cmd:opacity-100 transition-all p-1 rounded hover:bg-white/10 flex-shrink-0"
              >
                {copied ? (
                  <Check size={14} className="text-green-400" />
                ) : (
                  <Copy size={14} className="text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Modelos */}
          <div>
            <p className="font-semibold text-gray-300 mb-1">Modelos:</p>
            <div className="text-gray-400 space-y-0.5 ml-2">
              <p>• Claude Sonnet 4.5</p>
              <p>• GPT-5</p>
            </div>
          </div>

          {/* Agentes */}
          <div>
            <p className="font-semibold text-gray-300 mb-1">Agentes Especialistas en CMD</p>
            <p className="text-gray-400 ml-2">Crear agentes especializados en terminal</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CopilotCLIWindow;
