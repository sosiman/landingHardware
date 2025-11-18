// server.js - Backend API para chat con OpenAI
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import OpenAI from 'openai';

const app = express();
const PORT = process.env.PORT || 3001;

// Configurar OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Logs de configuración al iniciar
console.log('='.repeat(60));
console.log('🚀 Configuración de OpenAI API');
console.log('='.repeat(60));
console.log('✓ API Key configurada:', process.env.OPENAI_API_KEY ? `${process.env.OPENAI_API_KEY.slice(0, 10)}...` : '❌ NO CONFIGURADA');
console.log('✓ Modelo General (OPENAI_MODEL):', process.env.OPENAI_MODEL || 'gpt-4o (default)');
console.log('✓ Modelo Codex (CODEX_MODEL):', process.env.CODEX_MODEL || 'gpt-4o (default)');
console.log('✓ Modelo de Imágenes (OPENAI_IMAGE_MODEL):', process.env.OPENAI_IMAGE_MODEL || 'dall-e-3 (default)');
console.log('='.repeat(60));

// Middleware
app.use(express.json());

// CORS - permite peticiones desde tu dominio
app.use(cors({
  origin: [
    'https://lockthard.es',
    'https://www.lockthard.es',
    'http://localhost:5173', // Para desarrollo local
    'http://localhost:3000'
  ],
  credentials: true
}));

// Rate limiting - máximo 20 peticiones por minuto
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 20,
  message: { error: 'Demasiadas peticiones, intenta de nuevo en un minuto' }
});

app.use('/api/', limiter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Endpoint de diagnóstico para verificar configuración
app.get('/api/config', (req, res) => {
  res.json({
    status: 'ok',
    openai: {
      apiKeyConfigured: !!process.env.OPENAI_API_KEY,
      apiKeyPrefix: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.slice(0, 10) + '...' : 'NOT_SET',
      models: {
        general: process.env.OPENAI_MODEL || 'gpt-4o (default)',
        codex: process.env.CODEX_MODEL || 'gpt-4o (default)',
        image: process.env.OPENAI_IMAGE_MODEL || 'dall-e-3 (default)'
      }
    },
    server: {
      port: PORT,
      nodeEnv: process.env.NODE_ENV || 'development'
    },
    timestamp: new Date().toISOString()
  });
});

// Endpoint principal del chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    // Validación
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'El mensaje es requerido y debe ser un string'
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        error: 'El mensaje es demasiado largo (máximo 2000 caracteres)'
      });
    }

    // Preparar mensajes para OpenAI con conocimiento completo del proyecto
    const systemPrompt = `Eres un asistente experto de Innovate Solutions (Lockthard). Tienes conocimiento COMPLETO de este proyecto y puedes explicar en detalle cualquier aspecto.

## INFORMACIÓN DEL PROYECTO

**Nombre:** Landing Hardware - Innovate Solutions
**Dominio:** lockthard.es
**Propósito:** Herramienta para probar hardware potente mediante efectos visuales espectaculares y interfaces de chat con IA

## ARQUITECTURA TECNOLÓGICA

**Frontend:**
- React 18 + Vite 5.2 (puerto 3000, ES Modules)
- Tailwind CSS 3.4 + Framer Motion 11 para animaciones
- Three.js + React Three Fiber para gráficos 3D
- 23 efectos visuales avanzados (Canvas, WebGL)

**Backend:**
- Express 4.19 + Node.js (puerto 3001)
- OpenAI API: GPT-4o, GPT-5.1-codex, DALL-E 3
- Rate limiting: 20 req/min, CORS configurado
- URL API: https://api.lockthard.es

**Estructura:**
- src/components/ → Componentes React (Navigation, Hero, Services, Gallery, Contact)
- src/components/efectos/ → 23 efectos visuales (Galaxy, Hyperspeed, CodeMatrix, NeuralNetwork, etc.)
- backend/server.js → API REST completa
- Dockerfile → Deploy con Nginx

## SISTEMA DE CHATS (5 implementaciones)

1. **ChatBot.jsx** - Chat local sin IA, respuestas predefinidas por keywords
2. **CodexChat.jsx** - Chat desarrollo IA (GPT-4o/Codex), especializado en código
3. **OpenAIChat.jsx** - Chat consultoría tecnológica (GPT-4o)
4. **OpenAIImageChat.jsx** - Generación imágenes (DALL-E 3)
5. **N8nChatEmbed.jsx** - Integración n8n workflows (webhook)

## ENDPOINTS API BACKEND

- GET /health → Health check
- GET /api/config → Verificar configuración
- POST /api/chat → Chat general consultoría (este endpoint)
- POST /api/chat/codex → Chat desarrollo software especializado
- POST /api/generate-image → Generación imágenes DALL-E 3

## EFECTOS VISUALES CLAVE

- **Galaxy** (Services/Gallery) - Estrellas interactivas con mouse
- **Hyperspeed** (App.jsx) - Splash screen de velocidad púrpura
- **CodeMatrix** (CodexChat) - Código cayendo tipo Matrix
- **NeuralNetwork** (OpenAIChat) - Red neuronal animada
- **DataFlow** (OpenAIImageChat) - Flujo de datos
- **Orb** (Hero) - Esfera flotante (OrbBot)
- **MetallicText** (Navigation) - Logo con efecto cromo
- Y 16 efectos más disponibles

## FUNCIONALIDAD PRINCIPAL

Esta web está diseñada para **probar hardware potente** mediante:
- Renderizado 3D en tiempo real (Three.js)
- Miles de partículas interactivas
- Animaciones complejas simultáneas
- Post-procesamiento visual
- Detección mouse en tiempo real

## TABLETAS INTERACTIVAS

Interfaces protegidas con contraseña para demostraciones públicas:
- Fullscreen para kioscos/tablets
- Múltiples chats especializados
- Generación imágenes
- Chat desarrollo con Codex

## AUTOMATIZACIÓN

- N8nChatEmbed para workflows personalizados
- Integración OpenAI automática
- Webhooks desde chat

## CONTACTO

- Email: albertotplaza@gmail.com
- Teléfono: +34 621 208 980
- Ubicación: Castellón - Onda, España
- Horario: Lunes - Domingo, 10:30 - 23:00 CET/CEST

Puedes explicar en detalle cómo funciona cada componente, cómo están conectados, la arquitectura completa, las tecnologías usadas, y cualquier aspecto del proyecto. Responde de forma concisa pero completa.`;

    const messages = [
      {
        role: 'system',
        content: systemPrompt
      },
      ...conversationHistory.slice(-10), // Solo últimos 10 mensajes
      {
        role: 'user',
        content: message
      }
    ];

    // Llamar a OpenAI
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o',
      messages: messages,
      max_tokens: 500,
      temperature: 0.7
    });

    const reply = completion.choices[0].message.content;

    res.json({
      reply,
      usage: {
        prompt_tokens: completion.usage.prompt_tokens,
        completion_tokens: completion.usage.completion_tokens,
        total_tokens: completion.usage.total_tokens
      }
    });

  } catch (error) {
    console.error('Error en /api/chat:', error.message);

    if (error.code === 'insufficient_quota') {
      return res.status(402).json({
        error: 'Sin créditos de OpenAI disponibles'
      });
    }

    res.status(500).json({
      error: 'Error al procesar tu mensaje. Intenta de nuevo.'
    });
  }
});

