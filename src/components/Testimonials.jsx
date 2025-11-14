import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import MetallicText from './effects/MetallicText'

const Testimonials = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  const testimonials = [
    {
      id: 1,
      name: "María González",
      position: "CEO, TechStartup",
      company: "TechStartup Solutions",
      rating: 5,
      text: "Innovate Solutions transformó completamente nuestra infraestructura digital. Su expertise en consultoría tecnológica es excepcional.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      position: "CTO, FinanceCorv",
      company: "FinanceCorv",
      rating: 5,
      text: "El desarrollo de nuestra plataforma móvil superó todas nuestras expectativas. Profesionalismo y calidad en cada detalle.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Ana Martínez",
      position: "Directora de IT, RetailPlus",
      company: "RetailPlus",
      rating: 5,
      text: "Su solución de e-commerce aumentó nuestras ventas en un 300%. Recomiendo totalmente sus servicios de desarrollo web.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Roberto Silva",
      position: "Fundador, LogiTech",
      company: "LogiTech Solutions",
      rating: 5,
      text: "La implementación de IA en nuestros procesos fue un game changer. El equipo de Innovate Solutions es extraordinario.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Laura Jiménez",
      position: "VP Technology, HealthTech",
      company: "HealthTech Inc",
      rating: 5,
      text: "Su enfoque en seguridad y cumplimiento normativo nos dio la confianza necesaria para digitalizar nuestros procesos médicos.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 6,
      name: "Diego Herrera",
      position: "Director, EduPlatform",
      company: "EduPlatform Online",
      rating: 5,
      text: "La plataforma educativa que desarrollaron maneja más de 50,000 estudiantes simultáneos sin problemas. Increíble escalabilidad.",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face"
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
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black" />
      
      {/* Animated Background Elements */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-2xl"
      />

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
            <MetallicText className="gold-text">
              Lo que Dicen Nuestros Clientes
            </MetallicText>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            La satisfacción de nuestros clientes es nuestro mayor logro. 
            Descubre por qué confían en nosotros para sus proyectos más importantes.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                y: -5
              }}
              className="group relative p-8 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 bg-gradient-to-br from-white/5 to-white/10"
            >
              {/* Quote Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white"
              >
                <Quote size={20} />
              </motion.div>

              {/* Stars Rating */}
              <motion.div 
                className="flex gap-1 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1 + 0.4 + i * 0.1 }}
                  >
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Testimonial Text */}
              <motion.p 
                className="text-gray-300 mb-8 leading-relaxed italic group-hover:text-white transition-colors duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.6 }}
              >
                "{testimonial.text}"
              </motion.p>

              {/* Author Info */}
              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.8 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative"
                >
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white/20 group-hover:border-blue-400/50 transition-colors duration-300"
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
                
                <div>
                  <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {testimonial.position}
                  </p>
                  <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                    {testimonial.company}
                  </p>
                </div>
              </motion.div>

              {/* Animated Border Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent)",
                }}
                animate={{
                  background: [
                    "linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent)",
                    "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent)",
                    "linear-gradient(135deg, transparent, rgba(59, 130, 246, 0.1), transparent)",
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Statistics */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {[
            { number: "150+", label: "Proyectos Completados" },
            { number: "98%", label: "Satisfacción del Cliente" },
            { number: "50+", label: "Clientes Satisfechos" },
            { number: "24/7", label: "Soporte Técnico" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10"
            >
              <motion.h3 
                className="text-4xl font-bold mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 1, type: "spring" }}
              >
                <MetallicText className="copper-text">{stat.number}</MetallicText>
              </motion.h3>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
