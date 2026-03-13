import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, Send, User, MessageSquare, CheckCircle } from 'lucide-react'
import MetallicText from './effects/MetallicText'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', company: '', message: '' })
    }, 3000)
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: "albertotplaza@gmail.com",
      link: "mailto:albertotplaza@gmail.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Teléfono",
      content: "+34 621 208 980",
      link: "tel:+34621208980"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Oficina",
      content: "Castellón - Onda, España",
      link: "#"
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
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Overlay sutil para legibilidad en fondo claro */}
      <div className="absolute inset-0 bg-white/20 z-0" />

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
            className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl relative inline-block"
          >
            <MetallicText className="platinum-text">
              Hablemos de tu Proyecto
            </MetallicText>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-zinc-600 max-w-3xl mx-auto drop-shadow-sm"
          >
            ¿Tienes una idea innovadora? Contáctanos y descubre cómo podemos
            ayudarte a convertirla en realidad digital.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            <motion.div
              variants={itemVariants}
              className="p-8 rounded-2xl backdrop-blur-md border border-zinc-200 bg-white/40 shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-zinc-900 mb-8 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-blue-600" />
                Envíanos un Mensaje
              </h3>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <label className="block text-zinc-700 mb-2">Nombre Completo</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-white/40 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-zinc-700 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-white/40 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-zinc-700 mb-2">Empresa (Opcional)</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-white/40 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      placeholder="Nombre de tu empresa"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-zinc-700 mb-2">Mensaje</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="6"
                      className="w-full px-4 py-4 bg-white/40 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                      placeholder="Cuéntanos sobre tu proyecto..."
                    ></textarea>
                  </motion.div>

                  <motion.button
                    variants={itemVariants}
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <Send className="w-5 h-5" />
                    Enviar Mensaje
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-zinc-900 mb-4">¡Mensaje Enviado!</h3>
                  <p className="text-zinc-600">
                    Gracias por contactarnos. Te responderemos en breve.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Contact Information & Team */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-zinc-900 mb-8">Nuestro Equipo</h3>
            </motion.div>

            {/* José Alberto */}
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-xl backdrop-blur-md border border-zinc-200 bg-white/40 shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white shrink-0">
                  <User className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-zinc-900">José Alberto Trujillo Plaza</h4>
                  <p className="text-blue-600 font-medium mb-3">Master Full-Stack AI Engineering</p>
                  <div className="space-y-2">
                    <a
                      href="https://wa.me/34621208980"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-zinc-600 hover:text-green-600 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>+34 621 208 980</span>
                      <span className="text-xs bg-green-500/20 text-green-600 px-2 py-0.5 rounded-full">WhatsApp</span>
                    </a>
                    <a
                      href="mailto:albertotplaza@gmail.com"
                      className="flex items-center gap-2 text-zinc-600 hover:text-blue-600 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>albertotplaza@gmail.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>


          </motion.div>
        </div>
      </div>


    </section>
  )
}

export default Contact
