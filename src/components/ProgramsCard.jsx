import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Copy, Check, Terminal } from 'lucide-react';

const ProgramsCard = () => {
  const [openProgram, setOpenProgram] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [openSubCommand, setOpenSubCommand] = useState(null);

  const toggleProgram = (index) => {
    setOpenProgram(openProgram === index ? null : index);
  };

  const toggleSubCommand = (key) => {
    setOpenSubCommand(openSubCommand === key ? null : key);
  };

  const handleCopy = async (command, index) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const programs = [
    {
      name: 'Slides.dev',
      description: 'Crea presentaciones profesionales con Markdown y Vue. Exporta a PDF o web HTML lista para hosting.',
      command: 'pnpm create slidev',
      commandType: 'Terminal',
      icon: '📊',
      color: 'from-pink-400 to-rose-500',
      subCommands: [
        {
          title: '1️⃣ Instalar Node.js',
          info: 'Primero necesitas tener Node.js instalado',
          commands: [
            { label: 'Descargar Node.js', cmd: 'https://nodejs.org/en/download', type: 'web' },
            { label: 'Verificar versión', cmd: 'node -v', type: 'bash' },
          ]
        },
        {
          title: '2️⃣ Instalar pnpm',
          info: 'Gestor de paquetes necesario para Slidev',
          commands: [
            { label: 'Instalar pnpm globalmente', cmd: 'npm install -g pnpm', type: 'bash' },
          ]
        },
        {
          title: '3️⃣ Crear proyecto Slidev',
          info: 'En la carpeta Documents:',
          commands: [
            { label: 'Ir a Documents', cmd: 'cd Documents', type: 'bash' },
            { label: 'Crear proyecto', cmd: 'pnpm create slidev', type: 'bash' },
            { label: 'Nombre sugerido', cmd: 'SLIDEV', type: 'config' },
          ]
        },
        {
          title: '4️⃣ Instalar dependencias',
          info: 'Una por una dentro del proyecto:',
          commands: [
            { label: 'Ir a la carpeta', cmd: 'cd Documents/SLIDEV', type: 'bash' },
            { label: 'Instalar Playwright', cmd: 'pnpm add -D playwright-chromium', type: 'bash' },
            { label: 'Instalar Iconify', cmd: 'pnpm add @iconify/vue', type: 'bash' },
            { label: 'Configurar Playwright', cmd: 'pnpm exec playwright install', type: 'bash' },
          ]
        },
        {
          title: '5️⃣ Iniciar servidor',
          info: 'Modo desarrollo:',
          commands: [
            { label: 'Iniciar dev server', cmd: 'pnpm run dev', type: 'bash' },
            { label: 'Abrir en navegador', cmd: 'http://localhost:3030', type: 'web' },
          ]
        },
        {
          title: '6️⃣ Exportar presentación',
          commands: [
            {
              label: 'Exportar a PDF',
              cmd: '',
              type: 'bash',
              subCommands: [
                { label: 'PDF básico', cmd: 'pnpm exec slidev export', type: 'bash' },
                { label: 'PDF avanzado (márgenes/tamaño)', cmd: 'npx slidev export --format pdf --per-slide', type: 'bash' },
                { label: 'Exportar desde navegador', cmd: 'http://localhost:3030/export', type: 'web' },
              ]
            },
            {
              label: 'Build para web (hosting)',
              cmd: '',
              type: 'bash',
              subCommands: [
                { label: 'Generar carpeta /dist', cmd: 'pnpm run build', type: 'bash' },
                { label: 'Código iframe para incrustar', cmd: '<div style="width: 100%; max-width: 800px; height: 500px; border: 15px solid #333; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 20px rgba(0,0,0,0.2);">\n    <iframe src="RUTA_DE_TU_CARPETA_DIST/index.html" width="100%" height="100%" style="border: none;"></iframe>\n</div>', type: 'html' },
              ]
            },
          ]
        },
      ],
    },
    {
      name: 'Dokploy',
      description: 'Plataforma open-source para desplegar aplicaciones full-stack con Docker. Alternativa gratuita a Heroku/Vercel/Netlify para hosting propio en tu servidor Ubuntu.',
      command: 'curl -sSL https://dokploy.com/install.sh | sh',
      commandType: 'Bash (Ubuntu/Linux)',
      icon: '🚀',
      color: 'from-cyan-400 to-blue-500',
      subCommands: [
        {
          title: '1️⃣ Instalar Dokploy (Todo en uno)',
          info: 'Este comando instala Docker, Swarm y Dokploy automáticamente',
          commands: [
            { label: 'Instalación completa', cmd: 'curl -sSL https://dokploy.com/install.sh | sh', type: 'bash' },
            { label: 'Acceder al panel', cmd: 'http://TU-IP-SERVIDOR:3000', type: 'web' },
          ]
        },
        {
          title: '2️⃣ Configurar DNS (GoDaddy/Cloudflare)',
          info: 'Agrega registros tipo A apuntando a tu IP:',
          commands: [
            { label: '@ (raíz)', cmd: '@ → A → TU-IP → TTL 600', type: 'dns' },
            { label: 'www', cmd: 'www → A → TU-IP → TTL 600', type: 'dns' },
            { label: 'api', cmd: 'api → A → TU-IP → TTL 600', type: 'dns' },
          ]
        },
        {
          title: '3️⃣ Crear proyecto Frontend',
          info: 'En Dokploy: Create Project → Application → GitHub',
          commands: [
            { label: 'Build Args', cmd: 'VITE_API_URL=https://api.tudominio.com', type: 'env' },
            { label: 'Dominio', cmd: 'tudominio.com (puerto 80, HTTPS ✅)', type: 'config' },
          ]
        },
        {
          title: '4️⃣ Crear proyecto Backend',
          info: 'Create Project → Application → GitHub',
          commands: [
            { label: 'Variables', cmd: 'OPENAI_API_KEY=sk-xxx\nPORT=3001\nNODE_ENV=production', type: 'env' },
            { label: 'Dominio', cmd: 'api.tudominio.com (puerto 3001, HTTPS ✅)', type: 'config' },
          ]
        },
        {
          title: '5️⃣ Fix Traefik (si el dominio no funciona)',
          commands: [
            { label: 'Ver servicios', cmd: 'docker service ls', type: 'bash' },
            {
              label: 'Agregar labels a servicio',
              cmd: '',
              type: 'bash',
              subCommands: [
                { label: 'Labels al servicio', cmd: 'docker service update --label-add "traefik.enable=true" --label-add \'traefik.http.routers.lockthard.rule=Host(`lockthard.es`) || Host(`www.lockthard.es`)\' --label-add "traefik.http.routers.lockthard.entrypoints=websecure" --label-add "traefik.http.routers.lockthard.tls.certresolver=letsencrypt" --label-add "traefik.http.services.lockthard.loadbalancer.server.port=80" --force lockthard-lockthard-gxvdqn', type: 'bash' },
              ]
            },
            {
              label: 'Agregar labels al frontend',
              cmd: '',
              type: 'bash',
              subCommands: [
                { label: 'Labels al frontend', cmd: 'docker service update --label-add "traefik.enable=true" --label-add \'traefik.http.routers.lockthard.rule=Host(`lockthard.es`) || Host(`www.lockthard.es`)\' --label-add "traefik.http.routers.lockthard.entrypoints=websecure" --label-add "traefik.http.routers.lockthard.tls.certresolver=letsencrypt" --label-add "traefik.http.services.lockthard.loadbalancer.server.port=80" --force lockthard-lockthard-gxvdqn', type: 'bash' },
              ]
            },
            { label: 'Reiniciar Traefik', cmd: 'docker restart dokploy-traefik', type: 'bash' },
            { label: 'Si está detenido', cmd: 'docker start dokploy-traefik', type: 'bash' },
          ]
        },
        {
          title: '6️⃣ Configurar subdominio Dokploy',
          info: 'Evita problemas de redirección agregando Dokploy como subdominio:',
          commands: [
            {
              label: 'Pasos completos de configuración',
              cmd: '',
              type: 'bash',
              subCommands: [
                { label: '1. Actualizar DNS en GoDaddy/Cloudflare', cmd: 'dokploy → A → TU-IP-SERVIDOR → TTL 600', type: 'dns' },
                { label: '2. Dokploy: Menú → Web Server → Cambiar dominio', cmd: 'Ejemplo: dokploy.tudominio.com', type: 'config' },
                { label: '3. Activar HTTPS en Web Server', cmd: 'Toggle HTTPS → Activado', type: 'config' },
                { label: '4. Editar archivo Traefik', cmd: 'Menú → Traefik → File System → Dynamic → TU_DOMINIO.yml', type: 'config' },
                { label: '5. Contenido del archivo YML', cmd: 'http:\n  routers:\n    # 1. Router para HTTPS (Seguro)\n    dokploy-router-websecure:\n      rule: Host(`dokploy.lockthard.es`)\n      service: dokploy-service-app\n      entryPoints:\n        - websecure\n      tls:\n        certResolver: letsencrypt\n\n    # 2. Router para HTTP (Redirección automática)\n    dokploy-router-web:\n      rule: Host(`dokploy.lockthard.es`)\n      service: dokploy-service-app\n      entryPoints:\n        - web\n      middlewares:\n        - redirect-to-https\n\n  middlewares:\n    redirect-to-https:\n      redirectScheme:\n        scheme: https\n        permanent: true\n\n  services:\n    dokploy-service-app:\n      loadBalancer:\n        servers:\n          - url: http://dokploy:3000\n        passHostHeader: true', type: 'yaml' },
                { label: '6. Guardar y refrescar certificado HTTPS', cmd: 'Web Server → Refresh HTTPS Certificate', type: 'config' },
              ]
            },
          ]
        },
        {
          title: '7️⃣ Restablecer conexiones DNS',
          info: 'Reiniciar contenedores cuando cambies DNS o haya problemas de conexión:',
          commands: [
            {
              label: 'Reiniciar servicios Dokploy',
              cmd: '',
              type: 'bash',
              subCommands: [
                { label: 'Listar contenedores activos', cmd: 'docker ps | grep dokploy', type: 'bash' },
                { label: 'Reiniciar contenedor Dokploy', cmd: 'docker restart 0bff9756783a', type: 'bash' },
                { label: 'Reiniciar Traefik (más importante)', cmd: 'docker restart 932022c17bd8', type: 'bash' },
              ]
            },
          ]
        },
        {
          title: '8️⃣ Actualizar proyecto',
          info: 'Después de hacer cambios en el código:',
          commands: [
            { label: 'Push a GitHub', cmd: 'git add . && git commit -m "mensaje" && git push', type: 'bash' },
            { label: 'Redeploy', cmd: 'En Dokploy → Proyecto → Deployments → Deploy', type: 'web' },
          ]
        },
      ],
    },
    {
      name: 'Anything Data-Base-Vectorial',
      description: 'Base de datos vectorial integrada con soporte avanzado para Agentes y MCP. Configuración optimizada para servidores con recursos limitados.',
      command: 'docker-compose up -d',
      commandType: 'Docker',
      icon: '🧠',
      color: 'from-orange-400 to-red-500',
      subCommands: [
        {
          title: '1️⃣ Explicación técnica (El "Por qué")',
          info: 'Entendiendo la configuración crítica:',
          commands: [
            {
              label: 'Ver detalles de configuración crítica',
              cmd: '',
              type: 'config',
              subCommands: [
                { label: 'cap_add: - SYS_ADMIN', cmd: 'CRÍTICO. La base de datos vectorial (LanceDB) necesita permisos de sistema para gestionar el bloqueo de archivos. Sin esto, la subida de datos falla.', type: 'config' },
                { label: 'LLM_PROVIDER=openai', cmd: 'Fuerza al contenedor a NO cargar modelos locales (Llama/Mistral) en RAM al inicio. Mantiene el consumo bajísimo (cientos de MB).', type: 'config' },
                { label: 'JWT_SECRET', cmd: 'La "llave maestra" para cookies. Si no se pone, se genera una nueva al reiniciar y te cierra la sesión constantemente.', type: 'config' },
                { label: 'mintplexlabs/anythingllm:master', cmd: 'Usamos la etiqueta master en lugar de latest a veces para asegurar que tengas las últimas correcciones de MCP y Agentes que salen casi a diario.', type: 'config' },
              ]
            }
          ]
        },
        {
          title: '2️⃣ Docker Compose',
          info: 'Copia y pega este contenido en tu docker-compose.yml:',
          commands: [
            {
              label: 'docker-compose.yml',
              cmd: `version: '3.8'

services:
  anythingllm:
    image: mintplexlabs/anythingllm:master
    container_name: anythingllm
    restart: always
    ports:
      - "3001:3001"
    cap_add:
      - SYS_ADMIN
    environment:
      # Directorio interno donde se guarda todo
      - STORAGE_DIR=/app/server/storage
      # CAMBIA ESTO por letras y numeros aleatorios (seguridad)
      - JWT_SECRET="escribe_aqui_una_frase_larga_y_secreta_para_seguridad_123"
      # Variables opcionales para evitar errores si no usas local
      - LLM_PROVIDER=openai 
      - VECTOR_DB=lancedb
    volumes:
      - anythingllm_data:/app/server/storage

volumes:
  anythingllm_data:`,
              type: 'yaml'
            },
          ]
        },
        {
          title: '3️⃣ Comandos SSH (Editar MCP)',
          info: 'Método seguro: Copiar fuera, editar y devolver al contenedor:',
          commands: [
            { label: '1. Copiar JSON a local (/home/sosi/)', cmd: 'docker cp anythingllm:/app/server/storage/plugins/anythingllm_mcp_servers.json ./', type: 'bash' },
            { label: '2. Editar archivo', cmd: 'nano anythingllm_mcp_servers.json', type: 'bash' },
            { label: '3. Devolver al contenedor', cmd: 'docker cp anythingllm_mcp_servers.json anythingllm:/app/server/storage/plugins/', type: 'bash' },
            { label: '4. Reiniciar AnythingLLM', cmd: 'docker restart anythingllm', type: 'bash' },
          ]
        }
      ],
    },
    {
      name: 'Nextcloud (Cloud Privada)',
      description: 'Nube privada open-source para almacenar tus archivos, fotos y documentos bajo tu control total. Alternativa a Google Drive/Dropbox.',
      command: 'docker-compose up -d',
      commandType: 'Docker',
      icon: '☁️',
      color: 'from-blue-400 to-indigo-500',
      subCommands: [
        {
          title: '1️⃣ Docker Compose (Stack)',
          info: 'Configuración para desplegar Nextcloud + Base de datos:',
          commands: [
            {
              label: 'docker-compose.yml',
              cmd: `version: '3'

services:
  db:
    image: mariadb:10.6
    restart: always
    command: --transaction-isolation=READ-COMMITTED --binlog-format=ROW
    volumes:
      - db_data_V2:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=Cracks.55
      - MYSQL_PASSWORD=Cracks.55
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud

  app:
    image: nextcloud
    restart: always
    ports:
      - 8080:80
    links:
      - db
    volumes:
      - nextcloud_data_V2:/var/www/html
    environment:
      - MYSQL_PASSWORD=Cracks.55
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
      - MYSQL_HOST=db
      - OVERWRITEHOST=cloud.lockthard.es
      - OVERWRITEPROTOCOL=https
      - OVERWRITECLIURL=https://cloud.lockthard.es
      - NEXTCLOUD_TRUSTED_DOMAINS=cloud.lockthard.es
      - PHP_MEMORY_LIMIT=512M

volumes:
  db_data_V2:
  nextcloud_data_V2:`,
              type: 'yaml'
            }
          ]
        },
        {
          title: '2️⃣ Variables de Entorno (Dokploy/Portainer)',
          info: 'Copia estas variables en la sección Environment:',
          commands: [
            { label: 'Dominios y Protocolo', cmd: 'NEXTCLOUD_TRUSTED_DOMAINS=cloud.lockthard.es\nOVERWRITEPROTOCOL=https', type: 'env' },
            { label: 'Explicación', cmd: 'Necesario para que Nextcloud sepa que está detrás de un Proxy HTTPS (Traefik) y no bloquee la conexión.', type: 'config' }
          ]
        }
      ]
    },
    {
      name: 'WinUtil',
      description: 'Controla todo tu sistema operativo y te lleva accesos directos de configuración, actualizaciones, ISOS, etc.',
      command: 'irm "https://christitus.com/win" | iex',
      commandType: 'PowerShell',
      icon: '🔧',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      name: 'OpenRGB',
      description: 'Controla las luces del ordenador inclusive la RAM',
      command: 'https://openrgb.org/',
      commandType: 'Web',
      icon: '💡',
      color: 'from-purple-400 to-pink-500',
    },
    {
      name: 'PatchMyPC',
      description: 'Install thousands of apps with a few clicks and let us discover, test and package updates for you. (deshabilita programas running)',
      command: 'https://patchmypc.com/',
      commandType: 'Web',
      icon: '🔄',
      color: 'from-green-400 to-emerald-500',
    },
    {
      name: 'Portkill',
      description: 'Herramienta para gestionar y liberar puertos en Windows. Te permite identificar qué aplicaciones están usando puertos específicos y terminarlas fácilmente para resolver conflictos de puertos.',
      command: 'https://apps.microsoft.com/detail/9NBLGGH5F32X?hl=neutral&gl=ES&ocid=pdpshare',
      commandType: 'Web',
      icon: '🔌',
      color: 'from-orange-400 to-red-500',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: false, margin: "-50px" }}
      className="relative col-span-1 h-full"
    >
      <div className="relative glass-dark p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group overflow-hidden h-full max-h-[600px] overflow-y-auto custom-scrollbar">
        {/* Efecto de brillo (fixed para que no se mueva) */}
        <div className="fixed inset-0 pointer-events-none rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl" />

        {/* Header */}
        <div className="relative z-10 mb-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">💻</span>
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              Programas
            </h3>
          </div>
          <p className="text-xs text-gray-400">
            {programs.length} programa{programs.length !== 1 ? 's' : ''} útil{programs.length !== 1 ? 'es' : ''} para tu sistema
          </p>
        </div>

        {/* Lista de programas */}
        <div className="relative z-10 space-y-2">
          {programs.map((program, index) => (
            <div key={index} className="border border-white/10 rounded-lg overflow-hidden bg-black/20">
              {/* Header del programa - Clickeable */}
              <button
                onClick={() => toggleProgram(index)}
                className="w-full px-3 py-2.5 flex items-center justify-between hover:bg-white/5 transition-all group/program"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{program.icon}</span>
                  <span className={`font-semibold text-sm bg-gradient-to-r ${program.color} bg-clip-text text-transparent`}>
                    {program.name}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: openProgram === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={16} className="text-gray-400" />
                </motion.div>
              </button>

              {/* Contenido desplegable */}
              <AnimatePresence>
                {openProgram === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 pb-3 pt-1 space-y-2 border-t border-white/5">
                      {/* Descripción */}
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {program.description}
                      </p>

                      {/* SubComandos (nuevo para Dokploy) */}
                      {program.subCommands ? (
                        <div className="space-y-3">
                          {program.subCommands.map((section, sectionIdx) => (
                            <div key={sectionIdx} className="space-y-2">
                              <div className="text-xs font-bold text-cyan-400">{section.title}</div>
                              {section.info && (
                                <p className="text-xs text-gray-500 italic">{section.info}</p>
                              )}
                              <div className="space-y-1.5">
                                {section.commands.map((subCmd, subIdx) => (
                                  <div key={subIdx} className="space-y-0.5">
                                    {/* Si tiene subComandos, hacerlo clickeable */}
                                    {subCmd.subCommands ? (
                                      <div className="border border-white/10 rounded-lg overflow-hidden bg-black/20">
                                        <button
                                          onClick={() => toggleSubCommand(`${index}-${sectionIdx}-${subIdx}`)}
                                          className="w-full px-2 py-1.5 flex items-center justify-between hover:bg-white/5 transition-all text-left"
                                        >
                                          <span className="text-xs text-gray-400">{subCmd.label}</span>
                                          <motion.div
                                            animate={{ rotate: openSubCommand === `${index}-${sectionIdx}-${subIdx}` ? 180 : 0 }}
                                            transition={{ duration: 0.2 }}
                                          >
                                            <ChevronDown size={14} className="text-gray-400" />
                                          </motion.div>
                                        </button>

                                        <AnimatePresence>
                                          {openSubCommand === `${index}-${sectionIdx}-${subIdx}` && (
                                            <motion.div
                                              initial={{ height: 0, opacity: 0 }}
                                              animate={{ height: "auto", opacity: 1 }}
                                              exit={{ height: 0, opacity: 0 }}
                                              transition={{ duration: 0.3 }}
                                              className="overflow-hidden"
                                            >
                                              <div className="px-2 pb-2 pt-1 space-y-1 border-t border-white/5">
                                                {subCmd.subCommands.map((nestedCmd, nestedIdx) => (
                                                  <div key={nestedIdx} className="space-y-0.5">
                                                    <div className="text-xs text-cyan-300">• {nestedCmd.label}:</div>
                                                    <div className="relative group/nested">
                                                      <div className="bg-black/40 border border-cyan-500/20 rounded p-1.5 pr-8 font-mono text-xs text-cyan-400 break-all hover:bg-black/50 transition-colors whitespace-pre-wrap">
                                                        {nestedCmd.cmd}
                                                        <button
                                                          onClick={() => handleCopy(nestedCmd.cmd, `${index}-${sectionIdx}-${subIdx}-${nestedIdx}`)}
                                                          className="absolute right-1.5 top-1.5 p-0.5 rounded bg-white/10 hover:bg-white/20 transition-all opacity-0 group-hover/nested:opacity-100"
                                                        >
                                                          {copiedIndex === `${index}-${sectionIdx}-${subIdx}-${nestedIdx}` ? (
                                                            <Check size={10} className="text-green-400" />
                                                          ) : (
                                                            <Copy size={10} className="text-white/60" />
                                                          )}
                                                        </button>
                                                      </div>
                                                    </div>
                                                  </div>
                                                ))}
                                              </div>
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    ) : (
                                      /* Comandos normales sin subComandos */
                                      <>
                                        <div className="text-xs text-gray-400">{subCmd.label}:</div>
                                        {subCmd.type === 'web' ? (
                                          <div className="bg-black/40 border border-white/10 rounded p-1.5 font-mono text-xs text-blue-400 break-all">
                                            {subCmd.cmd}
                                          </div>
                                        ) : subCmd.type === 'dns' || subCmd.type === 'config' ? (
                                          <div className="bg-black/40 border border-white/10 rounded p-1.5 font-mono text-xs text-purple-400 break-all">
                                            {subCmd.cmd}
                                          </div>
                                        ) : (
                                          <div className="relative group/subcmd">
                                            <div className="bg-black/40 border border-white/10 rounded p-1.5 pr-8 font-mono text-xs text-green-400 break-all hover:bg-black/50 transition-colors whitespace-pre-wrap">
                                              {subCmd.cmd}
                                              <button
                                                onClick={() => handleCopy(subCmd.cmd, `${index}-${sectionIdx}-${subIdx}`)}
                                                className="absolute right-1.5 top-1.5 p-0.5 rounded bg-white/10 hover:bg-white/20 transition-all opacity-0 group-hover/subcmd:opacity-100"
                                              >
                                                {copiedIndex === `${index}-${sectionIdx}-${subIdx}` ? (
                                                  <Check size={10} className="text-green-400" />
                                                ) : (
                                                  <Copy size={10} className="text-white/60" />
                                                )}
                                              </button>
                                            </div>
                                          </div>
                                        )}
                                      </>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        /* Comando o Link normal (para otros programas) */
                        program.command && (
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                              <Terminal size={10} />
                              <span className="font-semibold">{program.commandType}:</span>
                            </div>
                            {program.commandType === 'Web' ? (
                              <a
                                href={program.command}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block bg-black/40 border border-white/10 rounded-lg p-2 font-mono text-xs text-blue-400 break-all hover:bg-black/50 hover:border-blue-500/30 transition-all"
                              >
                                {program.command}
                              </a>
                            ) : (
                              <div className="relative group/cmd">
                                <div className="bg-black/40 border border-white/10 rounded-lg p-2 pr-8 font-mono text-xs text-green-400 break-all hover:bg-black/50 transition-colors">
                                  {program.command}
                                  <button
                                    onClick={() => handleCopy(program.command, index)}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded bg-white/10 hover:bg-white/20 transition-all opacity-0 group-hover/cmd:opacity-100"
                                  >
                                    {copiedIndex === index ? (
                                      <Check size={12} className="text-green-400" />
                                    ) : (
                                      <Copy size={12} className="text-white/60" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Nota informativa */}
        <div className="relative z-10 mt-4 bg-blue-500/10 border border-blue-500/20 rounded-lg p-2">
          <p className="text-xs text-blue-300/80">
            💡 PowerShell: Ejecuta como Administrador | Bash: Usa SSH en Ubuntu/Linux
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgramsCard;
