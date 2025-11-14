import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import MetallicText from './effects/MetallicText'
import Galaxy from './effects/Galaxy'
import CodeMatrix from './effects/CodeMatrix'
import NeuralNetwork from './effects/NeuralNetwork'
import DataFlow from './effects/DataFlow'
import GeometricMorph from './effects/GeometricMorph'
import ShieldField from './effects/ShieldField'
import KnowledgeOrbs from './effects/KnowledgeOrbs'

// Iconos animados con React
const CodeIcon = () => (
  <motion.svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    animate={{
      rotate: [0, 5, -5, 0],
      scale: [1, 1.1, 1]
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <motion.polyline
      points="16 18 22 12 16 6"
      animate={{ x: [0, 2, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.polyline
      points="8 6 2 12 8 18"
      animate={{ x: [0, -2, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </motion.svg>
)

const CpuIcon = () => (
  <motion.svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <motion.rect
      x="9" y="9" width="6" height="6"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5]
      }}
      transition={{
        duration: 2,
        repeat: Infinity
      }}
    />
    <line x1="4" y1="1" x2="4" y2="4" />
    <line x1="10" y1="1" x2="10" y2="4" />
    <line x1="16" y1="1" x2="16" y2="4" />
    <line x1="4" y1="20" x2="4" y2="23" />
    <line x1="10" y1="20" x2="10" y2="23" />
    <line x1="16" y1="20" x2="16" y2="23" />
    <line x1="1" y1="4" x2="4" y2="4" />
    <line x1="1" y1="10" x2="4" y2="10" />
    <line x1="1" y1="16" x2="4" y2="16" />
    <line x1="20" y1="4" x2="23" y2="4" />
    <line x1="20" y1="10" x2="23" y2="10" />
    <line x1="20" y1="16" x2="23" y2="16" />
  </motion.svg>
)

const DatabaseIcon = () => (
  <motion.svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <motion.path
      d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <motion.path
      d="M21 8c0 1.66-4 3-9 3s-9-1.34-9-3"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
    />
  </motion.svg>
)

const GlobeIcon = () => (
  <motion.svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    animate={{ rotate: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
  >
    <circle cx="12" cy="12" r="10" />
    <motion.line
      x1="2" y1="12" x2="22" y2="12"
      animate={{ scaleX: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </motion.svg>
)

const ShieldIcon = () => (
  <motion.svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <motion.path
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
      animate={{
        scale: [1, 1.05, 1],
        opacity: [0.7, 1, 0.7]
      }}
      transition={{
        duration: 2,
        repeat: Infinity
      }}
    />
    <motion.path
      d="M12 8v4"
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    <circle cx="12" cy="16" r="1" />
  </motion.svg>
)

const UsersIcon = () => (
  <motion.svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <motion.path
      d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <circle cx="9" cy="7" r="4" />
    <motion.path
      d="M23 21v-2a4 4 0 0 0-3-3.87"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
    />
    <motion.circle
      cx="16" cy="7" r="4"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </motion.svg>
)

const Services = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  const services = [
    {
      icon: <CodeIcon />,
      title: "Desarrollo de Software",
      description: "Aplicaciones web y móviles personalizadas con las últimas tecnologías",
      color: "from-blue-500 to-cyan-500",
      CanvasEffect: CodeMatrix
    },
    {
      icon: <CpuIcon />,
      title: "Consultoría Tecnológica",
      description: "Asesoramiento estratégico para optimizar tus procesos digitales",
      color: "from-purple-500 to-pink-500",
      CanvasEffect: NeuralNetwork
    },
    {
      icon: <DatabaseIcon />,
      title: "Gestión de Datos",
      description: "Soluciones de Big Data, Analytics e Inteligencia Artificial",
      color: "from-green-500 to-emerald-500",
      CanvasEffect: DataFlow
    },
    {
      icon: <GlobeIcon />,
      title: "Transformación Digital",
      description: "Modernización completa de infraestructuras y procesos empresariales",
      color: "from-orange-500 to-red-500",
      CanvasEffect: GeometricMorph
    },
    {
      icon: <ShieldIcon />,
      title: "Ciberseguridad",
      description: "Protección integral de sistemas y datos empresariales",
      color: "from-indigo-500 to-blue-500",
      CanvasEffect: ShieldField
    },
    {
      icon: <UsersIcon />,
      title: "Capacitación",
      description: "Formación especializada en tecnologías emergentes",
      color: "from-teal-500 to-green-500",
      CanvasEffect: KnowledgeOrbs
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="services" className="py-24 relative">
      {/* Galaxy ya NO está aquí - ahora está en App.jsx compartido */}
      
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
            className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl"
          >
            <MetallicText className="chrome-text">
              Nuestros Servicios
            </MetallicText>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto drop-shadow-lg"
          >
            Ofrecemos soluciones tecnológicas integrales que impulsan el crecimiento 
            y la innovación en tu empresa
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                rotateX: 5,
                rotateY: 5
              }}
              className="group relative p-8 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 shadow-xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)"
              }}
            >
              {/* Canvas Effect Background */}
              <div className="absolute inset-0 opacity-70 group-hover:opacity-90 transition-opacity duration-500 bg-black/30">
                <service.CanvasEffect />
              </div>

              {/* Gradient Overlay on Hover */}
              <motion.div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                whileHover={{ scale: 1.1 }}
              />

              {/* Icon Container */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`relative inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} mb-6 text-white shadow-lg z-10`}
              >
                {service.icon}
              </motion.div>

              {/* Title */}
              <h3 className="relative text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-300 transition-all duration-300 drop-shadow-lg z-10">
                {service.title}
              </h3>
              
              {/* Description */}
              <p className="relative text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 z-10">
                {service.description}
              </p>

              {/* Border Effects */}
              <motion.div
                className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Services
