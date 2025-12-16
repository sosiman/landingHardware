import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ChevronDown } from 'lucide-react';

const MCPCLIWindow = () => {
  const [copiedCommand, setCopiedCommand] = useState(null);
  const [openSection, setOpenSection] = useState(null);

  const commands = [
    { id: 'install', text: 'npm install @aws-sdk/client-bedrock' },
  ];

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

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
          <span className="text-xs font-mono text-white font-bold">MCP - AWS MCP</span>
        </div>

        {/* Contenido con altura fija y scroll */}
        <div className="p-3 space-y-3 text-xs overflow-y-auto custom-scrollbar flex-1">
          {/* Instalación AWS SDK */}
          <div>
            <p className="font-semibold text-gray-300 mb-2">Instalar AWS SDK:</p>
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
          </div>

          {/* Configuración AWS - Desplegable */}
          <div className="border border-white/10 rounded-lg overflow-hidden bg-black/20">
            <button
              onClick={() => toggleSection('config')}
              className="w-full px-3 py-2 flex items-center justify-between hover:bg-white/5 transition-all"
            >
              <span className="font-semibold text-gray-300">1. Configuración Inicial AWS</span>
              <motion.div
                animate={{ rotate: openSection === 'config' ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} className="text-gray-400" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {openSection === 'config' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-3 pt-1 space-y-3 border-t border-white/5">
                    {/* Variables de Entorno */}
                    <div>
                      <p className="font-semibold text-cyan-400 mb-2">1.1 Variables de Entorno en Windows</p>
                      <p className="text-gray-400 mb-2 text-[10px]">Panel de Control → Sistema → Configuración avanzada → Variables de entorno</p>
                      <div className="space-y-1">
                        <div className="bg-black/40 rounded p-1.5 font-mono text-[10px] text-yellow-400">
                          AWS_ACCESS_KEY_ID = <span className="text-gray-500">[tu_access_key]</span>
                        </div>
                        <div className="bg-black/40 rounded p-1.5 font-mono text-[10px] text-yellow-400">
                          AWS_SECRET_ACCESS_KEY = <span className="text-gray-500">[tu_secret_key]</span>
                        </div>
                        <div className="bg-black/40 rounded p-1.5 font-mono text-[10px] text-yellow-400">
                          AWS_SESSION_TOKEN = <span className="text-gray-500">[tu_session_token]</span>
                        </div>
                      </div>
                    </div>

                    {/* Configurar AWS CLI */}
                    <div>
                      <p className="font-semibold text-cyan-400 mb-2">1.2 Configurar AWS CLI en PowerShell</p>
                      
                      <div className="space-y-2">
                        <div>
                          <p className="text-gray-400 text-[10px] mb-1">Iniciar configuración AWS:</p>
                          <div className="group/cmd bg-black/40 rounded p-1.5 border border-white/5 font-mono text-[10px] text-green-400 flex items-center justify-between gap-2 hover:border-white/10 transition-all">
                            <span>aws configure</span>
                            <button
                              onClick={() => handleCopy('aws configure', 'aws-config')}
                              className="opacity-0 group-hover/cmd:opacity-100 transition-all p-1 rounded hover:bg-white/10 flex-shrink-0"
                            >
                              {copiedCommand === 'aws-config' ? (
                                <Check size={12} className="text-green-400" />
                              ) : (
                                <Copy size={12} className="text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <p className="text-gray-400 text-[10px] mb-1">Configurar credenciales:</p>
                          <div className="space-y-1">
                            <div className="group/cmd bg-black/40 rounded p-1.5 border border-white/5 font-mono text-[10px] text-green-400 flex items-center justify-between gap-2 hover:border-white/10 transition-all">
                              <span className="break-all">aws configure set aws_access_key_id [tu_key]</span>
                              <button
                                onClick={() => handleCopy('aws configure set aws_access_key_id', 'set-key')}
                                className="opacity-0 group-hover/cmd:opacity-100 transition-all p-1 rounded hover:bg-white/10 flex-shrink-0"
                              >
                                {copiedCommand === 'set-key' ? (
                                  <Check size={12} className="text-green-400" />
                                ) : (
                                  <Copy size={12} className="text-gray-400" />
                                )}
                              </button>
                            </div>
                            <div className="group/cmd bg-black/40 rounded p-1.5 border border-white/5 font-mono text-[10px] text-green-400 flex items-center justify-between gap-2 hover:border-white/10 transition-all">
                              <span className="break-all">aws configure set aws_secret_access_key [tu_secret]</span>
                              <button
                                onClick={() => handleCopy('aws configure set aws_secret_access_key', 'set-secret')}
                                className="opacity-0 group-hover/cmd:opacity-100 transition-all p-1 rounded hover:bg-white/10 flex-shrink-0"
                              >
                                {copiedCommand === 'set-secret' ? (
                                  <Check size={12} className="text-green-400" />
                                ) : (
                                  <Copy size={12} className="text-gray-400" />
                                )}
                              </button>
                            </div>
                            <div className="group/cmd bg-black/40 rounded p-1.5 border border-white/5 font-mono text-[10px] text-green-400 flex items-center justify-between gap-2 hover:border-white/10 transition-all">
                              <span className="break-all">aws configure set aws_session_token [tu_token]</span>
                              <button
                                onClick={() => handleCopy('aws configure set aws_session_token', 'set-token')}
                                className="opacity-0 group-hover/cmd:opacity-100 transition-all p-1 rounded hover:bg-white/10 flex-shrink-0"
                              >
                                {copiedCommand === 'set-token' ? (
                                  <Check size={12} className="text-green-400" />
                                ) : (
                                  <Copy size={12} className="text-gray-400" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="bg-purple-500/10 border border-purple-500/20 rounded p-1.5">
                          <p className="text-purple-300 text-[10px]">Region: <span className="text-purple-400 font-mono">us-east-1</span></p>
                          <p className="text-purple-300 text-[10px]">Output format: <span className="text-purple-400 font-mono">json</span></p>
                        </div>

                        <div>
                          <p className="text-gray-400 text-[10px] mb-1">Verificar que funciona:</p>
                          <div className="group/cmd bg-black/40 rounded p-1.5 border border-white/5 font-mono text-[10px] text-green-400 flex items-center justify-between gap-2 hover:border-white/10 transition-all">
                            <span>aws sts get-caller-identity</span>
                            <button
                              onClick={() => handleCopy('aws sts get-caller-identity', 'verify')}
                              className="opacity-0 group-hover/cmd:opacity-100 transition-all p-1 rounded hover:bg-white/10 flex-shrink-0"
                            >
                              {copiedCommand === 'verify' ? (
                                <Check size={12} className="text-green-400" />
                              ) : (
                                <Copy size={12} className="text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Configuración Claude Desktop - JSON Listo para Uso */}
          <div className="border border-white/10 rounded-lg overflow-hidden bg-black/20">
            <button
              onClick={() => toggleSection('claude')}
              className="w-full px-3 py-2 flex items-center justify-between hover:bg-white/5 transition-all"
            >
              <span className="font-semibold text-gray-300">2. JSON Listo para Uso</span>
              <motion.div
                animate={{ rotate: openSection === 'claude' ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} className="text-gray-400" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {openSection === 'claude' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-3 pt-1 space-y-2 border-t border-white/5">
                    <div>
                      <p className="text-gray-400 text-[10px] mb-1">Ubicación del archivo:</p>
                      <div className="group/cmd bg-black/40 rounded p-1.5 border border-white/5 font-mono text-[10px] text-cyan-400 flex items-center justify-between gap-2 hover:border-white/10 transition-all">
                        <span className="break-all">C:\Users\codex\AppData\Roaming\Claude\claude_desktop_config.json</span>
                        <button
                          onClick={() => handleCopy('C:\\Users\\codex\\AppData\\Roaming\\Claude\\claude_desktop_config.json', 'path')}
                          className="opacity-0 group-hover/cmd:opacity-100 transition-all p-1 rounded hover:bg-white/10 flex-shrink-0"
                        >
                          {copiedCommand === 'path' ? (
                            <Check size={12} className="text-green-400" />
                          ) : (
                            <Copy size={12} className="text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-400 text-[10px] mb-1">Configuración JSON Completa:</p>
                      <div className="relative group/json">
                        <div className="bg-black/40 rounded p-2 border border-white/5 font-mono text-[10px] text-gray-300 overflow-x-auto max-h-[200px] overflow-y-auto custom-scrollbar">
                          <pre className="text-[9px]">{`{
  "mcpServers": {
    "aws-api-mcp-server": {
      "command": "C:/Users/codex/.local/bin/uvx.exe",
      "args": [
        "awslabs.aws-api-mcp-server@latest"
      ],
      "env": {
        "AWS_REGION": "us-east-1"
      }
    }
  },
  "preferences": {
    "menuBarEnabled": true
  }
}`}</pre>
                        </div>
                        <button
                          onClick={() => handleCopy(`{
  "mcpServers": {
    "aws-api-mcp-server": {
      "command": "C:/Users/codex/.local/bin/uvx.exe",
      "args": [
        "awslabs.aws-api-mcp-server@latest"
      ],
      "env": {
        "AWS_REGION": "us-east-1"
      }
    }
  },
  "preferences": {
    "menuBarEnabled": true
  }
}`, 'json-ready')}
                          className="absolute top-2 right-2 opacity-0 group-hover/json:opacity-100 transition-all p-1.5 rounded bg-white/10 hover:bg-white/20"
                        >
                          {copiedCommand === 'json-ready' ? (
                            <Check size={12} className="text-green-400" />
                          ) : (
                            <Copy size={12} className="text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* JSON Genérico Documentación */}
          <div className="border border-white/10 rounded-lg overflow-hidden bg-black/20">
            <button
              onClick={() => toggleSection('json-generic')}
              className="w-full px-3 py-2 flex items-center justify-between hover:bg-white/5 transition-all"
            >
              <span className="font-semibold text-gray-300">3. JSON Genérico Documentación</span>
              <motion.div
                animate={{ rotate: openSection === 'json-generic' ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} className="text-gray-400" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {openSection === 'json-generic' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-3 pt-1 space-y-2 border-t border-white/5">
                    <div className="relative group/json">
                      <div className="bg-black/40 rounded p-2 border border-white/5 font-mono text-[10px] text-gray-300 overflow-x-auto max-h-[200px] overflow-y-auto custom-scrollbar">
                        <pre className="text-[9px]">{`{
  "mcpServers": {
    "awslabs.aws-api-mcp-server": {
      "command": "uvx",
      "args": [
        "--from",
        "awslabs.aws-api-mcp-server@latest",
        "awslabs.aws-api-mcp-server.exe"
      ],
      "env": {
        "AWS_REGION": "us-east-1"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}`}</pre>
                      </div>
                      <button
                        onClick={() => handleCopy(`{
  "mcpServers": {
    "awslabs.aws-api-mcp-server": {
      "command": "uvx",
      "args": [
        "--from",
        "awslabs.aws-api-mcp-server@latest",
        "awslabs.aws-api-mcp-server.exe"
      ],
      "env": {
        "AWS_REGION": "us-east-1"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}`, 'json-generic')}
                        className="absolute top-2 right-2 opacity-0 group-hover/json:opacity-100 transition-all p-1.5 rounded bg-white/10 hover:bg-white/20"
                      >
                        {copiedCommand === 'json-generic' ? (
                          <Check size={12} className="text-green-400" />
                        ) : (
                          <Copy size={12} className="text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Variables de Entorno del Sistema - Desplegable */}
          <div className="border border-white/10 rounded-lg overflow-hidden bg-black/20">
            <button
              onClick={() => toggleSection('path')}
              className="w-full px-3 py-2 flex items-center justify-between hover:bg-white/5 transition-all"
            >
              <span className="font-semibold text-gray-300">4. Agregar a PATH del Sistema</span>
              <motion.div
                animate={{ rotate: openSection === 'path' ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} className="text-gray-400" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {openSection === 'path' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-3 pt-1 space-y-2 border-t border-white/5">
                    <p className="text-gray-400 text-[10px]">Variables de entorno del sistema → Path → Agregar:</p>
                    <div className="group/cmd bg-black/40 rounded p-1.5 border border-white/5 font-mono text-[10px] text-yellow-400 flex items-center justify-between gap-2 hover:border-white/10 transition-all">
                      <span>C:\Users\codex\.local\bin</span>
                      <button
                        onClick={() => handleCopy('C:\\Users\\codex\\.local\\bin', 'add-path')}
                        className="opacity-0 group-hover/cmd:opacity-100 transition-all p-1 rounded hover:bg-white/10 flex-shrink-0"
                      >
                        {copiedCommand === 'add-path' ? (
                          <Check size={12} className="text-green-400" />
                        ) : (
                          <Copy size={12} className="text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MCPCLIWindow;
