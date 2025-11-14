# Script de Instalación - Landing Page Animada
# Innovate Solutions - Proyecto React + Vite + Framer Motion

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🚀 INSTALACIÓN LANDING PAGE ANIMADA" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Función para verificar si un comando existe
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# Verificar Node.js
Write-Host "📦 Verificando Node.js..." -ForegroundColor Yellow
if (Test-Command "node") {
    $nodeVersion = node --version
    Write-Host "✅ Node.js encontrado: $nodeVersion" -ForegroundColor Green
    
    if ([version]($nodeVersion -replace 'v','') -lt [version]"16.0.0") {
        Write-Host "⚠️  Versión de Node.js muy antigua. Se recomienda Node 18+" -ForegroundColor Red
        Write-Host "   Descarga desde: https://nodejs.org/" -ForegroundColor Yellow
        exit 1
    }
} else {
    Write-Host "❌ Node.js no encontrado" -ForegroundColor Red
    Write-Host "   1. Descarga Node.js desde: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "   2. Instala la versión LTS (18.x o superior)" -ForegroundColor Yellow
    Write-Host "   3. Reinicia PowerShell y ejecuta este script nuevamente" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "🔗 Link directo: https://nodejs.org/dist/v18.19.0/node-v18.19.0-x64.msi" -ForegroundColor Cyan
    pause
    exit 1
}

# Verificar NPM
Write-Host "📦 Verificando NPM..." -ForegroundColor Yellow
if (Test-Command "npm") {
    $npmVersion = npm --version
    Write-Host "✅ NPM encontrado: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "❌ NPM no encontrado (debería venir con Node.js)" -ForegroundColor Red
    exit 1
}

# Navegar al directorio del proyecto
$projectPath = "C:\Users\codex\Documents\LANDING-ANIMADA"
Write-Host "📁 Navegando a: $projectPath" -ForegroundColor Yellow

if (!(Test-Path $projectPath)) {
    Write-Host "❌ Directorio del proyecto no encontrado: $projectPath" -ForegroundColor Red
    exit 1
}

Set-Location $projectPath

# Limpiar instalación anterior si existe
Write-Host "🧹 Limpiando instalación anterior..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "   ✅ node_modules eliminado" -ForegroundColor Green
}
if (Test-Path "package-lock.json") {
    Remove-Item "package-lock.json" -Force -ErrorAction SilentlyContinue
    Write-Host "   ✅ package-lock.json eliminado" -ForegroundColor Green
}

# Instalar dependencias
Write-Host ""
Write-Host "📥 Instalando dependencias..." -ForegroundColor Yellow
Write-Host "   (Esto puede tomar 2-3 minutos)" -ForegroundColor Gray

try {
    npm install --verbose
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Dependencias instaladas correctamente" -ForegroundColor Green
    } else {
        throw "Error en npm install"
    }
} catch {
    Write-Host "❌ Error instalando dependencias" -ForegroundColor Red
    Write-Host "   Intentando con npm cache clean..." -ForegroundColor Yellow
    npm cache clean --force
    npm install --verbose
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Error persistente. Causas posibles:" -ForegroundColor Red
        Write-Host "   - Conexión a internet inestable" -ForegroundColor Yellow
        Write-Host "   - Firewall/Antivirus bloqueando NPM" -ForegroundColor Yellow
        Write-Host "   - Permisos insuficientes" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "💡 Soluciones:" -ForegroundColor Cyan
        Write-Host "   1. Ejecutar PowerShell como Administrador" -ForegroundColor White
        Write-Host "   2. Configurar proxy si estás en red corporativa:" -ForegroundColor White
        Write-Host "      npm config set proxy http://proxy:puerto" -ForegroundColor Gray
        Write-Host "   3. Usar yarn en lugar de npm:" -ForegroundColor White
        Write-Host "      npm install -g yarn && yarn install" -ForegroundColor Gray
        pause
        exit 1
    }
}

# Verificar instalación
Write-Host ""
Write-Host "🔍 Verificando instalación..." -ForegroundColor Yellow
$packageCount = (Get-ChildItem "node_modules" -Directory | Measure-Object).Count
Write-Host "   📦 $packageCount paquetes instalados" -ForegroundColor Green

# Mostrar estructura del proyecto
Write-Host ""
Write-Host "📋 Estructura del proyecto:" -ForegroundColor Yellow
tree /F | Select-Object -First 20

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✅ INSTALACIÓN COMPLETADA" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Preguntar si ejecutar el servidor
$runServer = Read-Host "¿Ejecutar el servidor de desarrollo ahora? (s/n)"
if ($runServer -eq "s" -or $runServer -eq "S" -or $runServer -eq "") {
    Write-Host ""
    Write-Host "🚀 Iniciando servidor de desarrollo..." -ForegroundColor Cyan
    Write-Host "   URL: http://localhost:3000" -ForegroundColor White
    Write-Host "   Presiona Ctrl+C para detener" -ForegroundColor Gray
    Write-Host ""
    
    # Abrir navegador automáticamente
    Start-Process "http://localhost:3000"
    
    # Ejecutar servidor
    npm run dev
} else {
    Write-Host ""
    Write-Host "📝 Para ejecutar manualmente:" -ForegroundColor Cyan
    Write-Host "   cd `"$projectPath`"" -ForegroundColor White
    Write-Host "   npm run dev" -ForegroundColor White
    Write-Host ""
    Write-Host "🌐 Luego abre: http://localhost:3000" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "🎉 ¡Disfruta tu landing page animada!" -ForegroundColor Green
