import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import LibrariesCard from './LibrariesCard';
import WebBuildersCard from './WebBuildersCard';
import CybersecurityCard from './CybersecurityCard';
import FreeApisCard from './FreeApisCard';
import FreeHostingCard from './FreeHostingCard';
import VSCodeExtensionsCard from './VSCodeExtensionsCard';
import AIToolsPart1Card from './AIToolsPart1Card';
import FavoritesCard from './FavoritesCard';
import WindowsCommandsCard from './WindowsCommandsCard';
import PDFDocumentsCard from './PDFDocumentsCard';
import SQLCard from './SQLCard';
import OperatorAgentCard from './OperatorAgentCard';
import SocialMediaCard from './SocialMediaCard';
import AcademiaCard from './AcademiaCard';
import AnimatedText from './AnimatedText';
import ScrambledText from './ScrambledText';
// import LiquidEther from './LiquidEther'; // Eliminado - Fondo animado removido
import TopEliteCard from './TopEliteCard';
import TopProCard from './TopProCard';
import TopPremiumCard from './TopPremiumCard';
import CLIWindow from './CLIWindow';
import ClineCLIWindow from './ClineCLIWindow';
import OpenCodeCLIWindow from './OpenCodeCLIWindow';
import CopilotCLIWindow from './CopilotCLIWindow';
import TaskMasterCLIWindow from './TaskMasterCLIWindow';
import MCPCLIWindow from './MCPCLIWindow';
import MCPServerCLIWindow from './MCPServerCLIWindow';
import QoderCLIWindow from './QoderCLIWindow';
import UbuntuServerCard from './UbuntuServerCard';
import FrameTimeCard from './FrameTimeCard';
import ChromeConfigCard from './ChromeConfigCard';
import ProgramsCard from './ProgramsCard';
import AutomatizacionModernaCard from './AutomatizacionModernaCard';
import DisenoDesarrolloCard from './DisenoDesarrolloCard';
import DisenoWebCard from './DisenoWebCard';
import VideosCard from './VideosCard';
import ImagenesCard from './ImagenesCard';
import MCPToolsCard from './MCPToolsCard';
import { cliTools } from './cliToolsData';

const ToolsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.7,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section ref={sectionRef} id="tools-section" className="relative py-20 px-4 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <AnimatedText
            text="HERRAMIENTAS"
            className="text-5xl md:text-6xl font-bold text-gray-800"
            delay={50}
            duration={0.8}
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            tag="h2"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto mt-4"
          >
            <ScrambledText
              className="text-xl text-gray-600"
              radius={100}
              duration={1.2}
              speed={0.5}
              scrambleChars=".:!?"
            >
              Descubre las mejores herramientas de IA y recursos para desarrolladores
            </ScrambledText>
          </motion.div>
        </div>

        {/* NUEVA FILA TOP ELITE - 3 Tabletas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <TopEliteCard />
          <TopProCard />
          <TopPremiumCard />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <WebBuildersCard />
          <LibrariesCard />
          <CybersecurityCard />
          <FreeApisCard />
          <FreeHostingCard />
          <VSCodeExtensionsCard />

          {/* Tarjeta de Programas */}
          <ProgramsCard />

          {/* Tarjeta Automatización Moderna */}
          <AutomatizacionModernaCard />

          {/* Tarjeta Diseño y Desarrollo */}
          <DisenoDesarrolloCard />

          {/* Tarjeta Social Media Constructor */}
          <SocialMediaCard />

          {/* Tarjeta ACADEMIA */}
          <AcademiaCard />

          {/* Tarjeta de Comandos Windows */}
          <WindowsCommandsCard />

          {/* Tarjeta de Documentos PDF */}
          <PDFDocumentsCard />

          {/* Tarjeta SQL & Databases */}
          <SQLCard />

          {/* MCP Tools */}
          <MCPToolsCard />
          
          {/* Tarjeta Operator Agents */}
          <OperatorAgentCard />
        </div>

        {/* Nueva fila - Diseño Web, Videos, Imágenes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <DisenoWebCard />
          <VideosCard />
          <ImagenesCard />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {/* Tarjeta de Favoritos */}
          <FavoritesCard />

          {/* Tarjeta Directorio IA Part 1 */}
          <AIToolsPart1Card />
        </div>

        <div id="cli-section" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {/* Frame Time Card */}
          <FrameTimeCard />
          
          {/* Chrome Configuration */}
          <ChromeConfigCard />
          
          {/* Cline CLI */}
          <ClineCLIWindow />
          
          {/* OpenCode CLI */}
          <OpenCodeCLIWindow />
          
          {/* Copilot CLI */}
          <CopilotCLIWindow />
          
          {/* Task Master AI */}
          <TaskMasterCLIWindow />
          
          {/* MCP - AWS MCP */}
          <MCPCLIWindow />
          
          {/* MCP SERVER - Conectar a Ubuntu */}
          <MCPServerCLIWindow />
          
          {/* Qoder IDE */}
          <QoderCLIWindow />
          
          {/* Ubuntu Server Commands */}
          <UbuntuServerCard />
          
          {cliTools.map((tool, index) => (
            <CLIWindow
              key={index}
              title={tool.title}
              requirements={tool.requirements}
              commands={tool.commands}
              gitRequired={tool.gitRequired}
              nodeDownload={tool.nodeDownload}
              downloadLabel={tool.downloadLabel}
              envVariables={tool.envVariables}
              setupSteps={tool.setupSteps}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
