# Landing Page Animada - Innovate Solutions

Landing page moderna e interactiva desarrollada con React 19 + Vite + Framer Motion + Tailwind CSS + Three.js. Presenta efectos visuales avanzados WebGL, múltiples asistentes IA, modelos 3D interactivos, y una galería de proyectos.

## 🚀 Características Principales

### Efectos Visuales Avanzados
- 🌌 **Efectos WebGL**: Shaders GLSL personalizados (Orb effect)
- 🌟 **30+ Efectos Visuales**: Galaxy, Hyperspeed, NeuralNetwork, CodeMatrix, DataFlow, etc.
- 💫 **Modelos 3D**: Robot, Car, Globe con Three.js
- ✨ **Texto Metálico**: Efectos cromados y plateados
- 🎯 **Efectos de Proximidad**: Texto que responde al cursor

### Asistentes IA
- 🤖 **OrbBot**: Asistente principal con animación circular WebGL
- 💬 **Sonar-Pro**: Chat avanzado conectado a n8n
- 🧠 **OpenAI Chats**: Consultoría, generación de imágenes, desarrollo
- 🔒 **Sistema de Protección**: Chats protegidos con contraseña

### Secciones Interactivas
- 🎉 **Hero**: Con modelo 3D de robot y OrbBot
- 🛠️ **Servicios**: 6 servicios con efectos visuales únicos
- 🖼️ **Galería**: Proyectos con videos y filtros por categoría
- 📞 **Contacto**: Formulario animado y carousel de videos
- 📊 **Hardware Test**: Benchmark integrado (VSBM)
- 🧠 **Redes Neuronales**: Visualizador interactivo

## 🛠️ Stack Tecnológico

### Core
- **React 19.2.3** - Biblioteca UI con Concurrent Mode
- **Vite 7.2.6** - Build tool ultra-rápido con HMR
- **Tailwind CSS 3.4.3** - Framework CSS utility-first

### 3D & WebGL
- **Three.js 0.182.0** - Gráficos 3D WebGL
- **@react-three/fiber 9.4.2** - React renderer para Three.js
- **@react-three/drei 10.7.7** - Helpers para Three.js
- **OGL 1.0.11** - Librería WebGL optimizada (Orb effect)
- **postprocessing 6.37.8** - Post-processing effects

### Animaciones
- **Framer Motion 11.0.0** - Animaciones declarativas
- **GSAP 3.13.0** - Animaciones avanzadas

### Integraciones
- **Firebase** - Autenticación (Google OAuth)
- **Supabase** - Base de datos y gestión de usuarios
- **@n8n/chat 0.59.0** - Widget de chat n8n
- **@splinetool/react-spline 4.1.0** - Modelos 3D Spline
- **Lucide React 0.263.1** - Biblioteca de iconos

## 📦 Instalación y Uso

### Requisitos Previos
- Node.js 18+ (recomendado: LTS)
- npm o yarn
- Navegador con soporte WebGL 2.0

### Pasos de Instalación

1. **Navegar al directorio:**
```bash
cd C:\Users\codex\Documents\LANDING-ANIMADA\landingHardware\landingHardware
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**
```bash
# Copiar el archivo de ejemplo
copy .env.example .env