// Endpoint específico para chat con Codex
app.post('/api/chat/codex', async (req, res) => {
  console.log('📨 Nueva petición a /api/chat/codex');
  console.log('🔧 Modelo configurado:', process.env.CODEX_MODEL || 'gpt-4o (default)');

  try {
    const { message, conversationHistory = [] } = req.body;

    // Validación
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'El mensaje es requerido y debe ser un string'
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        error: 'El mensaje es demasiado largo (máximo 2000 caracteres)'
      });
    }

    // Preparar mensajes para OpenAI con contexto de desarrollo Y conocimiento completo del proyecto
    const systemPromptCodex = `Eres un asistente experto en desarrollo de software con conocimiento COMPLETO del proyecto Landing Hardware - Innovate Solutions.

## TU ESPECIALIDAD

Ayudas con código, arquitectura, debugging, mejores prácticas y soluciones técnicas. Proporciona ejemplos de código cuando sea apropiado.

## CONOCIMIENTO COMPLETO DEL PROYECTO

### STACK TECNOLÓGICO

**Frontend (React 18 + Vite 5.2):**
- Componentes: src/components/ (Navigation, Hero, Services, Gallery, Contact, Testimonials)
- 5 Chats: ChatBot.jsx, CodexChat.jsx, OpenAIChat.jsx, OpenAIImageChat.jsx, N8nChatEmbed.jsx
- 23 Efectos visuales: src/components/efectos/ (Galaxy, Hyperspeed, CodeMatrix, NeuralNetwork, DataFlow, Orb, MetallicText, etc.)
- Animaciones: Framer Motion 11, Tailwind CSS 3.4
- 3D: Three.js + React Three Fiber + @react-three/drei
- Entry point: src/main.jsx → src/App.jsx

**Backend (Express 4.19 + Node.js):**
- API REST: backend/server.js (puerto 3001)
- OpenAI API: GPT-4o, GPT-5.1-codex, DALL-E 3
- Seguridad: CORS, Rate limiting 20 req/min
- Endpoints: /health, /api/config, /api/chat, /api/chat/codex, /api/generate-image

**Configuración:**
- vite.config.js → puerto 3000, plugins React
- tailwind.config.js → colores (blue/cyan/purple/pink), animaciones custom
- package.json → type: "module" (ES Modules)
- Dockerfile → Build: Node 18-alpine, Production: Nginx:alpine

### ARQUITECTURA COMPONENTES

**App.jsx (Raíz):**
- Parallax scroll implementation
- Splash screen (Hyperspeed) al llegar a Services
- Sección unificada Services + Gallery con Galaxy compartido
- Background blur animado púrpura

**ChatBot.jsx:**
- Chat local sin IA, base conocimiento object 'knowledge'
- Categorías: servicios, contacto, desarrollo, ia, seguridad, precios
- Glassmorphism UI, bottom-right fixed

**CodexChat.jsx (ESTE CHAT):**
- Endpoint: POST /api/chat/codex
- Modelo: GPT-4o / GPT-5.1-codex
- Características: Markdown + bloques código copiables, fondo CodeMatrix
- Config: temp 0.5, max_tokens 1000

**OpenAIChat.jsx:**
- Endpoint: POST /api/chat
- Modelo: GPT-4o general
- Fondo: NeuralNetwork, colores púrpura/rosa
- Config: temp 0.7, max_tokens 800

**OpenAIImageChat.jsx:**
- Endpoint: POST /api/generate-image
- Modelo: DALL-E 3, size 1024x1024
- Muestra imagen + revised_prompt en chat
- Fondo: DataFlow animado

**N8nChatEmbed.jsx:**
- Webhook: https://n8n.lockthard.es/webhook/...
- Asistente: "Sonar-Pro"
- Fullscreen mode, multiidioma

### EFECTOS VISUALES (23 total)

**Principales usados:**
- Galaxy → Services.jsx, Gallery.jsx (estrellas interactivas)
- Hyperspeed → App.jsx (splash screen velocidad)
- CodeMatrix → CodexChat.jsx (código cayendo)
- NeuralNetwork → OpenAIChat.jsx (red neuronal)
- DataFlow → OpenAIImageChat.jsx (flujo datos)
- Orb → Hero.jsx (OrbBot esfera flotante)
- MetallicText → Navigation.jsx (logo cromo)

**Otros disponibles:**
AnimatedMesh, CircuitBoard, ElectricalBorder, EnergyFlow, GeometricMorph, Iridescence, KnowledgeOrbs, Lightning, ParticleSwarm, ParticleWave, PlasmaSphere, SectionTransition, ShieldField, SplashCursor, VariableProximity, WaveField

### FLUJOS CLAVE

**Carga página:**
1. index.html → Vite bundle → main.jsx → App.jsx
2. Efectos se inicializan (Galaxy, etc.)
3. Parallax listener activo
4. Animaciones Framer Motion secuenciales

**Chat IA (CodexChat - este flujo):**
1. Usuario escribe mensaje (max 2000 chars)
2. POST /api/chat/codex {message, conversationHistory}
3. Backend → OpenAI con system prompt + historial (últimos 10)
4. GPT-4o responde (max 1000 tokens)
5. Frontend parsea markdown → detecta \`\`\`código\`\`\`
6. Renderiza con botones "Copiar Código"

**Generación imagen:**
1. POST /api/generate-image {prompt}
2. DALL-E 3 genera (20-60s)
3. Devuelve {imageUrl, revisedPrompt}
4. Muestra en chat

### OPTIMIZACIONES

- Vite: tree-shaking, bundle splitting, minificación
- Animaciones: GPU-accelerated (transform), RequestAnimationFrame
- Canvas: offscreen, throttling eventos mouse/scroll
- Backend: rate limiting, validación entrada, historial limitado

### PROPÓSITO WEB

**Probar hardware potente mediante:**
- 23 efectos visuales simultáneos (Canvas/WebGL)
- Modelos 3D Three.js
- Miles de partículas interactivas
- Animaciones Framer Motion complejas
- Parallax multi-capa
- FPS objetivo: 60fps constantes

### TABLETAS INTERACTIVAS

Interfaces protegidas con contraseña para demos públicas:
- Fullscreen para kioscos/tablets
- Acceso a todos los chats especializados
- Rate limiting para prevenir abuso

### CONTACTO

- Empresa: Innovate Solutions
- Email: albertotplaza@gmail.com
- Teléfono: +34 621 208 980
- Ubicación: Castellón - Onda, España
- Horario: Lunes - Domingo, 10:30 - 23:00 CET/CEST
- Dominios: lockthard.es, api.lockthard.es, n8n.lockthard.es

### DOCUMENTACIÓN

Archivos disponibles: PROJECT_KNOWLEDGE.json, DOCUMENTACION_COMPLETA.md, README.md, COMANDOS.md

---

Puedes explicar en detalle cualquier aspecto técnico del proyecto: arquitectura, componentes, flujos, integraciones, código específico, optimizaciones, etc. Proporciona ejemplos de código relevantes y referencias exactas a archivos cuando sea apropiado.`;

    const messages = [
      {
        role: 'system',
        content: systemPromptCodex
      },
      ...conversationHistory.slice(-10), // Solo últimos 10 mensajes
      {
        role: 'user',
        content: message
      }
    ];

    // Llamar a OpenAI con GPT-4o
    const modelToUse = process.env.CODEX_MODEL || 'gpt-4o';
    console.log('🤖 Llamando a OpenAI con modelo:', modelToUse);

    const completion = await openai.chat.completions.create({
      model: modelToUse,
      messages: messages,
      max_tokens: 1000,
      temperature: 0.5
    });

    console.log('✅ Respuesta recibida exitosamente de OpenAI');

    const reply = completion.choices[0].message.content;

    res.json({
      reply,
      usage: {
        prompt_tokens: completion.usage.prompt_tokens,
        completion_tokens: completion.usage.completion_tokens,
        total_tokens: completion.usage.total_tokens
      }
    });

  } catch (error) {
    console.error('❌ Error en /api/chat/codex:');
    console.error('━'.repeat(60));
    console.error('Mensaje:', error.message);
    console.error('Código:', error.code);
    console.error('Status:', error.status);
    console.error('Tipo:', error.type);
    console.error('Modelo intentado:', process.env.CODEX_MODEL || 'gpt-4o');
    console.error('Error completo:', JSON.stringify(error, null, 2));
    console.error('━'.repeat(60));

    // Error de modelo no encontrado
    if (error.code === 'model_not_found' || error.status === 404) {
      return res.status(404).json({
        error: 'Modelo no disponible',
        details: `El modelo "${process.env.CODEX_MODEL || 'gpt-4o'}" no está disponible en tu cuenta de OpenAI. Verifica tu suscripción o usa un modelo diferente.`,
        model: process.env.CODEX_MODEL || 'gpt-4o'
      });
    }

    // Error de cuota insuficiente
    if (error.code === 'insufficient_quota') {
      return res.status(402).json({
        error: 'Sin créditos de OpenAI disponibles',
        details: 'Tu cuenta de OpenAI no tiene créditos suficientes'
      });
    }

    // Error de permisos
    if (error.status === 401 || error.code === 'invalid_api_key') {
      return res.status(401).json({
        error: 'API Key inválida',
        details: 'La API Key de OpenAI no es válida o ha expirado'
      });
    }

    // Error de rate limit
    if (error.code === 'rate_limit_exceeded' || error.status === 429) {
      return res.status(429).json({
        error: 'Límite de solicitudes excedido',
        details: 'Has excedido el límite de solicitudes. Intenta de nuevo en unos momentos.'
      });
    }

    // Error genérico
    res.status(500).json({
      error: 'Error al procesar tu mensaje',
      details: error.message || 'Error desconocido. Revisa los logs del servidor.',
      model: process.env.CODEX_MODEL || 'gpt-4o'
    });
  }
});

