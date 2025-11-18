# 📚 Documentación Completa del Proyecto Landing Hardware

## 🎯 Resumen Ejecutivo

**Proyecto:** Landing Hardware - Innovate Solutions
**Propósito:** Herramienta para probar hardware potente mediante efectos visuales espectaculares, interfaces de chat con IA y arquitectura escalable
**Dominio:** lockthard.es
**Tipo:** Landing Page SPA con Backend API REST

---

## 🏗️ Arquitectura General

### Stack Tecnológico

#### Frontend
- **Framework:** React 18 con ES Modules
- **Build Tool:** Vite 5.2 (puerto 3000)
- **Estilos:** Tailwind CSS 3.4 + CSS personalizado
- **Animaciones:** Framer Motion 11
- **Gráficos 3D:** Three.js + React Three Fiber + @react-three/drei
- **Chat IA:** @n8n/chat 0.59
- **Iconos:** Lucide React

#### Backend
- **Framework:** Express 4.19 (Node.js)
- **Puerto:** 3001
- **URL Producción:** https://api.lockthard.es
- **IA:** OpenAI API (GPT-4o, GPT-5.1-codex, DALL-E 3)
- **Seguridad:** CORS + Rate Limiting (20 req/min)

#### Despliegue
- **Contenedor:** Docker (Node 18-alpine + Nginx)
- **Puerto Producción:** 80
- **Dominio Frontend:** https://lockthard.es
- **Dominio Backend:** https://api.lockthard.es
- **n8n:** https://n8n.lockthard.es

---

## 📁 Estructura de Directorios

```
/home/user/landingHardware/
├── src/
│   ├── App.jsx                    # Componente raíz - parallax, splash, secciones
│   ├── main.jsx                   # Entry point React
│   ├── components/
│   │   ├── Navigation.jsx         # Header fijo con logo MetallicText
│   │   ├── Hero.jsx               # Portada con RobotModel 3D, OrbBot
│   │   ├── Services.jsx           # Tarjetas servicios + Galaxy effect
│   │   ├── Gallery.jsx            # Galería proyectos + filtros
│   │   ├── Contact.jsx            # Formulario contacto
│   │   ├── Testimonials.jsx       # Carrusel testimonios
│   │   ├── ChatBot.jsx            # Chat local sin IA (knowledge base)
│   │   ├── CodexChat.jsx          # Chat desarrollo IA (GPT-4o/Codex)
│   │   ├── OpenAIChat.jsx         # Chat consultoría IA (GPT-4o)
│   │   ├── OpenAIImageChat.jsx    # Generación imágenes (DALL-E 3)
│   │   ├── N8nChatEmbed.jsx       # Integración n8n workflows
│   │   └── efectos/               # 23 efectos visuales
│   │       ├── AnimatedMesh.jsx
│   │       ├── CircuitBoard.jsx
│   │       ├── CodeMatrix.jsx     # Usado en CodexChat
│   │       ├── DataFlow.jsx       # Usado en OpenAIImageChat
│   │       ├── Galaxy.jsx         # Usado en Services/Gallery
│   │       ├── Hyperspeed.jsx     # Splash screen
│   │       ├── MetallicText.jsx   # Logo
│   │       ├── NeuralNetwork.jsx  # Usado en OpenAIChat
│   │       ├── Orb.jsx            # Usado en Hero (OrbBot)
│   │       └── ... (14 más)
│   ├── styles/                    # CSS personalizado
│   └── assets/                    # Imágenes, texturas
├── backend/
│   ├── server.js                  # API Express completa
│   ├── package.json               # Dependencias backend
│   ├── .env.example               # Ejemplo variables entorno
│   └── .env                       # Variables entorno (no en repo)
├── public/                        # Videos, modelos 3D estáticos
├── dist/                          # Build producción (generado)
├── vite.config.js                 # Configuración Vite
├── tailwind.config.js             # Configuración Tailwind
├── package.json                   # Dependencias frontend
├── Dockerfile                     # Contenedorización
├── PROJECT_KNOWLEDGE.json         # Base conocimiento JSON
└── DOCUMENTACION_COMPLETA.md      # Este archivo
```

---

## 🤖 Sistema de Chats con IA (5 Implementaciones)

### 1. ChatBot.jsx - Chat Local (Sin IA)

