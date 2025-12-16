# Backend API - Abacus LLM Router

API backend para conectar tu frontend con Abacus AI usando FastAPI.

## 🚀 Configuración Local

1. Instalar dependencias:
```bash
cd backend
pip install -r requirements.txt
```

2. Crear archivo `.env`:
```bash
cp .env.example .env
```

3. Editar `.env` y agregar tu API key:
```
ABACUS_API_KEY=tu_api_key_de_abacus
```

4. Ejecutar servidor:
```bash
python main.py
```

El servidor estará en: `http://localhost:8000`

## 📡 Endpoints

### GET `/`
Health check del servidor

### POST `/api/chat`
Enviar mensaje al LLM

**Request:**
```json
{
  "message": "Hola, ¿cómo estás?",
  "model": "router-nitro-gpt-4o"
}
```

**Response:**
```json
{
  "response": "¡Hola! Estoy bien, gracias...",
  "model_used": "gpt-4o"
}
```

### POST `/api/chat/stream`
Chat con streaming de respuesta

## 🐳 Deploy en Dokploy

1. **Crear nuevo servicio en Dokploy:**
   - Tipo: Docker
   - Repositorio: tu repo de GitHub
   - Dockerfile path: `backend/Dockerfile`
   - Context path: `backend`

2. **Configurar variables de entorno en Dokploy:**
   ```
   ABACUS_API_KEY=tu_api_key_real
   ```

3. **Puerto:** 8000

4. **Deploy!**

Tu API estará en: `https://tu-backend.dokploy.com`

## 🔗 Conectar con Frontend

En tu frontend React, hacer fetch a:

```javascript
const response = await fetch('https://tu-backend.dokploy.com/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: 'Hola',
    model: 'router-nitro-gpt-4o'
  })
});

const data = await response.json();
console.log(data.response);
```

## 🔒 Seguridad

- ✅ API key nunca se expone en el frontend
- ✅ `.env` está en `.gitignore`
- ✅ CORS configurado para aceptar requests
- ✅ Variables de entorno en Dokploy (no en código)

## 📝 Modelos Disponibles

- `router-nitro-gpt-4o` - Router inteligente (recomendado)
- `gpt-4o` - GPT-4 Optimized
- `claude-3-5-sonnet-20241022` - Claude 3.5 Sonnet
- Y más según tu plan de Abacus