// Endpoint para generar imágenes con DALL-E 3
app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validación
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({
        error: 'El prompt es requerido y debe ser un string'
      });
    }

    if (prompt.length > 4000) {
      return res.status(400).json({
        error: 'El prompt es demasiado largo (máximo 4000 caracteres)'
      });
    }

    // Llamar a DALL-E 3
    const imageModel = process.env.OPENAI_IMAGE_MODEL || 'dall-e-3';
    const response = await openai.images.generate({
      model: imageModel,
      prompt: prompt,
      n: 1,
      size: '1024x1024',
      quality: 'standard',
      response_format: 'url'
    });

    const imageUrl = response.data[0].url;
    const revisedPrompt = response.data[0].revised_prompt;

    res.json({
      imageUrl,
      revisedPrompt,
      model: imageModel
    });

  } catch (error) {
    console.error('Error en /api/generate-image:', error.message);

    if (error.code === 'insufficient_quota') {
      return res.status(402).json({
        error: 'Sin créditos de OpenAI disponibles'
      });
    }

    if (error.code === 'content_policy_violation') {
      return res.status(400).json({
        error: 'El contenido del prompt viola las políticas de OpenAI'
      });
    }

    res.status(500).json({
      error: 'Error al generar la imagen. Intenta de nuevo.'
    });
  }
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend API corriendo en puerto ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
});