**Ubicación:** `src/components/ChatBot.jsx`

**Características:**
- ❌ NO usa IA - respuestas predefinidas
- 📚 Base de conocimiento local (objeto `knowledge`)
- ⚡ Respuesta instantánea (delay 1s simulado)
- 💰 Sin costo API

**Categorías disponibles:**
1. **Servicios** - Keywords: servicios, servicio, qué hacen, ofrecen, productos
2. **Contacto** - Keywords: contacto, email, teléfono, ubicación
3. **Desarrollo** - Keywords: desarrollo, app, web, móvil, software
4. **IA** - Keywords: ia, inteligencia artificial, machine learning, datos
5. **Seguridad** - Keywords: seguridad, ciberseguridad, protección
6. **Precios** - Keywords: precio, costo, presupuesto, cotización
7. **Saludos** - Keywords: hola, buenos días, hey
8. **Agradecimientos** - Keywords: gracias, perfecto, genial

**Interfaz:**
- Posición: Bottom-right fixed
- Tamaño: 384px × 512px
- Efectos: Glassmorphism + backdrop blur + gradientes

**Funcionamiento:**
```
Usuario escribe → Busca keywords en knowledge → Devuelve respuesta predefinida
```

---

### 2. CodexChat.jsx - Chat Desarrollo IA

**Ubicación:** `src/components/CodexChat.jsx`
**Archivo Backend:** `backend/server.js` línea 263

**Modelo:** GPT-4o / GPT-5.1-codex
**Endpoint:** `POST https://api.lockthard.es/api/chat/codex`

**Especialidad:**
- 💻 Desarrollo de software
- 🏗️ Arquitectura de sistemas
- 🐛 Debugging y troubleshooting
- ✅ Mejores prácticas código
- 🔧 Refactoring y optimización

**Características únicas:**
- ✅ Soporte markdown con bloques de código
- 📋 Botón "Copiar Código" en cada bloque ```code```
- 🎨 Sintaxis highlighting
- 🌌 Fondo CodeMatrix (código cayendo tipo Matrix)
- 💻 Interfaz estilo terminal
- 📚 Historial conversación (últimos 10 mensajes)

**Configuración:**
```javascript
{
  model: 'gpt-4o' o 'gpt-5.1-codex',
  temperature: 0.5,
  max_tokens: 1000,
  systemPrompt: "Eres un asistente experto en desarrollo de software..."
}
```

**Flujo:**
```
Usuario mensaje (max 2000 chars)
  ↓
POST /api/chat/codex {message, conversationHistory}
  ↓
Backend → OpenAI con system prompt + historial
  ↓
GPT-4o responde (max 1000 tokens)
  ↓
Frontend parsea markdown y detecta ```código```
  ↓
Renderiza con botones copiar
```

---

### 3. OpenAIChat.jsx - Consultoría Tecnológica

**Ubicación:** `src/components/OpenAIChat.jsx`
**Endpoint:** `POST https://api.lockthard.es/api/chat`

**Modelo:** GPT-4o
**Propósito:** Consultas tecnológicas generales

**Temas:**
- 🎯 Estrategia tecnológica
- 🏢 Soluciones empresariales
- 📊 Análisis de problemas
- 💡 Recomendaciones técnicas

**Interfaz:**
- 🌐 Fondo: NeuralNetwork animado (red neuronal)
- 🎨 Colores: Gradientes púrpura/rosa
- 📱 Fullscreen modal

**Configuración:**
```javascript
{
  model: 'gpt-4o',
  temperature: 0.7,
  max_tokens: 800,
  systemPrompt: "Eres un consultor tecnológico experto..."
}
```

---

### 4. OpenAIImageChat.jsx - Generación de Imágenes

**Ubicación:** `src/components/OpenAIImageChat.jsx`
**Endpoint:** `POST https://api.lockthard.es/api/generate-image`

**Modelo:** DALL-E 3
**Propósito:** Generar imágenes desde descripción texto

**Características:**
- 🎨 Generación imágenes 1024×1024 HD
- 📝 Prompt en español o inglés
- 🖼️ Muestra imagen directamente en chat
- ✏️ Muestra prompt revisado por OpenAI
- ⏱️ Tiempo generación: 20-60 segundos
- 🌊 Fondo: DataFlow animado

