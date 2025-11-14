import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot, Minimize2 } from 'lucide-react'

const ChatBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: '¡Hola! 👋 Soy el asistente virtual de Innovate Solutions. ¿En qué puedo ayudarte hoy?',
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const chatContainerRef = useRef(null)

  // Base de conocimiento del bot
  const knowledge = {
    servicios: {
      keywords: ['servicios', 'servicio', 'qué hacen', 'ofrecen', 'productos'],
      response: '🚀 Nuestros servicios incluyen:\n\n• Desarrollo de Software\n• Consultoría Tecnológica\n• Gestión de Datos e IA\n• Transformación Digital\n• Ciberseguridad\n• Capacitación\n\n¿Sobre cuál te gustaría saber más?'
    },
    contacto: {
      keywords: ['contacto', 'email', 'teléfono', 'llamar', 'escribir', 'ubicación', 'dirección'],
      response: '📞 Puedes contactarnos:\n\n📧 Email: albertotplaza@gmail.com\n📱 Teléfono: +34 621 208 980\n📍 Ubicación: Castellón - Onda, España\n🕐 Horario: Lunes - Domingo, 10:30 - 23:00 (CET/CEST)\n\n¿Prefieres que te contactemos nosotros?'
    },
    desarrollo: {
      keywords: ['desarrollo', 'app', 'aplicación', 'web', 'móvil', 'software', 'programación'],
      response: '💻 Desarrollo de Software:\n\nCreamos aplicaciones web y móviles personalizadas usando las últimas tecnologías:\n\n• React, Next.js, Vue\n• Node.js, Python\n• Apps iOS y Android\n• APIs y Microservicios\n\n¿Tienes un proyecto en mente?'
    },
    ia: {
      keywords: ['ia', 'inteligencia artificial', 'machine learning', 'ai', 'datos', 'analytics'],
      response: '🤖 IA y Gestión de Datos:\n\nOfrecemos soluciones de:\n\n• Big Data & Analytics\n• Machine Learning\n• Procesamiento de lenguaje natural\n• Visión por computadora\n• Automatización inteligente\n\n¿Qué problema quieres resolver con IA?'
    },
    seguridad: {
      keywords: ['seguridad', 'ciberseguridad', 'protección', 'hackeo', 'vulnerabilidad'],
      response: '🛡️ Ciberseguridad:\n\nProtegemos tu empresa con:\n\n• Auditorías de seguridad\n• Pentesting\n• Protección DDoS\n• Compliance (GDPR, ISO)\n• Monitoreo 24/7\n\n¿Necesitas una auditoría de seguridad?'
    },
    precios: {
      keywords: ['precio', 'costo', 'cuánto', 'presupuesto', 'tarifa', 'cotización'],
      response: '💰 Precios:\n\nCada proyecto es único. Ofrecemos:\n\n• Consulta inicial GRATUITA\n• Presupuestos personalizados\n• Planes flexibles de pago\n• Soporte post-lanzamiento\n\n¿Quieres agendar una consulta gratuita?'
    },
    hola: {
      keywords: ['hola', 'buenos días', 'buenas tardes', 'hey', 'hi', 'hello'],
      response: '¡Hola! 😊 Es un placer saludarte. Estoy aquí para ayudarte con cualquier consulta sobre Innovate Solutions. ¿Qué te gustaría saber?'
    },
    gracias: {
      keywords: ['gracias', 'thanks', 'thank you', 'perfecto', 'genial', 'excelente'],
      response: '¡De nada! 🌟 Es un placer ayudarte. Si tienes más preguntas, aquí estaré. ¿Hay algo más en lo que pueda asistirte?'
    }
  }

  const scrollToBottom = () => {
    // Usar scrollTo en lugar de scrollIntoView para evitar scroll de la página
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase()
    
    // Buscar en la base de conocimiento
    for (const [key, data] of Object.entries(knowledge)) {
      if (data.keywords.some(keyword => input.includes(keyword))) {
        return data.response
      }
    }

    // Respuesta por defecto
    return '🤔 Interesante pregunta. Te recomiendo:\n\n• Explorar nuestros Servicios\n• Ver nuestra Galería de proyectos\n• Contactarnos directamente\n\n¿Quieres que te conecte con un asesor humano?'
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = {
      type: 'user',
      text: input,
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simular tiempo de respuesta
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: getBotResponse(input),
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    handleSend()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay oscuro detrás del chat */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        style={{ right: '-72px' }}
        className="fixed bottom-20 w-96 h-[32rem] backdrop-blur-2xl bg-white/5 rounded-3xl shadow-2xl border border-white/20 flex flex-col z-[61] overflow-hidden"
      >
        {/* Efecto de cristal - capas de fondo */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5 pointer-events-none" />
        
        {/* Reflejos de cristal */}
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/20 to-transparent rounded-t-3xl pointer-events-none"
        />
        
        {/* Header */}
        <div className="relative flex items-center justify-between p-4 border-b border-white/20 bg-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-md"
              />
              <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white/30 shadow-lg shadow-green-400/50"></span>
            </div>
            <div>
              <h3 className="font-semibold text-white">Asistente IA</h3>
              <p className="text-xs text-green-400">● En línea</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-all backdrop-blur-sm"
          >
            <X className="w-5 h-5 text-gray-400" />
          </motion.button>
        </div>

        {/* Messages */}
        <div 
          ref={chatContainerRef}
          className="relative flex-1 overflow-y-auto p-4 space-y-4"
        >
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%]`}>
                <div
                  className={`p-3 rounded-2xl backdrop-blur-md border shadow-lg ${
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-blue-500/90 to-purple-600/90 border-white/30 text-white shadow-blue-500/30'
                      : 'bg-white/10 border-white/20 text-gray-100 shadow-black/20'
                  }`}
                >
                  <p className="whitespace-pre-line text-sm">{message.text}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1 px-3">{message.time}</p>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl shadow-lg">
                <div className="flex gap-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="relative p-4 border-t border-white/20 bg-white/5 backdrop-blur-sm">
          <form 
            onSubmit={handleFormSubmit}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-1 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all shadow-inner"
              autoComplete="off"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!input.trim()}
              className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/50 transition-all backdrop-blur-sm border border-white/20"
            >
              <Send className="w-5 h-5 text-white" />
            </motion.button>
          </form>
        </div>
      </motion.div>
    </>
  )
}

export default ChatBot
