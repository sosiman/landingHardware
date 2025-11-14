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