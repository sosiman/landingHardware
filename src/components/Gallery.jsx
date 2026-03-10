import React, { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ExternalLink, Layers, Layout, Smartphone, Brain, Cloud, Cpu, ArrowUpRight } from 'lucide-react'
import RobotSVG from './effects/RobotSVG'
import MetallicText from './effects/MetallicText'

const Gallery = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })
  const [filter, setFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: "Plataforma E-commerce",
      category: "web",
      description: "Automatización de ventas y pagos recurrentes.",
      gradient: "from-blue-600 via-cyan-500 to-teal-500",
      botColor: "#3b82f6",
      icon: <Layout className="w-5 h-5" />
    },
    {
      id: 2,
      title: "App de Banca Móvil",
      category: "mobile",
      description: "Seguridad biométrica e IA predictiva de gastos.",
      gradient: "from-purple-600 via-pink-500 to-fuchsia-500",
      botColor: "#a855f7",
      icon: <Smartphone className="w-5 h-5" />
    },
    {
      id: 3,
      title: "Dashboard de IA",
      category: "ai",
      description: "Análisis de sentimientos en tiempo real para soporte.",
      gradient: "from-violet-600 via-indigo-500 to-blue-500",
      botColor: "#7c3aed",
      icon: <Brain className="w-5 h-5" />
    },
    {
      id: 4,
      title: "Nube Empresarial",
      category: "cloud",
      description: "Infraestructura escalable bajo demanda.",
      gradient: "from-sky-600 via-cyan-500 to-blue-500",
      botColor: "#0ea5e9",
      icon: <Cloud className="w-5 h-5" />
    },
    {
      id: 5,
      title: "Control Industrial",
      category: "iot",
      description: "Monitoreo de maquinaria vía agentes inteligentes.",
      gradient: "from-amber-600 via-yellow-500 to-amber-400",
      botColor: "#d97706",
      icon: <Cpu className="w-5 h-5" />
    }
  ]

  const categories = [
    { id: 'all', name: 'Todos los Proyectos', icon: <Layers className="w-4 h-4" /> },
    { id: 'web', name: 'Web Apps', icon: <Layout className="w-4 h-4" /> },
    { id: 'mobile', name: 'Móvil', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'ai', name: 'IA & Agentes', icon: <Brain className="w-4 h-4" /> },
    { id: 'iot', name: 'IoT & Industria', icon: <Cpu className="w-4 h-4" /> }
  ]

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter)

  return (
    <section id="gallery" className="py-32 relative bg-[#FDF5E6]">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* LADO IZQUIERDO: Filtros y Título (Sidebar Style) */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="lg:col-span-4 lg:sticky lg:top-32 h-fit"
          >
            <div className="space-y-10">
              <div className="space-y-4">
                <span className="text-zinc-400 font-bold tracking-[0.3em] uppercase text-[10px]">Display Case</span>
                <h2 className="text-5xl font-black leading-none tracking-tighter">
                  <MetallicText className="silver-text text-zinc-900">
                    Proyectos
                  </MetallicText>
                  <br />
                  <span className="text-zinc-900 italic">Élite</span>
                </h2>
              </div>

              {/* Navigation Filters */}
              <nav className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFilter(cat.id)}
                    className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-bold text-sm ${filter === cat.id
                      ? 'bg-zinc-900 text-white shadow-xl shadow-zinc-200 translate-x-3'
                      : 'text-zinc-400 hover:text-zinc-900 hover:bg-white/50'
                      }`}
                  >
                    <span className={filter === cat.id ? 'text-amber-400' : ''}>
                      {cat.icon}
                    </span>
                    {cat.name}
                    {filter === cat.id && <motion.div layoutId="dot" className="w-1.5 h-1.5 rounded-full bg-amber-400 ml-auto" />}
                  </button>
                ))}
              </nav>

              <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/20">
                <p className="text-zinc-800 text-xs font-bold uppercase tracking-widest mb-2 italic">Dato de Éxito</p>
                <p className="text-sm text-zinc-600 font-medium">+150 integraciones exitosas en el último año.</p>
              </div>
            </div>
          </motion.div>

          {/* LADO DERECHO: Grid de Proyectos compacto para móvil */}
          <div className="lg:col-span-8">
            <motion.div
              layout
              className="grid grid-cols-2 lg:grid-cols-2 gap-3 lg:gap-6"
            >
              <AnimatePresence mode='popLayout'>
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ y: -5 }}
                    className="group relative overflow-hidden rounded-[24px] lg:rounded-[40px] bg-white border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-500"
                  >
                    {/* Project Image Area - Compacted for mobile */}
                    <div className="relative h-28 lg:h-48 overflow-hidden bg-zinc-50">
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />

                      {/* Central Mini Bot */}
                      <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                      >
                        <RobotSVG color={project.botColor} size={35} className="lg:scale-150" />
                      </motion.div>

                      {/* Floating Link Icon */}
                      <div className="absolute top-3 right-3 lg:top-6 lg:right-6 p-2 lg:p-3 rounded-full bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <ArrowUpRight className="w-3 h-3 lg:w-5 lg:h-5 text-zinc-900" />
                      </div>
                    </div>

                    {/* Project Info - Scaled down for 2x2 grid */}
                    <div className="p-4 lg:p-8">
                      <div className="flex items-center gap-1.5 mb-2 lg:mb-4">
                        <div className="p-1 rounded bg-zinc-50 text-zinc-400 group-hover:text-zinc-900 transition-colors">
                          {React.cloneElement(project.icon, { size: 12, className: "lg:w-5 lg:h-5" })}
                        </div>
                        <span className="text-[8px] lg:text-[10px] uppercase tracking-[0.1em] font-black text-zinc-300 group-hover:text-zinc-900 transition-colors truncate">
                          {project.category}
                        </span>
                      </div>

                      <h3 className="text-xs lg:text-2xl font-black text-zinc-900 mb-1 lg:mb-2 leading-tight truncate">
                        {project.title}
                      </h3>
                      <p className="text-[10px] lg:text-sm text-zinc-500 font-medium leading-tight line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Bottom Line Color */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 lg:h-1.5" style={{ backgroundColor: project.botColor }} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Gallery
