# Documentación Completa del Proyecto - Innovate Solutions Landing Page

## 📋 Índice
1. [Información General](#información-general)
2. [Tecnologías y Stack](#tecnologías-y-stack)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Componentes Principales](#componentes-principales)
5. [Efectos Visuales](#efectos-visuales)
6. [Asistentes IA](#asistentes-ia)
7. [Funcionalidades Interactivas](#funcionalidades-interactivas)
8. [Testing de Hardware](#testing-de-hardware)
9. [Tabletas de Servicios](#tabletas-de-servicios)
10. [Configuración y Deploy](#configuración-y-deploy)

---

## 🎯 Información General

**Nombre del Proyecto:** Innovate Solutions - Landing Page Interactiva

**Descripción:**
Landing page moderna y altamente interactiva para Innovate Solutions, una empresa especializada en consultoría tecnológica, desarrollo de software, IA, ciberseguridad y transformación digital. La web está diseñada para ser una experiencia visual impactante con múltiples asistentes de IA integrados, efectos visuales avanzados con WebGL, y funcionalidades de testing de hardware.

**Propósito Principal:**
- Presentar los servicios de Innovate Solutions
- Demostrar capacidades tecnológicas avanzadas
- Ofrecer múltiples asistentes IA para consultas especializadas
- Proporcionar herramientas de testing de hardware (VSBM - Very Simple Benchmark)
- Visualizar proyectos y portafolio de la empresa

**Información de Contacto:**
- Email: albertotplaza@gmail.com
- Teléfono: +34 621 208 980
- Ubicación: Castellón - Onda, España
- Horario: Lunes - Domingo, 10:30 - 23:00 (CET/CEST)

---

## 💻 Tecnologías y Stack

### Core Technologies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "vite": "^5.2.0"
}
```

### Librerías de Animación y Efectos
```json
{
  "framer-motion": "^11.0.0",
  "three": "^0.180.0",
  "@react-three/fiber": "^8.16.2",
  "@react-three/drei": "^9.105.4",
  "ogl": "^1.0.11",
  "postprocessing": "^6.37.8"
}
```

### Estilos
```json
{
  "tailwindcss": "^3.4.3",
  "autoprefixer": "^10.4.19",
  "postcss": "^8.4.38"
}
```

### Iconos y UI
```json
{
  "lucide-react": "^0.263.1"
}
```

### Integraciones Externas
```json
{
  "@n8n/chat": "^0.59.0",
  "@splinetool/react-spline": "^4.1.0"
}
```

### Herramientas de Desarrollo
- **Vite** - Build tool y desarrollo rápido
- **ESLint** - Linting
- **PostCSS** - Procesamiento de CSS

### Configuración del Servidor de Desarrollo
- Puerto: 3000
- Hosts permitidos: ngrok (detectible-descriptively-cordie.ngrok-free.app)
- Auto-open en navegador

---

## 📁 Estructura del Proyecto

```
landingHardware/
├── public/
│   ├── videos/                           # Videos de proyectos del portafolio
│   │   ├── VID_20251006_223257_399.mp4
│   │   ├── VID_20251006_223738_445.mp4
│   │   ├── VID_20251006_223742_952.mp4
│   │   ├── VID_20251006_223804_366.mp4
│   │   ├── VID_20251006_223822_120.mp4
│   │   └── VID_20251006_223837_520.mp4
│   └── models/                           # Modelos 3D (si los hay)
│
├── src/
│   ├── main.jsx                          # Punto de entrada de la aplicación
│   ├── App.jsx                           # Componente raíz - Orquesta todas las secciones
│   ├── index.css                         # Estilos globales
│   │
│   ├── components/
│   │   ├── Navigation.jsx                # Barra de navegación fija con glassmorphism
│   │   ├── Hero.jsx                      # Sección principal con modelo 3D y OrbBot
│   │   ├── Services.jsx                  # Tarjetas de servicios con efectos y chats IA
│   │   ├── Gallery.jsx                   # Portafolio de proyectos con filtros
│   │   ├── Contact.jsx                   # Formulario de contacto e información
│   │   │
│   │   ├── OrbBot.jsx                    # ⭐ ASISTENTE IA CIRCULAR (el que actualizar)
│   │   ├── ChatBot.jsx                   # ⭐ MODAL DE CHAT DEL ASISTENTE (base de conocimiento)
│   │   │
│   │   ├── RobotModel.jsx                # Modelo 3D de robot en Hero (Three.js)
│   │   ├── N8nChatEmbed.jsx              # Chat Sonar-Pro conectado a n8n
│   │   ├── OpenAIChat.jsx                # Chat de consultoría con OpenAI
│   │   ├── OpenAIImageChat.jsx           # Chat de generación de imágenes con DALL-E 3
│   │   ├── CodexChat.jsx                 # Chat de desarrollo de software
│   │   │
│   │   └── effects/                      # Efectos visuales avanzados
│   │       ├── Orb.jsx                   # Efecto esfera WebGL con shaders GLSL
│   │       ├── Galaxy.jsx                # Efecto galaxia de fondo (Three.js)
│   │       ├── Hyperspeed/               # Efecto hyperspeed (carretera espacial)
│   │       ├── NeuralNetwork.jsx         # Visualización de red neuronal
│   │       ├── CodeMatrix.jsx            # Efecto Matrix de código
│   │       ├── DataFlow.jsx              # Flujo de datos animado
│   │       ├── GeometricMorph.jsx        # Morfología geométrica
│   │       ├── ShieldField.jsx           # Campo de escudo de seguridad
│   │       ├── KnowledgeOrbs.jsx         # Orbes de conocimiento
│   │       ├── Iridescence.jsx           # Efecto iridiscente
│   │       ├── MetallicText.jsx          # Texto con efecto metálico
│   │       ├── VariableProximity.jsx     # Texto con efecto de proximidad
│   │       ├── CircuitBoard.jsx          # Placa de circuito animada
│   │       ├── Lightning/                # Efectos de rayos
│   │       ├── ParticleSwarm.jsx         # Enjambre de partículas
│   │       ├── ParticleWave.jsx          # Onda de partículas
│   │       ├── PlasmaSphere.jsx          # Esfera de plasma
│   │       ├── WaveField.jsx             # Campo de ondas
│   │       ├── EnergyFlow.jsx            # Flujo de energía
│   │       ├── ElectricalBorder.jsx      # Borde eléctrico
│   │       ├── AnimatedMesh.jsx          # Malla animada
│   │       └── SectionTransition.jsx     # Transiciones entre secciones
│   │
│   └── assets/                           # Assets estáticos
│
├── backend/                              # Backend separado (si existe)
│
├── index.html                            # HTML principal
├── package.json                          # Dependencias y scripts
├── vite.config.js                        # Configuración de Vite
├── tailwind.config.js                    # Configuración de Tailwind CSS
├── postcss.config.js                     # Configuración de PostCSS
├── README.md                             # Documentación básica
└── DOCUMENTACION_COMPLETA.md             # Este archivo
```

---

## 🧩 Componentes Principales

### 1. App.jsx - Componente Raíz
**Ubicación:** `/src/App.jsx`

**Responsabilidades:**
- Orquesta todas las secciones de la landing page
- Gestiona el efecto Hyperspeed que aparece desde Services hacia abajo
- Contiene el efecto Galaxy compartido entre Services y Gallery
- Maneja el estado del menú móvil
- Implementa efectos parallax en el scroll

**Secciones que renderiza:**
1. Navigation (barra de navegación)
2. Hero (portada con modelo 3D y OrbBot)
3. Services + Gallery (con fondo Galaxy compartido)
4. Contact (formulario y información)

**Efectos especiales:**
- Hyperspeed con colores morados/púrpuras que se activa al hacer scroll a Services
- Galaxy de fondo compartido entre Services y Gallery
- Elementos flotantes animados con gradientes
- Parallax scroll en elementos de fondo

---

### 2. Hero.jsx - Sección Principal
**Ubicación:** `/src/components/Hero.jsx`

**Características:**
- **Título principal:** "Innovate Solutions" con efecto metálico cromado
- **Subtítulo rotativo:** Cambia cada 3 segundos entre:
  - Soluciones Tecnológicas
  - Consultoría Especializada
  - Innovación Digital
  - Transformación Digital
- **Descripción:** Con efecto VariableProximity que resalta el texto según proximidad del cursor
- **Imágenes de fondo rotativas:** 3 imágenes que cambian cada 8 segundos con fade suave
- **Modelo 3D de robot:** En el lado izquierdo con efectos de glow y anillos orbitales
- **OrbBot:** Asistente IA en la esquina inferior derecha con animación circular

**Botones de Acción (CTAs):**
1. **Hardware Test**
   - Abre modal con iframe a https://cznull.github.io/vsbm
   - Testing de hardware y benchmark
   - Gradiente azul-púrpura

2. **Sonar-Pro**
   - Abre chat avanzado conectado a n8n
   - Webhook: https://n8n.lockthard.es/webhook/e441c669-2611-43ef-8dfa-883508753f46/chat
   - Con partículas flotantes y efecto de brillo

3. **Redes Neuronales**
   - Abre visualización interactiva de redes neuronales
   - Iframe a https://nn-vis.noelith.dev/
   - Modal tamaño completo (1040px alto)
   - Gradiente verde esmeralda-turquesa

**Efectos visuales:**
- Gradientes de color animados (azul, púrpura, rojo)
- Elementos flotantes con movimiento suave
- Overlay de imagen con transparencia controlada
- Efectos de parallax en scroll

---

### 3. Services.jsx - Sección de Servicios
**Ubicación:** `/src/components/Services.jsx`

**Servicios Ofrecidos:**

#### 1. **Desarrollo de Software**
- Icono: Código animado (`</>`)
- Efecto de fondo: CodeMatrix
- Chat: CodexChat (protegido con contraseña)
- Tecnologías: Aplicaciones web y móviles con últimas tecnologías

#### 2. **Consultoría Tecnológica**
- Icono: OpenAI logo rotativo
- Efecto de fondo: NeuralNetwork
- Chat: OpenAIChat (protegido con contraseña)
- Servicios: Asesoramiento estratégico con IA

#### 3. **Procesamiento de Imágenes**
- Icono: Imagen con efecto de escala
- Efecto de fondo: DataFlow
- Chat: OpenAIImageChat (protegido con contraseña)
- Servicios: Generación con DALL-E 3

#### 4. **Transformación Digital**
- Icono: Globo rotativo
- Efecto de fondo: GeometricMorph
- Servicios: Modernización de infraestructuras

#### 5. **Ciberseguridad**
- Icono: Escudo pulsante
- Efecto de fondo: ShieldField
- Servicios: Protección integral de sistemas

#### 6. **Capacitación**
- Icono: Usuarios animados
- Efecto de fondo: KnowledgeOrbs
- Servicios: Formación en tecnologías emergentes

**Sistema de Protección:**
- Contraseña para acceder a chats IA: "sosi"
- Modal de contraseña con diseño glassmorphism
- Validación en tiempo real con feedback visual
- Icono de candado animado

**Efectos de tarjetas:**
- Hover 3D con rotación
- Canvas effects de fondo únicos para cada servicio
- Gradientes animados en hover
- Bordes animados con luz
- Transiciones suaves

---

### 4. Gallery.jsx - Portafolio de Proyectos
**Ubicación:** `/src/components/Gallery.jsx`

**Proyectos Destacados:**

1. **E-commerce Platform**
   - Categoría: Web
   - Video: `/videos/VID_20251006_223257_399.mp4`
   - Tags: React, Node.js, MongoDB
   - Highlight: Aumento del 230% en conversión

2. **Mobile Banking App**
   - Categoría: Mobile
   - Video: `/videos/VID_20251006_223738_445.mp4`
   - Tags: React Native, Firebase, Security
   - Highlight: 99.9% de uptime certificado

3. **AI Dashboard**
   - Categoría: AI
   - Video: `/videos/VID_20251006_223742_952.mp4`
   - Tags: Python, TensorFlow, D3.js
   - Highlight: Predicciones en tiempo real

4. **Cloud Infrastructure**
   - Categoría: Cloud
   - Video: `/videos/VID_20251006_223804_366.mp4`
   - Tags: AWS, Docker, Kubernetes
   - Highlight: Despliegues 4x más rápidos

5. **Corporate Website**
   - Categoría: Web
   - Video: `/videos/VID_20251006_223822_120.mp4`
   - Tags: Next.js, Strapi, Tailwind
   - Highlight: Tiempo de carga < 1s

6. **IoT Control System**
   - Categoría: IoT
   - Video: `/videos/VID_20251006_223837_520.mp4`
   - Tags: Arduino, MQTT, React
   - Highlight: Monitoreo 24/7 sin interrupciones

**Funcionalidades:**
- Filtros por categoría: Todos, Web, Mobile, IA, Cloud, IoT
- Videos autoplay en loop
- Modal de ampliación de proyecto
- Hover effects con zoom y rotación 3D
- Transiciones animadas entre filtros
- Bordes animados con gradientes

**Compartido con Services:**
- Utiliza el mismo fondo Galaxy de App.jsx
- Overlay oscuro para legibilidad

---

### 5. Contact.jsx - Contacto e Información
**Ubicación:** `/src/components/Contact.jsx`

**Información de Contacto:**
- **Email:** albertotplaza@gmail.com
- **Teléfono:** +34 621 208 980
- **Ubicación:** Castellón - Onda, España
- **Horario:** Lunes - Domingo, 10:30 - 23:00 (CET/CEST)

**Formulario de Contacto:**
Campos:
- Nombre Completo (requerido)
- Email (requerido)
- Empresa (opcional)
- Mensaje (requerido, textarea)

Características:
- Validación en tiempo real
- Animación de envío exitoso
- Iconos animados en inputs
- Backdrop blur y glassmorphism
- Focus states con anillo azul

**Carousel de Videos:**
- Muestra 3 videos simultáneamente
- Loop infinito automático
- Duración: 12 segundos por ciclo
- Videos del portafolio

**Redes Sociales:**
- LinkedIn, Twitter, Instagram, GitHub
- Botones con efectos hover y scale

**Efecto de Fondo:**
- Iridescence (efecto iridiscente)
- Overlay oscuro para contraste

**Footer:**
- Copyright 2025 Innovate Solutions
- Mensaje: "Diseñado con ❤️ para transformar el futuro digital"

---

### 6. Navigation.jsx - Barra de Navegación
**Ubicación:** `/src/components/Navigation.jsx`

**Características:**
- **Posición:** Fija en la parte superior (fixed top)
- **Efecto:** Backdrop blur y glassmorphism
- **Animación de entrada:** Slide desde arriba

**Items del Menú:**
1. Inicio (#home)
2. Servicios (#services)
3. Galería (#gallery)
4. Contacto (#contact)

**Funcionalidades:**
- Logo "Innovate Solutions" con efecto metálico cromado
- Menú responsive con toggle para móviles
- Hover effects con línea inferior animada
- Animación stagger en items del menú
- Menú móvil con animación slide-in

---

## 🤖 Asistentes IA

### 1. OrbBot - Asistente Principal con Animación Circular
**Ubicación:** `/src/components/OrbBot.jsx`

**Descripción:**
Es el asistente IA principal de la landing page, ubicado en la esquina inferior derecha de la sección Hero. Utiliza una animación circular (Orb) creada con WebGL y shaders GLSL para crear un efecto visual impactante.

**Características Visuales:**
- **Efecto Orb de fondo:** Esfera 3D animada con shaders WebGL
- **Icono del Bot:** Centrado sobre el Orb con efecto glassmorphism
- **Indicador online:** Punto verde pulsante en la esquina
- **Icono de mensaje flotante:** Aparece en hover con rotación
- **Partículas decorativas:** 3 partículas flotantes alrededor
- **Anillo pulsante:** Se activa en hover
- **Texto descriptivo:** "Asistente IA" con "Haz clic para chatear" en hover

**Interactividad:**
- Hover: Escala 1.1, movimiento hacia arriba, intensidad del Orb aumenta
- Click: Abre el modal ChatBot
- Rotación del Orb en hover
- Transiciones suaves y fluidas

**Tecnología:**
- OGL (Optimized WebGL Library)
- Shaders GLSL personalizados
- Framer Motion para animaciones React
- Lucide React para iconos (Bot, MessageCircle)

---

### 2. ChatBot - Modal de Chat del Asistente
**Ubicación:** `/src/components/ChatBot.jsx`

**Descripción:**
Modal de chat transparente con glassmorphism que se abre al hacer clic en OrbBot. Contiene una base de conocimiento embedida y responde preguntas sobre Innovate Solutions.

**Diseño UI:**
- **Ventana:** 96 x 32rem (384px x 512px)
- **Efecto:** Backdrop blur 2xl con gradientes de color
- **Posición:** Fixed, bottom-right, desplazada -72px a la derecha
- **Header:** Icono del bot rotativo, estado "En línea", botón cerrar
- **Área de mensajes:** Scroll automático, mensajes alternados
- **Input:** Con autocompletado desactivado, botón de envío

**Base de Conocimiento Actual (Líneas 19-52):**

#### Categoría: Servicios
- Keywords: servicios, servicio, qué hacen, ofrecen, productos
- Respuesta: Lista de 6 servicios principales

#### Categoría: Contacto
- Keywords: contacto, email, teléfono, llamar, escribir, ubicación, dirección
- Respuesta: Email, teléfono, ubicación, horario

#### Categoría: Desarrollo
- Keywords: desarrollo, app, aplicación, web, móvil, software, programación
- Respuesta: Tecnologías (React, Next.js, Vue, Node.js, Python, iOS/Android, APIs)

#### Categoría: IA
- Keywords: ia, inteligencia artificial, machine learning, ai, datos, analytics
- Respuesta: Big Data, Machine Learning, NLP, Visión por computadora, Automatización

#### Categoría: Seguridad
- Keywords: seguridad, ciberseguridad, protección, hackeo, vulnerabilidad
- Respuesta: Auditorías, Pentesting, Protección DDoS, Compliance, Monitoreo 24/7

#### Categoría: Precios
- Keywords: precio, costo, cuánto, presupuesto, tarifa, cotización
- Respuesta: Consulta gratuita, presupuestos personalizados, planes flexibles

#### Categoría: Saludos
- Keywords: hola, buenos días, buenas tardes, hey, hi, hello
- Respuesta: Saludo amigable

#### Categoría: Agradecimientos
- Keywords: gracias, thanks, thank you, perfecto, genial, excelente
- Respuesta: De nada con ofrecimiento de más ayuda

**Funcionalidades:**
- Sistema de matching por keywords
- Respuestas instantáneas (simulación 1 segundo)
- Indicador de "escribiendo" con 3 puntos animados
- Timestamps en formato 24h español
- Mensajes con diseño diferenciado (usuario: azul-púrpura, bot: blanco/gris)
- Scroll automático al final
- Mensaje de bienvenida automático

---

### 3. Sonar-Pro (N8nChatEmbed)
**Ubicación:** `/src/components/N8nChatEmbed.jsx`

**Descripción:**
Chat avanzado conectado a n8n (plataforma de automatización de flujos de trabajo). Asistente más potente que se activa desde el botón "Sonar-Pro" en Hero.

**Configuración:**
- Webhook URL: `https://n8n.lockthard.es/webhook/e441c669-2611-43ef-8dfa-883508753f46/chat`
- Modo: fullscreen
- Welcome screen: Activada
- Mensajes iniciales:
  - "¡Hola! Soy Sonar-Pro, el asistente IA de Innovate Solutions"
  - "¿En qué puedo ayudarte hoy?"
- Streaming: Desactivado
- Sesiones persistentes: Activadas (loadPreviousSession: true)

**Características:**
- Integración completa con n8n
- Persistencia de sesiones (chatSessionKey: 'sessionId')
- Interfaz fullscreen personalizada
- Glassmorphism y backdrop blur
- Botón de cerrar en esquina superior derecha

---

### 4. OpenAIChat - Consultoría Tecnológica
**Ubicación:** `/src/components/OpenAIChat.jsx`

**Descripción:**
Chat de consultoría tecnológica con IA, protegido con contraseña. Se activa desde la tarjeta "Consultoría Tecnológica" en Services.

**Acceso:**
- Contraseña requerida: "sosi"
- Modal de contraseña con diseño profesional

**Características:**
- Integración con OpenAI (presumiblemente GPT)
- Especializado en consultoría y estrategia tecnológica
- Diseño consistente con el resto de chats

---

### 5. OpenAIImageChat - Generación de Imágenes
**Ubicación:** `/src/components/OpenAIImageChat.jsx`

**Descripción:**
Chat especializado en generación y procesamiento de imágenes con IA. Utiliza DALL-E 3 de OpenAI.

**Acceso:**
- Contraseña requerida: "sosi"
- Activación desde tarjeta "Procesamiento de Imágenes"

**Funcionalidades:**
- Generación de imágenes con DALL-E 3
- Procesamiento de imágenes con IA
- Interfaz visual para prompts y resultados

---

### 6. CodexChat - Desarrollo de Software
**Ubicación:** `/src/components/CodexChat.jsx`

**Descripción:**
Chat especializado en desarrollo de software con formato de código optimizado.

**Acceso:**
- Contraseña requerida: "sosi"
- Activación desde tarjeta "Desarrollo de Software"

**Características:**
- Formato de código con syntax highlighting
- Respuestas técnicas optimizadas
- Ejemplos de código interactivos

---

## 🎨 Efectos Visuales

### 1. Orb.jsx - Efecto Esfera WebGL
**Ubicación:** `/src/components/effects/Orb.jsx`

**Descripción:**
Efecto visual de esfera 3D creado con WebGL y shaders GLSL personalizados. Es el efecto principal del OrbBot.

**Tecnología:**
- **OGL** (Optimized WebGL Library)
- **Shaders GLSL:** Vertex y Fragment shaders personalizados
- **WebGL Renderer** con alpha channel

**Parámetros personalizables:**
- `hue`: Control de color (0-360 grados)
- `hoverIntensity`: Intensidad del efecto hover (0.0-1.0, default: 0.2)
- `rotateOnHover`: Activa rotación en hover (boolean, default: true)
- `forceHoverState`: Forzar estado hover permanente (boolean)

**Características del Shader:**
- Sistema de ruido Simplex 3D (snoise3)
- Ajuste de hue en espacio YIQ
- 3 colores base con gradientes:
  - baseColor1: Púrpura (rgb(0.61, 0.26, 1.0))
  - baseColor2: Azul cyan (rgb(0.30, 0.76, 0.91))
  - baseColor3: Azul oscuro (rgb(0.06, 0.08, 0.60))
- Radio interno configurable (innerRadius: 0.6)
- Escala de ruido (noiseScale: 0.65)
- Funciones de luz personalizadas (light1, light2)
- Animación temporal con iTime
- Distorsión en hover con ondas sinusoidales

**Optimizaciones:**
- Uso de `willChange: 'transform, opacity'`
- Device Pixel Ratio para pantallas retina
- Cleanup completo en desmontaje
- WebGL context loss handling

**Interactividad:**
- Detección de hover por posición del mouse
- Smooth transitions (lerp) con factor 0.1
- Rotación continua cuando está en hover (0.3 rad/s)
- Distorsión UV basada en hover

---

### 2. Galaxy.jsx - Efecto Galaxia
**Ubicación:** `/src/components/effects/Galaxy.jsx`

**Descripción:**
Efecto de galaxia de fondo creado con Three.js. Utilizado como fondo compartido entre Services y Gallery.

**Características:**
- Partículas 3D con Three.js
- Rotación lenta y constante
- Efectos de brillo (glow)
- Parámetros configurables:
  - `mouseRepulsion`: Repulsión de partículas con mouse (true)
  - `mouseInteraction`: Interacción general con mouse (true)
  - `density`: Densidad de partículas (1.2)
  - `glowIntensity`: Intensidad del brillo (0.4)
  - `saturation`: Saturación de color (0.6)
  - `hueShift`: Desplazamiento de hue (240)
  - `rotationSpeed`: Velocidad de rotación (0.05)
  - `twinkleIntensity`: Intensidad de parpadeo (0.4)
  - `transparent`: Transparencia activada (true)

**Implementación:**
- Sistema de partículas con BufferGeometry
- Shaders personalizados para estrellas
- Postprocessing con UnrealBloomPass
- Animación con requestAnimationFrame

---

### 3. Hyperspeed.jsx - Efecto Carretera Espacial
**Ubicación:** `/src/components/effects/Hyperspeed.jsx`

**Descripción:**
Efecto de carretera espacial tipo "cyberpunk highway" que aparece al hacer scroll a la sección Services.

**Configuración en App.jsx:**
```javascript
{
  ...hyperspeedPresets.one,
  colors: {
    roadColor: 0x0a0a0a,         // Carretera negra
    islandColor: 0x0c0c0c,        // Isla central
    background: 0x000000,          // Fondo negro
    shoulderLines: 0x4a2a6a,      // Líneas moradas
    brokenLines: 0x4a2a6a,        // Líneas punteadas moradas
    leftCars: [0xd856bf, 0x9333ea, 0xc247ac],  // Coches izq (rosa-púrpura)
    rightCars: [0x6366f1, 0x8b5cf6, 0xa855f7], // Coches der (azul-púrpura)
    sticks: 0xa855f7              // Postes púrpuras
  }
}
```

**Características:**
- Perspectiva 3D
- Coches animados en ambos carriles
- Líneas de carretera animadas
- Postes laterales
- Velocidad configurable
- Colores personalizables

---

### 4. NeuralNetwork.jsx - Red Neuronal Visual
**Ubicación:** `/src/components/effects/NeuralNetwork.jsx`

**Descripción:**
Visualización animada de una red neuronal con nodos y conexiones. Usado en la tarjeta "Consultoría Tecnológica".

**Características:**
- Nodos con pulso animado
- Conexiones con flujo de datos
- Layers de red neuronal
- Animación de propagación

---

### 5. CodeMatrix.jsx - Efecto Matrix
**Ubicación:** `/src/components/effects/CodeMatrix.jsx`

**Descripción:**
Efecto estilo "Matrix" con caracteres cayendo. Usado en la tarjeta "Desarrollo de Software".

**Características:**
- Caracteres aleatorios cayendo
- Estela de desvanecimiento
- Colores verdes/azules
- Velocidad variable por columna

---

### 6. MetallicText.jsx - Texto Metálico
**Ubicación:** `/src/components/effects/MetallicText.jsx`

**Descripción:**
Componente de texto con efectos metálicos (cromado, plateado, dorado, platino).

**Clases disponibles:**
- `chrome-text`: Cromado con gradiente azul-gris
- `silver-text`: Plateado brillante
- `gold-text`: Dorado cálido
- `platinum-text`: Platino frío

**Características:**
- Gradientes CSS complejos
- Text-shadow para profundidad
- Background-clip: text
- Transiciones suaves

---

### 7. VariableProximity.jsx - Texto con Efecto de Proximidad
**Ubicación:** `/src/components/effects/VariableProximity.jsx`

**Descripción:**
Efecto de texto que responde a la proximidad del cursor, cambiando peso y tamaño de fuente.

**Parámetros:**
- `label`: Texto a mostrar
- `fromFontVariationSettings`: Estado inicial (ej: 'wght' 300)
- `toFontVariationSettings`: Estado hover (ej: 'wght' 900)
- `radius`: Radio de detección (default: 120)
- `falloff`: Tipo de atenuación (gaussian, linear)

**Tecnología:**
- Variable fonts con font-variation-settings
- Cálculo de distancia en tiempo real
- Suavizado gaussiano o lineal
- Performance optimizada con requestAnimationFrame

---

### Otros Efectos Disponibles

#### DataFlow.jsx
Flujo de datos visualizado como partículas en movimiento

#### GeometricMorph.jsx
Morfología geométrica con transiciones suaves

#### ShieldField.jsx
Campo de escudo hexagonal para ciberseguridad

#### KnowledgeOrbs.jsx
Orbes de conocimiento flotantes e interactivos

#### Iridescence.jsx
Efecto iridiscente tipo holográfico

#### CircuitBoard.jsx
Placa de circuito animada con pulsos eléctricos

#### Lightning (carpeta)
Efectos de rayos eléctricos

#### ParticleSwarm.jsx
Enjambre de partículas con comportamiento colectivo

#### ParticleWave.jsx
Ondas de partículas sincronizadas

#### PlasmaSphere.jsx
Esfera de plasma con shaders

#### WaveField.jsx
Campo de ondas tridimensional

#### EnergyFlow.jsx
Flujo de energía tipo circuito

#### ElectricalBorder.jsx
Borde con efecto eléctrico

#### AnimatedMesh.jsx
Malla 3D con deformación animada

#### SectionTransition.jsx
Transiciones entre secciones de la página

---

## 🔧 Funcionalidades Interactivas

### 1. Hardware Test - VSBM (Very Simple Benchmark)
**Ubicación:** Botón en Hero.jsx
**URL:** https://cznull.github.io/vsbm

**Descripción:**
Sistema de testing y benchmark de hardware que se abre en un modal iframe.

**Funcionalidades:**
- Tests de CPU
- Tests de GPU
- Tests de memoria
- Tests de almacenamiento
- Benchmark scores
- Comparativas de rendimiento

**Modal:**
- Tamaño: max-w-2xl x h-600px
- Glassmorphism con backdrop blur
- Header con indicador "En línea"
- Botón de cierre animado
- Sandbox attributes para seguridad

---

### 2. Visualización de Redes Neuronales
**Ubicación:** Botón en Hero.jsx
**URL:** https://nn-vis.noelith.dev/

**Descripción:**
Herramienta interactiva para visualizar y experimentar con redes neuronales.

**Funcionalidades:**
- Arquitectura de red configurable
- Entrenamiento en tiempo real
- Visualización de capas y pesos
- Datasets predefinidos
- Gráficos de pérdida y precisión

**Modal:**
- Tamaño: max-w-7xl x h-1040px (casi fullscreen)
- Permisos completos para interacción
- Pointer events y touch action habilitados
- Indicador animado verde esmeralda

---

### 3. Sistema de Filtros en Gallery
**Ubicación:** Gallery.jsx

**Categorías:**
- Todos
- Web
- Mobile
- IA
- Cloud
- IoT

**Funcionalidades:**
- Filtrado instantáneo con AnimatePresence
- Transiciones suaves entre filtros
- Conteo dinámico de proyectos
- Estados activos visuales
- Layout animado con Framer Motion

---

### 4. Modal de Proyectos
**Ubicación:** Gallery.jsx

**Características:**
- Ampliación de proyecto en modal
- Video con controles
- Información detallada
- Tags tecnológicos
- Botón de cierre
- Click fuera para cerrar
- Animaciones de entrada/salida

---

### 5. Formulario de Contacto con Validación
**Ubicación:** Contact.jsx

**Validación:**
- Email format
- Campos requeridos
- Feedback visual instantáneo
- Animación de éxito

**Respuesta:**
- Modal de confirmación animada
- Icono de checkmark rotativo
- Auto-cierre después de 3 segundos
- Reset del formulario

---

### 6. Carousel de Videos Automático
**Ubicación:** Contact.jsx

**Características:**
- 3 videos simultáneos visibles
- Loop infinito sin cortes
- Duración: 12 segundos por ciclo
- Animación con Framer Motion
- Videos autoplay, muted, playsinline

---

### 7. Navegación Suave (Smooth Scroll)
**Ubicación:** Navigation.jsx

**Características:**
- Links con anchor a secciones (#home, #services, etc.)
- Scroll suave nativo del navegador
- Indicador visual de sección activa
- Menú móvil con animación slide

---

## 🧪 Testing de Hardware

### VSBM (Very Simple Benchmark)
**URL Externa:** https://cznull.github.io/vsbm

**Descripción:**
Herramienta de benchmarking y testing de hardware integrada en la landing page a través de iframe. Permite a los usuarios testear el rendimiento de su dispositivo directamente desde el navegador.

**Categorías de Tests:**

#### 1. CPU Tests
- **Single-Core Performance:** Test de rendimiento de un solo núcleo
- **Multi-Core Performance:** Test de rendimiento multi-núcleo
- **Integer Operations:** Operaciones enteras
- **Floating Point Operations:** Operaciones de punto flotante
- **Memory Access:** Velocidad de acceso a memoria

#### 2. GPU Tests
- **WebGL Performance:** Rendimiento de gráficos WebGL
- **3D Rendering:** Capacidad de renderizado 3D
- **Shader Performance:** Rendimiento de shaders
- **Fill Rate:** Tasa de llenado de píxeles
- **Texture Processing:** Procesamiento de texturas

#### 3. Memory Tests
- **RAM Speed:** Velocidad de memoria RAM
- **Cache Performance:** Rendimiento de caché
- **Memory Bandwidth:** Ancho de banda de memoria
- **Latency:** Latencia de acceso

#### 4. Storage Tests
- **Read Speed:** Velocidad de lectura
- **Write Speed:** Velocidad de escritura
- **Random Access:** Acceso aleatorio
- **Sequential Access:** Acceso secuencial

**Resultados:**
- Scores numéricos
- Gráficos comparativos
- Percentiles vs otros dispositivos
- Recomendaciones de mejora
- Exportación de resultados

**Integración:**
```javascript
// Modal en Hero.jsx
<iframe
  src="https://cznull.github.io/vsbm"
  className="w-full h-full border-0"
  title="Hardware Test"
  sandbox="allow-scripts allow-same-origin allow-forms"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
/>
```

**Características del Modal:**
- Fullscreen experience
- Header con indicador de estado
- Botón de cierre con animación
- Glassmorphism design
- Transiciones suaves con Framer Motion

---

## 📱 Tabletas de Servicios

### Sistema de Protección con Contraseña

**Ubicación:** Services.jsx (líneas 232-260)

**Descripción:**
Las tabletas interactivas de servicios (Desarrollo de Software, Consultoría Tecnológica, Procesamiento de Imágenes) están protegidas con un sistema de contraseña antes de abrir sus respectivos chats de IA.

**Contraseña Actual:** `sosi`

**Funcionamiento:**

#### 1. Interceptación de Click
Cuando el usuario hace click en una tarjeta protegida:
```javascript
onClick: () => handlePasswordProtectedAction(() => setIsCodexChatOpen(true))
```

#### 2. Modal de Contraseña
Se abre un modal con:
- **Icono de candado animado:** Gradiente púrpura-rosa
- **Título:** "Acceso Protegido"
- **Descripción:** "Ingresa la contraseña para acceder a este servicio"
- **Input de contraseña:** Con autoFocus
- **Botón "Acceder":** Gradiente púrpura-rosa con hover scale
- **Botón cerrar:** Esquina superior derecha

#### 3. Validación
```javascript
if (passwordInput === 'sosi') {
  // Acceso concedido
  setIsPasswordModalOpen(false)
  pendingChatAction() // Ejecuta la acción (abrir chat)
} else {
  // Error
  setPasswordError(true)
  // Feedback visual en rojo
}
```

#### 4. Estados del Sistema
- `isPasswordModalOpen`: Controla visibilidad del modal
- `passwordInput`: Valor del input
- `pendingChatAction`: Función pendiente a ejecutar tras validación exitosa
- `passwordError`: Estado de error para feedback visual

**Diseño del Modal:**
```css
- Background: rgba(0, 0, 0, 0.7) con backdrop-blur
- Contenedor: bg-gradient-to-br from-gray-900/95 to-gray-800/95
- Border: border-white/10
- Shadow: shadow-2xl
- Animaciones: Framer Motion (opacity, scale, y)
```

**Servicios Protegidos:**

### 1. CodexChat (Desarrollo de Software)
**Activación:** Click en tarjeta "Desarrollo de Software"
**Requisito:** Contraseña "sosi"
**Funcionalidad:** Chat especializado en desarrollo con syntax highlighting

### 2. OpenAIChat (Consultoría Tecnológica)
**Activación:** Click en tarjeta "Consultoría Tecnológica"
**Requisito:** Contraseña "sosi"
**Funcionalidad:** Consultoría con IA avanzada

### 3. OpenAIImageChat (Procesamiento de Imágenes)
**Activación:** Click en tarjeta "Procesamiento de Imágenes"
**Requisito:** Contraseña "sosi"
**Funcionalidad:** Generación de imágenes con DALL-E 3

**Servicios Sin Protección:**
- Transformación Digital
- Ciberseguridad
- Capacitación

**Características de Seguridad:**
- Validación en tiempo real
- Feedback visual de error
- Auto-limpieza del input en error
- Cierre manual o por escape
- No hay límite de intentos (considerar implementar)

**Mejoras Sugeridas:**
1. Implementar límite de intentos
2. Agregar delay tras errores múltiples
3. Encriptar contraseña
4. Sistema de autenticación real con backend
5. Expiración de sesión
6. Logs de intentos de acceso

---

## ⚙️ Configuración y Deploy

### Instalación y Setup

#### 1. Clonar el repositorio
```bash
git clone [URL_DEL_REPO]
cd landingHardware
```

#### 2. Instalar dependencias
```bash
npm install
```

#### 3. Ejecutar en desarrollo
```bash
npm run dev
```
- Se abrirá automáticamente en http://localhost:3000
- Hot Module Replacement (HMR) activado
- Compatible con ngrok

#### 4. Build para producción
```bash
npm run build
```
- Genera carpeta `/dist` con archivos optimizados
- Minificación de JS y CSS
- Tree-shaking automático
- Code splitting por rutas

#### 5. Preview de producción
```bash
npm run preview
```

---

### Configuración de Vite

**Archivo:** `vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    allowedHosts: ['detectible-descriptively-cordie.ngrok-free.app']
  }
})
```

**Características:**
- Puerto por defecto: 3000
- Auto-open en navegador
- Ngrok support para desarrollo remoto
- HMR (Hot Module Replacement)
- Fast Refresh para React

---

### Configuración de Tailwind CSS

**Archivo:** `tailwind.config.js`

**Content Paths:**
```javascript
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
]
```

**Extensiones Custom:**

#### Animaciones
```javascript
animation: {
  'gradient': 'gradient 8s linear infinite',
  'float': 'float 6s ease-in-out infinite',
  'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
}
```

#### Keyframes
```javascript
keyframes: {
  gradient: {
    '0%, 100%': { 'background-position': 'left center' },
    '50%': { 'background-position': 'right center' },
  },
  float: {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-20px)' },
  },
}
```

#### Backdrop Blur
```javascript
backdropBlur: {
  xs: '2px',
}
```

#### Colores Custom
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

---

### Deploy en Producción

#### Opciones Recomendadas:

##### 1. Vercel (Recomendado)
```bash
npm i -g vercel
vercel
```
- Auto-deployment desde Git
- HTTPS automático
- CDN global
- Serverless functions support

##### 2. Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```
- Drag & drop en UI
- Continuous deployment
- Forms handling
- Functions support

##### 3. GitHub Pages
```bash
npm run build
# Subir carpeta dist/ a gh-pages branch
```

##### 4. Hosting tradicional
```bash
npm run build
# Subir contenido de dist/ via FTP/SFTP
```

**Requisitos del servidor:**
- Soporte para SPA (Single Page Application)
- Rewrite rules para React Router (si se implementa)
- HTTPS recomendado
- Gzip/Brotli compression
- Cache headers apropiados

---

### Variables de Entorno (Recomendado)

**Archivo:** `.env`

```env
# API Keys (ejemplo, NO commitear)
VITE_N8N_WEBHOOK_URL=https://n8n.lockthard.es/webhook/...
VITE_OPENAI_API_KEY=sk-...
VITE_PASSWORD_PROTECTION=sosi

# URLs externas
VITE_HARDWARE_TEST_URL=https://cznull.github.io/vsbm
VITE_NEURAL_NETWORK_URL=https://nn-vis.noelith.dev/
```

**Uso en código:**
```javascript
const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL
```

---

### Optimizaciones de Producción

#### 1. Lazy Loading de Componentes
```javascript
const Gallery = lazy(() => import('./components/Gallery'))
```

#### 2. Image Optimization
- Usar formatos WebP
- Lazy loading con loading="lazy"
- Responsive images con srcset

#### 3. Code Splitting
- Vite lo hace automáticamente
- Chunks separados por rutas y componentes grandes

#### 4. Preload Critical Resources
```html
<link rel="preload" as="font" href="/fonts/..." crossorigin>
```

#### 5. Bundle Analysis
```bash
npm run build -- --mode analyze
```

---

### Monitoreo y Analytics

#### Google Analytics 4
Agregar a `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

#### Sentry (Error Tracking)
```bash
npm install @sentry/react @sentry/tracing
```

---

### Performance Targets

**Métricas objetivo:**
- **First Contentful Paint (FCP):** < 1.8s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Time to Interactive (TTI):** < 3.8s
- **Cumulative Layout Shift (CLS):** < 0.1
- **First Input Delay (FID):** < 100ms

**Lighthouse Score Target:** > 90 en todas las categorías

---

## 📚 Resumen de Tecnologías Clave

### Frontend Framework
- **React 18.2.0** - Biblioteca UI con Hooks y Concurrent Mode

### Build Tool
- **Vite 5.2.0** - Build tool ultra-rápido con HMR

### Animaciones
- **Framer Motion 11.0.0** - Animaciones declarativas para React
- Variants, AnimatePresence, useScroll, useTransform, useInView

### Gráficos 3D
- **Three.js 0.180.0** - Biblioteca 3D para WebGL
- **@react-three/fiber** - React renderer para Three.js
- **@react-three/drei** - Helpers y abstracciones para R3F

### WebGL
- **OGL 1.0.11** - Librería WebGL optimizada
- Shaders GLSL personalizados
- Renderer, Program, Mesh, Triangle primitives

### Postprocessing
- **postprocessing 6.37.8** - Efectos de postprocesado
- UnrealBloomPass, efectos de glow

### Estilos
- **Tailwind CSS 3.4.3** - Utility-first CSS framework
- JIT mode, custom animations, extended theme

### Iconos
- **Lucide React 0.263.1** - Iconos modernos y personalizables
- Bot, MessageCircle, Send, Mail, Phone, MapPin, etc.

### Integraciones
- **@n8n/chat 0.59.0** - Widget de chat n8n
- **@splinetool/react-spline** - Modelos 3D interactivos

---

## 🔑 Puntos Clave para el Asistente IA

### Estructura del Código
- **Arquitectura:** Componentes funcionales con Hooks
- **Estado:** useState, useRef, useEffect
- **Animaciones:** Framer Motion variants y transitions
- **Estilos:** Tailwind CSS con clases utility
- **Efectos:** Canvas y WebGL para efectos avanzados

### Patrones de Diseño Utilizados
- **Component Composition:** Componentes reutilizables
- **Render Props:** Para efectos visuales
- **Custom Hooks:** (potential para extraer lógica)
- **Container/Presentational:** Separación de lógica y UI

### Glassmorphism Design
- backdrop-blur-{size}
- bg-{color}/{opacity}
- border border-white/{opacity}
- Overlays múltiples para profundidad

### Performance Considerations
- willChange CSS para optimización
- RequestAnimationFrame para animaciones
- Cleanup en useEffect
- Lazy loading de componentes grandes (recomendado)

### Responsive Design
- Breakpoints: sm, md, lg, xl, 2xl
- Mobile-first approach
- Menú hamburguesa para móviles
- Grid adaptativo (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)

---

## 📞 Información de Soporte

**Desarrollador Principal:** Innovate Solutions
**Email de Soporte:** albertotplaza@gmail.com
**Teléfono:** +34 621 208 980
**Ubicación:** Castellón - Onda, España

**Repositorio:** [URL del repositorio Git]
**Documentación:** Este archivo (DOCUMENTACION_COMPLETA.md)

---

## 📝 Notas Finales

Este proyecto es una landing page moderna con características avanzadas:

✅ **Completado:**
- Estructura base de componentes
- Efectos visuales avanzados con WebGL
- Múltiples asistentes IA integrados
- Sistema de protección con contraseña
- Formulario de contacto funcional
- Galería de proyectos con filtros
- Responsive design completo
- Testing de hardware integrado
- Visualización de redes neuronales

🚧 **Por Implementar (Opcionales):**
- Backend real para formulario de contacto
- Sistema de autenticación real
- CMS para gestionar proyectos
- Analytics y tracking
- SEO optimization
- Blog section
- Testimonials dinámicos
- Multiidioma (i18n)
- Dark/Light mode toggle
- Accesibilidad (a11y) mejorada

---

**Última actualización:** 2025-11-18
**Versión de la documentación:** 1.0.0

