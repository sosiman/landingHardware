# AGENTS.md

## Project Overview
**Innovate Solutions - Landing Page Animada**

Landing page moderna e interactiva para Innovate Solutions, empresa de consultoría tecnológica. Incluye modelos 3D, efectos WebGL avanzados, múltiples asistentes IA, sistema de autenticación, y galería de proyectos.

- **Tech Stack:** React 19, Vite, Tailwind CSS, Three.js, Framer Motion, Firebase, Supabase, WebGL (OGL)
- **Puerto Dev:** http://localhost:3000

## Project Structure

```
landingHardware/
├── public/
│   └── videos/            # Project portfolio videos
├── src/
│   ├── components/
│   │   ├── Hero.jsx       # Main hero section with 3D robot
│   │   ├── Services.jsx   # Services section with effects
│   │   ├── Gallery.jsx    # Projects gallery with filters
│   │   ├── Contact.jsx    # Contact form and info
│   │   ├── Navigation.jsx # Main navigation bar
│   │   ├── OrbBot.jsx     # Interactive AI assistant bot
│   │   ├── ChatBot.jsx    # Chat modal for OrbBot
│   │   ├── RobotModel.jsx # 3D robot model (Three.js)
│   │   ├── CarViewer3D.jsx # 3D car viewer
│   │   ├── globe.tsx      # 3D globe visualization
│   │   ├── magic-loader.tsx # Animated loader
│   │   │
│   │   ├── N8nChatEmbed.jsx    # Sonar-Pro chat (n8n)
│   │   ├── OpenAIChat.jsx      # Consulting chat
│   │   ├── OpenAIImageChat.jsx # Image generation chat
│   │   ├── CodexChat.jsx       # Code development chat
│   │   │
│   │   ├── effects/       # Advanced visual effects
│   │   │   ├── Orb.jsx    # WebGL sphere effect
│   │   │   ├── Galaxy.jsx # Galaxy background
│   │   │   ├── Hyperspeed.jsx # Cyberpunk road effect
│   │   │   ├── NeuralNetwork.jsx
│   │   │   ├── CodeMatrix.jsx
│   │   │   ├── MetallicText.jsx
│   │   │   └── ... (30+ effects)
│   │   │
│   │   ├── *Card.jsx      # Tool category cards
│   │   ├── *CLIWindow.jsx # CLI window components
│   │   ├── three/         # Three.js components
│   │   └── ui/            # UI components
│   │
│   ├── config/
│   │   ├── firebase.js    # Firebase auth config
│   │   └── supabase.js    # Supabase client
│   ├── context/
│   │   └── AuthContext.jsx # Auth state management
│   ├── data/
│   │   └── all-tools.json # Tools database
│   ├── lib/
│   │   └── utils.ts       # Utility functions
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── .env                   # Environment variables (not in git)
├── .env.example           # Example env file
├── README.md
├── AGENTS.md             # This file
├── COMANDOS.md           # Installation guide
└── DOCUMENTACION_COMPLETA.md
```

## Key Features

1. **Efectos Visuales Avanzados**
   - Efectos WebGL con shaders GLSL personalizados (Orb.jsx)
   - Modelos 3D interactivos con Three.js (Robot, Car, Globe)
   - 30+ efectos visuales (Galaxy, Hyperspeed, NeuralNetwork, CodeMatrix, etc.)
   - Texto metálico con efectos cromados y plateados
   - Efectos de proximidad en texto (VariableProximity)

2. **Múltiples Asistentes IA**
   - **OrbBot**: Asistente principal con animación circular WebGL
   - **Sonar-Pro**: Chat avanzado conectado a n8n
   - **OpenAIChat**: Consultoría tecnológica (protegido con contraseña)
   - **OpenAIImageChat**: Generación de imágenes con DALL-E 3
   - **CodexChat**: Desarrollo de software con syntax highlighting

3. **Sistema de Autenticación**
   - Google OAuth via Firebase
   - Gestión de usuarios con Supabase
   - Row Level Security (RLS)
   - Contexto de autenticación global

4. **Sección de Servicios**
   - 6 servicios con efectos visuales únicos
   - Sistema de protección por contraseña ("sosi")
   - Hover effects 3D en tarjetas
   - Integraciones con chats IA especializados

5. **Galería de Proyectos**
   - Filtros por categoría (Web, Mobile, IA, Cloud, IoT)
   - Videos de proyectos con autoplay
   - Modal de ampliación
   - Animaciones con Framer Motion

6. **Herramientas de Testing**
   - VSBM (Very Simple Benchmark) para hardware
   - Visualización de redes neuronales
   - Integrados mediante iframes en modals

7. **Categorías de Herramientas** (50+ tarjetas de herramientas)
   - Academia & Research
   - Cybersecurity
   - Web Development
   - CLI Tools
   - Free APIs & Hosting
   - AI Tools (Top Elite, Premium, Pro)
   - Automation
   - Design & Development
   - MCP Tools
   - Y muchas más...

## Environment Variables

