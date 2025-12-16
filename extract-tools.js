import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Componentes que contienen herramientas
const componentFiles = [
  'AIToolsPart1Card.jsx',
  'TopToolsCard.jsx',
  'TopProCard.jsx',
  'TopPremiumCard.jsx',
  'TopEliteCard.jsx',
  'VSCodeExtensionsCard.jsx',
  'WebBuildersCard.jsx',
  'FreeHostingCard.jsx',
  'FreeOfficeCard.jsx',
  'FreeApisCard.jsx',
  'LibrariesCard.jsx',
  'ProgramsCard.jsx',
  'SocialMediaCard.jsx',
  'SQLCard.jsx',
  'CybersecurityCard.jsx',
  'DisenoDesarrolloCard.jsx',
  'AutomatizacionModernaCard.jsx',
  'AcademiaCard.jsx',
  'PDFDocumentsCard.jsx',
  'FrameTimeCard.jsx',
  'ChromeConfigCard.jsx',
  'OperatorAgentCard.jsx',
  'WindowsCommandsCard.jsx',
  'cliToolsData.js'
];

const componentsDir = path.join(__dirname, 'src', 'components');
const allTools = [];
const stats = {};

console.log('🔍 Extrayendo herramientas...\n');

for (const file of componentFiles) {
  const filePath = path.join(componentsDir, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  No encontrado: ${file}`);
    continue;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Buscar diferentes patrones de arrays
    const arrayPatterns = [
      /const\s+\w+\s*=\s*\[\s*\{[\s\S]*?\}\s*\]/g,
      /\w+\s*=\s*\[\s*\{[\s\S]*?\}\s*\]/g
    ];

    let fileTools = 0;
    
    // Buscar objetos individuales con estructura de herramienta
    const objectRegex = /\{\s*name:\s*["'`]([^"'`]+)["'`][^}]*url:\s*["'`]([^"'`]+)["'`][^}]*(?:desc:\s*["'`]([^"'`]*)["'`])?[^}]*\}/g;
    
    let match;
    while ((match = objectRegex.exec(content)) !== null) {
      const tool = {
        id: `${file}-${fileTools}`,
        name: match[1].trim(),
        url: match[2].trim(),
        desc: match[3] ? match[3].trim() : '',
        category: file.replace('.jsx', '').replace('.js', '').replace('Card', ''),
        source: file
      };
      
      allTools.push(tool);
      fileTools++;
    }

    if (fileTools > 0) {
      stats[file] = fileTools;
      console.log(`✅ ${file}: ${fileTools} herramientas`);
    }

  } catch (error) {
    console.error(`❌ Error en ${file}:`, error.message);
  }
}

// Crear directorio de datos si no existe
const dataDir = path.join(__dirname, 'src', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Guardar JSON
const outputPath = path.join(dataDir, 'all-tools.json');
fs.writeFileSync(outputPath, JSON.stringify(allTools, null, 2), 'utf8');

// Guardar stats
console.log('\n📊 RESUMEN:');
console.log('━'.repeat(50));
Object.entries(stats).forEach(([file, count]) => {
  console.log(`   ${file.padEnd(35)} ${count.toString().padStart(5)}`);
});
console.log('━'.repeat(50));
console.log(`   TOTAL: ${allTools.length} herramientas`);
console.log(`\n💾 Guardado en: src/data/all-tools.json`);
