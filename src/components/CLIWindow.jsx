import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Download, Terminal, ChevronDown } from 'lucide-react';

const CLIWindow = ({ 
  title, 
  requirements, 
  commands, 
  gitRequired = true, 
  nodeDownload = null,
  downloadLabel = 'Node.js',
  setupSteps = null 
}) => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [expandedSteps, setExpandedSteps] = useState({});

  const copyCommand = (command, index) => {
    navigator.clipboard.writeText(command);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const toggleStep = (stepIndex) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepIndex]: !prev[stepIndex]
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative glass-dark rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 group"
    >
      {/* Efecto de brillo de fondo */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl" />

      {/* Encabezado compacto */}
      <div className="relative z-10 bg-black/50 border-b border-white/10 px-4 py-3 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
        </div>
        <span className="text-xs font-semibold text-white/90">{title}</span>
      </div>

      {/* Contenido compacto */}
      <div className="relative z-10 p-4 space-y-2.5 max-h-[280px] overflow-y-auto custom-scrollbar">
        
        {/* Requirements */}
        <div>
          <h4 className="text-xs font-semibold text-white/80 mb-1">Requisitos:</h4>
          <ul className="space-y-0.5">
            {requirements.map((req, idx) => (
              <li key={idx} className="text-xs text-white/60 flex items-start gap-1.5">
                <span className="text-green-400 flex-shrink-0">•</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Descargas */}
        <div>
          <h4 className="text-xs font-semibold text-white/80 mb-1">Descargas:</h4>
          <div className="space-y-0.5">
            {nodeDownload && (
              <div className="relative group/btn">
                <a
                  href={nodeDownload}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-blue-400 hover:text-blue-300 underline transition-colors truncate"
                >
                  {downloadLabel}
                </a>
              </div>
            )}
            {gitRequired && (
              <div className="relative group/btn">
                <a
                  href="https://git-scm.com/download"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-blue-400 hover:text-blue-300 underline transition-colors"
                >
                  Git
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Commands */}
        <div>
          <h4 className="text-xs font-semibold text-white/80 mb-1 flex items-center gap-1.5">
            <Terminal size={11} /> Comandos:
          </h4>
          <div className="space-y-0.5">
            {commands.map((command, idx) => (
              <div key={idx} className="relative group/cmd">
                <div className="bg-black/30 border border-white/10 rounded p-1.5 pr-7 font-mono text-xs text-white/80 truncate hover:bg-black/40 transition-colors">
                  {command}
                  <button
                    onClick={() => copyCommand(command, idx)}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 p-0.5 bg-white/10 hover:bg-white/20 rounded opacity-0 group-hover/cmd:opacity-100 transition-all"
                  >
                    {copiedIndex === idx ? (
                      <Check size={11} className="text-green-400" />
                    ) : (
                      <Copy size={11} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Variables de Entorno */}
        {setupSteps && (
          <div>
            <h4 className="text-xs font-semibold text-white/80 mb-1">Variables de Entorno:</h4>
            <div className="space-y-0.5">
              {setupSteps.map((step, idx) => (
                <div key={idx} className="border border-white/10 rounded overflow-hidden">
                  <button
                    onClick={() => toggleStep(idx)}
                    className="w-full flex items-center justify-between bg-black/30 hover:bg-black/40 px-2 py-1.5 transition-colors text-left"
                  >
                    <span className="text-xs text-white/80 font-medium truncate">{step.title}</span>
                    <ChevronDown 
                      size={11} 
                      className={`text-white/60 transition-transform flex-shrink-0 ${expandedSteps[idx] ? 'rotate-180' : ''}`}
                    />
                  </button>
                  
                  {expandedSteps[idx] && (
                    <div className="bg-black/50 border-t border-white/10 p-2 max-h-32 overflow-y-auto custom-scrollbar">
                      <div className="text-xs text-white/70 space-y-1">
                        {step.instructions.map((instruction, instIdx) => (
                          <div key={instIdx} className="flex gap-1.5">
                            <span className="text-blue-400 flex-shrink-0">•</span>
                            <p>{instruction}</p>
                          </div>
                        ))}
                      </div>
                      
                      {step.code && (
                        <div className="mt-2">
                          <div className="relative group/code">
                            <div className="bg-black/30 border border-white/10 rounded p-1.5 pr-6 font-mono text-xs text-white/80 break-all">
                              {step.code}
                              <button
                                onClick={() => copyCommand(step.code, `code-${idx}`)}
                                className="absolute right-1 top-1/2 transform -translate-y-1/2 p-0.5 bg-white/10 hover:bg-white/20 rounded opacity-0 group-hover/code:opacity-100 transition-all"
                              >
                                {copiedIndex === `code-${idx}` ? (
                                  <Check size={11} className="text-green-400" />
                                ) : (
                                  <Copy size={11} />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-2 right-2 text-xs text-gray-600 opacity-50 pointer-events-none">
        ↓
      </div>
    </motion.div>
  );
};

export default CLIWindow;
