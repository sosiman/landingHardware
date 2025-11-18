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

  // Base de conocimiento del bot - COMPLETA con información del proyecto
  const knowledge = {
    proyecto: {
      keywords: ['proyecto', 'web', 'página', 'site', 'qué es esto', 'para qué', 'propósito'],
      response: '🌐 Landing Hardware - Innovate Solutions\n\nEsta es una web diseñada para **probar hardware potente** mediante:\n\n• 23 efectos visuales avanzados\n• Renderizado 3D en tiempo real\n• 5 interfaces de chat con IA\n• Animaciones complejas simultáneas\n\nTecnologías: React 18 + Vite + Three.js + OpenAI\n\n¿Quieres saber más sobre alguna funcionalidad específica?'
    },
    tecnologias: {
      keywords: ['tecnología', 'tecnologías', 'stack', 'framework', 'react', 'vite', 'construido', 'programado', 'código'],
      response: '⚙️ Stack Tecnológico:\n\n**Frontend:**\n• React 18 + Vite 5.2\n• Tailwind CSS + Framer Motion\n• Three.js (gráficos 3D)\n• 23 efectos visuales Canvas/WebGL\n\n**Backend:**\n• Express + Node.js\n• OpenAI API (GPT-4o, DALL-E 3)\n• Rate limiting + CORS\n\n**Arquitectura:**\n• SPA (Single Page App)\n• API REST\n• Docker + Nginx\n\n¿Quieres detalles sobre algún componente?'
    },
    chats: {
      keywords: ['chat', 'chats', 'asistentes', 'ia', 'inteligencia artificial', 'bots', 'conversación'],
      response: '💬 Sistema de Chats (5 implementaciones):\n\n1. **ChatBot** (este) - Respuestas locales sin IA\n2. **CodexChat** - Desarrollo de software (GPT-4o)\n3. **OpenAIChat** - Consultoría tecnológica (GPT-4o)\n4. **OpenAIImageChat** - Generación imágenes (DALL-E 3)\n5. **N8nChatEmbed** - Workflows personalizados\n\n¿Quieres probar alguno de los chats con IA?'
    },
    efectos: {
      keywords: ['efectos', 'visuales', 'animaciones', 'gráficos', '3d', 'partículas'],
      response: '✨ 23 Efectos Visuales Avanzados:\n\n**Principales:**\n• Galaxy - Estrellas interactivas\n• Hyperspeed - Velocidad hiperespacio\n• CodeMatrix - Código cayendo\n• NeuralNetwork - Red neuronal animada\n• Orb - Esfera flotante (OrbBot)\n• MetallicText - Efecto cromo\n\nY 17 efectos más: DataFlow, Lightning, ParticleSwarm, WaveField, etc.\n\n¡Todos optimizados para 60fps!'
    },
    arquitectura: {
      keywords: ['arquitectura', 'estructura', 'componentes', 'organización', 'cómo funciona', 'funcionamiento'],
      response: '🏗️ Arquitectura del Proyecto:\n\n**Componentes principales:**\n• App.jsx - Raíz con parallax scroll\n• Hero.jsx - Portada con modelo 3D\n• Services.jsx - Tarjetas servicios\n• Gallery.jsx - Galería proyectos\n• Navigation.jsx - Header\n\n**Backend API:**\n• /api/chat - Chat general\n• /api/chat/codex - Chat código\n• /api/generate-image - DALL-E 3\n\n¿Quieres saber más sobre algún componente?'
    },
    tabletas: {
      keywords: ['tableta', 'tabletas', 'tablet', 'tablets', 'demo', 'kiosco'],
      response: '📱 Tabletas Interactivas:\n\nInterfaces protegidas para demostraciones públicas:\n\n• Acceso con contraseña\n• Modo fullscreen\n• 5 chats especializados\n• Generación de imágenes IA\n• Desarrollo con Codex\n\nPerfecto para kioscos o presentaciones.\n\n¿Necesitas acceso a las tabletas?'
    },
    automatizacion: {
      keywords: ['automatización', 'automatizacion', 'workflows', 'n8n', 'integración'],
      response: '🔄 Automatización:\n\n• **N8nChatEmbed** - Workflows visuales\n• **Webhooks** - Triggers personalizados\n• **OpenAI Integration** - Respuestas automáticas\n• **API REST** - Integraciones externas\n\nPuedes crear flujos complejos con n8n.\n\n¿Quieres saber cómo funciona n8n?'
    },
    servicios: {
      keywords: ['servicios', 'servicio', 'qué hacen', 'ofrecen', 'productos'],
      response: '🚀 Nuestros servicios incluyen:\n\n• Desarrollo de Software (React, Node.js)\n• Consultoría Tecnológica\n• Gestión de Datos e IA\n• Interfaces con efectos 3D avanzados\n• Integraciones OpenAI (Chat + Imágenes)\n• Ciberseguridad\n• Capacitación\n\n¿Sobre cuál te gustaría saber más?'
    },
    contacto: {
      keywords: ['contacto', 'email', 'teléfono', 'llamar', 'escribir', 'ubicación', 'dirección'],
      response: '📞 Puedes contactarnos:\n\n📧 Email: albertotplaza@gmail.com\n📱 Teléfono: +34 621 208 980\n📍 Ubicación: Castellón - Onda, España\n🕐 Horario: Lunes - Domingo, 10:30 - 23:00 (CET/CEST)\n🌐 Dominio: lockthard.es\n\n¿Prefieres que te contactemos nosotros?'
    },
    desarrollo: {
      keywords: ['desarrollo', 'app', 'aplicación', 'web', 'móvil', 'software', 'programación'],
      response: '💻 Desarrollo de Software:\n\nCreamos aplicaciones usando tecnologías modernas:\n\n**Frontend:**\n• React 18, Next.js, Vue\n• Tailwind CSS, Framer Motion\n• Three.js para 3D\n\n**Backend:**\n• Node.js, Express\n• APIs REST\n• Integraciones OpenAI\n\n**Deploy:**\n• Docker + Nginx\n• Optimización rendimiento\n\n¿Tienes un proyecto en mente?'
    },
    hardware: {
      keywords: ['hardware', 'rendimiento', 'fps', 'optimización', 'gpu', 'cpu'],
      response: '⚡ Prueba de Hardware:\n\nEsta web está optimizada para:\n\n• **FPS objetivo:** 60fps constantes\n• **GPU:** Renderizado 3D WebGL\n• **CPU:** Cálculos partículas\n• **RAM:** Texturas y modelos 3D\n\n**Elementos intensivos:**\n• 23 efectos simultáneos\n• Miles de partículas\n• Animaciones complejas\n• Parallax multi-capa\n\n¡Perfecto para benchmarking!'
    },
    documentacion: {
      keywords: ['documentación', 'documentacion', 'docs', 'información', 'detalles', 'manual'],
      response: '📚 Documentación Disponible:\n\n• **PROJECT_KNOWLEDGE.json** - Base conocimiento JSON completa\n• **DOCUMENTACION_COMPLETA.md** - Guía detallada markdown\n• **README.md** - Información general\n• **COMANDOS.md** - Guía instalación\n\nToda la documentación está en el repositorio.\n\n¿Necesitas acceso al código fuente?'
    },
    precios: {
      keywords: ['precio', 'costo', 'cuánto', 'presupuesto', 'tarifa', 'cotización'],
      response: '💰 Precios:\n\nCada proyecto es único. Ofrecemos:\n\n• Consulta inicial GRATUITA\n• Presupuestos personalizados\n• Planes flexibles de pago\n• Soporte post-lanzamiento\n• Documentación completa\n\n¿Quieres agendar una consulta gratuita?'
    },
    hola: {
      keywords: ['hola', 'buenos días', 'buenas tardes', 'hey', 'hi', 'hello'],
      response: '¡Hola! 😊 Soy el asistente de Innovate Solutions. Puedo ayudarte con información sobre:\n\n• El proyecto y tecnologías\n• Los 5 chats con IA\n• Los 23 efectos visuales\n• Arquitectura y componentes\n• Servicios y contacto\n\n¿Qué te gustaría saber?'
    },
    gracias: {
      keywords: ['gracias', 'thanks', 'thank you', 'perfecto', 'genial', 'excelente'],
      response: '¡De nada! 🌟 Es un placer ayudarte. Si tienes más preguntas sobre el proyecto, los chats IA, o cualquier aspecto técnico, aquí estaré. ¿Hay algo más en lo que pueda asistirte?'
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
