import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import MetallicText from './effects/MetallicText'
import Galaxy from './effects/Galaxy'
import CodeMatrix from './effects/CodeMatrix'
import NeuralNetwork from './effects/NeuralNetwork'
import DataFlow from './effects/DataFlow'
import GeometricMorph from './effects/GeometricMorph'
import ShieldField from './effects/ShieldField'
import KnowledgeOrbs from './effects/KnowledgeOrbs'
import OpenAIChat from './OpenAIChat'

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

const OpenAIIcon = () => (
  <motion.svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="currentColor"
    animate={{
      rotate: [0, 360],
      scale: [1, 1.1, 1]
    }}
    transition={{
      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    }}
  >
    <motion.path
      d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
      animate={{ opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
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
  const [isChatOpen, setIsChatOpen] = useState(false)

  const services = [
    {
      icon: <CodeIcon />,
      title: "Desarrollo de Software",
      description: "Aplicaciones web y móviles personalizadas con las últimas tecnologías",
      color: "from-blue-500 to-cyan-500",
      CanvasEffect: CodeMatrix
    },
    {
      icon: <OpenAIIcon />,
      title: "Consultoría Tecnológica",
      description: "Asesoramiento estratégico para optimizar tus procesos digitales con IA",
      color: "from-purple-500 to-pink-500",
      CanvasEffect: NeuralNetwork,
      onClick: () => setIsChatOpen(true)
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
              onClick={service.onClick}
              className={`group relative p-8 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 shadow-xl overflow-hidden ${
                service.onClick ? 'cursor-pointer hover:shadow-2xl hover:shadow-purple-500/30' : ''
              }`}
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

      {/* OpenAI Chat Modal */}
      <OpenAIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </section>
  )
}

export default Services
