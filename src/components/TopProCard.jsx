import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ExternalLink } from 'lucide-react';
import FavoriteButton from './FavoriteButton';

const TopProCard = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const officeTools = [
    { name: "Word.new", url: "https://word.new", desc: "Crea un nuevo documento de Word online al instante" },
    { name: "Excel.new", url: "https://excel.new", desc: "Crea una nueva hoja de cálculo de Excel online al instante" },
    { name: "PowerPoint.new", url: "https://powerpoint.new", desc: "Crea una nueva presentación de PowerPoint online al instante" },
    { name: "MassGrave", url: "https://massgrave.dev/", desc: "ACTIVA OFFICE GRATIS - Múltiples métodos de activación" },
    { name: "GetIntoPC", url: "https://getintopc.com", desc: "Cualquier software gratuito con videos de cómo instalarlo" },
    { name: "LibreOffice", url: "https://es.libreoffice.org/descarga/libreoffice/", desc: "Suite ofimática gratuita y de código abierto - Alternativa completa a Microsoft Office" },
  ];

  const handleCopy = async (url, index) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: false, margin: "-50px" }}
      className="relative"
    >
      <div className="relative glass-dark p-6 rounded-2xl border border-white/10 hover:border-green-500/30 transition-all duration-300 group">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl" />

        <h3 className="relative z-10 text-lg font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-500 bg-clip-text text-transparent mb-1">
          📄 Office & Software Gratis
        </h3>
        <p className="relative z-10 text-xs text-gray-400 mb-3">{officeTools.length} herramientas de oficina</p>

        <div className="relative z-10 max-h-[280px] overflow-y-auto custom-scrollbar">
          <div className="space-y-1.5">
            {officeTools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.01 }}
                viewport={{ once: true }}
                className="group/item"
              >
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between gap-2 p-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/5 hover:border-white/10 transition-all cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-green-300 truncate">
                      {tool.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">
                      {tool.desc}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-0.5 flex-shrink-0">
                    <FavoriteButton toolId={`office-${index}`} toolName={tool.name} toolUrl={tool.url} toolDesc={tool.desc} category="Office & Software" />
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCopy(tool.url, index);
                      }}
                      className="p-1 rounded-md bg-white/10 hover:bg-white/20 transition-all opacity-0 group-hover/item:opacity-100"
                    >
                      <AnimatePresence mode="wait">
                        {copiedIndex === index ? (
                          <Check key="check" size={12} className="text-green-400" />
                        ) : (
                          <Copy key="copy" size={12} className="text-white/60" />
                        )}
                      </AnimatePresence>
                    </motion.button>
                    
                    <ExternalLink size={12} className="text-white/40" />
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TopProCard;
