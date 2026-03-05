import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Building2, Briefcase, TrendingUp, Database } from 'lucide-react'
import MetallicText from './effects/MetallicText'
import RobotModel from './RobotModel'
import CustomAgentIcon from './CustomAgentIcon'
import CustomAgentChat from './CustomAgentChat'

const Hero = () => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const [currentText, setCurrentText] = useState(0)
  const [isCustomChatOpen, setIsCustomChatOpen] = useState(false)
  const texts = [
    "Soluciones Tecnológicas",
    "Consultoría Especializada",
    "Innovación Digital",
    "Transformación Digital"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

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
    hidden: { y: 20, opacity: 0, filter: "blur(10px)" },
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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* El fondo de carrusel ahora vive globalmente en App.jsx */}

      {/* Elementos flotantes más transparentes */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-20 h-20 bg-blue-500/15 rounded-full blur-xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 5, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/15 rounded-full blur-xl"
      />

      {/* MODELO 3D - Adaptado para Móvil (fondo centrado) y Desktop (lado izquierdo) */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="hidden lg:flex absolute top-[15%] left-0 w-[500px] h-[850px] items-center justify-start opacity-100 pointer-events-auto z-50"
        style={{ willChange: 'transform, opacity' }}
      >
        {/* Contenedor del modelo con efectos de glow */}
        <div className="relative w-full h-full">
          {/* Glow effect detrás del modelo */}
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 blur-3xl rounded-full"
          />

          {/* Modelo 3D */}
          <div className="relative w-full h-full">
            <RobotModel />
          </div>

          {/* Decoración - Anillos orbitales */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-purple-500/20 rounded-full"
            style={{ transform: 'scale(1.1)' }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-blue-500/20 rounded-full"
            style={{ transform: 'scale(0.9) rotateX(60deg)' }}
          />
        </div>
      </motion.div>



      {/* CONTENIDO PRINCIPAL */}
      <motion.div
        style={{ y, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-5xl pt-28 pb-16"
      >
        {/* Main Title */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <span className="block">
              <MetallicText className="chrome-text">
                Agentes IA
              </MetallicText>
            </span>
            <span className="block">
              <MetallicText className="silver-text">
                para Empresas
              </MetallicText>
            </span>
          </h1>
        </motion.div>

        {/* Animated Subtitle */}
        <motion.div variants={itemVariants} className="mb-10 h-12 flex items-center justify-center">
          <motion.h2
            key={currentText}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            className="text-2xl md:text-4xl font-light"
          >
            <MetallicText className="gold-text">
              {texts[currentText]}
            </MetallicText>
          </motion.h2>
        </motion.div>

        {/* Descripción principal - Estilo editorial limpio (sin efecto eléctrico) */}
        <motion.div variants={itemVariants} className="mb-14">
          <p className="mx-auto max-w-4xl text-center text-zinc-100 text-lg md:text-2xl leading-relaxed md:leading-relaxed font-light tracking-wide">
            Ayudamos a empresas en Venezuela a fortalecer su operatividad mediante un{' '}
            <span className="font-semibold text-amber-200">ecosistema de inteligencia artificial</span>{' '}
            centralizado en una base de datos propietaria y CRM de alto rendimiento,
            diseñado bajo estándares de calidad y estética europea.
          </p>
        </motion.div>

        {/* 4 Features - Lista compacta con bordes eléctricos laterales */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14 max-w-4xl mx-auto text-left"
        >
          {[
            {
              icon: <Briefcase className="w-6 h-6 text-purple-400" />,
              color: 'purple',
              title: 'Agentes Autónomos',
              desc: 'Asumen tareas críticas en cobranza, ventas, logística y conciliación de pagos, con soporte en gestión contable y cumplimiento legal.'
            },
            {
              icon: <Database className="w-6 h-6 text-blue-400" />,
              color: 'blue',
              title: 'Memoria Corporativa',
              desc: 'Transforma datos dispersos en infraestructura digital estable y una memoria corporativa inteligente.'
            },
            {
              icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
              color: 'emerald',
              title: 'Escalabilidad Real',
              desc: 'Tu negocio crece sin fricciones. El aumento de volumen no incrementa tus costos operativos.'
            },
            {
              icon: <Building2 className="w-6 h-6 text-amber-400" />,
              color: 'amber',
              title: 'Recupera tu Tiempo',
              desc: 'Transforma gastos variables en infraestructura digital estable. Recupera tu enfoque estratégico y tu tiempo.'
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + i * 0.15, duration: 0.5 }}
              className="flex items-start gap-4 p-4 rounded-xl border-l-2 transition-all duration-300 bg-white/10 border-white/20 backdrop-blur-md lg:bg-black/80 lg:border-l-2 lg:border-white/10 lg:hover:bg-black/90"
              style={{ borderLeftColor: `var(--tw-${item.color}-400, ${item.color === 'purple' ? '#a855f7' : item.color === 'blue' ? '#3b82f6' : item.color === 'emerald' ? '#10b981' : '#f59e0b'})` }}
            >
              <div className={`p-2.5 rounded-lg bg-${item.color}-500/20 shrink-0 mt-0.5`}>
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-gray-300 text-base leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>

      {/* Nuevo Asistente IA NV - Right Side */}
      <CustomAgentIcon onClick={() => setIsCustomChatOpen(true)} />
      <CustomAgentChat isOpen={isCustomChatOpen} onClose={() => setIsCustomChatOpen(false)} />

    </section>
  )
}

export default Hero
