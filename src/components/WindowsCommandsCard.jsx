import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Copy, ExternalLink } from 'lucide-react';
import FavoriteButton from './FavoriteButton';

const WindowsCommandsCard = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Herramientas filtradas relacionadas con comandos, Windows y sistema operativo
  const windowsTools = [
    {
      name: "Donde.com",
      url: "https://donde.com",
      description: "Programa para recuperar archivos borrados de un disco o USB",
      category: "Recuperación"
    },
    {
      name: "MassGrave",
      url: "https://massgrave.dev/",
      description: "Múltiples formas de activar Windows y Office",
      category: "Activación"
    },
    {
      name: "Control de Usuarios",
      command: "netplwiz",
      description: "Control de usuarios y grupos (agregar, quitar)",
      category: "Usuarios"
    },
    {
      name: "Herramienta de Eliminación de Software Malintencionado",
      command: "mrt",
      description: "Escaneo de virus rápido integrado en Windows",
      category: "Seguridad"
    },
    {
      name: "Administrador de Discos",
      command: "diskmgmt.msc",
      description: "Administrar particiones, formatear discos y asignar letras de unidad",
      category: "Almacenamiento"
    },
    {
      name: "Administrador de Dispositivos",
      command: "devmgmt.msc",
      description: "Ver y administrar hardware, actualizar drivers y resolver conflictos",
      category: "Hardware"
    },
    {
      name: "Información del Sistema",
      command: "msinfo32",
      description: "Información detallada del hardware, software y componentes del sistema",
      category: "Sistema"
    },
    {
      name: "Servicios de Windows",
      command: "services.msc",
      description: "Administrar servicios del sistema (iniciar, detener, configurar)",
      category: "Servicios"
    },
    {
      name: "Carpeta de Aplicaciones",
      command: "shell:Appsfolder",
      description: "Acceso directo a todas las aplicaciones instaladas",
      category: "Apps"
    },
    {
      name: "Editor de Registro",
      command: "regedit",
      description: "Modificar configuración avanzada del registro de Windows",
      category: "Registro"
    },
    {
      name: "Propiedades del Sistema",
      command: "sysdm.cpl",
      description: "Configurar nombre del equipo, dominio, hardware y variables de entorno",
      category: "Sistema"
    },
    {
      name: "Programas y Características",
      command: "appwiz.cpl",
      description: "Desinstalar o cambiar programas instalados",
      category: "Programas"
    },
    {
      name: "Prefetch",
      command: "prefetch",
      description: "Carpeta con datos de inicio rápido de aplicaciones (limpiar para optimizar)",
      category: "Optimización"
    },
    {
      name: "Archivos Temporales",
      command: "%temp%",
      description: "Carpeta de archivos temporales (puedes eliminar para liberar espacio)",
      category: "Limpieza"
    },
    {
      name: "Visor de Eventos",
      command: "eventvwr.msc",
      description: "Ver registros de eventos, errores y advertencias del sistema",
      category: "Logs"
    },
    {
      name: "Propiedades Avanzadas",
      command: "SystemPropertiesAdvanced",
      description: "Configuración avanzada: rendimiento, variables de entorno, inicio",
      category: "Avanzado"
    },
    {
      name: "Configuración del Sistema",
      command: "msconfig",
      description: "Administrar inicio de Windows, servicios y opciones de arranque",
      category: "Arranque"
    },
    {
      name: "Entrar en BIOS",
      command: "shutdown /r /fw /t 1",
      description: "Reiniciar y entrar directamente en BIOS/UEFI",
      category: "BIOS"
    },
    {
      name: "Reparador de Windows",
      command: "DISM /online /cleanup-image /restorehealth",
      description: "Repara archivos del sistema Windows dañados",
      category: "Mantenimiento"
    },
    {
      name: "Verificar Integridad",
      command: "sfc /scannow",
      description: "Escanear y reparar archivos protegidos del sistema",
      category: "Mantenimiento"
    },
    {
      name: "Conexiones de Red",
      command: "NCPA.CPL",
      description: "Abrir panel de conexiones de red",
      category: "Red"
    },
    {
      name: "Archivos Recientes",
      command: "shell:recent",
      description: "Lista archivos y apps abiertos recientemente",
      category: "Acceso Rápido"
    },
    {
      name: "Saltar WiFi en Instalación",
      description: "Atajo de teclado: SHIFT + F10, luego escribe el comando",
      command: "ms-cxh:localonly",
      category: "Instalación"
    },
    {
      name: "Saltar Cuenta Microsoft",
      description: "Atajo de teclado: SHIFT + F10, luego escribe el comando en instalación",
      command: "OOBE\\BYPASSNRO",
      category: "Instalación"
    },
    {
      name: "BypassNRO - Esquipear Internet",
      commands: [
        { label: "Paso 1: Abrir CMD", cmd: "Shift + Fn + F10", noCopy: true },
        { label: "Paso 2", cmd: "cd oobe" },
        { label: "Paso 3", cmd: "BypassNRO" },
        { label: "Comandos completos", cmd: "cd oobe\nBypassNRO" }
      ],
      description: "Saltarse el requisito de Internet al instalar Windows 11 - Presiona Shift+Fn+F10 para abrir CMD primero",
      category: "Instalación"
    },
    {
      name: "Windows Sandbox",
      description: "Máquina virtual integrada en Windows - Presiona Windows + R y escribe el comando",
      command: "Windows Sandbox",
      category: "Virtualización"
    },
    {
      name: "Sistema Operativo Chrome",
      description: "Descargar herramienta de recuperación (extensión) - buscar Google Chrome OS FLEX",
      category: "Sistema Operativo"
    },
    {
      name: "SDI-Tool.org",
      url: "https://sdi-tool.org",
      description: "Controladores y drivers para cualquier ordenador",
      category: "Drivers"
    },
    {
      name: "RustDesk",
      url: "https://rustdesk.com",
      description: "Igual a AnyDesk pero puedes configurar usuario para escritorio remoto",
      category: "Remoto"
    },
    {
      name: "Prueba de Rendimiento",
      url: "https://cznull.github.io/vsbm",
      description: "Prueba el rendimiento de tu PC en el navegador",
      category: "Benchmark"
    },
    {
      name: "Windows 8 en vivo",
      url: "https://mitchivin.com/",
      description: "Windows 8 corriendo en navegador web",
      category: "Web"
    },
    {
      name: "Wintoys",
      description: "App de Microsoft Store para controlar todo el PC",
      category: "Utilidades"
    },
    {
      name: "Puter.com",
      url: "https://puter.com",
      description: "Sistema operativo que corre en tu navegador",
      category: "Web"
    },
    {
      name: "Windhawk",
      url: "https://windhawk.net",
      description: "Better file explorer - mejorar explorador de archivos",
      category: "Utilidades"
    },
    {
      name: "Warp 2.0",
      url: "https://mouredev.link/warp",
      description: "Terminal moderna para desarrolladores",
      category: "Terminal"
    },
    {
      name: "VibeCode Terminal",
      url: "https://www.vibecodeapp.com/terminal",
      description: "Terminal con Claude, Codex y Gemini integrados",
      category: "Terminal"
    }
  ];

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7 }}
      viewport={{ once: false, margin: "-50px" }}
      className="relative col-span-1"
    >
      <div className="relative h-full glass-dark p-4 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 group">
        {/* Efecto de brillo de fondo */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl" />

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Terminal className="text-blue-400" size={24} />
            </motion.div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
              Comandos Windows
            </h3>
          </div>
        </div>

        {/* Contador */}
        <div className="text-xs text-gray-400 mb-3">
          {windowsTools.length} comandos y herramientas de sistema
        </div>

        {/* Lista scrollable */}
        <div className="relative max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
          <div className="space-y-1">
            <AnimatePresence mode="popLayout">
              {windowsTools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.2 }}
                  className="group/item relative"
                >
                  <div className="flex flex-col py-2 px-2 rounded-md hover:bg-white/5 transition-all duration-200 gap-1">
                    {/* Título y botones */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-gray-200 truncate">
                          {tool.name}
                        </h4>
                      </div>
                      
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {/* Botón de favoritos */}
                        <FavoriteButton
                          toolId={`windows-${index}`}
                          toolName={tool.name}
                          toolUrl={tool.url || tool.command}
                          toolDesc={tool.description}
                          category={tool.category}
                        />
                        
                        {/* Botón copiar comando */}
                        {tool.command && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleCopy(tool.command, index)}
                            className="p-1.5 rounded-md bg-blue-500/10 hover:bg-blue-500/20 transition-all duration-200"
                            title="Copiar comando"
                          >
                            {copiedIndex === index ? (
                              <span className="text-[10px] text-green-400">✓</span>
                            ) : (
                              <Copy size={12} className="text-blue-400" />
                            )}
                          </motion.button>
                        )}
                        
                        {/* Botón abrir URL */}
                        {tool.url && (
                          <motion.a
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-1.5 rounded-md bg-cyan-500/10 hover:bg-cyan-500/20 transition-all duration-200"
                            title="Abrir enlace"
                          >
                            <ExternalLink size={12} className="text-cyan-400" />
                          </motion.a>
                        )}
                      </div>
                    </div>

                    {/* Comando si existe */}
                    {tool.command && (
                      <div className="bg-black/30 rounded px-2 py-1 font-mono text-[10px] text-green-400 overflow-x-auto whitespace-nowrap custom-scrollbar">
                        {tool.command}
                      </div>
                    )}

                    {/* Múltiples comandos si existen */}
                    {tool.commands && (
                      <div className="space-y-1">
                        {tool.commands.map((cmd, cmdIndex) => (
                          <div key={cmdIndex} className="flex items-center gap-2">
                            <div className="flex-1 bg-black/30 rounded px-2 py-1 font-mono text-[10px] text-green-400 overflow-x-auto whitespace-pre-wrap">
                              <span className="text-gray-400">{cmd.label}:</span> {cmd.cmd}
                            </div>
                            {!cmd.noCopy && (
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleCopy(cmd.cmd, `${index}-${cmdIndex}`)}
                                className="p-1 rounded-md bg-blue-500/10 hover:bg-blue-500/20 transition-all flex-shrink-0"
                                title="Copiar"
                              >
                                {copiedIndex === `${index}-${cmdIndex}` ? (
                                  <span className="text-[10px] text-green-400">✓</span>
                                ) : (
                                  <Copy size={10} className="text-blue-400" />
                                )}
                              </motion.button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Descripción */}
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {tool.description}
                    </p>

                    {/* Categoría */}
                    <span className="inline-block self-start px-2 py-0.5 text-[10px] bg-blue-500/20 text-blue-400 rounded-full">
                      {tool.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Efecto de brillo animado */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-blue-500/5 to-transparent transform -skew-y-12 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WindowsCommandsCard;
