import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, Send, User, MessageSquare, CheckCircle } from 'lucide-react'
import MetallicText from './effects/MetallicText'
import Iridescence from './effects/Iridescence'

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
      {/* Iridescence Background Effect */}
      <div className="absolute inset-0 z-0">
        <Iridescence
          color={[1, 1, 1]}
          mouseReact={false}
          amplitude={0.1}
          speed={1.0}
        />
      </div>
      
      {/* Dark overlay para mejorar legibilidad */}
      <div className="absolute inset-0 bg-black/40 z-0" />

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
            <MetallicText className="platinum-text">
              Hablemos de tu Proyecto
            </MetallicText>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-100 max-w-3xl mx-auto drop-shadow-lg"
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
              className="p-8 rounded-2xl backdrop-blur-md border border-white/20 bg-black/60 shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-blue-400" />
                Envíanos un Mensaje
              </h3>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-200 mb-2">Nombre Completo</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-200 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-200 mb-2">Empresa (Opcional)</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-black/40 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                      placeholder="Nombre de tu empresa"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-200 mb-2">Mensaje</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="6"
                      className="w-full px-4 py-4 bg-black/40 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 resize-none"
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
                  <h3 className="text-2xl font-bold text-white mb-4">¡Mensaje Enviado!</h3>
                  <p className="text-gray-200">
                    Gracias por contactarnos. Te responderemos en breve.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-white mb-8">Información de Contacto</h3>
              <p className="text-gray-200 mb-8 leading-relaxed">
                Estamos aquí para ayudarte. No dudes en contactarnos a través de cualquiera 
                de estos medios o visítanos en nuestras oficinas.
              </p>
            </motion.div>

            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.link}
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 10 }}
                className="flex items-center gap-6 p-6 rounded-xl backdrop-blur-md border border-white/20 bg-black/60 hover:border-white/40 transition-all duration-300 group shadow-lg"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300"
                >
                  {info.icon}
                </motion.div>
                <div>
                  <h4 className="font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
                    {info.title}
                  </h4>
                  <p className="text-gray-200 group-hover:text-white transition-colors duration-300">
                    {info.content}
                  </p>
                </div>
              </motion.a>
            ))}

            <motion.div
              variants={itemVariants}
              className="relative overflow-hidden rounded-2xl border border-white/20 backdrop-blur-md shadow-2xl"
            >
              <iframe
                src="https://ta-01ka8rjdaeyfgqp18k032e2p75-3000.wo-5skw4i3kwixzc4jdjgv44qa0g.w.modal.host/?embed=gallery&images=https%253A%252F%252Fimages.unsplash.com%252Fphoto-1519681393784-d120267933ba%253Fq%253D80%2526w%253D2400%2526auto%253Dformat%2526fit%253Dcrop%2Chttps%253A%252F%252Fimages.unsplash.com%252Fphoto-1500530855697-b586d89ba3ee%253Fq%253D80%2526w%253D2400%2526auto%253Dformat%2526fit%253Dcrop%2Chttps%253A%252F%252Fimages.unsplash.com%252Fphoto-1520975916090-3105956dac38%253Fq%253D80%2526w%253D2400%2526auto%253Dformat%2526fit%253Dcrop%2Chttps%253A%252F%252Fimages.unsplash.com%252Fphoto-1469474968028-56623f02e42e%253Fq%253D80%2526w%253D2400%2526auto%253Dformat%2526fit%253Dcrop%2Chttps%253A%252F%252Fimages.unsplash.com%252Fphoto-1506905925346-21bda4d32df4%253Fq%253D80%2526w%253D2400%2526auto%253Dformat%2526fit%253Dcrop%2Chttps%253A%252F%252Fimages.unsplash.com%252Fphoto-1518709268805-4e9042af9f23%253Fq%253D80%2526w%253D2400%2526auto%253Dformat%2526fit%253Dcrop%2Chttps%253A%252F%252Fimages.unsplash.com%252Fphoto-1511593358241-7eea1f3c84e5%253Fq%253D80%2526w%253D2400%2526auto%253Dformat%2526fit%253Dcrop%2Chttps%253A%252F%252Fimages.unsplash.com%252Fphoto-1501594907352-04cda38ebc29%253Fq%253D80%2526w%253D2400%2526auto%253Dformat%2526fit%253Dcrop%2Chttps%253A%252F%252Fimages.unsplash.com%252Fphoto-1486312338219-ce68d2c6f44d%253Fq%253D80%2526w%253D2400%2526auto%253Dformat%2526fit%253Dcrop%2Chttps%253A%252F%252Fimages.unsplash.com%252Fphoto-1441974231531-c6227db76b6e%253Fq%253D80%2526w%253D2400%2526auto%253Dformat%2526fit%253Dcrop%2Chttps%253A%252F%252Fimages.unsplash.com%252Fphoto-1470071459604-3b5ec3a7fe05%253Fq%253D80%2526w%253D2400%2526auto%253Dformat%2526fit%253Dcrop%2Chttps%253A%252F%252Fimages.unsplash.com%252Fphoto-1475924156734-496f6cac6ec1%253Fq%253D80%2526w%253D2400%2526auto%253Dformat%2526fit%253Dcrop%2Chttps%253A%252F%252Fimages.unsplash.com%252Fphoto-1507525428034-b723cf961d3e%253Fq%253D80%2526w%253D2400%2526auto%253Dformat%2526fit%253Dcrop%2Chttps%253A%252F%252Fimages.unsplash.com%252Fphoto-1472214103451-9374bd1c798e%253Fq%253D80%2526w%253D2400%2526auto%253Dformat%2526fit%253Dcrop%2Chttps%253A%252F%252Fimages.unsplash.com%252Fphoto-1433086966358-54859d0ed716%253Fq%253D80%2526w%253D2400%2526auto%253Dformat%2526fit%253Dcrop%2Chttps%253A%252F%252Fimages.unsplash.com%252Fphoto-1505142468610-359e7d316be0%253Fq%253D80%2526w%253D2400%2526auto%253Dformat%2526fit%253Dcrop&h=340&radius=16&gap=16&speed=8&dir=left&pause=1&bg=transparent"
                style={{width: '100%', border: 0, overflow: 'hidden'}}
                height="380"
                allowFullScreen
                loading="lazy"
              />
            </motion.div>

            {/* Office Hours */}
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-xl backdrop-blur-md border border-white/20 bg-black/60 shadow-lg"
            >
              <h4 className="font-semibold text-white mb-4">Horarios de Atención</h4>
              <div className="space-y-2 text-gray-200">
                <div className="flex justify-between">
                  <span>Lunes - Domingo</span>
                  <span>10:30 - 23:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Zona horaria</span>
                  <span className="text-sm text-blue-400">Madrid (CET/CEST)</span>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-white mb-4">Síguenos</h4>
              <div className="flex gap-4">
                {['LinkedIn', 'Twitter', 'Instagram', 'GitHub'].map((platform) => (
                  <motion.a
                    key={platform}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-xl flex items-center justify-center text-white border border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
                  >
                    {platform.charAt(0)}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        variants={itemVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mt-24 pt-12 border-t border-white/20 text-center text-gray-200"
      >
        <div className="container mx-auto px-6">
          <p>&copy; 2025 Innovate Solutions. Todos los derechos reservados.</p>
          <p className="mt-2 text-sm">
            Diseñado con ❤️ para transformar el futuro digital
          </p>
        </div>
      </motion.footer>
    </section>
  )
}

export default Contact
