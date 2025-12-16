import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Copy, Check } from 'lucide-react';

const ChromeConfigCard = () => {
  const [openSection, setOpenSection] = useState(null);
  const [copiedCommand, setCopiedCommand] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(id);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const sections = [
    {
      id: 'settings',
      title: '1. Configuración Básica',
      icon: '⚙️',
      color: 'from-blue-400 to-cyan-500',
      content: [
        {
          subtitle: 'Configuración → Rendimiento',
          items: [
            'Ve a Configuración de Chrome',
            'Busca la sección "Rendimiento"',
            'Desactiva "Ahorro de energía"',
            '✅ Esto permite que Chrome use todos los recursos disponibles'
          ]
        }
      ]
    },
    {
      id: 'flags',
      title: '2. Chrome Flags (Configuración Avanzada)',
      icon: '🚩',
      color: 'from-purple-400 to-pink-500',
      commands: [
        {
          id: 'flags-url',
          url: 'chrome://flags/',
          description: 'Accede a las configuraciones experimentales'
        }
      ],
      content: [
        {
          subtitle: 'Configuraciones a Habilitar',
          items: [
            '🔧 Override software rendering list → HABILITADO',
            '🔧 GPU rasterization → ENABLED',
            '⚠️ Reinicia Chrome después de cambiar estos ajustes'
          ]
        }
      ]
    },
    {
      id: 'gpu',
      title: '3. Verificación GPU',
      icon: '🎮',
      color: 'from-green-400 to-emerald-500',
      commands: [
        {
          id: 'gpu-url',
          url: 'chrome://gpu/',
          description: 'Verifica el estado de aceleración por hardware'
        }
      ],
      content: [
        {
          subtitle: 'Verificar que esté activo',
          items: [
            '✅ RASTERIZATION → hardware accelerated on all pages',
            'Si ves "Software only" o "Disabled", revisa los Chrome Flags anteriores',
            'Asegúrate de que los drivers de tu GPU estén actualizados'
          ]
        }
      ]
    },
    {
      id: 'tools',
      title: '4. Herramientas de Diagnóstico',
      icon: '🔍',
      color: 'from-yellow-400 to-orange-500',
      commands: [
        {
          id: 'urls',
          url: 'chrome://chrome-urls/',
          description: 'Lista completa de URLs internas de Chrome'
        },
        {
          id: 'net',
          url: 'chrome://net-export/',
          description: 'Exportar logs de red para diagnóstico'
        },
        {
          id: 'webrtc',
          url: 'chrome://webrtc-internals/',
          description: 'Estadísticas y diagnóstico de WebRTC'
        }
      ],
      content: [
        {
          subtitle: 'URLs útiles para diagnóstico',
          items: [
            'chrome://chrome-urls/ - Todas las URLs internas disponibles',
            'chrome://net-export/ - Para diagnosticar problemas de red',
            'chrome://webrtc-internals/ - Para videollamadas y streaming'
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
        <div className="bg-gradient-to-r from-red-500/20 via-yellow-500/20 to-green-500/20 border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌐</span>
            <div>
              <h3 className="text-sm font-bold bg-gradient-to-r from-red-400 via-yellow-400 to-green-500 bg-clip-text text-transparent">
                Chrome Configuration
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">Optimiza Chrome para máximo rendimiento</p>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-3 space-y-2 text-xs">
          {sections.map((section) => (
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
                      {/* Commands */}
                      {section.commands && (
                        <div className="space-y-2 mb-3">
                          {section.commands.map((cmd) => (
                            <div key={cmd.id} className="space-y-1">
                              <p className="text-gray-400 text-xs">{cmd.description}:</p>
                              <div className="group/cmd bg-black/40 rounded-lg p-2 border border-white/5 font-mono text-blue-400 flex items-center justify-between gap-2 hover:border-white/10 transition-all">
                                <span className="break-all">{cmd.url}</span>
                                <button
                                  onClick={() => handleCopy(cmd.url, cmd.id)}
                                  className="opacity-0 group-hover/cmd:opacity-100 transition-all p-1 rounded hover:bg-white/10 flex-shrink-0"
                                >
                                  {copiedCommand === cmd.id ? (
                                    <Check size={14} className="text-green-400" />
                                  ) : (
                                    <Copy size={14} className="text-gray-400" />
                                  )}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Content */}
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
                                <span className="text-blue-400 flex-shrink-0 mt-0.5">•</span>
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
            <p className="font-semibold text-green-400 mb-1">✅ Resultado:</p>
            <p className="text-green-300/80">
              Chrome funcionará más rápido y fluido, especialmente en aplicaciones web, videos y juegos en navegador.
              La aceleración por hardware aprovechará tu GPU para mejor rendimiento.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChromeConfigCard;