**Configuración:**
```javascript
{
  model: 'dall-e-3',
  size: '1024x1024',
  quality: 'standard',
  n: 1
}
```

**Flujo:**
```
Usuario describe imagen
  ↓
POST /api/generate-image {prompt}
  ↓
DALL-E 3 genera (20-60s)
  ↓
Devuelve {imageUrl, revisedPrompt}
  ↓
Muestra imagen + prompt optimizado
```

---

### 5. N8nChatEmbed.jsx - Workflows Personalizados

**Ubicación:** `src/components/N8nChatEmbed.jsx`
**Webhook:** `https://n8n.lockthard.es/webhook/...`

**Plataforma:** n8n.lockthard.es
**Asistente:** "Sonar-Pro"

**Características:**
- 🔄 Integración con workflows n8n
- 💾 Carga sesiones anteriores
- 🖥️ Modo fullscreen disponible
- 🌍 Multiidioma (español/inglés)
- 🔗 Integraciones externas ilimitadas

**Ventajas:**
- ✅ Lógica personalizable visual
- ♾️ Sin límites tokens propios
- 🔌 Conexión a servicios externos
- 📊 Workflows complejos

---

## 🎨 Efectos Visuales (23 Componentes)

### Ubicación: `src/components/efectos/`

| Efecto | Descripción | Usado en |
|--------|-------------|----------|
| **Galaxy** | Estrellas interactivas responden a mouse | Services.jsx, Gallery.jsx |
| **Hyperspeed** | Velocidad hiperespacio con líneas púrpura | App.jsx (splash screen) |
| **CodeMatrix** | Código cayendo tipo Matrix verde | CodexChat.jsx (fondo) |
| **NeuralNetwork** | Red neuronal con pulsos conectados | OpenAIChat.jsx (fondo) |
| **DataFlow** | Flujo de datos ondulante | OpenAIImageChat.jsx (fondo) |
| **Orb** | Esfera flotante interactiva | Hero.jsx (OrbBot) |
| **MetallicText** | Texto con reflejo metálico/cromo | Navigation.jsx (logo) |
| **AnimatedMesh** | Malla 3D con morphing | Fondos abstractos |
| **CircuitBoard** | Circuito electrónico animado | Fondos tecnológicos |
| **ElectricalBorder** | Bordes eléctricos | Bordes tarjetas |
| **EnergyFlow** | Flujo energía pulsante | Acentos visuales |
| **GeometricMorph** | Geometrías transformándose | Fondos 3D |
| **Iridescence** | Efecto holográfico iridiscente | Overlays sutiles |
| **KnowledgeOrbs** | Esferas conocimiento flotantes | Visualización datos |
| **Lightning** | Rayos eléctricos animados | Acentos dramáticos |
| **ParticleSwarm** | Enjambre partículas (flocking) | Fondos dinámicos |
| **ParticleWave** | Ola de partículas | Transiciones |
| **PlasmaSphere** | Esfera plasma energético | Efectos centrales |
| **SectionTransition** | Transiciones secciones | Entre secciones |
| **ShieldField** | Campo de fuerza hexagonal | Protección visual |
| **SplashCursor** | Splash al mover cursor | Interacción mouse |
| **VariableProximity** | Partículas reaccionan proximidad | Mouse interaction |
| **WaveField** | Campo ondulante 3D | Fondos grid |

### Optimización Rendimiento Efectos

✅ `RequestAnimationFrame` para animaciones suaves
✅ CSS `transform` en lugar de `left/top` (GPU accelerated)
✅ `will-change` para propiedades animadas
✅ Throttling eventos mouse/scroll
✅ Canvas offscreen cuando sea posible
✅ Lazy loading componentes pesados

---

## 🔌 Backend API REST

### Archivo: `backend/server.js`

### Endpoints Disponibles

#### 1. `GET /health`
**Descripción:** Health check del servidor

**Respuesta:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

---

#### 2. `GET /api/config`
**Descripción:** Verificar configuración API

**Respuesta:**
```json
{
  "openai_configured": true,
  "model": "gpt-4o",
  "image_model": "dall-e-3",
  "codex_model": "gpt-5.1-codex"
}
```

---

#### 3. `POST /api/chat`
**Descripción:** Chat general consultoría tecnológica

**Request Body:**
```json
{
  "message": "¿Qué es React?",
  "conversationHistory": [
    {"role": "user", "content": "Hola"},
    {"role": "assistant", "content": "Hola, ¿en qué puedo ayudarte?"}
  ]
}
```

