import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Copy, Check, ExternalLink } from 'lucide-react';

const MCPToolsCard = () => {
  const [openTool, setOpenTool] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const [openSection, setOpenSection] = useState(null);

  const toggleTool = (index) => {
    setOpenTool(openTool === index ? null : index);
    setOpenSection(null); // Reset sub-section when switching tools
  };

  const toggleSection = (key) => {
    setOpenSection(openSection === key ? null : key);
  };

  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const mcpTools = [
    {
      name: 'Perplexity AI',
      icon: '🔍',
      color: 'from-cyan-400 to-blue-500',
      description: 'Búsquedas web con IA. Usa tu propia API key de Perplexity.',
      repo: 'https://github.com/sosiman/MCP_PERPLEXITY.git',
      config: `{
  "mcpServers": {
    "perplexity-server": {
      "disabled": false,
      "timeout": 600,
      "command": "npx",
      "args": ["-y", "@sosiman/mcp-perplexity"],
      "env": {
        "PERPLEXITY_API_KEY": "pplx-tu-api-key-aqui"
      }
    }
  }
}`,
      models: ['sonar', 'sonar-pro', 'sonar-reasoning', 'sonar-reasoning-pro'],
      npm: 'https://www.npmjs.com/package/@sosiman/mcp-perplexity'
    },
    {
      name: 'MCP IDES CONFIG',
      icon: '⚙️',
      color: 'from-green-400 to-emerald-500',
      description: 'Guía de configuración Maestra para conectar MCP en distintos IDEs.',
      type: 'guide',
      sections: [
        {
          title: '1. Claude Desktop',
          protocol: 'Stdio (NPX)',
          why: 'Es una app de escritorio pura y dura. Prefiere ejecutar comandos locales. Como vimos, a veces falla con HTTP (invalid_type).',
          path: 'C:\\Users\\codex\\AppData\\Roaming\\Claude',
          structure: 'Usa la etiqueta estándar "mcpServers".',
          configTitle: 'Tu Configuración Perfecta (Windows)',
          code: `{
  "mcpServers": {
    "supabase": {
      "command": "npx.cmd",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase@latest",
        "--access-token",
        "sbp_e25e2a70d54294bd4cb74675d6aa535........."
      ]
    }
  }
}`
        },
        {
          title: '2. Cursor',
          protocol: 'Híbrido (Ambos)',
          why: 'Soporta npx perfecto, pero también maneja HTTP muy bien (url: "..."). Tu duda: "¿esto seria http?" -> SÍ. Si ves una url y no hay command, es HTTP (SSE).',
          structure: 'Usa la etiqueta estándar "mcpServers".',
          configTitle: 'Tu Configuración Perfecta (Modo HTTP - Más rápido)',
          code: `{
  "mcpServers": {
    "supabase": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp?project_ref=ggumixecwcufquqrisdq",
      "headers": {
        "Authorization": "Bearer sbp_e25e2a70d54294bd4cb74675d6aa535........."
      }
    }
  }
}`
        },
        {
          title: '3. Windsurf',
          protocol: 'Stdio (NPX)',
          why: 'Funciona casi idéntico a Claude Desktop. Está diseñado para correr herramientas en tu máquina.',
          structure: 'Usa la etiqueta estándar "mcpServers".',
          configTitle: 'Tu Configuración Perfecta',
          code: `{
  "mcpServers": {
    "supabase": {
      "command": "npx.cmd",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase@latest",
        "--access-token",
        "sbp_e25e2a70d54294bd4cb74675d6aa5359f......."
      ]
    }
  }
}`
        },
        {
          title: '4. Visual Studio Code (Vía Extensión)',
          protocol: 'HTTP',
          why: 'Como vimos, el npx le costaba más trabajo (errores de npm 404). El HTTP le entra directo y limpio.',
          path: 'C:\\Users\\codex\\AppData\\Roaming\\Code\\User',
          structure: 'DIFERENTE. No usa mcpServers. Usa "servers".',
          configTitle: 'Tu Configuración Perfecta (Archivo AppData Global)',
          code: `{
  "servers": {
    "supabase": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp?project_ref=ggumixecwc..........",
      "headers": {
        "Authorization": "Bearer sbp_e25e2a70d54294bd4cb74675d6aa5359f......."
      }
    },
    "io.github.github/github-mcp-server": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/",
      "headers": {
         "Authorization": "token TU_TOKEN_GHP_AQUI"
      },
      "gallery": "https://api.mcp.github.com",
      "version": "0.24.1"
    }
  }
}`
        },
        {
          title: '5. Antigravity',
          protocol: 'Híbrido (HTTP + NPX)',
          why: 'Usa ambos http y npx. Es tu agente autónomo local.',
          path: 'C:\\Users\\codex\\.gemini\\antigravity',
          structure: 'Configurado internamente en .gemini',
          configTitle: 'Ruta de Configuración',
          code: `C:\\Users\\codex\\.gemini\\antigravity`
        }
      ]
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: false, margin: "-50px" }}
      className="relative col-span-1"
    >
      <div className="relative glass-dark p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group overflow-hidden h-full flex flex-col">
        {/* Efecto de brillo */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl" />

        {/* Header */}
        <div className="relative z-10 mb-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🔌</span>
            <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              MCP Tools
            </h3>
          </div>
          <p className="text-xs text-gray-400">
            Model Context Protocol - Conecta IAs con herramientas
          </p>
        </div>

        {/* Lista de MCPs */}
        <div className="relative z-10 space-y-2 flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {mcpTools.map((tool, index) => (
            <div key={index} className="border border-white/10 rounded-lg overflow-hidden bg-black/20">
              {/* Header del MCP */}
              <button
                onClick={() => toggleTool(index)}
                className="w-full px-3 py-2.5 flex items-center justify-between hover:bg-white/5 transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{tool.icon}</span>
                  <span className={`font-semibold text-sm bg-gradient-to-r ${tool.color} bg-clip-text text-transparent`}>
                    {tool.name}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: openTool === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={16} className="text-gray-400" />
                </motion.div>
              </button>

              {/* Contenido desplegable */}
              <AnimatePresence>
                {openTool === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 pb-3 pt-1 space-y-3 border-t border-white/5 max-h-[220px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                      {/* Descripción General */}
                      <p className="text-xs text-gray-400">{tool.description}</p>

                      {tool.type === 'guide' ? (
                        /* Sección de Guía (Nested Collapsibles) */
                        <div className="space-y-2">
                          {tool.sections.map((section, secIdx) => (
                            <div key={secIdx} className="border border-white/5 rounded-lg overflow-hidden bg-black/30">
                              <button
                                onClick={() => toggleSection(`${index}-${secIdx}`)}
                                className="w-full px-2 py-2 flex items-center justify-between hover:bg-white/5 transition-all"
                              >
                                <span className="text-xs font-bold text-gray-200">{section.title}</span>
                                <motion.div
                                  animate={{ rotate: openSection === `${index}-${secIdx}` ? 180 : 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <ChevronDown size={14} className="text-gray-400" />
                                </motion.div>
                              </button>

                              <AnimatePresence>
                                {openSection === `${index}-${secIdx}` && (
                                  <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: "auto" }}
                                    exit={{ height: 0 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="px-2 pb-2 pt-1 space-y-2 border-t border-white/5">
                                      <div className="text-xs text-gray-300">
                                        <span className="text-blue-400 font-semibold">Protocolo:</span> {section.protocol}
                                      </div>
                                      {section.path && (
                                        <div className="text-xs text-gray-300">
                                          <span className="text-yellow-400 font-semibold">Ruta:</span>
                                          <div className="bg-black/40 px-1 py-0.5 rounded mt-0.5 font-mono text-[10px] break-all border border-white/5">
                                            {section.path}
                                          </div>
                                        </div>
                                      )}
                                      <div className="text-xs text-gray-400 italic border-l-2 border-white/10 pl-2">
                                        "{section.why}"
                                      </div>
                                      <div className="text-xs text-gray-300">
                                        <span className="text-purple-400 font-semibold">JSON:</span> {section.structure}
                                      </div>

                                      <div className="space-y-1 mt-1">
                                        <div className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">{section.configTitle}</div>
                                        <div className="relative group/code">
                                          <pre className="bg-black/50 border border-white/10 rounded p-2 pr-6 font-mono text-[10px] text-green-300 overflow-x-auto whitespace-pre custom-scrollbar">
                                            {section.code}
                                          </pre>
                                          <button
                                            onClick={() => handleCopy(section.code, `code-${index}-${secIdx}`)}
                                            className="absolute right-1 top-1 p-1 rounded bg-white/10 hover:bg-white/20 transition-all opacity-0 group-hover/code:opacity-100"
                                          >
                                            {copiedIndex === `code-${index}-${secIdx}` ? (
                                              <Check size={10} className="text-green-400" />
                                            ) : (
                                              <Copy size={10} className="text-white/60" />
                                            )}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      ) : (
                        /* Sección Normal (Repo, NPM, etc.) */
                        <>
                          {tool.repo && (
                            <div className="space-y-1">
                              <div className="text-xs font-bold text-cyan-400">📁 Repositorio:</div>
                              <a
                                href={tool.repo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-black/40 border border-white/10 rounded p-2 font-mono text-xs text-blue-400 hover:bg-black/50 hover:border-blue-500/30 transition-all"
                              >
                                <ExternalLink size={12} />
                                {tool.repo}
                              </a>
                            </div>
                          )}

                          {tool.npm && (
                            <div className="space-y-1">
                              <div className="text-xs font-bold text-green-400">📦 NPM:</div>
                              <a
                                href={tool.npm}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-black/40 border border-white/10 rounded p-2 font-mono text-xs text-green-400 hover:bg-black/50 hover:border-green-500/30 transition-all"
                              >
                                <ExternalLink size={12} />
                                {tool.npm?.split('/').pop()}
                              </a>
                            </div>
                          )}

                          {tool.config && (
                            <div className="space-y-1">
                              <div className="text-xs font-bold text-purple-400">⚙️ Configuración MCP:</div>
                              <div className="relative group/config">
                                <pre className="bg-black/40 border border-white/10 rounded p-2 pr-8 font-mono text-xs text-purple-300 overflow-x-auto whitespace-pre">
                                  {tool.config}
                                </pre>
                                <button
                                  onClick={() => handleCopy(tool.config, `config-${index}`)}
                                  className="absolute right-2 top-2 p-1 rounded bg-white/10 hover:bg-white/20 transition-all opacity-0 group-hover/config:opacity-100"
                                >
                                  {copiedIndex === `config-${index}` ? (
                                    <Check size={12} className="text-green-400" />
                                  ) : (
                                    <Copy size={12} className="text-white/60" />
                                  )}
                                </button>
                              </div>
                            </div>
                          )}

                          {tool.models && (
                            <div className="space-y-1">
                              <div className="text-xs font-bold text-yellow-400">🤖 Modelos:</div>
                              <div className="flex flex-wrap gap-1">
                                {tool.models.map((model, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/20 rounded text-xs text-yellow-300"
                                  >
                                    {model}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Nota */}
        <div className="relative z-10 mt-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-2">
          <p className="text-xs text-cyan-300/80">
            💡 Obtén tu API key en <a href="https://perplexity.ai" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-200">perplexity.ai</a>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default MCPToolsCard;
