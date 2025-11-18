# 🔧 Guía de Troubleshooting - Chat de Desarrollo

## Problema: El chat de desarrollo no conecta con el modelo GPT-5.1-Codex

### Diagnóstico Rápido

#### 1. Verificar Configuración del Servidor

Accede al endpoint de diagnóstico:
```bash
curl https://api.lockthard.es/api/config
```

Esto te mostrará:
- ✅ Si la API Key está configurada
- ✅ Qué modelos están configurados
- ✅ Estado del servidor

**Ejemplo de respuesta correcta:**
```json
{
  "status": "ok",
  "openai": {
    "apiKeyConfigured": true,
    "apiKeyPrefix": "sk-proj-ab...",
    "models": {
      "general": "gpt-4o",
      "codex": "gpt-5.1-codex",
      "image": "dall-e-3"
    }
  }
}
```

#### 2. Revisar Logs del Servidor

Cuando el servidor inicia, debe mostrar:
```
============================================================
🚀 Configuración de OpenAI API
============================================================
✓ API Key configurada: sk-proj-xx...
✓ Modelo General (OPENAI_MODEL): gpt-4o
✓ Modelo Codex (CODEX_MODEL): gpt-5.1-codex
✓ Modelo de Imágenes (OPENAI_IMAGE_MODEL): dall-e-3
============================================================
🚀 Backend API corriendo en puerto 3001
📍 Health check: http://localhost:3001/health
```

Cuando se hace una petición al chat:
```
📨 Nueva petición a /api/chat/codex
🔧 Modelo configurado: gpt-5.1-codex
🤖 Llamando a OpenAI con modelo: gpt-5.1-codex
✅ Respuesta recibida exitosamente de OpenAI
```

Si hay un error:
```
❌ Error en /api/chat/codex:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Mensaje: The model `gpt-5.1` does not exist
Código: model_not_found
Status: 404
Tipo: invalid_request_error
Modelo intentado: gpt-5.1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Errores Comunes y Soluciones

#### ❌ Error: "Modelo no disponible"

**Causa:** El modelo configurado no existe o tu cuenta no tiene acceso.

**Solución:**
1. Verifica que `CODEX_MODEL` esté configurado correctamente en Dokploy
2. Modelos válidos para desarrollo:
   - `gpt-5.1-codex` ✅ (recomendado para código)
   - `gpt-5.1` ✅ (general)
   - `gpt-5.1-codex-mini` ✅ (ligero)
   - `gpt-4o` ✅ (alternativa general)
3. Verifica tu plan de OpenAI incluye estos modelos

#### ❌ Error: "Sin créditos de OpenAI disponibles"

**Causa:** Tu cuenta de OpenAI no tiene saldo.

**Solución:**
1. Ve a https://platform.openai.com/account/billing
2. Agrega créditos a tu cuenta
3. Verifica límites de uso mensual

#### ❌ Error: "API Key inválida"

**Causa:** La API Key no es válida o ha expirado.

**Solución:**
1. Verifica en Dokploy que `OPENAI_API_KEY` esté correctamente configurada
2. Genera una nueva API Key en https://platform.openai.com/api-keys
3. Actualiza la variable en Dokploy
4. Reinicia el contenedor

#### ❌ Error: "Límite de solicitudes excedido"

**Causa:** Has excedido el rate limit de tu plan.

**Solución:**
1. Espera unos minutos antes de intentar de nuevo
2. Considera actualizar tu plan de OpenAI
3. El backend ya limita a 20 peticiones por minuto

### Configuración en Dokploy

Para actualizar las variables de entorno en Dokploy:

1. **Accede a tu aplicación** en Dokploy
2. **Ve a Settings → Environment Variables**
3. **Configura las siguientes variables:**

```bash
# Obligatoria
OPENAI_API_KEY=sk-proj-tu-api-key-aqui

# Modelo para chat de desarrollo (elige uno):
CODEX_MODEL=gpt-5.1-codex     # Recomendado
# CODEX_MODEL=gpt-5.1          # Alternativa general
# CODEX_MODEL=gpt-5.1-codex-mini  # Versión ligera

# Opcional (valores por defecto)
OPENAI_MODEL=gpt-4o
OPENAI_IMAGE_MODEL=dall-e-3
PORT=3001
NODE_ENV=production
```

4. **Guarda los cambios**
5. **Reinicia la aplicación** para que tome las nuevas variables

### Verificar que las Variables se Cargaron

Después de reiniciar el contenedor en Dokploy:

1. **Revisa los logs del contenedor** en Dokploy
2. Busca el bloque de configuración al inicio
3. Verifica que muestre los valores correctos

### Probar la Conexión Manualmente

```bash
# 1. Verificar que el servidor responde
curl https://api.lockthard.es/health

# 2. Ver la configuración actual
curl https://api.lockthard.es/api/config

# 3. Probar el endpoint de codex (desde el navegador o Postman)
POST https://api.lockthard.es/api/chat/codex
Content-Type: application/json

{
  "message": "Hola, ¿puedes ayudarme con JavaScript?",
  "conversationHistory": []
}
```

### Acceso a Modelos GPT-5.1

Para usar los modelos GPT-5.1:

1. **Verifica tu plan de OpenAI:**
   - Los modelos GPT-5.1 están disponibles en ciertos planes
   - Ve a https://platform.openai.com/account/limits

2. **Alternativas si no tienes acceso:**
   - Usa `gpt-4o` (muy capaz para código)
   - Usa `gpt-4-turbo`
   - Solicita acceso a GPT-5 en tu dashboard de OpenAI

### Frontend: Ver Errores en la Consola

1. Abre las **DevTools del navegador** (F12)
2. Ve a la pestaña **Console**
3. Abre el chat de desarrollo
4. Envía un mensaje
5. Busca logs que empiecen con `❌ Error del servidor:`

Verás información detallada como:
```javascript
❌ Error del servidor: {
  status: 404,
  statusText: "Not Found",
  errorData: {
    error: "Modelo no disponible",
    details: "El modelo 'gpt-5.1' no está disponible...",
    model: "gpt-5.1"
  }
}
```

### Contacto y Soporte

Si después de seguir todos estos pasos el problema persiste:

1. **Documenta:**
   - Logs del servidor de Dokploy
   - Errores en la consola del navegador
   - Configuración de variables de entorno (sin exponer API keys)

2. **Verifica:**
   - Estado de OpenAI: https://status.openai.com/
   - Límites de tu cuenta: https://platform.openai.com/account/limits

3. **Revisa la documentación oficial:**
   - https://platform.openai.com/docs/models
   - https://platform.openai.com/docs/api-reference

---

## Checklist de Verificación Rápida

- [ ] Variable `OPENAI_API_KEY` configurada en Dokploy
- [ ] Variable `CODEX_MODEL` configurada con valor válido
- [ ] Contenedor reiniciado después de cambios
- [ ] Logs muestran configuración correcta al iniciar
- [ ] Endpoint `/api/config` muestra valores correctos
- [ ] Cuenta de OpenAI tiene créditos disponibles
- [ ] Plan de OpenAI incluye los modelos configurados
- [ ] Sin errores de CORS en la consola del navegador
- [ ] Backend responde en `https://api.lockthard.es/health`

---

**Última actualización:** 2025-11-18
