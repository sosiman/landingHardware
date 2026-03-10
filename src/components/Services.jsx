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
  Maximize,
  Brain,
  Timer,
  ShieldCheck,
  Coins,
  TrendingUp
} from 'lucide-react'

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
    { title: "Elimina Empleados", icon: <UserX />, color: "text-rose-500", bg: "bg-rose-50/50" },
    { title: "Reduce Costos", icon: <Coins />, color: "text-amber-500", bg: "bg-amber-50/50" },
    { title: "Productividad", icon: <BarChart3 />, color: "text-blue-500", bg: "bg-blue-50/50" },
    { title: "Funciona 24/7", icon: <Timer />, color: "text-emerald-500", bg: "bg-emerald-50/50" },
    { title: "Sin Errores", icon: <ShieldCheck />, color: "text-indigo-500", bg: "bg-indigo-50/50" },
    { title: "Escalable", icon: <TrendingUp />, color: "text-cyan-500", bg: "bg-cyan-50/50" }
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24">

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

              {/* Active System Indicator */}
              <div className="p-6 bg-zinc-900/5 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em]">System Status: Operating</span>
                </div>
                <div className="h-1 w-full bg-zinc-200 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="h-full w-1/3 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* LADO DERECHO: Grid de Capacidades (7 Bloques) + Workflow */}
          <div className="lg:col-span-8 flex flex-col gap-12">

            {/* 7 Bloques de Capacidades */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 10, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                  className="group flex items-center gap-6 p-6 rounded-[32px] bg-white border border-zinc-100/50 hover:border-zinc-300 transition-all shadow-sm"
                >
                  <div className="p-4 rounded-2xl bg-zinc-50 text-zinc-900 group-hover:bg-white group-hover:shadow-inner transition-all">
                    {React.cloneElement(cap.icon, { size: 24, strokeWidth: 2 })}
                  </div>
                  <div>
                    <h4 className="font-black text-zinc-900 tracking-tight text-lg">{cap.title}</h4>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{cap.desc}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 ml-auto text-zinc-200 group-hover:text-zinc-900 group-hover:translate-x-1 transition-all" />
                </motion.div>
              ))}
            </div>

            {/* SECCIÓN: ¿CÓMO FUNCIONA? (Basada en la Foto) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="p-10 rounded-[48px] bg-gradient-to-br from-white/80 to-zinc-50/50 border border-white backdrop-blur-xl shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-12">
                <div className="h-0.5 w-12 bg-amber-500" />
                <h3 className="text-3xl font-black text-zinc-900 tracking-tighter italic">¿Cómo funciona?</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                {[
                  {
                    num: "1",
                    title: "Le das una tarea",
                    desc: '"Crea una base de datos de clientes"',
                    icon: <Layout className="text-amber-500" />,
                    color: "bg-amber-50"
                  },
                  {
                    num: "2",
                    title: "El agente la entiende",
                    desc: "Procesamiento de lenguaje natural y lógica.",
                    icon: <Brain className="text-blue-500" />,
                    color: "bg-blue-50"
                  },
                  {
                    num: "3",
                    title: "La ejecuta automáticamente",
                    desc: "Interacción autónoma sin errores.",
                    icon: <Zap className="text-purple-500" />,
                    color: "bg-purple-50"
                  },
                  {
                    num: "4",
                    title: "Entrega resultados",
                    desc: "Inmediato, eficiente y escalable.",
                    icon: <CheckCircle2 className="text-emerald-500" />,
                    color: "bg-emerald-50"
                  }
                ].map((step, idx) => (
                  <div key={idx} className="relative group">
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="p-6 rounded-[32px] bg-white border border-zinc-100 shadow-sm h-full flex flex-col items-center text-center gap-4"
                    >
                      <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center`}>
                        {React.cloneElement(step.icon, { size: 30, strokeWidth: 2.5 })}
                        <span className="absolute -top-2 -right-2 w-7 h-7 bg-zinc-900 text-white rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white shadow-lg">
                          0{step.num}
                        </span>
                      </div>
                      <h4 className="font-black text-zinc-900 text-sm leading-tight">{step.title}</h4>
                      <p className="text-[11px] text-zinc-500 font-medium leading-relaxed italic">
                        {step.desc}
                      </p>
                    </motion.div>
                    {idx < 3 && (
                      <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-zinc-300">
                        <ArrowRight size={20} strokeWidth={3} className="animate-pulse" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
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
