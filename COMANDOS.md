# 🚀 GUÍA DE INSTALACIÓN - LANDING PAGE ANIMADA

## 📋 Comandos Paso a Paso

### 1️⃣ REQUISITOS PREVIOS

**Instalar Node.js (si no lo tienes):**
```powershell
# Verificar si Node.js está instalado
node --version
npm --version

# Si no está instalado:
# 1. Ir a: https://nodejs.org/
# 2. Descargar versión LTS (18.x o superior)
# 3. Instalar con opciones por defecto
# 4. Reiniciar PowerShell
```

### 2️⃣ INSTALACIÓN AUTOMÁTICA (RECOMENDADO)

**Opción A: Script Automático**
```powershell
# Abrir PowerShell como Administrador
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Navegar al proyecto
cd "C:\Users\codex\Documents\LANDING-ANIMADA"

# Ejecutar script de instalación
.\install.ps1
```

### 3️⃣ INSTALACIÓN MANUAL (SI EL SCRIPT FALLA)

**Paso 1: Navegar al directorio**
```powershell
cd "C:\Users\codex\Documents\LANDING-ANIMADA"
```

**Paso 2: Limpiar instalación anterior**
```powershell
# Eliminar node_modules si existe
Remove-Item node_modules -Recurse -Force -ErrorAction SilentlyContinue

# Eliminar package-lock.json si existe
Remove-Item package-lock.json -Force -ErrorAction SilentlyContinue
```

**Paso 3: Instalar dependencias**
```powershell
# Limpiar cache de npm
npm cache clean --force

# Instalar dependencias
npm install

# Si falla, probar con verbose para ver detalles
npm install --verbose
```

**Paso 4: Ejecutar servidor de desarrollo**
```powershell
npm run dev
```

**Paso 5: Abrir en navegador**
```
http://localhost:3000
```

### 4️⃣ COMANDOS ADICIONALES

**Ver logs detallados:**
```powershell
npm run dev --verbose
```

**Construir para producción:**
```powershell
npm run build
```

**Vista previa de build:**
```powershell
npm run preview
```

**Detener servidor:**
```powershell
# Presionar Ctrl + C en la terminal
# O en otra terminal:
taskkill /F /IM node.exe
```

### 5️⃣ SOLUCIÓN DE PROBLEMAS

**Error: "module is not defined"**
```powershell
# El proyecto ya está configurado para ES modules
# Si persiste, verificar que package.json tenga:
# "type": "module"
```

**Error: NPM no funciona**
```powershell
# Reinstalar Node.js completamente
# 1. Desinstalar Node.js desde Panel de Control
# 2. Eliminar carpeta: C:\Users\[usuario]\AppData\Roaming\npm
# 3. Reinstalar Node.js desde nodejs.org
# 4. Reiniciar computadora
```

**Error: Permisos**
```powershell
# Ejecutar PowerShell como Administrador
# O cambiar permisos:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Error: Firewall/Proxy Corporativo**
```powershell
# Configurar proxy si estás en red corporativa:
npm config set proxy http://proxy-server:puerto
npm config set https-proxy http://proxy-server:puerto

# O usar yarn como alternativa:
npm install -g yarn
yarn install
yarn dev
```

### 6️⃣ ESTRUCTURA DEL PROYECTO

```
LANDING-ANIMADA/
├── 📁 src/
│   ├── 📁 components/     # Componentes React
│   │   ├── Navigation.jsx # Navegación
│   │   ├── Hero.jsx      # Sección principal
│   │   ├── Services.jsx  # Servicios
│   │   ├── Gallery.jsx   # Galería
│   │   ├── Testimonials.jsx # Testimonios
│   │   └── Contact.jsx   # Contacto
│   ├── App.jsx           # Componente principal
│   ├── main.jsx         # Punto de entrada
│   └── index.css        # Estilos globales
├── 📄 index.html         # HTML base
├── 📄 package.json       # Dependencias
├── 📄 vite.config.js     # Configuración Vite
├── 📄 tailwind.config.js # Configuración Tailwind
└── 📄 install.ps1        # Script de instalación
```

### 7️⃣ TECNOLOGÍAS INCLUIDAS

- ⚛️  **React 18** - Biblioteca de componentes
- ⚡ **Vite** - Build tool ultra-rápido
- 🎭 **Framer Motion** - Animaciones profesionales
- 🎨 **Tailwind CSS** - Framework de CSS
- 🎯 **Lucide React** - Iconos modernos

### 8️⃣ CARACTERÍSTICAS

- ✨ Animaciones de texto blur
- 🌊 Efectos parallax scroll
- 🎴 Hover effects en tarjetas
- 🌈 Gradientes animados
- 📱 Diseño responsive
- 🖼️ Galería con modal
- 📝 Formulario de contacto
- 🚀 Optimizado para rendimiento

### 9️⃣ URLS IMPORTANTES

- **Desarrollo**: http://localhost:3000
- **Node.js**: https://nodejs.org/
- **Documentación Vite**: https://vitejs.dev/
- **Documentación React**: https://react.dev/
- **Framer Motion**: https://www.framer.com/motion/
- **Tailwind CSS**: https://tailwindcss.com/

---

## 🆘 CONTACTO Y SOPORTE

Si tienes problemas con la instalación:

1. **Verificar requisitos**: Node.js 16+ instalado
2. **Ejecutar como Administrador**: PowerShell con permisos elevados
3. **Revisar conexión**: Internet estable para descargar dependencias
4. **Limpiar cache**: `npm cache clean --force`
5. **Reinstalar Node.js**: Si persisten los problemas

**¡La landing page estará lista en menos de 5 minutos!** 🎉
