import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const ClineCLIWindow = () => {
  const [copiedCommand, setCopiedCommand] = useState(null);

  const commands = [
    { id: 'install', text: 'npm install -g cline' },
    { id: 'auth', text: 'cline auth' },
    { id: 'run', text: 'cline' },
  ];

  const handleCopy = (commandText, commandId) => {
    navigator.clipboard.writeText(commandText);
    setCopiedCommand(commandId);
    setTimeout(() => setCopiedCommand(null), 2000);
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
          <span className="text-xs font-mono text-white font-bold">Cline CLI</span>
        </div>

        {/* Contenido */}
        <div className="p-3 space-y-3 text-xs">
          {/* Instalación */}
          <div>
            <p className="font-semibold text-gray-300 mb-2">Instalación:</p>
            <div className="group/cmd bg-black/40 rounded-lg p-2 border border-white/5 font-mono text-green-400 flex items-center justify-between gap-2 hover:border-white/10 transition-all">
              <span>{commands[0].text}</span>
              <button
                onClick={() => handleCopy(commands[0].text, commands[0].id)}
                className="opacity-0 group-hover/cmd:opacity-100 transition-all p-1 rounded hover:bg-white/10 flex-shrink-0"
              >
                {copiedCommand === commands[0].id ? (
                  <Check size={14} className="text-green-400" />
                ) : (
                  <Copy size={14} className="text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Autenticación */}
          <div>
            <p className="font-semibold text-gray-300 mb-2">Autenticación:</p>
            <div className="group/cmd bg-black/40 rounded-lg p-2 border border-white/5 font-mono text-green-400 flex items-center justify-between gap-2 hover:border-white/10 transition-all">
              <span>{commands[1].text}</span>
              <button
                onClick={() => handleCopy(commands[1].text, commands[1].id)}
                className="opacity-0 group-hover/cmd:opacity-100 transition-all p-1 rounded hover:bg-white/10 flex-shrink-0"
              >
                {copiedCommand === commands[1].id ? (
                  <Check size={14} className="text-green-400" />
                ) : (
                  <Copy size={14} className="text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Inicio */}
          <div>
            <p className="font-semibold text-gray-300 mb-2">Iniciar Cline:</p>
            <div className="group/cmd bg-black/40 rounded-lg p-2 border border-white/5 font-mono text-green-400 flex items-center justify-between gap-2 hover:border-white/10 transition-all">
              <span>{commands[2].text}</span>
              <button
                onClick={() => handleCopy(commands[2].text, commands[2].id)}
                className="opacity-0 group-hover/cmd:opacity-100 transition-all p-1 rounded hover:bg-white/10 flex-shrink-0"
              >
                {copiedCommand === commands[2].id ? (
                  <Check size={14} className="text-green-400" />
                ) : (
                  <Copy size={14} className="text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Windows SOON */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-2">
            <p className="font-semibold text-yellow-400 mb-1">⚠️ Windows:</p>
            <p className="text-yellow-300/80">COMING SOON</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ClineCLIWindow;
