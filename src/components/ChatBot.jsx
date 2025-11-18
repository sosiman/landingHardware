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

  // Base de conocimiento completa del bot
  const knowledge = {
    // INFORMACIÓN GENERAL
    general: {
      keywords: ['qué es', 'sobre', 'acerca de', 'quiénes son', 'empresa', 'innovate', 'solutions'],
      response: '🏢 Innovate Solutions:\n\nSomos una empresa especializada en consultoría tecnológica, desarrollo de software, IA, ciberseguridad y transformación digital.\n\n✨ Nuestra web es una experiencia interactiva con:\n• Efectos visuales WebGL avanzados\n• Múltiples asistentes IA especializados\n• Testing de hardware integrado\n• Portafolio de proyectos interactivo\n\n📍 Ubicación: Castellón - Onda, España\n🕐 Disponibles: Lunes-Domingo 10:30-23:00 (CET)\n\n¿Qué te gustaría saber específicamente?'
    },

    // SERVICIOS
    servicios: {
      keywords: ['servicios', 'servicio', 'qué hacen', 'ofrecen', 'productos', 'catálogo'],
      response: '🚀 Nuestros 6 Servicios Principales:\n\n1️⃣ Desarrollo de Software\n   • Apps web y móviles\n   • React, Node.js, Python\n   • Chat: CodexChat (protegido)\n\n2️⃣ Consultoría Tecnológica\n   • Estrategia con IA\n   • Optimización de procesos\n   • Chat: OpenAI (protegido)\n\n3️⃣ Procesamiento de Imágenes\n   • DALL-E 3 integration\n   • Generación con IA\n   • Chat especializado\n\n4️⃣ Transformación Digital\n   • Modernización completa\n   • Cloud & Infrastructure\n\n5️⃣ Ciberseguridad\n   • Auditorías & Pentesting\n   • Protección 24/7\n\n6️⃣ Capacitación\n   • Formación tech avanzada\n\n💡 Cada servicio tiene efectos visuales únicos. ¿Cuál te interesa?'
    },

    // CONTACTO
    contacto: {
      keywords: ['contacto', 'email', 'teléfono', 'llamar', 'escribir', 'ubicación', 'dirección', 'horario'],
      response: '📞 Información de Contacto:\n\n📧 Email: albertotplaza@gmail.com\n📱 Teléfono: +34 621 208 980\n📍 Oficina: Castellón - Onda, España\n🕐 Horario: Lunes - Domingo\n   10:30 - 23:00 (CET/CEST)\n\n🌐 Redes Sociales:\n• LinkedIn, Twitter, Instagram, GitHub\n\n📝 Formulario de contacto disponible en la sección Contact con validación en tiempo real.\n\n¿Prefieres que te contactemos nosotros?'
    },

    // TECNOLOGÍAS
    tecnologias: {
      keywords: ['tecnologías', 'stack', 'herramientas', 'frameworks', 'librerías', 'tech', 'código', 'construido'],
      response: '💻 Stack Tecnológico:\n\n🎨 Frontend:\n• React 18.2.0\n• Vite 5.2.0 (build tool)\n• Tailwind CSS 3.4.3\n• Framer Motion 11.0.0 (animaciones)\n\n🎮 Gráficos 3D:\n• Three.js 0.180.0\n• @react-three/fiber & drei\n• OGL 1.0.11 (WebGL optimizado)\n• Postprocessing 6.37.8\n\n🤖 IA & Integraciones:\n• @n8n/chat 0.59.0\n• OpenAI API\n• DALL-E 3\n\n🎯 Características:\n• Shaders GLSL personalizados\n• WebGL para efectos avanzados\n• Glassmorphism design\n• Responsive mobile-first\n\n¿Quieres detalles de alguna tecnología?'
    },

    // DESARROLLO
    desarrollo: {
      keywords: ['desarrollo', 'app', 'aplicación', 'web', 'móvil', 'software', 'programación', 'proyecto'],
      response: '💻 Desarrollo de Software:\n\n🌐 Aplicaciones Web:\n• React, Next.js, Vue.js\n• Node.js, Express\n• APIs RESTful & GraphQL\n• Progressive Web Apps (PWA)\n\n📱 Apps Móviles:\n• React Native (iOS/Android)\n• Flutter\n• Apps nativas\n\n🔧 Backend:\n• Node.js, Python, PHP\n• Bases de datos: MongoDB, PostgreSQL, MySQL\n• Microservicios\n• Cloud: AWS, Azure, GCP\n\n🎨 Características de nuestra web:\n• Construida con React + Vite\n• 20+ efectos visuales WebGL\n• CodexChat para consultas de código\n\n💡 Ejemplo de proyecto: E-commerce con +230% conversión\n\n¿Tienes un proyecto en mente?'
    },

    // INTELIGENCIA ARTIFICIAL
    ia: {
      keywords: ['ia', 'inteligencia artificial', 'machine learning', 'ai', 'datos', 'analytics', 'neural', 'deep learning'],
      response: '🤖 IA y Machine Learning:\n\n🧠 Servicios:\n• Machine Learning Models\n• Deep Learning\n• Natural Language Processing (NLP)\n• Computer Vision\n• Predictive Analytics\n• Big Data Processing\n\n💬 Asistentes IA en la web:\n1. ChatBot (yo) - Asistente principal\n2. Sonar-Pro - Chat avanzado n8n\n3. OpenAIChat - Consultoría con GPT\n4. OpenAIImageChat - DALL-E 3\n5. CodexChat - Desarrollo de software\n\n🌐 Visualización:\n• Red neuronal interactiva integrada\n• URL: https://nn-vis.noelith.dev/\n• Entrena y visualiza redes en tiempo real\n\n📊 Proyecto destacado:\n• AI Dashboard con TensorFlow\n• Predicciones en tiempo real\n\n¿Qué problema de IA quieres resolver?'
    },

    // ASISTENTES
    asistentes: {
      keywords: ['asistente', 'chat', 'bot', 'chatbot', 'sonar', 'openai', 'codex', 'ayuda'],
      response: '🤖 Asistentes IA Disponibles:\n\n1️⃣ ChatBot (yo mismo)\n   • Asistente principal\n   • Base de conocimiento completa\n   • Ubicación: Esquina inferior derecha\n   • Efecto: Orb circular WebGL\n\n2️⃣ Sonar-Pro\n   • Chat avanzado n8n\n   • Conectado a workflows\n   • Sesiones persistentes\n   • Botón en Hero section\n\n3️⃣ OpenAI Chat\n   • Consultoría tecnológica\n   • Powered by GPT\n   • Protegido con contraseña\n\n4️⃣ OpenAI Image Chat\n   • Generación con DALL-E 3\n   • Procesamiento de imágenes\n   • Protegido con contraseña\n\n5️⃣ Codex Chat\n   • Especializado en desarrollo\n   • Syntax highlighting\n   • Ejemplos de código\n   • Protegido con contraseña\n\n🔐 Contraseña para chats protegidos: "sosi"\n\n¿Qué asistente necesitas usar?'
    },

    // EFECTOS VISUALES
    efectos: {
      keywords: ['efectos', 'animaciones', 'visual', 'webgl', 'orb', 'galaxy', 'hyperspeed', 'gráficos', '3d'],
      response: '✨ Efectos Visuales de la Web:\n\n🌀 Efecto Orb (mi animación):\n• WebGL con shaders GLSL\n• Biblioteca OGL\n• 3 colores base animados\n• Interactivo con hover\n• Rotación en hover\n\n🌌 Galaxy Effect:\n• Three.js particles\n• Fondo de Services + Gallery\n• Rotación lenta\n• Twinkle effect\n\n⚡ Hyperspeed:\n• Carretera espacial\n• Aparece desde Services\n• Colores morados/púrpuras\n• Coches animados\n\n🎨 20+ Efectos Adicionales:\n• NeuralNetwork\n• CodeMatrix\n• DataFlow\n• GeometricMorph\n• ShieldField\n• KnowledgeOrbs\n• Iridescence\n• Lightning\n• ParticleSwarm\n• CircuitBoard\n• Y más...\n\n🎭 Técnicas:\n• Glassmorphism design\n• Backdrop blur\n• Framer Motion animations\n• MetallicText (cromado, plateado, dorado)\n• VariableProximity text\n\n¿Quieres saber sobre algún efecto específico?'
    },

    // TESTING DE HARDWARE
    hardware: {
      keywords: ['hardware', 'test', 'testing', 'benchmark', 'vsbm', 'rendimiento', 'performance', 'gpu', 'cpu'],
      response: '🔧 Testing de Hardware (VSBM):\n\n📊 Very Simple Benchmark integrado:\n• URL: https://cznull.github.io/vsbm\n• Acceso: Botón "Hardware Test" en Hero\n\n🧪 Tests Disponibles:\n\n💻 CPU Tests:\n• Single-Core Performance\n• Multi-Core Performance\n• Integer & Float Operations\n• Memory Access Speed\n\n🎮 GPU Tests:\n• WebGL Performance\n• 3D Rendering\n• Shader Performance\n• Fill Rate\n• Texture Processing\n\n🧠 Memory Tests:\n• RAM Speed\n• Cache Performance\n• Memory Bandwidth\n• Latency\n\n💾 Storage Tests:\n• Read/Write Speed\n• Random/Sequential Access\n\n📈 Resultados:\n• Scores numéricos\n• Gráficos comparativos\n• Percentiles\n• Recomendaciones\n• Exportación de datos\n\n🎯 Modal fullscreen con glassmorphism design\n\n¿Quieres probar el benchmark?'
    },

    // TABLETAS/SERVICIOS INTERACTIVOS
    tabletas: {
      keywords: ['tableta', 'tabletas', 'tarjetas', 'cards', 'servicios interactivos', 'protección', 'contraseña', 'password'],
      response: '🎴 Tabletas de Servicios Interactivas:\n\n🔐 Sistema de Protección:\n3 servicios protegidos con contraseña:\n\n1️⃣ Desarrollo de Software\n   • Abre: CodexChat\n   • Efecto: CodeMatrix\n   • Icono: Código (</>)\n\n2️⃣ Consultoría Tecnológica\n   • Abre: OpenAIChat\n   • Efecto: NeuralNetwork\n   • Icono: OpenAI logo\n\n3️⃣ Procesamiento de Imágenes\n   • Abre: OpenAIImageChat\n   • Efecto: DataFlow\n   • Icono: Imagen\n\n🔑 Contraseña: "sosi"\n\n✨ Características:\n• Hover 3D con rotación\n• Canvas effects únicos\n• Gradientes animados\n• Glassmorphism design\n• Modal de contraseña animado\n• Validación en tiempo real\n\n🆓 Servicios sin contraseña:\n• Transformación Digital\n• Ciberseguridad\n• Capacitación\n\n💡 Cada tarjeta tiene su efecto visual único de fondo\n\n¿Necesitas acceso a algún servicio?'
    },

    // PORTAFOLIO/GALERÍA
    galeria: {
      keywords: ['galería', 'gallery', 'portafolio', 'portfolio', 'proyectos', 'trabajos', 'casos'],
      response: '🖼️ Portafolio de Proyectos:\n\n📂 6 Proyectos Destacados:\n\n1️⃣ E-commerce Platform\n   • Stack: React, Node.js, MongoDB\n   • Resultado: +230% conversión\n   • Categoría: Web\n\n2️⃣ Mobile Banking App\n   • Stack: React Native, Firebase\n   • Resultado: 99.9% uptime\n   • Categoría: Mobile\n\n3️⃣ AI Dashboard\n   • Stack: Python, TensorFlow, D3.js\n   • Resultado: Predicciones real-time\n   • Categoría: IA\n\n4️⃣ Cloud Infrastructure\n   • Stack: AWS, Docker, Kubernetes\n   • Resultado: Despliegues 4x más rápidos\n   • Categoría: Cloud\n\n5️⃣ Corporate Website\n   • Stack: Next.js, Strapi, Tailwind\n   • Resultado: Carga < 1s\n   • Categoría: Web\n\n6️⃣ IoT Control System\n   • Stack: Arduino, MQTT, React\n   • Resultado: Monitoreo 24/7\n   • Categoría: IoT\n\n🎬 Características:\n• Videos autoplay de cada proyecto\n• Filtros: Todos, Web, Mobile, IA, Cloud, IoT\n• Modal de ampliación\n• Hover effects 3D\n• Transiciones animadas\n\n¿Quieres ver algún proyecto específico?'
    },

    // REDES NEURONALES
    redes: {
      keywords: ['redes neuronales', 'neural network', 'visualización', 'nn-vis', 'entrena'],
      response: '🧠 Visualización de Redes Neuronales:\n\n🌐 Herramienta Interactiva:\n• URL: https://nn-vis.noelith.dev/\n• Acceso: Botón "Redes Neuronales" en Hero\n• Modal: 1040px alto (casi fullscreen)\n\n🎯 Funcionalidades:\n• Arquitectura de red configurable\n• Entrenamiento en tiempo real\n• Visualización de capas y pesos\n• Datasets predefinidos\n• Gráficos de pérdida y precisión\n• Interacción completa\n\n🎨 Diseño:\n• Gradiente verde esmeralda-turquesa\n• Indicador animado\n• Permisos completos de interacción\n• Glassmorphism\n\n💡 Ideal para:\n• Aprender ML/DL\n• Experimentar con arquitecturas\n• Visualizar backpropagation\n• Entender redes profundas\n\n🚀 Totalmente integrado en nuestra landing\n\n¿Quieres explorar las redes neuronales?'
    },

    // ESTRUCTURA DEL PROYECTO
    estructura: {
      keywords: ['estructura', 'componentes', 'archivos', 'organización', 'carpetas', 'files'],
      response: '📁 Estructura del Proyecto:\n\n🎯 Secciones Principales:\n1. Hero - Portada con modelo 3D\n2. Services - 6 servicios interactivos\n3. Gallery - Portafolio de proyectos\n4. Contact - Formulario e info\n\n🧩 Componentes Clave:\n• Navigation - Barra fija con glassmorphism\n• OrbBot - Asistente IA circular (YO)\n• ChatBot - Modal de chat (esta conversación)\n• RobotModel - Modelo 3D en Hero\n• N8nChatEmbed - Sonar-Pro chat\n• OpenAIChat, OpenAIImageChat, CodexChat\n\n✨ Efectos (20+ archivos):\n• Orb.jsx - Mi animación circular\n• Galaxy.jsx - Fondo espacial\n• Hyperspeed.jsx - Carretera espacial\n• NeuralNetwork, CodeMatrix, DataFlow\n• MetallicText, VariableProximity\n• Y muchos más...\n\n📦 Tech Stack:\n• React 18 + Vite\n• Framer Motion\n• Three.js + OGL\n• Tailwind CSS\n\n📄 Archivos de config:\n• vite.config.js\n• tailwind.config.js\n• package.json\n\n¿Quieres saber más sobre algún componente?'
    },

    // FUNCIONALIDADES
    funcionalidades: {
      keywords: ['funcionalidades', 'características', 'features', 'funciones', 'qué puede hacer'],
      response: '⚡ Funcionalidades de la Web:\n\n🎨 Visuales:\n• 20+ efectos WebGL/Canvas\n• Animaciones Framer Motion\n• Glassmorphism design\n• Parallax scrolling\n• Transiciones suaves\n• Responsive mobile-first\n\n🤖 Interactivas:\n• 5 asistentes IA diferentes\n• Sistema de contraseñas\n• Filtros de proyectos dinámicos\n• Modal de ampliación\n• Formulario con validación\n\n🔧 Testing:\n• VSBM hardware benchmark\n• Tests CPU, GPU, RAM, Storage\n• Visualizador de redes neuronales\n• Entrenamiento en tiempo real\n\n📞 Contacto:\n• Formulario animado\n• Validación en tiempo real\n• Carousel de videos\n• Información completa\n• Redes sociales\n\n🎬 Multimedia:\n• Videos autoplay\n• Imágenes rotativas\n• Modelo 3D de robot\n• Efectos de partículas\n\n🚀 Performance:\n• Vite HMR\n• Code splitting\n• Lazy loading\n• Optimizado para producción\n\n¿Quieres probar alguna funcionalidad?'
    },

    // MODELO 3D
    robot: {
      keywords: ['robot', 'modelo', '3d', 'three', 'modelo 3d', 'animación 3d'],
      response: '🤖 Modelo 3D de Robot:\n\n📍 Ubicación:\n• Hero section, lado izquierdo\n• Visible solo en desktop (lg+)\n• Tamaño: 500x850px\n\n✨ Efectos:\n• Glow effect pulsante\n• Anillos orbitales animados\n• 2 anillos con rotación contraria\n• Gradientes púrpura-azul-rosa\n• Entrada animada con slide\n\n🎨 Características:\n• Three.js + @react-three/fiber\n• @react-three/drei para helpers\n• Iluminación dinámica\n• Sombras en tiempo real\n• Optimizado para performance\n\n⚙️ Tecnología:\n• RobotModel.jsx component\n• Canvas de Three.js\n• Framer Motion para animaciones\n• willChange para optimización\n\n💡 Decoración:\n• Anillo exterior: rotación 360° / 20s\n• Anillo interior: rotación -360° / 15s\n• Glow: pulso 0.3-0.6 opacity / 4s\n\n🎯 Posicionamiento absoluto para layout perfecto\n\n¿Te gusta el efecto 3D?'
    },

    // SEGURIDAD
    seguridad: {
      keywords: ['seguridad', 'ciberseguridad', 'protección', 'hackeo', 'vulnerabilidad', 'auditoría'],
      response: '🛡️ Ciberseguridad:\n\n🔒 Nuestros Servicios:\n• Auditorías de seguridad completas\n• Pentesting ético\n• Análisis de vulnerabilidades\n• Protección DDoS\n• Firewall & IDS/IPS\n• Compliance (GDPR, ISO 27001)\n• Monitoreo 24/7\n• Respuesta a incidentes\n\n🔐 Seguridad en la Web:\n• Sistema de contraseñas para servicios\n• Validación en tiempo real\n• Sandbox en iframes\n• HTTPS (recomendado en producción)\n• Sanitización de inputs\n• Content Security Policy\n\n🎨 Efecto Visual:\n• ShieldField - Campo de escudo hexagonal\n• Tarjeta con gradiente índigo-azul\n• Icono de escudo pulsante\n\n💼 Casos de Uso:\n• Protección de infraestructura\n• Cumplimiento normativo\n• Seguridad en desarrollo\n• Formación de equipos\n\n📊 Monitoreo continuo y reportes detallados\n\n¿Necesitas una auditoría de seguridad?'
    },

    // PRECIOS
    precios: {
      keywords: ['precio', 'costo', 'cuánto', 'presupuesto', 'tarifa', 'cotización', 'cuanto cuesta'],
      response: '💰 Precios y Presupuestos:\n\n🎁 Oferta Inicial:\n• Consulta inicial 100% GRATUITA\n• Análisis de necesidades\n• Propuesta personalizada\n• Sin compromiso\n\n💼 Modelo de Trabajo:\n• Presupuestos personalizados\n• Cada proyecto es único\n• Planes flexibles de pago\n• Opciones de financiación\n• Mantenimiento incluido\n• Soporte post-lanzamiento\n\n📊 Factores del Presupuesto:\n• Complejidad del proyecto\n• Tecnologías requeridas\n• Tiempos de entrega\n• Equipo necesario\n• Integrations & APIs\n• Soporte y mantenimiento\n\n🤝 Proceso:\n1. Consulta gratuita\n2. Análisis de requisitos\n3. Propuesta detallada\n4. Negociación flexible\n5. Contrato transparente\n6. Desarrollo ágil\n7. Entrega y soporte\n\n📞 Contacto:\n• Email: albertotplaza@gmail.com\n• Teléfono: +34 621 208 980\n\n¿Quieres agendar una consulta gratuita?'
    },

    // SALUDOS
    hola: {
      keywords: ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'hey', 'hi', 'hello', 'saludos'],
      response: '¡Hola! 👋😊\n\nEs un placer saludarte. Soy el asistente IA de Innovate Solutions, representado por la esfera circular animada (Orb) que viste en la esquina inferior derecha.\n\n🌟 Estoy aquí para ayudarte con:\n• Información sobre nuestros servicios\n• Detalles técnicos del proyecto\n• Testing de hardware\n• Portafolio de proyectos\n• Contacto y presupuestos\n• Tecnologías y efectos visuales\n• Y mucho más...\n\n💡 Puedo responder sobre:\n✅ Asistentes IA (5 disponibles)\n✅ Efectos visuales (20+ efectos)\n✅ Stack tecnológico completo\n✅ Estructura del código\n✅ Funcionalidades interactivas\n✅ Testing y benchmarks\n\n¿Qué te gustaría saber sobre Innovate Solutions?'
    },

    // AGRADECIMIENTOS
    gracias: {
      keywords: ['gracias', 'thanks', 'thank you', 'perfecto', 'genial', 'excelente', 'bien', 'ok'],
      response: '¡De nada! 🌟✨\n\nEs un placer ayudarte. Me alegra que la información haya sido útil.\n\n💡 Recuerda que puedes preguntarme sobre:\n• Cualquier servicio de Innovate Solutions\n• Tecnologías y efectos visuales de la web\n• Los 5 asistentes IA disponibles\n• Testing de hardware (VSBM)\n• Proyectos del portafolio\n• Cómo contactar con el equipo\n• Estructura del proyecto\n• Y mucho más...\n\n🤖 También puedes usar otros asistentes:\n• Sonar-Pro (chat avanzado n8n)\n• OpenAI Chat (consultoría)\n• OpenAI Image Chat (DALL-E 3)\n• Codex Chat (desarrollo)\n\n¿Hay algo más en lo que pueda asistirte? 😊'
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

    // Guardar el input antes de limpiarlo
    const userInput = input

    const userMessage = {
      type: 'user',
      text: userInput,
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simular tiempo de respuesta
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: getBotResponse(userInput),
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