**Validación:**
- ✅ `message` requerido (string)
- ✅ Max 2000 caracteres
- ℹ️ `conversationHistory` opcional (últimos 10 mensajes)

**Respuesta:**
```json
{
  "reply": "React es una biblioteca JavaScript...",
  "usage": {
    "prompt_tokens": 50,
    "completion_tokens": 150,
    "total_tokens": 200
  }
}
```

**Configuración:**
- Modelo: `gpt-4o`
- Temperature: `0.7`
- Max tokens: `800`

---

#### 4. `POST /api/chat/codex`
**Descripción:** Chat especializado desarrollo software

**Request Body:**
```json
{
  "message": "¿Cómo crear un componente React con hooks?",
  "conversationHistory": []
}
```

**Respuesta:**
```json
{
  "reply": "Puedes crear un componente con hooks así:\n\n```javascript\nimport { useState } from 'react'\n\nconst MyComponent = () => {\n  const [count, setCount] = useState(0)\n  return <button onClick={() => setCount(count + 1)}>{count}</button>\n}\n```",
  "usage": {
    "prompt_tokens": 40,
    "completion_tokens": 120,
    "total_tokens": 160
  }
}
```

**Configuración:**
- Modelo: `gpt-5.1-codex` o `gpt-4o`
- Temperature: `0.5`
- Max tokens: `1000`
- System Prompt: "Eres un asistente experto en desarrollo de software..."

---

#### 5. `POST /api/generate-image`
**Descripción:** Generación de imágenes con DALL-E 3

**Request Body:**
```json
{
  "prompt": "Un robot futurista escribiendo código en una oficina iluminada con neón"
}
```

**Respuesta:**
```json
{
  "imageUrl": "https://oaidalleapiprodscus.blob.core.windows.net/...",
  "revisedPrompt": "A futuristic robot typing code on a keyboard in a neon-lit office..."
}
```

**Configuración:**
- Modelo: `dall-e-3`
- Size: `1024x1024`
- Quality: `standard`
- N: `1` (1 imagen)

**Tiempo estimado:** 20-60 segundos

---

### Seguridad Backend

#### CORS Configurado
**Orígenes permitidos:**
- `https://lockthard.es`
- `http://localhost:3000`
- `http://localhost:5173`

**Métodos:** GET, POST
**Headers:** Content-Type

#### Rate Limiting
- **Ventana:** 1 minuto
- **Max peticiones:** 20
- **Por:** IP
- **Mensaje:** "Demasiadas peticiones, por favor intenta de nuevo más tarde"

#### Validación Entrada
- ✅ Mensaje requerido (string)
- ✅ Max 2000 caracteres
- ✅ Validación tipo

---

### Manejo de Errores

| Tipo Error | Código | Mensaje |
|------------|--------|---------|
| API key no configurada | 500 | "API key de OpenAI no está configurada" |
| Cuota excedida | 429 | "Has excedido tu cuota de OpenAI" |
| Rate limit OpenAI | 429 | "Demasiadas peticiones a OpenAI" |
| Entrada inválida | 400 | "El mensaje es requerido y debe ser un string" |
| Mensaje muy largo | 400 | "El mensaje es demasiado largo (máximo 2000 caracteres)" |
| Error genérico | 500 | "Error al procesar la solicitud" |

---

### Variables de Entorno (.env)

**Archivo:** `backend/.env`

```env
OPENAI_API_KEY=sk-proj-...             # Requerida
OPENAI_MODEL=gpt-4o                    # Opcional (default: gpt-4o)
OPENAI_IMAGE_MODEL=dall-e-3            # Opcional (default: dall-e-3)
CODEX_MODEL=gpt-5.1-codex              # Opcional (default: gpt-4o)
PORT=3001                               # Opcional (default: 3001)
```

---

## ⚙️ Configuración del Proyecto

### vite.config.js

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

### tailwind.config.js

**Colores primarios:**
- Azul: `blue-500` a `blue-700`
- Cian: `cyan-400` a `cyan-600`
- Púrpura: `purple-500` a `purple-600`
- Rosa: `pink-500` a `pink-600`

**Animaciones custom:**
- `gradient` - Gradiente animado
- `float` - Flotación suave
- `pulse-slow` - Pulso lento

