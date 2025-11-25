import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Eye, ExternalLink, ZoomIn } from 'lucide-react'
import MetallicText from './effects/MetallicText'

const Gallery = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState('all')
  const [backdropIndex, setBackdropIndex] = useState(0)

  const galleryVisuals = [
    "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=1800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1800&auto=format&fit=crop"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setBackdropIndex((prev) => (prev + 1) % galleryVisuals.length)
    }, 9000)
    return () => clearInterval(interval)
  }, [galleryVisuals.length])

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      category: "web",
      description: "Plataforma de comercio electrónico moderna con React y Node.js",
      video: "/videos/VID_20251006_223257_399.mp4",
      tags: ["React", "Node.js", "MongoDB"],
      highlight: "Aumento del 230% en conversión"
    },
    {
      id: 2,
      title: "Mobile Banking App",
      category: "mobile",
      description: "Aplicación bancaria móvil con autenticación biométrica",
      video: "/videos/VID_20251006_223738_445.mp4",
      tags: ["React Native", "Firebase", "Security"],
      highlight: "99.9% de uptime certificado"
    },
    {
      id: 3,
      title: "AI Dashboard",
      category: "ai",
      description: "Dashboard de análisis con inteligencia artificial",
      video: "/videos/VID_20251006_223742_952.mp4",
      tags: ["Python", "TensorFlow", "D3.js"],
      highlight: "Predicciones en tiempo real"
    },
    {
      id: 4,
      title: "Cloud Infrastructure",
      category: "cloud",
      description: "Arquitectura cloud escalable para microservicios",
      video: "/videos/VID_20251006_223804_366.mp4",
      tags: ["AWS", "Docker", "Kubernetes"],
      highlight: "Despliegues 4x más rápidos"
    },
    {
      id: 5,
      title: "Corporate Website",
      category: "web",
      description: "Sitio web corporativo con CMS personalizado",
      video: "/videos/VID_20251006_223822_120.mp4",
      tags: ["Next.js", "Strapi", "Tailwind"],
      highlight: "Tiempo de carga < 1s"
    },
    {
      id: 6,
      title: "IoT Control System",
      category: "iot",
      description: "Sistema de control para dispositivos IoT industriales",
      video: "/videos/VID_20251006_223837_520.mp4",
      tags: ["Arduino", "MQTT", "React"],
      highlight: "Monitoreo 24/7 sin interrupciones"
    }
  ]

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'web', name: 'Web' },
    { id: 'mobile', name: 'Mobile' },
    { id: 'ai', name: 'IA' },
    { id: 'cloud', name: 'Cloud' },
    { id: 'iot', name: 'IoT' }
  ]

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: {
      y: 60,
      opacity: 0,
      filter: "blur(10px)"
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="gallery" className="py-24 relative">
      {/* Ya NO tiene su propio fondo - usa el Galaxy compartido de App.jsx */}

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl flex items-center justify-center gap-6"
          >
            {/* Bouncy Easing Curve Visualization */}
            <motion.svg
              width="140"
              height="70"
              viewBox="0 0 140 70"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              className="hidden md:block"
            >
              <defs>
                <linearGradient id="lineGradientPortfolio" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="33%" stopColor="#d946ef" />
                  <stop offset="66%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <filter id="neonGlowPortfolio">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Main animated curve - bouncy spring effect */}
              <motion.path
                d="M 10 60 L 15 10 L 20 45 L 25 35 L 30 42 L 35 40 L 40 43 L 50 42 L 60 44 L 80 43 L 100 44 L 130 45"
                fill="none"
                stroke="url(#lineGradientPortfolio)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#neonGlowPortfolio)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
                style={{ filter: 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.9))' }}
              />
              
              {/* Thicker glow layer behind */}
              <motion.path
                d="M 10 60 L 15 10 L 20 45 L 25 35 L 30 42 L 35 40 L 40 43 L 50 42 L 60 44 L 80 43 L 100 44 L 130 45"
                fill="none"
                stroke="#d946ef"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.25"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
              />
              
              {/* End point with pulse */}
              <motion.circle
                cx="130"
                cy="45"
                r="4"
                fill="#ec4899"
                filter="url(#neonGlowPortfolio)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 2
                }}
              />
              
              {/* Pulsing ring effect */}
              <motion.circle
                cx="130"
                cy="45"
                r="6"
                fill="none"
                stroke="#ec4899"
                strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [1, 2],
                  opacity: [0.7, 0]
                }}
                transition={{
                  duration: 1.5,
                  delay: 2.2,
                  repeat: Infinity,
                  repeatDelay: 0.3
                }}
              />
            </motion.svg>
            
            <MetallicText className="silver-text">
              Nuestro Portafolio
            </MetallicText>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 drop-shadow-lg"
          >
            Descubre algunos de nuestros proyectos más destacados y las soluciones
            innovadoras que hemos desarrollado para nuestros clientes
          </motion.p>

          {/* Filter Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setFilter(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg ${filter === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -12, rotateX: 4, rotateY: -4 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 shadow-xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Video Container */}
                <div className="relative h-64 overflow-hidden">
                  <video
                    src={project.video}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />

                  <div className="absolute top-4 left-4 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/50 backdrop-blur-md text-white">
                    {project.category}
                  </div>

                  {/* Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedProject(project)}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    >
                      <ZoomIn size={20} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    >
                      <ExternalLink size={20} />
                    </motion.button>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-blue-300 text-sm mb-3">
                    <Eye className="w-4 h-4" />
                    <span>{project.highlight}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors drop-shadow-lg">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 text-xs bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-full border border-blue-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: "linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent)",
                  }}
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl w-full bg-gray-900 rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <video
                  src={selectedProject.video}
                  className="w-full h-96 object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {selectedProject.title}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {selectedProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-full border border-blue-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                >
                  ×
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Gallery
