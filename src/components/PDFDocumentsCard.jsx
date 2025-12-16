import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ExternalLink, Copy } from 'lucide-react';
import FavoriteButton from './FavoriteButton';

const PDFDocumentsCard = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const pdfTools = [
    {
      name: "Formulabot",
      url: "https://formulabot.com",
      description: "AI para fórmulas y datos de documentos",
      category: "Fórmulas IA"
    },
    {
      name: "Doctly AI",
      url: "https://doctly.ai/",
      description: "Extract data from PDFs, OCR avanzado",
      category: "OCR/Extracción"
    },
    {
      name: "Skywork.ai",
      url: "https://skywork.ai",
      description: "Plataforma multi herramienta para trabajo con documentos",
      category: "Multi-herramienta"
    },
    {
      name: "SciSpace",
      url: "https://scispace.com/",
      description: "PLATAFORMA DE IA MÁS COMPLETA PARA TRABAJAR CON DOCUMENTOS",
      category: "Plataforma Completa"
    },
    {
      name: "WPS Office",
      url: "https://es.wps.com/",
      description: "Suite ofimática completa - DESKTOP - editor potente de PDF, Word, Excel y presentaciones",
      category: "DESKTOP"
    },
    {
      name: "Dumpdf",
      url: "https://dumpdf.com",
      description: "Comprimir, convertir y editar PDF - herramientas completas para optimizar documentos",
      category: "Compresión/Edición"
    },
    {
      name: "Sli.dev",
      url: "https://sli.dev/",
      description: "Presentaciones para desarrolladores",
      category: "Presentaciones"
    },
    {
      name: "GenSpark AI",
      url: "https://www.genspark.ai/",
      description: "PLATAFORMA CON MÚTIPLES HERRAMIENTAS",
      category: "Multi-herramienta"
    },
    {
      name: "UPDF",
      url: "https://updf.com/",
      description: "Puedes descargar el desktop - editor potente",
      category: "Editor Desktop"
    },
    {
      name: "Rows",
      url: "https://rows.com/",
      description: "Excel, base de datos, PDF - todo en uno",
      category: "Rows/Sheets"
    },
    {
      name: "Toolfk",
      url: "https://www.toolfk.com/",
      description: "PDF tools",
      category: "PDF"
    },
    {
      name: "GPT Excel",
      url: "https://gptexcel.uk/dashboard",
      description: "Lo más potente en Excel con IA",
      category: "Excel IA"
    },
    {
      name: "PDF.co",
      url: "https://pdf.co",
      description: "Conexión por API para automatizaciones y lectura, extracción de imágenes, fórmulas y gráficas en PDF",
      category: "API"
    },
    {
      name: "Descript Underlord",
      url: "https://www.descript.com/underlord",
      description: "Convierte un PDF en video y añade avatares explicando, Dashboard, etc",
      category: "PDF a Video"
    },
    {
      name: "LightPDF",
      url: "https://lightpdf.com/edit-pdf",
      description: "Editor de PDF completo y gratuito",
      category: "Editor"
    },
    {
      name: "PDF Agile",
      url: "https://www.pdfagile.com/",
      description: "App multifunción de PDF con múltiples herramientas",
      category: "Multifunción"
    },
    {
      name: "StudyFetch",
      url: "https://studyfetch.com",
      description: "PDF a video - convierte documentos en contenido visual",
      category: "PDF a Video"
    },
    {
      name: "TypedAI",
      url: "https://typedai.com",
      description: "Hace test y crea evaluaciones del PDF que le anexes",
      category: "Evaluaciones"
    },
    {
      name: "Tripo3D AI Studio",
      url: "https://studio.tripo3d.ai/home",
      description: "Todas las herramientas posibles (tools): PDF a JPEG, conversiones, etc",
      category: "Todo en Uno"
    }
  ];

  const handleCopy = (e, url, index) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7 }}
      viewport={{ once: false, margin: "-50px" }}
      className="relative col-span-1"
    >
      <div className="relative h-full glass-dark p-4 rounded-2xl border border-white/10 hover:border-red-500/30 transition-all duration-300 group">
        {/* Efecto de brillo de fondo */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl" />

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FileText className="text-red-400" size={24} />
            </motion.div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
              Documentos PDF, Rows, Edit
            </h3>
          </div>
        </div>

        {/* Contador */}
        <div className="text-xs text-gray-400 mb-3">
          {pdfTools.length} herramientas disponibles
        </div>

        {/* Lista scrollable */}
        <div className="relative max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
          <div className="space-y-1">
            <AnimatePresence mode="popLayout">
              {pdfTools.map((tool, index) => (
                <motion.a
                  key={index}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.2 }}
                  className="group/item relative block cursor-pointer"
                >
                  <div className="flex flex-col py-2 px-2 rounded-md hover:bg-white/5 transition-all duration-200 gap-1">
                    {/* Título y botones */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-gray-200 truncate">
                          {tool.name}
                        </h4>
                      </div>
                      
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {/* Botón de favoritos */}
                        <FavoriteButton
                          toolId={`pdf-${index}`}
                          toolName={tool.name}
                          toolUrl={tool.url}
                          toolDesc={tool.description}
                          category="Documentos PDF"
                        />
                        
                        {/* Botones que aparecen al hover */}
                        <div className="flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                          {/* Botón copiar URL */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => handleCopy(e, tool.url, index)}
                            className="p-1.5 rounded-md bg-red-500/10 hover:bg-red-500/20 transition-all duration-200"
                            title="Copiar URL"
                          >
                            {copiedIndex === index ? (
                              <span className="text-[10px] text-green-400">✓</span>
                            ) : (
                              <Copy size={12} className="text-red-400" />
                            )}
                          </motion.button>
                          
                          {/* Botón abrir URL */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              window.open(tool.url, '_blank');
                            }}
                            className="p-1.5 rounded-md bg-orange-500/10 hover:bg-orange-500/20 transition-all duration-200"
                            title="Abrir sitio web"
                          >
                            <ExternalLink size={12} className="text-orange-400" />
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Descripción */}
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {tool.description}
                    </p>

                    {/* Categoría */}
                    <span className="inline-block self-start px-2 py-0.5 text-[10px] bg-red-500/20 text-red-400 rounded-full">
                      {tool.category}
                    </span>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Efecto de brillo animado */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-red-500/5 to-transparent transform -skew-y-12 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PDFDocumentsCard;