# Editar .env con tus credenciales
# VITE_SUPABASE_URL=tu_url_aqui
# VITE_SUPABASE_ANON_KEY=tu_key_aqui
```

4. **Iniciar servidor de desarrollo:**
```bash
npm run dev
```

5. **Abrir en el navegador:**
- URL: http://localhost:3000
- Se abrirá automáticamente

## 📁 Estructura del Proyecto

```
landingHardware/
├── public/
│   └── videos/              # Videos de proyectos
├── src/
│   ├── components/
│   │   ├── Hero.jsx         # Sección principal con 3D robot
│   │   ├── Services.jsx     # Servicios con efectos visuales
│   │   ├── Gallery.jsx      # Galería con filtros
│   │   ├── Contact.jsx      # Contacto y formulario
│   │   ├── Navigation.jsx   # Barra de navegación
│   │   │
│   │   ├── OrbBot.jsx       # Asistente IA con Orb effect
│   │   ├── ChatBot.jsx      # Modal de chat
│   │   ├── RobotModel.jsx   # Modelo 3D robot
│   │   │
│   │   ├── N8nChatEmbed.jsx      # Chat Sonar-Pro
│   │   ├── OpenAIChat.jsx        # Chat consultoría
│   │   ├── OpenAIImageChat.jsx   # Chat imágenes
│   │   ├── CodexChat.jsx         # Chat desarrollo
│   │   │
│   │   ├── effects/         # 30+ efectos visuales
│   │   │   ├── Orb.jsx
│   │   │   ├── Galaxy.jsx
│   │   │   ├── Hyperspeed.jsx
│   │   │   ├── MetallicText.jsx
│   │   │   └── ...
│   │   │
│   │   ├── *Card.jsx        # 50+ tarjetas de herramientas
│   │   ├── *CLIWindow.jsx   # Ventanas CLI
│   │   ├── three/           # Componentes Three.js
│   │   └── ui/              # Componentes UI
│   │
│   ├── config/
│   │   ├── firebase.js      # Config Firebase
│   │   └── supabase.js      # Config Supabase
│   │
│   ├── context/
│   │   └── AuthContext.jsx  # Contexto autenticación
│   │
│   ├── data/
│   │   └── all-tools.json   # Base de datos herramientas
│   │
│   ├── App.jsx              # Componente raíz
│   ├── main.jsx             # Entry point
│   └── index.css            # Estilos globales
│
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
├── README.md                # Este archivo
├── AGENTS.md                # Documentación para agentes IA
├── COMANDOS.md              # Guía de instalación
└── DOCUMENTACION_COMPLETA.md # Documentación detallada
```

## 🎨 Secciones Principales

### 1. Hero Section
- **Título metálico**: "Innovate Solutions" con efectos cromados
- **Modelo 3D**: Robot animado en lado izquierdo
- **OrbBot**: Asistente IA circular en esquina inferior derecha
- **Texto rotativo**: Cambia cada 3 segundos
- **Imágenes de fondo**: Rotan cada 8 segundos con fade
- **Botones CTA**: Hardware Test, Sonar-Pro, Redes Neuronales
- **Efectos**: VariableProximity en descripción

### 2. Services Section
- **6 servicios** con efectos visuales únicos:
  1. Desarrollo de Software (CodeMatrix)
  2. Consultoría Tecnológica (NeuralNetwork)
  3. Procesamiento de Imágenes (DataFlow)
  4. Transformación Digital (GeometricMorph)
  5. Ciberseguridad (ShieldField)
  6. Capacitación (KnowledgeOrbs)
- **Sistema de protección**: Contraseña "sosi" para chats IA
- **Hover effects 3D**: Rotación y elevación en hover
- **Fondo Galaxy**: Compartido con Gallery
- **Hyperspeed effect**: Se activa al hacer scroll

### 3. Gallery Section
- **6 proyectos** con videos autoplay
- **Filtros**: Todos, Web, Mobile, IA, Cloud, IoT
- **Modal de ampliación**: Proyecto completo
- **Tags tecnológicos**: React, Node.js, Python, etc.
- **Highlights**: Métricas destacadas de cada proyecto
- **Animaciones**: Framer Motion para transiciones

### 4. Contact Section
- **Formulario animado**: Nombre, Email, Empresa, Mensaje
- **Información de contacto**: Email, Teléfono, Ubicación, Horario
- **Carousel de videos**: 3 videos simultáneos con loop
- **Redes sociales**: LinkedIn, Twitter, Instagram, GitHub
- **Efecto de fondo**: Iridescence
- **Validación**: Tiempo real con feedback visual

## 🎬 Efectos y Animaciones

### Efectos WebGL
- **Orb Effect**: Esfera 3D con shaders GLSL personalizados
- **Galaxy**: Sistema de partículas estelar con Three.js
- **Hyperspeed**: Carretera espacial estilo cyberpunk

### Animaciones Framer Motion
- **Blur In**: Fade con desenfoque inicial
- **Parallax Scroll**: Elementos a diferentes velocidades
- **Hover Effects 3D**: Rotación y elevación
- **Stagger Animation**: Animaciones escalonadas
- **Scroll Triggered**: useInView para activación
- **Page Transitions**: AnimatePresence para cambios

### Efectos de Texto
- **MetallicText**: Cromado, plateado, dorado, platino
- **VariableProximity**: Responde a posición del cursor
- **GlitchText**: Efecto glitch animado
- **ScrambledText**: Texto desencriptado progresivo

### Efectos de Canvas
- **30+ efectos**: NeuralNetwork, CodeMatrix, DataFlow, ShieldField, etc.
- **Cada servicio** tiene su efecto único de fondo
- **Interactivos**: Responden a mouse y scroll

## 🎯 Scripts Disponibles

```bash
npm run dev      # Desarrollo con HMR en localhost:3000
npm run build    # Build de producción (genera dist/)
npm run preview  # Preview del build de producción
```

## 🌐 Deployment

### Opciones Recomendadas

#### Vercel (Recomendado)
```bash
npm i -g vercel
vercel
```
- Deployment automático desde Git
- HTTPS automático
- CDN global

#### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```
- Drag & drop en UI
- Continuous deployment

