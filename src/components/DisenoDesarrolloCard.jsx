import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import FavoriteButton from './FavoriteButton';

const DisenoDesarrolloCard = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [showAlternatives, setShowAlternatives] = useState(false);

  const tools = [
    { 
      name: "Crear Proyecto React con Vite", 
      command: "npm create vite@latest mi-app -- --template react",
      desc: "Ejecuta este comando dentro de la carpeta de tu proyecto. Luego: cd mi-app, npm install, npm run dev" 
    },
    { name: "Devin.ai", url: "https://devin.ai/", desc: "PAGO $20 - Ingeniero completo" },
    { name: "Claude Code", url: "https://claude.ai/code", desc: "Push a tu repositorio GitHub y editas tu proyecto en tiempo real - activa el webhook de Dokploy" },
    { name: "Compyle.ai", url: "https://www.compyle.ai/", desc: "Agente que gestiona tu proyecto y crea un plan" },
    { name: "CodeWiki Google", url: "https://codewiki.google/", desc: "Documenta repositorios open source" },
    { name: "Dualite.dev", url: "https://alpha.dualite.dev/", desc: "Creas proyectos en segundos con preview y descargas el .zip con todo" },
    { name: "TestSprite", url: "https://www.testsprite.com/", desc: "Valida, revisa, testea, fixes your software" },
    { name: "Creao.ai", url: "https://app.creao.ai/home", desc: "" },
    { name: "Antigravity", url: "https://antigravity.google/", desc: "Gemini 3, Claude 4.5, etc" },
    { name: "MagicPath AI", url: "https://www.magicpath.ai/", desc: "Muchas librerías" },
    { name: "Qoder", url: "https://qoder.com/download", desc: "Tiene Amazon Q y es igual que Visual. Comandos CLI: https://docs.qoder.com/zh/cli/using-cli" },
    { name: "Abacus AI", url: "https://desktop.abacus.ai/", desc: "" },
    { name: "Cursor", url: "https://cursor.com/download", desc: "Puedes usarlo en la web (https://cursor.com/agents)" },
    { name: "Windsurf", url: "https://windsurf.com/", desc: "" },
    { name: "Visual Studio Code", url: "https://code.visualstudio.com/", desc: "" },
    { name: "Jsoncrack.com", url: "https://jsoncrack.com", desc: "Visualizas el JSON en un diagrama" },
  ];

  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const renderDescription = (desc) => {
    if (!desc) return null;
    
    // Buscar URLs en la descripción
    const urlRegex = /(https?:\/\/[^\s)]+)/g;
    const parts = desc.split(urlRegex);
    
    return (
      <p className="text-xs text-gray-400 mt-1">
        {parts.map((part, i) => {
          if (part.match(urlRegex)) {
            return (
              <a
                key={i}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-blue-400 hover:text-blue-300 underline"
              >
                {part}
              </a>
            );
          }
          return part;
        })}
      </p>
    );
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
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 opacity-0 group-hover:opacity-10 blur-xl" />

        <h3 className="relative z-10 text-2xl font-bold bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 bg-clip-text text-transparent mb-1">
          Diseño y Desarrollo
        </h3>
        <p className="relative z-10 text-xs text-gray-400 mb-4">{tools.length} herramientas</p>

        <div className="relative z-10 max-h-[420px] overflow-y-auto custom-scrollbar">
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
                {/* Si tiene comando, renderizar sin link */}
                {tool.command ? (
                  <div className="flex flex-col gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 hover:border-white/10 transition-all">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white">{tool.name}</p>
                        {renderDescription(tool.desc)}
                      </div>
                      <FavoriteButton
                        toolId={`diseno-desarrollo-tool-${index}`}
                        toolName={tool.name}
                        toolUrl={tool.command}
                        toolDesc={tool.desc}
                        category="Diseño y Desarrollo"
                      />
                    </div>
                    {/* Comando copiable */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-black/40 rounded px-2 py-1.5 font-mono text-xs text-green-400 overflow-x-auto">
                        {tool.command}
                      </div>
                      <button
                        onClick={() => handleCopy(tool.command, index)}
                        className="p-1.5 rounded bg-blue-500/10 hover:bg-blue-500/20 transition-all flex-shrink-0"
                      >
                        <AnimatePresence mode="wait">
                          {copiedIndex === index ? (
                            <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                              <Check size={14} className="text-green-400" />
                            </motion.div>
                          ) : (
                            <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                              <Copy size={14} className="text-blue-400" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                    </div>

                    {/* Desplegable de Alternativas Modernas - solo para el primer item (React) */}
                    {index === 0 && (
                      <div className="mt-2">
                        <button
                          onClick={() => setShowAlternatives(!showAlternatives)}
                          className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                        >
                          {showAlternatives ? '▼' : '▶'} Tecnologías modernas recomendadas
                        </button>
                        <AnimatePresence>
                          {showAlternatives && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-2 p-3 bg-black/30 rounded text-xs text-gray-300 space-y-1">
                                <p className="text-yellow-400 font-semibold mb-2">Tecnologías web que NO usaría en proyectos nuevos:</p>
                                <p>• Moment.js → <span className="text-green-400">Day.js</span></p>
                                <p>• Lodash → <span className="text-green-400">es-toolkit</span></p>
                                <p>• Bootstrap → <span className="text-green-400">Flowbite</span></p>
                                <p>• jQuery → <span className="text-green-400">DOM + Fetch</span></p>
                                <p>• EJS / Handlebars → <span className="text-green-400">Astro</span></p>
                                <p>• Styled Components → <span className="text-green-400">Tailwind</span></p>
                                <p>• Selenium → <span className="text-green-400">Playwright o Cypress</span></p>
                                <p>• Redux → <span className="text-green-400">Zustand o TanStack Store</span></p>
                                <p>• SASS → <span className="text-green-400">CSS Modules con PostCSS</span></p>
                                <p>• Webpack → <span className="text-green-400">Vite, Rspack o Turbopack</span></p>
                                <p>• Font Awesome → <span className="text-green-400">Sprite de SVGs (Lucide)</span></p>
                                <p>• Karma/Mocha → <span className="text-green-400">Vitest / Jest + Testing Library</span></p>
                                <p>• Create React App → <span className="text-green-400">Vite, Next.js, TanStack Start</span></p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Renderizado normal con link */
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 hover:border-white/10 transition-all cursor-pointer"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white hover:text-blue-300 transition-colors break-all">{tool.name}</p>
                      {renderDescription(tool.desc)}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <FavoriteButton
                        toolId={`diseno-desarrollo-tool-${index}`}
                        toolName={tool.name}
                        toolUrl={tool.url}
                        toolDesc={tool.desc}
                        category="Diseño y Desarrollo"
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
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DisenoDesarrolloCard;
