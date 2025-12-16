import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FavoriteButton from './FavoriteButton';

const WebBuildersCard = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const builders = [
    { name: "https://asidehq.com/ (responde preguntas en una ventana durante una reunión)", url: "https://asidehq.com/" },
    { name: "https://medo.dev/ (website, marketing, e-commerce, games, survey etc)", url: "https://medo.dev/" },
    { name: "https://10web.io/ (WordPress)", url: "https://10web.io/" },
    { name: "https://flames.blue/ (buena para crear embeds y te da el código con las imágenes listas)", url: "https://flames.blue/" },
    { name: "https://start.theopenbuilder.com/welcome/", url: "https://start.theopenbuilder.com/welcome/" },
    { name: "https://www.webild.io/", url: "https://www.webild.io/" },
    { name: "https://sleek.design/ (diseño de aplicaciones en minutos)", url: "https://sleek.design/" },
    { name: "https://bolt.new/", url: "https://bolt.new/" },
    { name: "https://agent.minimax.io/ (MCP variables de entorno, dashboard, webs, apps)", url: "https://agent.minimax.io/" },
    { name: "https://designspell.com/lander (diseñas tu propia web editando plantillas)", url: "https://designspell.com/lander" },
    { name: "https://getmocha.com/apps (plantillas para todo tipo de apps, portafolios)", url: "https://getmocha.com/apps" },
    { name: "https://claude.ai/code", url: "https://claude.ai/code" },
    { name: "https://chat.z.ai/ (GLM-4.5)", url: "https://chat.z.ai/" },
    { name: "https://manus.im/app", url: "https://manus.im/app" },
    { name: "https://chat.deepseek.com/", url: "https://chat.deepseek.com/" },
    { name: "https://www.kimi.com/", url: "https://www.kimi.com/" },
    { name: "https://www.cosmic.new/", url: "https://www.cosmic.new/" },
    { name: "https://cluely.com/ (Your AI assistant for meetings)", url: "https://cluely.com/" },
    { name: "https://pngimg.com/ (imágenes full calidad en PNG)", url: "https://pngimg.com/" },
    { name: "https://pstream.mov/ (pelis)", url: "https://pstream.mov/" },
    { name: "https://www.intangible.ai/ (crea y diseña mundos 3D y escenarios renderizados)", url: "https://www.intangible.ai/" },
    { name: "https://stackoverflow.ai/ (potente IA de código - muy nueva)", url: "https://stackoverflow.ai/" },
    { name: "https://chatgpt.com/es-ES/atlas/ (navegador inteligente para MAC OS)", url: "https://chatgpt.com/es-ES/atlas/" },
    { name: "https://hordes.io/ (juego en el navegador)", url: "https://hordes.io/" },
    { name: "https://latentbox.com/en (web con cientos de IAs ordenadas por categorías)", url: "https://latentbox.com/en" },
    { name: "https://x-minus.pro/ai (editor de canciones)", url: "https://x-minus.pro/ai" },
    { name: "https://riff.new/home (plataforma constructor de webs y apps)", url: "https://riff.new/home" },
    { name: "https://github.com/SkyworkAI/SkyReels-V2.git (crea videos en local con tu gráfica)", url: "https://github.com/SkyworkAI/SkyReels-V2" },
    { name: "https://stitch.withgoogle.com/?pli=1", url: "https://stitch.withgoogle.com/?pli=1" },
    { name: "https://kiro.dev/", url: "https://kiro.dev/" },
    { name: "https://github.com/features/spark", url: "https://github.com/features/spark" },
    { name: "Mgx.dev", url: "https://mgx.dev" },
    { name: "https://jules.google/ (agente)", url: "https://jules.google/" },
    { name: "https://ui2code.ai/", url: "https://ui2code.ai/" },
    { name: "https://diffusion.studio/", url: "https://diffusion.studio/" },
    { name: "https://scout.new/", url: "https://scout.new/" },
    { name: "Emergent.sh / App.emergent.sh", url: "https://emergent.sh" },
    { name: "Uxpilot.ai", url: "https://uxpilot.ai" },
    { name: "https://base44.com/", url: "https://base44.com/" },
    { name: "https://www.dora.run/ai (diseño 3D)", url: "https://www.dora.run/ai" },
    { name: "https://www.genspark.ai", url: "https://www.genspark.ai" },
    { name: "https://enzostvs-deepsite.hf.space/projects/new", url: "https://enzostvs-deepsite.hf.space/projects/new" },
    { name: "https://www.orchids.app/ (editable - full stack engineering)", url: "https://www.orchids.app/" },
    { name: "https://wegic.ai/es (editable)", url: "https://wegic.ai/es" },
    { name: "https://softgen.ai / https://sofgen.ai (arma todo el proyecto en vivo)", url: "https://softgen.ai" },
    { name: "https://ai.mobirise.com/ (editable con plantillas de ejemplo)", url: "https://ai.mobirise.com/" },
    { name: "Blink.new", url: "https://blink.new" },
    { name: "Bloom.diy (mobile app)", url: "https://bloom.diy" },
    { name: "https://www.builder.io/ (Ultima web con conexiones MCP)", url: "https://www.builder.io/" },
    { name: "https://reflex.dev/ (construye una web a partir de una imagen y conecta tu data para Dashboard)", url: "https://reflex.dev/" },
    { name: "Cursor (free for all students)", url: "https://cursor.sh" },
    { name: "Same.dev (copia cualquier web)", url: "https://same.dev" },
    { name: "Replit.com (constructor de web)", url: "https://replit.com" },
    { name: "Readdy.ai", url: "https://readdy.ai" },
    { name: "Magicloops.dev (crear apps y web con link y código QR - buscar app builder en panel izquierdo)", url: "https://magicloops.dev" },
    { name: "Infinityfree.com (host free)", url: "https://infinityfree.com" },
    { name: "Myninja.ai", url: "https://myninja.ai" },
    { name: "Testsprite.com", url: "https://testsprite.com" },
    { name: "Appalchemy.ai", url: "https://appalchemy.ai" },
    { name: "Rocket.new / https://www.rocket.new/ (agente)", url: "https://rocket.new" },
    { name: "https://rocketai.io/", url: "https://rocketai.io/" },
    { name: "Lovable (con nuevo modo agente)", url: "https://lovable.dev" },
    { name: "Von.dev (crea webs y conectas sheets para dashboard)", url: "https://von.dev" },
    { name: "Flowith.io", url: "https://flowith.io" },
    { name: "Rork.com", url: "https://rork.com" },
    { name: "Magicpatterns.com (puedes crear cualquier web, simulador, juego o app)", url: "https://magicpatterns.com" },
    { name: "https://aidark.net (build app)", url: "https://aidark.net" },
    { name: "https://trickle.so/", url: "https://trickle.so/" },
    { name: "https://bubble.io/ (build app)", url: "https://bubble.io/" },
    { name: "https://qoder.com/ (potente, desktop)", url: "https://qoder.com/" },
    { name: "https://firebase.studio/ (backend e infraestructura)", url: "https://firebase.studio/" },
    { name: "https://www.framer.com/ (editable al momento)", url: "https://www.framer.com/" },
    { name: "https://vibe-studio.ai/", url: "https://vibe-studio.ai/" },
    { name: "https://onepage.ai/", url: "https://onepage.ai/" },
    { name: "https://www.relume.io/ (diseño)", url: "https://www.relume.io/" },
    { name: "Jitter.video (animaciones para webs)", url: "https://jitter.video" },
    { name: "https://getmocha.com/", url: "https://getmocha.com/" },
  ];

  const handleCopy = async (text, index) => {
    // Extraer solo el nombre de la URL sin la descripción
    const urlOnly = text.split(' (')[0];
    
    try {
      await navigator.clipboard.writeText(urlOnly);
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
      <div className="relative h-full glass-dark-cream p-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group">
        {/* Efecto de brillo de fondo */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl" />

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
              🚀
            </motion.div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Constructores de Sitios Web con IA
            </h3>
          </div>
        </div>

        {/* Contador de recursos */}
        <div className="text-xs text-gray-400 mb-2">
          {builders.length} herramientas disponibles
        </div>

        {/* Lista scrollable más compacta */}
        <div className="relative max-h-[280px] overflow-y-auto overflow-x-hidden pr-1 custom-scrollbar">
          <div className="space-y-0.5">
            {builders.map((builder, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.005, duration: 0.2 }}
                viewport={{ once: true }}
                className="group/item relative"
              >
                <div className="flex items-start justify-between py-1.5 px-2 rounded-md hover:bg-white/5 transition-all duration-200 gap-2">
                  {/* Enlace */}
                  <a
                    href={builder.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-xs text-gray-300 hover:text-white transition-colors duration-200 break-words"
                  >
                    <span className="hover:text-green-400 transition-colors">
                      {builder.name}
                    </span>
                  </a>

                  {/* Botones */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <FavoriteButton
                      toolId={`builder-${index}`}
                      toolName={builder.name}
                      toolUrl={builder.url}
                      toolDesc=""
                      category="Web Builders"
                    />
                    
                    {/* Botón de copiar más pequeño */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleCopy(builder.name, index)}
                      className="p-1 rounded-md bg-white/5 hover:bg-white/10 transition-all duration-200 opacity-0 group-hover/item:opacity-100"
                    >
                    <AnimatePresence mode="wait">
                      {copiedIndex === index ? (
                        <motion.svg
                          key="check"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="w-3 h-3 text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </motion.svg>
                      ) : (
                        <motion.svg
                          key="copy"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="w-3 h-3 text-gray-400 hover:text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </motion.svg>
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
                      className="absolute right-0 top-full mt-0.5 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-md backdrop-blur-sm z-10"
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

export default WebBuildersCard;