**Blur custom:**
- `backdrop-blur-xs` - `blur(2px)`

### package.json (Frontend)

```json
{
  "name": "landing-animada",
  "type": "module",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### Dockerfile

**Etapa 1: Build**
- Base: `node:18-alpine`
- Acción: `npm install && npm run build`

**Etapa 2: Production**
- Base: `nginx:alpine`
- Puerto: `80`
- Copia: `dist/` → `/usr/share/nginx/html`

---

## 🔄 Flujos de Funcionamiento

### Carga Inicial de la Página

```
1. index.html se carga en navegador
2. Vite inyecta bundle React
3. main.jsx renderiza <App />
4. App.jsx monta todas las secciones
5. Efectos de fondo se inicializan (Galaxy, etc.)
6. Parallax listener se activa en scroll
7. Animaciones Framer Motion se ejecutan secuencialmente
```

### Interacción Chat IA (CodexChat)

```
1. Usuario abre modal CodexChat desde Services
2. Usuario escribe mensaje (validación max 2000 chars)
3. Mensaje se agrega a estado local + UI
4. POST a https://api.lockthard.es/api/chat/codex
5. Backend valida entrada
6. Backend envía a OpenAI:
   - System prompt: "Eres un asistente experto..."
   - Historial últimos 10 mensajes
   - Mensaje actual
7. GPT-4o responde (max 1000 tokens, temp 0.5)
8. Backend devuelve {reply, usage}
9. Frontend parsea markdown:
   - Detecta bloques ```código```
   - Agrega botones "Copiar Código"
10. Se renderiza en chat
11. Historial se actualiza para próxima interacción
```

### Generación de Imagen (DALL-E 3)

```
1. Usuario abre OpenAIImageChat
2. Usuario describe imagen deseada
3. POST a /api/generate-image con {prompt}
4. Backend valida prompt (max 2000 chars)
5. Backend llama DALL-E 3 (size: 1024x1024)
6. Espera 20-60 segundos mientras se genera
7. OpenAI devuelve:
   - imageUrl (temporal)
   - revisedPrompt (optimizado)
8. Backend devuelve {imageUrl, revisedPrompt}
9. Frontend muestra:
   - Imagen en chat
   - Prompt revisado
10. Usuario puede descargar imagen
```

### Efecto Splash Screen

```
1. Usuario scrollea hacia abajo
2. Detector de scroll activa splash al llegar a Services
3. Componente <Hyperspeed /> se monta (fullscreen)
4. Animación de velocidad (líneas púrpura) durante 2s
5. <Hyperspeed /> se desmonta con fade-out
6. Services + Gallery aparecen con efecto Galaxy compartido
```

---

## 🎯 Funcionalidades Clave

### Prueba de Hardware Potente

**Objetivo:** Demostrar capacidades de hardware moderno

**Elementos intensivos:**
- ✅ 23 efectos visuales simultáneos (Canvas/WebGL)
- ✅ Modelos 3D con Three.js (robot, esferas)
- ✅ Animaciones Framer Motion complejas
- ✅ Parallax scroll con múltiples capas
- ✅ Miles de partículas interactivas
- ✅ Post-procesamiento efectos visuales
- ✅ Blur y gradientes animados en tiempo real
- ✅ Detección mouse con alta frecuencia

**Métricas objetivo:**
- **FPS:** 60fps constantes
- **GPU:** Utilizada para render 3D/WebGL
- **CPU:** Cálculos partículas y física
- **RAM:** Carga texturas y modelos 3D

---

### Automatización

**Implementada mediante:**
- N8nChatEmbed para workflows personalizados
- Integración OpenAI para respuestas automáticas
- Posibilidad de webhook triggers desde chat
- Formulario contacto (backend pendiente)

---

### Tabletas Interactivas de Servicios

**Descripción:** Interfaces protegidas para demostraciones públicas

**Características:**
- 🔐 Acceso protegido con contraseña
- 📱 Fullscreen para kioscos/tablets
- 🤖 Múltiples chats especializados
- 🎨 Generación imágenes DALL-E 3
- 💻 Chat desarrollo con Codex

**Seguridad:**
- Password-protected para demos públicas
- Rate limiting API (20 req/min)
- Validación entrada usuario

---

## 📱 Responsive Design

### Breakpoints

| Dispositivo | Rango | Ajustes |
|-------------|-------|---------|
| **Mobile** | 320px - 767px | Menú hamburguesa, Grid 1 columna, Efectos simplificados |
| **Tablet** | 768px - 1023px | Grid 2 columnas, Efectos completos, Nav horizontal |
| **Desktop** | 1024px - 1279px | Grid 3 columnas, Parallax completo, Hover 3D |
| **Large** | 1280px+ | Todo habilitado, Efectos máximos |

---

## 🚀 Despliegue

### Desarrollo Local

```bash
# Frontend
npm install
npm run dev
# → http://localhost:3000