#### Build Manual
```bash
npm run build
# Subir contenido de dist/ a tu hosting
```

**IMPORTANTE:** Configurar variables de entorno en el hosting:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

## 🎨 Personalización

### Colores (tailwind.config.js)
```javascript
colors: {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  }
}
```

### Animaciones
Modificar variants en componentes:
```javascript
const itemVariants = {
  hidden: { y: 60, opacity: 0, filter: "blur(10px)" },
  visible: { 
    y: 0, 
    opacity: 1, 
    filter: "blur(0px)",
    transition: { duration: 0.8 }
  }
}
```

### Efectos Visuales
- **Galaxy**: Ajustar densidad, glow, saturación en App.jsx
- **Hyperspeed**: Cambiar colores en efectOptions
- **Orb**: Modificar hue, hoverIntensity en OrbBot.jsx

### Contraseñas
- **Chats IA**: Cambiar "sosi" en Services.jsx (línea ~1020)

## 📱 Responsive Design

- 📱 **Móvil**: 320px+ (menú hamburguesa, layout vertical)
- 📟 **Tablet**: 768px+ (grid 2 columnas)
- 💻 **Desktop**: 1024px+ (grid 3 columnas, modelos 3D visibles)
- 🖥️ **Large**: 1280px+ (full layout)
- 📺 **XL**: 1536px+ (espaciado expandido)

**Breakpoints Tailwind**: sm, md, lg, xl, 2xl

## ⚡ Optimizaciones de Rendimiento

- **HMR**: Hot Module Replacement con Vite
- **Code Splitting**: Automático por componente
- **willChange**: CSS para animaciones suaves
- **requestAnimationFrame**: Para efectos WebGL
- **Cleanup**: useEffect cleanup en todos los efectos
- **Device Pixel Ratio**: Soporte para pantallas Retina
- **WebGL Context Loss**: Manejo de pérdida de contexto

## 🛠️ Solución de Problemas

### WebGL no funciona
- Verificar que el navegador soporte WebGL 2.0
- Habilitar aceleración por hardware
- Probar en Chrome/Edge/Firefox actualizado

### Modelos 3D no cargan
- Revisar consola para errores CORS
- Verificar conexión a internet
- Limpiar cache del navegador

### Puerto 3000 en uso
```bash
# Cambiar puerto en vite.config.js
server: { port: 3001 }
```

### Performance issues
- Reducir `density` en Galaxy.jsx
- Desactivar algunos efectos visuales
- Verificar hardware acceleration

## 📚 Documentación Adicional

- **AGENTS.md**: Documentación completa para agentes IA
- **COMANDOS.md**: Guía de instalación paso a paso
- **DOCUMENTACION_COMPLETA.md**: Documentación técnica detallada

## 📧 Contacto y Soporte

- **Email**: albertotplaza@gmail.com
- **Teléfono**: +34 621 208 980
- **Ubicación**: Castellón - Onda, España
- **Horario**: Lunes - Domingo, 10:30 - 23:00 (CET/CEST)

## ✨ Características Técnicas Destacadas

- 🌌 30+ efectos visuales personalizados
- 🚀 4 asistentes IA especializados
- 🎮 Modelos 3D interactivos
- 🔒 Sistema de autenticación completo
- 🎨 50+ tarjetas de herramientas
- 📊 Benchmark de hardware integrado
- 🧠 Visualizador de redes neuronales

---

**Desarrollado con ❤️ para Innovate Solutions** | Powered by React 19 + Vite + Three.js
