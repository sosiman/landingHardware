import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import FavoriteButton from './FavoriteButton';

const VSCodeExtensionsCard = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const extensions = [
    { name: "Quokka.js", description: "Ver y ejecutar el código en tiempo real" },
    { name: "Codesnap", description: "Control+Shift+P y se activa en tu ventana. Corrige lo que subrayes" },
    { name: "Live Preview", description: "Vista previa en vivo de tu código" },
    { name: "Draw.io", description: "Extensión para visual donde puedes generar diagramas" },
    { name: "Supermaven", description: "IA que ayuda escribir código mucho más rápido" },
    { name: "Error Lens", description: "Errores aparecen directamente en el código" },
    { name: ".Env Selector", description: "Cambia entre múltiples entornos" },
    { name: "Autorenametag", description: "Renombra etiquetas automáticamente" },
    { name: "Code Snap", description: "Captura de pantalla de código" },
    { name: "Easy Icon Theme", description: "Temas de iconos personalizables" },
    { name: "Agent Mode", description: "Modo agente para Copilot en visual" },
    { name: "Json Flow", description: "Visualización de JSON" },
    { name: "JSON CRACK", description: "Click derecha arriba y visualiza el diagrama JSON" },
    { name: "Vibrancy Continued", description: "Hace VS Code transparente con efecto vibrancy" },
    { name: "BITO", description: "Asistente de IA para desarrollo" },
    { name: "Gemini CODE ASSIST", description: "Asistente de código con Gemini" },
    { name: "BLACK BOX", description: "Búsqueda de código fuente de GitHub" },
    { name: "CLINE", description: "Coloca el API del modelo que quieras usar" },
    { name: "Copilot GitHub", description: "Presiona CTRL + SHIFT + P" },
    { name: "Figure", description: "CTRL + SHIFT + P y busca 'new figure sketch'" },
    { name: "Filetree Pro", description: "Click derecho en archivos - Genera file tree con iconos" },
    { name: "Claude", description: "CTRL + SHIFT + P - Claude open new tab" },
  ];

  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7 }}
      viewport={{ once: false, margin: "-50px" }}
      className="relative col-span-1"
    >
      <div className="relative h-full glass-dark p-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group">
        {/* Efecto de brillo de fondo */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl" />

        {/* Header más compacto */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-2xl"
            >
              ⚙️
            </motion.div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
              VSCode Extensions
            </h3>
          </div>
        </div>

        {/* Contador de extensiones */}
        <div className="text-xs text-gray-400 mb-2">
          {extensions.length} extensiones recomendadas
        </div>

        {/* Lista scrollable más compacta */}
        <div className="relative max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
          <div className="space-y-0.5">
            {extensions.map((ext, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.005, duration: 0.2 }}
                viewport={{ once: true }}
                className="group/item relative"
              >
                <div className="flex items-start justify-between py-1.5 px-2 rounded-md hover:bg-white/5 transition-all duration-200 gap-2">
                  {/* Contenido */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-300 hover:text-white transition-colors duration-200 truncate">
                      {ext.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {ext.description}
                    </p>
                  </div>

                  {/* Botones */}
                  <div className="flex items-center gap-1 flex-shrink-0 mt-0.5">
                    <FavoriteButton
                      toolId={`vscode-${index}`}
                      toolName={ext.name}
                      toolUrl="#"
                      toolDesc={ext.description}
                      category="VS Code Extensions"
                    />
                    
                    {/* Botón de copiar más pequeño */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleCopy(ext.name, index)}
                      className="p-1 rounded-md bg-white/5 hover:bg-white/10 transition-all duration-200 opacity-0 group-hover/item:opacity-100"
                    >
                    <AnimatePresence mode="wait">
                      {copiedIndex === index ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Check size={12} className="text-green-400" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Copy size={12} className="text-gray-400 hover:text-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                  </div>
                </div>

                {/* Tooltip de copiado */}
                <AnimatePresence>
                  {copiedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute right-0 top-full mt-0.5 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-md backdrop-blur-sm z-10 whitespace-nowrap"
                    >
                      ¡Copiado!
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Indicador de scroll más pequeño */}
        <div className="absolute bottom-3 right-3 text-xs text-gray-500 opacity-60">
          ↓
        </div>

        {/* Efecto de brillo animado */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-white/5 to-transparent transform -skew-y-12 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VSCodeExtensionsCard;
