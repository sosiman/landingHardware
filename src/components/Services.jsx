import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import MetallicText from './effects/MetallicText'
import {
  Database,
  Layout,
  MessageSquare,
  BarChart3,
  Wrench,
  Zap,
  Share2,
  HardDrive,
  Cpu,
  Cloud,
  CheckCircle2,
  Shield,
  ArrowRight,
  TrendingDown,
  Clock,
  UserX,
  Maximize
} from 'lucide-react'

const AnimatedBotIcon = ({ color }) => (
  <motion.svg
    width="32" height="32" viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    animate={{ y: [0, -2, 0] }}
    transition={{ duration: 3, repeat: Infinity }}
  >
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8" y2="16" strokeWidth="3" />
    <line x1="16" y1="16" x2="16" y2="16" strokeWidth="3" />
  </motion.svg>
)

const Services = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.05 })

  const deploymentModels = [
    {
      title: "Hardware + Software",
      desc: "Agente instalado y listo para tu empresa.",
      icon: <Cpu className="w-6 h-6 text-amber-600" />,
      tag: "Llave en mano"
    },
    {
      title: "Solo Software",
      desc: "Instálalo en tu sistema con tu hardware.",
      icon: <HardDrive className="w-6 h-6 text-blue-600" />,
      tag: "Flexible"
    },
    {
      title: "Software + Suscripción",
      desc: "Usa el Agente en la Nube (sin comprar hardware).",
      icon: <Cloud className="w-6 h-6 text-purple-600" />,
      tag: "Cloud Native"
    }
  ]

  const capabilities = [
    { title: "Bases de Datos", desc: "Crear y gestionar", icon: <Database /> },
    { title: "Webs y Sistemas", desc: "Diseñar y publicar", icon: <Layout /> },
    { title: "Atención al Cliente", desc: "Procesar y responder", icon: <MessageSquare /> },
    { title: "Análisis de Productos", desc: "Informes y reportes", icon: <BarChart3 /> },
    { title: "Reparar Software", desc: "Detectar y corregir", icon: <Wrench /> },
    { title: "Automatizar Procesos", desc: "Sin intervención humana", icon: <Zap /> },
    { title: "Integrarse con Todo", desc: "APIs, Excel, CRM, ERP", icon: <Share2 /> }
  ]

  const advantages = [
    { title: "Elimina Empleados", icon: <UserX />, color: "text-red-600", bg: "bg-red-50" },
    { title: "Reduce Costos", icon: <TrendingDown />, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Aumenta Productividad", icon: <Maximize />, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Funciona 24/7", icon: <Clock />, color: "text-amber-600", bg: "bg-amber-50" },
    { title: "Sin Errores", icon: <Shield />, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Escalable", icon: <Zap />, color: "text-cyan-600", bg: "bg-cyan-50" }
  ]

  return (
    <section id="services" className="py-24 bg-[#FDF5E6]">
      <div className="container mx-auto px-6" ref={ref}>

        {/* HEADER: Deployment Models */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              <MetallicText className="chrome-text">Modularidad</MetallicText>
              <br />
              <span className="text-zinc-900">de Implementación</span>
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto font-medium">
              Un agente digital que puede trabajar 24/7 y realizar cualquier tarea en un ordenador sin errores, sin descanso, sin costo extra por persona.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {deploymentModels.map((model, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[40px] bg-white border border-zinc-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="p-4 rounded-2xl bg-zinc-50 group-hover:bg-amber-500/10 transition-colors">
                    {model.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 bg-zinc-100 px-3 py-1 rounded-full">{model.tag}</span>
                </div>
                <h3 className="text-xl font-black text-zinc-900 mb-2">{model.title}</h3>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed">{model.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* GRID: What can it do? */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-32">
          {/* LADO IZQUIERDO: Ventana de Control (Glassmorphism) */}
          <div className="lg:col-span-4 sticky top-32">
            <span className="text-zinc-400 font-bold tracking-[0.3em] uppercase text-[10px]">Command Center</span>
            <h2 className="text-5xl font-black leading-none tracking-tighter mt-4 mb-10 text-zinc-900">
              ¿Qué hace el<br />
              <MetallicText className="silver-text italic">Agente?</MetallicText>
            </h2>

            {/* Ventana Estilo App Moderna / Glassmorphism */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              className="relative rounded-[32px] overflow-hidden border border-white/40 shadow-2xl bg-white/20 backdrop-blur-3xl"
            >
              {/* Terminal Header */}
              <div className="bg-white/40 px-6 py-4 flex items-center justify-between border-b border-white/20">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Autonomous Processor</span>
              </div>

              {/* Terminal Body */}
              <div className="p-8 space-y-5">
                {[
                  { step: "01", text: "Reparación de Discos & Backups", color: "bg-blue-500" },
                  { step: "02", text: "Gestión Completa de Servidores", color: "bg-indigo-500" },
                  { step: "03", text: "Análisis de Logs & Errores", color: "bg-red-500" },
                  { step: "04", text: "Revisión de Kubernetes & Docker", color: "bg-cyan-500" },
                  { step: "05", text: "Instalación de Sistemas Operativos", color: "bg-purple-500" },
                  { step: "06", text: "Creación de Videos & Contenido", color: "bg-pink-500" },
                  { step: "07", text: "Ejecución de Programas Autónomos", color: "bg-emerald-500" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className={`w-7 h-7 rounded-lg ${item.color} flex items-center justify-center text-white text-[9px] font-black group-hover:scale-110 transition-transform`}>
                      {item.step}
                    </div>
                    <p className="text-[13px] font-bold text-zinc-800 tracking-tight">{item.text}</p>
                  </div>
                ))}
              </div>

              {/* Bottom Decoration */}
              <div className="p-6 bg-zinc-900/5 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest uppercase tracking-widest">Active System</span>
                </div>
                <div className="h-1 w-full bg-zinc-200 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="h-full w-1/3 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 10 }}
                className="flex items-center gap-6 p-6 rounded-[32px] bg-white border border-zinc-100 hover:border-zinc-300 transition-all shadow-sm"
              >
                <div className="p-4 rounded-2xl bg-zinc-50 text-zinc-900">
                  {React.cloneElement(cap.icon, { size: 24, strokeWidth: 2.5 })}
                </div>
                <div>
                  <h4 className="font-black text-zinc-900 tracking-tight">{cap.title}</h4>
                  <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">{cap.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 ml-auto text-zinc-200 group-hover:text-zinc-900" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* FOOTER: Advantages - Título derecha, Ventajas izquierda */}
        <div className="pt-24 border-t border-zinc-200/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* LADO IZQUIERDO: Grid de Ventajas */}
            <div className="lg:col-span-8 order-2 lg:order-1">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {advantages.map((adv, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`${adv.bg} p-6 rounded-[32px] text-center flex flex-col items-center justify-center gap-4 transition-all hover:shadow-lg border border-white/50 backdrop-blur-sm`}
                  >
                    <div className={adv.color}>
                      {React.cloneElement(adv.icon, { size: 28, strokeWidth: 3 })}
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-tight leading-none ${adv.color}`}>
                      {adv.title}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* LADO DERECHO: Título corporativo */}
            <div className="lg:col-span-4 text-center lg:text-right order-1 lg:order-2">
              <span className="text-zinc-400 font-bold tracking-[0.3em] uppercase text-[10px]">Value Proposition</span>
              <h2 className="text-4xl md:text-6xl font-black mt-4 text-zinc-900 leading-none">
                Ventajas<br />
                <MetallicText className="chrome-text">Corporativas</MetallicText>
              </h2>
              <p className="mt-6 text-zinc-500 font-medium text-sm max-w-xs ml-auto">
                Transformamos gastos operativos en infraestructura digital escalable y permanente.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default Services
