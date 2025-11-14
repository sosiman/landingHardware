# Dockerfile para el backend
FROM node:18-alpine

WORKDIR /app

# Copiar package.json
COPY package.json ./

# Instalar dependencias
RUN npm install --omit=dev

# Copiar código
COPY server.js ./

# Exponer puerto
EXPOSE 3001

# Iniciar servidor
CMD ["node", "server.js"]