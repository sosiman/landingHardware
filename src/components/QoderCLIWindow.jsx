import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const QoderCLIWindow = () => {
  const [copiedCommand, setCopiedCommand] = useState(null);

  const commands = [
    { id: 'wsl', text: 'wsl --install' },
    { id: 'install', text: 'curl -fsSL https://qoder.com/install | bash' },
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
      className="relative h-[350px]"
    >
      <div className="relative glass-dark rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group overflow-hidden h-full flex flex-col">
        {/* Header */}
        <div className="bg-black/50 border-b border-white/10 px-4 py-2 flex items-center gap-3 flex-shrink-0">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xs font-mono text-white font-bold">Qoder IDE</span>
        </div>

        {/* Contenido */}
        <div className="p-3 space-y-3 text-xs overflow-y-auto custom-scrollbar flex-1">
          {/* ¿Qué es Qoder? */}
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-3">
            <p className="font-semibold text-purple-400 mb-2">🚀 ¿Qué es Qoder?</p>
            <div className="text-gray-300 space-y-1 text-[11px]">
              <p>Qoder es un IDE de próxima generación potenciado por IA que integra:</p>
              <ul className="space-y-0.5 ml-3">
                <li className="flex items-start gap-1.5">
                  <span className="text-purple-400 flex-shrink-0">•</span>
                  <span><strong>Amazon Q Developer</strong> - Asistente de IA avanzado</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-purple-400 flex-shrink-0">•</span>
                  <span><strong>Compatible con VS Code</strong> - Usa tus extensiones favoritas</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-purple-400 flex-shrink-0">•</span>
                  <span><strong>Desarrollo acelerado</strong> - Programación asistida por IA</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-purple-400 flex-shrink-0">•</span>
                  <span><strong>Multiplataforma</strong> - Windows, macOS y Linux</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Paso 1: Instalar WSL */}
          <div>
            <p className="font-semibold text-gray-300 mb-2">Paso 1: Instalar WSL (Windows)</p>
            <p className="text-gray-400 mb-2 text-[10px]">Ejecutar en PowerShell como Administrador:</p>
            <div className="group/cmd bg-black/40 rounded-lg p-2 border border-white/5 font-mono text-green-400 flex items-center justify-between gap-2 hover:border-white/10 transition-all">
              <span className="break-all">{commands[0].text}</span>
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
            <p className="text-yellow-400 text-[10px] mt-1">⚠️ Reinicia tu PC después de instalar WSL</p>
          </div>

          {/* Paso 2: Instalar Qoder */}
          <div>
            <p className="font-semibold text-gray-300 mb-2">Paso 2: Instalar Qoder</p>
            <p className="text-gray-400 mb-2 text-[10px]">Ejecutar en WSL o terminal de Linux/macOS:</p>
            <div className="group/cmd bg-black/40 rounded-lg p-2 border border-white/5 font-mono text-green-400 flex items-center justify-between gap-2 hover:border-white/10 transition-all">
              <span className="break-all">{commands[1].text}</span>
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

          {/* Más información */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2">
            <p className="text-blue-300 text-[10px]">
              💡 <strong>Descarga directa:</strong>{' '}
              <a 
                href="https://qoder.com/download" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                qoder.com/download
              </a>
            </p>
          </div>

          {/* Comandos útiles */}
          <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-lg p-3">
            <p className="font-semibold text-green-400 mb-2">🎯 Comandos útiles de Qoder</p>
            <div className="space-y-2 text-[11px]">
              <div className="bg-black/30 rounded p-2">
                <code className="text-cyan-400">/init</code>
                <p className="text-gray-300 mt-1">Escanea tu proyecto y genera automáticamente un archivo <code className="text-purple-400">AGENTS.md</code> con información del proyecto para agentes IA.</p>
              </div>
              <div className="bg-black/30 rounded p-2">
                <p className="text-gray-300">
                  <strong className="text-yellow-400">💡 Pro Tip:</strong> Crea <code className="text-purple-400">~/.qoder/AGENTS.md</code> para preferencias globales que apliquen a todos tus proyectos.
                </p>
              </div>
              <div className="bg-black/30 rounded p-2">
                <p className="text-gray-300">
                  <strong className="text-cyan-400">📝 Buena práctica:</strong> Agrega <code className="text-purple-400">AGENTS.md</code> en la raíz de tu proyecto para que los agentes IA entiendan mejor su estructura y contexto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QoderCLIWindow;
