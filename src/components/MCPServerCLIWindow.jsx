import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ChevronDown, Server, Plug, Terminal, Shield } from 'lucide-react';

const MCPServerCLIWindow = () => {
  const [copiedCommand, setCopiedCommand] = useState(null);
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleCopy = (commandText, commandId) => {
    navigator.clipboard.writeText(commandText);
    setCopiedCommand(commandId);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const CopyButton = ({ text, id }) => (
    <button
      onClick={() => handleCopy(text, id)}
      className="opacity-0 group-hover/cmd:opacity-100 transition-all p-1 rounded hover:bg-white/10 flex-shrink-0"
    >
      {copiedCommand === id ? (
        <Check size={12} className="text-green-400" />
      ) : (
        <Copy size={12} className="text-gray-400" />
      )}
    </button>
  );

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
          <span className="text-xs font-mono text-white font-bold flex items-center gap-2">
            <Server size={14} className="text-cyan-400" />
            MCP SERVER - Conectar a Ubuntu
          </span>
        </div>

        {/* Contenido con altura fija y scroll */}
        <div className="p-3 space-y-2 text-xs overflow-y-auto custom-scrollbar flex-1">
          
          {/* Título y objetivo */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-lg p-2">
            <p className="text-cyan-300 font-semibold text-[11px] flex items-center gap-1">
              <Plug size={12} /> Conectar MCP (Roo Code) a tu Servidor Ubuntu
            </p>
            <p className="text-gray-400 text-[10px] mt-1">
              Dale a la IA control total sobre archivos y Docker de tu servidor remoto usando VS Code.
            </p>
          </div>

          {/* 1. Preparar el Entorno (VS Code) */}
          <div className="border border-white/10 rounded-lg overflow-hidden bg-black/20">
            <button
              onClick={() => toggleSection('vscode')}
              className="w-full px-3 py-2 flex items-center justify-between hover:bg-white/5 transition-all"
            >
              <span className="font-semibold text-gray-300 flex items-center gap-2">
                <span className="text-cyan-400">1.</span> Preparar el Entorno (VS Code)
              </span>
              <motion.div
                animate={{ rotate: openSection === 'vscode' ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} className="text-gray-400" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {openSection === 'vscode' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-3 pt-1 space-y-2 border-t border-white/5">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 font-bold">1.</span>
                        <p className="text-gray-300 text-[10px]">
                          Instala la extensión <span className="text-cyan-400 font-semibold">Remote - SSH</span> en VS Code
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 font-bold">2.</span>
                        <p className="text-gray-300 text-[10px]">
                          Conéctate a tu servidor: Click en el icono <span className="text-yellow-400 font-mono">{"><"}</span> (esquina inferior izquierda) → Connect to Host
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 font-bold">3.</span>
                        <p className="text-gray-300 text-[10px]">
                          Una vez dentro <span className="text-green-400">(caja verde SSH)</span>, instala la extensión <span className="text-purple-400 font-semibold">Roo Code</span> (o Cline)
                        </p>
                      </div>
                      
                      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-2 mt-2">
                        <p className="text-yellow-300 text-[10px]">
                          ⚠️ <span className="font-semibold">Importante:</span> Primero conecta en VS Code. Después podrás abrir AntiGravity IDE y presionar <span className="font-mono bg-black/30 px-1 rounded">F1</span> → Connect SSH
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 2. Preparar el Servidor (Terminal) */}
          <div className="border border-white/10 rounded-lg overflow-hidden bg-black/20">
            <button
              onClick={() => toggleSection('server')}
              className="w-full px-3 py-2 flex items-center justify-between hover:bg-white/5 transition-all"
            >
              <span className="font-semibold text-gray-300 flex items-center gap-2">
                <span className="text-cyan-400">2.</span> Preparar el Servidor (Terminal)
              </span>
              <motion.div
                animate={{ rotate: openSection === 'server' ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} className="text-gray-400" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {openSection === 'server' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-3 pt-1 space-y-2 border-t border-white/5">
                    <p className="text-gray-400 text-[10px]">
                      La IA necesita Node.js para ejecutar el protocolo MCP. Abre la terminal <span className="font-mono bg-black/30 px-1 rounded">Ctrl + ñ</span> y ejecuta:
                    </p>
                    <div className="group/cmd bg-black/40 rounded p-2 border border-white/5 font-mono text-[10px] text-green-400 flex items-center justify-between gap-2 hover:border-white/10 transition-all">
                      <span className="break-all">sudo apt update && sudo apt install -y nodejs npm</span>
                      <CopyButton text="sudo apt update && sudo apt install -y nodejs npm" id="nodejs" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. Configurar el "Cerebro" (JSON) */}
          <div className="border border-white/10 rounded-lg overflow-hidden bg-black/20">
            <button
              onClick={() => toggleSection('json')}
              className="w-full px-3 py-2 flex items-center justify-between hover:bg-white/5 transition-all"
            >
              <span className="font-semibold text-gray-300 flex items-center gap-2">
                <span className="text-cyan-400">3.</span> Configurar el "Cerebro" (JSON)
              </span>
              <motion.div
                animate={{ rotate: openSection === 'json' ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} className="text-gray-400" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {openSection === 'json' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-3 pt-1 space-y-2 border-t border-white/5">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 font-bold">1.</span>
                        <p className="text-gray-300 text-[10px]">
                          Abre Roo Code y haz clic en el icono <span className="text-purple-400">MCP Servers</span> (el enchufe 🔌)
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 font-bold">2.</span>
                        <p className="text-gray-300 text-[10px]">
                          Selecciona <span className="text-cyan-400">"Edit Global MCP Settings"</span>
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 font-bold">3.</span>
                        <p className="text-gray-300 text-[10px]">
                          Pega el siguiente código en el archivo <span className="font-mono text-yellow-400">.json</span>:
                        </p>
                      </div>
                    </div>
                    
                    <div className="relative group/json">
                      <div className="bg-black/40 rounded p-2 border border-white/5 font-mono text-[9px] text-gray-300 overflow-x-auto max-h-[150px] overflow-y-auto custom-scrollbar">
                        <pre>{`{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/home/tu_usuario",
        "/var/lib/docker"
      ]
    }
  }
}`}</pre>
                      </div>
                      <button
                        onClick={() => handleCopy(`{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/home/tu_usuario",
        "/var/lib/docker"
      ]
    }
  }
}`, 'mcp-json')}
                        className="absolute top-2 right-2 opacity-0 group-hover/json:opacity-100 transition-all p-1.5 rounded bg-white/10 hover:bg-white/20"
                      >
                        {copiedCommand === 'mcp-json' ? (
                          <Check size={12} className="text-green-400" />
                        ) : (
                          <Copy size={12} className="text-gray-400" />
                        )}
                      </button>
                    </div>
                    
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded p-2">
                      <p className="text-blue-300 text-[10px]">
                        📝 <span className="font-semibold">Nota:</span> Cambia <span className="font-mono text-yellow-400">/home/tu_usuario</span> por tu usuario real, ej: <span className="font-mono text-green-400">/home/sosi</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 4. Control Total de Docker */}
          <div className="border border-white/10 rounded-lg overflow-hidden bg-black/20">
            <button
              onClick={() => toggleSection('docker')}
              className="w-full px-3 py-2 flex items-center justify-between hover:bg-white/5 transition-all"
            >
              <span className="font-semibold text-gray-300 flex items-center gap-2">
                <span className="text-cyan-400">4.</span> 🐳 Tip Pro: Control Total de Docker
              </span>
              <motion.div
                animate={{ rotate: openSection === 'docker' ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} className="text-gray-400" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {openSection === 'docker' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-3 pt-1 space-y-2 border-t border-white/5">
                    <p className="text-gray-400 text-[10px]">
                      Para que la IA pueda controlar Docker <span className="text-green-400 font-semibold">sin pedir contraseña</span>, ejecuta esto una vez en la terminal:
                    </p>
                    <div className="group/cmd bg-black/40 rounded p-2 border border-white/5 font-mono text-[10px] text-green-400 flex items-center justify-between gap-2 hover:border-white/10 transition-all">
                      <span>sudo usermod -aG docker $USER</span>
                      <CopyButton text="sudo usermod -aG docker $USER" id="docker-group" />
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded p-2">
                      <p className="text-purple-300 text-[10px]">
                        💡 Después de ejecutar, <span className="font-semibold">cierra sesión y vuelve a entrar</span> para aplicar los cambios.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 5. Quitar contraseña a usuario principal */}
          <div className="border border-white/10 rounded-lg overflow-hidden bg-black/20">
            <button
              onClick={() => toggleSection('nopasswd')}
              className="w-full px-3 py-2 flex items-center justify-between hover:bg-white/5 transition-all"
            >
              <span className="font-semibold text-gray-300 flex items-center gap-2">
                <span className="text-cyan-400">5.</span>
                <Shield size={12} className="text-red-400" />
                Acceso total sin sudo (Opcional)
              </span>
              <motion.div
                animate={{ rotate: openSection === 'nopasswd' ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} className="text-gray-400" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {openSection === 'nopasswd' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-3 pt-1 space-y-2 border-t border-white/5">
                    <div className="bg-red-500/10 border border-red-500/20 rounded p-2">
                      <p className="text-red-300 text-[10px]">
                        ⚠️ <span className="font-semibold">Advertencia:</span> Esto permite ejecutar comandos sudo sin contraseña. Solo usar en servidores de desarrollo.
                      </p>
                    </div>
                    
                    <p className="text-gray-400 text-[10px]">
                      Dar acceso total a tu usuario sin pedir contraseña en el servidor:
                    </p>
                    
                    <div className="space-y-1">
                      <p className="text-gray-300 text-[10px]">Ejecuta este comando (cambia <span className="text-yellow-400">sosi</span> por tu usuario):</p>
                      <div className="group/cmd bg-black/40 rounded p-2 border border-white/5 font-mono text-[10px] text-green-400 flex items-center justify-between gap-2 hover:border-white/10 transition-all">
                        <span className="break-all">echo "sosi ALL=(ALL) NOPASSWD: ALL" | sudo tee /etc/sudoers.d/sosi-nopasswd</span>
                        <CopyButton text='echo "sosi ALL=(ALL) NOPASSWD: ALL" | sudo tee /etc/sudoers.d/sosi-nopasswd' id="nopasswd" />
                      </div>
                    </div>
                    
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded p-2">
                      <p className="text-blue-300 text-[10px]">
                        💡 Cambia <span className="font-mono text-yellow-400">sosi</span> por tu nombre de usuario en ambos lugares del comando.
                      </p>
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

export default MCPServerCLIWindow;
