// server.js - Backend API para chat con OpenAI
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import OpenAI from 'openai';

const app = express();
const PORT = process.env.PORT || 3001;

// Configurar OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key'
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
    'https://n8n.lockthard.es',
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

    // Preparar mensajes para OpenAI
    const messages = [
      {
        role: 'system',
        content: 'Eres un asistente útil y amigable de Lockthard. Responde de forma concisa y profesional.'
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

    // Preparar mensajes para OpenAI con contexto de desarrollo
    const messages = [
      {
        role: 'system',
        content: 'Eres un asistente experto en desarrollo de software. Ayudas con código, arquitectura, debugging, mejores prácticas y soluciones técnicas. Responde de forma concisa, técnica y profesional. Proporciona ejemplos de código cuando sea apropiado.'
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

// Endpoint para chat con NVIDIA API
const nvidiaOpenai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

app.post('/api/chat/nvidia', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const completion = await nvidiaOpenai.chat.completions.create({
      model: "z-ai/glm5",
      messages: messages,
      temperature: 1,
      top_p: 1,
      max_tokens: 16384,
      chat_template_kwargs: { "enable_thinking": true, "clear_thinking": false },
      stream: true
    });

    for await (const chunk of completion) {
      const reasoning = chunk.choices[0]?.delta?.reasoning_content;
      const content = chunk.choices[0]?.delta?.content || '';

      if (reasoning || content) {
        const payload = {
          reasoning: reasoning || '',
          content: content || ''
        };
        res.write(`data: ${JSON.stringify(payload)}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('Error en /api/chat/nvidia:', error.message);
    res.write(`data: ${JSON.stringify({ error: 'Error al procesar tu mensaje', details: error.message })}\n\n`);
    res.end();
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