# Backend
cd backend
npm install
cp .env.example .env
# Editar .env con OPENAI_API_KEY
npm start
# → http://localhost:3001
```

### Producción con Docker

```bash
# Build imagen
docker build -t landing-hardware .

# Ejecutar contenedor
docker run -p 80:80 landing-hardware

# Acceder
# → http://localhost
```

### Dominios Producción

- **Frontend:** https://lockthard.es
- **Backend:** https://api.lockthard.es
- **n8n:** https://n8n.lockthard.es

---

## 📊 Rendimiento y Optimización

### Frontend

✅ Vite build con tree-shaking automático
✅ Lazy loading componentes pesados
✅ CSS crítico inlined en `index.html`
✅ Bundle splitting automático
✅ Minificación JS/CSS en producción
✅ Compresión gzip en Nginx
✅ Animaciones GPU-accelerated (`transform`)
✅ `will-change` en elementos animados
✅ `RequestAnimationFrame` para canvas
✅ Throttling eventos mouse/scroll

### Backend

✅ Rate limiting 20 req/min
✅ Validación entrada antes de OpenAI
✅ Límite historial (10 mensajes)
✅ Manejo errores específico
✅ Logs estructurados
✅ CORS restrictivo

### Métricas Típicas

- **Carga inicial:** ~2s (con efectos 3D)
- **First Contentful Paint:** ~1s
- **Time to Interactive:** ~3s

---

## 📞 Información de Contacto

**Empresa:** Innovate Solutions
**Email:** albertotplaza@gmail.com
**Teléfono:** +34 621 208 980
**Ubicación:** Castellón - Onda, España
**Horario:** Lunes - Domingo, 10:30 - 23:00 (CET/CEST)

---

## 🔮 Futuras Mejoras Sugeridas

1. ✉️ Backend para formulario contacto (enviar emails)
2. 💾 Base de datos para guardar conversaciones
3. 🎨 Más efectos visuales personalizables
4. 🛠️ Dashboard admin para gestionar servicios
5. 🔐 Sistema autenticación usuarios
6. 📊 Analytics integrado (Google Analytics, Plausible)
7. 📱 PWA con service workers
8. 🧪 Tests unitarios con Vitest
9. 🎭 Tests E2E con Playwright
10. 🌍 Internacionalización (i18n) multi-idioma

---

## 📚 Archivos de Documentación

- **README.md** - Información general
- **COMANDOS.md** - Guía instalación y comandos
- **PROJECT_KNOWLEDGE.json** - Base conocimiento JSON estructurada
- **DOCUMENTACION_COMPLETA.md** - Este archivo
- **.env.example** - Ejemplo variables entorno

---

## 🎓 Resumen Técnico para IA

Este proyecto es una **landing page SPA moderna** construida con:

- **React 18 + Vite 5.2** (frontend ultra-rápido con HMR)
- **Express + OpenAI API** (backend con GPT-4o, Codex, DALL-E 3)
- **23 efectos visuales** avanzados (Three.js, Canvas, WebGL)
- **5 interfaces de chat** especializadas (local, desarrollo, consultoría, imágenes, n8n)
- **Arquitectura modular** escalable y documentada
- **Propósito:** Demostrar capacidades de hardware potente mediante efectos intensivos

La web funciona como **herramienta de prueba de hardware** mediante:
- Renderizado 3D en tiempo real
- Miles de partículas interactivas
- Animaciones complejas simultáneas
- Procesamiento IA integrado

Todo el código está optimizado para **rendimiento máximo** con técnicas como GPU acceleration, lazy loading, bundle splitting y throttling de eventos.

---

**Última actualización:** 2025-01-18
**Versión documentación:** 1.0
