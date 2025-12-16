import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FavoriteButton from './FavoriteButton';

const LibrariesCard = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const libraries = [
    { name: "Scrollytelling - Basement Studio", url: "https://github.com/basementstudio/scrollytelling" },
    { name: "Hubdev.tools", url: "https://www.hubdev.tools/" },
    { name: "Scrollytelling.basement.studio", url: "https://scrollytelling.basement.studio/" },
    { name: "React.email", url: "https://react.email/" },
    { name: "StyleX - Facebook", url: "https://github.com/facebook/stylex" },
    { name: "Stylexjs.com", url: "https://stylexjs.com/" },
    { name: "SVG.designcode.io", url: "https://svg.designcode.io" },
    { name: "Animate-ui.com", url: "https://animate-ui.com/" },
    { name: "Wigggle UI - widgets", url: "https://github.com/wigggle-ui/ui" },
    { name: "CodePen - ygnanil", url: "https://codepen.io/ygnanil/pen/zxGErbg" },
    { name: "Xsgames.co/animatiss", url: "https://xsgames.co/animatiss" },
    { name: "Svgl.app", url: "https://svgl.app" },
    { name: "Svgs.app", url: "https://svgs.app" },
    { name: "Spoiler.js", url: "https://spoiler.js.org" },
    { name: "Easingwizard.com", url: "https://easingwizard.com" },
    { name: "Ui.Aceternity.com", url: "https://ui.aceternity.com" },
    { name: "Ui.shadcn.com", url: "https://ui.shadcn.com" },
    { name: "Lightswind.com", url: "https://lightswind.com/" },
    { name: "Rive.app", url: "https://rive.app" },
    { name: "21st.dev", url: "https://21st.dev" },
    { name: "Shadcn.com", url: "https://shadcn.com" },
    { name: "Scrollxui.dev", url: "https://scrollxui.dev" },
    { name: "Devtools.tech", url: "https://devtools.tech" },
    { name: "Divjoy.com", url: "https://divjoy.com" },
    { name: "Hyperui.dev", url: "https://hyperui.dev" },
    { name: "Loading.io", url: "https://loading.io" },
    { name: "Antlii.work", url: "https://antlii.work" },
    { name: "Github.com/uidotdev/usehooks", url: "https://github.com/uidotdev/usehooks" },
    { name: "Unicorn.studio", url: "https://www.unicorn.studio/" },
    { name: "Magicui.design", url: "https://magicui.design" },
    { name: "Dora.run", url: "https://dora.run" },
    { name: "Templyo.io", url: "https://templyo.io" },
    { name: "UI.acerternity.com", url: "https://ui.acerternity.com" },
    { name: "Originui.com", url: "https://originui.com" },
    { name: "Lordicon.com", url: "https://lordicon.com" },
    { name: "Layout.bradwoods.io", url: "https://layout.bradwoods.io" },
    { name: "Animatedicons.co", url: "https://animatedicons.co" },
    { name: "Animista.net", url: "https://animista.net" },
    { name: "Reactbits.dev", url: "https://reactbits.dev" },
    { name: "Css-tricks.com", url: "https://css-tricks.com" },
    { name: "Jonathanleane.github.io/partycles", url: "https://jonathanleane.github.io/partycles" },
    { name: "Https://andreasbm.github.io/web-skills", url: "https://andreasbm.github.io/web-skills" },
    { name: "Framer motion", url: "https://www.framer.com/motion/" },
    { name: "GSAP.com", url: "https://gsap.com" },
    { name: "Barba.js", url: "https://barba.js.org" },
    { name: "Anime.js", url: "https://animejs.com" },
    { name: "Three.js/R3F", url: "https://threejs.org" },
    { name: "Animatedicons.co", url: "https://animatedicons.co" },
    { name: "Seraui.seraprogrammer.com", url: "https://seraui.seraprogrammer.com" },
    { name: "Uiverse.io", url: "https://uiverse.io" },
    { name: "Animejs.com: animaciones 3D", url: "https://animejs.com" },
    { name: "Particle visualizer: lo pides a chat gpt", url: "#" },
    { name: "Glass3D.dev", url: "https://glass3d.dev" },
    { name: "Smoothy.vercel.app", url: "https://smoothy.vercel.app" },
    { name: "Park-ui.com", url: "https://park-ui.com" },
    { name: "Reactccomponents.com", url: "https://reactcomponents.com" },
    { name: "Gradienty.codes/animated-icons", url: "https://gradienty.codes/animated-icons" },
    { name: "Simpleparallax-js", url: "https://simpleparallax.com" },
    { name: "Gradientscss.vercel.app", url: "https://gradientscss.vercel.app" },
    { name: "Swapy.tahazsh.com", url: "https://swapy.tahazsh.com" },
    { name: "Evilcharts.com ( gráficas)", url: "https://evilcharts.com" },
    { name: "Scrollx-ui.vercel.app (animaciones)", url: "https://scrollx-ui.vercel.app" },
    { name: "Reui.io", url: "https://reui.io" },
    { name: "Atroposjs.com", url: "https://atroposjs.com" },
    { name: "Patterncraft.fun", url: "https://patterncraft.fun" },
    { name: "Neat.firecms.co (animaciones 3D)", url: "https://neat.firecms.co" },
    { name: "React-chatbotify.com : ( npm install react-chatbotify)", url: "https://react-chatbotify.com" },
    { name: "Https://playcanvas-react.vercel.app", url: "https://playcanvas-react.vercel.app" },
    { name: "Gradient.style : colores y estilos", url: "https://gradient.style" },
    { name: "Konstaui.com : Libreria para crear app móvil", url: "https://konstaui.com" },
    { name: "Splidejs.com : escenarios y paisajes", url: "https://splidejs.com" },
    { name: "https://buttermax.net/", url: "https://buttermax.net/" },
    { name: "https://reactbits.dev/", url: "https://reactbits.dev/" },
    { name: "Kigen.design/color", url: "https://kigen.design/color" },
    { name: "https://aethercss.lovable.app/", url: "https://aethercss.lovable.app/" },
    { name: "Visiwig.com : CSS", url: "https://visiwig.com" },
    { name: "AnimateIcons.vercel.app", url: "https://animateicons.vercel.app" },
    { name: "https://www.visiwig.com/ : CSS", url: "https://www.visiwig.com/" },
    { name: "https://spacetypegenerator.com/", url: "https://spacetypegenerator.com/" },
    { name: "Coolshap.es", url: "https://coolshap.es" },
    { name: "GitHub.com/Clauderic/dnd-kit (react)", url: "https://github.com/clauderic/dnd-kit" },
  ];

  const handleCopy = async (text, index) => {
    // Extraer solo el nombre de la URL sin la descripción
    const urlOnly = text.split(' : ')[0].split(' ( ')[0];
    
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
              📚
            </motion.div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              LIBRERÍAS PARA PROGRAMADORES
            </h3>
          </div>
        </div>

        {/* Contador de recursos */}
        <div className="text-xs text-gray-400 mb-2">
          {libraries.length} recursos disponibles
        </div>

        {/* Lista scrollable más compacta */}
        <div className="relative max-h-[280px] overflow-y-auto overflow-x-hidden pr-1 custom-scrollbar">
          <div className="space-y-0.5">
            {libraries.map((lib, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.005, duration: 0.2 }}
                viewport={{ once: true }}
                className="group/item relative"
              >
                <div className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-white/5 transition-all duration-200">
                  {/* Enlace */}
                  <a
                    href={lib.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-xs text-gray-300 hover:text-white transition-colors duration-200 truncate pr-2"
                  >
                    <span className="hover:text-cyan-400 transition-colors">
                      {lib.name}
                    </span>
                  </a>

                  {/* Botones */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <FavoriteButton
                      toolId={`library-${index}`}
                      toolName={lib.name}
                      toolUrl={lib.url}
                      toolDesc=""
                      category="Libraries"
                    />
                    
                    {/* Botón de copiar más pequeño */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleCopy(lib.name, index)}
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

export default LibrariesCard;
