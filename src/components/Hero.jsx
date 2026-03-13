import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Building2, Briefcase, TrendingUp, Database, ArrowRight } from 'lucide-react'
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
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section id="home" className="relative min-h-screen pt-20 flex flex-col items-center justify-center overflow-hidden bg-[#FDF5E6]">

      {/* App Mask (Subtle bezel for mobile-app feel) */}
      <div className="absolute inset-4 border border-zinc-900/5 rounded-[40px] pointer-events-none z-50 hidden lg:block" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* COLUMNA IZQUIERDA: Título y Tablets */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-8"
          >
            {/* Main Title - Left Aligned */}
            <motion.div variants={itemVariants} className="space-y-2">
              <span className="text-zinc-500 font-medium tracking-[0.2em] uppercase text-sm block">Premium AI Systems</span>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter">
                <span className="block">
                  <MetallicText className="chrome-text">
                    Lockthard
                  </MetallicText>
                </span>
                <span className="block">
                  <MetallicText className="silver-text text-zinc-900">
                    para Empresas
                  </MetallicText>
                </span>
              </h1>
            </motion.div>

            {/* Tablets (Features) - Left Aligned & Stacked like App Widgets */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 max-w-xl">
              {[
                {
                  icon: <Briefcase className="w-5 h-5 text-purple-600" />,
                  title: 'Agentes Autónomos',
                  desc: 'Ventas y gestión operativa 24/7.'
                },
                {
                  icon: <Database className="w-5 h-5 text-blue-600" />,
                  title: 'Memoria Corporativa',
                  desc: 'Infraestructura digital unificada.'
                },
                {
                  icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
                  title: 'Escalabilidad Real',
                  desc: 'Crece sin aumentar costos fijos.'
                },
                {
                  icon: <Building2 className="w-5 h-5 text-amber-600" />,
                  title: 'Ahorro Estratégico',
                  desc: 'Optimización de recursos y tiempo.'
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-sm hover:shadow-md transition-all group cursor-pointer"
                >
                  <div className="p-3 rounded-xl bg-zinc-50 group-hover:bg-white transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900">{item.title}</h3>
                    <p className="text-xs text-zinc-500 font-medium">{item.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 ml-auto text-zinc-300 group-hover:text-zinc-800 transition-colors" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* COLUMNA DERECHA: Subtítulo y Bot */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end space-y-12">

            {/* Animated Subtitle - Right Aligned */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full text-center lg:text-right"
            >
              <div className="inline-block p-1 px-4 rounded-full bg-zinc-900 text-white mb-4 text-xs font-bold tracking-widest uppercase">
                Status: Online
              </div>
              <motion.h2
                key={currentText}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                className="text-3xl md:text-5xl font-light text-zinc-400"
              >
                {texts[currentText]}
              </motion.h2>
              <p className="mt-4 text-zinc-500 text-sm md:text-base max-w-sm ml-auto font-medium">
                Diseñado bajo estándares estéticos europeos para la operatividad del futuro.
              </p>
            </motion.div>

            {/* ROBOT MODEL - Right Side / Floating Widget Style */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative w-full aspect-square max-w-[450px] group"
            >
              {/* Glow background */}
              <div className="absolute inset-0 bg-zinc-900/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-colors duration-1000" />

              {/* Robot Model component */}
              <div className="relative w-full h-full z-10 scale-110">
                <RobotModel />
              </div>

              {/* Orbital Decorations */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-zinc-200/50 rounded-full"
              />
            </motion.div>

          </div>
        </div>
      </div>

      {/* Floating Elements (Background) */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-100/30 rounded-full blur-[100px] -z-10" />

      {/* Asistente Chat UI */}
      <CustomAgentIcon onClick={() => setIsCustomChatOpen(true)} />
      <CustomAgentChat isOpen={isCustomChatOpen} onClose={() => setIsCustomChatOpen(false)} />

    </section>
  )
}

export default Hero