Required in `.env` (ver `.env.example`):
```
VITE_API_URL=http://localhost:8000
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

**IMPORTANTE:** Nunca commitear el archivo `.env` con las keys reales

## Development

### Instalación
```bash
# Navegar al directorio del proyecto
cd C:\Users\codex\Documents\LANDING-ANIMADA\landingHardware\landingHardware

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev          # http://localhost:3000
```

### Scripts Disponibles
```bash
npm run dev          # Modo desarrollo con HMR
npm run build        # Build para producción
npm run preview      # Preview del build
```

### Configuración Vite
- Puerto: 3000
- Auto-open: Habilitado
- Ngrok support: detectible-descriptively-cordie.ngrok-free.app
- HMR: Activado

## Deployment

El proyecto puede deployarse en:
- **Vercel** (recomendado para Vite + React)
- **Netlify**
- **GitHub Pages**
- Cualquier hosting estático

Pasos básicos:
```bash
npm run build      # Genera carpeta dist/
# Subir contenido de dist/ al hosting
```

## Important Notes

### Security
- ✅ `.env` files are in `.gitignore`
- ✅ Only `.env.example` in repository
- ✅ Supabase uses RLS for data protection
- ✅ Firebase API keys are public (protected by Firebase rules)
- ⚠️ Service Role Keys should NEVER be exposed in frontend
- 🔒 Chats protegidos con contraseña: "sosi" (considerar cambiar)

### Critical: Protecting Secrets in Git
**ALWAYS verify `.gitignore` includes:**
```
.env
.env.local
node_modules/
dist/
```

**NEVER commit files containing:**
- `VITE_SUPABASE_ANON_KEY` - Supabase authentication key
- `VITE_SUPABASE_URL` - Supabase project URL
- Any other API keys or secrets

**Before committing:**
```bash
git status      # Verify .env is NOT listed
git diff        # Review changes
git add .       # Stage changes
git commit -m "mensaje descriptivo"
```

**If secrets were accidentally committed:**
1. Rotate/regenerate ALL exposed keys immediately
2. Update local `.env` files
3. Consider cleaning Git history with `git filter-repo`

### Common Issues
1. **WebGL errors:** Ensure browser supports WebGL 2.0
2. **3D models not loading:** Check console for CORS/network errors
3. **Animations stuttering:** Hardware acceleration might be disabled
4. **Components not found:** Verificar rutas de importación (case-sensitive)
5. **Port 3000 in use:** Cambiar puerto en vite.config.js

## Code Style

- **React:** Functional components with hooks
- **Styling:** Tailwind CSS utility classes
- **Animations:** Framer Motion for page transitions
- **State:** Context API for global state (auth, favorites)
- **File naming:** PascalCase for components, camelCase for utilities

## Dependencies

### Core
- **React** 19.2.3 - UI library
- **Vite** 7.2.6 - Build tool
- **Tailwind CSS** 3.4.3 - CSS framework

### 3D & Visual Effects
- **Three.js** 0.182.0 - 3D graphics
- **@react-three/fiber** 9.4.2 - React renderer for Three.js
- **@react-three/drei** 10.7.7 - Three.js helpers
- **OGL** 1.0.11 - WebGL library (para Orb effect)
- **postprocessing** 6.37.8 - Post-processing effects
- **GSAP** 3.13.0 - Advanced animations

### Animations & UI
- **Framer Motion** 11.0.0 - Declarative animations
- **Lucide React** 0.263.1 - Icon library

### Integrations
- **Firebase** - Authentication (Google OAuth)
- **Supabase** - Database and user management
- **@n8n/chat** 0.59.0 - n8n chat widget
- **@splinetool/react-spline** 4.1.0 - 3D Spline models

## Git Workflow

```bash
# Estado actual
git status

# Ver cambios
git diff

# Añadir archivos
git add .

# Commit con mensaje descriptivo
git commit -m "descripción de cambios"

# Push a la rama principal
git push origin master
```

**Branch principal:** master

## Componentes Principales Explicados

### Hero.jsx
- Sección principal con título "Innovate Solutions"
- Modelo 3D de robot en lado izquierdo
- OrbBot asistente en esquina inferior derecha
- 3 botones CTA: Hardware Test, Sonar-Pro, Redes Neuronales
- Texto rotativo cada 3 segundos
- Imágenes de fondo rotativas cada 8 segundos

### Services.jsx
- 6 tarjetas de servicios con efectos visuales
- Sistema de protección por contraseña ("sosi")
- Efectos de fondo: CodeMatrix, NeuralNetwork, DataFlow, etc.
- Integraciones con chats IA especializados

### Gallery.jsx
- 6 proyectos con videos
- Filtros: Todos, Web, Mobile, IA, Cloud, IoT
- Modal de ampliación

### OrbBot.jsx
- Asistente IA visual con efecto Orb (WebGL)
- Ubicación: esquina inferior derecha del Hero
- Click abre ChatBot.jsx

### ChatBot.jsx
- Modal de chat con base de conocimiento
- Responde preguntas sobre servicios, contacto, desarrollo, etc.
- Sistema de matching por keywords

## Contact & Support

- **Proyecto:** Innovate Solutions Landing Page
- **Email:** albertotplaza@gmail.com
- **Teléfono:** +34 621 208 980
- **Ubicación:** Castellón - Onda, España
- **Horario:** Lunes - Domingo, 10:30 - 23:00 (CET/CEST)
