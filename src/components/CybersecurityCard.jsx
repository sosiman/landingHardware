import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FavoriteButton from './FavoriteButton';

const CybersecurityCard = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const cybersecurity = [
    { name: "https://github.com/intruder-io/autoswagger.git : busca vulnerabilidades en tu código Seguridad", url: "https://github.com/intruder-io/autoswagger" },
    { name: "Hackerai.co : modelo sin censura para hackear lo que necesites", url: "https://hackerai.co" },
    { name: "Incogni.com : elimina toda tu data de internet.. te hace desaparecer", url: "https://incogni.com" },
    { name: "https://www.hexstrike.com/ : MCP agent, https://github.com/0x4m4/hexstrike-ai conectas Claude Desktop MCP", url: "https://www.hexstrike.com/" },
    { name: "https://www.checkusernamess.com/", url: "https://www.checkusernamess.com/" },
    { name: "https://dnshistory.org/", url: "https://dnshistory.org/" },
    { name: "https://web.archive.org/", url: "https://web.archive.org/" },
    { name: "https://www.peekyou.com/", url: "https://www.peekyou.com/" },
    { name: "Netcraft Extension", url: "https://chromewebstore.google.com/detail/netcraft-extension/bmejphbfclcpmpohkggcjeibfilpamia" },
    { name: "https://nettools.net/features/", url: "https://nettools.net/features/" },
    { name: "https://www.robtex.com/", url: "https://www.robtex.com/" },
    { name: "https://www.shodan.io/", url: "https://www.shodan.io/" },
    { name: "https://search.censys.io/", url: "https://search.censys.io/" },
    { name: "https://www.maltego.com/ : (grafica , alternativa de obsidian)", url: "https://www.maltego.com/" },
    { name: "https://obsidian.md/ : crea el mapa de toda la informacion (grafica la info)", url: "https://obsidian.md/" },
    { name: "https://haveibeenpwned.com/", url: "https://haveibeenpwned.com/" },
    { name: "https://jimpl.com/ (metadata de fotos)", url: "https://jimpl.com/" },
    { name: "https://whatsmyname.app/ (metadata)", url: "https://whatsmyname.app/" },
    { name: "https://gchq.github.io/CyberChef/ : analysing and decoding data", url: "https://gchq.github.io/CyberChef/" },
    { name: "https://proton.me/es-es/mail : correo electronico seguro", url: "https://proton.me/es-es/mail" },
    { name: "https://matrix.org/ : plataforma para usar chats y mantener comucaciones decentrailzadas", url: "https://matrix.org/" },
    { name: "https://www.openpgp.org/software/kleopatra/ : (email encriptado)", url: "https://www.openpgp.org/software/kleopatra/" },
  ];

  const handleCopy = async (text, index) => {
    // Extraer solo el nombre de la URL sin la descripción
    const urlOnly = text.split(' : ')[0].split(' (')[0];

    try {
      await navigator.clipboard.writeText(urlOnly);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const renderToolName = (name) => {
    // Buscar URLs en el nombre/descripción
    const urlRegex = /(https?:\/\/[^\s,]+)/g;
    const parts = name.split(urlRegex);

    return (
      <span className="hover:text-red-400 transition-colors break-words">
        {parts.map((part, i) => {
          if (part.match(urlRegex)) {
            return (
              <span
                key={i}
                className="text-blue-400 hover:text-blue-300 underline"
              >
                {part}
              </span>
            );
          }
          return part;
        })}
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7 }}
      viewport={{ once: false, margin: "-50px" }}
      className="relative col-span-1"
    >
      <div className="relative h-full glass-dark-cream p-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group">
        {/* Efecto de brillo de fondo */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl" />

        {/* Header más compacto */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-2xl"
            >
              🔒
            </motion.div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
              CIBERSECURITY
            </h3>
          </div>
        </div>

        {/* Subtítulo descriptivo */}
        <p className="text-xs text-gray-500 mb-2 italic">
          Herramientas para toma de huellas y análisis de vulnerabilidades
        </p>

        {/* Contador de recursos */}
        <div className="text-xs text-gray-400 mb-2">
          {cybersecurity.length} herramientas disponibles
        </div>

        {/* Lista scrollable más compacta */}
        <div className="relative max-h-[280px] overflow-y-auto overflow-x-hidden pr-1 custom-scrollbar">
          <div className="space-y-0.5">
            {cybersecurity.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.005, duration: 0.2 }}
                viewport={{ once: true }}
                className="group/item relative"
              >
                <div className="flex items-start justify-between py-1.5 px-2 rounded-md hover:bg-white/5 transition-all duration-200">
                  {/* Enlace */}
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-xs text-gray-300 hover:text-white transition-colors duration-200 pr-2"
                  >
                    {renderToolName(tool.name)}
                  </a>

                  {/* Botones */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <FavoriteButton
                      toolId={`cyber-${index}`}
                      toolName={tool.name}
                      toolUrl={tool.url}
                      toolDesc=""
                      category="Cybersecurity"
                    />

                    {/* Botón de copiar más pequeño */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleCopy(tool.name, index)}
                      className="p-1 rounded-md bg-white/5 hover:bg-white/10 transition-all duration-200 opacity-0 group-hover/item:opacity-100"
                    >
                      <AnimatePresence mode="wait">
                        {copiedIndex === index ? (
                          <motion.svg
                            key="check"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="w-3 h-3 text-green-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </motion.svg>
                        ) : (
                          <motion.svg
                            key="copy"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="w-3 h-3 text-gray-400 hover:text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </motion.svg>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </div>

                {/* Tooltip de copiado */}
                <AnimatePresence>
                  {copiedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute right-0 top-full mt-0.5 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-md backdrop-blur-sm z-10"
                    >
                      ¡Copiado!
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Indicador de scroll más pequeño */}
        <div className="absolute bottom-3 right-3 text-xs text-gray-500 opacity-60">
          ↓
        </div>

        {/* Efecto de brillo animado */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-white/5 to-transparent transform -skew-y-12 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CybersecurityCard;
