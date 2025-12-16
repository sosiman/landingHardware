export const cliTools = [
  {
    title: 'Claude Code',
    requirements: [
      'Una cuenta en Claude.ai (recomendado) o Claude Console',
      'Ya NO requiere Node.js ni Git',
    ],
    commands: [
      '# Desinstalar versión anterior (si la tenías):',
      'npm uninstall -g @anthropic-ai/claude-code',
      '',
      '# Install with Homebrew on macOS, Linux',
      'brew install --cask claude-code',
      '',
      '# Install via script on macOS, Linux, WSL',
      'curl -fsSL https://claude.ai/install.sh | bash',
      '',
      '# Install on Windows PowerShell',
      'irm https://claude.ai/install.ps1 | iex',
      '',
      '# Usar Claude Code:',
      'cd your-awesome-project',
      'claude',
      '# Se te pedirá que inicies sesión en el primer uso',
    ],
    gitRequired: false,
    nodeDownload: null,
    setupSteps: [
      {
        title: 'Agregar Claude a las Variables de Entorno (Windows)',
        instructions: [
          '¿Para qué sirve esto? Permite ejecutar "claude" desde cualquier ubicación en la terminal sin tener que especificar la ruta completa del programa.',
          'Pasos:',
          'Presiona Win + R y escribe: sysdm.cpl',
          'Se abrirá "Propiedades del sistema"',
          'Ve a la pestaña "Opciones avanzadas"',
          'Clic en "Variables de entorno..."',
          'En la lista de arriba ("Variables de usuario"), busca "Path" y dale Doble Clic',
          'Dale a "Nuevo"',
          'Pega la ruta: C:\\Users\\TU_USUARIO\\.local\\bin',
          'Dale "Aceptar" a todo',
          'CIERRA Y REABRE LA TERMINAL para que los cambios surtan efecto',
        ],
        code: 'sysdm.cpl',
      },
    ],
  },
  {
    title: 'Gemini CLI',
    requirements: [
      'Node.js 18 o más reciente',
      'Git',
      'Una API Key de Google Gemini (gratuita o de pago)',
    ],
    commands: [
      'npm install -g @google/generative-ai-cli',
      'cd your-awesome-project',
      'gemini',
    ],
    gitRequired: true,
    nodeDownload: 'https://nodejs.org/en/download',
    setupSteps: [
      {
        title: 'Paso 1: Obtener tu API Key de Google Gemini',
        instructions: [
          'Ve a Google AI Studio: https://aistudio.google.com/app/apikey',
          'Inicia sesión con tu cuenta de Google',
          'Haz clic en "Create API Key"',
          'Se generará tu API Key automáticamente',
          'Cópiala y guárdala en un lugar seguro',
        ],
        code: null,
      },
      {
        title: 'Paso 2: Configurar Variables de Entorno en Windows',
        instructions: [
          'Presiona Win + R para abrir el cuadro de diálogo "Ejecutar"',
          'Escribe: sysdm.cpl y presiona Enter',
          'Se abrirá la ventana "Propiedades del sistema"',
          'Ve a la pestaña "Opciones avanzadas"',
          'Haz clic en el botón "Variables de entorno..."',
          'En la sección "Variables de usuario para [tu_usuario]", haz clic en "Nueva..."',
        ],
        code: 'sysdm.cpl',
      },
      {
        title: 'Paso 3: Crear variables de usuario',
        instructions: [
          'Se abrirá la ventana "Nueva variable de usuario"',
          'En el campo "Nombre de variable", escribe: GEMINI_API_KEY',
          'En el campo "Valor de variable", pega tu API Key',
          'Haz clic en "Aceptar"',
          'Repite el proceso para la segunda variable',
        ],
        code: 'GEMINI_API_KEY',
      },
    ],
  },
  {
    title: 'Droid CLI',
    requirements: [
      'Node.js 18 o más reciente',
      'Git',
      'Una cuenta de Factory.ai',
    ],
    commands: [
      'irm https://app.factory.ai/cli/windows | iex',
      'cd your-awesome-project',
      'droid',
    ],
    gitRequired: true,
    nodeDownload: 'https://nodejs.org/en/download',
    setupSteps: [
      {
        title: 'Instalación en Windows',
        instructions: [
          'Abre PowerShell como usuario normal',
          'Ejecuta el comando de instalación',
          'Se descargará e instalará Droid automáticamente',
          'Confirma cuando se te solicite',
        ],
        code: 'irm https://app.factory.ai/cli/windows | iex',
      },
      {
        title: 'Instalación en macOS/Linux',
        instructions: [
          'Abre una terminal',
          'Asegúrate de tener xdg-utils instalado (solo Linux)',
          'Ejecuta el comando curl para instalar',
          'Sigue las instrucciones en pantalla',
        ],
        code: 'curl -fsSL https://app.factory.ai/cli | sh',
      },
      {
        title: 'Requisito para Linux: xdg-utils',
        instructions: [
          'En distribuciones basadas en Debian/Ubuntu:',
          'En distribuciones basadas en RHEL/Fedora:',
          'En Arch Linux:',
          'Esto es necesario para que Droid pueda abrir el navegador automáticamente',
        ],
        code: 'sudo apt-get install xdg-utils',
      },
    ],
  },
  {
    title: 'Chandra OCR CLI',
    requirements: [
      'Python 3.13 o más reciente',
      '⚠️ SOLO GRÁFICAS NVIDIA (con CUDA)',
      'Si no tienes NVIDIA, modifica para usar CPU (ver instrucciones abajo)',
    ],
    commands: [
      'pip install chandra-ocr',
      'chandra_app',
    ],
    gitRequired: false,
    nodeDownload: 'https://www.python.org/downloads/release/python-3130/',
    downloadLabel: 'Python 3.13',
    setupSteps: [
      {
        title: 'Modificar para usar CPU (si NO tienes NVIDIA)',
        instructions: [
          'Comando PowerShell para abrir el archivo:',
        ],
        code: 'notepad C:\\Python313\\Lib\\site-packages\\chandra\\model\\hf.py',
      },
      {
        title: 'Pasos para modificar',
        instructions: [
          'Se abrirá el archivo en el Bloc de notas',
          'Busca la línea 31 que dice: inputs = inputs.to("cuda")',
          'Cámbiala por: inputs = inputs.to("cpu")',
          'Guarda el archivo (Ctrl + S) y cierra el editor',
          'Ahora podrás usar Chandra OCR con CPU en lugar de GPU NVIDIA',
        ],
        code: null,
      },
    ],
  },
];
