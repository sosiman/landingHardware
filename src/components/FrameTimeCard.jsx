import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FrameTimeCard = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      id: 'monitor',
      title: '1. Configuración del Monitor (Hardware)',
      icon: '🖥️',
      color: 'from-blue-400 to-cyan-500',
      content: [
        {
          subtitle: 'Tiempo de Respuesta (Overdrive)',
          items: [
            'En el menú físico de tu monitor (LG, etc.), busca "Tiempo de Respuesta"',
            'Acción: Ajústalo a "Normal" o "Rápido"',
            '⚠️ ¡Evita!: Nunca uses la opción más alta ("Más Rápido", "Extremo", "Ultra Fast")',
            'Razón: Estas opciones causan inverse ghosting, que se percibe como un "micro-trancón" visual'
          ]
        }
      ]
    },
    {
      id: 'windows',
      title: '2. Configuración de Windows (Escalado PPP)',
      icon: '🪟',
      color: 'from-purple-400 to-pink-500',
      content: [
        {
          subtitle: 'El Problema',
          items: [
            'El escalado de Windows (ej. 125% para 2K) interfiere con los juegos en modo "Ventana sin Bordes"',
            'Causa stutter (tirones) y conflictos con FSR/RSR'
          ]
        },
        {
          subtitle: 'Solución A (Recomendada)',
          items: [
            'Ve a Configuración de Pantalla de Windows',
            'En "Escala", ponlo en 100%',
            '(Opcional) Si el texto se ve muy pequeño, usa solo la opción de "Tamaño del texto"'
          ]
        },
        {
          subtitle: 'Solución B (Alternativa)',
          items: [
            'Deja Windows al 125%',
            'Busca el archivo .exe del juego',
            'Clic derecho → "Propiedades" → "Compatibilidad"',
            'Clica en "Cambiar configuración elevada de PPP"',
            'Marca "Invalidar el comportamiento de escalado de PPP alto" y ponlo en "Aplicación"'
          ]
        }
      ]
    },
    {
      id: 'driver',
      title: '3. Configuración del Driver (La "Combinación de Oro")',
      icon: '⚙️',
      color: 'from-green-400 to-emerald-500',
      content: [
        {
          subtitle: 'A. Overclock',
          items: [
            'DESACTIVA cualquier overclock, especialmente el de la VRAM',
            '⚠️ Un overclock de VRAM ligeramente inestable es la causa #1 de "micro-trancones"',
            'Estos no se ven en los contadores de FPS'
          ]
        },
        {
          subtitle: 'B. Habilita FreeSync / G-Sync',
          items: [
            'AMD: En Adrenalin, activa AMD FreeSync',
            'NVIDIA: En el Panel de NVIDIA, activa G-Sync o "G-Sync Compatible"'
          ]
        },
        {
          subtitle: 'C. El Limitador de FPS Correcto (uno u otro, nunca ambos)',
          items: [
            'AMD: Activa Radeon Chill con FPS min y max 3 puntos menos a tu Hz del monitor',
            'AMD: Activa "Control de destino de velocidad de cuadro" (FRTC)',
            'AMD: Ponlo 3 FPS por debajo de los hercios de tu monitor (Ej: 197 FPS para 200 Hz)',
            'NVIDIA: Usa el limitador del Panel de Control de NVIDIA',
            'NVIDIA: Ponlo 3 FPS por debajo (Ej: 141 FPS para 144 Hz)'
          ]
        }
      ]
    },
    {
      id: 'info',
      title: '¿Qué son FreeSync y G-Sync?',
      icon: '🔄',
      color: 'from-yellow-400 to-orange-500',
      content: [
        {
          subtitle: 'Tecnologías de Tasa de Refresco Variable (VRR)',
          items: [
            'Su trabajo: Sincronizan los hercios (Hz) de tu monitor con los FPS exactos que produce tu tarjeta gráfica en tiempo real',
            'Ejemplo: Si tu juego baja a 180 FPS, tu monitor baja a 180 Hz. Si sube a 197 FPS, tu monitor sube a 197 Hz',
            '✨ El Resultado: Eliminan por completo el "tearing" (imagen partida) y el "stutter" (tirones de V-Sync)',
            '🎯 Logran la fluidez perfecta'
          ]
        },
        {
          subtitle: 'La Diferencia',
          items: [
            'FreeSync (AMD): Es un estándar abierto y gratuito que usa la mayoría de monitores',
            'G-Sync (NVIDIA): Es la tecnología de NVIDIA',
            'G-Sync Compatible: Es como FreeSync',
            'G-Sync Nativo: Requiere un chip especial en el monitor (más caro pero históricamente garantizaba mejor calidad)'
          ]
        }
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: false, margin: "-50px" }}
      className="relative"
    >
      <div className="relative glass-dark rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <div>
              <h3 className="text-sm font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent">
                Línea de Frame Time Perfectamente Plana
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">Configuración para máxima fluidez en gaming</p>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-3 space-y-2 text-xs">
          {sections.map((section, index) => (
            <div key={section.id} className="border border-white/5 rounded-lg overflow-hidden bg-black/20">
              {/* Section Header - Clickeable */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-3 py-2 flex items-center justify-between hover:bg-white/5 transition-all group/section"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{section.icon}</span>
                  <span className={`font-semibold bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}>
                    {section.title}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: openSection === section.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={16} className="text-gray-400" />
                </motion.div>
              </button>

              {/* Section Content - Collapsible */}
              <AnimatePresence>
                {openSection === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 pb-3 pt-1 space-y-2 border-t border-white/5">
                      {section.content.map((subsection, subIndex) => (
                        <div key={subIndex} className="space-y-1">
                          {subsection.subtitle && (
                            <p className="font-semibold text-gray-300 mt-2">
                              {subsection.subtitle}:
                            </p>
                          )}
                          <ul className="space-y-1 pl-3">
                            {subsection.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="text-gray-400 flex items-start gap-2">
                                <span className="text-orange-400 flex-shrink-0 mt-0.5">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Nota Final */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-2 mt-3">
            <p className="font-semibold text-green-400 mb-1">✅ Resultado Final:</p>
            <p className="text-green-300/80">
              Con esta configuración lograrás una experiencia de juego sin tirones, tearing ni micro-stutters. 
              Tu línea de frame time será perfectamente plana = fluidez absoluta.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FrameTimeCard;
